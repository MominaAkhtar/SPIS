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
      className={`rounded-xl bg-[#111416] border border-[#1B2638] p-3.5 sm:p-4 flex items-start gap-3 select-none ${className}`}
    >
      <div className="p-2 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 text-[#00BFA5] flex-shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00BFA5] uppercase">
          {title}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed mt-1">
          {summary}
        </p>
      </div>
    </div>
  );
}
