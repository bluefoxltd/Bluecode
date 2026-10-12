import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { BlueCodeLogo } from './BlueCodeLogo';
import { ALL_SERVICES } from '../data/services';

export const FooterSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number>(0);

  // Background interactive wave canvas with Cornflower Blue tones (#6495ED)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || 400;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const chars = ['.', ':', '*', '+', '#', '~', '=', '-'];
    const cols = 48;
    const rows = 14;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cellW = width / cols;
      const cellH = height / rows;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave1 = Math.sin(x * 0.2 + step) * 1.5;
          const wave2 = Math.cos(y * 0.3 + step * 0.8) * 1.5;
          const val = Math.sin(wave1 + wave2);
          const charIndex = Math.floor(Math.abs(val) * chars.length) % chars.length;
          const char = chars[charIndex];

          const alpha = 0.08 + Math.abs(val) * 0.22;
          ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
          ctx.fillText(char, x * cellW + cellW / 2, y * cellH + cellH / 2);
        }
      }

      step += 0.02;
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const footerLinks = {
    Services1: ALL_SERVICES.slice(0, 6),
    Services2: ALL_SERVICES.slice(6, 12),
    Company: [
      { name: 'Our Process', href: '#how-it-works' },
      { name: 'Studio & HQ', href: '#studio' },
      { name: 'Tools Ecosystem', href: '#tools' },
      { name: 'Work Deliverables', href: '#work' },
      { name: 'Client Inquiry Form', href: '#inquiry' },
      { name: 'Packages & Pricing', href: '#pricing' },
    ],
    Connect: [
      { name: 'Kathmandu, Nepal', href: '#studio', icon: MapPin },
      { name: '+977 9715971505', href: 'tel:+9779715971505', icon: Phone },
      { name: 'WhatsApp: +977 9715971505', href: 'https://wa.me/9779715971505', icon: MessageCircle },
      { name: 'info@bluecode.agency', href: 'mailto:info@bluecode.agency', icon: Mail },
    ],
  };

  return (
    <footer className="relative bg-[#050A17] text-white pt-20 pb-12 border-t border-slate-800 overflow-hidden">
      {/* Background ASCII wave canvas */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          {/* Brand Info & Description with bluecode.png logo */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="inline-block" aria-label="Blue Code Home">
              <BlueCodeLogo size={50} />
            </a>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Premium brand development, graphic design, print collateral, and full-stack software engineering based in Kathmandu, Nepal.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#6495ED]">
              <span>+977 9715971505</span>
              <span>·</span>
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="text-xs text-slate-400">
              Official Email: <a href="mailto:info@bluecode.agency" className="text-white hover:text-[#6495ED] transition">info@bluecode.agency</a>
            </div>
          </div>

          {/* Navigation Columns: Services (1-6) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6495ED] mb-3.5">
              Services (01–06)
            </h4>
            <ul className="space-y-2 text-xs">
              {footerLinks.Services1.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" className="text-slate-300 hover:text-white transition-colors">
                    {srv.number}. {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Columns: Services (7-12) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6495ED] mb-3.5">
              Services (07–12)
            </h4>
            <ul className="space-y-2 text-xs">
              {footerLinks.Services2.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" className="text-slate-300 hover:text-white transition-colors">
                    {srv.number}. {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6495ED] mb-3.5">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.Connect.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-slate-300 hover:text-[#6495ED] transition-colors group"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#6495ED] shrink-0" />
                      <span className="truncate">{item.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and live status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Blue Code (bluecode.agency). All rights reserved. Kathmandu, Nepal.</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-medium">Accepting new client projects</span>
            </div>
            <span>·</span>
            <a href="https://wa.me/9779715971505" className="hover:text-[#6495ED] transition">
              WhatsApp: +977 9715971505
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
