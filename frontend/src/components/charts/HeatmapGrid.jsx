import React, { useState } from 'react';

/**
 * SPIS HeatmapGrid Component
 * Matrix heatmap for interaction intensities, cross-community transitions, or co-occurrences.
 * Follows the SPIS dark cyber-intelligence design language.
 */

const DEFAULT_ROWS = ['Replies', 'Reposts', 'Likes', 'Mentions', 'Quotes'];
const DEFAULT_COLS = ['Replies', 'Reposts', 'Likes', 'Mentions', 'Quotes'];

const DEFAULT_MATRIX = [
  [null, 18, 34, 9, 5],
  [22, null, 38, 8, 6],
  [16, 19, null, 7, 4],
  [25, 23, 32, null, 7],
  [18, 17, 27, 11, null],
];

export default function HeatmapGrid({
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS,
  matrix = DEFAULT_MATRIX,
  showLegend = true,
  minLegendText = 'LOW INTERACTION',
  maxLegendText = 'HIGH INTERACTION',
  className = '',
}) {
  const [hoveredCell, setHoveredCell] = useState(null);

  const getCellStyle = (val) => {
    if (val === null || val === undefined) {
      return {
        bg: 'bg-[#151E32]/30',
        text: 'text-[#64748B]',
        border: 'border-transparent',
      };
    }
    if (val >= 30) {
      return {
        bg: 'bg-[#880E4F]/55',
        text: 'text-[#F472B6] font-semibold',
        border: 'border-[#880E4F]/40',
      };
    }
    if (val >= 20) {
      return {
        bg: 'bg-[#004D40]/55',
        text: 'text-[#00BFA5] font-semibold',
        border: 'border-[#004D40]/30',
      };
    }
    if (val >= 15) {
      return {
        bg: 'bg-[#004D40]/35',
        text: 'text-[#00BFA5] font-medium',
        border: 'border-[#004D40]/20',
      };
    }
    if (val >= 8) {
      return {
        bg: 'bg-[#1A237E]/35',
        text: 'text-[#94A3B8]',
        border: 'border-[#1A237E]/20',
      };
    }
    return {
      bg: 'bg-[#151E32]/45',
      text: 'text-[#64748B]',
      border: 'border-transparent',
    };
  };

  return (
    <div className={`w-full flex flex-col select-none ${className}`}>
      {/* Matrix Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="pb-2 text-left text-[10px] font-semibold text-[#8A94A6] tracking-wider w-16">
                From \ To
              </th>
              {cols.map((col, idx) => (
                <th
                  key={idx}
                  className="pb-2 px-1 text-[11px] font-medium text-slate-300 tracking-tight"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowName, rIdx) => (
              <tr key={rIdx}>
                <td className="py-1 text-left text-[11px] font-medium text-slate-300 pr-2 whitespace-nowrap">
                  {rowName}
                </td>
                {cols.map((colName, cIdx) => {
                  const val = matrix[rIdx]?.[cIdx];
                  const style = getCellStyle(val);
                  const isHovered =
                    hoveredCell?.r === rIdx && hoveredCell?.c === cIdx;

                  return (
                    <td key={cIdx} className="p-0.5">
                      <div
                        onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx, val, rowName, colName })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`h-7 sm:h-8 rounded flex items-center justify-center text-xs border transition-all cursor-pointer ${
                          style.bg
                        } ${style.text} ${style.border} ${
                          isHovered
                            ? 'ring-1 ring-[#00BFA5] scale-[1.04] brightness-125 z-10 shadow-sm'
                            : 'hover:brightness-110'
                        }`}
                        title={
                          val !== null && val !== undefined
                            ? `${rowName} → ${colName}: ${val}%`
                            : `${rowName} → ${colName}: N/A`
                        }
                      >
                        {val !== null && val !== undefined ? `${val}%` : '—'}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend Footer */}
      {showLegend && (
        <div className="mt-4 pt-1">
          {/* Gradient line */}
          <div
            className="w-full h-1.5 rounded-full"
            style={{
              background:
                'linear-gradient(to right, #004D40 0%, #1A237E 50%, #880E4F 100%)',
            }}
          />
          <div className="flex items-center justify-between text-[9px] font-semibold text-[#8A94A6] tracking-wider uppercase mt-1.5">
            <span>{minLegendText}</span>
            <span>{maxLegendText}</span>
          </div>
        </div>
      )}
    </div>
  );
}
