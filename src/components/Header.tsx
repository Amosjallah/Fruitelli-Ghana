import { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingCart, Leaf } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, onOpenCart }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Our Juices' },
    { id: 'bulk', label: 'Bulk Orders' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsOpen(false);
    // Smooth scroll to top of component/page content if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-effect py-3 shadow-md border-b border-brand-green-100/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand Area */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-orange-500 to-brand-mango-500 flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform duration-300 group-hover:scale-110">
              <Leaf className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-brand-green-950 uppercase flex items-center">
                Frutelli
                <span className="text-brand-orange-500 text-xs font-semibold ml-1.5 px-1.5 py-0.5 bg-brand-orange-100 rounded-md font-mono normal-case tracking-normal">GH</span>
              </span>
              <p className="text-[9px] text-brand-green-800 font-bold tracking-widest font-mono uppercase -mt-1 block">Freshness Unleashed</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-display font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-brand-green-800 text-white shadow-xs'
                    : 'text-brand-green-950 hover:bg-brand-orange-50 hover:text-brand-orange-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call-to-Action with Direct WhatsApp Integration */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:0509335623"
              className="flex items-center space-x-1 text-xs text-brand-green-950 font-mono font-bold hover:text-brand-orange-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-orange-500" />
              <span>050 933 5623</span>
            </a>
            <button
              onClick={onOpenCart}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-sans font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg origin-center cursor-pointer border-none"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-3.5 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green-950 text-[9px] font-mono font-black text-white ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>My Cart</span>
            </button>
          </div>

          {/* Mobile responsive hamburger toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange-500 text-white shadow-md cursor-pointer border-none"
              title="Open Delivery Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green-950 text-[8px] font-mono font-black text-white ring-1.5 ring-brand-orange-500">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-brand-green-950 hover:bg-brand-orange-50 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden glass-effect animate-in slide-in-from-top-4 duration-200 shadow-xl border-b border-brand-green-100 flex flex-col px-4 pt-4 pb-6 space-y-3 mt-3">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-display font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-brand-green-800 text-white'
                    : 'text-brand-green-950 hover:bg-brand-orange-50 hover:text-brand-orange-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-brand-green-100 my-2" />

          <div className="flex flex-col space-y-3 px-4">
            <div className="flex items-center justify-between text-xs font-mono text-brand-green-900">
              <span className="flex items-center gap-1 font-bold">
                <Phone className="w-4 h-4 text-brand-orange-500" />
                Call Directly:
              </span>
              <a href="tel:0509335623" className="font-bold underline text-brand-orange-600 hover:text-brand-orange-700">
                050 933 5623
              </a>
            </div>
            <a
              href="https://wa.me/233509335623?text=Hello%20Frutelli,%20I%20would%20like%20to%20place%20an%20order%20for%20your%20juice%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display font-semibold text-center shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
