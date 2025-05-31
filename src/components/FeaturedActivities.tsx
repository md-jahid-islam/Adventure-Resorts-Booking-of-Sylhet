
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollAnimationWrapper } from '@/hooks/use-scroll-animation';

type ActivityProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  delay: number;
}

const ActivityCard: React.FC<ActivityProps> = ({ title, description, image, link, delay }) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-md transition-all duration-500 animate-fade-in",
        "hover:shadow-xl card-hover"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 p-6 w-full">
        <h3 className="text-2xl font-display font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4 line-clamp-2">{description}</p>
        <Link 
          to={link}
          className="inline-flex items-center text-white group-hover:translate-x-1 transition-transform duration-300"
        >
          Explore <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "River Rafting",
      description: "Navigate the thrilling rapids of the Kali River with our expert guides.",
      image: "/lovable-uploads/039f35db-5cf1-4a0b-be13-c4f3947bec67.png",
      link: "/activities#river-rafting"
    },
    {
      id: 2,
      title: "Wildlife Safari",
      description: "Explore the rich biodiversity of Dandeli Wildlife Sanctuary.",
      image: "/lovable-uploads/003350e1-bba1-4aed-9001-4acf317067fb.png",
      link: "/activities#wildlife-safari"
    },
    {
      id: 3,
      title: "Jungle Trekking",
      description: "Embark on guided treks through pristine forest trails.",
      image: "/lovable-uploads/968e9c7f-6872-4c43-ad59-1dd92c92d29a.png",
      link: "/activities#jungle-trekking"
    },
    {
      id: 4,
      title: "Kayaking",
      description: "Paddle through serene waters and enjoy the peaceful surroundings.",
      image: "/lovable-uploads/006b887f-fc3b-427b-9885-91e44bb4dbee.png",
      link: "/activities#kayaking"
    }
  ];
  
  return (
    <section className="section-padding container">
      <ScrollAnimationWrapper animation="animate-slide-up opacity-100" className="mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Experiences</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover the thrill and tranquility of our curated adventures in the heart of Dandeli's wilderness.
          </p>
        </div>
      </ScrollAnimationWrapper>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <ScrollAnimationWrapper 
            key={activity.id}
            animation="animate-slide-up opacity-100" 
            delay={index * 150}
            threshold={0.2}
          >
            <ActivityCard 
              title={activity.title}
              description={activity.description}
              image={activity.image}
              link={activity.link}
              delay={index * 100}
            />
          </ScrollAnimationWrapper>
        ))}
      </div>
      
      <ScrollAnimationWrapper animation="animate-fade-in opacity-100" delay={600}>
        <div className="text-center mt-12">
          <Link 
            to="/activities" 
            className="btn-primary inline-flex items-center"
          >
            View All Activities <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default FeaturedActivities;
