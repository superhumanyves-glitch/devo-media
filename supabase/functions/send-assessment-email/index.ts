import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AssessmentEmailRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  segment: string;
  answers: any;
  decodedAnswers: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      company, 
      email, 
      phone, 
      score, 
      segment, 
      decodedAnswers 
    }: AssessmentEmailRequest = await req.json();

    console.log("Processing assessment email for:", email);

    // Email configuration
    const toDevoMedia = "devomediaagency@proton.me";

    // Format decoded answers for internal email
    const answersHtml = `
      <p><strong>Q1: Post je nu regelmatig video's?</strong><br>
      ${decodedAnswers?.currentVideoUsage || 'Geen antwoord'}</p>
      
      <p><strong>Q2: Heb je een content plan?</strong><br>
      ${decodedAnswers?.hasContentPlan || 'Geen antwoord'}</p>
      
      <p><strong>Q3: Hoe vaak post je video content?</strong><br>
      ${decodedAnswers?.postingFrequency || 'Geen antwoord'}</p>
      
      <p><strong>Q4: Welke video formaten gebruik je?</strong><br>
      ${decodedAnswers?.videoFormats || 'Geen antwoord'}</p>
      
      <p><strong>Q5: Hoe zit het met je team?</strong><br>
      ${decodedAnswers?.teamSize || 'Geen antwoord'}</p>
      
      <p><strong>Q6: Werk je al met externe partijen?</strong><br>
      ${decodedAnswers?.externalPartners || 'Geen antwoord'}</p>
      
      <p><strong>Q7: Hoeveel budget heb je voor video?</strong><br>
      ${decodedAnswers?.videoBudget || 'Geen antwoord'}</p>
      
      <p><strong>Q8: Waar deel je je content?</strong><br>
      ${decodedAnswers?.platforms || 'Geen antwoord'}</p>
      
      <p><strong>Q9: Wat is je belangrijkste doel?</strong><br>
      ${decodedAnswers?.primaryGoal || 'Geen antwoord'}</p>
      
      <p><strong>Q10: Wat is je grootste uitdaging?</strong><br>
      ${decodedAnswers?.biggestChallenge || 'Geen antwoord'}</p>
      
      <p><strong>Q11: Welke oplossing past bij jou?</strong><br>
      ${decodedAnswers?.preferredSolution || 'Geen antwoord'}</p>
      
      <p><strong>Q12: Interesse in drone opnames?</strong><br>
      ${decodedAnswers?.droneInterest || 'Geen antwoord'}</p>
      
      <p><strong>Q13: Hoe staat het met je website?</strong><br>
      ${decodedAnswers?.websiteStatus || 'Geen antwoord'}</p>
    `;

    // Optional BCC fallback
    const fallbackEmail = Deno.env.get("NOTIFY_FALLBACK_EMAIL");
    
    // Email to Devo Media (internal)
    const internalEmail = await resend.emails.send({
      from: "Devo Media Notifications <notifications@news.devomedia.nl>",
      to: [toDevoMedia],
      replyTo: email,
      ...(fallbackEmail && { bcc: [fallbackEmail] }),
      subject: `[New Lead] Assessment - ${name} (${segment.toUpperCase()})`,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
      text: `
Nieuwe assessment ingevuld

CONTACTGEGEVENS:
Naam: ${name}
Bedrijf: ${company}
Email: ${email}
Telefoon: ${phone}

ASSESSMENT SCORE:
Score: ${score}/100
Segment: ${segment.toUpperCase()}

ANTWOORDEN:
Q1: Post je nu regelmatig video's?
${decodedAnswers?.currentVideoUsage || 'Geen antwoord'}

Q2: Heb je een content plan?
${decodedAnswers?.hasContentPlan || 'Geen antwoord'}

Q3: Hoe vaak post je video content?
${decodedAnswers?.postingFrequency || 'Geen antwoord'}

Q4: Welke video formaten gebruik je?
${decodedAnswers?.videoFormats || 'Geen antwoord'}

Q5: Hoe zit het met je team?
${decodedAnswers?.teamSize || 'Geen antwoord'}

Q6: Werk je al met externe partijen?
${decodedAnswers?.externalPartners || 'Geen antwoord'}

Q7: Hoeveel budget heb je voor video?
${decodedAnswers?.videoBudget || 'Geen antwoord'}

Q8: Waar deel je je content?
${decodedAnswers?.platforms || 'Geen antwoord'}

Q9: Wat is je belangrijkste doel?
${decodedAnswers?.primaryGoal || 'Geen antwoord'}

Q10: Wat is je grootste uitdaging?
${decodedAnswers?.biggestChallenge || 'Geen antwoord'}

Q11: Welke oplossing past bij jou?
${decodedAnswers?.preferredSolution || 'Geen antwoord'}

Q12: Interesse in drone opnames?
${decodedAnswers?.droneInterest || 'Geen antwoord'}

Q13: Hoe staat het met je website?
${decodedAnswers?.websiteStatus || 'Geen antwoord'}

KEY INSIGHTS:
• Primair Doel: ${decodedAnswers?.primaryGoal || 'N/A'}
• Grootste Uitdaging: ${decodedAnswers?.biggestChallenge || 'N/A'}
• Voorkeur Oplossing: ${decodedAnswers?.preferredSolution || 'N/A'}
• Drone Interest: ${decodedAnswers?.droneInterest || 'N/A'}
• Website Status: ${decodedAnswers?.websiteStatus || 'N/A'}

---
Verzonden via devomedia.nl/video-readiness-assessment
      `,
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
          <strong>Segment:</strong> ${segment.toUpperCase()}
        </p>
        
        <h3>📋 Antwoorden:</h3>
        ${answersHtml}
        
        <h3>Key Insights:</h3>
        <p>
          <strong>• Primair Doel:</strong> ${decodedAnswers?.primaryGoal || 'N/A'}<br>
          <strong>• Grootste Uitdaging:</strong> ${decodedAnswers?.biggestChallenge || 'N/A'}<br>
          <strong>• Voorkeur Oplossing:</strong> ${decodedAnswers?.preferredSolution || 'N/A'}<br>
          <strong>• Drone Interest:</strong> ${decodedAnswers?.droneInterest || 'N/A'}<br>
          <strong>• Website Status:</strong> ${decodedAnswers?.websiteStatus || 'N/A'}
        </p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">Verzonden via devomedia.nl/video-readiness-assessment</p>
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
    console.error("Error in send-assessment-email function:", error);
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
