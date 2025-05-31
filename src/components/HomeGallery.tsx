
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollAnimationWrapper } from '@/hooks/use-scroll-animation';
import { useSpring, animated } from '@react-spring/web';
import TiltCard from './TiltCard';

const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/44997248-2a7d-4c4b-8656-13d704d35b37.png",
    alt: "Riverside Cottages",
  },
  {
    id: 2,
    src: "/lovable-uploads/a9ae304d-ac8b-4671-94c1-c3a3013a0711.png",
    alt: "Scenic Mountain View",
  },
  {
    id: 3,
    src: "/lovable-uploads/b4c6f3a5-3500-43ad-97e1-e69041317e64.png",
    alt: "River Rafting Adventure",
  },
  {
    id: 4,
    src: "/lovable-uploads/39f35db-5cf1-4a0b-be13-c4f3947bec67.png", 
    alt: "Forest Meditation",
  },
  {
    id: 5,
    src: "/lovable-uploads/fa6d6df3-ea4b-4f3f-9db1-81fbb2370f9f.png", 
    alt: "Luxury Accommodation",
  },
  {
    id: 6, 
    src: "/lovable-uploads/f97f4d91-56e4-4e2f-bb73-93760030da48.png",
    alt: "Wildlife Safari"
  }
];

const HomeGallery: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  
  // Parallax effect
  const parallaxHeading = useSpring({
    transform: `translateY(${scrollRatio * -30}px)`,
    opacity: 1 - (scrollRatio * 0.5),
    config: { tension: 170, friction: 26 }
  });
  
  // Element position tracking for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far the element is through the viewport (0 = just entered, 1 = just left)
        // This creates a value between 0 and 1 that we can use for animations
        const percentageThrough = 1 - (rect.top / windowHeight);
        
        if (percentageThrough >= 0 && percentageThrough <= 1) {
          setScrollRatio(percentageThrough);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Auto scroll every 3 seconds
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/40 overflow-hidden">
      <div className="container relative">
        <animated.div style={parallaxHeading} className="mb-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Explore Our Gallery
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Take a visual journey through the beautiful landscapes and experiences that await you at Dandeli Adventure Resorts
            </p>
          </div>
        </animated.div>
        
        <ScrollAnimationWrapper animation="animate-fade-in opacity-100" delay={200}>
          <div className="relative mx-auto max-w-5xl px-8">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                    <TiltCard 
                      perspective={1200} 
                      tiltFactor={20} 
                      scale={1.05} 
                      className="h-64"
                    >
                      <div className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 h-full">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover transition-transform duration-500" 
                          style={{ transform: `translateZ(30px)` }}
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                          style={{ transform: `translateZ(40px)` }}
                        >
                          <p className="text-white p-4 font-medium">{image.alt}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-white/80 backdrop-blur-sm hover:bg-white" />
              <CarouselNext className="right-0 bg-white/80 backdrop-blur-sm hover:bg-white" />
            </Carousel>
          </div>
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper animation="animate-fade-in opacity-100" delay={400}>
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-primary inline-flex items-center gap-2 hover-scale">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default HomeGallery;
