import React from 'react';
import { Users } from 'lucide-react';

export default function HighRiskCommunitiesList({
  communities = [
    {
      id: 'comm-a',
      name: 'Community A',
      risk: 'HIGH',
      badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      volume: '4.8K',
      polarity: '85%',
    },
    {
      id: 'comm-b',
      name: 'Community B',
      risk: 'HIGH',
      badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      volume: '3.9K',
      polarity: '81%',
    },
    {
      id: 'comm-c',
      name: 'Community C',
      risk: 'MEDIUM',
      badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      volume: '2.7K',
      polarity: '74%',
    },
  ],
  className = '',
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {communities.map((c) => (
        <div
          key={c.id}
          className="p-3 rounded-xl bg-[#09101C] border border-[#172338] hover:border-[#223654] transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-lg bg-[#111D33] border border-[#1E2D48] text-slate-400 group-hover:text-white transition-colors flex-shrink-0">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                {c.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                Daily Volume: <span className="text-slate-200">{c.volume}</span> • Polarity: <span className="text-rose-400 font-semibold">{c.polarity}</span>
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono tracking-wider flex-shrink-0 ${c.badgeClass}`}
          >
            {c.risk}
          </span>
        </div>
      ))}
    </div>
  );
}
