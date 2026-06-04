import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Sprout } from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Set up custom items for particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${10 + Math.random() * 80}%`,
    size: Math.random() * 12 + 6,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 6,
  }));

  const activeProduct = PRODUCTS[currentSlide];

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-amber-955 overflow-hidden flex items-center pt-24 pb-16"
    >
      {/* Background Graphic: Tribal Paddy Fields Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <path
            fill="#f4b400"
            d="M0,224L48,240C96,256,192,288,288,288C384,288,480,256,576,218.7C672,181,768,139,864,144C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ></path>
        </svg>
      </div>

      {/* Floating Grain Particles */}
      <div className="absolute inset-0 pointer-events-none select-none z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-amber-400/20 backdrop-blur-[1px] rounded-full flex items-center justify-center"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size * 1.5,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // rice grain lookalike
              transform: 'rotate(15deg)',
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 10, 0],
              rotate: [15, 35, 15],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Animated Glowing Sun behind paddy fields */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute right-[-100px] top-[10%] w-[400px] h-[400px] bg-red-650/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline copy and value statements */}
          <div className="lg:col-span-7 select-none text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-6 uppercase tracking-wider"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Sourced from Tribal Regions of India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-none mb-6"
            >
              Premium Quality Rice <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Sourced With Care
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 font-sans max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Hygienically processed and packed in modern plants using <strong>Sortex clean</strong> technology. SunRice Agro Nagpur bridges Indian agricultural purity with certified export-grade quality.
            </motion.p>

            {/* Badges Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 mb-10 text-left font-sans"
            >
              <div className="flex items-center gap-2.5 text-gray-200 text-sm">
                <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Sprout className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <span>Tribal Area Paddy</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-200 text-sm">
                <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <span>Hygienically Packed</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-200 text-sm">
                <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <span>Sortex Cleaned Grains</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-200 text-sm">
                <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <span className="text-[10px] font-bold text-amber-400">30K</span>
                </div>
                <span>30 KG Pack Size</span>
              </div>
            </motion.div>

            {/* Actions CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                View Products
              </button>
              <button
                onClick={() => onNavigate('order')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-amber-400 hover:text-white border border-amber-500/30 hover:border-amber-400 font-bold text-sm tracking-wider uppercase active:scale-95 transition-all cursor-pointer"
              >
                Place Order
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D-feeling Branded Bags Photo Slider */}
          <div className="lg:col-span-5 flex flex-col justify-center relative">
            
            {/* Visual glow frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent rounded-3xl blur-[40px] pointer-events-none" />

            <div className="relative w-full max-w-sm mx-auto aspect-square hover:scale-[1.02] transition-transform duration-500 rounded-3xl overflow-hidden">
              <AnimatePresence>
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 150 }}
                  className="absolute inset-0 p-4 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-md flex items-center justify-center dynamic-perspective cursor-pointer"
                >
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_40px_rgba(244,180,0,0.35)]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Status Indicator inside the slide card */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-gray-950/80 p-3 border border-gray-800 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400">
                        {activeProduct.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent-green/20 text-emerald-400 border border-emerald-500/30">
                        {activeProduct.packSize} Pack
                      </span>
                    </div>
                    <p className="text-gray-200 text-xs font-semibold mt-1 truncate">
                      {activeProduct.name}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2.5 mt-8 select-none">
              {PRODUCTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-amber-500' : 'w-2 bg-gray-75 *::bg-gray-700/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Separator Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,86.05,25.43"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </section>
  );
}
