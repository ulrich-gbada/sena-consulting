"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        /* NAV */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #1B2A3E;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 72px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .nav-logo {
          height: 40px;
          width: auto;
        }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #F4F5F7;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #C9A84C; }
        .nav-cta {
          background: #C9A84C;
          color: #1B2A3E !important;
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: bold !important;
          font-size: 13px !important;
        }
        .nav-cta:hover { background: #b8913d; color: #1B2A3E !important; }
        .burger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
          background: none;
          border: none;
          padding: 4px;
        }
        .burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #F4F5F7;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: #1B2A3E;
          padding: 16px 24px 24px;
          gap: 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          color: #F4F5F7;
          text-decoration: none;
          font-size: 15px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .mobile-menu a:hover { color: #C9A84C; }

        /* HERO */
        .hero {
          background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%);
          padding-top: 72px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px;
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .hero-text { flex: 1; }
        .hero-tag {
          display: inline-block;
          background: rgba(201,168,76,0.15);
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero-title {
          font-size: 42px;
          font-weight: 800;
          color: #F4F5F7;
          line-height: 1.2;
          margin: 0 0 16px;
        }
        .hero-title span { color: #C9A84C; }
        .hero-subtitle {
          font-size: 18px;
          color: #8A9BB0;
          line-height: 1.7;
          margin: 0 0 36px;
        }
        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #C9A84C;
          color: #1B2A3E;
          padding: 14px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #b8913d; }
        .btn-secondary {
          background: transparent;
          color: #F4F5F7;
          padding: 14px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          border: 1px solid rgba(255,255,255,0.25);
          transition: border-color 0.2s;
        }
        .btn-secondary:hover { border-color: #C9A84C; color: #C9A84C; }
        .hero-photo {
          flex-shrink: 0;
        }
        .hero-photo img {
          width: 300px;
          height: 380px;
          object-fit: cover;
          border-radius: 12px;
          border: 3px solid rgba(201,168,76,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        /* SECTIONS */
        section { padding: 80px 40px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-tag {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 12px;
        }
        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #1B2A3E;
          margin: 0 0 48px;
        }

        /* DIAGNOSTIC */
        .diagnostic { background: #F4F5F7; }
        .diag-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .diag-card {
          background: #fff;
          border-radius: 10px;
          padding: 28px;
          border-left: 4px solid #C9A84C;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .diag-card h3 {
          color: #1B2A3E;
          font-size: 16px;
          margin: 0 0 10px;
        }
        .diag-card p {
          color: #8A9BB0;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        /* METHODE — 4 ACTES */
        .methode { background: #fff; }
        .actes { display: flex; flex-direction: column; gap: 0; }
        .acte {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #F4F5F7;
          padding: 32px 0;
        }
        .acte:last-child { border-bottom: none; }
        .acte-left {
          width: 200px;
          min-width: 200px;
          flex-shrink: 0;
          padding: 32px 16px 32px 12px;
        }
        .acte-num {
          font-size: 11px;
          letter-spacing: 2px;
          color: #C9A84C;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .acte-name {
          font-size: 18px;
          font-weight: 700;
          color: #1B2A3E;
        }
        .acte-right { flex: 1; }
        .acte-right p {
          color: #2E4A6B;
          font-size: 15px;
          line-height: 1.7;
          margin: 0 0 16px;
        }
        .acte-right ul {
          margin: 0;
          padding-left: 20px;
        }
        .acte-right li {
          color: #8A9BB0;
          font-size: 14px;
          line-height: 1.8;
        }

        /* CREDIBILITE */
        .credibilite { background: #1B2A3E; }
        .credibilite .section-title { color: #F4F5F7; }
        .cred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        .cred-block h3 {
          color: #C9A84C;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 16px;
        }
        .cred-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cred-list li {
          color: #F4F5F7;
          font-size: 15px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .cred-list li:last-child { border-bottom: none; }
        .kpis {
          display: flex;
          gap: 32px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .kpi {
          text-align: center;
          padding: 24px 32px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 10px;
        }
        .kpi-val {
          font-size: 36px;
          font-weight: 800;
          color: #C9A84C;
          display: block;
        }
        .kpi-label {
          font-size: 13px;
          color: #8A9BB0;
          margin-top: 4px;
          display: block;
        }

        /* OFFRE */
        .offre { background: #F4F5F7; }
        .offre-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .offre-card {
          background: #fff;
          border-radius: 10px;
          padding: 32px 28px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          text-align: center;
        }
        .offre-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }
        .offre-card h3 {
          color: #1B2A3E;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
        }
        .offre-card p {
          color: #8A9BB0;
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 20px;
        }
        .offre-price {
          font-size: 13px;
          color: #C9A84C;
          font-weight: 600;
          border-top: 1px solid #F4F5F7;
          padding-top: 16px;
          margin-top: auto;
        }

        /* CONTACT */
        .contact { background: #fff; }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: start;
        }
        .contact-info h3 {
          color: #1B2A3E;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 24px;
        }
        .contact-item {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        .contact-item-icon {
          width: 40px;
          height: 40px;
          background: rgba(201,168,76,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .contact-item-text { flex: 1; }
        .contact-item-label {
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8A9BB0;
          margin-bottom: 2px;
        }
        .contact-item-val {
          font-size: 15px;
          color: #1B2A3E;
          font-weight: 500;
          text-decoration: none;
        }
        .contact-item-val:hover { color: #C9A84C; }
        .form-group { margin-bottom: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group label {
          display: block;
          font-size: 13px;
          color: #2E4A6B;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e0e4ea;
          border-radius: 6px;
          font-size: 14px;
          color: #1B2A3E;
          background: #F4F5F7;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .form-group input:focus,
        .form-group textarea:focus { border-color: #C9A84C; background: #fff; }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .form-submit {
          width: 100%;
          background: #C9A84C;
          color: #1B2A3E;
          padding: 14px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          font-family: inherit;
        }
        .form-submit:hover:not(:disabled) { background: #b8913d; }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-success {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }
        .form-error {
          background: #fdecea;
          color: #c62828;
          padding: 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }

        /* FOOTER */
        footer {
          background: #1B2A3E;
          padding: 40px;
          text-align: center;
        }
        .footer-logo {
          height: 32px;
          margin-bottom: 16px;
        }
        footer p {
          color: #8A9BB0;
          font-size: 13px;
          margin: 0;
        }
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
          section { padding: 60px 20px; }
          .navbar { padding: 0 20px; }
          .kpis { flex-direction: column; align-items: center; }
          .kpi { width: 100%; max-width: 280px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <img
          src="/logo-sena-consulting-blanc.svg"
          alt="SENA CONSULTING"
          className="nav-logo"
        />
        <ul className="nav-links">
          <li><a href="#diagnostic">Diagnostic</a></li>
          <li><a href="#methode">Méthode</a></li>
          <li><a href="#credibilite">Crédibilité</a></li>
          <li><a href="#offre">Offre</a></li>
          <li><a href="#contact" className="nav-cta">Audit Gratuit</a></li>
        </ul>
        <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
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
            <img
              src="/ulrich-gbada-consultant-sena-consulting.jpg"
              alt="Ulrich GBADA — Fondateur SENA CONSULTING"
            />
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
            <div className="acte">
              <div className="acte-left">
                <div className="acte-num">Acte I</div>
                <div className="acte-name">Diagnostic & Clarté</div>
              </div>
              <div className="acte-right">
                <p>Comprendre votre réalité terrain avant toute préconisation. Identifier les vrais leviers de croissance et les freins cachés.</p>
                <ul>
                  <li>Audit business complet (modèle, marché, organisation)</li>
                  <li>Cartographie des processus métier</li>
                  <li>Identification des quick wins</li>
                </ul>
              </div>
            </div>
            <div className="acte">
              <div className="acte-left">
                <div className="acte-num">Acte II</div>
                <div className="acte-name">Stratégie & Décision</div>
              </div>
              <div className="acte-right">
                <p>Construire une feuille de route claire, actionnée par les données. Des décisions éclairées grâce à la data, pas à l'intuition seule.</p>
                <ul>
                  <li>Tableaux de bord décisionnels (Data Analysis)</li>
                  <li>Priorisation des actions à fort impact</li>
                  <li>Plan de transformation sur mesure</li>
                </ul>
              </div>
            </div>
            <div className="acte">
              <div className="acte-left">
                <div className="acte-num">Acte III</div>
                <div className="acte-name">Exécution & Agilité</div>
              </div>
              <div className="acte-right">
                <p>Déployer vite, ajuster en continu. Le Cloud et les outils innovants (IA, CRM, Cloud…) comme accélérateurs — pas comme centres de coût.</p>
                <ul>
                  <li>Implémentation agile des solutions</li>
                  <li>Automatisation ciblée des tâches non cœur de métier</li>
                  <li>Formation et conduite du changement</li>
                </ul>
              </div>
            </div>
            <div className="acte">
              <div className="acte-left">
                <div className="acte-num">Acte IV</div>
                <div className="acte-name">Ancrage & Croissance</div>
              </div>
              <div className="acte-right">
                <p>Pérenniser les résultats. Faire de votre entreprise une organisation apprenante, capable de se réinventer durablement.</p>
                <ul>
                  <li>Montée en compétences des équipes</li>
                  <li>Indicateurs de performance clés (KPIs)</li>
                  <li>Accompagnement conseil continu</li>
                </ul>
              </div>
            </div>
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
            <div className="kpi">
              <span className="kpi-val">10+</span>
              <span className="kpi-label">Ans d'expérience</span>
            </div>
            <div className="kpi">
              <span className="kpi-val">4</span>
              <span className="kpi-label">Grands cabinets</span>
            </div>
            <div className="kpi">
              <span className="kpi-val">PME/TPE</span>
              <span className="kpi-label">Notre cœur de cible</span>
            </div>
          </div>
        </div>
      </section>

      {/* OFFRE */}
      <section className="offre" id="offre">
        <div className="section-inner">
          <div className="section-tag">Nos prestations</div>
          <h2 className="section-title">Une offre taillée pour votre réalité</h2>
          <div className="offre-grid">
            <div className="offre-card">
              <div className="offre-icon">🎯</div>
              <h3>Audit Business</h3>
              <p>Un diagnostic complet de votre entreprise pour identifier les leviers de croissance et les axes de transformation prioritaires.</p>
              <div className="offre-price">Offre d'entrée — Audit gratuit</div>
            </div>
            <div className="offre-card">
              <div className="offre-icon">📊</div>
              <h3>Performance & Data</h3>
              <p>Tableaux de bord décisionnels pour piloter votre activité avec des indicateurs qui parlent vraiment à un dirigeant.</p>
              <div className="offre-price">Sur devis — selon périmètre</div>
            </div>
            <div className="offre-card">
              <div className="offre-icon">🚀</div>
              <h3>Transformation & Croissance</h3>
              <p>Accompagnement complet pour structurer, digitaliser et accélérer votre business. Du conseil à l'exécution.</p>
              <div className="offre-price">Forfait mensuel ou mission ponctuelle</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="section-inner">
          <div className="section-tag">Passons à l'action</div>
          <h2 className="section-title">Demandez votre audit gratuit</h2>
          <div className="contact-grid">
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
                  <a
                    href="https://www.linkedin.com/in/ulrich-gbada-3742a269/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item-val"
                  >
                    Ulrich GBADA
                  </a>
                </div>
              </div>
            </div>

            <div>
              {formStatus === "success" ? (
                <div className="form-success">
                  ✅ Votre message a bien été envoyé ! Nous vous recontactons sous 24 à 48h ouvrées.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom complet *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email professionnel *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean@entreprise.fr"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Société</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Votre message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre situation, vos enjeux, ce que vous souhaitez améliorer…"
                      required
                    />
                  </div>
                  {formStatus === "error" && (
                    <div className="form-error" style={{ marginBottom: 16 }}>
                      Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="form-submit"
                    disabled={formStatus === "sending"}
                  >
                    {formStatus === "sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img
          src="/logo-sena-consulting-blanc.svg"
          alt="SENA CONSULTING"
          className="footer-logo"
        />
        <p>
          © {new Date().getFullYear()} — SENA CONSULTING · Conseil en performance business pour PME/TPE<br />
          <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a> · 07 68 93 48 37
        </p>
      </footer>
    </>
  );
}
