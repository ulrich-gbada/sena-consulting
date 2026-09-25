"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Navbar commune à toutes les pages ──────────────────────────────────────
// Deux variantes gérées par media query :
//   • Desktop / tablette (> 900px) : logo + liens centrés + recherche + CTA
//   • Mobile (≤ 900px)             : logo + burger → menu déroulant
// Référence visuelle : navbar de la page d'accueil.

const NAV_LINKS = [
  { href: "/#diagnostic", label: "Diagnostic" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#credibilite", label: "Crédibilité" },
  { href: "/#offre", label: "Offre" },
  { href: "/realisations", label: "Réalisations" },
];

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8.5" cy="8.5" r="5.5" stroke="#F4F5F7" strokeWidth="1.8" />
    <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="#F4F5F7" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setMenuOpen(false); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); };

  return (
    <>
      <style>{`
        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: #1B2A3E;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 96px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
          transition: box-shadow 0.3s;
        }
        .navbar.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.5); }
        .nav-logo { height: 80px; width: auto; display: block; }
        .nav-center { display: flex; gap: 40px; list-style: none; margin: 0; padding: 0; position: absolute; left: 50%; transform: translateX(-50%); }
        .nav-center a { color: #F4F5F7; text-decoration: none; font-size: 19px; letter-spacing: 0.5px; transition: color 0.2s; white-space: nowrap; }
        .nav-center a:hover { color: #C9A84C; }
        .nav-actions { display: flex; align-items: center; gap: 12px; }
        .nav-search-btn {
          background: none; border: none; cursor: pointer; padding: 8px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px; transition: background 0.2s;
        }
        .nav-search-btn:hover { background: rgba(255,255,255,0.08); }
        .nav-cta { background: #C9A84C; color: #1B2A3E !important; padding: 15px 27px; border-radius: 6px; font-weight: bold !important; font-size: 19px !important; text-decoration: none; white-space: nowrap; transition: background 0.2s; }
        .nav-cta:hover { background: #b8913d !important; }

        /* Burger + menu mobile */
        .burger { display: none; flex-direction: column; cursor: pointer; gap: 6px; background: none; border: none; padding: 4px; }
        .burger span { display: block; width: 30px; height: 3px; background: #F4F5F7; }
        .mobile-menu { display: none; flex-direction: column; background: #1B2A3E; padding: 16px 24px 24px; gap: 16px; position: fixed; top: 96px; left: 0; right: 0; z-index: 999; box-shadow: 0 12px 24px rgba(0,0,0,0.4); }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { color: #F4F5F7; text-decoration: none; font-size: 15px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; }
        .mobile-menu a:hover { color: #C9A84C; }
        .mobile-menu a.mobile-cta { color: #C9A84C; font-weight: bold; }
        .mobile-search { display: flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; padding: 10px 0; color: #F4F5F7; font-size: 15px; text-align: left; font-family: inherit; }
        .mobile-search:hover { color: #C9A84C; }

        /* ── OVERLAY RECHERCHE ── */
        .search-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(20, 30, 50, 0.92);
          backdrop-filter: blur(6px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          opacity: 0; pointer-events: none; transition: opacity 0.25s;
        }
        .search-overlay.open { opacity: 1; pointer-events: auto; }
        .search-box {
          width: 90%; max-width: 600px;
          background: #fff; border-radius: 12px;
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px;
          border: 2px solid #C9A84C;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .search-box input {
          flex: 1; border: none; outline: none; font-size: 17px;
          color: #1B2A3E; background: transparent; font-family: inherit;
        }
        .search-box input::placeholder { color: #8A9BB0; }
        .search-close {
          position: absolute; top: 24px; right: 24px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: none; cursor: pointer;
          color: #fff; font-size: 18px; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .search-close:hover { background: rgba(255,255,255,0.2); }
        .search-hint { color: rgba(255,255,255,0.4); font-size: 13px; margin-top: 16px; letter-spacing: 0.5px; }

        /* Les ancres s'arrêtent sous la navbar fixe */
        html { scroll-behavior: smooth; }
        [id] { scroll-margin-top: 96px; }

        /* ── Bascule desktop / mobile ── */
        @media (max-width: 900px) {
          .nav-center, .nav-cta, .nav-search-btn { display: none; }
          .burger { display: flex; }
        }
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
        }
      `}</style>

      {/* Overlay recherche */}
      <div
        className={`search-overlay ${searchOpen ? "open" : ""}`}
        onClick={(e) => { if ((e.target as HTMLElement).classList.contains("search-overlay")) closeSearch(); }}
      >
        <button className="search-close" onClick={closeSearch} aria-label="Fermer la recherche">✕</button>
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="#8A9BB0" strokeWidth="1.8" />
            <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="#8A9BB0" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            autoFocus={searchOpen}
            type="text"
            placeholder="Rechercher un guide, article, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="search-hint">Appuyez sur Echap pour fermer</p>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" aria-label="Accueil SENA CONSULTING">
          <img src="/logo-sena-consulting-blanc.svg" alt="SENA CONSULTING" className="nav-logo" />
        </Link>

        <ul className="nav-center">
          {NAV_LINKS.map((l) => (
            <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="nav-search-btn" onClick={() => setSearchOpen(true)} aria-label="Rechercher">
            <IconSearch />
          </button>
          <Link href="/#contact" className="nav-cta">Audit Gratuit</Link>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
        <Link href="/#contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>Audit Gratuit</Link>
        <button className="mobile-search" onClick={() => { setMenuOpen(false); setSearchOpen(true); }} aria-label="Rechercher">
          <IconSearch /> Rechercher
        </button>
      </div>
    </>
  );
}
