#!/usr/bin/env node
// scripts/stripe-setup.mjs
// -----------------------------------------------------------------------------
// Crée (ou retrouve) dans Stripe les produits, prix et liens de paiement des
// 8 offres actionnables de SENA CONSULTING. Idempotent : relançable sans doublon.
//
// Usage (depuis la racine du dépôt, Node 18+) :
//   STRIPE_SECRET_KEY=sk_test_… node scripts/stripe-setup.mjs        # mode test
//   STRIPE_SECRET_KEY=sk_live_… node scripts/stripe-setup.mjs        # production
//
// La clé n'est jamais écrite nulle part : elle est lue dans l'environnement
// et oubliée à la fin. Utiliser de préférence une clé restreinte
// (Développeurs → Clés API → Créer une clé restreinte) avec droits « Écriture »
// sur Produits, Prix et Liens de paiement — rien d'autre.
//
// Sortie : un tableau « nom interne → URL du lien » à coller dans le fil Claude,
// et le fichier scripts/stripe-links.json (à ne pas committer si clé live).
// -----------------------------------------------------------------------------

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) { console.error("STRIPE_SECRET_KEY manquante."); process.exit(1); }
const SITE = "https://www.sena-consulting.fr";
const LIVE = KEY.startsWith("sk_live") || KEY.startsWith("rk_live");

// ── Catalogue (source : CGV du 30/09/2026, tableau OFFRES) ───────────────────
// slug = nom interne = valeur de ?offre= sur le site. lancement/standard en euros.
const OFFRES = [
  { slug: "bilan-financements",             nom: "Bilan Financements — Organisme de formation",              lancement: 790, standard: 1290, quota: "5 premiers organismes" },
  { slug: "bilan-commissions",              nom: "Bilan Commissions — Hôtel",                                lancement: 890, standard: 1490, quota: "5 premiers hôtels" },
  { slug: "bilan-commissions-activites",    nom: "Bilan Commissions · Activités",                            lancement: 690, standard: 990,  quota: "5 premiers opérateurs" },
  { slug: "bilan-commissions-restauration", nom: "Bilan Commissions · Restauration · Express 72 h",          lancement: 490, standard: 790,  quota: "tarif de lancement" },
  { slug: "plan-argent-dormant",            nom: "Plan Argent Dormant — Bâtiment",                           lancement: 490, standard: 790,  quota: "10 premières entreprises" },
  { slug: "pack-dracar-express",            nom: "Pack Dracar Express — Sécurité privée (jusqu'à 30 agents)", lancement: 290, standard: 490,  quota: "10 premières sociétés" },
  { slug: "veille-titres-30",               nom: "Veille Titres — jusqu'à 30 agents",                        mensuel: 79 },
  { slug: "veille-titres-80",               nom: "Veille Titres — 31 à 80 agents",                           mensuel: 149 },
];

// ── Client HTTP minimal (API Stripe, encodage formulaire) ────────────────────
function encode(obj, prefix = "") {
  const parts = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) v.forEach((x, i) => parts.push(typeof x === "object" ? encode(x, `${key}[${i}]`) : `${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(x)}`));
    else if (typeof v === "object") parts.push(encode(v, key));
    else parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
  }
  return parts.join("&");
}
async function stripe(method, path, body) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/x-www-form-urlencoded", "Stripe-Version": "2024-06-20" }, // version fixée : la recherche exige ≥ 2020-08-27
    body: body ? encode(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} → ${json.error?.message ?? res.status}`);
  return json;
}

// ── Idempotence : produit par metadata.slug, prix par lookup_key ─────────────
async function produit(o) {
  const found = await stripe("GET", `/products/search?query=${encodeURIComponent(`metadata['slug']:'${o.slug}'`)}`);
  if (found.data[0]) return found.data[0];
  return stripe("POST", "/products", {
    name: o.nom,
    description: o.mensuel ? "Vérification mensuelle de la validité des cartes professionnelles. Engagement 6 mois (CGV)." : "Prestation de conseil SENA CONSULTING. Livrable, délai et garantie : voir CGV et page de l'offre.",
    metadata: { slug: o.slug },
    statement_descriptor: "SENA CONSULTING",
    tax_code: "txcd_20030000", // services de conseil
  });
}
async function prix(productId, lookupKey, montant, recurring) {
  const found = await stripe("GET", `/prices?lookup_keys[]=${encodeURIComponent(lookupKey)}&active=true`);
  if (found.data[0]) return found.data[0];
  return stripe("POST", "/prices", {
    product: productId, currency: "eur", unit_amount: montant * 100, lookup_key: lookupKey, transfer_lookup_key: true,
    ...(recurring ? { recurring: { interval: "month" } } : {}),
    tax_behavior: "exclusive",
  });
}
async function lien(priceId, slug, palier) {
  const existants = await stripe("GET", "/payment_links?active=true&limit=100");
  const deja = existants.data.find((l) => l.metadata?.offre === slug && l.metadata?.palier === palier);
  if (deja) return deja;
  return stripe("POST", "/payment_links", {
    line_items: [{ price: priceId, quantity: 1 }],
    after_completion: { type: "redirect", redirect: { url: `${SITE}/merci?offre=${slug}&palier=${palier}` } },
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    custom_fields: [{ key: "societe", label: { type: "custom", custom: "Nom de la société" }, type: "text" }],
    metadata: { offre: slug, palier },
    allow_promotion_codes: false,
  });
}

// ── Exécution ────────────────────────────────────────────────────────────────
console.log(`Stripe ${LIVE ? "LIVE" : "TEST"} — ${OFFRES.length} produits\n`);
const resultat = [];
for (const o of OFFRES) {
  const p = await produit(o);
  const paliers = o.mensuel
    ? [["mensuel", await prix(p.id, `${o.slug}-mensuel`, o.mensuel, true)]]
    : [["lancement", await prix(p.id, `${o.slug}-lancement`, o.lancement)], ["standard", await prix(p.id, `${o.slug}-standard`, o.standard)]];
  for (const [palier, pr] of paliers) {
    const l = await lien(pr.id, o.slug, palier);
    resultat.push({ offre: o.slug, palier, montant: pr.unit_amount / 100, url: l.url });
    console.log(`${o.slug.padEnd(34)} ${palier.padEnd(10)} ${String(pr.unit_amount / 100).padStart(5)} €  ${l.url}`);
  }
}
const { writeFileSync } = await import("node:fs");
writeFileSync("scripts/stripe-links.json", JSON.stringify(resultat, null, 2));
console.log(`\n${resultat.length} liens → scripts/stripe-links.json. Colle ce tableau dans le fil Claude pour brancher les boutons du site.`);
