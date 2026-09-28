import React from 'react';

/**
 * SPIS SparklineChart Component
 * Minimalist trend line for stat cards, metrics, and compact tables.
 */
export default function SparklineChart({
  data = [50, 55, 52, 60, 68, 74, 78],
  color = '#EF4444',
  fillColor,
  width = 84,
  height = 34,
  strokeWidth = 2,
  className = '',
}) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 3;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((val - min) / range) * chartHeight;
    return { x, y };
  });

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    linePath += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className={`inline-block flex-shrink-0 select-none ${className}`}>
      <svg width={width} height={height} className="overflow-visible block">
        <defs>
          <linearGradient id={`spark-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor || color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={fillColor || color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradient fill */}
        <path
          d={areaPath}
          fill={`url(#spark-grad-${color.replace('#', '')})`}
        />

        {/* Smooth trend curve */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ending dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={2.5}
          fill={color}
          stroke="#0D1527"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
