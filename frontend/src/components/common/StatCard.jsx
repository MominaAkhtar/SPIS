import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

/**
 * SPIS StatCard Component
 * Metric/KPI card appearing across Dashboard, Network Analysis, Content Analysis, and Alerts screens.
 */
export default function StatCard({
  title,
  value,
  subValue,
  change,
  isPositive,
  trendText,
  icon: Icon,
  iconColor = 'text-[#00BFA5]',
  iconBg = 'bg-[#142222] border-[#00BFA5]/30',
  badge,
  changeColor,
  tooltip,
  layout = 'default',
  className = '',
}) {
  if (layout === 'horizontal') {
    const changeTextColor =
      changeColor || (isPositive ? 'text-[#2ECC71]' : 'text-[#E74C3C]');

    return (
      <div
        className={`bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] transition-all duration-200 rounded-xl p-4 flex items-center gap-3.5 shadow-sm relative group overflow-hidden ${className}`}
      >
        {Icon && (
          <div
            className={`w-11 h-11 rounded-lg border ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#8A94A6] font-normal truncate">
              {title}
            </span>
            {tooltip && (
              <span title={tooltip} className="text-slate-500 hover:text-slate-300 cursor-help">
                <Info className="w-3 h-3" />
              </span>
            )}
          </div>

          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white tracking-tight">
              {value}
            </span>
            {subValue && (
              <span className="text-base font-bold text-slate-300">
                {subValue}
              </span>
            )}
          </div>

          {(change !== undefined || trendText) && (
            <div className="mt-0.5 text-xs truncate">
              {change !== undefined ? (
                <span
                  className={`inline-flex items-center text-xs font-medium ${changeTextColor}`}
                >
                  <span className="mr-0.5">{isPositive ? '↑' : '↓'}</span>
                  {change} {trendText && <span className="ml-1 text-[#8A94A6] font-normal">{trendText}</span>}
                </span>
              ) : (
                <span className="text-[#8A94A6] text-xs">{trendText}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] transition-all duration-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative group overflow-hidden ${className}`}
    >
      {/* Top row: Label & Icon / Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider truncate">
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
          <div className="flex-shrink-0">
            {badge}
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-numbers">
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-[#8A94A6] font-medium font-mono-numbers">
            {subValue}
          </span>
        )}
      </div>

      {/* Bottom row: Trend indicator or subtext */}
      {(change !== undefined || trendText) && (
        <div className="mt-2.5 pt-2 border-t border-[#1E2638] flex items-center justify-between text-xs">
          {change !== undefined ? (
            <div className="flex items-center gap-1">
              <span
                className={`inline-flex items-center text-[11px] font-semibold ${
                  isPositive ? 'text-[#2ECC71]' : 'text-[#E74C3C]'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {change}
              </span>
              {trendText && <span className="text-[#8A94A6] text-[10px] truncate">{trendText}</span>}
            </div>
          ) : (
            trendText && <span className="text-[#8A94A6] text-[11px] truncate">{trendText}</span>
          )}
        </div>
      )}
    </div>
  );
}
