import React, { useEffect, useRef } from 'react';

interface BackgroundDotsProps {
  isDark?: boolean;
}

export const BackgroundDots: React.FC<BackgroundDotsProps> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dot grid configuration
    const spacing = 28; // Distance between dots
    const hoverRadius = 110; // Proximity to trigger subtle thin blue effect

    // Store transient energy/decay values for interactive hover trails
    // Map key: "col_row" -> energy: number (0 to 1), seed: number
    const dotEnergyMap = new Map<string, { energy: number; seed: number }>();

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      time += 0.04;

      for (let r = 0; r < rows; r++) {
        const y = r * spacing;

        // Vertical mask: Fade out near extreme top (0 - 15%) and bottom (85% - 100%)
        const normY = y / height;
        let verticalMask = 1;
        if (normY < 0.15) {
          verticalMask = Math.max(0, normY / 0.15);
        } else if (normY > 0.85) {
          verticalMask = Math.max(0, (1 - normY) / 0.15);
        }

        // Apply smooth sine easing for the vertical mask
        const maskAlpha = Math.sin(verticalMask * Math.PI * 0.5);
        if (maskAlpha <= 0.01) continue;

        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const key = `${c}_${r}`;

          let dotData = dotEnergyMap.get(key);
          if (!dotData) {
            dotData = { energy: 0, seed: (c * 17 + r * 31) % 100 };
            dotEnergyMap.set(key, dotData);
          }

          // Check proximity to cursor
          let targetEnergy = 0;
          if (mouseActive) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < hoverRadius) {
              // Smooth quadratic falloff
              const normDist = dist / hoverRadius;
              targetEnergy = (1 - normDist) * (1 - normDist);
            }
          }

          // Smoothly ramp up on hover, decay gracefully when cursor leaves
          if (targetEnergy > dotData.energy) {
            dotData.energy = dotData.energy + (targetEnergy - dotData.energy) * 0.35;
          } else {
            dotData.energy *= 0.92; // Decay trail
          }

          const hasEnergy = dotData.energy > 0.015;

          if (hasEnergy) {
            // Small and thin blue hover animation matching reference
            const blinkPulse = Math.sin(time * 7 + dotData.seed) * 0.3 + 0.7;
            const activeAlpha = dotData.energy * maskAlpha * blinkPulse;

            // 1. Thin delicate outer ring on active hover (no big blur blob)
            if (dotData.energy > 0.15) {
              const ringRadius = 2.4 + dotData.energy * 1.6;
              ctx.beginPath();
              ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
              ctx.lineWidth = 0.65;
              ctx.strokeStyle = `rgba(100, 149, 237, ${activeAlpha * 0.75})`;
              ctx.shadowBlur = 0;
              ctx.stroke();
            }

            // 2. Small, crisp core blue dot (thin & precise)
            const coreRadius = 1.1 + dotData.energy * 0.5; // only 1.1px to 1.6px
            ctx.beginPath();
            ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 149, 237, ${Math.min(activeAlpha * 1.2, 1)})`;
            ctx.shadowBlur = 0;
            ctx.fill();
          } else {
            // Idle background dot (small, clean, quiet, masked vertically)
            const isAmbient = dotData.seed % 42 === 0;
            let dotAlpha = 0.16 * maskAlpha;

            if (isAmbient) {
              const ambientBlink = Math.sin(time * 2.5 + dotData.seed) * 0.5 + 0.5;
              if (ambientBlink > 0.75) {
                dotAlpha += (ambientBlink - 0.75) * 0.35 * maskAlpha;
                ctx.fillStyle = `rgba(100, 149, 237, ${dotAlpha})`;
              } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
              }
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
            }

            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(x, y, 0.85, 0, Math.PI * 2); // Thin, small dot
            ctx.fill();
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameId.current);
    };
  }, [isDark]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 90%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
