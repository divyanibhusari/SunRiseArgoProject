import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Compass, HeartHandshake } from 'lucide-react';
import { STATS } from '../data';

export default function WhyChooseUs() {
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    // Simple custom fluid countup
    const duration = 1500; // 1.5 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setCounts(
        STATS.map((stat) => {
          const progress = Math.min(frame / totalFrames, 1);
          // Cubic ease-out
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          return Math.floor(easeProgress * stat.value);
        })
      );

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  const businessValues = [
    {
      icon: TrendingUp,
      title: "Reliable Wholesale Supply",
      desc: "Whether you run a large retail supermarket chain or local catering service, our stable logistics ensure you receive uniform, high-quality bags on time."
    },
    {
      icon: Compass,
      title: "Sourcing Integrity",
      desc: "By sourcing from nutrient-rich tribal farmlands, we ensure our rice carries traditional flavor qualities and meets pure Sortex hygiene metrics."
    },
    {
      icon: HeartHandshake,
      title: "Transparency & Relations",
      desc: "At SunRice Agro, bulk contracts are built under fair pricing and open channels. We strive to cultivate long-term partner relationships."
    }
  ];

  return (
    <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
      {/* Background neon light layers */}
      <div className="absolute left-[10%] bottom-0 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none animate-pulse-slow" />
      <div className="absolute right-[5%] top-[10%] w-[250px] h-[250px] bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Statistics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 select-none">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className="text-center p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm shadow-xl"
            >
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-amber-400 mb-2">
                {counts[idx]}
                {stat.suffix}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-sans tracking-wide uppercase font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Section: Why We Stand Out */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Highlight lists */}
          <div className="select-none">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-3">
              Uncompromising Quality Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-6">
              Our Professional Bulk Agro Operations
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans">
              We understand that food supply structures act as key assets for catering businesses, hotels, and local food shops. That's why our bags strictly maintain Sortex clean sorting and air-tight packaging.
            </p>

            {/* List Checklist */}
            <div className="space-y-4">
              {[
                "100% SorTexted Clean & Dust-Free",
                "Specially Packed in Double-Laminated Bag Skins",
                "Sourced Ethically supporting Local Tribal Farming Grains",
                "Flexible Shipping & Instant Phone Coordination",
                " Nagpur-Centric Hub prioritizing Swift Dispatch operations",
                "Full compliance with Food Safety standards"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-255 font-sans">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Box Cards (Staggered hover effects) */}
          <div className="space-y-6">
            {businessValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl bg-gray-900/40 hover:bg-gray-900/70 shadow-lg hover:shadow-xl transition-all flex gap-4 select-none"
                >
                  <div className="p-3.5 h-fit rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-white text-base mb-2">
                      {val.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-sans">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
