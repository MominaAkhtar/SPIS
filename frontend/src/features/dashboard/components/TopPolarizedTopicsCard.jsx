import React from 'react';

export default function TopPolarizedTopicsCard() {
  const topics = [
    { name: 'IMMIGRATION POLICY', score: '89.2', pct: 89.2, color: 'bg-[#EF5350]', textColor: 'text-[#EF5350]' },
    { name: 'ECONOMIC INEQUALITY', score: '82.7', pct: 82.7, color: 'bg-[#EF5350]', textColor: 'text-[#EF5350]' },
    { name: 'CLIMATE CHANGE', score: '76.4', pct: 76.4, color: 'bg-[#FACC15]', textColor: 'text-[#FACC15]' },
    { name: 'ELECTORAL REFORM', score: '71.1', pct: 71.1, color: 'bg-[#FACC15]', textColor: 'text-[#FACC15]' },
    { name: 'HEALTHCARE ACCESS', score: '62.9', pct: 62.9, color: 'bg-[#2ECC71]', textColor: 'text-[#2ECC71]' },
  ];

  return (
    <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5 sm:p-6 shadow-none h-full flex flex-col">
      <h3 className="text-[11px] font-semibold text-[#C9D1DC] tracking-[0.14em] uppercase mb-6 select-none">
        TOP POLARIZED TOPICS
      </h3>

      <div className="space-y-7">
        {topics.map((t) => (
          <div key={t.name} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#C9D1DC] tracking-[0.1em] group-hover:text-[#00BFA5] transition-colors">
                {t.name}
              </span>
              <span className={`text-[11px] font-bold tabular-nums ${t.textColor}`}>
                {t.score}
              </span>
            </div>
            {/* Progress track */}
            <div className="w-full h-[3px] rounded-full bg-[#1C2230] overflow-hidden">
              <div
                className={`h-full rounded-full ${t.color} transition-all duration-300`}
                style={{ width: `${t.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
