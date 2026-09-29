import React, { useState } from 'react';

export default function PolarizationTrendCard() {
  const [activeRange, setActiveRange] = useState('30D');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const ranges = ['7D', '30D', '90D'];

  // Coordinates mapping on a 1000 x 340 SVG canvas
  // Chart inner plot area: X from 65 to 975, Y from 30 to 290
  // Value scale: 0 to 100 mapped to Y: 290 down to 30 (height 260 => 2.6 px per unit)
  const getY = (val) => 290 - (val / 100) * 260;

  // 30D dataset matching the screenshot exactly
  // Historical solid line up to Jul 12 (~73.4)
  const historical30D = [
    { date: 'Jul 18', x: 80, yVal: 42.0 },
    { date: 'Jul 20', x: 140, yVal: 45.2 },
    { date: 'Jul 23', x: 210, yVal: 39.6 },
    { date: 'Jul 25', x: 280, yVal: 48.0 },
    { date: 'Jul 28', x: 350, yVal: 54.2 },
    { date: 'Jul 30', x: 420, yVal: 57.5 },
    { date: 'Jul 2', x: 490, yVal: 56.0 },
    { date: 'Jul 5', x: 560, yVal: 62.0 },
    { date: 'Jul 7', x: 630, yVal: 68.2 },
    { date: 'Jul 10', x: 700, yVal: 71.5 },
    { date: 'Jul 12', x: 770, yVal: 73.4 },
  ];

  // Forecast dashed line from Jul 12 rising to ~90.8 at Sep 01
  const forecast30D = [
    { date: 'Jul 12', x: 770, yVal: 73.4, upper: 73.4, lower: 73.4 },
    { date: 'Aug 20', x: 820, yVal: 77.2, upper: 80.5, lower: 74.0 },
    { date: 'Aug 27', x: 870, yVal: 82.0, upper: 86.5, lower: 77.2 },
    { date: 'Aug 30', x: 915, yVal: 86.5, upper: 91.8, lower: 81.0 },
    { date: 'Sep 01', x: 960, yVal: 90.8, upper: 96.5, lower: 84.5 },
  ];

  // 7D dataset
  const historical7D = [
    { date: 'Aug 11', x: 80, yVal: 68.2 },
    { date: 'Aug 12', x: 220, yVal: 69.5 },
    { date: 'Aug 13', x: 360, yVal: 70.8 },
    { date: 'Aug 14', x: 500, yVal: 72.1 },
    { date: 'Aug 15', x: 640, yVal: 71.9 },
    { date: 'Aug 16', x: 770, yVal: 73.4 },
  ];

  const forecast7D = [
    { date: 'Aug 16', x: 770, yVal: 73.4, upper: 73.4, lower: 73.4 },
    { date: 'Aug 17', x: 835, yVal: 76.5, upper: 79.0, lower: 73.5 },
    { date: 'Aug 18', x: 900, yVal: 81.2, upper: 85.0, lower: 77.0 },
    { date: 'Aug 19', x: 960, yVal: 86.8, upper: 92.0, lower: 81.5 },
  ];

  // 90D dataset
  const historical90D = [
    { date: 'May 18', x: 80, yVal: 32.5 },
    { date: 'Jun 05', x: 210, yVal: 38.0 },
    { date: 'Jun 22', x: 350, yVal: 45.2 },
    { date: 'Jul 10', x: 490, yVal: 55.4 },
    { date: 'Jul 28', x: 630, yVal: 65.0 },
    { date: 'Aug 15', x: 770, yVal: 73.4 },
  ];

  const forecast90D = [
    { date: 'Aug 15', x: 770, yVal: 73.4, upper: 73.4, lower: 73.4 },
    { date: 'Aug 25', x: 835, yVal: 79.5, upper: 84.0, lower: 75.5 },
    { date: 'Sep 05', x: 900, yVal: 85.5, upper: 91.0, lower: 80.0 },
    { date: 'Sep 15', x: 960, yVal: 91.5, upper: 97.5, lower: 85.0 },
  ];

  const historicalPoints =
    activeRange === '7D'
      ? historical7D
      : activeRange === '90D'
      ? historical90D
      : historical30D;

  const forecastPoints =
    activeRange === '7D'
      ? forecast7D
      : activeRange === '90D'
      ? forecast90D
      : forecast30D;

  // Smooth bezier curve generator
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${getY(pts[0].yVal)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = getY(p1.yVal) + (getY(p2.yVal) - getY(p0.yVal)) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = getY(p2.yVal) - (getY(p3.yVal) - getY(p1.yVal)) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${getY(p2.yVal)}`;
    }
    return d;
  };

  const historicalPath = createSmoothPath(historicalPoints);
  const forecastPath = createSmoothPath(forecastPoints);

  // Shaded area path for historical
  const lastHist = historicalPoints[historicalPoints.length - 1];
  const firstHist = historicalPoints[0];
  const areaPath = `${historicalPath} L ${lastHist.x} 290 L ${firstHist.x} 290 Z`;

  // Confidence band polygon path
  const upperPts = forecastPoints.map((p) => `${p.x},${getY(p.upper)}`).join(' ');
  const lowerPts = [...forecastPoints].reverse().map((p) => `${p.x},${getY(p.lower)}`).join(' ');
  const confidencePolygon = `${upperPts} ${lowerPts}`;

  // Y-axis ticks
  const yTicks = [100, 80, 60, 40, 20];

  // X-axis label ticks for 30D matching screenshot
  const xTicks30D = [
    { label: 'Jul 18', x: 80 },
    { label: 'Jul 23', x: 210 },
    { label: 'Jul 28', x: 350 },
    { label: 'Jul 2', x: 490 },
    { label: 'Jul 7', x: 630 },
    { label: 'Jul 12', x: 770 },
    { label: 'Aug 27', x: 870 },
    { label: 'Sep 01', x: 960 },
  ];

  const xTicks =
    activeRange === '30D'
      ? xTicks30D
      : historicalPoints.map((p) => ({ label: p.date, x: p.x }));

  return (
    <div className="bg-[#111827] border border-[#1E2227] rounded-xl p-5 sm:p-6 shadow-none">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#1E2227]">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase select-none">
            POLARIZATION TREND — 30 DAYS + 6-DAY FORECAST
          </h3>
          <p className="text-xs text-[#8A94A6] mt-0.5 select-none">
            Daily aggregate polarization value with 95% confidence band • Dashed line = LSTM forecast
          </p>
        </div>

        {/* Range Buttons [ 7D ] [ 30D ] [ 90D ] */}
        <div className="flex items-center rounded-lg bg-[#0B0F19] border border-[#1E2227] p-1 self-start sm:self-auto select-none">
          {ranges.map((r) => {
            const isActive = activeRange === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRange(r)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#152438] text-white border border-[#00BFA5]/40 shadow-sm'
                    : 'text-[#8A94A6] hover:text-white'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox="0 0 1000 340"
          className="w-full h-auto min-w-[700px] select-none overflow-visible"
        >
          <defs>
            {/* Area gradient for historical curve */}
            <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00BFA5" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#00BFA5" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#00BFA5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Shaded vertical column for forecast time window */}
          <rect
            x="770"
            y="30"
            width="205"
            height="260"
            fill="#0E1A2C"
            fillOpacity="0.4"
          />

          {/* Background horizontal grid lines & Y labels */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1="55"
                  y1={y}
                  x2="975"
                  y2={y}
                  stroke="#1B2638"
                  strokeWidth="1"
                />
                <text
                  x="45"
                  y={y + 4}
                  textAnchor="end"
                  fill="#616A75"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Background vertical grid lines */}
          {xTicks.map((t) => (
            <line
              key={t.label}
              x1={t.x}
              y1="30"
              x2={t.x}
              y2="290"
              stroke="#152033"
              strokeWidth="1"
            />
          ))}

          {/* CRITICAL THRESHOLD Line at Y=85 */}
          <g>
            <line
              x1="55"
              y1={getY(85)}
              x2="975"
              y2={getY(85)}
              stroke="#E74C3C"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="975"
              y={getY(85) - 8}
              textAnchor="end"
              fill="#EF5350"
              fontSize="9"
              fontWeight="bold"
              letterSpacing="0.08em"
            >
              CRITICAL THRESHOLD
            </text>
          </g>

          {/* HIGH RISK Line at Y=65 */}
          <g>
            <line
              x1="55"
              y1={getY(65)}
              x2="975"
              y2={getY(65)}
              stroke="#F59E0B"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="975"
              y={getY(65) + 16}
              textAnchor="end"
              fill="#F59E0B"
              fontSize="9"
              fontWeight="bold"
              letterSpacing="0.08em"
            >
              HIGH RISK
            </text>
          </g>

          {/* Historical Area fill */}
          <path d={areaPath} fill="url(#trendAreaGradient)" />

          {/* 95% Confidence Band for Forecast */}
          <polygon
            points={confidencePolygon}
            fill="#00BFA5"
            fillOpacity="0.12"
          />

          {/* Historical line (solid teal #00BFA5) */}
          <path
            d={historicalPath}
            fill="none"
            stroke="#00BFA5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Forecast line (dashed teal #00BFA5 reaching above 85 at Sep 01) */}
          <path
            d={forecastPath}
            fill="none"
            stroke="#00BFA5"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            strokeLinecap="round"
          />

          {/* Interactive invisible hover hitboxes along path */}
          {[...historicalPoints, ...forecastPoints.slice(1)].map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={getY(p.yVal)}
              r="14"
              className="fill-transparent cursor-pointer"
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Active hover indicator only on user hover */}
          {hoveredPoint && (
            <circle
              cx={hoveredPoint.x}
              cy={getY(hoveredPoint.yVal)}
              r="4.5"
              className="fill-[#111827] stroke-[#00BFA5] stroke-[2.5]"
            />
          )}

          {/* X-axis labels at bottom */}
          {xTicks.map((t) => (
            <text
              key={t.label}
              x={t.x}
              y="312"
              textAnchor="middle"
              fill="#8A94A6"
              fontSize="11"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {t.label}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none p-2.5 rounded-lg bg-[#0E1626] border border-[#00BFA5]/60 text-xs shadow-xl animate-in fade-in zoom-in-95 duration-100"
            style={{
              left: `${(hoveredPoint.x / 1000) * 100}%`,
              top: `${(getY(hoveredPoint.yVal) / 340) * 100}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="font-bold text-white flex items-center justify-between gap-3">
              <span>{hoveredPoint.date}</span>
              <span className="text-[#00BFA5] font-black">{hoveredPoint.yVal}</span>
            </div>
            {hoveredPoint.upper && (
              <div className="text-[10px] text-slate-400 mt-1">
                95% CI: {hoveredPoint.lower} — {hoveredPoint.upper}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
