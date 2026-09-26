import React from 'react';

export default function DateRangePicker({ startDate, endDate, onChange, className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="date"
        value={startDate || ''}
        onChange={(e) => onChange?.({ startDate: e.target.value, endDate })}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <span className="text-gray-400">to</span>
      <input
        type="date"
        value={endDate || ''}
        onChange={(e) => onChange?.({ startDate, endDate: e.target.value })}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
