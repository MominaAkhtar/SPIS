import React, { useState } from 'react';

export default function Dropdown({ label, options = [], onSelect, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        {label}
        <span className="ml-2">&#x25BC;</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect?.(option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {option.label || option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
