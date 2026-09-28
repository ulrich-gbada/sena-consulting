"use client";

import { useState } from "react";

// ─── Newsletter (Réalisations) ──────────────────────────────────────────────
// Deux champs : Prénom – Nom, E-mail. Inscription via /api/newsletter.

export default function Newsletter() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"repos" | "envoi" | "ok" | "erreur">("repos");

  const valide = nom.trim().length >= 2 && /^\S+@\S+\.\S+$/.test(email);

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valide || etat === "envoi") return;
    setEtat("envoi");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nom.trim(), email: email.trim().toLowerCase() }),
      });
      const j = await r.json();
      setEtat(j.success ? "ok" : "erreur");
    } catch { setEtat("erreur"); }
  };

  return (
    <section className="nl" id="newsletter">
      <style>{`
        .nl { background: #1B2A3E; padding: 70px 40px; }
        .nl-inner { max-width: 760px; margin: 0 auto; text-align: center; }
        .nl-tag { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #C9A84C; font-weight: 700; margin-bottom: 12px; }
        .nl h2 { color: #F4F5F7; font-size: 26px; font-weight: 800; margin: 0 0 10px; line-height: 1.25; }
        .nl p { color: rgba(244,245,247,0.7); font-size: 15px; margin: 0 0 26px; line-height: 1.6; }
        .nl-form { display: grid; grid-template-columns: 1fr 1.3fr auto; gap: 10px; }
        .nl-form input { padding: 13px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); color: #F4F5F7; font-size: 14px; font-family: inherit; outline: none; }
        .nl-form input::placeholder { color: rgba(244,245,247,0.45); }
        .nl-form input:focus { border-color: #C9A84C; }
        .nl-form button { background: #C9A84C; color: #1B2A3E; border: none; border-radius: 6px; padding: 13px 22px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit; white-space: nowrap; transition: background 0.2s; }
        .nl-form button:hover:not(:disabled) { background: #b8913d; }
        .nl-form button:disabled { opacity: 0.55; cursor: not-allowed; }
        .nl-small { font-size: 12px; color: rgba(244,245,247,0.4); margin-top: 14px; }
        .nl-ok { background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.4); border-radius: 10px; padding: 22px; color: #F4F5F7; font-size: 15px; line-height: 1.6; }
        .nl-ok strong { color: #C9A84C; }
        .nl-err { color: #ffb4a8; font-size: 13px; margin-top: 12px; }
        @media (max-width: 768px) { .nl { padding: 52px 20px; } .nl-form { grid-template-columns: 1fr; } .nl h2 { font-size: 22px; } }
      `}</style>
      <div className="nl-inner">
        <div className="nl-tag">Newsletter</div>
        <h2>Abonnez-vous à notre newsletter pour ne rien rater de nos analyses</h2>
        <p>Un e-mail à chaque nouveau cas concret publié. Gratuit, sans engagement, désinscription en un clic.</p>
        {etat === "ok" ? (
          <div className="nl-ok" role="status">
            <strong>Inscription enregistrée.</strong> Vous recevrez nos prochaines analyses à l'adresse {email}.
            Un e-mail de bienvenue vient de vous être envoyé.
          </div>
        ) : (
          <form className="nl-form" onSubmit={envoyer}>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Prénom – Nom" autoComplete="name" aria-label="Prénom et nom" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.fr" autoComplete="email" aria-label="E-mail" />
            <button type="submit" disabled={!valide || etat === "envoi"}>{etat === "envoi" ? "Envoi…" : "Je m'abonne"}</button>
          </form>
        )}
        {etat === "erreur" && <div className="nl-err">Une erreur est survenue. Réessayez ou écrivez-nous à contact@sena-consulting.fr.</div>}
        {etat !== "ok" && <div className="nl-small">En vous abonnant, vous acceptez de recevoir nos publications par e-mail. Vos données ne sont jamais transmises à des tiers.</div>}
      </div>
    </section>
  );
}
