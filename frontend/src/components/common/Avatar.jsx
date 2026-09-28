import React from 'react';

/**
 * SPIS Avatar Component
 * Displays user initials with brand styling or user image.
 */
export default function Avatar({
  src,
  alt = 'User avatar',
  name = 'RA',
  size = 'md',
  status, // 'online' | 'busy' | 'offline'
  className = '',
}) {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
    xl: 'w-14 h-14 text-base font-bold',
  };

  const statusDotSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  // Generate initials (up to 2 letters)
  const getInitials = (str) => {
    if (!str) return 'RA';
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size] || sizes.md} rounded-full object-cover border border-[#263954] shadow-sm`}
        />
      ) : (
        <div
          className={`${
            sizes[size] || sizes.md
          } rounded-full bg-gradient-to-br from-[#00E590] to-[#00B873] text-[#061510] font-bold flex items-center justify-center tracking-tight shadow-sm select-none border border-emerald-400/40`}
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${
            statusDotSizes[size] || statusDotSizes.md
          } rounded-full border-2 border-[#0D111E] ${
            status === 'online'
              ? 'bg-[#00BFA5]'
              : status === 'busy'
              ? 'bg-[#EF4444]'
              : 'bg-slate-500'
          }`}
        />
      )}
    </div>
  );
}
