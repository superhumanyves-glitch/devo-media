export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Devo Media",
  "url": "https://4b3ce2ec-dd8b-4052-9d71-a7ba18aac20e.lovableproject.com",
  "logo": "https://4b3ce2ec-dd8b-4052-9d71-a7ba18aac20e.lovableproject.com/logo.png",
  "description": "Professionele videoproductie en social media management voor bedrijven in Nederland",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NL",
    "addressLocality": "Nederland"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@devomedia.nl",
    "contactType": "customer service",
    "availableLanguage": ["nl", "en"]
  },
  "sameAs": [
    "https://www.instagram.com/devomedia",
    "https://www.facebook.com/devomedia"
  ],
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50"
  }
};

export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Videoproductie",
  "provider": {
    "@type": "Organization",
    "name": "Devo Media"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Nederland"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Videoproductie Diensten",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Maandelijkse Video Pakketten",
          "description": "Professionele videoproductie pakketten voor social media"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Drone Videografie",
          "description": "Professionele drone en FPV videografie"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Management",
          "description": "Volledig beheer van social media kanalen"
        }
      }
    ]
  }
};

export const faqStructuredData = (faqItems: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});

export const videoStructuredData = (videoData: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": videoData.name,
  "description": videoData.description,
  "thumbnailUrl": videoData.thumbnailUrl,
  "uploadDate": videoData.uploadDate,
  "duration": videoData.duration,
  "publisher": {
    "@type": "Organization",
    "name": "Devo Media",
    "logo": {
      "@type": "ImageObject",
      "url": "https://4b3ce2ec-dd8b-4052-9d71-a7ba18aac20e.lovableproject.com/logo.png"
    }
  }
});
