import { useEffect, useState } from 'react';
import { throttle } from '@/lib/performance';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    const throttledUpdate = throttle(updateProgress, 100);

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);

  return (
    <div 
      className="fixed top-2 sm:top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
