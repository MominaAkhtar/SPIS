import React from 'react';
import Badge from '../../../components/common/Badge';

export default function RecentMonitoringList({ items = [] }) {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, idx) => (
        <li key={idx} className="py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">{item.name}</span>
          <Badge variant={item.status === 'active' ? 'success' : 'default'}>{item.status}</Badge>
        </li>
      ))}
    </ul>
  );
}
