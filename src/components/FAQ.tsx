import { useState, ReactNode } from 'react';
import { 
  ChevronDown, 
  Truck, 
  CreditCard, 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: ReactNode;
  category: 'delivery' | 'payment' | 'general';
}

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>('delivery-time');
  const [activeCategory, setActiveCategory] = useState<'all' | 'delivery' | 'payment' | 'general'>('all');

  const FAQ_ITEMS: FAQItem[] = [
    {
      id: 'delivery-time',
      question: "How long does delivery take inside Accra?",
      answer: "We provide reliable, prompt daily delivery within Accra. For standard local orders placed before 10:00 AM, we offer same-day delivery right to your home, office, or gym. Orders received after 10:00 AM are automatically scheduled for early execution next morning. Custom event bundles or dispenser tank rentals require booking 48 hours in advance so our transport reps can guarantee optimal cold-chain placement.",
      icon: <Clock className="w-5 h-5 text-brand-orange-500" />,
      category: 'delivery'
    },
    {
      id: 'order-tracking',
      question: "How can I track my juice order once it's placed?",
      answer: "We prioritize warm, direct, personal connections with our customers, bypassing automated non-responsive trackers in favor of real-to-life updates. As soon as your order has been cold-pressed and sealed, you will receive a dispatch update directly on WhatsApp. We share your assigned dispatcher's mobile contact number and keep you posted with live updates until the thermal-insulated delivery bags reach your doorstep safely.",
      icon: <Truck className="w-5 h-5 text-brand-green-700" />,
      category: 'delivery'
    },
    {
      id: 'payment-methods',
      question: "What payment methods do you accept?",
      answer: "We make your transactions secure and highly convenient. We fully support all major Ghanaian Mobile Money networks (MTN MoMo, Telecel Cash, and AT Money) with fast offline confirmations. Additionally, we accept real-time bank transfers and secure electronic card options. For recurring commercial clients, supermarket vendors, and residential zones with pre-cleared access in central Accra, we are happy to offer Cash-on-Delivery options.",
      icon: <CreditCard className="w-5 h-5 text-brand-mango-600" />,
      category: 'payment'
    },
    {
      id: 'organic-purity',
      question: "Are your juices completely organic, and how long can I store them?",
      answer: "Absolutely! We stand proudly by our process: 100% natural, sweet, and squeezed here in Accra. There are absolutely zero chemical preservatives, artificial sweeteners, or food colorings inside. Because the juice is entirely active, raw, and pure, it must be stored inside a refrigerator set at or below 4°C, where it will remain delicious and nutritionally dense for up to 5 days. For longer storage, you can freeze it securely for up to 14 days.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-green-800" />,
      category: 'general'
    },
    {
      id: 'event-dispensers',
      question: "Can we book customized flavor setups for weddings or corporate seminars?",
      answer: "Yes, this is our speciality! We offer premium 5-litre insulated glass dispensers pre-chilled and pre-filled with the signature blends of your choice (such as local Sweet Orange or Ginger Passionfruit). Our catering crew handles the physical dropoff, elegant setup, and pick-up post-celebration. Please navigate to our Event catering portal or ping us directly on WhatsApp to format a custom corporate invoice proposal.",
      icon: <HeartHandshake className="w-5 h-5 text-brand-orange-550" />,
      category: 'payment'
    },
    {
      id: 'bulk-wholesale',
      question: "Do you offer special rates for gyms, supermarkets, and schools?",
      answer: "Definitely! Frutelli supports supermarkets, retail minimarts, organic food stores, boutique cafe shops, gyms, and primary schools across central Accra. Our wholesale price tier starts with low commercial case volumes (24 units of 500ml bottles). We also assist our active commercial partners with premium refrigerated dropoff scheduling and point-of-sale shelf guidelines to protect quality and boost business markup sales.",
      icon: <MapPin className="w-5 h-5 text-brand-green-650" />,
      category: 'general'
    }
  ];

  const filteredItems = FAQ_ITEMS.filter(item => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Frutelli team, I have some questions regarding delivery options or customized ordering. Please guide me.");
    return `https://wa.me/233509335623?text=${text}`;
  };

  return (
    <section id="faq-section" className="py-20 bg-brand-green-50/10 border-t border-b border-brand-green-100/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            HAVE QUESTIONS? WE HAVE ANSWERS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            Find immediate answers regarding delivery times, order trackings, and flexible Mobile Money checkouts to order your fresh Accra press with complete confidence.
          </p>
        </div>

        {/* Categories Navigation pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {([
            { id: 'all', label: 'All Questions' },
            { id: 'delivery', label: 'Delivery & Tracking' },
            { id: 'payment', label: 'Payments & Events' },
            { id: 'general', label: 'Purity & Wholesale' }
          ] as const).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-display font-bold text-xs tracking-wide cursor-pointer transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-orange-500 text-white shadow-xs'
                  : 'bg-white text-brand-green-950 hover:bg-brand-green-50 hover:text-brand-green-900 border border-brand-green-100/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List with custom Framer Motion height transitions */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-3xl transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'border-brand-orange-400 shadow-md ring-4 ring-brand-orange-500/5' 
                    : 'border-brand-green-100 hover:border-brand-orange-200'
                }`}
              >
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2.5 rounded-2xl transition-colors ${
                      isExpanded ? 'bg-brand-orange-50' : 'bg-slate-50'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-display font-black text-sm sm:text-base text-brand-green-950 group-hover:text-brand-orange-600 transition-colors">
                      {item.question}
                    </span>
                  </div>
                  
                  <span className={`p-1.5 rounded-full transition-transform duration-300 ${
                    isExpanded ? 'bg-brand-orange-100/50 text-brand-orange-600 rotate-180' : 'bg-slate-100 text-gray-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Content Accordion Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 pl-[70px] border-t border-slate-50">
                        <p className="font-sans text-xs sm:text-sm text-gray-650 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Helpful Contact Box shortcut below Accordions */}
        <div className="mt-12 p-6 bg-brand-green-950 text-white rounded-3xl text-center md:text-left md:flex md:items-center md:justify-between gap-6 shadow-lg border border-brand-green-900">
          <div className="space-y-1 mb-4 md:mb-0">
            <span className="text-[10px] font-mono font-bold text-brand-orange-400 uppercase tracking-widest block">
              STILL WONDERING ABOUT BULK CONTRACTS OR SPECIAL LOCATIONS?
            </span>
            <h4 className="font-display font-black text-lg text-white">
              Squeeze direct details in real-time
            </h4>
            <p className="text-xs text-brand-green-150 leading-relaxed font-sans max-w-xl">
              We deliver custom configurations to any residential zone, celebration lobby, or business campus in Accra. Send a direct request to our helpful representative instantly!
            </p>
          </div>
          <a
            href={getWhatsAppContact()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer text-center justify-center w-full md:w-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
