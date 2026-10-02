#!/usr/bin/env node
// scripts/sourcing.mjs
// -----------------------------------------------------------------------------
// Sourcing des listes de chasse — 3 étapes, chacune relançable.
//
//   node --env-file=.env.local scripts/sourcing.mjs registre <segment> [max]
//       → sourcing/<segment>.csv : entreprises actives du registre national
//         (API Recherche d'entreprises, data.gouv, sans clé) : raison sociale,
//         SIREN, NAF, tranche d'effectif, adresse, dirigeant.
//
//   node --env-file=.env.local scripts/sourcing.mjs enrichir <segment>
//       → ajoute téléphone, site web (Google Places, clé GOOGLE_PLACES_API_KEY)
//         puis e-mail trouvé sur le site (pages d'accueil, contact, mentions légales).
//
//   node --env-file=.env.local scripts/sourcing.mjs verifier <segment>
//       → vérifie chaque e-mail (NeverBounce, clé NEVERBOUNCE_API_KEY) : valid /
//         invalid / catchall / unknown. Seuls les « valid » partent en campagne.
//
// Segments : securite | btp | formation | restaurants
// Les clés restent dans .env.local (ignoré par git). Aucune donnée n'est envoyée
// ailleurs qu'aux trois services nommés. Coûts indicatifs : Places ≈ 0,03 $ par
// recherche, NeverBounce ≈ 0,008 $ par adresse. Le registre est gratuit.
// -----------------------------------------------------------------------------

import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const [, , etape, segment, maxArg] = process.argv;
const SEGMENTS = {
  securite: {
    prefixe: "SEC", naf: ["80.10Z"], departements: ["75", "92", "93", "94", "78", "91", "95", "77"],
    effectifs: ["02", "03", "11", "12", "21"], requetePlaces: (e) => `${e.raison_sociale} sécurité ${e.ville}`,
  },
  btp: {
    prefixe: "BTP", naf: ["43.21A", "43.22A", "43.22B", "43.29A", "43.31Z", "43.32A", "43.32B", "43.32C", "43.33Z", "43.34Z", "43.39Z", "43.91B", "43.99A", "43.99C"],
    departements: ["92", "78", "95"], effectifs: ["03", "11", "12"], requetePlaces: (e) => `${e.raison_sociale} ${e.ville}`,
  },
  formation: {
    prefixe: "OF", naf: ["85.59A"], departements: ["75", "92", "93", "94", "78", "91", "95", "77"],
    effectifs: ["01", "02", "03", "11", "12"], requetePlaces: (e) => `${e.raison_sociale} formation ${e.ville}`,
  },
  restaurants: {
    prefixe: "R", naf: ["56.10A"], departements: ["75"], effectifs: ["01", "02", "03", "11"],
    requetePlaces: (e) => `${e.raison_sociale} restaurant ${e.ville}`,
  },
};
const cfg = SEGMENTS[segment];
if (!etape || !cfg) { console.error("Usage : sourcing.mjs <registre|enrichir|verifier> <securite|btp|formation|restaurants> [max]"); process.exit(1); }
mkdirSync("sourcing", { recursive: true });
const fichier = `sourcing/${segment}.csv`;
const COLS = ["id", "raison_sociale", "siren", "naf", "tranche_effectif", "code_postal", "ville", "departement", "civilite", "prenom", "nom", "qualite", "telephone", "site_web", "email", "type_email", "email_statut", "source"];

