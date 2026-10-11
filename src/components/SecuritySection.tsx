import React from 'react';
import { Sparkles, Target, Heart, Award } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const standards = [
    {
      icon: Sparkles,
      title: 'Creative Excellence',
      description: 'Every pixel, vector line, typography pairing, and user micro-interaction is executed with meticulous craftsmanship and aesthetic intention.',
    },
    {
      icon: Target,
      title: 'Strategic Thinking',
      description: 'World-class design supported by concrete commercial data, audience research, and proven conversion funnels that generate real ROI.',
    },
    {
      icon: Heart,
      title: 'Client Partnership',
      description: 'We treat your business as our own — direct communication via WhatsApp, transparent timelines, and collaborative review rounds.',
    },
    {
      icon: Award,
      title: 'Global Delivery Standards',
      description: 'Headquartered in Kathmandu, Nepal with deliverables benchmarked against top Silicon Valley and European design studios.',
    },
  ];

  const focusAreas = ['Brand Identity Systems', 'Digital Platform Engineering', 'Performance Marketing', 'UI/UX Systems', 'Paid Media'];

  return (
    <section className="relative py-28 lg:py-36 bg-white border-t border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Disciplines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-500">
              <span className="w-8 h-px bg-[#0052FF]" />
              <span>Agency Principles</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#002068] leading-tight">
              Built on uncompromising <br />
              <span className="text-[#0052FF]">craft.</span>
            </h2>

            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              We reject templated shortcuts and generic outputs. Every client project is tailored to build enduring authority and distinct identity in crowded markets.
            </p>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              {focusAreas.map((area, i) => (
                <span key={area} className="inline-flex items-center gap-2">
                  <span className="text-[#0052FF] font-semibold">{area}</span>
                  {i < focusAreas.length - 1 && <span className="text-slate-300">/</span>}
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
                  className="p-8 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-[#0052FF]/40 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0052FF] group-hover:bg-[#002068] group-hover:text-white group-hover:border-[#002068] transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002068] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
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
