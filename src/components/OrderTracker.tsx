import { useState, FormEvent } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  MessageSquare, 
  User, 
  Phone, 
  ShieldCheck, 
  Info,
  ChevronRight,
  ArrowRight,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrackingState {
  orderId: string;
  customerName: string;
  items: string;
  orderTime: string;
  deliveryAddress: string;
  paymentMethod: string;
  currentStep: number; // 0: Received, 1: Pressing & Packaging, 2: Cold Storage, 3: Dispatched, 4: Delivered
  deliveryType: string;
  dispatcherName?: string;
  dispatcherPhone?: string;
  dispatcherPhoto?: string;
  eta: string;
  statusNotes: string;
}

// Built-in sample trackings for instant confidence tests
const PRESET_TRACKINGS: Record<string, TrackingState> = {
  'FRU-MOMO-2026': {
    orderId: 'FRU-MOMO-2026',
    customerName: 'Kofi Mensah',
    items: '4x Frutelli Orange (1L), 2x Frutelli Mango (1L)',
    orderTime: 'Today at 08:15 AM',
    deliveryAddress: '32 Ring Road Central, near Silver Star Tower, Accra',
    paymentMethod: 'MTN Mobile Money (Confirmed)',
    currentStep: 4,
    deliveryType: 'Standard Morning Delivery',
    dispatcherName: 'David Osei',
    dispatcherPhone: '+233 50 933 5623',
    eta: 'Delivered (10:24 AM Today)',
    statusNotes: 'Packed in chilled thermal-insulated safety bags. Handed directly to security reception desk as requested.'
  },
  'ACCRA-FAST-88': {
    orderId: 'ACCRA-FAST-88',
    customerName: 'Araba Quaynor',
    items: '1x Wholesale Case: Frutelli Mango (12 Cartons)',
    orderTime: 'Today at 09:30 AM',
    deliveryAddress: 'Pilates Circle Gym, Spintex Road, Accra',
    paymentMethod: 'Telecel Cash (Confirmed)',
    currentStep: 3,
    deliveryType: 'Priority Gym Restock Express',
    dispatcherName: 'Emmanuel Appiah',
    dispatcherPhone: '+233 54 887 1254',
    eta: 'Today by 12:45 PM (In Transit)',
    statusNotes: 'Cruising through Spintex. Thermal chest temperature locked at safe 3°C to shield pure raw flavor.'
  },
  'SEMINAR-5L': {
    orderId: 'SEMINAR-5L',
    customerName: 'Adom Business Hub',
    items: '2x Catering Dispenser Tanks (5L Glass) - Cocktail & Tropical Mix',
    orderTime: 'Yesterday at 04:00 PM',
    deliveryAddress: 'Ghana Trade Fair Center, Pavilion B, La, Accra',
    paymentMethod: 'Bank Transfer (Verified)',
    currentStep: 1,
    deliveryType: 'Event Catering & Setup Services',
    dispatcherName: 'Selasi Agbenu',
    dispatcherPhone: '+233 24 332 9988',
    eta: 'Tomorrow at 07:30 AM (Pre-arranged)',
    statusNotes: 'Litre quantities are currently being assembled. High-grade sterile glass dispensers are cleaning and pre-chilling today.'
  }
};

const STEPS_INFO = [
  { subtitle: "Order Verified", desc: "Received at headquarters. Payment cleared via secure MoMo/Transfer options." },
  { subtitle: "Cold-Press & Carton Seal", desc: "Pure fruits are pasteurized and packed into eco-friendly airtight cartons." },
  { subtitle: "Cold-Chain Logistics", desc: "Placed in sub-zero thermal coolers at the dispatch kitchen to seal freshness." },
  { subtitle: "Out with Dispatcher", desc: "On the move through Accra with real-time phone contact for zero-fuss handovers." },
  { subtitle: "Hydration Handover", desc: "Delivered to your safe spot, cold, fresh, and ready to treat your body!" }
];

