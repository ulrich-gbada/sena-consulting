import type { MetadataRoute } from "next";
import { SEGMENT_PAGES } from "./data/segments";
import { REALISATIONS } from "./data/realisations";

const SITE = "https://www.sena-consulting.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/sur-mesure`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...SEGMENT_PAGES.map((s) => ({ url: `${SITE}/sur-mesure/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: s.offer ? 0.9 : 0.5 })),
    { url: `${SITE}/realisations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...REALISATIONS.map((r) => ({ url: `${SITE}/realisations/${r.slug}`, lastModified: new Date(r.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
