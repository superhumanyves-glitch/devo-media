import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { organizationStructuredData } from "@/lib/structuredData";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useTranslation, Trans } from "react-i18next";
import aboutPhoto from "@/assets/about-photo.jpg";
import bryanWorking from "@/assets/bryan-working.png";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t('aboutPage.seoTitle')}
        description={t('aboutPage.seoDescription')}
        keywords={t('aboutPage.seoKeywords')}
        canonicalUrl="/about"
        structuredData={organizationStructuredData}
      />
      <ScrollProgress />
      <StickyCtaBar />
      <Header />

      <main className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{t('aboutPage.title')}</h1>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Bryan Marquez</p>
              <p className="text-lg sm:text-xl text-muted-foreground">{t('aboutPage.role')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 md:order-1 min-w-0">
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                <p>{t('aboutPage.para1')}</p>

                <p>{t('aboutPage.para2')}</p>

                <p>
                  <Trans
                    i18nKey="aboutPage.para3"
                    components={{
                      hl: <span className="text-primary font-semibold" />,
                      b: <span className="font-bold" />,
                    }}
                  />
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                <img
                  src={aboutPhoto}
                  alt="About Devo Media"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 md:order-1 min-w-0">
              <div className="bg-gradient-card border border-border rounded-2xl p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6">{t('aboutPage.devoTitle')}</h2>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                  <p>
                    <Trans i18nKey="aboutPage.devoPara1" components={{ b: <span className="font-bold" /> }} />
                  </p>

                  <p>
                    <Trans i18nKey="aboutPage.devoPara2" components={{ b: <span className="font-bold" /> }} />
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <img
                src={bryanWorking}
                alt="Bryan from Devo Media filming on location"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
