// Source unique des segments « Sur mesure » : alimente le menu de la navbar,
// les pages /sur-mesure/<slug> et la liste des secteurs du formulaire d'audit.

export type Segment = {
  slug: string;
  label: string;
  children?: { slug: string; label: string }[];
};

export const SEGMENTS_COL_1: Segment[] = [
  { slug: "btp", label: "BTP" },
  { slug: "organisme-de-formation", label: "Organisme de formation" },
  {
    slug: "garagiste-carrossier",
    label: "Garagiste / Carrossier",
    children: [
      { slug: "garagiste-carrossier-agree", label: "Agréés" },
      { slug: "garagiste-carrossier-non-agree", label: "Non agréés" },
    ],
  },
  { slug: "hotellerie-restauration", label: "Hôtellerie / Restauration" },
];

export const SEGMENTS_COL_2: Segment[] = [
  { slug: "tourisme", label: "Tourisme" },
  { slug: "ecole-de-conduite", label: "École de conduite" },
  { slug: "evenementiel", label: "Professionnels de l'Événementiel" },
  { slug: "agences-immobilieres", label: "Agences immobilières" },
];

export const SEGMENTS: Segment[] = [...SEGMENTS_COL_1, ...SEGMENTS_COL_2];

/** Secteurs proposés à l'étape 2 du formulaire d'audit (alignés sur le menu Sur mesure). */
export const FORM_SECTEURS = [
  "Agences immobilières",
  "BTP",
  "École de conduite",
  "Garagiste / Carrossier",
  "Hôtellerie / Tourisme",
  "Restauration",
  "Organisme de formation",
  "Professionnels de l'Événementiel",
  "Autre",
];

// ─── Contenu des pages segment ──────────────────────────────────────────────

export type Stat = { value: string; label: string };
export type Step = { when: string; title: string; text: string };
export type Offer = {
  /** Nom de l'offre (marque) */
  brand: string;
  /** Sous-titre de marque, ex. « Une offre Sena Consulting » */
  brandLine?: string;
  /** Phrase d'accroche (H1 de la landing) */
  headline: string;
  /** Sous-titre sous le H1 */
  sub: string;
  /** Bloc « Ce qui a changé » : 3 chiffres */
  changedTitle?: string;
  stats?: Stat[];
  /** Bloc « Le problème » : 3 douleurs */
  pains: { title: string; text: string }[];
  /** Bloc « Comment ça se passe » */
  steps: Step[];
  /** Bloc « Ce que vous recevez » */
  deliverables: string[];
  /** Bloc prix : lignes libellé / valeur, + mentions */
  pricing: { label: string; value: string; note?: string }[];
  pricingNotes?: string[];
  /** Bloc « Nos engagements » */
  commitments?: string[];
  /** Exemple de résultat (optionnel) */
  example?: { intro: string; stats: Stat[] };
  /** Texte du bouton principal */
  cta: string;
  /** Secteur présélectionné dans le formulaire */
  formSecteur: string;
  /** Titre du bloc formulaire */
  formTitle: string;
};

export type SegmentPage = {
  slug: string;
  label: string;
  parent?: string;
  /** Décrit le public de la page, sous le titre, quand il n'y a pas d'offre */
  audience?: string;
  formSecteur?: string;
  offer?: Offer;
  /** Pour une page parent : sous-pages à mettre en avant */
  subpages?: { slug: string; label: string; status: "ready" | "building" }[];
};

