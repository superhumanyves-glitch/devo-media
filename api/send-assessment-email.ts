import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where internal lead notifications go
const TO_DEVO_MEDIA = "devomediaagency@proton.me";

interface AssessmentEmailRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  segment: string;
  answers: Record<string, unknown>;
  decodedAnswers: Record<string, string>;
  responses: { question: string; answer: string }[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, company, email, phone, score, segment, decodedAnswers, responses } =
      req.body as AssessmentEmailRequest;

    if (!name || !email || !company) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const escapeHtml = (s: string) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Render the actual questions and answers exactly as they were asked.
    const answersHtml = (responses && responses.length > 0)
      ? responses
          .map(
            (r, i) => `
      <p><strong>Q${i + 1}: ${escapeHtml(r.question)}</strong><br>
      ${escapeHtml(r.answer) || "Geen antwoord"}</p>`
          )
          .join("")
      : "<p>Geen antwoorden ontvangen.</p>";

    // Optional BCC fallback
    const fallbackEmail = process.env.NOTIFY_FALLBACK_EMAIL;

    // Internal email to Devo Media
    const internalEmail = await resend.emails.send({
      from: "Devo Media Notifications <notifications@news.devomedia.nl>",
      to: [TO_DEVO_MEDIA],
      replyTo: email,
      ...(fallbackEmail && { bcc: [fallbackEmail] }),
      subject: `[New Lead] Assessment - ${name} (${(segment || "low").toUpperCase()})`,
      headers: { "X-Entity-Ref-ID": randomUUID() },
      html: `
        <h2>Nieuwe assessment ingevuld</h2>

        <h3>👤 Contactgegevens:</h3>
        <p>
          <strong>Naam:</strong> ${name}<br>
          <strong>Bedrijf:</strong> ${company}<br>
          <strong>Email:</strong> ${email}<br>
          <strong>Telefoon:</strong> ${phone}
        </p>

        <h3>📊 Assessment Score:</h3>
        <p>
          <strong>Score:</strong> ${score}/100<br>
          <strong>Segment:</strong> ${(segment || "low").toUpperCase()}
        </p>

        <h3>📋 Antwoorden:</h3>
        ${answersHtml}

        <h3>Key Insights:</h3>
        <p>
          <strong>• Primair Doel:</strong> ${decodedAnswers?.primaryGoal || "N/A"}<br>
          <strong>• Grootste Uitdaging:</strong> ${decodedAnswers?.biggestChallenge || "N/A"}<br>
          <strong>• Voorkeur Oplossing:</strong> ${decodedAnswers?.preferredSolution || "N/A"}<br>
          <strong>• Drone Interest:</strong> ${decodedAnswers?.droneInterest || "N/A"}<br>
          <strong>• Website Status:</strong> ${decodedAnswers?.websiteStatus || "N/A"}
        </p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">Verzonden via devomedia.nl/video-readiness-assessment</p>
      `,
    });

    // Avoid Resend rate limiting (2 req/sec)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Confirmation email to the lead
    const leadEmail = await resend.emails.send({
      from: "Devo Media <info@news.devomedia.nl>",
      to: [email],
      replyTo: TO_DEVO_MEDIA,
      subject: "Bedankt voor het invullen van de assessment!",
      html: `
        <p>Hoi ${name},</p>

        <p>Bedankt voor het invullen van de assessment!</p>

        <p>We hebben je antwoorden ontvangen en gaan deze grondig analyseren.
        Binnen 48 uur nemen we persoonlijk contact met je op om je op maat
        gemaakte advies te bespreken.</p>

        <p><strong>Wat gebeurt er nu?</strong><br>
        We analyseren je huidige situatie<br>
        We stellen een persoonlijk advies voor je samen<br>
        We nemen binnen 48 uur contact op<br>
        Samen bespreken we de beste aanpak voor jouw bedrijf</p>

        <p>Nieuwsgierig naar ons werk? Bekijk ons portfolio:<br>
        <a href="https://devomedia.nl/portfolio" style="color: #0066cc;">https://devomedia.nl/portfolio</a></p>

        <p>Wil je direct contact? Stuur ons een WhatsApp bericht:<br>
        <a href="https://wa.me/31610322231" style="color: #0066cc;">https://wa.me/31610322231</a></p>

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
    console.error("Error in send-assessment-email:", error);
    return res.status(500).json({ error: error?.message || "Failed to send email" });
  }
}
