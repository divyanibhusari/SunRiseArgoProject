import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles, Sprout } from 'lucide-react';
import { PRODUCTS } from '../data';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imgSource: string;
}

export default function GallerySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right-to-left, -1 = left-to-right

  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Janta's KKK Wada Kolam",
      subtitle: "Tribal Region Paddy Processing",
      imgSource: "/src/assets/images/kkk_surti_wada_kolam_new_pack_1780563332805.png"
    },
    {
      id: "gal-2",
      title: "SunRice Agro Logo Branding",
      subtitle: "Official Registered Premium Mark",
      imgSource: "/src/assets/images/sunrice_logo_1780563308492.png"
    },
    {
      id: "gal-3",
      title: "Sortex Premium Quality Rice",
      subtitle: "Uniform Polishing & Double-Sorting",
      imgSource: "/src/assets/images/kkk_premium_quality_rice_1780563365859.png"
    },
    {
      id: "gal-4",
      title: "Janta's KKK Classic Series",
      subtitle: "Gold Standard Wada Kolam Grains",
      imgSource: "/src/assets/images/kkk_surti_wada_kolam_rice_1780563349047.png"
    },
    {
      id: "gal-5",
      title: "Premium Export Special",
      subtitle: "Laminated 30 KG High-grade Seals",
      imgSource: "/src/assets/images/kkk_premium_export_rice_1780563385814.png"
    }
  ];

  // Autoplay loop every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [galleryItems.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const activeItem = galleryItems[activeIndex];

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      zIndex: 0
    })
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Indicator */}
        <div className="text-center mb-12 select-none">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 block mb-2">
            Visual Showroom
          </span>
          <h3 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">
            Our Materials & Brand Portfolio
          </h3>
          <div className="h-1 w-16 bg-amber-500 rounded-full mx-auto mt-3" />
        </div>

        {/* Outer Slider Box with custom shadow and inner border */}
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl bg-white border border-gray-150 shadow-xl aspect-[16/9] flex items-center justify-center p-4">
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeItem.id}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 120, damping: 20 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12"
            >
              {/* Overlay styling */}
              <div className="absolute inset-0 bg-radial from-transparent to-black/5 pointer-events-none" />

              {/* Slider image component */}
              <img
                src={activeItem.imgSource}
                alt={activeItem.title}
                className="max-h-[70%] max-w-[80%] object-contain drop-shadow-[0_12px_24px_rgba(17,24,39,0.12)] animate-pulse-slow"
                referrerPolicy="no-referrer"
              />

              {/* Meta details footer in slider */}
              <div className="absolute bottom-6 left-6 right-6 select-none bg-gray-950/85 text-white p-4 rounded-2xl border border-gray-850 flex items-center justify-between gap-4 backdrop-blur-md">
                <div className="text-left font-sans">
                  <span className="text-[9px] uppercase tracking-widest text-amber-400 font-mono font-bold block mb-0.5">
                    {activeItem.subtitle}
                  </span>
                  <span className="text-sm font-display font-extrabold text-gray-100 block">
                    {activeItem.title}
                  </span>
                </div>
                
                <div className="h-8 w-8 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0 border border-amber-500/25">
                  <ImageIcon className="h-4 w-4 text-amber-400" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-2 rounded-xl bg-white/70 hover:bg-white text-gray-850 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300 shadow-md backdrop-blur-sm hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 p-2 rounded-xl bg-white/70 hover:bg-white text-gray-850 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300 shadow-md backdrop-blur-sm hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Pagination Dots tracks */}
        <div className="flex justify-center gap-2 mt-8 select-none">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                activeIndex === index ? 'w-8 bg-amber-500' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to gallery slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
