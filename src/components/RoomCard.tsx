import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Coffee, Users, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';
type Amenity = {
  icon: React.ReactNode;
  label: string;
};
type RoomCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  amenities: Amenity[];
  specs?: string[]; // Added the specs property as optional
  delay?: number;
};
const RoomCard: React.FC<RoomCardProps> = ({
  image,
  title,
  description,
  price,
  capacity,
  amenities,
  specs,
  delay = 0
}) => {
  return <div className={cn("bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 animate-slide-up card-hover")} style={{
    animationDelay: `${delay}ms`
  }}>
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-accent">
          ${price} <span className="text-sm text-foreground/70">/night</span>
        </div>
      </div>
      
      <div className="p-6 bg-slate-300">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-semibold">{title}</h3>
          <div className="flex items-center text-foreground/70">
            <Users size={16} className="mr-1" />
            <span className="text-sm">Up to {capacity} guests</span>
          </div>
        </div>
        
        <p className="text-foreground/70 mb-5">{description}</p>
        
        {/* Display specs if provided */}
        {specs && specs.length > 0 && <div className="mb-4">
            {specs.map((spec, index) => <div key={index} className="text-sm text-foreground/70 mb-1">
                {spec}
              </div>)}
          </div>}
        
        <div className="flex flex-wrap gap-3 mb-6">
          {amenities.map((amenity, index) => <div key={index} className="flex items-center text-sm text-foreground/70">
              <span className="mr-1">{amenity.icon}</span>
              {amenity.label}
            </div>)}
        </div>
        
        <Link to="/booking" className="block w-full py-3 text-center bg-accent text-accent-foreground rounded-md transition-all duration-300 hover:bg-accent/90">
          Book Now
        </Link>
      </div>
    </div>;
};
export default RoomCard;