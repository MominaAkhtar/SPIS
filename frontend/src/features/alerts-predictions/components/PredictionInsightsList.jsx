import React from 'react';
import { TrendingUp, AlertOctagon, Lightbulb } from 'lucide-react';

export default function PredictionInsightsList({
  insights = [
    {
      id: 1,
      icon: <TrendingUp className="w-4 h-4 text-amber-400" />,
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      text: 'Polarization likely to increase by 6% in the next 7 days driven by political and religious discussions.',
    },
    {
      id: 2,
      icon: <AlertOctagon className="w-4 h-4 text-rose-400" />,
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      text: '2 communities are at critical risk of echo chamber entrenchment.',
    },
    {
      id: 3,
      icon: <Lightbulb className="w-4 h-4 text-[#00BFA5]" />,
      iconBg: 'bg-[#00BFA5]/10 border-[#00BFA5]/20',
      text: 'Timely interventions can reduce predicted polarization by up to 15%.',
    },
  ],
  className = '',
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {insights.map((item) => (
        <div
          key={item.id}
          className="p-3 rounded-xl bg-[#111416] border border-[#1B2638] hover:border-[#263954] transition-all flex items-start gap-3 select-none"
        >
          <div
            className={`p-2 rounded-lg border ${item.iconBg} flex-shrink-0 mt-0.5`}
          >
            {item.icon}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
