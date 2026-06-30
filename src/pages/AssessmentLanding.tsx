import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from "react-i18next";

const AssessmentLanding = () => {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { t } = useTranslation();
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  const clientsCount = useCountUp({ end: 35, duration: 2000, start: 0, delay: statsInView ? 0 : 9999 });
  const yearsCount = useCountUp({ end: 7, duration: 2000, start: 0, delay: statsInView ? 200 : 9999 });
  const resultsCount = useCountUp({ end: 100, duration: 2000, start: 0, delay: statsInView ? 400 : 9999 });

  const benefits = t("assessmentLanding.benefits", { returnObjects: true }) as string[];
  const personas = t("assessmentLanding.personas", { returnObjects: true }) as { title: string; description: string }[];
  const personaColors = [
    "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
    "from-purple-500/10 to-purple-500/5 border-purple-500/20",
    "from-amber-500/10 to-amber-500/5 border-amber-500/20",
    "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={t("assessmentLanding.seoTitle")}
        description={t("assessmentLanding.seoDescription")}
        keywords={t("assessmentLanding.seoKeywords")}
        canonicalUrl="/video-readiness-assessment"
      />
      <ScrollProgress />
      <StickyCtaBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 pb-20 sm:pb-28 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 animate-gradient-shift bg-[length:200%_200%]" />
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex justify-center mb-8 pt-8 animate-float">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[450px] drop-shadow-2xl will-change-transform">
                  <AspectRatio ratio={16/9}>
                    <DotLottieReact
                      src="https://lottie.host/9defe1b4-a3d5-439b-b884-1dbfa9247954/8REzatpj1d.lottie"
                      loop
                      autoplay
                      style={{ width: '100%', height: '100%' }}
                    />
                  </AspectRatio>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-fade-in will-change-transform">
                {t("assessmentLanding.heroTitlePrefix")}
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text">{t("assessmentLanding.heroTitleHighlight")}</span>{t("assessmentLanding.heroTitleSuffix")}
              </h1>
              
              <p 
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in will-change-transform" 
                style={{ animationDelay: '100ms' }}
              >
                {t("assessmentLanding.heroSubtitle")}
              </p>

              <Button 
                size="lg" 
                onClick={() => navigate(localePath('/assessment/quiz'))}
                className="gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce-in text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-6 rounded-full group hover:scale-105 active:scale-95 will-change-transform bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary font-bold relative overflow-hidden max-w-full"
                style={{ animationDelay: '200ms' }}
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  {t("assessmentLanding.startButton")} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-all group-hover:translate-x-2 group-hover:scale-125 duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <div 
                className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in" 
                style={{ animationDelay: '300ms' }}
              >
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  <span className="text-lg">⏱️</span> {t("assessmentLanding.badgeTime")}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  <span className="text-lg">🎁</span> {t("assessmentLanding.badgeFree")}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  <span className="text-lg">✨</span> {t("assessmentLanding.badgeAdvice")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 leading-tight animate-fade-in">
              {t("assessmentLanding.analyzeTitle")}
            </h2>
            
            <div className="space-y-4 mb-12 max-w-3xl mx-auto mt-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/60 transition-all duration-300 animate-slide-in-left border border-border/50 hover:border-primary/30 hover:-translate-x-1 hover:shadow-glow cursor-default will-change-transform group"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CheckCircle2 className="w-7 h-7 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg sm:text-xl leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
            
            <p 
              className="text-center text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: '400ms' }}
            >
              → <em>{t("assessmentLanding.analyzeNote")}</em>
            </p>
          </div>
        </section>

        {/* Target Audiences Section */}
        <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-background to-accent/[0.02]" />
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 leading-tight animate-fade-in">
              {t("assessmentLanding.audienceTitle")}
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t("assessmentLanding.audienceSubtitle")}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${personaColors[index]} border hover:scale-105 transition-all duration-300 hover:shadow-glow cursor-default will-change-transform animate-fade-in`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <h3 className="text-xl font-bold mb-3">{persona.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{persona.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <p className="text-lg text-muted-foreground mb-6">
                <strong>{t("assessmentLanding.recognizeBold")}</strong>{t("assessmentLanding.recognizeRest")}
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate(localePath('/assessment/quiz'))}
                className="gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-6 rounded-full group hover:scale-105 active:scale-95 will-change-transform bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary font-bold relative overflow-hidden max-w-full"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  {t("assessmentLanding.startButton")} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-all group-hover:translate-x-2 group-hover:scale-125 duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </section>

        {/* Credibility Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-secondary/20 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),transparent)]" />
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight animate-fade-in">
                {t("assessmentLanding.whoTitle")}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
                {t("assessmentLanding.whoText")}
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {t("assessmentLanding.whyTitle")}
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '300ms' }}>
                {t("assessmentLanding.whyText")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16" ref={statsRef}>
              <div className={`text-center p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-glow hover:border-primary/30 cursor-default will-change-transform ${
                statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="text-5xl sm:text-6xl font-bold text-primary mb-3 transition-all duration-300 group-hover:scale-110">{clientsCount}+</div>
                <p className="text-lg text-muted-foreground">{t("assessmentLanding.statClients")}</p>
              </div>
              <div 
                className={`text-center p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-glow hover:border-primary/30 cursor-default will-change-transform ${
                  statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="text-5xl sm:text-6xl font-bold text-primary mb-3 transition-all duration-300 group-hover:scale-110">{yearsCount}+</div>
                <p className="text-lg text-muted-foreground">{t("assessmentLanding.statYears")}</p>
              </div>
              <div 
                className={`text-center p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-glow hover:border-primary/30 cursor-default will-change-transform ${
                  statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="text-5xl sm:text-6xl font-bold text-primary mb-3 transition-all duration-300 group-hover:scale-110">{resultsCount}%</div>
                <p className="text-lg text-muted-foreground">{t("assessmentLanding.statResults")}</p>
              </div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button 
                size="lg" 
                onClick={() => navigate(localePath('/assessment/quiz'))}
                className="gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-6 rounded-full group hover:scale-105 active:scale-95 will-change-transform bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary font-bold relative overflow-hidden max-w-full"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  {t("assessmentLanding.startButton")} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-all group-hover:translate-x-2 group-hover:scale-125 duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  <span className="text-lg">⏱️</span> {t("assessmentLanding.badgeTime")}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  <span className="text-lg">💰</span> {t("assessmentLanding.badgeFree")}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  <span className="text-lg">✨</span> {t("assessmentLanding.badgeAdvice")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AssessmentLanding;
