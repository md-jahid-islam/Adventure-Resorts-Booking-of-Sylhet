
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export function AdPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in booking the Day Package for ₹799!");
    window.open(`https://wa.me/+918904704234?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`sm:max-w-md p-0 overflow-hidden ${isMobile ? 'w-[90%] max-h-[80vh]' : ''}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/f97f4d91-56e4-4e2f-bb73-93760030da48.png" 
              alt="Day Package"
              className={`w-full object-cover ${isMobile ? 'h-36' : 'h-48'}`}
            />
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Special Offer! 🎉
                </motion.div>
              </DialogTitle>
            </DialogHeader>

            <motion.div 
              className="text-center space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-green-600">
                Day Package at Just ₹799!
              </h3>
              <p className="text-muted-foreground">
                Experience the best of Dandeli at an unbeatable price
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700"
              >
                Book Now on WhatsApp
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                Maybe Later
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
