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
    <section id="studio" className="relative py-28 lg:py-36 bg-[#FBFBFA] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Studio Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-500">
              <span className="w-8 h-px bg-[#0052FF]" />
              <span>Our Creative Headquarters</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#002068] leading-tight">
              Rooted in <br />
              <span className="text-[#0052FF]">Kathmandu.</span>
            </h2>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              Based in Nepal's capital, Blue Code serves visionary founders and enterprises across Kathmandu, Nepal, and beyond — delivering world-class brand identity, modern web platforms, and growth campaigns that stand out on global stages.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0052FF]" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="text-slate-300">·</div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0052FF]" />
                <a href="tel:+9779715971505" className="hover:text-[#0052FF] transition">
                  977-9715971505
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <div>
                <div className="text-3xl lg:text-5xl font-bold tracking-tight text-[#002068]">
                  3+
                </div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-semibold">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl lg:text-5xl font-bold tracking-tight text-[#0052FF]">
                  50+
                </div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-semibold">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl lg:text-5xl font-bold tracking-tight text-[#002068]">
                  12+
                </div>
                <div className="text-xs text-slate-500 mt-1 uppercase font-semibold">
                  Industries Served
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Industries We Serve Interactive Console */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#002068]">
                  <Building2 className="w-4 h-4 text-[#0052FF]" />
                  <span>Industries We Serve</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Accepting clients</span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {industries.map((ind, i) => {
                  const isActive = activeIndustry === i;
                  return (
                    <div
                      key={ind.name}
                      onClick={() => setActiveIndustry(i)}
                      className={`px-6 py-4 flex items-center justify-between cursor-pointer transition-colors duration-300 ${
                        isActive
                          ? 'bg-blue-50/60 border-l-4 border-l-[#0052FF]'
                          : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isActive ? 'bg-[#0052FF]' : 'bg-slate-300'
                          }`}
                        />
                        <div>
                          <div className={`font-semibold text-sm ${isActive ? 'text-[#002068]' : 'text-slate-800'}`}>
                            {ind.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {ind.focus}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-medium text-slate-400">
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
