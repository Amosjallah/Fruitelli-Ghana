/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, CartItem, Product } from './types';
import SEOMarkup from './components/SEOMarkup';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Products from './components/Products';
import BulkOrders from './components/BulkOrders';
import About from './components/About';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import OrderTracker from './components/OrderTracker';
import HowToOrder from './components/HowToOrder';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartAndCheckout from './components/CartAndCheckout';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        triggerToast(`Increased volume of "${product.name}" in your delivery cart!`);
        return copy;
      }
      triggerToast(`Added "${product.name}" (1 Litre Option) to your delivery cart!`);
      return [...prev, { product, quantity: 1 }];
    });
    // Auto-expand cart panel for delightful feedback!
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const itemToDrop = prev.find((i) => i.product.id === productId);
      if (itemToDrop) {
        triggerToast(`Removed "${itemToDrop.product.name}" from your cart.`);
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Unified tab transition animations
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: 'easeIn' } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfc] text-charcoal-900 selection:bg-brand-orange-100 selection:text-brand-orange-700 relative">
      
      {/* 1. Schema Markup & local SEO injection */}
      <SEOMarkup />

      {/* 2. Responsive Sticky Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. Main Dynamic Content Wrapper */}
      <main className="flex-grow">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {activeTab === 'home' && (
            <>
              <Hero onNavigate={setActiveTab} />
              <WhyChoose />
              <Products onAddToCart={handleAddToCart} />
              <HowToOrder />
              <BulkOrders />
              <About />
              <Reviews />
              <FAQ />
              <OrderTracker />
              <Contact />
            </>
          )}

          {activeTab === 'products' && (
            <div className="pt-16">
              <Products onAddToCart={handleAddToCart} />
              <HowToOrder />
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="pt-16">
              <BulkOrders />
              <HowToOrder />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="pt-16">
              <About />
              <WhyChoose />
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="pt-16">
              <Reviews />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="pt-16">
              <Contact />
            </div>
          )}
        </motion.div>
      </main>

      {/* 4. Brand Action-Focused Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 5. Pure Fruit Toast Notifications overlay banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed top-24 left-1/2 z-[100] bg-brand-green-950 border border-brand-green-800/80 text-white text-xs font-mono font-bold py-3.5 px-6 rounded-2xl shadow-2xl flex items-center space-x-3 pointer-events-none"
          >
            <span className="text-brand-orange-500 animate-pulse text-sm">🍊</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Comprehensive Checkout Overlay Component */}
      <CartAndCheckout
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToTab={setActiveTab}
      />

    </div>
  );
}
