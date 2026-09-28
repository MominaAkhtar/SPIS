import React from 'react';

/**
 * SPIS CircularProgress / Gauge Component
 * Radial percentage indicator matching the polarization score & echo chamber gauges.
 */
export default function CircularProgress({
  value = 0,
  max = 100,
  size = 52,
  strokeWidth = 4.5,
  color = '#00BFA5',
  trackColor = '#152033',
  showLabel = true,
  labelSuffix = '%',
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Dynamic Progress Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center Label */}
      {showLabel && (
        <span
          className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono tracking-tight text-white select-none"
        >
          {Math.round(value)}{labelSuffix}
        </span>
      )}
    </div>
  );
}
