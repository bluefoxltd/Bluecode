import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  fileName: string;
  code: string;
}

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      number: 'I',
      title: 'Discover & Strategise',
      description: 'We dive deep into your business, audience, and market in Kathmandu and target territories to uncover insights that shape a winning brand strategy.',
      fileName: '01_brand_discovery.md',
      code: `Brand Discovery Brief\n─────────────────────\n• Market & competitor analysis\n• Audience personas & buying intent\n• Competitive whitespace audit\n• Brand positioning & core narrative\n• Creative direction & visual tone`,
    },
    {
      number: 'II',
      title: 'Design & Create',
      description: 'Our creative team brings your brand to life — from visual identity systems and print collateral to high-performance digital platforms.',
      fileName: '02_creative_deliverables.md',
      code: `Creative Deliverables\n─────────────────────\n• Vector logo & identity system\n• Master brand guidelines (48+ pages)\n• Business stationery & collateral suite\n• Social media launch kit & templates\n• High-conversion website UI/UX`,
    },
    {
      number: 'III',
      title: 'Launch & Grow',
      description: 'We deploy your brand across every touchpoint, activating paid media campaigns and tracking conversion velocity for measurable growth.',
      fileName: '03_launch_checklist.md',
      code: `Launch & Scale Checklist\n─────────────────────\n• Website deployment & speed optimization\n• Multi-channel social media rollout\n• Google & Meta ads campaign activation\n• Conversion pixel & attribution tracking\n• Continuous performance optimisation`,
    },
  ];

  // Auto-advance step every 7 seconds if user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="how-it-works" className="relative py-28 lg:py-36 bg-[#001850] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0052FF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-cyan-300 mb-4">
            <span className="w-8 h-px bg-cyan-400" />
            <span>The Blue Code Methodology</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            How we bring brands <br />
            <span className="text-cyan-400">to life.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Step Selection Buttons */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 lg:p-8 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-white/10 border-cyan-400/50 shadow-lg shadow-black/20'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-2xl lg:text-3xl font-bold text-cyan-400/80 shrink-0">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                        {step.description}
                      </p>

                      {isActive && (
                        <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 animate-progress-fill" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Markdown Brief Emulator Terminal */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 self-start">
            <div className="rounded-2xl border border-white/15 bg-[#001036] shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{steps[activeStep].fileName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-white/60">Live Engine</span>
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="p-8 font-mono text-xs sm:text-sm text-cyan-100/90 leading-relaxed min-h-[280px]">
                {steps[activeStep].code.split('\n').map((line, lIdx) => (
                  <div
                    key={`${activeStep}-${lIdx}`}
                    className="dev-code-line py-0.5 flex"
                    style={{ animationDelay: `${lIdx * 60}ms` }}
                  >
                    <span className="w-8 text-white/30 select-none shrink-0 font-mono text-xs">
                      {lIdx + 1}
                    </span>
                    <span className="text-white/90">
                      {line.startsWith('•') ? (
                        <span className="text-cyan-300">{line}</span>
                      ) : line.includes('──') ? (
                        <span className="text-cyan-500/50">{line}</span>
                      ) : (
                        <span className="font-semibold text-white">{line}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-white/50">
                <span>Phase {steps[activeStep].number} active</span>
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
