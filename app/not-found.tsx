import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ─── 404 — page introuvable ───────────────────────────────────────────────────
// Rendue par Next.js pour toute URL inconnue (statut HTTP 404, non indexée).
// Objectif : ne perdre personne — renvoyer vers les offres, les cas concrets ou l'audit.

export const metadata: Metadata = {
  title: "Page introuvable — SENA CONSULTING",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }
        .nf { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 150px 40px 80px; text-align: center; }
        .nf-inner { max-width: 680px; }
        .nf-code { font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #C9A84C; font-weight: 700; margin-bottom: 18px; }
        .nf h1 { font-size: 36px; font-weight: 800; color: #F4F5F7; line-height: 1.2; margin: 0 0 16px; }
        .nf p { font-size: 17px; color: rgba(244,245,247,0.82); line-height: 1.7; margin: 0 0 32px; }
        .nf-btns { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
        .nf-btn { display: inline-block; padding: 14px 28px; border-radius: 6px; font-weight: 700; font-size: 15px; text-decoration: none; }
        .nf-btn.or { background: #C9A84C; color: #1B2A3E; }
        .nf-btn.or:hover { background: #e8c96a; }
        .nf-btn.ghost { color: #F4F5F7; border: 1px solid rgba(244,245,247,0.4); }
        .nf-btn.ghost:hover { border-color: #C9A84C; color: #C9A84C; }
        @media (max-width: 768px) { .nf { padding: 130px 20px 60px; } .nf h1 { font-size: 28px; } .nf p { font-size: 15.5px; } .nf-btn { flex: 1 1 100%; text-align: center; } }
      `}</style>

      <Navbar />

      <main className="nf">
        <div className="nf-inner">
          <div className="nf-code">Erreur 404</div>
          <h1>Cette page n&apos;existe pas, ou plus.</h1>
          <p>
            Le lien est peut-être périmé, ou l&apos;adresse comporte une faute de frappe. Ce qui ne change pas : nos offres métier
            par métier, nos cas concrets, et le pré-diagnostic de 20 minutes, offert.
          </p>
          <div className="nf-btns">
            <Link href="/sur-mesure" className="nf-btn or">Voir nos offres sur mesure</Link>
            <Link href="/realisations" className="nf-btn ghost">Lire un cas concret</Link>
            <Link href="/#contact" className="nf-btn ghost">Demander mon audit gratuit</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
