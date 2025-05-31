import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { Wifi, Coffee, Users, Tv, MapPin } from 'lucide-react';

type RoomType = {
  id: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  size: string;
  bedType: string;
  image: string;
  views: string;
  amenities: {
    icon: React.ReactNode;
    label: string;
  }[];
};

const Accommodation: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const accommodations: RoomType[] = [{
    id: "riverside-suite",
    title: "Riverside Suite",
    description: "Luxurious suite overlooking the Kali River with private balcony and premium amenities for an unforgettable stay in nature.",
    price: 300,
    capacity: 2,
    size: "600 sq ft",
    bedType: "1 King",
    image: "/lovable-uploads/6b9bf7ef-20c4-4fa9-9f1a-2cd3310bf013.png",
    views: "River View",
    amenities: [{
      icon: <Wifi size={16} />,
      label: "Free WiFi"
    }, {
      icon: <Coffee size={16} />,
      label: "Coffee Maker"
    }, {
      icon: <Users size={16} />,
      label: "Up to 2 Guests"
    }, {
      icon: <Tv size={16} />,
      label: "Smart TV"
    }, {
      icon: <MapPin size={16} />,
      label: "River View"
    }]
  }, {
    id: "forest-cottage",
    title: "Forest Cottage",
    description: "Cozy cottage nestled among the trees with modern amenities and a rustic charm for a comfortable forest getaway.",
    price: 250,
    capacity: 2,
    size: "550 sq ft",
    bedType: "1 King",
    image: "/lovable-uploads/6b9bf7ef-20c4-4fa9-9f1a-2cd3310bf013.png",
    views: "River",
    amenities: [{
      icon: <Wifi size={16} />,
      label: "Free WiFi"
    }, {
      icon: <Coffee size={16} />,
      label: "Coffee Maker"
    }, {
      icon: <Users size={16} />,
      label: "Up to 2 Guests"
    }, {
      icon: <Tv size={16} />,
      label: "Smart TV"
    }, {
      icon: <MapPin size={16} />,
      label: "Forest View"
    }]
  }, {
    id: "treehouse-villa",
    title: "Treehouse Villa",
    description: "Elevated luxury among the treetops with panoramic forest views, offering a unique blend of adventure and comfort.",
    price: 200,
    capacity: 2,
    size: "400 sq ft",
    bedType: "1 Queen",
    image: "/lovable-uploads/a9ae304d-ac8b-4671-94c1-c3a3013a0711.png",
    views: "Forest Canopy",
    amenities: [{
      icon: <Wifi size={16} />,
      label: "Free WiFi"
    }, {
      icon: <Coffee size={16} />,
      label: "Coffee Maker"
    }, {
      icon: <Users size={16} />,
      label: "Up to 2 Guests"
    }, {
      icon: <Tv size={16} />,
      label: "Smart TV"
    }, {
      icon: <MapPin size={16} />,
      label: "Forest View"
    }]
  }, {
    id: "jungle-cabin",
    title: "Jungle Cabin",
    description: "Rustic cabin surrounded by lush vegetation with essential amenities for an authentic jungle experience.",
    price: 150,
    capacity: 2,
    size: "350 sq ft",
    bedType: "1 Queen",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    views: "Jungle",
    amenities: [{
      icon: <Wifi size={16} />,
      label: "Free WiFi"
    }, {
      icon: <Coffee size={16} />,
      label: "Coffee Maker"
    }, {
      icon: <Users size={16} />,
      label: "Up to 2 Guests"
    }, {
      icon: <MapPin size={16} />,
      label: "Jungle View"
    }]
  }, {
    id: "luxury-safari-tent",
    title: "Luxury Safari Tent",
    description: "Glamping at its finest with all the comforts of a hotel room while being immersed in the sounds and scents of nature.",
    price: 180,
    capacity: 2,
    size: "400 sq ft",
    bedType: "1 King",
    image: "/lovable-uploads/7185274f-a6c4-4980-b354-5641039bc323.png",
    views: "Grassland",
    amenities: [{
      icon: <Wifi size={16} />,
      label: "Free WiFi"
    }, {
      icon: <Coffee size={16} />,
      label: "Coffee Maker"
    }, {
      icon: <Users size={16} />,
      label: "Up to 2 Guests"
    }, {
      icon: <MapPin size={16} />,
      label: "Grassland View"
    }]
  }, {
    id: "family-bungalow",
    title: "Family Bungalow",
    description: "Spacious accommodation ideal for families with multiple bedrooms and a common area to relax together after a day of adventure.",
    price: 350,
    capacity: 6,
    size: "900 sq ft",
    bedType: "2 King + 2 Twin",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    views: "Garden",
    amenities: [{
      icon: <Wifi size={16} />,
      label: "Free WiFi"
    }, {
      icon: <Coffee size={16} />,
      label: "Coffee Maker"
    }, {
      icon: <Users size={16} />,
      label: "Up to 6 Guests"
    }, {
      icon: <Tv size={16} />,
      label: "Smart TV"
    }, {
      icon: <MapPin size={16} />,
      label: "Garden View"
    }]
  }];

  const filteredAccommodations = filter === 'all' ? accommodations : accommodations.filter(room => {
    if (filter === 'budget' && room.price < 150) return true;
    if (filter === 'standard' && room.price >= 150 && room.price < 250) return true;
    if (filter === 'luxury' && room.price >= 250) return true;
    return false;
  });

  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative h-[40vh] md:h-[50vh] w-full mt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/61d7b6e2-720c-42fc-a459-7624b56b81d0.png')" }}>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
            Luxury Eco-Accommodations
          </h1>
          <p className="text-lg md:text-xl max-w-2xl animate-slide-up animation-delay-200">
            Experience the perfect blend of comfort and nature in our sustainable, luxurious lodging options
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-display font-semibold mb-4">Find Your Perfect Stay</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our accommodations combine luxury with sustainability, offering you a comfortable stay while maintaining our commitment to preserving the environment.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All Accommodations
            </button>
            <button 
              onClick={() => setFilter('budget')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'budget' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Budget Friendly
            </button>
            <button 
              onClick={() => setFilter('standard')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'standard' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Standard
            </button>
            <button 
              onClick={() => setFilter('luxury')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'luxury' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Luxury
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map((room) => (
            <RoomCard
              key={room.id}
              title={room.title}
              description={room.description}
              price={room.price}
              image={room.image}
              capacity={room.capacity}
              amenities={room.amenities}
            />
          ))}
        </div>
        
        {filteredAccommodations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No accommodations match your current filter.</p>
            <button 
              onClick={() => setFilter('all')}
              className="text-primary hover:underline mt-2"
            >
              View all accommodations
            </button>
          </div>
        )}
      </div>
      
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold mb-10 text-center">Our Amenities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">Free Wi-Fi</h3>
              <p className="text-muted-foreground">
                Stay connected with complimentary high-speed internet access available throughout our property.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">Eco-friendly Amenities</h3>
              <p className="text-muted-foreground">
                Enjoy organic toiletries, biodegradable products, and sustainably sourced linens and towels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">Daily Housekeeping</h3>
              <p className="text-muted-foreground">
                Experience immaculate comfort with our eco-friendly daily housekeeping services.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Tv className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">Entertainment</h3>
              <p className="text-muted-foreground">
                Smart TVs with streaming capabilities and a selection of books and board games for entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};

export default Accommodation;
