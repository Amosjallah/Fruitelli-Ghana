import { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Lock, 
  CreditCard, 
  CheckCircle, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Sparkles,
  Map,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, ActiveTab } from '../types';

interface CartAndCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToTab: (tab: ActiveTab) => void;
}

const ACCRA_DISTRICTS = [
  { name: 'East Legon / Shippashie', fee: 20 },
  { name: 'Airport Residential / Roman Ridge', fee: 20 },
  { name: 'Cantonments / Labone', fee: 25 },
  { name: 'Osu / Ringway Estates', fee: 25 },
  { name: 'Spintex Road / Baatsona', fee: 30 },
  { name: 'Dzorwulu / Roman Ridge', fee: 20 },
  { name: 'Legon / Madina / Adenta', fee: 35 },
  { name: 'Tesano / Achimota / Kasoa', fee: 40 },
  { name: 'Other Central Accra Areas', fee: 25 },
];

export default function CartAndCheckout({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToTab
}: CartAndCheckoutProps) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(ACCRA_DISTRICTS[0].name);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  
  // Payment Option
  const [paymentMethod, setPaymentMethod] = useState<'momo_mtn' | 'momo_telecel' | 'bank_transfer' | 'cod'>('momo_mtn');
  const [walletNumber, setWalletNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  
  // Submit state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<{
    orderId: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
    eta: string;
  } | null>(null);

  // Math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.priceNumeric * item.quantity), 0);
  const selectedDistrictObj = ACCRA_DISTRICTS.find(d => d.name === district) || ACCRA_DISTRICTS[0];
  const deliveryFee = subtotal > 0 ? selectedDistrictObj.fee : 0;
  const grandTotal = subtotal + deliveryFee;

  // Wallet indicator label
  const paymentLabelMap = {
    momo_mtn: 'MTN Mobile Money',
    momo_telecel: 'Telecel Cash',
    bank_transfer: 'Bank Transfer / Instant Pay',
    cod: 'Cash on Delivery'
  };

  const handleStartCheckout = () => {
    setIsCheckout(true);
    setCheckoutStep(1);
  };

  const handleBackToCart = () => {
    setIsCheckout(false);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 1) {
      if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
        alert('Please fill out all required contact and location fields.');
        return;
      }
      setCheckoutStep(2);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'momo_mtn' || paymentMethod === 'momo_telecel') {
      if (!walletNumber.trim()) {
        alert('Please enter your 10-digit Mobile Money phone number.');
        return;
      }
      if (walletNumber.trim().length < 9) {
        alert('Please enter a valid Ghana phone number.');
        return;
      }
    }

    setIsPlacingOrder(true);

    // Mock realistic order processing
    setTimeout(() => {
      const orderNum = Math.floor(1000 + Math.random() * 9000);
      const generatedCode = `FRU-ACCRA-${orderNum}`;
      
      const orderDetails = {
        orderId: generatedCode,
        subtotal,
        deliveryFee,
        total: grandTotal,
        eta: 'Today within 2 hours'
      };

      // Create tracking state structure
      const trackingRecord = {
        orderId: generatedCode,
        customerName: name,
        items: cartItems.map(item => `${item.quantity}x ${item.product.name} (${item.product.volume})`).join(', '),
        orderTime: 'Today at ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        deliveryAddress: `${address}, near ${landmark || 'specified landmark'}, ${district}`,
        paymentMethod: `${paymentLabelMap[paymentMethod]} ${walletNumber ? '(' + walletNumber + ')' : ''} - Pending Verification`,
        currentStep: 1, // 1: Pressed & Packaged
        deliveryType: subtotal >= 200 ? 'Priority Free-Shipping Express' : 'Standard Carton Cooler Delivery',
        dispatcherName: 'Ebenezer Lartey',
        dispatcherPhone: '+233 50 933 5623',
        eta: 'Today by ' + new Date(Date.now() + 105 * 60000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' (Warm-press ready)',
        statusNotes: `Processing order. Raw juices are currently being assembled from the cold storage cabinets. Thermoregulated delivery assigned to Ebenezer.`
      };

      // Save order to localStorage so OrderTracker can fetch it instantly
      try {
        const existingOrdersRaw = localStorage.getItem('frutelli-placed-orders');
        const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : {};
        existingOrders[generatedCode] = trackingRecord;
        localStorage.setItem('frutelli-placed-orders', JSON.stringify(existingOrders));
      } catch (err) {
        console.error('Failed to cache order:', err);
      }

      setGeneratedOrder(orderDetails);
      setIsPlacingOrder(false);
      setCheckoutStep(3);
    }, 1500);
  };

  const getWhatsAppReceiptLink = () => {
    if (!generatedOrder) return '#';
    const itemsList = cartItems.map(item => `• ${item.quantity}x *${item.product.name}* (${item.product.price})`).join('%0A');
    const payment = paymentLabelMap[paymentMethod] + (walletNumber ? ` (${walletNumber})` : '');
    const text = `Hello Frutelli Ghana! 🇬🇭%0AI have just placed a fresh cartoon juice order on your online checkout:%0A%0A*ORDER ID:* ${generatedOrder.orderId}%0A*Customer Name:* ${name}%0A*Contact Phone:* ${phone}%0A*Delivery District:* ${district}%0A*Landmark Address:* ${address} (near ${landmark})%0A*Selected Payment:* ${payment}%0A%0A*ITEMS ORDERED:*%0A${itemsList}%0A%0A*Subtotal:* GH₵ ${generatedOrder.subtotal.toFixed(2)}%0A*Delivery Dispatch Fee:* GH₵ ${generatedOrder.deliveryFee.toFixed(2)}%0A*GRAND TOTAL:* GH₵ ${generatedOrder.total.toFixed(2)}%0A%0APlease verify my mobile money payment or checkout request to initiate cold-chain shipping!`;
    return `https://wa.me/233509335623?text=${text}`;
  };

  const handleTrackInApp = () => {
    if (!generatedOrder) return;
    onClose();
    setIsCheckout(false);
    onClearCart();
    
    // Smooth scroll to tracker component
    setTimeout(() => {
      onNavigateToTab('home');
      const trackerSection = document.getElementById('order-tracker-portal');
      if (trackerSection) {
        trackerSection.scrollIntoView({ behavior: 'smooth' });
        // Auto paste ID in search block
        const inputTrack = document.getElementById('trackingId') as HTMLInputElement;
        if (inputTrack) {
          inputTrack.value = generatedOrder.orderId;
          const trackBtn = inputTrack.closest('form')?.querySelector('button[type="submit"]') as HTMLButtonElement;
          if (trackBtn) {
            trackBtn.click();
          }
        }
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Cart Panel Drawer Slider */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header Navbar */}
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-brand-green-950 text-white">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-brand-orange-500 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display font-black text-lg tracking-tight uppercase">
                    {isCheckout ? 'Checkout Panel' : 'Your Drinks Cart'}
                  </h2>
                  <p className="text-[10px] text-brand-green-200 font-mono tracking-widest uppercase">
                    {isCheckout ? `Step ${checkoutStep} of 3` : `${cartItems.length} Selection Packs`}
                  </p>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Step Display Areas */}
            <div className="flex-grow overflow-y-auto">
              
              {/* SECTION A: SHOPPING CART ITEMIZATION */}
              {!isCheckout && (
                <div className="p-6 space-y-6">
                  {cartItems.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-brand-green-50 flex items-center justify-center text-brand-green-800">
                        <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-lg text-brand-green-950">Your Cart is Empty</h3>
                        <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto mt-1">
                          Browse Accra's finest natural single-origin juices, catering tanks, and wholesale bundles to quench your thirst.
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold transition-all shadow-xs"
                      >
                        Start Adding Flavours
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Added Products</span>
                        <button 
                          onClick={onClearCart}
                          className="text-[10px] font-mono font-black text-rose-600 hover:underline cursor-pointer"
                        >
                          Clear Selection [X]
                        </button>
                      </div>

                      <div className="space-y-3.5">
                        {cartItems.map((item) => (
                          <motion.div 
                            key={item.product.id}
                            layout
                            className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex items-center gap-4 text-left group"
                          >
                            {/* Product preview artwork wrapper */}
                            <div className="w-14 h-18 bg-white rounded-xl border border-slate-200/60 p-1 flex items-center justify-center shrink-0 overflow-hidden relative shadow-xs">
                              {item.product.imageUrl ? (
                                <img 
                                  src={item.product.imageUrl} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <span className="text-2xl">🍊</span>
                              )}
                            </div>

                            {/* Details Column */}
                            <div className="flex-grow space-y-1 min-w-0">
                              <span className="text-[9px] font-mono font-bold text-brand-orange-600 uppercase tracking-wider block">
                                {item.product.volume}
                              </span>
                              <h4 className="font-display font-black text-sm text-brand-green-950 truncate">
                                {item.product.name}
                              </h4>
                              <div className="flex justify-between items-center pt-1.5">
                                <span className="text-xs font-mono font-black text-brand-green-900 bg-brand-green-50 px-2 py-0.5 rounded">
                                  GH₵ {(item.product.priceNumeric * item.quantity).toFixed(2)}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {item.product.price} each
                                </span>
                              </div>
                            </div>

                            {/* Up / Down quantities Control */}
                            <div className="flex flex-col items-center space-y-1.5 pl-2 border-l border-gray-200">
                              <button 
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded bg-white border border-slate-200 hover:border-brand-orange-500 text-gray-600 hover:text-brand-orange-600 transition-all cursor-pointer"
                                title="Increase Quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-mono font-black text-brand-green-950 px-1">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    onUpdateQuantity(item.product.id, item.quantity - 1);
                                  } else {
                                    onRemoveItem(item.product.id);
                                  }
                                }}
                                className="p-1 rounded bg-white border border-slate-200 hover:border-brand-orange-500 text-gray-600 hover:text-brand-orange-600 transition-all cursor-pointer"
                                title="Decrease Quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Fresh commitment guarantee banner */}
                      <div className="p-4 bg-brand-green-50/50 rounded-2xl border border-brand-green-100/20 text-xs flex gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-brand-green-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono font-black text-brand-green-900 uppercase block text-[10px]">
                            Cold-Chain Freshness Lock
                          </span>
                          <p className="text-gray-600 font-sans leading-relaxed">
                            Every single carton in your carton box is cold-pressed on the morning of delivery to retain authentic local Accra enzymatic chains.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION B: MULTISTEP CHECKOUT PROCESS */}
              {isCheckout && (
                <div className="p-6">
                  
                  {/* STEP 1: CONTACT & DELIVERY DETAIL SCHEMES */}
                  {checkoutStep === 1 && (
                    <form onSubmit={handleNextStep} id="checkout-form-step-1" className="space-y-4 text-left">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100 mb-4">
                        <MapPin className="w-4 h-4 text-brand-orange-500" />
                        <h3 className="font-display font-black text-sm text-brand-green-950 uppercase tracking-wider">
                          1. Delivery & Contact Details
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Kofi Antwi Mensah"
                              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-green-150 bg-slate-50/40 text-brand-green-950 placeholder-gray-450 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                              Phone Number <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                                <Phone className="w-4 h-4" />
                              </span>
                              <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="024 456 7890"
                                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-green-150 bg-slate-50/40 text-brand-green-950 placeholder-gray-450 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all font-sans"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                              Email Address <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                                <Mail className="w-4 h-4" />
                              </span>
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="kofi@outlook.com"
                                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-green-150 bg-slate-50/40 text-brand-green-950 placeholder-gray-450 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all font-sans"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5 flex justify-between items-center">
                            <span>Accra Delivery District / Sector</span>
                            <span className="text-[9px] text-brand-orange-600 font-bold lowercase">Determines dispatch fee</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                              <Map className="w-4 h-4" />
                            </span>
                            <select
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-green-150 bg-slate-50/40 text-brand-green-950 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all font-sans cursor-pointer appearance-none"
                            >
                              {ACCRA_DISTRICTS.map((d) => (
                                <option key={d.name} value={d.name}>
                                  {d.name} (GH₵ {d.fee}.00 Fee)
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                            Street Address & Digital Postcode <span className="text-rose-500">*</span>
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. House No. 24, Kofi Annan Lane, East Legon"
                            className="w-full p-3 text-xs rounded-xl border border-brand-green-150 bg-slate-50/40 text-brand-green-950 placeholder-gray-450 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                            Nearest Prominent Landmark <span className="text-gray-400 normal-case">(e.g., shell junction, school, bank)</span>
                          </label>
                          <input
                            type="text"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            placeholder="e.g. Opposite the East Legon Police Station"
                            className="w-full p-3 text-xs rounded-xl border border-brand-green-150 bg-slate-50/40 text-brand-green-950 placeholder-gray-450 focus:outline-hidden focus:border-brand-orange-500 focus:bg-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3 text-left">
                        <button
                          type="button"
                          onClick={handleBackToCart}
                          className="flex-1 py-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-center"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-[2] py-3 text-xs font-bold rounded-xl bg-brand-green-800 hover:bg-brand-green-900 text-white transition-colors cursor-pointer text-center"
                        >
                          Continue to Pricing & Payment
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 2: PAYMENT METHOD DECORATIVE FORM */}
                  {checkoutStep === 2 && (
                    <div className="space-y-4 text-left animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100 mb-4">
                        <CreditCard className="w-4 h-4 text-brand-orange-500" />
                        <h3 className="font-display font-black text-sm text-brand-green-950 uppercase tracking-wider">
                          2. Review & Select payment method
                        </h3>
                      </div>

                      {/* Detailed billing card */}
                      <div className="p-4.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5 font-mono text-xs text-brand-green-950">
                        <div className="flex justify-between">
                          <span className="text-gray-400 uppercase">Juice Basket Subtotal:</span>
                          <span className="font-bold">GH₵ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 uppercase">Accra Dispatch Delivery:</span>
                          <span className="font-bold">GH₵ {deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-dashed border-slate-200 pt-2.5 flex justify-between font-black text-sm text-brand-orange-600">
                          <span className="uppercase">GRAND TOTAL TO PAY:</span>
                          <span>GH₵ {grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Payment Methods Grid */}
                      <div className="space-y-2.5">
                        <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                          Select Preferred Gateway
                        </label>

                        {/* Option 1: MTN MoMo */}
                        <div 
                          onClick={() => setPaymentMethod('momo_mtn')}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === 'momo_mtn'
                              ? 'border-brand-orange-500 bg-brand-orange-50/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-amber-400/90 flex items-center justify-center font-bold font-mono text-xs text-brand-green-955">
                              MTN
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-brand-green-950">MTN Mobile Money (MoMo)</h4>
                              <p className="text-[10px] text-gray-500">Pay securely via standard MoMo Prompt</p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'momo_mtn' ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-slate-300'
                          }`}>
                            {paymentMethod === 'momo_mtn' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>

                        {/* Option 2: Telecel Cash */}
                        <div 
                          onClick={() => setPaymentMethod('momo_telecel')}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === 'momo_telecel'
                              ? 'border-brand-orange-500 bg-brand-orange-50/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-red-650 flex items-center justify-center font-bold font-mono text-xs text-white">
                              TC
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-brand-green-950">Telecel Cash</h4>
                              <p className="text-[10px] text-gray-500">Fast transaction verification across networks</p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'momo_telecel' ? 'border-brand-orange-500 bg-brand-orange-505' : 'border-slate-300'
                          }`}>
                            {paymentMethod === 'momo_telecel' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>

                        {/* Option 3: Bank Transfer */}
                        <div 
                          onClick={() => setPaymentMethod('bank_transfer')}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === 'bank_transfer'
                              ? 'border-brand-orange-500 bg-brand-orange-50/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold font-mono text-xs text-white">
                              🏦
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-brand-green-950">E-Bank / Instant Transfer</h4>
                              <p className="text-[10px] text-gray-500">GCB, Ecobank, Stanbic, or GT Bank</p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'bank_transfer' ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-slate-300'
                          }`}>
                            {paymentMethod === 'bank_transfer' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>

                        {/* Option 4: Cash on Delivery */}
                        <div 
                          onClick={() => setPaymentMethod('cod')}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === 'cod'
                              ? 'border-brand-orange-500 bg-brand-orange-50/20'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-brand-green-700 flex items-center justify-center font-bold font-mono text-xs text-white">
                              ₵
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-brand-green-950">Cash on Hand (Delivery)</h4>
                              <p className="text-[10px] text-gray-500">Pay dispatch dispatcher during delivery handoff</p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'cod' ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-slate-300'
                          }`}>
                            {paymentMethod === 'cod' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>

                      {/* Inputs conditional based on payment network choice */}
                      {(paymentMethod === 'momo_mtn' || paymentMethod === 'momo_telecel') && (
                        <div className="space-y-3 p-4 bg-amber-50/30 rounded-2xl border border-amber-150 text-left animate-in slide-in-from-top-2 duration-150">
                          <div>
                            <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase tracking-widest mb-1.5">
                              Registered Wallet Number (GHS Mobile Money) <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={walletNumber}
                              onChange={(e) => setWalletNumber(e.target.value)}
                              placeholder="e.g. 054 123 4567"
                              className="w-full p-2.5 text-xs rounded-xl border border-brand-green-150 bg-white text-brand-green-950 placeholder-gray-450 focus:outline-hidden focus:border-brand-orange-500 transition-all font-mono"
                            />
                            <p className="text-[9px] text-gray-400 font-mono mt-1 leading-relaxed">
                              A payment notification prompt will be initiated to this exact 10-digit handset number on checkout approval.
                            </p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'bank_transfer' && (
                        <div className="p-4 bg-blue-50/20 rounded-2xl border border-blue-100 text-left space-y-2 text-[11px] text-gray-700 leading-relaxed font-sans animate-in slide-in-from-top-2 duration-155">
                          <span className="font-mono font-black text-brand-green-900 block uppercase text-[9px]">
                            Frutelli Company Ghana Accounts:
                          </span>
                          <p>
                            <strong>Ecobank Ghana:</strong> 1441002485912 (Accra Retail Mall Depot)<br />
                            <strong>GCB Bank:</strong> 101054329012 (Independence Square Branch)<br />
                            <strong>Type:</strong> Standard Instant Clearing Transfer / G-Payments
                          </p>
                          <div className="pt-2">
                            <label className="block text-[10px] font-mono font-black text-brand-green-950 uppercase mb-1">
                              Depositor/Sender Account Name Reference
                            </label>
                            <input
                              type="text"
                              required
                              value={accountHolderName}
                              onChange={(e) => setAccountHolderName(e.target.value)}
                              placeholder="e.g. Kofi Mensah GCB Transaction"
                              className="w-full p-2.5 text-xs rounded-xl border border-brand-green-150 bg-white text-brand-green-950 placeholder-gray-405 focus:outline-hidden focus:border-brand-orange-500 transition-all font-sans"
                            />
                          </div>
                        </div>
                      )}

                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          className="flex-1 py-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-center"
                        >
                          Change Info
                        </button>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          disabled={isPlacingOrder}
                          className="flex-[2] py-3 text-xs font-bold rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-1.5"
                        >
                          {isPlacingOrder ? (
                            <span>Securing seals...</span>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>Authorize & Book Delivery</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: HIGH-FIDELITY RECEIPT CONFIRMATION HANDOVER */}
                  {checkoutStep === 3 && generatedOrder && (
                    <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-300">
                      
                      {/* Floating Check circle visual mark */}
                      <div className="mx-auto w-16 h-16 bg-brand-green-50 rounded-full flex items-center justify-center text-brand-green-800 shadow-xs">
                        <CheckCircle className="w-9 h-9 stroke-[2]" />
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-mono font-black text-brand-orange-600 uppercase tracking-widest block">
                          CHECKOUT COMPLETE • INVOICE GENERATED
                        </span>
                        <h3 className="font-display font-black text-2xl text-brand-green-950">
                          Juice Cold-Press Booked!
                        </h3>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto font-sans leading-relaxed">
                          Your premium 1L cartons are currently being brought out from our Accra central refrigeration vault. Your dispatcher Ebenezer is prepping delivery.
                        </p>
                      </div>

                      {/* The printable highcraft voucher display card */}
                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-left font-mono text-xs text-brand-green-950 space-y-3 divide-y divide-gray-150">
                        <div className="pb-3.5 flex justify-between items-center bg-white p-3 rounded-xl border border-dashed border-slate-200">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Booking Docket ID</span>
                            <span className="font-bold text-sm text-brand-orange-650">{generatedOrder.orderId}</span>
                          </div>
                          <span className="text-[10px] bg-brand-green-500 text-white py-1 px-2.5 rounded-md font-bold uppercase tracking-wider scale-95">
                            Active
                          </span>
                        </div>

                        <div className="pt-3.5 pb-2.5 space-y-1.5 font-sans">
                          <p className="flex justify-between">
                            <span className="text-gray-400">Recipient:</span>
                            <strong className="text-brand-green-950">{name}</strong>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-450">Contact:</span>
                            <strong>{phone}</strong>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-450">Destination:</span>
                            <strong className="text-right truncate max-w-[180px]">{address}, {district}</strong>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-450">Payment Gateway:</span>
                            <strong>{paymentLabelMap[paymentMethod]}</strong>
                          </p>
                        </div>

                        <div className="pt-3.5 space-y-1">
                          <div className="flex justify-between uppercase text-[10px] text-gray-400 font-bold font-mono">
                            <span>Basket Items</span>
                            <span>Quantities</span>
                          </div>
                          {cartItems.map((item, idx) => (
                            <p key={idx} className="flex justify-between font-sans text-xs">
                              <span className="truncate max-w-[200px]">{item.product.name} ({item.product.volume})</span>
                              <strong>{item.quantity}x</strong>
                            </p>
                          ))}
                        </div>

                        <div className="pt-3.5 font-mono">
                          <div className="flex justify-between text-brand-orange-600 font-black">
                            <span className="uppercase text-[11px]">GRAND TOTAL BILL:</span>
                            <span>GH₵ {generatedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* User actions list */}
                      <div className="space-y-2.5 pt-2">
                        <a
                          href={getWhatsAppReceiptLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-3.5 px-4 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-sans"
                        >
                          <MessageSquare className="w-4 h-4 animate-bounce" />
                          <span>Instantly Validate via WhatsApp Group</span>
                        </a>

                        <button
                          onClick={handleTrackInApp}
                          className="w-full py-3.5 rounded-xl bg-brand-green-800 hover:bg-brand-green-900 border border-brand-green-700 text-white font-display text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-sans"
                        >
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Track Delivery Live on Portal</span>
                        </button>

                        <button
                          onClick={() => {
                            onClose();
                            setIsCheckout(false);
                            onClearCart();
                          }}
                          className="w-full py-3 text-xs font-medium bg-white text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          Back to Home & Browse
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Sticky Drawer Footer Subtotals Panel */}
            {!isCheckout && cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-150 bg-slate-50/60 font-sans space-y-4 text-left">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Selected Pure Juices Count:</span>
                    <span className="font-mono font-bold text-gray-700">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} Litres</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Accra Regional Delivery Location:</span>
                    <span className="font-semibold text-brand-green-950">{district}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-brand-green-950 pt-2 border-t border-slate-200/50">
                    <span className="text-gray-500">Subtotal Pricing (Excl. delivery):</span>
                    <span className="font-mono text-base font-black text-brand-orange-600">GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleStartCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-sm font-black transition-all hover:scale-102 cursor-pointer shadow-lg hover:shadow-brand-orange-100 flex items-center justify-center gap-2 block origin-center text-center"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Securely Proceed to Checkout</span>
                </button>
              </div>
            )}

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
