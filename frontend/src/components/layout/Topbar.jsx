import React from 'react';
import Avatar from '../common/Avatar';

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="text-sm text-gray-500">Social Platform Intelligence System</div>
      <div className="flex items-center space-x-4">
        <Avatar name="Admin User" size="sm" />
      </div>
    </header>
  );
}
