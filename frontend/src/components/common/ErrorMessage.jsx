import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

/**
 * SPIS ErrorMessage Component
 * Displays system alerts or API fetch failure indicators in dark cyber styling.
 */
export default function ErrorMessage({
  title = 'System Error',
  message = 'Failed to load telemetry or network metrics. Please retry.',
  onRetry,
  className = '',
}) {
  return (
    <div
      className={`rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 text-rose-300 flex items-start justify-between gap-3 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">{title}</h4>
          <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 transition-colors flex-shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
