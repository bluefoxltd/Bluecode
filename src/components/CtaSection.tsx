import React, { useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBooking }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
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

    // 3D Tetrahedron / Pyramid vertices
    const vertices = [
      { x: 0, y: 1.1, z: 0 },
      { x: -0.95, y: -0.4, z: -0.55 },
      { x: 0.95, y: -0.4, z: -0.55 },
      { x: 0, y: -0.4, z: 1.0 },
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1],
    ];

    const faces = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 3, 2],
    ];

    const rotX = (e: { x: number; y: number; z: number }, t: number) => ({
      x: e.x * Math.cos(t) - e.z * Math.sin(t),
      y: e.y,
      z: e.x * Math.sin(t) + e.z * Math.cos(t),
    });

    const rotY = (e: { x: number; y: number; z: number }, t: number) => ({
      x: e.x,
      y: e.y * Math.cos(t) - e.z * Math.sin(t),
      z: e.y * Math.sin(t) + e.z * Math.cos(t),
    });

    const rotZ = (e: { x: number; y: number; z: number }, t: number) => ({
      x: e.x * Math.cos(t) - e.y * Math.sin(t),
      y: e.x * Math.sin(t) + e.y * Math.cos(t),
      z: e.z,
    });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const scale = 0.65 * Math.min(rect.width, rect.height);

      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const points: Array<{ x: number; y: number; z: number; char: string }> = [];

      // Render wireframe edges with ASCII particles
      edges.forEach(([u, v]) => {
        const p1 = vertices[u];
        const p2 = vertices[v];
        for (let t = 0; t <= 1; t += 0.04) {
          const pt = {
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t,
            z: p1.z + (p2.z - p1.z) * t,
          };
          const rotated = rotZ(rotY(rotX(pt, 0.4 * step), 0.3 * step), 0.2 * step);
          const char = chars[Math.floor(Math.abs(rotated.z * 7 + t * 5)) % chars.length];
          points.push({ ...rotated, char });
        }
      });

      // Sample interior face surfaces
      faces.forEach(([a, b, c]) => {
        const p1 = vertices[a];
        const p2 = vertices[b];
        const p3 = vertices[c];
        for (let u = 0; u <= 1; u += 0.12) {
          for (let v = 0; v <= 1 - u; v += 0.12) {
            const w = 1 - u - v;
            const pt = {
              x: p1.x * u + p2.x * v + p3.x * w,
              y: p1.y * u + p2.y * v + p3.y * w,
              z: p1.z * u + p2.z * v + p3.z * w,
            };
            const rotated = rotZ(rotY(rotX(pt, 0.4 * step), 0.3 * step), 0.2 * step);
            const char = chars[Math.floor(Math.abs(rotated.z * 5)) % chars.length];
            points.push({ ...rotated, char });
          }
        }
      });

      // Sort points back to front
      points.sort((p1, p2) => p1.z - p2.z);

      // Draw projected ASCII characters with Cornflower Blue tones (#6495ED)
      points.forEach((p) => {
        const x = cx + p.x * scale;
        const y = cy - p.y * scale;
        const depthNorm = (p.z + 1.5) / 3;
        const alpha = Math.max(0.12, Math.min(0.95, depthNorm));

        ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
        ctx.fillText(p.char, x, y);
      });

      step += 0.015;
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handleStartProject = () => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking();
    }
  };

  return (
    <section id="cta" className="relative py-20 lg:py-28 bg-[#060913] transition-colors border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="relative border border-slate-800 bg-[#0C1222] p-8 sm:p-12 lg:p-20 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top-Right and Bottom-Left architectural corner lines with #6495ED */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[#6495ED]/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-[#6495ED]/20 pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.02]">
                Ready to build <br />
                <span className="text-[#6495ED]">your brand?</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                Let's create something extraordinary together. Submit your inquiry below for an instant official PDF letterhead receipt, or book a free discovery call.
              </p>

              {/* Two Pill Buttons with #6495ED */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={handleStartProject}
                  className="bg-[#6495ED] hover:bg-[#5383db] text-white px-8 h-13 text-sm sm:text-base font-bold rounded-full group inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#6495ED]/25 cursor-pointer active:scale-95"
                >
                  <span>Start Inquiry &amp; Get Receipt</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="tel:+9779715971505"
                  className="h-13 px-8 text-sm sm:text-base font-semibold text-white rounded-full border border-slate-700 hover:border-[#6495ED] hover:bg-slate-800 inline-flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#6495ED]" />
                  <span>Call +977 9715971505</span>
                </a>
              </div>

              {/* Footnote */}
              <p className="text-xs text-slate-400 mt-6 font-medium">
                ⚡ Instant downloadable receipt · Free 30-min discovery call · Kathmandu, Nepal
              </p>
            </div>

            {/* Right: 3D Rotating Triangle/Tetrahedron ASCII Canvas */}
            <div className="hidden lg:flex items-center justify-center w-[440px] h-[440px] -mr-6 shrink-0">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
