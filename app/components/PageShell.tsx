import Link from "next/link";

// Habillage commun des pages secondaires (Réalisations, Mentions légales, Confidentialité)
// Reprend la navbar et le footer de la page d'accueil pour une cohérence visuelle.
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
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: #1B2A3E;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 96px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .nav-logo { height: 80px; width: auto; }
        .nav-center { display: flex; gap: 40px; list-style: none; margin: 0; padding: 0; position: absolute; left: 50%; transform: translateX(-50%); }
        .nav-center a { color: #F4F5F7; text-decoration: none; font-size: 19px; letter-spacing: 0.5px; transition: color 0.2s; white-space: nowrap; }
        .nav-center a:hover { color: #C9A84C; }
        .nav-cta { background: #C9A84C; color: #1B2A3E; padding: 15px 27px; border-radius: 6px; font-weight: bold; font-size: 19px; text-decoration: none; white-space: nowrap; transition: background 0.2s; }
        .nav-cta:hover { background: #b8913d; }

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

        footer { background: #1B2A3E; padding: 40px; text-align: center; }
        .footer-logo { height: 64px; display: block; margin: 0 auto 16px; }
        footer p { color: #8A9BB0; font-size: 13px; margin: 0; }
        footer a { color: #C9A84C; text-decoration: none; }
        footer a:hover { text-decoration: underline; }
        .footer-links { margin-top: 12px !important; font-size: 12px !important; }
        .footer-links a { color: #8A9BB0; }

        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-center { display: none; }
          .page-hero { padding: 130px 20px 48px; }
          .page-title { font-size: 28px; }
          .page-content { padding: 40px 20px 64px; }
        }
      `}</style>

      <nav className="navbar">
        <Link href="/"><img src="/logo-sena-consulting-blanc.svg" alt="SENA CONSULTING" className="nav-logo" /></Link>
        <ul className="nav-center">
          <li><Link href="/#diagnostic">Diagnostic</Link></li>
          <li><Link href="/#methode">Méthode</Link></li>
          <li><Link href="/#credibilite">Crédibilité</Link></li>
          <li><Link href="/#offre">Offre</Link></li>
          <li><Link href="/realisations">Réalisations</Link></li>
        </ul>
        <Link href="/#contact" className="nav-cta">Audit Gratuit</Link>
      </nav>

      <header className="page-hero">
        {tag && <div className="page-tag">{tag}</div>}
        <h1 className="page-title">{title}</h1>
      </header>

      <main className="page-content">{children}</main>

      <footer>
        <img src="/logo-sena-consulting-blanc.svg" alt="SENA CONSULTING" className="footer-logo" />
        <p>
          © {new Date().getFullYear()} — SENA CONSULTING · Conseil en performance business pour PME/TPE<br />
          <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a> · 07 68 93 48 37
        </p>
        <p className="footer-links">
          <Link href="/mentions-legales">Mentions légales</Link> · <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
        </p>
      </footer>
    </>
  );
}
