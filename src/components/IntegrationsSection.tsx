import React, { useRef } from 'react';
import { Sparkles, Atom } from 'lucide-react';
import { AtomicOrbitEcosystem } from './AtomicOrbitEcosystem';
import { MatrixScatterBackground } from './MatrixScatterBackground';

export const IntegrationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const toolsTop = [
    { name: 'Adobe Premiere Pro', category: 'Video Production' },
    { name: 'Figma', category: 'UI/UX Design System' },
    { name: 'Meta Ads', category: 'Social Performance' },
    { name: 'Google Ads', category: 'Search & PPC' },
    { name: 'React 19', category: 'Frontend Web' },
    { name: 'Next.js', category: 'Server Architecture' },
    { name: 'TypeScript', category: 'Strict Typing' },
    { name: 'Three.js', category: '3D WebGL Graphics' },
  ];

  const toolsBottom = [
    { name: 'Tailwind CSS', category: 'Modern Styling' },
    { name: 'Blender 3D', category: '3D CGI & VFX' },
    { name: 'Photoshop', category: 'Digital Imaging' },
    { name: 'Illustrator', category: 'Vector Branding' },
    { name: 'After Effects', category: 'Motion Design' },
    { name: 'CorelDRAW', category: 'Vector Graphics' },
    { name: 'Python & AI', category: 'Automation Engine' },
    { name: 'Vite', category: 'Ultra-Fast Tooling' },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="tools" 
      className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800 overflow-hidden transition-colors"
    >
      {/* Light blue tilted background with falling & scattering code matrix */}
      <MatrixScatterBackground />

      {/* Background ambient glowing auras with Cornflower Blue (#6495ED) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[350px] lg:w-[950px] lg:h-[500px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Section Header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-10 lg:mb-12 relative z-10">
        <div className="flex items-center justify-center gap-4 text-xs font-medium tracking-widest text-[#6495ED] uppercase mb-5">
          <span className="w-8 h-px bg-slate-800" />
          <span className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#6495ED] animate-spin-slow" />
            Atomic Ecosystem Model
          </span>
          <span className="w-8 h-px bg-slate-800" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Powered by industry <br />
          <span className="text-[#6495ED]">creative &amp; tech suites.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          An integrated atomic ecosystem uniting design tools and full-stack engineering. Watch our creative suite orbit in the outer shell around our high-performance tech stack core.
        </p>
      </div>

      {/* Atomic Circle Orbital Animation Model */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-16 relative z-10 flex flex-col items-center">
        <AtomicOrbitEcosystem />
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="w-full mb-6 overflow-hidden relative z-10">
        <div className="marquee">
          {[...toolsTop, ...toolsTop, ...toolsTop].map((tool, idx) => (
            <div
              key={`top-${tool.name}-${idx}`}
              className="shrink-0 mx-3 px-8 py-5 bg-[#0C1222] border border-slate-800 hover:border-[#6495ED]/40 hover:bg-[#6495ED]/[0.05] transition-all duration-300 group select-none min-w-[220px]"
            >
              <div className="text-base font-semibold text-white group-hover:translate-x-1 group-hover:text-[#6495ED] transition-all duration-300">
                {tool.name}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="w-full overflow-hidden relative z-10">
        <div className="marquee-reverse">
          {[...toolsBottom, ...toolsBottom, ...toolsBottom].map((tool, idx) => (
            <div
              key={`bottom-${tool.name}-${idx}`}
              className="shrink-0 mx-3 px-8 py-5 bg-[#0C1222] border border-slate-800 hover:border-[#6495ED]/40 hover:bg-[#6495ED]/[0.05] transition-all duration-300 group select-none min-w-[220px]"
            >
              <div className="text-base font-semibold text-white group-hover:translate-x-1 group-hover:text-[#6495ED] transition-all duration-300">
                {tool.name}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
