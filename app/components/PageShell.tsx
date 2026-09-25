import Navbar from "./Navbar";
import Footer from "./Footer";

// Habillage commun des pages secondaires (Réalisations, Mentions légales, Confidentialité)
// Navbar et footer sont les composants partagés avec la page d'accueil.
export default function PageShell({
  title,
  tag,
  children,
}: {
  title: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }

        .page-hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding: 156px 40px 60px; text-align: center; }
        .page-tag { font-size: 11px; letter-spacing: 3px; color: #C9A84C; text-transform: uppercase; margin-bottom: 14px; }
        .page-title { font-size: 40px; font-weight: 700; color: #fff; margin: 0; line-height: 1.2; }

        .page-content { max-width: 860px; margin: 0 auto; padding: 64px 40px 96px; }
        .page-content h2 { font-size: 22px; color: #1B2A3E; margin: 40px 0 12px; }
        .page-content h2:first-child { margin-top: 0; }
        .page-content p, .page-content li { font-size: 15px; line-height: 1.75; color: #2E4A6B; }
        .page-content ul { padding-left: 20px; }
        .page-content a { color: #C9A84C; }
        .placeholder { background: #F4F5F7; border-left: 3px solid #C9A84C; padding: 20px 24px; border-radius: 6px; color: #2E4A6B; font-size: 15px; line-height: 1.7; }

        @media (max-width: 768px) {
          .page-hero { padding: 130px 20px 48px; }
          .page-title { font-size: 28px; }
          .page-content { padding: 40px 20px 64px; }
        }
      `}</style>

      <Navbar />

      <header className="page-hero">
        {tag && <div className="page-tag">{tag}</div>}
        <h1 className="page-title">{title}</h1>
      </header>

      <main className="page-content">{children}</main>

      <Footer />
    </>
  );
}