export default function OrderTracker() {
  const [searchId, setSearchId] = useState('');
  const [currentTracking, setCurrentTracking] = useState<TrackingState | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const handleTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedId = searchId.trim().toUpperCase();
    if (!formattedId) return;

    setSearching(true);
    setErrorText(null);

    // Simulate realistic Accra local server network query tick
    setTimeout(() => {
      setSearching(false);
      
      // Check localStorage for orders created dynamically during checkout
      const cachedOrdersRaw = localStorage.getItem('frutelli-placed-orders');
      if (cachedOrdersRaw) {
        try {
          const cachedOrders = JSON.parse(cachedOrdersRaw);
          if (cachedOrders[formattedId]) {
            setCurrentTracking(cachedOrders[formattedId]);
            return;
          }
        } catch (e) {
          console.error('Error parsing local storage orders:', e);
        }
      }

      if (PRESET_TRACKINGS[formattedId]) {
        setCurrentTracking(PRESET_TRACKINGS[formattedId]);
      } else {
        // Generates a fully custom state on-the-fly for any random order format! 
        // This makes sure any guest inputting custom sequence gets a convincing, stunning mockup
        if (formattedId.length >= 4) {
          const pseudoSteps = [1, 2, 3];
          const chosenStep = pseudoSteps[formattedId.charCodeAt(0) % pseudoSteps.length];
          const randomCustomState: TrackingState = {
            orderId: formattedId,
            customerName: 'Valued Juice Lover',
            items: '1x Custom Frutelli Blend Carton Combination',
            orderTime: 'Today at 10:10 AM',
            deliveryAddress: 'Central Accra Residence Zone, GH',
            paymentMethod: 'Mobile Money Options',
            currentStep: chosenStep,
            deliveryType: 'Direct Prompt Delivery',
            dispatcherName: 'Frutelli Rider Rep',
            dispatcherPhone: '+233 50 933 5623',
            eta: 'Within 2 hours (Standard Accra Priority Plan)',
            statusNotes: 'We are currently processing this custom tracking query. Fresh pasteurized juices are matching your request.'
          };
          setCurrentTracking(randomCustomState);
        } else {
          setErrorText('Could not locate an active docket for that ID. Please use one of our instant preset keys below for live testing!');
          setCurrentTracking(null);
        }
      }
    }, 600);
  };

  const loadPreset = (presetId: string) => {
    setSearchId(presetId);
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setCurrentTracking(PRESET_TRACKINGS[presetId]);
      setErrorText(null);
    }, 450);
  };

  const getWhatsAppPing = (tracking: TrackingState) => {
    const text = encodeURIComponent(`Hello Frutelli, I am checking the active progress of my Accra Juice Order ID: *${tracking.orderId}*. Please provide a real-time status update.`);
    return `https://wa.me/233509335623?text=${text}`;
  };

  return (
    <section id="order-tracker-portal" className="py-20 bg-linear-to-b from-white via-brand-green-50/5 to-white border-t border-brand-green-100/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> ACCRA DISPATCH HUB
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Track Delivery in Real-Time
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            Enter your booking invoice reference below to view your carton cold-chain logistics progress, estimated arrival times, and friendly Accra delivery rider profiles instantly.
          </p>
        </div>

        {/* Search Input Container Box */}
        <div className="max-w-xl mx-auto bg-white border border-brand-green-100 rounded-3xl p-6 shadow-sm mb-10 text-left">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div>
              <label htmlFor="trackingId" className="block text-xs font-mono font-black text-brand-green-950 uppercase tracking-wider mb-2">
                Order Tracking ID / Reference Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    id="trackingId"
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. ACCRA-FAST-88"
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-brand-green-100 bg-slate-50/40 text-brand-green-950 placeholder-gray-400 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={searching || !searchId.trim()}
                  className="px-6 py-3 rounded-xl bg-brand-green-800 text-white font-display text-xs font-bold hover:bg-brand-green-900 transition-colors cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1"
                >
                  {searching ? 'Querying...' : 'Track'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Quick Demo Pre-set Badges (Crucial for building confidence during checkout tests) */}
          <div className="mt-5 pt-4.5 border-t border-slate-100">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
              Click to preview interactive Accra live-delivery status states:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => loadPreset('FRU-MOMO-2026')}
                className="text-[10px] font-mono font-black bg-brand-green-50 text-brand-green-800 hover:bg-brand-green-100/50 py-1.5 px-3 rounded-lg border border-brand-green-200/40 transition-colors cursor-pointer"
              >
                ✓ FRU-MOMO-2026 (Delivered)
              </button>
              <button
                onClick={() => loadPreset('ACCRA-FAST-88')}
                className="text-[10px] font-mono font-black bg-brand-orange-50 text-brand-orange-650 hover:bg-brand-orange-100/50 py-1.5 px-3 rounded-lg border border-brand-orange-200/40 transition-colors cursor-pointer"
              >
                🚚 ACCRA-FAST-88 (In Transit)
              </button>
              <button
                onClick={() => loadPreset('SEMINAR-5L')}
                className="text-[10px] font-mono font-black bg-amber-50 text-brand-mango-600 hover:bg-amber-100/50 py-1.5 px-3 rounded-lg border border-amber-200/40 transition-colors cursor-pointer"
              >
                🍯 SEMINAR-5L (In Press Room)
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {errorText && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorText}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Results Display Area */}
        <AnimatePresence mode="wait">
          {currentTracking && (
            <motion.div
              key={currentTracking.orderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white border border-brand-green-100 rounded-4xl p-6 sm:p-8 shadow-md text-left max-w-4xl mx-auto"
            >
              {/* Header section with Reference, Delivery type & ETA status */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black bg-brand-orange-500 text-white px-2.5 py-0.5 rounded">
                      ORDER ID: {currentTracking.orderId}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-gray-400">
                      • {currentTracking.deliveryType}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl text-brand-green-950">
                    Recipient: {currentTracking.customerName}
                  </h3>
                </div>

                <div className="bg-brand-green-50 p-4 rounded-2xl flex items-center space-x-3 border border-brand-green-100/50">
                  <div className="p-2 bg-brand-green-800 text-white rounded-xl">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-brand-green-800 uppercase tracking-widest block">
                      Estimated Arrival / Status
                    </span>
                    <span className="text-sm font-bold font-mono text-brand-green-950">
                      {currentTracking.eta}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Tracking Timeline Steps */}
              <div className="py-8">
                <h4 className="text-xs font-mono font-black text-brand-green-950 uppercase tracking-widest mb-6">
                  Logistics Checkpoint Chain
                </h4>
                
                {/* Horizontal / Vertical Line based on screen sizes */}
                <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                  
                  {/* Background Progress connector bar (Desktop horizontal version) */}
                  <div className="hidden md:block absolute top-[18px] left-[3%] right-[3%] h-1 bg-gray-100 -z-10 rounded-full">
                    <div 
                      className="h-full bg-brand-green-800 transition-all duration-500"
                      style={{ width: `${(currentTracking.currentStep / (STEPS_INFO.length - 1)) * 100}%` }}
                    />
                  </div>

                  {/* Individual Node Items mapping list */}
                  {STEPS_INFO.map((step, idx) => {
                    const isCompleted = idx < currentTracking.currentStep;
                    const isActive = idx === currentTracking.currentStep;
                    const isLast = idx === STEPS_INFO.length - 1;

                    return (
                      <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center flex-1 relative gap-4 md:gap-2">
                        {/* Status Icon Orb indicator */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-brand-green-800 text-white border-2 border-brand-green-800 shadow-sm'
                            : isActive
                              ? 'bg-brand-orange-500 text-white ring-4 ring-brand-orange-100/80 animate-bounce'
                              : 'bg-white text-gray-300 border-2 border-gray-200'
                        }`}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        {/* Title text and subtle micro description */}
                        <div className="space-y-0.5">
                          <span className={`text-[11px] font-display font-black block tracking-tight leading-tight ${
                            isActive ? 'text-brand-orange-600' : isCompleted ? 'text-brand-green-950' : 'text-gray-400 font-normal'
                          }`}>
                            {step.subtitle}
                          </span>
                          <p className="text-[10px] text-gray-500 font-sans leading-snug md:max-w-[130px] md:mx-auto">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Status Note card & Info list */}
              <div className="p-4.5 bg-brand-green-50/30 rounded-2xl border border-brand-green-100/30 flex gap-3 text-xs mb-6">
                <Info className="w-5 h-5 text-brand-green-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-black text-brand-green-900 uppercase block mb-0.5">
                    Rider Note:
                  </span>
                  <p className="text-gray-700 leading-relaxed font-sans">
                    "{currentTracking.statusNotes}"
                  </p>
                </div>
              </div>

              {/* Layout Footer Details: Location, payment method, dispatcher and WhatsApp hot contact details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                
                {/* Delivery details left column */}
                <div className="space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-gray-400 block uppercase text-[10px]">
                        Destination Address
                      </span>
                      <span className="font-sans text-brand-green-950">{currentTracking.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-green-850 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-gray-400 block uppercase text-[10px]">
                        Payment & Order Details
                      </span>
                      <span className="font-sans font-medium text-brand-green-950 block">{currentTracking.paymentMethod}</span>
                      <span className="text-[10px] text-gray-400 block font-sans">{currentTracking.items}</span>
                    </div>
                  </div>
                </div>

                {/* Dispatcher Rep card and instant help right column */}
                <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col justify-between">
                  {currentTracking.dispatcherName ? (
                    <div className="flex items-center space-x-3">
                      {/* Avatar initials generator to prevent broken image references */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-orange-500 to-brand-orange-600 text-white font-display font-black text-lg flex items-center justify-center shrink-0 shadow-xs border-2 border-white">
                        {currentTracking.dispatcherName.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                          Assigned Dispatch Rep
                        </span>
                        <h5 className="font-display font-black text-sm text-brand-green-950">
                          {currentTracking.dispatcherName}
                        </h5>
                        <p className="text-[10px] text-gray-500 font-sans flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-brand-orange-500" />
                          {currentTracking.dispatcherPhone}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-display font-black text-xs text-brand-green-950">Preparing Rider</h5>
                        <p className="text-[9px] text-gray-400 font-mono">Selecting optimal temperature dispatcher</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3.5 border-t border-slate-200/50 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={getWhatsAppPing(currentTracking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2.5 px-4 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ping on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Confidence Building Features banner under tracker */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-slate-100 pt-10">
          <div className="space-y-1.5 p-4 rounded-2xl hover:bg-brand-green-50/20 transition-colors">
            <span className="w-8 h-8 bg-brand-orange-100 text-brand-orange-650 rounded-lg flex items-center justify-center font-bold">
              1
            </span>
            <h5 className="font-display font-black text-sm text-brand-green-950">
              Chilled Insulation Bags
            </h5>
            <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
              We pack every carton in luxury chilled thermal pouches with dry-ice seals. This prevents atmospheric changes from altering original raw vitamin chains.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl hover:bg-brand-green-50/20 transition-colors">
            <span className="w-8 h-8 bg-brand-green-100 text-brand-green-800 rounded-lg flex items-center justify-center font-bold">
              2
            </span>
            <h5 className="font-display font-black text-sm text-brand-green-950">
              Direct Rider Callouts
            </h5>
            <p className="text-[11px] text-gray-550 font-sans leading-relaxed">
              Skip static automated delivery codes. Call, sms, or ping your assigned motor rep directly for exact Accra landmarks, security gates, or delivery placement setups.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl hover:bg-brand-green-50/20 transition-colors">
            <span className="w-8 h-8 bg-amber-100 text-brand-mango-600 rounded-lg flex items-center justify-center font-bold">
              3
            </span>
            <h5 className="font-display font-black text-sm text-brand-green-950">
              Same-Day Accra Shipping
            </h5>
            <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
              We process everyday morning orders placed before 10:00 AM straight-away for home or office setups. Rest assured, your raw Accra nutrition reaches securely.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
