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
    iconBg: 'bg-[#2A1518]',
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
    iconBg: 'bg-[#2B2117]',
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
    iconBg: 'bg-[#142222]',
  },
  {
    id: 'isolation',
    title: 'AVERAGE ISOLATION SCORING',
    value: '0.74',
    trendLabel: 'High Isolation',
    trendLabelColor: 'text-[#408ACF]',
    icon: ArrowLeftRight,
    iconColor: 'text-[#408ACF]',
    iconBg: 'bg-[#152434]',
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
    iconBg: 'bg-[#1C1D31]',
  },
  {
    id: 'diversity',
    title: 'INFORMATION DIVERSITY',
    value: '0.28',
    trendLabel: 'Low Diversity',
    trendLabelColor: 'text-[#94A3B8]',
    icon: TrendingDown,
    iconColor: 'text-[#2ECC71]',
    iconBg: 'bg-[#142222]',
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
    { label: 'Community A', value: 0.91, color: '#9C27B0' },
    { label: 'Community B', value: 0.86, color: '#2196F3' },
    { label: 'Community C', value: 0.78, color: '#FF9800' },
    { label: 'Community D', value: 0.69, color: '#4CAF50' },
    { label: 'Community E', value: 0.63, color: '#EF5350' },
    { label: 'Community F', value: 0.51, color: '#14B8A6' },
    { label: 'Community G', value: 0.44, color: '#FFEB3B' },
  ],
  'Internal Similarity': [
    { label: 'Community A', value: 0.88, color: '#9C27B0' },
    { label: 'Community B', value: 0.83, color: '#2196F3' },
    { label: 'Community C', value: 0.75, color: '#FF9800' },
    { label: 'Community D', value: 0.68, color: '#4CAF50' },
    { label: 'Community E', value: 0.61, color: '#EF5350' },
    { label: 'Community F', value: 0.50, color: '#14B8A6' },
    { label: 'Community G', value: 0.42, color: '#FFEB3B' },
  ],
  'Cross-Interaction': [
    { label: 'Community A', value: 0.087, color: '#9C27B0' },
    { label: 'Community B', value: 0.102, color: '#2196F3' },
    { label: 'Community C', value: 0.135, color: '#FF9800' },
    { label: 'Community D', value: 0.181, color: '#4CAF50' },
    { label: 'Community E', value: 0.214, color: '#EF5350' },
    { label: 'Community F', value: 0.292, color: '#14B8A6' },
    { label: 'Community G', value: 0.365, color: '#FFEB3B' },
  ],
};

// ---------- Bottom-row helpers (sizes derived from the Figma frame) ----------
const TOTAL_USERS = 29145; // placeholder so Chamber 01 shows 18.6% like the design; replace with the real total

const RISK_STYLES = {
  HIGH: { color: '#EF5350', bg: '#2A1518' },
  MEDIUM: { color: '#FFA500', bg: '#2B2117' },
  LOW: { color: '#2ECC71', bg: '#142222' },
};
const SENTIMENT_COLORS = { NEGATIVE: '#EF5350', NEUTRAL: '#9AA3B2', POSITIVE: '#2ECC71' };

const CARD_CLS =
  'bg-[#111827] border border-[#1E2638] rounded-xl px-4 pt-3 pb-3.5 flex flex-col shadow-sm min-h-[217px] min-w-0';
const TITLE_CLS = 'min-w-0 truncate whitespace-nowrap text-[11px] font-bold text-white uppercase tracking-[0.04em] leading-none';
const DD_BTN_CLS =
  'flex items-center justify-between gap-2 h-[21px] min-w-[76px] flex-shrink-0 whitespace-nowrap pl-2.5 pr-2 rounded-md bg-[#15181C] border border-[#262B33] text-[8px] text-[#C9D1DC] hover:text-white transition-colors';
const DD_MENU_CLS =
  'absolute right-0 mt-1 min-w-[110px] rounded-md bg-[#15181C] border border-[#262B33] shadow-xl z-30 py-1 text-[9px]';
