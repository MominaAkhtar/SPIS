import React from 'react';
import { Info } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import SparklineChart from '../../../components/charts/SparklineChart';

export default function CommunitySummaryTable({
  communities = [],
  selectedCommunity,
  onSelectCommunity,
  onViewAll,
  className = '',
}) {
  const getBadgeStyle = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return 'bg-[#2A1518] text-[#EF5350] border border-[#EF5350]/30';
      case 'medium':
        return 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30';
      case 'low':
      default:
        return 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30';
    }
  };

  return (
    <div className={`bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-white tracking-wide">
            Community Summary
          </h2>
          <span
            title="Overview of detected political clusters, member counts, and polarization"
            className="text-[#8A94A6] hover:text-white cursor-help"
          >
            <Info className="w-4 h-4" />
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#00BFA5] hover:text-[#42D9C8] flex items-center gap-1 transition-colors group"
        >
          <span>View All</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto flex-1 flex flex-col justify-between mt-1">
        <table className="w-full text-left border-collapse select-none h-full">
          <thead>
            <tr className="border-b border-[#1E2638] text-[10px] uppercase font-bold text-[#8A94A6] tracking-wider">
              <th className="py-2.5 px-3">Community</th>
              <th className="py-2.5 px-3 text-right sm:text-left">Users</th>
              <th className="py-2.5 px-3 text-center">Echo Risk</th>
              <th className="py-2.5 px-3 text-center">Polarization</th>
              <th className="py-2.5 px-3 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2638]/50 text-xs">
            {communities.map((comm) => {
              const isSelected = selectedCommunity?.id === comm.id;

              return (
                <tr
                  key={comm.id}
                  onClick={() => onSelectCommunity?.(comm)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#151E32] text-white'
                      : 'hover:bg-[#151E32]/50 text-slate-300'
                  }`}
                >
                  {/* Community Name & Color Indicator */}
                  <td className="py-4 sm:py-5 px-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: comm.dotColor }}
                      />
                      <span className="font-medium text-white text-xs whitespace-nowrap">
                        {comm.name}
                      </span>
                    </div>
                  </td>

                  {/* Users */}
                  <td className="py-4 sm:py-5 px-3 text-right sm:text-left font-mono text-xs text-white">
                    {comm.users}
                  </td>

                  {/* Echo Risk Badge */}
                  <td className="py-4 sm:py-5 px-3 text-center">
                    <Badge
                      variant={
                        comm.echoRisk?.toLowerCase() === 'high'
                          ? 'critical'
                          : comm.echoRisk?.toLowerCase() === 'medium'
                          ? 'medium'
                          : 'low'
                      }
                      size="xs"
                      className={`rounded px-2.5 py-0.5 text-[10px] font-bold tracking-wide capitalize ${
                        comm.echoRisk?.toLowerCase() === 'high'
                          ? 'bg-[#2A1518] text-[#EF5350] border-[#EF5350]/30'
                          : comm.echoRisk?.toLowerCase() === 'medium'
                          ? 'bg-[#2B2117] text-[#FFA500] border-[#FFA500]/30'
                          : 'bg-[#142222] text-[#2ECC71] border-[#2ECC71]/30'
                      }`}
                    >
                      {comm.echoRisk}
                    </Badge>
                  </td>

                  {/* Polarization */}
                  <td className="py-4 sm:py-5 px-3 text-center font-mono text-xs text-slate-300">
                    {comm.polarization}
                  </td>

                  {/* Trend Sparkline */}
                  <td className="py-4 sm:py-5 px-3 text-right">
                    <div className="inline-flex justify-end">
                      <SparklineChart
                        data={comm.trendData}
                        color={comm.trendColor}
                        width={78}
                        height={28}
                        strokeWidth={1.8}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
