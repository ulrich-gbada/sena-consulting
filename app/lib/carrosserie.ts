// app/lib/carrosserie.ts
// -----------------------------------------------------------------------------
// Branche « Carrosserie » du formulaire d'audit (pré-diagnostic Bilan Agréments).
// SPECS v1.0 (26/09/2026) + avenant v1.1 (28/09/2026) : questions, options,
// règles de visibilité et score identiques à l'annexe A, portés sur le socle
// commun app/lib/branche.ts (généralisation aux autres offres validées).
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, type Etiquette } from "./branche";

export const SECTEUR_CARROSSERIE = "Garagiste / Carrossier"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const OFFRE_BILAN = "bilan-agrements";
export const OFFRE_LIBRE_CHOIX = "plan-libre-choix";

export const estAgree = (r: Reponses) => r.agrement === "direct" || r.agrement === "reseau";
const carrosserie = (r: Reponses) => r.carrosserie === "oui";
const agree = (r: Reponses) => carrosserie(r) && estAgree(r);
export const estLibreChoix = (r: Reponses) => carrosserie(r) && r.agrement === "non";

const NOTE_MECANIQUE = "Le Bilan Agréments concerne la carrosserie. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.";
const NOTE_NON_AGREE = "Pas d'agrément : parlons du Plan Libre Choix. Quelques questions sur les sinistres qui passent chez vous.";

export const ATTENTES_CARROSSERIE = [
  "Renégocier mes barèmes assureurs",
  "Attirer plus de clients en direct (hors assureurs)",
];

/** Score de priorité sur 10 (null hors cible). CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2.
 *  Agréé → Bilan Agréments (SPECS v1.0) ; non agréé → Plan Libre Choix (SPECS Libre Choix v1.0). */
