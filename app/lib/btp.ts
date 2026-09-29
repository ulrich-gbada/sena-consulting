// app/lib/btp.ts
// -----------------------------------------------------------------------------
// Branche « BTP » du formulaire d'audit (pré-diagnostic Plan Argent Dormant).
// SPECS_LANDING_ET_BRANCHE_BTP_v1.0 §2 et §3 : cinq questions, score sur 10,
// pas de pièce jointe (les exports passent par e-mail après commande),
// HORS CIBLE (50 salariés et plus) sans lien Calendly.
// Socle commun : app/lib/branche.ts.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, type Etiquette } from "./branche";

export const SECTEUR_BTP = "BTP"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const OFFRE_ARGENT_DORMANT = "plan-argent-dormant";

const cible = (r: Reponses) => r.salaries !== "" && r.salaries !== "50+";

const NOTE_50 = "Le Plan Argent Dormant est conçu pour les entreprises de moins de 50 salariés. Continuez : nous revenons vers vous sous 48 heures ouvrées pour voir ce qui est pertinent pour vous.";

export const ATTENTES_BTP = [
  "Encaisser plus vite ce qui m'est dû (factures, retenues, situations)",
  "Relancer mes devis sans y passer mes soirées",
];

/** Score de priorité sur 10 (null hors cible). CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2. */
export function scoreBtp(r: Reponses): { points: number | null; etiquette: Etiquette } {
  if (!cible(r)) return { points: null, etiquette: "HORS CIBLE" };
  let p = r.salaries === "6-19" || r.salaries === "20-49" ? 2 : r.salaries === "3-5" ? 1 : 0;
  p += r.clients === "pros" || r.clients === "mixte" ? 2 : r.clients === "particuliers" ? 1 : 0;
  p += r.retards === "20-50k" || r.retards === "gt50k" ? 2 : r.retards === "5-20k" ? 1 : 0;
  p += r.retenues === "nonRecuperees" ? 2 : r.retenues === "nsp" ? 1 : 0;
  p += r.devis === "gt15" ? 2 : r.devis === "5-15" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

export const BRANCHE_BTP: Branche = {
  id: "btp",
  secteur: SECTEUR_BTP,
  offre: OFFRE_ARGENT_DORMANT,
  nomOffre: "Plan Argent Dormant",
  intro: "Quelques questions sur votre entreprise. Un clic par question, 1 minute en tout.",
  champs: [
    { cle: "salaries", question: "Combien de salariés compte votre entreprise ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [["1-2", "1 à 2"], ["3-5", "3 à 5"], ["6-19", "6 à 19"], ["20-49", "20 à 49"], ["50+", "50 et plus"]],
      note: (r) => (r.salaries === "50+" ? NOTE_50 : null) },
    { cle: "clients", question: "Vos clients sont surtout…", controle: "radio", obligatoire: true, visible: cible,
      options: [["pros", "Des professionnels (entreprises générales, promoteurs, syndics)"], ["mixte", "Un mélange de professionnels et de particuliers"], ["particuliers", "Des particuliers"]] },
    { cle: "retards", question: "Aujourd'hui, vos clients vous doivent en retard, à peu près…", controle: "radio", obligatoire: true, visible: cible,
      options: [["lt5k", "Moins de 5 000 €"], ["5-20k", "5 000 à 20 000 €"], ["20-50k", "20 000 à 50 000 €"], ["gt50k", "Plus de 50 000 €"]] },
    { cle: "retenues", question: "Les retenues de garantie de vos chantiers réceptionnés il y a plus d'un an…", controle: "radio", obligatoire: true, visible: cible,
      options: [["aucune", "Je n'en ai pas"], ["recuperees", "Elles sont récupérées"], ["nsp", "Je ne sais pas"], ["nonRecuperees", "Elles ne sont pas récupérées"]] },
    { cle: "devis", question: "Combien de devis restent sans réponse chaque mois ?", controle: "radio", obligatoire: true, visible: cible,
      options: [["lt5", "Moins de 5"], ["5-15", "5 à 15"], ["gt15", "Plus de 15"]] },
  ],
  fichier: null,
  attentes: ATTENTES_BTP,
  score: scoreBtp,
  cible,
  aMain: [
    "une idée du montant de vos factures en retard ;",
    "vos chantiers réceptionnés depuis plus d'un an avec une retenue de garantie ;",
    "rien d'autre : aucun fichier à envoyer à ce stade.",
  ],
  mailInterne: { titre: "Entreprise", objet: "Pré-diagnostic BTP", erreur: "Informations sur l'entreprise incomplètes." },
  horsCible: {
    mail: "Merci pour votre demande. Notre offre est conçue pour les entreprises de moins de 50 salariés ; nous revenons vers vous sous 48 heures ouvrées pour voir ce qui est pertinent pour vous.",
    rdv: "Merci {prenom}. Notre offre est conçue pour les entreprises de moins de 50 salariés : nous revenons vers vous sous 48 heures ouvrées pour voir ce qui est pertinent pour vous.",
  },
  rdv: {
    texte: "Merci {prenom}. Réservez maintenant votre pré-diagnostic : 20 minutes au téléphone avec Ulrich. À la fin de l'appel, vous saurez si le {offre} vaut le coup pour vous.",
    bouton: "📅 Réserver mon pré-diagnostic (20 min)",
  },
};
