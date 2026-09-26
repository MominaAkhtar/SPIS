import React from 'react';

export default function Avatar({ src, alt = 'Avatar', name, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const initials = name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return src ? (
    <img src={src} alt={alt} className={`${sizes[size] || sizes.md} rounded-full object-cover`} />
  ) : (
    <div className={`${sizes[size] || sizes.md} rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold`}>
      {initials}
    </div>
  );
}
