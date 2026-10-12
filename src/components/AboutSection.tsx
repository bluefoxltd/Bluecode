import React from 'react';
import {
  Compass,
  Target,
  Sparkles,
  Shield,
  Zap,
  Globe2,
  Users2,
  ArrowRight,
  Award,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC<{ onOpenBooking?: () => void }> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: Users2,
      badge: 'WHO WE ARE',
      title: 'Our Identity & Agency Guild',
      description:
        'Headquartered in Kathmandu, Nepal, Blue Code is a specialized brand design and full-stack software engineering agency. We bring together experienced graphic designers, brand architects, UI/UX researchers, and senior engineers under one roof. We reject cookie-cutter templates and AI-generic shortcuts in favor of original, strategic vector precision.',
      highlights: [
        'Rooted in Kathmandu, delivering globally',
        'Multi-disciplinary creative & technical guild',
        'Direct founder & lead strategist collaboration',
      ],
    },
    {
      icon: Compass,
      badge: 'OUR VISION',
      title: 'Global Craftsmanship from Nepal',
      description:
        'Our vision is to elevate the digital presence of modern organizations and position Nepal as an internationally recognized hub for world-class design and resilient software architecture. We believe high-growth brands deserve timeless visual identities paired with lightning-fast, production-grade applications that convert visitors into loyal advocates.',
      highlights: [
        'Setting the benchmark for regional creative excellence',
        'Fostering top-tier creative & engineering talent',
        'Building enduring commercial value for our clients',
      ],
    },
    {
      icon: Target,
      badge: 'OUR GOALS',
      title: 'Measurable Commercial Milestones',
      description:
        'Every project we undertake is governed by strict technical and commercial benchmarks. We don’t just deliver aesthetics; we engineer unfair market advantages through superior brand recognition, 99+ Lighthouse performance scores, and high-converting customer touchpoints.',
      highlights: [
        'Transform 100+ ambitious brands by 2027',
        'Maintain sub-1s load times & 98% client retention',
        'Provide instant transparency & direct WhatsApp SLA',
      ],
    },
  ];

  const values = [
    {
      number: '01',
      title: 'Craft Over Templates',
      desc: 'Every logo mark, layout, and line of code is bespoke. We design from first principles to ensure your brand stands out in saturated markets.',
    },
    {
      number: '02',
      title: 'Sub-Second Performance',
      desc: 'Our web platforms and mobile apps are engineered with Next.js, React, and TypeScript for 60fps animations and immediate load speeds.',
    },
    {
      number: '03',
      title: 'Radical Transparency',
      desc: 'Clear investment pricing, instant downloadable PDF receipts, and direct WhatsApp access without corporate layers or hidden fees.',
    },
    {
      number: '04',
      title: 'Commercial Velocity',
      desc: 'We measure our success by your commercial lift: higher conversion rates, stronger investor impressions, and lower customer acquisition costs.',
    },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#060913] text-white overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-[#6495ED]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#6495ED] mb-4">
            <span className="w-8 h-[2px] bg-[#6495ED]" />
            <span>ABOUT BLUE CODE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06] mb-6">
            Building Brands that <br />
            <span className="text-[#6495ED]">Resonate Globally.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            We are a creative and software powerhouse founded to bridge the gap between world-class brand artistry and bulletproof software engineering. From Kathmandu to international markets, we help visionary companies build lasting legacies.
          </p>
        </div>

        {/* 3 Pillars Cards: Who We Are, Vision, Goals with Glassmorphism & Shiny Hover */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-shiny-hover rounded-3xl p-8 flex flex-col justify-between border border-white/10 hover:border-[#6495ED]/50 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#6495ED]/20 text-[#6495ED] flex items-center justify-center font-bold group-hover:bg-[#6495ED] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-[#6495ED] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {pillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-[#6495ED] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Agency Principles Grid with Shiny Glass Hover */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-[#6495ED] uppercase tracking-wider">
              AGENCY PRINCIPLES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              How we approach every partnership
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.number}
                className="glass-card glass-shiny-hover rounded-2xl p-6 border border-white/10 hover:border-[#6495ED]/40 transition-all duration-300"
              >
                <span className="text-xs font-mono font-bold text-[#6495ED]">
                  {v.number}
                </span>
                <h4 className="text-lg font-bold text-white mt-2 mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Want to see how we can elevate your brand?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit an inquiry to receive your formal letterhead receipt and schedule a 30-min discovery call.
            </p>
          </div>

          <button
            onClick={() => {
              if (onOpenBooking) onOpenBooking();
              const el = document.getElementById('inquiry');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 h-12 rounded-full bg-[#6495ED] hover:bg-[#5383db] text-white font-bold text-sm transition-all shadow-lg shadow-[#6495ED]/25 whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <span>Inquiry Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
