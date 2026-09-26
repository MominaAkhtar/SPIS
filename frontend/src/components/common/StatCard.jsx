import React from 'react';

export default function StatCard({ title, value, change, isPositive, icon: Icon, className = '' }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {change !== undefined && (
          <span className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
        )}
      </div>
    </div>
  );
}
