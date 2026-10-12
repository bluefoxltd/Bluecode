import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface OrbitItem {
  name: string;
  category: string;
  iconBg: string;
  glowColor: string;
  badge: string;
  svg: React.ReactNode;
}

// Design & Creative Suite (Outer Ring)
const designTools: OrbitItem[] = [
  {
    name: 'Figma',
    category: 'UI/UX & Systems',
    iconBg: '#0D1117',
    glowColor: '#F24E1E',
    badge: 'Design',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    category: 'Digital Imaging',
    iconBg: '#001E36',
    glowColor: '#31A8FF',
    badge: 'Photo',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#001E36" />
        <text x="4" y="17" fill="#31A8FF" fontSize="13" fontWeight="bold" fontFamily="system-ui">Ps</text>
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    category: 'Vector Branding',
    iconBg: '#330000',
    glowColor: '#FF9A00',
    badge: 'Vector',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#330000" />
        <text x="4" y="17" fill="#FF9A00" fontSize="13" fontWeight="bold" fontFamily="system-ui">Ai</text>
      </svg>
    ),
  },
  {
    name: 'Premiere Pro',
    category: 'Video Production',
    iconBg: '#00005B',
    glowColor: '#9999FF',
    badge: 'Video',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00005B" />
        <text x="4.5" y="17" fill="#9999FF" fontSize="13" fontWeight="bold" fontFamily="system-ui">Pr</text>
      </svg>
    ),
  },
  {
    name: 'After Effects',
    category: 'Motion Design & VFX',
    iconBg: '#00005B',
    glowColor: '#D291FF',
    badge: 'Motion',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00005B" />
        <text x="4" y="17" fill="#D291FF" fontSize="13" fontWeight="bold" fontFamily="system-ui">Ae</text>
      </svg>
    ),
  },
  {
    name: 'Blender 3D',
    category: '3D CGI Modeling',
    iconBg: '#0C1628',
    glowColor: '#EA7600',
    badge: '3D CGI',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 256 208" fill="none">
        {/* Official Blender Logo */}
        {/* Top 3 arms / prongs */}
        <ellipse cx="61" cy="74" rx="27" ry="12.5" transform="rotate(-38 61 74)" fill="#EA7600" />
        <ellipse cx="127" cy="48" rx="12.5" ry="27" fill="#EA7600" />
        <ellipse cx="195" cy="74" rx="27" ry="12.5" transform="rotate(38 195 74)" fill="#EA7600" />
        {/* Outer Orange Body Ring */}
        <path
          d="M128 65C83.82 65 48 100.82 48 145c0 44.18 35.82 59 80 59s80-14.82 80-59c0-44.18-35.82-80-80-80z"
          fill="#EA7600"
        />
        {/* Inner White Cutout */}
        <circle cx="128" cy="145" r="48" fill="#FFFFFF" />
        {/* Center Blue Eye */}
        <circle cx="128" cy="145" r="26" fill="#265787" />
      </svg>
    ),
  },
  {
    name: 'CorelDRAW',
    category: 'Vector Graphics',
    iconBg: '#081E15',
    glowColor: '#00B050',
    badge: 'Vector',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 100 100" fill="none">
        {/* Official CorelDRAW Green Balloon Logo */}
        <defs>
          <radialGradient id="cdrawGlow" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#7EE787" />
            <stop offset="45%" stopColor="#22C55E" />
            <stop offset="85%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#0B4620" />
          </radialGradient>
          <linearGradient id="cdrawHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cdrawBasket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Hot Air Balloon Envelope */}
        <path
          d="M50 4 C24 4 6 22 6 45 C6 62 25 76 43 85 L44 89 L56 89 L57 85 C75 76 94 62 94 45 C94 22 76 4 50 4 Z"
          fill="url(#cdrawGlow)"
        />
        {/* Curvature ribs / sections */}
        <path
          d="M50 4 C38 4 28 22 28 45 C28 62 38 78 45 86"
          stroke="#166534"
          strokeWidth="2.5"
          fill="none"
          strokeOpacity="0.75"
        />
        <path
          d="M50 4 C62 4 72 22 72 45 C72 62 62 78 55 86"
          stroke="#166534"
          strokeWidth="2.5"
          fill="none"
          strokeOpacity="0.75"
        />
        <line x1="50" y1="4" x2="50" y2="88" stroke="#166534" strokeWidth="2.2" strokeOpacity="0.6" />
        {/* Specular light sheen */}
        <path
          d="M26 14 C16 22 12 34 13 46 C14 36 21 24 33 16 C38 12 44 9 50 8 C40 8 32 10 26 14 Z"
          fill="url(#cdrawHighlight)"
        />
        {/* Balloon Basket Ropes */}
        <line x1="45" y1="89" x2="43" y2="94" stroke="#D97706" strokeWidth="1.8" />
        <line x1="55" y1="89" x2="57" y2="94" stroke="#D97706" strokeWidth="1.8" />
        {/* Basket */}
        <rect x="42" y="93" width="16" height="5" rx="1.5" fill="url(#cdrawBasket)" />
      </svg>
    ),
  },
  {
    name: 'Meta Ads',
    category: 'Performance Marketing',
    iconBg: '#0A152E',
    glowColor: '#0081FB',
    badge: 'Campaigns',
    svg: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
        {/* Official Meta Infinity Symbol Gradient */}
        <defs>
          <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0064E0" />
            <stop offset="50%" stopColor="#0081FB" />
            <stop offset="100%" stopColor="#00C4FF" />
          </linearGradient>
        </defs>
        <path
          d="M6.88 5C4.24 5 2.1 6.83 2 9.53c-.11 2.97 1.83 5.48 4.2 7.74 1.54 1.47 3.23 2.73 5.05 3.73.47.26 1.03.26 1.5 0 1.82-1 3.51-2.26 5.05-3.73 2.37-2.26 4.31-4.77 4.2-7.74C21.9 6.83 19.76 5 17.12 5c-2.3 0-4.08 1.42-5.12 3.28C10.96 6.42 9.18 5 6.88 5zm0 2.5c1.47 0 2.76 1.15 3.54 2.87.27.6.51 1.25.72 1.94-.55.6-1.16 1.15-1.8 1.63-1.63 1.23-3.23 1.96-4.22 1.12-.96-.82-1.12-2.39-1.07-3.77.06-1.92 1.34-3.79 2.83-3.79zm10.24 0c1.49 0 2.77 1.87 2.83 3.79.05 1.38-.11 2.95-1.07 3.77-.99.84-2.59.11-4.22-1.12-.64-.48-1.25-1.03-1.8-1.63.21-.69.45-1.34.72-1.94.78-1.72 2.07-2.87 3.54-2.87z"
          fill="url(#metaGrad)"
        />
      </svg>
    ),
  },
];

