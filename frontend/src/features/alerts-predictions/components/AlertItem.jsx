import React from 'react';
import Badge from '../../../components/common/Badge';

export default function AlertItem({ title, level = 'warning', time, description }) {
  const variant = level === 'critical' ? 'danger' : level === 'high' ? 'warning' : 'info';

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-white mb-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <Badge variant={variant}>{level}</Badge>
      </div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
