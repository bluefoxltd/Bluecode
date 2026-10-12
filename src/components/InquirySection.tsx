import React, { useState } from 'react';
import { Send, FileDown, CheckCircle2, Sparkles, MapPin, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { ALL_SERVICES } from '../data/services';
import { generateReceiptPdf, InquiryFormData } from '../utils/generateReceiptPdf';

export const InquirySection: React.FC<{ initialService?: string }> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(
    initialService || ALL_SERVICES[0].title
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{
    data: InquiryFormData;
    fileName: string;
    whatsappUrl: string;
  } | null>(null);

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

    // 1. Auto-download the PDF letterhead receipt instantly
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
      `*Official Letterhead Receipt:* Downloaded instantly on submission\n` +
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

            {/* Letterhead Feature Highlights */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#0C1222] border border-slate-800 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#6495ED]/15 text-[#6495ED] flex items-center justify-center shrink-0">
                  <FileDown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant Letterhead PDF Receipt</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Includes official Blue Code header logo, client data copy, timestamp, and verification seal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0C1222] border border-slate-800 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct WhatsApp Fast-Track</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Preformatted inquiry sent immediately to +977 9715971505 for prompt quote &amp; consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Studio Contacts */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6495ED]" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6495ED]" />
                <span>+977 9715971505</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Client Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0A0F1D]/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6495ED]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-5 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Client Inquiry Form</h3>
                  <p className="text-xs text-slate-400 mt-1">Complete all fields to generate your verified PDF letterhead receipt</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#6495ED]/15 text-[#6495ED] text-xs font-mono font-semibold">
                  <span>NEPAL</span>
                  <span className="text-base leading-none">🇳🇵</span>
                </div>
              </div>

              {lastSubmitted ? (
                <div className="space-y-6 py-4 animate-fade-in text-center sm:text-left">
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white">Inquiry Successfully Submitted!</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Your official letterhead receipt <strong className="text-white">{lastSubmitted.fileName}</strong> was downloaded to your device and your request has been forwarded to WhatsApp.
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
                      className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
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
                      placeholder="e.g. Ramesh Shrestha"
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

                  {/* Field 4: Services (Complete services dropdown list) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Select Service (Complete Services List) *
                    </label>
                    <div className="relative">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-[#6495ED] focus:ring-1 focus:ring-[#6495ED] transition appearance-none cursor-pointer"
                      >
                        {ALL_SERVICES.map((srv) => (
                          <option key={srv.id} value={`${srv.number}. ${srv.title}`} className="bg-slate-900 text-white py-2">
                            {srv.number}. {srv.title} — {srv.tagline}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>
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

                  {/* Submit Button: Sends to WhatsApp & Auto-downloads PDF Receipt */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#6495ED] hover:bg-[#5383db] text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-[#6495ED]/25 active:scale-[0.99] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry &amp; Download Official Letterhead Receipt</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2.5">
                      ⚡ Instant auto-download of PDF receipt with Blue Code letterhead + Direct WhatsApp connection to +977 9715971505
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
