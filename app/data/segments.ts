// Source unique des segments « Sur mesure » : alimente le menu de la navbar
// et les pages /sur-mesure/<slug>. Deux colonnes, dans l'ordre d'affichage.

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

/** Tous les slugs adressables (parents + enfants), avec leur libellé complet. */
export const SEGMENT_PAGES: { slug: string; label: string; parent?: string }[] = SEGMENTS.flatMap((s) => [
  { slug: s.slug, label: s.label },
  ...(s.children ?? []).map((c) => ({ slug: c.slug, label: `${s.label} — ${c.label}`, parent: s.label })),
]);
