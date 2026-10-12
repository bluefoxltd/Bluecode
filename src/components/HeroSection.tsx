import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import holographicGlobeImg from '../assets/images/holographic-globe.png';

interface HeroSectionProps {
  onOpenBooking: (service?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number>(0);

  // Changeable text content specified by the user:
  // - Inspire
  // - Stand Out
  // - Resonate
  // - Convert
  // Strictly kept on the SAME line after "Building Brands that"
  const changeableWords = ['Inspire', 'Stand Out', 'Resonate', 'Convert'];
  const [wordIndex, setWordIndex] = useState(0);

  // Cycle changeable words smoothly every 2.4s
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % changeableWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [changeableWords.length]);

  // Live Sci-Fi UI Overlay Canvas on intersecting axes (2x scale) with Cornflower Blue tones (#6495ED)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle dust particles in the cosmic void with Cornflower Blue (#6495ED)
    const particleCount = 48;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.6 + Math.random() * 1.8,
      alpha: 0.2 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.0004,
      speedY: (Math.random() - 0.5) * 0.0004,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? 'rgba(100, 149, 237,' : 'rgba(0, 216, 255,',
    }));

    // Orbital satellite rings on intersecting axes (Cornflower Blue & cyan light)
    const orbitRings = [
      { tiltX: 0.42, tiltY: 0.25, rotSpeed: 0.007, radiusMult: 1.08, satCount: 2, satSpeed: 0.008, color: 'rgba(100, 149, 237,' },
      { tiltX: -0.55, tiltY: 0.48, rotSpeed: -0.005, radiusMult: 1.18, satCount: 3, satSpeed: 0.006, color: 'rgba(0, 216, 255,' },
      { tiltX: 0.85, tiltY: -0.32, rotSpeed: 0.006, radiusMult: 1.25, satCount: 2, satSpeed: -0.007, color: 'rgba(100, 149, 237,' },
      { tiltX: -0.22, tiltY: -0.65, rotSpeed: -0.008, radiusMult: 1.34, satCount: 2, satSpeed: 0.005, color: 'rgba(147, 197, 253,' },
    ];

    // Data transmission pulse line between points
    const transmissionPulses = [
      { angle1: 0.3, angle2: 1.9, progress: 0, speed: 0.012, active: true },
      { angle1: 2.4, angle2: 4.1, progress: 0.5, speed: 0.009, active: true },
      { angle1: 4.8, angle2: 0.8, progress: 0.2, speed: 0.014, active: true },
    ];

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      // 2x scale: sphere radius matches enlarged globe
      const sphereRadius = Math.min(width, height) * 0.42;

      // 1. Subtle Ambient Volumetric Light Rays emitting from the cosmic center
      ctx.save();
      ctx.translate(cx, cy);
      const rayCount = 6;
      for (let i = 0; i < rayCount; i++) {
        const rayAngle = (i / rayCount) * Math.PI * 2 + time * 0.002;
        const rayGrad = ctx.createRadialGradient(0, 0, sphereRadius * 0.4, 0, 0, sphereRadius * 1.55);
        rayGrad.addColorStop(0, 'rgba(100, 149, 237, 0.09)');
        rayGrad.addColorStop(0.5, 'rgba(0, 216, 255, 0.04)');
        rayGrad.addColorStop(1, 'rgba(100, 149, 237, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, sphereRadius * 1.55, rayAngle - 0.18, rayAngle + 0.18);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 2. Cosmic Bokeh Particle Dust
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const pulse = 0.5 + 0.5 * Math.sin(time * p.pulseSpeed + p.pulsePhase);
        const currentAlpha = p.alpha * pulse;

        const px = p.x * width;
        const py = p.y * height;

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.shadowColor = 'rgba(100, 149, 237, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Inner Atmospheric Glow Halo (Cornflower Blue #6495ED)
      const atmoGrad = ctx.createRadialGradient(cx, cy, sphereRadius * 0.85, cx, cy, sphereRadius * 1.08);
      atmoGrad.addColorStop(0, 'rgba(100, 149, 237, 0)');
      atmoGrad.addColorStop(0.7, 'rgba(100, 149, 237, 0.22)');
      atmoGrad.addColorStop(0.95, 'rgba(0, 216, 255, 0.35)');
      atmoGrad.addColorStop(1, 'rgba(100, 149, 237, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = atmoGrad;
      ctx.fill();

      // 3.5. 3D Holographic Digital Globe Core Grid (Latitude circles & rotating Longitude meridians)
      ctx.save();
      ctx.translate(cx, cy);
      const latAngles = [-0.65, -0.42, -0.21, 0, 0.21, 0.42, 0.65];
      latAngles.forEach((lat) => {
        const latRadius = sphereRadius * Math.cos(lat) * 0.98;
        const latY = sphereRadius * Math.sin(lat) * 0.98;
        ctx.beginPath();
        ctx.ellipse(0, latY, latRadius, latRadius * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.14)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });

      const meridianCount = 6;
      for (let m = 0; m < meridianCount; m++) {
        const meridianRot = (time * 0.003 + (m / meridianCount) * Math.PI) % Math.PI;
        const meridianWidth = sphereRadius * 0.98 * Math.cos(meridianRot);
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(meridianWidth), sphereRadius * 0.98, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 216, 255, 0.12)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Multiple Thin Orbital Satellite Rings & Data Arcs on Intersecting Axes
      orbitRings.forEach((ring) => {
        const ringRadius = sphereRadius * ring.radiusMult;
        const currentRot = time * ring.rotSpeed;

        ctx.save();
        ctx.translate(cx, cy);

        // 3D rotation transform using matrix approximation
        const cosY = Math.cos(ring.tiltY + currentRot * 0.3);
        const sinY = Math.sin(ring.tiltY + currentRot * 0.3);
        const cosX = Math.cos(ring.tiltX);
        const sinX = Math.sin(ring.tiltX);

        // Draw elliptical orbital path with segments
        ctx.beginPath();
        const segments = 64;
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          const x0 = Math.cos(theta) * ringRadius;
          const y0 = Math.sin(theta) * ringRadius;

          const x1 = x0 * cosY;
          const y1 = y0 * cosX - x0 * sinY * sinX;

          if (s === 0) {
            ctx.moveTo(x1, y1);
          } else {
            ctx.lineTo(x1, y1);
          }
        }

        ctx.strokeStyle = `${ring.color} 0.35)`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // Overlay glowing data arc segment
        const arcStart = currentRot * 1.8;
        ctx.beginPath();
        for (let s = 0; s <= 24; s++) {
          const theta = arcStart + (s / 24) * 1.4;
          const x0 = Math.cos(theta) * ringRadius;
          const y0 = Math.sin(theta) * ringRadius;
          const x1 = x0 * cosY;
          const y1 = y0 * cosX - x0 * sinY * sinX;
          if (s === 0) ctx.moveTo(x1, y1);
          else ctx.lineTo(x1, y1);
        }
        ctx.strokeStyle = `${ring.color} 0.95)`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = 'rgba(100, 149, 237, 0.9)';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Satellites along the ring
        for (let sat = 0; sat < ring.satCount; sat++) {
          const satAngle = currentRot * 2.2 + (sat / ring.satCount) * Math.PI * 2;
          const sx0 = Math.cos(satAngle) * ringRadius;
          const sy0 = Math.sin(satAngle) * ringRadius;
          const sx1 = sx0 * cosY;
          const sy1 = sy0 * cosX - sx0 * sinY * sinX;
          const sz1 = sy0 * sinX + sx0 * sinY * cosX;

          const satAlpha = sz1 > -20 ? 0.95 : 0.4;

          // Satellite beacon dot
          ctx.beginPath();
          ctx.arc(sx1, sy1, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${satAlpha})`;
          ctx.shadowColor = 'rgba(100, 149, 237, 1)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Subtle ping wave
          const pingPhase = (time * 0.05 + sat) % 1;
          ctx.beginPath();
          ctx.arc(sx1, sy1, 2.5 + pingPhase * 9, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(100, 149, 237, ${(1 - pingPhase) * 0.65 * satAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();
      });

      // 5. Data Transmission Pulse Arcs across Surface Nodes
      transmissionPulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.angle1 = Math.random() * Math.PI * 2;
          pulse.angle2 = (pulse.angle1 + 1.2 + Math.random() * 2.2) % (Math.PI * 2);
        }

        const r1 = sphereRadius * 0.96;
        const r2 = sphereRadius * 0.96;
        const x1 = cx + Math.cos(pulse.angle1) * r1;
        const y1 = cy + Math.sin(pulse.angle1) * r1 * 0.88;
        const x2 = cx + Math.cos(pulse.angle2) * r2;
        const y2 = cy + Math.sin(pulse.angle2) * r2 * 0.88;

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - sphereRadius * 0.22;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const t = pulse.progress;
        const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * midX + t * t * x2;
        const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * midY + t * t * y2;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
        ctx.shadowColor = 'rgba(100, 149, 237, 1)';
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const marqueeStats = [
    { value: '98%', label: 'client retention', context: 'TRUSTED PARTNER' },
    { value: '3x', label: 'average engagement lift', context: 'SOCIAL MEDIA' },
    { value: '12+', label: 'industries served', context: 'NEPAL & BEYOND' },
    { value: '10+', label: 'brands transformed', context: 'BLUE CODE' },
  ];

  const handleStartProject = () => {
    // Scroll directly to the on-page inquiry form with receipt generation
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBooking('01. Brand Identity');
    }
  };

  return (
    <section className="relative pt-20 sm:pt-22 lg:pt-24 pb-0 overflow-hidden flex flex-col justify-center">
      {/* Background subtle cosmic radial aura with Cornflower Blue (#6495ED) */}
      <div className="absolute top-1/4 right-0 sm:-right-16 -z-10 w-[540px] h-[540px] lg:w-[880px] lg:h-[880px] bg-gradient-to-b from-[#6495ED]/20 via-[#6495ED]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Split: Fit tightly without gap */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-10 pt-2 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: 2x ENLARGED Headline, Subtitle, Buttons */}
          <div className="md:col-span-1 lg:col-span-6 xl:col-span-6 space-y-5 lg:space-y-6 relative z-20">
            {/* 2x text size of Building Brands that Resonate.... */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.4rem] font-black tracking-tight text-white leading-[1.04]">
              <span>Building Brands that </span>
              {/* Changeable animated text strictly on SAME line after 'that', with #6495ED Cornflower Blue */}
              <span className="relative inline-block text-[#6495ED] whitespace-nowrap">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={changeableWords[wordIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    {changeableWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Sleek Cornflower Blue underline strictly below changeable contents */}
                <motion.span
                  layout
                  className="block w-full h-[4px] sm:h-[6px] bg-[#6495ED] rounded-full mt-1 sm:mt-1.5 transition-all duration-300"
                />
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed pt-1">
              We craft distinctive brand identities, print collateral, and full-stack software systems that captivate audiences and drive measurable commercial growth.
            </p>

            {/* Two CTA Buttons with Cornflower Blue Styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="group inline-flex items-center justify-center gap-2.5 px-8 h-13 rounded-full bg-[#6495ED] hover:bg-[#5383db] text-white text-base font-bold shadow-lg shadow-[#6495ED]/25 transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleStartProject}
                className="inline-flex items-center justify-center gap-2 px-8 h-13 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white text-base font-semibold transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <Send className="w-4 h-4 text-[#6495ED]" />
                <span>Inquiry Desk</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Tech Digital 3D Holographic Globe (2x size, tight fit without vertical gap) */}
          <div className="md:col-span-1 lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end overflow-visible relative z-10 lg:-mr-6 xl:-mr-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[720px] lg:h-[720px] xl:w-[860px] xl:h-[860px] max-w-none flex items-center justify-center group"
            >
              {/* High-Tech 3D Holographic Globe: 2x size, 100% clean transparent background, zero black dots or artifacts */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 90, ease: 'linear' },
                  scale: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                }}
                className="relative z-10 w-full h-full flex items-center justify-center select-none"
              >
                <img
                  src={holographicGlobeImg}
                  alt=""
                  aria-label="High-Tech Digital 3D Holographic Globe"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const origin = window.location.origin;
                    if (target.src !== origin + '/holographic-globe.png' && target.src !== '/holographic-globe.png') {
                      target.src = '/holographic-globe.png';
                    } else if (target.src !== origin + '/assets/holographic-globe.png' && target.src !== '/assets/holographic-globe.png') {
                      target.src = '/assets/holographic-globe.png';
                    }
                  }}
                  className="w-[96%] h-[96%] object-contain pointer-events-none drop-shadow-[0_0_50px_rgba(100,149,237,0.7)] transition-opacity duration-300 opacity-100"
                />
              </motion.div>

              {/* Interactive Live High-Tech Overlay Canvas:
                  - Rotating orbital satellite rings & data arcs on intersecting axes (Cornflower Blue #6495ED)
                  - Glowing satellite nodes & traveling laser pulses
                  - Ambient volumetric light rays & floating bokeh particle dust
              */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Marquee Statistics Strip (Fit snug without gap) */}
      <div className="mt-4 sm:mt-6 lg:mt-8 border-y border-slate-800 bg-[#0A0E1A]/80 backdrop-blur-xs py-3.5 overflow-hidden relative z-10">
        <div className="marquee">
          {[...marqueeStats, ...marqueeStats, ...marqueeStats].map((stat, idx) => (
            <div key={idx} className="flex items-baseline gap-4 mx-8 lg:mx-12 shrink-0">
              <span className="text-2xl lg:text-3xl font-bold tracking-tight text-[#6495ED]">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium">
                {stat.label}
                <span className="block text-[10px] font-semibold text-[#6495ED]/80 tracking-wider uppercase mt-0.5">
                  {stat.context}
                </span>
              </span>
              <span className="text-slate-700 ml-8 select-none">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
