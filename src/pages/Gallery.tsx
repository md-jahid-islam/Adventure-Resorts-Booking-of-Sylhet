
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
      alt: "Deer in forest",
      category: "wildlife"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
      alt: "Waterfall",
      category: "landscape"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
      alt: "River",
      category: "landscape"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
      alt: "Forest",
      category: "landscape"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      alt: "Sunlight through trees",
      category: "landscape"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      alt: "Mountain sunrise",
      category: "landscape"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
      alt: "Starry night",
      category: "night"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      alt: "Foggy mountains",
      category: "landscape"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
      alt: "Ocean waves",
      category: "water"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&q=80",
      alt: "Mountain alps",
      category: "landscape"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
      alt: "River surrounded by rocks",
      category: "landscape"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&q=80",
      alt: "Sunbeam in forest",
      category: "landscape"
    }
  ];

  const openModal = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const getCurrentIndex = () => {
    if (!selectedImage) return -1;
    return galleryImages.findIndex(img => img.src === selectedImage);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;

    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % galleryImages.length 
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    
    setSelectedImage(galleryImages[newIndex].src);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 md:pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Gallery</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore the breathtaking natural beauty of Dandeli through our collection of stunning photographs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="relative overflow-hidden rounded-lg shadow-md group hover-scale"
                onClick={() => openModal(image.src)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                    <p className="font-display text-lg">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button onClick={closeModal} className="absolute -top-12 right-0 text-white p-2 hover:text-gray-300 transition-colors">
              <X size={24} />
            </button>
            
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigateImage('prev')} 
                className="bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              
              <div className="flex-grow flex justify-center mx-2">
                <img 
                  src={selectedImage} 
                  alt="Gallery image" 
                  className="max-h-[80vh] object-contain" 
                />
              </div>
              
              <button 
                onClick={() => navigateImage('next')} 
                className="bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            
            <div className="text-center text-white mt-4">
              <p>{getCurrentIndex() + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