const OFFER_EVENEMENTIEL: Offer = {
  brand: "Acomptis",
  brandLine: "Une marque Sena Consulting · pour les traiteurs, photographes, wedding planners, prescripteurs et tous les professionnels de l'événementiel",
  headline: "Votre devis ne repart plus dans la nature. Il repart avec un acompte.",
  sub: "Vous envoyez un devis. Le client répondra peut-être. Il paiera peut-être un acompte, un jour, par chèque. Puis il passera de 45 à 68 convives. Acomptis tient toute la chaîne : le devis part avec un lien, l'acompte est encaissé dans la minute, et quand les chiffres bougent, tout se réajuste sans que vous refassiez quoi que ce soit.",
  changedTitle: "La date réservée, jusqu'au solde. Le devis qui s'encaisse.",
  stats: [
    { value: "48 h", label: "Mise en service" },
    { value: "30 %", label: "d'acompte encaissé dans la minute" },
    { value: "0 %", label: "de commission sur vos encaissements" },
  ],
  pains: [
    { title: "Les devis sans réponse", text: "Envoyés, puis oubliés. Relancés quand on y pense, c'est-à-dire trop tard." },
    { title: "Les acomptes qui n'arrivent pas", text: "Vous engagez des achats et du personnel sans garantie de paiement." },
    { title: "Les chiffres qui bougent", text: "45 convives deviennent 68. Nouveau devis, nouvelle signature, acompte faux, solde à recalculer à la main." },
  ],
  steps: [
    { when: "01", title: "Le devis", text: "À votre nom, à vos couleurs, envoyé depuis votre adresse." },
    { when: "02", title: "L'acceptation", text: "Un clic, daté et tracé. Vous avez une preuve." },
    { when: "03", title: "L'acompte", text: "30 % encaissés immédiatement, directement sur votre compte." },
    { when: "04", title: "L'avenant", text: "Le nombre change, tout se recalcule, le solde s'ajuste." },
  ],
  deliverables: [
    "L'avenant en un clic — le nombre change, le solde s'ajuste, sans refaire de devis",
    "Vos devis en 3 minutes depuis votre catalogue",
    "Les relances automatiques sur les devis non signés et les soldes en attente",
    "Votre tableau de bord : signé, encaissé, à venir",
    "Votre propre adresse — devis.votre-maison.fr",
    "Vos factures et l'export comptable",
  ],
  pricing: [
    { label: "Formule comptant", value: "890 € de mise en service, puis 79 € / mois", note: "Sans engagement" },
    { label: "Formule lissée", value: "290 € de mise en service, puis 129 € / mois", note: "Engagement 12 mois" },
  ],
  pricingNotes: [
    "Même prix sur l'année. Vous choisissez selon votre trésorerie.",
    "Sans commission sur vos encaissements : l'argent va directement sur votre compte bancaire.",
    "Encaissements opérés via un prestataire de paiement agréé. Les fonds sont versés directement au commerçant.",
  ],
  cta: "Demander mon pré-diagnostic offert",
  formSecteur: "Professionnels de l'Événementiel",
  formTitle: "Parlons de vos devis : pré-diagnostic offert",
};

