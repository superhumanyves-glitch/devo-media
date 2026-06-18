// Animation utility functions and configurations

export const animationTimings = {
  quick: 150,
  standard: 300,
  moderate: 400,
  slow: 600,
} as const;

export const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const staggerDelay = (index: number, baseDelay: number = 80): number => {
  return index * baseDelay;
};

export const getAnimationClass = (isInView: boolean, baseClass: string = 'animate-fade-in'): string => {
  return isInView ? baseClass : 'opacity-0';
};

export const getStaggeredAnimationStyle = (index: number, baseDelay: number = 80) => {
  return {
    animationDelay: `${staggerDelay(index, baseDelay)}ms`,
  };
};
