import React from 'react';

// Figma colors: purple, blue, orange, green, red, teal, yellow
const DEFAULT_ITEMS = [
  { label: 'Community A', value: 0.91, color: '#9C27B0' },
  { label: 'Community B', value: 0.86, color: '#2196F3' },
  { label: 'Community C', value: 0.78, color: '#FF9800' },
  { label: 'Community D', value: 0.69, color: '#4CAF50' },
  { label: 'Community E', value: 0.63, color: '#EF5350' },
  { label: 'Community F', value: 0.51, color: '#14B8A6' },
  { label: 'Community G', value: 0.44, color: '#FFEB3B' },
];

const TICKS = [0, 0.5, 0.75, 1];
const ROW_H = 'h-[17px]';
const LABEL_COL = 'w-[26.4%] flex-shrink-0';
const PLOT_COL = 'w-[48.5%] flex-shrink-0';

export default function EchoChambersMetricsChart({
  items = DEFAULT_ITEMS,
  metricLabel = 'ISOLATION SCORE (0-1)',
  axisTitle = 'Isolation Score',
  max = 1.0,
  className = '',
}) {
  return (
    <div className={`w-full select-none text-[#D1D5DB] ${className}`}>
      {/* Sub-header */}
      <div className="flex items-center h-[10px] text-[7px] leading-none uppercase">
        <span className={`${LABEL_COL} pl-1 whitespace-nowrap`}>ECHO CHAMBER</span>
        <span className="pl-[25px] whitespace-nowrap">{metricLabel}</span>
      </div>

      <div className="flex mt-[3px]">
        {/* Community labels */}
        <div className={LABEL_COL}>
          {items.map((item, i) => (
            <div key={i} className={`${ROW_H} flex items-center pl-1 text-[7px] leading-none truncate`}>
              {item.label}
            </div>
          ))}
        </div>

        {/* Plot */}
        <div className={PLOT_COL}>
          <div className="border-l-[1.5px] border-b-[1.5px] border-white">
            {items.map((item, i) => {
              const pct = Math.min(Math.max((item.value / max) * 100, 0), 100);
              return (
                <div key={i} className={`${ROW_H} flex items-center`}>
                  <div
                    className="h-2 rounded-[1px] flex-shrink-0 transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: item.color }}
                  />
                  <span className="ml-[5px] text-[6.5px] leading-none whitespace-nowrap">
                    {item.value.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tick labels */}
          <div className="relative h-[9px] mt-[3px]">
            {TICKS.map((t) => (
              <span
                key={t}
                className="absolute top-0 text-[6.5px] leading-none -translate-x-1/2"
                style={{ left: `${(t / max) * 100}%` }}
              >
                {t === 0 ? '0' : t.toFixed(2)}
              </span>
            ))}
          </div>

          <div className="text-center text-[6.5px] leading-none mt-[6px]">{axisTitle}</div>
        </div>
      </div>

      {/* Footnote */}
      <div className="mt-[6px] flex items-center justify-center gap-1.5 text-[7px] leading-tight text-[#9AA3B2]">
        <span className="w-[6px] h-[6px] rounded-full bg-[#14B8A6] flex-shrink-0" />
        <span>
          Higher isolation score indicates a stronger echo chamber (more internal interaction, less external exposure).
        </span>
      </div>
    </div>
  );
}
