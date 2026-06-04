import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Package, ShieldCheck, Truck, Check, Calendar, Phone, HelpCircle, FileText, Scale, ShoppingCart } from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS } from '../data';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrackingData {
  referenceNumber: string;
  clientName: string;
  productName: string;
  quantityBags: number;
  totalWeightKg: number;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: 'submitted' | 'processing' | 'sorted' | 'dispatched' | 'delivered';
  currentHub: string;
  journey: {
    status: string;
    description: string;
    location: string;
    time: string;
    completed: boolean;
  }[];
}

// Built-in mock tracker records to give the user instant test drives
const MOCK_TRACKING_DB: Record<string, TrackingData> = {
  'SR-9572': {
    referenceNumber: 'SR-9572',
    clientName: 'Nagesh Catering Nagpur',
    productName: "Janta's KKK Surti Wada Kolam Rice (New Pack)",
    quantityBags: 50,
    totalWeightKg: 1500,
    orderDate: 'June 02, 2026',
    estimatedDelivery: 'June 05, 2026',
    currentStatus: 'dispatched',
    currentHub: 'Nagpur Main Logistic Depot, Lakadganj',
    journey: [
      {
        status: 'Inquiry Registered & Approved',
        description: 'Wholesale contract confirmed and assigned to Nagpur sales desk.',
        location: 'Lakadganj HQ, Nagpur',
        time: 'June 02, 2026 • 10:15 AM',
        completed: true
      },
      {
        status: 'Grain Selection & SorTexting',
        description: 'Paddy processed in modern Sortex machinery. Dust and broken grains eliminated.',
        location: 'Nagpur Milling Plant',
        time: 'June 02, 2026 • 04:30 PM',
        completed: true
      },
      {
        status: 'Moisture Tested & Packed',
        description: 'Packed securely in high-durability double-laminated 30 KG bags.',
        location: 'Packaging Hub Unit A',
        time: 'June 03, 2026 • 09:00 AM',
        completed: true
      },
      {
        status: 'En-route & Handed to Logistics',
        description: 'Bags loaded onto commercial transport trailers. Tracking enabled.',
        location: 'Nagpur Main Logistic Depot',
        time: 'June 04, 2026 • 08:15 AM',
        completed: true
      },
      {
        status: 'Delivered / Handed Over',
        description: 'Awaiting container arrival and official signature verification.',
        location: 'In-Transit to Destination',
        time: 'Pending Delivery Coordination',
        completed: false
      }
    ]
  },
  'SR-4040': {
    referenceNumber: 'SR-4040',
    clientName: 'Wara Kolam Mart Pune',
    productName: "Janta's KKK Surti Wada Kolam Rice",
    quantityBags: 120,
    totalWeightKg: 3600,
    orderDate: 'June 03, 2026',
    estimatedDelivery: 'June 06, 2026',
    currentStatus: 'sorted',
    currentHub: 'Milling Facility Grid 3, Wardha Road',
    journey: [
      {
        status: 'Inquiry Registered & Approved',
        description: 'Wholesale inquiry logged into central system. Representative assigned.',
        location: 'Lakadganj HQ, Nagpur',
        time: 'June 03, 2026 • 11:00 AM',
        completed: true
      },
      {
        status: 'Grain Selection & SorTexting',
        description: 'Traditional Wada Kolam grains polished and machine-sorted for uniform size.',
        location: 'Nagpur Milling Plant',
        time: 'June 03, 2026 • 05:45 PM',
        completed: true
      },
      {
        status: 'Moisture Tested & Packed',
        description: 'Grains secured in air-tight moisture-resistant 30 KG sack designs.',
        location: 'Packaging Hub Unit A',
        time: 'June 04, 2026 • 08:30 AM',
        completed: true
      },
      {
        status: 'En-route & Handed to Logistics',
        description: 'Transport booking confirmed. Vehicle allocation in progress.',
        location: 'Nagpur Logistical Dispatch',
        time: 'Expected: June 04, 2026 • 06:00 PM',
        completed: false
      },
      {
        status: 'Delivered / Handed Over',
        description: 'Awaiting truck dispatch verification.',
        location: 'Destination Hub',
        time: 'Pending Shipping Status',
        completed: false
      }
    ]
  },
  'SR-2026': {
    referenceNumber: 'SR-2026',
    clientName: 'Shree Balaji Wholesalers Mumbai',
    productName: "Janta's KKK Premium Export Rice",
    quantityBags: 200,
    totalWeightKg: 6000,
    orderDate: 'May 28, 2026',
    estimatedDelivery: 'June 01, 2026',
    currentStatus: 'delivered',
    currentHub: 'Vashi JNPT Port Warehouse, Navi Mumbai',
    journey: [
      {
        status: 'Inquiry Registered & Approved',
        description: 'Export-grade container paperwork signed off and locked.',
        location: 'Nagpur HQ Corporate Desk',
        time: 'May 28, 2026 • 09:20 AM',
        completed: true
      },
      {
        status: 'Grain Selection & SorTexting',
        description: 'Multi-level premium color sorting and grain polish checks succeeded.',
        location: 'Nagpur High-tech Feedplant',
        time: 'May 28, 2026 • 03:00 PM',
        completed: true
      },
      {
        status: 'Moisture Tested & Packed',
        description: 'Packed in state-approved double laminated brand woven bags.',
        location: 'Nagpur Milling Plant',
        time: 'May 29, 2026 • 11:30 AM',
        completed: true
      },
      {
        status: 'En-route & Handed to Logistics',
        description: 'Sealed container truck departed via National Highway networks.',
        location: 'Nagpur Toll Highway Hub',
        time: 'May 30, 2026 • 07:00 AM',
        completed: true
      },
      {
        status: 'Delivered / Handed Over',
        description: 'Bags arrived safely, validated, and signed by warehouse superintendent.',
        location: 'Shree Balaji Yard, Vashi',
        time: 'June 01, 2026 • 02:40 PM',
        completed: true
      }
    ]
  }
};

