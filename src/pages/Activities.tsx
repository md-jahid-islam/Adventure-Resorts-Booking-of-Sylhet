
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ActivityCard from '@/components/ActivityCard';

const Activities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  
  // Sample activities data
  const activities = [
    {
      id: "river-rafting",
      title: "River Rafting",
      description: "Experience the thrill of navigating through the rapids of Kali River, with expert guides ensuring safety while you enjoy the adrenaline rush.",
      image: "/lovable-uploads/1d3255ca-7296-4e20-b1fb-416cfb82fa82.png",
      duration: "2-3 hours",
      difficulty: "Moderate",
      groupSize: "4-8 people",
      rating: 4.8,
      price: 45,
      category: "water"
    },
    {
      id: "wildlife-safari",
      title: "Wildlife Safari",
      description: "Explore the rich biodiversity of Dandeli Wildlife Sanctuary with guided jeep safaris. Spot elephants, black panthers, and various bird species in their natural habitat.",
      image: "/lovable-uploads/dc56b3d5-8de2-40a9-b259-35829487f125.png",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "6-10 people",
      rating: 4.7,
      price: 35,
      category: "land"
    },
    {
      id: "jungle-trekking",
      title: "Jungle Trekking",
      description: "Embark on a guided trek through pristine forest trails, discovering hidden waterfalls, spotting exotic birds, and learning about local flora and fauna.",
      image: "/lovable-uploads/41b176ee-c1a4-467f-8c90-a34ecc92fb8b.png",
      duration: "4-5 hours",
      difficulty: "Moderate",
      groupSize: "4-12 people",
      rating: 4.6,
      price: 30,
      category: "land"
    },
    {
      id: "kayaking",
      title: "Kayaking",
      description: "Paddle through the calm stretches of the Kali River and enjoy the peaceful surroundings. Perfect for beginners and nature lovers seeking a serene adventure.",
      image: "/lovable-uploads/d3b0e6e8-2ca3-404f-be2d-c15f09cbabbb.png",
      duration: "1-2 hours",
      difficulty: "Easy",
      groupSize: "1-2 people",
      rating: 4.5,
      price: 25,
      category: "water"
    },
    {
      id: "night-camping",
      title: "Night Camping",
      description: "Experience the wilderness under the stars with our guided night camping. Enjoy bonfire, stargazing, and the sounds of the jungle at night.",
      image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=600&q=80",
      duration: "Overnight",
      difficulty: "Easy",
      groupSize: "10-20 people",
      rating: 4.9,
      price: 50,
      category: "land"
    },
    {
      id: "zipline-adventure",
      title: "Zipline Adventure",
      description: "Soar through the forest canopy on our thrilling zipline course. Get a bird's eye view of the beautiful landscapes while experiencing an adrenaline rush.",
      image: "/lovable-uploads/504eed73-ca66-4273-aa1a-905482b892fe.png",
      duration: "1-2 hours",
      difficulty: "Challenging",
      groupSize: "2-10 people",
      rating: 4.7,
      price: 40,
      category: "air"
    },
    {
      id: "coracle-ride",
      title: "Coracle Ride",
      description: "Experience a traditional boat ride in circular coracles. Spin and float down the gentle currents while enjoying the scenic beauty around you.",
      image: "/lovable-uploads/07e0c5d8-5e69-46ba-918d-1d36153e73dd.png",
      duration: "1-2 hours",
      difficulty: "Easy",
      groupSize: "2-3 people",
      rating: 4.4,
      price: 20,
      category: "water"
    },
    {
      id: "bird-watching",
      title: "Bird Watching",
      description: "Dandeli is home to over 300 species of birds. Join our expert ornithologists for a guided bird watching experience in this avian paradise.",
      image: "/lovable-uploads/a86fb74f-d5e7-48b5-a676-777476545216.png",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "4-8 people",
      rating: 4.6,
      price: 25,
      category: "nature"
    }
  ];
  
  const categories = [
    { id: "all", label: "All Activities" },
    { id: "water", label: "Water Adventures" },
    { id: "land", label: "Land Expeditions" },
    { id: "air", label: "Aerial Adventures" },
    { id: "nature", label: "Nature Experiences" }
  ];
  
  const difficulties = [
    { id: "all", label: "All Levels" },
    { id: "Easy", label: "Easy" },
    { id: "Moderate", label: "Moderate" },
    { id: "Challenging", label: "Challenging" }
  ];
  
  useEffect(() => {
    filterActivities();
  }, [selectedCategory, selectedDifficulty]);
  
  const filterActivities = () => {
    let filtered = [...activities];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(activity => activity.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(activity => activity.difficulty === selectedDifficulty);
    }
    
    setFilteredActivities(filtered);
  };
  
  const toggleFilter = () => {
    setActiveFilter(!activeFilter);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/1d3255ca-7296-4e20-b1fb-416cfb82fa82.png" 
              alt="Adventure activities" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative container h-full flex flex-col justify-center items-center text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-slide-down">
              Adventure Awaits
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in animation-delay-200">
              Discover thrilling experiences in the heart of Western Ghats' wilderness
            </p>
            <Link 
              to="/booking" 
              className="bg-white text-accent px-8 py-3 rounded-md font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg animate-slide-up animation-delay-400"
            >
              Book an Adventure
            </Link>
          </div>
        </section>
        
        {/* Activities Section */}
        <section className="py-16 px-4 container">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Explore Our Activities
              </h2>
              <p className="text-foreground/70 max-w-xl">
                From thrilling water sports to peaceful nature walks, find the perfect adventure for every type of explorer.
              </p>
            </div>
            
            <Button 
              onClick={toggleFilter}
              variant="outline" 
              className="flex items-center gap-2 md:self-start"
            >
              <Filter size={16} /> Filters
            </Button>
          </div>
          
          {/* Filter Section - Visible on mobile when toggled */}
          <div className={cn(
            "bg-card p-6 rounded-lg shadow-md mb-8 transition-all duration-300 overflow-hidden",
            activeFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge 
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Difficulty Level</h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(difficulty => (
                    <Badge 
                      key={difficulty.id}
                      variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                    >
                      {difficulty.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Activities Grid */}
          <div className="space-y-8">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <ActivityCard 
                  key={activity.id}
                  id={activity.id}
                  image={activity.image}
                  title={activity.title}
                  description={activity.description}
                  duration={activity.duration}
                  difficulty={activity.difficulty as 'Easy' | 'Moderate' | 'Challenging'}
                  groupSize={activity.groupSize}
                  rating={activity.rating}
                  price={activity.price}
                  delay={index * 100}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No activities found</h3>
                <p className="text-foreground/70">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Adventure Guidelines Section */}
        <section className="bg-secondary py-16 px-4">
          <div className="container">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Adventure Guidelines
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Safety First",
                  description: "All activities are conducted with strict safety protocols. Listen to your guides and follow their instructions at all times.",
                  image: "/lovable-uploads/61d7b6e2-720c-42fc-a459-7624b56b81d0.png"
                },
                {
                  title: "Eco-Friendly Approach",
                  description: "Help us preserve the natural beauty of Dandeli. Follow the 'leave no trace' policy during all adventures.",
                  image: "https://images.unsplash.com/photo-1433477155337-9aea4e790195?auto=format&fit=crop&w=400&q=80"
                },
                {
                  title: "What to Bring",
                  description: "Comfortable clothing, water bottle, insect repellent, and sunscreen are recommended for most activities.",
                  image: "https://images.unsplash.com/photo-1581912492723-688317ba2162?auto=format&fit=crop&w=400&q=80"
                },
                {
                  title: "Booking Policy",
                  description: "Advance booking is required for all activities. Cancellations need to be made 24 hours prior for a full refund.",
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80"
                }
              ].map((guideline, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg overflow-hidden shadow-md animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={guideline.image} 
                      alt={guideline.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-foreground/70">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-accent text-accent-foreground relative">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/1d3255ca-7296-4e20-b1fb-416cfb82fa82.png')] bg-cover bg-center opacity-20"></div>
          <div className="container relative z-10 px-4 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl mb-8 text-accent-foreground/90">
                Book your activity now and create memories that will last a lifetime.
              </p>
              <Link 
                to="/booking" 
                className="inline-block px-8 py-4 bg-white text-accent font-medium text-lg rounded-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:translate-y-[-2px]"
              >
                Book Your Adventure
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Activities;
