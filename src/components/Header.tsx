import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ShoppingCart, MessageSquare, Truck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTrackModal: () => void;
}

export default function Header({ activeSection, onNavigate, onOpenTrackModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'order', label: 'Order Now' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full bg-white p-1 shadow-md border border-amber-300 group-hover:scale-105 transition-transform">
                <img
                  src={COMPANY_DETAILS.logo}
                  alt={COMPANY_DETAILS.name}
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className={`block font-display font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${
                  isScrolled ? 'text-white' : 'text-gray-900 md:text-white'
                }`}>
                  <span className="text-amber-500">SunRice</span> Agro
                </span>
                <span className={`block text-[10px] tracking-widest font-mono uppercase ${
                  isScrolled ? 'text-amber-400' : 'text-amber-500'
                }`}>
                  NAGPUR • TRUSTED BRAND
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-4 py-2 font-medium text-sm transition-colors duration-300 cursor-pointer ${
                      isActive
                        ? 'text-amber-400 font-semibold'
                        : isScrolled
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-800 hover:text-gray-900 md:text-gray-200 md:hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CTA Contact Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onOpenTrackModal}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-amber-400 py-2 px-4 rounded-full border border-amber-500/20 active:scale-95 transition-all text-center cursor-pointer shadow-md"
              >
                <Truck className="h-3.5 w-3.5" />
                Track Order
              </button>
              <a
                href={`tel:+91${COMPANY_DETAILS.phone}`}
                className="flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white bg-gray-900/40 py-1.5 px-3 rounded-full border border-gray-700/50"
              >
                <Phone className="h-3 w-3 text-amber-500" />
                +91 {COMPANY_DETAILS.phone}
              </a>
              <button
                onClick={() => handleLinkClick('order')}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-gray-900 py-2 px-5 rounded-full shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all text-center cursor-pointer"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Order Now
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenTrackModal}
                className="p-2 rounded-full bg-gray-900 text-amber-400 border border-amber-500/20 shadow-md active:scale-95 transition-all"
                title="Track Order Status"
              >
                <Truck className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleLinkClick('order')}
                className="p-2 rounded-full bg-amber-500 text-gray-900 shadow-md active:scale-95 transition-transform"
                title="Order Now"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-900 md:text-white hover:bg-gray-200 md:hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[280px] bg-gray-950 p-6 flex flex-col justify-between shadow-2xl border-l border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-16">
                <div className="mb-8 pb-4 border-b border-gray-800">
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-500 block mb-1">
                    Navigation Menu
                  </span>
                  <span className="text-gray-400 text-sm">SunRice Agro Nagpur</span>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleLinkClick(link.id)}
                        className={`w-full py-3 px-4 rounded-xl text-left font-display font-semibold transition-all flex justify-between items-center ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-amber-500 shadow-md' : 'bg-transparent'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-gray-800">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTrackModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-905 hover:bg-gray-850 rounded-xl font-bold uppercase text-xs tracking-wider border border-amber-500/20 text-amber-400 shadow-md cursor-pointer"
                >
                  <Truck className="h-4 w-4" />
                  Track My Order
                </button>
                <a
                  href={`tel:+91${COMPANY_DETAILS.phone}`}
                  className="flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-gray-850 rounded-xl font-mono text-sm border border-gray-800 text-gray-200"
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  +91 {COMPANY_DETAILS.phone}
                </a>
                <button
                  onClick={() => handleLinkClick('order')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-xl font-bold uppercase text-xs tracking-wider shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Order On WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
