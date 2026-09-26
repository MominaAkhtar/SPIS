import React from 'react';
import Badge from '../../../components/common/Badge';

export default function ContentCard({ author, content, platform, date, sentiment }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-gray-900">{author}</span>
        <Badge variant={sentiment === 'positive' ? 'success' : sentiment === 'negative' ? 'danger' : 'default'}>
          {sentiment}
        </Badge>
      </div>
      <p className="text-sm text-gray-700 mb-3">{content}</p>
      <div className="text-xs text-gray-400 flex justify-between">
        <span>{platform}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
