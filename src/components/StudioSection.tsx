import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Building2 } from 'lucide-react';

export const StudioSection: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const industries = [
    { name: 'Hospitality', focus: 'Hotels, Resorts & Dining', status: 'Active' },
    { name: 'Finance', focus: 'Fintech, Remittance & Banking', status: 'Active' },
    { name: 'Retail', focus: 'E-commerce & Consumer Goods', status: 'Active' },
    { name: 'Healthcare', focus: 'Clinics, Diagnostics & Wellness', status: 'Active' },
    { name: 'Technology', focus: 'SaaS Platforms & Web3 Startups', status: 'Active' },
    { name: 'Education', focus: 'Institutions & Professional Training', status: 'Active' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [industries.length]);

  return (
    <section id="studio" className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800 overflow-hidden transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Studio Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-[#6495ED]">
              <span className="w-8 h-px bg-[#6495ED]" />
              <span>Our Creative Headquarters</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Rooted in <br />
              <span className="text-[#6495ED]">Kathmandu.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Based in Nepal's capital, Blue Code serves visionary founders and enterprises across Kathmandu, Nepal, and beyond — delivering world-class brand identity, modern web platforms, and growth campaigns that stand out on global stages.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6495ED]" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="text-slate-700">·</div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6495ED] shrink-0" />
                <a href="tel:+9779715971505" className="hover:text-[#6495ED] transition whitespace-nowrap">
                  +977-9715971505
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div>
                <div className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
                  3+
                </div>
                <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#6495ED]">
                  50+
                </div>
                <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
                  12+
                </div>
                <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">
                  Industries Served
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Industries We Serve Interactive Console */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0F1F] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="px-6 py-4.5 border-b border-slate-800 bg-[#080D1A] flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Building2 className="w-4 h-4 text-[#6495ED]" />
                  <span>Industries We Serve</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Accepting clients</span>
                </div>
              </div>

              <div className="divide-y divide-slate-800/60">
                {industries.map((ind, i) => {
                  const isActive = activeIndustry === i;
                  return (
                    <div
                      key={ind.name}
                      onClick={() => setActiveIndustry(i)}
                      className={`px-6 py-4 flex items-center justify-between cursor-pointer transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#6495ED]/10 border-l-4 border-l-[#6495ED]'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isActive ? 'bg-[#6495ED]' : 'bg-slate-700'
                          }`}
                        />
                        <div>
                          <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {ind.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {ind.focus}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-medium text-slate-500">
                        {ind.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
