import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, X, CheckCircle, Scale, PackageOpen, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductsProps {
  onSelectProductForOrder: (productName: string) => void;
}

export default function Products({ onSelectProductForOrder }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure currentIndex stays within valid boundaries when visibleCount changes
  const maxIndex = Math.max(0, PRODUCTS.length - visibleCount);
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  const slideLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleOrderClick = (productName: string) => {
    onSelectProductForOrder(productName);
    setSelectedProduct(null); // Close modal if open
  };

  return (
    <section id="products" className="py-24 bg-white relative">
      {/* Visual background lines */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-150 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-150 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 text-xs font-mono font-bold uppercase rounded-full mb-3"
          >
            <Award className="h-3.5 w-3.5 text-amber-500" />
            Our Rice Products
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight mb-4">
            Premium Rice Collection
          </h2>
          <p className="text-gray-550 text-base max-w-2xl mx-auto font-sans leading-relaxed">
            SunRice Agro offers a carefully selected rice range processed under high hygienic conditions. Perfect for homes, restaurants, grocery shops, distributors, and exporters.
          </p>
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent w-40 mx-auto mt-6 rounded-full" />
        </div>

        {/* Product Cards Grid Wrapper - Interactive Slider with Touch slide capabilities */}
        <div className="relative overflow-hidden py-4 px-2 -mx-2">
          {/* Premium Floating Navigation Buttons */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={slideLeft}
                className="absolute left-4 top-[38%] -translate-y-1/2 z-30 p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 text-gray-800 hover:text-amber-600 hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous Product"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={slideRight}
                className="absolute right-4 top-[38%] -translate-y-1/2 z-30 p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 text-gray-800 hover:text-amber-600 hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Next Product"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.div
            className="flex gap-8"
            animate={{ x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (32 / visibleCount)}px)` }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          >
            {PRODUCTS.map((prod) => {
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="relative flex flex-col h-full bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(244,180,0,0.12)] hover:bg-white transition-all group overflow-hidden shrink-0"
                  style={{
                    width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 32 / visibleCount}px)`
                  }}
                >
                  {/* Floating Badges */}
                  {prod.isBestSeller && (
                    <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-amber-500 text-gray-900 text-[10px] uppercase font-bold tracking-wider shadow">
                      Best Seller
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-gray-900/10 backdrop-blur-md text-[10px] uppercase font-mono font-bold text-gray-600 block">
                    {prod.packSize} Bag
                  </div>

                  {/* Centered Image Container with Background circle decoration */}
                  <div className="relative aspect-square w-full rounded-2xl bg-white p-4 flex items-center justify-center overflow-hidden mb-6 group-hover:scale-[1.03] transition-transform duration-500 shadow-sm border border-gray-100">
                    {/* Subtle radiating backdrop circular ring */}
                    <div className="absolute h-36 w-36 rounded-full bg-amber-500/5 blur-xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_10px_20px_rgba(17,24,39,0.15)] group-hover:drop-shadow-[0_15px_30px_rgba(244,180,0,0.3)] transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick-action overlay buttons (appears on hover) */}
                    <div className="absolute inset-0 bg-gray-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all text-center cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleOrderClick(prod.name)}
                        className="p-3 bg-amber-500 text-gray-900 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all text-center cursor-pointer"
                        title="Order Now"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="flex flex-col flex-grow select-none">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-600 font-bold mb-1">
                      {prod.category}
                    </span>
                    
                    <h3 className="font-display font-bold text-gray-900 text-base leading-snug group-hover:text-amber-600 transition-colors mb-3 line-clamp-2">
                      {prod.name}
                    </h3>

                    <p className="text-gray-600 text-xs font-sans line-clamp-3 leading-relaxed mb-6">
                      {prod.description}
                    </p>

                    {/* Foot actions */}
                    <div className="flex items-center justify-between gap-2.5 mt-auto pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        View Details &rarr;
                      </button>
                      <button
                        onClick={() => handleOrderClick(prod.name)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-gray-900 transition-all cursor-pointer"
                      >
                        Order Bag
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bullet point indices dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8 select-none">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all rounded-full cursor-pointer ${
                  currentIndex === index ? 'w-8 bg-amber-500' : 'w-2 bg-gray-300 hover:bg-amber-500/55'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Product Details overlay Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={() => setSelectedProduct(null)}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-6 sm:p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Modal Grid structure */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
                  {/* Left Column: Image with glass backing */}
                  <div className="md:col-span-5 flex items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100 min-h-[250px]">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="max-h-[300px] object-contain drop-shadow-[0_15px_30px_rgba(17,24,39,0.15)] hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right Column: Full Branded details */}
                  <div className="md:col-span-7 flex flex-col select-none">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 mb-2">
                      {selectedProduct.category}
                    </span>
                    
                    <h3 className="font-display font-extrabold text-gray-950 text-2xl sm:text-3xl tracking-tight leading-tight mb-4">
                      {selectedProduct.name}
                    </h3>

                    {/* Packaging specs panel */}
                    <div className="flex flex-wrap gap-4 mb-6 pt-3 pb-3 border-y border-gray-100">
                      <div className="flex items-center gap-2 text-gray-700 text-xs">
                        <Scale className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Weight: <strong>{selectedProduct.packSize} Weight Only</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 text-xs">
                        <PackageOpen className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Grain Type: <strong>Export Quality Steam</strong></span>
                      </div>
                    </div>

                    <p className="text-gray-750 text-sm font-sans leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    {/* Features loop */}
                    <h4 className="text-sm font-display font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                      Features & Specifications
                    </h4>
                    <ul className="space-y-2.5 mb-8">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-750">
                          <CheckCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <button
                        onClick={() => handleOrderClick(selectedProduct.name)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold uppercase text-xs tracking-wider rounded-xl shadow-lg active:scale-95 transition-transform cursor-pointer"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Order Product Now
                      </button>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold uppercase text-xs tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
