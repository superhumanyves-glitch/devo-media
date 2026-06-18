import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export const SEO = ({
  title = "Devo Media - Professionele Videoproductie & Social Media Management",
  description = "Devo Media biedt professionele videoproductie, drone videografie en social media management in Nederland. Vaste prijzen, voorspelbare resultaten, video's die leads opleveren.",
  keywords = "videoproductie, social media management, drone videografie, content creatie, bedrijfsvideo's, aftermovie, FPV drone, website ontwikkeling, Nederland",
  canonicalUrl,
  ogImage = "https://4b3ce2ec-dd8b-4052-9d71-a7ba18aac20e.lovableproject.com/og-image.jpg",
  ogType = "website",
  structuredData,
}: SEOProps) => {
  const siteUrl = "https://4b3ce2ec-dd8b-4052-9d71-a7ba18aac20e.lovableproject.com";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:site_name" content="Devo Media" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
