import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Cookieverklaring = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Cookieverklaring - Devo Media"
        description="Lees hoe Devo Media cookies gebruikt en hoe u uw voorkeuren kunt beheren."
        canonicalUrl="/cookieverklaring"
      />
      <Header />
      
      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">Cookieverklaring</h1>
          <p className="text-muted-foreground mb-8 text-left">Laatste update: Oktober 2025</p>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Devo Media Agency</h2>
            <div className="text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Website:</span> www.devomedia.nl</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Wat zijn cookies?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <p>Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u onze website bezoekt. Ze helpen de website goed te functioneren en verzamelen informatie over het gebruik.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Functionele cookies (noodzakelijk)
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <p>Deze cookies zijn essentieel voor de werking van de website en kunnen niet worden uitgeschakeld.</p>
                <ul className="space-y-1">
                  <li>• Opslaan van taalvoorkeuren</li>
                  <li>• Onthouden van cookievoorkeuren</li>
                  <li>• Beveiligingscookies</li>
                </ul>
                <p className="text-xs bg-card/50 p-2 rounded">Bewaartermijn: Sessie of max. 1 jaar</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Analytische cookies
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <p>Analytische cookies helpen ons begrijpen hoe bezoekers de website gebruiken.</p>
                <div className="bg-card/50 p-3 rounded-lg space-y-2">
                  <p className="font-medium text-foreground">Google Analytics (privacy-vriendelijk)</p>
                  <ul className="space-y-1 text-xs">
                    <li>• IP-adressen worden geanonimiseerd</li>
                    <li>• Geen data-uitwisseling met andere Google-diensten</li>
                    <li>• Bewaartermijn: Max. 14 maanden</li>
                  </ul>
                </div>
                <p className="text-xs">Gebruikt voor: bezoekers meten, populaire pagina's identificeren, gebruikerservaring optimaliseren</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Marketing cookies (optioneel)
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p>Marketing cookies worden alleen geplaatst met uw toestemming.</p>
                <ul className="space-y-1">
                  <li>• Social media integraties (Facebook, Instagram, LinkedIn)</li>
                  <li>• Video embeds (YouTube, Vimeo)</li>
                  <li>• Remarketing doeleinden</li>
                </ul>
                <p className="text-xs bg-card/50 p-2 rounded">Bewaartermijn: Max. 2 jaar</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Cookies van derden
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p className="mb-2">Onze website kan embedded content bevatten van derden die hun eigen cookies plaatsen:</p>
                <div className="text-xs space-y-1">
                  <p>• <span className="font-medium text-foreground">YouTube & Google Maps:</span> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a></p>
                  <p>• <span className="font-medium text-foreground">Facebook/Instagram:</span> <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">facebook.com/privacy</a></p>
                  <p>• <span className="font-medium text-foreground">LinkedIn:</span> <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">linkedin.com/legal/privacy-policy</a></p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Hoe beheer ik cookies?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <div>
                  <p className="font-medium text-foreground mb-1">Via onze cookiebanner</p>
                  <p className="text-xs">Bij uw eerste bezoek kunt u uw voorkeuren aangeven. Deze zijn later aanpasbaar.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Via uw browser</p>
                  <ul className="text-xs space-y-1">
                    <li>• Chrome: Instellingen → Privacy en beveiliging → Cookies</li>
                    <li>• Firefox: Opties → Privacy en beveiliging → Cookies</li>
                    <li>• Safari: Voorkeuren → Privacy → Cookies</li>
                    <li>• Edge: Instellingen → Cookies en sitegegevens</li>
                  </ul>
                </div>
                <p className="text-xs italic bg-card/50 p-2 rounded">Let op: Als u alle cookies uitschakelt, kunnen bepaalde functies mogelijk niet correct werken.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Vragen over cookies?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <div className="bg-card/50 p-3 rounded-lg space-y-1 text-xs">
                  <p><span className="font-medium text-foreground">E-mail:</span> <a href="mailto:info@devomedia.nl" className="text-primary hover:underline">info@devomedia.nl</a></p>
                  <p><span className="font-medium text-foreground">Telefoon:</span> +31 6 10322231</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-muted/30 backdrop-blur-sm p-4 rounded-xl border border-border/50 mt-8">
            <p className="text-xs text-muted-foreground">
              ©️ Devo Media Agency – Alle rechten voorbehouden
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookieverklaring;
