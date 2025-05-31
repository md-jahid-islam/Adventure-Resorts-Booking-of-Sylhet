
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivityCardProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: string;
  rating: number;
  price: number;
  delay?: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  image,
  title,
  description,
  duration,
  difficulty,
  groupSize,
  rating,
  price,
  delay = 0
}) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Moderate: 'bg-yellow-100 text-yellow-800',
    Challenging: 'bg-red-100 text-red-800'
  };
  
  return (
    <div 
      id={id}
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row animate-slide-up",
        "transition-all duration-500 card-hover"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="md:w-2/5 lg:w-1/3 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          style={{ minHeight: '250px', objectPosition: 'center' }}
        />
        <div className={cn(
          "absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium",
          difficultyColor[difficulty]
        )}>
          {difficulty}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-semibold">{title}</h3>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-foreground/70 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              {duration}
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              {groupSize}
            </div>
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="text-lg font-semibold">
            ₹{price * 83} <span className="text-sm font-normal text-foreground/70">per person</span>
          </div>
          
          <Link 
            to="/booking" 
            className="btn-primary"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
