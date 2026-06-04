import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';

interface ContactFormData {
  fullName: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>({
    fullName: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<ContactFormData> = {};
    if (!form.fullName.trim()) errs.fullName = "Name is required";
    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }
    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!form.message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate sending inquiry
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);

    // Save contact inquiries in localStorage logs
    const contactLogs = localStorage.getItem('sunrice_contact_logs');
    const records = contactLogs ? JSON.parse(contactLogs) : [];
    records.push({
      ...form,
      id: `cont-${Date.now()}`,
      timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('sunrice_contact_logs', JSON.stringify(records));

    // Reset Form
    setForm({
      fullName: '',
      mobile: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 block mb-3">
            Get In Touch Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight mb-4">
            Contact SunRice Agro
          </h2>
          <p className="text-gray-550 text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Have questions about pricing, bulk metrics, state agencies, or local shipping policies? Reach out and our team will get back to you within 24 hours.
          </p>
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent w-40 mx-auto mt-6 rounded-full" />
        </div>

        {/* Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Contact Cardboard */}
          <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden select-none">
            <div className="absolute right-[-30px] bottom-[-30px] opacity-[0.03] text-amber-500 scale-150">
              <Sparkles className="h-48 w-48" />
            </div>

            <h3 className="text-xl font-display font-extrabold text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              Corporate Contact Office
            </h3>
            
            <p className="text-gray-400 text-xs leading-relaxed mb-8 font-sans">
              We look forward to serving you with high-grade products and transparent, reliable operations. Visit our local Nagpur headquarters or connect with our support desk.
            </p>

            <div className="space-y-6 font-sans">
              {/* Address card */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20 text-amber-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">Office Address</span>
                  <p className="text-xs text-gray-200 leading-relaxed font-medium">
                    {COMPANY_DETAILS.address}
                  </p>
                </div>
              </div>

              {/* Telephone card */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-1">Phone & WhatsApp</span>
                  <a
                    href={`tel:+91${COMPANY_DETAILS.phone}`}
                    className="block text-sm text-gray-150 font-bold hover:text-amber-400 transition-colors"
                  >
                    🚀 Call Desk: {COMPANY_DETAILS.phone}
                  </a>
                  <a
                    href={`https://wa.me/91${COMPANY_DETAILS.whatsapp}`}
                    target="_blank"
                    className="block text-xs text-emerald-400 font-bold hover:underline mt-1"
                  >
                    💬 WhatsApp Chat Active
                  </a>
                </div>
              </div>

              {/* Email card */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block mb-1">Email Coordinates</span>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-sm text-gray-150 font-bold hover:text-amber-400 transition-colors break-all"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-800">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Corporate Details</span>
              <span className="text-[11px] text-gray-500 block leading-relaxed">
                SunRice Agro Nagpur © 2025-2026. Certified premium rice merchant servicing local and export partners under stringent food hygiene requirements.
              </span>
            </div>
          </div>

          {/* Right Column: Inquiry Form Grid */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xl overflow-hidden relative">
            <h3 className="text-xl font-display font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-amber-500" />
              General Inquiry Form
            </h3>

            {/* Alert Bubble on Contact Success */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs flex items-center gap-2.5 font-sans"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong>Message Submitted!</strong> Thank you for contacting SunRice Agro. Our administrative assistants are reviewing your request.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2 bg-gray-100 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-sm ${
                      errors.fullName ? 'ring-2 ring-red-400' : ''
                    }`}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile"
                    className={`w-full px-4 py-2 bg-gray-100 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-sm ${
                      errors.mobile ? 'ring-2 ring-red-400' : ''
                    }`}
                  />
                  {errors.mobile && <p className="text-[10px] text-red-500 mt-1">{errors.mobile}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email <span className="text-gray-400 font-normal">(Optional)</span></label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Ex: john@email.com"
                  className={`w-full px-4 py-2 bg-gray-100 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-sm ${
                    errors.email ? 'ring-2 ring-red-400' : ''
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject <span className="text-gray-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleInputChange}
                  placeholder="Inquiry Topic"
                  className="w-full px-4 py-2 bg-gray-100 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="How can we help your business?"
                  className={`w-full px-4 py-2 bg-gray-100 focus:bg-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all resize-none shadow-sm ${
                    errors.message ? 'ring-2 ring-red-400' : ''
                  }`}
                />
                {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold uppercase text-xs tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Submit Message Inquiry
              </button>
            </form>
          </div>

        </div>

        {/* Map wrapper section */}
        <div className="max-w-6xl mx-auto rounded-3xl p-2 bg-gray-900 shadow-2xl relative overflow-hidden">
          <div className="p-3 bg-gray-950/60 rounded-t-2xl border-b border-gray-850 flex items-center gap-2 select-none">
            <div className="flex gap-1.5 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 block" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 block" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 block" />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 block font-bold">Nagpur Office GPS Navigation</span>
          </div>

          <div className="w-full h-[320px] rounded-b-2xl overflow-hidden grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700">
            <iframe
              src={COMPANY_DETAILS.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SunRice Agro Nagpur GPS Map coordinates"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
