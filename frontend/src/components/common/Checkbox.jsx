import React from 'react';
import { Check } from 'lucide-react';

/**
 * SPIS Checkbox Component
 * Custom dark-mode checkbox styled to match SPIS intelligence design system.
 */
export default function Checkbox({
  checked = false,
  onChange,
  label,
  children,
  id,
  name,
  disabled = false,
  error,
  className = '',
  ...props
}) {
  const checkboxId = id || name || (typeof label === 'string' ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`flex flex-col ${className}`}>
      <label
  htmlFor={checkboxId}
  className={`flex items-center gap-2.5 cursor-pointer select-none group ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  <div className="relative flex items-center justify-center flex-shrink-0">
    <input
      id={checkboxId}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
      className="sr-only"
      {...props}
    />
    <div
      className={`w-4 h-4 rounded border transition-all duration-150 flex items-center justify-center ${
        checked
          ? 'bg-[#00BFA5] border-[#00BFA5] text-[#061510] shadow-sm shadow-[#00BFA5]/20'
          : 'bg-[#0D111E] border-[#1E2D48] group-hover:border-[#2D4369]'
      } ${error ? 'border-rose-500' : ''}`}
    >
      {checked && <Check className="w-3 h-3 stroke-[3]" />}
    </div>
  </div>

  <div className="text-sm text-slate-400 leading-none">
    {children || label}
  </div>
</label>

      {error && (
        <p className="mt-1 text-[11px] font-medium text-rose-400 pl-6.5">
          {error}
        </p>
      )}
    </div>
  );
}
