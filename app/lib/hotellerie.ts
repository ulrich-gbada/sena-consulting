// app/lib/hotellerie.ts
// -----------------------------------------------------------------------------
// Branche « Hôtellerie / Tourisme » du formulaire d'audit.
// Deux sous-offres selon la question 1 (typeEtab) :
//   - Bilan Commissions (hôtels indépendants, 10 chambres et plus) —
//     SPECS_LANDING_ET_BRANCHE_HOTELLERIE_v1.0 ;
//   - Bilan Commissions · Activités (opérateurs de visites, activités,
//     excursions) — SPECS_AVENANT_TOURISME_ACTIVITES_v1.0.
// « Restaurant uniquement » : étiquette RESTAURATION, pas de score, renvoi vers
// le secteur « Restauration » (branche app/lib/restauration.ts).
// Socle commun : app/lib/branche.ts.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, type Etiquette } from "./branche";

export const SECTEUR_HOTELLERIE = "Hôtellerie / Tourisme"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const OFFRE_COMMISSIONS = "bilan-commissions";
export const OFFRE_ACTIVITES = "bilan-commissions-activites";

/** Hôtel ou hébergement (hors chaîne) : questions et score « hôtellerie ». */
export const estHotel = (r: Reponses) => r.typeEtab === "hotelIndep" || r.typeEtab === "reseau" || r.typeEtab === "autreHeb";
/** Opérateur d'activités : questions et score « activités » (avenant Tourisme). */
export const estActivite = (r: Reponses) => r.typeEtab === "activite";
/** Opérateur de 1 000 participants et plus : questions A4 à A9 et pièce jointe (moins de 1 000 → HORS CIBLE, questions suivantes masquées). */
const activite1000 = (r: Reponses) => estActivite(r) && r.participants !== "" && r.participants !== "lt1000";
export const estRestaurant = (r: Reponses) => r.typeEtab === "restaurant";
/** Hôtel de 10 chambres et plus : questions 3 à 7 et pièce jointe (moins de 10 → HORS CIBLE, questions suivantes masquées). */
const hotel10 = (r: Reponses) => estHotel(r) && r.chambres !== "" && r.chambres !== "lt10";

const NOTE_CHAINE = "Le Bilan Commissions concerne les hôtels indépendants. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.";
const NOTE_RESTAURANT = "Les restaurants ont leur propre offre : le Bilan Commissions · Restauration (Uber Eats, Deliveroo). Revenez à l'étape précédente et choisissez le secteur « Restauration », ou continuez : l'audit gratuit porte sur toute votre activité.";
const NOTE_LT10 = "Le Bilan Commissions concerne les établissements de 10 chambres et plus. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.";
const NOTE_LT1000 = "Le Bilan Commissions · Activités concerne les opérateurs de 1 000 participants et plus par an. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.";

export const ATTENTES_HOTELLERIE = [
  "Payer moins de commissions aux plateformes",
  "Développer les réservations directes",
];
export const ATTENTES_ACTIVITES = [
  "Payer moins de commissions aux plateformes",
  "Vendre des bons cadeaux en direct",
];

