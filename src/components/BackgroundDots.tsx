import React, { useEffect, useRef } from 'react';

interface BackgroundDotsProps {
  isDark?: boolean;
}

export const BackgroundDots: React.FC<BackgroundDotsProps> = () => {
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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const spacing = 32; // Responsive clean grid spacing
    let time = 0;

    // Fixed deterministic pseudo-random seeds per grid point
    const dotSeeds: Record<string, number> = {};
    const getDotData = (x: number, y: number) => {
      const key = `${x},${y}`;
      if (!dotSeeds[key]) {
        dotSeeds[key] = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453);
      }
      return {
        seed: dotSeeds[key],
      };
    };

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      // Soft vertical vignette: Keep dots clear across sections
      const pageHeight = Math.max(height, 800);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dotData = getDotData(i, j);

          // Subtle interactive proximity to cursor
          let dist = 1000;
          if (isMouseActive) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            dist = Math.sqrt(dx * dx + dy * dy);
          }

          // Gentle vertical mask so dots are crisp without obstructing content
          const normalizedY = y / pageHeight;
          const maskAlpha = 0.55 + Math.sin(normalizedY * Math.PI) * 0.45;

          if (dist < 140) {
            // Interactive mouse hover reaction with Cornflower Blue glow
            const proximityFactor = 1 - dist / 140;
            const dotSize = 1.0 + proximityFactor * 1.6;
            const alpha = 0.25 + proximityFactor * 0.65;

            ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
            ctx.shadowColor = 'rgba(100, 149, 237, 0.6)';
            ctx.shadowBlur = 6 * proximityFactor;

            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
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
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
};
