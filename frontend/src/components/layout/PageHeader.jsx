import React from 'react';

/**
 * SPIS PageHeader Component
 * Renders consistent module titles, descriptions, and action bars across platform screens.
 */
export default function PageHeader({
  title,
  description,
  badge,
  actions,
  children,
  className = '',
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
