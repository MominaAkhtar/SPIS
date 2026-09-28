import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search topics, users, or metrics...',
  className = '',
  shortcut,
  size = 'md',
}) {
  const sizeStyles = {
    sm: 'py-1 pl-8 pr-7 text-xs',
    md: 'py-2 pl-9 pr-8 text-xs',
    lg: 'py-2.5 pl-10 pr-9 text-sm',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
    lg: 'w-4.5 h-4.5 left-3.5',
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        className={`absolute ${iconSizes[size] || iconSizes.md} text-slate-400 pointer-events-none`}
      />
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#111416] text-slate-100 placeholder-slate-500 border border-[#1B2638] rounded-lg focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all ${
          sizeStyles[size] || sizeStyles.md
        }`}
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            if (onClear) onClear();
            else onChange?.('');
          }}
          className="absolute right-2.5 text-slate-400 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : shortcut ? (
        <span className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-[#152033] border border-[#1E2D48] rounded">
          {shortcut}
        </span>
      ) : null}
    </div>
  );
}
