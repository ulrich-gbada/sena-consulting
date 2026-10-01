import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { piecesMission } from "../data/pieces";

// ─── /merci — page de retour après paiement Stripe ───────────────────────────
// Stripe redirige ici (after_completion) avec ?offre=<nom interne>&palier=<…>.
// La page confirme la commande et liste les pièces qui font courir le délai
// (app/data/pieces.ts — même source que le mail « Commande reçue »).

export const metadata: Metadata = {
  title: "Commande reçue — SENA CONSULTING",
  robots: { index: false, follow: false },
};

export default async function MerciPage({ searchParams }: { searchParams: Promise<{ offre?: string; palier?: string }> }) {
  const { offre = "" } = await searchParams;
  const info = piecesMission(offre);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1B2A3E; }
        .mc-hero { background: linear-gradient(135deg, #1B2A3E 0%, #2E4A6B 100%); padding: 150px 40px 56px; text-align: center; }
        .mc-tag { display: inline-block; background: rgba(201,168,76,0.16); color: #C9A84C; border: 1px solid rgba(201,168,76,0.4); padding: 8px 22px; border-radius: 24px; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 22px; }
        .mc-hero h1 { font-size: 36px; font-weight: 800; color: #F4F5F7; margin: 0 0 14px; line-height: 1.2; }
        .mc-hero p { color: rgba(244,245,247,0.82); font-size: 17px; line-height: 1.7; max-width: 680px; margin: 0 auto; }
        .mc-body { background: #F4F5F7; padding: 56px 40px 72px; }
        .mc-card { max-width: 760px; margin: 0 auto; background: #fff; border-radius: 14px; border: 1px solid #e6e9ee; padding: 34px 38px; }
        .mc-card h2 { font-size: 22px; margin: 0 0 8px; }
        .mc-card p { font-size: 15.5px; line-height: 1.7; color: #2E4A6B; margin: 0 0 16px; }
        .mc-list { list-style: none; margin: 0 0 20px; padding: 0; }
        .mc-list li { padding: 12px 0 12px 34px; border-bottom: 1px solid #eef0f3; position: relative; font-size: 15.5px; line-height: 1.6; }
        .mc-list li::before { content: ''; position: absolute; left: 4px; top: 17px; width: 16px; height: 16px; border-radius: 50%; background: #C9A84C; }
        .mc-list li::after { content: ''; position: absolute; left: 9px; top: 20px; width: 5px; height: 8px; border: solid #1B2A3E; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .mc-mail { background: #F4F5F7; border-left: 4px solid #C9A84C; border-radius: 8px; padding: 16px 20px; margin: 0 0 20px; font-size: 15px; }
        .mc-mail a { color: #1B2A3E; font-weight: 700; }
        .mc-btns { display: flex; flex-wrap: wrap; gap: 12px; }
        .mc-btn { display: inline-block; padding: 13px 24px; border-radius: 6px; font-weight: 700; font-size: 14.5px; text-decoration: none; }
        .mc-btn.or { background: #C9A84C; color: #1B2A3E; } .mc-btn.ghost { color: #1B2A3E; border: 1px solid #1B2A3E; }
        @media (max-width: 768px) { .mc-hero { padding: 130px 20px 44px; } .mc-hero h1 { font-size: 28px; } .mc-body { padding: 40px 20px 56px; } .mc-card { padding: 26px 20px; } .mc-btn { width: 100%; text-align: center; } }
      `}</style>

      <Navbar />

      <header className="mc-hero">
        <span className="mc-tag">Commande reçue</span>
        <h1>Merci. {info ? `Votre commande « ${info.nom} » est enregistrée.` : "Votre commande est enregistrée."}</h1>
        <p>
          Stripe vous envoie le reçu et la facture par e-mail dans les minutes qui viennent. {info ? `Délai de livraison : ${info.delai}.` : "Le délai de livraison annoncé court à partir de la réception des pièces ci-dessous."}
        </p>
      </header>

      <section className="mc-body">
        <div className="mc-card">
          <h2>Les pièces à nous envoyer</h2>
          {info ? (
            <>
              <p>Rien à mettre en forme : des exports ou des photos lisibles suffisent. Si une pièce vous manque, envoyez le reste, on s&apos;en occupe.</p>
              <ul className="mc-list">
                {info.pieces.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </>
          ) : (
            <p>Vous recevrez par e-mail, sous 24 heures ouvrées, la liste des pièces nécessaires à votre mission.</p>
          )}
          <div className="mc-mail">
            Par e-mail à <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a>, en rappelant le nom de votre société.
            Une question : 07 68 93 48 37.
          </div>
          <p>
            Conformément à nos <Link href="/cgv">CGV</Link>, vous disposez d&apos;un droit de rétractation de 14 jours tant que la mission n&apos;a pas commencé ;
            le formulaire est joint au bon de commande que vous recevez par e-mail.
          </p>
          <div className="mc-btns">
            <Link href="/realisations" className="mc-btn or">Lire un cas concret en attendant</Link>
            <Link href="/" className="mc-btn ghost">Retour à l&apos;accueil</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
