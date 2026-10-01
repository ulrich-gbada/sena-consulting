"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { lienPaiement } from "../data/stripe";

// ─── Bloc « Commander directement » (landing, sous le prix) ──────────────────
// Secondaire par rapport au pré-diagnostic : il s'adresse à qui a déjà décidé.
// Un bouton par offre commandable ; rien n'est rendu si aucun lien n'est actif.

export type Commande = { offre: string; libelle: string; prix: string; precision?: string };

export default function BoutonCommande({ items }: { items: Commande[] }) {
  const actifs = items.map((c) => ({ ...c, lien: lienPaiement(c.offre) })).filter((c) => c.lien);
  if (actifs.length === 0) return null;
  const test = actifs.some((c) => c.lien!.test);

  return (
    <div className="sl-order">
      <style>{`
        .sl-order { margin-top: 30px; background: #F4F5F7; border: 1px solid #e3e7ec; border-radius: 14px; padding: 26px 28px; }
        .sl-order h3 { margin: 0 0 6px; font-size: 19px; color: #1B2A3E; }
        .sl-order > p { margin: 0 0 18px; font-size: 14.5px; color: #2E4A6B; line-height: 1.65; }
        .sl-order-list { display: flex; flex-wrap: wrap; gap: 12px; }
        .sl-order-btn { display: inline-flex; flex-direction: column; gap: 2px; background: #1B2A3E; color: #F4F5F7; text-decoration: none; border-radius: 8px; padding: 13px 22px; min-width: 240px; transition: background 0.2s, transform 0.2s; }
        .sl-order-btn:hover { background: #2E4A6B; transform: translateY(-2px); }
        .sl-order-btn b { font-size: 15px; } .sl-order-btn span { font-size: 13px; color: #C9A84C; font-weight: 700; } .sl-order-btn small { font-size: 12px; color: #8A9BB0; }
        .sl-order-foot { margin: 16px 0 0; font-size: 12.5px; color: #5c6b7f; line-height: 1.6; }
        .sl-order-foot a { color: #1B2A3E; }
        .sl-order-test { display: inline-block; background: #fbf6e8; border: 1px solid #e8d9a8; color: #7a5c0a; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px; margin-bottom: 12px; }
        @media (max-width: 768px) { .sl-order { padding: 22px 18px; } .sl-order-btn { width: 100%; } }
      `}</style>
      {test && <span className="sl-order-test">Mode test — aucun débit réel</span>}
      <h3>Déjà décidé ? Commandez directement.</h3>
      <p>Paiement sécurisé par Stripe, carte ou prélèvement SEPA, facture envoyée aussitôt. Vous recevez ensuite la liste des pièces à nous transmettre, et le délai court dès leur réception.</p>
      <div className="sl-order-list">
        {actifs.map((c) => (
          <Link
            key={c.offre}
            href={c.lien!.url}
            className="sl-order-btn"
            target="_blank"
            rel="noopener"
            onClick={() => { try { track("paiement_clic", { offre: c.offre, palier: c.lien!.palier }); } catch { /* analytics indisponible */ } }}
          >
            <b>{c.libelle}</b>
            <span>{c.prix}</span>
            {c.precision && <small>{c.precision}</small>}
          </Link>
        ))}
      </div>
      <p className="sl-order-foot">
        En commandant, vous acceptez nos <Link href="/cgv">conditions générales de vente</Link>. Prix nets, TVA non applicable (art. 293 B du CGI).
        Pas sûr que ce soit pour vous ? Le pré-diagnostic de 20 minutes reste offert, ci-dessous.
      </p>
    </div>
  );
}
