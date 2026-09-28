import React from 'react';
import { TrendingUp, Network, HelpCircle } from 'lucide-react';

/**
 * SPIS PredictionInsightsList Component
 * Displays automated qualitative insights from NLP / AI classification.
 * Matches HighRiskCommunitiesList inner card sizing and Figma design.
 */
export default function PredictionInsightsList({
  insights = [
    {
      id: 1,
      icon: <TrendingUp className="w-4 h-4 text-[#F1C40F]" />,
      text: 'Polarization likely to increase by 6% in the next 7 days driven by political and religious discussions.',
    },
    {
      id: 2,
      icon: <Network className="w-4 h-4 text-[#00BFA5]" />,
      text: '2 communities are at critical risk of echo chamber entrenchment.',
    },
    {
      id: 3,
      icon: <HelpCircle className="w-4 h-4 text-[#00BFA5]" />,
      text: 'Timely interventions can reduce predicted polarization by up to 15%.',
    },
  ],
  className = '',
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {insights.map((item) => (
        <div
          key={item.id}
          className="px-3.5 py-2.5 rounded-xl bg-[#131B28]/90 border border-[#1E2638] hover:border-[#2A3B57] transition-all flex items-center gap-3 select-none min-h-[56px]"
        >
          <div className="w-8 h-8 rounded-lg bg-[#182232] border border-[#1E2638] flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
