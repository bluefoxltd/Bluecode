import React, { useState } from 'react';
import { X, Send, Calendar, Clock, MessageSquare, Phone, MapPin } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
  initialNote?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPlan = 'Enterprise Custom',
  initialNote = '',
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [service, setService] = useState(selectedPlan);
  const [message, setMessage] = useState(initialNote);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = encodeURIComponent(
      `*New Project Consultation Request - Blue Code*\n\n` +
      `*Name:* ${name || 'N/A'}\n` +
      `*Company:* ${company || 'N/A'}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Selected Package/Service:* ${service}\n` +
      `*Preferred Date:* ${preferredDate || 'Earliest available'}\n` +
      `*Location:* Kathmandu, Nepal\n` +
      `*Notes:* ${message || 'Looking to discuss details and schedule a call.'}`
    );

    const whatsappUrl = `https://wa.me/9779715971505?text=${formattedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#002068] text-white">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
              Blue Code · Kathmandu, Nepal
            </span>
            <h3 className="text-xl font-bold tracking-tight mt-0.5">
              Book a Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0052FF]" />
              Kathmandu, Nepal
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <Phone className="w-3.5 h-3.5 text-[#0052FF]" />
              +977 9715971505
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Shrestha"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Company / Brand
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Tech"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Interested Package
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] bg-white transition"
              >
                <option value="Essentials Monthly (NPR 2,500/mo)">Essentials Monthly (NPR 2,500/mo)</option>
                <option value="Essentials Yearly (NPR 24,000/yr - 20% OFF)">Essentials Yearly (NPR 24,000/yr - 20% OFF)</option>
                <option value="Growth Monthly (NPR 3,500/mo)">Growth Monthly (NPR 3,500/mo)</option>
                <option value="Growth Yearly (NPR 33,600/yr - 20% OFF)">Growth Yearly (NPR 33,600/yr - 20% OFF)</option>
                <option value="Enterprise Custom">Enterprise Custom</option>
                <option value="Brand Identity Only">Brand Identity & Strategy</option>
                <option value="Web Development & Systems">Web Development & Systems</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Consultation Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Project Brief / Inquiries
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your brand goals, timeline, or questions..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0052FF] hover:bg-[#0038D1] text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              Send to WhatsApp (+977 9715971505)
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              Opens WhatsApp chat directly with Blue Code for instant response.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