/** Score de priorité sur 10 (null hors cible). CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2. */
export function scoreHotellerie(r: Reponses): { points: number | null; etiquette: Etiquette } {
  if (r.typeEtab === "chaine") return { points: null, etiquette: "HORS CIBLE" };
  if (estRestaurant(r)) return { points: null, etiquette: "RESTAURATION" };
  if (estActivite(r)) {
    if (r.participants === "lt1000") return { points: null, etiquette: "HORS CIBLE" };
    let p = r.participants === "3000-8000" || r.participants === "8000-20000" ? 2 : r.participants === "1000-3000" || r.participants === "gt20000" ? 1 : 0;
    p += r.partOtaAct === "gt65" ? 3 : r.partOtaAct === "40-65" ? 2 : r.partOtaAct === "20-40" || r.partOtaAct === "nsp" ? 1 : 0;
    p += r.bonsCadeaux === "non" ? 2 : 0;
    p += r.googleAct === "non" || r.googleAct === "nsp" ? 1 : 0;
    p += r.prixSiteAct === "oui" || r.prixSiteAct === "pasDeSite" || r.prixSiteAct === "nsp" ? 1 : 0;
    p += r.groupes === "non" ? 1 : 0;
    return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
  }
  if (!estHotel(r) || r.chambres === "lt10") return { points: null, etiquette: "HORS CIBLE" };
  let p = r.chambres === "31-60" || r.chambres === "61-120" ? 2 : r.chambres === "10-30" ? 1 : 0;
  p += r.partOta === "gt65" ? 3 : r.partOta === "45-65" ? 2 : r.partOta === "25-45" || r.partOta === "nsp" ? 1 : 0;
  p += r.genius === "oui" ? 1 : 0;
  p += r.prixSite === "oui" || r.prixSite === "pasDeSite" ? 2 : r.prixSite === "nsp" ? 1 : 0;
  p += r.google === "non" || r.google === "nsp" ? 1 : 0;
  p += r.entreprises === "oui" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

const cibleHotel = hotel10;
const cibleActivite = activite1000;

const A_MAIN_HOTEL = [
  "votre dernier relevé de commissions Booking.com (extranet, rubrique Finances) ;",
  "votre taux d'occupation et votre prix moyen de l'an dernier ;",
  "la répartition de vos ventes par canal, si votre logiciel de gestion la donne.",
];
const A_MAIN_ACTIVITES = [
  "votre dernier relevé de paiement GetYourGuide ou Viator ;",
  "votre nombre de participants et votre prix moyen sur 12 mois ;",
  "la part de vos ventes faites sur votre site, si votre logiciel de réservation la donne.",
];

export const BRANCHE_HOTELLERIE: Branche = {
  id: "hotellerie",
  secteur: SECTEUR_HOTELLERIE,
  offre: OFFRE_COMMISSIONS,
  nomOffre: "Bilan Commissions",
  intro: "Quelques questions sur votre établissement. Un clic par question, 1 minute en tout.",
  champs: [
    { cle: "typeEtab", question: "Quel est votre établissement ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [
        ["hotelIndep", "Hôtel indépendant"],
        ["activite", "Activités, visites, excursions (opérateur)"],
        ["reseau", "Hôtel en réseau volontaire (Logis, Best Western, Contact Hôtels…)"],
        ["chaine", "Hôtel de chaîne ou franchisé"],
        ["autreHeb", "Autre hébergement (résidence, chambres d'hôtes, camping)"],
        ["restaurant", "Restaurant uniquement"],
      ],
      note: (r) => (r.typeEtab === "chaine" ? NOTE_CHAINE : estRestaurant(r) ? NOTE_RESTAURANT : null) },
    // ── Hôtels et hébergements (SPECS Hôtellerie §3) ──
    { cle: "chambres", question: "Nombre de chambres ou d'unités", controle: "radio", obligatoire: true, visible: estHotel,
      options: [["lt10", "Moins de 10"], ["10-30", "10 à 30"], ["31-60", "31 à 60"], ["61-120", "61 à 120"], ["gt120", "Plus de 120"]],
      note: (r) => (r.chambres === "lt10" ? NOTE_LT10 : null) },
    { cle: "partOta", question: "Part de vos réservations via Booking.com, Expedia et autres plateformes", controle: "radio", obligatoire: true, visible: hotel10,
      options: [["lt25", "Moins de 25 %"], ["25-45", "25 à 45 %"], ["45-65", "45 à 65 %"], ["gt65", "Plus de 65 %"], ["nsp", "Je ne sais pas"]] },
    { cle: "genius", question: "Participez-vous au programme Genius de Booking.com ?", controle: "radio", obligatoire: true, visible: hotel10,
      options: [["oui", "Oui"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
    { cle: "prixSite", question: "Votre site est-il parfois plus cher que Booking.com ?", controle: "radio", obligatoire: true, visible: hotel10,
      options: [["oui", "Oui"], ["non", "Non"], ["pasDeSite", "Mon site ne permet pas de réserver en ligne"], ["nsp", "Je ne sais pas"]] },
    { cle: "google", question: "Un client peut-il réserver depuis Google (liens de réservation) ?", controle: "radio", obligatoire: true, visible: hotel10,
      options: [["oui", "Oui"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
    { cle: "entreprises", question: "Des entreprises vous envoient-elles régulièrement des clients ?", controle: "radio", obligatoire: false, visible: hotel10,
      options: [["oui", "Oui"], ["non", "Non"]] },
    // ── Opérateurs d'activités (avenant Tourisme §3) ──
    { cle: "categorie", question: "Votre activité principale", controle: "radio", obligatoire: true, visible: estActivite,
      options: [["visite", "Visites guidées"], ["vehicule", "Vélo, trottinette, véhicule"], ["food", "Food tour, dégustation"], ["bateau", "Croisière, bateau"], ["atelier", "Atelier (cuisine, parfum…)"], ["excursion", "Excursion à la journée"], ["autre", "Autre"]] },
    { cle: "participants", question: "Participants sur 12 mois", controle: "radio", obligatoire: true, visible: estActivite,
      options: [["lt1000", "Moins de 1 000"], ["1000-3000", "1 000 à 3 000"], ["3000-8000", "3 000 à 8 000"], ["8000-20000", "8 000 à 20 000"], ["gt20000", "Plus de 20 000"]],
      note: (r) => (r.participants === "lt1000" ? NOTE_LT1000 : null) },
    { cle: "partOtaAct", question: "Part de vos participants via GetYourGuide, Viator et autres plateformes", controle: "radio", obligatoire: true, visible: activite1000,
      options: [["lt20", "Moins de 20 %"], ["20-40", "20 à 40 %"], ["40-65", "40 à 65 %"], ["gt65", "Plus de 65 %"], ["nsp", "Je ne sais pas"]] },
    { cle: "bonsCadeaux", question: "Vendez-vous des bons cadeaux sur votre site ?", controle: "radio", obligatoire: true, visible: activite1000,
      options: [["oui", "Oui"], ["non", "Non"]] },
    { cle: "googleAct", question: "Peut-on vous réserver directement depuis Google ?", controle: "radio", obligatoire: true, visible: activite1000,
      options: [["oui", "Oui"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
    { cle: "prixSiteAct", question: "Votre site est-il parfois plus cher que la plateforme ?", controle: "radio", obligatoire: true, visible: activite1000,
      options: [["oui", "Oui"], ["non", "Non"], ["pasDeSite", "Mon site ne permet pas de réserver en ligne"], ["nsp", "Je ne sais pas"]] },
    { cle: "groupes", question: "Vendez-vous à des entreprises ou des groupes ?", controle: "radio", obligatoire: false, visible: activite1000,
      options: [["oui", "Oui"], ["non", "Non"]] },
  ],
  fichier: {
    libelle: "Un relevé de commissions ou de paiement de plateforme (photo ou PDF) — facultatif",
    visible: (r) => hotel10(r) || activite1000(r),
  },
  attentes: [...new Set([...ATTENTES_HOTELLERIE, ...ATTENTES_ACTIVITES])],
  attentesVisibles: (r) => (estActivite(r) ? ATTENTES_ACTIVITES : ATTENTES_HOTELLERIE),
  score: scoreHotellerie,
  cible: (r) => cibleHotel(r) || cibleActivite(r),
  aMain: A_MAIN_HOTEL,
  mailInterne: { titre: "Établissement", objet: "Pré-diagnostic hôtellerie", erreur: "Informations sur l'établissement incomplètes." },
  sousOffres: [
    { offre: OFFRE_COMMISSIONS, nomOffre: "Bilan Commissions", concerne: estHotel, cible: cibleHotel, activite: {}, aMain: A_MAIN_HOTEL },
    { offre: OFFRE_ACTIVITES, nomOffre: "Bilan Commissions · Activités", concerne: estActivite, cible: cibleActivite, activite: { typeEtab: "activite" }, aMain: A_MAIN_ACTIVITES,
      mailInterne: { titre: "Opérateur", objet: "Pré-diagnostic activités" },
      complement: (r) => (r.bonsCadeaux === "non" ? "Et si vous ne vendez pas encore de bons cadeaux en ligne, on en parlera en premier : Noël approche." : null) },
  ],
  rdv: {
    texte: "Merci {prenom}. Réservez maintenant votre pré-diagnostic : 20 minutes au téléphone avec Ulrich. À la fin de l'appel, vous saurez si le {offre} vaut le coup pour vous.",
    bouton: "📅 Réserver mon pré-diagnostic (20 min)",
  },
};
