// Cas concrets publiés dans « Réalisations » (façon blog).
// Le gras est marqué **…** dans les textes, interprété au rendu.

export type Stat = { value: string; label: string };
export type BarSeries = { name: string; color?: string; values: number[] };
export type Bloc =
  | { t: "p" | "h2" | "h3" | "note"; c: string }
  | { t: "ul"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "stats"; items: Stat[] }
  | { t: "bars"; title: string; unit: string; categories: string[]; series: BarSeries[]; max?: number }
  | { t: "radar"; title: string; axes: string[]; series: { name: string; color?: string; values: number[] }[]; max: number };

export type Realisation = {
  slug: string;
  titre: string;
  sousTitre: string;
  offre: string;          // marque de l'offre
  segment: string;        // libellé lisible
  segmentSlug: string;    // page Sur mesure associée
  date: string;           // ISO
  lecture: string;        // « 6 min »
  resume: string;         // résumé conséquent (tuile)
  chiffres: Stat[];       // 3 chiffres visibles sur la tuile
  apercu: { t: "bars"; title: string; unit: string; categories: string[]; series: BarSeries[]; max?: number }; // mini-graphe de la tuile
  pdf?: string;           // fichier dans /public/realisations/
  blocs: Bloc[];
};

export const REALISATIONS: Realisation[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 4. Plan Libre Choix — Carrossiers non agréés (SPECS v1.2 §3)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "plan-libre-choix-carrosserie-mystere",
    titre: "Carrosserie « Mystère » : 13 sinistres par mois partis chez un garage agréé",
    sousTitre: "Plan Libre Choix — les sinistres qui passent devant l'atelier, et comment les faire entrer",
    offre: "Plan Libre Choix",
    segment: "Carrossiers non agréés",
    segmentSlug: "garagiste-carrossier-non-agree",
    date: "2026-09-29",
    lecture: "6 min",
    resume:
      "Une carrosserie indépendante du Val-d'Oise, 4 personnes, sans aucun agrément. Sur 26 contacts liés à un sinistre chaque mois, 13 repartent ailleurs : 6 parce que le client croit devoir aller chez le garage de son assurance, 4 parce qu'il ne veut pas avancer les frais. Le diagnostic note la maturité libre choix de l'atelier sur six leviers (2,5 sur 10 aujourd'hui) et construit un plan de 90 jours : script d'accueil, cession de créance, dossier expert sans litige, fiche Google, avis, prescripteurs. Scénario prudent : +2,1 dossiers par mois, environ 16 k€ de marge brute par an.",
    chiffres: [
      { value: "13 / mois", label: "sinistres partis ailleurs" },
      { value: "2,5 / 10", label: "maturité libre choix" },
      { value: "16,4 k€", label: "de marge en plus par an (prudent)" },
    ],
    apercu: {
      t: "bars", title: "Sinistres partis ailleurs, par raison (par mois)", unit: "",
      categories: ["Orientés par l'assureur", "Avance de frais", "Devis non relancé", "Délai"],
      series: [{ name: "Départs / mois", values: [6, 4, 2, 1] }],
    },
    pdf: "PLAN_LIBRE_CHOIX_EXEMPLE.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Entreprise", "Carrosserie « Mystère » — carrosserie indépendante, Val-d'Oise (95)"],
        ["Équipe", "4 personnes : le gérant, 2 carrossiers-peintres, 1 préparateur"],
        ["Activité", "2 600 heures vendues sur 3 600 possibles (72 % d'occupation) · taux affiché 68 € HT"],
        ["Sinistres", "13 dossiers réparés par mois · dossier moyen 1 480 € HT · marge brute 651 € par dossier"],
        ["Assureurs", "Aucun agrément : l'atelier travaille en libre choix avec toutes les compagnies"],
      ]},
      { t: "note", c: "Données fictives, construites pour illustrer la méthode. Aucune carrosserie ni aucun assureur réel n'est visé." },
      { t: "h2", c: "Ce que le diagnostic a montré" },
      { t: "stats", items: [
        { value: "13 / mois", label: "sinistres partis ailleurs après un appel ou un passage" },
        { value: "0", label: "cession de créance : chaque client avance les frais" },
        { value: "72 %", label: "d'occupation : l'atelier a de la place" },
        { value: "1 180 €", label: "refusés par les assureurs en 2026 : facture au-dessus de l'accord de l'expert" },
      ]},
      { t: "h2", c: "Ce que dit la loi, en clair" },
      { t: "table", head: ["Le texte", "Au comptoir"], rows: [
        ["**Libre choix du réparateur** — art. L211-5-1 du Code des assurances (loi Hamon, 2014)", "« Votre assurance vous propose un garage. Elle ne peut pas vous l'imposer. »"],
        ["**Cession de créance** — art. L211-5-2 (loi n° 2020-1508 du 3 décembre 2020)", "« Vous n'avancez pas les frais : votre assureur nous paie directement, hors franchise. »"],
        ["**Limite du paiement** — Cour de cassation, 22 janvier 2026, n° 24-19.267", "Pas de travaux sans l'accord de l'expert ; la facture colle à l'accord."],
        ["**Publicité** — art. L121-4 du Code de la consommation", "Jamais « agréé toutes assurances » : « Nous travaillons avec votre assurance, quelle qu'elle soit. »"],
      ]},
      { t: "note", c: "Informations générales, pas un avis juridique." },
      { t: "h2", c: "Où partent les sinistres" },
      { t: "bars", title: "Pourquoi 13 sinistres sur 26 sont partis (par mois)", unit: "",
        categories: ["« Mon assurance m'envoie chez un agréé »", "« Je ne veux pas avancer les frais »", "Devis jamais relancé", "Délai trop long"],
        series: [{ name: "Départs / mois", values: [6, 4, 2, 1] }] },
      { t: "p", c: "10 départs sur 13 tiennent à deux phrases que l'accueil ne sait pas contrer. Ce n'est ni un problème de prix, ni un problème de qualité : c'est un problème d'information." },
      { t: "h2", c: "La maturité libre choix de l'atelier" },
      { t: "radar", title: "Six leviers notés sur 10 : aujourd'hui et objectif à 90 jours", max: 10,
        axes: ["Accueil du sinistré", "Sans avance de frais", "Dossier expert", "Fiche Google", "Avis clients", "Prescripteurs"],
        series: [
          { name: "Aujourd'hui (2,5 / 10)", values: [3, 0, 4, 4, 3, 1] },
          { name: "Objectif à 90 jours (7,3 / 10)", values: [8, 8, 8, 7, 7, 6] },
        ]},
      { t: "h2", c: "Le plan sur 90 jours" },
      { t: "ul", items: [
        "**Jours 1 à 7** — script d'accueil et carte « Vos droits » ; cession de créance ; check-list du dossier expert.",
        "**Jour 7** — visite à l'atelier : répétition du script, QR code des avis, photos.",
        "**Jours 7 à 30** — fiche Google remise à niveau, SMS d'avis à chaque restitution.",
        "**Jours 15 à 60** — 30 prescripteurs locaux contactés : dépanneurs, garages mécaniques, auto-écoles, flottes, courtiers.",
        "**J30, J60, J90** — point sur le tableau de bord : contacts, dossiers, cessions, avis.",
      ]},
      { t: "h2", c: "Ce que ça peut rapporter" },
      { t: "bars", title: "Marge brute en plus par an, selon le scénario", unit: "€",
        categories: ["Bas", "Prudent", "Central"],
        series: [{ name: "Marge / an", values: [7033, 16410, 27741] }] },
      { t: "p", c: "Hypothèses : entre 5 et 15 % des clients orientés par leur assureur, 15 à 35 % de ceux qui refusaient d'avancer les frais, et jusqu'à la moitié des devis non relancés. L'atelier a 1 000 heures libres par an : le scénario prudent en demande 277. Un seul dossier en plus paie le Plan." },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bilan-agrements-carrosserie-mystere",
    titre: "Carrosserie « Mystère » : 40 % de l'activité payée au prix coûtant",
    sousTitre: "Bilan Agréments Assureurs — ce que chaque assureur paie vraiment, comparé aux références du secteur",
    offre: "Bilan Agréments Assureurs",
    segment: "Carrossiers agréés",
    segmentSlug: "garagiste-carrossier-agree",
    date: "2026-09-27",
    lecture: "7 min",
    resume:
      "Une carrosserie indépendante des Hauts-de-Seine, 6 personnes, 790 k€ de chiffre d'affaires et trois agréments assureurs. Le bilan compare chaque convention aux références du secteur sur six critères (taux de main-d'œuvre, ingrédients peinture, revalorisation, délai de paiement, remises, volume) et calcule d'abord le seuil que l'assureur n'a pas : le coût de revient de l'heure vendue, 58 € HT. Résultat : l'assureur qui apporte 40 % du volume paie exactement ce seuil, l'écart annuel avec les références atteint 44 k€ et les délais immobilisent 34 k€ de trésorerie. Trois décisions en sortent, avec l'argumentaire chiffré pour chacune.",
    chiffres: [
      { value: "44,2 k€", label: "d'écart par an vs références" },
      { value: "34,1 k€", label: "de trésorerie immobilisée" },
      { value: "58 € / h", label: "coût de revient, payé par l'assureur A" },
    ],
    apercu: {
      t: "bars", title: "Note pondérée de chaque convention (sur 10)", unit: "/10",
      categories: ["Assureur A", "Assureur B", "Assureur C"],
      series: [{ name: "Note / 10", values: [4.3, 6.7, 2.8] }], max: 10,
    },
    pdf: "BILAN_AGREMENTS_ASSUREURS_EXEMPLE.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Entreprise", "Carrosserie « Mystère » — carrosserie indépendante, Hauts-de-Seine (92)"],
        ["Équipe", "6 personnes (gérant + 4 compagnons + 1 accueil)"],
        ["Activité", "790 k€ HT · 4 800 heures vendues par an"],
        ["Agréments", "Assureur A (40 % de l'activité) · Assureur B (25 %) · Assureur C (15 %) · clients directs en libre choix (20 %)"],
      ]},
      { t: "note", c: "Données fictives, construites pour illustrer la méthode. Aucune carrosserie ni aucun assureur réel n'est visé." },

      { t: "h2", c: "Ce que le bilan a révélé" },
      { t: "stats", items: [
        { value: "40 %", label: "de l'activité payée au prix coûtant (Assureur A : 58 € / h = coût de revient)" },
        { value: "44,2 k€", label: "d'écart par an sur main-d'œuvre et peinture vs références" },
        { value: "34,1 k€", label: "de trésorerie immobilisée par les délais de paiement" },
        { value: "68 j", label: "de délai chez l'Assureur C, au-delà du plafond légal de 60 jours" },
      ]},

      { t: "h2", c: "La méthode en quatre temps" },
      { t: "ul", items: [
        "**Collecter** — conventions d'agrément, barèmes 2026, 12 mois de factures assureurs, charges de l'atelier.",
        "**Calculer** — le coût de revient d'une heure vendue : le seuil sous lequel vous travaillez à perte.",
        "**Comparer** — chaque convention sur 6 critères, notés de 0 à 10 face aux références du secteur.",
        "**Décider** — pour chaque assureur : renégocier, garder ou questionner, avec l'argumentaire chiffré.",
      ]},

      { t: "h2", c: "Le seuil : coût de revient d'une heure vendue" },
      { t: "table", head: ["", "Montant"], rows: [
        ["Charges annuelles de l'atelier (salaires chargés, loyer, énergie, cabine, assurances…)", "278 400 €"],
        ["÷ heures effectivement vendues sur l'année", "4 800 h"],
        ["= Coût de revient d'une heure vendue", "**58,00 € HT**"],
      ]},
      { t: "p", c: "Toute heure payée à 58 € ou moins ne rapporte rien. C'est le chiffre que l'assureur n'a pas, et c'est le premier argument de la négociation." },

      { t: "h2", c: "Les trois conventions face aux références" },
      { t: "radar", title: "Chaque convention notée sur 6 critères (10 = référence du secteur)", max: 10,
        axes: ["Taux T2", "Ingrédients peinture", "Revalorisation 2026", "Délai de paiement", "Remise pièces", "Volume apporté"],
        series: [
          { name: "Assureur A", values: [3.1, 4.3, 3.3, 2.7, 3.3, 10] },
          { name: "Assureur B", values: [6.6, 7.1, 6.7, 8.3, 5.8, 6.2] },
          { name: "Assureur C", values: [4.9, 5.2, 0, 0, 1.7, 3.7] },
        ]},
      { t: "table", head: ["Critère", "Référence", "Assureur A", "Assureur B", "Assureur C"], rows: [
        ["Taux T2", "70 €", "58 € · 3,1", "64 € · 6,6", "61 € · 4,9"],
        ["Ingrédients peinture", "42 €", "36 € · 4,3", "39 € · 7,1", "37 € · 5,2"],
        ["Revalorisation 2026", "+4,5 %", "+1,5 % · 3,3", "+3,0 % · 6,7", "+0,0 % · 0,0"],
        ["Délai de paiement", "30 j", "52 j · 2,7", "35 j · 8,3", "68 j · 0,0"],
        ["Remise pièces", "0 %", "8 % · 3,3", "5 % · 5,8", "10 % · 1,7"],
        ["Volume apporté", "—", "40 % · 10,0", "25 % · 6,2", "15 % · 3,7"],
        ["**Note pondérée / 10**", "", "**4,3**", "**6,7**", "**2,8**"],
      ]},
      { t: "p", c: "Ce que montre le diagramme : l'Assureur A n'est large que sur un seul axe, le volume. Sur tout le reste, il est sous l'Assureur B. Le volume est la seule raison de garder cette convention : il doit donc se payer au juste prix." },

      { t: "h2", c: "Ce que chaque convention coûte, en euros" },
      { t: "bars", title: "Écart annuel vs références du secteur, par assureur", unit: "€",
        categories: ["Assureur A", "Assureur B", "Assureur C"],
        series: [
          { name: "Écart main-d'œuvre + peinture", values: [27648, 8640, 7920] },
          { name: "Trésorerie immobilisée", values: [19047, 2705, 12337] },
        ]},
      { t: "table", head: ["Par an", "Assureur A", "Assureur B", "Assureur C", "Total"], rows: [
        ["Heures vendues", "1 920 h", "1 200 h", "720 h", "3 840 h"],
        ["Marge par heure", "+0 €", "+6 €", "+3 €", "—"],
        ["Écart total vs références", "27 648 €", "8 640 €", "7 920 €", "**44 208 €**"],
        ["Remises pièces consenties", "13 056 €", "5 100 €", "6 120 €", "24 276 €"],
        ["Trésorerie immobilisée", "19 047 €", "2 705 €", "12 337 €", "**34 089 €**"],
      ]},

      { t: "h2", c: "Les trois décisions" },
      { t: "h3", c: "Assureur A — renégocier en priorité" },
      { t: "p", c: "Il apporte 40 % du volume, mais chaque heure est payée au prix coûtant. Demande chiffrée : T2 de 58 à 64 € / h, indexation des ingrédients peinture, délai ramené à 30 jours." },
      { t: "h3", c: "Assureur B — garder, demander l'indexation" },
      { t: "p", c: "Meilleure convention du portefeuille (6,7 / 10). Seul point à corriger : la revalorisation 2026 (+3,0 %) reste sous l'indice SRA (+4,5 %)." },
      { t: "h3", c: "Assureur C — questionner l'agrément" },
      { t: "p", c: "Revalorisation nulle, remise de 10 %, paiement à 68 jours pour 15 % du volume. Si la convention n'est pas mise à niveau, ces heures rapportent davantage en clients directs." },

      { t: "h2", c: "L'argumentaire de négociation : Assureur A" },
      { t: "p", c: "Quatre arguments, dans l'ordre où les présenter. Chacun s'appuie sur un chiffre que l'assureur peut vérifier." },
      { t: "ul", items: [
        "**Le seuil de rentabilité** — « Votre taux T2 de 58 € correspond exactement à notre coût de revient d'une heure vendue. Sur 40 % de notre activité, nous ne dégageons aucune marge. »",
        "**Votre propre indice** — « L'indice SRA, publié par l'association des assureurs, mesure +4,5 % sur les taux de main-d'œuvre carrosserie en 2025. La revalorisation accordée est de +1,5 %. L'écart s'accumule chaque année. »",
        "**Le délai de paiement** — « Nous sommes payés à 52 jours en moyenne. Cela immobilise environ 19 000 € de trésorerie, que nous finançons à votre place. »",
        "**La qualité rendue** — délais d'immobilisation et taux de réclamation, à faire reconnaître dans le barème.",
      ]},
      { t: "table", head: ["Demande", "De → à", "Gain annuel si obtenu"], rows: [
        ["Taux T2", "58 € → 64 €", "11 520 €"],
        ["Ingrédients peinture", "36 € → 39 €", "2 304 €"],
        ["Délai de paiement", "52 j → 30 j", "≈ 19 000 € de trésorerie"],
        ["Repli si le taux est refusé", "Suppression du véhicule de courtoisie gratuit et de la plateforme payante", "À chiffrer"],
      ]},

      { t: "h2", c: "Ce que le bilan coûte au client : payé au résultat" },
      { t: "p", c: "Le client paie 190 € à la remise du dossier, puis 30 % du gain obtenu, la première année seulement. Les 190 € sont déduits de la commission, le reste est payé en 3 prélèvements. Si l'assureur ne bouge pas, le bilan lui a coûté 190 € au total." },
      { t: "bars", title: "Ce que garde le client la première année, selon l'issue de la négociation", unit: "€",
        categories: ["Rien n'aboutit", "La moitié aboutit", "Tout aboutit"],
        series: [
          { name: "Gain année 1", values: [0, 7488, 14976] },
          { name: "Gardé par le client", values: [-190, 5242, 10483] },
        ]},
      { t: "note", c: "Le client négocie lui-même : Sena Consulting prépare, ne négocie pas à sa place et ne promet pas de résultat. L'assureur reste libre." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bilan-financements-linea-formation",
    titre: "Linéa Formation : 200 820 € de perte annuelle évitable après le plafonnement CPF",
    sousTitre: "Bilan Financements — combien le plafonnement CPF coûte à un organisme de formation, et comment le récupérer",
    offre: "Bilan Financements",
    segment: "Organisme de formation",
    segmentSlug: "organisme-de-formation",
    date: "2026-09-26",
    lecture: "8 min",
    resume:
      "Un organisme de formation certifié Qualiopi, 9 salariés, 1,05 M€ de chiffre d'affaires dont 74 % financés par le CPF. Depuis le 26 février 2026, le CPF plafonne à 1 500 € par certification et une participation de 150 € s'ajoute par dossier : 4 de ses 7 formations dépassent le plafond et 134 270 € d'écart sont reportés sur les stagiaires. Le bilan mesure l'exposition formation par formation, la dépendance aux financeurs, chiffre trois scénarios tarifaires et active le levier employeur. Le statu quo coûte 200 820 € par an ; l'offre mixte recommandée en préserve 72 341 €, avec un plan en 90 jours.",
    chiffres: [
      { value: "4 sur 7", label: "formations au-dessus du plafond CPF" },
      { value: "134 270 €", label: "d'écart reporté sur les stagiaires" },
      { value: "+72 341 €", label: "préservés par an avec le scénario recommandé" },
    ],
    apercu: {
      t: "bars", title: "Chiffre d'affaires projeté selon le scénario (4 formations plafonnées)", unit: "€",
      categories: ["CA 2025", "A · Statu quo", "B · Tout sous 1 500 €", "C · Offre mixte"],
      series: [{ name: "CA annuel", values: [573770, 372950, 392913, 445291] }],
    },
    pdf: "BILAN_FINANCEMENTS_EXEMPLE.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Organisme", "Linéa Formation (fictif) · Hauts-de-Seine"],
        ["Effectif", "9 salariés, dont 6 formateurs"],
        ["Certification", "Qualiopi, catégorie actions de formation"],
        ["Chiffre d'affaires 2025", "1 048 000 €"],
        ["Part CPF du chiffre d'affaires", "74 % (779 230 €)"],
        ["Catalogue analysé", "7 formations certifiantes (6 au Répertoire spécifique, 1 au RNCP)"],
        ["Données utilisées", "Catalogue public, bilan pédagogique et financier 2025, export des dossiers CPF 2025"],
      ]},

      { t: "h2", c: "Ce qui a changé en 2026" },
      { t: "table", head: ["Mesure", "Depuis", "Effet"], rows: [
        ["Plafond par action : 1 500 € pour les certifications du Répertoire spécifique (1 600 € pour un bilan de compétences, 900 € pour le permis B)", "26 février 2026", "Au-delà du plafond, l'écart n'est plus payé par le CPF, quel que soit le solde du stagiaire."],
        ["Participation forfaitaire portée à 150 € par dossier", "2 avril 2026", "S'ajoute à l'écart. Ne s'applique ni aux demandeurs d'emploi, ni aux formations cofinancées par l'employeur."],
      ]},
      { t: "p", c: "**Conséquence pour Linéa Formation.** Un stagiaire qui s'inscrit en anglais professionnel doit désormais sortir 840 € de sa poche (690 € d'écart et 150 € de participation), contre 100 € en 2025. Sur ce type de formation, les organismes du secteur rapportent des baisses d'inscriptions de 30 à 50 %." },

      { t: "h2", c: "Rubrique 1 — Exposition, formation par formation" },
      { t: "bars", title: "Exposition = écart au plafond × dossiers CPF 2025", unit: "€",
        categories: ["Anglais pro + TOEIC", "Espagnol pro + Linguaskill", "Excel + TOSA", "Français pro + certification"],
        series: [{ name: "Exposition", values: [81420, 18620, 18240, 15990] }],
      },
      { t: "table", head: ["Formation", "Prix", "Dossiers 2025", "Écart au plafond", "Reste à charge", "Exposition"], rows: [
        ["Anglais professionnel + TOEIC", "2 190 €", "118", "690 €", "840 €", "81 420 €"],
        ["Excel perfectionnement + TOSA", "1 690 €", "96", "190 €", "340 €", "18 240 €"],
        ["Espagnol professionnel + Linguaskill", "1 990 €", "38", "490 €", "640 €", "18 620 €"],
        ["Français professionnel + certification", "1 890 €", "41", "390 €", "540 €", "15 990 €"],
        ["CACES R489", "1 450 €", "62", "0 €", "150 €", "—"],
        ["Créer son entreprise", "1 290 €", "44", "0 €", "150 €", "—"],
        ["Titre pro Secrétaire assistant (RNCP)", "4 900 €", "12", "non plafonné", "150 €", "—"],
        ["**Total reporté sur les stagiaires**", "", "", "", "", "**134 270 €**"],
      ]},
      { t: "p", c: "L'anglais concentre 61 % de l'exposition : forte demande et écart de 690 €. Excel, avec seulement 190 € d'écart, se corrige par un simple ajustement tarifaire." },

      { t: "h2", c: "Rubrique 2 — Dépendance aux financeurs" },
      { t: "bars", title: "Chiffre d'affaires 2025 par financeur", unit: "€",
        categories: ["CPF — formations plafonnées", "CPF — sous le plafond", "OPCO et entreprises", "France Travail et Région", "Particuliers"],
        series: [{ name: "CA 2025", values: [573770, 205460, 186000, 58000, 24770] }],
      },
      { t: "p", c: "Linéa Formation dépend du CPF pour près des trois quarts de son activité, et plus de la moitié de son chiffre d'affaires (55 %) repose sur des formations que le CPF ne finance plus intégralement. Le canal entreprises existe (186 000 €) mais n'est pas travaillé activement : il est aujourd'hui le seul levier de compensation à la main de l'organisme." },

      { t: "h2", c: "Rubrique 3 — Trois scénarios chiffrés" },
      { t: "bars", title: "CA annuel projeté sur les 4 formations plafonnées (293 dossiers en 2025)", unit: "€",
        categories: ["CA 2025 (référence)", "A · Statu quo", "B · Tout sous 1 500 €", "C · Offre mixte (recommandé)"],
        series: [{ name: "CA projeté", values: [573770, 372950, 392913, 445291] }],
      },
      { t: "table", head: ["Scénario", "Principe et hypothèses", "CA projeté", "Perte vs 2025"], rows: [
        ["A · Statu quo", "Prix inchangés. Hypothèse : −35 % de dossiers.", "372 950 €", "−200 820 €"],
        ["B · Tout sous le plafond", "Les 4 formations passent à 1 490 €. Hypothèse : −10 % de dossiers.", "392 913 €", "−180 857 €"],
        ["**C · Offre mixte**", "25 % des dossiers en cofinancement employeur au prix plein ; pour les autres, socle certifiant à 1 500 € + module d'accompagnement hors CPF à 290 € (pris par 40 %). Hypothèse : −15 % de dossiers.", "**445 291 €**", "**−128 479 €**"],
      ]},
      { t: "p", c: "**Recommandation : scénario C.** Il préserve 72 341 € par an par rapport au statu quo et 52 378 € par rapport à une baisse générale des prix. Le scénario B paraît prudent mais détruit de la marge sur chaque dossier, y compris sur les stagiaires qui auraient payé l'écart." },

      { t: "h2", c: "Rubrique 4 — Le levier employeur" },
      { t: "p", c: "Le cofinancement employeur est le seul mécanisme qui neutralise à la fois l'écart au plafond et la participation forfaitaire. Un dossier cofinancé est exonéré des 150 € ; pour l'entreprise, la dépense se limite à l'écart." },
      { t: "table", head: ["Anglais professionnel + TOEIC (2 190 €)", "CPF seul", "CPF + employeur"], rows: [
        ["Pris en charge par le CPF", "1 500 €", "1 500 €"],
        ["Payé par l'employeur", "—", "690 €"],
        ["Payé par le salarié", "**840 €**", "**0 €**"],
      ]},
      { t: "p", c: "Le bilan livre l'argumentaire prêt à envoyer aux entreprises : « former vos équipes en anglais pour 690 € par salarié », avec la liste des salariés déjà inscrits en 2025 comme point d'entrée." },

      { t: "h2", c: "Rubrique 5 — Plan d'action sur 90 jours" },
      { t: "ul", items: [
        "**J1 → J30** — Sécuriser les dossiers en cours. Passer Excel au plafond de 1 500 €. Contacter chaque stagiaire salarié ayant abandonné un devis depuis mars avec la proposition d'abondement employeur. Indicateur : 15 dossiers cofinancés signés.",
        "**J31 → J60** — Restructurer l'offre : socle certifiant à 1 500 € et module d'accompagnement à 290 € hors CPF pour l'anglais, l'espagnol et le français. Indicateur : 3 fiches EDOF publiées, taux de prise du module ≥ 30 %.",
        "**J61 → J90** — Ouvrir le canal entreprises : prospecter 40 PME du bassin avec une offre intra-entreprise. Indicateur : part OPCO et entreprises portée de 18 % à 25 % du chiffre d'affaires.",
      ]},

      { t: "h2", c: "Conclusion" },
      { t: "p", c: "Linéa Formation n'a pas un problème de demande : ses formations se vendaient en 2025. Elle a un problème de financement, qui se règle par le prix, la structure de l'offre et le canal de vente. Le statu quo coûte environ 200 820 € par an ; l'offre mixte en préserve 72 341 €." },
      { t: "note", c: "Document d'exemple. Linéa Formation est un organisme fictif ; ses chiffres sont construits sur des ordres de grandeur du secteur. Réglementation citée : loi de finances pour 2026 et décrets du 24 février 2026 (plafonds CPF) ; participation forfaitaire de 150 € depuis le 2 avril 2026." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "audit-strategique-pizzeria-bella-nocta",
    titre: "Pizzeria Bella Nocta : sortir de 18 mois de stagnation en 30 jours",
    sousTitre: "Audit stratégique d'activité — diagnostic en 4 piliers, échelle de maturité et Quick Wins",
    offre: "Audit stratégique",
    segment: "Restauration",
    segmentSlug: "hotellerie-restauration",
    date: "2026-08-10",
    lecture: "6 min",
    resume:
      "Une pizzeria de 3 salariés, 280 000 € de chiffre d'affaires, 6 ans d'activité et 18 mois de stagnation. L'audit passe l'activité au crible de quatre piliers (offre et positionnement, acquisition, opérations, fidélisation), la positionne sur une échelle de maturité face aux cinq meilleurs acteurs du secteur (2,2 / 5 contre 4,4 / 5), puis identifie cinq Quick Wins à activer dans les 30 premiers jours : réactiver la visibilité locale, afficher un différenciateur, lancer une fidélisation simple, déléguer les commandes fournisseurs, ouvrir une prise de commande directe sans commission. Résultat attendu : +10 à 20 % de fréquentation et 6 h par semaine rendues au dirigeant.",
    chiffres: [
      { value: "2,2 / 5", label: "score de maturité, contre 4,4 / 5 pour le top 5" },
      { value: "15 h / sem.", label: "passées par le dirigeant sur des tâches délégables" },
      { value: "+10 à 20 %", label: "de fréquentation attendue à 30 jours" },
    ],
    apercu: {
      t: "bars", title: "Échelle de maturité : Bella Nocta vs top 5 du secteur", unit: "/5",
      categories: ["Marketing", "Commercial", "Opérationnel", "Financier", "Rétention"],
      series: [{ name: "Bella Nocta", values: [2, 2, 2, 3, 2] }, { name: "Top 5 secteur", values: [5, 4, 5, 4, 4] }], max: 5,
    },
    pdf: "AUDIT_STRATEGIQUE_EXEMPLE_PIZZERIA.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Entreprise", "Pizzeria Bella Nocta (fictive)"],
        ["Secteur", "Restauration"],
        ["Effectif", "3 salariés (dirigeant + 2)"],
        ["Chiffre d'affaires", "280 000 € / an"],
        ["Ancienneté", "6 ans d'activité"],
        ["Situation", "Activité qui stagne depuis 18 mois"],
      ]},

      { t: "h2", c: "Partie 1 — Diagnostic en 4 piliers" },
      { t: "h3", c: "01 — Offre et positionnement" },
      { t: "p", c: "Offre phare : menu « pizza artisanale + dessert » à 14 €, marge estimée à 58 %. Aucun différenciateur affiché, prix alignés sur la concurrence locale. **Points forts** : marge correcte, carte courte et maîtrisée. **Points faibles** : positionnement généraliste dans un marché saturé, pas d'offre premium, le client ne sait pas pourquoi choisir Bella Nocta plutôt qu'un concurrent." },
      { t: "h3", c: "02 — Acquisition et vente" },
      { t: "p", c: "70 % de bouche-à-oreille, 30 % de Google Maps. Aucune prospection, pas de suivi du coût d'acquisition ni de la valeur client, réseaux sociaux inactifs depuis 8 mois. **Points forts** : fiche Google correctement renseignée, bons avis (4,3 / 5). **Points faibles** : acquisition 100 % passive, aucun levier actionnable en cas de baisse de trafic." },
      { t: "h3", c: "03 — Opérations et délégation" },
      { t: "p", c: "Le dirigeant passe 15 h par semaine sur des tâches à faible valeur (commandes fournisseurs, plannings, relances). Aucun processus ni outil de gestion. **Points forts** : équipe stable, faible turnover. **Points faibles** : le dirigeant est le goulot d'étranglement de son propre développement." },
      { t: "h3", c: "04 — Rétention et fidélisation" },
      { t: "p", c: "Achats one-shot, pas de programme de fidélité, pas de collecte d'emails, avis jamais sollicités. **Point fort** : satisfaction naturelle correcte. **Point faible** : chaque client est potentiellement perdu après sa première commande ; zéro capitalisation sur la base existante." },

      { t: "h2", c: "Partie 2 — Échelle de maturité et benchmark" },
      { t: "radar", title: "Positionnement face aux 5 meilleurs acteurs du secteur (sur 5)", max: 5,
        axes: ["Marketing / Positionnement", "Commercial / Acquisition", "Opérationnel / Automatisation", "Financier / Marge", "Rétention / Fidélisation"],
        series: [
          { name: "Bella Nocta", values: [2, 2, 2, 3, 2] },
          { name: "Top 5 secteur", values: [5, 4, 5, 4, 4] },
        ]},
      { t: "table", head: ["Axe stratégique", "Bella Nocta", "Top 5 secteur", "Écart"], rows: [
        ["Marketing / Positionnement", "2 / 5", "5 / 5", "−3"],
        ["Commercial / Acquisition", "2 / 5", "4 / 5", "−2"],
        ["Opérationnel / Automatisation", "2 / 5", "5 / 5", "−3"],
        ["Financier / Marge", "3 / 5", "4 / 5", "−1"],
        ["Rétention / Fidélisation", "2 / 5", "4 / 5", "−2"],
        ["**Score moyen**", "**2,2 / 5**", "**4,4 / 5**", "**−2,2**"],
      ]},
      { t: "p", c: "L'axe le plus critique est le marketing : l'enseigne est quasi invisible et ne se différencie pas. L'axe le moins défavorable est financier : la structure de coûts reste saine malgré la stagnation." },

      { t: "h2", c: "Partie 3 — Plan d'actions et Quick Wins (30 jours)" },
      { t: "table", head: ["Action", "Quand", "Effort", "Impact CA", "Pilier"], rows: [
        ["Réactiver Instagram / Google Business (3 posts par semaine, réponse aux avis sous 24 h)", "J1 – J7", "Faible", "+++", "Marketing"],
        ["Créer et afficher un différenciateur (« la seule pizza napolitaine authentique du quartier, pâte fermentée 48 h »)", "J1 – J7", "Faible", "+++", "Marketing"],
        ["Offre de fidélisation simple (carte 10 passages, collecte prénom + email)", "J7 – J14", "Faible", "++", "Rétention"],
        ["Déléguer les commandes fournisseurs (template hebdomadaire, un salarié formé)", "J7 – J14", "Moyen", "++", "Opérations"],
        ["Click & Collect / commande directe (WhatsApp ou outil simple), sans les 30 % de commission des plateformes", "J14 – J30", "Moyen", "+++", "Commercial"],
      ]},
      { t: "ul", items: [
        "**KPI visibilité** : impressions Google +30 % en 14 jours, 2 avis supplémentaires par semaine.",
        "**KPI fidélisation** : 50 cartes distribuées et 30 emails collectés à J30.",
        "**KPI opérations** : 6 h par semaine libérées, 0 rupture de stock à J30.",
        "**KPI commercial** : 10 commandes en direct dans les 30 jours, marge +8 points vs plateformes.",
      ]},

      { t: "h2", c: "Conclusion" },
      { t: "p", c: "Bella Nocta présente un profil typique des TPE en phase de stagnation : des fondamentaux solides (marge saine, équipe stable, bons avis) mais aucun moteur de croissance ni levier d'acquisition maîtrisé. Le dirigeant est à la fois opérateur et stratège, ce qui ne lui laisse pas le temps de développer son activité. Les 5 Quick Wins, mis en œuvre dans les 30 premiers jours, peuvent générer une hausse de fréquentation estimée entre 10 et 20 % et libérer 6 h par semaine de temps dirigeant." },
      { t: "note", c: "Document d'exemple. Toutes les données sont fictives et ne représentent aucune entreprise réelle." },
    ],
  },
];

export const getRealisation = (slug: string) => REALISATIONS.find((r) => r.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
