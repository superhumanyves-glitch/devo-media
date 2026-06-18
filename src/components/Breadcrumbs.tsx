import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const pathToLabel: Record<string, string> = {
  '': 'Home',
  'about': 'Over Ons',
  'portfolio': 'Portfolio',
  'assessment': 'Assessment',
  'resultaten': 'Resultaten',
  'dashboard': 'Dashboard',
  'privacyverklaring': 'Privacyverklaring',
  'algemene-voorwaarden': 'Algemene Voorwaarden',
  'cookieverklaring': 'Cookieverklaring',
  'disclaimer': 'Disclaimer',
  'colophon': 'Colophon'
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: pathToLabel[segment] || segment,
      path: currentPath
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://4b3ce2ec-dd8b-4052-9d71-a7ba18aac20e.lovableproject.com${crumb.path}`
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <nav 
        aria-label="Breadcrumb" 
        className="container mx-auto px-4 py-4"
      >
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" aria-hidden="true" />
                )}
                
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link 
                    to={crumb.path} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {index === 0 ? (
                      <>
                        <Home className="w-4 h-4" aria-label={crumb.label} />
                        <span className="sr-only">{crumb.label}</span>
                      </>
                    ) : (
                      crumb.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
