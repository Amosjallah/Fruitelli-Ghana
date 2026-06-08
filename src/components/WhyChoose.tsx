import { FlameKindling, CheckSquare, MessageSquare, ShieldAlert, Award, Sparkles, CreditCard, ThumbsUp, Compass, Citrus } from 'lucide-react';

export default function WhyChoose() {
  const features = [
    {
      id: "fresh-taste",
      title: "Fresh Taste",
      description: "Refreshing juice made to satisfy your daily cravings. Freshly pressed daily from high-quality sourced Ghanaian farms to ensure nutrient retention.",
      icon: Citrus,
      iconColor: "text-brand-orange-500",
      bgColor: "bg-brand-orange-100/40",
      borderColor: "border-brand-orange-100",
    },
    {
      id: "simple-ordering",
      title: "Simple Ordering",
      description: "Place your order quickly through phone or WhatsApp on (+233) 050 933 5623. No complicated checkout flows — just state your needs.",
      icon: MessageSquare,
      iconColor: "text-brand-green-500",
      bgColor: "bg-brand-green-100/40",
      borderColor: "border-brand-green-100",
    },
    {
      id: "easy-payment",
      title: "Easy Payment",
      description: "Customers love our simple and convenient payment process. Direct mobile money transfer, cash-on-delivery, and instant online invoicing available.",
      icon: CreditCard,
      iconColor: "text-brand-mango-500",
      bgColor: "bg-amber-100/30",
      borderColor: "border-amber-100",
    },
    {
      id: "reliable-delivery",
      title: "Reliable Delivery",
      description: "Smooth delivery process for individuals, offices, shops, supermarkets, and catering buyers. Prompt distributions within Accra and environs.",
      icon: Compass,
      iconColor: "text-brand-green-800",
      bgColor: "bg-emerald-100/30",
      borderColor: "border-emerald-100",
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-linear-to-b from-transparent to-brand-green-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            WHY ACCRA LOVES FRUTELLI
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Uncompromising Excellence in Every Glass
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            Frutelli is built on providing simple, healthy, and high-quality food solutions. Discover how our business processes make refreshment satisfyingly accessible.
          </p>
        </div>

        {/* 4 Cards Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`flex flex-col p-6 sm:p-8 rounded-3xl bg-white border ${feature.borderColor} hover-lift card-shadow transition-all duration-300 relative overflow-hidden`}
              >
                {/* Visual Accent bubble */}
                <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full ${feature.bgColor} transition-transform duration-500 group-hover:scale-150 -z-0`} />

                {/* Card Icon Header Area */}
                <div className="relative z-10 mb-5 flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-300">FRUTELLI QUALITY</span>
                </div>

                {/* Feature Content */}
                <div className="relative z-10 flex flex-col space-y-2 mt-2">
                  <h3 className="font-display font-bold text-xl text-brand-green-950">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Visual Counter Badge below cards */}
        <div className="mt-16 text-center max-w-lg mx-auto bg-white border border-brand-green-100 p-4 rounded-2xl shadow-xs flex items-center justify-center space-x-3.5">
          <div className="flex -space-x-1">
            {[1, 2, 3].map((num) => (
              <div key={num} className="w-8 h-8 rounded-full border-2 border-white bg-linear-to-tr from-brand-orange-500 to-brand-mango-500 flex items-center justify-center text-white text-[9px] font-black">
                ★
              </div>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-xs font-mono font-bold text-gray-600 text-left">
            Loved by weddings, birthday parties, local primary schools & offices across Accra.
          </span>
        </div>

      </div>
    </section>
  );
}
