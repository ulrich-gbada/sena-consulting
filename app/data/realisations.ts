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
  // 8. Plan Argent Dormant — BTP (SPECS BTP v1.0 §4 et §6)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "plan-argent-dormant-mystere-plomberie-chauffage",
    titre: "Mystère Plomberie Chauffage : 148 490 € qui dormaient dans ses fichiers",
    sousTitre: "Plan Argent Dormant — factures échues, retenues de garantie oubliées, travail fait non facturé et devis jamais relancés",
    offre: "Plan Argent Dormant",
    segment: "BTP",
    segmentSlug: "btp",
    date: "2026-09-29",
    lecture: "6 min",
    resume:
      "Un plombier-chauffagiste fictif des Hauts-de-Seine, 11 salariés, 1,45 M€ de chiffre d'affaires, des clients professionnels qui paient à 60 jours et plus. En trois jours ouvrés, le Plan a passé ses quatre exports au crible : 86 400 € de factures échues, 18 650 € de retenues de garantie exigibles, 43 440 € de travail fait non facturé, et 94 devis jamais relancés pour 612 000 € HT. Au total, 148 490 € déjà gagnés hors devis, dont 104 641 € encaissables sous 30 à 60 jours en hypothèse prudente, avec la liste triée et les messages prêts à envoyer.",
    chiffres: [
      { value: "148 490 €", label: "identifiés, hors devis" },
      { value: "104 641 €", label: "encaissables sous 30 à 60 jours (prudent)" },
      { value: "94", label: "devis jamais relancés" },
    ],
    apercu: {
      t: "bars", title: "Les quatre gisements : identifié et encaissable (prudent)", unit: "€",
      categories: ["Factures échues", "Retenues de garantie", "Réalisé non facturé", "Acomptes sur devis"],
      series: [{ name: "Identifié", values: [86400, 18650, 43440, 10461] }, { name: "Encaissable (prudent)", values: [43335, 13055, 37790, 10461] }],
    },
    pdf: "PLAN_ARGENT_DORMANT_EXEMPLE.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Entreprise", "Mystère Plomberie Chauffage (fictive) — plomberie, chauffage, climatisation · Hauts-de-Seine (92)"],
        ["Effectif", "11 salariés : le gérant, 8 techniciens, 1 chargé d'affaires, 1 assistante à mi-temps"],
        ["Chiffre d'affaires", "1,45 M€ HT · clients professionnels (entreprises générales, syndics, bailleurs) et particuliers"],
        ["Données utilisées", "Quatre exports : devis, factures, chantiers réceptionnés, travaux en cours"],
      ]},
      { t: "note", c: "Entreprise et montants fictifs. Les taux d'encaissement sont des hypothèses : le gain dépend des clients de l'entreprise, qui restent libres de payer ou non." },

      { t: "h2", c: "Rubrique 1 — Les quatre gisements" },
      { t: "stats", items: [
        { value: "86 400 €", label: "de factures échues, dont 18 500 € à plus de 90 jours" },
        { value: "18 650 €", label: "de retenues de garantie libérables depuis plus d'un an, jamais réclamées" },
        { value: "43 440 €", label: "de travail fait non facturé : situations non émises, travaux supplémentaires" },
        { value: "612 000 €", label: "de devis sans réponse (94 devis), dont 148 000 € jugés chauds" },
      ]},
      { t: "bars", title: "Identifié et encaissable sous 30 à 60 jours, par gisement", unit: "€",
        categories: ["Factures échues", "Retenues de garantie", "Réalisé non facturé + travaux supp.", "Acomptes sur devis relancés"],
        series: [{ name: "Identifié", values: [86400, 18650, 43440, 10461] }, { name: "Encaissable (prudent)", values: [43335, 13055, 37790, 10461] }] },
      { t: "table", head: ["Gisement", "Identifié", "Encaissable (prudent)"], rows: [
        ["Factures échues", "86 400 €", "43 335 €"],
        ["Retenues de garantie", "18 650 €", "13 055 €"],
        ["Réalisé non facturé + travaux supplémentaires", "43 440 €", "37 790 €"],
        ["Acomptes sur devis relancés", "10 461 €", "10 461 €"],
        ["**Total**", "**148 490 € (hors devis)**", "**104 641 €**"],
      ]},
      { t: "p", c: "Le gisement le plus rapide n'est pas le plus gros : le travail fait non facturé s'encaisse presque en totalité, parce qu'il suffit d'émettre la situation. Les factures échues, elles, dépendent des clients." },

      { t: "h2", c: "Rubrique 2 — Les devis sans réponse" },
      { t: "bars", title: "94 devis jamais relancés, triés par chances de signature", unit: "€",
        categories: ["21 devis chauds", "38 devis tièdes", "35 devis froids"],
        series: [{ name: "Montant HT", values: [148000, 261000, 203000] }] },
      { t: "p", c: "Un devis chaud est un devis de moins de trois mois, pour un client déjà connu ou un chantier daté. Les 21 devis chauds reçoivent un SMS puis un appel ; les tièdes un e-mail avec une date de validité ; les froids une seule relance. Hypothèse retenue : 30 % de signature sur les chauds avec un acompte de 30 %, soit 10 461 € d'acomptes sous 30 jours." },

      { t: "h2", c: "Rubrique 3 — Les factures en retard" },
      { t: "bars", title: "Factures échues par tranche de retard", unit: "€",
        categories: ["1 à 30 jours", "31 à 60 jours", "61 à 90 jours", "Plus de 90 jours"],
        series: [{ name: "Montant TTC", values: [31800, 13400, 22700, 18500] }] },
      { t: "table", head: ["Retard", "Montant", "Message", "Hypothèse d'encaissement"], rows: [
        ["1 à 30 jours", "31 800 €", "R1 : rappel courtois, RIB joint", "80 %"],
        ["31 à 60 jours", "13 400 €", "R2 : rappel des pénalités de retard et de l'indemnité de 40 €", "60 %"],
        ["61 à 90 jours", "22 700 €", "R3 : dernier rappel avant mise en demeure", "35 %"],
        ["Plus de 90 jours", "18 500 €", "Mise en demeure par le conseil du client ou son organisation professionnelle", "15 %"],
      ]},
      { t: "p", c: "Entre professionnels, les pénalités de retard et l'indemnité forfaitaire de 40 € par facture sont dues de plein droit (art. L441-10 du Code de commerce). Le Plan les calcule ; le dirigeant décide de les mentionner ou non." },

      { t: "h2", c: "Rubrique 4 — Retenues de garantie et chantiers" },
      { t: "p", c: "La retenue de garantie est plafonnée à 5 % du marché et doit être libérée un an après la réception, sauf opposition motivée du client (loi n° 71-584 du 16 juillet 1971). Sur 14 chantiers réceptionnés depuis plus d'un an, 9 retenues n'ont jamais été réclamées : **18 650 €**, dont 13 055 € encaissables sous 60 jours avec un simple courrier de demande de libération, chantier par chantier." },
      { t: "p", c: "Côté chantiers en cours, 3 situations de travaux n'ont pas été émises et 6 travaux supplémentaires ont été réalisés sans avenant : **43 440 €** de travail déjà fait, dont 37 790 € facturables immédiatement." },

      { t: "h2", c: "Rubrique 5 — Le plan des 10 premiers jours" },
      { t: "ul", items: [
        "**Jour 1** — Émettre les 3 situations et les 6 avenants (43 440 €). Envoyer les 9 courriers de libération de retenue.",
        "**Jour 2** — Relances R1 et R2 sur les factures de moins de 60 jours (45 200 €).",
        "**Jours 3 à 5** — SMS puis appel sur les 21 devis chauds ; e-mail sur les 38 tièdes.",
        "**Jour 7** — Relances R3 ; point de suivi de 15 minutes : ce qui est rentré, ce qui bloque.",
        "**Jour 10** — Dernière relance sur les devis froids ; dossiers de plus de 90 jours transmis au conseil ou à l'organisation professionnelle.",
      ]},
      { t: "p", c: "Temps du dirigeant : environ 6 heures sur 10 jours, messages fournis. Un seul indicateur : le montant encaissé chaque semaine, rapporté aux 104 641 € attendus." },

      { t: "h2", c: "Ce que ce cas ne dit pas" },
      { t: "p", c: "Il ne dit pas que les clients paieront : l'hypothèse prudente suppose qu'une partie ne répondra pas. Il ne dit pas non plus que les 612 000 € de devis se signeront : seuls les acomptes des devis chauds sont comptés. Ce qu'il dit, c'est que 148 490 € étaient déjà gagnés et n'avaient jamais été réclamés. Une seule retenue de garantie de 2 000 € récupérée paie quatre fois la mission." },
      { t: "note", c: "Document d'exemple. Mystère Plomberie Chauffage est une entreprise fictive ; ses chiffres sont construits pour être plausibles pour une PME de cette taille, pas pour être moyens. Sena Consulting ne contacte jamais un débiteur : les messages partent de l'entreprise." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Bilan Commissions · Restauration — Pizzeria Il Forno
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bilan-commissions-restauration-pizzeria-il-forno",
    titre: "Pizzeria Il Forno : 69 488 € par an versés aux plateformes de livraison",
    sousTitre: "Bilan Commissions · Restauration · Express 72 h — ce qu'Uber Eats et Deliveroo coûtent, plat par plat, et ce qui revient dès les prochains relevés",
    offre: "Bilan Commissions · Restauration",
    segment: "Restauration",
    segmentSlug: "restauration",
    date: "2026-09-29",
    lecture: "6 min",
    resume:
      "Une pizzeria indépendante de 45 places à Paris 11e, 7 salariés, 620 000 € de chiffre d'affaires dont un tiers en livraison via Uber Eats et Deliveroo, en formule Premium sans l'avoir jamais mesurée. Le bilan additionne ce que les plateformes prélèvent vraiment (commissions, promotions cofinancées, remboursements déduits : 35 % des ventes en livraison), calcule la marge de chaque plat en salle et en livraison, et chiffre cinq leviers. Les trois leviers immédiats rapportent 209 € par semaine, visibles dès les prochains relevés de versement.",
    chiffres: [
      { value: "69 488 €", label: "par an versés aux plateformes" },
      { value: "35 %", label: "de chaque euro vendu en livraison" },
      { value: "+10 861 €", label: "de marge par an avec les 3 leviers immédiats" },
    ],
    apercu: {
      t: "bars", title: "Part du chiffre d'affaires par canal", unit: "%",
      categories: ["Uber Eats", "Deliveroo", "Click & collect", "Sur place, emporter"],
      series: [{ name: "Part du CA", values: [20, 12, 3, 65] }], max: 70,
    },
    pdf: "CAS_CLIENT_MYSTERE_BILAN_COMMISSIONS_RESTAURATION.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Restaurant", "Pizzeria Il Forno (fictif) · Paris 11e · pizzeria, 45 places"],
        ["Effectif", "7 salariés"],
        ["Chiffre d'affaires 2025", "620 000 €, dont 198 400 € en livraison via les plateformes"],
        ["Données utilisées", "Relevés de versement Uber Eats et Deliveroo sur 3 mois, export de caisse des ventes par plat, coûts matière estimés avec le gérant"],
      ]},
      { t: "note", c: "Document d'exemple. Pizzeria Il Forno est un restaurant fictif ; ses chiffres sont construits sur des ordres de grandeur du secteur et ne représentent aucune entreprise réelle." },

      { t: "h2", c: "Rubrique 1 — Dépendance aux plateformes" },
      { t: "bars", title: "Part du chiffre d'affaires par canal, 12 derniers mois", unit: "%",
        categories: ["Uber Eats (Premium)", "Deliveroo", "Click & collect direct", "Sur place et à emporter"],
        series: [{ name: "Part du CA", values: [20, 12, 3, 65] }], max: 70 },
      { t: "table", head: ["Canal", "Part", "Chiffre d'affaires", "Commission", "Montant versé"], rows: [
        ["Uber Eats (formule Premium)", "20 %", "124 000 €", "30 %", "37 200 €"],
        ["Deliveroo", "12 %", "74 400 €", "30 %", "22 320 €"],
        ["Click & collect direct", "3 %", "18 600 €", "—", "—"],
        ["Sur place et à emporter", "65 %", "403 000 €", "—", "—"],
      ]},

      { t: "h2", c: "Rubrique 2 — Le coût réel" },
      { t: "stats", items: [
        { value: "59 520 €", label: "de commissions sur 12 mois" },
        { value: "9 968 €", label: "de promotions cofinancées (6 000 €) et de remboursements clients déduits (3 968 €)" },
        { value: "69 488 €", label: "au total : 35 % des ventes en livraison, 11,2 % du chiffre d'affaires" },
      ]},
      { t: "p", c: "Un tiers du chiffre d'affaires passe par la livraison, et plus d'un euro sur trois vendu en livraison repart vers la plateforme. Il Forno est en formule Premium sur Uber Eats (30 %) sans avoir mesuré ce que la visibilité supplémentaire lui rapporte." },

      { t: "h2", c: "Rubrique 3 — La carte livraison, plat par plat" },
      { t: "p", c: "Marge sur coût matière et emballage, en salle et en livraison, après 30 % de commission et 2 % de remboursements. Quatre plats gardent moins de 30 % en livraison." },
      { t: "bars", title: "Marge par plat : en salle et en livraison (%)", unit: "%",
        categories: ["Margherita", "Regina", "Quatre fromages", "Burrata truffe", "Calzone", "Carbonara", "Lasagnes", "Tiramisu", "Salade César", "Boisson"],
        series: [{ name: "En salle", values: [71, 68, 61, 53, 67, 68, 58, 74, 59, 66] }, { name: "En livraison", values: [39, 36, 29, 21, 35, 36, 26, 42, 27, 34] }], max: 80 },
      { t: "table", head: ["Plat", "Prix", "Matière + emballage", "Marge en salle", "Marge en livraison"], rows: [
        ["Margherita", "11,00 €", "3,20 €", "7,80 € · 71 %", "4,28 € · 39 %"],
        ["Regina", "13,50 €", "4,30 €", "9,20 € · 68 %", "4,88 € · 36 %"],
        ["**Quatre fromages**", "14,50 €", "5,60 €", "8,90 € · 61 %", "**4,26 € · 29 %**"],
        ["**Burrata truffe**", "18,00 €", "8,40 €", "9,60 € · 53 %", "**3,84 € · 21 %**"],
        ["Calzone", "14,00 €", "4,60 €", "9,40 € · 67 %", "4,92 € · 35 %"],
        ["Pâtes carbonara", "13,00 €", "4,20 €", "8,80 € · 68 %", "4,64 € · 36 %"],
        ["**Lasagnes maison**", "14,00 €", "5,90 €", "8,10 € · 58 %", "**3,62 € · 26 %**"],
        ["Tiramisu", "6,50 €", "1,70 €", "4,80 € · 74 %", "2,72 € · 42 %"],
        ["**Salade César**", "12,50 €", "5,10 €", "7,40 € · 59 %", "**3,40 € · 27 %**"],
        ["Boisson 33 cl", "3,50 €", "1,20 €", "2,30 € · 66 %", "1,18 € · 34 %"],
      ]},
      { t: "p", c: "Les mêmes plats gardent environ deux fois moins de marge en livraison qu'en salle. La burrata truffe, les lasagnes, la salade César et les quatre fromages descendent sous 30 % : ce sont eux qu'on augmente en premier sur la carte livraison, ou qu'on retire si la hausse ne passe pas. La marge présentée ne couvre ni la main-d'œuvre ni les charges fixes : un plat à 20 % de marge sur coût matière est, en pratique, vendu à perte en livraison." },

      { t: "h2", c: "Rubrique 4 — Cinq leviers chiffrés" },
      { t: "bars", title: "Gain de marge annuel par levier", unit: "€",
        categories: ["Carte livraison +8 %", "Remboursements contestés", "Premium → Plus", "Promotions arrêtées", "Click & collect direct"],
        series: [{ name: "Gain / an", values: [6785, 1984, 1934, 2092, 2698] }] },
      { t: "table", head: ["Levier", "Effet", "Gain / an"], rows: [
        ["Prix de la carte livraison +8 % (plats à marge faible en priorité)", "Prochain relevé", "+6 785 €"],
        ["Contester les remboursements injustifiés", "Prochain relevé", "+1 984 €"],
        ["Formule Uber Eats Premium → Plus", "Selon délai de la plateforme", "+1 934 €"],
        ["Arrêter les promotions cofinancées non rentables", "Prochain relevé", "+2 092 €"],
        ["Click & collect direct (8 % des commandes)", "4 à 8 semaines", "+2 698 €"],
        ["**Total, scénario central**", "", "**+15 494 €**"],
      ]},
      { t: "p", c: "Hypothèses : prix +8 % en livraison avec 5 % de commandes en moins ; la moitié des remboursements injustifiés récupérée ; formule Plus au lieu de Premium avec 8 % de commandes Uber Eats en moins ; 60 % du budget promotions arrêté ; 8 % des commandes ramenées en direct avec 10 % de remise et 3 % de frais. Les trois leviers immédiats (prix, remboursements, promotions) rapportent **10 861 € par an, soit environ 209 € par semaine**, visibles dès les prochains relevés. Scénario prudent, si la moitié seulement se réalise : 7 747 € par an." },

      { t: "h2", c: "Rubrique 5 — Le plan, semaine par semaine" },
      { t: "ul", items: [
        "**Semaine 1 — Carte livraison.** Hausse de 8 % des prix en livraison, en commençant par les 4 plats sous 30 % ; retrait de ceux qui ne passent pas. Mise à jour dans Uber Eats Manager et Deliveroo Hub.",
        "**Semaine 1 — Remboursements.** Contester chaque remboursement sans photo ni motif clair, dans les délais de la plateforme.",
        "**Semaine 1 — Promotions.** Arrêter les offres cofinancées dont la commande moyenne ne couvre pas la remise.",
        "**Semaine 2 — Formule Uber Eats.** Demander le passage de Premium à Plus ; suivre les commandes pendant 4 semaines.",
        "**Semaines 2 à 8 — Click & collect direct.** Bouton de commande sur la fiche Google et le site, flyer dans chaque sac livré avec une remise sur la commande directe suivante.",
        "**Semaines 3 à 8 — Événements.** Soirées à thème vendues à l'avance par Instagram, la fiche Google et l'affichage en salle, jamais de SMS ou d'e-mail sans consentement.",
      ]},
      { t: "p", c: "Un seul indicateur : frais de plateforme ÷ ventes en livraison, relevé sur chaque versement. Il part ici de 35 %." },

      { t: "h2", c: "Conclusion" },
      { t: "p", c: "Il Forno vend bien en livraison, mais a fixé sa carte livraison comme sa carte en salle. Avec 30 % de commission, les mêmes prix ne laissent plus la même marge, et certains plats ne rapportent presque plus rien. Les trois leviers immédiats rapportent environ 209 € par semaine, dès les prochains relevés : le bilan est remboursé en moins d'un mois." },
      { t: "note", c: "Taux de commission : Uber Eats 15 % (Lite), 25 % (Plus), 30 % (Premium) ; Deliveroo 25 à 35 % avec livraison (comparatifs professionnels 2026). Le gain dépend de la mise en œuvre par le restaurant et des réactions des clients : il n'est pas garanti." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Bilan Commissions · Activités — Lumière Tours (avenant Tourisme §6)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bilan-commissions-activites-lumiere-tours",
    titre: "Lumière Tours : 87 574 € par an versés aux plateformes",
    sousTitre: "Bilan Commissions · Activités — ce que GetYourGuide et Viator coûtent à un opérateur, et ce que rapporte la vente directe",
    offre: "Bilan Commissions · Activités",
    segment: "Tourisme",
    segmentSlug: "tourisme",
    date: "2026-09-29",
    lecture: "6 min",
    resume:
      "Un opérateur de visites à vélo et de food tours à Paris, 6 salariés et 10 guides indépendants, 7 400 participants et 481 000 € de chiffre d'affaires, dont 66 % via GetYourGuide et Viator. Ni bons cadeaux en ligne, ni réservation depuis Google, un site plus cher que la plateforme. Le bilan chiffre commissions et promotions canal par canal (87 574 € par an, 18,2 % du chiffre d'affaires), note la vente directe sur huit points (3 / 10) et calcule ce que rapporte chaque point de ventes ramené en direct : 6 662 € par an dans le scénario central, sans compter les bons cadeaux de Noël.",
    chiffres: [
      { value: "66 %", label: "des ventes via les plateformes" },
      { value: "87 574 €", label: "de commissions et promotions par an" },
      { value: "+6 662 €", label: "de marge par an (central, hors bons cadeaux)" },
    ],
    apercu: {
      t: "bars", title: "Part du chiffre d'affaires par canal", unit: "%",
      categories: ["GetYourGuide", "Viator", "Autres plateformes", "Site", "Entreprises, groupes", "Téléphone", "Bons cadeaux"],
      series: [{ name: "Part du CA", values: [38, 22, 6, 14, 12, 5, 3] }], max: 40,
    },
    pdf: "CAS_CLIENT_MYSTERE_BILAN_COMMISSIONS_ACTIVITES.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Opérateur", "Lumière Tours (fictif) · Paris"],
        ["Activité", "Visites guidées à vélo et food tours · 6 salariés, 10 guides indépendants"],
        ["Participants 2025", "7 400 participants · prix moyen 65 €"],
        ["Chiffre d'affaires", "481 000 €"],
        ["Données utilisées", "Relevés de paiement GetYourGuide et Viator sur 12 mois, export du logiciel de réservation, site, fiche Google"],
      ]},
      { t: "note", c: "Document d'exemple. Lumière Tours est un opérateur fictif ; ses chiffres sont construits sur des ordres de grandeur du secteur et ne représentent aucune entreprise réelle." },

      { t: "h2", c: "Rubrique 1 — Dépendance aux plateformes" },
      { t: "bars", title: "Part du chiffre d'affaires par canal de vente, 12 derniers mois", unit: "%",
        categories: ["GetYourGuide", "Viator", "Autres plateformes", "Site (moteur)", "Entreprises, groupes", "Téléphone, e-mail, sur place", "Bons cadeaux"],
        series: [{ name: "Part du CA", values: [38, 22, 6, 14, 12, 5, 3] }], max: 40 },
      { t: "table", head: ["Canal", "Part", "Chiffre d'affaires", "Commission", "Montant versé"], rows: [
        ["GetYourGuide", "38 %", "182 780 €", "25 %", "45 695 €"],
        ["Viator", "22 %", "105 820 €", "22 %", "23 280 €"],
        ["Autres plateformes", "6 %", "28 860 €", "20 %", "5 772 €"],
        ["Site (moteur de réservation)", "14 %", "67 340 €", "—", "—"],
        ["Entreprises, groupes, privatisations", "12 %", "57 720 €", "—", "—"],
        ["Téléphone, e-mail, sur place", "5 %", "24 050 €", "—", "—"],
        ["Bons cadeaux", "3 %", "14 430 €", "—", "—"],
        ["**Total plateformes**", "**66 %**", "**317 460 €**", "", "**74 747 €**"],
      ]},
      { t: "p", c: "Deux participants sur trois arrivent par une plateforme, et GetYourGuide seul pèse 38 % du chiffre d'affaires. Les plateformes apportent des touristes étrangers que l'opérateur ne toucherait pas seul : elles restent utiles. Le sujet est ailleurs : une partie de ces ventes pourrait être faite en direct." },

      { t: "h2", c: "Rubrique 2 — Le coût réel de la distribution" },
      { t: "stats", items: [
        { value: "74 747 €", label: "de commissions versées aux plateformes sur 12 mois" },
        { value: "12 827 €", label: "de promotions (10 % sur 40 % des ventes GetYourGuide et Viator)" },
        { value: "87 574 €", label: "de coût total, soit 18,2 % du chiffre d'affaires" },
      ]},
      { t: "table", head: ["Ce que ça représente", ""], rows: [
        ["Par jour", "240 €"],
        ["Par participant vendu sur une plateforme", "17,93 €"],
        ["Sur un billet à 65 € vendu sur GetYourGuide", "16,25 € de commission ; avec une promotion de 10 %, 21,13 €"],
      ]},
      { t: "p", c: "Les plateformes gardent l'adresse e-mail du client : l'opérateur ne peut pas le recontacter, et le client revient… sur la plateforme. Les avis s'accumulent sur la plateforme (1 240 sur GetYourGuide) plutôt que sur Google (85). Et le site est plus cher que GetYourGuide : le food tour du samedi est à 65 € sur la plateforme et à 69 € sur le site. Contrairement aux hôtels, aucune loi n'encadre les clauses de prix entre un opérateur d'activités et une plateforme : les conditions de chaque contrat sont vérifiées dans le bilan avant toute recommandation de prix." },

      { t: "h2", c: "Rubrique 3 — Diagnostic de la vente directe" },
      { t: "table", head: ["Point vérifié", "Constat", "Niveau"], rows: [
        ["Prix du site face aux plateformes", "Plus cher que GetYourGuide (+4 € sur le food tour)", "**Critique**"],
        ["Réservation depuis Google", "Non activée (moteur non connecté à Google)", "**Critique**"],
        ["Bons cadeaux en ligne", "Non proposés, alors que Noël arrive", "**Critique**"],
        ["Moteur de réservation", "Présent, 6 étapes, paiement peu adapté au téléphone", "À corriger"],
        ["Avis Google", "85 avis, contre 1 240 sur GetYourGuide et 610 sur Viator", "À corriger"],
        ["Données clients", "Aucune collecte d'e-mail le jour de l'activité", "À corriger"],
        ["Entreprises, groupes, privatisations", "12 % du CA, sans page dédiée ni tarif groupe", "Opportunité"],
        ["Hôtels partenaires (concierges)", "Aucun partenariat formalisé", "Opportunité"],
      ]},
      { t: "stats", items: [
        { value: "3 / 10", label: "maturité de la vente directe aujourd'hui" },
        { value: "6 / 10", label: "objectif à 90 jours, une fois le plan appliqué" },
      ]},
      { t: "p", c: "Les touristes étrangers découvrent l'opérateur sur les plateformes, et c'est normal. Mais trois publics pourraient acheter en direct : les Français qui offrent une activité (bons cadeaux), les entreprises et les groupes, et les clients qui cherchent l'opérateur par son nom sur Google. Aujourd'hui, aucun des trois n'a de raison de passer par le site." },

      { t: "h2", c: "Rubrique 4 — Trois scénarios chiffrés" },
      { t: "bars", title: "Gain de marge annuel selon le scénario", unit: "€",
        categories: ["Prudent · 5 points", "Central · 8 points", "Ambitieux · 12 points"],
        series: [{ name: "Gain de marge / an", values: [4164, 6662, 9993] }] },
      { t: "table", head: ["Scénario", "Points ramenés", "Chiffre d'affaires basculé", "Gain de marge par an"], rows: [
        ["Prudent", "5 points", "24 050 €", "4 164 €"],
        ["**Central**", "**8 points**", "**38 480 €**", "**6 662 €**"],
        ["Ambitieux", "12 points", "57 720 €", "9 993 €"],
      ]},
      { t: "p", c: "Une vente sur plateforme rapporte de 75 à 80 % du prix après commission, moins encore avec une promotion. La même vente en direct rapporte 91 % du prix : on déduit 6 % de coût du canal direct et 3 % pour un avantage offert au client. Chaque euro basculé rapporte donc en moyenne 17,3 % de marge en plus. Objectif retenu : le scénario central, passer de 34 % à 42 % de ventes directes, soit 6 662 € par an, sans compter les bons cadeaux vendus en plus à Noël." },

      { t: "h2", c: "Rubrique 5 — Plan d'action sur 90 jours" },
      { t: "ul", items: [
        "**J1 → J15 — Bons cadeaux de Noël.** Mise en vente sur le site (module du moteur de réservation), page dédiée, envoi aux anciens clients directs, affiche au point de départ. Indicateur : bons vendus avant le 24 décembre.",
        "**J1 → J15 — Prix et avantage direct.** Site jamais plus cher qu'une plateforme ; un avantage réservé au direct, affiché.",
        "**J1 → J30 — Google.** Activités réservables depuis Google via le moteur de réservation ; routine d'avis Google avec QR code en fin d'activité.",
        "**J15 → J45 — Entreprises et groupes.** Page « Groupes et privatisations », tarif groupe, envoi à 50 entreprises et comités d'entreprise.",
        "**J30 → J60 — Hôtels partenaires.** 20 concierges d'hôtels du quartier, commission de 10 % et lien de réservation dédié.",
        "**J60 → J90 — Données clients et programmes des plateformes.** Collecte de l'e-mail le jour de l'activité, avec consentement ; revoir l'intérêt des promotions à la lumière des chiffres.",
      ]},
      { t: "p", c: "Un seul indicateur chapeaute tout : le coût des plateformes rapporté au chiffre d'affaires, relevé chaque mois sur les relevés de paiement. Il part ici de 18,2 %. Aucune action ne demande de quitter les plateformes." },

      { t: "h2", c: "Conclusion" },
      { t: "p", c: "Lumière Tours a de bons produits et d'excellents avis. Son problème n'est pas la demande : c'est de laisser les plateformes encaisser 87 574 € par an, y compris sur des ventes qui pourraient se faire en direct. Le scénario central rapporte 6 662 € de marge par an. La première action, les bons cadeaux, peut rapporter dès décembre." },
      { t: "note", c: "Taux de commission des plateformes d'activités : publications professionnelles 2026 (Viator 20 % standard, jusqu'à 25 à 30 % avec programmes ; GetYourGuide 20 à 30 %). Le gain dépend de la mise en œuvre du plan par l'opérateur : il n'est pas garanti." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Bilan Commissions — Hôtel des Tilleuls (SPECS Hôtellerie §6)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bilan-commissions-hotel-des-tilleuls",
    titre: "Hôtel des Tilleuls : 163 274 € par an versés aux plateformes",
    sousTitre: "Bilan Commissions — ce que la distribution coûte vraiment à un hôtel indépendant, et ce que rapporte le retour au direct",
    offre: "Bilan Commissions",
    segment: "Hôtellerie",
    segmentSlug: "hotellerie-restauration",
    date: "2026-09-29",
    lecture: "7 min",
    resume:
      "Un hôtel indépendant de 28 chambres à Paris, 80 % d'occupation, 142 € de prix moyen, 1,16 M€ de chiffre d'affaires dont 62 % via Booking.com, Expedia et les autres plateformes, un site plus cher que Booking.com. Le bilan additionne commissions et remise Genius (163 274 € par an, 14,1 % du chiffre d'affaires, 447 € par jour), note la vente directe sur huit points (3 / 10) et calcule ce que rapporte chaque point de réservations ramené en direct : 16 768 € de marge par an dans le scénario central, avec un plan de 90 jours qui ne quitte aucune plateforme.",
    chiffres: [
      { value: "62 %", label: "des réservations via les plateformes" },
      { value: "163 274 €", label: "de commissions et remises par an" },
      { value: "+16 768 €", label: "de marge par an (scénario central)" },
    ],
    apercu: {
      t: "bars", title: "Part du chiffre d'affaires par canal", unit: "%",
      categories: ["Booking.com", "Expedia", "Autres plateformes", "Site", "Téléphone", "Entreprises"],
      series: [{ name: "Part du CA", values: [48, 11, 3, 9, 17, 12] }], max: 50,
    },
    pdf: "CAS_CLIENT_MYSTERE_BILAN_COMMISSIONS.pdf",
    blocs: [
      { t: "h2", c: "Le client" },
      { t: "table", head: ["", ""], rows: [
        ["Hôtel", "Hôtel des Tilleuls (fictif) · Paris 12e · hôtel indépendant 3 étoiles"],
        ["Capacité", "28 chambres · taux d'occupation 80 % · prix moyen 142 €"],
        ["Chiffre d'affaires hébergement", "1 160 992 €"],
        ["Données utilisées", "Relevés de commissions Booking.com et Expedia sur 12 mois, ventes par canal du logiciel de gestion, site, fiche Google"],
      ]},
      { t: "note", c: "Document d'exemple. L'Hôtel des Tilleuls est un établissement fictif ; ses chiffres sont construits sur des ordres de grandeur du secteur et ne représentent aucune entreprise réelle." },

      { t: "h2", c: "Rubrique 1 — Dépendance aux plateformes" },
      { t: "bars", title: "Part du chiffre d'affaires par canal de réservation, 12 derniers mois", unit: "%",
        categories: ["Booking.com", "Expedia", "Autres plateformes", "Site (moteur)", "Téléphone, e-mail", "Entreprises"],
        series: [{ name: "Part du CA", values: [48, 11, 3, 9, 17, 12] }], max: 50 },
      { t: "table", head: ["Canal", "Part", "Chiffre d'affaires", "Commission", "Montant versé"], rows: [
        ["Booking.com", "48 %", "557 276 €", "18 %", "100 310 €"],
        ["Expedia", "11 %", "127 709 €", "18 %", "22 988 €"],
        ["Autres plateformes", "3 %", "34 830 €", "17 %", "5 921 €"],
        ["Site (moteur de réservation)", "9 %", "104 489 €", "—", "—"],
        ["Téléphone, e-mail", "17 %", "197 369 €", "—", "—"],
        ["Entreprises", "12 %", "139 319 €", "—", "—"],
        ["**Total plateformes**", "**62 %**", "**719 815 €**", "", "**129 218 €**"],
      ]},
      { t: "p", c: "Près de deux réservations sur trois passent par une plateforme, et Booking.com seul pèse près de la moitié du chiffre d'affaires. Les plateformes apportent des clients que l'hôtel ne toucherait pas seul : elles restent utiles. Le sujet est ailleurs : une partie de ces réservations, celles des clients réguliers, des entreprises et des clients qui cherchent l'hôtel par son nom, pourrait être faite en direct." },

      { t: "h2", c: "Rubrique 2 — Le coût réel de la distribution" },
      { t: "stats", items: [
        { value: "129 218 €", label: "de commissions versées aux plateformes sur 12 mois" },
        { value: "34 056 €", label: "de remises Genius (10 % sur 55 % des réservations Booking.com)" },
        { value: "163 274 €", label: "de coût total, soit 14,1 % du chiffre d'affaires" },
      ]},
      { t: "table", head: ["Ce que ça représente", ""], rows: [
        ["Par jour", "447 €"],
        ["Par chambre et par an", "5 831 €"],
        ["Par nuitée vendue sur une plateforme", "32,21 €"],
      ]},
      { t: "p", c: "La commission n'est qu'une partie du coût. La remise Genius, consentie pour garder la visibilité sur Booking.com, en est une autre. Et le site de l'hôtel est plus cher que Booking.com : le 14 novembre, la chambre double est à 139 € sur Booking.com (tarif Genius) et à 145 € sur le site. Un client qui compare réserve donc là où l'hôtel paie 18 % de commission." },

      { t: "h2", c: "Rubrique 3 — Diagnostic de la réservation directe" },
      { t: "p", c: "Huit points vérifiés, depuis l'extérieur comme un client, puis avec l'équipe de réception." },
      { t: "table", head: ["Point vérifié", "Constat", "Niveau"], rows: [
        ["Prix du site face aux plateformes", "Plus cher que Booking.com (+6 € le 14/11 : 139 € en tarif Genius, 145 € sur le site)", "**Critique**"],
        ["Avantage réservé au direct", "Aucun", "**Critique**"],
        ["Moteur de réservation", "Présent, 5 étapes, peu lisible sur téléphone", "À corriger"],
        ["Réservation depuis Google (liens gratuits)", "Non activée", "**Critique**"],
        ["Fiche Google", "212 avis, contre 1 480 sur Booking.com ; photos de 2021", "À corriger"],
        ["Clients réguliers", "Aucune relance ; e-mails non collectés à l'arrivée", "À corriger"],
        ["Entreprises du quartier", "12 % du chiffre d'affaires, sans contrat ni tarif négocié", "Opportunité"],
        ["Demandes par téléphone et e-mail", "Délai de réponse non suivi ; devis non relancés", "À corriger"],
      ]},
      { t: "stats", items: [
        { value: "3 / 10", label: "maturité de la réservation directe aujourd'hui" },
        { value: "7 / 10", label: "objectif à 90 jours, une fois le plan appliqué" },
      ]},
      { t: "p", c: "L'hôtel ne manque pas de clients : il les laisse réserver au prix le plus cher pour lui. Trois points sont critiques et se corrigent en moins d'un mois, sans investissement lourd : le prix du site, un avantage réservé au direct et la réservation depuis Google." },

      { t: "h2", c: "Rubrique 4 — Trois scénarios chiffrés" },
      { t: "bars", title: "Gain de marge annuel selon le scénario", unit: "€",
        categories: ["Prudent · 6 points", "Central · 10 points", "Ambitieux · 15 points"],
        series: [{ name: "Gain de marge / an", values: [10061, 16768, 25153] }] },
      { t: "table", head: ["Scénario", "Points ramenés", "Chiffre d'affaires basculé", "Gain de marge par an"], rows: [
        ["Prudent", "6 points", "69 660 €", "10 061 €"],
        ["**Central**", "**10 points**", "**116 099 €**", "**16 768 €**"],
        ["Ambitieux", "15 points", "174 149 €", "25 153 €"],
      ]},
      { t: "p", c: "Une réservation sur plateforme rapporte 82 % du prix après commission, et 73,8 % quand la remise Genius s'applique. La même réservation en direct rapporte 93 % du prix : on déduit 5 % de coût du canal direct (moteur de réservation, liens Google) et 2 % pour l'avantage offert au client direct (petit-déjeuner ou départ tardif, plutôt qu'une baisse de prix). Chaque euro basculé rapporte donc en moyenne 14,4 % de marge en plus. Objectif retenu : le scénario central. Ramener 10 points, c'est passer de 38 % à 48 % de ventes directes, environ 1 réservation sur 6 prise aujourd'hui sur une plateforme. Le gain, 16 768 € par an, équivaut au coût annuel d'un réceptionniste à mi-temps." },

      { t: "h2", c: "Rubrique 5 — Plan d'action sur 90 jours" },
      { t: "ul", items: [
        "**J1 → J15 — Prix et avantage direct.** Aligner le site au moins sur le tarif Genius, ajouter un avantage réservé au direct (petit-déjeuner ou départ à 13 h), l'afficher sur le site et à la réception. Indicateur : site jamais plus cher qu'une plateforme (contrôle hebdomadaire).",
        "**J1 → J30 — Google.** Activer les liens de réservation gratuits via le moteur de réservation, mettre à jour photos et description, répondre à tous les avis, lancer une routine d'avis au départ. Indicateur : réservations issues de Google par mois.",
        "**J15 → J45 — Moteur de réservation.** Réduire le parcours à 3 étapes et le rendre lisible sur téléphone. Indicateur : taux de transformation du site.",
        "**J30 → J60 — Clients réguliers.** Collecter l'e-mail à l'arrivée, avec consentement ; message après séjour avec un code direct. Indicateur : part des clients qui reviennent en direct.",
        "**J30 → J90 — Entreprises du quartier.** Contrat de tarif négocié pour les 20 entreprises qui envoient déjà des clients. Indicateur : contrats signés, nuitées entreprises.",
        "**J60 → J90 — Réglages Booking.com.** Revoir le niveau de remise Genius et l'intérêt du programme Preferred à la lumière des chiffres. Indicateur : coût total des plateformes / chiffre d'affaires.",
      ]},
      { t: "p", c: "Un seul indicateur chapeaute tout : le coût des plateformes rapporté au chiffre d'affaires, relevé chaque mois. Il part ici de 14,1 %. Aucune action ne demande de quitter les plateformes." },

      { t: "h2", c: "Ce que dit la loi, en clair" },
      { t: "p", c: "Un hôtel a le droit de vendre moins cher en direct : les clauses de parité tarifaire sont interdites en France (art. L311-5-1 du Code du tourisme) et, en Europe, par le Digital Markets Act depuis le 14 novembre 2024. Booking.com l'a confirmé en septembre 2026. Informations générales, pas un avis juridique." },

      { t: "h2", c: "Conclusion" },
      { t: "p", c: "L'hôtel des Tilleuls a une clientèle solide et un bon taux d'occupation. Son problème n'est pas de remplir : c'est de laisser les plateformes encaisser 163 274 € par an sur des clients dont une partie réserverait volontiers en direct, si le direct n'était pas plus cher et plus compliqué. Le scénario central rapporte 16 768 € de marge par an ; la première action, le prix du site, se met en place en quinze jours." },
      { t: "note", c: "Taux de commission : Booking.com 15 à 18 % de base, remise Genius 10 à 20 % en plus (publications professionnelles 2026). Le gain dépend de la mise en œuvre du plan par l'hôtel : il n'est pas garanti." },
    ],
  },

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
