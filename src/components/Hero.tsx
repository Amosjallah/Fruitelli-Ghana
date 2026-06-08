import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  MapPin, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Store 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';
import lineupImg from '../assets/images/frutelli_juices_lineup_1780884511807.png';

interface HeroProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isHovered, setIsHovered] = useState(false);

  const SLIDES = [
    {
      id: 1,
      tag: "100% Ghanaian Pride",
      tagIcon: <Sparkles className="w-3.5 h-3.5 text-brand-orange-500" />,
      headline: "Fresh, Wholesome Juice ",
      headlineHighlight: "Squeezed in Accra",
      description: "Frutelli Company Ghana produces premium, all-natural juices packaged in convenient, high-quality cartons. Squeezed daily with the finest local sweet Oranges, Mangoes, Pineapples, and exotic mixed fruits without any added sweeteners or preservatives.",
      primaryCtaText: "Order on WhatsApp",
      primaryCtaUrl: "https://wa.me/233509335623?text=Hello%20Frutelli,%20I%2520would%252520like%252520to%252520place%252520an%25252520order%25252520for%25252520your%25252520fresh%25252520carton%25252520juices.",
      secondaryCtaText: "Explore Products",
      secondaryCtaTab: 'products' as ActiveTab,
      image: lineupImg,
      imageAlt: "Frutelli premium carton juice range lining up in a row",
      cornerBadge: "🔥 Hot Seller Accra",
      features: ["Preservative-Free", "100% Sourced Locally", "Made Everyday"],
      floatBadge1: {
        title: "100% Organically Sourced",
        subtitle: "No added chemicals",
        icon: <Award className="w-5 h-5 text-brand-mango-500 fill-brand-mango-500/10" />
      },
      floatBadge2: {
        title: "Accra Home Delivery",
        subtitle: "Swift & Safe",
        icon: <Truck className="w-5 h-5 text-brand-orange-500 animate-bounce" />
      },
      trustBadges: [
        { label: "Google Rating", value: "5.0 ★", desc: "8 Real Reviews" },
        { label: "Process", value: "Simple", desc: "Delivery Included" },
        { label: "Method", value: "Easy", desc: "Mobile Money" },
        { label: "Location", value: "Accra", desc: "Based in Ghana" }
      ]
    },
    {
      id: 2,
      tag: "Celebrations & Banquets",
      tagIcon: <Sparkles className="w-3.5 h-3.5 text-pink-500" />,
      headline: "Elevate Your Events with ",
      headlineHighlight: "Juice Dispensers",
      description: "Treat your guests to our pre-chilled 5-litre sealed glass beverage dispensers pre-filled with top Frutelli flavors. Splendid for weddings, birthdays, workshops, and business conferences across Accra.",
      primaryCtaText: "Book Event Catering",
      primaryCtaUrl: "https://wa.me/233509335623?text=Hello%20Frutelli,%20I%20would%20like%20to%20inquire%20about%252520your%25252520Event%25252520Catering%25252520and%25252520dispenser%25252520tanks.",
      secondaryCtaText: "Event Bundles",
      secondaryCtaTab: 'products' as ActiveTab,
      image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=700",
      imageAlt: "Luxury beverage dispenser station with fresh fruits setup at an elegant banquet",
      cornerBadge: "🌿 Premium Event Spec",
      features: ["Setup & Tear-down Included", "Clean Glass Containers", "Custom Flavor Mix"],
      floatBadge1: {
        title: "Pre-Chilled Delivery",
        subtitle: "Keeps drinks frosty",
        icon: <ShieldCheck className="w-5 h-5 text-brand-orange-500" />
      },
      floatBadge2: {
        title: "Prestige Setup",
        subtitle: "Hostess support optional",
        icon: <Sparkles className="w-5 h-5 text-brand-mango-500" />
      },
      trustBadges: [
        { label: "Tanks", value: "5 Litre", desc: "Multi-Serve Capacities" },
        { label: "Service", value: "All-In", desc: "Deliver & Set Up" },
        { label: "Options", value: "Self-Serve", desc: "Fewer Buffet Queues" },
        { label: "Booking", value: "Flexible", desc: "Secure Date Today" }
      ]
    },
    {
      id: 3,
      tag: "Gyms, Stores & Offices",
      tagIcon: <Store className="w-3.5 h-3.5 text-brand-green-600" />,
      headline: "Reliable Wholesale Supply for ",
      headlineHighlight: "Local Businesses",
      description: "Keep your commercial shelves loaded or treat your workforce. Frutelli supplies reputable Accra supermarkets, fruit cafes, corporate offices, primary schools, and fitness centers with great bulk rates.",
      primaryCtaText: "Apply as Partner",
      primaryCtaUrl: "https://wa.me/233509335623?text=Hello%20Frutelli,%20I%20am%20interested%20in%252520Wholesale%25252520or%25252520Bulk%25252520supply%25252520for%25252520my%25252520business.",
      secondaryCtaText: "Bulk Inquiry",
      secondaryCtaTab: 'bulk' as ActiveTab,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=700",
      imageAlt: "Tidy row of organic freshly batched fruit juice jars in cold-room packaging storage",
      cornerBadge: "📈 Wholesale Special Rate",
      features: ["Volume Discounts", "Cold Chain Logistics", "FDA Compliant Guidelines"],
      floatBadge1: {
        title: "Commercial Prices",
        subtitle: "Scalable tier savings",
        icon: <Award className="w-5 h-5 text-brand-green-700" />
      },
      floatBadge2: {
        title: "Cold Chain Logistics",
        subtitle: "Always-fresh dropoffs",
        icon: <Truck className="w-5 h-5 text-brand-orange-500 animate-pulse" />
      },
      trustBadges: [
        { label: "MoQ", value: "Low Cases", desc: "Start Small & Scale" },
        { label: "Quality", value: "Guaranteed", desc: "Premium Standard" },
        { label: "Delivery", value: "Weekly", desc: "Recurring Options" },
        { label: "Support", value: "24/7", desc: "Dedicated Reps" }
      ]
    }
  ];

  // Auto-slide effect, pausing if client is interacting
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  // Variants for slide transition
  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // Custom ease out cubic/quartic
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  // Get active slide object
  const activeSlide = SLIDES[currentSlide];

  return (
    <section 
      id="hero-section" 
      className="relative pt-24 md:pt-36 pb-14 md:pb-22 overflow-hidden bg-radial from-brand-orange-50/75 via-transparent to-transparent select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Decorative Floating Fruit Gradients */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-orange-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-green-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Slider Bounds */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[660px] md:min-h-[580px] flex flex-col justify-center">
        
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full"
          >
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
              
              {/* Super Header Tag */}
              <div className="inline-flex items-center justify-center lg:justify-start">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-green-150 text-brand-green-800 text-xs font-bold tracking-wider font-mono uppercase flex items-center gap-1.5 shadow-xs">
                  {activeSlide.tagIcon}
                  {activeSlide.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-black text-3xl sm:text-4.5xl md:text-5.5xl text-brand-green-950 leading-[1.1] tracking-tight">
                {activeSlide.headline} <br />
                <span className="text-gradient-orange-mango">{activeSlide.headlineHighlight}</span>
              </h1>

              {/* Sub-headline */}
              <p className="font-sans text-sm sm:text-base text-gray-750 max-w-2xl mx-auto lg:mx-0 leading-relaxed min-h-[72px]">
                {activeSlide.description}
              </p>

              {/* Core Trust Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/80 p-4 rounded-2xl border border-brand-green-100/40 shadow-xs max-w-xl mx-auto lg:mx-0">
                {activeSlide.trustBadges.map((badge, bIdx) => (
                  <div 
                    key={bIdx} 
                    className={`flex flex-col items-center lg:items-start p-1 text-center lg:text-left ${
                      bIdx > 0 ? "border-l border-gray-150 pl-3" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-0.5 text-brand-mango-600 font-bold">
                      {bIdx === 0 && <Star className="w-3.5 h-3.5 fill-brand-mango-500 text-brand-mango-500" />}
                      <span className="text-xs font-mono font-black text-brand-green-950">{badge.value}</span>
                    </div>
                    <span className="text-[10px] text-gray-550 font-bold uppercase tracking-wider mt-0.5 leading-none">
                      {badge.label}
                    </span>
                    <span className="text-[9px] text-gray-450 mt-0.5 font-medium leading-none">
                      {badge.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={activeSlide.primaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display font-bold text-sm tracking-wide transition-all duration-300 hover:scale-103 shadow-lg hover:shadow-brand-orange-500/20 text-center cursor-pointer"
                >
                  {activeSlide.primaryCtaText}
                </a>
                <button
                  onClick={() => onNavigate(activeSlide.secondaryCtaTab)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-brand-orange-50 text-brand-green-950 border border-brand-green-100 font-display font-semibold text-sm transition-all duration-300 hover:border-brand-orange-500 text-center cursor-pointer flex items-center justify-center gap-2 group shadow-xs hover:shadow-sm"
                >
                  <span>{activeSlide.secondaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange-500 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Quick trust assurances */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-mono text-gray-500 pt-1">
                {activeSlide.features.map((feat, fIdx) => (
                  <span key={fIdx} className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-brand-green-500" />
                    {feat}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column: High-Impact Visual Image Display with Floating Overlays */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center">
              
              {/* Glowing backdrop halo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-brand-orange-500 to-brand-mango-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

              {/* Main Visual Image container */}
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-4xl border border-brand-green-100/80 p-1 bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                
                {/* Image Component with fallback gradient */}
                <div className="relative w-full h-full rounded-[30px] overflow-hidden group">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle dark gradient overlay inside image to lift text elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

                  {/* Corner tag overlay inside image */}
                  <div className="absolute top-4 right-4 text-white font-black font-mono text-[9px] tracking-widest uppercase py-1.5 px-3.5 bg-black/60 backdrop-blur-xs rounded-full border border-white/10">
                    {activeSlide.cornerBadge}
                  </div>

                  <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-xs py-1 px-3 rounded-md">
                    🇬🇭 Prepared & Sealed in Accra
                  </span>
                </div>

              </div>

              {/* Floating Badge 1 - Left / Top aligned */}
              <div className="absolute -bottom-4 -right-1 sm:-right-4 px-4 py-2.5 rounded-2xl bg-white border border-brand-green-100/60 shadow-xl flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform duration-300 z-20 max-w-[200px] sm:max-w-xs text-left">
                {activeSlide.floatBadge1.icon}
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-brand-green-950 tracking-tight leading-none mb-0.5">
                    {activeSlide.floatBadge1.title}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-none">
                    {activeSlide.floatBadge1.subtitle}
                  </span>
                </div>
              </div>

              {/* Floating Badge 2 - Right / Bottom aligned */}
              <div className="absolute top-6 -left-2 sm:-left-6 px-4 py-2.5 rounded-2xl bg-white border border-brand-green-100/60 shadow-xl flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform duration-300 z-20 max-w-[200px] sm:max-w-xs text-left">
                {activeSlide.floatBadge2.icon}
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-brand-green-950 tracking-tight leading-none mb-0.5">
                    {activeSlide.floatBadge2.title}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-none">
                    {activeSlide.floatBadge2.subtitle}
                  </span>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* --- CONTROLS BAR: ARROWS & DOTS --- */}
        <div className="flex items-center justify-between mt-12 md:mt-16 bg-brand-green-50/20 border border-brand-green-100/20 p-3 rounded-2xl max-w-lg mx-auto w-full">
          
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-white border border-brand-green-100/50 text-brand-green-950 hover:bg-brand-orange-50 hover:text-brand-orange-650 hover:border-brand-orange-400 transition-all cursor-pointer active:scale-95 shadow-xs"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Navigation Indicator */}
          <div className="flex space-x-2.5 items-center">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  idx === currentSlide 
                    ? "w-8 h-2.5 bg-brand-orange-500" 
                    : "w-2.5 h-2.5 bg-brand-green-200 hover:bg-brand-green-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-white border border-brand-green-100/50 text-brand-green-950 hover:bg-brand-orange-50 hover:text-brand-orange-650 hover:border-brand-orange-400 transition-all cursor-pointer active:scale-95 shadow-xs"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

    </section>
  );
}
