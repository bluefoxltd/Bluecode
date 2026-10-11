import React from 'react';

interface BlueCodeLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const BlueCodeLogo: React.FC<BlueCodeLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  textColor = 'text-[#002068]',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision 3D Vector SVG recreation of the Blue Code folded 'B' logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-sm"
      >
        <defs>
          {/* Main outer ribbon gradient (Cyan to Electric Blue) */}
          <linearGradient id="bc-gradient-primary" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="35%" stopColor="#0080FF" />
            <stop offset="70%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#002BC7" />
          </linearGradient>

          {/* Top curve ribbon accent */}
          <linearGradient id="bc-gradient-top" x1="20" y1="5" x2="85" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38E1FF" />
            <stop offset="60%" stopColor="#0091FF" />
            <stop offset="100%" stopColor="#0052FF" />
          </linearGradient>

          {/* 3D Fold depth shading */}
          <linearGradient id="bc-fold-shadow" x1="60" y1="20" x2="80" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0035A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#001868" stopOpacity="0.2" />
          </linearGradient>

          {/* Bottom lobe curve */}
          <linearGradient id="bc-gradient-bottom" x1="15" y1="50" x2="95" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#0047E0" />
            <stop offset="100%" stopColor="#0026A6" />
          </linearGradient>

          {/* Code bracket glow */}
          <linearGradient id="bc-code-gradient" x1="25" y1="35" x2="75" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C4FF" />
            <stop offset="100%" stopColor="#0084FF" />
          </linearGradient>
        </defs>

        {/* Outer stylized 3D 'B' body */}
        <path
          d="M14 18 C14 10, 22 5, 34 5 L62 5 C78 5, 88 15, 88 28 C88 38, 80 46, 68 49 C84 52, 94 62, 94 76 C94 89, 81 97, 65 97 L28 97 C18 97, 14 91, 14 82 Z"
          fill="url(#bc-gradient-primary)"
        />

        {/* 3D overlapping top loop bevel */}
        <path
          d="M14 18 C14 10, 22 5, 34 5 L62 5 C77 5, 86 14, 86 26 C86 37, 78 45, 66 48 C60 49, 48 50, 40 50 L14 50 Z"
          fill="url(#bc-gradient-top)"
        />

        {/* Shadow fold wedge where the ribbon folds inward */}
        <path
          d="M66 48 C76 44, 86 36, 86 26 C86 20, 80 12, 70 8 C76 16, 76 34, 62 47 Z"
          fill="url(#bc-fold-shadow)"
        />

        {/* Bottom loop fullness */}
        <path
          d="M14 50 L42 50 C58 50, 72 49, 78 54 C88 61, 92 70, 92 78 C92 88, 81 96, 66 96 L28 96 C18 96, 14 91, 14 82 Z"
          fill="url(#bc-gradient-bottom)"
        />

        {/* Crisp white inner negative space (leaf / conversation / code viewport shape) */}
        <path
          d="M22 25 L58 25 C68 25, 75 32, 75 42 C75 52, 68 59, 58 59 L29 59 C24 59, 22 63, 22 68 L22 82 C20 86, 16 90, 14 92 C15 84, 18 68, 18 55 C18 42, 19 30, 22 25 Z"
          fill="#FFFFFF"
        />

        {/* Second inner white counter for the bottom loop */}
        <path
          d="M26 28 L58 28 C67 28, 73 34, 73 42 C73 50, 67 56, 58 56 L38 56 C28 56, 22 62, 22 72 L22 78 C18 64, 20 42, 26 28 Z"
          fill="#FFFFFF"
        />

        {/* Dynamic Code Brackets: < / > inside the white chamber */}
        {/* Left angle bracket: < */}
        <path
          d="M39 39 L31 47 L39 55"
          stroke="url(#bc-code-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center forward slash: / */}
        <path
          d="M48 35 L42 59"
          stroke="url(#bc-code-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Right angle bracket: > */}
        <path
          d="M51 39 L59 47 L51 55"
          stroke="url(#bc-code-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <span className="flex items-baseline font-bold tracking-tight text-xl lg:text-2xl font-sans">
          <span className={textColor}>Blue</span>
          <span className="text-[#0052FF] ml-1">Code</span>
        </span>
      )}
    </div>
  );
};
