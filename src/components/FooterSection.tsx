import React, { useEffect, useRef } from 'react';
import { BlueCodeLogo } from './BlueCodeLogo';
import { ArrowUpRight, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '·∘○◯◌●◉';
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

      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.floor(rect.width / 22);
      const rows = Math.floor(rect.height / 22);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = (x + 0.5) * (rect.width / cols);
          const posY = (y + 0.5) * (rect.height / rows);

          const wave =
            ((Math.sin(0.2 * x + 2 * step) * Math.cos(0.15 * y + step) +
              Math.sin((x + y) * 0.1 + 1.5 * step) +
              Math.cos(0.1 * x - 0.1 * y + 0.8 * step)) /
              3 +
              1) /
            2;

          const charIndex = Math.max(0, Math.min(chars.length - 1, Math.floor(wave * (chars.length - 1))));
          const opacity = 0.08 + 0.4 * wave;

          ctx.fillStyle = `rgba(0, 82, 255, ${opacity})`;
          ctx.fillText(chars[charIndex], posX, posY);
        }
      }

      step += 0.025;
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const footerLinks = {
    Services: [
      { name: 'Brand Identity', href: '#features' },
      { name: 'Graphic Design', href: '#features' },
      { name: 'Social Media Management', href: '#features' },
      { name: 'Web Development', href: '#features' },
      { name: 'Ads Strategy', href: '#features' },
    ],
    Company: [
      { name: 'Our Process', href: '#how-it-works' },
      { name: 'Our Studio', href: '#studio' },
      { name: 'Our Work', href: '#work' },
      { name: 'Packages & Pricing', href: '#pricing' },
      { name: 'Download cPanel ZIP', href: '/bluecode-cpanel-ready.zip' },
    ],
    Connect: [
      { name: 'Kathmandu, Nepal', href: '#studio', icon: MapPin },
      { name: '977-9715971505', href: 'tel:+9779715971505', icon: Phone },
      { name: 'WhatsApp Support', href: 'https://wa.me/9779715971505', icon: MessageCircle },
      { name: 'info@bluecode.com', href: 'mailto:info@bluecode.com', icon: Mail },
    ],
  };

  return (
    <footer className="relative bg-[#001036] text-white pt-24 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background ASCII wave canvas */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Info & Description */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="inline-block" aria-label="Blue Code Home">
              <BlueCodeLogo size={42} showText={true} textColor="text-white" />
            </a>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Premium brand development, web platform engineering, and performance marketing based in Kathmandu, Nepal.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-cyan-300">
              <span>977-9715971505</span>
              <span>·</span>
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerLinks.Services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Connect Directly
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {footerLinks.Connect.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-white/70 hover:text-cyan-300 transition-colors group"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and live status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Blue Code. All rights reserved. Kathmandu, Nepal.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 font-medium">Accepting new clients</span>
            </div>
            <span>·</span>
            <a href="https://wa.me/9779715971505" className="hover:text-cyan-300 transition">
              WhatsApp: 977-9715971505
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
