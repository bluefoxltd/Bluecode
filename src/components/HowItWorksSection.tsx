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
  const [activeStep, setActiveStep] = useState(0);

  const steps: ProcessStep[] = [
    {
      number: 'I',
      title: 'Discover & Align',
      description: 'We audit your current positioning, audience dynamics, and commercial objectives to formulate a bulletproof strategic brief.',
      fileName: '01_brand_brief.md',
      code: `# Discovery Phase: Blue Code\n───────────────────────────\n• Market landscape & competitor audit\n• Target persona & empathy mapping\n• Commercial goals & conversion KPI setup\n• Brand pillars & tone-of-voice definition\n• Technical requirements & architecture plan`,
    },
    {
      number: 'II',
      title: 'Design & Engineer',
      description: 'Our creative and engineering teams craft your visual identity, digital assets, print collateral, and interactive web platforms simultaneously.',
      fileName: '02_design_system.ts',
      code: `// Master Creative Sprint\nexport const BrandSystem = {\n  identity: ['Primary Mark', 'Typography', 'Color Tokens'],\n  print: ['Packaging', 'Signage', 'Collateral Decks'],\n  software: ['Next.js Architecture', 'Tailwind', 'APIs'],\n  status: 'In Production Sprint',\n};`,
    },
    {
      number: 'III',
      title: 'Launch & Grow',
      description: 'We deploy your brand across every touchpoint, activating paid media campaigns and tracking conversion velocity for measurable growth.',
      fileName: '03_launch_checklist.md',
      code: `Launch & Scale Checklist\n─────────────────────\n• Website deployment & speed optimization\n• Multi-channel social media rollout\n• Google & Meta ads campaign activation\n• Conversion pixel & attribution tracking\n• Continuous performance optimisation`,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-[#060B18] text-white overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting with Cornflower Blue (#6495ED) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6495ED]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-[#6495ED] mb-4">
            <span className="w-8 h-px bg-[#6495ED]" />
            <span>The Blue Code Methodology</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            How we bring brands <br />
            <span className="text-[#6495ED]">to life.</span>
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
                  className={`w-full text-left p-6 lg:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900/90 border-[#6495ED]/50 shadow-lg shadow-black/20'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/60 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-2xl lg:text-3xl font-bold text-[#6495ED] shrink-0">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        {step.description}
                      </p>

                      {isActive && (
                        <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#6495ED] animate-progress-fill" />
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
            <div className="rounded-2xl border border-slate-800 bg-[#080E20] shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#6495ED]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{steps[activeStep].fileName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-slate-400">Live Engine</span>
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="p-8 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed min-h-[280px]">
                {steps[activeStep].code.split('\n').map((line, lIdx) => (
                  <div
                    key={`${activeStep}-${lIdx}`}
                    className="dev-code-line py-0.5 flex"
                    style={{ animationDelay: `${lIdx * 60}ms` }}
                  >
                    <span className="w-8 text-slate-600 select-none shrink-0 font-mono text-xs">
                      {lIdx + 1}
                    </span>
                    <span className="text-white/90">
                      {line.startsWith('•') ? (
                        <span className="text-[#6495ED]">{line}</span>
                      ) : line.includes('──') ? (
                        <span className="text-slate-600">{line}</span>
                      ) : (
                        <span className="font-semibold text-white">{line}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
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
