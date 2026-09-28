// app/lib/carrosserie.ts
// -----------------------------------------------------------------------------
// Branche « Carrosserie » du formulaire d'audit (pré-diagnostic Bilan Agréments).
// Module PARTAGÉ : importé par app/components/ContactForm.tsx,
// app/components/EtapeCarrosserie.tsx et app/api/contact/route.js. Aucune dépendance.
// SPECS v1.0 (26/09/2026) + avenant v1.1 (28/09/2026), annexe A v1.1.
// -----------------------------------------------------------------------------

export const SECTEUR_CARROSSERIE = "Garagiste / Carrossier"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const CALENDLY_BASE = "https://calendly.com/contact-sena-consulting/audit";

export type Carrosserie = {
  carrosserie: "" | "oui" | "non";
  agrement: "" | "direct" | "reseau" | "non";
  reseau: string;
  nbAssureurs: "" | "1" | "2" | "3" | "4+";
  partAssureurs: "" | "lt25" | "25-50" | "50-75" | "gt75";
  compagnons: "" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10+";
  derniereHausse: "" | "2026" | "2025" | "avant2025" | "nsp";
  delaiPaiement: "" | "lt30" | "30-45" | "45-60" | "gt60" | "nsp";
  baremes2027: "" | "oui" | "pasEncore" | "nsp";
};

export type ChampChoix = Exclude<keyof Carrosserie, "reseau">;

export const CARROSSERIE_VIDE: Carrosserie = {
  carrosserie: "", agrement: "", reseau: "", nbAssureurs: "", partAssureurs: "",
  compagnons: "", derniereHausse: "", delaiPaiement: "", baremes2027: "",
};

// Ordre d'affichage = ordre des clés.
export const QUESTIONS: Record<keyof Carrosserie, string> = {
  carrosserie: "Faites-vous de la carrosserie-peinture ?",
  agrement: "Êtes-vous agréé par des assureurs ?",
  reseau: "Nom du réseau ou de l'enseigne",
  nbAssureurs: "Avec combien d'assureurs êtes-vous agréé ?",
  partAssureurs: "Part de votre activité apportée par les assureurs",
  compagnons: "Combien de personnes travaillent en atelier (carrossiers, peintres, préparateurs) ?",
  derniereHausse: "Dernière hausse de votre taux horaire chez vos assureurs",
  delaiPaiement: "Délai moyen de paiement de vos assureurs",
  baremes2027: "Avez-vous reçu les propositions de barèmes 2027 ?",
};

// [valeur envoyée, libellé affiché]
export const OPTIONS: Record<ChampChoix, ReadonlyArray<readonly [string, string]>> = {
  carrosserie: [["oui", "Oui"], ["non", "Non, mécanique uniquement"]],
  agrement: [
    ["direct", "Oui, en direct avec les assureurs"],
    ["reseau", "Oui, via mon réseau ou mon enseigne"],
    ["non", "Non, je ne suis pas agréé"],
  ],
  nbAssureurs: [["1", "1"], ["2", "2"], ["3", "3"], ["4+", "4 ou plus"]],
  partAssureurs: [["lt25", "Moins de 25 %"], ["25-50", "25 à 50 %"], ["50-75", "50 à 75 %"], ["gt75", "Plus de 75 %"]],
  compagnons: [
    ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"],
    ["7", "7"], ["8", "8"], ["9", "9"], ["10+", "10 ou plus"],
  ],
  derniereHausse: [["2026", "En 2026"], ["2025", "En 2025"], ["avant2025", "En 2024 ou avant"], ["nsp", "Je ne sais pas"]],
  delaiPaiement: [
    ["lt30", "Moins de 30 jours"], ["30-45", "30 à 45 jours"], ["45-60", "45 à 60 jours"],
    ["gt60", "Plus de 60 jours"], ["nsp", "Je ne sais pas"],
  ],
  baremes2027: [["oui", "Oui"], ["pasEncore", "Pas encore"], ["nsp", "Je ne sais pas"]],
};

const OBLIGATOIRES: ChampChoix[] = [
  "carrosserie", "agrement", "compagnons", "nbAssureurs", "partAssureurs",
  "derniereHausse", "delaiPaiement", "baremes2027",
];

export const estAgree = (c: Carrosserie) => c.agrement === "direct" || c.agrement === "reseau";

/** Un champ est-il affiché (et donc envoyé) compte tenu des réponses déjà données ? */
export function visible(c: Carrosserie, champ: keyof Carrosserie): boolean {
  switch (champ) {
    case "carrosserie":
      return true;
    case "agrement":
    case "compagnons":
      return c.carrosserie === "oui";
    case "reseau":
      return c.carrosserie === "oui" && c.agrement === "reseau";
    default:
      return c.carrosserie === "oui" && estAgree(c);
  }
}

/** Remet à "" tout champ devenu invisible. Appelé à chaque changement de réponse ET côté serveur. */
export function nettoyer(c: Carrosserie): Carrosserie {
  const out: Carrosserie = { ...c, reseau: (c.reseau ?? "").trim().slice(0, 80) };
  for (const k of Object.keys(QUESTIONS) as (keyof Carrosserie)[]) {
    if (!visible(out, k)) (out as Record<keyof Carrosserie, string>)[k] = "";
  }
  return out;
}

