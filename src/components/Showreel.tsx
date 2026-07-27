import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Full-bleed brand showreel that sits directly under the fixed header, above the
 * hero. Autoplays muted and looping, but falls back to a poster + play button
 * for visitors who ask for reduced motion.
 */
const Showreel = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(query.matches);
      if (query.matches) {
        videoRef.current?.pause();
        setPlaying(false);
      }
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const play = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background pt-24 sm:pt-28 pb-8 sm:pb-12"
      aria-label={t("showreel.label")}
    >
      {/* Soft halo behind the frame so the white video edges melt into the page */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)] animate-fade-in">
          <video
            ref={videoRef}
            className="block aspect-video w-full bg-white object-cover"
            src="/video/devo-showreel.mp4"
            poster="/video/devo-showreel-poster.jpg"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
          />

          {!playing && (
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 flex items-center justify-center bg-foreground/10 transition-colors hover:bg-foreground/20"
              aria-label={t("showreel.play")}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Play className="ml-1 h-7 w-7" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Showreel;
