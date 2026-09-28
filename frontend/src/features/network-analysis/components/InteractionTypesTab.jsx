import React, { useState } from 'react';
import {
  MessageSquare,
  Reply,
  Repeat,
  Heart,
  AtSign,
  Quote,
  Info,
  ChevronDown,
  Maximize2,
  RefreshCw,
  Settings,
  Zap,
} from 'lucide-react';
import NetworkGraph from '../../../components/charts/NetworkGraph';
import SparklineChart from '../../../components/charts/SparklineChart';
import HeatmapGrid from '../../../components/charts/HeatmapGrid';
import DonutChart from '../../../components/charts/DonutChart';
import SentimentStackedBarChart from '../../../components/charts/SentimentStackedBarChart';

// Six Summary Metric Cards Data
const SUMMARY_METRICS = [
  {
    id: 'total',
    title: 'TOTAL INTERACTIONS',
    value: '284,721',
    change: '8.7%',
    trendText: 'vs yesterday',
    isPositive: true,
    icon: MessageSquare,
    iconColor: 'text-[#00BFA5]',
    iconBg: 'bg-[#142222] border-[#00BFA5]/30',
  },
  {
    id: 'replies',
    title: 'REPLIES',
    value: '128,542',
    pct: '45.2%',
    pctColor: 'text-[#3498DB]',
    icon: Reply,
    iconColor: 'text-[#3498DB]',
    iconBg: 'bg-[#152434] border-[#3498DB]/30',
  },
  {
    id: 'reposts',
    title: 'REPOSTS / RETWEETS',
    value: '62,843',
    pct: '22.1%',
    pctColor: 'text-[#2ECC71]',
    icon: Repeat,
    iconColor: 'text-[#2ECC71]',
    iconBg: 'bg-[#142222] border-[#2ECC71]/30',
  },
  {
    id: 'likes',
    title: 'LIKES / REACTIONS',
    value: '72,316',
    pct: '25.4%',
    pctColor: 'text-[#EC407A]',
    icon: Heart,
    iconColor: 'text-[#EC407A]',
    iconBg: 'bg-[#341624] border-[#EC407A]/30',
  },
  {
    id: 'mentions',
    title: 'MENTIONS',
    value: '15,632',
    pct: '5.5%',
    pctColor: 'text-[#FFA500]',
    icon: AtSign,
    iconColor: 'text-[#FFA500]',
    iconBg: 'bg-[#282117] border-[#FFA500]/30',
  },
  {
    id: 'quotes',
    title: 'QUOTES',
    value: '5,388',
    pct: '1.9%',
    pctColor: 'text-[#7E57C2]',
    icon: Quote,
    iconColor: 'text-[#7E57C2]',
    iconBg: 'bg-[#1A1532] border-[#7E57C2]/30',
  },
];

// Interaction Breakdown Table Data
const BREAKDOWN_ROWS = [
  {
    type: 'Replies',
    icon: Reply,
    iconColor: 'text-[#3498DB]',
    volume: '128,542',
    pct: '45.2%',
    trend: [38, 42, 39, 45, 48, 44, 52],
    trendColor: '#3498DB',
    sentiment: '-0.12',
    sentimentColor: 'text-slate-300',
  },
  {
    type: 'Reposts',
    icon: Repeat,
    iconColor: 'text-[#2ECC71]',
    volume: '62,843',
    pct: '22.1%',
    trend: [22, 24, 21, 26, 25, 28, 30],
    trendColor: '#2ECC71',
    sentiment: '-0.05',
    sentimentColor: 'text-slate-300',
  },
  {
    type: 'Likes',
    icon: Heart,
    iconColor: 'text-[#EC407A]',
    volume: '72,316',
    pct: '25.4%',
    trend: [32, 29, 34, 31, 36, 35, 40],
    trendColor: '#EC407A',
    sentiment: '0.18',
    sentimentColor: 'text-[#2ECC71] font-semibold',
  },
  {
    type: 'Mentions',
    icon: AtSign,
    iconColor: 'text-[#FFA500]',
    volume: '15,632',
    pct: '5.5%',
    trend: [15, 14, 16, 13, 17, 15, 16],
    trendColor: '#FFA500',
    sentiment: '-0.07',
    sentimentColor: 'text-slate-300',
  },
  {
    type: 'Quotes',
    icon: Quote,
    iconColor: 'text-[#7E57C2]',
    volume: '5,388',
    pct: '1.9%',
    trend: [7, 8, 6, 8, 9, 8, 10],
    trendColor: '#7E57C2',
    sentiment: '-0.14',
    sentimentColor: 'text-slate-300',
  },
];

