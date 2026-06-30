import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslation, Trans } from "react-i18next";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const localePath = useLocalePath();
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-card border-2 border-border rounded-lg shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {t('cookieBanner.title')}
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            <Trans
              i18nKey="cookieBanner.text"
              components={{
                lnk: (
                  <Link
                    to={localePath("/cookieverklaring")}
                    className="underline hover:text-primary font-medium text-foreground"
                  />
                ),
              }}
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1"
            >
              {t('cookieBanner.decline')}
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1"
            >
              {t('cookieBanner.accept')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
