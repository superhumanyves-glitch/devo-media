import logo from "@/assets/devo-logo.png";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/hooks/useLocalePath";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const isHomePage = location.pathname === '/' || location.pathname === '/en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate(localePath('/'), { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300 pt-3 sm:pt-2 ${
      scrolled ? 'py-2 shadow-lg' : 'py-3 sm:py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to={localePath("/")} className="transition-transform duration-300 hover:scale-105">
          <img 
            src={logo} 
            alt="Devo Media" 
            className={`cursor-pointer transition-all duration-300 ${
              scrolled ? 'h-12 sm:h-14' : 'h-16 sm:h-20'
            }`}
          />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('pakketten')} 
            className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
          >
            {t('header.packages')}
          </button>
          <button 
            onClick={() => scrollToSection('diensten')} 
            className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
          >
            {t('header.services')}
          </button>
          <button 
            onClick={() => scrollToSection('waarom')} 
            className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
          >
            {t('header.whyUs')}
          </button>
          <Link to={localePath("/portfolio")}>
            <button className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105">
              {t('header.portfolio')}
            </button>
          </Link>
          <Link to={localePath("/video-readiness-assessment")}>
            <button className="text-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105">
              {t('header.freeAssessment')}
            </button>
          </Link>
          <Link to={localePath("/about")}>
            <button className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105">
              {t('header.about')}
            </button>
          </Link>
          <LanguageSwitcher />
          <Button 
            variant="default" 
            size="sm"
            onClick={() => window.dispatchEvent(new CustomEvent('openContactForm', { detail: { service: '' } }))}
          >
            {t('header.contact')}
          </Button>
        </nav>

        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] animate-slide-in-right">
            <SheetHeader>
              <SheetTitle>{t('header.menu')}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 mt-8">
              <button 
                onClick={() => scrollToSection('pakketten')} 
                className="text-lg text-foreground hover:text-primary transition-all duration-200 text-left hover:translate-x-2 animate-slide-in-left"
                style={{ animationDelay: '0ms' }}
              >
                {t('header.packages')}
              </button>
              <button 
                onClick={() => scrollToSection('diensten')} 
                className="text-lg text-foreground hover:text-primary transition-all duration-200 text-left hover:translate-x-2 animate-slide-in-left"
                style={{ animationDelay: '50ms' }}
              >
                {t('header.services')}
              </button>
              <button 
                onClick={() => scrollToSection('waarom')} 
                className="text-lg text-foreground hover:text-primary transition-all duration-200 text-left hover:translate-x-2 animate-slide-in-left"
                style={{ animationDelay: '100ms' }}
              >
                {t('header.whyUs')}
              </button>
              <Link to={localePath("/portfolio")} onClick={() => setMobileMenuOpen(false)}>
                <button className="text-lg text-foreground hover:text-primary transition-all duration-200 text-left w-full hover:translate-x-2 animate-slide-in-left" style={{ animationDelay: '150ms' }}>
                  {t('header.portfolio')}
                </button>
              </Link>
              <Link to={localePath("/video-readiness-assessment")} onClick={() => setMobileMenuOpen(false)}>
                <button className="text-lg text-foreground hover:text-primary transition-all duration-200 text-left w-full font-medium hover:translate-x-2 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                  {t('header.freeAssessment')}
                </button>
              </Link>
              <Link to={localePath("/about")} onClick={() => setMobileMenuOpen(false)}>
                <button className="text-lg text-foreground hover:text-primary transition-all duration-200 text-left w-full hover:translate-x-2 animate-slide-in-left" style={{ animationDelay: '250ms' }}>
                  {t('header.about')}
                </button>
              </Link>
              <div className="animate-slide-in-left" style={{ animationDelay: '300ms' }}>
                <LanguageSwitcher />
              </div>
              <Button 
                variant="default" 
                size="lg"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('openContactForm', { detail: { service: '' } }));
                  setMobileMenuOpen(false);
                }}
                className="mt-4 animate-bounce-in"
                style={{ animationDelay: '350ms' }}
              >
                {t('header.contact')}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