const OFFER_CARROSSIERS_AGREES: Offer = {
  brand: "Bilan Agréments Assureurs",
  brandLine: "Une offre Sena Consulting · pour les carrossiers agréés · payé au résultat",
  headline: "Vos barèmes assureurs vous paient-ils vraiment ?",
  sub: "Le Bilan Agréments compare ce que chaque assureur vous paie aux références du secteur. Vous savez quels agréments valent la peine d'être gardés, et vous arrivez à la négociation de vos tarifs 2027 avec des arguments chiffrés.",
  changedTitle: "Ce que vos agréments vous coûtent, sans que personne ne le calcule",
  stats: [
    { value: "+4,5 %", label: "sur les taux de main-d'œuvre carrosserie en 2025 (SRA). Votre dernière revalorisation, combien ?" },
    { value: "50 à 60 j", label: "de délais de paiement, parfois plus, alors que le plafond légal est de 60 jours" },
    { value: "6 critères", label: "notés de 0 à 10 par assureur, face aux références du secteur" },
  ],
  pains: [
    { title: "Des tarifs revus sous l'inflation", text: "SRA, l'association des assureurs auto, mesure +4,5 % sur les taux de main-d'œuvre carrosserie en 2025. Votre dernière revalorisation, combien ?" },
    { title: "Des paiements qui traînent", text: "50, 60 jours, parfois plus. C'est votre trésorerie qui finance l'attente, alors que le plafond légal est de 60 jours." },
    { title: "Des remises qui s'empilent", text: "Remises sur pièces, véhicule de courtoisie gratuit, plateforme payante, pénalités. Chaque obligation a un coût que personne ne calcule." },
  ],
  steps: [
    { when: "Jour 1", title: "Rendez-vous d'1 h à l'atelier", text: "Signature de la lettre de mission. Vous montrez conventions, barèmes et factures." },
    { when: "Jour 5", title: "Analyse et construction du dossier", text: "Rien à faire de votre côté." },
    { when: "Jour 7", title: "Restitution d'1 h", text: "Les résultats, les décisions, l'argumentaire." },
    { when: "Avant l'assureur", title: "Séance de préparation", text: "On répète ensemble l'entretien de négociation." },
  ],
  deliverables: [
    "Le coût de revient de votre heure vendue : le seuil sous lequel vous travaillez à perte. C'est le chiffre que l'assureur n'a pas.",
    "Un diagramme en radar par assureur : taux de main-d'œuvre, ingrédients peinture, revalorisation, délai, remises, volume — chaque agrément noté sur 10.",
    "L'écart en euros, assureur par assureur : ce que chaque convention vous coûte par an, et la trésorerie qu'elle immobilise.",
    "Une décision par agrément : renégocier, garder ou questionner, avec la matrice volume / marge.",
    "L'argumentaire de négociation rédigé : les arguments dans l'ordre, chiffrés, vérifiables, et votre position de repli.",
    "Une séance de préparation avant votre rendez-vous assureur.",
  ],
  pricing: [
    { label: "À la remise du dossier", value: "190 €" },
    { label: "Au résultat", value: "30 % du gain obtenu", note: "La 1re année seulement, 190 € déduits, payé en 3 fois" },
  ],
  pricingNotes: ["TVA non applicable, art. 293 B du CGI."],
  commitments: [
    "Si l'assureur ne bouge pas, le bilan vous a coûté 190 €. Rien de plus.",
    "Le gain se mesure sur l'avenant signé : barème 2027 obtenu moins barème 2027 proposé au départ, multiplié par vos heures 2026. Le montant est fixé ce jour-là.",
    "Nous ne négocions pas à votre place : vous restez maître de la relation avec vos assureurs.",
    "Aucun résultat n'est promis : l'assureur reste libre. Vous avez des chiffres, pas des slogans.",
    "Vos chiffres restent confidentiels. Ils ne sont jamais transmis à un tiers.",
  ],
  example: {
    intro: "Exemple sur une carrosserie fictive des Hauts-de-Seine, 3 agréments comparés sur 6 critères :",
    stats: [
      { value: "40 %", label: "de l'activité payée au prix coûtant" },
      { value: "44 k€", label: "par an d'écart avec les références" },
      { value: "34 k€", label: "de trésorerie immobilisée par les délais de paiement" },
    ],
  },
  cta: "Demander mon pré-diagnostic offert",
  formSecteur: "Garagiste / Carrossier",
  formTitle: "Pré-diagnostic offert : vos agréments passés au crible",
};

