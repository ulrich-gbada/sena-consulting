export default function Home() {
  return (
    <main style={{ fontFamily: "'Arial', sans-serif", color: "#1A1A2E", margin: 0, padding: 0 }}>

      {/* ── NAVIGATION ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#1B2A3E", padding: "10px 40px",
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)"
      }}>
        {/* Liens gauche — vides pour équilibrer */}
        <div style={{ display: "flex", gap: 28, justifyContent: "flex-start" }}>
          {["Vision", "Méthode"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "#C9A84C", textDecoration: "none", fontSize: 13,
              fontWeight: "bold", letterSpacing: 1
            }}>{item}</a>
          ))}
        </div>

        {/* Logo centré — cliquable vers accueil */}
        <div style={{ textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block" }}>
            <img
              src="/logo-sena-consulting-blanc.svg"
              alt="SENA CONSULTING - Cabinet de conseil en performance business pour PME TPE - Retour accueil"
              style={{ height: 44, width: "auto" }}
            />
          </a>
        </div>

        {/* Liens droite */}
        <div style={{ display: "flex", gap: 28, justifyContent: "flex-end" }}>
          {["Crédibilité", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "#C9A84C", textDecoration: "none", fontSize: 13,
              fontWeight: "bold", letterSpacing: 1
            }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%)",
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 40px 80px", gap: 60
      }}>
        <div style={{ flex: 1, maxWidth: 620 }}>
          <p style={{
            color: "#C9A84C", fontWeight: "bold", letterSpacing: 3,
            fontSize: 12, textTransform: "uppercase", marginBottom: 20
          }}>
            Cabinet de conseil en performance business pour PME / TPE
          </p>
          <h1 style={{
            color: "#fff", fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, lineHeight: 1.1, marginBottom: 16
          }}>
            Votre entreprise peut<br />
            <span style={{ color: "#C9A84C" }}>10× sa croissance.</span>
          </h1>
          <p style={{
            color: "#8A9BB0", fontSize: 20, fontStyle: "italic",
            marginBottom: 40, lineHeight: 1.5
          }}>
            Le frein, c&apos;est rarement la technologie.
          </p>
          <p style={{
            color: "#ccc", fontSize: 16, lineHeight: 1.8, marginBottom: 48, maxWidth: 520
          }}>
            Vous dirigez une entreprise dans un secteur concurrentiel. Vous savez qu&apos;elle
            peut faire bien plus. Mais entre le quotidien opérationnel, les fausses pistes
            technologiques et le manque de cap clair, la croissance reste en dessous de
            son potentiel réel.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: "#C9A84C", color: "#1B2A3E", padding: "16px 36px",
              borderRadius: 4, fontWeight: "bold", fontSize: 15,
              textDecoration: "none", letterSpacing: 1
            }}>
              Diagnostic gratuit — 45 min
            </a>
            <a href="#methode" style={{
              border: "2px solid #C9A84C", color: "#C9A84C", padding: "16px 36px",
              borderRadius: 4, fontWeight: "bold", fontSize: 15,
              textDecoration: "none", letterSpacing: 1
            }}>
              Notre méthode
            </a>
          </div>
        </div>

        {/* Photo */}
        <div style={{ flex: "0 0 340px", textAlign: "center" }}>
          <div style={{
            width: 280, height: 340, margin: "0 auto",
            borderRadius: 8, overflow: "hidden",
            border: "3px solid #C9A84C",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
          }}>
            <img
            src="/ulrich-gbada-consultant-sena-consulting.jpg"
              alt="Ulrich GBADA — Fondateur SENA CONSULTING, Ingénieur EPITA, Consultant Manager, expert en performance business pour PME TPE"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          <p style={{ color: "#C9A84C", fontWeight: "bold", marginTop: 16, fontSize: 15 }}>
            Ulrich GBADA
          </p>
          <p style={{ color: "#8A9BB0", fontSize: 13, marginTop: 4 }}>
            Ingénieur EPITA · Consultant Manager
          </p>
          <p style={{ color: "#8A9BB0", fontSize: 13 }}>
            10+ ans d&apos;expérience en conseil
          </p>
        </div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" style={{ background: "#F4F5F7", padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: "bold", letterSpacing: 3, fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>Notre vision</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1B2A3E", marginBottom: 24, fontWeight: 900 }}>
            La technologie au service du Business,<br />pas l&apos;inverse.
          </h2>
          <p style={{ fontSize: 17, color: "#444", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 48px" }}>
            L&apos;IA, le Cloud, le CRM sont des leviers — pas des fins. Ce qui crée de la valeur,
            c&apos;est ce que vous en faites pour votre client et votre croissance. Avant d&apos;implémenter
            une technologie, nous construisons d&apos;abord votre stratégie.
          </p>

          {/* 3 pain points */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "⚠️", title: "Pas de vision claire", desc: "à 12-36 mois pour orienter les décisions stratégiques" },
              { icon: "🔄", title: "Des processus qui freinent", desc: "la croissance sans qu'on le sache vraiment" },
              { icon: "💡", title: "Des outils innovants", desc: "(IA, CRM, Cloud…) achetés sans stratégie ni ROI mesurable" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "#fff", padding: "32px 24px", borderRadius: 8,
                borderTop: "4px solid #C9A84C", textAlign: "left",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ color: "#1B2A3E", fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMESSE ── */}
      <section style={{ background: "#1B2A3E", padding: "60px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, marginBottom: 12 }}>
            Notre promesse : un audit stratégique structuré, une vision claire,
          </h2>
          <h2 style={{ color: "#C9A84C", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, marginBottom: 32, fontStyle: "italic" }}>
            une roadmap concrète pour décupler votre chiffre d&apos;affaires.
          </h2>
          <a href="#contact" style={{
            background: "#C9A84C", color: "#1B2A3E", padding: "18px 48px",
            borderRadius: 4, fontWeight: "bold", fontSize: 16,
            textDecoration: "none", letterSpacing: 1, display: "inline-block"
          }}>
            Démarrer mon diagnostic gratuit
          </a>
        </div>
      </section>

      {/* ── MÉTHODE : 4 ACTES ── */}
      <section id="methode" style={{ background: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontWeight: "bold", letterSpacing: 3, fontSize: 12, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Notre méthode</p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#1B2A3E", marginBottom: 48, fontWeight: 900, textAlign: "center" }}>
            Une approche en 4 actes, Business-first
          </h2>

          {[
            {
              num: "01", color: "#1B2A3E", title: "DIAGNOSTIC",
              sub: "Où en êtes-vous vraiment ?",
              points: ["Échelle de maturité stratégique de votre entreprise", "Identification des forces, freins et opportunités manquées", "Analyse de votre Business Model et Product Market Fit", "Livrable : rapport de maturité + axes prioritaires"]
            },
            {
              num: "02", color: "#2E4A6B", title: "VISION",
              sub: "Où allez-vous et comment ?",
              points: ["Vision stratégique claire : vous êtes ici, vous allez là", "Roadmap de transformation Business-first", "Déclinaison sur les fonctions IT, RH, Finance, Logistique", "Livrable : roadmap de transformation + grandes étapes"]
            },
            {
              num: "03", color: "#1B2A3E", title: "TRANSFORMATION",
              sub: "Ce qui change concrètement",
              points: ["Refonte des processus métier en mode Agile (sans effet tunnel)", "Intégration ciblée Cloud / IA là où le ROI est prouvé", "Tableau de bord opérationnel (pilotage Agile)", "Tableau de bord dirigeant (métriques décision)"]
            },
            {
              num: "04", color: "#1A4A2E", title: "IMPACT HUMAIN",
              sub: "Vos équipes embarquées, pas subies",
              points: ["Co-création avec le terrain : le métier au cœur", "Recueil Agile des feedbacks à chaque étape", "Communication, gestion du changement", "Formation et évolution des métiers"]
            },
          ].map(({ num, color, title, sub, points }) => (
            <div key={num} style={{
              display: "flex", gap: 0, marginBottom: 16, borderRadius: 8, overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}>
              {/* Gauche */}
              <div style={{ background: color, padding: "32px 16px 32px 12px", width: 200, minWidth: 200, flexShrink: 0, color: "#fff" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.15)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontWeight: "bold", fontSize: 16, letterSpacing: 2, marginTop: 8 }}>{title}</div>
                <div style={{ color: "#C9A84C", fontSize: 13, fontStyle: "italic", marginTop: 8, lineHeight: 1.4 }}>{sub}</div>
              </div>
              {/* Droite */}
              <div style={{ background: "#F4F5F7", padding: "32px 28px", flex: 1 }}>
                {points.map(p => (
                  <div key={p} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ color: color, fontWeight: "bold", fontSize: 16, marginTop: 1 }}>▸</span>
                    <span style={{ color: "#333", fontSize: 14, lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CRÉDIBILITÉ ── */}
      <section id="crédibilité" style={{ background: "#F4F5F7", padding: "80px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontWeight: "bold", letterSpacing: 3, fontSize: 12, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Parcours & Crédibilité</p>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#1B2A3E", marginBottom: 12, fontWeight: 900, textAlign: "center" }}>
            La méthode des grands cabinets.
          </h2>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#2E4A6B", marginBottom: 48, fontWeight: 900, textAlign: "center", fontStyle: "italic" }}>
            La proximité d&apos;un entrepreneur.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Cabinets */}
            <div style={{ background: "#fff", padding: "32px", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#C9A84C", fontSize: 12, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>▶ Cabinets de conseil</h3>
              {[
                { name: "Wavestone", role: "Consultant" },
                { name: "ANEO", role: "Consultant" },
                { name: "SopraSteria", role: "Consultant Manager" },
              ].map(({ name, role }) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eee" }}>
                  <span style={{ fontWeight: "bold", color: "#1B2A3E", fontSize: 15 }}>{name}</span>
                  <span style={{ color: "#8A9BB0", fontSize: 13 }}>{role}</span>
                </div>
              ))}
            </div>

            {/* Grands comptes */}
            <div style={{ background: "#fff", padding: "32px", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#C9A84C", fontSize: 12, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>▶ Grands comptes (mission externe)</h3>
              {["Orange", "ADP — Aéroports de Paris", "SPM — Services du Premier Ministre", "Ministère de l'Intérieur"].map(name => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid #eee" }}>
                  <span style={{ color: "#C9A84C", fontWeight: "bold" }}>•</span>
                  <span style={{ color: "#1B2A3E", fontSize: 15 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formation */}
          <div style={{ background: "#1B2A3E", padding: "20px 32px", borderRadius: 8, marginTop: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#C9A84C", fontWeight: "bold", fontSize: 12, letterSpacing: 3 }}>▶ FORMATION</span>
            <span style={{ color: "#fff", fontSize: 15 }}>Ingénieur EPITA — Réseaux & Télécommunications (TCOM)</span>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "#1B2A3E", padding: "80px 40px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontWeight: "bold", letterSpacing: 3, fontSize: 12, textTransform: "uppercase", marginBottom: 16 }}>Contact</p>
          <h2 style={{ color: "#fff", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 900, marginBottom: 12 }}>
            Premier diagnostic offert
          </h2>
          <p style={{ color: "#8A9BB0", fontSize: 16, marginBottom: 48 }}>
            45 min · Sans engagement · Questionnaire en ligne + restitution visio
          </p>

          <form style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            {[
              { name: "name", label: "Nom & Prénom", type: "text", placeholder: "Jean Dupont" },
              { name: "company", label: "Société", type: "text", placeholder: "Ma Société SAS" },
              { name: "email", label: "Email professionnel", type: "email", placeholder: "jean@masociete.fr" },
              { name: "phone", label: "Téléphone", type: "tel", placeholder: "06 12 34 56 78" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label style={{ color: "#C9A84C", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  style={{
                    width: "100%", padding: "14px 16px", background: "#2E4A6B",
                    border: "1px solid #3A5A7B", borderRadius: 4, color: "#fff",
                    fontSize: 15, outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>
            ))}

            <div>
              <label style={{ color: "#C9A84C", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Secteur d&apos;activité</label>
              <select style={{
                width: "100%", padding: "14px 16px", background: "#2E4A6B",
                border: "1px solid #3A5A7B", borderRadius: 4, color: "#fff",
                fontSize: 15, outline: "none", boxSizing: "border-box"
              }}>
                <option value="">Sélectionner votre secteur</option>
                {["Sécurité Privée", "Cabinet Comptable", "Immobilier", "Santé / Paramédical", "Transport & Logistique", "Restauration & Hôtellerie", "BTP & Artisanat", "Agence Communication", "Commerce Multi-sites", "Autre"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: "#C9A84C", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Message</label>
              <textarea
                rows={4}
                placeholder="Décrivez brièvement votre principale problématique de croissance..."
                style={{
                  width: "100%", padding: "14px 16px", background: "#2E4A6B",
                  border: "1px solid #3A5A7B", borderRadius: 4, color: "#fff",
                  fontSize: 15, outline: "none", resize: "vertical", boxSizing: "border-box"
                }}
              />
            </div>

            <button type="submit" style={{
              background: "#C9A84C", color: "#1B2A3E", padding: "18px",
              border: "none", borderRadius: 4, fontWeight: "bold", fontSize: 16,
              cursor: "pointer", letterSpacing: 1, marginTop: 8
            }}>
              Demander mon diagnostic gratuit →
            </button>
          </form>

          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            <a href="mailto:contact@sena-consulting.fr" style={{ color: "#C9A84C", textDecoration: "none", fontSize: 14 }}>
              📧 contact@sena-consulting.fr
            </a>
            <a href="tel:0768934837" style={{ color: "#C9A84C", textDecoration: "none", fontSize: 14 }}>
              📱 07 68 93 48 37
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F1B2A", padding: "24px 40px", textAlign: "center" }}>
        <p style={{ color: "#8A9BB0", fontSize: 13, margin: 0 }}>
          © {new Date().getFullYear()}{" "} — SENA CONSULTING — Cabinet de conseil en performance business pour PME/TPE
          &nbsp;·&nbsp;
          <a href="/mentions-legales" style={{ color: "#C9A84C", textDecoration: "none" }}>Mentions légales</a>
          &nbsp;·&nbsp;
          <a href="/cgv" style={{ color: "#C9A84C", textDecoration: "none" }}>CGV</a>
        </p>
      </footer>

    </main>
  );
}
