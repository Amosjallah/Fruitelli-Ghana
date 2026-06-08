import { useState } from 'react';
import { Calculator, HelpCircle, Phone, MessageSquare, ShieldCheck, CheckSquare, Award, ArrowRight, Sparkles, Building, ShoppingBag, PartyPopper } from 'lucide-react';

export default function BulkOrders() {
  const [estimatedCases, setEstimatedCases] = useState('10');
  const [selectedFlavor, setSelectedFlavor] = useState('Tropical Blend');

  // Calculates estimated liters (assuming 24 bottles per case of 500ml = 12L per case)
  const calculateVolumeLiters = (casesStr: string) => {
    const parsed = parseInt(casesStr, 10);
    if (isNaN(parsed) || parsed < 0) return 0;
    return parsed * 12;
  };

  const getWhatsAppSubmitLink = () => {
    const baseUrl = "https://wa.me/233509335623";
    const liters = calculateVolumeLiters(estimatedCases);
    const text = encodeURIComponent(
      `Hello Frutelli Ghana, I am contacting you from the website about a *Bulk Order Enquiry*.\n\n` +
      `• Estimated Need: *${estimatedCases} Cases*\n` +
      `• Preferred Flavor: *${selectedFlavor}*\n` +
      `• Estimated Total Volume: *${liters} Litres*\n\n` +
      `Please provide wholesale price tiers, payment options, and delivery timeline for this quantity.`
    );
    return `${baseUrl}?text=${text}`;
  };

  const targets = [
    {
      title: "Catering & Private Events",
      description: "Weddings, funerals, birthdays, and anniversaries. Our custom sealed 5L dispensers or bulk cold cases keep your guests fully refreshed.",
      icon: PartyPopper,
      badge: "Festive"
    },
    {
      title: "Retailers & Supermarkets",
      description: "Convenience stores, minimarts, gas stations, and supermarkets across Accra. We supply durable bottles with clear expiry stamps.",
      icon: ShoppingBag,
      badge: "Wholesale Distribution"
    },
    {
      title: "Churches, Schools & Offices",
      description: "Wholesome morning refreshments or daily meal plans. We deliver at accurate schedules weekly so your team/assembly stays healthy.",
      icon: Building,
      badge: "Weekly Retainers"
    }
  ];

  return (
    <section id="bulk-orders-section" className="py-20 bg-linear-to-b from-brand-green-50/20 via-white to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            DISTRIBUTION & B2B PARTNERSHIPS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Need Frutelli Juice in Bulk?
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            We supply premium fresh juice for retail shops, event planners, offices, schools, churches, hotels, and wholesalers looking for a highly reliable beverage manufacturing partner in Accra.
          </p>
        </div>

        {/* Dual Column Layout: Features & Dynamic Price Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Area: Audience Target Blocks */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <h3 className="font-display font-black text-2xl text-brand-green-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-orange-500" />
              Tailored Commercial Solutions
            </h3>

            <div className="flex flex-col space-y-6">
              {targets.map((target, idx) => {
                const TargetIcon = target.icon;
                return (
                  <div key={idx} className="flex gap-4 p-5 rounded-3xl bg-white border border-brand-green-100 hover:border-brand-orange-500/40 shadow-xs transition-colors text-left">
                    <div className="w-11 h-11 rounded-2xl bg-brand-orange-50 flex items-center justify-center shrink-0">
                      <TargetIcon className="w-5.5 h-5.5 text-brand-orange-500" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-black text-brand-orange-600 uppercase tracking-widest block mb-0.5">{target.badge}</span>
                      <h4 className="font-display font-bold text-lg text-brand-green-950 mb-1">{target.title}</h4>
                      <p className="text-xs text-gray-650 leading-relaxed font-sans">{target.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* General Benefits Checklist */}
            <div className="p-6 bg-brand-green-50/50 rounded-3xl border border-brand-green-100/40 text-left">
              <h4 className="font-display font-bold text-sm text-brand-green-950 uppercase tracking-wider mb-4">
                Frutelli Wholesale Guarantees
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Cold storage transport ready",
                  "Direct bank or MoMo invoicing",
                  "Verified health compliance",
                  "Accurate morning delivery schedules",
                  "Attractive tiered wholesale discounts",
                  "Custom catering dispensers available"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-sans text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-brand-green-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Area: Interactive Bulk Estimator Form */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-white border border-brand-green-100 rounded-4xl shadow-2xl relative overflow-hidden text-left.">
              
              {/* Form top graphic */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-mango-citrus" />

              <div className="flex items-center space-x-2 mb-6">
                <Calculator className="w-5 h-5 text-brand-orange-500" />
                <h4 className="font-display font-black text-xl text-brand-green-950 uppercase tracking-tight">Wholesale Estimator</h4>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-6 font-sans">
                Estimate your custom distribution needs below. We will calculate estimated volumes and generate your pre-formatted order template to send directly via WhatsApp.
              </p>

              {/* Form Fields */}
              <div className="space-y-4">
                
                {/* Flavor Selection */}
                <div className="flex flex-col text-left">
                  <label className="text-xs font-mono font-bold text-brand-green-950 uppercase mb-1.5 block">Select Main Drink</label>
                  <select
                    value={selectedFlavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-green-100 bg-white text-xs font-medium focus:outline-hidden focus:border-brand-orange-500 transition-colors"
                  >
                    <option value="Frutelli Orange Juice">Frutelli Orange Juice</option>
                    <option value="Frutelli Mango juice">Frutelli Mango Juice</option>
                    <option value="Frutelli Pineapple Juice">Frutelli Pineapple Juice</option>
                    <option value="Frutelli Mixed Fruit juice">Frutelli Mixed Fruit Juice</option>
                    <option value="Tropical Blend">Frutelli Tropical Blend (Best Seller)</option>
                    <option value="Frutelli Party Pack">Catering Dispensers / Party Packs</option>
                  </select>
                </div>

                {/* Case Input */}
                <div className="flex flex-col text-left">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono font-bold text-brand-green-950 uppercase block">Estimated Cases</label>
                    <span className="text-[10px] text-gray-400 font-mono">1 Case = 24 Bottles (500ml)</span>
                  </div>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    placeholder="Enter case quantity (min 5)"
                    value={estimatedCases}
                    onChange={(e) => setEstimatedCases(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-green-100 bg-white text-xs font-mono focus:outline-hidden focus:border-brand-orange-500 transition-colors"
                  />
                </div>

                {/* Real-time Calculation Panel */}
                <div className="p-4 bg-brand-green-50/50 rounded-2xl border border-brand-green-100/40 space-y-2 mt-2">
                  <div className="flex justify-between text-xs font-sans text-gray-600">
                    <span>Bottles Count:</span>
                    <span className="font-bold font-mono text-brand-green-950">{(parseInt(estimatedCases, 10) || 0) * 24} Units</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans text-gray-600">
                    <span>Approx. Total Volume:</span>
                    <span className="font-bold font-mono text-brand-green-950">{calculateVolumeLiters(estimatedCases)} Litres</span>
                  </div>
                  <div className="h-px bg-brand-green-100/40 my-1" />
                  <div className="flex justify-between text-xs font-sans text-brand-green-950 font-bold">
                    <span>Delivery Location:</span>
                    <span className="font-mono text-brand-orange-600">Accra Metro</span>
                  </div>
                </div>

                {/* Conversion Links / CTAs */}
                <div className="flex flex-col space-y-2.5 pt-4">
                  <a
                    href={getWhatsAppSubmitLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-4.5 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-sm font-bold tracking-wide shadow-lg hover:shadow-brand-orange-500/10 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Request Bulk Pricing on WhatsApp</span>
                  </a>

                  <a
                    href="tel:0509335623"
                    className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-white border border-brand-green-100 hover:border-brand-orange-500 text-brand-green-950 font-display text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-brand-orange-500" />
                    <span>Call Frutelli Sales Directly</span>
                  </a>
                </div>

              </div>
              
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
