import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useTranslation } from "react-i18next";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import result1 from "@/assets/results/result-1.png";
import result2 from "@/assets/results/result-2.png";
import result3 from "@/assets/results/result-3.png";
import result4 from "@/assets/results/result-4.png";
import result5 from "@/assets/results/result-5.png";
import result6 from "@/assets/results/result-6.png";
import result7 from "@/assets/results/result-7.jpg";

const Results = () => {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { t } = useTranslation();
  const alts = t("resultsPage.alts", { returnObjects: true }) as string[];
  const images = [result1, result2, result3, result4, result5, result6, result7];
  const results = images.map((image, i) => ({ id: i + 1, image, alt: alts[i] ?? "" }));

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={t("resultsPage.seoTitle")}
        description={t("resultsPage.seoDescription")}
        keywords={t("resultsPage.seoKeywords")}
        canonicalUrl="/resultaten"
      />
      <ScrollProgress />
      <StickyCtaBar />
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              {t("resultsPage.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              {t("resultsPage.heroSubtitle")}
            </p>
          </div>
        </section>

        {/* Portfolio CTA */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <button
              onClick={() => navigate(localePath('/portfolio'))}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300 shadow-md"
            >
              {t("resultsPage.backToPortfolio")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-muted/20 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("resultsPage.ctaTitle")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("resultsPage.ctaText")}
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openContactForm'))}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {t("resultsPage.ctaButton")}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
