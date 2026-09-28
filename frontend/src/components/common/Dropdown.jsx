import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * SPIS Dropdown Component
 * Reusable dropdown menu matching the filter controls across all platform screens.
 */
export default function Dropdown({
  label,
  value,
  options = [],
  onSelect,
  placeholder = 'Select option...',
  icon: Icon,
  size = 'md',
  align = 'left',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-xs sm:text-sm',
    lg: 'px-4 py-2.5 text-sm',
  };

  const selectedOption = options.find((opt) => (opt.value !== undefined ? opt.value === value : opt === value));
  const displayText = selectedOption?.label || selectedOption || label || placeholder;

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 rounded-lg border font-medium transition-all ${
          isOpen
            ? 'bg-[#1A2840] border-[#00BFA5]/50 text-white'
            : 'bg-[#111827] border-[#1B2638] text-slate-200 hover:bg-[#131F35] hover:border-[#263954]'
        } ${sizeClasses[size] || sizeClasses.md}`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
          <span className="truncate">{displayText}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-1.5 min-w-[160px] max-w-xs max-h-60 overflow-y-auto rounded-xl bg-[#111827] border border-[#263954] shadow-2xl z-50 p-1 animate-in fade-in slide-in-from-top-2 duration-150`}
        >
          {options.map((option, idx) => {
            const optVal = option.value !== undefined ? option.value : option;
            const optLabel = option.label !== undefined ? option.label : option;
            const isSelected = value !== undefined ? optVal === value : false;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelect?.(optVal);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#00BFA5]/15 text-[#00BFA5] font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2840] hover:text-white'
                }`}
              >
                <span className="truncate">{optLabel}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#00BFA5] flex-shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
