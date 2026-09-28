import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { BarChart, CHART_CSS } from "../components/Charts";
import { REALISATIONS, formatDate } from "../data/realisations";

export const metadata: Metadata = {
  title: "Réalisations — cas concrets — SENA CONSULTING",
  description: "Nos cas concrets : un dirigeant, un problème précis, des chiffres, une méthode et le résultat. Bilan Agréments, Bilan Financements, audit stratégique.",
};

const REAL_CSS = `
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }
  html { scroll-behavior: smooth; }
  [id] { scroll-margin-top: 96px; }
  .rl-hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding: 150px 40px 60px; text-align: center; }
  .rl-tag { font-size: 12px; letter-spacing: 3px; color: #C9A84C; text-transform: uppercase; font-weight: 700; margin-bottom: 14px; }
  .rl-h1 { font-size: 40px; font-weight: 800; color: #fff; margin: 0 0 14px; line-height: 1.2; }
  .rl-sub { color: rgba(244,245,247,0.8); font-size: 17px; line-height: 1.7; max-width: 760px; margin: 0 auto; }
  .rl-list { background: #F4F5F7; padding: 64px 40px 80px; }
  .rl-inner { max-width: 1100px; margin: 0 auto; }
  .rl-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
  .rl-card { display: grid; grid-template-columns: 1.15fr 1fr; gap: 0; background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e6e9ee; box-shadow: 0 4px 24px rgba(27,42,62,0.08); transition: transform 0.2s, box-shadow 0.2s; }
  .rl-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(27,42,62,0.14); }
  .rl-card-body { padding: 34px 34px 30px; display: flex; flex-direction: column; }
  .rl-meta { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; font-size: 12px; color: #8A9BB0; margin-bottom: 14px; }
  .rl-badge { background: rgba(201,168,76,0.16); color: #A87B1F; border: 1px solid rgba(201,168,76,0.4); padding: 4px 12px; border-radius: 14px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; }
  .rl-card h2 { font-size: 24px; font-weight: 700; line-height: 1.25; margin: 0 0 8px; color: #1B2A3E; }
  .rl-card h2 a { color: inherit; text-decoration: none; }
  .rl-card h2 a:hover { color: #A87B1F; }
  .rl-card .rl-sst { color: #2E4A6B; font-size: 14px; font-weight: 600; margin: 0 0 14px; }
  .rl-card .rl-resume { color: #2E4A6B; font-size: 14.5px; line-height: 1.7; margin: 0 0 20px; }
  .rl-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 22px; }
  .rl-stat { background: #F4F5F7; border-radius: 8px; padding: 12px 12px 10px; border-top: 3px solid #C9A84C; }
  .rl-stat b { display: block; font-size: 20px; color: #1B2A3E; line-height: 1.1; margin-bottom: 4px; }
  .rl-stat span { font-size: 12px; color: #2E4A6B; line-height: 1.4; }
  .rl-actions { margin-top: auto; display: flex; gap: 10px; flex-wrap: wrap; }
  .btn-primary { background: #C9A84C; color: #1B2A3E; padding: 12px 22px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block; transition: background 0.2s; }
  .btn-primary:hover { background: #b8913d; }
  .btn-ghost { background: transparent; color: #1B2A3E; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; border: 1px solid #d5dae2; display: inline-block; transition: all 0.2s; }
  .btn-ghost:hover { border-color: #1B2A3E; }
  .rl-card-chart { background: #fbfbfc; border-left: 1px solid #eef0f4; padding: 28px 26px; display: flex; flex-direction: column; justify-content: center; }
  .rl-card-chart .chart { margin: 0; border: none; padding: 0; background: transparent; }
  .rl-card-chart .chart-title { font-size: 13px; color: #2E4A6B; }
  .rl-chart-cap { font-size: 12.5px; color: #8A9BB0; margin: 0 0 12px; font-weight: 600; }
  ${CHART_CSS}
  @media (max-width: 900px) {
    .rl-card { grid-template-columns: 1fr; }
    .rl-card-chart { border-left: none; border-top: 1px solid #eef0f4; }
  }
  @media (max-width: 768px) {
    .rl-hero { padding: 130px 20px 48px; }
    .rl-h1 { font-size: 28px; }
    .rl-list { padding: 44px 20px 60px; }
    .rl-card-body { padding: 24px 20px; }
    .rl-card h2 { font-size: 20px; }
    .rl-stats { grid-template-columns: 1fr; }
  }
`;

export default function RealisationsPage() {
  const articles = [...REALISATIONS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <style>{REAL_CSS}</style>
      <Navbar />
      <header className="rl-hero">
        <div className="rl-tag">Nos réalisations</div>
        <h1 className="rl-h1">Des cas concrets, des chiffres, des résultats</h1>
        <p className="rl-sub">
          Pour chaque offre, un exemple complet : le dirigeant, le problème, la méthode, les décisions et ce qu'elles rapportent.
          Les entreprises présentées sont fictives ; les ordres de grandeur sont ceux du secteur.
        </p>
      </header>

      <section className="rl-list">
        <div className="rl-inner">
          <div className="rl-grid">
            {articles.map((a) => (
              <article className="rl-card" key={a.slug}>
                <div className="rl-card-body">
                  <div className="rl-meta">
                    <span className="rl-badge">{a.offre}</span>
                    <span>{a.segment}</span>
                    <span>·</span>
                    <span>{formatDate(a.date)}</span>
                    <span>·</span>
                    <span>{a.lecture} de lecture</span>
                  </div>
                  <h2><Link href={`/realisations/${a.slug}`}>{a.titre}</Link></h2>
                  <p className="rl-sst">{a.sousTitre}</p>
                  <p className="rl-resume">{a.resume}</p>
                  <div className="rl-stats">
                    {a.chiffres.map((c) => (
                      <div className="rl-stat" key={c.label}><b>{c.value}</b><span>{c.label}</span></div>
                    ))}
                  </div>
                  <div className="rl-actions">
                    <Link href={`/realisations/${a.slug}`} className="btn-primary">Lire le cas concret →</Link>
                    <Link href={`/sur-mesure/${a.segmentSlug}`} className="btn-ghost">L'offre {a.offre}</Link>
                  </div>
                </div>
                <div className="rl-card-chart">
                  <p className="rl-chart-cap">{a.apercu.title}</p>
                  <BarChart {...a.apercu} compact />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
