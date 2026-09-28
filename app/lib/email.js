// Gabarit HTML commun aux e-mails de la newsletter (bienvenue, annonces).
const SITE = 'https://www.sena-consulting.fr';

/** Version texte brut d'un HTML simple : améliore la délivrabilité (Outlook, Gmail). */
export const versionTexte = (html) => html
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/(p|div|h1|h2|h3|tr|li)>/gi, '\n')
  .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .split('\n').map((l) => l.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim();

export const gabaritEmail = ({ titre, corps, ctaTexte, ctaUrl, footerExtra = '' }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F4F5F7; padding: 32px;">
    <div style="background: #1B2A3E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="color: #C9A84C; margin: 0; font-size: 20px; letter-spacing: 2px;">SENA CONSULTING</h1>
      <p style="color: #8A9BB0; margin: 8px 0 0; font-size: 13px;">Cabinet de conseil en performance business pour PME/TPE</p>
    </div>
    <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px;">
      <h2 style="color: #1B2A3E; font-size: 20px; margin: 0 0 16px; line-height: 1.3;">${titre}</h2>
      ${corps}
      <div style="background: #1B2A3E; border-radius: 10px; padding: 24px; margin: 28px 0 8px; text-align: center;">
        <p style="color: #F4F5F7; font-size: 17px; font-weight: bold; margin: 0 0 6px;">Votre entreprise peut 10× sa croissance.</p>
        <p style="color: #8A9BB0; font-size: 14px; margin: 0 0 18px; line-height: 1.6;">Vous aussi, demandez votre audit gratuit et décuplez votre chiffre d'affaires dès aujourd'hui.</p>
        <a href="${ctaUrl}" style="background: #C9A84C; color: #1B2A3E; padding: 13px 26px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">${ctaTexte}</a>
      </div>
      <hr style="border: none; border-top: 1px solid #F4F5F7; margin: 24px 0;" />
      <p style="color: #8A9BB0; font-size: 13px; margin: 0;">Ulrich GBADA — Fondateur, SENA CONSULTING</p>
      <p style="color: #8A9BB0; font-size: 13px; margin: 4px 0;">📞 07 68 93 48 37 · ✉️ contact@sena-consulting.fr · 🌐 <a href="${SITE}" style="color: #C9A84C;">sena-consulting.fr</a></p>
      ${footerExtra}
    </div>
  </div>`;


// ─── Segment Resend de la newsletter ────────────────────────────────────────
// Resend a remplacé les Audiences par des Segments. Le segment de diffusion est
// résolu ainsi : RESEND_SEGMENT_ID si définie, sinon recherche par nom, sinon
// création. Le résultat est mis en cache le temps de vie de la fonction.
export const SEGMENT_NAME = 'Newsletter Réalisations';
let segmentCache = null;

export async function getSegmentId(resend) {
  if (process.env.RESEND_SEGMENT_ID) return process.env.RESEND_SEGMENT_ID;
  if (segmentCache) return segmentCache;
  const liste = await resend.segments.list();
  if (liste.error) throw new Error(`Resend (segments.list) : ${liste.error.message}`);
  const existant = (liste.data?.data ?? []).find((s) => s.name === SEGMENT_NAME);
  if (existant) return (segmentCache = existant.id);
  const cree = await resend.segments.create({ name: SEGMENT_NAME });
  if (cree.error) throw new Error(`Resend (segments.create) : ${cree.error.message}`);
  return (segmentCache = cree.data.id);
}
