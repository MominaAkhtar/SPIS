import React from 'react';

/**
 * SPIS Button Component
 * Supports primary cyber-emerald, secondary dark elevated, outline, ghost, and danger variants.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#060B13] disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-[#00D284] text-[#061510] hover:bg-[#05DF8E] active:bg-[#00B873] focus:ring-[#00D284] shadow-md shadow-[#00D284]/20',
    secondary:
      'bg-[#0D1527] border border-[#172338] text-slate-200 hover:bg-[#131F35] hover:text-white hover:border-[#223654] focus:ring-slate-500',
    elevated:
      'bg-[#111D33] border border-[#1E2D48] text-white hover:bg-[#162540] hover:border-[#2D4369] focus:ring-blue-500',
    outline:
      'border border-[#00D284]/40 text-[#00D284] hover:bg-[#00D284]/10 focus:ring-[#00D284]',
    ghost:
      'text-slate-300 hover:text-white hover:bg-[#111D33] focus:ring-slate-500',
    danger:
      'bg-[#EF4444] text-white hover:bg-rose-600 focus:ring-rose-500 shadow-md shadow-rose-600/20',
  };

  const sizes = {
    xs: 'px-2 py-1 text-[11px] gap-1',
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