const OFFER_ORGANISMES_FORMATION: Offer = {
  brand: "Bilan Financements",
  brandLine: "Une offre Sena Consulting · pour les organismes de formation certifiés Qualiopi",
  headline: "Plafonnement CPF : combien il vous coûte, comment le récupérer.",
  sub: "Les organismes du secteur rapportent des baisses d'inscriptions de 30 à 50 % sur les formations concernées. La demande n'a pas disparu : c'est le financement qui a changé. Cela se corrige par le prix, la structure de l'offre et le canal de vente.",
  changedTitle: "Ce qui a changé en 2026",
  stats: [
    { value: "1 500 €", label: "Plafond CPF par certification du Répertoire spécifique, depuis le 26 février 2026, quel que soit le solde du stagiaire" },
    { value: "150 €", label: "Participation forfaitaire par dossier depuis le 2 avril 2026 (100 € auparavant)" },
    { value: "1 776 €", label: "Prix moyen d'une certification RS sur Mon Compte Formation : la majorité des catalogues dépasse le plafond" },
  ],
  pains: [
    { title: "Concrètement", text: "Une formation d'anglais avec TOEIC vendue 2 190 €. En 2025, le stagiaire payait 100 €. Aujourd'hui, il doit sortir 840 € de sa poche, et beaucoup renoncent." },
    { title: "Le calcul", text: "2 190 € de formation − 1 500 € pris en charge par le CPF = 690 € d'écart au plafond, + 150 € de participation forfaitaire = 840 € à payer par le stagiaire." },
    { title: "La demande est toujours là", text: "Ce sont le prix, la structure de l'offre et le canal de vente qu'il faut revoir, formation par formation." },
  ],
  steps: [
    { when: "Offert · J0", title: "Le constat", text: "Nous calculons l'écart au plafond sur votre catalogue public, avant tout échange." },
    { when: "Offert · 20 min", title: "L'appel", text: "Nous validons le constat ensemble et listons les pièces à transmettre." },
    { when: "5 jours ouvrés", title: "Le bilan", text: "Les 5 rubriques calculées sur vos dossiers réels, en PDF." },
    { when: "45 min", title: "La restitution", text: "Nous passons en revue les scénarios et arrêtons le plan d'action." },
  ],
  deliverables: [
    "Exposition — formation par formation, l'écart au plafond, le reste à charge du stagiaire et le montant total en jeu.",
    "Dépendance — la répartition de votre chiffre d'affaires par financeur et la part directement menacée.",
    "Scénarios — trois options tarifaires chiffrées (statu quo, alignement, offre mixte) et celle qui préserve le plus de chiffre d'affaires.",
    "Levier employeur — le cofinancement qui supprime le reste à charge du salarié, et l'argumentaire prêt à envoyer aux entreprises.",
    "Plan 90 jours — les actions dans l'ordre, un indicateur par étape, la première applicable dès la semaine suivante.",
  ],
  pricing: [
    { label: "Pré-diagnostic", value: "Offert", note: "Vos formations au-dessus du plafond, le reste à charge de vos stagiaires, l'ordre de grandeur en jeu sur une année. Si l'enjeu ne justifie pas le bilan, on vous le dit." },
    { label: "Bilan Financements", value: "790 €", note: "Les 5 rubriques sur vos chiffres, livré sous 5 jours ouvrés, restitution de 45 minutes incluse" },
  ],
  pricingNotes: [
    "Tarif de lancement réservé aux 5 premiers organismes, **puis 1 290 € pour les autres.** Réglé à la commande.",
    "TVA non applicable, art. 293 B du CGI.",
    "Pièces à fournir pour le bilan : catalogue tarifaire à jour, bilan pédagogique et financier 2025, export EDOF des dossiers 2025 et 2026, part des stagiaires salariés si vous la connaissez.",
  ],
  example: {
    intro: "Sur un organisme de 9 salariés et 1 M€ de chiffre d'affaires (cas illustratif, organisme fictif, bilan complet disponible sur demande) :",
    stats: [
      { value: "4 sur 7", label: "formations au-dessus du plafond" },
      { value: "134 270 €", label: "d'écart reporté sur les stagiaires" },
      { value: "200 820 €", label: "de perte annuelle estimée sans action" },
      { value: "+72 341 €", label: "préservés par an en appliquant notre plan" },
    ],
  },
  cta: "Demander mon pré-diagnostic offert",
  formSecteur: "Organisme de formation",
  formTitle: "Pré-diagnostic offert : le calcul sur vos propres formations",
};

