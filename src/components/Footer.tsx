import { Leaf, Phone, MapPin, Eye, ExternalLink, ArrowUp, Mail, ShoppingCart } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  
  const handleFootNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-branding" className="bg-brand-green-950 text-white pt-16 pb-8 relative overflow-hidden">
      
      {/* Decorative blurred back-lights */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-orange-500 rounded-full opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-12 w-64 h-64 bg-brand-green-500 rounded-full opacity-5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleFootNav('home')}>
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-brand-orange-500 to-brand-mango-500 flex items-center justify-center font-bold">
                <Leaf className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-display font-black text-xl tracking-tight uppercase">
                FRUTELLI<span className="text-brand-orange-500 font-mono text-xs ml-1 bg-brand-orange-100 text-brand-orange-700 px-1 py-0.5 rounded-sm">GH</span>
              </span>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed font-sans max-w-sm">
              Frutelli Company Ghana is a premium fruit juice manufacturer based in Accra, Ghana. We press local citrus, pineapples, and mangoes daily to makeordering simple, payment convenient, and delivery reliable.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://wa.me/233509335623?text=Hello%20Frutelli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange-500 hover:scale-105 duration-200 flex items-center justify-center text-xs"
                title="WhatsApp Us"
              >
                💬
              </a>
              <a 
                href="tel:0509335623" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-orange-500 hover:scale-105 duration-200 flex items-center justify-center text-xs"
                title="Call phone line"
              >
                📞
              </a>
              <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">050 933 5623</span>
            </div>

          </div>

          {/* Column 2: Quick Links Navigation triggers */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-orange-500">Quick Links</h4>
            <div className="grid grid-cols-1 gap-2">
              {([
                { id: 'home', label: 'Home Page' },
                { id: 'products', label: 'Our Juices' },
                { id: 'bulk', label: 'Bulk Orders' },
                { id: 'about', label: 'About Us' },
                { id: 'reviews', label: 'Client Reviews' },
                { id: 'contact', label: 'Contact Details' }
              ] as const).map((lnk) => (
                <button
                  key={lnk.id}
                  onClick={() => handleFootNav(lnk.id)}
                  className="text-left text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {lnk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & SEO Target details */}
          <div className="md:col-span-4 flex flex-col space-y-3 font-sans">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-orange-500 font-mono">FRUTELLI GHANA INFO</h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-orange-500 shrink-0 mt-0.5" />
                <span>HR53+P28, Accra, Ghana (Near central retail points)</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-brand-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p>050 933 5623</p>
                  <p className="text-[9px] font-mono text-gray-400">Opens Daily: 8:30am - 6:00pm</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-brand-orange-500 shrink-0 mt-0.5" />
                <span>sales@frutelli.com.gh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom footer bar with Copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <p className="text-[10px] text-gray-405 font-mono">
            © {currentYear} FRUTELLI COMPANY GHANA. All rights reserved. Registered FMCG in Accra, Ghana.
          </p>
          <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-mono">
            <span>By Amos Jusu for Accra, Ghana</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
            <span className="hover:text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to Top ↑
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
