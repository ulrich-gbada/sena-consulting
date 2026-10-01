"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SEGMENTS_COL_1, SEGMENTS_COL_2, type Segment } from "../data/segments";

// ─── Navbar commune à toutes les pages ──────────────────────────────────────
// Deux variantes gérées par media query :
//   • Desktop / tablette (> 900px) : logo + liens centrés + recherche + CTA
//   • Mobile (≤ 900px)             : logo + burger → menu déroulant
// Référence visuelle : navbar de la page d'accueil.

const NAV_BEFORE = [
  { href: "/#diagnostic", label: "Diagnostic" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#credibilite", label: "Crédibilité" },
  { href: "/#offre", label: "Offre" },
];
const NAV_AFTER = [{ href: "/realisations", label: "Réalisations" }];

const IconChevron = ({ open }: { open?: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
    <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Colonne du menu déroulant « Sur mesure » (desktop) */
const MegaCol = ({ items, onClick }: { items: Segment[]; onClick: () => void }) => (
  <ul className="mega-col">
    {items.map((s) => (
      <li key={s.slug}>
        <Link href={`/sur-mesure/${s.slug}`} onClick={onClick}>{s.label}</Link>
        {s.children && (
          <ul className="mega-sub">
            {s.children.map((c) => (
              <li key={c.slug}><Link href={`/sur-mesure/${c.slug}`} onClick={onClick}>{c.label}</Link></li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

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
  const [megaOpen, setMegaOpen] = useState(false);      // desktop
  const [mobileSubOpen, setMobileSubOpen] = useState(false); // accordéon mobile
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setMenuOpen(false); setMegaOpen(false); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); };
  const closeAll = () => { setMenuOpen(false); setMegaOpen(false); setMobileSubOpen(false); };

  // Fermeture du menu déroulant au clic en dehors
  useEffect(() => {
    if (!megaOpen) return;
    const h = (e: MouseEvent) => { if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [megaOpen]);

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
        .nav-center { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; position: absolute; left: 50%; transform: translateX(-50%); align-items: center; }
        .nav-center a, .nav-center .nav-drop-btn { color: #F4F5F7; text-decoration: none; font-size: 18px; letter-spacing: 0.4px; transition: color 0.2s; white-space: nowrap; }
        .nav-center a:hover, .nav-center .nav-drop-btn:hover, .nav-center .nav-drop-btn.open { color: #C9A84C; }

        /* ── Menu déroulant « Sur mesure » (desktop) ── */
        .nav-drop { position: relative; }
        .nav-drop-btn { background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; display: inline-flex; align-items: center; gap: 6px; }
        .mega {
          position: absolute; top: calc(100% + 22px); left: 50%; transform: translateX(-50%);
          background: #1B2A3E; border: 1px solid rgba(201,168,76,0.35); border-top: 3px solid #C9A84C;
          border-radius: 0 0 10px 10px; box-shadow: 0 18px 40px rgba(0,0,0,0.45);
          padding: 22px 28px 24px; display: none; grid-template-columns: 1fr 1fr; gap: 0 44px; min-width: 560px;
        }
        .mega.open { display: grid; }
        .mega::before { content: ""; position: absolute; top: -22px; left: 0; right: 0; height: 22px; } /* pont : pas de fermeture entre le bouton et le panneau */
        .mega-title a { color: inherit; text-decoration: none; letter-spacing: inherit; font-size: inherit !important; padding: 0 !important; border: none !important; display: inline !important; }
        .mega-title a:hover { color: #F4F5F7; }
        .mega-title { grid-column: 1 / -1; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; margin: 0 0 14px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .mega-col { list-style: none; margin: 0; padding: 0; }
        .mega-col > li { padding: 0; }
        .mega-col > li > a { display: block; font-size: 15px !important; padding: 9px 0; letter-spacing: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mega-col > li:last-child > a { border-bottom: none; }
        .mega-sub { list-style: none; margin: 0 0 4px; padding: 0 0 0 16px; border-left: 2px solid rgba(201,168,76,0.4); margin-left: 4px; }
        .mega-sub a { display: block; font-size: 14px !important; padding: 6px 0; color: #8A9BB0 !important; letter-spacing: 0 !important; }
        .mega-sub a:hover { color: #C9A84C !important; }
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
        .mobile-menu { display: none; flex-direction: column; background: #1B2A3E; padding: 16px 24px 24px; gap: 16px; position: fixed; top: 96px; left: 0; right: 0; z-index: 999; box-shadow: 0 12px 24px rgba(0,0,0,0.4); max-height: calc(100vh - 96px); max-height: calc(100dvh - 96px); overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; padding-bottom: max(24px, env(safe-area-inset-bottom)); scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.6) transparent; }
        .mobile-menu::-webkit-scrollbar { width: 5px; }
        .mobile-menu::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.6); border-radius: 3px; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { color: #F4F5F7; text-decoration: none; font-size: 15px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; }
        .mobile-menu a:hover { color: #C9A84C; }
        .mobile-menu a.mobile-cta { color: #C9A84C; font-weight: bold; }
        .mobile-acc-btn { display: flex; align-items: center; justify-content: space-between; width: 100%; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F4F5F7; font-size: 15px; padding: 10px 0; cursor: pointer; font-family: inherit; text-align: left; }
        .mobile-acc-btn.open { color: #C9A84C; }
        .mobile-acc { display: none; flex-direction: column; padding: 4px 0 8px 14px; border-left: 2px solid rgba(201,168,76,0.4); margin: 4px 0 8px 4px; gap: 0; }
        .mobile-acc.open { display: flex; }
        .mobile-acc a { font-size: 14px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .mobile-acc a.sub { padding-left: 14px; color: #8A9BB0; font-size: 13px; }
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
        @media (max-width: 1100px) {
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
          {NAV_BEFORE.map((l) => (
            <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
          ))}
          <li className="nav-drop" ref={megaRef} onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button
              type="button"
              className={`nav-drop-btn ${megaOpen ? "open" : ""}`}
              onClick={() => setMegaOpen(!megaOpen)}
              aria-haspopup="true"
              aria-expanded={megaOpen}
            >
              Sur mesure <IconChevron open={megaOpen} />
            </button>
            <div className={`mega ${megaOpen ? "open" : ""}`} role="menu">
              <p className="mega-title"><Link href="/sur-mesure" onClick={closeAll}>Un accompagnement adapté à votre métier — voir toutes les offres →</Link></p>
              <MegaCol items={SEGMENTS_COL_1} onClick={closeAll} />
              <MegaCol items={SEGMENTS_COL_2} onClick={closeAll} />
            </div>
          </li>
          {NAV_AFTER.map((l) => (
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
        {NAV_BEFORE.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeAll}>{l.label}</Link>
        ))}
        <div>
          <button type="button" className={`mobile-acc-btn ${mobileSubOpen ? "open" : ""}`} onClick={() => setMobileSubOpen(!mobileSubOpen)} aria-expanded={mobileSubOpen}>
            Sur mesure <IconChevron open={mobileSubOpen} />
          </button>
          <div className={`mobile-acc ${mobileSubOpen ? "open" : ""}`}>
            <Link href="/sur-mesure" onClick={closeAll} style={{ color: "#C9A84C", fontWeight: 600 }}>Toutes nos offres, métier par métier →</Link>
            {[...SEGMENTS_COL_1, ...SEGMENTS_COL_2].map((s) => (
              <div key={s.slug}>
                <Link href={`/sur-mesure/${s.slug}`} onClick={closeAll}>{s.label}</Link>
                {s.children?.map((c) => (
                  <Link key={c.slug} href={`/sur-mesure/${c.slug}`} className="sub" onClick={closeAll}>{c.label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        {NAV_AFTER.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeAll}>{l.label}</Link>
        ))}
        <Link href="/#contact" className="mobile-cta" onClick={closeAll}>Audit Gratuit</Link>
        <button className="mobile-search" onClick={() => { setMenuOpen(false); setSearchOpen(true); }} aria-label="Rechercher">
          <IconSearch /> Rechercher
        </button>
      </div>
    </>
  );
}
