import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Sparkles, Search, PenLine, Send, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAssessment } from "@/contexts/AssessmentContext";
import { useTranslation } from "react-i18next";
import checkGradient from "@/assets/check-gradient.png";

const stepIcons = [Search, PenLine, Send];

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

      <main className="flex-1">
        {/* Hero / Thank You */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-24 sm:pb-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] animate-gradient-shift bg-[length:200%_200%]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px]" />

          <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10 text-center">
            {/* Animated check */}
            <div className="relative inline-flex items-center justify-center mb-8 animate-bounce-in">
              <span className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110" />
              <span className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
              <img src={checkGradient} alt="Success" className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl" />
            </div>

            <div className="flex justify-center mb-5 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <Sparkles className="w-4 h-4" /> {t("assessmentResults.badge")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 animate-fade-in bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-1">
              {t("assessmentResults.thankYou", { name: state.contactInfo.name })}
            </h1>

            <p className="text-xl sm:text-2xl text-foreground/80 mb-4 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t("assessmentResults.received")}
            </p>

            <p className="text-base sm:text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
              {t("assessmentResults.followupPrefix")}
              <span className="font-bold text-foreground">{t("assessmentResults.followupBold")}</span>
              {t("assessmentResults.followupSuffix")}
            </p>
          </div>
        </section>

        {/* Cards (overlapping the hero) */}
        <section className="relative z-20 -mt-16 pb-20 sm:pb-28">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-8">
            {/* Contact card */}
            <div className="bg-card rounded-3xl p-8 sm:p-10 border border-border/60 shadow-xl shadow-primary/5 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-black mb-2 text-center">
                {t("assessmentResults.directQuestion")}
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                {t("assessmentResults.directQuestionSub")}
              </p>

              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="w-full text-base sm:text-lg py-6 gap-2 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary hover:shadow-glow hover:scale-[1.02] transition-all duration-300 font-bold"
              >
                <MessageCircle className="h-5 w-5" />
                {t("assessmentResults.whatsappButton")}
              </Button>

              <div className="flex items-center gap-3 my-6">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t("assessmentResults.orContact")}</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="tel:+31610322231"
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/40 border border-border/50 hover:border-primary/40 hover:bg-secondary/70 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-sm">+31 6 10 32 22 31</span>
                </a>

                <a
                  href="mailto:info@devomedia.nl"
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/40 border border-border/50 hover:border-primary/40 hover:bg-secondary/70 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-sm truncate">info@devomedia.nl</span>
                </a>
              </div>
            </div>

            {/* What happens next — timeline */}
            <div className="bg-card rounded-3xl p-8 sm:p-10 border border-border/60 shadow-xl shadow-primary/5 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">{t("assessmentResults.whatNext")}</h3>

              <div className="relative pl-2">
                {/* connecting line */}
                <span className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
                <div className="space-y-7">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] ?? Sparkles;
                    return (
                      <div
                        key={index}
                        className="relative flex items-start gap-5 animate-slide-in-left"
                        style={{ animationDelay: `${index * 120}ms` }}
                      >
                        <div className="relative z-10 flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="pt-1.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-primary/70">0{index + 1}</span>
                            <p className="font-bold">{step.title}</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Alternative actions */}
            <div className="text-center pt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <p className="text-sm text-muted-foreground mb-5">
                {t("assessmentResults.moreWork")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate(localePath('/portfolio'))}
                  variant="outline"
                  className="rounded-full gap-2 group hover:border-primary hover:text-primary"
                >
                  {t("assessmentResults.viewPortfolio")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  onClick={() => navigate(localePath('/resultaten'))}
                  variant="outline"
                  className="rounded-full gap-2 group hover:border-primary hover:text-primary"
                >
                  {t("assessmentResults.viewResults")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
