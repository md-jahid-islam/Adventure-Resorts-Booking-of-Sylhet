
import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/hooks/use-scroll-animation';
import TiltCard from './TiltCard';
import { animated, useSpring } from '@react-spring/web';

const attractions = [
  {
    id: 1,
    name: "Syntheri Rock",
    description: "A monolithic rock structure carved by the Kaneri river, located in the heart of the Western Ghats.",
    distance: "15 km",
    image: "/lovable-uploads/ea6ebcc8-61ac-4f00-853a-b08d19197ba7.png"
  },
  {
    id: 2,
    name: "Kavala Caves",
    description: "Ancient limestone caves with spectacular stalactites and stalagmites formations.",
    distance: "25 km",
    image: "/lovable-uploads/45ac4715-903c-4b9d-aaf3-c8fbe391b9a7.png"
  },
  {
    id: 3,
    name: "Ulavi Temple",
    description: "An ancient shrine dedicated to Chandika Devi, nestled amidst serene natural beauty.",
    distance: "30 km",
    image: "/lovable-uploads/2de354f0-c211-44f9-8243-b1cce525c7a7.png"
  },
  {
    id: 4,
    name: "Supa Dam",
    description: "One of the major dams built across the Kali River, offering panoramic views of the Western Ghats.",
    distance: "20 km",
    image: "/lovable-uploads/d3b0e6e8-2ca3-404f-be2d-c15f09cbabbb.png"
  }
];

const NearbyAttractions: React.FC = () => {
  // Parallax scroll animation for the title section
  const [scrollProps, api] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(40px)',
    config: { tension: 280, friction: 60 }
  }));

  React.useEffect(() => {
    // Animate in on mount
    api.start({
      opacity: 1,
      transform: 'translateY(0px)'
    });
    
    // Setup scroll listener for parallax
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const section = document.getElementById('nearby-attractions');
      
      if (section) {
        const sectionTop = section.offsetTop;
        const viewportHeight = window.innerHeight;
        
        // Start animation when section is 30% in viewport
        if (scrollPosition > sectionTop - viewportHeight * 0.7) {
          const scrollFactor = Math.min(1, (scrollPosition - (sectionTop - viewportHeight * 0.7)) / viewportHeight);
          api.start({
            transform: `translateY(${-scrollFactor * 10}px)`,
            immediate: false
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [api]);

  return (
    <section id="nearby-attractions" className="section-padding bg-white">
      <div className="container">
        <animated.div style={scrollProps} className="mb-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Nearby Attractions Around Dandeli Resorts
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore these fascinating destinations near our resort during your stay
            </p>
          </div>
        </animated.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attractions.map((attraction, index) => (
            <ScrollAnimationWrapper 
              key={attraction.id}
              animation="animate-slide-up opacity-100" 
              delay={index * 200} 
              threshold={0.2}
            >
              <TiltCard perspective={1500} tiltFactor={8}>
                <div className="bg-secondary/30 rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row hover-lift group">
                  <div className="md:w-2/5 overflow-hidden">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name} 
                      className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-between" style={{transform: 'translateZ(20px)'}}>
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-green-700 transition-colors">
                        {attraction.name}
                      </h3>
                      <p className="text-foreground/70 mb-4">{attraction.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-700">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{attraction.distance} from resort</span>
                      </div>
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
                      >
                        Learn more <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyAttractions;
