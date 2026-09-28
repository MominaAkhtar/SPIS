import React, { useState, useId } from 'react';

/**
 * SPIS Reusable LineChart Component
 * Supports single & dual series (Actual vs Forecast/Predicted), area gradients,
 * dashed forecast lines, node markers, gridlines, and interactive hover tooltips.
 */
export default function LineChart({
  data = [],
  series = [
    {
      key: 'actual',
      name: 'Actual Polarization',
      color: '#00C7FF',
      isArea: true,
      strokeWidth: 2.5,
    },
    {
      key: 'predicted',
      name: 'Predicted Risk / Forecast',
      color: '#00D284',
      isDashed: true,
      strokeDasharray: '4 4',
      showDots: true,
      isArea: true,
      strokeWidth: 2.5,
    },
  ],
  height = 280,
  yMin = 0,
  yMax = 100,
  yTicks = [0, 20, 40, 60, 80, 100],
  showGrid = true,
  className = '',
}) {
  const chartId = useId().replace(/:/g, '');
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center bg-[#09101C] rounded-xl border border-[#172338] text-slate-500 text-xs ${className}`}
        style={{ height }}
      >
        No telemetry data available.
      </div>
    );
  }

  // ViewBox layout dimensions
  const svgWidth = 800;
  const svgHeight = 280;
  const paddingLeft = 40;
  const paddingRight = 24;
  const paddingTop = 20;
  const paddingBottom = 34;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const getX = (index) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val) => {
    if (val === null || val === undefined || isNaN(val)) return null;
    const clamped = Math.max(yMin, Math.min(yMax, val));
    const ratio = (clamped - yMin) / (yMax - yMin);
    return paddingTop + chartHeight - ratio * chartHeight;
  };

  // Generate SVG path for series
  const generatePath = (key) => {
    const validPoints = [];
    data.forEach((d, idx) => {
      const val = d[key];
      if (val !== null && val !== undefined) {
        validPoints.push({ x: getX(idx), y: getY(val), index: idx });
      }
    });

    if (validPoints.length === 0) return { linePath: '', areaPath: '', points: [] };

    let linePath = `M ${validPoints[0].x} ${validPoints[0].y}`;
    for (let i = 1; i < validPoints.length; i++) {
      const prev = validPoints[i - 1];
      const curr = validPoints[i];
      // Smooth cubic curve
      const cpX = (prev.x + curr.x) / 2;
      linePath += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    const baselineY = paddingTop + chartHeight;
    const firstX = validPoints[0].x;
    const lastX = validPoints[validPoints.length - 1].x;
    const areaPath = `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

    return { linePath, areaPath, points: validPoints };
  };

  const hoverItem = hoverIndex !== null ? data[hoverIndex] : null;
  const hoverX = hoverIndex !== null ? getX(hoverIndex) : null;

  return (
    <div className={`relative w-full select-none ${className}`}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible block"
        style={{ minHeight: height }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          {series.map((s, idx) => (
            <linearGradient
              key={`grad-${idx}`}
              id={`area-grad-${chartId}-${s.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
            </linearGradient>
          ))}
        </defs>

        {/* Horizontal Gridlines & Y-Axis Labels */}
        {showGrid &&
          yTicks.map((tickVal) => {
            const y = getY(tickVal);
            return (
              <g key={`grid-${tickVal}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#172338"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                >
                  {tickVal}
                </text>
              </g>
            );
          })}

        {/* Render Area Gradients */}
        {series.map((s) => {
          if (!s.isArea) return null;
          const { areaPath } = generatePath(s.key);
          if (!areaPath) return null;
          return (
            <path
              key={`area-${s.key}`}
              d={areaPath}
              fill={`url(#area-grad-${chartId}-${s.key})`}
              className="transition-opacity duration-200 pointer-events-none"
            />
          );
        })}

        {/* Render Lines */}
        {series.map((s) => {
          const { linePath, points } = generatePath(s.key);
          if (!linePath) return null;
          return (
            <g key={`line-${s.key}`}>
              <path
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth={s.strokeWidth || 2}
                strokeDasharray={s.isDashed ? s.strokeDasharray || '4 4' : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200"
              />
              {/* Point Node Markers */}
              {s.showDots &&
                points.map((pt, pIdx) => (
                  <circle
                    key={`dot-${pIdx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={3}
                    fill={s.color}
                    stroke="#0D1527"
                    strokeWidth="1.5"
                    className="transition-transform duration-150"
                  />
                ))}
            </g>
          );
        })}

        {/* Vertical Hover Guide Line */}
        {hoverX !== null && (
          <line
            x1={hoverX}
            y1={paddingTop}
            x2={hoverX}
            y2={paddingTop + chartHeight}
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* X-Axis Date Labels */}
        {data.map((d, idx) => {
          const x = getX(idx);
          const isHovered = hoverIndex === idx;
          // Hide some labels on small step density if necessary
          const showLabel = data.length <= 15 || idx % Math.ceil(data.length / 14) === 0 || idx === data.length - 1;
          if (!showLabel) return null;

          return (
            <text
              key={`xlabel-${idx}`}
              x={x}
              y={svgHeight - 10}
              textAnchor="middle"
              fill={isHovered ? '#00D284' : '#64748B'}
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight={isHovered ? '700' : '500'}
              className="transition-colors duration-150"
            >
              {d.date || d.label}
            </text>
          );
        })}

        {/* Interactive Hover Trigger Slices */}
        {data.map((_, idx) => {
          const x = getX(idx);
          const prevX = idx > 0 ? getX(idx - 1) : paddingLeft;
          const nextX = idx < data.length - 1 ? getX(idx + 1) : svgWidth - paddingRight;
          const sliceX = (prevX + x) / 2;
          const sliceWidth = (nextX + x) / 2 - sliceX;

          return (
            <rect
              key={`slice-${idx}`}
              x={sliceX}
              y={paddingTop}
              width={sliceWidth}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          );
        })}
      </svg>

      {/* Interactive Tooltip Card */}
      {hoverItem && hoverX !== null && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-[#0D1527] border border-[#223654] rounded-lg shadow-xl px-3 py-2 text-xs min-w-[130px]"
          style={{
            left: `${(hoverX / svgWidth) * 100}%`,
            top: '35%',
          }}
        >
          <div className="font-mono text-[10px] text-slate-400 font-semibold border-b border-[#172338] pb-1 mb-1.5 flex items-center justify-between">
            <span>{hoverItem.date || hoverItem.label}</span>
          </div>

          <div className="space-y-1">
            {series.map((s) => {
              const val = hoverItem[s.key];
              if (val === null || val === undefined) return null;
              return (
                <div key={`tip-${s.key}`} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-[11px] text-slate-300 truncate max-w-[90px]">
                      {s.name}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: s.color }}
                  >
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