const BOX_CLS = 'border border-[#252E42] rounded-[4px]';

function SentimentDonut({ data }) {
  const size = 65;
  const stroke = 8.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const order = ['Positive', 'Neutral', 'Negative'];
  const segs = order.map((l) => data.find((d) => d.label === l)).filter(Boolean);
  const total = segs.reduce((s, d) => s + d.value, 0) || 1;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90 w-full h-full">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1E2638" strokeWidth={stroke} />
      {segs.map((d) => {
        const len = (d.value / total) * c;
        const el = (
          <circle
            key={d.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={stroke}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

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
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 2xl:gap-4">
        {SUMMARY_METRICS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] transition-all duration-200 rounded-xl px-3 py-3.5 2xl:px-4 2xl:py-4 flex items-center gap-2.5 2xl:gap-3.5 shadow-sm relative group overflow-hidden min-h-[104px] 2xl:min-h-[112px]"
            >
              {/* Icon Container */}
              <div
                className={`w-9 h-9 2xl:w-12 2xl:h-12 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
              >
                <Icon className="w-[18px] h-[18px] 2xl:w-5 2xl:h-5" />
              </div>

              {/* Text Container */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                {/* Title: wraps to max 2 lines, never clipped */}
                <span className="text-[9px] 2xl:text-[11px] leading-[12px] 2xl:leading-[15px] font-medium text-[#8A94A6] uppercase tracking-wide 2xl:tracking-wider line-clamp-2 min-h-[24px] 2xl:min-h-[30px] break-words">
                  {card.title}
                </span>

                <span className="text-[22px] 2xl:text-[30px] font-bold text-white tracking-tight leading-none mt-1 whitespace-nowrap">
                  {card.value}
                </span>

                <div className="mt-1.5 text-[10px] 2xl:text-xs whitespace-nowrap">
                  {card.change !== undefined ? (
                    <span className="inline-flex items-center font-medium text-[#EF5350]">
                      <span className="mr-0.5">↑</span>
                      {card.change}
                      <span className="ml-1 text-[#8A94A6] font-normal">{card.trendText}</span>
                    </span>
                  ) : card.pct !== undefined ? (
                    <span className="text-[#8A94A6]">
                      {card.isDown && <span className="text-[#7C5CFF] mr-0.5">↓</span>}
                      <span className={`${card.pctColor} font-semibold mr-1`}>{card.pct}</span>
                      {card.subText}
                    </span>
                  ) : (
                    <span className={`font-medium ${card.trendLabelColor}`}>{card.trendLabel}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Middle Section: Network Visualization (6 cols) & Echo Chamber Risk List (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interaction Network Visualization Panel (7 columns) */}
        <div className="lg:col-span-6 bg-[#111827] border border-[#1E2638] rounded-xl p-4 flex flex-col shadow-sm">
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
        <div className="lg:col-span-6 bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col shadow-sm min-w-0">
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
          <div className="w-full flex-1 min-h-0">
            <table className="w-full h-full table-fixed text-center border-collapse select-none">
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '23%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '16%' }} />
              </colgroup>
              <thead>
                <tr className="border-b border-[#1E2638] text-[9px] 2xl:text-[10px] leading-tight uppercase font-bold text-[#8A94A6] tracking-wider h-11">
                  <th className="px-1 text-center">RANK</th>
                  <th className="px-1 text-center">ECHO<br />CHAMBER</th>
                  <th className="px-1 text-center">USERS</th>
                  <th className="px-1 text-center">ISOLATION</th>
                  <th className="px-1 text-center">SIMILARITY</th>
                  <th className="px-1 text-center">RISK<br />LEVEL</th>
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
                        className={`px-1 text-center font-mono text-[11px] 2xl:text-xs ${
                          chamber.rank === '01'
                            ? 'text-white font-bold'
                            : 'text-[#8A94A6]'
                        }`}
                      >
                        {chamber.rank}
                      </td>

                      {/* Echo Chamber Name */}
                      <td className="px-1 font-medium text-white text-[11px] 2xl:text-xs truncate">
                        {chamber.name}
                      </td>

                      {/* Users */}
                      <td className="px-1 text-center font-mono text-[11px] 2xl:text-xs text-white">
                        {chamber.users}
                      </td>

                      {/* Isolation */}
                      <td className="px-1 text-center font-mono text-[11px] 2xl:text-xs text-slate-300">
                        {chamber.isolation}
                      </td>

                      {/* Similarity */}
                      <td className="px-1 text-center font-mono text-[11px] 2xl:text-xs text-slate-300">
                        {chamber.similarity}
                      </td>

                      {/* Risk Level Badge */}
                      <td className="px-1 text-center">
                        <span
                          className={`inline-block whitespace-nowrap px-1.5 2xl:px-2 py-0.5 rounded text-[8px] 2xl:text-[9px] font-bold uppercase tracking-wide ${chamber.riskBadgeColor}`}
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

      {/* 3. Bottom Section: three cards (sizes match the Figma frame) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Card 1: ECHO CHAMBERS METRICS COMPARISON */}
        <div className={CARD_CLS}>
          <div className="flex items-center justify-between gap-3 h-[21px]">
            <h3 className={TITLE_CLS}>ECHO CHAMBERS METRICS COMPARISON</h3>
            <div className="relative">
              <button type="button" onClick={() => setIsComparisonOpen(!isComparisonOpen)} className={DD_BTN_CLS}>
                <span>{comparisonMetric}</span>
                <ChevronDown className="w-3 h-3 text-[#8A94A6] flex-shrink-0" strokeWidth={2} />
              </button>
              {isComparisonOpen && (
                <div className={DD_MENU_CLS}>
                  {Object.keys(COMPARISON_METRICS).map((metric) => (
                    <button
                      key={metric}
                      type="button"
                      onClick={() => {
                        setComparisonMetric(metric);
                        setIsComparisonOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#1E2638] ${
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

          <div className="mt-0">
            <EchoChambersMetricsChart
              items={COMPARISON_METRICS[comparisonMetric] || COMPARISON_METRICS['Isolation Score']}
              axisTitle={comparisonMetric}
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
        <div className={CARD_CLS}>
          <div className="flex items-center justify-between gap-3 h-[21px]">
            <h3 className={TITLE_CLS}>SELECTED ECHO CHAMBER INSIGHT</h3>
            <span className="flex items-center justify-center flex-shrink-0 h-[19px] px-[10px] rounded-[2px] border-[1.5px] border-[#E5534B] bg-[#2A1518]/60 text-[#EF5350] text-[6.5px] font-bold tracking-[0.08em] uppercase whitespace-nowrap">
              CHAMBER : {selectedChamber.rank}
            </span>
          </div>

          {/* Risk level + Users */}
          <div className="mt-1 flex gap-[5px]">
            <div className={`${BOX_CLS} basis-[21.6%] min-w-[100px] h-[41.5px] flex items-center gap-1.5 px-2`}>
              <div
                className="w-5 h-5 rounded-[4px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: RISK_STYLES[selectedChamber.risk].bg }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill={RISK_STYLES[selectedChamber.risk].color}>
                  <path d="M12 2.5 22.5 21h-21L12 2.5Z" />
                  <path d="M12 9v5M12 17.2v.1" stroke="#2A1518" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[6px] font-semibold tracking-[0.12em] text-[#94A3B8] uppercase leading-none">
                  RISK LEVEL
                </span>
                <span
                  className="block text-[12.5px] font-extrabold leading-none mt-1"
                  style={{ color: RISK_STYLES[selectedChamber.risk].color }}
                >
                  {selectedChamber.risk}
                </span>
              </div>
            </div>

            <div className={`${BOX_CLS} basis-[21.6%] min-w-[100px] h-[41.5px] px-2 pt-[5px]`}>
              <span className="block text-[6px] font-bold tracking-[0.12em] text-[#94A3B8] uppercase leading-none">
                USERS
              </span>
              <span className="block text-[14px] font-extrabold text-white leading-none mt-[5px]">
                {selectedChamber.users}
              </span>
              <span className="block text-[6px] text-[#94A3B8] leading-none mt-[3px]">
                {((parseInt(selectedChamber.users.replace(/,/g, ''), 10) / TOTAL_USERS) * 100).toFixed(1)}% of total users
              </span>
            </div>
          </div>

          {/* 4 metric boxes */}
          <div className="mt-1.5 grid grid-cols-4 gap-[9px]">
            {[
              { a: 'ISOLATION', b: 'SCORE', val: selectedChamber.isolation, pct: parseFloat(selectedChamber.isolation) * 100, bar: '#2ECC71' },
              { a: 'INTERNAL', b: 'SIMILARITY', val: selectedChamber.similarity, pct: parseFloat(selectedChamber.similarity) * 100, bar: '#2ECC71' },
              { a: 'CROSS-CHAMBER', b: 'INTERACTION', val: selectedChamber.crossInteraction, pct: parseFloat(selectedChamber.crossInteraction), bar: '#E74C3C' },
              { a: 'INFORMATION', b: 'DIVERSITY', val: selectedChamber.diversity, pct: parseFloat(selectedChamber.diversity) * 100, bar: '#E74C3C' },
            ].map((box) => (
              <div key={box.a} className={`${BOX_CLS} px-1.5 pt-[5px] pb-1.5 min-w-0`}>
                <span className="block text-[6px] font-bold text-[#E5E7EB] uppercase leading-[7px] whitespace-nowrap">
                  {box.a}
                  <br />
                  {box.b}
                </span>
                <span className="block text-[12px] font-extrabold text-white leading-none mt-1">{box.val}</span>
                <span className="block text-[6px] text-[#8A94A6] text-right leading-none mt-1">1</span>
                <div className="h-[5px] rounded-full bg-[#1F2226] mt-[3px] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(box.pct, 100)}%`, backgroundColor: box.bar }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <span className="block mt-2 text-[6.5px] font-bold tracking-[0.1em] text-[#94A3B8] uppercase leading-none">
            DESCRIPTION
          </span>
          <p className="mt-1 text-[7px] leading-[8.5px] text-[#C0C8D4]">{selectedChamber.description}</p>

          {/* Dominant sentiment + Toxicity */}
          <div className="mt-2 flex pl-[14%] gap-[15%]">
            <div className="w-[29.5%] min-w-0">
              <span className="block text-[7px] font-bold tracking-[0.1em] text-white uppercase leading-none">
                DOMINANT SENTIMENT
              </span>
              <span
                className="block text-[8.5px] font-extrabold uppercase leading-none mt-[7px]"
                style={{ color: SENTIMENT_COLORS[selectedChamber.dominantSentiment.label] }}
              >
                {selectedChamber.dominantSentiment.pct}% {selectedChamber.dominantSentiment.label}
              </span>
              <div className="h-1 rounded-full bg-[#1F2226] mt-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${selectedChamber.dominantSentiment.pct}%`,
                    backgroundColor: SENTIMENT_COLORS[selectedChamber.dominantSentiment.label],
                  }}
                />
              </div>
            </div>
            <div className="w-[29.5%] min-w-0">
              <span className="block text-[7px] font-bold tracking-[0.1em] text-white uppercase leading-none">
                TOXICITY RATE
              </span>
              <span className="block text-[8.5px] font-extrabold text-[#BC8CFF] leading-none mt-[7px]">
                {selectedChamber.toxicityRate}%
              </span>
              <div className="h-1 rounded-full bg-[#1F2226] mt-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#BC8CFF] transition-all duration-300"
                  style={{ width: `${selectedChamber.toxicityRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: CHAMBER CONTENT OVERVIEW */}
        <div className={CARD_CLS}>
          <div className="flex items-center justify-between gap-3 h-[21px]">
            <h3 className={TITLE_CLS}>CHAMBER CONTENT OVERVIEW</h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsChamberDropdownOpen(!isChamberDropdownOpen)}
                className={DD_BTN_CLS}
              >
                <span>{selectedChamber.name}</span>
                <ChevronDown className="w-3 h-3 text-[#8A94A6] flex-shrink-0" strokeWidth={2} />
              </button>
              {isChamberDropdownOpen && (
                <div className={DD_MENU_CLS}>
                  {ECHO_CHAMBER_LIST.map((c) => (
                    <button
                      key={c.rank}
                      type="button"
                      onClick={() => {
                        setSelectedChamber(c);
                        setIsChamberDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#1E2638] ${
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

          <div className="mt-2 grid grid-cols-[1fr_1fr] gap-[7.5px] min-h-[117.5px]">
            {/* TOP TOPICS */}
            <div className={`${BOX_CLS} px-[7px] pt-[7px] pb-1.5 min-w-0`}>
              <span className="block text-[8px] font-bold tracking-[0.1em] text-white uppercase leading-none">
                TOP TOPICS
              </span>
              <div className="mt-1">
                {(() => {
                  const maxPct = Math.max(...selectedChamber.topTopics.map((t) => t.pct), 1);
                  return selectedChamber.topTopics.map((topic, idx) => (
                    <div key={idx} className="grid grid-cols-[44px_1fr_22px] gap-x-1.5 items-center h-[14px]">
                      <span className="text-[6.5px] text-[#E5E7EB] truncate" title={topic.name}>
                        {topic.name}
                      </span>
                      <div className="h-[7.5px] rounded-[1px] bg-[#1F2226] overflow-hidden">
                        <div
                          className="h-full rounded-[1px] transition-all duration-300"
                          style={{
                            width: `${(topic.pct / maxPct) * 75}%`,
                            backgroundColor: idx === 0 ? '#E74C3C' : '#BC8CFF',
                          }}
                        />
                      </div>
                      <span className="text-[6.5px] text-[#C9D1DC]">{topic.pct}%</span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* SENTIMENT DISTRIBUTION */}
            <div className={`${BOX_CLS} min-w-0 flex flex-col`}>
              <span className="block px-2 pt-2 text-[7px] font-bold tracking-[0.03em] text-white uppercase leading-none whitespace-nowrap">
                SENTIMENT DISTRIBUTION
              </span>
              <div className="flex-1 flex items-center gap-[8px] px-2 pb-2 min-w-0">
                <div className="w-[46px] h-[46px] flex-shrink-0">
                  <SentimentDonut data={selectedChamber.sentiment} />
                </div>
                <div className="space-y-[4px] min-w-0 flex-1">
                  {selectedChamber.sentiment.map((s) => (
                    <div key={s.label} className="min-w-0">
                      <div className="flex items-center gap-[5px] leading-none min-w-0">
                        <span
                          className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-[7px] font-medium text-white whitespace-nowrap">{s.label}</span>
                      </div>
                      <span className="block pl-[11px] mt-[2px] text-[6.5px] leading-none text-[#C9D1DC]">
                        {s.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TOP HASHTAGS */}
          <span className="block mt-[11px] ml-3 text-[8px] font-bold tracking-[0.06em] text-white uppercase leading-none">
            TOP HASHTAGS
          </span>
          <div className="mt-[9px] mx-[10px] grid grid-cols-4 gap-[8px]">
            {selectedChamber.topHashtags.slice(0, 4).map((ht, idx) => (
              <span
                key={idx}
                title={ht.tag}
                className="w-full min-w-0 h-[21px] px-[9px] flex items-center justify-center rounded-[2px] border-[1.5px] border-[#E5534B] bg-[#2A1518] text-[#EF5350] text-[7px] font-bold whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {ht.tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
