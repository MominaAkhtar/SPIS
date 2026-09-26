import React from 'react';
import Badge from '../../../components/common/Badge';

export default function RiskyTopicsList({ topics = [] }) {
  return (
    <div className="space-y-2">
      {topics.map((t, idx) => (
        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-gray-800">{t.name}</span>
          <Badge variant={t.risk === 'high' ? 'danger' : 'warning'}>{t.risk}</Badge>
        </div>
      ))}
    </div>
  );
}
