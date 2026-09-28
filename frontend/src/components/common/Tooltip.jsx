import React, { useState } from 'react';

/**
 * SPIS Tooltip Component
 * Provides metric hints, formula explanations, and abbreviations.
 */
export default function Tooltip({
  text,
  position = 'top',
  children,
  className = '',
}) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && text && (
        <div
          role="tooltip"
          className={`absolute z-50 ${positionClasses[position] || positionClasses.top} px-2.5 py-1.5 text-[11px] font-medium text-slate-200 bg-[#0A101D] border border-[#263954] rounded-lg shadow-xl whitespace-normal min-w-[120px] max-w-xs text-center pointer-events-none animate-in fade-in zoom-in-95 duration-150`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
