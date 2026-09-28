import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * SPIS Form Input Component
 * Consistent, dark cyber-styled text & credential input.
 * Supports labels, right action elements, left icons, password toggles, and validation errors.
 */
const Input = forwardRef(function Input(
  {
    label,
    labelRight,
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error,
    helperText,
    disabled = false,
    required = false,
    autoComplete,
    leftIcon,
    className = '',
    inputClassName = '',
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full ${className}`}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold text-slate-300 tracking-wide select-none"
            >
              {label}
              {required && <span className="text-[#00D284] ml-0.5">*</span>}
            </label>
          )}
          {labelRight && (
            <div className="text-xs">{labelRight}</div>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`w-full bg-[#09101C] text-slate-100 placeholder-slate-500 border rounded-lg text-xs sm:text-sm py-2.5 transition-all duration-150 focus:outline-none ${
            leftIcon ? 'pl-9' : 'pl-3.5'
          } ${isPassword ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-rose-100'
              : 'border-[#172338] focus:border-[#00D284] focus:ring-1 focus:ring-[#00D284]'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-[#080D18]' : ''} ${inputClassName}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 p-1 bg-transparent border-0 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-[11px] font-medium text-rose-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-1.5 text-[11px] text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
