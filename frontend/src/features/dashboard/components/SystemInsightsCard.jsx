import React from 'react';
import { Zap, Target, WandSparkles } from 'lucide-react';

export default function SystemInsightsCard() {
  const insights = [
    {
      title: 'FASTEST GROWING',
      text: 'Immigration Policy cluster up 12.4% this week. Maximum sentiment divergence detected.',
      icon: Zap,
      iconBg: 'bg-[#2A1518] text-[#EF5350] border border-[#E74C3C]/40',
    },
    {
      title: 'HIGHEST RISK COMMUNITY',
      text: 'Nationalist Right cluster — modularity 0.94, signaling near-total isolation from mainstream discourse.',
      icon: Target,
      iconBg: 'bg-[#2B2410] text-[#FACC15] border border-[#FACC15]/40',
    },
    {
      title: 'AI PREDICTION',
      text: 'Forecast model updated — critical polarization threshold likely within 72h at 78% probability.',
      icon: WandSparkles,
      iconBg: 'bg-[#0F2A2A] text-[#00BFA5] border border-[#00BFA5]/40',
    },
  ];

  return (
    <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5 sm:p-6 shadow-none h-full flex flex-col">
      <h3 className="text-[11px] font-semibold text-[#C9D1DC] tracking-[0.14em] uppercase mb-6 select-none">
        SYSTEM INSIGHTS
      </h3>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-lg bg-[#131B29] border border-[#1E2A3A] hover:border-[#2A3B57] transition-all flex items-start gap-3.5 group cursor-pointer"
            >
              <div
                className={`w-9 h-9 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-[18px] h-[18px]" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.08em] group-hover:text-[#00BFA5] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#8A94A6] mt-1.5 leading-[1.55]">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
