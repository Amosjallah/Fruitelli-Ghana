import { Leaf, Compass, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Hygienic Production Process",
      desc: "Bottled and sealed using strict hygiene protocols in Accra. Your safety is our absolute priority.",
      icon: ShieldCheck,
      color: "text-brand-green-500",
      bgColor: "bg-brand-green-100/30"
    },
    {
      title: "100% Sourced Ghana Farms",
      desc: "Supporting central region fruit growers. Only fresh seasonal sweet oranges and mangoes.",
      icon: Leaf,
      color: "text-brand-orange-500",
      bgColor: "bg-brand-orange-50"
    },
    {
      title: "Prompt Community Deliveries",
      desc: "Connecting families, caterers, schools, and offices effortlessly every morning of the week.",
      icon: Compass,
      color: "text-brand-mango-500",
      bgColor: "bg-amber-100/30"
    },
    {
      title: "Crafted With Community Pride",
      desc: "An organic Ghanaian team focused on delivering genuine goodness of taste and convenience.",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section id="about-us-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Visual Bento of Placeholders (Asked in Specs) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Box 1: Fruits Placeholder */}
              <div className="p-6 rounded-3xl bg-linear-to-b from-brand-orange-50 to-orange-100 flex flex-col justify-between aspect-square border border-brand-orange-100 relative overflow-hidden group">
                <span className="absolute -bottom-6 -right-6 text-7xl select-none filter blur-[1px] opacity-40 group-hover:scale-110 duration-550">🍊</span>
                <span className="text-[10px] font-mono font-black text-brand-orange-700 uppercase tracking-widest block">Ghana Sourced</span>
                <h4 className="font-display font-bold text-base text-brand-green-950 mt-auto leading-snug">Sourcing Fresh Fruits</h4>
              </div>

              {/* Box 2: Production Placeholder */}
              <div className="p-6 rounded-3xl bg-linear-to-b from-brand-green-50 to-green-100 flex flex-col justify-between aspect-square border border-brand-green-100 relative overflow-hidden group">
                <span className="absolute -bottom-6 -right-6 text-7xl select-none filter blur-[1px] opacity-40 group-hover:scale-110 duration-550">🍍</span>
                <span className="text-[10px] font-mono font-black text-brand-green-800 uppercase tracking-widest block">Accra Facility</span>
                <h4 className="font-display font-bold text-base text-brand-green-950 mt-auto leading-snug">Hygienic Production</h4>
              </div>

              {/* Box 3: Delivery Process Placeholder */}
              <div className="p-6 rounded-3xl bg-linear-to-b from-amber-50 to-amber-100 flex flex-col justify-between aspect-square border border-amber-200 relative overflow-hidden group">
                <span className="absolute -bottom-6 -right-6 text-7xl select-none filter blur-[1px] opacity-40 group-hover:scale-110 duration-550">🚚</span>
                <span className="text-[10px] font-mono font-black text-brand-mango-600 uppercase tracking-widest block">Swift Logistics</span>
                <h4 className="font-display font-bold text-base text-brand-green-950 mt-auto leading-snug">Reliable Delivery</h4>
              </div>

              {/* Box 4: Team and Bottled Juice placeholder */}
              <div className="p-6 rounded-3xl bg-slate-50 flex flex-col justify-between aspect-square border border-gray-200 relative overflow-hidden group">
                <span className="absolute -bottom-6 -right-6 text-7xl select-none filter blur-[1px] opacity-40 group-hover:scale-110 duration-550">🥛</span>
                <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">Genuinely Pure</span>
                <h4 className="font-display font-bold text-base text-brand-green-950 mt-auto leading-snug">Sealed Bottles</h4>
              </div>

            </div>

            {/* Quick Stat Bar below Bento */}
            <div className="mt-6 p-4 rounded-2xl bg-brand-green-50/50 border border-brand-green-100/40 grid grid-cols-3 gap-2">
              <div className="text-center">
                <span className="block text-xl font-black font-mono text-brand-green-950">100%</span>
                <span className="text-[8px] font-mono font-bold uppercase text-gray-400">Pure Local</span>
              </div>
              <div className="text-center border-x border-gray-200/50">
                <span className="block text-xl font-black font-mono text-brand-orange-600">Fresh</span>
                <span className="text-[8px] font-mono font-bold uppercase text-gray-400">Daily Pressed</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-black font-mono text-brand-green-950">5.0★</span>
                <span className="text-[8px] font-mono font-bold uppercase text-gray-400">On Google</span>
              </div>
            </div>

          </div>

          {/* Right Column: Beautiful Narrative Copy (Requested in specs) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-1.5 self-start">
              <span className="px-3 py-1 rounded-full bg-brand-orange-50 text-brand-orange-600 text-xs font-bold tracking-wider font-mono uppercase flex items-center gap-1">
                <Sparkles className="w-3" />
                ABOUT FRUTELLI
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950 leading-tight">
              Sustaining Accra With Fresh,Wholesome Fruit Drinks
            </h2>

            <div className="w-16 h-1 bg-gradient-mango-citrus rounded-full" />

            <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
              Frutelli Company Ghana is a fruit juice manufacturing company based in Accra, Ghana. We are focused on producing refreshing juice products that customers can enjoy at home, work, school, events, and business locations.
            </p>

            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
              Our goal is to make ordering simple, payment convenient, and delivery reliable for every customer. We serve individual buyers, corporate executives looking for healthy breakfast selections, supermarkets with distribution channels, and event organizers seeking premium wedding catering beverage supply across the country.
            </p>

            {/* Core Values / Pillar checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-4">
              {values.map((v, k) => {
                const ValIcon = v.icon;
                return (
                  <div key={k} className="flex space-x-3.5 items-start">
                    <div className={`w-10 h-10 rounded-xl shrink-0 ${v.bgColor} flex items-center justify-center`}>
                      <ValIcon className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-brand-green-950">{v.title}</h4>
                      <p className="text-[11px] font-sans text-gray-500 leading-relaxed mt-0.5">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick action block */}
            <div className="pt-6">
              <a
                href="https://wa.me/233509335623?text=Hello%20Frutelli,%20I%20would%20like%20to%20learn%20more%20about%20your%20catering%20supply."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-green-800 hover:bg-brand-green-950 text-white font-display text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-md"
              >
                <span>Partner with Frutelli</span>
                <span className="text-white/60">→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
