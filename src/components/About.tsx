import { motion } from 'motion/react';
import { Award, Layers, Target, Users, Rocket } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';

export default function About() {
  const cards = [
    {
      icon: Award,
      title: "Premium Quality Grains",
      desc: "Carefully graded, sortexed, and quality-vetted steam rice to ensure pristine texture, non-sticky cooking, and rich natural culinary taste.",
      color: "from-amber-500 to-yellow-500",
      bgLight: "bg-amber-500/5",
      borderCol: "border-amber-500/20"
    },
    {
      icon: Layers,
      title: "Modern Food Processing",
      desc: "Processed in a modern plant with advanced high-speed automated sorting, hygienic lines, and custom climate-optimized storing filters.",
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-500/5",
      borderCol: "border-emerald-500/20"
    },
    {
      icon: Target,
      title: "Export Grade Standards",
      desc: "Grown in robust environments including local tribal area paddy grounds, guaranteeing organic-rich soil values and global standard output.",
      color: "from-blue-500 to-indigo-500",
      bgLight: "bg-blue-500/5",
      borderCol: "border-blue-500/20"
    },
    {
      icon: Users,
      title: "Trusted Local Distribution",
      desc: "A reliable network providing wholesale deliveries, household bags, and custom supply-chain partnerships across India and global hubs.",
      color: "from-red-500 to-orange-500",
      bgLight: "bg-red-500/5",
      borderCol: "border-red-500/20"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background grain vector */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute left-[5%] top-[10%] w-[250px] h-[250px] bg-red-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Info & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 select-none text-center lg:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 block mb-3">
              About SunRice Agro
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight leading-none mb-6">
              Our Vision & <span className="text-amber-500">Mission</span> in Nagpur
            </h2>
            <div className="h-1.5 w-20 bg-amber-500 rounded-full mx-auto lg:mx-0 mb-6" />
          </div>

          <div className="lg:col-span-7 font-sans text-center lg:text-left">
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {COMPANY_DETAILS.description} We believe that food purity and robust distribution networks construct the pillars of long-term commercial satisfaction.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Based in the heart of Maharashtra, we procure agricultural wealth directly from pristine landscapes. We focus on modern processing, hygienically sealed <strong>30 KG packing solutions</strong>, and a friction-free wholesale communication system.
            </p>
          </div>
        </div>

        {/* 2-Column: Vision vs Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
              hover: { y: -10, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.15)" }
            }}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="rounded-3xl p-8 bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden shadow-xl select-none cursor-default group"
          >
            <motion.div
              variants={{
                hover: { y: -4, scale: 1.15, rotate: 12, textShadow: "0 0 10px rgba(245,158,11,0.6)" }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-amber-400 mb-5 inline-block"
            >
              <Target className="h-8 w-8" />
            </motion.div>
            <h3 className="text-xl font-display font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">Our Vision</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              To become a highly trusted and preferred premium name in the agricultural rice industry by consistently delivering quality-polished, hygienic products and developing reliable, lasting relationships with households, wholesalers, and retail chains.
            </p>
          </motion.div>

          <motion.div
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 },
              hover: { y: -10, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.15)" }
            }}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="rounded-3xl p-8 bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden shadow-xl select-none cursor-default group"
          >
            <motion.div
              variants={{
                hover: { y: -4, scale: 1.15, rotate: -12, textShadow: "0 0 10px rgba(245,158,11,0.6)" }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-amber-400 mb-5 inline-block"
            >
              <Rocket className="h-8 w-8" />
            </motion.div>
            <h3 className="text-xl font-display font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              To provide exceptionally premium, sortexed, non-sticky rice packaging solutions while committing to stellar, transparent communication structures, quick order validation, rigorous logistical support, and continuous refinement of our industrial setups.
            </p>
          </motion.div>
        </div>

        {/* Feature Cards Grid (Staggered Animation) */}
        <div className="mb-8">
          <div className="text-center mb-10 select-none">
            <span className="text-xs font-mono font-bold text-amber-600 block uppercase tracking-widest mb-1">
              Core Strengths
            </span>
            <h3 className="text-2xl font-display font-extrabold text-gray-800">
              Why Choose SunRice Agro?
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="rounded-2xl p-6 bg-white shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col items-start"
                >
                  {/* Visual Top Highlight Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
                  
                  {/* Icon wrapper */}
                  <div className={`p-3 rounded-xl ${card.bgLight} mb-5`}>
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>

                  <h4 className="text-lg font-display font-bold text-gray-900 mb-2">
                    {card.title}
                  </h4>
                  <p className="text-gray-650 text-xs leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
