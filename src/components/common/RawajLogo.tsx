import React from 'react';

interface RawajLogoProps {
  className?: string;
  size?: number; // pixel height/width
}

export const RawajLogo: React.FC<RawajLogoProps> = ({ 
  className = "h-10 w-auto", 
}) => {
  return (
    <svg 
      viewBox="0 0 240 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="رواج للطباعة والإعلان والديكور"
    >
      {/* Background glow or subtle contrast if dark mode */}
      
      {/* Red Calligraphic Ribbon / Flowing Swoosh */}
      <path 
        d="M 95,85 C 75,50 90,25 102,28 C 118,32 80,75 140,110 C 185,135 210,175 200,210 C 190,245 155,270 120,270 C 138,265 178,245 182,212 C 188,180 162,150 125,128 C 85,105 110,65 95,85 Z" 
        fill="var(--rawaj-primary, #B9142D)" 
      />

      {/* Main Central Vertical Stroke (Alif / Lam / Ra axis) */}
      <path 
        d="M 112,12 L 122,10 C 121,35 119,80 119,135 C 119,170 118,220 118,255 C 118,272 105,282 82,285 C 95,282 106,275 106,258 L 107,135 C 107,80 109,35 112,12 Z" 
        fill="currentColor" 
      />

      {/* Upper Loop of 'Waaw' & 'Jeem' Calligraphy */}
      <path 
        d="M 115,120 C 85,115 65,135 68,155 C 72,175 95,178 115,168 C 100,165 82,162 80,150 C 78,138 92,128 115,130 Z" 
        fill="currentColor" 
      />

      {/* Sweeping Main Body of 'Rawaj' Calligraphy */}
      <path 
        d="M 172,160 C 160,195 130,225 95,242 C 60,258 20,255 12,252 C 45,254 85,248 118,230 C 145,215 162,192 168,172 C 152,190 128,212 92,228 C 65,240 38,242 18,240 C 52,242 88,232 118,212 C 142,196 158,175 162,162 L 172,160 Z" 
        fill="currentColor" 
      />

      {/* Lower Loop & Swash */}
      <path 
        d="M 188,270 C 150,285 105,288 65,280 C 100,285 145,282 180,268 C 185,266 188,268 188,270 Z" 
        fill="currentColor" 
      />

      {/* Red Dot for 'Jeem' */}
      <circle cx="120" cy="212" r="9" fill="var(--rawaj-primary, #B9142D)" />
    </svg>
  );
};
