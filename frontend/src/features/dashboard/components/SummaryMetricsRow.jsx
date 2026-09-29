import React from 'react';
import { Link2, BarChart2, GitFork, Share2 } from 'lucide-react';

/**
 * Custom Network Cluster Icon matching screenshot
 */
function ClusterIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <line x1="8.5" y1="13" x2="15.5" y2="17.5" />
      <line x1="8.5" y1="11" x2="15.5" y2="6.5" />
      <line x1="18" y1="7.5" x2="18" y2="16.5" strokeDasharray="2 2" />
    </svg>
  );
}

export default function SummaryMetricsRow() {
  const metrics = [
    {
      title: 'ECHO CHAMBERS',
      value: '47',
      subtitle: 'ACTIVE CLUSTERS',
      change: '+6 vs yesterday',
      changeColor: 'text-[#EF5350]',
      icon: ClusterIcon,
    },
    {
      title: 'BRIDGE USERS',
      value: '312',
      subtitle: 'CROSS-CLUSTER',
      change: '+15 vs yesterday',
      changeColor: 'text-[#2ECC71]',
      icon: Link2,
    },
    {
      title: 'POSTS ANALYZED',
      value: '2.4M',
      subtitle: 'TODAY • LIVE',
      change: '+342k vs yesterday',
      changeColor: 'text-[#2ECC71]',
      icon: BarChart2,
    },
    {
      title: 'COMMUNITIES',
      value: '189',
      subtitle: 'DISCOURSE GROUPS',
      change: '-3 vs yesterday',
      changeColor: 'text-[#EF5350]',
      icon: GitFork,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.title}
            className="bg-[#111827] border border-[#1E2227] hover:border-[#2A3B57] rounded-xl p-5 shadow-none transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase select-none">
                  {m.title}
                </span>
                <Icon className="w-4 h-4 text-[#00BFA5] flex-shrink-0" />
              </div>

              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
                {m.value}
              </div>

              <div className="text-[9px] font-bold text-[#8A94A6] tracking-wider uppercase mt-1 select-none">
                {m.subtitle}
              </div>
            </div>

            <div className={`text-[11px] font-bold ${m.changeColor} mt-3 select-none`}>
              {m.change}
            </div>
          </div>
        );
      })}
    </div>
  );
}