/** Liste des champs en erreur ; [] = valide. Utilisé par le bouton « Étape suivante » et par l'API. */
export function erreursCarrosserie(brut: unknown): string[] {
  if (!brut || typeof brut !== "object") return ["carrosserie"];
  const x = brut as Record<string, unknown>;
  const erreurs: string[] = [];
  for (const k of Object.keys(OPTIONS) as ChampChoix[]) {
    const v = x[k];
    if (v === undefined || v === "") continue;
    if (typeof v !== "string" || !OPTIONS[k].some(([val]) => val === v)) erreurs.push(k);
  }
  if (x.reseau !== undefined && typeof x.reseau !== "string") erreurs.push("reseau");
  if (erreurs.length) return erreurs;
  const c = { ...CARROSSERIE_VIDE, ...(x as Partial<Carrosserie>) };
  for (const k of OBLIGATOIRES) if (visible(c, k) && !c[k]) erreurs.push(k);
  return erreurs;
}

export type Etiquette = "CHAUD" | "TIÈDE" | "FROID" | "LIBRE CHOIX" | "HORS CIBLE";

export const COULEUR_ETIQUETTE: Record<Etiquette, string> = {
  CHAUD: "#9B2F4D", "TIÈDE": "#D98E04", FROID: "#8A9BB0", "LIBRE CHOIX": "#1F5FA8", "HORS CIBLE": "#8A9BB0",
};

/** Score de priorité sur 10 (null hors Bilan). CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2. */
export function scoreCarrosserie(c: Carrosserie): { points: number | null; etiquette: Etiquette } {
  if (c.carrosserie !== "oui") return { points: null, etiquette: "HORS CIBLE" };
  if (!estAgree(c)) return { points: null, etiquette: "LIBRE CHOIX" };
  let p = c.agrement === "direct" ? 2 : 1;
  p += c.nbAssureurs === "2" ? 1 : c.nbAssureurs === "3" || c.nbAssureurs === "4+" ? 2 : 0;
  p += c.partAssureurs === "50-75" || c.partAssureurs === "gt75" ? 1 : 0;
  p += c.compagnons === "" || c.compagnons === "1" || c.compagnons === "2" ? 0 : 1;
  p += c.derniereHausse === "avant2025" ? 2 : c.derniereHausse === "nsp" ? 1 : 0;
  p += c.delaiPaiement === "45-60" || c.delaiPaiement === "gt60" ? 1 : 0;
  p += c.baremes2027 === "oui" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

/** Libellé humain d'une réponse (mails). */
export function libelle(champ: keyof Carrosserie, valeur: string): string {
  if (champ === "reseau") return valeur;
  return OPTIONS[champ].find(([v]) => v === valeur)?.[1] ?? "";
}

// ── Paramètres d'URL, pièce jointe, attentes ────────────────────────────────
export const OFFRE_BILAN = "bilan-agrements";
export const SOURCE_REGEX = /^[a-z0-9_-]{1,30}$/;

export const ATTENTES_CARROSSERIE = [
  "Renégocier mes barèmes assureurs",
  "Attirer plus de clients en direct (hors assureurs)",
];

export type PieceJointe = { nom: string; type: string; base64: string };
export const PJ_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const PJ_MAX_OCTETS = 3_000_000;   // fichier brut, après compression éventuelle
export const PJ_MAX_BASE64 = 4_100_000;   // longueur de la chaîne base64 acceptée par l'API

/** Lien Calendly pré-rempli : même fonction côté page (étape RDV) et côté mail prospect. */
export function lienCalendly(o: {
  name?: string; email?: string; company?: string; source?: string; carrosserie?: boolean;
}): string {
  const p = new URLSearchParams();
  if (o.name) p.set("name", o.name);
  if (o.email) p.set("email", o.email);
  if (o.company) p.set("a1", o.company);
  if (o.source) p.set("utm_source", o.source);
  if (o.carrosserie) p.set("utm_campaign", OFFRE_BILAN);
  const q = p.toString();
  return q ? `${CALENDLY_BASE}?${q}` : CALENDLY_BASE;
}

// ── Cas concret joint au mail de confirmation (SPECS v1.1) ──────────────────
const SITE = "https://www.sena-consulting.fr";
const CAS: Record<"agrements" | "formation" | "audit", { slug: string; phrase: string }> = {
  agrements: { slug: "bilan-agrements-carrosserie-mystere",
    phrase: "Pour voir à quoi ressemble un Bilan, voici un exemple complet sur une carrosserie fictive :" },
  formation: { slug: "bilan-financements-linea-formation",
    phrase: "Pour voir à quoi ressemble un Bilan Financements, voici un exemple complet sur un organisme de formation fictif :" },
  audit: { slug: "audit-strategique-pizzeria-bella-nocta",
    phrase: "Pour voir à quoi ressemble un audit, voici un exemple complet sur une entreprise fictive :" },
};

/**
 * Cas concret à citer dans le mail de confirmation, ou null (aucun lien).
 * - Garagiste / Carrossier : lien UNIQUEMENT si l'atelier fait de la carrosserie et est agréé (direct ou réseau).
 *   Non agréé, mécanique seule ou réponses absentes : null.
 * - Organisme de formation : Bilan Financements.
 * - Tout autre secteur (y compris « Autre : … ») : audit stratégique.
 * `existe` permet de vérifier que le slug est bien publié (getRealisation) ; sinon null.
 */
export function casConcretPour(
  secteur: string,
  c: Carrosserie | null,
  existe: (slug: string) => boolean = () => true,
): { url: string; phrase: string } | null {
  let cle: keyof typeof CAS;
  if (secteur === SECTEUR_CARROSSERIE) {
    if (!c || c.carrosserie !== "oui" || !estAgree(c)) return null;
    cle = "agrements";
  } else if (secteur === "Organisme de formation") {
    cle = "formation";
  } else {
    cle = "audit";
  }
  const { slug, phrase } = CAS[cle];
  if (!existe(slug)) return null;
  const q = new URLSearchParams({ utm_source: "mail_confirmation", utm_medium: "email", utm_campaign: slug });
  return { url: `${SITE}/realisations/${slug}?${q.toString()}`, phrase };
}