// Full-Stack Tech Stack (Inner Ring)
const techStack: OrbitItem[] = [
  {
    name: 'React 19',
    category: 'Frontend Architecture',
    iconBg: '#09182A',
    glowColor: '#61DAFB',
    badge: 'UI Engine',
    svg: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Server Framework',
    iconBg: '#05070D',
    glowColor: '#FFFFFF',
    badge: 'Full Stack',
    svg: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.6" />
        <path d="M8 8v8l8-9.5V16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Strict Type System',
    iconBg: '#0B1C33',
    glowColor: '#3178C6',
    badge: 'Typed',
    svg: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" fillOpacity="0.3" stroke="#3178C6" strokeWidth="1.4" />
        <text x="5" y="17" fill="#3178C6" fontSize="13" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Modern Utility Styling',
    iconBg: '#091D26',
    glowColor: '#38BDF8',
    badge: 'Styling',
    svg: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path d="M12 6c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.25-2 3.75-1.5 1 .33 1.7 1.05 2.5 1.85C15 12.1 16.5 13.5 19.5 13.5c3 0 4.5-1.5 4.5-4.5-1 1.5-2.25 2-3.75 1.5-1-.33-1.7-1.05-2.5-1.85C16.5 7.4 15 6 12 6zM4.5 12c-3 0-4.5 1.5-4.5 4.5 1-1.5 2.25-2 3.75-1.5 1 .33 1.7 1.05 2.5 1.85C7.5 18.1 9 19.5 12 19.5c3 0 4.5-1.5 4.5-4.5-1 1.5-2.25 2-3.75 1.5-1-.33-1.7-1.05-2.5-1.85C9 13.4 7.5 12 4.5 12z" fill="#38BDF8"/>
      </svg>
    ),
  },
  {
    name: 'Three.js',
    category: '3D WebGL Engine',
    iconBg: '#111422',
    glowColor: '#00E5FF',
    badge: 'WebGL',
    svg: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        {/* Official Three.js Geometric Delta Logo */}
        <path
          d="M4.5 20.2L12 4l7.5 16.2H4.5z"
          stroke="#00E5FF"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="#00E5FF"
          fillOpacity="0.15"
        />
        <path
          d="M12 4l3.8 16.2M12 4L8.2 20.2M4.5 20.2l11.3-8M19.5 20.2l-11.3-8"
          stroke="#00E5FF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="4" r="1.5" fill="#FFFFFF" />
        <circle cx="4.5" cy="20.2" r="1.5" fill="#FFFFFF" />
        <circle cx="19.5" cy="20.2" r="1.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Python & AI',
    category: 'Intelligent Automation',
    iconBg: '#0F1E2E',
    glowColor: '#FFD43B',
    badge: 'AI Core',
    svg: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-5 1.3-5 3.3v2.2h5v.8H5.6C3.6 8.3 2 9.9 2 12.3c0 2.4 1.7 4 3.7 4h1.7v-2.1c0-2.3 2-4.2 4.3-4.2h5V7.7C16.7 4.5 14.5 2 11.9 2z" fill="#387EB8"/>
        <path d="M12.1 22c3.1 0 5-1.3 5-3.3v-2.2h-5v-.8h6.3c2 0 3.6-1.6 3.6-4 0-2.4-1.7-4-3.7-4h-1.7v2.1c0 2.3-2 4.2-4.3 4.2h-5v2.3C7.3 19.5 9.5 22 12.1 22z" fill="#FFE873"/>
      </svg>
    ),
  },
];

