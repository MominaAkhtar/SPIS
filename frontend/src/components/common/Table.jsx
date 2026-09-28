import React from 'react';

/**
 * SPIS Table Component
 * Dark data grid designed for intelligence breakdowns, user rankings, and community lists.
 */
export default function Table({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found in this time window',
  className = '',
  onRowClick,
}) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-[#1B2638] bg-[#111827] ${className}`}>
      <table className="min-w-full divide-y divide-[#1B2638]">
        <thead className="bg-[#0A101D]">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 sm:px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider ${
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                } ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1B2638]/70">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-xs text-slate-500 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row[keyField] || rowIdx}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-[#131F35]' : 'hover:bg-[#152033]/60'
                }`}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-4 sm:px-5 py-3.5 whitespace-nowrap text-xs text-slate-200 ${
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    } ${col.cellClassName || ''}`}
                  >
                    {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
