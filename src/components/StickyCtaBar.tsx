import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const StickyCtaBar = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openContactForm'));
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary/95 to-primary-glow/95 backdrop-blur-lg border-t border-primary/20 shadow-glow animate-slide-up"
      role="region"
      aria-label="Quick contact bar"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-semibold text-primary-foreground truncate">
            {t('stickyCta.message')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            variant="secondary"
            onClick={handleClick}
            className="shadow-lg"
            aria-label="Contact opnemen"
          >
            <span className="hidden sm:inline">{t('stickyCta.button')}</span>
            <span className="sm:hidden">{t('stickyCta.buttonMobile')}</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-primary-foreground hover:bg-primary-foreground/20"
            aria-label="Sluiten"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
