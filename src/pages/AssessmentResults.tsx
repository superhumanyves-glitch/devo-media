import { useEffect } from "react";
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
  const { state } = useAssessment();
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

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          {/* Thank you */}
          <div className="text-center mb-10 animate-fade-in">
            <img src={checkGradient} alt="Success" className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              {t("assessmentResults.thankYou", { name: state.contactInfo.name })}
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              {t("assessmentResults.received")}
            </p>
            <p className="text-muted-foreground">
              {t("assessmentResults.followupPrefix")}
              <span className="font-semibold text-foreground">{t("assessmentResults.followupBold")}</span>
              {t("assessmentResults.followupSuffix")}
            </p>
          </div>

          {/* Contact card */}
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold mb-1 text-center">
              {t("assessmentResults.directQuestion")}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {t("assessmentResults.directQuestionSub")}
            </p>

            <Button size="lg" onClick={handleWhatsApp} className="w-full gap-2">
              <MessageCircle className="h-5 w-5" />
              {t("assessmentResults.whatsappButton")}
            </Button>

            <div className="flex items-center gap-3 my-5">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">{t("assessmentResults.orContact")}</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="tel:+31610322231"
                className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors"
              >
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">+31 6 10 32 22 31</span>
              </a>
              <a
                href="mailto:info@devomedia.nl"
                className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors"
              >
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium truncate">info@devomedia.nl</span>
              </a>
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-bold mb-5 text-center">{t("assessmentResults.whatNext")}</h3>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Alternative actions */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {t("assessmentResults.moreWork")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate(localePath('/portfolio'))} variant="outline" size="sm">
                {t("assessmentResults.viewPortfolio")}
              </Button>
              <Button onClick={() => navigate(localePath('/resultaten'))} variant="outline" size="sm">
                {t("assessmentResults.viewResults")}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssessmentResults;
