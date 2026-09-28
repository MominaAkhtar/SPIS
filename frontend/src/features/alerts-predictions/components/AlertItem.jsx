import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * SPIS AlertItem Component
 * Matches Figma layout for Recent Alerts:
 * - Icon square with warning triangle (red for critical, yellow for warning)
 * - Title on left, timestamp on far right
 * - Category / Region metadata
 * - Outlined threat level badge below metadata
 */
export default function AlertItem({
  title,
  badge = 'CRITICAL',
  level = 'critical',
  time = '2h ago',
  metadata = 'Category: Politics • Region: Pakistan',
  onClick,
}) {
  const isCritical = level?.toLowerCase() === 'critical' || badge?.toUpperCase() === 'CRITICAL';
  const isWarning = level?.toLowerCase() === 'warning' || badge?.toUpperCase() === 'WARNING';

  const iconBg = isCritical
    ? 'bg-[#EF5350]/15 text-[#EF5350]'
    : isWarning
    ? 'bg-[#F1C40F]/15 text-[#F1C40F]'
    : 'bg-[#00BFA5]/15 text-[#00BFA5]';

  const badgeStyle = isCritical
    ? 'border-[#EF5350] text-[#EF5350] bg-[#EF5350]/10'
    : isWarning
    ? 'border-[#F1C40F] text-[#F1C40F] bg-[#F1C40F]/10'
    : 'border-[#00BFA5] text-[#00BFA5] bg-[#00BFA5]/10';

  return (
    <div
      onClick={onClick}
      className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-start gap-3 transition-colors hover:bg-[#161F2E]/60 cursor-pointer select-none group"
    >
      {/* Icon Box */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg} transition-transform group-hover:scale-105`}
      >
        <AlertTriangle className="w-4 h-4" />
      </div>

      {/* Main Details */}
      <div className="flex-1 min-w-0">
        {/* Row 1: Title & Time */}
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs font-normal text-white group-hover:text-slate-100 truncate">
            {title}
          </h4>
          <span className="text-[11px] text-[#8A94A6] flex-shrink-0">
            {time}
          </span>
        </div>

        {/* Row 2: Metadata */}
        <p className="text-[11px] text-[#8A94A6] mt-0.5 truncate">
          {metadata}
        </p>

        {/* Row 3: Threat Badge */}
        <div className="mt-2">
          <span
            className={`inline-block text-[9px] font-medium px-2 py-0.5 rounded border uppercase font-mono tracking-wider ${badgeStyle}`}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}