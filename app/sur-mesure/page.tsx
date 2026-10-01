import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SEGMENT_PAGES, type SegmentPage } from "../data/segments";

// ─── /sur-mesure — toutes les offres, regroupées par famille de métiers ──────
// Alimentée automatiquement par SEGMENT_PAGES : une page avec `offer` et `famille`
// apparaît ici sans autre code. Les familles s'affichent dans l'ordre de FAMILLES ;
// une famille inconnue est ajoutée à la fin.

export const metadata: Metadata = {
  title: "Nos offres sur mesure, métier par métier — SENA CONSULTING",
  description:
    "Une douleur précise, un livrable concret, un prix annoncé d'avance : carrossiers, organismes de formation, hôtels, restaurants, bâtiment, sécurité privée, auto-écoles, événementiel, immobilier.",
  openGraph: { title: "Nos offres sur mesure — SENA CONSULTING", url: "https://www.sena-consulting.fr/sur-mesure", siteName: "SENA CONSULTING", locale: "fr_FR", type: "website", images: ["https://www.sena-consulting.fr/opengraph-image.png"] },
};

const FAMILLES = ["Automobile", "Hôtellerie, restauration et tourisme", "Bâtiment", "Sécurité privée", "Formation et écoles", "Événementiel", "Immobilier"];

/** Prix d'appel : la première ligne de prix qui n'est pas « Offert ». */
const prixAppel = (p: SegmentPage) => p.offer?.pricing.find((l) => !/offert/i.test(l.value));

export default function SurMesurePage() {
  const pages = SEGMENT_PAGES.filter((p) => p.offer && p.famille);
  const familles = [...FAMILLES, ...pages.map((p) => p.famille!).filter((f) => !FAMILLES.includes(f))].filter((f) => pages.some((p) => p.famille === f));

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }
        .sm-hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding: 150px 40px 64px; text-align: center; }
        .sm-hero-inner { max-width: 900px; margin: 0 auto; }
        .sm-tag { display: inline-block; background: rgba(201,168,76,0.16); color: #C9A84C; border: 1px solid rgba(201,168,76,0.4); padding: 8px 22px; border-radius: 24px; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 22px; }
        .sm-h1 { font-size: 40px; font-weight: 800; color: #F4F5F7; line-height: 1.15; margin: 0 0 18px; }
        .sm-sub { font-size: 17px; color: rgba(244,245,247,0.82); line-height: 1.75; margin: 0 auto; max-width: 760px; }
        .sm-count { margin-top: 26px; font-size: 13px; color: #8A9BB0; letter-spacing: 1px; text-transform: uppercase; }

        .sm-body { background: #F4F5F7; padding: 64px 40px 80px; }
        .sm-inner { max-width: 1100px; margin: 0 auto; }
        .sm-famille { margin-bottom: 56px; }
        .sm-famille-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 20px; }
        .sm-famille-head h2 { font-size: 24px; font-weight: 700; color: #1B2A3E; margin: 0; }
        .sm-famille-head span { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #8A9BB0; }
        .sm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .sm-card { background: #fff; border-radius: 14px; padding: 26px 26px 22px; border: 1px solid #e6e9ee; display: flex; flex-direction: column; text-decoration: none; color: inherit; position: relative; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
        .sm-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #C9A84C, #e8c96a); }
        .sm-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(27,42,62,0.14); }
        .sm-cible { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #8A9BB0; margin-bottom: 10px; }
        .sm-brand { font-size: 19px; font-weight: 800; color: #1B2A3E; margin: 0 0 10px; line-height: 1.25; }
        .sm-pitch { font-size: 14px; color: #2E4A6B; line-height: 1.6; margin: 0 0 18px; flex: 1; }
        .sm-foot { border-top: 1px solid #eef0f3; padding-top: 14px; display: flex; flex-direction: column; gap: 6px; }
        .sm-prix { font-size: 15px; font-weight: 800; color: #1B2A3E; }
        .sm-prix small { font-weight: 500; color: #8A9BB0; font-size: 12px; margin-left: 6px; }
        .sm-modele { font-size: 12px; color: #C9A84C; font-weight: 600; letter-spacing: 0.3px; }
        .sm-lien { margin-top: 12px; font-size: 14px; font-weight: 700; color: #1B2A3E; }
        .sm-card:hover .sm-lien { color: #C9A84C; }

        .sm-cta { background: #C9A84C; padding: 44px 40px; text-align: center; }
        .sm-cta h2 { color: #1B2A3E; font-size: 24px; font-weight: 800; margin: 0 0 8px; }
        .sm-cta p { color: #1B2A3E; font-size: 15px; margin: 0 0 22px; opacity: 0.85; }
        .sm-cta a { background: #1B2A3E; color: #F4F5F7; padding: 15px 32px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px; display: inline-block; }

        @media (max-width: 900px) { .sm-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
          .sm-hero { padding: 130px 20px 48px; } .sm-h1 { font-size: 30px; } .sm-sub { font-size: 15.5px; }
          .sm-body { padding: 48px 20px 64px; } .sm-grid { grid-template-columns: 1fr; } .sm-famille-head { flex-direction: column; gap: 4px; }
        }
      `}</style>

      <Navbar />

      <header className="sm-hero">
        <div className="sm-hero-inner">
          <span className="sm-tag">Sur mesure</span>
          <h1 className="sm-h1">L&apos;offre qui correspond à votre métier</h1>
          <p className="sm-sub">
            Chaque offre part d&apos;une douleur précise de votre secteur, livre un résultat concret dans un délai annoncé, à un prix connu
            d&apos;avance. Toutes commencent par le même pré-diagnostic : 20 minutes au téléphone, offertes, sans engagement.
          </p>
          <div className="sm-count">{pages.length} offres · {familles.length} familles de métiers</div>
        </div>
      </header>

      <section className="sm-body">
        <div className="sm-inner">
          {familles.map((f) => {
            const items = pages.filter((p) => p.famille === f);
            return (
              <div className="sm-famille" key={f} id={f.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                <div className="sm-famille-head">
                  <h2>{f}</h2>
                  <span>{items.length} {items.length > 1 ? "offres" : "offre"}</span>
                </div>
                <div className="sm-grid">
                  {items.map((p) => {
                    const o = p.offer!;
                    const prix = prixAppel(p);
                    return (
                      <Link href={`/sur-mesure/${p.slug}`} className="sm-card" key={p.slug}>
                        <div className="sm-cible">{p.label}</div>
                        <h3 className="sm-brand">{o.brand}</h3>
                        <p className="sm-pitch">{o.headline}</p>
                        <div className="sm-foot">
                          {prix && <div className="sm-prix">{prix.value}{!prix.label.startsWith(o.brand) && <small>{prix.label}</small>}</div>}
                          {o.modele && <div className="sm-modele">{o.modele}</div>}
                        </div>
                        <div className="sm-lien">Voir l&apos;offre →</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="sm-cta">
        <h2>Votre métier n&apos;est pas dans la liste ?</h2>
        <p>L&apos;audit business reste offert : 20 minutes au téléphone pour identifier la douleur qui coûte le plus cher.</p>
        <Link href="/#contact">Demander mon audit gratuit</Link>
      </div>

      <Footer />
    </>
  );
}
