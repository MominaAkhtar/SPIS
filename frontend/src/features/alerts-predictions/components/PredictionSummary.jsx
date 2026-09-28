import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * SPIS PredictionSummary Component
 * AI forecast callout banner matching the Polarization Trend Prediction module.
 */
export default function PredictionSummary({
  title = 'AI PREDICTION SUMMARY',
  summary = 'Polarization is predicted to remain high and may increase further in the next 7 days. Communities exhibiting cross-echo amplification may require early intervention and counter-narrative deployment.',
  className = '',
}) {
  return (
    <div
      className={`rounded-xl bg-[#09101C] border border-[#172338] p-3.5 sm:p-4 flex items-start gap-3 select-none ${className}`}
    >
      <div className="p-2 rounded-lg bg-[#00D284]/10 border border-[#00D284]/20 text-[#00D284] flex-shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00D284] uppercase">
          {title}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed mt-1">
          {summary}
        </p>
      </div>
    </div>
  );
}
