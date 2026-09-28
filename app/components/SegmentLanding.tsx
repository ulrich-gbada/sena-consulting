import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import type { SegmentPage } from "../data/segments";

// ─── Landing « Sur mesure » ─────────────────────────────────────────────────
// Une page par segment. Avec offre : hero, ce qui a changé, le problème, comment
// ça se passe, ce que vous recevez, exemple, prix, engagements, formulaire.
// Sans offre : hero, message « en construction », formulaire (pré-diagnostic).

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="8" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="1.2" />
    <polyline points="5,9 8,12 13,6" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function SegmentLanding({ page }: { page: SegmentPage }) {
  const o = page.offer;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }
        html { scroll-behavior: smooth; }
        [id] { scroll-margin-top: 96px; }

        /* ── HERO ── */
        .sl-hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding: 150px 40px 70px; }
        .sl-hero-inner { max-width: 1000px; margin: 0 auto; text-align: center; }
        .sl-crumb { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #8A9BB0; margin-bottom: 18px; }
        .sl-crumb a { color: #8A9BB0; text-decoration: none; }
        .sl-crumb a:hover { color: #C9A84C; }
        .sl-brand { display: inline-block; background: rgba(201,168,76,0.16); color: #C9A84C; border: 1px solid rgba(201,168,76,0.4); padding: 8px 22px; border-radius: 24px; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 22px; }
        .sl-h1 { font-size: 42px; font-weight: 800; color: #F4F5F7; line-height: 1.15; margin: 0 0 18px; }
        .sl-brandline { font-size: 14px; color: #C9A84C; letter-spacing: 0.3px; margin: 0 0 22px; }
        .sl-sub { font-size: 17px; color: rgba(244,245,247,0.82); line-height: 1.75; margin: 0 auto 34px; max-width: 860px; }
        .sl-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { background: #C9A84C; color: #1B2A3E; padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px; transition: background 0.2s; display: inline-block; }
        .btn-primary:hover { background: #b8913d; }
        .btn-secondary { background: transparent; color: #F4F5F7; padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.2s; display: inline-block; }
        .btn-secondary:hover { border-color: #C9A84C; color: #C9A84C; }
        .sl-hero-note { margin-top: 18px; font-size: 13px; color: #8A9BB0; }

        /* ── SECTIONS ── */
        .sl-section { padding: 76px 40px; }
        .sl-inner { max-width: 1100px; margin: 0 auto; }
        .sl-tag { font-size: 18px; letter-spacing: 3px; font-weight: 700; text-transform: uppercase; color: #C9A84C; margin-bottom: 14px; }
        .sl-title { font-size: 30px; font-weight: 700; color: #1B2A3E; margin: 0 0 40px; line-height: 1.25; }
        .sl-light { background: #F4F5F7; }
        .sl-white { background: #fff; }
        .sl-dark { background: #1B2A3E; }
        .sl-dark .sl-title { color: #F4F5F7; }

        /* Chiffres */
        .sl-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .sl-stats.four { grid-template-columns: repeat(4, 1fr); }
        .sl-stat { background: #fff; border-radius: 12px; padding: 26px 24px; border-top: 4px solid #C9A84C; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .sl-dark .sl-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(201,168,76,0.25); border-top: 4px solid #C9A84C; box-shadow: none; }
        .sl-stat-val { font-size: 32px; font-weight: 800; color: #1B2A3E; display: block; margin-bottom: 8px; line-height: 1.1; }
        .sl-dark .sl-stat-val { color: #C9A84C; }
        .sl-stat-label { font-size: 14px; color: #2E4A6B; line-height: 1.55; }
        .sl-dark .sl-stat-label { color: rgba(244,245,247,0.8); }

        /* Douleurs */
        .sl-pains { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .sl-pain { background: #fff; border-radius: 10px; padding: 28px; border-left: 4px solid #C9A84C; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .sl-light .sl-pain { background: #fff; }
        .sl-white .sl-pain { background: #F4F5F7; box-shadow: none; }
        .sl-pain h3 { color: #1B2A3E; font-size: 17px; margin: 0 0 10px; }
        .sl-pain p { color: #2E4A6B; font-size: 14.5px; line-height: 1.65; margin: 0; }

        /* Étapes */
        .sl-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .sl-step { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px 22px; position: relative; }
        .sl-step-when { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #C9A84C; font-weight: 700; margin-bottom: 10px; }
        .sl-step h3 { color: #F4F5F7; font-size: 17px; margin: 0 0 8px; }
        .sl-step p { color: rgba(244,245,247,0.75); font-size: 14px; line-height: 1.6; margin: 0; }

        /* Livrables */
        .sl-deliv { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; }
        .sl-deliv li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.6; color: #1B2A3E; padding: 14px 16px; background: #fff; border-radius: 8px; border: 1px solid #e6e9ee; }
        .sl-deliv li svg { flex-shrink: 0; margin-top: 3px; }

        /* Exemple */
        .sl-example-intro { font-size: 15px; color: #2E4A6B; line-height: 1.7; margin: 0 0 24px; max-width: 860px; }

        /* Prix */
        .sl-price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 26px; }
        .sl-price-grid.one { grid-template-columns: minmax(0, 620px); }
        .sl-price { background: #1B2A3E; color: #F4F5F7; border-radius: 14px; padding: 30px 30px 26px; position: relative; overflow: hidden; }
        .sl-price::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #C9A84C, #e8c96a); }
        .sl-price-label { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #8A9BB0; margin-bottom: 10px; }
        .sl-price-val { font-size: 28px; font-weight: 800; color: #C9A84C; line-height: 1.15; margin-bottom: 10px; }
        .sl-price-note { font-size: 14px; color: rgba(244,245,247,0.78); line-height: 1.6; }
        .sl-notes { list-style: none; margin: 0; padding: 0; }
        .sl-notes li { font-size: 13.5px; color: #2E4A6B; line-height: 1.65; padding: 8px 0 8px 18px; position: relative; border-bottom: 1px solid #e6e9ee; }
        .sl-notes li::before { content: ''; position: absolute; left: 0; top: 16px; width: 6px; height: 6px; border-radius: 50%; background: #C9A84C; }
        .sl-notes li:last-child { border-bottom: none; }

        /* Engagements */
        .sl-commit { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; }
        .sl-commit li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.6; color: #F4F5F7; }
        .sl-commit li svg { flex-shrink: 0; margin-top: 3px; }

        /* Bandeau CTA */
        .sl-cta { background: #C9A84C; padding: 44px 40px; text-align: center; }
        .sl-cta h2 { color: #1B2A3E; font-size: 24px; font-weight: 800; margin: 0 0 8px; }
        .sl-cta p { color: #1B2A3E; font-size: 15px; margin: 0 0 22px; opacity: 0.85; }
        .sl-cta .btn-dark { background: #1B2A3E; color: #F4F5F7; padding: 15px 32px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px; display: inline-block; transition: background 0.2s; }
        .sl-cta .btn-dark:hover { background: #2E4A6B; }

        /* En construction */
        .sl-building { max-width: 860px; margin: 0 auto; }
        .sl-building-box { background: #fff; border-left: 4px solid #C9A84C; border-radius: 10px; padding: 30px 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .sl-building-box h2 { font-size: 22px; color: #1B2A3E; margin: 0 0 12px; }
        .sl-building-box p { font-size: 15.5px; color: #2E4A6B; line-height: 1.75; margin: 0 0 12px; }
        .sl-building-box p:last-child { margin-bottom: 0; }
        .sl-sublist { list-style: none; margin: 22px 0 0; padding: 0; display: grid; gap: 12px; }
        .sl-sublist a, .sl-sublist span { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600; }
        .sl-sublist a { background: #1B2A3E; color: #F4F5F7; transition: background 0.2s; }
        .sl-sublist a:hover { background: #2E4A6B; }
        .sl-sublist span { background: #F4F5F7; color: #8A9BB0; border: 1px dashed #d5dae2; }
        .sl-badge { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 10px; border-radius: 12px; background: rgba(201,168,76,0.2); color: #C9A84C; font-weight: 700; white-space: nowrap; }
        .sl-sublist span .sl-badge { background: #e6e9ee; color: #8A9BB0; }

        /* Qui suis-je */
        .sl-who { display: grid; grid-template-columns: 140px 1fr; gap: 28px; align-items: center; background: #fff; border-radius: 12px; padding: 28px; border: 1px solid #e6e9ee; }
        .sl-who img { width: 140px; height: 170px; object-fit: cover; border-radius: 8px; border: 2px solid rgba(201,168,76,0.4); }
        .sl-who h3 { margin: 0 0 6px; font-size: 19px; color: #1B2A3E; }
        .sl-who .role { color: #C9A84C; font-size: 13px; letter-spacing: 0.5px; margin-bottom: 12px; }
        .sl-who p { margin: 0; font-size: 15px; line-height: 1.7; color: #2E4A6B; }

        @media (max-width: 900px) {
          .sl-stats, .sl-stats.four, .sl-pains, .sl-steps { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .sl-hero { padding: 130px 20px 56px; }
          .sl-h1 { font-size: 30px; }
          .sl-sub { font-size: 15.5px; }
          .sl-hero-btns { flex-direction: column; align-items: center; }
          .sl-hero-btns a { width: 100%; max-width: 320px; text-align: center; }
          .sl-section { padding: 56px 20px; }
          .sl-title { font-size: 25px; }
          .sl-stats, .sl-stats.four, .sl-pains, .sl-steps, .sl-deliv, .sl-price-grid, .sl-commit { grid-template-columns: 1fr; }
          .sl-cta { padding: 36px 20px; }
          .sl-who { grid-template-columns: 1fr; text-align: center; justify-items: center; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <header className="sl-hero">
        <div className="sl-hero-inner">
          <div className="sl-crumb">
            <Link href="/">Accueil</Link> · Sur mesure{page.parent ? ` · ${page.parent}` : ""} · {page.label}
          </div>
          {o ? (
            <>
              <span className="sl-brand">{o.brand}</span>
              <h1 className="sl-h1">{o.headline}</h1>
              {o.brandLine && <p className="sl-brandline">{o.brandLine}</p>}
              <p className="sl-sub">{o.sub}</p>
              <div className="sl-hero-btns">
                <a href="#contact" className="btn-primary">{o.cta}</a>
                <a href="#offre" className="btn-secondary">Découvrir l'offre</a>
              </div>
              <p className="sl-hero-note">20 minutes au téléphone · Sans engagement · Vos chiffres restent confidentiels</p>
            </>
          ) : (
            <>
              <span className="sl-brand">Sur mesure</span>
              <h1 className="sl-h1">{page.label}</h1>
              {page.audience && <p className="sl-brandline">{page.audience}</p>}
              <p className="sl-sub">
                Un accompagnement construit sur les enjeux réels de votre métier : la rigueur des grands cabinets,
                au service des PME/TPE, avec des résultats mesurables.
              </p>
              <div className="sl-hero-btns">
                <a href="#contact" className="btn-primary">Demander mon pré-diagnostic offert</a>
              </div>
              <p className="sl-hero-note">20 minutes au téléphone · Sans engagement · Vos chiffres restent confidentiels</p>
            </>
          )}
        </div>
      </header>

      {o ? (
        <>
          {/* ── CE QUI A CHANGÉ ── */}
          {o.stats && (
            <section className="sl-section sl-light" id="contexte">
              <div className="sl-inner">
                <div className="sl-tag">Le contexte</div>
                <h2 className="sl-title">{o.changedTitle ?? "Ce qui a changé"}</h2>
                <div className={`sl-stats ${o.stats.length === 4 ? "four" : ""}`}>
                  {o.stats.map((s) => (
                    <div className="sl-stat" key={s.label}>
                      <span className="sl-stat-val">{s.value}</span>
                      <span className="sl-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── LE PROBLÈME ── */}
          <section className="sl-section sl-white" id="probleme">
            <div className="sl-inner">
              <div className="sl-tag">Le constat</div>
              <h2 className="sl-title">Ce que vous vivez au quotidien</h2>
              <div className="sl-pains">
                {o.pains.map((p) => (
                  <div className="sl-pain" key={p.title}>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── COMMENT ÇA SE PASSE ── */}
          <section className="sl-section sl-dark" id="methode">
            <div className="sl-inner">
              <div className="sl-tag">Comment ça se passe</div>
              <h2 className="sl-title">Simple, cadré, sans vous mobiliser</h2>
              <div className="sl-steps">
                {o.steps.map((s) => (
                  <div className="sl-step" key={s.title}>
                    <div className="sl-step-when">{s.when}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CE QUE VOUS RECEVEZ ── */}
          <section className="sl-section sl-light" id="offre">
            <div className="sl-inner">
              <div className="sl-tag">L'offre</div>
              <h2 className="sl-title">Ce que vous recevez</h2>
              <ul className="sl-deliv">
                {o.deliverables.map((d) => (
                  <li key={d}><IconCheck />{d}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── EXEMPLE ── */}
          {o.example && (
            <section className="sl-section sl-dark" id="exemple">
              <div className="sl-inner">
                <div className="sl-tag">Exemple de résultat</div>
                <h2 className="sl-title">Des chiffres, pas des slogans</h2>
                <p className="sl-example-intro" style={{ color: "rgba(244,245,247,0.8)" }}>{o.example.intro}</p>
                <div className={`sl-stats ${o.example.stats.length === 4 ? "four" : ""}`}>
                  {o.example.stats.map((s) => (
                    <div className="sl-stat" key={s.label}>
                      <span className="sl-stat-val">{s.value}</span>
                      <span className="sl-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── PRIX ── */}
          <section className="sl-section sl-white" id="prix">
            <div className="sl-inner">
              <div className="sl-tag">Le prix</div>
              <h2 className="sl-title">Deux lignes, pas de surprise</h2>
              <div className={`sl-price-grid ${o.pricing.length === 1 ? "one" : ""}`}>
                {o.pricing.map((p) => (
                  <div className="sl-price" key={p.label}>
                    <div className="sl-price-label">{p.label}</div>
                    <div className="sl-price-val">{p.value}</div>
                    {p.note && <div className="sl-price-note">{p.note}</div>}
                  </div>
                ))}
              </div>
              {o.pricingNotes && (
                <ul className="sl-notes">
                  {o.pricingNotes.map((n) => <li key={n}>{n}</li>)}
                </ul>
              )}
            </div>
          </section>

          {/* ── ENGAGEMENTS ── */}
          {o.commitments && (
            <section className="sl-section sl-dark" id="engagements">
              <div className="sl-inner">
                <div className="sl-tag">Nos engagements, en clair</div>
                <h2 className="sl-title">Ce que vous pouvez attendre de nous</h2>
                <ul className="sl-commit">
                  {o.commitments.map((c) => (
                    <li key={c}><IconCheck />{c}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ── QUI SUIS-JE ── */}
          <section className="sl-section sl-light" id="qui">
            <div className="sl-inner">
              <div className="sl-tag">Qui réalise la mission</div>
              <h2 className="sl-title">Un consultant qui a dirigé une entreprise</h2>
              <div className="sl-who">
                <img src="/ulrich-gbada-consultant-sena-consulting.jpg" alt="Ulrich GBADA" />
                <div>
                  <h3>Ulrich GBADA</h3>
                  <div className="role">Fondateur — SENA CONSULTING</div>
                  <p>
                    Ingénieur EPITA, 10 ans en cabinet de conseil (Wavestone, ANEO, Sopra Steria), missions pour Orange,
                    Aéroports de Paris, les Services du Premier ministre et le ministère de l'Intérieur. Chef d'entreprise
                    lui-même : il parle chiffres, pas jargon. J'applique la méthode des grands cabinets aux TPE et PME, à des
                    tarifs accessibles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── BANDEAU CTA ── */}
          <div className="sl-cta">
            <h2>Premier diagnostic offert — Sans engagement</h2>
            <p>20 minutes au téléphone. On regarde vos chiffres, on vous dit si l'enjeu justifie d'aller plus loin.</p>
            <a href="#contact" className="btn-dark">{o.cta}</a>
          </div>
        </>
      ) : (
        /* ── SANS OFFRE : EN CONSTRUCTION ── */
        <section className="sl-section sl-light">
          <div className="sl-building">
            <div className="sl-building-box">
              <h2>Cette offre est en cours de construction</h2>
              <p>
                Nous préparons pour le secteur <strong>{page.label}</strong> une offre sur le même modèle que nos
                autres accompagnements : une douleur précise de votre métier, un livrable concret, un prix annoncé
                d'avance et un pré-diagnostic offert pour vérifier ensemble que l'enjeu en vaut la peine.
              </p>
              <p>
                En attendant, le pré-diagnostic est déjà ouvert : 20 minutes au téléphone pour comprendre votre situation,
                identifier les leviers prioritaires et vous dire, chiffres à l'appui, ce qui mérite d'être travaillé.
              </p>
              {page.subpages && (
                <ul className="sl-sublist">
                  {page.subpages.map((s) =>
                    s.status === "ready" ? (
                      <li key={s.slug}><Link href={`/sur-mesure/${s.slug}`}>{s.label} <span className="sl-badge">Voir l'offre</span></Link></li>
                    ) : (
                      <li key={s.slug}><span>{s.label} <span className="sl-badge">En construction</span></span></li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <ContactForm
        tag="Passons à l'action"
        title={o?.formTitle ?? "Demandez votre pré-diagnostic offert"}
        defaultSecteur={page.formSecteur}
      />

      <Footer />
    </>
  );
}
