
import { useEffect, useState, useRef } from 'react';

type ScrollAnimationOptions = {
  threshold?: number; // Value between 0-1, representing the percentage of element that needs to be visible
  rootMargin?: string; // Margin around the root element
  once?: boolean; // Whether to trigger the animation only once
  delay?: number; // Delay before animation starts after element is visible
  duration?: number; // Duration of the animation in ms
};

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    once = true,
    delay = 0,
    duration = 700
  } = options;
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin 
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);
  
  return { isVisible, elementRef, delay, duration };
}

// Create a component wrapper for animated elements
export const ScrollAnimationWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}> = ({ 
  children, 
  className = '', 
  animation = 'animate-fade-in', 
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = '0px',
  once = true
}) => {
  const { isVisible, elementRef } = useScrollAnimation({ 
    threshold, 
    rootMargin, 
    once,
    delay,
    duration
  });
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${className} transition-all ${isVisible ? animation : 'opacity-0'}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};

// Additional animation wrappers for specific effects
export const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}> = ({
  children,
  className = '',
  delay = 0,
  duration = 700,
  direction = 'up',
  distance = 20,
  threshold = 0.1,
  rootMargin = '0px',
  once = true
}) => {
  const { isVisible, elementRef } = useScrollAnimation({ 
    threshold, 
    rootMargin, 
    once,
    delay,
    duration
  });
  
  let transform = 'translateY(0)';
  if (!isVisible) {
    switch (direction) {
      case 'up':
        transform = `translateY(${distance}px)`;
        break;
      case 'down':
        transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        transform = `translateX(${distance}px)`;
        break;
      case 'right':
        transform = `translateX(-${distance}px)`;
        break;
      case 'none':
        transform = 'translateY(0)';
        break;
    }
  }
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${className} transition-all will-change-transform will-change-opacity`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : transform,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionProperty: 'transform, opacity',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  startScale?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}> = ({
  children,
  className = '',
  delay = 0,
  duration = 700,
  startScale = 0.95,
  threshold = 0.1,
  rootMargin = '0px',
  once = true
}) => {
  const { isVisible, elementRef } = useScrollAnimation({ 
    threshold, 
    rootMargin, 
    once,
    delay,
    duration
  });
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${className} transition-all will-change-transform will-change-opacity`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : `scale(${startScale})`,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionProperty: 'transform, opacity',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};
