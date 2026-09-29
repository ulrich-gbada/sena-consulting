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
  {
    slug: "hotellerie-restauration",
    label: "Hôtellerie / Restauration",
    children: [
      { slug: "hotellerie-restauration", label: "Hôtels" },
      { slug: "restauration", label: "Restaurants" },
    ],
  },
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
  /** Exemple de résultat (optionnel) ; `article` : slug du cas concret dans /realisations */
  example?: { intro: string; stats: Stat[]; article?: string };
  /** Encadré juridique ou de contexte, sous « Le constat » (optionnel) */
  legal?: { title: string; text: string };
  /** Tableau (ex. les 4 gisements du Plan Argent Dormant), sous « Ce que vous recevez » (optionnel) */
  table?: { title: string; head: string[]; rows: string[][] };
  /** Public visé, affiché sous le prix (optionnel) */
  audience?: string;
  /** Renvoi vers une offre voisine, sous le bandeau CTA (optionnel) */
  related?: { text: string; href: string; cta: string };
  /** Texte du bouton principal */
  cta: string;
  /** Secteur présélectionné dans le formulaire */
  formSecteur: string;
  /** Titre du bloc formulaire */
  formTitle: string;
  /** Réponses de l'étape « Activité » préremplies dans le formulaire (landings à branche) */
  formActivite?: Record<string, string>;
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

