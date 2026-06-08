import { useState, useMemo } from 'react';
import { ShoppingCart, Leaf, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { Product } from '../types';
import LazyImage from './LazyImage';

// Import newly generated high-fidelity product pack artworks
import orangeImg from '../assets/images/frutelli_orange_carton_1780884412505.png';
import mangoImg from '../assets/images/frutelli_mango_carton_1780884432410.png';
import cocopinImg from '../assets/images/frutelli_cocopin_carton_1780884446947.png';
import pineappleImg from '../assets/images/frutelli_pineapple_carton_1780884459972.png';
import cocktailImg from '../assets/images/frutelli_cocktail_carton_1780884473208.png';
import tropicalImg from '../assets/images/frutelli_tropical_carton_1780884486047.png';
import multifruitImg from '../assets/images/frutelli_multifruit_carton_1780884498603.png';
import lineupImg from '../assets/images/frutelli_juices_lineup_1780884511807.png';

export { lineupImg };

interface ProductsProps {
  onAddToCart?: (product: Product) => void;
}

export default function Products({ onAddToCart }: ProductsProps = {}) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'single' | 'event' | 'wholesale'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track image load statuses for skeleton states
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  /**
   * DEVELOPER NOTE FOR FRUTELLI TEAM:
   * These products are configured based on the actual retail carton packs
   * uploaded by the user. Editing their descriptions, categories or pricing here
   * updates the entire visual grid.
   */
  const ALL_PRODUCTS: Product[] = [
    {
      id: 'orange-single',
      name: 'Frutelli Orange Juice',
      description: "100% natural and pasteurized sweet orange juice. Enjoy the pure, citrus-fresh boost made with handpicked, sun-ripened orchard oranges. Absolutely zero sweeteners or chemical preservatives.",
      category: 'single',
      ingredients: ['100% Natural Orange Juice', 'Squeezed & Pasteurized Recipe', 'Pure Vitamin C'],
      volume: '1 Litre Carton',
      price: 'GH₵ 24.00',
      priceNumeric: 24.00,
      badge: 'All Natural',
      accentColor: '#ea580c',
      bgColor: 'from-orange-400 to-orange-600',
      imageUrl: orangeImg,
      imageAlt: "Frutelli Orange Juice carton box packaging"
    },
    {
      id: 'mango-single',
      name: 'Frutelli Mango',
      description: "Treat yourself to a fruity treat with Frutelli Mango! A rich, thick, and premium tropical nectar crafted from central Ghana's sweetest mangoes. Indulgent, smooth, and deeply refreshing.",
      category: 'single',
      ingredients: ['100% Mango Puree', 'Tropical fruit base', 'Natural minerals'],
      volume: '1 Litre Carton',
      price: 'GH₵ 24.50',
      priceNumeric: 24.50,
      badge: 'Best Seller',
      accentColor: '#eab308',
      bgColor: 'from-yellow-400 to-amber-500',
      imageUrl: mangoImg,
      imageAlt: "Frutelli Mango carton package showcasing tropical yellow splashes"
    },
    {
      id: 'cocopin-single',
      name: 'Frutelli Coconut Pineapple',
      description: "Escape to the tropics with our signature rich fusion of creamy coconut notes and gold-pressed coastal pineapple juice. A stellar hydration source filled with natural enzymes.",
      category: 'single',
      ingredients: ['Creamy Coconut Water & Milk', 'Sweet Sugarloaf Pineapple Pulp', 'Nourishing botanical base'],
      volume: '1 Litre Carton',
      price: 'GH₵ 27.00',
      priceNumeric: 27.00,
      badge: 'Exotic Blend',
      accentColor: '#16a34a',
      bgColor: 'from-green-400 to-emerald-600',
      imageUrl: cocopinImg,
      imageAlt: "Frutelli Coconut Pineapple carton showing coconut halves and yellow pineapple slices"
    },
    {
      id: 'pineapple-single',
      name: 'Frutelli Pineapple',
      description: "Exquisite, standard single-origin gold pineapple juice. Deeply satisfying coastal Ghanaian pineapples cold-extracted to conserve their natural sweet energy and immune-boosting properties.",
      category: 'single',
      ingredients: ['100% Golden Pineapple Juice', 'Enzyme-rich sugarloaf base'],
      volume: '1 Litre Carton',
      price: 'GH₵ 24.00',
      priceNumeric: 24.00,
      badge: 'Pure Tropics',
      accentColor: '#ca8a04',
      bgColor: 'from-yellow-300 to-yellow-500',
      imageUrl: pineappleImg,
      imageAlt: "Frutelli Pineapple carton package showcasing golden sliced pineapple"
    },
    {
      id: 'cocktail-single',
      name: 'Frutelli Cocktail',
      description: "The ultimate flavor symphony blending premium bananas, sweet red apples, tropical mangoes, passion fruit, and a citric boost. Balanced, nourishing, and filled with fruit pulp.",
      category: 'single',
      ingredients: ['Banana Puree', 'Red Apple Nectar', 'Mango Extracts', 'Citrus & Passion infusions'],
      volume: '1 Litre Carton',
      price: 'GH₵ 24.00',
      priceNumeric: 24.05,
      badge: 'Rich Cocktail',
      accentColor: '#dc2626',
      bgColor: 'from-red-500 to-rose-600',
      imageUrl: cocktailImg,
      imageAlt: "Frutelli Cocktail carton showing bananas, apples and exotic tropical slices"
    },
    {
      id: 'tropical-mix-single',
      name: 'Frutelli Tropical Mix',
      description: "Accra's beloved daily hydrator! Merges the rich nectar of ripe grapes, sweet seedless oranges, creamy bananas, and golden pineapples in one satisfying carton.",
      category: 'single',
      ingredients: ['Sucrose-rich grapes', 'Sweet Squeezed Orange', 'Press pineapple', 'Ripe bananas'],
      volume: '1 Litre Carton',
      price: 'GH₵ 25.50',
      priceNumeric: 25.50,
      badge: 'Daily Hydration',
      accentColor: '#059669',
      bgColor: 'from-emerald-500 to-teal-600',
      imageUrl: tropicalImg,
      imageAlt: "Frutelli Tropical Mix carton showing whole grapes, oranges, and bananas"
    },
    {
      id: 'multifruit-single',
      name: 'Frutelli Multifruit',
      description: "A premium, power-packed health line containing golden kiwi, ripe mangoes, fresh pineapples, pomegranate seeds, and passion fruit. Rich in high-impact antioxidants.",
      category: 'single',
      ingredients: ['Antioxidant golden kiwi', 'Keitt mango extract', 'Gold pineapples', 'Sour pomegranate seeds', 'Passion juice'],
      volume: '1 Litre Carton',
      price: 'GH₵ 28.00',
      priceNumeric: 28.00,
      badge: 'Super Shield',
      accentColor: '#be123c',
      bgColor: 'from-rose-600 to-pink-700',
      imageUrl: multifruitImg,
      imageAlt: "Frutelli Multifruit carton package showing kiwi slices, passion fruits, and mangoes"
    },

    // EVENT SECTOR (5L Dispensers and custom boxes)
    {
      id: 'dispenser-event',
      name: 'Catering Dispenser Tank',
      description: 'Massive, professional, sealed glass dispensers pre-filled with your choice of premium Frutelli juice carton blends. Keeps drinks frosty and stylish for self-service guests.',
      category: 'event',
      ingredients: ['Choice of any 5 Litres of Frutelli Carton Blends', 'Insulated pre-chilled logistics setup'],
      volume: '5 Litre Glass Tanks',
      price: 'GH₵ 110.00',
      priceNumeric: 110.00,
      badge: 'Weddings & Celebrations',
      accentColor: '#166534',
      bgColor: 'from-green-800 to-brand-green-950',
      imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=700',
      imageAlt: 'Prestige buffet layout with luxury pre-filled glass juice servers'
    },
    {
      id: 'corporate-box-event',
      name: 'Corporate Hydration Box',
      description: 'Upgrade your business packages, corporate training events, or office seminars with convenient cases packed with all premium 1 Litre Frutelli carton selections.',
      category: 'event',
      ingredients: ['3x Orange Juice (1L)', '3x Mango (1L)', '3x Coconut Pineapple (1L)', '3x Tropical Mix (1L)'],
      volume: '12x 1L Carton Box',
      price: 'GH₵ 250.00',
      priceNumeric: 250.00,
      badge: 'Office Wellness',
      accentColor: '#059669',
      bgColor: 'from-emerald-600 to-brand-green-900',
      imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=700',
      imageAlt: 'Professional corporate breakroom containing refreshing drinks packages'
    },

    // WHOLESALE CASES
    {
      id: 'wholesale-orange',
      name: 'Wholesale Case: Frutelli Orange',
      description: 'Bulk distributor supply case for supermarkets, local mini-marts, organic grocery counters, and boutique gyms. Consists of 12 robust 1 Litre cartons.',
      category: 'wholesale',
      ingredients: ['12 Units of Frutelli Orange (1L)', 'Robust corrugated distribution box', 'FDA & Quality Compliant'],
      volume: 'Case of 12 x 1L Cartons',
      price: 'GH₵ 230.00',
      priceNumeric: 230.00,
      badge: 'Distributor Price',
      accentColor: '#ea580c',
      bgColor: 'from-orange-500 to-orange-700',
      imageUrl: orangeImg,
      imageAlt: "Wholesale cardboard stack of Frutelli Orange Juice cartons"
    },
    {
      id: 'wholesale-mango',
      name: 'Wholesale Case: Frutelli Mango',
      description: 'Fast-moving retail inventory for supermarket chillers and cafe shops in Accra. Supplied in highly durable, heavy duty protective boxes with cold-delivery security.',
      category: 'wholesale',
      ingredients: ['12 Units of Frutelli Mango (1L)', 'Secure wholesale packaging', 'Always-fresh daily dropoffs'],
      volume: 'Case of 12 x 1L Cartons',
      price: 'GH₵ 235.00',
      priceNumeric: 235.00,
      badge: 'Fast Moving',
      accentColor: '#eab308',
      bgColor: 'from-yellow-500 to-amber-600',
      imageUrl: mangoImg,
      imageAlt: "Wholesale stack of Frutelli Mango cartons"
    },
    {
      id: 'wholesale-cocopin',
      name: 'Wholesale Case: Coconut Pineapple',
      description: 'Excellent distributor case rate of our exotic Coconut Pineapple blend, highly popular with beachside hotels, boutique motels, and local fitness studios.',
      category: 'wholesale',
      ingredients: ['12 Units of Coconut Pineapple (1L)', 'Cold Chain Dispatch Logistics Included'],
      volume: 'Case of 12 x 1L Cartons',
      price: 'GH₵ 260.00',
      priceNumeric: 260.00,
      badge: 'Exotic Top Seller',
      accentColor: '#16a34a',
      bgColor: 'from-green-500 to-emerald-700',
      imageUrl: cocopinImg,
      imageAlt: "Wholesale case stack of Frutelli Coconut Pineapple cartons"
    },
    {
      id: 'wholesale-pineapple',
      name: 'Wholesale Case: Frutelli Pineapple',
      description: 'Commercial case boxes of our premium 100% natural Gold Pineapple carton line. High turnover retail item ideal for schools, offices, and catering vendors.',
      category: 'wholesale',
      ingredients: ['12 Units of Frutelli Pineapple (1L)', 'Case lot barcode records', 'Long-life cooler shelf specs'],
      volume: 'Case of 12 x 1L Cartons',
      price: 'GH₵ 230.00',
      priceNumeric: 230.00,
      badge: 'High Turnover',
      accentColor: '#ca8a04',
      bgColor: 'from-yellow-500 to-yellow-700',
      imageUrl: pineappleImg,
      imageAlt: "Wholesale case stack of Frutelli Pineapple cartons"
    }
  ];

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate dynamic image load statistics for the loading bar
  const visibleProductsWithImages = useMemo(() => {
    return filteredProducts.filter(p => !!p.imageUrl);
  }, [filteredProducts]);

  const loadedCount = useMemo(() => {
    return visibleProductsWithImages.filter(p => !!loadedImages[p.id]).length;
  }, [visibleProductsWithImages, loadedImages]);

  const isAllImagesLoaded = visibleProductsWithImages.length === 0 || loadedCount === visibleProductsWithImages.length;

  const loadPercentage = useMemo(() => {
    if (visibleProductsWithImages.length === 0) return 100;
    return Math.round((loadedCount / visibleProductsWithImages.length) * 100);
  }, [loadedCount, visibleProductsWithImages]);

  // Dynamic WhatsApp links helper
  const getWhatsAppOrderLink = (productName: string) => {
    const baseUrl = "https://wa.me/233509335623";
    const text = encodeURIComponent(`Hello Frutelli, I am interested in placing an order for: *${productName}*. Please provide the standard pricing details.`);
    return `${baseUrl}?text=${text}`;
  };

  const getWhatsAppBulkLink = (productName: string) => {
    const baseUrl = "https://wa.me/233509335623";
    const text = encodeURIComponent(`Hello Frutelli, I would like to make a *Bulk or Wholesale Enquiry* for: *${productName}*. Please send us the catalog with complete commercial pricing tiers.`);
    return `${baseUrl}?text=${text}`;
  };

  return (
    <section id="products-showcase" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            EXPLORE ACCRA'S FINEST SELECTIONS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Freshness Squeezed to Perfection
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            No added preservatives, artificial sweeteners, or food colorings. Just pure, wholesome fruit juice pressed, bottled, and sealed in high-quality cartons locally in Accra for ultimate retail shelf-life and refreshment.
          </p>
        </div>

        {/* Dynamic Category Tabs and Search specifically styled for User Types */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-brand-green-50/40 p-4 rounded-3xl border border-brand-green-100/30">
          
          {/* USER-CENTRIC FILTER PILLS */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {([
              { id: 'all', label: 'All Selections' },
              { id: 'single', label: '1L Single Cartons' },
              { id: 'event', label: 'Event Bundles' },
              { id: 'wholesale', label: 'Wholesale Cases' }
            ] as const).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-2xl font-display font-semibold text-xs tracking-wide cursor-pointer transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-green-800 text-white shadow-md shadow-brand-green-800/10'
                    : 'bg-white text-brand-green-950 hover:bg-brand-orange-50 hover:text-brand-orange-600 border border-brand-green-100/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar helper */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search flavors or cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4.5 py-2.5 text-xs rounded-2xl border border-brand-green-100 bg-white placeholder-gray-400 focus:outline-hidden focus:border-brand-orange-500 transition-colors"
            />
          </div>

        </div>

        {/* Dynamic Image Load Progress Bar */}
        {!isAllImagesLoaded && (
          <div className="w-full max-w-xl mx-auto h-1.5 bg-gray-100 rounded-full overflow-hidden mb-12 relative -mt-3">
            <div 
              className="h-full bg-gradient-to-r from-brand-orange-500 via-brand-mango-500 to-brand-green-500 rounded-full transition-all duration-300 ease-out animate-pulse"
              style={{ width: `${loadPercentage}%` }}
            />
            {/* Tiny live status count badge for the user */}
            <div className="absolute right-0 -top-5 text-[9px] font-mono font-bold text-brand-orange-650 flex items-center gap-1 bg-white px-2 rounded-md">
              <span className="w-1.5 h-1.5 bg-brand-orange-500 rounded-full animate-ping" />
              Preparing Fresh Packaging... {loadPercentage}%
            </div>
          </div>
        )}

        {/* Products Grid Layout featuring real photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col h-full bg-white border border-brand-green-100 rounded-4xl overflow-hidden card-shadow hover-lift relative"
            >
              {/* Top Image Render */}
              <div className="relative h-64 bg-gray-50 overflow-hidden border-b border-gray-100 flex items-center justify-center p-4">
                
                {/* Fallback pattern backdrops */}
                <div className="absolute inset-0 bg-radial from-brand-orange-50/40 to-transparent -z-1" />

                <LazyImage
                  src={product.imageUrl || ''}
                  alt={product.imageAlt || product.name}
                  fallbackBg={product.bgColor}
                  accentColor={product.accentColor}
                  onLoadStatusChange={(isLoaded) => {
                    setLoadedImages(prev => ({ ...prev, [product.id]: isLoaded }));
                  }}
                  className="w-full h-full"
                />

                {/* Event Badge indicator */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-1 bg-brand-orange-500 text-white text-[10px] font-mono font-bold tracking-widest uppercase py-1 px-3 rounded-full shadow-md">
                    {product.badge}
                  </div>
                )}

                <span className="absolute bottom-3 right-3 text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-xs py-1 px-3 rounded-md z-1">
                  🇬🇭 Carton Pack Ghana
                </span>
              </div>

              {/* Product Info Description */}
              <div className="p-6 pb-4 flex-grow flex flex-col text-left space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-black text-brand-orange-650 uppercase tracking-widest block">{product.volume}</span>
                  <span className="text-[9px] font-mono font-black text-brand-green-800 uppercase px-2 py-0.5 bg-brand-green-50 rounded-xs">
                    {product.category === 'single' ? 'Premium Carton' : product.category === 'event' ? 'Event Catering' : 'Wholesale Bulk'}
                  </span>
                </div>
                
                <h3 className="font-display font-black text-xl text-brand-green-950 group-hover:text-brand-orange-600 transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-xs text-gray-600 leading-relaxed flex-grow">
                  {product.description}
                </p>

                {/* Recipe/Ingredients Highlight */}
                <div className="pt-3 border-t border-gray-150 flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, k) => (
                    <span key={k} className="text-[9px] font-mono font-bold bg-brand-green-50 text-brand-green-850 px-2.5 py-1 rounded-md">
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order/Bulk Conversion Buttons */}
              <div className="p-6 pt-0 border-t border-gray-100 flex flex-col space-y-2 mt-auto">
                <div className="flex justify-between items-center py-3">
                  <span className="text-[9px] font-mono font-bold text-gray-400 uppercase">Estimated Pricing</span>
                  <span className="text-sm font-bold font-mono text-brand-green-950 bg-brand-green-50 px-2.5 py-1 rounded-md">{product.price}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAddToCart?.(product)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold transition-colors shadow-xs hover:shadow-md cursor-pointer border-none font-sans"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <a
                    href={getWhatsAppBulkLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white text-brand-green-950 border border-brand-green-100/60 hover:border-brand-orange-500 font-display text-xs font-semibold transition-colors cursor-pointer font-sans"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-brand-orange-500" />
                    <span>Bulk Enquiry</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* FULL-WIDTH PROMOTIONAL BANNER */}
        <div className="mt-16 bg-brand-green-50/30 border border-brand-green-100 rounded-4xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto shadow-md">
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl max-w-md bg-white p-2">
              <img 
                src={lineupImg} 
                alt="Frutelli Family Blend Lineup Showcase" 
                className="w-full h-auto object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-5 left-5 bg-brand-orange-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                Ghana's Choice
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 text-left space-y-4">
            <span className="text-xs font-mono font-bold text-brand-orange-600 block tracking-widest uppercase">
              THERE'S A FRUTELLI FLAVOUR FOR EVERYONE!
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-green-950">
              Which one would you pick?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-700 leading-relaxed">
              From premium sun-drenched mango orchards and tropical pineapple plantations to dynamic, wholesome blended carton cartons, Frutelli brings premium fruit nourishment to central Accra. No chemical preservatives, artificial colorings, or sweeteners. Handpicked, squeezed, and sealed safely to satisfy schools, cafe shops, local supermarkets, and active families.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] font-mono font-bold bg-white text-brand-green-900 border border-brand-green-200 py-1.5 px-3 rounded-xl shadow-xs">
                100% Squeezed in Accra
              </span>
              <span className="text-[10px] font-mono font-bold bg-white text-brand-green-900 border border-brand-green-200 py-1.5 px-3 rounded-xl shadow-xs">
                Natural Pasteurized Pulp
              </span>
              <span className="text-[10px] font-mono font-bold bg-white text-brand-green-900 border border-brand-green-200 py-1.5 px-3 rounded-xl shadow-xs">
                Recyclable Safe Cartons
              </span>
            </div>
          </div>
        </div>

        {/* Informative Note for Customizations (Requested in specs) */}
        <div className="mt-14 p-4.5 bg-amber-50 rounded-2xl border border-amber-100 max-w-4xl mx-auto flex items-start space-x-3 text-left">
          <AlertCircle className="w-5 h-5 text-brand-mango-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono font-bold text-brand-mango-600 uppercase tracking-widest block mb-0.5">Note for administrators:</span>
            <p className="text-xs text-brand-green-950 leading-relaxed">
              <strong>Looking to customize flavor lists, update pricing columns, or arrange recurring shipping bundles?</strong> The product catalogs are fully modularized inside <code>/src/components/Products.tsx</code> and can be edited, scaled, or updated easily. Or click the direct WhatsApp links to request custom combinations!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