// ── CSV (point-virgule, UTF-8 BOM pour Excel FR) ─────────────────────────────
const lire = () => {
  if (!existsSync(fichier)) return [];
  const lignes = readFileSync(fichier, "utf8").replace(/^﻿/, "").split(/\r?\n/).filter(Boolean);
  const cols = lignes.shift().split(";");
  return lignes.map((l) => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v.replace(/^"|"$/g, "").replace(/""/g, '"')])));
};
const ecrire = (rows) => {
  const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  writeFileSync(fichier, "﻿" + [COLS.join(";"), ...rows.map((r) => COLS.map((c) => q(r[c])).join(";"))].join("\n"));
};
const dodo = (ms) => new Promise((r) => setTimeout(r, ms));
const titre = (s) => String(s ?? "").toLowerCase().replace(/(^|[\s\-'])([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase());

// ── Étape 1 : registre national ──────────────────────────────────────────────
async function registre() {
  const max = Number(maxArg ?? 400);
  const existants = lire(); const vus = new Set(existants.map((r) => r.siren));
  const rows = [...existants]; let n = rows.length;
  for (const naf of cfg.naf) {
    for (const dep of cfg.departements) {
      let page = 1;
      while (rows.length < max) {
        const url = `https://recherche-entreprises.api.gouv.fr/search?activite_principale=${naf}&departement=${dep}&tranche_effectif_salarie=${cfg.effectifs.join(",")}&etat_administratif=A&per_page=25&page=${page}`;
        const res = await fetch(url);
        if (res.status === 429) { await dodo(2000); continue; }
        if (!res.ok) { console.error(`registre ${res.status} ${url}`); break; }
        const json = await res.json();
        for (const e of json.results ?? []) {
          if (vus.has(e.siren)) continue;
          // uniquement les sociétés (pas les auto-entrepreneurs : nature juridique 1000)
          if (e.nature_juridique === "1000") continue;
          const d = (e.dirigeants ?? []).find((x) => x.type_dirigeant === "personne physique") ?? {};
          const siege = e.siege ?? {};
          vus.add(e.siren); n += 1;
          rows.push({
            id: `${cfg.prefixe}-${String(n).padStart(4, "0")}`,
            raison_sociale: titre(e.nom_commercial || e.nom_raison_sociale || e.nom_complet), siren: e.siren, naf,
            tranche_effectif: e.tranche_effectif_salarie ?? "NN", code_postal: siege.code_postal ?? "", ville: titre(siege.libelle_commune ?? ""),
            departement: dep, civilite: "", prenom: titre((d.prenoms ?? "").split(/[\s,]/)[0]), nom: (d.nom ?? "").toUpperCase(),
            qualite: titre(d.qualite ?? ""), telephone: "", site_web: "", email: "", type_email: "", email_statut: "", source: "registre",
          });
        }
        if (!json.results?.length || page >= (json.total_pages ?? 1) || page >= 400) break;
        page += 1; await dodo(200); // 7 req/s max côté API
      }
      if (rows.length >= max) break;
    }
    if (rows.length >= max) break;
  }
  ecrire(rows);
  console.log(`${rows.length} entreprises → ${fichier}`);
}

// ── Étape 2 : Google Places (téléphone, site) + e-mail sur le site ───────────
async function enrichir() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) { console.error("GOOGLE_PLACES_API_KEY manquante dans .env.local"); process.exit(1); }
  const rows = lire(); let fait = 0;
  for (const r of rows) {
    if (r.site_web || r.telephone) continue; // déjà enrichi
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri" },
        body: JSON.stringify({ textQuery: cfg.requetePlaces(r), languageCode: "fr", regionCode: "FR", maxResultCount: 1 }),
      });
      const p = (await res.json()).places?.[0];
      if (p && (p.formattedAddress ?? "").includes(r.code_postal)) {
        r.telephone = p.nationalPhoneNumber ?? ""; r.site_web = (p.websiteUri ?? "").replace(/\/$/, "");
      } else { r.telephone = r.telephone || "-"; }
    } catch (e) { console.error(r.id, "places", e.message); }
    if (r.site_web && !r.email) r.email = await emailDepuisSite(r.site_web);
    if (r.email) r.type_email = /^(contact|info|accueil|secretariat|devis|compta|administration|bonjour|hello)@/i.test(r.email) ? "Générique" : "Nominatif";
    fait += 1; if (fait % 20 === 0) { ecrire(rows); console.log(`${fait} enrichis…`); }
    await dodo(150);
  }
  ecrire(rows);
  console.log(`terminé : ${rows.filter((r) => r.email).length} e-mails, ${rows.filter((r) => r.telephone && r.telephone !== "-").length} téléphones sur ${rows.length}`);
}
async function emailDepuisSite(site) {
  const pages = ["", "/contact", "/contactez-nous", "/mentions-legales", "/nous-contacter", "/a-propos"];
  const exclus = /(example|sentry|wixpress|google|png|jpg|gif|svg|webp)/i;
  for (const p of pages) {
    try {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(site + p, { signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0 (compatible; SenaConsulting-sourcing/1.0)" } });
      clearTimeout(t);
      if (!res.ok) continue;
      const html = (await res.text()).replace(/\[at\]|\(at\)/gi, "@").replace(/\s*\[dot\]\s*/gi, ".");
      const trouves = [...new Set((html.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) ?? []).filter((m) => !exclus.test(m)))];
      if (trouves.length) {
        const dom = site.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
        return (trouves.find((m) => m.endsWith("@" + dom)) ?? trouves.find((m) => !/gmail|hotmail|orange|wanadoo|free\.fr|yahoo|outlook/i.test(m)) ?? trouves[0]).toLowerCase();
      }
    } catch { /* site injoignable : on passe */ }
  }
  return "";
}

// ── Étape 3 : NeverBounce ────────────────────────────────────────────────────
async function verifier() {
  const key = process.env.NEVERBOUNCE_API_KEY;
  if (!key) { console.error("NEVERBOUNCE_API_KEY manquante dans .env.local"); process.exit(1); }
  const rows = lire(); let fait = 0;
  for (const r of rows) {
    if (!r.email || r.email_statut) continue;
    try {
      const res = await fetch(`https://api.neverbounce.com/v4/single/check?key=${key}&email=${encodeURIComponent(r.email)}`);
      const j = await res.json();
      r.email_statut = j.result ?? j.status ?? "erreur"; // valid | invalid | disposable | catchall | unknown
    } catch (e) { r.email_statut = "erreur"; }
    fait += 1; if (fait % 25 === 0) { ecrire(rows); console.log(`${fait} vérifiés…`); }
    await dodo(100);
  }
  ecrire(rows);
  const c = (s) => rows.filter((r) => r.email_statut === s).length;
  console.log(`valid ${c("valid")} · catchall ${c("catchall")} · invalid ${c("invalid")} · unknown ${c("unknown")} — seuls les « valid » sont importés dans la liste de chasse.`);
}

await ({ registre, enrichir, verifier })[etape]?.() ?? (console.error("Étape inconnue"), process.exit(1));