const OFFER_CARROSSIERS_NON_AGREES: Offer = {
  brand: "Plan Libre Choix",
  brandLine: "Une offre Sena Consulting · pour les carrossiers non agréés · 90 jours · garantie",
  headline: "Vos clients ont le droit de venir chez vous. Aidez-les à le faire.",
  sub: "Chaque mois, des automobilistes appellent votre atelier après un sinistre, puis partent chez le garage agréé de leur assurance. La loi leur laisse pourtant le choix du réparateur, sans avancer les frais. Le Plan Libre Choix installe chez vous ce qui les fait rester.",
  changedTitle: "Ce que la loi permet, et que vos clients ignorent",
  stats: [
    { value: "Loi Hamon", label: "le client choisit son réparateur : l'assureur propose, il n'impose pas (art. L211-5-1 du Code des assurances)" },
    { value: "0 € avancé", label: "avec la cession de créance, l'assureur vous paie directement (art. L211-5-2), hors franchise" },
    { value: "Janv. 2026", label: "la Cour de cassation limite votre paiement à l'accord de l'expert : pas de travaux sans accord" },
  ],
  pains: [
    { title: "« Mon assurance m'envoie ailleurs »", text: "Le client croit qu'il est obligé. Il ne l'est pas. Encore faut-il le lui dire, au bon moment, avec les bons mots." },
    { title: "« Je ne veux pas avancer les frais »", text: "Avec la cession de créance, il n'avance rien. Si personne ne la lui propose, il part chez l'agréé." },
    { title: "Des factures refusées", text: "Travaux lancés avant l'accord de l'expert, facture au-dessus de l'accord : l'assureur ne paie que ce qu'il a validé." },
  ],
  steps: [
    { when: "Étape 1", title: "Pré-diagnostic offert, 20 min au téléphone", text: "Combien de sinistres repartent de chez vous, pourquoi, et ce que vaut de les récupérer." },
    { when: "Jours 1 à 7", title: "Installation", text: "Script d'accueil, cession de créance, check-list du dossier expert." },
    { when: "Jour 7", title: "Visite à l'atelier", text: "Répétition du script avec l'accueil, QR code des avis, photos de la fiche Google." },
    { when: "J30 · J60 · J90", title: "Suivi", text: "Fiche Google, avis, prescripteurs du quartier, tableau de bord mensuel." },
  ],
  deliverables: [
    "Le script d'accueil du sinistré, au téléphone et au comptoir, avec la carte « Vos droits » à remettre au client.",
    "La cession de créance mise en place avec le modèle de votre organisation professionnelle, et son mode opératoire.",
    "La check-list du dossier expert : photos, expertise à distance, accord avant travaux, facture égale à l'accord.",
    "Votre fiche Google remise à niveau, et la routine des avis : QR code et SMS à la restitution du véhicule.",
    "30 prescripteurs près de chez vous (dépanneurs, garages mécaniques, auto-écoles, flottes, courtiers), le courrier et le suivi.",
    "Le tableau de bord mensuel et trois points de suivi, à 30, 60 et 90 jours.",
  ],
  pricing: [
    { label: "Pré-diagnostic", value: "Offert", note: "20 minutes au téléphone, sans engagement" },
    { label: "Plan Libre Choix", value: "600 €", note: "3 prélèvements de 200 € : à la signature, à 30 et à 60 jours" },
    { label: "Garantie 90 jours", value: "300 € remboursés", note: "si moins de 3 dossiers en cession de créance, kit appliqué" },
  ],
  pricingNotes: ["TVA non applicable, art. 293 B du CGI.", "Un seul dossier en plus suffit, en général, à payer le Plan."],
  commitments: [
    "Nous ne parlons jamais à vos clients ni à leurs assureurs à votre place.",
    "Rien de trompeur : jamais « agréé », jamais de promesse de franchise offerte. Seulement ce que la loi permet.",
    "Aucun volume n'est promis. La garantie dit ce qui se passe si ça ne marche pas.",
    "Vos chiffres restent confidentiels. Ils ne sont jamais transmis à un tiers.",
  ],
  example: {
    intro: "Exemple sur une carrosserie fictive du Val-d'Oise, 4 personnes, sans agrément :",
    stats: [
      { value: "13 / mois", label: "sinistres partis ailleurs après un appel ou un passage" },
      { value: "+2,1 / mois", label: "dossiers récupérés dans le scénario prudent" },
      { value: "16,4 k€", label: "de marge brute en plus par an (scénario prudent)" },
    ],
  },
  cta: "Demander mon pré-diagnostic offert",
  formSecteur: "Garagiste / Carrossier",
  formTitle: "Pré-diagnostic offert : combien de sinistres repartent de chez vous ?",
  formActivite: { carrosserie: "oui", agrement: "non" },
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
    { when: "Étape 1", title: "Pré-diagnostic offert, 20 min au téléphone", text: "Vous savez si le Bilan vaut le coup pour vous, avant de signer quoi que ce soit." },
    { when: "Étape 2", title: "Lettre de mission et documents", text: "Vous signez, vous envoyez conventions, barèmes et factures. Rien d'autre à faire." },
    { when: "7 jours ouvrés", title: "Remise du Bilan à l'atelier", text: "Les résultats, les décisions par agrément, l'argumentaire." },
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


const OFFER_HOTELLERIE: Offer = {
  brand: "Bilan Commissions",
  brandLine: "Une offre Sena Consulting · pour les hôtels indépendants · livré sous 5 jours ouvrés",
  headline: "Plateformes de réservation : combien elles vous coûtent, combien vous pouvez récupérer",
  sub: "Pour les hôtels indépendants. Le bilan chiffre vos commissions canal par canal et donne le plan pour ramener une partie de vos réservations en direct, sans quitter les plateformes.",
  changedTitle: "Ce que la distribution coûte, sans que personne ne le calcule",
  stats: [
    { value: "15 à 18 %", label: "Commission de base de Booking.com" },
    { value: "10 à 20 %", label: "Remise Genius consentie en plus" },
    { value: "63 %", label: "Part des réservations des indépendants passée par les plateformes en 2025" },
  ],
  pains: [
    { title: "Votre site est plus cher que Booking.com", text: "Vos clients réguliers comparent, puis réservent là où vous payez une commission." },
    { title: "La remise Genius coûte presque autant qu'une commission", text: "Elle n'apparaît sur aucune facture : elle est déduite avant même que l'argent n'arrive." },
    { title: "Personne ne vous dit ce que chaque canal coûte vraiment", text: "Commission, remises, programmes de visibilité : le coût réel se calcule, canal par canal, sur vos relevés." },
  ],
  legal: {
    title: "Vous avez le droit de vendre moins cher en direct",
    text: "Les clauses de parité tarifaire sont interdites en France depuis la loi Macron (art. L311-5-1 du Code du tourisme) et, en Europe, par le Digital Markets Act depuis le 14 novembre 2024. Booking.com l'a confirmé en septembre 2026 : votre prix sur votre site est libre.",
  },
  steps: [
    { when: "Offert · 20 min", title: "Pré-diagnostic au téléphone", text: "Votre part de plateformes, vos canaux, l'ordre de grandeur en jeu. On vous dit si le bilan vaut le coup." },
    { when: "Jour 0", title: "Les pièces", text: "Relevés de commissions sur 12 mois et ventes par canal. Rien d'autre à faire." },
    { when: "5 jours ouvrés", title: "Le bilan", text: "Les 5 rubriques calculées sur vos chiffres, en PDF." },
    { when: "45 min", title: "La restitution", text: "Nous passons en revue les scénarios et arrêtons le plan des 90 jours." },
  ],
  deliverables: [
    "Dépendance — d'où viennent vos réservations, canal par canal, et ce que chaque canal prélève.",
    "Coût réel — commissions, remise Genius et programmes de visibilité : par jour, par chambre, par nuitée.",
    "Diagnostic du direct — les 8 points qui envoient vos clients sur les plateformes, notés sur 10.",
    "Scénarios — ce que rapporte chaque point de réservations ramené en direct : prudent, central, ambitieux.",
    "Plan 90 jours — les actions dans l'ordre, un indicateur par étape, sans quitter les plateformes.",
  ],
  pricing: [
    { label: "Pré-diagnostic", value: "Offert", note: "20 minutes au téléphone, sans engagement. Si l'enjeu ne justifie pas le bilan, on vous le dit." },
    { label: "Bilan Commissions", value: "890 €", note: "Les 5 rubriques sur vos chiffres, livré sous 5 jours ouvrés, restitution de 45 minutes incluse" },
  ],
  pricingNotes: [
    "Tarif de lancement réservé aux 5 premiers hôtels, **puis 1 490 € pour les autres.** Réglé à la commande.",
    "TVA non applicable, art. 293 B du CGI.",
    "Pièces à fournir pour le bilan : relevés de commissions Booking.com et Expedia sur 12 mois, ventes par canal de votre logiciel de gestion, accès en lecture à votre extranet si possible.",
  ],
  commitments: [
    "Pré-diagnostic offert, sans engagement.",
    "Vos chiffres restent confidentiels. Ils ne sont jamais transmis à un tiers.",
    "Si l'enjeu ne justifie pas le bilan, on vous le dit : vous ne signez que si le potentiel est réel.",
    "Aucune action du plan ne demande de quitter les plateformes.",
  ],
  example: {
    intro: "Hôtel des Tilleuls (fictif), 28 chambres à Paris, cas illustratif complet disponible dans nos réalisations :",
    stats: [
      { value: "62 %", label: "des réservations via les plateformes" },
      { value: "163 274 €", label: "de commissions et remises par an, soit 14,1 % du chiffre d'affaires" },
      { value: "+16 768 €", label: "de marge par an en appliquant notre plan (scénario central)" },
    ],
    article: "bilan-commissions-hotel-des-tilleuls",
  },
  related: {
    text: "Restaurateur ? Les commissions des plateformes de livraison ont leur propre bilan, livré en 72 heures.",
    href: "/sur-mesure/restauration",
    cta: "Voir le Bilan Commissions · Restauration",
  },
  cta: "Réserver mon pré-diagnostic (20 min)",
  formSecteur: "Hôtellerie / Tourisme",
  formTitle: "Votre pré-diagnostic Bilan Commissions",
};

const OFFER_TOURISME_ACTIVITES: Offer = {
  brand: "Bilan Commissions · Activités",
  brandLine: "Une offre Sena Consulting · pour les opérateurs de visites, activités et excursions · livré sous 5 jours ouvrés",
  headline: "GetYourGuide, Viator : combien elles vous coûtent, combien vous pouvez récupérer",
  sub: "Pour les opérateurs de visites, activités et excursions. Le bilan chiffre vos commissions et promotions canal par canal, et donne le plan pour vendre en direct ce qui peut l'être : bons cadeaux, entreprises, groupes, clients qui vous cherchent par votre nom.",
  changedTitle: "Ce que les plateformes prélèvent, et ce qu'elles gardent",
  stats: [
    { value: "20 à 30 %", label: "Commission de GetYourGuide et de Viator" },
    { value: "60 cts", label: "Ce qu'il reste d'un euro vendu avec 15 % de promotion et 25 % de commission" },
    { value: "0", label: "Adresse e-mail client transmise par la plateforme" },
  ],
  pains: [
    { title: "Vos clients vous cherchent sur Google", text: "Et réservent… sur la plateforme, parce que rien ne les invite à réserver chez vous." },
    { title: "Pas de bons cadeaux sur votre site", text: "Ceux qui veulent offrir votre activité paient une commission, alors qu'ils vous connaissent déjà." },
    { title: "Les promotions coûtent presque autant qu'une commission", text: "Acceptées pour rester visible, elles n'apparaissent jamais comme un coût." },
  ],
  steps: [
    { when: "Offert · 20 min", title: "Pré-diagnostic au téléphone", text: "Votre part de plateformes, vos canaux, l'ordre de grandeur en jeu. On vous dit si le bilan vaut le coup." },
    { when: "Jour 0", title: "Les pièces", text: "Relevés de paiement des plateformes sur 12 mois et export des réservations. Rien d'autre à faire." },
    { when: "5 jours ouvrés", title: "Le bilan", text: "Les 5 rubriques calculées sur vos chiffres, en PDF." },
    { when: "45 min", title: "La restitution", text: "Nous passons en revue les scénarios et arrêtons le plan des 90 jours." },
  ],
  deliverables: [
    "Dépendance — d'où viennent vos participants, canal par canal.",
    "Coût réel — commissions et promotions, par participant et par an.",
    "Diagnostic du direct — les 8 points qui envoient vos clients sur les plateformes, notés sur 10.",
    "Scénarios — ce que rapporte chaque point de ventes ramené en direct : prudent, central, ambitieux.",
    "Plan 90 jours — les actions dans l'ordre, bons cadeaux de Noël en tête.",
  ],
  pricing: [
    { label: "Pré-diagnostic", value: "Offert", note: "20 minutes au téléphone, sans engagement. Si l'enjeu ne justifie pas le bilan, on vous le dit." },
    { label: "Bilan Commissions · Activités", value: "690 €", note: "Les 5 rubriques sur vos chiffres, livré sous 5 jours ouvrés, restitution de 45 minutes incluse" },
  ],
  pricingNotes: [
    "Tarif de lancement réservé aux 5 premiers opérateurs, **puis 990 € pour les autres.** Réglé à la commande.",
    "TVA non applicable, art. 293 B du CGI.",
    "Pièces à fournir pour le bilan : relevés de paiement des plateformes sur 12 mois, export des réservations de votre logiciel, accès en lecture à votre moteur de réservation si possible.",
  ],
  commitments: [
    "Pré-diagnostic offert, sans engagement.",
    "Vos chiffres restent confidentiels. Ils ne sont jamais transmis à un tiers.",
    "Si l'enjeu ne justifie pas le bilan, on vous le dit : vous ne signez que si le potentiel est réel.",
    "Aucune action du plan ne demande de quitter les plateformes.",
  ],
  example: {
    intro: "Lumière Tours (fictif), visites à vélo et food tours à Paris, cas illustratif complet disponible dans nos réalisations :",
    stats: [
      { value: "66 %", label: "des ventes via les plateformes" },
      { value: "87 574 €", label: "de commissions et promotions par an, soit 18,2 % du chiffre d'affaires" },
      { value: "+6 662 €", label: "de marge par an en appliquant notre plan, hors bons cadeaux" },
    ],
    article: "bilan-commissions-activites-lumiere-tours",
  },
  cta: "Réserver mon pré-diagnostic (20 min)",
  formSecteur: "Hôtellerie / Tourisme",
  formTitle: "Votre pré-diagnostic Bilan Commissions · Activités",
  formActivite: { typeEtab: "activite" },
};

const OFFER_RESTAURATION: Offer = {
  brand: "Bilan Commissions · Restauration",
  brandLine: "Une offre Sena Consulting · pour les restaurants livrés · Express 72 h",
  headline: "Uber Eats, Deliveroo : combien ils vous coûtent, plat par plat, et ce que vous pouvez récupérer dès vos prochains relevés",
  sub: "Pour les restaurants indépendants qui vendent en livraison. Le bilan mesure ce que les plateformes prélèvent vraiment, calcule la marge de chaque plat en salle et en livraison, et livre les leviers chiffrés en 72 heures.",
  changedTitle: "Ce qu'un euro vendu en livraison laisse vraiment",
  stats: [
    { value: "15 à 30 %", label: "de commission selon la formule (Lite, Plus, Premium), avant promotions et remboursements" },
    { value: "35 %", label: "de chaque euro vendu en livraison part en frais de plateforme dans notre cas illustratif" },
    { value: "72 h", label: "pour recevoir votre bilan, après réception des pièces" },
  ],
  pains: [
    { title: "La même carte en salle et en livraison", text: "Avec 30 % de commission, les mêmes prix ne laissent plus la même marge. Certains plats ne rapportent presque plus rien." },
    { title: "Des frais que personne n'additionne", text: "Commission, promotions cofinancées, remboursements clients déduits : le vrai coût n'apparaît que sur les relevés de versement." },
    { title: "Une formule jamais remise en question", text: "Premium, Plus, Lite : la visibilité supplémentaire se paie. Personne n'a mesuré ce qu'elle rapporte." },
  ],
  steps: [
    { when: "Offert · 20 min", title: "Pré-diagnostic", text: "Au téléphone ou au restaurant : votre part de livraison, votre formule, votre carte. On vous dit si le bilan vaut le coup." },
    { when: "Jour 0", title: "Les pièces", text: "Relevés de versement des 3 derniers mois, export de caisse des ventes par plat, prix d'achat des principaux ingrédients." },
    { when: "72 heures", title: "Le bilan", text: "Les 5 rubriques calculées sur vos relevés et vos ventes par plat, en PDF." },
    { when: "30 min", title: "La restitution", text: "Les leviers dans l'ordre, semaine 1 et semaine 2, puis les deux mois suivants." },
  ],
  deliverables: [
    "Dépendance — la part de la livraison, plateforme par plateforme.",
    "Coût réel — commissions, promotions cofinancées, remboursements : le taux de frais sur vos ventes en livraison.",
    "Carte livraison — la marge de chaque plat en salle et en livraison, et les plats à corriger en premier.",
    "Leviers chiffrés — ce que rapporte chaque levier, et quand : prix, remboursements, promotions, formule, commande directe.",
    "Plan — semaine 1, semaine 2, puis les 2 mois suivants, avec un seul indicateur à suivre sur chaque relevé.",
  ],
  pricing: [
    { label: "Pré-diagnostic", value: "Offert", note: "20 minutes au téléphone, sans engagement. Si l'enjeu ne justifie pas le bilan, on vous le dit." },
    { label: "Bilan Commissions · Restauration · Express 72 h", value: "490 €", note: "Les 5 rubriques sur vos chiffres, livré sous 72 heures ouvrées, restitution de 30 minutes incluse" },
  ],
  pricingNotes: [
    "Tarif de lancement, **puis 790 €.** Réglé à la commande.",
    "TVA non applicable, art. 293 B du CGI.",
    "Pièces à fournir pour le bilan : relevés de versement Uber Eats et Deliveroo des 3 derniers mois, export de caisse des ventes par plat, prix d'achat de vos principaux ingrédients.",
  ],
  commitments: [
    "Pré-diagnostic offert, sans engagement.",
    "Vos chiffres restent confidentiels. Ils ne sont jamais transmis à un tiers.",
    "Les trois premiers leviers se lisent sur vos prochains relevés de versement : le bilan se rembourse en quelques semaines dans la plupart des cas.",
    "Aucune action du plan ne demande de quitter les plateformes.",
  ],
  example: {
    intro: "Pizzeria Il Forno (fictif), Paris 11e, 620 000 € de chiffre d'affaires dont un tiers en livraison, cas illustratif complet disponible dans nos réalisations :",
    stats: [
      { value: "69 488 €", label: "par an versés aux plateformes : commissions, promotions et remboursements" },
      { value: "4 plats", label: "qui gardent moins de 30 % de marge en livraison" },
      { value: "+209 € / sem.", label: "de marge avec les 3 leviers immédiats, soit 10 861 € par an" },
    ],
    article: "bilan-commissions-restauration-pizzeria-il-forno",
  },
  related: {
    text: "Hôtelier ? Les commissions de Booking.com et d'Expedia ont leur propre bilan.",
    href: "/sur-mesure/hotellerie-restauration",
    cta: "Voir le Bilan Commissions pour les hôtels",
  },
  cta: "Réserver mon pré-diagnostic (20 min)",
  formSecteur: "Restauration",
  formTitle: "Votre pré-diagnostic Bilan Commissions · Restauration",
};

const OFFER_BTP: Offer = {
  brand: "Plan Argent Dormant",
  brandLine: "Une offre Sena Consulting · pour les entreprises du bâtiment · liste et messages en 3 jours ouvrés · garantie",
  headline: "Votre trésorerie dort dans vos fichiers.",
  sub: "Devis jamais relancés, factures en retard, retenues de garantie jamais réclamées, travail fait pas encore facturé. Ce n'est pas du chiffre d'affaires à trouver : c'est de l'argent déjà gagné, à encaisser.",
  changedTitle: "Ce que vos fichiers contiennent déjà",
  stats: [
    { value: "60 j et plus", label: "de délai de paiement chez beaucoup de clients professionnels : c'est votre trésorerie qui finance l'attente" },
    { value: "5 %", label: "de retenue de garantie sur chaque chantier, à libérer un an après la réception. Combien n'ont jamais été réclamées ?" },
    { value: "40 €", label: "d'indemnité forfaitaire due de plein droit par facture en retard entre professionnels, en plus des pénalités" },
  ],
  pains: [
    { title: "« Je n'ai pas le temps de relancer »", text: "Les devis partent, les factures aussi. Personne n'a le temps de rappeler : le chantier suivant a déjà commencé." },
    { title: "« Mes clients paient en retard »", text: "Situations de novembre payées en janvier, factures à 60 jours, parfois plus. Vous avancez les matériaux et les salaires." },
    { title: "« La retenue, je verrai plus tard »", text: "5 % de chaque chantier, libérables un an après la réception. Sans demande, l'argent reste chez le client." },
  ],
  steps: [
    { when: "Offert · 20 min", title: "Pré-diagnostic au téléphone", text: "Vos retards, vos retenues, vos devis en attente. On vous dit si le Plan vaut le coup, et on ne vend pas sous le seuil de la garantie." },
    { when: "Jour 0", title: "4 exports", text: "Devis, factures, chantiers réceptionnés, travaux en cours. Depuis votre logiciel ou vos fichiers Excel, on les sort ensemble si besoin." },
    { when: "3 jours ouvrés", title: "La liste et les messages", text: "Le tableau trié des sommes à encaisser et les messages prêts à envoyer. Restitution de 30 minutes." },
    { when: "J+7", title: "Le point de suivi", text: "15 minutes : ce qui est rentré, ce qui bloque, ce qu'on ajuste." },
  ],
  deliverables: [
    "Le tableau trié des sommes à relancer, par gisement et par priorité : montant × chances de paiement.",
    "Les messages prêts à envoyer : relance des devis, relances de factures R1 à R3, demande de libération de retenue, envoi des situations et avenants.",
    "Le plan des 10 premiers jours : qui relancer, quand, avec quel message, pour environ 6 heures de votre temps.",
    "La restitution de 30 minutes et le point de suivi de 15 minutes à J+7.",
  ],
  table: {
    title: "Les quatre gisements",
    head: ["Gisement", "Ce qu'on cherche", "Ce que vous recevez"],
    rows: [
      ["Devis sans réponse", "Les devis envoyés depuis 3 à 12 mois, jamais relancés", "Tri chaud / tiède / froid, SMS et e-mails de relance"],
      ["Factures échues", "Les factures dépassées, par tranche de retard", "Relances R1 à R3, pénalités et indemnité de 40 € calculées"],
      ["Retenues de garantie", "Les chantiers réceptionnés depuis plus d'un an", "Courrier de demande de libération, chantier par chantier"],
      ["Travail fait non facturé", "Situations non émises, travaux supplémentaires non facturés", "Situations et avenants prêts à envoyer"],
    ],
  },
  pricing: [
    { label: "Pré-diagnostic", value: "Offert", note: "20 minutes au téléphone, sans engagement." },
    { label: "Plan Argent Dormant", value: "490 €", note: "Tarif de lancement, réservé aux 10 premières entreprises, puis 790 €. Réglé à la commande." },
  ],
  pricingNotes: [
    "**Garantie :** si nous identifions moins de 5 000 € de factures, retenues et travaux à encaisser (hors devis), vous êtes remboursé.",
    "Prix nets, TVA non applicable, art. 293 B du CGI.",
    "Références : loi n° 71-584 du 16 juillet 1971 (retenue de garantie) ; art. L441-10 du Code de commerce (pénalités de retard et indemnité forfaitaire).",
  ],
  audience: "Pour les entreprises du bâtiment de 3 à 49 salariés, second œuvre et gros œuvre, en Île-de-France.",
  commitments: [
    "Nous ne relançons jamais vos clients à votre place : les messages partent de chez vous, à votre nom.",
    "Nous ne promettons pas que vos clients paieront. Nous garantissons ce que nous trouvons.",
    "Vos fichiers restent confidentiels et sont supprimés à la fin de la mission. On peut travailler sans les coordonnées de vos clients.",
    "Une seule retenue de garantie de 2 000 € récupérée paie quatre fois la mission.",
  ],
  example: {
    intro: "Mystère Plomberie Chauffage (fictif), Hauts-de-Seine, 11 salariés, cas illustratif complet disponible dans nos réalisations :",
    stats: [
      { value: "148 490 €", label: "identifiés hors devis : factures échues, retenues, travail fait non facturé" },
      { value: "104 641 €", label: "encaissables sous 30 à 60 jours, en hypothèse prudente" },
      { value: "94 devis", label: "jamais relancés, 612 000 € HT" },
    ],
    article: "plan-argent-dormant-mystere-plomberie-chauffage",
  },
  cta: "Réserver le pré-diagnostic (20 min, offert)",
  formSecteur: "BTP",
  formTitle: "Votre pré-diagnostic Plan Argent Dormant",
};

export const SEGMENT_PAGES: SegmentPage[] = [
  { slug: "btp", label: "BTP", formSecteur: "BTP", offer: OFFER_BTP },
  { slug: "organisme-de-formation", label: "Organisme de formation", formSecteur: "Organisme de formation", offer: OFFER_ORGANISMES_FORMATION },
  {
    slug: "garagiste-carrossier", label: "Garagiste / Carrossier", formSecteur: "Garagiste / Carrossier",
    audience: "Garages et carrosseries indépendants",
    subpages: [
      { slug: "garagiste-carrossier-agree", label: "Carrossiers agréés — Bilan Agréments Assureurs", status: "ready" },
      { slug: "garagiste-carrossier-non-agree", label: "Carrossiers non agréés — Plan Libre Choix", status: "ready" },
    ],
  },
  { slug: "garagiste-carrossier-agree", label: "Carrossiers agréés", parent: "Garagiste / Carrossier", formSecteur: "Garagiste / Carrossier", offer: OFFER_CARROSSIERS_AGREES },
  { slug: "garagiste-carrossier-non-agree", label: "Carrossiers non agréés", parent: "Garagiste / Carrossier", formSecteur: "Garagiste / Carrossier", offer: OFFER_CARROSSIERS_NON_AGREES },
  { slug: "hotellerie-restauration", label: "Hôtellerie / Restauration", formSecteur: "Hôtellerie / Tourisme", offer: OFFER_HOTELLERIE },
  { slug: "restauration", label: "Restaurants", parent: "Hôtellerie / Restauration", formSecteur: "Restauration", offer: OFFER_RESTAURATION },
  { slug: "tourisme", label: "Tourisme", formSecteur: "Hôtellerie / Tourisme", offer: OFFER_TOURISME_ACTIVITES },
  { slug: "ecole-de-conduite", label: "École de conduite", formSecteur: "École de conduite", offer: OFFER_AUTO_ECOLES },
  { slug: "evenementiel", label: "Professionnels de l'Événementiel", formSecteur: "Professionnels de l'Événementiel", offer: OFFER_EVENEMENTIEL },
  { slug: "agences-immobilieres", label: "Agences immobilières", formSecteur: "Agences immobilières", offer: OFFER_AGENCES_IMMO },
];
