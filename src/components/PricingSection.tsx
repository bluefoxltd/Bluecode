import React, { useState } from 'react';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking: (planName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: '01',
      name: 'Essentials',
      subtitle: 'For startups and small businesses launching their brand',
      monthlyPrice: 2500,
      annualPrice: 2000, // 20% discount on 2,500
      isCustom: false,
      popular: false,
      features: [
        'Logo & brand identity',
        'Brand guidelines document',
        'Business card design',
        'Social media profile setup',
        '2 revision rounds',
      ],
      ctaText: 'Get Started',
    },
    {
      id: '02',
      name: 'Growth',
      subtitle: 'For established businesses ready to scale their presence',
      monthlyPrice: 3500,
      annualPrice: 2800, // 20% discount on 3,500
      isCustom: false,
      popular: true,
      features: [
        'Full brand identity system',
        'Website design & development',
        'Social media management (3 months)',
        'Marketing collateral suite',
        'Google & Meta ads setup',
        'Monthly performance reports',
        'Priority support',
      ],
      ctaText: 'Start Growing',
    },
    {
      id: '03',
      name: 'Enterprise',
      subtitle: 'For organisations needing a complete brand transformation',
      monthlyPrice: null,
      annualPrice: null,
      isCustom: true,
      popular: false,
      features: [
        'Everything in Growth',
        'Custom brand strategy',
        'Ongoing social media management',
        'Full ads campaign management',
        'Dedicated account manager',
        'Quarterly brand audits',
        'Multi-location branding',
        'Custom contract terms',
      ],
      ctaText: 'Book a Consultation',
    },
  ];

  const handlePlanClick = (planName: string, isCustom: boolean) => {
    if (isCustom) {
      onOpenBooking('Enterprise Custom');
    } else {
      let priceText = '';
      if (isAnnual) {
        const yearlyAmount = planName === 'Essentials' ? 'NPR 24,000 /year' : 'NPR 33,600 /year';
        const standardYearly = planName === 'Essentials' ? 'NPR 30,000 /year' : 'NPR 42,000 /year';
        const monthlyEquivalent = planName === 'Essentials' ? 'NPR 2,000 /mo' : 'NPR 2,800 /mo';
        priceText = `Yearly Plan: ${yearlyAmount} (20% discounted from ${standardYearly}, equivalent to ${monthlyEquivalent})`;
      } else {
        const monthlyAmount = planName === 'Essentials' ? 'NPR 2,500 /month' : 'NPR 3,500 /month';
        priceText = `Monthly Plan: ${monthlyAmount}`;
      }

      const message = encodeURIComponent(
        `Hello Blue Code! I'm interested in the ${planName} Plan (${priceText}). Please share project onboarding details.`
      );
      window.open(`https://wa.me/9779715971505?text=${message}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="pricing" className="relative py-28 lg:py-36 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header & Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
              <span className="w-8 h-px bg-[#0052FF]" />
              <span>Investment Packages</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#002068] leading-tight">
              Transparent <br />
              <span className="text-stroke text-[#0052FF]">investment.</span>
            </h2>
            <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl">
              Flexible packages designed to meet you where you are — and take your brand where it needs to go.
            </p>
          </div>

          {/* Monthly / Annual Toggle Switch */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                !isAnnual
                  ? 'bg-white text-[#002068] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                isAnnual
                  ? 'bg-[#002068] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-400 text-[#002068] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isGrowth = plan.popular;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl p-8 lg:p-10 transition-all duration-300 ${
                  isGrowth
                    ? 'border-2 border-[#002068] bg-white shadow-2xl shadow-blue-900/10 scale-[1.02] z-10'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {/* Most Popular Badge */}
                {isGrowth && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#002068] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Step ID & Name */}
                  <div className="text-xs font-mono font-bold text-slate-400 mb-2">
                    {plan.id}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-[#002068] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 min-h-[36px] mb-8 leading-relaxed">
                    {plan.subtitle}
                  </p>

                  {/* Price display */}
                  <div className="mb-8 pb-8 border-b border-slate-100">
                    {plan.isCustom ? (
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-4xl lg:text-5xl font-bold tracking-tight text-[#002068]">
                            Custom
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Tailored scope & contract terms for enterprise scale
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-semibold text-slate-700">NPR</span>
                          <span className="text-4xl lg:text-5xl font-bold tracking-tight text-[#002068] font-mono tabular-nums">
                            {(isAnnual ? plan.annualPrice : plan.monthlyPrice)?.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium text-slate-500">/month</span>
                        </div>

                        {/* When Yearly / Annual is toggled: show yearly amount with 20% discounted amount */}
                        {isAnnual && plan.monthlyPrice && plan.annualPrice && (
                          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500 font-medium">Standard Yearly:</span>
                              <span className="line-through text-slate-400 font-mono">
                                NPR {(plan.monthlyPrice * 12).toLocaleString()} /yr
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-[#002068]">20% Discounted Yearly:</span>
                              <span className="font-bold text-[#002068] font-mono text-sm">
                                NPR {(plan.annualPrice * 12).toLocaleString()} /yr
                              </span>
                            </div>

                            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-emerald-600">
                              <span>Annual Savings:</span>
                              <span className="bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-md">
                                Save NPR {((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString()} (20% OFF)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Feature check-list */}
                  <div className="space-y-3.5 mb-10">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => handlePlanClick(plan.name, plan.isCustom)}
                    className={`w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                      isGrowth
                        ? 'bg-[#002068] hover:bg-[#0052FF] text-white shadow-md'
                        : 'border border-slate-300 hover:border-[#002068] hover:bg-slate-50 text-slate-900'
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
        <div className="mt-16 text-center text-xs lg:text-sm text-slate-500 space-y-2">
          <p>
            All packages include a free discovery call and project timeline.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span>Need enterprise terms or bespoke scope?</span>
            <a
              href="https://wa.me/9779715971505"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#0052FF] hover:underline underline-offset-4"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact WhatsApp 977-9715971505</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
