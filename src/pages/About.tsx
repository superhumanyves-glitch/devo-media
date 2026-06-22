import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { organizationStructuredData } from "@/lib/structuredData";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import aboutPhoto from "@/assets/about-photo.jpg";
import bryanWorking from "@/assets/bryan-working.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Over Mij - Devo Media | Bryan's Verhaal"
        description="Ontdek het verhaal achter Devo Media. Van Aruba naar Nederland, 7+ jaar ervaring in content creatie en videoproductie voor 30+ bedrijven."
        keywords="over devo media, bryan videograaf, content creator aruba, videoproductie nederland, bedrijfsverhaal"
        canonicalUrl="/about"
        structuredData={organizationStructuredData}
      />
      <ScrollProgress />
      <StickyCtaBar />
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Over Mij</h1>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Bryan Marquez</p>
              <p className="text-lg sm:text-xl text-muted-foreground">Oprichter & CEO van Devo Media</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 md:order-1 min-w-0">
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                <p>
                  Ik kom van het pittoreske eiland Aruba, een klein juweeltje in het Caribisch gebied. Afgelopen 7 jaar heb ik me ondergedompeld in de dynamische wereld van contentcreatie, met name op het gebied van gaming en sociale media. Gedreven door een passie om mijn creatieve potentieel te verkennen, ben ik op zoek gegaan naar wat mij echt boeit.
                </p>
                
                <p>
                  Twee jaar geleden heb ik de sprong gewaagd en ben ik naar Nederland verhuisd, gedreven door mijn ondernemersdroom om mijn eigen bedrijf op te zetten. Slechts vijf maanden na het begin van dit nieuwe hoofdstuk begon ik met het produceren van promotievideo's voor restaurants en reggae-evenementen, waarbij ik mijn vaardigheden aanscherpte en mijn portfolio gestaag uitbreidde.
                </p>
                
                <p>
                  Met een solide basis van ervaring en inmiddels <span className="text-primary font-semibold">30+ bedrijven</span> waar ik mee heb samengewerkt, wilde ik iets unieks creëren dat echt impact zou hebben en zo ontstond <span className="font-bold">Devo Media</span>.
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
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6">Devo Media</h2>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed break-words">
                  <p>
                    <span className="font-bold">Devo Media</span> is het resultaat van mijn jarenlange ervaring in contentcreatie, videografie en sociale media. Het is een merk dat creativiteit en strategie combineert en op maat gemaakte videografie- en socialemediamanagementpakketten aanbiedt die zijn ontworpen om individuen en bedrijven te helpen groeien en bloeien in de digitale ruimte.
                  </p>
                  
                  <p>
                    De lancering van <span className="font-bold">Devo Media</span> is een prestatie waar ik trots op ben en het is nog maar het begin van een spannende reis. Als u op zoek bent naar innovatieve manieren om uw aanwezigheid op sociale media te vergroten, hoor ik graag van u! 😉
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
