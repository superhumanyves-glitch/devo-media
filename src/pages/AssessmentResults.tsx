import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAssessment } from "@/contexts/AssessmentContext";
import { useTranslation } from "react-i18next";
import checkGradient from "@/assets/check-gradient.png";

const AssessmentResults = () => {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { t } = useTranslation();
  const { state, getSegment } = useAssessment();
  const steps = t("assessmentResults.steps", { returnObjects: true }) as { title: string; text: string }[];

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
    const message = t("assessmentResults.whatsappMessage");
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
                {t("assessmentResults.thankYou", { name: state.contactInfo.name })}
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
                {t("assessmentResults.received")}
              </p>

              <p className="text-lg text-muted-foreground">
                {t("assessmentResults.followupPrefix")}<span className="font-bold text-foreground">{t("assessmentResults.followupBold")}</span>{t("assessmentResults.followupSuffix")}
              </p>
            </div>

            {/* Contact Options */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 sm:p-10 border-2 border-primary/20 mb-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-4 text-center">
                {t("assessmentResults.directQuestion")}
              </h2>

              <p className="text-center text-muted-foreground mb-8">
                {t("assessmentResults.directQuestionSub")}
              </p>

              <div className="space-y-4 mb-8">
                <Button
                  size="lg"
                  onClick={handleWhatsApp}
                  className="w-full text-lg py-6 gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("assessmentResults.whatsappButton")}
                </Button>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-bold text-center mb-4">{t("assessmentResults.orContact")}</h3>
                
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
              <h3 className="text-xl font-bold mb-6 text-center">{t("assessmentResults.whatNext")}</h3>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{step.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="text-center mt-12 space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                {t("assessmentResults.moreWork")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate(localePath('/portfolio'))}
                  variant="outline"
                  size="sm"
                >
                  {t("assessmentResults.viewPortfolio")}
                </Button>
                <Button
                  onClick={() => navigate(localePath('/resultaten'))}
                  variant="outline"
                  size="sm"
                >
                  {t("assessmentResults.viewResults")}
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
