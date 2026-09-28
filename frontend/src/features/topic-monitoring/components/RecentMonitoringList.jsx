import React from 'react';

/**
 * RecentMonitoringList Component
 * Matches the official Topic Monitoring "Recent Monitoring" section:
 * - Rounded cards with title, timestamp, and active status indicator
 */
export default function RecentMonitoringList({
  items = [
    { id: 1, title: 'Pakistan Elections', time: '7 days ago', active: false },
    { id: 2, title: 'Government Policy Debate', time: '2 days ago', active: true },
    { id: 3, title: 'US Presidential Election', time: '3 hours ago', active: true },
  ],
  onSelect,
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id || item.title}
          onClick={() => onSelect?.(item)}
          className="bg-[#1A1D21] border border-[#2A2D32] rounded-xl p-4 flex items-center justify-between hover:bg-[#1E2227] hover:border-slate-600 transition-all cursor-pointer select-none group"
        >
          <div className="flex flex-col min-w-0 pr-3">
            <span className="text-sm font-medium text-white group-hover:text-[#00BFA5] transition-colors truncate">
              {item.title}
            </span>
            <span className="text-xs text-[#94A3B8] mt-0.5">
              {item.time}
            </span>
          </div>

          {item.active && (
            <div className="flex-shrink-0 flex items-center justify-center pl-2">
              <span className="w-2 h-2 rounded-full bg-[#00BFA5] shadow-[0_0_6px_#00BFA5]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
