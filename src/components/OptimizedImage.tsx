import { LazyImage } from '@/components/LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage = ({ src, alt, className, priority }: OptimizedImageProps) => {
  if (priority) {
    // For critical images (above the fold), load immediately
    return <img src={src} alt={alt} className={className} fetchPriority="high" />;
  }

  // For non-critical images, use lazy loading
  return <LazyImage src={src} alt={alt} className={className} />;
};
