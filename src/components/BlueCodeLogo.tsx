import React from 'react';

interface BlueCodeLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const BlueCodeLogo: React.FC<BlueCodeLogoProps> = ({
  className = '',
  size = 44,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src="/bluecode.png"
        alt="Blue Code Agency"
        style={{ height: `${size}px` }}
        className="w-auto max-w-full object-contain drop-shadow-[0_2px_12px_rgba(0,140,255,0.35)] transition-transform duration-300 hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

