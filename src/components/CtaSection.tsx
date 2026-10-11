import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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

    // ASCII characters identical to curradigital.com
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

    // 3D Tetrahedron / Pyramid vertices (centered geometry)
    const vertices = [
      { x: 0, y: 1.1, z: 0 },
      { x: -0.95, y: -0.4, z: -0.55 },
      { x: 0.95, y: -0.4, z: -0.55 },
      { x: 0, y: -0.4, z: 1.0 },
    ];

    // Edges between vertices
    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1],
    ];

    // Triangular faces
    const faces = [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 3, 2],
    ];

    // 3-axis rotation transforms matching Curra Digital exactly
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
          const depth = (rotated.z + 1.5) / 3;
          const charIdx = Math.max(0, Math.min(chars.length - 1, Math.floor(depth * (chars.length - 1))));
          points.push({
            x: cx + rotated.x * scale,
            y: cy - rotated.y * scale,
            z: rotated.z,
            char: chars[charIdx],
          });
        }
      });

      // Render face lattice with subtle ASCII shading
      faces.forEach(([i, j, k]) => {
        const v1 = vertices[i];
        const v2 = vertices[j];
        const v3 = vertices[k];
        for (let u = 0; u <= 1; u += 0.1) {
          for (let v = 0; v <= 1 - u; v += 0.1) {
            const w = 1 - u - v;
            const pt = {
              x: v1.x * u + v2.x * v + v3.x * w,
              y: v1.y * u + v2.y * v + v3.y * w,
              z: v1.z * u + v2.z * v + v3.z * w,
            };
            const rotated = rotZ(rotY(rotX(pt, 0.4 * step), 0.3 * step), 0.2 * step);
            const depth = (rotated.z + 1.5) / 3;
            const charIdx = Math.max(0, Math.min(chars.length - 1, Math.floor(depth * (chars.length - 1))));
            points.push({
              x: cx + rotated.x * scale,
              y: cy - rotated.y * scale,
              z: rotated.z,
              char: chars[charIdx],
            });
          }
        }
      });

      // Sort points back to front
      points.sort((a, b) => a.z - b.z);

      // Draw each ASCII character with depth opacity matching Curra Digital
      points.forEach((p) => {
        const alpha = Math.min(0.9, 0.15 + (p.z + 1.5) * 0.25);
        ctx.fillStyle = `rgba(0, 32, 104, ${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
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
    const text = encodeURIComponent(
      "Hello Blue Code! I would like to book a free discovery call and discuss building our brand."
    );
    window.open(`https://wa.me/9779715971505?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cta" className="relative py-24 lg:py-32 bg-[#FBFBFA]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Bordered box matching Image 1 100% */}
        <div className="relative border border-slate-200/90 bg-white p-10 sm:p-14 lg:p-24 overflow-hidden">
          {/* Top-Right and Bottom-Left architectural corner lines */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[#002068]/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-[#002068]/10 pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A0D14] mb-8 leading-[0.98]">
                Ready to build <br />
                <span className="text-[#002068]">your brand?</span>
              </h2>

              <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-xl">
                Let's create something extraordinary together. Book a free discovery call and tell us about your vision.
              </p>

              {/* Two Pill Buttons matching Image 1 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={handleStartProject}
                  className="bg-[#002068] hover:bg-[#0038D1] text-white px-8 h-14 text-base font-semibold rounded-full group inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="tel:+9779715971505"
                  className="h-14 px-8 text-base font-medium text-slate-900 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 inline-flex items-center justify-center transition-all duration-300"
                >
                  Call Us
                </a>
              </div>

              {/* Footnote matching Image 1 */}
              <p className="text-sm text-slate-500 mt-8 font-medium">
                Free consultation · No commitment required
              </p>
            </div>

            {/* Right: 3D Rotating Triangle/Tetrahedron ASCII Canvas */}
            <div className="hidden lg:flex items-center justify-center w-[480px] h-[480px] -mr-8 shrink-0">
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
