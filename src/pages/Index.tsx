import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedActivities from '@/components/FeaturedActivities';
import SpecialOffers from '@/components/SpecialOffers';
import HomeGallery from '@/components/HomeGallery';
import NearbyAttractions from '@/components/NearbyAttractions';
import DiscountOffers from '@/components/DiscountOffers';
import { ArrowRight, Leaf, Shield, Award, Phone } from 'lucide-react';
import { AdPopup } from '@/components/AdPopup';

const Index: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <AdPopup />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Call Now Button - repositioned above chatbot with more space */}
        <div className="fixed bottom-32 right-4 z-40 md:bottom-24">
          <a 
            href="tel:+918277385225" 
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 animate-bounce"
          >
            <Phone size={20} />
            <span className="font-medium">Call Now</span>
          </a>
        </div>
        
        {/* Special Promotion Banner */}
        <div className="bg-green-700 text-white py-3 px-4 text-center shadow-md">
          <div className="container mx-auto">
            <p className="text-xl font-bold">Book now just at ₹1499! <Link to="/booking" className="underline ml-2 hover:text-yellow-200 transition-colors">Limited time offer</Link></p>
          </div>
        </div>
        
        {/* About section */}
        <section className="section-padding container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="relative">
                <img src="/lovable-uploads/f97f4d91-56e4-4e2f-bb73-93760030da48.png" alt="Dandeli Wildlife" className="w-full h-[500px] object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden md:block hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <img src="/lovable-uploads/8fe5892b-b9ce-440c-8423-786ee90235e7.png" alt="Rafting in Dandeli" className="w-40 h-32 object-cover rounded-md" />
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up animation-delay-200">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Experience Nature's Paradise in Dandeli
              </h2>
              <p className="text-foreground/70 mb-6">
                Nestled in the heart of Western Ghats, Dandeli Adventures offers an immersive experience in one of India's most biodiverse regions. Our eco-friendly resort combines luxury with wilderness, providing the perfect backdrop for your nature retreat.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start group hover-lift p-2 rounded-lg transition-all duration-300 hover:bg-green-50">
                  <div className="mr-4 p-2 bg-secondary rounded-full text-green-700 group-hover:bg-green-100 transition-colors duration-300">
                    <Leaf size={20} className="group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-green-700 transition-colors duration-300">Eco-Friendly Resort</h3>
                    <p className="text-sm text-foreground/70">
                      Committed to sustainable tourism practices with minimal environmental impact.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group hover-lift p-2 rounded-lg transition-all duration-300 hover:bg-green-50">
                  <div className="mr-4 p-2 bg-secondary rounded-full text-green-700 group-hover:bg-green-100 transition-colors duration-300">
                    <Shield size={20} className="group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-green-700 transition-colors duration-300">Safety First Adventures</h3>
                    <p className="text-sm text-foreground/70">
                      All activities conducted by certified professionals with top-tier safety equipment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group hover-lift p-2 rounded-lg transition-all duration-300 hover:bg-green-50">
                  <div className="mr-4 p-2 bg-secondary rounded-full text-green-700 group-hover:bg-green-100 transition-colors duration-300">
                    <Award size={20} className="group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-green-700 transition-colors duration-300">Award-Winning Hospitality</h3>
                    <p className="text-sm text-foreground/70">
                      Recognized for exceptional service and authentic local experiences.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about" className="inline-flex items-center text-green-700 hover:underline group">
                  Learn more about us <ArrowRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <Link to="/contact" className="inline-flex items-center text-green-700 hover:underline group">
                  Contact us for directions <ArrowRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Discount Offers */}
        <DiscountOffers />
        
        {/* Special Offers Section */}
        <SpecialOffers />
        
        {/* Accommodations preview */}
        <section className="py-20 bg-secondary">
          <div className="container px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Stunning Accommodations
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Relax in comfort after your adventure in our thoughtfully designed spaces that blend with nature.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{
                title: "Riverside Cottages",
                image: "/lovable-uploads/44997248-2a7d-4c4b-8656-13d704d35b37.png",
                description: "Wake up to the soothing sounds of the river",
                price: "₹2,499",
                delay: 0
              }, {
                title: "Treehouse Villas",
                image: "/lovable-uploads/e254561c-a576-4abe-ba9b-a057e1ddc8d7.png",
                description: "Elevated living with panoramic forest views",
                price: "₹3,999",
                delay: 200
              }, {
                title: "Luxury Tents",
                image: "/lovable-uploads/507d9972-fed7-467f-90af-7506080a19b4.png",
                description: "Glamping experience with all modern amenities",
                price: "₹1,999",
                delay: 400
              }].map((accommodation, index) => <div key={index} className="overflow-hidden rounded-xl group shadow-md animate-slide-up hover-lift bg-white" style={{
                animationDelay: `${accommodation.delay}ms`
              }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={accommodation.image} alt={accommodation.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-green-700 transition-colors">
                        {accommodation.title}
                      </h3>
                      <p className="text-foreground/70 mb-2">
                        {accommodation.description}
                      </p>
                      <p className="text-green-700 font-semibold mb-4">
                        {accommodation.price} per night
                      </p>
                      <Link to="/accommodation" className="text-green-700 hover:underline inline-flex items-center group">
                        View Details <ArrowRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>)}
            </div>
            
            <div className="text-center mt-12 animate-fade-in" style={{
              animationDelay: '600ms'
            }}>
              <Link to="/accommodation" className="btn-primary hover-scale">
                Explore All Accommodations
              </Link>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <HomeGallery />
        
        {/* Featured Activities */}
        <FeaturedActivities />
        
        {/* Nearby Attractions Section */}
        <NearbyAttractions />
        
        {/* Testimonials */}
        <section className="section-padding container">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Guest Experiences
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our guests have to say about their stay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Stanley Nuthalpati",
                location: "New York, USA",
                quote: "The river rafting experience was exhilarating! The staff was incredibly knowledgeable and made us feel safe while still having a blast.",
                image: "/lovable-uploads/b2944dcd-84a0-4ab8-af63-861cd91c2d08.png",
                delay: 0
              },
              {
                name: "Atharva Kulkarni",
                location: "Mumbai, India",
                quote: "The treehouse villa exceeded our expectations. Waking up to birds chirping and the view of the forest canopy was magical. A perfect anniversary getaway.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                delay: 200
              },
              {
                name: "Rajat Hegde",
                location: "Singapore",
                quote: "The wildlife safari was the highlight of our trip. We spotted elephants, deer, and even a black panther! Our guide was exceptional in tracking the animals.",
                image: "/lovable-uploads/54f9733a-3115-43f8-8702-ac90313ce5aa.png",
                delay: 400
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md animate-slide-up hover-lift"
                style={{ animationDelay: `${testimonial.delay}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-medium text-base">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/70">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-foreground/80 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, starIndex) => <Star key={starIndex} filled={true} />)}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter sign-up */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Get Exclusive Updates
              </h2>
              <p className="text-foreground/70 mb-8">
                Subscribe to our newsletter and be the first to know about new adventures and seasonal experiences.
              </p>
              <form className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-3" onSubmit={(e) => {
                e.preventDefault();
                const emailInput = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput && emailInput.value) {
                  // We'll use the same subscription logic as in the footer
                  const { toast } = require("@/hooks/use-toast");
                  toast({
                    title: "Success!",
                    description: "You've been subscribed to our newsletter",
                    variant: "default",
                  });
                  emailInput.value = '';
                }
              }}>
                <input type="email" placeholder="Your email address" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required />
                <Button type="submit" variant="default" className="w-full sm:w-auto bg-green-700 hover:bg-green-800 hover:scale-105 transition-transform">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-green-700 text-white relative">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/039f35db-5cf1-4a0b-be13-c4f3947bec67.png')] bg-cover bg-center opacity-20"></div>
          <div className="container relative z-10 px-4 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-glow">
                Your Adventure Awaits!
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Book your stay now and create memories that will last a lifetime.
              </p>
              <Link to="/booking" className="inline-block px-8 py-4 bg-white text-green-700 font-medium text-lg rounded-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:translate-y-[-2px] hover:scale-105">
                Book Your Adventure Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

// Helper component for star rating
const Star: React.FC<{
  filled: boolean;
}> = ({
  filled
}) => {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 hover:scale-125 transition-transform duration-300">
      <path d="M10 1L12.39 6.55L18.5 7.31L14.25 11.75L15.51 18L10 15.09L4.49 18L5.75 11.75L1.5 7.31L7.61 6.55L10 1Z" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
};

export default Index;
