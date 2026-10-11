import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯';
    let step = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const radius = 0.5 * Math.min(rect.width, rect.height);

      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 3D Sphere generation with longitude and latitude rings
      const points: Array<{ x: number; y: number; z: number; char: string }> = [];
      const rings = 14;
      const pointsPerRing = 26;

      for (let i = 0; i < rings; i++) {
        const phi = (i / (rings - 1)) * Math.PI - Math.PI / 2;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        for (let j = 0; j < pointsPerRing; j++) {
          const theta = (j / pointsPerRing) * Math.PI * 2 + step * 0.4;
          const x0 = Math.cos(theta) * cosPhi;
          const y0 = sinPhi;
          const z0 = Math.sin(theta) * cosPhi;

          // Rotation around X and Y axes
          const angleX = 0.35 + Math.sin(step * 0.2) * 0.1;
          const y1 = y0 * Math.cos(angleX) - z0 * Math.sin(angleX);
          const z1 = y0 * Math.sin(angleX) + z0 * Math.cos(angleX);

          const angleY = step * 0.5;
          const x2 = x0 * Math.cos(angleY) + z1 * Math.sin(angleY);
          const z2 = -x0 * Math.sin(angleY) + z1 * Math.cos(angleY);

          // Perspective depth calculation
          const depth = (z2 + 1.5) / 3;
          const charIdx = Math.max(0, Math.min(chars.length - 1, Math.floor(depth * (chars.length - 1))));

          points.push({
            x: cx + x2 * radius,
            y: cy + y1 * radius,
            z: z2,
            char: chars[charIdx],
          });
        }
      }

      // Sort points from back to front
      points.sort((a, b) => a.z - b.z);

      points.forEach((pt) => {
        const alpha = Math.max(0.12, Math.min(0.9, 0.2 + (pt.z + 1) * 0.35));
        ctx.fillStyle = `rgba(0, 32, 104, ${alpha})`;
        ctx.fillText(pt.char, pt.x, pt.y);
      });

      step += 0.02;
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const marqueeStats = [
    { value: '10+', label: 'Brands transformed', context: 'BLUE CODE' },
    { value: '98%', label: 'Client retention', context: 'TRUSTED PARTNER' },
    { value: '3x', label: 'Average engagement lift', context: 'DIGITAL IMPACT' },
    { value: 'Kathmandu', label: 'Nepal & Global', context: 'HEADQUARTERED' },
  ];

  const handleStartProject = () => {
    const text = encodeURIComponent(
      "Hello Blue Code! I would like to discuss starting a brand and digital project."
    );
    window.open(`https://wa.me/9779715971505?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-screen pt-32 lg:pt-40 pb-28 overflow-hidden flex flex-col justify-between">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gradient-to-b from-[#0052FF]/5 via-cyan-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-slate-500">
              <span className="w-8 h-px bg-[#0052FF]/60" />
              <span>Brand Identity & Digital Development</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#002068] leading-[1.08] text-balance">
              Building brands <br />
              that <span className="text-stroke text-[#0052FF]">convert.</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
              We craft distinctive brand identities, high-conversion web platforms, and data-backed digital campaigns that captivate audiences and drive measurable business growth.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleStartProject}
                className="group inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-[#002068] hover:bg-[#0052FF] text-white text-base font-semibold shadow-lg shadow-blue-900/10 hover:shadow-blue-600/20 transition-all duration-300"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#work"
                className="inline-flex items-center justify-center px-8 h-14 rounded-full border border-slate-300 hover:border-[#0052FF]/40 text-slate-700 hover:text-[#0052FF] hover:bg-[#0052FF]/5 text-base font-medium transition-all duration-300"
              >
                View Our Work
              </a>
            </div>
          </div>

          {/* Right Column: 3D ASCII Rotating Sphere Visual Carrier */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="w-[340px] h-[340px] sm:w-[420px] h-[420px] lg:w-[460px] lg:h-[460px] relative flex items-center justify-center">
              {/* Radial gradient background behind ASCII sphere */}
              <div className="absolute inset-4 rounded-full bg-radial from-[#0052FF]/10 via-[#002068]/5 to-transparent blur-xl pointer-events-none" />
              <canvas
                ref={canvasRef}
                className="w-full h-full relative z-10"
                style={{ display: 'block' }}
              />
              <div className="absolute -bottom-2 right-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                ASCII 3D · Blue Code Core
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee Statistics Strip */}
      <div className="mt-20 lg:mt-24 border-y border-slate-200/80 bg-white/50 backdrop-blur-xs py-6 overflow-hidden">
        <div className="marquee">
          {[...marqueeStats, ...marqueeStats, ...marqueeStats].map((stat, idx) => (
            <div key={idx} className="flex items-baseline gap-4 mx-8 shrink-0">
              <span className="text-3xl lg:text-4xl font-bold tracking-tight text-[#002068]">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {stat.label}
                <span className="block text-[10px] font-semibold text-slate-400 tracking-wider mt-0.5">
                  {stat.context}
                </span>
              </span>
              <span className="text-slate-300 ml-6 select-none">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