export function scoreCarrosserie(c: Reponses): { points: number | null; etiquette: Etiquette } {
  if (c.carrosserie !== "oui") return { points: null, etiquette: "HORS CIBLE" };
  if (!estAgree(c)) {
    if (c.agrement !== "non") return { points: null, etiquette: "LIBRE CHOIX" };
    let q = c.sinistresMois === "11-20" || c.sinistresMois === "gt20" ? 2 : c.sinistresMois === "5-10" ? 1 : 0;
    q += c.departs === "souvent" ? 2 : c.departs === "parfois" || c.departs === "nsp" ? 1 : 0;
    q += c.cession === "non" ? 2 : c.cession === "parfois" || c.cession === "nsp" ? 1 : 0;
    q += c.ficheGoogle === "aucune" ? 2 : c.ficheGoogle === "peu" ? 1 : 0;
    q += c.prescripteurs === "non" ? 2 : c.prescripteurs === "quelques" ? 1 : 0;
    return { points: q, etiquette: q >= 6 ? "CHAUD" : q >= 3 ? "TIÈDE" : "FROID" };
  }
  let p = c.agrement === "direct" ? 2 : 1;
  p += c.nbAssureurs === "2" ? 1 : c.nbAssureurs === "3" || c.nbAssureurs === "4+" ? 2 : 0;
  p += c.partAssureurs === "50-75" || c.partAssureurs === "gt75" ? 1 : 0;
  p += c.compagnons === "" || c.compagnons === "1" || c.compagnons === "2" ? 0 : 1;
  p += c.derniereHausse === "avant2025" ? 2 : c.derniereHausse === "nsp" ? 1 : 0;
  p += c.delaiPaiement === "45-60" || c.delaiPaiement === "gt60" ? 1 : 0;
  p += c.baremes2027 === "oui" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

export const BRANCHE_CARROSSERIE: Branche = {
  id: "carrosserie",
  secteur: SECTEUR_CARROSSERIE,
  offre: OFFRE_BILAN,
  nomOffre: "Bilan Agréments",
  intro: "Quelques questions sur votre atelier. Un clic par question, 1 minute en tout.",
  champs: [
    { cle: "carrosserie", question: "Faites-vous de la carrosserie-peinture ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [["oui", "Oui"], ["non", "Non, mécanique uniquement"]],
      note: (r) => (r.carrosserie === "non" ? NOTE_MECANIQUE : null) },
    { cle: "agrement", question: "Êtes-vous agréé par des assureurs ?", controle: "radio", obligatoire: true, visible: carrosserie,
      options: [
        ["direct", "Oui, en direct avec les assureurs"],
        ["reseau", "Oui, via mon réseau ou mon enseigne"],
        ["non", "Non, je ne suis pas agréé"],
      ],
      note: (r) => (r.agrement === "non" ? NOTE_NON_AGREE : null) },
    { cle: "reseau", question: "Nom du réseau ou de l'enseigne", controle: "texte", obligatoire: false, maxLength: 80,
      placeholder: "Ex. : nom de votre réseau", visible: (r) => carrosserie(r) && r.agrement === "reseau" },
    { cle: "nbAssureurs", question: "Avec combien d'assureurs êtes-vous agréé ?", controle: "radio", obligatoire: true, visible: agree,
      options: [["1", "1"], ["2", "2"], ["3", "3"], ["4+", "4 ou plus"]] },
    { cle: "partAssureurs", question: "Part de votre activité apportée par les assureurs", controle: "radio", obligatoire: true, visible: agree,
      options: [["lt25", "Moins de 25 %"], ["25-50", "25 à 50 %"], ["50-75", "50 à 75 %"], ["gt75", "Plus de 75 %"]] },
    { cle: "compagnons", question: "Combien de personnes travaillent en atelier (carrossiers, peintres, préparateurs) ?", controle: "select", obligatoire: true, visible: carrosserie,
      options: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10+", "10 ou plus"]] },
    { cle: "derniereHausse", question: "Dernière hausse de votre taux horaire chez vos assureurs", controle: "radio", obligatoire: true, visible: agree,
      options: [["2026", "En 2026"], ["2025", "En 2025"], ["avant2025", "En 2024 ou avant"], ["nsp", "Je ne sais pas"]] },
    { cle: "delaiPaiement", question: "Délai moyen de paiement de vos assureurs", controle: "radio", obligatoire: true, visible: agree,
      options: [["lt30", "Moins de 30 jours"], ["30-45", "30 à 45 jours"], ["45-60", "45 à 60 jours"], ["gt60", "Plus de 60 jours"], ["nsp", "Je ne sais pas"]] },
    { cle: "baremes2027", question: "Avez-vous reçu les propositions de barèmes 2027 ?", controle: "radio", obligatoire: true, visible: agree,
      options: [["oui", "Oui"], ["pasEncore", "Pas encore"], ["nsp", "Je ne sais pas"]] },
    // ── Non agréés : Plan Libre Choix ──
    { cle: "sinistresMois", question: "Combien de sinistres réparez-vous par mois ?", controle: "radio", obligatoire: true, visible: estLibreChoix,
      options: [["lt5", "Moins de 5"], ["5-10", "5 à 10"], ["11-20", "11 à 20"], ["gt20", "Plus de 20"]] },
    { cle: "departs", question: "Des sinistrés vous appellent ou passent, puis repartent chez le garage agréé de leur assurance ?", controle: "radio", obligatoire: true, visible: estLibreChoix,
      options: [["souvent", "Oui, plusieurs fois par mois"], ["parfois", "Parfois"], ["rarement", "Rarement ou jamais"], ["nsp", "Je ne sais pas"]] },
    { cle: "cession", question: "Proposez-vous la cession de créance (le client n'avance pas les frais) ?", controle: "radio", obligatoire: true, visible: estLibreChoix,
      options: [["non", "Non"], ["parfois", "Parfois, à la demande"], ["oui", "Oui, systématiquement"], ["nsp", "Je ne sais pas ce que c'est"]] },
    { cle: "ficheGoogle", question: "Votre fiche Google et vos avis clients", controle: "radio", obligatoire: true, visible: estLibreChoix,
      options: [["active", "Fiche à jour, avis réguliers"], ["peu", "Fiche existante, peu d'avis récents"], ["aucune", "Pas de fiche ou fiche inactive"]] },
    { cle: "prescripteurs", question: "Travaillez-vous avec des apporteurs (dépanneurs, garages mécaniques, auto-écoles, flottes, courtiers) ?", controle: "radio", obligatoire: true, visible: estLibreChoix,
      options: [["non", "Non"], ["quelques", "Quelques-uns, sans suivi"], ["reseau", "Oui, un réseau actif"]] },
    { cle: "refus", question: "Avez-vous eu des factures refusées ou réduites par un assureur depuis 2025 ?", controle: "radio", obligatoire: false, visible: estLibreChoix,
      options: [["oui", "Oui"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
  ],
  fichier: { libelle: "Une page de barème ou de convention (photo ou PDF) — facultatif", visible: agree },
  attentes: ATTENTES_CARROSSERIE,
  score: scoreCarrosserie,
  cible: agree,
  aMain: [
    "un barème d'un de vos assureurs (taux horaires et ingrédients peinture) ;",
    "votre nombre d'heures facturées sur les 12 derniers mois, ou à défaut votre nombre de compagnons ;",
    "vos délais de paiement, assureur par assureur, si vous les connaissez.",
  ],
  mailInterne: { titre: "Atelier", objet: "Pré-diagnostic carrosserie", erreur: "Informations sur l'atelier incomplètes." },
  sousOffres: [
    { offre: OFFRE_BILAN, nomOffre: "Bilan Agréments", concerne: agree, activite: { carrosserie: "oui" },
      aMain: [
        "un barème d'un de vos assureurs (taux horaires et ingrédients peinture) ;",
        "votre nombre d'heures facturées sur les 12 derniers mois, ou à défaut votre nombre de compagnons ;",
        "vos délais de paiement, assureur par assureur, si vous les connaissez.",
      ] },
    { offre: OFFRE_LIBRE_CHOIX, nomOffre: "Plan Libre Choix", concerne: estLibreChoix, activite: { carrosserie: "oui", agrement: "non" },
      aMain: [
        "votre nombre de sinistres réparés par mois, et ceux qui repartent ailleurs après un appel ou un passage ;",
        "votre dossier moyen (montant HT) ;",
        "l'accès à votre fiche Google, si vous l'avez.",
      ] },
  ],
  rdv: {
    texte: "Merci {prenom}. Réservez maintenant votre pré-diagnostic : 20 minutes au téléphone avec Ulrich. À la fin de l'appel, vous saurez si le {offre} vaut le coup pour vous.",
    bouton: "📅 Réserver mon pré-diagnostic (20 min)",
  },
};
