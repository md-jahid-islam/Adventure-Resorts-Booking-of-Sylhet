import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { SearchForm } from './SearchForm';
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Removed "Booking" from this array
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Accommodation',
    path: '/accommodation'
  }, {
    name: 'Activities',
    path: '/activities'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  return <header className={cn('fixed w-full top-0 z-50 transition-all duration-300', isScrolled ? 'glass py-3' : 'bg-transparent py-6')}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={cn('text-sm font-medium relative transition-all duration-300', 'after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0', 'after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300', 'hover:after:scale-x-100 hover:after:origin-bottom-left', location.pathname === link.path ? 'text-accent after:scale-x-100' : 'text-foreground/80 hover:text-foreground')}>
              {link.name}
            </Link>)}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="tel:+918904704234" className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors duration-300">
            <Phone size={16} />
            <span>+91 8277385225</span>
          </a>
          <button className="p-2 rounded-full text-foreground/70 hover:text-foreground transition-colors duration-300" onClick={() => setIsSearchOpen(true)}>
            <Search size={20} />
          </button>
          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground p-2" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn('fixed inset-0 bg-background pt-20 px-4 z-40 transition-all duration-300 ease-in-out md:hidden', isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none')}>
        <button className="absolute top-4 right-4 p-2 text-foreground" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
        
        <nav className="flex flex-col space-y-6">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={cn('text-xl font-medium py-2 border-b border-border', location.pathname === link.path ? 'text-accent' : 'text-foreground/80')} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>)}
          <a href="tel:+918904704234" className="text-xl font-medium py-2 border-b border-border text-foreground/80 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <Phone size={20} className="text-green-600" />
            Call Now: +91 8904704234
          </a>
          <button className="text-xl font-medium py-2 border-b border-border text-foreground/80 text-left flex items-center gap-2" onClick={() => {
          setIsMenuOpen(false);
          setIsSearchOpen(true);
        }}>
            <Search size={20} />
            Search
          </button>
          <Link to="/booking" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
            Book Now
          </Link>
        </nav>
      </div>
      
      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display mb-4">Search for Availability</DialogTitle>
          </DialogHeader>
          <SearchForm />
        </DialogContent>
      </Dialog>
    </header>;
};
export default Navbar;