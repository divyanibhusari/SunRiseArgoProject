/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import GallerySlider from './components/GallerySlider';
import OrderSection from './components/OrderSection';
import ContactSection from './components/ContactSection';
import OrderTrackerModal from './components/OrderTrackerModal';
import Footer from './components/Footer';
import { HelpCircle, ChevronDown, Award } from 'lucide-react';
import { FAQS } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProductForOrder, setSelectedProductForOrder] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset slightly for sticky header
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Callback to handle immediate ordering from product card click
  const handleSelectProductForOrder = (productName: string) => {
    setSelectedProductForOrder(productName);
    // Short defer to ensure order form anchors scrolling are clean
    setTimeout(() => {
      handleNavigate('order');
    }, 100);
  };

  // Intersection Observer to monitor active section on manual scroll
  useEffect(() => {
    const sections = ['home', 'about', 'products', 'order', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Center active window zone
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 scroll-smooth">
      {/* Dynamic Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
      />

      {/* Main Single Page Sections flow */}
      <main className="flex-grow">
        
        {/* Hero Banner Grid + Bag sliding showcase */}
        <Hero onNavigate={handleNavigate} />

        {/* Corporate Profile + Vision/Mission + Feature summaries */}
        <About />

        {/* Collection Grid + Springs animated Details popups */}
        <Products onSelectProductForOrder={handleSelectProductForOrder} />

        {/* Visual metrics panel + Animated counter milestones */}
        <WhyChooseUs />

        {/* Auto-sliding drag/click image carousel */}
        <GallerySlider />

        {/* Contact/WhatsApp inquiry generator + scan Laser QR container */}
        <OrderSection selectedProductFromNav={selectedProductForOrder} />

        {/* Frequently Asked Questions Accordion Grid */}
        <section className="py-24 bg-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header Block */}
            <div className="text-center mb-16 select-none">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 block mb-2">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="h-1 w-16 bg-amber-500 rounded-full mx-auto mt-3" />
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl overflow-hidden bg-gray-50 hover:bg-white transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full py-4.5 px-6 flex items-center justify-between text-left font-sans select-none focus:outline-none cursor-pointer"
                    >
                      <span className="text-sm font-extrabold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-amber-500' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-60' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 text-xs sm:text-sm text-gray-650 leading-relaxed font-sans bg-gray-50/50">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Detailed direct messaging forms & GPS maps */}
        <ContactSection />

      </main>

      {/* Styled copyright & Compliance anchor footer */}
      <Footer onNavigate={handleNavigate} onOpenTrackModal={() => setIsTrackModalOpen(true)} />

      {/* Order Tracking Modal Dialog */}
      <OrderTrackerModal isOpen={isTrackModalOpen} onClose={() => setIsTrackModalOpen(false)} />
    </div>
  );
}
