import { Resend } from 'resend';
import { gabaritEmail, getSegmentId, SEGMENT_NAME, versionTexte } from '../../lib/email';

// ─── Inscription à la newsletter Réalisations ───────────────────────────────
// 1. L'abonné est créé dans les contacts Resend et rattaché au segment
//    « Newsletter Réalisations » — la liste utilisée par /api/newsletter/annonce.
// 2. Notification interne (contact@).
// 3. E-mail de bienvenue avec rappel de l'audit gratuit.
//
// Le SDK Resend ne lève pas d'exception : toujours tester { error }.

const SITE = 'https://www.sena-consulting.fr';
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const splitNom = (nom) => {
  const parts = nom.trim().split(/\s+/);
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') };
};

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { nom, email } = await request.json();
    if (typeof nom !== 'string' || nom.trim().length < 2) {
      return Response.json({ error: 'Nom invalide.' }, { status: 400 });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }
    const nomNet = nom.trim().slice(0, 80);
    const emailNet = email.trim().toLowerCase().slice(0, 160);
    const { firstName, lastName } = splitNom(nomNet);

    // 1. Contact Resend + segment de diffusion
    let listeOk = false, listeErreur = '';
    try {
      const segmentId = await getSegmentId(resend);
      const c = await resend.contacts.create({
        email: emailNet, firstName, lastName, unsubscribed: false, segments: [{ id: segmentId }],
      });
      if (c.error) {
        // Contact déjà existant : on le rattache simplement au segment.
        const add = await resend.contacts.segments.add({ email: emailNet, segmentId });
        if (add.error) listeErreur = `${c.error.message} / ${add.error.message}`;
        else listeOk = true;
      } else listeOk = true;
    } catch (e) { listeErreur = String(e.message ?? e); }
    if (!listeOk) console.error('[newsletter] liste :', listeErreur);

    // 2. Notification interne — c'est elle qui garantit que l'inscription n'est pas perdue
    const notif = await resend.emails.send({
      from: 'SENA CONSULTING <contact@sena-consulting.fr>',
      to: ['contact@sena-consulting.fr'],
      subject: `Nouvel abonné newsletter — ${nomNet} (${emailNet})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F4F5F7;">
          <h2 style="color: #1B2A3E; margin: 0 0 12px;">Nouvel abonné à la newsletter Réalisations</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 0; color: #8A9BB0; width: 30%;">Nom</td><td style="padding: 8px 0; color: #1B2A3E; font-weight: bold;">${esc(nomNet)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A9BB0;">E-mail</td><td style="padding: 8px 0;"><a href="mailto:${esc(emailNet)}" style="color: #C9A84C;">${esc(emailNet)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #8A9BB0;">Liste Resend</td><td style="padding: 8px 0; color: #1B2A3E;">${listeOk ? `ajouté au segment « ${SEGMENT_NAME} »` : `<strong style="color:#c62828">NON ajouté</strong> — ${esc(listeErreur)}`}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A9BB0;">Date</td><td style="padding: 8px 0; color: #1B2A3E;">${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</td></tr>
          </table>
        </div>`,
    });
    if (notif.error) throw new Error(`Resend (notification) : ${notif.error.message}`);

    // 3. Bienvenue
    const htmlBienvenue = gabaritEmail({
        titre: `Bienvenue ${esc(firstName)},`,
        corps: `
          <p style="color: #2E4A6B; line-height: 1.7; margin: 0 0 14px;">Merci pour votre inscription. Vous recevrez désormais un e-mail à chaque nouveau cas concret publié dans nos <a href="${SITE}/realisations" style="color: #C9A84C;">Réalisations</a> : un dirigeant, un problème précis, des chiffres, une méthode et le résultat obtenu.</p>
          <p style="color: #2E4A6B; line-height: 1.7; margin: 0;">Pas de jargon, pas de sollicitation déguisée : uniquement ce qui peut servir votre entreprise.</p>`,
        ctaTexte: 'Demander un audit gratuit',
        ctaUrl: `${SITE}/#contact`,
        footerExtra: `<p style="color: #b0b8c4; font-size: 11px; margin: 14px 0 0;">Vous recevez cet e-mail parce que vous vous êtes inscrit sur sena-consulting.fr. Pour vous désabonner, répondez « STOP » à ce message.</p>`,
      });
    const bienvenue = await resend.emails.send({
      from: 'Ulrich GBADA — SENA CONSULTING <contact@sena-consulting.fr>',
      replyTo: 'contact@sena-consulting.fr',
      to: [emailNet],
      subject: 'Bienvenue — nos analyses et cas concrets, directement dans votre boîte',
      html: htmlBienvenue,
      text: versionTexte(htmlBienvenue),
    });
    if (bienvenue.error) console.error('[newsletter] bienvenue non envoyée :', JSON.stringify(bienvenue.error));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur newsletter :', error);
    return Response.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
