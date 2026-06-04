import { Product, FAQ, StatItem } from './types';

export const COMPANY_DETAILS = {
  name: "SunRice Agro",
  tagline: "Quality Rice for Every Home & Business",
  description: "SunRice Agro is dedicated to serving customers with quality rice products sourced from rich tribal farming regions of India, processed using modern standards while maintaining transparency, trust, and ultimate satisfaction.",
  phone: "9572697269",
  whatsapp: "9572697269",
  email: "Sunriceagro1@gmail.com",
  address: "UG-8, Yogi Krupa Apartment, Near Kachi Visa Ground, Lakadganj, Nagpur - 440008, Maharashtra, India",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.201476685848!2d79.11717247596001!3d21.144372983796843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4bb49bcec842f1%3A0xc3cf905330a10df7!2sKacchi%20Visa%20Lad%20Lohan%20Agrawal%20Mahajan%20Trust%20Ground!5e0!3m2!1sen!2sin!4v1717512345678!5m2!1sen!2sin",
  logo: "/src/assets/images/sunrice_logo_1780563308492.png",
};

export const PRODUCTS: Product[] = [
  {
    id: "premium-quality",
    name: "Janta's KKK Premium Quality Rice",
    category: "Premium Quality Rice",
    packSize: "30 KG",
    image: "/src/assets/images/kkk_premium_quality_rice_1780563365859.png",
    description: "Premium quality steam rice processed and packed to maintain exquisite freshness, color, and texture consistency. Sourced from choice paddy and polished uniformly, it is a versatile choice for direct consumption, residential kitchens, retail stores, and bulk distributors.",
    features: [
      "Premium Quality Steam Rice",
      "Export Quality Standards",
      "Advanced Sortex Cleaned & Polished",
      "Strict Quality Control Checks",
      "Heavy-duty 30 KG Secure Packaging"
    ],
    isBestSeller: true
  },
  {
    id: "surti-wada-kolam",
    name: "Janta's KKK Surti Wada Kolam Rice",
    category: "Wada Kolam Special",
    packSize: "30 KG",
    image: "/src/assets/images/kkk_surti_wada_kolam_rice_1780563349047.png",
    description: "A popular, premium-grade rice variety renowned for its beautiful slender grain structure, traditional aroma, and non-sticky texture. It is extremely popular across Maharashtra for daily meals, catering projects, and hospitality business menus.",
    features: [
      "Authentic Surti Wada Kolam Grains",
      "High Nutritional Content",
      "Export Quality Steam Rice",
      "Sortex Clean & Hygenic Processing",
      "Standard 30 KG Bag Packaging"
    ]
  },
  {
    id: "surti-wada-kolam-new",
    name: "Janta's KKK Surti Wada Kolam Rice (New Pack)",
    category: "Tribal Region Paddy",
    packSize: "30 KG",
    image: "/src/assets/images/kkk_surti_wada_kolam_new_pack_1780563332805.png",
    description: "Specially sourced from pristine tribal area paddy fields where enriched organic-rich soil produces superior harvest batches. Hygienically processed and packed in our modern state-of-the-art rice milling plant to deliver non-sticky elongation and consistent cooking behavior.",
    features: [
      "Sourced from Premium Tribal Paddy Fields",
      "Hygienically Packed in Sealed Bag",
      "Milled and Sorted in Modern High-tech Plant",
      "Sortex Clean & Pure Stream Processed",
      "30 KG Packaging in High-strength Bags"
    ],
    isBestSeller: true
  },
  {
    id: "premium-export",
    name: "Janta's KKK Premium Export Rice",
    category: "Premium Quality Export Rice",
    packSize: "30 KG",
    image: "/src/assets/images/kkk_premium_export_rice_1780563385814.png",
    description: "Premium export-quality rice with magnificent luster, high volume grain expansion, and long fluffy length. Specially milled and carefully packaged under expert supervision. It serves international export standards and is perfect for wholesalers, supermarkets, and upscale fine dining setups.",
    features: [
      "Premium Quality Export Grade Grains",
      "Rigid Multi-level Sorting",
      "Fine Uniform Polishing & Selection",
      "Ideal for Hotels, Caterers & Exports",
      "Strong 30 KG Export-Grade Packaging"
    ]
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "Do you accept wholesale & bulk orders?",
    answer: "Yes, we cater to bulk orders for wholesalers, retailers, distributors, grocery stores, restaurants, hotels, and caterers. Please get in touch via phone or WhatsApp for custom pricing based on your volume requirements."
  },
  {
    id: "faq-2",
    question: "How can I place an order with SunRice Agro?",
    answer: "Ordering is simple! First, browse our products and note your desired quantity. Second, click on the 'Order Now' or 'Order on WhatsApp' button to connect directly with our support team, or call us at +91 9572697269. We'll verify your details and coordinate delivery."
  },
  {
    id: "faq-3",
    question: "What is your standard packaging size?",
    answer: "Our standard, premium packaging size across our product range is 30 KG bags. This packaging is designed to maintain dry conditions, hygiene, freshness, and structural integrity during shipping."
  },
  {
    id: "faq-4",
    question: "Where is SunRice Agro based, and do you supply outside Nagpur?",
    answer: "We are based in Lakadganj, Nagpur, Maharashtra. While Nagpur is our primary distribution hub, we supply rice products to bulk business clients and distributors across various locations. Contact our support team for regional shipping logistics."
  },
  {
    id: "faq-5",
    question: "Is your rice sortex-cleaned and quality-sorted?",
    answer: "Absolutely! All our rice products under Janta's KKK are processed in advanced modern plants. They undergo meticulous quality checks and advanced Sortex sorting to remove impurities, broken grains, and ensure uniform color and clean quality."
  }
];

export const STATS: StatItem[] = [
  { id: "stat-1", value: 15, suffix: "+", label: "Years of Agribusiness Expertise" },
  { id: "stat-2", value: 5000, suffix: "+", label: "Satisfied Customers & Partners" },
  { id: "stat-3", value: 100, suffix: "+", label: "Active Distribution Network" },
  { id: "stat-4", value: 50, suffix: "+", label: "Bulk Shipments Weekly" }
];
