import React from 'react';

export const IntegrationsSection: React.FC = () => {
  const toolsTop = [
    { name: 'Adobe Premiere Pro', category: 'Adobe Suite' },
    { name: 'Figma', category: 'UI/UX Design' },
    { name: 'Meta Ads', category: 'Social Advertising' },
    { name: 'Google Ads', category: 'Search & Display' },
    { name: 'WordPress', category: 'Web Platform' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'Mailchimp', category: 'Email Marketing' },
    { name: 'Hootsuite', category: 'Social Management' },
  ];

  const toolsBottom = [
    { name: 'Google Analytics', category: 'Performance Tracking' },
    { name: 'Hootsuite', category: 'Social Management' },
    { name: 'Mailchimp', category: 'Email Marketing' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'WordPress', category: 'Web Platform' },
    { name: 'Google Ads', category: 'Search & Display' },
    { name: 'Meta Ads', category: 'Social Advertising' },
    { name: 'Figma', category: 'UI/UX Design' },
  ];

  return (
    <section className="relative py-28 lg:py-36 bg-[#FBFBFA] border-t border-slate-200/80 overflow-hidden">
      {/* Centered Section Header matching 100% original design */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16 lg:mb-20">
        <div className="flex items-center justify-center gap-4 text-xs font-medium tracking-widest text-slate-500 uppercase mb-6">
          <span className="w-8 h-px bg-slate-300" />
          <span>Tools & Platforms</span>
          <span className="w-8 h-px bg-slate-300" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0D14] mb-6 leading-tight">
          Powered by the best <br />
          creative tools.
        </h2>

        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We leverage industry-leading platforms to deliver exceptional results for every client.
        </p>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="w-full mb-6 overflow-hidden">
        <div className="marquee">
          {[...toolsTop, ...toolsTop, ...toolsTop].map((tool, idx) => (
            <div
              key={`top-${tool.name}-${idx}`}
              className="shrink-0 mx-3 px-8 py-6 bg-white border border-slate-200/90 hover:border-[#002068]/30 hover:bg-[#002068]/[0.02] transition-all duration-300 group select-none min-w-[220px]"
            >
              <div className="text-lg font-medium text-[#0A0D14] group-hover:translate-x-1 transition-transform duration-300">
                {tool.name}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="w-full overflow-hidden">
        <div className="marquee-reverse">
          {[...toolsBottom, ...toolsBottom, ...toolsBottom].map((tool, idx) => (
            <div
              key={`bottom-${tool.name}-${idx}`}
              className="shrink-0 mx-3 px-8 py-6 bg-white border border-slate-200/90 hover:border-[#002068]/30 hover:bg-[#002068]/[0.02] transition-all duration-300 group select-none min-w-[220px]"
            >
              <div className="text-lg font-medium text-[#0A0D14] group-hover:translate-x-1 transition-transform duration-300">
                {tool.name}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
