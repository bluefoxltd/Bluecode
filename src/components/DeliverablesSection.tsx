import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';

interface ProjectSample {
  label: string;
  code: string;
}

export const DeliverablesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const samples: ProjectSample[] = [
    {
      label: 'Brand Identity',
      code: `Brand System: Apex Himalayas\n───────────────────────────────\nPrimary Color:    #002068 (Deep Navy)\nAccent Color:     #00D2FF (Electric Cyan)\nDisplay Font:     Plus Jakarta Sans\nBrand Personality: Premium, Modern, Authoritative\nLogo Package:     Vector SVG, Dark/Light marks, Favicon\nDesign Guidelines: 52-Page Master Document`,
    },
    {
      label: 'Social Campaign',
      code: `Campaign: Nepal Tech Horizons Q1\n───────────────────────────────\nPlatforms:        Instagram, LinkedIn, Facebook\nCreative Assets:  28 High-Impact Motion & Carousel Pieces\nImpressions:      680K Targeted Inbound Reach\nEngagement Rate:  +340% Over Industry Baseline\nClient ROAS:      4.6x Net Ad Spend`,
    },
    {
      label: 'Web Platform',
      code: `Platform: Kathmandu Fintech Hub\n───────────────────────────────\nStack:            Next.js, Tailwind CSS, TypeScript\nLighthouse Score: 99/100 Core Web Vitals\nPage Load:        0.9s Globally CDN-Optimized\nLead Conversion:  +74% Higher vs Legacy System\nSecurity:         Bank-Grade SSL & CSRF Protection`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(samples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const guarantees = [
    {
      title: 'Award-winning design',
      desc: 'Recognised for visual excellence and strategic clarity in digital identity.',
    },
    {
      title: 'End-to-end service',
      desc: 'From initial brand audit to code deployment and paid ad scaling.',
    },
    {
      title: 'Kathmandu & global insight',
      desc: 'Deep understanding of local commercial landscape with international standards.',
    },
    {
      title: 'Commercial accountability',
      desc: 'Every project milestone tied to concrete deliverables and measurable outcomes.',
    },
  ];

  return (
    <section id="work" className="relative py-28 lg:py-36 bg-[#FBFBFA] border-t border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
            <span className="w-8 h-px bg-[#0052FF]" />
            <span>Case Study Deliverables</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#002068]">
            Work that drives <br />
            <span className="text-[#0052FF]">tangible value.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 4 Core Agency Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {guarantees.map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <h4 className="text-base font-bold text-[#002068] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0052FF] hover:text-[#002068] transition"
              >
                <span>Explore packages & pricing</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Preview */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Tab Selector Bar */}
              <div className="px-6 py-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {samples.map((s, idx) => (
                    <button
                      key={s.label}
                      onClick={() => setActiveTab(idx)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === idx
                          ? 'bg-white text-[#0052FF] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-[#0052FF] transition rounded-md hover:bg-white"
                  title="Copy details"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <div className="p-8 font-mono text-xs sm:text-sm leading-loose bg-[#001036] text-white min-h-[260px] overflow-x-auto">
                {samples[activeTab].code.split('\n').map((line, idx) => (
                  <div key={`${activeTab}-${idx}`} className="dev-code-line flex" style={{ animationDelay: `${idx * 50}ms` }}>
                    <span className="w-8 text-white/30 select-none shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span className={line.includes('──') ? 'text-cyan-400/50' : line.includes(':') ? 'text-cyan-200' : 'text-white'}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terminal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Verified Client Architecture</span>
                <span className="font-semibold text-slate-700">Blue Code Studio · Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
