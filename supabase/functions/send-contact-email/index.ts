import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  workTypes: string[];
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, company, email, phone, workTypes, message }: ContactEmailRequest = await req.json();

    console.log("Processing contact email for:", email);

    // Format work types list
    const workTypesList = workTypes.map(type => `• ${type}`).join('\n');

    // Email configuration
    const toDevoMedia = "devomediaagency@proton.me";

    // Optional BCC fallback
    const fallbackEmail = Deno.env.get("NOTIFY_FALLBACK_EMAIL");
    
    // Email to Devo Media (internal)
    const internalEmail = await resend.emails.send({
      from: "Devo Media Notifications <notifications@news.devomedia.nl>",
      to: [toDevoMedia],
      replyTo: email,
      ...(fallbackEmail && { bcc: [fallbackEmail] }),
      subject: `[New Lead] Contact - ${name}`,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
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
        <p>${workTypesList.replace(/\n/g, '<br>')}</p>
        
        <h3>📝 Bericht:</h3>
        <p>${message}</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">Verzonden via devomedia.nl contactformulier</p>
      `,
    });

    console.log("Internal email sent:", internalEmail);

    // Add delay to avoid rate limiting (Resend allows 2 req/sec)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Email to Lead (confirmation)
    const leadEmail = await resend.emails.send({
      from: "Devo Media <info@news.devomedia.nl>",
      to: [email],
      replyTo: toDevoMedia,
      subject: "Bedankt voor je bericht!",
      html: `
        <p>Hoi ${name},</p>
        
        <p>Bedankt voor je bericht!</p>
        
        <p>We hebben je aanvraag ontvangen en gaan er zo snel mogelijk mee aan de slag. 
        Je kunt binnen 48 uur een reactie van ons verwachten.</p>
        
        <p><strong>Interessegebieden:</strong><br>
        ${workTypesList.replace(/\n/g, '<br>')}</p>
        
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

    console.log("Lead email sent:", leadEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        internalEmailId: internalEmail.data?.id,
        leadEmailId: leadEmail.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
