import React from 'react';

/**
 * SPIS HorizontalBarChart Component
 * Visualizes ranked risk topics, topic distributions, or community comparison bars.
 */
export default function HorizontalBarChart({
  items = [],
  max = 100,
  showRank = true,
  showValue = true,
  valueSuffix = '',
  barHeight = 'h-1.5',
  className = '',
}) {
  if (!items || items.length === 0) {
    return (
      <div className="text-xs text-slate-500 py-4 text-center">
        No ranking data available.
      </div>
    );
  }

  // Determine automatic max if not provided
  const computedMax =
    max || Math.max(...items.map((i) => i.value || 0), 1);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, idx) => {
        const percentage = Math.min(
          Math.max(((item.value || 0) / computedMax) * 100, 0),
          100
        );

        const rankDisplay = item.rank !== undefined ? `${item.rank}. ` : showRank ? `${idx + 1}. ` : '';

        return (
          <div key={item.id || idx} className="space-y-1.5 group select-none">
            {/* Header row: Label & Score */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0 pr-2">
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                  <span className="font-mono text-slate-400 font-normal">{rankDisplay}</span>
                  {item.label || item.name}
                </span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                    {item.badge}
                  </span>
                )}
              </div>

              {showValue && (
                <span className="font-mono font-bold text-slate-300 group-hover:text-white flex-shrink-0">
                  {item.value}
                  {valueSuffix}
                </span>
              )}
            </div>

            {/* Bar track & fill */}
            <div className={`w-full ${barHeight} bg-[#111D33] rounded-full overflow-hidden relative`}>
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${
                  item.color || 'from-[#00D284] to-[#00C7FF]'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
