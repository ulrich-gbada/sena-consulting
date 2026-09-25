"use client";

import { useState } from "react";

// ─── Icônes SVG chics ───────────────────────────────────────────────────────
const IconAudit = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="28" height="36" rx="3" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <line x1="14" y1="14" x2="30" y2="14" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="20" x2="30" y2="20" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="26" x2="22" y2="26" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="34" cy="36" r="8" fill="#1B2A3E" stroke="#C9A84C" strokeWidth="2"/>
    <line x1="31" y1="36" x2="37" y2="36" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    <line x1="34" y1="33" x2="34" y2="39" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconData = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="28" width="8" height="14" rx="2" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <rect x="16" y="18" width="8" height="24" rx="2" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <rect x="28" y="8" width="8" height="34" rx="2" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <polyline points="6,22 20,14 32,6" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="6" cy="22" r="2.5" fill="#C9A84C"/>
    <circle cx="20" cy="14" r="2.5" fill="#C9A84C"/>
    <circle cx="32" cy="6" r="2.5" fill="#C9A84C"/>
    <line x1="4" y1="44" x2="44" y2="44" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconTransform = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <path d="M24 6 A18 18 0 0 1 42 24" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <polyline points="38,20 42,24 46,20" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="16,20 24,28 32,18" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // ─── Formulaire multi-étapes ─────────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1
    name: "",
    email: "",
    company: "",
    phone: "",
    address: "",
    taille: "",
    ca: "",
    // Étape 2
    secteur: "",
    secteurAutre: "",
    // Étape 3
    attentes: [] as string[],
    attenteAutre: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (val: string) => {
    const current = formData.attentes;
    setFormData({
      ...formData,
      attentes: current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    });
  };

  const handleStep3Submit = async () => {
    setFormStatus("sending");
    try {
      const body = {
        ...formData,
        attentes: formData.attentes.join(", ") + (formData.attenteAutre ? `, Autre: ${formData.attenteAutre}` : ""),
        secteur: formData.secteur === "Autre" ? `Autre: ${formData.secteurAutre}` : formData.secteur,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setStep(4);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const secteurs = [
    "Agences immobilières",
    "BTP",
    "Carrossier / Garagiste",
    "École de conduite",
    "Organisme de formation",
    "Autre",
  ];

  const attentesList = [
    "Augmenter mon chiffre d'affaires",
    "Améliorer ma rentabilité / Vendre au meilleur prix",
    "Recruter les meilleurs talents",
    "Gagner du temps au quotidien sur les tâches chronophages (Administratif, Devis, Factures, Comptabilité, Prospection…)",
    "Recruter les meilleurs salariés",
    "Rester conforme vis-à-vis des contraintes légales",
    "Faire face à la concurrence des prix",
    "Autre",
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        /* NAV */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: #1B2A3E;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 72px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .nav-logo { height: 40px; width: auto; }
        .nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
        .nav-links a { color: #F4F5F7; text-decoration: none; font-size: 14px; letter-spacing: 0.5px; transition: color 0.2s; }
        .nav-links a:hover { color: #C9A84C; }
        .nav-cta { background: #C9A84C; color: #1B2A3E !important; padding: 10px 20px; border-radius: 4px; font-weight: bold !important; font-size: 13px !important; }
        .nav-cta:hover { background: #b8913d !important; }
        .burger { display: none; flex-direction: column; cursor: pointer; gap: 5px; background: none; border: none; padding: 4px; }
        .burger span { display: block; width: 24px; height: 2px; background: #F4F5F7; }
        .mobile-menu { display: none; flex-direction: column; background: #1B2A3E; padding: 16px 24px 24px; gap: 16px; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { color: #F4F5F7; text-decoration: none; font-size: 15px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .mobile-menu a:hover { color: #C9A84C; }

        /* HERO */
        .hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding-top: 72px; min-height: 100vh; display: flex; align-items: center; }
        .hero-inner { max-width: 1100px; margin: 0 auto; padding: 80px 40px; display: flex; align-items: center; gap: 60px; }
        .hero-text { flex: 1; }
        .hero-tag { display: inline-block; background: rgba(201,168,76,0.15); color: #C9A84C; border: 1px solid rgba(201,168,76,0.3); padding: 6px 16px; border-radius: 20px; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
        .hero-title { font-size: 42px; font-weight: 800; color: #F4F5F7; line-height: 1.2; margin: 0 0 16px; }
        .hero-title span { color: #C9A84C; }
        .hero-subtitle { font-size: 18px; color: #8A9BB0; line-height: 1.7; margin: 0 0 36px; }
        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary { background: #C9A84C; color: #1B2A3E; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px; transition: background 0.2s; }
        .btn-primary:hover { background: #b8913d; }
        .btn-secondary { background: transparent; color: #F4F5F7; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; border: 1px solid rgba(255,255,255,0.25); transition: all 0.2s; }
        .btn-secondary:hover { border-color: #C9A84C; color: #C9A84C; }
        .hero-photo { flex-shrink: 0; }
        .hero-photo img { width: 300px; height: 380px; object-fit: cover; border-radius: 12px; border: 3px solid rgba(201,168,76,0.3); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }

        /* SECTIONS */
        section { padding: 80px 40px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-tag { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; margin-bottom: 12px; }
        .section-title { font-size: 32px; font-weight: 700; color: #1B2A3E; margin: 0 0 48px; }

        /* DIAGNOSTIC */
        .diagnostic { background: #F4F5F7; }
        .diag-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .diag-card { background: #fff; border-radius: 10px; padding: 28px; border-left: 4px solid #C9A84C; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .diag-card h3 { color: #1B2A3E; font-size: 16px; margin: 0 0 10px; }
        .diag-card p { color: #8A9BB0; font-size: 14px; line-height: 1.6; margin: 0; }

        /* METHODE */
        .methode { background: #fff; }
        .actes { display: flex; flex-direction: column; gap: 0; }
        .acte { display: flex; align-items: flex-start; border-bottom: 1px solid #F4F5F7; padding: 32px 0; }
        .acte:last-child { border-bottom: none; }
        .acte-left { width: 200px; min-width: 200px; flex-shrink: 0; padding: 32px 16px 32px 12px; }
        .acte-num { font-size: 11px; letter-spacing: 2px; color: #C9A84C; text-transform: uppercase; margin-bottom: 8px; }
        .acte-name { font-size: 18px; font-weight: 700; color: #1B2A3E; }
        .acte-right { flex: 1; }
        .acte-right p { color: #2E4A6B; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
        .acte-right ul { margin: 0; padding-left: 20px; }
        .acte-right li { color: #8A9BB0; font-size: 14px; line-height: 1.8; }

        /* CREDIBILITE */
        .credibilite { background: #1B2A3E; }
        .credibilite .section-title { color: #F4F5F7; }
        .cred-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 48px; }
        .cred-block h3 { color: #C9A84C; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px; }
        .cred-list { list-style: none; padding: 0; margin: 0; }
        .cred-list li { color: #F4F5F7; font-size: 15px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cred-list li:last-child { border-bottom: none; }
        .kpis { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }
        .kpi { text-align: center; padding: 24px 32px; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); border-radius: 10px; }
        .kpi-val { font-size: 36px; font-weight: 800; color: #C9A84C; display: block; }
        .kpi-label { font-size: 13px; color: #8A9BB0; margin-top: 4px; display: block; }

        /* OFFRE — avec SVG */
        .offre { background: #F4F5F7; }
        .offre-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .offre-card {
          background: #1B2A3E;
          border-radius: 14px;
          padding: 40px 32px 32px;
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 0;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(27,42,62,0.15);
        }
        .offre-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(27,42,62,0.25); }
        .offre-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #C9A84C, #e8c96a);
        }
        .offre-icon-wrap {
          width: 72px; height: 72px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }
        .offre-card h3 { color: #F4F5F7; font-size: 20px; font-weight: 700; margin: 0 0 14px; }
        .offre-card p { color: #8A9BB0; font-size: 14px; line-height: 1.7; margin: 0 0 24px; flex: 1; }
        .offre-price {
          font-size: 12px; color: #C9A84C; font-weight: 600;
          letter-spacing: 0.5px;
          border-top: 1px solid rgba(201,168,76,0.2);
          padding-top: 16px; width: 100%;
        }

        /* CONTACT — multi-steps */
        .contact { background: #fff; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 60px; align-items: start; }
        .contact-info h3 { color: #1B2A3E; font-size: 20px; font-weight: 700; margin: 0 0 24px; }
        .contact-item { display: flex; gap: 12px; margin-bottom: 20px; }
        .contact-item-icon { width: 40px; height: 40px; background: rgba(201,168,76,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .contact-item-text { flex: 1; }
        .contact-item-label { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #8A9BB0; margin-bottom: 2px; }
        .contact-item-val { font-size: 15px; color: #1B2A3E; font-weight: 500; text-decoration: none; }
        .contact-item-val:hover { color: #C9A84C; }

        /* Stepper */
        .stepper { display: flex; align-items: center; gap: 0; margin-bottom: 32px; }
        .step-item { display: flex; flex-direction: column; align-items: center; flex: 1; }
        .step-circle {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700;
          border: 2px solid #e0e4ea;
          background: #fff; color: #8A9BB0;
          transition: all 0.3s; position: relative; z-index: 1;
        }
        .step-circle.active { border-color: #C9A84C; background: #C9A84C; color: #1B2A3E; }
        .step-circle.done { border-color: #C9A84C; background: #1B2A3E; color: #C9A84C; }
        .step-label { font-size: 11px; color: #8A9BB0; margin-top: 6px; text-align: center; }
        .step-label.active { color: #C9A84C; font-weight: 600; }
        .step-connector { flex: 1; height: 2px; background: #e0e4ea; margin: 0 -1px; margin-bottom: 20px; }
        .step-connector.done { background: #C9A84C; }

        /* Form elements */
        .form-group { margin-bottom: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group label { display: block; font-size: 13px; color: #2E4A6B; font-weight: 600; margin-bottom: 6px; }
        .form-group input,
        .form-group select {
          width: 100%; padding: 11px 14px;
          border: 1px solid #e0e4ea; border-radius: 6px;
          font-size: 14px; color: #1B2A3E; background: #F4F5F7;
          outline: none; transition: border-color 0.2s; font-family: inherit;
          appearance: none;
        }
        .form-group input:focus,
        .form-group select:focus { border-color: #C9A84C; background: #fff; }

        /* Secteurs radio-style */
        .secteur-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .secteur-card {
          border: 2px solid #e0e4ea; border-radius: 8px;
          padding: 14px 16px; cursor: pointer;
          font-size: 14px; color: #2E4A6B; font-weight: 500;
          transition: all 0.2s; background: #F4F5F7;
          display: flex; align-items: center; gap: 10px;
        }
        .secteur-card:hover { border-color: #C9A84C; background: #fff; }
        .secteur-card.selected { border-color: #C9A84C; background: rgba(201,168,76,0.08); color: #1B2A3E; }
        .secteur-dot {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid #8A9BB0; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .secteur-dot.sel { border-color: #C9A84C; background: #C9A84C; }
        .secteur-dot.sel::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1B2A3E; }

        /* Attentes checkboxes */
        .attente-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 14px; border: 2px solid #e0e4ea; border-radius: 8px;
          margin-bottom: 10px; cursor: pointer;
          background: #F4F5F7; transition: all 0.2s;
        }
        .attente-item:hover { border-color: #C9A84C; background: #fff; }
        .attente-item.checked { border-color: #C9A84C; background: rgba(201,168,76,0.08); }
        .attente-check {
          width: 20px; height: 20px; border-radius: 4px;
          border: 2px solid #8A9BB0; flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .attente-check.checked { border-color: #C9A84C; background: #C9A84C; }
        .attente-check.checked::after { content: '✓'; color: #1B2A3E; font-size: 13px; font-weight: 700; }
        .attente-label { font-size: 14px; color: #2E4A6B; line-height: 1.4; }
        .attente-item.checked .attente-label { color: #1B2A3E; font-weight: 500; }

        /* Boutons de navigation form */
        .form-nav { display: flex; gap: 12px; margin-top: 24px; }
        .btn-next {
          flex: 1; background: #C9A84C; color: #1B2A3E;
          padding: 13px; border: none; border-radius: 6px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          transition: background 0.2s; font-family: inherit;
        }
        .btn-next:hover:not(:disabled) { background: #b8913d; }
        .btn-next:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-back {
          background: transparent; color: #8A9BB0;
          padding: 13px 20px; border: 1px solid #e0e4ea; border-radius: 6px;
          font-size: 14px; cursor: pointer; font-family: inherit;
          transition: all 0.2s;
        }
        .btn-back:hover { border-color: #1B2A3E; color: #1B2A3E; }

        /* Étape 4 — Calendly */
        .step4-wrap { text-align: center; padding: 16px 0; }
        .step4-wrap h3 { color: #1B2A3E; font-size: 22px; font-weight: 700; margin: 0 0 8px; }
        .step4-wrap p { color: #8A9BB0; font-size: 15px; margin: 0 0 28px; line-height: 1.6; }
        .btn-calendly {
          display: inline-block; background: #C9A84C; color: #1B2A3E;
          padding: 16px 36px; border-radius: 8px;
          font-size: 16px; font-weight: 700; text-decoration: none;
          transition: background 0.2s;
        }
        .btn-calendly:hover { background: #b8913d; }
        .form-success-msg { font-size: 13px; color: #2e7d32; margin-top: 16px; }
        .form-error { background: #fdecea; color: #c62828; padding: 14px; border-radius: 6px; font-size: 14px; margin-top: 12px; text-align: center; }

        /* FOOTER */
        footer { background: #1B2A3E; padding: 40px; text-align: center; }
        .footer-logo { height: 32px; margin-bottom: 16px; }
        footer p { color: #8A9BB0; font-size: 13px; margin: 0; }
        footer a { color: #C9A84C; text-decoration: none; }
        footer a:hover { text-decoration: underline; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .burger { display: flex; }
          .hero-inner { flex-direction: column; padding: 60px 20px 40px; gap: 32px; }
          .hero-photo img { width: 200px; height: 260px; }
          .hero-title { font-size: 28px; }
          .hero-subtitle { font-size: 16px; }
          .diag-grid { grid-template-columns: 1fr; }
          .acte { flex-direction: column; gap: 12px; }
          .acte-left { width: 100%; min-width: unset; padding: 0; }
          .cred-grid { grid-template-columns: 1fr; gap: 24px; }
          .offre-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .form-row { grid-template-columns: 1fr; }
          .secteur-grid { grid-template-columns: 1fr; }
          section { padding: 60px 20px; }
          .navbar { padding: 0 20px; }
          .kpis { flex-direction: column; align-items: center; }
          .kpi { width: 100%; max-width: 280px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <img src="/logo-sena-consulting-blanc.svg" alt="SENA CONSULTING" className="nav-logo" />
        <ul className="nav-links">
          <li><a href="#diagnostic">Diagnostic</a></li>
          <li><a href="#methode">Méthode</a></li>
          <li><a href="#credibilite">Crédibilité</a></li>
          <li><a href="#offre">Offre</a></li>
          <li><a href="#contact" className="nav-cta">Audit Gratuit</a></li>
        </ul>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#diagnostic" onClick={() => setMenuOpen(false)}>Diagnostic</a>
        <a href="#methode" onClick={() => setMenuOpen(false)}>Méthode</a>
        <a href="#credibilite" onClick={() => setMenuOpen(false)}>Crédibilité</a>
        <a href="#offre" onClick={() => setMenuOpen(false)}>Offre</a>
        <a href="#contact" onClick={() => setMenuOpen(false)} style={{ color: "#C9A84C", fontWeight: "bold" }}>Audit Gratuit</a>
      </div>

      {/* HERO */}
      <section className="hero" id="accueil">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-tag">Cabinet de conseil · PME / TPE</span>
            <h1 className="hero-title">
              Décuplez votre<br />
              <span>chiffre d'affaires</span><br />
              sans jargon inutile
            </h1>
            <p className="hero-subtitle">
              La rigueur des grands cabinets, au service des PME/TPE.<br />
              Des résultats concrets. Un accompagnement humain.
            </p>
            <div className="hero-btns">
              <a href="#contact" className="btn-primary">Demander un audit gratuit</a>
              <a href="#methode" className="btn-secondary">Notre méthode</a>
            </div>
          </div>
          <div className="hero-photo">
            <img src="/ulrich-gbada-consultant-sena-consulting.jpg" alt="Ulrich GBADA — Fondateur SENA CONSULTING" />
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC */}
      <section className="diagnostic" id="diagnostic">
        <div className="section-inner">
          <div className="section-tag">Le constat</div>
          <h2 className="section-title">Ce que les autres cabinets font mal</h2>
          <div className="diag-grid">
            <div className="diag-card">
              <h3>Surfer sur les buzzwords</h3>
              <p>IA, automatisation, chatbot… Les cabinets vendent des technologies plutôt que de la valeur. Quand tout le monde aura adopté l'IA, que restera-t-il ?</p>
            </div>
            <div className="diag-card">
              <h3>Jargon incompréhensible</h3>
              <p>Un vocabulaire opaque qui noie les dirigeants. Des consultants qui n'ont jamais dirigé une entreprise et n'ont jamais été « skin in the game ».</p>
            </div>
            <div className="diag-card">
              <h3>Prix exorbitants, valeur faible</h3>
              <p>Les grands cabinets ignorent les PME/TPE. Pourtant, les PME bien accompagnées d'aujourd'hui seront les géants de demain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METHODE */}
      <section className="methode" id="methode">
        <div className="section-inner">
          <div className="section-tag">Notre approche</div>
          <h2 className="section-title">La Méthode Grand Cabinet, accessible à tous</h2>
          <div className="actes">
            {[
              {
                num: "Acte I", name: "Diagnostic & Clarté",
                desc: "Comprendre votre réalité terrain avant toute préconisation. Identifier les vrais leviers de croissance et les freins cachés.",
                items: ["Audit business complet (modèle, marché, organisation)", "Cartographie des processus métier", "Identification des quick wins"],
              },
              {
                num: "Acte II", name: "Stratégie & Décision",
                desc: "Construire une feuille de route claire, actionnée par les données. Des décisions éclairées grâce à la data, pas à l'intuition seule.",
                items: ["Tableaux de bord décisionnels (Data Analysis)", "Priorisation des actions à fort impact", "Plan de transformation sur mesure"],
              },
              {
                num: "Acte III", name: "Exécution & Agilité",
                desc: "Déployer vite, ajuster en continu. Le Cloud et les outils innovants (IA, CRM, Cloud…) comme accélérateurs — pas comme centres de coût.",
                items: ["Implémentation agile des solutions", "Automatisation ciblée des tâches non cœur de métier", "Formation et conduite du changement"],
              },
              {
                num: "Acte IV", name: "Ancrage & Croissance",
                desc: "Pérenniser les résultats. Faire de votre entreprise une organisation apprenante, capable de se réinventer durablement.",
                items: ["Montée en compétences des équipes", "Indicateurs de performance clés (KPIs)", "Accompagnement conseil continu"],
              },
            ].map((acte) => (
              <div className="acte" key={acte.num}>
                <div className="acte-left">
                  <div className="acte-num">{acte.num}</div>
                  <div className="acte-name">{acte.name}</div>
                </div>
                <div className="acte-right">
                  <p>{acte.desc}</p>
                  <ul>{acte.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITE */}
      <section className="credibilite" id="credibilite">
        <div className="section-inner">
          <div className="section-tag" style={{ color: "#C9A84C" }}>Pourquoi nous faire confiance</div>
          <h2 className="section-title">10+ ans d'expérience terrain</h2>
          <div className="cred-grid">
            <div className="cred-block">
              <h3>Grands Cabinets</h3>
              <ul className="cred-list">
                <li>Wavestone — Consultant</li>
                <li>ANEO — Consultant</li>
                <li>SopraSteria — Consultant Manager</li>
              </ul>
            </div>
            <div className="cred-block">
              <h3>Grands Comptes</h3>
              <ul className="cred-list">
                <li>Orange — Consultant Manager externe</li>
                <li>ADP — Consultant Manager externe</li>
                <li>SPM — Consultant Manager externe</li>
                <li>Ministère de l'Intérieur — Consultant Manager externe</li>
              </ul>
            </div>
          </div>
          <div className="kpis">
            <div className="kpi"><span className="kpi-val">10+</span><span className="kpi-label">Ans d'expérience</span></div>
            <div className="kpi"><span className="kpi-val">4</span><span className="kpi-label">Grands cabinets</span></div>
            <div className="kpi"><span className="kpi-val">PME/TPE</span><span className="kpi-label">Notre cœur de cible</span></div>
          </div>
        </div>
      </section>

      {/* OFFRE — cartes sombres avec SVG */}
      <section className="offre" id="offre">
        <div className="section-inner">
          <div className="section-tag">Nos prestations</div>
          <h2 className="section-title">Une offre taillée pour votre réalité</h2>
          <div className="offre-grid">
            <div className="offre-card">
              <div className="offre-icon-wrap"><IconAudit /></div>
              <h3>Audit Business</h3>
              <p>Un diagnostic complet de votre entreprise pour identifier les leviers de croissance et les axes de transformation prioritaires.</p>
              <div className="offre-price">Offre d'entrée — Audit gratuit</div>
            </div>
            <div className="offre-card">
              <div className="offre-icon-wrap"><IconData /></div>
              <h3>Performance & Data</h3>
              <p>Tableaux de bord décisionnels pour piloter votre activité avec des indicateurs qui parlent vraiment à un dirigeant.</p>
              <div className="offre-price">Sur devis — selon périmètre</div>
            </div>
            <div className="offre-card">
              <div className="offre-icon-wrap"><IconTransform /></div>
              <h3>Transformation & Croissance</h3>
              <p>Accompagnement complet pour structurer, digitaliser et accélérer votre business. Du conseil à l'exécution.</p>
              <div className="offre-price">Forfait mensuel ou mission ponctuelle</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT — formulaire 4 étapes */}
      <section className="contact" id="contact">
        <div className="section-inner">
          <div className="section-tag">Passons à l'action</div>
          <h2 className="section-title">Demandez votre audit gratuit</h2>
          <div className="contact-grid">
            {/* Infos de contact */}
            <div className="contact-info">
              <h3>Parlons de votre projet</h3>
              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <div className="contact-item-label">Téléphone</div>
                  <a href="tel:+33768934837" className="contact-item-val">07 68 93 48 37</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div className="contact-item-text">
                  <div className="contact-item-label">Email</div>
                  <a href="mailto:contact@sena-consulting.fr" className="contact-item-val">contact@sena-consulting.fr</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">💼</div>
                <div className="contact-item-text">
                  <div className="contact-item-label">LinkedIn</div>
                  <a href="https://www.linkedin.com/in/ulrich-gbada-3742a269/" target="_blank" rel="noopener noreferrer" className="contact-item-val">Ulrich GBADA</a>
                </div>
              </div>
            </div>

            {/* Formulaire multi-étapes */}
            <div>
              {/* Stepper */}
              <div className="stepper">
                {["Identité", "Secteur", "Attentes", "RDV"].map((label, i) => {
                  const n = i + 1;
                  const isActive = step === n;
                  const isDone = step > n;
                  return (
                    <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="step-item">
                        <div className={`step-circle ${isActive ? "active" : isDone ? "done" : ""}`}>
                          {isDone ? "✓" : n}
                        </div>
                        <div className={`step-label ${isActive ? "active" : ""}`}>{label}</div>
                      </div>
                      {i < 3 && <div className={`step-connector ${isDone ? "done" : ""}`} />}
                    </div>
                  );
                })}
              </div>

              {/* ÉTAPE 1 — Identité */}
              {step === 1 && (
                <div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom complet *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email professionnel *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="jean@entreprise.fr" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Nom de la société</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Nom de votre entreprise" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 00 00 00 00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Adresse d'exercice</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Ville, code postal ou adresse complète" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="taille">Taille de la société</label>
                      <select id="taille" name="taille" value={formData.taille} onChange={handleChange}>
                        <option value="">Sélectionner…</option>
                        <option>1 personne (auto-entrepreneur)</option>
                        <option>2 – 9 salariés</option>
                        <option>10 – 49 salariés</option>
                        <option>50 – 249 salariés</option>
                        <option>250 salariés et plus</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ca">Chiffre d'affaires annuel *</label>
                      <select id="ca" name="ca" value={formData.ca} onChange={handleChange} required>
                        <option value="">Sélectionner…</option>
                        <option>Moins de 100 000 €</option>
                        <option>100 000 – 500 000 €</option>
                        <option>500 000 – 2 000 000 €</option>
                        <option>2 000 000 – 10 000 000 €</option>
                        <option>Plus de 10 000 000 €</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-nav">
                    <button
                      className="btn-next"
                      onClick={() => setStep(2)}
                      disabled={!formData.name || !formData.email || !formData.ca}
                    >
                      Étape suivante →
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 — Secteur */}
              {step === 2 && (
                <div>
                  <p style={{ color: "#2E4A6B", fontSize: 14, marginBottom: 20 }}>Quel est votre secteur d'activité ?</p>
                  <div className="secteur-grid">
                    {secteurs.map((s) => (
                      <div
                        key={s}
                        className={`secteur-card ${formData.secteur === s ? "selected" : ""}`}
                        onClick={() => setFormData({ ...formData, secteur: s })}
                      >
                        <div className={`secteur-dot ${formData.secteur === s ? "sel" : ""}`} />
                        {s}
                      </div>
                    ))}
                  </div>
                  {formData.secteur === "Autre" && (
                    <div className="form-group" style={{ marginTop: 14 }}>
                      <label htmlFor="secteurAutre">Précisez votre secteur *</label>
                      <input type="text" id="secteurAutre" name="secteurAutre" value={formData.secteurAutre} onChange={handleChange} placeholder="Ex : Restauration, Santé, Commerce…" />
                    </div>
                  )}
                  <div className="form-nav">
                    <button className="btn-back" onClick={() => setStep(1)}>← Retour</button>
                    <button
                      className="btn-next"
                      onClick={() => setStep(3)}
                      disabled={!formData.secteur || (formData.secteur === "Autre" && !formData.secteurAutre)}
                    >
                      Étape suivante →
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 — Attentes */}
              {step === 3 && (
                <div>
                  <p style={{ color: "#2E4A6B", fontSize: 14, marginBottom: 20 }}>Quels sont vos objectifs ? <span style={{ color: "#8A9BB0" }}>(plusieurs choix possibles)</span></p>
                  {attentesList.map((a) => (
                    <div
                      key={a}
                      className={`attente-item ${formData.attentes.includes(a) ? "checked" : ""}`}
                      onClick={() => handleCheckbox(a)}
                    >
                      <div className={`attente-check ${formData.attentes.includes(a) ? "checked" : ""}`} />
                      <span className="attente-label">{a}</span>
                    </div>
                  ))}
                  {formData.attentes.includes("Autre") && (
                    <div className="form-group" style={{ marginTop: 8 }}>
                      <label htmlFor="attenteAutre">Précisez votre attente</label>
                      <input type="text" id="attenteAutre" name="attenteAutre" value={formData.attenteAutre} onChange={handleChange} placeholder="Décrivez votre besoin…" />
                    </div>
                  )}
                  {formStatus === "error" && (
                    <div className="form-error">Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</div>
                  )}
                  <div className="form-nav">
                    <button className="btn-back" onClick={() => setStep(2)}>← Retour</button>
                    <button
                      className="btn-next"
                      onClick={handleStep3Submit}
                      disabled={formData.attentes.length === 0 || formStatus === "sending"}
                    >
                      {formStatus === "sending" ? "Envoi…" : "Confirmer →"}
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 4 — Calendly */}
              {step === 4 && (
                <div className="step4-wrap">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3>Votre demande est enregistrée !</h3>
                  <p>
                    Merci {formData.name ? formData.name.split(" ")[0] : ""} — nous avons bien reçu votre demande d'audit.<br />
                    Réservez maintenant votre créneau pour un rendez-vous avec Ulrich.
                  </p>
                  <a
                    href="https://calendly.com/contact-sena-consulting/audit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-calendly"
                  >
                    📅 Réserver mon audit gratuit
                  </a>
                  <p className="form-success-msg">Un email de confirmation vous a également été envoyé.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img src="/logo-sena-consulting-blanc.svg" alt="SENA CONSULTING" className="footer-logo" />
        <p>
          © {new Date().getFullYear()} — SENA CONSULTING · Conseil en performance business pour PME/TPE<br />
          <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a> · 07 68 93 48 37
        </p>
      </footer>
    </>
  );
}
