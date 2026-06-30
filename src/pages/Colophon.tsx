import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslation } from "react-i18next";

const Colophon = () => {
  const localePath = useLocalePath();
  const { t } = useTranslation();
  const services = t('colophon.servicesList', { returnObjects: true }) as { name: string; desc: string }[];

  return (
    <div className="min-h-screen flex flex-col">
        <SEO
          title={t('colophon.seoTitle')}
          description={t('colophon.seoDescription')}
          canonicalUrl="/colophon"
        />
        <Header />

        <main className="flex-grow bg-background pt-24">
          <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">{t('colophon.title')}</h1>
            <p className="text-muted-foreground mb-8 text-left">{t('colophon.subtitle')}</p>

            <div className="space-y-6">
              <section className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-foreground text-left">{t('colophon.companyInfo')}</h2>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">{t('colophon.officialName')}:</span> Devo Media Agency</p>
                  <p><span className="font-medium text-foreground">{t('colophon.address')}:</span> Gelderse Rooslaan 13-4, 6841BA Arnhem</p>
                  <p><span className="font-medium text-foreground">{t('colophon.kvk')}:</span> 90330706</p>
                  <p><span className="font-medium text-foreground">{t('colophon.vat')}:</span> NL004808059B18</p>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-4 text-foreground text-left">{t('colophon.contact')}</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-medium mb-2 text-foreground text-left">{t('colophon.generalQuestions')}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:info@devomedia.nl" className="text-primary hover:underline">info@devomedia.nl</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href="tel:+31610322231" className="text-primary hover:underline">+31 6 10322231</a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium mb-2 text-foreground text-left">{t('colophon.socialMedia')}</h3>
                    <div className="flex gap-4 text-sm">
                      <a href="https://www.instagram.com/devomediaagency/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="w-4 h-4" />
                        <span>@devomediaagency</span>
                      </a>
                      <a href="https://nl.linkedin.com/in/bryan-marquez-744799271" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t('colophon.services')}</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {services.map((service) => (
                    <li key={service.name}>
                      <span className="font-medium text-foreground">{service.name}</span> – {service.desc}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t('colophon.openingHours')}</h2>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><span className="font-medium text-foreground">{t('colophon.officeHours')}:</span> {t('colophon.officeHoursValue')}</p>
                  <p><span className="font-medium text-foreground">{t('colophon.emailPhone')}:</span> {t('colophon.emailPhoneValue')}</p>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t('colophon.legalDocs')}</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link to={localePath("/algemene-voorwaarden")} className="text-primary hover:underline">{t('footer.terms')}</Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to={localePath("/privacyverklaring")} className="text-primary hover:underline">{t('footer.privacy')}</Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to={localePath("/cookieverklaring")} className="text-primary hover:underline">{t('footer.cookies')}</Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to={localePath("/disclaimer")} className="text-primary hover:underline">{t('footer.disclaimer')}</Link>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t('colophon.ratesPayments')}</h2>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">{t('colophon.paymentTerm')}:</span> {t('colophon.paymentTermValue')}</p>
                  <p><span className="font-medium text-foreground">{t('colophon.deposit')}:</span> {t('colophon.depositValue')}</p>
                  <p><span className="font-medium text-foreground">{t('colophon.paymentMethods')}:</span> {t('colophon.paymentMethodsValue')}</p>
                </div>
              </section>

              <div className="bg-muted/30 backdrop-blur-sm p-4 rounded-xl border border-border/50">
                <p className="text-xs text-muted-foreground">
                  {t('colophon.rightsReserved')}
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Colophon;
