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
import { Fragment } from "react";

interface DisclaimerSection {
  title: string;
  intro?: string;
  paragraph?: string;
  trailing?: string;
  groups?: { label: string; text: string }[];
  items?: string[];
  noteLink?: { text: string; href: string };
  contactBox?: boolean;
}

// Render a string that may contain a single <b>...</b> emphasis.
const withBold = (text: string) =>
  text.split(/<b>(.*?)<\/b>/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-medium text-foreground">{part}</span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

// Render a string that may contain a single <lnk>...</lnk> link.
const withLink = (text: string, href: string) =>
  text.split(/<lnk>(.*?)<\/lnk>/g).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={href} className="text-primary hover:underline">{part}</a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

const Disclaimer = () => {
  const { t } = useTranslation();
  const sections = t("legal.disclaimer.sections", { returnObjects: true }) as DisclaimerSection[];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={t("legal.disclaimer.seoTitle")}
        description={t("legal.disclaimer.seoDescription")}
        canonicalUrl="/disclaimer"
      />
      <Header />

      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">{t("legal.disclaimer.title")}</h1>
          <p className="text-muted-foreground mb-8 text-left">{t("legal.lastUpdate")}</p>

          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t("legal.companyHeading")}</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">{t("legal.addressLabel")}:</span> {t("legal.address")}</p>
              <p><span className="font-medium text-foreground">{t("legal.kvkShortLabel")}:</span> {t("legal.kvk")} | <span className="font-medium text-foreground">{t("legal.websiteLabel")}:</span> {t("legal.website")}</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
                <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                  {section.intro && <p>{withBold(section.intro)}</p>}
                  {section.groups?.map((group, i) => (
                    <div key={i}>
                      <p className="font-medium text-foreground mb-1">{group.label}</p>
                      <p>{group.text}</p>
                    </div>
                  ))}
                  {section.paragraph && <p>{withBold(section.paragraph)}</p>}
                  {section.items && (
                    <ul className="space-y-1 text-xs">
                      {section.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  )}
                  {section.trailing && <p className="text-xs">{section.trailing}</p>}
                  {section.noteLink && (
                    <p className="text-xs bg-card/50 p-2 rounded">
                      {withLink(section.noteLink.text, section.noteLink.href)}
                    </p>
                  )}
                  {section.contactBox && (
                    <div className="bg-card/50 p-3 rounded-lg space-y-1 text-xs">
                      <p className="font-medium text-foreground">{t("legal.companyHeading")}</p>
                      <p>{t("legal.address")}</p>
                      <p>{t("legal.kvkShortLabel")}: {t("legal.kvk")} | {t("legal.vatShortLabel")}: {t("legal.vat")}</p>
                      <p>{t("legal.emailLabel")}: <a href={`mailto:${t("legal.email")}`} className="text-primary hover:underline">{t("legal.email")}</a></p>
                      <p>{t("legal.phoneLabel")}: {t("legal.phone")}</p>
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

export default Disclaimer;
