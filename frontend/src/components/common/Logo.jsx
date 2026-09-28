import React from 'react';

// SPIS logo as pure code (inline SVG). No image file needed.
// Native size is 80x80. The glow under the tile overflows the box, so the
// SVG has overflow: visible. Pass `size` to scale it.

export default function Logo({ size = 80, className, glow = true, radius = 6 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="38 13 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
      role="img"
      aria-label="SPIS logo"
    >
      {/* teal tile */}
      <rect x="38" y="13" width="80" height="80" rx={radius} fill="#00BFA5" />

      {/* soft teal glow beneath the tile (turn off with glow={false}) */}
      {glow && (
        <g filter="url(#spis-logo-glow)">
          <rect
            x="38"
            y="13"
            width="80"
            height="80"
            rx="12"
            fill="white"
            fillOpacity="0.01"
            shapeRendering="crispEdges"
          />
        </g>
      )}

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
      <path
        d="M65.1429 63.7779L73.0233 46.7222L91.1884 41.9231L83.3079 58.9789L65.1429 63.7779Z"
        fill="white"
      />

      {/* center pivot */}
      <rect x="75" y="49.7969" width="6" height="6" rx="3" fill="#00BFA5" />

      {glow && (
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
              values="0 0 0 0 0 0 0 0 0 0.74902 0 0 0 0 0.647059 0 0 0 0.2 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      )}
    </svg>
  );
}
