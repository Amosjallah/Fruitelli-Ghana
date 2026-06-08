import { MessageSquare, ShoppingBag, CreditCard, ChevronRight, Sparkles } from 'lucide-react';

export default function HowToOrder() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Juice",
      description: "Browse our premium catalog of Orange, Mango, Pineapple, Mixed blended juices, and select what satisfies your desires.",
      icon: ShoppingBag,
      color: "from-orange-500 to-orange-600",
      accent: "bg-orange-100 text-brand-orange-600"
    },
    {
      step: "02",
      title: "Contact Us",
      description: "Click any ordering button to automatically open WhatsApp or call or message directly on (+233) 050 933 5623.",
      icon: MessageSquare,
      color: "from-brand-green-500 to-brand-green-800",
      accent: "bg-brand-green-100 text-brand-green-800"
    },
    {
      step: "03",
      title: "Pay & Receive",
      description: "Complete easy payment options (Mobile Money, Transfer, Cash) and wait peacefully for safe, prompt delivery to your location.",
      icon: CreditCard,
      color: "from-brand-mango-500 to-amber-600",
      accent: "bg-amber-100 text-brand-mango-600"
    }
  ];

  return (
    <section id="how-to-order-steps" className="py-20 bg-linear-to-b from-transparent via-white to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            COMMUNITY SIMPLICITY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            How Simple Our Ordering Is
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            We value your time. That is why we bypassed long sign-up forms in favor of quick, human, direct communication channels that fit your everyday routine perfectly.
          </p>
        </div>

        {/* 3 Step Card Process Row */}
        <div className="relative mt-8">
          
          {/* Desktop connecting dotted line */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 border-t-2 border-dashed border-gray-200 -translate-y-12 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((st, idx) => {
              const StepIcon = st.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-white border border-brand-green-100 rounded-4xl card-shadow hover-lift relative text-left"
                >
                  {/* Big Step Number overlay in background */}
                  <span className="absolute top-4 right-6 text-7xl font-sans font-black select-none text-gray-50 opacity-90 tracking-tighter">
                    {st.step}
                  </span>

                  <div className="flex flex-col space-y-5 relative z-10">
                    
                    {/* Step Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${st.color} text-white flex items-center justify-center shadow-md`}>
                      <StepIcon className="w-5.5 h-5.5" />
                    </div>

                    <div className="space-y-2">
                      <span className={`inline-block text-[10px] font-mono font-black uppercase py-0.5 px-2.5 rounded-full ${st.accent}`}>
                        Step {st.step}
                      </span>
                      <h3 className="font-display font-black text-xl text-brand-green-950">
                        {st.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed md:h-16">
                        {st.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic order CTA shortcut */}
        <div className="mt-14 inline-flex items-center space-x-2 text-xs font-mono font-bold bg-white text-gray-500 border border-brand-green-100 px-5 py-3 rounded-full shadow-xs">
          <Sparkles className="w-4 h-4 text-brand-orange-500 animate-spin duration-3000" />
          <span>Need custom event dispensers? Select “Step 2” and our representative will format a custom invoice proposal.</span>
        </div>

      </div>
    </section>
  );
}
