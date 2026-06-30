import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAssessment } from "@/contexts/AssessmentContext";
import checkGradient from "@/assets/check-gradient.png";

const AssessmentResults = () => {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { state, getSegment } = useAssessment();

  useEffect(() => {
    // Redirect if no contact info (user hasn't completed assessment)
    if (!state.contactInfo) {
      navigate(localePath('/video-readiness-assessment'));
    }
  }, [state.contactInfo, navigate]);

  if (!state.contactInfo) {
    return null;
  }

  const handleWhatsApp = () => {
    const message = `Hallo! Ik heb zojuist het Social Media Assessment ingevuld. Ik heb een vraag.`;
    window.open(`https://wa.me/31610322231?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-20 sm:pt-24">
        {/* Thank You Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <img src={checkGradient} alt="Success" className="w-24 h-24" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black mb-6">
                Bedankt, {state.contactInfo.name}!
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
                We hebben je assessment ontvangen en bekijken je situatie.
              </p>
              
              <p className="text-lg text-muted-foreground">
                We nemen binnen <span className="font-bold text-foreground">48 uur</span> contact met je op met een persoonlijk advies.
              </p>
            </div>

            {/* Contact Options */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 sm:p-10 border-2 border-primary/20 mb-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-4 text-center">
                Heb je direct een vraag?
              </h2>
              
              <p className="text-center text-muted-foreground mb-8">
                Aarzel niet om contact met ons op te nemen
              </p>

              <div className="space-y-4 mb-8">
                <Button
                  size="lg"
                  onClick={handleWhatsApp}
                  className="w-full text-lg py-6 gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Start chat via WhatsApp
                </Button>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-bold text-center mb-4">Of neem direct contact op:</h3>
                
                <a 
                  href="tel:+31610322231"
                  className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background hover:bg-accent transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-medium">+31 6 10 32 22 31</span>
                </a>
                
                <a 
                  href="mailto:info@devomedia.nl"
                  className="flex items-center justify-center gap-3 p-4 rounded-lg bg-background hover:bg-accent transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-medium">info@devomedia.nl</span>
                </a>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-background rounded-xl p-8 border">
              <h3 className="text-xl font-bold mb-6 text-center">Wat gebeurt er nu?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold mb-1">We analyseren je antwoorden</p>
                    <p className="text-sm text-muted-foreground">
                      Ons team bekijkt je specifieke situatie en doelen
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold mb-1">We maken een persoonlijk plan</p>
                    <p className="text-sm text-muted-foreground">
                      Op maat gemaakt advies voor jouw bedrijf
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold mb-1">We nemen contact op</p>
                    <p className="text-sm text-muted-foreground">
                      Binnen 48 uur ontvang je ons voorstel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="text-center mt-12 space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Wil je ondertussen meer zien van ons werk?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate(localePath('/portfolio'))}
                  variant="outline"
                  size="sm"
                >
                  Bekijk Portfolio
                </Button>
                <Button 
                  onClick={() => navigate(localePath('/resultaten'))}
                  variant="outline"
                  size="sm"
                >
                  Zie Resultaten
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AssessmentResults;
