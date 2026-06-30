import logo from "@/assets/devo-logo.png";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/hooks/useLocalePath";

const Footer = () => {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  return (
    <footer className="relative bg-secondary border-t border-border py-12 pb-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <img src={logo} alt="Devo Media" className="h-16" />
          
          <div className="text-center">
            <p className="text-foreground font-bold mb-2">Devo Media Agency</p>
            <p className="text-sm text-muted-foreground">
              {t('footerTagline')}
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://nl.linkedin.com/in/bryan-marquez-744799271" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://www.instagram.com/devomediaagency/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.facebook.com/DevoMediaAgency/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link to={localePath("/algemene-voorwaarden")} className="hover:text-primary transition-colors font-bold">{t('footer.terms')}</Link>
            <Link to={localePath("/privacyverklaring")} className="hover:text-primary transition-colors font-bold">{t('footer.privacy')}</Link>
            <Link to={localePath("/cookieverklaring")} className="hover:text-primary transition-colors font-bold">{t('footer.cookies')}</Link>
            <Link to={localePath("/disclaimer")} className="hover:text-primary transition-colors font-bold">{t('footer.disclaimer')}</Link>
            <Link to={localePath("/colophon")} className="hover:text-primary transition-colors font-bold">{t('footer.contact')}</Link>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} <span className="font-bold">Devo Media</span>. {t('footer.rights')}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Mede mogelijk gemaakt door{' '}
            <a 
              href="https://versareconsulting.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-semibold"
            >
              Versare Consulting
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
