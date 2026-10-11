import React, { useState } from 'react';
import { Palette, Layers, Share2, Globe, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

export const FeaturesSection: React.FC<{ onOpenBooking: (serviceName?: string) => void }> = ({ onOpenBooking }) => {
  const [activeService, setActiveService] = useState<number>(0);

  const services: ServiceItem[] = [
    {
      number: '01',
      title: 'Brand Identity',
      description: 'From logo design to complete brand guidelines, we build cohesive visual systems that tell your story and leave an indelible impression.',
      deliverables: ['Logo & Visual Marks', 'Comprehensive Style Guide', 'Typography & Color Tokens', 'Voice & Tone Guidelines'],
      icon: Palette,
    },
    {
      number: '02',
      title: 'Graphic Design',
      description: 'Striking print and digital collateral — presentations, packaging, brochures, and marketing kits — crafted with precision and creative flair.',
      deliverables: ['Pitch Decks & Keynotes', 'Packaging & Print Assets', 'Marketing Collateral Suite', 'Digital Signage & Display'],
      icon: Layers,
    },
    {
      number: '03',
      title: 'Social Media Management',
      description: 'Strategic content creation, community engagement, and analytics-driven campaigns that grow your audience and amplify your brand voice.',
      deliverables: ['Editorial Calendar Planning', 'High-Impact Creative Content', 'Community Management', 'Monthly Analytics & Growth Reports'],
      icon: Share2,
    },
    {
      number: '04',
      title: 'Web Development',
      description: 'Beautiful, high-performance websites and digital platforms designed to convert visitors into loyal, paying customers.',
      deliverables: ['Modern Next.js / React Architecture', 'Mobile-Responsive UX/UI', 'High Core Web Vitals Performance', 'CMS & SEO Optimization'],
      icon: Globe,
    },
    {
      number: '05',
      title: 'Ads Strategy',
      description: 'Data-driven paid media campaigns across Google, Meta, and LinkedIn — maximising ROAS and reaching high-intent buyers.',
      deliverables: ['Funnel Architecture', 'Ad Creative & Copywriting', 'Conversion Tracking & Pixels', 'Continuous A/B Budget Optimization'],
      icon: TrendingUp,
    },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-36 border-t border-slate-200/80 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
            <span className="w-8 h-px bg-[#0052FF]" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#002068] leading-tight">
            Full-spectrum brand <br />
            <span className="text-[#0052FF]">development.</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl">
            We bridge the gap between world-class brand aesthetic and high-performance technical engineering for businesses ready to dominate their space.
          </p>
        </div>

        {/* Services Accordion / List */}
        <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isSelected = activeService === index;

            return (
              <div
                key={service.number}
                className={`transition-colors duration-300 ${
                  isSelected ? 'bg-slate-50/70' : 'hover:bg-slate-50/40'
                }`}
              >
                <div
                  onClick={() => setActiveService(index)}
                  className="py-8 lg:py-10 cursor-pointer flex flex-col lg:flex-row lg:items-start justify-between gap-6 px-4 sm:px-6"
                >
                  {/* Left: Number and Title */}
                  <div className="flex items-start gap-6 lg:w-2/5">
                    <span className="font-mono text-2xl lg:text-3xl font-bold text-slate-300 shrink-0">
                      {service.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-[#0052FF]" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-[#002068] tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm lg:text-base text-slate-600 leading-relaxed max-w-md">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Key Deliverables & Action */}
                  <div className="lg:w-3/5 lg:pl-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(service.title);
                      }}
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0052FF] bg-blue-50 hover:bg-[#0052FF] hover:text-white transition-all whitespace-nowrap"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
