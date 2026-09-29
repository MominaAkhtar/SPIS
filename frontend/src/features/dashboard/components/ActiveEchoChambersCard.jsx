import React from 'react';

export default function ActiveEchoChambersCard() {
  const chambers = [
    {
      name: 'NATIONALIST RIGHT',
      score: '91.4',
      pct: 91.4,
      color: 'bg-[#EF5350]',
      textColor: 'text-[#EF5350]',
      accounts: '42,000 ACCOUNTS',
      change: '+2.2%',
      changeColor: 'text-[#EF5350]',
    },
    {
      name: 'PROGRESSIVE LEFT',
      score: '88.7',
      pct: 88.7,
      color: 'bg-[#EF5350]',
      textColor: 'text-[#EF5350]',
      accounts: '38,500 ACCOUNTS',
      change: '+1.8%',
      changeColor: 'text-[#EF5350]',
    },
    {
      name: 'ANTI-ESTABLISHMENT',
      score: '79.3',
      pct: 79.3,
      color: 'bg-[#FACC15]',
      textColor: 'text-[#FACC15]',
      accounts: '29,100 ACCOUNTS',
      change: '+11.4%',
      changeColor: 'text-[#F97316]',
    },
  ];

  return (
    <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5 sm:p-6 shadow-none h-full flex flex-col">
      <h3 className="text-[11px] font-semibold text-[#C9D1DC] tracking-[0.14em] uppercase mb-6 select-none">
        ACTIVE ECHO CHAMBERS
      </h3>

      <div className="space-y-6">
        {chambers.map((c) => (
          <div key={c.name} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#C9D1DC] tracking-[0.1em] group-hover:text-[#00BFA5] transition-colors">
                {c.name}
              </span>
              <span className={`text-[11px] font-bold tabular-nums ${c.textColor}`}>
                {c.score}
              </span>
            </div>

            {/* Progress track */}
            <div className="w-full h-[3px] rounded-full bg-[#1C2230] overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${c.color} transition-all duration-300`}
                style={{ width: `${c.pct}%` }}
              />
            </div>

            {/* Sub-info */}
            <div className="text-[9px] font-semibold text-[#6B7280] tracking-[0.08em] uppercase select-none">
              {c.accounts} <span className="mx-0.5">•</span>{' '}
              <span className={c.changeColor}>{c.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
