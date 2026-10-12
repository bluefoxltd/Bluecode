import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking: (planName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Essentials',
      badge: 'STARTER KIT',
      description: 'Ideal for local businesses and early startups ready to establish a credible brand presence.',
      monthlyPrice: 'NPR 2,500',
      annualPrice: 'NPR 2,000',
      annualBillingNote: 'NPR 24,000 / year (Save 20%)',
      monthlyBillingNote: 'Billed monthly',
      features: [
        'Complete Primary & Secondary Logo Package',
        'Core Color & Typography Brand Kit',
        'Business Card & Social Media Display Assets',
        'Mobile-Responsive 1-Page Landing Page',
        'Direct WhatsApp Support Line',
        'Standard 7-Day Sprint Delivery',
      ],
      ctaText: 'Select Essentials Plan',
      isCustom: false,
    },
    {
      name: 'Growth',
      badge: 'MOST POPULAR',
      description: 'Engineered for scaling businesses needing recurring high-impact digital presence and paid ad creative.',
      monthlyPrice: 'NPR 3,500',
      annualPrice: 'NPR 2,800',
      annualBillingNote: 'NPR 33,600 / year (Save 20%)',
      monthlyBillingNote: 'Billed monthly',
      features: [
        'Complete Master Visual Identity System',
        'Comprehensive 30+ Page Style Guidelines',
        'Monthly Social Media Creative Suite (16 Posts)',
        'Full 5-Page Next.js High-Performance Website',
        'Google & Meta Ads Strategy Architecture',
        'Monthly Conversion & Analytics Audit',
        'Priority Slack / WhatsApp Agency Channel',
      ],
      ctaText: 'Select Growth Plan',
      isCustom: false,
    },
    {
      name: 'Enterprise Custom',
      badge: 'BESPOKE SCOPE',
      description: 'For established organizations requiring dedicated end-to-end multi-disciplinary creative and software architecture.',
      monthlyPrice: 'Custom Scope',
      annualPrice: 'Custom Scope',
      annualBillingNote: 'Milestone or retainer billing',
      monthlyBillingNote: 'Tailored SLA agreement',
      features: [
        'Full Enterprise Brand Architecture & Relaunch',
        'Print Collateral, Signage & Factory Tech Packs',
        'Custom Web & Mobile App Engineering (iOS/Android)',
        'Dedicated Creative Director & Lead Engineer',
        'Bespoke Video Production & 3D CGI Visuals',
        'Continuous ROAS Ad Spend Funnel Management',
        '24/7 Dedicated Support & NDA Compliance',
      ],
      ctaText: 'Request Custom Proposal',
      isCustom: true,
    },
  ];

  const handlePlanClick = (planName: string) => {
    onOpenBooking(`${planName} (${isAnnual ? 'Annual 20% OFF' : 'Monthly'})`);
  };

  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header & Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-18">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-[#6495ED] mb-4">
              <span className="w-8 h-px bg-[#6495ED]" />
              <span>Investment Packages</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Transparent <br />
              <span className="text-[#6495ED]">investment.</span>
            </h2>
            <p className="mt-4 text-base lg:text-lg text-slate-300 max-w-xl">
              Flexible packages designed to meet you where you are — and take your brand where it needs to go.
            </p>
          </div>

          {/* Monthly / Annual Toggle Switch */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isAnnual
                  ? 'bg-[#6495ED] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white text-[#6495ED] font-black">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isGrowth = plan.name === 'Growth';

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isGrowth
                    ? 'bg-[#0A1022] border-2 border-[#6495ED] shadow-xl shadow-[#6495ED]/10 lg:-translate-y-2'
                    : 'bg-[#070B16] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Highlight Badge */}
                {isGrowth && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6495ED] text-white text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Recommended for Growth</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                      {plan.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[44px]">
                    {plan.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="my-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      {!plan.isCustom && (
                        <span className="text-xs text-slate-400 font-medium">/ month</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6495ED] mt-1 font-medium">
                      {isAnnual ? plan.annualBillingNote : plan.monthlyBillingNote}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => handlePlanClick(plan.name)}
                    className={`w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer active:scale-95 ${
                      isGrowth
                        ? 'bg-[#6495ED] hover:bg-[#5383db] text-white shadow-lg shadow-[#6495ED]/20'
                        : 'border border-slate-700 hover:border-[#6495ED] hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote with direct WhatsApp inquiry */}
        <div className="mt-14 text-center text-xs lg:text-sm text-slate-400 space-y-2">
          <p>
            All packages include instant letterhead receipt generation &amp; free 30-minute discovery call.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span>Need enterprise terms or bespoke scope?</span>
            <a
              href="https://wa.me/9779715971505"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#6495ED] hover:underline underline-offset-4"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact WhatsApp +977 9715971505</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
