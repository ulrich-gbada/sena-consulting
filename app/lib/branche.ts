// app/lib/branche.ts
// -----------------------------------------------------------------------------
// Socle commun des branches « Activité » du formulaire d'audit.
// Une branche = un secteur du formulaire pour lequel une offre est construite
// et validée (plaquette + exemple concret publié dans /realisations) :
// quelques questions qualifiantes, un score de priorité, des mails adaptés.
// Module PARTAGÉ (client + serveur). Aucune dépendance.
// -----------------------------------------------------------------------------

export type Reponses = Record<string, string>;
export type Etiquette = "CHAUD" | "TIÈDE" | "FROID" | "LIBRE CHOIX" | "HORS CIBLE";

export const COULEUR_ETIQUETTE: Record<Etiquette, string> = {
  CHAUD: "#9B2F4D", "TIÈDE": "#D98E04", FROID: "#8A9BB0", "LIBRE CHOIX": "#1F5FA8", "HORS CIBLE": "#8A9BB0",
};

export type Option = readonly [string, string]; // [valeur envoyée, libellé affiché]

export type ChampDef = {
  cle: string;
  question: string;
  controle: "radio" | "select" | "texte";
  options?: ReadonlyArray<Option>;          // radio et select
  placeholder?: string;                      // texte
  maxLength?: number;                        // texte (80 par défaut)
  obligatoire: boolean;                      // si visible
  visible: (r: Reponses) => boolean;
  note?: (r: Reponses) => string | null;     // message affiché sous la question
};

export type Branche = {
  id: string;                                // clé technique (payload, état)
  secteur: string;                           // libellé exact de FORM_SECTEURS
  offre: string;                             // valeur de ?offre= et utm_campaign
  nomOffre: string;                          // « Bilan Agréments », « Bilan Financements »
  intro: string;                             // paragraphe d'introduction de l'étape
  champs: ChampDef[];                        // ordre d'affichage
  fichier: { libelle: string; visible: (r: Reponses) => boolean } | null;
  attentes: string[];                        // attentes ajoutées en tête de liste
  score: (r: Reponses) => { points: number | null; etiquette: Etiquette };
  cible: (r: Reponses) => boolean;           // profil visé par l'offre (bloc « ayez sous la main »)
  aMain: string[];                           // puces du bloc « ayez sous la main »
  mailInterne: { titre: string; objet: string; erreur: string }; // titre de section, préfixe d'objet, message 400
  rdv: { texte: string; bouton: string };    // étape RDV côté formulaire ({prenom} remplacé)
  /** Sous-offres d'une même branche (ex. carrosserie : Bilan Agréments / Plan Libre Choix), selon les réponses.
   *  Absent : la branche ne porte qu'une offre (offre, nomOffre, aMain, cible ci-dessus). */
  sousOffres?: SousOffre[];
};

export type SousOffre = {
  offre: string;                             // slug (?offre=, utm_campaign)
  nomOffre: string;
  activite?: Reponses;                       // réponses préremplies quand ?offre=<slug> est utilisé
  concerne: (r: Reponses) => boolean;        // l'offre s'applique à ces réponses
  aMain: string[];
};

/** Offre effectivement visée par un jeu de réponses : sous-offre concernée, sinon l'offre principale de la branche. */
export function offreDe(b: Branche, r: Reponses | null): { offre: string; nomOffre: string; aMain: string[]; cible: boolean } {
  if (r && b.sousOffres) {
    const so = b.sousOffres.find((o) => o.concerne(r));
    if (so) return { offre: so.offre, nomOffre: so.nomOffre, aMain: so.aMain, cible: true };
  }
  return { offre: b.offre, nomOffre: b.nomOffre, aMain: b.aMain, cible: Boolean(r && b.cible(r)) };
}

export const vide = (b: Branche): Reponses =>
  Object.fromEntries(b.champs.map((c) => [c.cle, ""]));

/** Remet à "" tout champ devenu invisible. Appelé à chaque changement ET côté serveur. */
export function nettoyer(b: Branche, r: Reponses): Reponses {
  const out: Reponses = { ...vide(b) };
  for (const c of b.champs) {
    const v = typeof r[c.cle] === "string" ? r[c.cle] : "";
    out[c.cle] = c.controle === "texte" ? v.trim().slice(0, c.maxLength ?? 80) : v;
  }
  for (const c of b.champs) if (!c.visible(out)) out[c.cle] = "";
  return out;
}

/** Liste des champs en erreur ; [] = valide. Bouton « Étape suivante » et API. */
export function erreurs(b: Branche, brut: unknown): string[] {
  if (!brut || typeof brut !== "object") return [b.champs[0].cle];
  const x = brut as Record<string, unknown>;
  const errs: string[] = [];
  for (const c of b.champs) {
    const v = x[c.cle];
    if (v === undefined || v === "") continue;
    if (typeof v !== "string") { errs.push(c.cle); continue; }
    if (c.options && !c.options.some(([val]) => val === v)) errs.push(c.cle);
  }
  if (errs.length) return errs;
  const r = nettoyer(b, x as Reponses);
  for (const c of b.champs) if (c.obligatoire && c.visible(r) && !r[c.cle]) errs.push(c.cle);
  return errs;
}

/** Libellé humain d'une réponse (mails). */
export function libelle(b: Branche, cle: string, valeur: string): string {
  const c = b.champs.find((x) => x.cle === cle);
  if (!c || !c.options) return valeur;
  return c.options.find(([v]) => v === valeur)?.[1] ?? "";
}

// ── Pièce jointe (commune à toutes les branches) ─────────────────────────────
export type PieceJointe = { nom: string; type: string; base64: string };
export const PJ_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const PJ_MAX_OCTETS = 3_000_000;   // fichier brut, après compression éventuelle
export const PJ_MAX_BASE64 = 4_100_000;   // longueur de la chaîne base64 acceptée par l'API

export const SOURCE_REGEX = /^[a-z0-9_-]{1,30}$/;
export const CALENDLY_BASE = "https://calendly.com/contact-sena-consulting/audit";

/** Lien Calendly pré-rempli : même fonction côté page (étape RDV) et côté mail prospect. */
export function lienCalendly(o: {
  name?: string; email?: string; company?: string; source?: string; offre?: string;
}): string {
  const p = new URLSearchParams();
  if (o.name) p.set("name", o.name);
  if (o.email) p.set("email", o.email);
  if (o.company) p.set("a1", o.company);
  if (o.source) p.set("utm_source", o.source);
  if (o.offre) p.set("utm_campaign", o.offre);
  const q = p.toString();
  return q ? `${CALENDLY_BASE}?${q}` : CALENDLY_BASE;
}
