import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

const Colophon = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <SEO 
          title="Colophon - Devo Media"
          description="Bedrijfsinformatie en contactgegevens van Devo Media Agency in Arnhem, Nederland."
          canonicalUrl="/colophon"
        />
        <Header />
        
        <main className="flex-grow bg-background pt-24">
          <div className="container mx-auto px-4 py-12 max-w-4xl text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground text-left">Colophon</h1>
            <p className="text-muted-foreground mb-8 text-left">Bedrijfsinformatie Devo Media Agency</p>
            
            <div className="space-y-6">
              <section className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-foreground text-left">Bedrijfsgegevens</h2>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">Officiële bedrijfsnaam:</span> Devo Media Agency</p>
                  <p><span className="font-medium text-foreground">Vestigingsadres:</span> Gelderse Rooslaan 13-4, 6841BA Arnhem</p>
                  <p><span className="font-medium text-foreground">KvK-nummer:</span> 90330706</p>
                  <p><span className="font-medium text-foreground">BTW-nummer:</span> NL004808059B18</p>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-4 text-foreground text-left">Contact</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-medium mb-2 text-foreground text-left">Algemene vragen</h3>
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
                    <h3 className="text-base font-medium mb-2 text-foreground text-left">Social Media</h3>
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
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Diensten</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-medium text-foreground">Social Media Management</span> – Strategie, contentcreatie en community management</li>
                  <li><span className="font-medium text-foreground">Videoproductie</span> – Aftermovies, commercials, bedrijfsfilms, drone-opnames</li>
                  <li><span className="font-medium text-foreground">Contentcreatie</span> – Fotografie, grafisch ontwerp, copywriting</li>
                  <li><span className="font-medium text-foreground">Web Development</span> – Website-ontwerp en -ontwikkeling, SEO-optimalisatie</li>
                  <li><span className="font-medium text-foreground">Branding & Strategie</span> – Merkidentiteit, visuele concepten, campagnes</li>
                </ul>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Openingstijden</h2>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><span className="font-medium text-foreground">Kantooruren:</span> Maandag t/m vrijdag: 09:00 - 18:00</p>
                  <p><span className="font-medium text-foreground">E-mail & telefoon:</span> Reactie binnen 24 uur op werkdagen</p>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Juridische documenten</h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a href="/algemene-voorwaarden" className="text-primary hover:underline">Algemene Voorwaarden</a>
                  <span className="text-muted-foreground">•</span>
                  <a href="/privacyverklaring" className="text-primary hover:underline">Privacyverklaring</a>
                  <span className="text-muted-foreground">•</span>
                  <a href="/cookieverklaring" className="text-primary hover:underline">Cookieverklaring</a>
                  <span className="text-muted-foreground">•</span>
                  <a href="/disclaimer" className="text-primary hover:underline">Disclaimer</a>
                </div>
              </section>

              <section className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h2 className="text-lg font-semibold mb-3 text-foreground text-left">Tarieven & betalingen</h2>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">Betalingstermijn:</span> 14 dagen netto</p>
                  <p><span className="font-medium text-foreground">Aanbetaling:</span> 40% vooraf bij grotere projecten</p>
                  <p><span className="font-medium text-foreground">Betaalmethoden:</span> Bankoverschrijving, iDEAL</p>
                </div>
              </section>

              <div className="bg-muted/30 backdrop-blur-sm p-4 rounded-xl border border-border/50">
                <p className="text-xs text-muted-foreground">
                  ©️ 2025 Devo Media Agency – Alle rechten voorbehouden
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
