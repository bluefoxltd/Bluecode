import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code2, Sparkles, Layers, Cpu } from 'lucide-react';

export const IntegrationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'design' | 'tech'>('both');

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
    { name: 'Spline 3D', category: 'Interactive Spatial' },
    { name: 'Python & AI', category: 'Automation Engine' },
    { name: 'Vite', category: 'Ultra-Fast Tooling' },
  ];

  return (
    <section id="tools" className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800 overflow-hidden transition-colors">
      {/* Background ambient glowing auras with Cornflower Blue (#6495ED) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[350px] lg:w-[900px] lg:h-[450px] bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Section Header */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-12 lg:mb-16 relative z-10">
        <div className="flex items-center justify-center gap-4 text-xs font-medium tracking-widest text-[#6495ED] uppercase mb-5">
          <span className="w-8 h-px bg-slate-800" />
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#6495ED]" />
            Tools &amp; Tech Ecosystem
          </span>
          <span className="w-8 h-px bg-slate-800" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Powered by industry <br />
          <span className="text-[#6495ED]">creative &amp; tech suites.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          From award-winning UI/UX and 3D CGI to modern full-stack web applications, explore our daily production software and engineering arsenal.
        </p>

        {/* Interactive Filter Pills */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === 'both'
                ? 'bg-[#6495ED] text-white shadow-lg shadow-[#6495ED]/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dual Ecosystem</span>
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === 'design'
                ? 'bg-[#6495ED] text-white shadow-lg shadow-[#6495ED]/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Design Tools</span>
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-[#6495ED] text-white shadow-lg shadow-[#6495ED]/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Tech Stack</span>
          </button>
        </div>
      </div>

      {/* Animated Framer Motion Graphic Cards Showcase */}
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 mb-16 relative z-10">
        <div
          className={`grid gap-8 items-stretch ${
            activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {/* Card 1: Design Software Tools (design software tools.png) */}
          {(activeTab === 'both' || activeTab === 'design') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0B1226]/90 to-[#040816]/95 border border-slate-800/90 hover:border-[#6495ED]/50 shadow-xl shadow-[#6495ED]/5 transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-md"
            >
              {/* Subtle card glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6495ED]/20 transition-all duration-500" />

              {/* Card Meta Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6495ED]/15 border border-[#6495ED]/30 flex items-center justify-center text-[#6495ED]">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Design &amp; Creative Suite</h3>
                    <p className="text-xs text-slate-400">Figma · Photoshop · Illustrator · Blender · Spline</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-[#6495ED]/15 text-[#6495ED] border border-[#6495ED]/30">
                  CREATIVE SUITE
                </span>
              </div>

              {/* Animated Floating Transparent PNG Display */}
              <div className="relative my-4 flex items-center justify-center min-h-[260px] sm:min-h-[320px] overflow-visible">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-0.4, 0.4, -0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <img
                    src="/design software tools.png"
                    alt="Design Software Tools Suite - Blue Code"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_12px_32px_rgba(100,149,237,0.3)] select-none transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </div>

              {/* Card Footer Features */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
                <span className="flex items-center gap-1.5 text-[#6495ED]">
                  <Sparkles className="w-3.5 h-3.5" /> High-Fidelity Design Tokens &amp; Component Libraries
                </span>
                <span className="font-mono text-[11px] text-slate-400">100% Vector &amp; 3D</span>
              </div>
            </motion.div>
          )}

          {/* Card 2: Tech Stack (tech stack.png) */}
          {(activeTab === 'both' || activeTab === 'tech') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0B1226]/90 to-[#040816]/95 border border-slate-800/90 hover:border-[#6495ED]/50 shadow-xl shadow-[#6495ED]/5 transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-md"
            >
              {/* Subtle card glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6495ED]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6495ED]/20 transition-all duration-500" />

              {/* Card Meta Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6495ED]/15 border border-[#6495ED]/30 flex items-center justify-center text-[#6495ED]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Full-Stack Tech Stack</h3>
                    <p className="text-xs text-slate-400">React 19 · Next.js · TypeScript · Tailwind · Three.js</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-[#6495ED]/15 text-[#6495ED] border border-[#6495ED]/30">
                  CLOUD STACK
                </span>
              </div>

              {/* Animated Floating Transparent PNG Display */}
              <div className="relative my-4 flex items-center justify-center min-h-[260px] sm:min-h-[320px] overflow-visible">
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0.4, -0.4, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6.5,
                    ease: 'easeInOut',
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <img
                    src="/tech stack.png"
                    alt="Technology Stack & Engineering Architecture - Blue Code"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_12px_32px_rgba(100,149,237,0.3)] select-none transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </div>

              {/* Card Footer Features */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
                <span className="flex items-center gap-1.5 text-[#6495ED]">
                  <Cpu className="w-3.5 h-3.5" /> High-Performance Edge Runtime &amp; Microsecond Latency
                </span>
                <span className="font-mono text-[11px] text-slate-400">TypeScript · WebGL</span>
              </div>
            </motion.div>
          )}
        </div>
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
