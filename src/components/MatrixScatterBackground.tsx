import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  char: string;
  size: number;
  opacity: number;
  baseOpacity: number;
  vx: number;
  vy: number;
  column: number;
}

export const MatrixScatterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -1000,
    y: -1000,
    active: false,
    radius: 170, // Cursor scatter blast radius
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Characters for digital matrix stream: clean code symbols, tech runes, hex characters
    const matrixChars = '01{}[]<>/;*+=~#_$%ABCDEFxyzλπψ';
    const fontSize = 14;
    const columns = Math.floor(width / 22);

    // Initialize particles falling in columns
    const particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 3400), 260);

    for (let i = 0; i < count; i++) {
      const col = Math.floor(Math.random() * columns);
      const x = col * 22 + Math.random() * 6;
      const y = Math.random() * height;
      const baseOpacity = 0.12 + Math.random() * 0.38; // Faded light blue opacity
      particles.push({
        x,
        y,
        speed: 1.2 + Math.random() * 2.2,
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        size: fontSize + (Math.random() > 0.85 ? 2 : 0),
        opacity: baseOpacity,
        baseOpacity,
        vx: 0,
        vy: 0,
        column: col,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Randomly mutate character periodically
        if (Math.random() < 0.02) {
          p.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }

        // Mouse interaction: calculate distance from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < mouse.radius && dist > 0) {
          // Scatter force pushes particle away from cursor
          const force = (1 - dist / mouse.radius) * 14;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
          // Temporarily flare brightness when disturbed by cursor
          p.opacity = Math.min(0.9, p.opacity + 0.3);
        }

        // Apply friction to velocity so scattered particles gradually calm down
        p.vx *= 0.90;
        p.vy *= 0.90;

        // Normal downward drift + current scattered velocity
        p.x += p.vx;
        p.y += p.speed + p.vy;

        // Soft return to column alignment when calm
        if (Math.abs(p.vx) < 0.2) {
          const targetX = p.column * 22 + 4;
          p.x += (targetX - p.x) * 0.02;
        }

        // Ease opacity back to base faded opacity
        if (p.opacity > p.baseOpacity) {
          p.opacity -= 0.015;
        }

        // Wrap around when particle falls off the bottom or sides
        if (p.y > height + 20) {
          p.y = -20;
          p.x = p.column * 22 + Math.random() * 6;
          p.vx = 0;
          p.vy = 0;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // Draw matrix character with Light Blue (#6495ED / #38BDF8 / #A5C9FF) glow
        ctx.save();
        ctx.font = `${p.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = `rgba(100, 149, 237, ${p.opacity})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.7)';
        ctx.shadowBlur = p.opacity > 0.4 ? 8 : 4;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Track mouse position over the entire parent section
    const targetEl = canvas.closest('section') || canvas.parentElement || window;

    const handleMouseMove = (e: MouseEvent | Event) => {
      const mouseEvent = e as MouseEvent;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Check if mouse is roughly inside or near the section viewport
      if (
        mouseEvent.clientY >= rect.top - 50 &&
        mouseEvent.clientY <= rect.bottom + 50 &&
        mouseEvent.clientX >= rect.left - 50 &&
        mouseEvent.clientX <= rect.right + 50
      ) {
        mouseRef.current.x = mouseEvent.clientX - rect.left;
        mouseRef.current.y = mouseEvent.clientY - rect.top;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 
        Tilted light-blue glassmorphism backdrop container:
        - Tilted plane via transform -rotate-3 or -skew-y-2
        - Radial subtle light blue gradient 
        - Frosted glassmorphism sheen
      */}
      <div className="absolute inset-[-10%] origin-center -rotate-3 scale-110 pointer-events-none">
        {/* Light blue soft tilt illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(100,149,237,0.18)_0%,rgba(56,189,248,0.08)_45%,rgba(6,9,19,0.0)_75%)]" />

        {/* Shiny diagonal glassmorphism light beam */}
        <div className="absolute -top-1/2 left-1/4 w-[600px] h-[180%] bg-gradient-to-r from-transparent via-cyan-400/[0.07] to-transparent rotate-25 blur-2xl pointer-events-none" />

        {/* Diagonal specular edge lines for authentic tilted glass prism feel */}
        <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-[#6495ED]/25 to-transparent -rotate-6" />
        <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent -rotate-3" />
      </div>

      {/* Interactive Canvas for falling and scattering code matrix */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90"
      />

      {/* Subtle vignette blend to seamlessly merge into the dark section */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#060913] via-transparent to-[#060913] opacity-80" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#060913]/90 via-transparent to-[#060913]/90" />
    </div>
  );
};