export const AtomicOrbitEcosystem: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<OrbitItem | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Outer ring radius (Design tools)
  const outerRadius = 250;
  // Inner ring radius (Tech stack)
  const innerRadius = 155;

  return (
    <div className="relative w-full py-6 flex flex-col items-center justify-center select-none overflow-visible">
      {/* Orbit Container: Transparent wrapper keeping only the atomic logos & orbital linings */}
      <div 
        className="relative w-[360px] h-[360px] sm:w-[580px] sm:h-[580px] md:w-[660px] md:h-[660px] flex items-center justify-center overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredItem(null);
        }}
      >
        {/* ======================================================== */}
        {/* SHINY GLASSMORPHISM ATOMIC ORBITAL SHELLS (SVG RINGS)   */}
        {/* ======================================================== */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 660 660"
        >
          <defs>
            {/* Shiny glass gradients */}
            <linearGradient id="orbitGlowOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6495ED" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#A259FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF7262" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="orbitGlowInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#6495ED" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>

            <radialGradient id="atomicCoreGradient" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#6495ED" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#0B132B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#060913" stopOpacity="0.98" />
            </radialGradient>

            {/* Glass highlight filter */}
            <filter id="glassShine" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 3 Inclined Atomic Electron Orbits with subtle glass trace */}
          <ellipse
            cx="330"
            cy="330"
            rx="300"
            ry="115"
            fill="none"
            stroke="rgba(100, 149, 237, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            transform="rotate(35 330 330)"
          />

          <ellipse
            cx="330"
            cy="330"
            rx="300"
            ry="115"
            fill="none"
            stroke="rgba(0, 229, 255, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            transform="rotate(-35 330 330)"
          />

          <ellipse
            cx="330"
            cy="330"
            rx="300"
            ry="115"
            fill="none"
            stroke="rgba(162, 89, 255, 0.28)"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            transform="rotate(90 330 330)"
          />

          {/* Outer Ring: Design & Creative Suite Shell */}
          <circle
            cx="330"
            cy="330"
            r={outerRadius}
            fill="none"
            stroke="url(#orbitGlowOuter)"
            strokeWidth="2"
            strokeDasharray="9 7"
            className="opacity-80"
          />

          {/* Inner Ring: Full-Stack Tech Stack Shell */}
          <circle
            cx="330"
            cy="330"
            r={innerRadius}
            fill="none"
            stroke="url(#orbitGlowInner)"
            strokeWidth="2"
            strokeDasharray="7 5"
            className="opacity-90"
          />

          {/* Core Energy Glass Circle */}
          <circle
            cx="330"
            cy="330"
            r="72"
            fill="url(#atomicCoreGradient)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.8"
          />
        </svg>

        {/* Central Atomic Nucleus: Shiny Glassmorphism sphere */}
        <div className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-auto cursor-pointer p-4 rounded-full bg-[#080E24]/80 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(100,149,237,0.45),inset_0_2px_4px_rgba(255,255,255,0.4)] w-[120px] h-[120px] sm:w-[145px] sm:h-[145px]">
          {/* Glass specular sheen at top-left */}
          <div className="absolute top-2 left-4 w-10 h-4 bg-white/20 rounded-full blur-[1px] rotate-[-25deg] pointer-events-none" />
          
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-[#6495ED]/30 blur-md animate-ping opacity-70" />
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#6495ED] via-[#38BDF8] to-[#FFFFFF] flex items-center justify-center text-slate-950 shadow-lg font-bold">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900 animate-spin-slow" />
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white mt-2 drop-shadow-sm">
            Atomic Core
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#6495ED] font-mono font-semibold">
            Blue Code Lab
          </span>
        </div>

        {/* ======================================================== */}
        {/* REVOLVING OUTER ORBIT: DESIGN & CREATIVE SUITE (8 LOGOS) */}
        {/* Circular glass nodes replacing the square cards          */}
        {/* ======================================================== */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          animate={{ rotate: isPaused ? undefined : 360 }}
          transition={{
            repeat: Infinity,
            duration: 38,
            ease: 'linear',
          }}
          style={{ willChange: 'transform' }}
        >
          {designTools.map((tool, idx) => {
            const angle = (idx / designTools.length) * 2 * Math.PI;
            // Center is (330, 330)
            const percentX = 50 + (outerRadius / 330) * 50 * Math.cos(angle);
            const percentY = 50 + (outerRadius / 330) * 50 * Math.sin(angle);

            return (
              <div
                key={`outer-${tool.name}`}
                className="absolute pointer-events-auto"
                style={{
                  left: `${percentX}%`,
                  top: `${percentY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Counter-rotate logo so icons remain upright and readable */}
                <motion.div
                  animate={{ rotate: isPaused ? undefined : -360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 38,
                    ease: 'linear',
                  }}
                  onMouseEnter={() => setHoveredItem(tool)}
                  className="relative group cursor-pointer"
                >
                  {/* Glowing atomic electron aura */}
                  <div
                    className="absolute -inset-2.5 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: tool.glowColor }}
                  />

                  {/* ENLARGED SHINY GLASS CIRCULAR NODE (Replaced square card with circle) */}
                  <div
                    className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center p-3 sm:p-3.5 bg-gradient-to-b from-[#18233C]/90 to-[#0A1124]/90 backdrop-blur-xl border border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.35)] group-hover:scale-125 group-hover:border-white transition-all duration-300 overflow-hidden"
                    style={{
                      boxShadow: `0 6px 25px -2px ${tool.glowColor}60, inset 0 2px 4px rgba(255,255,255,0.4)`,
                    }}
                  >
                    {/* Glass specular curved reflection line */}
                    <div className="absolute top-1 left-2.5 w-7 h-2.5 bg-white/25 rounded-full blur-[0.5px] rotate-[-20deg] pointer-events-none" />

                    {/* Enlarge Icon inside */}
                    <div className="relative z-10 flex items-center justify-center scale-110 sm:scale-120 drop-shadow-md">
                      {tool.svg}
                    </div>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center pointer-events-none z-40 whitespace-nowrap">
                    <div className="px-3 py-1.5 rounded-xl bg-[#050914]/95 border border-[#6495ED]/50 text-white shadow-2xl backdrop-blur-md">
                      <div className="text-xs font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.glowColor }} />
                        {tool.name}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                        {tool.category} · <span className="text-[#6495ED] font-bold">{tool.badge}</span>
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 bg-[#050914] border-r border-b border-[#6495ED]/50 rotate-45 -mt-1.5" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* ======================================================== */}
        {/* REVOLVING INNER ORBIT: FULL-STACK TECH STACK (6 LOGOS)   */}
        {/* Counter-Clockwise revolution with circular glass nodes   */}
        {/* ======================================================== */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          animate={{ rotate: isPaused ? undefined : -360 }}
          transition={{
            repeat: Infinity,
            duration: 26,
            ease: 'linear',
          }}
          style={{ willChange: 'transform' }}
        >
          {techStack.map((tool, idx) => {
            const angle = (idx / techStack.length) * 2 * Math.PI;
            const percentX = 50 + (innerRadius / 330) * 50 * Math.cos(angle);
            const percentY = 50 + (innerRadius / 330) * 50 * Math.sin(angle);

            return (
              <div
                key={`inner-${tool.name}`}
                className="absolute pointer-events-auto"
                style={{
                  left: `${percentX}%`,
                  top: `${percentY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Counter-rotate in reverse so inner icons stay upright */}
                <motion.div
                  animate={{ rotate: isPaused ? undefined : 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 26,
                    ease: 'linear',
                  }}
                  onMouseEnter={() => setHoveredItem(tool)}
                  className="relative group cursor-pointer"
                >
                  {/* Glowing atomic electron aura */}
                  <div
                    className="absolute -inset-2 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: tool.glowColor }}
                  />

                  {/* ENLARGED SHINY GLASS CIRCULAR NODE (Replaced square card with circle) */}
                  <div
                    className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center p-2.5 sm:p-3 bg-gradient-to-b from-[#15233E]/95 to-[#0B152B]/95 backdrop-blur-xl border border-cyan-400/40 shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.4)] group-hover:scale-125 group-hover:border-white transition-all duration-300 overflow-hidden"
                    style={{
                      boxShadow: `0 6px 22px -2px ${tool.glowColor}60, inset 0 2px 4px rgba(255,255,255,0.4)`,
                    }}
                  >
                    {/* Glass specular curved reflection line */}
                    <div className="absolute top-1 left-2 w-5 h-2 bg-white/30 rounded-full blur-[0.5px] rotate-[-20deg] pointer-events-none" />

                    {/* Enlarge Icon inside */}
                    <div className="relative z-10 flex items-center justify-center scale-110 sm:scale-120 drop-shadow-md">
                      {tool.svg}
                    </div>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center pointer-events-none z-40 whitespace-nowrap">
                    <div className="px-3 py-1.5 rounded-xl bg-[#050914]/95 border border-[#00E5FF]/50 text-white shadow-2xl backdrop-blur-md">
                      <div className="text-xs font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.glowColor }} />
                        {tool.name}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                        {tool.category} · <span className="text-[#00E5FF] font-bold">{tool.badge}</span>
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 bg-[#050914] border-r border-b border-[#00E5FF]/50 rotate-45 -mt-1.5" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Active inspect details bar (Clean, no uploaded/manual debug text) */}
      {hoveredItem && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-5 py-2.5 rounded-full bg-[#091122]/90 border border-[#6495ED]/40 text-xs sm:text-sm text-white flex items-center gap-3 backdrop-blur-xl shadow-2xl"
        >
          <div className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: hoveredItem.glowColor }} />
          <span>
            Active Orbit: <strong className="text-white">{hoveredItem.name}</strong> — {hoveredItem.category} ({hoveredItem.badge})
          </span>
        </motion.div>
      )}
    </div>
  );
};
