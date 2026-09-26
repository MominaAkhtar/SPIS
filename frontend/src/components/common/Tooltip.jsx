import React, { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-sm whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
}
