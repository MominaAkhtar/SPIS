import React from 'react';

export default function LineChart({ data = [], height = 250, className = '' }) {
  return (
    <div className={`w-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-md ${className}`} style={{ height }}>
      <span className="text-sm text-gray-400">Line Chart Placeholder</span>
    </div>
  );
}
