import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { ALL_SERVICES, ServiceDefinition } from '../data/services';

interface FeaturesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenBooking }) => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string>('01');

  const activeService = ALL_SERVICES.find((s) => s.number === hoveredServiceId) || ALL_SERVICES[0];

  const renderServiceCard = (
    service: ServiceDefinition,
    idx: number
  ) => {
    const Icon = service.icon;
    const isHovered = hoveredServiceId === service.number;

    return (
      <motion.div
        key={service.number}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: (idx % 6) * 0.07 }}
        onMouseEnter={() => setHoveredServiceId(service.number)}
        onFocus={() => setHoveredServiceId(service.number)}
        tabIndex={0}
        className={`glass-card glass-shiny-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 relative group flex flex-col justify-between h-full hover:border-[#6495ED] hover:bg-[#0E172E]/90 hover:shadow-xl hover:shadow-[#6495ED]/20 ${
          isHovered
            ? 'border-2 border-[#6495ED] bg-[#0E172E]/90 shadow-xl shadow-[#6495ED]/20 -translate-y-1'
            : 'border border-white/10'
        }`}
      >
        {/* Top Header: Service Number Pill & Pillar Badge */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                  isHovered
                    ? 'bg-[#6495ED] text-white shadow-md shadow-[#6495ED]/35'
                    : 'bg-[#6495ED]/15 text-[#6495ED] border border-[#6495ED]/30 group-hover:bg-[#6495ED] group-hover:text-white group-hover:border-[#6495ED]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                <span>SERVICE {service.number}</span>
              </div>
            </div>

            {/* Pillar Badge */}
            <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-800/90 text-slate-300 border border-white/10 group-hover:bg-[#6495ED]/20 group-hover:text-[#6495ED] group-hover:border-[#6495ED]/40 transition-colors">
              {service.badge}
            </span>
          </div>

          {/* Icon and Title Block - Matching Working Steps & Agency Principles */}
          <div className="flex items-start gap-4 sm:gap-5 mb-5">
            <div className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/10 bg-slate-800/90 text-[#6495ED] group-hover:bg-[#6495ED] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#6495ED]/35 group-hover:scale-105 group-hover:border-[#6495ED] shrink-0">
              <Icon className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#6495ED] transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#6495ED] mt-1 group-hover:text-slate-200 transition-colors">
                {service.tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
            {service.description}
          </p>

          {/* Deliverables Checklist Box */}
          <div className="bg-[#060913]/60 rounded-xl p-4 border border-white/5 mb-6 space-y-2.5 group-hover:border-[#6495ED]/25 group-hover:bg-[#070D1D]/70 transition-all">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#6495ED]" />
              <span>Deliverables &amp; Capabilities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {service.deliverables.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 group-hover:text-[#6495ED] transition-colors" />
                  <span className="leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Ready Status & Inquire Action */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <span className="text-[#6495ED] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Ready for Deployment
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenBooking(`${service.number}. ${service.title}`);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#6495ED] hover:bg-[#5383db] transition-all whitespace-nowrap shadow-md shadow-[#6495ED]/25 active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-[#6495ED]/40"
          >
            <span>Inquire Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 border-t border-slate-800 bg-[#060913] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/6 left-0 w-[550px] h-[550px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6495ED]/10 border border-[#6495ED]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#6495ED] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR SERVICES &amp; CAPABILITIES</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Comprehensive Digital <br />
            <span className="text-[#6495ED]">Agency Services</span>
          </h2>
          
          <p className="mt-4 text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From brand identity and marketing assets to full-scale software engineering and custom enterprise applications.
          </p>
        </div>

        {/* 12 Services in an Equal-Size Responsive Grid with shiny glassmorphism hover animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
          {ALL_SERVICES.slice(0, 12).map((service, idx) => (
            <div key={service.number} className="h-full flex flex-col">
              {renderServiceCard(service, idx)}
            </div>
          ))}
        </div>

        {/* Bottom Booking Ribbon with Glassmorphism */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl glass-card glass-shiny-hover border border-white/10 bg-[#090F21]/80 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6495ED]/15 text-[#6495ED] border border-[#6495ED]/30 text-xs font-mono font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>CUSTOM CONTRACTS &amp; RETAINERS</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Combination of Services?
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Choose individual services or partner with Blue Code Lab on a full-service creative and technical package.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenBooking(`Selected Service: ${activeService.number}. ${activeService.title}`)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-[#6495ED] hover:bg-[#5383db] transition-all shadow-lg shadow-[#6495ED]/30 active:scale-95 cursor-pointer"
              >
                <span>Book Inquiry for {activeService.number}. {activeService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-slate-300 hover:text-white border border-white/10 hover:border-[#6495ED]/50 hover:bg-white/5 transition-all cursor-pointer"
              >
                <span>View All Work Packages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
