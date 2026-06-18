import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PricingCardProps {
  title: string;
  videoCount: string;
  features: string[];
  extras: string[];
  featured?: boolean;
  socialMediaFeatures?: string[];
}

const PricingCard = ({
  title,
  videoCount,
  features,
  extras,
  featured = false,
  socialMediaFeatures = [],
}: PricingCardProps) => {
  const [includeSocialMedia, setIncludeSocialMedia] = useState(false);
  const { t } = useTranslation();

  const scrollToContact = () => {
    // Map package numbers to proper names
    const packageMap: Record<string, string> = {
      'Pakket 1': 'Maandelijks Pakket - Starter',
      'Pakket 2': 'Maandelijks Pakket - Professional',
      'Pakket 3': 'Maandelijks Pakket - Premium',
    };
    
    const baseName = packageMap[title] || title;
    const serviceName = includeSocialMedia ? `${baseName} (met Social Media Management)` : baseName;
    
    // Dispatch custom event to open form with pre-selected package
    window.dispatchEvent(
      new CustomEvent('openContactForm', {
        detail: { service: serviceName }
      })
    );
  };

  return (
    <Card
      className={`relative p-6 sm:p-8 bg-gradient-card border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow group ${
        featured ? "border-primary/60 shadow-sm" : "border-border hover:border-primary/50"
      }`}
    >
      {featured && (
        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary/90 text-primary-foreground text-xs px-3 py-0.5">
          {t('buttons.popular')}
        </Badge>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2" id={`package-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">{videoCount}</p>
      </div>

      {/* Social Media Toggle Section */}
      {socialMediaFeatures.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">{t('packages.socialMedia')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              {includeSocialMedia ? t('buttons.withSocialMedia') : t('buttons.videoOnly')}
            </span>
            <Switch
              checked={includeSocialMedia}
              onCheckedChange={setIncludeSocialMedia}
            />
          </div>

          {includeSocialMedia && (
            <div className="space-y-2 mt-4 pt-4 border-t border-primary/20 animate-fade-in">
              {socialMediaFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {extras.length > 0 && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-semibold mb-2">{t('buttons.extraOptions')}</p>
            {extras.map((extra, index) => (
              <div key={index} className="flex items-start gap-2 mb-1">
                <span className="text-sm text-muted-foreground">{extra}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button 
        variant={featured ? "default" : "outline"} 
        className="w-full"
        onClick={scrollToContact}
      >
        {t('buttons.selectPackage')}
      </Button>
    </Card>
  );
};

export default PricingCard;
