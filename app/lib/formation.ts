// app/lib/formation.ts
// -----------------------------------------------------------------------------
// Branche « Formation » du formulaire d'audit (pré-diagnostic Bilan Financements).
// Offre validée : plaquette « Plafonnement CPF » + cas concret Linéa Formation.
// Socle commun : app/lib/branche.ts.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, type Etiquette } from "./branche";

export const SECTEUR_FORMATION = "Organisme de formation"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const OFFRE_FINANCEMENTS = "bilan-financements";

const qualiopi = (r: Reponses) => r.qualiopi === "oui" || r.qualiopi === "enCours";
const cpf = (r: Reponses) => qualiopi(r) && r.cpf === "oui";

const NOTE_NON_QUALIOPI = "Le Bilan Financements concerne les organismes certifiés Qualiopi. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.";
const NOTE_SANS_CPF = "Le Bilan Financements concerne les formations financées par le CPF. Continuez : nous parlerons des autres financements et de la vente aux entreprises.";

export const ATTENTES_FORMATION = [
  "Compenser la baisse des inscriptions CPF",
  "Vendre davantage aux entreprises (cofinancement employeur)",
];

/** Score de priorité sur 10 (null hors Bilan). CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2. */
export function scoreFormation(r: Reponses): { points: number | null; etiquette: Etiquette } {
  if (!qualiopi(r)) return { points: null, etiquette: "HORS CIBLE" };
  if (r.cpf !== "oui") return { points: null, etiquette: "LIBRE CHOIX" };
  let p = r.partCpf === "50-75" || r.partCpf === "gt75" ? 2 : r.partCpf === "25-50" ? 1 : 0;
  p += r.prixMoyen === "2000-3000" || r.prixMoyen === "gt3000" ? 2 : r.prixMoyen === "1500-2000" ? 1 : 0;
  p += r.certifications === "rs" ? 2 : r.certifications === "mixte" || r.certifications === "nsp" ? 1 : 0;
  p += r.inscriptions === "baisseForte" ? 2 : r.inscriptions === "baisseModeree" || r.inscriptions === "nsp" ? 1 : 0;
  p += r.ajustement === "non" ? 2 : r.ajustement === "prix" || r.ajustement === "cofinancement" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

export const BRANCHE_FORMATION: Branche = {
  id: "formation",
  secteur: SECTEUR_FORMATION,
  offre: OFFRE_FINANCEMENTS,
  nomOffre: "Bilan Financements",
  intro: "Quelques questions sur votre organisme. Un clic par question, 1 minute en tout.",
  champs: [
    { cle: "qualiopi", question: "Êtes-vous certifié Qualiopi ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [["oui", "Oui"], ["enCours", "En cours de certification"], ["non", "Non"]],
      note: (r) => (r.qualiopi === "non" ? NOTE_NON_QUALIOPI : null) },
    { cle: "cpf", question: "Proposez-vous des formations financées par le CPF (Mon Compte Formation) ?", controle: "radio", obligatoire: true, visible: qualiopi,
      options: [["oui", "Oui"], ["non", "Non"]],
      note: (r) => (qualiopi(r) && r.cpf === "non" ? NOTE_SANS_CPF : null) },
    { cle: "partCpf", question: "Part de votre chiffre d'affaires financée par le CPF", controle: "radio", obligatoire: true, visible: cpf,
      options: [["lt25", "Moins de 25 %"], ["25-50", "25 à 50 %"], ["50-75", "50 à 75 %"], ["gt75", "Plus de 75 %"]] },
    { cle: "nbFormations", question: "Combien de formations proposez-vous sur Mon Compte Formation ?", controle: "radio", obligatoire: true, visible: cpf,
      options: [["1-3", "1 à 3"], ["4-7", "4 à 7"], ["8-15", "8 à 15"], ["16+", "16 ou plus"]] },
    { cle: "prixMoyen", question: "Prix moyen de vos formations CPF", controle: "radio", obligatoire: true, visible: cpf,
      options: [["lt1500", "Moins de 1 500 €"], ["1500-2000", "1 500 à 2 000 €"], ["2000-3000", "2 000 à 3 000 €"], ["gt3000", "Plus de 3 000 €"]] },
    { cle: "certifications", question: "Vos certifications relèvent surtout…", controle: "radio", obligatoire: true, visible: cpf,
      options: [["rs", "du Répertoire spécifique (langues, bureautique, habilitations…)"], ["rncp", "du RNCP (titres et diplômes)"], ["mixte", "des deux"], ["nsp", "Je ne sais pas"]] },
    { cle: "inscriptions", question: "Vos inscriptions CPF depuis le plafonnement (mars 2026)", controle: "radio", obligatoire: true, visible: cpf,
      options: [["baisseForte", "En forte baisse (plus de 30 %)"], ["baisseModeree", "En baisse modérée"], ["stables", "Stables"], ["hausse", "En hausse"], ["nsp", "Je ne sais pas"]] },
    { cle: "ajustement", question: "Avez-vous déjà réagi au plafonnement ?", controle: "radio", obligatoire: true, visible: cpf,
      options: [["non", "Pas encore"], ["prix", "Oui, j'ai ajusté mes prix"], ["cofinancement", "Oui, je propose un cofinancement employeur"], ["lesDeux", "Oui, les deux"]] },
    { cle: "salaries", question: "Part de vos stagiaires CPF qui sont salariés", controle: "radio", obligatoire: false, visible: cpf,
      options: [["lt25", "Moins de 25 %"], ["25-50", "25 à 50 %"], ["gt50", "Plus de 50 %"], ["nsp", "Je ne sais pas"]] },
  ],
  fichier: { libelle: "Votre catalogue tarifaire ou une fiche formation (photo ou PDF) — facultatif", visible: cpf },
  attentes: ATTENTES_FORMATION,
  score: scoreFormation,
  cible: cpf,
  aMain: [
    "vos prix affichés sur Mon Compte Formation, formation par formation ;",
    "votre nombre de dossiers CPF sur les 12 derniers mois, ou à défaut votre chiffre d'affaires CPF ;",
    "la part de vos stagiaires salariés, si vous la connaissez.",
  ],
  mailInterne: { titre: "Organisme", objet: "Pré-diagnostic formation", erreur: "Informations sur l'organisme incomplètes." },
  rdv: {
    texte: "Merci {prenom}. Réservez maintenant votre pré-diagnostic : 20 minutes au téléphone avec Ulrich. À la fin de l'appel, vous saurez si un Bilan Financements vaut le coup pour vous.",
    bouton: "📅 Réserver mon pré-diagnostic (20 min)",
  },
};
