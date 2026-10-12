import React, { useState, useEffect } from 'react';
import { Send, FileDown, CheckCircle2, Sparkles, MapPin, Phone, MessageSquare, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { ALL_SERVICES, INVESTMENT_PACKAGES } from '../data/services';
import { generateReceiptPdf, InquiryFormData } from '../utils/generateReceiptPdf';
import { BlueCodeLogo } from './BlueCodeLogo';
import { NepaliDatePicker } from './NepaliDatePicker';
import { getDefaultNepaliDate } from '../utils/nepaliCalendar';

export const InquirySection: React.FC<{ initialService?: string }> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [startDateBS, setStartDateBS] = useState(getDefaultNepaliDate().formatted);
  const [service, setService] = useState(
    initialService || 'Investment Package: Growth Plan (Annual — NPR 2,800 / mo · NPR 33,600 / yr)'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{
    data: InquiryFormData;
    fileName: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  // Determine if the currently chosen service is an Investment Package
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhone = phoneNumber.startsWith('+977')
      ? phoneNumber
      : `+977 ${phoneNumber.replace(/^\+?977\s*/, '')}`;

    const refId = `BC-BK-${Math.floor(100000 + Math.random() * 900000)}`;
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
      startDateBS,
      notes,
      referenceId: refId,
      createdAt: now,
    };

    // 1. Auto-download the PDF letterhead receipt instantly
    const fileName = generateReceiptPdf(formData);

    // 2. Format WhatsApp booking message
    const formattedMessage =
      `*🌟 NEW CLIENT BOOKING — BLUE CODE*\n` +
      `───────────────────────────\n` +
      `*Booking Ref:* ${refId}\n` +
      `*Client Name:* ${name}\n` +
      `*Phone/WhatsApp:* ${fullPhone}\n` +
      `*Location/Address:* ${address || 'Kathmandu, Nepal'}\n` +
      `*Starting Date (BS):* ${startDateBS}\n` +
      `*Selected Service / Package:* ${service}\n` +
      `*Additional Notes:* ${notes || 'Standard project consultation requested'}\n` +
      `───────────────────────────\n` +
      `*Official Letterhead Receipt:* Downloaded instantly on booking\n` +
      `*Agency:* Blue Code · info@bluecode.agency`;

    const whatsappUrl = `https://wa.me/9779715971505?text=${encodeURIComponent(formattedMessage)}`;

    // 3. Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // 4. Update status and retain reference
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

  return (
    <section id="inquiry" className="relative py-20 lg:py-28 bg-[#060913] border-t border-slate-800/80 transition-colors">
      {/* Background Cornflower glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[400px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Letterhead Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#6495ED] bg-[#6495ED]/10 border border-[#6495ED]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#6495ED]" />
              <span>Direct Client Inquiry Desk</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Start your project with <span className="text-[#6495ED]">confidence.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Submit your project brief below. You will receive an <strong className="text-white">instant auto-downloaded official PDF letterhead receipt</strong> with all details, and your inquiry will be routed straight to our lead agency team on WhatsApp.
            </p>

            {/* Letterhead Feature Highlights with Glassmorphism */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl glass-card glass-shiny-hover border border-white/10 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6495ED]/15 text-[#6495ED] flex items-center justify-center shrink-0">
                  <FileDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant Letterhead PDF Receipt</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Includes official Blue Code header logo, client data copy, timestamp, and verification seal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card glass-shiny-hover border border-white/10 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6495ED]/15 text-[#6495ED] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct WhatsApp Fast-Track</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Instant message generation to our Kathmandu strategy desk (<span className="whitespace-nowrap font-medium text-slate-300">+977-9715971505</span>) for priority response.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card glass-shiny-hover border border-white/10 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6495ED]/15 text-[#6495ED] flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Services &amp; Investment Packages</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose from all 12 individual services or our transparent monthly &amp; annual investment tiers.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct contact footnote */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-slate-200 font-medium">Headquarters:</span> New Baneshwor, Kathmandu, Nepal
              </div>
              <div className="font-mono text-[#6495ED] font-bold whitespace-nowrap">
                +977-9715971505
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form & Receipt Generator */}
          <div className="lg:col-span-7">
            <div className="glass-card glass-shiny-hover rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#6495ED]">
                    OFFICIAL BOOKING FORM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Book Project &amp; Scope
                  </h3>
                </div>
                <div className="hidden sm:block">
                  <BlueCodeLogo size={36} />
                </div>
              </div>

              {lastSubmitted ? (
                <div className="space-y-6 py-4 animate-fade-in text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">Booking Confirmed &amp; Receipt Generated!</h4>
                    <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                      Your letterhead receipt <code className="text-[#6495ED] font-mono">{lastSubmitted.fileName}</code> was downloaded automatically.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-1.5 max-w-md mx-auto">
                    <div><span className="text-slate-500">REF:</span> {lastSubmitted.data.referenceId}</div>
                    <div><span className="text-slate-500">CLIENT:</span> {lastSubmitted.data.name}</div>
                    <div><span className="text-slate-500">PHONE:</span> {lastSubmitted.data.phone}</div>
                    <div><span className="text-slate-500">START DATE (BS):</span> {lastSubmitted.data.startDateBS}</div>
                    <div><span className="text-slate-500">SCOPE:</span> {lastSubmitted.data.service}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleDownloadAgain}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      <FileDown className="w-4 h-4 text-[#6495ED]" />
                      <span>Re-download PDF Letterhead</span>
                    </button>

                    <a
                      href={lastSubmitted.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 text-xs font-bold transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>

                  <div className="text-center pt-3">
                    <button
                      onClick={() => setLastSubmitted(null)}
                      className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field 1: Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bipin Chhetri"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition"
                    />
                  </div>

                  {/* Field 2: WhatsApp / Phone Number with Nepal Flag icon & country code */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 flex items-center gap-1.5 pr-2.5 border-r border-slate-700 select-none">
                        <span className="text-lg leading-none" role="img" aria-label="Nepal Flag">
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
                        className="w-full pl-28 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition"
                      />
                    </div>
                  </div>

                  {/* Field 3: Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Physical Address / City *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-3.5 text-slate-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. New Baneshwor, Kathmandu, Nepal"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition"
                      />
                    </div>
                  </div>

                  {/* Field: Inbuilt Nepali Dropdown Calendar Starting Date */}
                  <NepaliDatePicker
                    value={startDateBS}
                    onChange={setStartDateBS}
                    label="Project Starting Date (Nepali Calendar BS)"
                    required
                  />

                  {/* Field 4: Services & Investment Packages (Complete combined dropdown list with Monthly / Annual options) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition appearance-none cursor-pointer"
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
                            <option key={srv.id} value={`${srv.number}. ${srv.title}`} className="bg-slate-900 text-white py-1">
                              {srv.number}. {srv.title} — {srv.tagline}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>

                    {/* Interactive Monthly / Annual Billing Toggle with Exact Prices for Selected Package */}
                    {isInvestmentPackage && currentPlan && (
                      <div className="mt-3 p-3.5 rounded-2xl bg-slate-900/90 border border-[#6495ED]/30 space-y-2.5 animate-fade-in">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-slate-200">
                            <Sparkles className="w-3.5 h-3.5 text-[#6495ED]" />
                            <span>Plan: {currentPlan.badge}</span>
                          </div>
                          <span className="text-[11px] font-mono text-[#6495ED] font-semibold">
                            {isAnnual ? '⚡ Annual Term Active (Save 20%)' : '📅 Monthly Term Active'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleCycleChange('monthly')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              !isAnnual
                                ? 'bg-[#6495ED]/20 border-[#6495ED] text-white shadow-md shadow-[#6495ED]/20 ring-1 ring-[#6495ED]'
                                : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white">Monthly Billing</span>
                              {!isAnnual && <CheckCircle2 className="w-4 h-4 text-[#6495ED]" />}
                            </div>
                            <div className="text-sm font-extrabold text-white mt-1.5">
                              {currentPlan.monthlyPrice}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5">
                              {currentPlan.monthlyBillingNote}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCycleChange('annual')}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isAnnual
                                ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400'
                                : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white">Annual Billing</span>
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                                SAVE 20%
                              </span>
                            </div>
                            <div className="text-sm font-extrabold text-emerald-400 mt-1.5">
                              {currentPlan.annualPrice}
                            </div>
                            <span className="text-[10px] text-slate-300 mt-0.5">
                              {currentPlan.annualBillingNote}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Field 5: Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Additional Notes &amp; Project Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share your goals, timeline, existing brand assets, or specific requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition resize-none"
                    />
                  </div>

                  {/* Submit Button: strictly 'Book Now' with whitespace-nowrap */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#6495ED] hover:bg-[#5383db] text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-[#6495ED]/25 active:scale-[0.99] cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" />
                      <span className="whitespace-nowrap">Book Now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2.5">
                      ⚡ Instant auto-download of PDF receipt with Blue Code letterhead + Direct WhatsApp connection to <span className="whitespace-nowrap font-medium text-slate-300">+977-9715971505</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