const OFFER_AUTO_ECOLES: Offer = {
  brand: "Plein Phare",
  brandLine: "Une offre Sena Consulting · pour les auto-écoles",
  headline: "Remplissez votre auto-école, même sans CPF.",
  sub: "Vos élèves n'ont pas disparu. Ils ont juste plus de mal à payer. On vous aide à leur rendre le permis accessible et à récupérer ceux qui sont partis réfléchir.",
  changedTitle: "Ce qui a changé en 2026",
  stats: [
    { value: "26 février", label: "Le CPF ne finance plus le permis B pour la plupart des salariés" },
    { value: "900 €", label: "Le plafond qui reste, réservé aux demandeurs d'emploi" },
    { value: "11 août", label: "Rappeler un particulier sans son accord préalable est interdit" },
  ],
  pains: [
    { title: "L'élève paie seul", text: "Il découvre qu'il doit sortir 1 500 à 2 000 € de sa poche. Il repousse, compare, ou part sur une plateforme en ligne." },
    { title: "Vous ne pouvez plus le rappeler", text: "Sans accord préalable, la relance téléphonique est interdite depuis le 11 août 2026." },
    { title: "Les aides restent méconnues", text: "Permis à 1 € par jour, CPF pour les demandeurs d'emploi, aides locales : vos élèves ne les connaissent pas." },
  ],
  steps: [
    { when: "J0", title: "On se voit 45 min", text: "Dans votre agence. Vos tarifs, vos élèves, vos outils." },
    { when: "J1 – J4", title: "On prépare tout", text: "Vous continuez votre travail. On ne vous dérange pas." },
    { when: "J5", title: "On vous remet le kit", text: "En main propre. On trie vos contacts ensemble, chez vous." },
    { when: "+30 j", title: "On fait le point", text: "Un appel pour voir ce qui marche et ajuster." },
  ],
  deliverables: [
    "Vos forfaits repensés pour un élève qui paie seul : nouvelle grille avec paiement en plusieurs fois, un forfait d'entrée pour faire signer plus tôt, les phrases à dire au comptoir quand l'élève demande le prix.",
    "Votre guide « Comment financer ton permis en 2026 » : affiche vitrine A3, flyer comptoir A5, texte pour votre site et votre fiche Google, à votre nom et à vos couleurs.",
    "Vos demandes de devis relancées, dans les règles : tri de vos contacts avec vous, sur votre ordinateur, messages SMS et e-mail prêts à envoyer, case d'accord sur vos devis et votre site pour pouvoir rappeler demain.",
  ],
  pricing: [
    { label: "Kit Inscriptions 2026 · tarif pilote", value: "490 € une seule fois", note: "Réservé aux 5 premières auto-écoles, puis 690 €. 10 auto-écoles accompagnées ce mois-ci, pas plus." },
  ],
  pricingNotes: [
    "Livré en 5 jours ouvrés, ou remboursé. Nous garantissons ce qui dépend de nous : un kit complet, à temps. Nous ne promettons pas un nombre d'inscriptions, personne ne peut le faire honnêtement.",
    "Pas d'abonnement, pas de logiciel à changer. Paiement à la commande, par virement ou lien sécurisé.",
    "TVA non applicable, art. 293 B du CGI.",
  ],
  commitments: [
    "Je dois changer de logiciel ? Non. On travaille avec ce que vous utilisez déjà, même un agenda papier.",
    "Combien de temps ça me prend ? 45 minutes au départ, une heure à la remise, tri des contacts compris.",
    "Et mes fichiers de contacts ? Ils ne sortent jamais de votre agence : on fait le tri ensemble, sur votre ordinateur.",
  ],
  cta: "Demander mon pré-diagnostic offert",
  formSecteur: "École de conduite",
  formTitle: "On en parle 20 minutes au téléphone ?",
};

