import { COMPANY_DETAILS } from '../data';
import { ArrowUp, Phone, Mail, MapPin, Sparkles, Navigation } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTrackModal: () => void;
}

export default function Footer({ onNavigate, onOpenTrackModal }: FooterProps) {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'order', label: 'Order Inquiry' },
    { id: 'contact', label: 'Contact Coordinates' }
  ];

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-900 relative overflow-hidden font-sans">
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* Col 1: Branding */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 bg-white rounded-full p-1 border border-amber-400">
                <img
                  src={COMPANY_DETAILS.logo}
                  alt={COMPANY_DETAILS.name}
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-xl tracking-tight">
                <span className="text-amber-500">SunRice</span> Agro
              </span>
            </div>
            
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mb-6">
              Sourcing agricultural excellence from tribal area farms to deliver Sortex clean, hygienically processed 30 KG bags designed for household, commercial retail, and international markets.
            </p>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/91${COMPANY_DETAILS.whatsapp}`}
                target="_blank"
                className="p-2 bg-gray-900 hover:bg-emerald-600 border border-gray-850 hover:border-emerald-500 text-gray-300 hover:text-white rounded-xl transition-all"
                title="Chat on WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="p-2 bg-gray-900 hover:bg-amber-500 border border-gray-850 hover:border-amber-400 text-gray-300 hover:text-gray-950 rounded-xl transition-all"
                title="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-xs uppercase tracking-widest font-mono text-amber-500 font-bold mb-4">
              Quick Portals
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left text-xs text-gray-400 hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={onOpenTrackModal}
                className="text-left text-xs text-amber-400 hover:text-amber-300 hover:underline transition-colors cursor-pointer font-bold mt-1 flex items-center gap-1"
              >
                <span>📦</span> Track My Order
              </button>
            </div>
          </div>

          {/* Col 3: Practical Info */}
          <div className="md:col-span-4 flex flex-col gap-4 text-xs font-medium">
            <h4 className="text-xs uppercase tracking-widest font-mono text-amber-500 font-bold mb-1">
              Hub Coordinates
            </h4>
            
            <div className="flex gap-2.5 text-gray-400">
              <MapPin className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{COMPANY_DETAILS.address}</span>
            </div>

            <div className="flex gap-2.5 text-gray-400">
              <Phone className="h-4.5 w-4.5 text-amber-500 shrink-0" />
              <a href={`tel:+91${COMPANY_DETAILS.phone}`} className="hover:text-white hover:underline">
                Call: +91 {COMPANY_DETAILS.phone} (Sales Desk)
              </a>
            </div>

            <div className="flex gap-2.5 text-gray-400">
              <Mail className="h-4.5 w-4.5 text-amber-500 shrink-0" />
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white hover:underline">
                Email: {COMPANY_DETAILS.email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom border & License copy */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[11px] text-gray-500 font-sans text-center sm:text-left leading-normal">
            <div>© 2025 SunRice Agro. All Rights Reserved.</div>
            <div className="mt-0.5 text-[9px] text-gray-655 tracking-wider uppercase font-semibold">
              Nagpur Agrotech Operations • Sourced from premium tribal regions of India
            </div>
          </div>

          <button
            onClick={scrollUp}
            className="p-2.5 bg-gray-900 hover:bg-amber-500 border border-gray-850 hover:border-amber-400 text-gray-300 hover:text-gray-950 rounded-xl transition-all flex items-center justify-center cursor-pointer"
            title="Scroll To Top"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
