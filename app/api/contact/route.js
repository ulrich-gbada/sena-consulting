import { Resend } from 'resend';

// Formulaire de demande d'audit en 4 étapes :
//   1. Identité (name, email, company, phone, address, codePostal, ville, taille, ca)
//   2. Secteur (secteur)
//   3. Attentes (attentes)
//   4. RDV Calendly (côté client)
// Cette route est appelée à la validation de l'étape 3.

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px; width: 32%; vertical-align: top;">${label}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #1B2A3E; vertical-align: top;">${esc(value)}</td>
      </tr>`
    : '';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const {
      name, email, company, phone,
      address, codePostal, ville, latitude, longitude,
      taille, ca, secteur, attentes,
    } = body;

    if (!name || !email) {
      return Response.json({ error: 'Nom et email sont obligatoires.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    const adresseComplete = [address, [codePostal, ville].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    const lienCarte = latitude && longitude
      ? `<br /><a href="https://www.google.com/maps?q=${esc(latitude)},${esc(longitude)}" style="color: #C9A84C; font-size: 12px;">Voir sur la carte</a>`
      : '';

    // 1. Notification interne
    const interne = await resend.emails.send({
      from: 'SENA CONSULTING <contact@sena-consulting.fr>',
      to: ['contact@sena-consulting.fr'],
      replyTo: email,
      subject: `Demande d'audit — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F4F5F7; padding: 32px;">
          <div style="background: #1B2A3E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 20px; letter-spacing: 2px;">SENA CONSULTING</h1>
            <p style="color: #8A9BB0; margin: 8px 0 0; font-size: 13px;">Nouvelle demande d'audit gratuit depuis le site</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1B2A3E; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 8px;">Identité</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Nom', name)}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7;"><a href="mailto:${esc(email)}" style="color: #C9A84C;">${esc(email)}</a></td>
              </tr>
              ${row('Société', company)}
              ${row('Téléphone', phone)}
              ${adresseComplete ? `<tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px; vertical-align: top;">Adresse d'exercice</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #1B2A3E;">${esc(adresseComplete)}${lienCarte}</td>
              </tr>` : ''}
              ${row('Taille', taille)}
              ${row("Chiffre d'affaires", ca)}
            </table>

            <h2 style="color: #1B2A3E; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 28px 0 8px;">Secteur</h2>
            <div style="background: #F4F5F7; padding: 12px 16px; border-radius: 6px; color: #1B2A3E;">${esc(secteur) || '—'}</div>

            <h2 style="color: #1B2A3E; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 28px 0 8px;">Attentes</h2>
            <div style="background: #F4F5F7; padding: 12px 16px; border-radius: 6px; color: #1B2A3E; line-height: 1.7;">
              ${Array.isArray(attentes)
                ? attentes.map((a) => `• ${esc(a)}`).join('<br />')
                : esc(attentes) || '—'}
            </div>

            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${esc(email)}?subject=Re: Votre demande d'audit — SENA CONSULTING" style="background: #C9A84C; color: #1B2A3E; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Répondre à ${esc(name)}</a>
            </div>
          </div>
        </div>
      `,
    });

    if (interne.error) throw new Error(`Resend (interne) : ${interne.error.message}`);

    // 2. Confirmation au prospect
    const confirmation = await resend.emails.send({
      from: 'Ulrich GBADA — SENA CONSULTING <contact@sena-consulting.fr>',
      to: [email],
      subject: "Votre demande d'audit gratuit — SENA CONSULTING",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F4F5F7; padding: 32px;">
          <div style="background: #1B2A3E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 20px; letter-spacing: 2px;">SENA CONSULTING</h1>
            <p style="color: #8A9BB0; margin: 8px 0 0; font-size: 13px;">Cabinet de conseil en performance business pour PME/TPE</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px;">
            <p style="color: #1B2A3E; font-size: 16px; margin-top: 0;">Bonjour ${esc(name)},</p>
            <p style="color: #2E4A6B; line-height: 1.7;">Merci pour votre demande d'audit gratuit. Je l'ai bien reçue.</p>
            <p style="color: #2E4A6B; line-height: 1.7;"><strong>Si ce n'est pas déjà fait</strong>, réservez dès maintenant votre créneau de pré-diagnostic (20 min au téléphone) :</p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://calendly.com/contact-sena-consulting/audit" style="background: #C9A84C; color: #1B2A3E; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Réserver mon créneau</a>
            </div>
            <p style="color: #2E4A6B; line-height: 1.7;">Sans réservation de votre part, je reviendrai vers vous sous <strong>24 à 48 heures</strong> ouvrées.</p>
            <hr style="border: none; border-top: 1px solid #F4F5F7; margin: 24px 0;" />
            <p style="color: #8A9BB0; font-size: 13px; margin: 0;">Cordialement,</p>
            <p style="color: #1B2A3E; font-weight: bold; margin: 4px 0;">Ulrich GBADA</p>
            <p style="color: #8A9BB0; font-size: 13px; margin: 4px 0;">Fondateur — SENA CONSULTING</p>
            <p style="color: #8A9BB0; font-size: 13px; margin: 4px 0;">📞 07 68 93 48 37 · ✉️ contact@sena-consulting.fr</p>
            <p style="color: #8A9BB0; font-size: 13px; margin: 4px 0;">🌐 <a href="https://www.sena-consulting.fr" style="color: #C9A84C;">www.sena-consulting.fr</a></p>
          </div>
        </div>
      `,
    });

    if (confirmation.error) throw new Error(`Resend (confirmation) : ${confirmation.error.message}`);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return Response.json(
      { error: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.' },
      { status: 500 }
    );
  }
}
