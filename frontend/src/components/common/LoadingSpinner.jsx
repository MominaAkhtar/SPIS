import React from 'react';

/**
 * SPIS LoadingSpinner Component
 * Glowing emerald radar spinner for async data fetching.
 */
export default function LoadingSpinner({
  size = 'md',
  color = 'border-t-[#00D284]',
  label,
  className = '',
}) {
  const sizes = {
    xs: 'w-3.5 h-3.5 border',
    sm: 'w-5 h-5 border-2',
    md: 'w-7 h-7 border-2',
    lg: 'w-10 h-10 border-[3px]',
    xl: 'w-14 h-14 border-4',
  };

  return (
    <div className={`flex flex-col justify-center items-center gap-2.5 ${className}`}>
      <div
        className={`${
          sizes[size] || sizes.md
        } border-[#172338] ${color} rounded-full animate-spin`}
      />
      {label && (
        <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
