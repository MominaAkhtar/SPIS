import React from 'react';
import { Users, LineChart, Shield, Shuffle, GitFork, Zap } from 'lucide-react';

const ICON_MAP = {
  users: Users,
  chart: LineChart,
  shield: Shield,
  shuffle: Shuffle,
  fork: Shuffle,
  zap: Zap,
};

export default function CommunityKpiCard({ metric }) {
  const Icon = ICON_MAP[metric.iconType] || Users;

  return (
    <div className="bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] transition-all duration-200 rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm group">
      {/* Icon Container */}
      <div
        className={`w-10 h-10 rounded-lg ${metric.iconBg} ${metric.iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <span className="text-[10px] sm:text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider truncate block">
          {metric.title}
        </span>

        <div className="mt-0.5">
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight font-mono-numbers">
            {metric.value}
          </span>
        </div>

        <div className="mt-0.5 text-xs truncate">
          {metric.secondaryType === 'trend' && (
            <span className="inline-flex items-center text-[11px] font-medium text-[#AF7AC5]">
              <span className="mr-0.5">↑</span>
              {metric.change}{' '}
              <span className="ml-1 text-[#8A94A6] font-normal">
                {metric.trendText}
              </span>
            </span>
          )}

          {metric.secondaryType === 'text' && (
            <span className={`text-[11px] font-medium ${metric.subTextColor || 'text-[#3498DB]'}`}>
              {metric.subText}
            </span>
          )}

          {metric.secondaryType === 'dualBadge' && (
            <span className="text-[11px]">
              <span className="text-[#EF5350] font-semibold">
                {metric.highCount} High
              </span>
              <span className="text-[#8A94A6] mx-1">•</span>
              <span className="text-[#FFA500] font-semibold">
                {metric.modCount} Moderate
              </span>
            </span>
          )}

          {metric.secondaryType === 'trendDownGreen' && (
            <span className="inline-flex items-center text-[11px] font-medium text-[#2ECC71]">
              <span className="mr-0.5">↓</span>
              {metric.change}{' '}
              <span className="ml-1 text-[#8A94A6] font-normal">
                {metric.trendText}
              </span>
            </span>
          )}

          {metric.secondaryType === 'trendDownAmber' && (
            <span className="inline-flex items-center text-[11px] font-medium text-[#FFA500]">
              <span className="mr-0.5">↓</span>
              {metric.change}{' '}
              <span className="ml-1 text-[#8A94A6] font-normal">
                {metric.trendText}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
