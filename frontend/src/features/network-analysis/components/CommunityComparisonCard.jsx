import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import {
  COMMUNITY_COMPARISON_OPTIONS,
  COMMUNITY_COMPARISON_DATA,
} from '../data/mockCommunitiesData';

export default function CommunityComparisonCard({ className = '' }) {
  const [selectedMetric, setSelectedMetric] = useState('Polarization');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentData =
    COMMUNITY_COMPARISON_DATA[selectedMetric] ||
    COMMUNITY_COMPARISON_DATA.Polarization;

  return (
    <div className={`bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            COMMUNITY COMPARISON
          </h3>
          <span
            title="Comparison across communities for polarization, modularity, and interaction metrics"
            className="text-[#8A94A6] hover:text-white cursor-help"
          >
            <Info className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Dropdown Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-lg bg-[#0E131E] border border-[#1A2130] text-[11px] font-medium text-[#738094] hover:text-white hover:border-[#2A3B57] transition-all"
          >
            <span>{selectedMetric}</span>
            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-44 rounded-lg bg-[#151E32] border border-[#1E2638] shadow-2xl z-30 py-1 text-xs animate-in fade-in zoom-in-95 duration-150">
              {COMMUNITY_COMPARISON_OPTIONS.map((metric) => (
                <button
                  key={metric}
                  type="button"
                  onClick={() => {
                    setSelectedMetric(metric);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    selectedMetric === metric
                      ? 'text-[#00BFA5] font-semibold bg-[#1E2D4A]'
                      : 'text-slate-300 hover:bg-[#1E2D4A]'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Bars */}
      <div className="space-y-2.5 flex-1">
        {currentData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 group">
            <span className="w-20 text-[11px] text-[#8A94A6] truncate font-normal">
              {item.label}
            </span>

            <div className="flex-1 h-2 bg-[#0E1524] rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>

            <span className="w-6 font-mono text-[11px] font-bold text-white text-right flex-shrink-0">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom X-Axis Ticks & Label */}
      <div className="mt-3 pt-2 border-t border-[#1E2638]/40">
        <div className="pl-20 pr-6 flex items-center justify-between text-[10px] text-[#8A94A6] font-mono">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
        <div className="text-center text-[10px] text-[#8A94A6] font-medium mt-1">
          Score (0-100)
        </div>
      </div>
    </div>
  );
}
