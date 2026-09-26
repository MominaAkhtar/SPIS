import React from 'react';

export default function Card({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
