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

interface CookieSection {
  title: string;
  intro?: string;
  items?: string[];
  note?: string;
  trailing?: string;
  italicNote?: string;
  subBox?: { label: string; items: string[] };
  links?: { term: string; linkText: string; href: string }[];
  groups?: { label: string; text?: string; items?: string[] }[];
  contactBox?: { emailLabel: string; email: string; phoneLabel: string; phone: string };
}

const Cookieverklaring = () => {
  const { t } = useTranslation();
  const sections = t("legal.cookies.sections", { returnObjects: true }) as CookieSection[];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={t("legal.cookies.seoTitle")}
        description={t("legal.cookies.seoDescription")}
        canonicalUrl="/cookieverklaring"
      />
      <Header />

      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">{t("legal.cookies.title")}</h1>
          <p className="text-muted-foreground mb-8 text-left">{t("legal.lastUpdate")}</p>

          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">{t("legal.companyHeading")}</h2>
            <div className="text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">{t("legal.websiteLabel")}:</span> {t("legal.website")}</p>
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
                      {group.text && <p className="text-xs">{group.text}</p>}
                      {group.items && (
                        <ul className="text-xs space-y-1">
                          {group.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {section.subBox && (
                    <div className="bg-card/50 p-3 rounded-lg space-y-2">
                      <p className="font-medium text-foreground">{section.subBox.label}</p>
                      <ul className="space-y-1 text-xs">
                        {section.subBox.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {section.items && (
                    <ul className="space-y-1">
                      {section.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  )}
                  {section.trailing && <p className="text-xs">{section.trailing}</p>}
                  {section.links && (
                    <div className="text-xs space-y-1">
                      {section.links.map((link, i) => (
                        <p key={i}>• <span className="font-medium text-foreground">{link.term}</span> <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{link.linkText}</a></p>
                      ))}
                    </div>
                  )}
                  {section.italicNote && (
                    <p className="text-xs italic bg-card/50 p-2 rounded">{section.italicNote}</p>
                  )}
                  {section.note && (
                    <p className="text-xs bg-card/50 p-2 rounded">{section.note}</p>
                  )}
                  {section.contactBox && (
                    <div className="bg-card/50 p-3 rounded-lg space-y-1 text-xs">
                      <p><span className="font-medium text-foreground">{section.contactBox.emailLabel}</span> <a href={`mailto:${section.contactBox.email}`} className="text-primary hover:underline">{section.contactBox.email}</a></p>
                      <p><span className="font-medium text-foreground">{section.contactBox.phoneLabel}</span> {section.contactBox.phone}</p>
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

export default Cookieverklaring;
