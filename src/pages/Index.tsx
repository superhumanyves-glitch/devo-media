import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PricingCard from "@/components/PricingCard";
import ServiceCard from "@/components/ServiceCard";
import Footer from "@/components/Footer";
import LogoSlider from "@/components/LogoSlider";
import FAQ from "@/components/FAQ";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { useLocalePath } from "@/hooks/useLocalePath";
import { getStaggeredAnimationStyle } from "@/lib/animations";
import { organizationStructuredData, serviceStructuredData } from "@/lib/structuredData";
import { useEffect } from "react";
import { SkipToContent } from "@/components/SkipToContent";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { useTranslation } from "react-i18next";
import { TrustBadges } from "@/components/TrustBadges";
import { ScrollProgress } from "@/components/ScrollProgress";
import iconVideo from "@/assets/icon-video.png";
import iconCamera from "@/assets/icon-camera.png";
import iconScissors from "@/assets/icon-scissors.png";
import iconDrone from "@/assets/icon-drone.png";
import iconDocument from "@/assets/icon-document.png";
import iconEuro from "@/assets/icon-euro.png";
import iconClock from "@/assets/icon-clock.png";
import iconWebsite from "@/assets/icon-website.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const localePath = useLocalePath();
  const {
    t
  } = useTranslation();
  const [statsRef, statsInView] = useInView({
    threshold: 0.5
  });
  const [packagesRef, packagesInView] = useInView({
    threshold: 0.1
  });
  const [servicesRef, servicesInView] = useInView({
    threshold: 0.1
  });
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1
  });

  // Handle scrolling to section when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [location]);
  const clientsCount = useCountUp({
    end: 35,
    duration: 2000,
    start: 0,
    delay: statsInView ? 0 : 9999
  });
  const yearsCount = useCountUp({
    end: 7,
    duration: 2000,
    start: 0,
    delay: statsInView ? 200 : 9999
  });
  const experienceCount = useCountUp({
    end: 3,
    duration: 2000,
    start: 0,
    delay: statsInView ? 400 : 9999
  });
  const packageSocialMediaFeatures = [
    t('packages.socialMediaFeatures.contentPlanning'),
    t('packages.socialMediaFeatures.scheduling'),
    t('packages.socialMediaFeatures.captions'),
    t('packages.socialMediaFeatures.hashtags'),
    t('packages.socialMediaFeatures.stories'),
    t('packages.socialMediaFeatures.engagement'),
    t('packages.socialMediaFeatures.dmSupport'),
    t('packages.socialMediaFeatures.analyticsReport'),
    t('packages.socialMediaFeatures.contentAnalysis'),
    t('packages.socialMediaFeatures.optimization'),
  ];
  const monthlyPackages = (['starter', 'growth', 'authority'] as const).map((key) => ({
    title: t(`packages.${key}.name`),
    tagline: t(`packages.${key}.tagline`),
    videoCount: t(`packages.${key}.videoCount`),
    features: t(`packages.${key}.included`, { returnObjects: true }) as string[],
    contentTypes: t(`packages.${key}.contentTypes`, { returnObjects: true }) as string[],
    suitableFor: t(`packages.${key}.suitableFor`),
    extras: [t('packages.addOns.droneAvailable')],
    featured: key === 'growth',
    socialMediaFeatures: packageSocialMediaFeatures,
  }));
  const singleServices = [{
    icon: iconVideo,
    title: t('services.singleVideo.title'),
    price: `${t('buttons.from')} €495,99`,
    features: t('services.singleVideo.features', {
      returnObjects: true
    }) as string[]
  }, {
    icon: iconCamera,
    title: t('services.aftermovie.title'),
    price: `${t('buttons.from')} €695,99`,
    features: t('services.aftermovie.features', {
      returnObjects: true
    }) as string[]
  }, {
    icon: iconDrone,
    title: t('services.drone.title'),
    price: `${t('services.drone.from')} €595,99`,
    features: t('services.drone.features', {
      returnObjects: true
    }) as string[]
  }];
  const additionalServices = [{
    icon: iconCamera,
    title: t('services.filming.title'),
    price: `€65${t('services.filming.perHour')}`,
    features: t('services.filming.features', {
      returnObjects: true
    }) as string[]
  }, {
    icon: iconScissors,
    title: t('services.editing.title'),
    price: `€85${t('services.filming.perHour')}`,
    features: t('services.editing.features', {
      returnObjects: true
    }) as string[]
  }];
  const features = [{
    icon: iconCamera,
    title: t('whyUs.features.camera.title'),
    description: t('whyUs.features.camera.description'),
    isImage: true
  }, {
    icon: iconDrone,
    title: t('whyUs.features.drone.title'),
    description: t('whyUs.features.drone.description'),
    isImage: true
  }, {
    icon: iconDocument,
    title: t('whyUs.features.scripts.title'),
    description: t('whyUs.features.scripts.description'),
    isImage: true
  }, {
    icon: iconClock,
    title: t('whyUs.features.delivery.title'),
    description: t('whyUs.features.delivery.description'),
    isImage: true
  }, {
    icon: iconScissors,
    title: t('whyUs.features.editing.title'),
    description: t('whyUs.features.editing.description'),
    isImage: true
  }, {
    icon: iconEuro,
    title: t('whyUs.features.pricing.title'),
    description: t('whyUs.features.pricing.description'),
    isImage: true
  }];
  return <div className="min-h-screen">
      <SEO title="Devo Media - Professionele Videoproductie & Social Media Management" description="Vaste prijzen. Voorspelbare resultaten. Video's die daadwerkelijk leads opleveren. Professionele videoproductie, drone videografie en social media management in Nederland." keywords="videoproductie, social media management, drone videografie, content creatie, bedrijfsvideo's, aftermovie, FPV drone, website ontwikkeling, Nederland" canonicalUrl="/" structuredData={[organizationStructuredData, serviceStructuredData]} />
      <SkipToContent />
      <ScrollProgress />
      <StickyCtaBar />
      <Header />
      <main id="main-content">
        <Hero />

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(310,75%,38%)] via-[hsl(310,75%,45%)] to-[hsl(310,75%,55%)] bg-[length:200%_200%] animate-gradient-shift"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className={`text-center transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">{clientsCount}+</div>
              <div className="text-base sm:text-lg text-white/90">{t('stats.clients')}</div>
            </div>
            <div className={`text-center transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
              transitionDelay: '200ms'
            }}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">{yearsCount}+</div>
              <div className="text-base sm:text-lg text-white/90">{t('stats.yearsContent')}</div>
            </div>
            <div className={`text-center transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
              transitionDelay: '400ms'
            }}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">{experienceCount}+</div>
              <div className="text-base sm:text-lg text-white/90">{t('stats.yearsVideo')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Packages Section */}
      <section id="pakketten" ref={packagesRef} className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${packagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('packages.title')} <span className="text-primary">{t('packages.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('packages.subtitle')}
            </p>
          </div>

          {/* With / without social media management explainer */}
          <div className={`max-w-4xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${packagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">{t('packages.smmIntro.title')}</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-6">{t('packages.smmIntro.subtitle')}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg bg-gradient-card border border-border">
                <p className="text-sm font-semibold mb-1">{t('packages.smmIntro.withoutTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('packages.smmIntro.withoutText')}</p>
              </div>
              <div className="p-5 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-sm font-semibold mb-1 text-primary">{t('packages.smmIntro.withTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('packages.smmIntro.withText')}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-start">
            {monthlyPackages.map((pkg, index) => <div key={index} className={`transition-all duration-700 ${packagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={packagesInView ? getStaggeredAnimationStyle(index, 100) : {}}>
                <PricingCard {...pkg} />
              </div>)}
          </div>
        </div>
      </section>

      {/* Single Services Section */}
      <section id="diensten" ref={servicesRef} className="py-16 sm:py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('services.title')} <span className="text-primary">{t('services.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
            {singleServices.map((service, index) => <div key={index} className={`transition-all duration-700 ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={servicesInView ? getStaggeredAnimationStyle(index, 80) : {}}>
                <ServiceCard {...service} />
              </div>)}
          </div>

          <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl sm:text-3xl font-bold">{t('services.additionalTitle')}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => <div key={index} className={`transition-all duration-700 ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={servicesInView ? getStaggeredAnimationStyle(index + singleServices.length, 80) : {}}>
                <ServiceCard {...service} />
              </div>)}
          </div>
        </div>
      </section>

      {/* Website Services Section */}
      <section id="websites" className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('website.title')} <span className="text-primary">{t('website.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('website.subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <ServiceCard icon={iconWebsite} title={t('website.service.title')} price={`${t('website.service.from')} €995,99`} features={t('website.service.features', {
                returnObjects: true
              }) as string[]} />
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[450px] h-auto mx-auto">
                <DotLottieReact src="https://lottie.host/20648446-4f74-465b-bbde-1f150b9d30fb/RSy3xI8Pmf.lottie" loop autoplay />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="waarom" ref={featuresRef} className="py-16 sm:py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('whyUs.title')}<br />
              <span className="text-primary font-extrabold whitespace-nowrap">{t('whyUs.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('whyUs.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => <div key={index} className={`p-4 sm:p-6 bg-gradient-card border border-border rounded-lg hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg group ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={featuresInView ? getStaggeredAnimationStyle(index, 100) : {}}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section - Portfolio & Results */}
      

      {/* Logo Slider Section */}
      <LogoSlider />

      {/* Portfolio Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t('portfolio.convinced')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('portfolio.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="shadow-glow" onClick={() => navigate(localePath("/video-readiness-assessment"))}>
                {t('portfolio.freeAssessment')}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(localePath("/portfolio"))}>
                {t('portfolio.viewPortfolio')}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(localePath("/resultaten"))}>
                {t('portfolio.viewResults')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Slider Section */}
      

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('cta.subtitle')}
            </p>
            <TrustBadges />
            <Button size="lg" className="shadow-glow mt-6" onClick={() => window.dispatchEvent(new CustomEvent('openContactForm', {
              detail: {
                service: ''
              }
            }))}>
              {t('cta.button')} <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>;
};
export default Index;