import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import { SEO } from "@/components/SEO";
import { Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { organizationStructuredData } from "@/lib/structuredData";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const portfolioVideos = [
  { 
    id: "1127224764", 
    hash: "0ecda3472d",
    title: "Project 1"
  },
  { 
    id: "1127228443", 
    hash: "61fab70b09",
    title: "Project 2"
  },
  { 
    id: "1127229335", 
    hash: "de6b5a9efe",
    title: "Project 3"
  },
  { 
    id: "1127230426", 
    hash: "9ac9e82d88",
    title: "Project 4"
  },
  { 
    id: "1127230603", 
    hash: "de411a1a29",
    title: "Project 5"
  },
  { 
    id: "1127232388", 
    hash: "4abca7590a",
    title: "Project 6"
  },
  { 
    id: "1152862876", 
    hash: "b22653afbb",
    title: "Broodje & Co"
  }
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="Portfolio - Devo Media | Ons Videoproductie Werk"
        description="Bekijk ons portfolio van professionele videoproductie projecten. Aftermovies, promotievideo's, drone videografie en social media content voor 30+ bedrijven."
        keywords="videoproductie portfolio, aftermovie, promotievideo, drone videografie, bedrijfsvideo's, social media content"
        canonicalUrl="/portfolio"
        structuredData={organizationStructuredData}
      />
      <ScrollProgress />
      <StickyCtaBar />
      <Header />
      
      <section className="pt-28 md:pt-32 pb-4 md:pb-6 px-4 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 animate-fade-in">
          Ons Werk
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mb-4 animate-fade-in">
          Dit is slechts het topje van de ijsberg, een voorproef van wat we echt kunnen bouwen.
        </p>
        <Button 
          onClick={() => navigate('/resultaten')}
          variant="outline"
          className="gap-2 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <TrendingUp className="w-4 h-4" />
          Bekijk Onze Resultaten
        </Button>
      </section>

      {/* Fullscreen Carousel */}
      <section className="relative flex-1">
        <div className="container mx-auto px-0 h-full">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "center",
              skipSnaps: false,
              dragFree: false,
              containScroll: "trimSnaps",
              watchDrag: false,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="h-[calc(100vh-190px)] md:h-[calc(100vh-220px)]">
            {portfolioVideos.map((video, index) => (
              <CarouselItem key={video.id} className="h-full">
                <VideoCard
                  videoId={video.id}
                  hash={video.hash}
                  title={video.title}
                  fullscreen
                  isActive={current === index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

            {/* Custom Navigation */}
            <CarouselPrevious 
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-primary/90 backdrop-blur-md border-2 border-white/30 hover:bg-primary hover:scale-110 hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-white shadow-lg" 
            />
            <CarouselNext 
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-primary/90 backdrop-blur-md border-2 border-white/30 hover:bg-primary hover:scale-110 hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-white shadow-lg" 
            />
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
