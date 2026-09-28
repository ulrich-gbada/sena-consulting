import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SegmentLanding from "../../components/SegmentLanding";
import { SEGMENT_PAGES } from "../../data/segments";

export function generateStaticParams() {
  return SEGMENT_PAGES.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }): Promise<Metadata> {
  const { segment } = await params;
  const s = SEGMENT_PAGES.find((x) => x.slug === segment);
  if (!s) return {};
  const title = s.offer ? `${s.offer.brand} — ${s.label} — SENA CONSULTING` : `${s.label} — Sur mesure — SENA CONSULTING`;
  const description = s.offer
    ? `${s.offer.headline} ${s.offer.brandLine ?? ""} Pré-diagnostic offert, 20 min au téléphone, sans engagement.`
    : `Accompagnement SENA CONSULTING pour le secteur ${s.label}. Pré-diagnostic offert, 20 min au téléphone, sans engagement.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `https://www.sena-consulting.fr/sur-mesure/${s.slug}`, siteName: "SENA CONSULTING", locale: "fr_FR", type: "website" },
  };
}

export default async function SegmentPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  const s = SEGMENT_PAGES.find((x) => x.slug === segment);
  if (!s) notFound();
  return <SegmentLanding page={s} />;
}
