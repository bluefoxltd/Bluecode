import React, { useState } from 'react';
import {
  ListChecks,
  Compass,
  Code2,
  ShieldCheck,
  Rocket,
  LifeBuoy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorksSection: React.FC<{ onOpenBooking?: () => void }> = ({ onOpenBooking }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Requirement Gathering',
      icon: ListChecks,
      shortBadge: 'FOUNDATION',
      description:
        'In this step, we generate a list of requirements from our clients. The requirement could be functional or technical. It acts as a basis on what the project is and generates information on how it could be tackled. Requirement gathering is the most important step in our workflow. Here, clients must coordinate with our team members on time with clear and effective information.',
      keyTakeaway: 'Clear scope baseline, technical discovery, stakeholder consensus & milestone timeline.',
      deliverables: ['Functional Spec Document', 'Brand Discovery Questionnaire', 'KPI & Success Metrics Brief'],
    },
    {
      number: '02',
      title: 'Plan & Resources',
      icon: Compass,
      shortBadge: 'STRATEGY',
      description:
        'A plan and resources describe the strategic roadmap and assets allocated to achieve specific objectives. It entails outlining goals, timelines, budgets, and identifying the necessary tools, personnel, and materials to execute tasks effectively.',
      keyTakeaway: 'Resource allocation, sprint architecture, technology stack selection & budget alignment.',
      deliverables: ['Sprint Roadmap Gantt', 'Tech Stack Architecture', 'Dedicated Creative & Dev Team Squad'],
    },
    {
      number: '03',
      title: 'Design & Develop',
      icon: Code2,
      shortBadge: 'CRAFTSMANSHIP',
      description:
        'Design and develop refers to the comprehensive process of conceptualizing and creating digital products or solutions, encompassing both the visual aesthetics and underlying functionality, often involving collaboration between designers and developers.',
      keyTakeaway: 'High-fidelity Figma prototypes, vector brand assets, Next.js / TypeScript code & mobile apps.',
      deliverables: ['Vector Brand Assets & Styleguide', 'Figma Interactive Prototypes', 'Production Web & Mobile Codebase'],
    },
    {
      number: '04',
      title: 'Quality Assurance',
      icon: ShieldCheck,
      shortBadge: 'VERIFICATION',
      description:
        "This is the step in which mistakes and defects are identified and corrected to ensure better quality. For quality assurance, we ask feedback from our clients. If our work doesn't meet the specific quality as per the requirement, we construct a plan with our project team to fulfill the desired process. In general, our professional teams are here to develop, detect and inspect the output to deliver satisfactory outcomes to our clients.",
      keyTakeaway: 'Rigorous cross-browser testing, pixel-perfect audits, Lighthouse performance & user feedback.',
      deliverables: ['Lighthouse 95+ Audit', 'Cross-Device Responsiveness Review', 'Security & Load Validation'],
    },
    {
      number: '05',
      title: 'Deployment',
      icon: Rocket,
      shortBadge: 'GO LIVE',
      description:
        'Deployment is the process of releasing and installing software applications or updates onto servers, devices, or networks for end-user access, ensuring functionality, security, and performance in a live environment.',
      keyTakeaway: 'Zero-downtime CI/CD deployment, custom domain DNS, SSL certificates & App Store publishing.',
      deliverables: ['Cloud Infrastructure Provisioning', 'Production SSL & CDN Activation', 'App Store / Play Store Release'],
    },
    {
      number: '06',
      title: 'Support & Maintenance',
      icon: LifeBuoy,
      shortBadge: 'LIFELONG CARE',
      description:
        'Support and maintenance encompass ongoing assistance and upkeep provided to ensure the smooth functioning, security, and reliability of systems, software, or services, including troubleshooting, updates, and user assistance as needed.',
      keyTakeaway: 'Continuous monitoring, routine security patches, conversion optimization & direct WhatsApp SLA.',
      deliverables: ['24/7 Uptime Monitoring', 'Direct WhatsApp Agency Line', 'Quarterly Growth & Feature Sprints'],
    },
  ];

  return (
    <section id="how-we-work" className="relative py-24 lg:py-32 bg-[#060913] text-white overflow-hidden border-t border-slate-800">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6495ED]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block matching image.png exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#6495ED] mb-4">
              <span className="w-8 h-[2px] bg-[#6495ED]" />
              <span>WE MAKE IT HAPPEN</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
              Working Steps <br />
              <span className="text-[#6495ED]">We Follow</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              We follow the sequential and systematic work process that results in a desirable and meaningful output. The series of patterns describe how something goes from being undone to done.
            </p>
          </div>

          {/* Interactive Illustration Card */}
          <div className="lg:col-span-5">
            <div className="glass-card glass-shiny-hover rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">bluecode-engine.process</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#6495ED]/20 text-[#6495ED] font-bold">
                  STEP {steps[selectedStep].number} / 06
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-semibold text-white">
                  <div className="w-8 h-8 rounded-lg bg-[#6495ED]/20 text-[#6495ED] flex items-center justify-center font-bold">
                    {steps[selectedStep].number}
                  </div>
                  <span>{steps[selectedStep].title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#080E1F]/80 p-3.5 rounded-xl border border-white/5">
                  {steps[selectedStep].keyTakeaway}
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {steps[selectedStep].deliverables.map((item, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#6495ED]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Step Cards Grid matching image (1).png with Glassmorphism + Shiny Glass Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = selectedStep === idx;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={() => setSelectedStep(idx)}
                onClick={() => setSelectedStep(idx)}
                className={`glass-card glass-shiny-hover rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 relative group hover:border-[#6495ED] hover:bg-[#0E172E]/90 hover:shadow-xl hover:shadow-[#6495ED]/20 ${
                  isSelected
                    ? 'border-2 border-[#6495ED] shadow-xl shadow-[#6495ED]/20 bg-[#0E172E]/90'
                    : 'border border-white/10'
                }`}
              >
                <div className="flex items-start gap-5">
                  {/* Step Badge with Icon & Number - Changes to Cornflower Blue on HOVER */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/10 bg-slate-800/90 text-[#6495ED] group-hover:bg-[#6495ED] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#6495ED]/35 group-hover:scale-105 group-hover:border-[#6495ED]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#6495ED] mt-2 tracking-wider group-hover:text-white transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#6495ED] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase group-hover:bg-[#6495ED]/20 group-hover:text-[#6495ED] transition-colors">
                        {step.shortBadge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Fast Track to Inquiry */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 pr-6 rounded-full glass-card border border-white/10">
            <span className="text-xs sm:text-sm text-slate-300 px-3">
              Ready to embark on this systematic journey with us?
            </span>
            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
                const el = document.getElementById('inquiry');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2 rounded-full bg-[#6495ED] hover:bg-[#5383db] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#6495ED]/25 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span>Inquiry Now</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
