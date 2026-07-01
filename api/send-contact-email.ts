import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { contactEmailSchema } from "./_lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where internal lead notifications go
const TO_DEVO_MEDIA = "devomediaagency@proton.me";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const parsed = contactEmailSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0]?.message || "Invalid submission",
      });
    }
    const { name, company, email, phone, workTypes, message } = parsed.data;

    const workTypesList = (workTypes || []).map((type) => `• ${type}`).join("\n");

    // Optional BCC fallback
    const fallbackEmail = process.env.NOTIFY_FALLBACK_EMAIL;

    // Internal email to Devo Media
    const internalEmail = await resend.emails.send({
      from: "Devo Media Notifications <notifications@news.devomedia.nl>",
      to: [TO_DEVO_MEDIA],
      replyTo: email,
      ...(fallbackEmail && { bcc: [fallbackEmail] }),
      subject: `[New Lead] Contact - ${name}`,
      headers: { "X-Entity-Ref-ID": randomUUID() },
      text: `
Nieuwe contactaanvraag ontvangen

CONTACTGEGEVENS:
Naam: ${name}
Bedrijf: ${company}
Email: ${email}
Telefoon: ${phone}

INTERESSE IN:
${workTypesList}

BERICHT:
${message}

---
Verzonden via devomedia.nl contactformulier
      `,
      html: `
        <h2>Nieuwe contactaanvraag ontvangen</h2>

        <h3>👤 Contactgegevens:</h3>
        <p>
          <strong>Naam:</strong> ${name}<br>
          <strong>Bedrijf:</strong> ${company}<br>
          <strong>Email:</strong> ${email}<br>
          <strong>Telefoon:</strong> ${phone}
        </p>

        <h3>🎯 Interesse in:</h3>
        <p>${workTypesList.replace(/\n/g, "<br>")}</p>

        <h3>📝 Bericht:</h3>
        <p>${message}</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">Verzonden via devomedia.nl contactformulier</p>
      `,
    });

    // Avoid Resend rate limiting (2 req/sec)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Confirmation email to the lead
    const leadEmail = await resend.emails.send({
      from: "Devo Media <info@news.devomedia.nl>",
      to: [email],
      replyTo: TO_DEVO_MEDIA,
      subject: "Bedankt voor je bericht!",
      html: `
        <p>Hoi ${name},</p>

        <p>Bedankt voor je bericht!</p>

        <p>We hebben je aanvraag ontvangen en gaan er zo snel mogelijk mee aan de slag.
        Je kunt binnen 48 uur een reactie van ons verwachten.</p>

        <p><strong>Interessegebieden:</strong><br>
        ${workTypesList.replace(/\n/g, "<br>")}</p>

        <p>Wil je sneller contact? Stuur ons een WhatsApp bericht:<br>
        <a href="https://wa.me/31610322231" style="color: #0066cc;">https://wa.me/31610322231</a></p>

        <p>Nieuwsgierig naar ons werk? Bekijk ons portfolio:<br>
        <a href="https://devomedia.nl/portfolio" style="color: #0066cc;">https://devomedia.nl/portfolio</a></p>

        <p>Met vriendelijke groet,<br>
        Het Devo Media Team</p>

        <p style="color: #666; font-size: 14px;">
          +31 6 10 32 22 31<br>
          info@devomedia.nl<br>
          devomedia.nl
        </p>
      `,
    });

    return res.status(200).json({
      success: true,
      internalEmailId: internalEmail.data?.id,
      leadEmailId: leadEmail.data?.id,
    });
  } catch (error: any) {
    console.error("Error in send-contact-email:", error);
    return res.status(500).json({ error: error?.message || "Failed to send email" });
  }
}
