// app/lib/securite.ts
// -----------------------------------------------------------------------------
// Branche « Société de sécurité privée » du formulaire d'audit.
// Offre en trois étapes (plaquette PLAQUETTE_SECURITE_PRIVEE, 30/09/2026) :
//   1. Pack Dracar Express (mise en ordre en 72 h) — étape d'entrée ;
//   2. Veille Titres (vérification mensuelle des cartes) ;
//   3. Bilan Vacations 6 h (marge perdue sur les vacations de moins de 6 h).
// Les réponses désignent l'étape à proposer en premier (sous-offres).
// Pas de pièce jointe : aucune donnée nominative d'agent n'est demandée.
// Socle commun : app/lib/branche.ts.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, type Etiquette } from "./branche";

export const SECTEUR_SECURITE = "Société de sécurité privée"; // libellé de FORM_SECTEURS (app/data/segments.ts)
export const OFFRE_DRACAR = "pack-dracar-express";
export const OFFRE_VEILLE = "veille-titres";
export const OFFRE_VACATIONS = "bilan-vacations-6h";

/** Étape 1 : pas de compte Dracar, agents pas tous déclarés, ou NUB manquants. */
export const besoinDracar = (r: Reponses) => (r.dracar !== "" && r.dracar !== "ouvert") || r.nub === "non";
/** Étape 2 : en ordre sur Dracar mais cartes non vérifiées chaque mois. */
export const besoinVeille = (r: Reponses) => !besoinDracar(r) && r.dracar === "ouvert" && r.verif !== "" && r.verif !== "mois";
/** Étape 3 : en ordre, cartes suivies, mais des contrats à moins de 6 h ou non révisés. */
export const besoinVacations = (r: Reponses) =>
  !besoinDracar(r) && !besoinVeille(r) && r.dracar === "ouvert" && (r.vacations === "oui" || r.indexation === "partie" || r.indexation === "non");

export const ATTENTES_SECURITE = [
  "Être en règle sur Dracar avant un contrôle",
  "Récupérer la marge perdue sur les vacations de moins de 6 h",
];

/** Score de priorité sur 10. CHAUD ≥ 6, TIÈDE 3 à 5, FROID ≤ 2. Toute société de sécurité privée est dans la cible. */
export function scoreSecurite(r: Reponses): { points: number | null; etiquette: Etiquette } {
  let p = r.agents === "16-30" || r.agents === "31-80" ? 2 : r.agents === "6-15" || r.agents === "gt80" ? 1 : 0;
  p += r.dracar === "non" ? 3 : r.dracar === "enCours" || r.dracar === "nsp" ? 2 : 0;
  p += r.nub === "non" || r.nub === "nsp" ? 1 : 0;
  p += r.verif === "embauche" || r.verif === "nsp" ? 2 : r.verif === "trimestre" ? 1 : 0;
  p += r.vacations === "oui" ? 2 : r.vacations === "nsp" ? 1 : 0;
  return { points: p, etiquette: p >= 6 ? "CHAUD" : p >= 3 ? "TIÈDE" : "FROID" };
}

export const BRANCHE_SECURITE: Branche = {
  id: "securite",
  secteur: SECTEUR_SECURITE,
  offre: OFFRE_DRACAR,
  nomOffre: "Pack Dracar Express",
  intro: "Quelques questions sur votre société. Un clic par question, 1 minute en tout. Aucun nom d'agent n'est demandé.",
  champs: [
    { cle: "agents", question: "Combien d'agents employez-vous (CDI, CDD, vacataires) ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [["1-5", "1 à 5"], ["6-15", "6 à 15"], ["16-30", "16 à 30"], ["31-80", "31 à 80"], ["gt80", "Plus de 80"]] },
    { cle: "dracar", question: "Votre compte Dracar Ultimate", controle: "radio", obligatoire: true, visible: () => true,
      options: [
        ["ouvert", "Ouvert, tous les agents déclarés"],
        ["enCours", "Ouvert, agents pas tous déclarés"],
        ["non", "Pas de compte"],
        ["nsp", "Je ne sais pas"],
      ] },
    { cle: "nub", question: "Avez-vous le NUB (numéro à 7 chiffres) de tous vos agents ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [["oui", "Oui"], ["non", "Non, il en manque"], ["nsp", "Je ne sais pas ce que c'est"]] },
    { cle: "verif", question: "Dernière vérification de la validité des cartes professionnelles", controle: "radio", obligatoire: true, visible: () => true,
      options: [["mois", "Ce mois-ci"], ["trimestre", "Il y a moins de 3 mois"], ["embauche", "À l'embauche seulement"], ["nsp", "Je ne sais pas"]] },
    { cle: "vacations", question: "Avez-vous des contrats avec des vacations de moins de 6 heures ?", controle: "radio", obligatoire: true, visible: () => true,
      options: [["oui", "Oui"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
    { cle: "indexation", question: "Vos prix ont-ils été révisés depuis la hausse des minima de janvier 2026 ?", controle: "radio", obligatoire: false, visible: () => true,
      options: [["tous", "Oui, tous les contrats"], ["partie", "Une partie seulement"], ["non", "Non"], ["nsp", "Je ne sais pas"]] },
  ],
  fichier: null,
  attentes: ATTENTES_SECURITE,
  score: scoreSecurite,
  cible: (r) => besoinDracar(r) || besoinVeille(r) || besoinVacations(r), // tout en ordre → « un accompagnement », sans bloc « ayez sous la main »
  aMain: [
    "votre nombre d'agents et, si vous les avez, leurs NUB (numéro à 7 chiffres) ;",
    "vos identifiants Dracar si le compte existe déjà ;",
    "vos contrats avec des vacations de moins de 6 heures : site, horaires, taux facturé.",
  ],
  mailInterne: { titre: "Société", objet: "Pré-diagnostic sécurité privée", erreur: "Informations sur la société incomplètes." },
  sousOffres: [
    { offre: OFFRE_DRACAR, nomOffre: "Pack Dracar Express", concerne: besoinDracar,
      aMain: [
        "votre nombre d'agents et, si vous les avez, leurs NUB (numéro à 7 chiffres) ;",
        "vos identifiants Dracar si un compte a déjà été ouvert ;",
        "votre dernier planning : qui est affecté où.",
      ] },
    { offre: OFFRE_VEILLE, nomOffre: "Veille Titres", concerne: besoinVeille,
      aMain: [
        "l'export du tableau de bord de votre compte Dracar ;",
        "la liste des cartes qui arrivent à échéance dans les 6 mois, si vous la tenez ;",
        "les demandes de preuve que vos clients vous ont faites.",
      ] },
    { offre: OFFRE_VACATIONS, nomOffre: "Bilan Vacations 6 h", concerne: besoinVacations,
      aMain: [
        "vos contrats avec des vacations de moins de 6 heures : site, horaires, taux facturé ;",
        "votre coût horaire complet employeur, même approximatif ;",
        "vos contrats avec une clause d'indexation, appliquée ou non.",
      ] },
  ],
  rdv: {
    texte: "Merci {prenom}. Réservez maintenant votre pré-diagnostic : 20 minutes au téléphone avec Ulrich. À la fin de l'appel, vous saurez si le {offre} vaut le coup pour vous.",
    bouton: "📅 Réserver mon pré-diagnostic (20 min)",
  },
};
