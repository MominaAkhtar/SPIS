import React from 'react';
import { Info } from 'lucide-react';

/**
 * SPIS Card Component
 * Standard elevated container for graphs, tables, rankings, and intelligence modules.
 */
export default function Card({
  title,
  subtitle,
  tooltip,
  action,
  children,
  headerBorder = false,
  className = '',
  bodyClassName = '',
}) {
  return (
    <div
      className={`bg-[#0D1527] border border-[#172338] rounded-xl shadow-card transition-all duration-200 overflow-hidden ${className}`}
    >
      {(title || action || subtitle) && (
        <div
          className={`flex items-center justify-between px-5 py-4 ${
            headerBorder ? 'border-b border-[#172338] bg-[#0A101D]' : ''
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div>
              {title && (
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
                    {title}
                  </h3>
                  {tooltip && (
                    <span title={tooltip} className="text-slate-500 hover:text-slate-300 cursor-help">
                      <Info className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              )}
              {subtitle && (
                <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          {action && <div className="flex items-center gap-2 flex-shrink-0">{action}</div>}
        </div>
      )}

      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
