import React from 'react';
import { Database, FolderSearch } from 'lucide-react';

/**
 * SPIS EmptyState Component
 * Displays dark empty-state illustration when queries return zero records.
 */
export default function EmptyState({
  title = 'No intelligence data found',
  description = 'No discussion clusters, echo chambers, or actors match the selected criteria.',
  icon: Icon = FolderSearch,
  action,
  className = '',
}) {
  return (
    <div
      className={`text-center py-12 px-4 rounded-xl border border-dashed border-[#172338] bg-[#0A101D]/50 flex flex-col items-center justify-center ${className}`}
    >
      <div className="p-3.5 rounded-2xl bg-[#0D1527] border border-[#1E2D48] text-slate-500 mb-3.5">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-sm font-bold text-slate-200 tracking-wide">{title}</h3>
      <p className="mt-1 text-xs text-slate-400 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
