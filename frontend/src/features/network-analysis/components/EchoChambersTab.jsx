import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Users,
  ArrowLeftRight,
  Share2,
  TrendingDown,
  Info,
  ChevronDown,
  Maximize2,
  RefreshCw,
  Settings,
} from 'lucide-react';
import NetworkGraph from '../../../components/charts/NetworkGraph';
import DonutChart from '../../../components/charts/DonutChart';
import EchoChambersMetricsChart from '../../../components/charts/EchoChambersMetricsChart';

// Six Summary Metric Cards
const SUMMARY_METRICS = [
  {
    id: 'detected',
    title: 'ECHO CHAMBERS DETECTED',
    value: '12',
    change: '2',
    trendText: 'vs yesterday',
    isPositive: true,
    icon: ShieldAlert,
    iconColor: 'text-[#E74C3C]',
    iconBg: 'bg-[#2A1518] border-[#E74C3C]/30',
  },
  {
    id: 'highRisk',
    title: 'HIGH RISK CHAMBERS',
    value: '4',
    pct: '33.3%',
    pctColor: 'text-[#FFA500]',
    subText: 'of total',
    icon: AlertTriangle,
    iconColor: 'text-[#FFA500]',
    iconBg: 'bg-[#2B2117] border-[#FFA500]/30',
  },
  {
    id: 'users',
    title: 'USERS IN ECHO CHAMBER',
    value: '24,581',
    pct: '64.1%',
    pctColor: 'text-[#00BFA5]',
    subText: 'of users',
    icon: Users,
    iconColor: 'text-[#00BFA5]',
    iconBg: 'bg-[#142222] border-[#00BFA5]/30',
  },
  {
    id: 'isolation',
    title: 'AVERAGE ISOLATION SCORE',
    value: '0.74',
    trendLabel: 'High Isolation',
    trendLabelColor: 'text-[#408ACF]',
    icon: ArrowLeftRight,
    iconColor: 'text-[#408ACF]',
    iconBg: 'bg-[#152434] border-[#408ACF]/30',
  },
  {
    id: 'crossChamber',
    title: 'CROSS CHAMBER INTERACTION',
    value: '15.9',
    pct: '5.5%',
    pctColor: 'text-[#9C27B0]',
    subText: 'of total',
    isDown: true,
    icon: Share2,
    iconColor: 'text-[#9C27B0]',
    iconBg: 'bg-[#1C1D31] border-[#9C27B0]/30',
  },
  {
    id: 'diversity',
    title: 'INFORMATION DIVERSITY',
    value: '0.28',
    trendLabel: 'Low Diversity',
    trendLabelColor: 'text-[#2ECC71]',
    icon: TrendingDown,
    iconColor: 'text-[#2ECC71]',
    iconBg: 'bg-[#142222] border-[#2ECC71]/30',
  },
];

