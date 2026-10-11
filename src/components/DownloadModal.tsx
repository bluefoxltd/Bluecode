import React from 'react';
import { X, Download, Server, FileCode, CheckCircle, ExternalLink } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#002068] text-white">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-cyan-300" />
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-300 block">
                Deployment Package
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                Download for cPanel Hosting
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Choose your download package below. The <strong>cPanel Ready ZIP</strong> contains pre-compiled, optimized production assets including <code className="bg-slate-100 px-1 py-0.5 rounded text-[#002068]">.htaccess</code>, ready to extract straight into your cPanel <code className="bg-slate-100 px-1 py-0.5 rounded text-[#002068]">public_html</code> folder.
          </p>

          {/* Download Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: cPanel Ready */}
            <div className="p-5 rounded-xl border-2 border-[#002068] bg-blue-50/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#002068] text-white">
                    Recommended
                  </span>
                  <Server className="w-4 h-4 text-[#0052FF]" />
                </div>
                <h4 className="font-bold text-base text-[#002068]">
                  cPanel Production ZIP
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Includes compiled static bundle, Apache <code className="text-xs">.htaccess</code>, and instructions.
                </p>
              </div>

              <a
                href="/bluecode-cpanel-ready.zip"
                download="bluecode-cpanel-ready.zip"
                className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#002068] hover:bg-[#0052FF] text-white font-semibold text-xs transition shadow-sm active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                <span>Download cPanel ZIP</span>
              </a>
            </div>

            {/* Option 2: Full Source Code */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-200 text-slate-700">
                    Developers
                  </span>
                  <FileCode className="w-4 h-4 text-slate-600" />
                </div>
                <h4 className="font-bold text-base text-slate-900">
                  Full Source Code ZIP
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Includes raw React, TypeScript, Tailwind, and Vite workspace configuration.
                </p>
              </div>

              <a
                href="/bluecode-source-code.zip"
                download="bluecode-source-code.zip"
                className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 hover:border-[#002068] hover:bg-white text-slate-800 font-semibold text-xs transition active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                <span>Download Source ZIP</span>
              </a>
            </div>
          </div>

          {/* Step-by-Step cPanel Quick Guide */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <h5 className="font-bold text-xs text-[#002068] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>3-Step cPanel Deployment Guide:</span>
            </h5>
            <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                Log into <strong>cPanel</strong>, open <strong>File Manager</strong>, and navigate to <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[11px]">public_html</code>.
              </li>
              <li>
                Click <strong>Upload</strong> and select <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[11px]">bluecode-cpanel-ready.zip</code>.
              </li>
              <li>
                Right-click the uploaded zip file and select <strong>Extract</strong> into <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[11px]">/public_html</code>.
              </li>
            </ol>
            <p className="text-[11px] text-slate-500 pt-1">
              Your website will immediately go live on your domain with full 3D canvas animations and WhatsApp integration!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Need hosting assistance?</span>
          <a
            href="https://wa.me/9779715971505"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#0052FF] hover:underline flex items-center gap-1"
          >
            <span>WhatsApp Support (+977 9715971505)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
