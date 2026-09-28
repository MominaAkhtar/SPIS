import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

/**
 * SPIS StatCard Component
 * Metric/KPI card appearing across Dashboard, Network Analysis, Content Analysis, and Alerts screens.
 * layout="horizontal" → icon left, content right (Network Analysis metric cards)
 * layout="vertical"   → icon top-right, content below (default)
 */
export default function StatCard({
  title,
  value,
  subValue,
  change,
  isPositive,
  trendText,
  icon: Icon,
  iconColor = 'text-[#00D284]',
  iconBg = 'bg-[#00D284]/10 border-[#00D284]/20',
  badge,
  badgeVariant,
  tooltip,
  layout = 'vertical',
  className = '',
}) {
  if (layout === 'horizontal') {
    return (
      <div
        className={`bg-[#0D1527] border border-[#172338] hover:border-[#223654] transition-all duration-200 rounded-xl p-4 flex items-center gap-3 shadow-sm relative group ${className}`}
      >
        {/* Icon — left side */}
        {Icon && (
          <div
            className={`p-2.5 rounded-xl border ${iconBg} ${iconColor} flex-shrink-0 transition-transform group-hover:scale-105`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}

        {/* Content — right of icon */}
        <div className="flex flex-col flex-1">
          {/* Title — sentence case, no truncation */}
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
              {title}
            </span>
            {tooltip && (
              <span title={tooltip} className="text-slate-500 hover:text-slate-300 cursor-help flex-shrink-0">
                <Info className="w-3 h-3" />
              </span>
            )}
          </div>

          {/* Value */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {value}
            </span>
            {subValue && (
              <span className="text-xs text-slate-400 font-medium">{subValue}</span>
            )}
          </div>

          {/* Trend */}
          {(change !== undefined || trendText) && (
            <div className="mt-0.5 flex items-center gap-1">
              {change !== undefined && (
                <span
                  className={`inline-flex items-center text-[11px] font-semibold ${
                    isPositive ? 'text-[#2ECC71]' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  )}
                  {change}
                </span>
              )}
              {trendText && (
                <span className="text-slate-500 text-[10px] whitespace-nowrap">{trendText}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default vertical layout
  return (
    <div
      className={`bg-[#0D1527] border border-[#172338] hover:border-[#223654] transition-all duration-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative group overflow-hidden ${className}`}
    >
      {/* Top row: Label & Icon / Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
            {title}
          </span>
          {tooltip && (
            <span title={tooltip} className="text-slate-500 hover:text-slate-300 cursor-help">
              <Info className="w-3 h-3" />
            </span>
          )}
        </div>

        {Icon && (
          <div
            className={`p-2 rounded-lg border ${iconBg} ${iconColor} flex-shrink-0 transition-transform group-hover:scale-105`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}

        {badge && (
          <div className="flex-shrink-0">{badge}</div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-numbers">
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-slate-400 font-medium font-mono-numbers">
            {subValue}
          </span>
        )}
      </div>

      {/* Bottom row: Trend indicator or subtext */}
      {(change !== undefined || trendText) && (
        <div className="mt-2.5 pt-2 border-t border-[#172338]/60 flex items-center justify-between text-xs">
          {change !== undefined ? (
            <div className="flex items-center gap-1">
              <span
                className={`inline-flex items-center text-[11px] font-semibold ${
                  isPositive ? 'text-[#00D284]' : 'text-rose-400'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {change}
              </span>
              {trendText && <span className="text-slate-500 text-[10px] truncate">{trendText}</span>}
            </div>
          ) : (
            trendText && <span className="text-slate-400 text-[11px] truncate">{trendText}</span>
          )}
        </div>
      )}
    </div>
  );
}
