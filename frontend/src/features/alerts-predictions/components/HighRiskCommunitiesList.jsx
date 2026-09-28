import React from 'react';
import { Users } from 'lucide-react';

/**
 * SPIS HighRiskCommunitiesList Component
 * Displays ranked community clusters exhibiting polarization or boundary isolation.
 * Sized to match Prediction Insights inner cards.
 */
export default function HighRiskCommunitiesList({
  communities = [
    {
      id: 'comm-a',
      index: 1,
      name: 'Community A',
      score: 85,
      risk: 'VERY HIGH',
      isVeryHigh: true,
      iconType: 'users',
    },
    {
      id: 'comm-b',
      index: 2,
      name: 'Community B',
      score: 72,
      risk: 'HIGH',
      isVeryHigh: false,
      iconType: 'number',
    },
    {
      id: 'comm-c',
      index: 3,
      name: 'Community C',
      score: 68,
      risk: 'HIGH',
      isVeryHigh: false,
      iconType: 'number',
    },
  ],
  className = '',
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {communities.map((c) => {
        const isCritical = c.isVeryHigh || c.risk === 'VERY HIGH';
        const badgeBorder = isCritical
          ? 'border-[#EF5350] text-[#EF5350] bg-[#EF5350]/10'
          : 'border-[#F1C40F] text-[#F1C40F] bg-[#F1C40F]/10';

        return (
          <div
            key={c.id}
            className="px-3.5 py-2.5 rounded-xl bg-[#131B28]/90 border border-[#1E2638] hover:border-[#2A3B57] transition-all flex items-center justify-between gap-3 group min-h-[56px] select-none"
          >
            {/* Left Icon + Community Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#182232] border border-[#1E2638] text-slate-300 group-hover:text-white flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                {c.iconType === 'users' ? (
                  <Users className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                ) : (
                  <span>{c.index}.</span>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-slate-100 truncate">
                  {c.name}
                </h4>
                <p className="text-[11px] text-[#8A94A6] mt-0.5 truncate">
                  Risk Score: <span className="text-slate-300">{c.score}</span>
                </p>
              </div>
            </div>

            {/* Threat Badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono tracking-wider flex-shrink-0 ${badgeBorder}`}
            >
              {c.risk}
            </span>
          </div>
        );
      })}
    </div>
  );
}