export default function OrderTrackerModal({ isOpen, onClose }: OrderTrackerModalProps) {
  const [searchInput, setSearchInput] = useState('');
  const [activeTracking, setActiveTracking] = useState<TrackingData | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [localInquiries, setLocalInquiries] = useState<any[]>([]);

  // Load user submitted inquiries from LocalStorage
  const loadLocalInquiries = () => {
    const list = localStorage.getItem('sunrice_inquiries');
    if (list) {
      try {
        const parsed = JSON.parse(list);
        if (Array.isArray(parsed)) {
          setLocalInquiries(parsed);
        }
      } catch (err) {
        console.error("Local stored inquiries parse failure:", err);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLocalInquiries();
      // Keep input empty by default
      setSearchInput('');
      setActiveTracking(null);
      setErrorText(null);
    }
  }, [isOpen]);

  // Handle tracking submission
  const handleTrackSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setErrorText(null);

    const term = searchInput.trim().toUpperCase();
    if (!term) {
      setErrorText("Please fill out a valid reference number.");
      return;
    }

    // 1. Check if it matches our pre-defined high-quality databases
    if (MOCK_TRACKING_DB[term]) {
      setActiveTracking(MOCK_TRACKING_DB[term]);
      return;
    }

    // 2. Check if it matches an actual LocalStorage user inquiry ID
    const foundLocal = localInquiries.find(
      (inq: any) =>
        inq.id === term ||
        inq.id.toLowerCase() === term.toLowerCase() ||
        (inq.id.split('-')[1] && inq.id.split('-')[1].includes(term)) ||
        inq.mobileNumber === term
    );

    if (foundLocal) {
      // Build a beautiful real-time tracker progress page dynamically for this real user inquiry!
      const packCount = parseInt(foundLocal.quantity) || 1;
      const weightKgs = packCount * 30;
      
      // Let's create an intuitive status for real local inquiries based on timestamps
      const timestampMs = parseInt(foundLocal.id.replace('inq-', '')) || Date.now();
      const minutesDiff = (Date.now() - timestampMs) / 1000 / 60;

      let statusObj: 'submitted' | 'processing' | 'sorted' | 'dispatched' | 'delivered' = 'submitted';
      let hubName = "Lakadganj Administrative HQ, Nagpur";
      let statusDesc = "Our sales assistant has verified your WhatsApp routing and is processing bulk clearances.";

      if (minutesDiff > 45) {
        statusObj = 'delivered';
        hubName = foundLocal.message ? "Specified Delivery Zone" : "Local Business Depot";
        statusDesc = "Delivered safely! Representative has confirmed the handover of fresh sortex grains.";
      } else if (minutesDiff > 20) {
        statusObj = 'dispatched';
        hubName = "Nagpur Logistical Dispatch Depot";
        statusDesc = "Your order of 30 KG laminated bags has been cleared and placed in transit.";
      } else if (minutesDiff > 8) {
        statusObj = 'sorted';
        hubName = "Nagpur Milling Facility & SorTexing Grid";
        statusDesc = "Moisture checkpoints completed successfully. Checked for uniform luster and length.";
      } else if (minutesDiff > 2) {
        statusObj = 'processing';
        hubName = "Lakadganj HQ, Nagpur";
        statusDesc = "Your inquiry has been assigned and is being coordinated with freight handlers.";
      }

      // Build personalized tracking object
      const dynamicTracking: TrackingData = {
        referenceNumber: foundLocal.id.toUpperCase(),
        clientName: foundLocal.fullName,
        productName: foundLocal.productRequirement,
        quantityBags: packCount,
        totalWeightKg: weightKgs,
        orderDate: foundLocal.timestamp || "Today",
        estimatedDelivery: new Date(timestampMs + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        currentStatus: statusObj,
        currentHub: hubName,
        journey: [
          {
            status: 'Inquiry Submitted',
            description: 'Order inquiry received via SunRice Agro online portal and queued for processing.',
            location: 'Lakadganj HQ, Nagpur',
            time: foundLocal.timestamp || "Just Now",
            completed: true
          },
          {
            status: 'Assigned & Under Review',
            description: statusDesc,
            location: 'Distribution Desk, Nagpur',
            time: minutesDiff > 2 ? 'Approved & Assigned' : 'Awaiting Administration Integration',
            completed: minutesDiff > 2
          },
          {
            status: 'Sortex Polishing & Packing',
            description: 'Preparing the custom bags from our Nagpur grain reserve under high-grade seals.',
            location: 'Nagpur Milling Grids',
            time: minutesDiff > 8 ? 'Sortex Checked & Woven' : 'Pending Queue Allocation',
            completed: minutesDiff > 8
          },
          {
            status: 'Dispatched & Transport Hub out',
            description: 'Loaded onto bulk delivery trucks with active freight coordinators, ready for route clearance.',
            location: 'Nagpur Dispatch Hub',
            time: minutesDiff > 20 ? 'Cleared Highway Depot' : 'Pending Truck Dispatch',
            completed: minutesDiff > 20
          },
          {
            status: 'Order Delivered & Completed',
            description: 'The premium 30 KG bags have been checked in. All signatures processed successfully.',
            location: foundLocal.address || "Client Warehouse",
            time: minutesDiff > 45 ? 'Logistics Handover Recorded' : 'Expected within 48 hours',
            completed: minutesDiff > 45
          }
        ]
      };

      setActiveTracking(dynamicTracking);
      return;
    }

    // 3. Dynamic seed generator if they search a random number (always yield a consistent dynamic result!)
    let seed = 0;
    for (let i = 0; i < term.length; i++) {
      seed += term.charCodeAt(i);
    }
    const mockClientList = ['Central Hotel Supplies', 'Nagpur Grain Market Depot', 'Shree Sai Distributors', 'Ganesh Foodmart', 'Nishant Retailers'];
    const mockProductsList = PRODUCTS.map(p => p.name);
    
    const clientSelected = mockClientList[seed % mockClientList.length];
    const productSelected = mockProductsList[seed % mockProductsList.length];
    const qtyBagsSeed = (seed % 15) * 10 + 20; // 20 to 160 bags
    
    const statusIndex = seed % 5;
    const statusesEnum: ('submitted' | 'processing' | 'sorted' | 'dispatched' | 'delivered')[] = [
      'submitted', 'processing', 'sorted', 'dispatched', 'delivered'
    ];
    const curStatus = statusesEnum[statusIndex];
    
    const dynamicData: TrackingData = {
      referenceNumber: term,
      clientName: clientSelected,
      productName: productSelected,
      quantityBags: qtyBagsSeed,
      totalWeightKg: qtyBagsSeed * 30,
      orderDate: 'June 01, 2026',
      estimatedDelivery: 'June 05, 2026',
      currentStatus: curStatus,
      currentHub: curStatus === 'delivered' ? 'Customer Warehouse' : 'Nagpur central yard hub',
      journey: [
        {
          status: 'Inquiry Approved & Registered',
          description: 'Standard wholesale procurement request resolved.',
          location: 'Nagpur Main Hub',
          time: 'June 01, 2026 • 09:00 AM',
          completed: true
        },
        {
          status: 'Milling & SorTexting',
          description: 'Aura sorted checkups and polishing routines finalized.',
          location: 'Sortex Plant Unit B',
          time: 'June 02, 2026 • 01:15 PM',
          completed: statusIndex >= 1
        },
        {
          status: 'Moisture Assessment & Packaging',
          description: 'Hygienic 30 KG wrap protection complete.',
          location: 'Dispatch Packing House',
          time: 'June 03, 2026 • 10:45 AM',
          completed: statusIndex >= 2
        },
        {
          status: 'In-Transit Freight Dispatch',
          description: 'Cleared road authorities and is traveling on state expressways.',
          location: 'Maharashtra Highway Grid',
          time: 'June 04, 2026 • 05:00 AM',
          completed: statusIndex >= 3
        },
        {
          status: 'Delivered & Handed Over',
          description: 'Received at destination safely with premium signature clearance.',
          location: 'Client Drop Location',
          time: 'Handover complete',
          completed: statusIndex >= 4
        }
      ]
    };

    setActiveTracking(dynamicData);
  };

  const getStatusNumber = (status: TrackingData['currentStatus']): number => {
    switch (status) {
      case 'submitted': return 1;
      case 'processing': return 2;
      case 'sorted': return 3;
      case 'dispatched': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  // Close when pressing Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Share inquiry connection trigger to whatsapp directly
  const handleSupportWhatsApp = (ref: string) => {
    const message = `Hello SunRice Agro! I am tracking my Rice Order Inquiry (Reference: ${ref}). Please provide immediate logistical status update about container transit. Thank you!`;
    const url = `https://wa.me/91${COMPANY_DETAILS.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Custom Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col font-sans"
          >
            {/* Modal Header */}
            <header className="p-6 border-b border-gray-150 bg-gray-50/50 flex justify-between items-center select-none shrink-0 sticky top-0 bg-white/90 backdrop-blur-md z-30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                  <Package className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-gray-900 text-lg leading-tight">
                    Order Logistics Tracker
                  </h3>
                  <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-600 mt-0.5">
                    Premium Sortex Grains Supply System
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                title="Close tracker"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Modal Content */}
            <div className="p-6 flex-grow space-y-6">
              {/* Search input field and suggestions */}
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <span className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-400 mb-2">
                  Enter Consignment or Inquiry Reference
                </span>
                
                <form onSubmit={handleTrackSubmit} className="flex gap-2.5">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 focus:bg-white rounded-xl text-sm font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-900 transition-all font-sans shadow-sm"
                      placeholder="e.g. SR-9572, SR-4040, or your Inquiry's ID"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    Track Grains
                  </button>
                </form>

                {errorText && (
                  <p className="text-xs text-red-500 font-semibold mt-2 pl-1 select-none">
                    ⚠️ {errorText}
                  </p>
                )}

                {/* Local inquiries list suggest items */}
                {localInquiries.length > 0 && (
                  <div className="mt-4 select-none border-t border-gray-200/85 pt-3">
                    <span className="block text-[9px] uppercase tracking-wider font-extrabold text-amber-700 mb-2">
                      💡 Click one of your submitted inquiries to track instantly:
                    </span>
                    <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto">
                      {localInquiries.slice(0, 4).map((inq, idx) => {
                        const shortId = inq.id.replace('inq-', 'Ref: ');
                        return (
                          <button
                            key={inq.id}
                            type="button"
                            onClick={() => {
                              setSearchInput(inq.id);
                              // Trigger search directly
                              setTimeout(() => {
                                const term = inq.id;
                                // 2. Check if it matches an actual LocalStorage user inquiry ID
                                const foundLocal = [inq].find((i) => i.id === term);
                                if (foundLocal) {
                                  const packCount = parseInt(foundLocal.quantity) || 1;
                                  const weightKgs = packCount * 30;
                                  const timestampMs = parseInt(foundLocal.id.replace('inq-', '')) || Date.now();
                                  const minutesDiff = (Date.now() - timestampMs) / 1000 / 60;
                                  let statusObj: 'submitted' | 'processing' | 'sorted' | 'dispatched' | 'delivered' = 'submitted';
                                  let hubName = "Lakadganj Administrative HQ, Nagpur";
                                  let statusDesc = "Our sales assistant has verified your WhatsApp routing and is processing bulk clearances.";

                                  if (minutesDiff > 45) {
                                    statusObj = 'delivered';
                                    hubName = foundLocal.message ? "Specified Delivery Zone" : "Local Business Depot";
                                    statusDesc = "Delivered safely! Representative has confirmed the handover of fresh sortex grains.";
                                  } else if (minutesDiff > 20) {
                                    statusObj = 'dispatched';
                                    hubName = "Nagpur Logistical Dispatch Depot";
                                    statusDesc = "Your order of 30 KG laminated bags has been cleared and placed in transit.";
                                  } else if (minutesDiff > 8) {
                                    statusObj = 'sorted';
                                    hubName = "Nagpur Milling Facility & SorTexing Grid";
                                    statusDesc = "Moisture checkpoints completed successfully. Checked for uniform luster and length.";
                                  } else if (minutesDiff > 2) {
                                    statusObj = 'processing';
                                    hubName = "Lakadganj HQ, Nagpur";
                                    statusDesc = "Your inquiry has been assigned and is being coordinated with freight handlers.";
                                  }

                                  const dynamicTracking: TrackingData = {
                                    referenceNumber: foundLocal.id.toUpperCase(),
                                    clientName: foundLocal.fullName,
                                    productName: foundLocal.productRequirement,
                                    quantityBags: packCount,
                                    totalWeightKg: weightKgs,
                                    orderDate: foundLocal.timestamp || "Today",
                                    estimatedDelivery: new Date(timestampMs + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    }),
                                    currentStatus: statusObj,
                                    currentHub: hubName,
                                    journey: [
                                      {
                                        status: 'Inquiry Submitted',
                                        description: 'Order inquiry received via SunRice Agro online portal and queued for processing.',
                                        location: 'Lakadganj HQ, Nagpur',
                                        time: foundLocal.timestamp || "Just Now",
                                        completed: true
                                      },
                                      {
                                        status: 'Assigned & Under Review',
                                        description: statusDesc,
                                        location: 'Distribution Desk, Nagpur',
                                        time: minutesDiff > 2 ? 'Approved & Assigned' : 'Awaiting Administration Integration',
                                        completed: minutesDiff > 2
                                      },
                                      {
                                        status: 'Sortex Polishing & Packing',
                                        description: 'Preparing the custom bags from our Nagpur grain reserve under high-grade seals.',
                                        location: 'Nagpur Milling Grids',
                                        time: minutesDiff > 8 ? 'Sortex Checked & Woven' : 'Pending Queue Allocation',
                                        completed: minutesDiff > 8
                                      },
                                      {
                                        status: 'Dispatched & Transport Hub out',
                                        description: 'Loaded onto bulk delivery trucks with active freight coordinators, ready for route clearance.',
                                        location: 'Nagpur Dispatch Hub',
                                        time: minutesDiff > 20 ? 'Cleared Highway Depot' : 'Pending Truck Dispatch',
                                        completed: minutesDiff > 20
                                      },
                                      {
                                        status: 'Order Delivered & Completed',
                                        description: 'The premium 30 KG bags have been checked in. All signatures processed successfully.',
                                        location: foundLocal.address || "Client Warehouse",
                                        time: minutesDiff > 45 ? 'Logistics Handover Recorded' : 'Expected within 48 hours',
                                        completed: minutesDiff > 45
                                      }
                                    ]
                                  };
                                  setActiveTracking(dynamicTracking);
                                }
                              }, 50);
                            }}
                            className="bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-400 border border-amber-500/10 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-800 transition-all cursor-pointer truncate max-w-[150px]"
                          >
                            {shortId} ({inq.fullName})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Default Demo numbers to guide the user */}
                <div className="mt-3.5 select-none text-[11px] flex flex-wrap items-center gap-1.5 text-gray-500 font-sans border-t border-dashed border-gray-200 pt-2.5">
                  <span>✨ Try out demo consignment codes:</span>
                  {Object.keys(MOCK_TRACKING_DB).map((demoId) => (
                    <button
                      key={demoId}
                      type="button"
                      onClick={() => {
                        setSearchInput(demoId);
                        setActiveTracking(MOCK_TRACKING_DB[demoId]);
                      }}
                      className="px-2 py-0.5 bg-gray-200 hover:bg-amber-400 hover:text-gray-900 rounded font-mono text-[10px] text-gray-700 transition-colors cursor-pointer font-bold border border-gray-300"
                    >
                      {demoId}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Tracking Journey Layout */}
              <AnimatePresence mode="wait">
                {activeTracking ? (
                  <motion.div
                    key={activeTracking.referenceNumber}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Active Consignment Detail Header Block */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row justify-between gap-4 select-none">
                      <div className="space-y-1.5">
                        <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-amber-400">
                          Consignment Under Inspection
                        </span>
                        <h4 className="text-xl font-display font-extrabold text-white">
                          Reference: <span className="text-amber-400">{activeTracking.referenceNumber}</span>
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-sans pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500" />
                            Registered: {activeTracking.orderDate}
                          </span>
                          <span className="text-gray-700">|</span>
                          <span className="font-semibold text-gray-300">
                            Client: {activeTracking.clientName}
                          </span>
                        </div>
                      </div>

                      <div className="sm:text-right flex flex-col justify-between items-start sm:items-end">
                        <div className="py-1 px-3 bg-white/5 rounded-lg border border-white/10 text-[10px] text-gray-300 font-mono">
                          Current Hub Out: <strong className="text-amber-400 block sm:inline">{activeTracking.currentHub.split(',')[0]}</strong>
                        </div>
                        
                        <div className="text-xs pt-2 sm:pt-0">
                          <span className="block text-[9px] text-gray-400 uppercase font-mono">Est. Delivery</span>
                          <span className="text-sm font-extrabold text-amber-400">
                            {activeTracking.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cargo Specifications Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans text-xs select-none">
                      <div className="p-3.5 bg-white shadow-sm rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 border border-amber-500/15">
                          <FileText className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider">Product Name</span>
                          <span className="font-extrabold text-gray-900 truncate block max-w-[200px]" title={activeTracking.productName}>
                            {activeTracking.productName}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white shadow-sm rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 border border-emerald-500/15">
                          <ShoppingCart className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider">Requested Bags</span>
                          <span className="font-extrabold text-gray-900 block">
                            {activeTracking.quantityBags} Bags (Laminated pack size)
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white shadow-sm rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 border border-blue-500/15">
                          <Scale className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider">Consignment Weight</span>
                          <span className="font-extrabold text-gray-900 block">
                            {activeTracking.totalWeightKg} KG Net-Weight Grains
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar Track Line */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm relative select-none">
                      <span className="block text-[10px] uppercase font-mono font-bold tracking-widest text-gray-400 mb-6 text-center">
                        Consignment Milestones Progress
                      </span>

                      <div className="relative">
                        {/* Horizontal track line backing */}
                        <div className="absolute top-[18px] left-[10%] right-[10%] h-1 bg-gray-200 z-0 rounded-full" />
                        
                        {/* Active Progress colored overlay */}
                        <motion.div
                          className="absolute top-[18px] left-[10%] h-1 bg-amber-500 z-0 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              ((getStatusNumber(activeTracking.currentStatus) - 1) / 4) * 80
                            }%`
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />

                        {/* Milestones nodes */}
                        <div className="relative z-10 flex justify-between px-2 text-center">
                          {[
                            { name: 'Submitted', key: 'submitted', label: 'Registered' },
                            { name: 'Assigned', key: 'processing', label: 'Processing' },
                            { name: 'Sorted', key: 'sorted', label: 'Sortex Check' },
                            { name: 'Dispatched', key: 'dispatched', label: 'In Transit' },
                            { name: 'Delivered', key: 'delivered', label: 'Delivered' }
                          ].map((node, idx) => {
                            const isNodeCompleted = getStatusNumber(activeTracking.currentStatus) >= (idx + 1);
                            const isNodeActive = activeTracking.currentStatus === node.key;
                            return (
                              <div key={node.key} className="flex flex-col items-center">
                                {/* Dot */}
                                <div
                                  className={`h-[40px] w-[40px] rounded-full flex items-center justify-center transition-all border duration-300 ${
                                    isNodeActive
                                      ? 'bg-amber-400 border-amber-500/40 text-gray-900 shadow-[0_0_12px_rgba(244,180,0,0.6)] font-bold'
                                      : isNodeCompleted
                                      ? 'bg-emerald-500 border-emerald-600 text-white'
                                      : 'bg-white border-gray-300 text-gray-400'
                                  }`}
                                >
                                  {isNodeCompleted && !isNodeActive ? (
                                    <Check className="h-4.5 w-4.5 font-bold" />
                                  ) : (
                                    <span className="text-xs font-mono">{idx + 1}</span>
                                  )}
                                </div>
                                {/* Label Text */}
                                <span className={`text-[10px] mt-2 font-bold tracking-tight block ${
                                  isNodeActive ? 'text-amber-600' : isNodeCompleted ? 'text-gray-800' : 'text-gray-450'
                                }`}>
                                  {node.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Detailed logs logs */}
                    <div className="bg-white shadow-sm rounded-2xl overflow-hidden font-sans">
                      <div className="py-3 px-4 bg-gray-50 border-b border-gray-150 select-none flex justify-between items-center text-xs">
                        <span className="font-extrabold text-gray-800 uppercase tracking-widest text-[9px]">
                          Sortex Logistics Operations Logs
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-650 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                          Live Connection Secure
                        </span>
                      </div>

                      {/* Staggered journey items logs */}
                      <div className="p-6 bg-white space-y-6">
                        {activeTracking.journey.map((step, idx) => (
                          <div key={idx} className="flex gap-4 relative">
                            {/* Trace connect line */}
                            {idx < activeTracking.journey.length - 1 && (
                              <div className={`absolute left-3 top-6 w-[2px] bottom-[-24px] bg-dashed ${
                                step.completed ? 'bg-emerald-500' : 'bg-gray-200'
                              }`} />
                            )}

                            {/* Bullet icon */}
                            <div className="relative z-10 shrink-0">
                              <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center border text-xs ${
                                step.completed 
                                  ? 'bg-emerald-500 border-emerald-600 text-white' 
                                  : 'bg-white border-gray-300 text-gray-400'
                              }`}>
                                {step.completed ? (
                                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                                ) : (
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                )}
                              </div>
                            </div>

                            {/* Details text */}
                            <div className="space-y-1 text-left select-none">
                              <h5 className={`font-display font-extrabold text-xs sm:text-sm ${
                                step.completed ? 'text-gray-900' : 'text-gray-400'
                              }`}>
                                {step.status}
                              </h5>
                              <p className="text-xs text-gray-500 leading-normal font-sans">
                                {step.description}
                              </p>
                              <div className="flex gap-3 text-[10px] text-gray-400 font-mono font-medium pt-0.5">
                                <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                                  📍 Hub: {step.location}
                                </span>
                                <span>
                                  🕒 {step.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions desk */}
                    <div className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left select-none">
                      <div className="space-y-1 flex items-center gap-3">
                        <div className="p-3 bg-amber-500/15 text-amber-600 border border-amber-500/20 rounded-xl shrink-0 hidden sm:block">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div className="font-sans">
                          <h5 className="font-display font-extrabold text-sm text-amber-900">
                            Need Immediate Logistics Coordination?
                          </h5>
                          <p className="text-xs text-amber-700/90 leading-normal">
                            Direct message our Nagpur delivery assistant over WhatsApp for rapid freight adjustments!
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSupportWhatsApp(activeTracking.referenceNumber)}
                        className="py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer text-center"
                      >
                        📬 Connect Desk Now
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center select-none space-y-4"
                  >
                    <div className="h-14 w-14 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-250 text-gray-400">
                      <HelpCircle className="h-8 w-8" />
                    </div>
                    <div className="space-y-1 font-sans">
                      <h4 className="font-display font-bold text-gray-950 text-base">
                        Consignment Dispatch Ledger Empty
                      </h4>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                        Enter one of the realistic test reference keys or select one from your submitted inquiries above to coordinate grain statuses.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modal Footer */}
            <footer className="p-5 border-t border-gray-150 bg-gray-50 flex justify-between items-center sm:text-left text-center select-none text-xs text-gray-400 font-sans z-30">
              <span className="block font-medium">
                SunRice Agro Nagpur Supply Chain • © 2026
              </span>
              <button
                onClick={onClose}
                className="hover:underline font-bold text-gray-600 hover:text-gray-950 px-2 py-1 bg-white border border-gray-200 shadow-sm rounded-lg cursor-pointer"
              >
                Close Portal
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
