import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import HeroQuoteForm from "@/components/HeroQuoteForm";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const scrollToPricing = () => {
    document.getElementById('pakketten')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background pt-14 sm:pt-28 pb-8 sm:pb-12"
      aria-labelledby="hero-heading"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Content */}
          <article className="text-center lg:text-left order-2 lg:order-1">
            <h1
              id="hero-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight animate-slide-up"
              style={{ 
                animationDelay: '0ms',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)'
              }}
            >
              {t('hero.title')}
            </h1>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 font-semibold mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 px-2 lg:px-0 animate-slide-up"
              style={{ 
                animationDelay: '100ms',
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              {t('hero.subtitle')}
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center w-full max-w-lg mx-auto lg:mx-0 px-4 lg:px-0 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate('/video-readiness-assessment')}
                className="group gap-2 w-full sm:w-auto text-sm sm:text-base"
                aria-label="Start gratis assessment om uw video behoeften te bepalen"
              >
                <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> {t('hero.ctaPrimary')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToPricing}
                className="gap-2 group border-2 border-primary bg-background text-primary font-bold hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto text-sm sm:text-base"
                aria-label="Bekijk onze video pakketten en prijzen"
              >
                {t('hero.ctaSecondary')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
            <p 
              className="text-xs sm:text-sm text-foreground font-medium mt-4 sm:mt-6 px-4 lg:px-0 animate-fade-in"
              style={{ 
                animationDelay: '300ms',
              }}
            >
              💡 Niet zeker welk pakket? Doe onze gratis 3-minuten assessment
            </p>
          </article>

          {/* Quote form */}
          <aside
            className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto animate-fade-in"
            style={{ animationDelay: '100ms' }}
            aria-label="Vraag een gratis offerte aan"
          >
            <HeroQuoteForm />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
