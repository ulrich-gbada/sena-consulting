// app/lib/restauration.ts
// -----------------------------------------------------------------------------
// Branche « Restauration » du formulaire d'audit (pré-diagnostic Bilan
// Commissions · Restauration · Express 72 h). Offre validée le 29/09/2026 :
// plaquette PLAQUETTE_BILAN_COMMISSIONS_RESTAURATION + cas concret Pizzeria
// Il Forno. Questions et score : SPECS_FORMULAIRE_AUDIT_BRANCHE_RESTAURATION_v1.0.
// Socle commun : app/lib/branche.ts.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, type Etiquette } from "./branche";

export const SECTEUR_RESTAURATION = "Restauration"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const OFFRE_RESTAURATION = "bilan-commissions-restauration";

const independant = (r: Reponses) => r.typeResto === "independant" || r.typeResto === "darkKitchen" || r.typeResto === "autre";
const livre = (r: Reponses) => independant(r) && r.livraison === "oui";

const NOTE_FRANCHISE = "Le Bilan Commissions · Restauration concerne les restaurants indépendants : en franchise ou en chaîne, les conditions des plateformes sont le plus souvent négociées par l'enseigne. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.";
const NOTE_SANS_LIVRAISON = "Le Bilan Commissions · Restauration concerne les restaurants livrés par Uber Eats, Deliveroo ou une autre plateforme. Continuez : l'audit gratuit porte sur toute votre activité.";

export const ATTENTES_RESTAURATION = [
  "Payer moins de commissions aux plateformes de livraison",
  "Développer la commande directe (click & collect, téléphone)",
];

/** Score de priorité sur 10 (null hors cible). CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2. */
export function scoreRestauration(r: Reponses): { points: number | null; etiquette: Etiquette } {
  if (!livre(r)) return { points: null, etiquette: "HORS CIBLE" };
  let p = r.partLivraison === "gt40" ? 3 : r.partLivraison === "25-40" ? 2 : r.partLivraison === "10-25" || r.partLivraison === "nsp" ? 1 : 0;
  p += r.formule === "premium" ? 2 : r.formule === "plus" || r.formule === "nsp" ? 1 : 0;
  p += r.carteLivraison === "memes" ? 2 : r.carteLivraison === "nsp" ? 1 : 0;
  p += r.promotions === "oui" ? 1 : 0;
  p += r.remboursements === "jamais" ? 1 : 0;
  p += r.direct === "non" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

export const BRANCHE_RESTAURATION: Branche = {
  id: "restauration",
  secteur: SECTEUR_RESTAURATION,
  offre: OFFRE_RESTAURATION,
  nomOffre: "Bilan Commissions · Restauration",
  intro: "Quelques questions sur votre restaurant. Un clic par question, 1 minute en tout.",
  champs: [
    { cle: "typeResto", question: "Quel est votre établissement ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [
        ["independant", "Restaurant indépendant"],
        ["darkKitchen", "Cuisine dédiée à la livraison (dark kitchen)"],
        ["franchise", "Restaurant franchisé ou de chaîne"],
        ["autre", "Traiteur, food truck, autre"],
      ],
      note: (r) => (r.typeResto === "franchise" ? NOTE_FRANCHISE : null) },
    { cle: "livraison", question: "Vendez-vous via Uber Eats, Deliveroo ou une autre plateforme de livraison ?", controle: "radio", obligatoire: true, visible: independant,
      options: [["oui", "Oui"], ["non", "Non"]],
      note: (r) => (independant(r) && r.livraison === "non" ? NOTE_SANS_LIVRAISON : null) },
    { cle: "partLivraison", question: "Part de votre chiffre d'affaires réalisée via les plateformes", controle: "radio", obligatoire: true, visible: livre,
      options: [["lt10", "Moins de 10 %"], ["10-25", "10 à 25 %"], ["25-40", "25 à 40 %"], ["gt40", "Plus de 40 %"], ["nsp", "Je ne sais pas"]] },
    { cle: "formule", question: "Votre formule Uber Eats (ou équivalent chez Deliveroo)", controle: "radio", obligatoire: true, visible: livre,
      options: [["premium", "Premium (30 % de commission)"], ["plus", "Plus (25 %)"], ["lite", "Lite (15 %, sans livraison par la plateforme)"], ["nsp", "Je ne sais pas"]] },
    { cle: "carteLivraison", question: "Vos prix en livraison, par rapport à vos prix en salle", controle: "radio", obligatoire: true, visible: livre,
      options: [["memes", "Les mêmes prix"], ["plusChers", "Plus chers en livraison"], ["nsp", "Je ne sais pas"]] },
    { cle: "promotions", question: "Participez-vous aux promotions cofinancées (offres, remises, livraison offerte) ?", controle: "radio", obligatoire: true, visible: livre,
      options: [["oui", "Oui"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
    { cle: "remboursements", question: "Contestez-vous les remboursements clients déduits par les plateformes ?", controle: "radio", obligatoire: true, visible: livre,
      options: [["jamais", "Non, jamais"], ["parfois", "Parfois"], ["oui", "Oui, systématiquement"], ["nsp", "Je ne sais pas qu'on peut le faire"]] },
    { cle: "direct", question: "Proposez-vous la commande directe (click & collect, site, téléphone) ?", controle: "radio", obligatoire: true, visible: livre,
      options: [["oui", "Oui"], ["non", "Non"]] },
    { cle: "commandes", question: "Commandes en livraison par semaine, à peu près", controle: "radio", obligatoire: false, visible: livre,
      options: [["lt50", "Moins de 50"], ["50-150", "50 à 150"], ["150-400", "150 à 400"], ["gt400", "Plus de 400"]] },
  ],
  fichier: { libelle: "Un relevé de versement Uber Eats ou Deliveroo (photo ou PDF) — facultatif", visible: livre },
  attentes: ATTENTES_RESTAURATION,
  score: scoreRestauration,
  cible: livre,
  aMain: [
    "votre dernier relevé de versement Uber Eats ou Deliveroo ;",
    "votre part de chiffre d'affaires en livraison, ou à défaut votre nombre de commandes par semaine ;",
    "vos prix en salle et en livraison pour vos cinq plats les plus vendus.",
  ],
  mailInterne: { titre: "Restaurant", objet: "Pré-diagnostic restauration", erreur: "Informations sur le restaurant incomplètes." },
  rdv: {
    texte: "Merci {prenom}. Réservez maintenant votre pré-diagnostic : 20 minutes au téléphone avec Ulrich. À la fin de l'appel, vous saurez si le {offre} vaut le coup pour vous.",
    bouton: "📅 Réserver mon pré-diagnostic (20 min)",
  },
};
