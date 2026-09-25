import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, company, phone } = body;

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Nom, email et message sont obligatoires.' },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    // 1. Notification interne à Ulrich
    await resend.emails.send({
      from: 'SENA CONSULTING <contact@sena-consulting.fr>',
      to: ['contact@sena-consulting.fr'],
      subject: `Nouveau message de ${name} — SENA CONSULTING`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F4F5F7; padding: 32px;">
          <div style="background: #1B2A3E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 20px; letter-spacing: 2px;">SENA CONSULTING</h1>
            <p style="color: #8A9BB0; margin: 8px 0 0; font-size: 13px;">Nouveau message reçu depuis le site</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px; width: 30%;">Nom</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #1B2A3E; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #1B2A3E;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px;">Société</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #1B2A3E;">${company}</td>
              </tr>` : ''}
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #8A9BB0; font-size: 13px;">Téléphone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F4F5F7; color: #1B2A3E;">${phone}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #8A9BB0; font-size: 13px; margin-bottom: 8px;">Message :</p>
              <div style="background: #F4F5F7; padding: 16px; border-radius: 6px; color: #1B2A3E; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Votre demande — SENA CONSULTING" style="background: #C9A84C; color: #1B2A3E; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Répondre à ${name}</a>
            </div>
          </div>
        </div>
      `,
    });

    // 2. Email de confirmation au prospect
    await resend.emails.send({
      from: 'Ulrich GBADA — SENA CONSULTING <contact@sena-consulting.fr>',
      to: [email],
      subject: 'Votre message a bien été reçu — SENA CONSULTING',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F4F5F7; padding: 32px;">
          <div style="background: #1B2A3E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 20px; letter-spacing: 2px;">SENA CONSULTING</h1>
            <p style="color: #8A9BB0; margin: 8px 0 0; font-size: 13px;">Cabinet de conseil en performance business pour PME/TPE</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px;">
            <p style="color: #1B2A3E; font-size: 16px; margin-top: 0;">Bonjour ${name},</p>
            <p style="color: #2E4A6B; line-height: 1.7;">Merci pour votre message. Je l'ai bien reçu et reviendrai vers vous dans les <strong>24 à 48 heures</strong> ouvrées.</p>
            <p style="color: #2E4A6B; line-height: 1.7;">En attendant, n'hésitez pas à consulter notre site pour en savoir plus sur notre approche :</p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://www.sena-consulting.fr" style="background: #C9A84C; color: #1B2A3E; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Visiter SENA CONSULTING</a>
            </div>
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

    return Response.json({ success: true });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return Response.json(
      { error: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.' },
      { status: 500 }
    );
  }
}
