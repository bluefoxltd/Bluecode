import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Phone, FileDown, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { ALL_SERVICES, INVESTMENT_PACKAGES } from '../data/services';
import { generateReceiptPdf, InquiryFormData } from '../utils/generateReceiptPdf';
import { BlueCodeLogo } from './BlueCodeLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedService,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(
    selectedService || ALL_SERVICES[0].title
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{
    data: InquiryFormData;
    fileName: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const isInvestmentPackage =
    service.includes('Investment Package') ||
    service.includes('Plan') ||
    service.includes('Essentials') ||
    service.includes('Growth') ||
    service.includes('Enterprise Custom');

  const currentPlan = service.includes('Growth')
    ? INVESTMENT_PACKAGES.find((p) => p.id === 'pkg-growth')!
    : service.includes('Enterprise')
    ? INVESTMENT_PACKAGES.find((p) => p.id === 'pkg-enterprise')!
    : INVESTMENT_PACKAGES.find((p) => p.id === 'pkg-essentials')!;

  const isAnnual = service.toLowerCase().includes('annual');

  const handleCycleChange = (cycle: 'monthly' | 'annual') => {
    if (cycle === 'annual') {
      if (currentPlan.id === 'pkg-enterprise') {
        setService('Investment Package: Enterprise Custom (Annual Milestone)');
      } else {
        setService(`Investment Package: ${currentPlan.name} (Annual — ${currentPlan.annualPrice} · ${currentPlan.annualBillingNote.split('(')[0].trim()})`);
      }
    } else {
      if (currentPlan.id === 'pkg-enterprise') {
        setService('Investment Package: Enterprise Custom (Monthly Retainer)');
      } else {
        setService(`Investment Package: ${currentPlan.name} (Monthly — ${currentPlan.monthlyPrice})`);
      }
    }
  };

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
      `*Selected Service / Package:* ${service}\n` +
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Blue Code Logo */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080D1A]/90 border-b border-white/10 text-white">
          <div className="flex items-center gap-3">
            <BlueCodeLogo size={32} />
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#6495ED]">
                Client Inquiry Desk · Kathmandu, Nepal
              </span>
              <h3 className="text-lg font-bold tracking-tight text-white">
                Project Inquiry &amp; Receipt
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {lastSubmitted ? (
            <div className="text-center space-y-5 py-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Inquiry Sent &amp; Receipt Downloaded!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Reference: <span className="text-[#6495ED] font-mono font-bold">{lastSubmitted.data.referenceId}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-1">
                <div><span className="text-slate-500">CLIENT:</span> {lastSubmitted.data.name}</div>
                <div><span className="text-slate-500">PHONE:</span> {lastSubmitted.data.phone}</div>
                <div><span className="text-slate-500">TARGET:</span> {lastSubmitted.data.service}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={handleDownloadAgain}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#6495ED]" />
                  <span>Re-download Receipt</span>
                </button>
                <a
                  href={lastSubmitted.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 text-xs font-bold transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              <button
                onClick={handleClose}
                className="w-full mt-2 py-2 text-xs text-slate-400 hover:text-white transition"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name *
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

              {/* WhatsApp / Phone with Nepal flag */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1.5 pr-2.5 border-r border-slate-700 select-none">
                    <span className="text-base" role="img" aria-label="Nepal Flag">
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
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

              {/* Complete Services & Investment Packages Dropdown List */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Select Service or Investment Package *
                  </label>
                  {isInvestmentPackage && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#6495ED]/20 text-[#6495ED] font-bold">
                      PACKAGE SELECTED
                    </span>
                  )}
                </div>
                
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition appearance-none cursor-pointer"
                  >
                    <optgroup label="✨ Investment Packages — Monthly Billing" className="bg-slate-900 font-bold text-[#6495ED]">
                      <option value="Investment Package: Essentials Plan (Monthly — NPR 2,500 / mo)" className="bg-slate-900 text-white py-1">
                        Essentials Plan — Monthly (NPR 2,500 / mo)
                      </option>
                      <option value="Investment Package: Growth Plan (Monthly — NPR 3,500 / mo)" className="bg-slate-900 text-white py-1">
                        Growth Plan — Monthly (NPR 3,500 / mo)
                      </option>
                      <option value="Investment Package: Enterprise Custom (Monthly Retainer)" className="bg-slate-900 text-white py-1">
                        Enterprise Custom — Monthly Retainer (Tailored Scope)
                      </option>
                    </optgroup>

                    <optgroup label="✨ Investment Packages — Annual Billing (Save 20%)" className="bg-slate-900 font-bold text-emerald-400">
                      <option value="Investment Package: Essentials Plan (Annual — NPR 2,000 / mo · NPR 24,000 / yr)" className="bg-slate-900 text-white py-1">
                        Essentials Plan — Annual (NPR 2,000 / mo · NPR 24,000 / yr — Save 20%)
                      </option>
                      <option value="Investment Package: Growth Plan (Annual — NPR 2,800 / mo · NPR 33,600 / yr)" className="bg-slate-900 text-white py-1">
                        Growth Plan — Annual (NPR 2,800 / mo · NPR 33,600 / yr — Save 20%)
                      </option>
                      <option value="Investment Package: Enterprise Custom (Annual Milestone)" className="bg-slate-900 text-white py-1">
                        Enterprise Custom — Annual Milestone (Tailored Scope)
                      </option>
                    </optgroup>

                    <optgroup label="🛠️ Complete Individual Services (All 12 Capabilities)" className="bg-slate-900 font-bold text-[#6495ED]">
                      {ALL_SERVICES.map((srv) => (
                        <option key={srv.id} value={`${srv.number}. ${srv.title}`}>
                          {srv.number}. {srv.title} — {srv.tagline}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>

                {/* Interactive Monthly / Annual Billing Toggle with Exact Prices for Selected Package */}
                {isInvestmentPackage && currentPlan && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-slate-900/90 border border-[#6495ED]/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300">Plan: {currentPlan.badge}</span>
                      <span className="text-[10px] font-mono text-[#6495ED] font-semibold">
                        {isAnnual ? '⚡ Annual Term (Save 20%)' : '📅 Monthly Term'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCycleChange('monthly')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          !isAnnual
                            ? 'bg-[#6495ED]/20 border-[#6495ED] text-white shadow-xs ring-1 ring-[#6495ED]'
                            : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-white">Monthly</span>
                          {!isAnnual && <CheckCircle2 className="w-3.5 h-3.5 text-[#6495ED]" />}
                        </div>
                        <div className="text-xs font-extrabold text-white mt-1">
                          {currentPlan.monthlyPrice}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCycleChange('annual')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isAnnual
                            ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-xs ring-1 ring-emerald-400'
                            : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-white">Annual</span>
                          <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                            -20%
                          </span>
                        </div>
                        <div className="text-xs font-extrabold text-emerald-400 mt-1">
                          {currentPlan.annualPrice}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
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

              {/* Submit Button: strictly 'Inquiry Now' with whitespace-nowrap */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#6495ED] hover:bg-[#5383db] text-white font-bold text-sm transition-all shadow-lg shadow-[#6495ED]/25 active:scale-[0.99] cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span className="whitespace-nowrap">Inquiry Now</span>
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
