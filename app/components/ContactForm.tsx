"use client";

import { useState, useEffect } from "react";
import ChampAdresse, { type Adresse } from "./ChampAdresse";
import EtapeActivite from "./EtapeActivite";
import { FORM_SECTEURS } from "../data/segments";
import { type Reponses, type PieceJointe, SOURCE_REGEX, nettoyer, lienCalendly } from "../lib/branche";
import { BRANCHES, branchePour, branchePourOffre } from "../lib/branches";

type EtapeId = "identite" | "secteur" | "activite" | "attentes" | "rdv";
const LIBELLES_ETAPES: Record<EtapeId, string> = {
  identite: "Identité", secteur: "Secteur", activite: "Activité", attentes: "Attentes", rdv: "RDV",
};

// ─── Formulaire de demande d'audit (4 étapes) ───────────────────────────────
// Utilisé sur la page d'accueil et sur chaque page « Sur mesure » (secteur préréglé).

export default function ContactForm({
  tag = "Passons à l'action",
  title = "Demandez votre audit gratuit",
  defaultSecteur,
}: {
  tag?: string;
  title?: string;
  defaultSecteur?: string;
}) {
  // ─── Formulaire multi-étapes ─────────────────────────────────────────────
  const [etape, setEtape] = useState<EtapeId>("identite");
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", taille: "", ca: "",
    secteur: defaultSecteur ?? "", secteurAutre: "",
    attentes: [] as string[], attenteAutre: "",
  });
  const [adresse, setAdresse] = useState<Adresse>({ label: "", nom: "", codePostal: "", ville: "", lat: "", lon: "" });
  const [formStatus, setFormStatus] = useState("idle");

  // ─── Branches « Activité » (SPECS v1.0 §3, §5, §7, généralisées) ─────────
  // Les réponses sont gardées par branche : changer de secteur puis revenir ne les perd pas.
  const [reponses, setReponses] = useState<Record<string, Reponses>>({});
  const [pieceJointe, setPieceJointe] = useState<PieceJointe | null>(null);
  const [source, setSource] = useState("");
  const branche = branchePour(formData.secteur);
  const activite: Reponses = branche ? (reponses[branche.id] ?? nettoyer(branche, {})) : {};
  const setActivite = (r: Reponses) => { if (branche) setReponses((all) => ({ ...all, [branche.id]: r })); };
  const ETAPES: EtapeId[] = branche
    ? ["identite", "secteur", "activite", "attentes", "rdv"]
    : ["identite", "secteur", "attentes", "rdv"];
  const idx = ETAPES.indexOf(etape);
  const suivante = () => setEtape(ETAPES[idx + 1]);
  const precedente = () => setEtape(ETAPES[idx - 1]);

  // Paramètres d'URL, lus une seule fois au montage. defaultSecteur (landing) l'emporte sur ?offre.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const offre = branchePourOffre(q.get("offre"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (offre && !defaultSecteur) setFormData((f) => ({ ...f, secteur: offre.secteur }));
    const src = q.get("src") ?? "";
    if (SOURCE_REGEX.test(src)) setSource(src);
  }, [defaultSecteur]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (val: string) => {
    const current = formData.attentes;
    setFormData({
      ...formData,
      attentes: current.includes(val) ? current.filter((v) => v !== val) : [...current, val],
    });
  };

  const handleStep3Submit = async () => {
    setFormStatus("sending");
    try {
      const attentesEnvoyees = formData.attentes
        .filter((a) => !BRANCHES.some((b) => b !== branche && b.attentes.includes(a)))
        .filter((a) => a !== "Autre")
        .concat(formData.attentes.includes("Autre") && formData.attenteAutre ? [`Autre : ${formData.attenteAutre}`] : []);
      const body = {
        ...formData,
        address: adresse.nom, codePostal: adresse.codePostal, ville: adresse.ville,
        latitude: adresse.lat, longitude: adresse.lon,
        attentes: attentesEnvoyees,
        secteur: formData.secteur === "Autre" ? `Autre : ${formData.secteurAutre}` : formData.secteur,
        source,                                                         // "" si absent
        activite: branche ? nettoyer(branche, activite) : null,
        pieceJointe: branche && branche.fichier && branche.fichier.visible(activite) ? pieceJointe : null,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) { setFormStatus("success"); setEtape("rdv"); }
      else { setFormStatus("error"); }
    } catch { setFormStatus("error"); }
  };

  const secteurs = FORM_SECTEURS;
  const attentesBase = [
    "Augmenter mon chiffre d'affaires",
    "Améliorer ma rentabilité / Vendre au meilleur prix",
    "Recruter les meilleurs talents",
    "Gagner du temps au quotidien sur les tâches chronophages (Administratif, Devis, Factures, Comptabilité, Prospection…)",
    "Rester conforme vis-à-vis des contraintes légales",
    "Faire face à la concurrence des prix",
    "Autre",
  ];
  const attentesList = branche ? [...branche.attentes, ...attentesBase] : attentesBase;
  const urlCalendly = lienCalendly({ name: formData.name, email: formData.email, company: formData.company, source, offre: branche?.offre });
  const prenom = formData.name ? formData.name.split(" ")[0] : "";

  return (
    <>
      <style>{`
        /* ── CONTACT ── */
        .contact { background: #F4F5F7; padding: 80px 40px; }
        .contact-inner { max-width: 1100px; margin: 0 auto; }
        .contact-tag { font-size: 18px; letter-spacing: 3px; font-weight: 700; text-transform: uppercase; color: #C9A84C; margin-bottom: 14px; }
        .contact-title { font-size: 32px; font-weight: 700; color: #1B2A3E; margin: 0 0 48px; }
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
        .step-circle { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; border: 2px solid #e0e4ea; background: #fff; color: #8A9BB0; transition: all 0.3s; position: relative; z-index: 1; }
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
        .form-group input, .form-group select { width: 100%; padding: 11px 14px; border: 1px solid #e0e4ea; border-radius: 6px; font-size: 14px; color: #1B2A3E; background: #fff; outline: none; transition: border-color 0.2s; font-family: inherit; appearance: none; }
        .form-group input:focus, .form-group select:focus { border-color: #C9A84C; }

        .secteur-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .secteur-card { border: 2px solid #e0e4ea; border-radius: 8px; padding: 14px 16px; cursor: pointer; font-size: 14px; color: #2E4A6B; font-weight: 500; transition: all 0.2s; background: #F4F5F7; display: flex; align-items: center; gap: 10px; }
        .secteur-card:hover { border-color: #C9A84C; background: #fff; }
        .secteur-card.selected { border-color: #C9A84C; background: rgba(201,168,76,0.08); color: #1B2A3E; }
        .secteur-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #8A9BB0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .secteur-dot.sel { border-color: #C9A84C; background: #C9A84C; }
        .secteur-dot.sel::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1B2A3E; }

        .attente-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; border: 2px solid #e0e4ea; border-radius: 8px; margin-bottom: 10px; cursor: pointer; background: #fff; transition: all 0.2s; }
        .attente-item:hover { border-color: #C9A84C; }
        .attente-item.checked { border-color: #C9A84C; background: rgba(201,168,76,0.08); }
        .attente-check { width: 20px; height: 20px; border-radius: 4px; border: 2px solid #8A9BB0; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .attente-check.checked { border-color: #C9A84C; background: #C9A84C; }
        .attente-check.checked::after { content: '✓'; color: #1B2A3E; font-size: 13px; font-weight: 700; }
        .attente-label { font-size: 14px; color: #2E4A6B; line-height: 1.4; }
        .attente-item.checked .attente-label { color: #1B2A3E; font-weight: 500; }

        .form-nav { display: flex; gap: 12px; margin-top: 24px; }
        .btn-next { flex: 1; background: #C9A84C; color: #1B2A3E; padding: 13px; border: none; border-radius: 6px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.2s; font-family: inherit; }
        .btn-next:hover:not(:disabled) { background: #b8913d; }
        .btn-next:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-back { background: transparent; color: #8A9BB0; padding: 13px 20px; border: 1px solid #e0e4ea; border-radius: 6px; font-size: 14px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-back:hover { border-color: #1B2A3E; color: #1B2A3E; }

        .step4-wrap { text-align: center; padding: 16px 0; }
        .step4-wrap h3 { color: #1B2A3E; font-size: 22px; font-weight: 700; margin: 0 0 8px; }
        .step4-wrap p { color: #8A9BB0; font-size: 15px; margin: 0 0 28px; line-height: 1.6; }
        .btn-calendly { display: inline-block; background: #C9A84C; color: #1B2A3E; padding: 16px 36px; border-radius: 8px; font-size: 16px; font-weight: 700; text-decoration: none; transition: background 0.2s; }
        .btn-calendly:hover { background: #b8913d; }
        .form-success-msg { font-size: 13px; color: #2e7d32; margin-top: 16px; }
        .form-error { background: #fdecea; color: #c62828; padding: 14px; border-radius: 6px; font-size: 14px; margin-top: 12px; text-align: center; }

        @media (max-width: 768px) {
          .contact { padding: 60px 20px; }
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .form-row { grid-template-columns: 1fr; }
          .secteur-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) { .step-circle { width: 30px; height: 30px; font-size: 12px; } .step-label { font-size: 10px; } }
      `}</style>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-tag">{tag}</div>
          <h2 className="contact-title">{title}</h2>
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
                  <a href="https://www.linkedin.com/in/ulrich-gbada-3742a269/" target="_blank" rel="noopener noreferrer" className="contact-item-val">Ulrich GBADA</a>
                </div>
              </div>
            </div>

            <div>
              {/* Stepper */}
              <div className="stepper">
                {ETAPES.map((id, i) => {
                  const n = i + 1;
                  const isActive = etape === id;
                  const isDone = i < idx;
                  return (
                    <div key={id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="step-item">
                        <div className={`step-circle ${isActive ? "active" : isDone ? "done" : ""}`}>{isDone ? "✓" : n}</div>
                        <div className={`step-label ${isActive ? "active" : ""}`}>{LIBELLES_ETAPES[id]}</div>
                      </div>
                      {i < ETAPES.length - 1 && <div className={`step-connector ${isDone ? "done" : ""}`} />}
                    </div>
                  );
                })}
              </div>

              {/* ÉTAPE 1 */}
              {etape === "identite" && (
                <div>
                  <div className="form-row">
                    <div className="form-group"><label htmlFor="name">Nom complet *</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" /></div>
                    <div className="form-group"><label htmlFor="email">Email professionnel *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="jean@entreprise.fr" /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label htmlFor="company">Nom de la société</label><input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Nom de votre société" /></div>
                    <div className="form-group"><label htmlFor="phone">Téléphone</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 00 00 00 00" /></div>
                  </div>
                  <div className="form-group"><label htmlFor="address">Adresse d'exercice</label><ChampAdresse valeur={adresse} onChange={setAdresse} /></div>
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
                      <select id="ca" name="ca" value={formData.ca} onChange={handleChange}>
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
                    <button className="btn-next" onClick={suivante} disabled={!formData.name || !formData.email || !formData.ca}>Étape suivante →</button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 */}
              {etape === "secteur" && (
                <div>
                  <p style={{ color: "#2E4A6B", fontSize: 14, marginBottom: 20 }}>Quel est votre secteur d'activité ?</p>
                  <div className="secteur-grid">
                    {secteurs.map((s) => (
                      <div key={s} className={`secteur-card ${formData.secteur === s ? "selected" : ""}`} onClick={() => setFormData({ ...formData, secteur: s })}>
                        <div className={`secteur-dot ${formData.secteur === s ? "sel" : ""}`} />{s}
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
                    <button className="btn-back" onClick={precedente}>← Retour</button>
                    <button className="btn-next" onClick={suivante} disabled={!formData.secteur || (formData.secteur === "Autre" && !formData.secteurAutre)}>Étape suivante →</button>
                  </div>
                </div>
              )}

              {/* ÉTAPE ACTIVITÉ (secteurs avec offre validée uniquement) */}
              {etape === "activite" && branche && (
                <EtapeActivite
                  branche={branche}
                  valeur={activite}
                  onChange={setActivite}
                  pieceJointe={pieceJointe}
                  onPieceJointe={setPieceJointe}
                  onRetour={precedente}
                  onSuivant={suivante}
                />
              )}

              {/* ÉTAPE ATTENTES */}
              {etape === "attentes" && (
                <div>
                  <p style={{ color: "#2E4A6B", fontSize: 14, marginBottom: 20 }}>Quels sont vos objectifs ? <span style={{ color: "#8A9BB0" }}>(plusieurs choix possibles)</span></p>
                  {attentesList.map((a) => (
                    <div key={a} className={`attente-item ${formData.attentes.includes(a) ? "checked" : ""}`} onClick={() => handleCheckbox(a)}>
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
                  {formStatus === "error" && <div className="form-error">Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</div>}
                  <div className="form-nav">
                    <button className="btn-back" onClick={precedente}>← Retour</button>
                    <button className="btn-next" onClick={handleStep3Submit} disabled={formData.attentes.length === 0 || formStatus === "sending"}>{formStatus === "sending" ? "Envoi…" : "Confirmer →"}</button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 4 */}
              {etape === "rdv" && (
                <div className="step4-wrap">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3>Votre demande est enregistrée !</h3>
                  {branche ? (
                    <>
                      <p>{branche.rdv.texte.replace("{prenom}", prenom)}</p>
                      <a href={urlCalendly} target="_blank" rel="noopener noreferrer" className="btn-calendly">{branche.rdv.bouton}</a>
                    </>
                  ) : (
                    <>
                      <p>Merci {prenom} — nous avons bien reçu votre demande d'audit.<br />Réservez maintenant votre créneau pour un rendez-vous avec Ulrich.</p>
                      <a href={urlCalendly} target="_blank" rel="noopener noreferrer" className="btn-calendly">📅 Réserver mon audit gratuit</a>
                    </>
                  )}
                  <p className="form-success-msg">Un email de confirmation vous a également été envoyé.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
