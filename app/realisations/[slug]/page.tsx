import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";
import { BarChart, RadarChart, CHART_CSS } from "../../components/Charts";
import { REALISATIONS, formatDate, getRealisation, type Bloc } from "../../data/realisations";

export function generateStaticParams() {
  return REALISATIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getRealisation(slug);
  if (!a) return {};
  const title = `${a.titre} — Réalisations — SENA CONSULTING`;
  return {
    title,
    description: a.resume.slice(0, 300),
    openGraph: { title, description: a.resume.slice(0, 300), url: `https://www.sena-consulting.fr/realisations/${a.slug}`, siteName: "SENA CONSULTING", locale: "fr_FR", type: "article" },
  };
}

/** Rend **gras** dans une chaîne. */
const Inline = ({ text }: { text: string }) => (
  <>{text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
  )}</>
);

const Rendu = ({ b }: { b: Bloc }) => {
  switch (b.t) {
    case "h2": return <h2 className="ar-h2">{b.c}</h2>;
    case "h3": return <h3 className="ar-h3">{b.c}</h3>;
    case "p": return <p className="ar-p"><Inline text={b.c} /></p>;
    case "note": return <p className="ar-note"><Inline text={b.c} /></p>;
    case "ul": return <ul className="ar-ul">{b.items.map((i) => <li key={i}><Inline text={i} /></li>)}</ul>;
    case "stats": return (
      <div className={`ar-stats ${b.items.length === 4 ? "four" : ""}`}>
        {b.items.map((s) => <div className="ar-stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
      </div>
    );
    case "table": return (
      <div className="ar-table-wrap">
        <table className="ar-table">
          {b.head.some((h) => h) && <thead><tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>}
          <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Inline text={c} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    case "bars": return <BarChart title={b.title} unit={b.unit} categories={b.categories} series={b.series} max={b.max} />;
    case "radar": return <RadarChart title={b.title} axes={b.axes} series={b.series} max={b.max} />;
  }
};

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getRealisation(slug);
  if (!a) notFound();
  const pdfDispo = a.pdf ? existsSync(join(process.cwd(), "public", "realisations", a.pdf)) : false;
  const autres = REALISATIONS.filter((r) => r.slug !== a.slug).sort((x, y) => y.date.localeCompare(x.date)).slice(0, 2);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }
        html { scroll-behavior: smooth; }
        [id] { scroll-margin-top: 96px; }
        .ar-hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding: 150px 40px 56px; }
        .ar-hero-inner { max-width: 900px; margin: 0 auto; }
        .ar-crumb { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #8A9BB0; margin-bottom: 18px; }
        .ar-crumb a { color: #8A9BB0; text-decoration: none; } .ar-crumb a:hover { color: #C9A84C; }
        .ar-badge { display: inline-block; background: rgba(201,168,76,0.16); color: #C9A84C; border: 1px solid rgba(201,168,76,0.4); padding: 6px 16px; border-radius: 16px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 16px; }
        .ar-h1 { font-size: 36px; font-weight: 800; color: #fff; margin: 0 0 12px; line-height: 1.2; }
        .ar-sst { color: rgba(244,245,247,0.8); font-size: 17px; line-height: 1.6; margin: 0 0 18px; }
        .ar-meta { color: #8A9BB0; font-size: 13px; }
        .ar-body { background: #fff; padding: 56px 40px 40px; }
        .ar-inner { max-width: 860px; margin: 0 auto; }
        .ar-lead { font-size: 17px; line-height: 1.75; color: #1B2A3E; border-left: 4px solid #C9A84C; padding: 4px 0 4px 20px; margin: 0 0 36px; }
        .ar-h2 { font-size: 24px; font-weight: 700; color: #1B2A3E; margin: 44px 0 14px; padding-top: 8px; }
        .ar-h3 { font-size: 17px; font-weight: 700; color: #1B2A3E; margin: 26px 0 8px; }
        .ar-p { font-size: 15.5px; line-height: 1.75; color: #2E4A6B; margin: 0 0 14px; }
        .ar-p strong, .ar-ul strong, .ar-table strong { color: #1B2A3E; }
        .ar-note { font-size: 13px; line-height: 1.6; color: #8A9BB0; background: #F4F5F7; border-radius: 8px; padding: 12px 16px; margin: 14px 0; }
        .ar-ul { padding-left: 20px; margin: 0 0 16px; } .ar-ul li { font-size: 15px; line-height: 1.7; color: #2E4A6B; margin-bottom: 8px; }
        .ar-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 18px 0 24px; } .ar-stats.four { grid-template-columns: repeat(4, 1fr); }
        .ar-stat { background: #F4F5F7; border-radius: 10px; padding: 18px 16px 14px; border-top: 4px solid #C9A84C; }
        .ar-stat b { display: block; font-size: 26px; color: #1B2A3E; line-height: 1.1; margin-bottom: 6px; } .ar-stat span { font-size: 13px; color: #2E4A6B; line-height: 1.45; }
        .ar-table-wrap { overflow-x: auto; margin: 14px 0 20px; }
        .ar-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .ar-table th { text-align: left; padding: 10px 12px; background: #1B2A3E; color: #F4F5F7; font-weight: 600; }
        .ar-table td { padding: 10px 12px; border-bottom: 1px solid #eef0f4; color: #2E4A6B; vertical-align: top; line-height: 1.5; }
        .ar-table td:first-child { color: #1B2A3E; }
        ${CHART_CSS}
        .ar-cta { background: #F4F5F7; padding: 44px 40px; }
        .ar-cta-inner { max-width: 860px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ar-cta-box { background: #fff; border: 1px solid #e6e9ee; border-radius: 12px; padding: 26px; display: flex; flex-direction: column; gap: 10px; }
        .ar-cta-box.dark { background: #1B2A3E; border-color: #1B2A3E; }
        .ar-cta-box h3 { margin: 0; font-size: 18px; color: #1B2A3E; } .ar-cta-box.dark h3 { color: #F4F5F7; }
        .ar-cta-box p { margin: 0 0 6px; font-size: 14px; color: #2E4A6B; line-height: 1.6; } .ar-cta-box.dark p { color: rgba(244,245,247,0.75); }
        .btn-primary { background: #C9A84C; color: #1B2A3E; padding: 13px 22px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block; align-self: flex-start; transition: background 0.2s; }
        .btn-primary:hover { background: #b8913d; }
        .btn-dark { background: #1B2A3E; color: #F4F5F7; padding: 13px 22px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block; align-self: flex-start; transition: background 0.2s; }
        .btn-dark:hover { background: #2E4A6B; }
        .ar-more { background: #fff; padding: 44px 40px 56px; }
        .ar-more-inner { max-width: 860px; margin: 0 auto; }
        .ar-more h2 { font-size: 20px; margin: 0 0 16px; }
        .ar-more-list { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ar-more-list a { display: block; background: #F4F5F7; border-radius: 10px; padding: 18px 20px; text-decoration: none; color: #1B2A3E; border: 1px solid #e6e9ee; transition: border-color 0.2s; }
        .ar-more-list a:hover { border-color: #C9A84C; }
        .ar-more-list small { display: block; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #A87B1F; font-weight: 700; margin-bottom: 6px; }
        .ar-more-list b { font-size: 15px; line-height: 1.4; }
        @media (max-width: 768px) {
          .ar-hero { padding: 130px 20px 44px; } .ar-h1 { font-size: 27px; } .ar-body { padding: 40px 20px 30px; }
          .ar-stats, .ar-stats.four, .ar-cta-inner, .ar-more-list { grid-template-columns: 1fr; }
          .ar-cta, .ar-more { padding: 36px 20px; }
        }
      `}</style>
      <Navbar />

      <header className="ar-hero">
        <div className="ar-hero-inner">
          <div className="ar-crumb"><Link href="/">Accueil</Link> · <Link href="/realisations">Réalisations</Link> · {a.segment}</div>
          <span className="ar-badge">{a.offre} · Cas concret</span>
          <h1 className="ar-h1">{a.titre}</h1>
          <p className="ar-sst">{a.sousTitre}</p>
          <div className="ar-meta">{a.segment} · {formatDate(a.date)} · {a.lecture} de lecture · Ulrich GBADA</div>
        </div>
      </header>

      <article className="ar-body">
        <div className="ar-inner">
          <p className="ar-lead">{a.resume}</p>
          {a.blocs.map((b, i) => <Rendu key={i} b={b} />)}
        </div>
      </article>

      <section className="ar-cta" id="telecharger">
        <div className="ar-cta-inner">
          <div className="ar-cta-box">
            <h3>L'exemple complet en PDF</h3>
            <p>Le document tel qu'il est remis au client : {a.offre.toLowerCase().startsWith("audit") ? "diagnostic, échelle de maturité et plan d'actions" : "toutes les rubriques, tableaux et argumentaires"}.</p>
            {pdfDispo
              ? <a href={`/realisations/${a.pdf}`} download className="btn-dark">Télécharger l'exemple en PDF</a>
              : <a href={`mailto:contact@sena-consulting.fr?subject=${encodeURIComponent("Exemple PDF — " + a.offre)}`} className="btn-dark">Recevoir l'exemple en PDF</a>}
          </div>
          <div className="ar-cta-box dark">
            <h3>Le même niveau d'analyse, sur vos chiffres</h3>
            <p>Pré-diagnostic offert : 20 minutes au téléphone, sans engagement. Vos chiffres restent confidentiels.</p>
            <Link href={`/sur-mesure/${a.segmentSlug}#contact`} className="btn-primary">Demander mon audit gratuit</Link>
          </div>
        </div>
      </section>

      {autres.length > 0 && (
        <section className="ar-more">
          <div className="ar-more-inner">
            <h2>Autres cas concrets</h2>
            <div className="ar-more-list">
              {autres.map((r) => (
                <Link key={r.slug} href={`/realisations/${r.slug}`}><small>{r.offre} · {r.segment}</small><b>{r.titre}</b></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </>
  );
}
