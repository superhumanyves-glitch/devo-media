import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Privacyverklaring = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Privacyverklaring - Devo Media"
        description="Lees de privacyverklaring van Devo Media over hoe wij omgaan met uw persoonsgegevens."
        canonicalUrl="/privacyverklaring"
      />
      <Header />
      
      <main className="flex-grow bg-background pt-24">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">Privacyverklaring</h1>
          <p className="text-muted-foreground mb-8 text-left">Laatste update: Oktober 2025</p>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Devo Media Agency</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">Vestigingsadres:</span> Gelderse Rooslaan 13-4, 6841BA Arnhem</p>
              <p><span className="font-medium text-foreground">KvK:</span> 90330706 | <span className="font-medium text-foreground">BTW:</span> NL004808059B18</p>
              <p><span className="font-medium text-foreground">E-mail:</span> info@devomedia.nl | <span className="font-medium text-foreground">Tel:</span> +31 6 10322231</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Welke gegevens verzamelen wij?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <div>
                  <p className="font-medium text-foreground mb-1">Contactgegevens</p>
                  <p>Naam, e-mail, telefoon, bedrijfsnaam en adres</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Zakelijke gegevens</p>
                  <p>KvK-nummer, BTW-nummer, facturerings- en betalingsgegevens</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Projectgegevens</p>
                  <p>Communicatie, content, materialen en beeldmateriaal</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Technische gegevens</p>
                  <p>IP-adres, browsertype en gebruiksgegevens website</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Waarom verwerken wij uw gegevens?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <div>
                  <p className="font-medium text-foreground mb-1">Uitvoering overeenkomst</p>
                  <p>Leveren van diensten, communicatie, facturering en betaling</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Wettelijke verplichtingen</p>
                  <p>Boekhoudkundige en fiscale verplichtingen</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Gerechtvaardigd belang</p>
                  <p>Marketing, verbetering dienstverlening, website-analyse</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Toestemming</p>
                  <p>Gebruik beeldmateriaal voor portfolio en marketing e-mails</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Hoe lang bewaren wij uw gegevens?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• <span className="font-medium text-foreground">Klantgegevens:</span> 7 jaar na afloop opdracht (fiscaal)</li>
                  <li>• <span className="font-medium text-foreground">Projectgegevens:</span> Looptijd project + 1 jaar</li>
                  <li>• <span className="font-medium text-foreground">Beeldmateriaal:</span> Tot bezwaar of intrekking toestemming</li>
                  <li>• <span className="font-medium text-foreground">Marketing:</span> Tot afmelding of bezwaar</li>
                  <li>• <span className="font-medium text-foreground">Website analytics:</span> Geanonimiseerd na 14 maanden</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Met wie delen wij uw gegevens?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
                <div>
                  <p className="font-medium text-foreground mb-1">Verwerkers</p>
                  <p>Hosting providers, cloud opslag, boekhoudprogramma's, betalingsproviders, e-mailmarketing tools</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Derden</p>
                  <p>Accountant, belastingadviseur, juridische adviseurs, overheidsinstanties (indien verplicht)</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Hoe beveiligen wij uw gegevens?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• Beveiligde (SSL) verbindingen</li>
                  <li>• Sterke wachtwoorden en regelmatige updates</li>
                  <li>• Beperkte toegang (need-to-know basis)</li>
                  <li>• Regelmatige back-ups</li>
                  <li>• Versleuteling van gevoelige bestanden</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Wat zijn uw rechten?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2 pt-2">
                <ul className="space-y-2">
                  <li>• <span className="font-medium text-foreground">Recht op inzage:</span> Vraag welke gegevens wij van u verwerken</li>
                  <li>• <span className="font-medium text-foreground">Recht op rectificatie:</span> Laat onjuiste gegevens corrigeren</li>
                  <li>• <span className="font-medium text-foreground">Recht op verwijdering:</span> Vraag verwijdering van uw gegevens</li>
                  <li>• <span className="font-medium text-foreground">Recht op beperking:</span> Beperk de verwerking</li>
                  <li>• <span className="font-medium text-foreground">Recht op dataportabiliteit:</span> Ontvang uw gegevens</li>
                  <li>• <span className="font-medium text-foreground">Recht van bezwaar:</span> Maak bezwaar tegen verwerking</li>
                </ul>
                <p className="text-xs mt-3 bg-card/50 p-3 rounded-lg">
                  <span className="font-medium text-foreground">Contact:</span> info@devomedia.nl - Reactie binnen 1 maand
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline text-left">
                Klachten indienen
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pt-2">
                <p className="mb-2">Niet tevreden? Neem eerst contact met ons op. U kunt ook een klacht indienen bij:</p>
                <div className="bg-card/50 p-3 rounded-lg text-xs space-y-1">
                  <p className="font-medium text-foreground">Autoriteit Persoonsgegevens</p>
                  <p>Postbus 93374, 2509 AJ Den Haag</p>
                  <p>Tel: 088 - 1805 250</p>
                  <p>Website: <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">autoriteitpersoonsgegevens.nl</a></p>
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

export default Privacyverklaring;
