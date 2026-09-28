import React, { useEffect, useRef, useState } from 'react';

/**
 * SPIS LineChart Component
 * Line chart with gridlines, axis labels and a highlighted callout badge on the latest point.
 *
 * Props worth knowing:
 *  - tintedPlot: draws the teal-tinted plot rectangle (used by "Bridge Impact Over Time")
 *  - yMin / yMax / yTicks: axis range (Bridge tab uses yMin={25})
 */

const DEFAULT_LINE_DATA = [
  { date: '1 May', value: 72 },
  { date: '2 May', value: 65 },
  { date: '3 May', value: 78 },
  { date: '4 May', value: 71 },
  { date: '5 May', value: 80 },
  { date: '6 May', value: 74 },
  { date: '7 May', value: 88, highlight: true },
];

export default function LineChart({
  data = DEFAULT_LINE_DATA,
  height = 180,
  strokeColor = '#14B8A6',
  areaColor = '#14B8A6',
  yMin = 0,
  yMax = 100,
  yTicks = [100, 75, 50, 25],
  showGrid = true,
  tintedPlot = false,
  className = '',
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(360);

  // Measure real width so text/points are never stretched
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const update = () => setWidth(Math.max(240, el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const paddingLeft = tintedPlot ? 38 : 32;
  const paddingRight = tintedPlot ? 10 : 24;
  const paddingTop = 24;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    const ratio = (clamped - yMin) / (yMax - yMin);
    return paddingTop + chartHeight - ratio * chartHeight;
  };

  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value), ...d }));

  const linePath = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x},${paddingTop + chartHeight} L ${points[0].x},${paddingTop + chartHeight} Z`
      : '';

  const plotTop = getY(yMax);
  const plotBottom = getY(yMin);

  return (
    <div className={`w-full relative select-none ${className}`}>
      <div ref={wrapRef} className="w-full relative" style={{ height }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible block">
          <defs>
            <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={areaColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={areaColor} stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="plotTint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.17" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Teal tinted plot rectangle */}
          {tintedPlot && (
            <rect
              x={paddingLeft}
              y={plotTop}
              width={chartWidth}
              height={plotBottom - plotTop}
              fill="url(#plotTint)"
            />
          )}

          {/* Gridlines & Y labels */}
          {showGrid &&
            yTicks.map((tick) => {
              const y = getY(tick);
              const isTop = tick === yMax;
              return (
                <g key={`grid-${tick}`}>
                  {!(tintedPlot && isTop) && (
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke={tintedPlot ? '#14B8A6' : '#1E2638'}
                      strokeOpacity={tintedPlot ? 0.14 : 1}
                      strokeWidth="1"
                      strokeDasharray={tintedPlot ? 'none' : '2 3'}
                    />
                  )}
                  <text
                    x={paddingLeft - 8}
                    y={y + 3}
                    textAnchor="end"
                    fill="#4E5C71"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

          {/* Area under the line (only for the non-tinted variant) */}
          {!tintedPlot && areaPath && <path d={areaPath} fill="url(#lineAreaGrad)" />}

          {/* Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth={tintedPlot ? 2.2 : 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Points, callout, x labels */}
          {points.map((pt, idx) => {
            const isLast = idx === points.length - 1;
            const isHovered = hoveredPoint?.date === pt.date;

            return (
              <g key={`pt-${idx}`}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 4.5 : 3.2}
                  fill={tintedPlot || !isLast ? '#FFFFFF' : strokeColor}
                  stroke={strokeColor}
                  strokeWidth="1.8"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {(pt.highlight || isLast) && (
                  <g transform={`translate(${pt.x}, ${pt.y})`} className="pointer-events-none">
                    <rect x="-13" y="-21" width="26" height="16" rx="4" fill={strokeColor} />
                    <text
                      x="0"
                      y="-9.5"
                      textAnchor="middle"
                      fill="#08211F"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {pt.value}
                    </text>
                  </g>
                )}

                <text
                  x={pt.x}
                  y={height - 8}
                  textAnchor={idx === 0 ? 'start' : isLast ? 'end' : 'middle'}
                  dx={idx === 0 ? -6 : isLast ? 8 : 0}
                  fill="#4C596E"
                  fontSize="10"
                  fontWeight="500"
                >
                  {pt.date}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none px-2 py-1 rounded bg-[#111827] border border-[#1E2638] shadow-lg text-[10px] text-white"
            style={{
              left: hoveredPoint.x,
              top: hoveredPoint.y,
              transform: 'translate(-50%, -160%)',
            }}
          >
            <span className="font-semibold text-[#14B8A6]">{hoveredPoint.date}: </span>
            <span className="font-mono">{hoveredPoint.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
