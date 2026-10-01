// app/data/pieces.ts
// -----------------------------------------------------------------------------
// Pièces à transmettre par le client APRÈS la commande, offre par offre.
// Distinct des listes « à avoir sous la main » du pré-diagnostic (aMain des
// branches) : ici, ce sont les exports qui font courir le délai de livraison
// annoncé dans les CGV (« après réception des pièces »). Utilisé par /merci et
// par le mail « Commande reçue » (projet : MAIL_COMMANDE_RECUE_ET_BON_DE_COMMANDE.md).
// Clé = nom interne de l'offre (slug Stripe / ?offre=).
// -----------------------------------------------------------------------------

export const PIECES_MISSION: Record<string, { nom: string; delai: string; pieces: string[] }> = {
  "bilan-financements": {
    nom: "Bilan Financements", delai: "5 jours ouvrés après réception des pièces",
    pieces: [
      "Votre catalogue avec les prix affichés sur Mon Compte Formation, formation par formation",
      "Votre nombre de dossiers CPF sur les 12 derniers mois, ou à défaut votre chiffre d'affaires CPF",
      "Votre dernier bilan pédagogique et financier (BPF), ou la répartition de votre chiffre d'affaires par financeur",
    ],
  },
  "bilan-commissions": {
    nom: "Bilan Commissions", delai: "5 jours ouvrés après réception des pièces",
    pieces: [
      "Vos relevés de commissions Booking.com et Expedia des 12 derniers mois (extranet, rubrique Finances)",
      "L'export de votre logiciel de gestion : nuitées et chiffre d'affaires par canal sur 12 mois (ou taux d'occupation et prix moyen)",
      "Votre grille tarifaire actuelle, telle qu'affichée sur votre site et sur les plateformes",
    ],
  },
  "bilan-commissions-activites": {
    nom: "Bilan Commissions · Activités", delai: "5 jours ouvrés après réception des pièces",
    pieces: [
      "Vos relevés de paiement GetYourGuide, Viator ou Civitatis des 12 derniers mois",
      "Votre nombre de participants et votre prix moyen par canal sur 12 mois",
      "La part de vos ventes faites en direct (site, téléphone), si votre logiciel de réservation la donne",
    ],
  },
  "bilan-commissions-restauration": {
    nom: "Bilan Commissions · Restauration · Express 72 h", delai: "72 heures ouvrées après réception des pièces",
    pieces: [
      "Vos relevés de versement Uber Eats et Deliveroo des 3 derniers mois",
      "Votre chiffre d'affaires mensuel en salle et en livraison sur la même période",
      "Vos prix en salle et en livraison pour vos cinq plats les plus vendus",
    ],
  },
  "plan-argent-dormant": {
    nom: "Plan Argent Dormant", delai: "3 jours ouvrés après réception des 4 exports",
    pieces: [
      "Export 1 : vos devis envoyés et non signés sur les 12 derniers mois",
      "Export 2 : vos factures émises et non réglées, avec leur date d'échéance",
      "Export 3 : vos chantiers réceptionnés avec une retenue de garantie, et la date de réception",
      "Export 4 : vos travaux réalisés et non encore facturés (situations, avenants, travaux supplémentaires)",
    ],
  },
  "pack-dracar-express": {
    nom: "Pack Dracar Express", delai: "72 heures après la visio guidée",
    pieces: [
      "Votre nombre d'agents et, si vous les avez, leurs NUB (numéro à 7 chiffres)",
      "Vos identifiants Dracar si un compte a déjà été ouvert",
      "Votre dernier planning : qui est affecté où",
    ],
  },
  "veille-titres": {
    nom: "Veille Titres", delai: "rapport sous 48 h ouvrées après réception de l'export mensuel",
    pieces: [
      "L'export du tableau de bord de votre compte Dracar",
      "La liste des cartes qui arrivent à échéance dans les 6 mois, si vous la tenez",
      "Les demandes de preuve que vos clients vous ont faites",
    ],
  },
  "bilan-vacations-6h": {
    nom: "Bilan Vacations 6 h", delai: "10 jours ouvrés après réception des contrats",
    pieces: [
      "Vos contrats avec des vacations de moins de 6 heures : site, horaires, taux facturé",
      "Votre coût horaire complet employeur, même approximatif",
      "Vos contrats avec une clause d'indexation, appliquée ou non",
    ],
  },
  "bilan-agrements": {
    nom: "Bilan Agréments Assureurs", delai: "7 jours ouvrés après réception des pièces",
    pieces: [
      "Le barème de chacun de vos assureurs agréés (taux horaires et ingrédients peinture) et votre convention d'agrément",
      "Votre nombre d'heures facturées sur les 12 derniers mois, assureur par assureur, ou à défaut votre nombre de compagnons",
      "Vos délais de paiement constatés, assureur par assureur",
    ],
  },
  "plan-libre-choix": {
    nom: "Plan Libre Choix", delai: "installation en 7 jours, suivi à 30, 60 et 90 jours",
    pieces: [
      "Votre nombre de sinistres réparés par mois, et ceux qui repartent ailleurs après un appel ou un passage",
      "Votre dossier moyen (montant HT) et vos modèles actuels de devis et de facture",
      "L'accès à votre fiche Google, si vous l'avez",
    ],
  },
};

/** Pièces d'une offre, nom interne Stripe accepté (veille-titres-30 → veille-titres). */
export const piecesMission = (offre: string) => PIECES_MISSION[offre.replace(/-(30|80)$/, "")] ?? null;
