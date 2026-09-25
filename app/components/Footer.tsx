import Link from "next/link";

// ─── Footer commun à toutes les pages ───────────────────────────────────────
export default function Footer() {
  return (
    <>
      <style>{`
        footer { background: #1B2A3E; padding: 40px; text-align: center; }
        .footer-logo { height: 64px; display: block; margin: 0 auto 16px; }
        footer p { color: #8A9BB0; font-size: 13px; margin: 0; }
        footer a { color: #C9A84C; text-decoration: none; }
        footer a:hover { text-decoration: underline; }
        .footer-links { margin-top: 12px !important; font-size: 12px !important; }
        .footer-links a { color: #8A9BB0; }
      `}</style>
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
