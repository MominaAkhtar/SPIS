import React from 'react';
import { Info, Frown } from 'lucide-react';
import DonutChart from '../../../components/charts/DonutChart';

export default function DominantTopicsCard({ community, className = '' }) {
  const currentCommunity = community || {
    code: 'COMMUNITY 01',
    dominantTopics: [
      { name: 'Election', pct: 42, color: '#06B6D4' },
      { name: 'Economy', pct: 24, color: '#3498DB' },
      { name: 'Leadership', pct: 16, color: '#9C27B0' },
      { name: 'Policy', pct: 10, color: '#AF7AC5' },
      { name: 'Foreign Affairs', pct: 8, color: '#2A3038' },
    ],
    dominantStance: 'Opposition',
    dominantStanceColor: 'text-[#AF7AC5]',
    sentimentScore: '72% Negative',
    sentimentScoreColor: 'text-[#EF5350]',
  };

  const donutData = currentCommunity.dominantTopics.map((t) => ({
    label: t.name,
    value: t.pct,
    percent: t.pct,
    color: t.color,
  }));

  const topTopic = currentCommunity.dominantTopics[0] || { name: 'Election', pct: 42 };

  return (
    <div className={`bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            DOMINANT TOPICS ({currentCommunity.code || 'COMMUNITY 01'})
          </h3>
          <span
            title="Most frequently discussed political and social themes within this community"
            className="text-[#8A94A6] hover:text-white cursor-help"
          >
            <Info className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Topics List & Donut Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center flex-1">
        {/* Left Column: Topics List */}
        <div className="sm:col-span-7 space-y-1.5">
          <span className="text-[10px] font-bold text-[#8A94A6] uppercase tracking-wider block mb-1">
            TOP TOPICS
          </span>

          {currentCommunity.dominantTopics.map((topic, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={topic.name}
                className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                  isTop
                    ? 'border border-[#7E57C2]/40 bg-[#1C1D31]/40 text-white font-medium'
                    : 'text-slate-300 hover:bg-[#151E32]/40'
                }`}
              >
                <span className="truncate pr-2">{topic.name}</span>
                <span className="font-mono font-bold flex-shrink-0">
                  {topic.pct}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: Donut Chart */}
        <div className="sm:col-span-5 flex items-center justify-center">
          <DonutChart
            data={donutData}
            centerValue={`${topTopic.pct}%`}
            centerLabel={topTopic.name}
            showSideLegend={false}
            showCenterCallout={true}
            size={120}
            strokeWidth={13}
            infoText={null}
          />
        </div>
      </div>

      {/* Bottom Row: Dominant Stance & Sentiment */}
      <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-[#1E2638]/40">
        <div>
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            DOMINANT STANCE
          </span>
          <span
            className={`text-xs sm:text-sm font-bold mt-0.5 block ${
              currentCommunity.dominantStanceColor || 'text-[#AF7AC5]'
            }`}
          >
            {currentCommunity.dominantStance}
          </span>
        </div>

        <div>
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            SENTIMENT
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-xs sm:text-sm font-bold ${
                currentCommunity.sentimentScoreColor || 'text-[#EF5350]'
              }`}
            >
              {currentCommunity.sentimentScore}
            </span>
            <Frown className="w-4 h-4 text-[#EF5350] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
