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
  { src: emzsLogo, alt: "EMZS Premium Barber", maxHeight: "max-h-14 md:max-h-16" },
  { src: broodjeLogo, alt: "Broodje & Co", maxHeight: "max-h-12 md:max-h-14" },
  { src: loversLogo, alt: "Lovers Premium Quality", maxHeight: "max-h-12 md:max-h-14" },
  { src: maxStudiosLogo, alt: "Max Studios", maxHeight: "max-h-14 md:max-h-16" },
  { src: vanKolfSchotenLogo, alt: "Van Kolf Schoten", maxHeight: "max-h-12 md:max-h-14" },
  { src: floresLogo, alt: "Florés Onderwijs", maxHeight: "max-h-10 md:max-h-12" },
  { src: versareLogo, alt: "Versare Consulting", maxHeight: "max-h-8 md:max-h-10" },
  { src: papiamentuTvLogo, alt: "Papiamentu.tv", maxHeight: "max-h-14 md:max-h-16" },
  { src: firstClassSportsLogo, alt: "First Class Sports", maxHeight: "max-h-14 md:max-h-16" },
];

const LogoSlider = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { t } = useTranslation();

  // Two copies of the track; the CSS animation shifts exactly one copy's
  // width (-50%) before looping, so the scroll never shows a seam.
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section ref={ref} aria-label={t('portfolio.trustedBy')} className="py-14 md:py-16 border-y border-border/60 bg-secondary/40">
      <p className={`text-center text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground px-4 mb-8 md:mb-10 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {t('portfolio.trustedBy')}
      </p>
      <div
        className={`logo-marquee-mask group w-full overflow-hidden transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="logo-marquee flex w-max items-center">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              aria-hidden={index >= logos.length}
              className="flex items-center justify-center h-20 md:h-24 px-7 md:px-10"
            >
              <img
                src={logo.src}
                alt={index < logos.length ? logo.alt : ""}
                loading="lazy"
                draggable={false}
                className={`${logo.maxHeight} w-auto max-w-[130px] md:max-w-[170px] object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
