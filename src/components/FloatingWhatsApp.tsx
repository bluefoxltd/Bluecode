import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC<{ onOpenBooking?: () => void; onOpenModal?: () => void }> = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent("Hello Blue Code team! I have an inquiry regarding your brand and digital services.");
    window.open(`https://wa.me/9779715971505?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-[#0C1222]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-800 text-xs text-white animate-bounce duration-1000">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Need help? Chat with Blue Code Kathmandu</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white transition"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={handleDirectWhatsApp}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-500/30 transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
          title="Chat on WhatsApp (+977 9715971505)"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 text-[9px] font-bold text-white items-center justify-center">1</span>
          </span>
        </button>
      </div>
    </div>
  );
};
