import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // Show success notification
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter",
      variant: "default"
    });

    // Reset form and show dialog
    setEmail("");
    setIsSubscribed(true);
  };
  return <>
      <footer className="bg-accent text-accent-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 px-4">
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl font-display font-semibold">Dandeli Adventure Resorts</h3>
              <p className="text-accent-foreground/80 max-w-xs">
                Discover a world of adventure and tranquility nestled in the heart of nature's paradise.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 hover:scale-125">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 hover:scale-125">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 hover:scale-125">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in animation-delay-200">
              <h4 className="text-lg font-display font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Accommodation', 'Activities', 'Gallery', 'Contact'].map(item => <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300 inline-block py-1 link-underline">
                      {item}
                    </Link>
                  </li>)}
              </ul>
            </div>
            
            <div className="space-y-4 animate-fade-in animation-delay-400">
              <h4 className="text-lg font-display font-semibold">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin size={20} className="mt-1 flex-shrink-0" />
                  <span className="text-accent-foreground/80">
                    Dandeli Wildlife Sanctuary, Karnataka, India - 581325
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="flex-shrink-0" />
                  <div className="flex flex-col">
                    <a href="https://wa.me/918277385225?text=Hi!%20I'm%20interested%20in%20booking%20an%20adventure%20at%20Dandeli." target="_blank" rel="noopener noreferrer" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300">
                      +91 8277385225
                    </a>
                    <a href="tel:+917795601255" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-300">
                      +91 7795601255
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="flex-shrink-0" />
                  <span className="text-accent-foreground/80 text-base">dandeliadventure.info@gmail.com</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4 animate-fade-in animation-delay-600">
              <h4 className="text-lg font-display font-semibold">Newsletter</h4>
              <p className="text-accent-foreground/80 mx-0 my-0 px-0 py-0 rounded-lg">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="mt-4 space-y-3" onSubmit={handleSubscribe}>
                <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-accent-foreground focus:outline-none focus:ring-2 focus:ring-white/30" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" className="w-full px-4 py-2 rounded-md text-accent font-medium transition-all duration-300 hover:scale-105 bg-gray-900 hover:bg-gray-800">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 py-6 px-4 text-center text-accent-foreground/70">
            <p>© {currentYear} Dandeli Adventure Resorts. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Subscription Success Dialog */}
      <Dialog open={isSubscribed} onOpenChange={setIsSubscribed}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center">Subscribed!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-scale-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-center mb-2">Thank you for subscribing!</h3>
            <p className="text-center text-muted-foreground">
              You'll now receive our latest updates and exclusive offers directly to your inbox.
            </p>
            <button onClick={() => setIsSubscribed(false)} className="mt-6 px-6 py-2 rounded-md bg-accent text-accent-foreground font-medium transition-all duration-300 hover:bg-accent/90 hover:scale-105">
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Footer;