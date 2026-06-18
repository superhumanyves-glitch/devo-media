import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AlgemeneVoorwaarden = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Algemene Voorwaarden - Devo Media"
        description="Lees de algemene voorwaarden van Devo Media voor onze diensten en samenwerking."
        canonicalUrl="/algemene-voorwaarden"
      />
      <Header />
      
      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">Algemene Voorwaarden</h1>
          <p className="text-muted-foreground mb-8 text-left">Laatste update: Oktober 2025</p>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Devo Media Agency</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">Vestigingsadres:</span> Gelderse Rooslaan 13-4, 6841BA Arnhem</p>
              <p><span className="font-medium text-foreground">KvK-nummer:</span> 90330706</p>
              <p><span className="font-medium text-foreground">BTW-nummer:</span> NL004808059B18</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 1 – Definities
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <p>In deze algemene voorwaarden wordt verstaan onder:</p>
                <ul className="space-y-2">
                  <li><span className="font-medium text-foreground">Opdrachtnemer:</span> Devo Media Agency, gevestigd te Arnhem, ingeschreven bij de Kamer van Koophandel onder nummer 90330706.</li>
                  <li><span className="font-medium text-foreground">Opdrachtgever:</span> De natuurlijke persoon of rechtspersoon die een overeenkomst sluit met Devo Media Agency.</li>
                  <li><span className="font-medium text-foreground">Overeenkomst:</span> Iedere overeenkomst tussen Opdrachtgever en Opdrachtnemer betreffende levering van diensten.</li>
                  <li><span className="font-medium text-foreground">Diensten:</span> Alle werkzaamheden die Devo Media Agency aanbiedt, waaronder social-media-beheer, contentcreatie, videografie en website-ontwikkeling.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 2 – Toepasselijkheid
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, overeenkomsten en werkzaamheden uitgevoerd door Devo Media Agency.</li>
                  <li>• Afwijkingen van deze voorwaarden zijn slechts geldig indien deze schriftelijk door beide partijen zijn bevestigd.</li>
                  <li>• Eventuele inkoop- of andere voorwaarden van de Opdrachtgever worden uitdrukkelijk van de hand gewezen.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 3 – Offertes en overeenkomsten
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Alle offertes zijn vrijblijvend en geldig gedurende 14 dagen na dagtekening, tenzij anders vermeld.</li>
                  <li>• Een overeenkomst komt tot stand zodra de offerte schriftelijk of via e-mail door de Opdrachtgever is bevestigd.</li>
                  <li>• Prijzen zijn exclusief btw, tenzij anders vermeld.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 4 – Betalingsvoorwaarden
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan, tenzij schriftelijk anders overeengekomen.</li>
                  <li>• Voor grotere projecten geldt een aanbetalingsregeling van 40% vooraf en 60% na oplevering.</li>
                  <li>• Bij te late betaling wordt na herinnering een boete van €25,- in rekening gebracht (na 5 dagen).</li>
                  <li>• Alle incassokosten komen voor rekening van de Opdrachtgever.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 5 – Uitvoering van de opdracht
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Devo Media Agency voert alle opdrachten naar beste inzicht en vermogen uit.</li>
                  <li>• Opdrachtnemer heeft het recht bepaalde werkzaamheden te laten uitvoeren door derden.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 6 – Rechten op materiaal en intellectueel eigendom
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Alle gecreëerde materialen blijven eigendom van Devo Media Agency tot volledige betaling.</li>
                  <li>• Na betaling verkrijgt de Opdrachtgever een niet-exclusieve licentie voor overeengekomen doeleinden.</li>
                  <li>• Bewerken of doorverkopen is niet toegestaan zonder schriftelijke toestemming.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 7 – Annulering en wijzigingen
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Annulering dient schriftelijk te gebeuren.</li>
                  <li>• Bij annulering na bevestiging worden reeds gemaakte kosten in rekening gebracht.</li>
                  <li>• Wijzigingen kunnen leiden tot aanpassing van prijs en/of levertijd.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 8 – Revisies
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Maximaal twee revisierondes inbegrepen per project (tenzij anders overeengekomen).</li>
                  <li>• Extra revisies kunnen afzonderlijk in rekening worden gebracht.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 9 – Levering en termijnen
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Opgegeven levertijden zijn indicatief en geen fatale termijnen.</li>
                  <li>• Devo Media Agency is niet aansprakelijk voor vertragingen door te late aanlevering.</li>
                  <li>• Na levering is Opdrachtgever verantwoordelijk voor correct gebruik.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 10 – Aansprakelijkheid
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Geen aansprakelijkheid tenzij sprake van opzet of grove nalatigheid.</li>
                  <li>• Aansprakelijkheid beperkt tot gefactureerd bedrag, max. €2.500,-.</li>
                  <li>• Geen aansprakelijkheid voor indirecte schade.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 11 – Opnames en dronewerkzaamheden
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Devo Media Agency houdt zich aan alle veiligheidsvoorschriften.</li>
                  <li>• Opdrachtgever is verantwoordelijk voor locatietoestemmingen en vergunningen.</li>
                  <li>• Geen aansprakelijkheid voor schade door ontbrekende toestemmingen.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 12 – Privacy en gegevensbescherming
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Persoonsgegevens worden verwerkt conform AVG.</li>
                  <li>• Gegevens worden niet gedeeld met derden tenzij noodzakelijk.</li>
                  <li>• Passende beveiligingsmaatregelen zijn van toepassing.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 13 – Tarieven en prijswijzigingen
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Tarieven kunnen periodiek worden gewijzigd.</li>
                  <li>• Lopende offertes blijven geldig gedurende geldigheidstermijn.</li>
                  <li>• Prijzen onder voorbehoud van typefouten.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 14 – Overmacht
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <p>In geval van overmacht (ziekte, technische storingen, natuurrampen, etc.) heeft Devo Media Agency het recht de uitvoering op te schorten of de overeenkomst te ontbinden zonder schadevergoeding.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Artikel 15 – Toepasselijk recht en geschillen
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Nederlands recht is van toepassing.</li>
                  <li>• Geschillen worden voorgelegd aan de bevoegde rechter in Arnhem.</li>
                </ul>
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

export default AlgemeneVoorwaarden;