// Donut Chart Distribution Data
const INTERACTION_SHARE_DATA = [
  { label: 'Replies', value: 128542, percent: 45.2, color: '#3498DB' },
  { label: 'Likes', value: 72316, percent: 25.4, color: '#EC407A' },
  { label: 'Reposts', value: 62843, percent: 22.1, color: '#2ECC71' },
  { label: 'Mentions', value: 15632, percent: 5.5, color: '#FFA500' },
  { label: 'Quotes', value: 5388, percent: 1.9, color: '#7E57C2' },
];

export default function InteractionTypesTab() {
  const [interactionFilter, setInteractionFilter] = useState('All Interactions');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sentimentScope, setSentimentScope] = useState('Overall');
  const [isSentimentScopeOpen, setIsSentimentScopeOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* 1. Six Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {SUMMARY_METRICS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] transition-all duration-200 rounded-xl p-3.5 sm:p-4 flex items-center gap-3 shadow-sm relative group overflow-hidden"
            >
              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-lg border ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Text Container */}
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wider truncate block">
                  {card.title}
                </span>

                <div className="mt-0.5">
                  <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                    {card.value}
                  </span>
                </div>

                <div className="mt-0.5 text-xs truncate">
                  {card.change !== undefined ? (
                    <span className="inline-flex items-center text-[11px] font-medium text-[#2ECC71]">
                      <span className="mr-0.5">↑</span>
                      {card.change}{' '}
                      <span className="ml-1 text-[#8A94A6] font-normal">
                        {card.trendText}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[#8A94A6] text-[11px]">
                      <span className={`${card.pctColor} font-semibold mr-1`}>
                        {card.pct}
                      </span>
                      of total
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Middle Section: Network Visualization (7 cols) & Breakdown + Heatmap (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interaction Network Visualization Panel (7 columns) */}
        <div className="lg:col-span-7 bg-[#111827] border border-[#1E2638] rounded-xl p-4 flex flex-col shadow-sm">
          {/* Panel Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">
                Interaction Network Visualization
              </h2>
              <span
                title="Interactive multi-cluster graph showing cross-community interactions"
                className="text-[#8A94A6] hover:text-white cursor-help"
              >
                <Info className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Interaction Type Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-lg bg-[#15181C] border border-[#262B33] text-xs font-medium text-[#9AA3B2] hover:text-white hover:border-[#3A4150] transition-all"
                >
                  <span>{interactionFilter}</span>
                  <ChevronDown className="w-4 h-4 text-[#9AA3B2] flex-shrink-0" strokeWidth={2.5} />
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-1 w-44 rounded-lg bg-[#151E32] border border-[#1E2638] shadow-xl z-30 py-1 text-xs">
                    {[
                      'All Interactions',
                      'Replies Only',
                      'Reposts Only',
                      'Likes Only',
                      'Mentions Only',
                      'Quotes Only',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setInteractionFilter(opt);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#1E2D4A] ${
                          interactionFilter === opt
                            ? 'text-[#00BFA5] font-semibold'
                            : 'text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Icons */}
              <button
                type="button"
                title="Expand fullscreen"
                className="p-1 text-[#8A94A6] hover:text-white transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Reset layout"
                className="p-1 text-[#8A94A6] hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Visualization Settings"
                className="p-1 text-[#8A94A6] hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Network Canvas with community labels and zoom controls */}
          <div className="flex-1 min-h-[380px] sm:min-h-[420px] w-full flex flex-col">
            <NetworkGraph
              fill
              showLegend={true}
              showLabels={true}
              showControls={true}
            />
          </div>
        </div>

        {/* Right: Interaction Breakdown & Intensity Heatmap (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Top Right Card: INTERACTION BREAKDOWN */}
          <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-1.5 mb-3">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                INTERACTION BREAKDOWN
              </h2>
              <span
                title="Detailed volume, distribution, and 7-day trend across interaction categories"
                className="text-[#8A94A6] hover:text-white cursor-help"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse select-none">
                <thead>
                  <tr className="border-b border-[#1E2638] text-[10px] uppercase font-bold text-[#8A94A6] tracking-wider">
                    <th className="py-2 px-2">TYPE</th>
                    <th className="py-2 px-2 text-right">VOLUME</th>
                    <th className="py-2 px-2 text-right">% OF TOTAL</th>
                    <th className="py-2 px-2 text-center w-20">TREND (7D)</th>
                    <th className="py-2 px-2 text-right whitespace-nowrap">AVG. SENTIMENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2638]/50 text-xs">
                  {BREAKDOWN_ROWS.map((row) => {
                    const Icon = row.icon;
                    return (
                      <tr
                        key={row.type}
                        className="hover:bg-[#151E32]/50 text-slate-300 transition-colors"
                      >
                        {/* Type with Icon */}
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${row.iconColor}`} />
                            <span className="font-semibold text-white text-xs">
                              {row.type}
                            </span>
                          </div>
                        </td>

                        {/* Volume */}
                        <td className="py-2.5 px-2 text-right font-medium text-white font-mono">
                          {row.volume}
                        </td>

                        {/* % of Total */}
                        <td className="py-2.5 px-2 text-right text-[#8A94A6] font-mono">
                          {row.pct}
                        </td>

                        {/* Trend 7D Sparkline */}
                        <td className="py-2.5 px-2 text-center">
                          <div className="flex items-center justify-center">
                            <SparklineChart
                              data={row.trend}
                              color={row.trendColor}
                              width={64}
                              height={20}
                              strokeWidth={1.6}
                            />
                          </div>
                        </td>

                        {/* Avg Sentiment */}
                        <td className={`py-2.5 px-2 text-right font-mono text-xs ${row.sentimentColor}`}>
                          {row.sentiment}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Right Card: INTERACTION INTENSITY HEATMAP */}
          <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-1.5 mb-3">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                INTERACTION INTENSITY HEATMAP
              </h2>
              <span
                title="Transition and co-occurrence intensity between interaction types"
                className="text-[#8A94A6] hover:text-white cursor-help"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Heatmap Grid */}
            <HeatmapGrid />
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Three Cards (Sentiment, Share Donut, Key Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: SENTIMENT BY INTERACTION TYPE */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
                SENTIMENT BY INTERACTION TYPE
              </h3>
              <span
                title="Sentiment distribution categorized across each interaction category"
                className="text-[#8A94A6] hover:text-white cursor-help"
              >
                <Info className="w-4 h-4" />
              </span>
            </div>

            {/* Scope Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSentimentScopeOpen(!isSentimentScopeOpen)}
                className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-lg bg-[#0E131E] border border-[#1A2130] text-[11px] font-medium text-[#738094] hover:text-white transition-all"
              >
                <span>{sentimentScope}</span>
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
              </button>
              {isSentimentScopeOpen && (
                <div className="absolute right-0 mt-1 w-32 rounded-lg bg-[#0E131E] border border-[#1A2130] shadow-xl z-30 py-1 text-xs">
                  {['Overall', 'Community A', 'Community B', 'Community C', 'Community D', 'Community E'].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSentimentScope(opt);
                          setIsSentimentScopeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#151E32] ${
                          sentimentScope === opt ? 'text-[#00BFA5] font-semibold' : 'text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Subheader Sentiment Legend */}
          <div className="flex items-center gap-4 mb-4 text-[10px] font-semibold tracking-wider text-[#8A94A6]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
              <span>POSITIVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#616475]" />
              <span>NEUTRAL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E74C3C]" />
              <span>NEGATIVE</span>
            </div>
          </div>

          {/* Stacked Bars Component */}
          <div className="flex-1 flex flex-col justify-center">
            <SentimentStackedBarChart />
          </div>
        </div>

        {/* Card 2: INTERACTION SHARE */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
              INTERACTION SHARE
            </h3>
            <span
              title="Proportion of total engagement across interaction types"
              className="text-[#8A94A6] hover:text-white cursor-help"
            >
              <Info className="w-4 h-4" />
            </span>
          </div>

          {/* Donut Chart with clean layout matching screenshot */}
          <div className="flex-1 flex items-center justify-center">
            <DonutChart
              data={INTERACTION_SHARE_DATA}
              showCenterCallout={false}
              showLegendValues={false}
              legendShape="square"
              infoText={null}
              size={155}
              strokeWidth={22}
              className="w-full"
            />
          </div>
        </div>

        {/* Card 3: KEY INSIGHTS */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
              KEY INSIGHTS
            </h3>
            <span
              title="Automated intelligence observations on interaction patterns"
              className="text-[#8A94A6] hover:text-white cursor-help"
            >
              <Info className="w-4 h-4" />
            </span>
          </div>

          {/* Insights List */}
          <div className="flex-1 flex flex-col justify-between gap-3">
            {/* Insight 1: Replies */}
            <div className="p-3 rounded-lg bg-[#0E1524] border border-[#1A253D] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#14233D] text-[#3498DB] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Replies dominate</strong> the conversation with 45.2% of total interactions, indicating high discussion activity.
              </p>
            </div>

            {/* Insight 2: Reposts */}
            <div className="p-3 rounded-lg bg-[#0E1524] border border-[#1A253D] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#142222] text-[#2ECC71] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Repeat className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Reposts show strong</strong> amplification potential with 22.1% of total interactions.
              </p>
            </div>

            {/* Insight 3: Likes */}
            <div className="p-3 rounded-lg bg-[#0E1524] border border-[#1A253D] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#341624] text-[#EC407A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Likes/Reactions reflect</strong> active engagement and approval within the network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
