import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LocaleWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Detect language from URL path
    const pathParts = location.pathname.split('/');
    const localeFromPath = pathParts[1];
    
    if (localeFromPath === 'en') {
      if (i18n.language !== 'en') {
        i18n.changeLanguage('en');
      }
    } else {
      if (i18n.language !== 'nl') {
        i18n.changeLanguage('nl');
      }
    }
  }, [location.pathname, i18n]);

  return <>{children}</>;
};
