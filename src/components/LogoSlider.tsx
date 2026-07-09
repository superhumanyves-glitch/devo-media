import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "react-i18next";
import emzsLogo from "@/assets/logos/emzs-logo.png";
import broodjeLogo from "@/assets/logos/broodje-logo.png";
import loversLogo from "@/assets/logos/lovers-logo.png";
import maxStudiosLogo from "@/assets/logos/max-studios-logo.png";
import vanKolfSchotenLogo from "@/assets/logos/van-kolf-schoten-logo.png";
import floresLogo from "@/assets/logos/flores-logo.png";
import versareLogo from "@/assets/logos/versare-logo.png";
import papiamentuTvLogo from "@/assets/logos/papiamentu-tv-logo.png";
import firstClassSportsLogo from "@/assets/logos/first-class-sports-logo.png";

const logos = [
  { src: emzsLogo, alt: "EMZS Premium Barber", maxHeight: "max-h-24 md:max-h-28" },
  { src: broodjeLogo, alt: "Broodje & Co", maxHeight: "max-h-40 md:max-h-48" },
  { src: loversLogo, alt: "Lovers Premium Quality", maxHeight: "max-h-32 md:max-h-36" },
  { src: maxStudiosLogo, alt: "Max Studios", maxHeight: "max-h-28 md:max-h-32" },
  { src: vanKolfSchotenLogo, alt: "Van Kolf Schoten", maxHeight: "max-h-40 md:max-h-48" },
  { src: floresLogo, alt: "Florés Onderwijs", maxHeight: "max-h-40 md:max-h-48" },
  { src: versareLogo, alt: "Versare Consulting", maxHeight: "max-h-24 md:max-h-28" },
  { src: papiamentuTvLogo, alt: "Papiamentu.tv", maxHeight: "max-h-24 md:max-h-28" },
  { src: firstClassSportsLogo, alt: "First Class Sports", maxHeight: "max-h-40 md:max-h-48" },
];

const LogoSlider = () => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })
  );
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { t } = useTranslation();

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div ref={ref} className="w-full py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <h3 className={`text-2xl font-bold text-center mb-8 text-foreground transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {t('portfolio.trustedBy')}
        </h3>
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[plugin.current]}
          className={`w-full transition-all duration-1000 ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {duplicatedLogos.map((logo, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-8 flex items-center justify-center h-48 md:h-56 group">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.maxHeight} max-w-full object-contain transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default LogoSlider;
