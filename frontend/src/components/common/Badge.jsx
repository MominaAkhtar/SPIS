import React from 'react';

/**
 * SPIS Badge Component
 * Renders status, polarization risk level, and category badges.
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const variants = {
    default: 'bg-[#111D33] text-slate-300 border border-[#1E2D48]',
    primary: 'bg-[#00D284]/15 text-[#00D284] border border-[#00D284]/30',
    low: 'bg-emerald-500/15 text-[#00D284] border border-emerald-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    high: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    critical: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-[#00D284]',
    low: 'bg-[#00D284]',
    medium: 'bg-amber-400',
    high: 'bg-orange-400',
    critical: 'bg-rose-400',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-400',
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[9px]',
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || dotColors.default
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
}
