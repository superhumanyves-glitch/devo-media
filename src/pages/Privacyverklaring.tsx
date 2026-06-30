import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

interface PrivacySection {
  title: string;
  intro?: string;
  groups?: { label: string; text: string }[];
  items?: string[];
  defItems?: { term: string; text: string }[];
  note?: string;
  noteLabel?: string;
  authority?: {
    name: string;
    line: string;
    tel: string;
    websiteLabel: string;
    websiteText: string;
  };
}

const Privacyverklaring = () => {
  const { t } = useTranslation();
  const sections = t("legal.privacy.sections", { returnObjects: true }) as PrivacySection[];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={t("legal.privacy.seoTitle")}
        description={t("legal.privacy.seoDescription")}
        canonicalUrl="/privacyverklaring"
      />
      <Header />

      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">{t("legal.privacy.title")}</h1>
          <p className="text-muted-foreground mb-8 text-left">{t("legal.lastUpdate")}</p>

          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t("legal.companyHeading")}</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">{t("legal.addressLabel")}:</span> {t("legal.address")}</p>
              <p><span className="font-medium text-foreground">{t("legal.kvkShortLabel")}:</span> {t("legal.kvk")} | <span className="font-medium text-foreground">{t("legal.vatShortLabel")}:</span> {t("legal.vat")}</p>
              <p><span className="font-medium text-foreground">{t("legal.emailLabel")}:</span> {t("legal.email")} | <span className="font-medium text-foreground">{t("legal.phoneLabel")}:</span> {t("legal.phone")}</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
                <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                  {section.intro && <p>{section.intro}</p>}
                  {section.groups?.map((group, i) => (
                    <div key={i}>
                      <p className="font-medium text-foreground mb-1">{group.label}</p>
                      <p>{group.text}</p>
                    </div>
                  ))}
                  {section.defItems && (
                    <ul className="space-y-2">
                      {section.defItems.map((def, i) => (
                        <li key={i}>• <span className="font-medium text-foreground">{def.term}</span> {def.text}</li>
                      ))}
                    </ul>
                  )}
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <p className="text-xs mt-3 bg-card/50 p-3 rounded-lg">
                      {section.noteLabel && <span className="font-medium text-foreground">{section.noteLabel}</span>}{section.noteLabel ? section.note.replace(section.noteLabel, "") : section.note}
                    </p>
                  )}
                  {section.authority && (
                    <div className="bg-card/50 p-3 rounded-lg text-xs space-y-1">
                      <p className="font-medium text-foreground">{section.authority.name}</p>
                      <p>{section.authority.line}</p>
                      <p>{section.authority.tel}</p>
                      <p>{section.authority.websiteLabel} <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{section.authority.websiteText}</a></p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-muted/30 backdrop-blur-sm p-4 rounded-xl border border-border/50 mt-8">
            <p className="text-xs text-muted-foreground">
              {t("legal.rightsReserved")}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacyverklaring;
