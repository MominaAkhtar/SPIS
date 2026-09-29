import React from 'react';
import {
  Users,
  BarChart2,
  Minimize2,
  Maximize2,
  Zap,
  Info,
} from 'lucide-react';

export default function CommunityDetailCard({
  community,
  onViewDetails,
  className = '',
}) {
  if (!community) return null;

  return (
    <div className={`bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm ${className}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1C1D31] border border-[#552E6E]/40 text-[#AF7AC5] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Users className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {community.code || 'COMMUNITY 01'}
            </h3>
            <div className="mt-1">
              <span className="px-2 py-0.5 rounded border border-[#EF5350]/60 text-[#EF5350] bg-[#2A1518]/60 text-[9px] font-bold tracking-wider uppercase inline-block">
                ECHO CHAMBER: {community.riskLevel || 'HIGH'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewDetails}
          className="text-xs font-semibold text-[#00BFA5] hover:text-[#42D9C8] flex items-center gap-1 transition-colors group pt-1"
        >
          <span>View Details</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      {/* 5 Compact Metric Cards */}
      <div className="grid grid-cols-5 gap-2 mb-5">
        <div className="bg-[#0E1524] border border-[#1A253D] rounded-xl p-2.5 flex flex-col items-center justify-center text-center group hover:border-[#2A3B57] transition-colors">
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            MEMBERS
          </span>
          <Users className="w-3.5 h-3.5 text-[#8A94A6] my-1" />
          <span className="text-xs sm:text-sm font-bold text-white font-mono-numbers">
            {community.members}
          </span>
        </div>

        <div className="bg-[#0E1524] border border-[#1A253D] rounded-xl p-2.5 flex flex-col items-center justify-center text-center group hover:border-[#2A3B57] transition-colors">
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            MODULARITY
          </span>
          <BarChart2 className="w-3.5 h-3.5 text-[#8A94A6] my-1" />
          <span className="text-xs sm:text-sm font-bold text-white font-mono-numbers">
            {community.modularity}
          </span>
        </div>

        <div className="bg-[#0E1524] border border-[#1A253D] rounded-xl p-2.5 flex flex-col items-center justify-center text-center group hover:border-[#2A3B57] transition-colors">
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            INTERNAL
          </span>
          <Minimize2 className="w-3.5 h-3.5 text-[#8A94A6] my-1" />
          <span className="text-xs sm:text-sm font-bold text-white font-mono-numbers">
            {community.internal}
          </span>
        </div>

        <div className="bg-[#0E1524] border border-[#1A253D] rounded-xl p-2.5 flex flex-col items-center justify-center text-center group hover:border-[#2A3B57] transition-colors">
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            EXTERNAL
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-[#8A94A6] my-1" />
          <span className="text-xs sm:text-sm font-bold text-white font-mono-numbers">
            {community.external}
          </span>
        </div>

        <div className="bg-[#0E1524] border border-[#1A253D] rounded-xl p-2.5 flex flex-col items-center justify-center text-center group hover:border-[#2A3B57] transition-colors">
          <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
            SENTIMENT
          </span>
          <Zap className="w-3.5 h-3.5 text-[#8A94A6] my-1" />
          <span className="text-xs sm:text-sm font-bold text-white font-mono-numbers">
            {community.sentiment}
          </span>
        </div>
      </div>

      {/* Bottom Section: Risk Metrics & Risk Level Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left Side: Echo Chamber Risk Progress Bars */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-1.5 mb-1">
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
              ECHO CHAMBER RISK
            </h4>
            <span
              title="Assessment of cluster isolation, member homogeneity, and out-group engagement"
              className="text-[#8A94A6] hover:text-white cursor-help"
            >
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Metric 1: Isolation */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8A94A6] font-medium text-[11px]">
                Isolation
              </span>
              <span className="text-white font-bold font-mono text-[11px]">
                {community.isolationPct}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#0E1524] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EF5350] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${community.isolationPct}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Internal Similarity */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8A94A6] font-medium text-[11px]">
                Internal Similarity
              </span>
              <span className="text-white font-bold font-mono text-[11px]">
                {community.internalSimilarityPct}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#0E1524] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFEB3B] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${community.internalSimilarityPct}%` }}
              />
            </div>
          </div>

          {/* Metric 3: Cross-Community Interaction */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8A94A6] font-medium text-[11px]">
                Cross-Community Interaction
              </span>
              <span className="text-white font-bold font-mono text-[11px]">
                {community.crossInteractionPct}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#0E1524] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2ECC71] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${community.crossInteractionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Risk Level Dedicated Panel */}
        <div className="md:col-span-5 bg-[#0E1524]/60 border border-[#1E2638] rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-[#8A94A6] uppercase tracking-widest mb-1.5">
            RISK LEVEL
          </span>

          <span className="text-2xl sm:text-3xl font-extrabold text-[#EF5350] tracking-wider mb-2">
            {community.riskLevel || 'HIGH'}
          </span>

          <p className="text-[10.5px] text-[#8A94A6] leading-relaxed max-w-[210px]">
            {community.riskDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
