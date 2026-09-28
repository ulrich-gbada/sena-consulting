import { Resend } from 'resend';
import { REALISATIONS, formatDate } from '../../../data/realisations';
import { gabaritEmail } from '../../../lib/email';

// ─── Annonce d'une nouvelle publication à tous les abonnés ──────────────────
// Appel (une fois par article publié) :
//   POST /api/newsletter/annonce
//   { "secret": "<NEWSLETTER_SECRET>", "slug": "<slug de l'article>", "test": "adresse@test.fr" (optionnel) }
// Avec "test", l'e-mail n'est envoyé qu'à cette adresse (aperçu). Sans "test",
// un Broadcast Resend est créé et envoyé à toute l'Audience, avec lien de
// désinscription géré par Resend.

const SITE = 'https://www.sena-consulting.fr';
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { secret, slug, test } = await request.json();
    if (!process.env.NEWSLETTER_SECRET || secret !== process.env.NEWSLETTER_SECRET) {
      return Response.json({ error: 'Non autorisé.' }, { status: 401 });
    }
    const a = REALISATIONS.find((r) => r.slug === slug);
    if (!a) return Response.json({ error: 'Article introuvable.' }, { status: 404 });

    const url = `${SITE}/realisations/${a.slug}`;
    const chiffres = a.chiffres.map((c) => `
      <td style="padding: 12px 10px; text-align: center; border: 1px solid #e6e9ee; border-radius: 8px;">
        <div style="font-size: 22px; font-weight: bold; color: #1B2A3E;">${esc(c.value)}</div>
        <div style="font-size: 12px; color: #2E4A6B; line-height: 1.4; margin-top: 4px;">${esc(c.label)}</div>
      </td>`).join('');

    const html = gabaritEmail({
      titre: `Nouveau cas concret : ${esc(a.titre)}`,
      corps: `
        <p style="color: #C9A84C; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin: 0 0 10px;">${esc(a.offre)} · ${esc(a.segment)} · ${formatDate(a.date)}</p>
        <p style="color: #2E4A6B; line-height: 1.7; margin: 0 0 18px;">${esc(a.resume)}</p>
        <table style="width: 100%; border-collapse: separate; border-spacing: 8px 0; margin: 0 -8px 18px;"><tr>${chiffres}</tr></table>
        <p style="margin: 0 0 6px;"><a href="${url}" style="background: #1B2A3E; color: #F4F5F7; padding: 12px 22px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Lire le cas concret complet →</a></p>
        ${a.pdf ? `<p style="color: #8A9BB0; font-size: 13px; margin: 10px 0 0;">L'exemple complet est aussi <a href="${SITE}/realisations/${a.pdf}" style="color: #C9A84C;">téléchargeable en PDF</a>.</p>` : ''}`,
      ctaTexte: 'Demander un audit gratuit',
      ctaUrl: `${SITE}/#contact`,
      footerExtra: `<p style="color: #b0b8c4; font-size: 11px; margin: 14px 0 0;">Vous recevez cet e-mail parce que vous êtes abonné aux Réalisations de SENA CONSULTING. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #8A9BB0;">Se désabonner</a></p>`,
    });
    const subject = `Nouveau cas concret — ${a.titre}`;
    const from = 'Ulrich GBADA — SENA CONSULTING <contact@sena-consulting.fr>';

    if (test) {
      const r = await resend.emails.send({ from, to: [test], subject: `[TEST] ${subject}`, html: html.replace('{{{RESEND_UNSUBSCRIBE_URL}}}', `${SITE}/realisations#newsletter`) });
      if (r.error) throw new Error(`Resend (test) : ${r.error.message}`);
      return Response.json({ success: true, mode: 'test', to: test });
    }

    if (!process.env.RESEND_AUDIENCE_ID) return Response.json({ error: 'RESEND_AUDIENCE_ID manquante.' }, { status: 500 });
    const created = await resend.broadcasts.create({ audienceId: process.env.RESEND_AUDIENCE_ID, from, subject, html, name: `Réalisations — ${a.slug}` });
    if (created.error) throw new Error(`Resend (broadcast create) : ${created.error.message}`);
    const sent = await resend.broadcasts.send(created.data.id);
    if (sent.error) throw new Error(`Resend (broadcast send) : ${sent.error.message}`);

    return Response.json({ success: true, mode: 'broadcast', id: created.data.id });
  } catch (error) {
    console.error('Erreur annonce newsletter :', error);
    return Response.json({ error: String(error.message ?? error) }, { status: 500 });
  }
}
