import React from 'react';
import { ShieldCheck, Target, Zap, Clock } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const standards = [
    {
      title: 'Original Vector Mastery',
      description: 'Zero AI generic slop or unverified templates. Every brand mark and asset is designed from the ground up for infinite scalability.',
      icon: Target,
    },
    {
      title: 'Performance-First Engineering',
      description: 'Sub-second loads, 99+ Lighthouse performance scores, and clean Next.js/React code designed for frictionless client conversions.',
      icon: Zap,
    },
    {
      title: 'Commercial Accountability',
      description: 'Transparent deliverables with measurable ROAS tracking, live sprint milestones, and dedicated agency communication channels.',
      icon: Clock,
    },
    {
      title: 'Full Asset Ownership',
      description: 'You own 100% of your production files, design tokens, raw vector assets, code repositories, and brand rights upon project handoff.',
      icon: ShieldCheck,
    },
  ];

  const focusAreas = ['Brand Identity', 'Print Collateral', 'UX/UI Systems', 'Full-Stack Software', 'ROAS Ads'];

  return (
    <section className="relative py-24 lg:py-32 bg-[#070B16] border-t border-slate-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Disciplines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-[#6495ED]">
              <span className="w-8 h-px bg-[#6495ED]" />
              <span>Agency Principles</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Built on uncompromising <br />
              <span className="text-[#6495ED]">craft.</span>
            </h2>

            <p className="text-base lg:text-lg text-slate-300 leading-relaxed">
              We reject templated shortcuts and generic outputs. Every client project is tailored to build enduring authority and distinct identity in crowded markets.
            </p>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
              {focusAreas.map((area, i) => (
                <span key={area} className="inline-flex items-center gap-2">
                  <span className="text-[#6495ED] font-semibold">{area}</span>
                  {i < focusAreas.length - 1 && <span className="text-slate-700">/</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Principle Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl glass-card glass-shiny-hover border border-white/10 hover:border-[#6495ED]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#6495ED] group-hover:bg-[#6495ED] group-hover:text-white group-hover:border-[#6495ED] transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
