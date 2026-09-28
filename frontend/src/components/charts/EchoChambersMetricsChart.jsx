import React from 'react';

const DEFAULT_ITEMS = [
  { label: 'Community A', value: 0.91, color: '#EF5350' },
  { label: 'Community B', value: 0.86, color: '#FF7043' },
  { label: 'Community C', value: 0.78, color: '#FFA500' },
  { label: 'Community D', value: 0.69, color: '#00BFA5' },
  { label: 'Community E', value: 0.63, color: '#EC407A' },
  { label: 'Community F', value: 0.51, color: '#3498DB' },
  { label: 'Community G', value: 0.44, color: '#FFEB3B' },
];

export default function EchoChambersMetricsChart({
  items = DEFAULT_ITEMS,
  metricLabel = 'ISOLATION SCORE (0-1)',
  max = 1.0,
  className = '',
}) {
  return (
    <div className={`w-full flex flex-col justify-between h-full select-none ${className}`}>
      <div>
        {/* Sub-header columns */}
        <div className="flex items-center justify-between text-[10px] font-bold text-[#8A94A6] uppercase tracking-wider mb-2.5">
          <span>ECHO CHAMBER</span>
          <span className="text-right pr-6">{metricLabel}</span>
        </div>

        {/* Bars List */}
        <div className="space-y-2.5">
          {items.map((item, idx) => {
            const pct = Math.min(Math.max((item.value / max) * 100, 0), 100);
            return (
              <div key={idx} className="flex items-center gap-2 group">
                {/* Community Name */}
                <div className="w-24 flex-shrink-0 text-xs text-slate-300 font-medium truncate">
                  {item.label}
                </div>

                {/* Bar Area */}
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-3 bg-[#151E32] rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-300 ease-out"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  {/* Score Label */}
                  <span className="w-8 font-mono text-[11px] font-semibold text-white text-right flex-shrink-0">
                    {item.value.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-Axis Ticks */}
        <div className="pl-24 pr-8 pt-2.5">
          <div className="w-full h-px bg-[#1E2638] relative mb-1" />
          <div className="flex items-center justify-between text-[10px] text-[#8A94A6] font-mono">
            <span>0.00</span>
            <span>0.25</span>
            <span>0.50</span>
            <span>0.75</span>
            <span>1.00</span>
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="mt-4 pt-2 border-t border-[#1E2638]/50 flex items-start gap-1.5 text-[10px] text-[#8A94A6] leading-tight">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5] flex-shrink-0 mt-1" />
        <span>
          Higher isolation score indicates a stronger echo chamber (more internal interaction, less cross-community exposure).
        </span>
      </div>
    </div>
  );
}
