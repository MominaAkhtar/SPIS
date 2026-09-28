import React from 'react';
import { AlertTriangle, AlertOctagon, TrendingUp, ShieldAlert } from 'lucide-react';

/**
 * SPIS AlertItem Component
 * Renders an alert notification entry with threat level indicators, metadata, and timestamp.
 */
export default function AlertItem({
  title,
  badge = 'HIGH',
  level = 'high',
  time = '2h ago',
  metadata = 'Community A & B • Topic: Elections',
  description,
  onClick,
}) {
  const levelStyles = {
    critical: {
      border: 'border-rose-500/30 hover:border-rose-500/50',
      bg: 'bg-rose-500/10',
      badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      icon: <AlertOctagon className="w-4 h-4 text-rose-400" />,
    },
    high: {
      border: 'border-orange-500/30 hover:border-orange-500/50',
      bg: 'bg-orange-500/10',
      badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      icon: <AlertTriangle className="w-4 h-4 text-orange-400" />,
    },
    warning: {
      border: 'border-amber-500/30 hover:border-amber-500/50',
      bg: 'bg-amber-500/10',
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: <TrendingUp className="w-4 h-4 text-amber-400" />,
    },
    info: {
      border: 'border-cyan-500/30 hover:border-cyan-500/50',
      bg: 'bg-cyan-500/10',
      badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      icon: <ShieldAlert className="w-4 h-4 text-cyan-400" />,
    },
  };

  const style = levelStyles[level.toLowerCase()] || levelStyles.high;

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-xl bg-[#111416] border ${style.border} transition-all duration-150 flex items-start gap-3 cursor-pointer group hover:bg-[#111827]`}
    >
      {/* Risk Icon */}
      <div
        className={`p-2 rounded-lg ${style.bg} flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
      >
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-slate-100 truncate">
            {title}
          </h4>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase font-mono tracking-wider flex-shrink-0 ${style.badge}`}
          >
            {badge}
          </span>
        </div>

        {/* Metadata */}
        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
          {metadata || description}
        </p>

        {/* Timestamp */}
        <div className="mt-1 text-[10px] text-slate-500 font-mono">
          {time}
        </div>
      </div>
    </div>
  );
}
