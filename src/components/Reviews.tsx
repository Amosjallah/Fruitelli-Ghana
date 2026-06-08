import { Star, MessageSquare, ShieldCheck, Quote, ChevronRight, UserCheck2, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

export default function Reviews() {
  const testimonials: Testimonial[] = [
    {
      name: "Nathan Fritz",
      rating: 5,
      text: "Your delivery process is simple and I really love the payment method thanks.",
      location: "Accra, Ghana",
      date: "Verified Customer"
    },
    {
      name: "Duku Prince",
      rating: 5,
      text: "Great job guys keep it up.",
      location: "Accra, Ghana",
      date: "Verified Local Guide"
    },
    {
      name: "Tetteh",
      rating: 5,
      text: "Nice juice.",
      location: "Accra, Ghana",
      date: "Verified Wholesaler"
    }
  ];

  return (
    <section id="customer-reviews-section" className="py-20 bg-linear-to-b from-transparent via-brand-green-50/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            REAL TESTIMONIALS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Loved by Our Customers
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            Read opinions from local business owners, event organizers, and daily enthusiasts who enjoy Frutelli juice products across Accra.
          </p>
        </div>

        {/* Dynamic Trust metrics and Reviews block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Google rating card summary */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 bg-white border border-brand-green-100 rounded-4xl card-shadow relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-mango-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex flex-col space-y-4">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-orange-500 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Accra Google presence
              </span>
              
              <div className="flex items-baseline space-x-1">
                <span className="text-6xl font-black font-display text-brand-green-950 tracking-tight">5.0</span>
                <span className="text-lg text-gray-400 font-mono">/ 5.0</span>
              </div>

              {/* Star group with glowing ring */}
              <div className="flex space-x-1.5 text-brand-mango-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-brand-mango-500" />
                ))}
              </div>

              <p className="text-xs text-gray-550 leading-relaxed font-sans">
                Based on verified client feedback gathered directly on our Google Business Profile page. Uncompromising taste and highly reliable customer support in Accra.
              </p>
            </div>

            <div className="pt-8 mt-10 border-t border-gray-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-green-950 font-display">8 Google Reviews</span>
                <span className="text-[10px] text-brand-green-800 font-mono font-bold uppercase">100% Satisfaction Rate</span>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-green-50 text-brand-green-800 text-xs font-bold">
                ✓
              </span>
            </div>

          </div>

          {/* Right Column: Interactive quotes grid cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-brand-green-100 rounded-3xl card-shadow text-left flex flex-col justify-between relative hover:border-brand-orange-500/35 transition-colors group"
              >
                {/* Decorative absolute Quote icon */}
                <span className="absolute top-4 right-4 text-brand-green-100 translate-x-1 -translate-y-1 group-hover:text-brand-orange-100/60 duration-300">
                  <Quote className="w-8 h-8 fill-current" />
                </span>

                <div className="relative z-10 flex flex-col space-y-3.5">
                  <div className="flex space-x-0.5 text-brand-mango-500">
                    {Array.from({ length: test.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4.5 h-4.5 fill-brand-mango-500" />
                    ))}
                  </div>

                  <p className="font-sans text-xs text-gray-700 italic leading-relaxed">
                    “{test.text}”
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm text-brand-green-950 flex items-center gap-1.5">
                      {test.name}
                      <UserCheck2 className="w-3.5 h-3.5 text-brand-green-500" />
                    </span>
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                      {test.date} • {test.location}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Call to review panel */}
        <div className="mt-14 p-6 bg-linear-to-r from-brand-green-950 to-brand-green-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
          
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col space-y-1">
            <h4 className="font-display font-black text-white text-base">Happy with our fresh manufacturing or delivery process?</h4>
            <p className="text-xs text-brand-green-100 leading-relaxed font-sans">
              Help us support more local farms! Leave a review on Google Business or WhatsApp your constructive feedback.
            </p>
          </div>

          <a
            href="https://wa.me/233509335623?text=Hello%20Frutelli,%20I%20would%20like%20to%20send%20feedback%252C%20I%20really%20enjoyed%20your%20juice!"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 px-6 py-2.5 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold transition-transform hover:scale-103 whitespace-nowrap cursor-pointer shadow-md"
          >
            Leave Your Feedback
          </a>
        </div>

      </div>
    </section>
  );
}
