import React from 'react';

/**
 * Semicircular SVG Gauge matching media_1790621954757.png
 * Flat-ended (strokeLinecap="butt") semicircle arc.
 * Center value 73.4 with clean layout.
 */
function PolarizationGauge({ value = 73.4, max = 100 }) {
  const cx = 140;
  const cy = 130;
  const r = 104;
  const strokeWidth = 22;

  // Percentage from 0 to 1
  const pct = Math.min(Math.max(value / max, 0), 1);

  // Angle in degrees from 180 down to (180 - pct * 180)
  const endAngle = 180 - pct * 180;
  const endRad = (endAngle * Math.PI) / 180;
  const endX = cx + r * Math.cos(endRad);
  const endY = cy - r * Math.sin(endRad);

  // Background arc path (full 180 to 0 semicircle)
  const bgPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Active arc path (always <= 180deg, so large-arc-flag stays 0)
  const activePath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${endX} ${endY}`;

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 280 150"
        className="w-[280px] max-w-full h-auto overflow-visible select-none"
      >
        {/* Background track arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="#2B1E28"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />

        {/* Active foreground arc */}
        <path
          d={activePath}
          fill="none"
          stroke="#2ECC71"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />

        {/* Apex scale tick: "50" */}
        <text
          x={cx}
          y={cy - r - strokeWidth / 2 - 6}
          textAnchor="middle"
          fill="#8A94A6"
          fontSize="11"
          fontWeight="bold"
        >
          50
        </text>

        {/* Center text lives inside the SVG so it always stays within the
            arc's inner radius (~93px) and never overlaps the stroke. */}
        <text
          x={cx}
          y={cy - 52}
          textAnchor="middle"
          fill="#8A94A6"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
        >
          POLARIZATION INDEX
        </text>
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="44"
          fontWeight="900"
          letterSpacing="-1"
        >
          {value.toFixed(1)}
        </text>
      </svg>

      {/* Red Status Pill below gauge */}
      <div className="mt-4">
        <span className="inline-flex items-center px-3.5 py-1 rounded-[4px] border border-[#E74C3C] text-[#EF5350] bg-[#2A1518]/30 text-xs font-bold tracking-wider uppercase">
          HIGH • 4.3
        </span>
      </div>
    </div>
  );
}

export default function PolarizationIndexCard() {
  const legendItems = [
    { label: 'LOW', color: 'bg-[#2ECC71]' },
    { label: 'MEDIUM', color: 'bg-[#FACC15]' },
    { label: 'HIGH', color: 'bg-[#F97316]' },
    { label: 'CRITICAL', color: 'bg-[#E74C3C]' },
  ];

  return (
    <div className="bg-[#111827] border border-[#1E2227] rounded-xl p-5 sm:p-6 shadow-none flex flex-col justify-between h-full">
      {/* Top right label */}
      <div className="flex justify-end mb-2">
        <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase select-none">
          GLOBAL POLARIZATION SCORE
        </span>
      </div>

      {/* Main card body: Gauge + 2x2 Metrics Grid + Legend */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 xl:gap-10 flex-1 pt-1 pb-1">
        {/* Left: Gauge */}
        <div className="flex-shrink-0">
          <PolarizationGauge value={73.4} />
        </div>

        {/* Right Section: 2x2 Metrics Grid + Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10 xl:gap-14 flex-1">
          {/* 2x2 Metrics Grid */}
          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-5 sm:gap-y-6 flex-1">
            {/* 24H CHANGE */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase leading-tight">
                24H<br />CHANGE
              </span>
              <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#EF5350] tracking-tight mt-1">
                <span className="text-lg leading-none">▲</span>
                <span>4.3</span>
              </div>
            </div>

            {/* WEEKLY AVG */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase leading-tight">
                WEEKLY<br />AVG
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                71.8
              </span>
            </div>

            {/* PEAK TODAY */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase leading-tight">
                PEAK<br />TODAY
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#F59E0B] tracking-tight mt-1">
                75.8
              </span>
            </div>

            {/* 72H FORECAST */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase leading-tight">
                72H<br />FORECAST
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#EF5350] tracking-tight mt-1 whitespace-nowrap">
                78–84
              </span>
            </div>
          </div>

          {/* Right: Legend */}
          <div className="flex flex-row sm:flex-col items-start gap-3 sm:gap-2.5 select-none flex-shrink-0">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
