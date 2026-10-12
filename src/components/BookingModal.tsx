import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Phone, FileDown, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { ALL_SERVICES } from '../data/services';
import { generateReceiptPdf, InquiryFormData } from '../utils/generateReceiptPdf';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
  initialNote?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPlan = '01. Brand Identity',
  initialNote = '',
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(selectedPlan);
  const [notes, setNotes] = useState(initialNote);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{
    data: InquiryFormData;
    fileName: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (selectedPlan) {
      // Find matching service or set value
      const match = ALL_SERVICES.find(
        (s) => s.title.toLowerCase().includes(selectedPlan.toLowerCase()) ||
               selectedPlan.toLowerCase().includes(s.title.toLowerCase())
      );
      if (match) {
        setService(`${match.number}. ${match.title}`);
      } else {
        setService(selectedPlan);
      }
    }
    if (initialNote) {
      setNotes(initialNote);
    }
  }, [selectedPlan, initialNote]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhone = phoneNumber.startsWith('+977')
      ? phoneNumber
      : `+977 ${phoneNumber.replace(/^\+?977\s*/, '')}`;

    const refId = `BC-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const formData: InquiryFormData = {
      name,
      phone: fullPhone,
      address,
      service,
      notes,
      referenceId: refId,
      createdAt: now,
    };

    // 1. Instant auto-download of PDF receipt letterhead
    const fileName = generateReceiptPdf(formData);

    // 2. Format WhatsApp inquiry message
    const formattedMessage =
      `*🌟 NEW CLIENT INQUIRY — BLUE CODE*\n` +
      `───────────────────────────\n` +
      `*Receipt Ref:* ${refId}\n` +
      `*Client Name:* ${name}\n` +
      `*Phone/WhatsApp:* ${fullPhone}\n` +
      `*Location/Address:* ${address || 'Kathmandu, Nepal'}\n` +
      `*Requested Service:* ${service}\n` +
      `*Additional Notes:* ${notes || 'Standard project consultation requested'}\n` +
      `───────────────────────────\n` +
      `*Official Letterhead Receipt:* Downloaded instantly\n` +
      `*Agency:* Blue Code · info@bluecode.agency`;

    const whatsappUrl = `https://wa.me/9779715971505?text=${encodeURIComponent(formattedMessage)}`;

    // 3. Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // 4. Update status state
    setLastSubmitted({
      data: formData,
      fileName,
      whatsappUrl,
    });
    setIsSubmitting(false);
  };

  const handleDownloadAgain = () => {
    if (lastSubmitted) {
      generateReceiptPdf(lastSubmitted.data);
    }
  };

  const handleClose = () => {
    setLastSubmitted(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0C1222] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Cornflower Blue Accent */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#080D1A] border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6495ED]/15 text-[#6495ED] border border-[#6495ED]/30 flex items-center justify-center font-bold text-sm">
              BC
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#6495ED]">
                Client Inquiry Desk · Kathmandu, Nepal
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Project Inquiry &amp; Receipt
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300 mb-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#6495ED]" />
              Kathmandu, Nepal
            </span>
            <span className="flex items-center gap-1.5 font-medium text-white">
              <Phone className="w-3.5 h-3.5 text-[#6495ED]" />
              +977 9715971505
            </span>
          </div>

          {lastSubmitted ? (
            <div className="space-y-5 py-2 text-center sm:text-left">
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-white">Inquiry Successfully Submitted!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Your official letterhead receipt <strong className="text-white">{lastSubmitted.fileName}</strong> was downloaded to your device, and your details were sent to WhatsApp.
                  </p>
                  <div className="mt-2 text-xs font-mono text-[#6495ED]">
                    Ref: {lastSubmitted.data.referenceId}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDownloadAgain}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                >
                  <FileDown className="w-4 h-4 text-[#6495ED]" />
                  <span>Re-download PDF</span>
                </button>

                <a
                  href={lastSubmitted.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 text-xs font-bold transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Shrestha"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition placeholder-slate-500"
                />
              </div>

              {/* WhatsApp / Phone with Nepal flag icon & country code */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center gap-1.5 pr-2.5 border-r border-slate-700 select-none">
                    <span className="text-base leading-none" role="img" aria-label="Nepal Flag">
                      🇳🇵
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">+977</span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98XXXXXXXX / 97XXXXXXXX"
                    className="w-full pl-28 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white font-mono focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Physical Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Physical Address / City *
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. New Baneshwor, Kathmandu, Nepal"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Complete Services Dropdown List */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Service (Complete Services List) *
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition appearance-none cursor-pointer"
                  >
                    {ALL_SERVICES.map((srv) => (
                      <option key={srv.id} value={`${srv.number}. ${srv.title}`}>
                        {srv.number}. {srv.title} — {srv.tagline}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your brand goals, timeline, or inquiries..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition resize-none placeholder-slate-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#6495ED] hover:bg-[#5383db] text-white font-bold text-sm transition-all shadow-lg shadow-[#6495ED]/25 active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry &amp; Download PDF Receipt</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  ⚡ Auto-downloads official letterhead receipt &amp; opens WhatsApp chat with Blue Code.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
