import React from 'react';

/**
 * SPIS Logo Component
 * Matches the official Societal Polarization Intelligence System branding.
 * Supports horizontal (sidebar/header), vertical (auth/splash), and icon-only variants.
 */
export default function Logo({
  variant = 'horizontal',
  size = 'md',
  showSubtitle = true,
  className = '',
}) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg font-extrabold',
    lg: 'text-2xl font-black',
    xl: 'text-3xl font-black',
  };

  const subtitleSizes = {
    sm: 'text-[7px]',
    md: 'text-[8px]',
    lg: 'text-[10px]',
    xl: 'text-xs',
  };

  // Modern SVG Radar/Compass Reticle matching the SPIS brand mark
  const LogoIcon = () => (
    <div
      className={`${iconSizes[size] || iconSizes.md} rounded-xl bg-gradient-to-br from-[#00E590] via-[#00D284] to-[#009E60] p-[2px] flex items-center justify-center shadow-lg shadow-[#00D284]/25 flex-shrink-0`}
    >
      <div className="w-full h-full rounded-[10px] bg-[#00D284] flex items-center justify-center text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[70%] h-[70%]"
        >
          {/* Compass / Radar target circle with needle */}
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <polygon points="12 4 14.5 10.5 20 12 14.5 13.5 12 20 9.5 13.5 4 12 9.5 10.5 12 4" fill="white" />
          <circle cx="12" cy="12" r="1.5" fill="#00D284" />
        </svg>
      </div>
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoIcon />
        <span className={`mt-3 ${titleSizes[size]} text-white tracking-wider font-sans`}>
          SPIS
        </span>
        {showSubtitle && (
          <span
            className={`mt-1 ${subtitleSizes[size]} font-semibold text-[#00D284] tracking-[0.2em] uppercase`}
          >
            Societal Polarization Intelligence System
          </span>
        )}
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col leading-tight min-w-0">
        <span className={`${titleSizes[size]} text-white tracking-wider font-sans`}>
          SPIS
        </span>
        {showSubtitle && (
          <span
            className={`${subtitleSizes[size]} font-semibold text-emerald-400/90 tracking-widest uppercase truncate`}
          >
            Societal Polarization Intelligence System
          </span>
        )}
      </div>
    </div>
  );
}
