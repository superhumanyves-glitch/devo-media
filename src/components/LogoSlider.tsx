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

// Logo images are trimmed to their content, so height directly controls the
// visible size: square logos get the base height, wider logos get less height
// since they take up more width.
const logos = [
  { src: emzsLogo, alt: "EMZS Premium Barber", maxHeight: "max-h-24 md:max-h-28" },
  { src: broodjeLogo, alt: "Broodje & Co", maxHeight: "max-h-20 md:max-h-24" },
  { src: loversLogo, alt: "Lovers Premium Quality", maxHeight: "max-h-20 md:max-h-24" },
  { src: maxStudiosLogo, alt: "Max Studios", maxHeight: "max-h-24 md:max-h-28" },
  { src: vanKolfSchotenLogo, alt: "Van Kolf Schoten", maxHeight: "max-h-20 md:max-h-24" },
  { src: floresLogo, alt: "Florés Onderwijs", maxHeight: "max-h-16 md:max-h-20" },
  { src: versareLogo, alt: "Versare Consulting", maxHeight: "max-h-14 md:max-h-16" },
  { src: papiamentuTvLogo, alt: "Papiamentu.tv", maxHeight: "max-h-24 md:max-h-28" },
  { src: firstClassSportsLogo, alt: "First Class Sports", maxHeight: "max-h-24 md:max-h-28" },
];

const LogoSlider = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { t } = useTranslation();

  // Two copies of the track; the CSS animation shifts exactly one copy's
  // width (-50%) before looping, so the scroll never shows a seam.
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div ref={ref} className="w-full py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <h3 className={`text-2xl font-bold text-center mb-8 text-foreground transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {t('portfolio.trustedBy')}
        </h3>
        <div
          className={`w-full overflow-hidden transition-opacity duration-1000 ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="logo-marquee flex w-max items-center">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                aria-hidden={index >= logos.length}
                className="flex items-center justify-center h-48 md:h-56 w-44 md:w-64 px-4 md:px-8 group"
              >
                <img
                  src={logo.src}
                  alt={index < logos.length ? logo.alt : ""}
                  className={`${logo.maxHeight} max-w-full object-contain transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
