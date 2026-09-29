import React, { useState } from 'react';
import { Info } from 'lucide-react';

/**
 * SPIS DonutChart Component
 * Reusable donut / circular distribution chart with center callout and side breakdown.
 */

const DEFAULT_DISTRIBUTION_DATA = [
  { label: '0.80 – 1.00 (High)', value: 86, percent: 17.7, color: '#E91E63' },
  { label: '0.60 – 0.79 (Medium)', value: 164, percent: 33.7, color: '#3498DB' },
  { label: '0.40 – 0.59 (Low)', value: 156, percent: 32.1, color: '#2ECC71' },
  { label: '0.20 – 0.39 (Very Low)', value: 62, percent: 12.8, color: '#F39C12' },
  { label: '0.00 – 0.19 (Minimal)', value: 18, percent: 3.7, color: '#8A94A6' },
];

export default function DonutChart({
  data = DEFAULT_DISTRIBUTION_DATA,
  centerValue = '486',
  centerLabel = 'TOTAL',
  infoText = 'High bridge score indicates stronger ability to connect different communities.',
  size = 150,
  strokeWidth = 16,
  showSideLegend = true,
  showCenterCallout = true,
  showLegendValues = true,
  legendShape = 'circle',
  centered = false, // true: donut + legend sit together in the middle of the card
  className = '',
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  // Calculate cumulative offsets
  let cumulativePercent = 0;
  const slices = data.map((item, index) => {
    const itemPercent = item.percent || (item.value / (totalValue || 1)) * 100;
    const strokeDash = (itemPercent / 100) * circumference;
    const strokeOffset = (cumulativePercent / 100) * circumference;
    cumulativePercent += itemPercent;

    return {
      ...item,
      strokeDash,
      strokeOffset,
      index,
    };
  });

  return (
    <div className={`flex flex-col justify-between h-full select-none ${className}`}>
      {/* Chart & Legend Row */}
      <div
        className={`flex flex-col sm:flex-row items-center ${
          centered ? 'justify-center gap-8' : 'justify-between gap-4'
        }`}
      >
        {/* Donut SVG */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#1A2234"
              strokeWidth={strokeWidth}
            />

            {/* Value slices */}
            {slices.map((slice) => {
              const isHovered = hoveredIdx === slice.index;
              return (
                <circle
                  key={slice.index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={`${slice.strokeDash} ${circumference - slice.strokeDash}`}
                  strokeDashoffset={-slice.strokeOffset}
                  strokeLinecap="butt"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(slice.index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Callout */}
          {showCenterCallout && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-2xl font-bold text-white tracking-tight font-mono-numbers leading-tight">
                {hoveredIdx !== null ? data[hoveredIdx].value : centerValue}
              </span>
              <span className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wider">
                {hoveredIdx !== null ? 'COUNT' : centerLabel}
              </span>
            </div>
          )}
        </div>

        {/* Legend / Breakdown Table */}
        {showSideLegend && (
          <div className={`min-w-0 ${centered ? 'flex-none space-y-1' : 'flex-1 w-full space-y-1.5'}`}>
            {data.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-xs py-0.5 px-1.5 rounded transition-colors cursor-pointer ${
                    isHovered ? 'bg-[#151E32]' : 'hover:bg-[#151E32]/50'
                  }`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 flex-shrink-0 ${
                        legendShape === 'square' ? 'rounded-sm' : 'rounded-full'
                      }`}
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-300 truncate text-[11px] font-medium">
                      {item.label}
                    </span>
                  </div>
                  {showLegendValues && (
                    <div className="flex items-center gap-3 text-right flex-shrink-0 font-mono-numbers">
                      {item.value !== undefined && (
                        <span className="text-white font-medium text-[11px]">
                          {item.value}
                        </span>
                      )}
                      {item.percent !== undefined && (
                        <span className="text-[#8A94A6] text-[11px] w-9 text-right">
                          {item.percent}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Box at Bottom */}
      {infoText && (
        <div className="mt-4 p-2.5 rounded-lg bg-[#142222] border border-[#00BFA5]/25 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-[#00BFA5] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#00BFA5] leading-tight">
            {infoText}
          </p>
        </div>
      )}
    </div>
  );
}
