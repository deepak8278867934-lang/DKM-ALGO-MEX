
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'dark' }) => {
  return (
    <div className={`flex items-center gap-1 sm:gap-3 ${className}`}>
      {/* 
         Logo Icon SVG - Updated Premium Color Palette:
         - Circular Curve (Gold) -> Market Cycle / Value
         - DK Text (Gold) -> Brand Identity
         - Candlestick Chart (Indigo) -> Stability / Logic
         - Upward Arrow (Cyan) -> Technology / Momentum
      */}
      <svg width="45" height="40" viewBox="0 0 130 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-sm sm:w-[65px] sm:h-[55px]">
         <defs>
            {/* Premium Gold Gradient for DK/Curve */}
            <linearGradient id="goldMetal" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FDE047" /> {/* Yellow 300 */}
                <stop offset="0.5" stopColor="#EAB308" /> {/* Yellow 500 */}
                <stop offset="1" stopColor="#A16207" /> {/* Yellow 700 */}
            </linearGradient>
            
            {/* Deep Indigo Gradient for Candles */}
            <linearGradient id="indigoCandle" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#818CF8" /> {/* Indigo 400 */}
                <stop offset="1" stopColor="#312E81" /> {/* Indigo 900 */}
            </linearGradient>

            {/* Electric Cyan Gradient for Arrow */}
            <linearGradient id="cyanArrow" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#22D3EE" /> {/* Cyan 400 */}
                <stop offset="1" stopColor="#0891B2" /> {/* Cyan 600 */}
            </linearGradient>
         </defs>

         {/* 1. Circular Curve (Market Cycle) - Gold */}
         <path 
            d="M 35 90 C 5 90, -5 40, 40 15 L 45 20 C 15 40, 20 80, 40 82 L 35 90 Z" 
            fill="url(#goldMetal)" 
         />

         {/* 2. DK Letter (Behind the candles) - Gold */}
         <text 
            x="28" 
            y="75" 
            fontFamily="Arial, sans-serif" 
            fontWeight="900" 
            fontSize="38" 
            fill="url(#goldMetal)"
            style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}
         >
             DK
         </text>

         {/* 3. Candlestick Chart Elements (Foreground - Indigo) */}
         {/* Candle 1 (Bearish/Small) */}
         <line x1="82" y1="55" x2="82" y2="85" stroke="#6366F1" strokeWidth="2" />
         <rect x="78" y="60" width="8" height="20" rx="1" fill="#6366F1" />

         {/* Candle 2 (Bullish/Large - Rising) */}
         <line x1="98" y1="25" x2="98" y2="80" stroke="#4338CA" strokeWidth="2" />
         <rect x="94" y="35" width="8" height="35" rx="1" fill="url(#indigoCandle)" />

         {/* 4. Upward Arrow (Cyan - Technology) */}
         <path 
            d="M 15 85 C 35 85, 50 80, 115 15" 
            stroke="url(#cyanArrow)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            fill="none" 
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(34, 211, 238, 0.4))' }}
         />
         {/* Arrow Head */}
         <path 
            d="M 115 15 L 95 20 M 115 15 L 110 35" 
            stroke="url(#cyanArrow)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
         />
      </svg>
      
      {/* Typography Section */}
      <div className="flex flex-col justify-center select-none relative">
          {/* Main Brand Line: DKM ALGO */}
          <div className="flex items-baseline relative">
              <span className="text-[18px] sm:text-[32px] font-black tracking-tighter" style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  background: 'linear-gradient(180deg, #FDE047 20%, #A16207 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))'
              }}>
                  DKM
              </span>
              
              <span className="text-[18px] sm:text-[32px] font-black tracking-tighter ml-1 sm:ml-1.5" style={{
                   fontFamily: 'system-ui, -apple-system, sans-serif',
                   background: 'linear-gradient(180deg, #818CF8 0%, #312E81 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
              }}>
                  ALGO
              </span>

              {/* Centered 'Max' Signature - Now exactly in the middle below DKM ALGO */}
              <span className="absolute -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 text-[16px] sm:text-[26px] whitespace-nowrap" style={{ 
                  fontFamily: '"Kaushan Script", cursive',
                  color: '#22D3EE',
                  transform: 'translateX(-50%) rotate(-3deg)',
                  textShadow: '0px 2px 4px rgba(0,0,0,0.3), 0px 0px 8px rgba(34, 211, 238, 0.4)',
                  zIndex: 10
              }}>
                  Max
              </span>
          </div>
          
          {/* Spacer div to prevent layout collapse due to absolute 'Max' */}
          <div className="h-2 sm:h-4"></div>
      </div>
    </div>
  );
};