// Echo Chamber Risk List Data
const ECHO_CHAMBER_LIST = [
  {
    rank: '01',
    name: 'Chamber 01',
    community: 'Community A',
    users: '5,421',
    isolation: '0.91',
    similarity: '0.88',
    crossInteraction: '8.7%',
    diversity: '0.18',
    risk: 'HIGH',
    riskBadgeColor: 'bg-[#2A1518] text-[#E74C3C] border border-[#E74C3C]/30',
    description:
      'This chamber shows very strong internal connectivity and limited exposure to outside communities. Information diversity is very low, indicating a closed information environment.',
    dominantSentiment: { pct: 74, label: 'NEGATIVE' },
    toxicityRate: 32,
    topTopics: [
      { name: 'Election', pct: 34, color: '#EF5350' },
      { name: 'Government', pct: 22, color: '#00BFA5' },
      { name: 'Opposition', pct: 18, color: '#7E57C2' },
      { name: 'Policy', pct: 12, color: '#3498DB' },
      { name: 'Leadership', pct: 8, color: '#EC407A' },
      { name: 'Economy', pct: 6, color: '#FFA500' },
    ],
    sentiment: [
      { label: 'Negative', value: 74, percent: 74, color: '#E74C3C' },
      { label: 'Neutral', value: 16, percent: 16, color: '#616475' },
      { label: 'Positive', value: 10, percent: 10, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#Election2024', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
      { tag: '#NOTMYVOTE', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
      { tag: '#ChangeNow', color: 'border-[#FFA500]/40 bg-[#2B2117]/60 text-[#FFA500]' },
      { tag: '#WakeUp', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
      { tag: '#Justice', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
    ],
  },
  {
    rank: '02',
    name: 'Chamber 02',
    community: 'Community B',
    users: '4,812',
    isolation: '0.86',
    similarity: '0.83',
    crossInteraction: '10.2%',
    diversity: '0.22',
    risk: 'HIGH',
    riskBadgeColor: 'bg-[#2A1518] text-[#E74C3C] border border-[#E74C3C]/30',
    description:
      'Chamber 02 exhibits severe narrative reinforcement with frequent partisan posting and very little engagement with external perspectives.',
    dominantSentiment: { pct: 68, label: 'NEGATIVE' },
    toxicityRate: 28,
    topTopics: [
      { name: 'Election', pct: 30, color: '#EF5350' },
      { name: 'Media Bias', pct: 25, color: '#7E57C2' },
      { name: 'Opposition', pct: 20, color: '#00BFA5' },
      { name: 'Economy', pct: 14, color: '#FFA500' },
      { name: 'Judiciary', pct: 11, color: '#3498DB' },
    ],
    sentiment: [
      { label: 'Negative', value: 68, percent: 68, color: '#E74C3C' },
      { label: 'Neutral', value: 20, percent: 20, color: '#616475' },
      { label: 'Positive', value: 12, percent: 12, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#ElectionsPK', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
      { tag: '#MediaBlackout', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
      { tag: '#VoiceOfPeople', color: 'border-[#FFA500]/40 bg-[#2B2117]/60 text-[#FFA500]' },
      { tag: '#TruthNow', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
    ],
  },
  {
    rank: '03',
    name: 'Chamber 03',
    community: 'Community C',
    users: '3,947',
    isolation: '0.78',
    similarity: '0.75',
    crossInteraction: '13.5%',
    diversity: '0.29',
    risk: 'HIGH',
    riskBadgeColor: 'bg-[#2A1518] text-[#E74C3C] border border-[#E74C3C]/30',
    description:
      'Demonstrates elevated cluster tightness with dominant focus on economic hardship and high resistance to counter-narratives.',
    dominantSentiment: { pct: 61, label: 'NEGATIVE' },
    toxicityRate: 24,
    topTopics: [
      { name: 'Inflation', pct: 35, color: '#FFA500' },
      { name: 'Governance', pct: 24, color: '#EF5350' },
      { name: 'Protests', pct: 18, color: '#7E57C2' },
      { name: 'Taxes', pct: 13, color: '#00BFA5' },
      { name: 'FuelPrices', pct: 10, color: '#3498DB' },
    ],
    sentiment: [
      { label: 'Negative', value: 61, percent: 61, color: '#E74C3C' },
      { label: 'Neutral', value: 25, percent: 25, color: '#616475' },
      { label: 'Positive', value: 14, percent: 14, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#InflationCrisis', color: 'border-[#FFA500]/40 bg-[#2B2117]/60 text-[#FFA500]' },
      { tag: '#EconomicEmergency', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
      { tag: '#PublicOutcry', color: 'border-[#E74C3C]/40 bg-[#2A1518]/60 text-[#EF5350]' },
    ],
  },
  {
    rank: '04',
    name: 'Chamber 04',
    community: 'Community D',
    users: '3,210',
    isolation: '0.69',
    similarity: '0.68',
    crossInteraction: '18.1%',
    diversity: '0.36',
    risk: 'MEDIUM',
    riskBadgeColor: 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30',
    description:
      'Moderate polarization with some active bridge user connectivity, though internal repost networks remain relatively insular.',
    dominantSentiment: { pct: 52, label: 'NEGATIVE' },
    toxicityRate: 19,
    topTopics: [
      { name: 'Reform', pct: 28, color: '#00BFA5' },
      { name: 'Security', pct: 26, color: '#3498DB' },
      { name: 'Debate', pct: 22, color: '#7E57C2' },
      { name: 'Elections', pct: 15, color: '#EF5350' },
      { name: 'Budget', pct: 9, color: '#FFA500' },
    ],
    sentiment: [
      { label: 'Negative', value: 52, percent: 52, color: '#E74C3C' },
      { label: 'Neutral', value: 30, percent: 30, color: '#616475' },
      { label: 'Positive', value: 18, percent: 18, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#CivicDebate', color: 'border-[#FFA500]/40 bg-[#2B2117]/60 text-[#FFA500]' },
      { tag: '#InstitutionalReform', color: 'border-[#00BFA5]/40 bg-[#142222]/60 text-[#00BFA5]' },
      { tag: '#NationalSecurity', color: 'border-[#3498DB]/40 bg-[#152434]/60 text-[#3498DB]' },
    ],
  },
  {
    rank: '05',
    name: 'Chamber 05',
    community: 'Community E',
    users: '2,896',
    isolation: '0.63',
    similarity: '0.61',
    crossInteraction: '21.4%',
    diversity: '0.41',
    risk: 'MEDIUM',
    riskBadgeColor: 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30',
    description:
      'Balanced cluster with measurable exposure to central discussions and moderate cross-posting activity across community borders.',
    dominantSentiment: { pct: 45, label: 'NEUTRAL' },
    toxicityRate: 15,
    topTopics: [
      { name: 'RegionalPolitics', pct: 29, color: '#EC407A' },
      { name: 'YouthEmpowerment', pct: 24, color: '#00BFA5' },
      { name: 'Infrastructure', pct: 20, color: '#3498DB' },
      { name: 'Education', pct: 16, color: '#7E57C2' },
      { name: 'Health', pct: 11, color: '#FFA500' },
    ],
    sentiment: [
      { label: 'Negative', value: 38, percent: 38, color: '#E74C3C' },
      { label: 'Neutral', value: 45, percent: 45, color: '#616475' },
      { label: 'Positive', value: 17, percent: 17, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#YouthVote', color: 'border-[#EC407A]/40 bg-[#341624]/60 text-[#EC407A]' },
      { tag: '#CommunityAction', color: 'border-[#00BFA5]/40 bg-[#142222]/60 text-[#00BFA5]' },
    ],
  },
  {
    rank: '06',
    name: 'Chamber 06',
    community: 'Community F',
    users: '1,974',
    isolation: '0.51',
    similarity: '0.50',
    crossInteraction: '29.2%',
    diversity: '0.55',
    risk: 'LOW',
    riskBadgeColor: 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30',
    description:
      'Low isolation chamber characterized by frequent cross-boundary dialogues, diverse information sourcing, and low hostility.',
    dominantSentiment: { pct: 51, label: 'POSITIVE' },
    toxicityRate: 9,
    topTopics: [
      { name: 'FactChecking', pct: 33, color: '#2ECC71' },
      { name: 'CivicEducation', pct: 27, color: '#00BFA5' },
      { name: 'Analysis', pct: 21, color: '#3498DB' },
      { name: 'DigitalRights', pct: 19, color: '#7E57C2' },
    ],
    sentiment: [
      { label: 'Negative', value: 22, percent: 22, color: '#E74C3C' },
      { label: 'Neutral', value: 27, percent: 27, color: '#616475' },
      { label: 'Positive', value: 51, percent: 51, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#FactCheck', color: 'border-[#2ECC71]/40 bg-[#142222]/60 text-[#2ECC71]' },
      { tag: '#CivicDialogue', color: 'border-[#00BFA5]/40 bg-[#142222]/60 text-[#00BFA5]' },
    ],
  },
  {
    rank: '07',
    name: 'Chamber 07',
    community: 'Community G',
    users: '1,420',
    isolation: '0.44',
    similarity: '0.42',
    crossInteraction: '36.5%',
    diversity: '0.64',
    risk: 'LOW',
    riskBadgeColor: 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30',
    description:
      'Highly open discussion space functioning as an active bridge zone between polar community clusters.',
    dominantSentiment: { pct: 58, label: 'POSITIVE' },
    toxicityRate: 6,
    topTopics: [
      { name: 'Consensus', pct: 36, color: '#2ECC71' },
      { name: 'PolicyBrief', pct: 28, color: '#00BFA5' },
      { name: 'PublicForum', pct: 22, color: '#3498DB' },
      { name: 'CivilSociety', pct: 14, color: '#FFA500' },
    ],
    sentiment: [
      { label: 'Negative', value: 15, percent: 15, color: '#E74C3C' },
      { label: 'Neutral', value: 27, percent: 27, color: '#616475' },
      { label: 'Positive', value: 58, percent: 58, color: '#2ECC71' },
    ],
    topHashtags: [
      { tag: '#CommonGround', color: 'border-[#2ECC71]/40 bg-[#142222]/60 text-[#2ECC71]' },
      { tag: '#InclusivePK', color: 'border-[#2ECC71]/40 bg-[#142222]/60 text-[#2ECC71]' },
    ],
  },
];

// Comparison metrics datasets for the dropdown
const COMPARISON_METRICS = {
  'Isolation Score': [
    { label: 'Community A', value: 0.91, color: '#EF5350' },
    { label: 'Community B', value: 0.86, color: '#FF7043' },
    { label: 'Community C', value: 0.78, color: '#FFA500' },
    { label: 'Community D', value: 0.69, color: '#00BFA5' },
    { label: 'Community E', value: 0.63, color: '#EC407A' },
    { label: 'Community F', value: 0.51, color: '#3498DB' },
    { label: 'Community G', value: 0.44, color: '#FFEB3B' },
  ],
  'Internal Similarity': [
    { label: 'Community A', value: 0.88, color: '#EF5350' },
    { label: 'Community B', value: 0.83, color: '#FF7043' },
    { label: 'Community C', value: 0.75, color: '#FFA500' },
    { label: 'Community D', value: 0.68, color: '#00BFA5' },
    { label: 'Community E', value: 0.61, color: '#EC407A' },
    { label: 'Community F', value: 0.50, color: '#3498DB' },
    { label: 'Community G', value: 0.42, color: '#FFEB3B' },
  ],
  'Cross-Interaction': [
    { label: 'Community A', value: 0.087, color: '#EF5350' },
    { label: 'Community B', value: 0.102, color: '#FF7043' },
    { label: 'Community C', value: 0.135, color: '#FFA500' },
    { label: 'Community D', value: 0.181, color: '#00BFA5' },
    { label: 'Community E', value: 0.214, color: '#EC407A' },
    { label: 'Community F', value: 0.292, color: '#3498DB' },
    { label: 'Community G', value: 0.365, color: '#FFEB3B' },
  ],
};

export default function EchoChambersTab() {
  const [selectedChamber, setSelectedChamber] = useState(ECHO_CHAMBER_LIST[0]);
  const [interactionFilter, setInteractionFilter] = useState('All Interactions');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [comparisonMetric, setComparisonMetric] = useState('Isolation Score');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isChamberDropdownOpen, setIsChamberDropdownOpen] = useState(false);

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
                  ) : card.pct !== undefined ? (
                    <span className="text-[#8A94A6] text-[11px]">
                      {card.isDown && <span className="text-[#9C27B0] mr-0.5">↓</span>}
                      <span className={`${card.pctColor} font-semibold mr-1`}>
                        {card.pct}
                      </span>
                      {card.subText}
                    </span>
                  ) : (
                    <span className={`text-[11px] font-medium ${card.trendLabelColor}`}>
                      {card.trendLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Middle Section: Network Visualization (7 cols) & Echo Chamber Risk List (5 cols) */}
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
                title="Clustered visual map of polarized echo chambers and boundary users"
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

        {/* Right: ECHO CHAMBER RISK LIST (5 columns) */}
        <div className="lg:col-span-5 bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              ECHO CHAMBER RISK LIST
            </h2>

            <button
              type="button"
              className="text-xs font-semibold text-[#00BFA5] hover:text-[#42D9C8] flex items-center gap-1 transition-colors group"
            >
              <span>VIEW ALL</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse select-none">
              <thead>
                <tr className="border-b border-[#1E2638] text-[10px] uppercase font-bold text-[#8A94A6] tracking-wider">
                  <th className="py-2 px-1 w-10 text-center">RANK</th>
                  <th className="py-2 px-2">ECHO CHAMBER</th>
                  <th className="py-2 px-2 text-right">USERS</th>
                  <th className="py-2 px-2 text-right">ISOLATION</th>
                  <th className="py-2 px-2 text-right">SIMILARITY</th>
                  <th className="py-2 px-1 text-center">RISK LEVEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2638]/50 text-xs">
                {ECHO_CHAMBER_LIST.map((chamber) => {
                  const isSelected = selectedChamber.rank === chamber.rank;

                  return (
                    <tr
                      key={chamber.rank}
                      onClick={() => setSelectedChamber(chamber)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#151E32] text-white'
                          : 'hover:bg-[#151E32]/50 text-slate-300'
                      }`}
                    >
                      {/* Rank */}
                      <td
                        className={`py-2.5 px-1 text-center font-mono text-[11px] ${
                          chamber.rank === '01'
                            ? 'text-white font-bold'
                            : 'text-[#8A94A6]'
                        }`}
                      >
                        {chamber.rank}
                      </td>

                      {/* Echo Chamber Name */}
                      <td className="py-2.5 px-2 font-medium text-white text-xs">
                        {chamber.name}
                      </td>

                      {/* Users */}
                      <td className="py-2.5 px-2 text-right font-mono text-xs text-white">
                        {chamber.users}
                      </td>

                      {/* Isolation */}
                      <td className="py-2.5 px-2 text-right font-mono text-xs text-slate-300">
                        {chamber.isolation}
                      </td>

                      {/* Similarity */}
                      <td className="py-2.5 px-2 text-right font-mono text-xs text-slate-300">
                        {chamber.similarity}
                      </td>

                      {/* Risk Level Badge */}
                      <td className="py-2.5 px-1 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${chamber.riskBadgeColor}`}
                        >
                          {chamber.risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Three Cards (Comparison, Selected Chamber Insight, Content Overview) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: ECHO CHAMBERS METRICS COMPARISON */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col justify-between shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
              ECHO CHAMBERS METRICS COMPARISON
            </h3>

            {/* Metric Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsComparisonOpen(!isComparisonOpen)}
                className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-lg bg-[#0E131E] border border-[#1A2130] text-[11px] font-medium text-[#738094] hover:text-white transition-all"
              >
                <span>{comparisonMetric}</span>
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
              </button>
              {isComparisonOpen && (
                <div className="absolute right-0 mt-1 w-40 rounded-lg bg-[#0E131E] border border-[#1A2130] shadow-xl z-30 py-1 text-xs">
                  {Object.keys(COMPARISON_METRICS).map((metric) => (
                    <button
                      key={metric}
                      type="button"
                      onClick={() => {
                        setComparisonMetric(metric);
                        setIsComparisonOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#151E32] ${
                        comparisonMetric === metric ? 'text-[#00BFA5] font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Comparison Horizontal Bar Chart */}
          <div className="flex-1">
            <EchoChambersMetricsChart
              items={COMPARISON_METRICS[comparisonMetric] || COMPARISON_METRICS['Isolation Score']}
              metricLabel={
                comparisonMetric === 'Isolation Score'
                  ? 'ISOLATION SCORE (0-1)'
                  : comparisonMetric === 'Internal Similarity'
                  ? 'SIMILARITY (0-1)'
                  : 'INTERACTION RATIO'
              }
            />
          </div>
        </div>

        {/* Card 2: SELECTED ECHO CHAMBER INSIGHT */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col justify-between shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
              SELECTED ECHO CHAMBER INSIGHT
            </h3>

            {/* Chamber Badge */}
            <span className="px-2 py-0.5 rounded border border-[#E74C3C] text-[#E74C3C] bg-[#2A1518]/60 text-[10px] font-bold tracking-wider uppercase">
              {selectedChamber.name.toUpperCase()}
            </span>
          </div>

          {/* Top Stat Boxes: Risk Level & Users */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Risk Box */}
            <div className="p-2.5 rounded-lg bg-[#0E1524] border border-[#1A253D] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2A1518] text-[#E74C3C] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
                  RISK LEVEL
                </span>
                <span className="text-sm font-bold text-[#E74C3C] leading-none">
                  {selectedChamber.risk}
                </span>
              </div>
            </div>

            {/* Users Box */}
            <div className="p-2.5 rounded-lg bg-[#0E1524] border border-[#1A253D] flex items-center gap-2.5">
              <div className="min-w-0 flex-1 pl-1">
                <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block">
                  USERS
                </span>
                <span className="text-base font-bold text-white leading-none">
                  {selectedChamber.users}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Compact Metric Boxes */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'ISOLATION SCORE', val: selectedChamber.isolation, barColor: 'bg-[#2ECC71]' },
              { label: 'INTERNAL SIMILARITY', val: selectedChamber.similarity, barColor: 'bg-[#2ECC71]' },
              { label: 'CROSS CHAMBER INTERACTION', val: selectedChamber.crossInteraction, barColor: 'bg-[#FFA500]' },
              { label: 'INFORMATION DIVERSITY', val: selectedChamber.diversity, barColor: 'bg-[#E74C3C]' },
            ].map((box, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-[#0E1524] border border-[#1A253D] flex flex-col justify-between"
              >
                <span className="text-[8px] font-semibold text-[#8A94A6] uppercase leading-tight line-clamp-2 min-h-[20px]">
                  {box.label}
                </span>
                <span className="text-xs font-bold text-white font-mono mt-1">
                  {box.val}
                </span>
                <div className="w-full h-0.5 bg-[#1E2638] rounded-full mt-1.5 overflow-hidden">
                  <div className={`h-full ${box.barColor} rounded-full w-full`} />
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4">
            <span className="text-[9px] font-semibold text-[#8A94A6] uppercase tracking-wider block mb-1">
              DESCRIPTION
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {selectedChamber.description}
            </p>
          </div>

          {/* Progress Bars: Sentiment & Toxicity */}
          <div className="space-y-3 pt-2 border-t border-[#1E2638]/50">
            {/* Dominant Sentiment */}
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1 font-semibold">
                <span className="text-[#8A94A6] uppercase tracking-wider">DOMINANT SENTIMENT</span>
                <span className="text-[#E74C3C] font-mono">
                  {selectedChamber.dominantSentiment.pct}% {selectedChamber.dominantSentiment.label}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#151E32] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E74C3C] rounded-full transition-all duration-300"
                  style={{ width: `${selectedChamber.dominantSentiment.pct}%` }}
                />
              </div>
            </div>

            {/* Toxicity Rate */}
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1 font-semibold">
                <span className="text-[#8A94A6] uppercase tracking-wider">TOXICITY RATE</span>
                <span className="text-[#9C27B0] font-mono">{selectedChamber.toxicityRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#151E32] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#9C27B0] rounded-full transition-all duration-300"
                  style={{ width: `${selectedChamber.toxicityRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: CHAMBER CONTENT OVERVIEW */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col justify-between shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
              CHAMBER CONTENT OVERVIEW
            </h3>

            {/* Chamber Dropdown Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsChamberDropdownOpen(!isChamberDropdownOpen)}
                className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-lg bg-[#0E131E] border border-[#1A2130] text-[11px] font-medium text-[#738094] hover:text-white transition-all"
              >
                <span>{selectedChamber.name}</span>
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
              </button>
              {isChamberDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 rounded-lg bg-[#0E131E] border border-[#1A2130] shadow-xl z-30 py-1 text-xs">
                  {ECHO_CHAMBER_LIST.map((c) => (
                    <button
                      key={c.rank}
                      type="button"
                      onClick={() => {
                        setSelectedChamber(c);
                        setIsChamberDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#151E32] ${
                        selectedChamber.rank === c.rank ? 'text-[#00BFA5] font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Two Sub-Columns: Top Topics (Left) & Sentiment Distribution (Right) */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Left: TOP TOPICS */}
            <div>
              <span className="text-[10px] font-bold text-[#8A94A6] uppercase tracking-wider block mb-2.5">
                TOP TOPICS
              </span>
              <div className="space-y-2">
                {selectedChamber.topTopics.map((topic, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 truncate">{topic.name}</span>
                      <span className="text-[#8A94A6] font-mono text-[10px]">{topic.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#151E32] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${topic.pct}%`,
                          backgroundColor: topic.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: SENTIMENT DISTRIBUTION */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#8A94A6] uppercase tracking-wider block mb-2.5">
                SENTIMENT DISTRIBUTION
              </span>
              <div className="flex-1 flex flex-col justify-center">
                <DonutChart
                  data={selectedChamber.sentiment}
                  showCenterCallout={false}
                  showLegendValues={true}
                  legendShape="circle"
                  infoText={null}
                  size={105}
                  strokeWidth={14}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Bottom: TOP HASHTAGS */}
          <div className="pt-3 border-t border-[#1E2638]/50">
            <span className="text-[10px] font-bold text-[#8A94A6] uppercase tracking-wider block mb-2">
              TOP HASHTAGS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedChamber.topHashtags.map((ht, idx) => (
                <span
                  key={idx}
                  className={`border text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${ht.color}`}
                >
                  {ht.tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
