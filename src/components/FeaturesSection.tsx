import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ALL_SERVICES } from '../data/services';

export const FeaturesSection: React.FC<{ onOpenBooking: (serviceName?: string) => void }> = ({ onOpenBooking }) => {
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <section id="services" className="relative py-24 lg:py-32 border-t border-slate-800 bg-[#070B16] transition-colors">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-[#6495ED] mb-4">
            <span className="w-8 h-px bg-[#6495ED]" />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6495ED]" />
              Our Complete Service Capabilities (1–12)
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Full-spectrum brand, design &amp; <br />
            <span className="text-[#6495ED]">software engineering.</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
            From strategic brand identity and print collateral to custom web platforms and mobile applications, Blue Code delivers the full end-to-end creative and technical lifecycle.
          </p>
        </div>

        {/* Services List with all 12 services in Glassmorphic Shiny Cards */}
        <div className="grid grid-cols-1 gap-4">
          {ALL_SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isSelected = activeService === index;

            return (
              <div
                key={service.number}
                onClick={() => setActiveService(index)}
                className={`glass-card glass-shiny-hover rounded-2xl p-6 sm:p-7 border border-white/10 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#6495ED]/60 bg-[#0E172E]/90 shadow-xl shadow-[#6495ED]/15'
                    : 'hover:border-[#6495ED]/40 bg-[#0A1020]/70'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left: Number, Badge, Title and Tagline */}
                  <div className="flex items-start gap-5 lg:w-5/12">
                    <span className="font-mono text-xl lg:text-2xl font-bold text-[#6495ED]/70 shrink-0">
                      {service.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <div className="w-8 h-8 rounded-lg bg-[#6495ED]/15 text-[#6495ED] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                          {service.title}
                        </h3>
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#6495ED]/15 text-[#6495ED] border border-[#6495ED]/30">
                          {service.badge}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#6495ED]/90 mb-1">
                        {service.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Key Deliverables & Action */}
                  <div className="lg:w-7/12 lg:pl-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(`${service.number}. ${service.title}`);
                      }}
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#6495ED] hover:bg-[#5383db] transition-all whitespace-nowrap shadow-md shadow-[#6495ED]/20 active:scale-95 cursor-pointer"
                    >
                      <span className="whitespace-nowrap">Inquiry Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
