import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Disclaimer - Devo Media"
        description="Lees de disclaimer van Devo Media over het gebruik van onze website en diensten."
        canonicalUrl="/disclaimer"
      />
      <Header />
      
      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">Disclaimer</h1>
          <p className="text-muted-foreground mb-8 text-left">Laatste update: Oktober 2025</p>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Devo Media Agency</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">Vestigingsadres:</span> Gelderse Rooslaan 13-4, 6841BA Arnhem</p>
              <p><span className="font-medium text-foreground">KvK:</span> 90330706 | <span className="font-medium text-foreground">Website:</span> www.devomedia.nl</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Algemeen
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <p>Deze disclaimer is van toepassing op de website en alle diensten van Devo Media Agency. Door gebruik te maken van onze website en/of diensten, gaat u akkoord met deze disclaimer.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Inhoud website
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <div>
                  <p className="font-medium text-foreground mb-1">Zorgvuldigheid</p>
                  <p>Wij streven ernaar informatie actueel, volledig en juist te houden. Ondanks deze zorg kunnen er onjuistheden voorkomen.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Geen garantie</p>
                  <p>Wij bieden geen garantie met betrekking tot juistheid of volledigheid. Gebruik is voor eigen risico.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Wijzigingen</p>
                  <p>Wij behouden ons het recht voor de inhoud op elk moment te wijzigen zonder voorafgaande kennisgeving.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Intellectueel eigendom
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p>Alle content op deze website is eigendom van Devo Media Agency en beschermd door auteursrecht.</p>
                <ul className="space-y-1 text-xs">
                  <li>• Kopiëren, verspreiden of openbaar maken is niet toegestaan</li>
                  <li>• Content wijzigen of bewerken is verboden</li>
                  <li>• Commercieel gebruik vereist schriftelijke toestemming</li>
                  <li>• Portfoliomateriaal blijft eigendom van Devo Media Agency</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Links naar externe websites
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p>Deze website kan links bevatten naar websites van derden. Wij hebben geen controle over deze websites en zijn niet verantwoordelijk voor hun inhoud of diensten. Bezoeken gebeurt voor eigen risico.</p>
                <p className="text-xs bg-card/50 p-2 rounded">Foute link gevonden? Meld dit via <a href="mailto:info@devomedia.nl" className="text-primary hover:underline">info@devomedia.nl</a></p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Aansprakelijkheid
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <div>
                  <p className="font-medium text-foreground mb-1">Uitsluiting schade</p>
                  <p>Devo Media Agency is niet aansprakelijk voor schade voortvloeiend uit gebruik van de website, tenzij sprake van opzet of grove schuld.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Maximale aansprakelijkheid</p>
                  <p>Totale aansprakelijkheid beperkt tot gefactureerd bedrag, met een maximum van € 2.500,-</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Indirecte schade</p>
                  <p>Geen aansprakelijkheid voor gevolgschade, gederfde winst, gemiste besparingen of reputatieschade.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Dienstverlening
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p>Devo Media Agency werkt op basis van een <span className="font-medium text-foreground">inspanningsverplichting</span>, niet op basis van een resultaatverplichting.</p>
                <p className="text-xs">Wij geven geen garanties over specifieke resultaten zoals groei in volgers, website verkeer of omzetgroei. De effectiviteit is afhankelijk van externe factoren.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Technische aspecten
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p>Wij streven naar continue beschikbaarheid, maar kunnen niet garanderen:</p>
                <ul className="space-y-1 text-xs">
                  <li>• 24/7 uptime</li>
                  <li>• Foutloze werking</li>
                  <li>• Afwezigheid van virussen of malware</li>
                </ul>
                <p className="text-xs mt-2">De website kan tijdelijk onbeschikbaar zijn voor onderhoud of updates.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Toepasselijk recht
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <p>Op deze disclaimer en het gebruik van de website is uitsluitend <span className="font-medium text-foreground">Nederlands recht</span> van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Arnhem.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Contact
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <div className="bg-card/50 p-3 rounded-lg space-y-1 text-xs">
                  <p className="font-medium text-foreground">Devo Media Agency</p>
                  <p>Gelderse Rooslaan 13-4, 6841BA Arnhem</p>
                  <p>KvK: 90330706 | BTW: NL004808059B18</p>
                  <p>E-mail: <a href="mailto:info@devomedia.nl" className="text-primary hover:underline">info@devomedia.nl</a></p>
                  <p>Tel: +31 6 10322231</p>
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

export default Disclaimer;
