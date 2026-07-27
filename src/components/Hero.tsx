import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/hooks/useLocalePath";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const localePath = useLocalePath();

  const scrollToPricing = () => {
    document.getElementById('pakketten')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background pt-2 sm:pt-4 pb-10 sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* The showreel above already carries the headline visually, so the h1
            stays for SEO and screen readers but is not painted twice. */}
        <h1 id="hero-heading" className="sr-only">
          {t('hero.title').split('\n').join(' ')}
        </h1>

        <div className="text-center">
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-lg mx-auto animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate(localePath('/video-readiness-assessment'))}
              className="group gap-2 w-full sm:w-auto text-sm sm:text-base"
              aria-label={t('hero.ariaAssessment')}
            >
              <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> {t('hero.ctaPrimary')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToPricing}
              className="gap-2 group border-2 border-primary bg-background text-primary font-bold hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto text-sm sm:text-base"
              aria-label={t('hero.ariaPackages')}
            >
              {t('hero.ctaSecondary')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
          <p
            className="text-xs sm:text-sm text-foreground font-medium mt-4 sm:mt-6 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            {t('assessment.cta')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
