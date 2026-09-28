import React from 'react';

/**
 * SPIS Logo Component
 * Renders the official SPIS compass mark.
 * Supports:
 * - size: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * - animated: boolean (animates/rotates the compass needle)
 * - variant: 'icon' | 'horizontal'
 * - showSubtitle: boolean (for horizontal variant)
 * - tileRadius: corner radius of the teal square (default 16 to match brand specs)
 */
export default function Logo({
  size = 80,
  animated = false,
  variant = 'icon',
  showSubtitle = false,
  tileRadius = 16,
  className = '',
}) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 80,
    xl: 88,
  };

  const numericSize = typeof size === 'string' ? sizeMap[size] || 80 : size;

  const svgIcon = (
    <svg
      className={`select-none ${className}`}
      width={numericSize}
      height={numericSize}
      viewBox="38 13 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
      role="img"
      aria-label="SPIS logo"
    >
      {/* teal tile */}
      <rect x="38" y="13" width="80" height="80" rx={tileRadius} fill="#00BFA5" />

      {/* soft teal glow beneath the tile */}
      <g filter="url(#spis-logo-glow)">
        <rect
          x="38"
          y="13"
          width="80"
          height="80"
          rx={tileRadius}
          fill="white"
          fillOpacity="0.01"
          shapeRendering="crispEdges"
        />
      </g>

      {/* compass ring */}
      <rect
        x="50.5"
        y="25.2969"
        width="55"
        height="55"
        rx="27.5"
        fill="#00BFA5"
        stroke="white"
        strokeWidth="5"
      />

      {/* compass needle */}
      <g
        className={animated ? 'spis-needle-spin' : undefined}
        style={animated ? { transformBox: 'view-box', transformOrigin: '78.166px 52.85px' } : undefined}
      >
        <path
          d="M65.1429 63.7779L73.0233 46.7222L91.1884 41.9231L83.3079 58.9789L65.1429 63.7779Z"
          fill="white"
        />
        {animated && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 78.166 52.85"
            to="360 78.166 52.85"
            dur="3.5s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* center pivot */}
      <rect x="75" y="49.7969" width="6" height="6" rx="3" fill="#00BFA5" />

      <defs>
        <filter
          id="spis-logo-glow"
          x="0"
          y="0"
          width="156"
          height="156"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="12" operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
          <feOffset dy="25" />
          <feGaussianBlur stdDeviation="25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.74902 0 0 0 0 0.647059 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );

  if (variant === 'horizontal') {
    return (
      <div className="flex items-center gap-3">
        {svgIcon}
        <div className="flex flex-col">
          <span className="font-bold text-white text-base tracking-wide leading-tight">
            SPIS
          </span>
          {showSubtitle && (
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase leading-none mt-0.5">
              Societal Polarization Intelligence System
            </span>
          )}
        </div>
      </div>
    );
  }

  return svgIcon;
}