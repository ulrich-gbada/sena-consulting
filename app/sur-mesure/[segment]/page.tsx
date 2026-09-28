import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import { SEGMENT_PAGES } from "../../data/segments";

export function generateStaticParams() {
  return SEGMENT_PAGES.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }): Promise<Metadata> {
  const { segment } = await params;
  const s = SEGMENT_PAGES.find((x) => x.slug === segment);
  if (!s) return {};
  return {
    title: `${s.label} — Accompagnement sur mesure — SENA CONSULTING`,
    description: `Offre sur mesure SENA CONSULTING pour le secteur ${s.label} : performance business, résultats mesurables.`,
  };
}

export default async function SegmentPage({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  const s = SEGMENT_PAGES.find((x) => x.slug === segment);
  if (!s) notFound();

  return (
    <PageShell tag="Sur mesure" title={s.label}>
      <div className="placeholder">
        Cette page présentera prochainement notre accompagnement dédié au secteur <strong>{s.label}</strong> :
        enjeux spécifiques, offre, méthode et résultats attendus.
      </div>
      <p style={{ marginTop: 32 }}>
        En attendant, <a href="/#contact">demandez votre pré-diagnostic offert</a> : 20 minutes au téléphone, sans engagement.
      </p>
    </PageShell>
  );
}
