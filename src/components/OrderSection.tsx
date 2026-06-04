import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, MessageSquare, QrCode, Smartphone, Sparkles, CheckCircle, Scale, Trash2, Milestone } from 'lucide-react';
import { COMPANY_DETAILS, PRODUCTS } from '../data';
import { InquiryFormData } from '../types';

interface OrderSectionProps {
  selectedProductFromNav: string;
}

interface SavedInquiry extends InquiryFormData {
  id: string;
  timestamp: string;
}

export default function OrderSection({ selectedProductFromNav }: OrderSectionProps) {
  // Main form states
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    productRequirement: '',
    quantity: '1',
    message: ''
  });

  // Track if a product was selected from navigation scroll
  useEffect(() => {
    if (selectedProductFromNav) {
      setFormData((prev) => ({
        ...prev,
        productRequirement: selectedProductFromNav
      }));
    }
  }, [selectedProductFromNav]);

  const [formErrors, setFormErrors] = useState<Partial<InquiryFormData>>({});
  const [successMsg, setSuccessMsg] = useState(false);
  const [savedInquiries, setSavedInquiries] = useState<SavedInquiry[]>([]);
  const [activeQrTab, setActiveQrTab] = useState<'payment' | 'whatsapp' | 'business'>('payment');
  const [utrInput, setUtrInput] = useState('');
  const [isPaymentSimulating, setIsPaymentSimulating] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const PRODUCT_PRICES: Record<string, number> = {
    "Janta's KKK Premium Quality Rice": 1450,
    "Janta's KKK Surti Wada Kolam Rice": 1650,
    "Janta's KKK Surti Wada Kolam Rice (New Pack)": 1700,
    "Janta's KKK Premium Export Rice": 1950,
  };

  const selectedProductName = formData.productRequirement;
  const pricePerBag = PRODUCT_PRICES[selectedProductName] || 1500;
  const quantityCount = Math.max(1, parseInt(formData.quantity) || 1);
  const calculatedTotalAmount = pricePerBag * quantityCount;

  // Load inquiries from LocalStorage
  useEffect(() => {
    const records = localStorage.getItem('sunrice_inquiries');
    if (records) {
      try {
        setSavedInquiries(JSON.parse(records));
      } catch (e) {
        console.error("Failed to parse local stored inquiries", e);
      }
    }
  }, []);

  // Form validations
  const validateForm = (): boolean => {
    const errors: Partial<InquiryFormData> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = "Enter a valid 10-digit mobile number";
    }
    if (formData.emailAddress.trim() && !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = "Enter a valid email address";
    }
    if (!formData.productRequirement) errors.productRequirement = "Please select a product";
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      errors.quantity = "Quantity must be at least 1";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Remove error as user typing
    if (formErrors[name as keyof InquiryFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Create unique inquiry record
    const newInquiry: SavedInquiry = {
      ...formData,
      id: `inq-${Date.now()}`,
      paymentStatus: paymentVerified ? 'success' : 'pending',
      utrNumber: utrInput || undefined,
      totalAmount: calculatedTotalAmount,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to LocalStorage
    const updated = [newInquiry, ...savedInquiries];
    setSavedInquiries(updated);
    localStorage.setItem('sunrice_inquiries', JSON.stringify(updated));

    // Show visual confirmation
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 5000);

    // Format WhatsApp message
    const formattedMessage = `Hello SunRice Agro! I would like to place an order inquiry.
-------------------------------
👤 Name: ${formData.fullName}
📞 Phone: ${formData.mobileNumber}
✉️ Email: ${formData.emailAddress || 'Not Provided'}
🌾 Product: ${formData.productRequirement}
📦 Quantity: ${formData.quantity} Bags (Total weight: ${parseInt(formData.quantity) * 30} KG)
💰 Estimated Amount: ₹${calculatedTotalAmount.toLocaleString('en-IN')}
💳 Payment Mode: ${paymentVerified ? `Direct UPI Scan (UTR: ${utrInput})` : 'Pending / Cash on Delivery'}
💬 Requirements: ${formData.message || 'Standard Order Inquiry'}
-------------------------------
Submitted via SunRice Agro Web & Instant Payment Portal.`;

    const waLink = `https://wa.me/919572697269?text=${encodeURIComponent(formattedMessage)}`;

    // Reset Form
    setFormData({
      fullName: '',
      mobileNumber: '',
      emailAddress: '',
      productRequirement: '',
      quantity: '1',
      message: ''
    });
    setUtrInput('');
    setPaymentVerified(false);

    // Redirect to WhatsApp after short delay
    setTimeout(() => {
      window.open(waLink, '_blank');
    }, 1200);
  };

  const deleteInquiry = (id: string) => {
    const updated = savedInquiries.filter((item) => item.id !== id);
    setSavedInquiries(updated);
    localStorage.setItem('sunrice_inquiries', JSON.stringify(updated));
  };

  return (
    <section id="order" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute right-[5%] bottom-[10%] w-[250px] h-[250px] bg-amber-500/5 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute left-[3%] top-[15%] w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 block mb-3">
            Hassle-Free Booking Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight mb-4">
            Easy Ordering & Connectivity
          </h2>
          <p className="text-gray-550 text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Fill out our inquiry sheet below to calculate bulk metrics and launch a deep-linked purchase request straight to our WhatsApp delivery desk.
          </p>
        </div>

        {/* 5-Step Order Roadmap */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 select-none font-sans">
          {[
            { step: "01", title: "Browse Products", desc: "Select from our 30 KG premium variety collection." },
            { step: "02", title: "Select Quantity", desc: "Specify bags requirement count." },
            { step: "03", title: "Fill Inquiry", desc: "Complete active delivery details." },
            { step: "04", title: "Confirm Details", desc: "Verify calculated weight and destination tags." },
            { step: "05", title: "WhatsApp Assist", desc: "Connect instantly to our team." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all relative flex flex-col items-start">
              <div className="text-lg font-display font-extrabold text-amber-400 mb-2">{item.step}</div>
              <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-1">{item.title}</h4>
              <p className="text-[11px] text-gray-500 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Split Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Panel: The Order Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-display font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-amber-500" />
              Inquiry Booking Sheet
            </h3>

            {/* Success Visual alert bubble */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs flex items-center gap-2.5 font-sans"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong>Order Saved Locally!</strong> Preparing deep-link connection... Opening WhatsApp to complete booking.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Form element */}
            <form onSubmit={handleFormSubmit} className="space-y-5 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 rounded-sm">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:bg-white text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      formErrors.fullName ? 'ring-2 ring-red-400' : 'focus:ring-amber-300'
                    }`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-500 mt-1">{formErrors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile phone"
                    className={`w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:bg-white text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      formErrors.mobileNumber ? 'ring-2 ring-red-400' : 'focus:ring-amber-300'
                    }`}
                  />
                  {formErrors.mobileNumber && <p className="text-[10px] text-red-500 mt-1">{formErrors.mobileNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Ex: buyer@email.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-sm ${
                      formErrors.emailAddress ? 'ring-2 ring-red-400' : ''
                    }`}
                  />
                  {formErrors.emailAddress && <p className="text-[10px] text-red-500 mt-1">{formErrors.emailAddress}</p>}
                </div>

                {/* Product Select dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Select Rice Variety *</label>
                  <select
                    name="productRequirement"
                    value={formData.productRequirement}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:bg-white text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      formErrors.productRequirement ? 'ring-2 ring-red-400' : 'focus:ring-amber-300'
                    }`}
                  >
                    <option value="">-- Choose Product Option --</option>
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.productRequirement && <p className="text-[10px] text-red-500 mt-1">{formErrors.productRequirement}</p>}
                </div>
              </div>

              {/* Quantity Bag size counter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center bg-gray-50 p-4 rounded-2xl shadow-inner border-none">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Quantity <span className="text-amber-600">(30 KG Bags Only)</span> *</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-white rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-sm ${
                      formErrors.quantity ? 'ring-2 ring-red-400' : ''
                    }`}
                  />
                  {formErrors.quantity && <p className="text-[10px] text-red-500 mt-1">{formErrors.quantity}</p>}
                </div>

                {/* Estimated aggregate metrics */}
                <div className="flex items-center gap-3 text-xs select-none">
                  <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Scale className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <span className="block text-gray-500 uppercase tracking-widest font-semibold text-[9px]">Calculated Weight</span>
                    <span className="text-sm font-extrabold text-gray-900">
                      {formData.quantity ? parseInt(formData.quantity) * 30 : 0} KG Total Weight
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirements details */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Special Requirements & Destination <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about your delivery address, landmark, or specific wholesale logistics requirements."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all resize-none shadow-sm"
                />
              </div>

              {/* Order button trigger */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-gray-900 font-bold uppercase text-xs tracking-wider shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Submit Order on WhatsApp &rarr;
              </button>

            </form>
          </div>

          {/* Right Panel: Scan & Connect area */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* The QR Core interactive scanner */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col items-center border border-gray-800">
              
              {/* Scan glowing laser effect */}
              <div className="absolute w-full h-[2px] bg-amber-400/50 blur-[2px] left-0 pointer-events-none animate-scan z-10" />

              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-400 mb-2">
                Scan, Connect & Pay
              </span>
              <h3 className="text-xl font-display font-extrabold text-white text-center mb-6">
                Scan & Checkout Desk
              </h3>

              {/* Tabs for QRs */}
              <div className="flex gap-1.5 p-1 bg-black/40 rounded-2xl border border-gray-800 mb-6 w-full select-none">
                <button
                  type="button"
                  onClick={() => setActiveQrTab('payment')}
                  className={`flex-1 py-2 px-1 text-center rounded-xl font-sans text-[10px] sm:text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    activeQrTab === 'payment'
                      ? 'bg-amber-500 text-gray-950 shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Direct Pay QR
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQrTab('whatsapp')}
                  className={`flex-1 py-2 px-1 text-center rounded-xl font-sans text-[10px] sm:text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    activeQrTab === 'whatsapp'
                      ? 'bg-amber-500 text-gray-950 shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  WhatsApp QR
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQrTab('business')}
                  className={`flex-1 py-2 px-1 text-center rounded-xl font-sans text-[10px] sm:text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    activeQrTab === 'business'
                      ? 'bg-amber-500 text-gray-950 shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Business QR
                </button>
              </div>

              {/* Active Tab Elements */}
              <AnimatePresence mode="wait">
                {activeQrTab === 'payment' && (
                  <motion.div
                    key="payment-tab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Invoice Info bar */}
                    <div className="w-full text-center bg-gray-900/60 border border-gray-800/80 rounded-2xl p-4 mb-5 font-sans">
                      <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">Estimated Direct Invoice</span>
                      <span className="block text-xs font-bold text-gray-100 truncate max-w-[220px] mx-auto">
                        {formData.productRequirement || "No Product Selected"}
                      </span>
                      <div className="text-2xl font-black text-amber-400 mt-1 select-all">
                        ₹{calculatedTotalAmount.toLocaleString('en-IN')}
                      </div>
                      <span className="block text-[10px] text-gray-500 mt-1">
                        ₹{pricePerBag} × {quantityCount} Bag{quantityCount > 1 ? 's' : ''} ({quantityCount * 30} KG total weight)
                      </span>
                    </div>

                    {/* Scannable UPI QR framework */}
                    <div className="relative p-5 rounded-2xl bg-white flex items-center justify-center border border-amber-500/20 shadow-[0_0_20px_rgba(244,180,0,0.15)] mb-5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent pointer-events-none" />

                      <div className="relative h-44 w-44 z-20">
                        {/* Dynamic Google charts / QR Server link generated based on standard Merchant UPI scheme */}
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                            `upi://pay?pa=9572697269@okbizaxis&pn=SunRice%20Agro%20Nagpur&am=${calculatedTotalAmount}&cu=INR&tn=Order%2520Inquiry%2520${encodeURIComponent(formData.fullName || 'Guest')}`
                          )}`}
                          alt="SunRice Agro Active Merchant UPI QR Code"
                          className="h-full w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        {/* Glowing corners styling */}
                        <div className="absolute top-0 left-0 h-4.5 w-4.5 border-t-2 border-l-2 border-amber-500" />
                        <div className="absolute top-0 right-0 h-4.5 w-4.5 border-t-2 border-r-2 border-amber-500" />
                        <div className="absolute bottom-0 left-0 h-4.5 w-4.5 border-b-2 border-l-2 border-amber-500" />
                        <div className="absolute bottom-0 right-0 h-4.5 w-4.5 border-b-2 border-r-2 border-amber-500" />
                      </div>
                    </div>

                    {/* Interactive Payment UTR verification input */}
                    <div className="w-full space-y-3 text-left font-sans mb-1">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>UTR / Transaction Refer UPI ID</span>
                          {utrInput && utrInput.length < 12 && (
                            <span className="text-[9px] text-gray-500 font-normal font-mono">{12 - utrInput.length} left</span>
                          )}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={12}
                            placeholder="Ex: 348295827361"
                            value={utrInput}
                            onChange={(e) => setUtrInput(e.target.value.replace(/\D/g, ''))}
                            className="flex-grow px-3 py-2 bg-gray-900 border border-gray-800 focus:border-amber-500 rounded-xl text-xs text-white focus:outline-none placeholder:text-gray-650 font-mono shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (utrInput.length < 10) return;
                              setIsPaymentSimulating(true);
                              setTimeout(() => {
                                setIsPaymentSimulating(false);
                                setPaymentVerified(true);
                              }, 1500);
                            }}
                            disabled={utrInput.length < 10 || isPaymentSimulating || paymentVerified}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-850 disabled:text-gray-600 text-gray-900 font-bold text-xs rounded-xl cursor-pointer select-none flex items-center gap-1 shrink-0 transition-all font-sans"
                          >
                            {isPaymentSimulating ? (
                              <svg className="animate-spin h-3.5 w-3.5 text-gray-900" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : paymentVerified ? (
                              '✓ Bound'
                            ) : (
                              'Lock Pay'
                            )}
                          </button>
                        </div>
                      </div>

                      {paymentVerified ? (
                        <div className="text-center p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium leading-relaxed">
                          🎉 Payment mapped! Click <strong>"Submit Order on WhatsApp"</strong> left to log payment & trigger booking instructions.
                        </div>
                      ) : (
                        <p className="text-[10px] text-gray-400 leading-normal">
                          💡 Open Google Pay / PhonePe / Paytm to scan and pay ₹{calculatedTotalAmount.toLocaleString('en-IN')}, then lock your 12-digit payment code (UTR).
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeQrTab === 'whatsapp' && (
                  <motion.div
                    key="whatsapp-tab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="relative p-5 rounded-2xl bg-white flex items-center justify-center border border-amber-500/10 shadow-[0_0_15px_rgba(244,180,0,0.08)] mb-6 overflow-hidden">
                      <div className="relative h-44 w-44 z-20">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('https://wa.me/919572697269')}`}
                          alt="SunRice Agro WhatsApp Chat Connection QR Code"
                          className="h-full w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-amber-500/70" />
                        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-amber-500/70" />
                        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-amber-500/70" />
                        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-amber-500/70" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-left w-full p-4 bg-gray-900 border border-gray-850 rounded-2xl">
                      <Smartphone className="h-6 w-6 text-amber-400 shrink-0" />
                      <div className="font-sans">
                        <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider">Direct WhatsApp Chat</span>
                        <span className="block text-xs font-semibold text-gray-200">
                          Scan the code to quickly speak with a retail booking agent at Nagpur.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeQrTab === 'business' && (
                  <motion.div
                    key="business-tab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="relative p-5 rounded-2xl bg-white flex items-center justify-center border border-amber-500/10 shadow-[0_0_15px_rgba(244,180,0,0.08)] mb-6 overflow-hidden">
                      <div className="relative h-44 w-44 z-20">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('BEGIN:VCARD\nVERSION:3.0\nFN:SunRice Agro Nagpur\nTEL:9572697269\nEMAIL:Sunriceagro1@gmail.com\nEND:VCARD')}`}
                          alt="SunRice Agro VCard Contact QR Code"
                          className="h-full w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-amber-500/70" />
                        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-amber-500/70" />
                        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-amber-500/70" />
                        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-amber-500/70" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-left w-full p-4 bg-gray-900 border border-gray-850 rounded-2xl font-sans">
                      <CheckCircle className="h-6 w-6 text-amber-400 shrink-0" />
                      <div>
                        <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider">Save Contact Card</span>
                        <span className="block text-xs font-semibold text-gray-200">
                          Scan to save our business card directly to your mobile phone book.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Local Storage persistence records Ledger */}
            {savedInquiries.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-xl max-h-[380px] overflow-y-auto border border-gray-100">
                <div className="flex items-center justify-between gap-2.5 mb-4 select-none">
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-700">
                    Your Saved Inquiries
                  </span>
                  <span className="text-[10px] font-mono font-bold text-gray-400">
                    LocalStorage Sync
                  </span>
                </div>

                <div className="space-y-3.5 font-sans">
                  {savedInquiries.map((inq) => (
                    <div key={inq.id} className="p-3.5 bg-gray-50/50 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative group">
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="absolute right-3.5 top-3.5 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-20 opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="text-[10px] font-semibold text-gray-400 mb-1 font-mono">
                        {inq.timestamp}
                      </div>
                      <div className="text-xs font-extrabold text-gray-900">
                        {inq.fullName}
                      </div>
                      <div className="text-[11px] text-gray-600 mt-1">
                        🌾 {inq.productRequirement}
                      </div>
                      <div className="text-[11px] font-semibold text-gray-500 mt-0.5">
                        📦 {inq.quantity} Bags ({parseInt(inq.quantity) * 30} KG)
                      </div>

                      {/* Payment badging layout inside ledger list */}
                      <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-gray-100">
                        {inq.paymentStatus === 'success' ? (
                          <div className="inline-flex items-center gap-1 text-[9px] bg-emerald-500/10 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full select-none">
                            <span className="text-[11px]">✓</span> Paid
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-800 font-extrabold px-2 py-0.5 rounded-full select-none">
                            Pending / COD
                          </div>
                        )}
                        {inq.totalAmount && (
                          <span className="text-[11px] font-extrabold text-gray-950 ml-auto font-mono">
                            ₹{inq.totalAmount.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {inq.utrNumber && (
                        <div className="text-[9.5px] font-mono text-gray-400 mt-1 bg-gray-100/50 p-1.5 rounded border border-gray-200/40 select-all">
                          UTR: {inq.utrNumber}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
