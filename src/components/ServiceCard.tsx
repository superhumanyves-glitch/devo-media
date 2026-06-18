import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface AlternativeOption {
  price: string;
  features: string[];
  isSpecialOffer?: boolean;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  price: string;
  features: string[];
  extras?: string[];
  specialOffer?: boolean;
  alternativeOption?: AlternativeOption;
}

const ServiceCard = ({ icon, title, price, features, extras, specialOffer, alternativeOption }: ServiceCardProps) => {
  const [isAlternative, setIsAlternative] = useState(false);
  const { t } = useTranslation();
  
  const scrollToContact = () => {
    // Determine the service name based on whether alternative is selected
    let serviceName = title;
    if (title === "Drone/FPV Video" && alternativeOption) {
      serviceName = isAlternative 
        ? "FPV Drone Video (30 min filmen, 1-4 uur editen)" 
        : "Drone/FPV Video";
    }
    
    // Dispatch custom event to open form with pre-selected service
    window.dispatchEvent(
      new CustomEvent('openContactForm', {
        detail: { service: serviceName }
      })
    );
  };

  const currentPrice = isAlternative && alternativeOption ? alternativeOption.price : price;
  const currentFeatures = isAlternative && alternativeOption ? alternativeOption.features : features;
  const currentSpecialOffer = isAlternative && alternativeOption ? alternativeOption.isSpecialOffer : specialOffer;

  return (
    <Card className="p-4 sm:p-6 bg-gradient-card border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow group relative">
      {currentSpecialOffer && (
        <Badge className="absolute -top-3 -right-3 bg-primary text-white shadow-glow animate-pulse-glow">
          <Zap className="w-3 h-3 mr-1" />
          {t('buttons.specialOffer')}
        </Badge>
      )}
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <img src={icon} alt={title} className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
          <p className="text-xl sm:text-2xl font-bold text-primary">{currentPrice}</p>
        </div>
      </div>

      {alternativeOption && (
        <div className="relative mb-4 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
          {/* Eye-catching label */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-bold text-primary">
              {t('buttons.discoverOffer')}
            </span>
            <Zap className="w-4 h-4 text-primary animate-pulse" />
          </div>
          
          {/* Switch with labels */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isAlternative ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('buttons.regular')}
            </span>
            <Switch 
              checked={isAlternative} 
              onCheckedChange={setIsAlternative}
            />
            <span className={`text-sm font-medium transition-colors ${isAlternative ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
              {t('buttons.specialOffer')}
            </span>
          </div>
          
          {/* Savings indicator when switched */}
          {isAlternative && (
            <div className="mt-2 text-center animate-fade-in">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {t('buttons.saveAmount')}
              </Badge>
            </div>
          )}
        </div>
      )}

      <ul className="space-y-2 mb-6">
        {currentFeatures.map((feature, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {extras && extras.length > 0 && (
        <div className="pt-4 border-t border-border mb-4">
          <p className="text-sm font-semibold mb-2">{t('buttons.extra')}</p>
          {extras.map((extra, index) => (
            <p key={index} className="text-sm text-muted-foreground">{extra}</p>
          ))}
        </div>
      )}

      <Button variant="outline" className="w-full" onClick={scrollToContact}>
        {t('buttons.requestQuote')}
      </Button>
    </Card>
  );
};

export default ServiceCard;
