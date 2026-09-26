import React from 'react';

export default function ErrorMessage({ message = 'An error occurred', onRetry }) {
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-200 text-red-700">
      <div className="flex items-center justify-between">
        <p className="text-sm">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="text-sm font-semibold underline hover:text-red-900">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