const OFFER_AGENCES_IMMO: Offer = {
  brand: "Mandatis",
  brandLine: "Une marque Sena Consulting · pour les agences immobilières",
  headline: "Votre fichier contient déjà vos prochains mandats. Personne ne l'a jamais rappelé.",
  sub: "Réactivation du fichier clients des agences immobilières, en conformité avec la loi du 11 août 2026. Nous reprenons le fichier que votre agence a constitué depuis des années, nous le trions, et nous relançons vos anciens clients en votre nom. Ceux qui ont un projet vous le disent et vous autorisent à les rappeler.",
  changedTitle: "Ce qui a changé le 11 août 2026",
  stats: [
    { value: "Loi 2025-594", label: "Interdit d'appeler un particulier sans son consentement préalable. La pige téléphonique n'est plus possible." },
    { value: "3 ans", label: "Le consentement doit être recueilli, daté et conservé" },
    { value: "7 jours", label: "Plateforme opérationnelle, configurée à votre image" },
  ],
  pains: [
    { title: "La pige est morte", text: "Appeler un particulier sans accord préalable est désormais interdit. Le canal historique de prospection disparaît." },
    { title: "Votre fichier dort", text: "Des années de contacts, vendeurs et acquéreurs passés, jamais rappelés. Ils vous connaissent déjà." },
    { title: "La preuve manque", text: "Sans consentement horodaté et archivé, chaque rappel est un risque." },
  ],
  steps: [
    { when: "01", title: "Export", text: "Vous extrayez votre fichier, guidé pas à pas. Deux heures, une seule fois." },
    { when: "02", title: "Tri", text: "Nettoyage, dédoublonnage, et séparation des contacts réellement exploitables." },
    { when: "03", title: "Relance", text: "Email puis SMS, à votre nom, à vos couleurs, avec désinscription en un clic." },
    { when: "04", title: "Rappel", text: "Votre liste d'appels, avec le contexte de chacun et son consentement daté." },
  ],
  deliverables: [
    "Des demandes d'estimation venant de gens qui vous connaissent déjà",
    "Une liste de rappel priorisée, avec l'historique de chaque contact",
    "La preuve horodatée et exportable de chaque consentement",
    "Votre tableau de bord : contacts activés, réponses, rendez-vous obtenus",
    "Votre logiciel métier intact : nous le lisons, nous ne le remplaçons pas",
    "Un support par email, et les évolutions issues du terrain",
  ],
  pricing: [
    { label: "Mise en service", value: "2 500 €" },
    { label: "Puis par mois", value: "490 €", note: "Sans engagement de durée : vous arrêtez quand vous voulez" },
  ],
  pricingNotes: [
    "Opérationnel sous 7 jours ouvrés. TVA non applicable, article 293 B du CGI.",
    "Le cadre, écrit noir sur blanc : vous restez responsable de traitement, nous sommes votre sous-traitant au sens de l'article 28 du RGPD, avec un contrat signé avant toute extraction. La relance s'appuie sur l'exception « client existant » de l'article L.34-5 du CPCE : seuls vos anciens clients sont sollicités, jamais un fichier acheté, jamais une annonce de particulier. Hébergement en Union européenne, suppression des données en fin de contrat.",
  ],
  cta: "Demander ma démonstration sur mes chiffres",
  formSecteur: "Agences immobilières",
  formTitle: "Démonstration sur vos propres chiffres : pré-diagnostic offert",
};

export const SEGMENT_PAGES: SegmentPage[] = [
  { slug: "btp", label: "BTP", audience: "Entreprises du bâtiment et des travaux publics", formSecteur: "BTP" },
  { slug: "organisme-de-formation", label: "Organisme de formation", formSecteur: "Organisme de formation", offer: OFFER_ORGANISMES_FORMATION },
  {
    slug: "garagiste-carrossier", label: "Garagiste / Carrossier", formSecteur: "Garagiste / Carrossier",
    audience: "Garages et carrosseries indépendants",
    subpages: [
      { slug: "garagiste-carrossier-agree", label: "Carrossiers agréés — Bilan Agréments Assureurs", status: "ready" },
      { slug: "garagiste-carrossier-non-agree", label: "Carrossiers non agréés", status: "building" },
    ],
  },
  { slug: "garagiste-carrossier-agree", label: "Carrossiers agréés", parent: "Garagiste / Carrossier", formSecteur: "Garagiste / Carrossier", offer: OFFER_CARROSSIERS_AGREES },
  { slug: "garagiste-carrossier-non-agree", label: "Carrossiers non agréés", parent: "Garagiste / Carrossier", audience: "Carrosseries indépendantes travaillant en libre choix", formSecteur: "Garagiste / Carrossier" },
  { slug: "hotellerie-restauration", label: "Hôtellerie / Restauration", audience: "Hôtels, restaurants et établissements de bouche", formSecteur: "Hôtellerie / Tourisme" },
  { slug: "tourisme", label: "Tourisme", audience: "Professionnels du tourisme et des loisirs", formSecteur: "Hôtellerie / Tourisme" },
  { slug: "ecole-de-conduite", label: "École de conduite", formSecteur: "École de conduite", offer: OFFER_AUTO_ECOLES },
  { slug: "evenementiel", label: "Professionnels de l'Événementiel", formSecteur: "Professionnels de l'Événementiel", offer: OFFER_EVENEMENTIEL },
  { slug: "agences-immobilieres", label: "Agences immobilières", formSecteur: "Agences immobilières", offer: OFFER_AGENCES_IMMO },
];
