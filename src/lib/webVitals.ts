// Performance monitoring utilities

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

// Log performance metrics to console in development
if (import.meta.env.DEV) {
  reportWebVitals((metric) => {
    console.log('⚡ Performance metric:', metric.name, metric.value);
  });
}
