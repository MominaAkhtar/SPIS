import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * SPIS PredictionSummary Component
 * AI forecast callout banner inside the Polarization Trend Prediction module.
 * Matches the Figma design text, typography, and styling.
 */
export default function PredictionSummary({
  title = 'AI PREDICTION SUMMARY',
  summary = 'Polarization is predicted to remain high and may increase further in the next 7 days. Continuous monitoring and early intervention recommended.',
  className = '',
}) {
  return (
    <div
      className={`rounded-xl bg-[#0E1524] border border-[#1E2638] p-3 sm:p-3.5 flex items-start gap-3 select-none ${className}`}
    >
      <div className="w-8 h-8 rounded-lg bg-[#00BFA5]/15 border border-[#00BFA5]/30 text-[#00BFA5] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4 fill-current stroke-none" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[11px] font-bold tracking-wider text-white uppercase font-sans">
          {title}
        </h4>
        <p className="text-xs text-[#8A94A6] leading-relaxed mt-0.5">
          {summary}
        </p>
      </div>
    </div>
  );
}
