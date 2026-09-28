import React, { useState } from 'react';
import {
  Users,
  Share2,
  Repeat,
  Network,
  Activity,
  Info,
  ChevronDown,
  Maximize2,
  RefreshCw,
  Settings,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import StatCard from '../../../components/common/StatCard';
import NetworkGraph from '../../../components/charts/NetworkGraph';
import DonutChart from '../../../components/charts/DonutChart';
import LineChart from '../../../components/charts/LineChart';
import Avatar from '../../../components/common/Avatar';

// 10 top bridge users matching design reference
const TOP_BRIDGE_USERS = [
  {
    rank: 1,
    username: '@Ayesha_K',
    name: 'Ayesha Khan',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    score: '0.92',
    scoreNum: 0.92,
    communities: 5,
    communitiesPct: 88,
    interacts: 142,
    impact: 'HIGH',
    impactBadgeColor: 'bg-[#2A1518] text-[#E74C3C] border border-[#E74C3C]/30',
    recentActivities: [
      { action: 'Replied to @rehman_voice', route: 'Community 02 → Community 01', time: '2h ago' },
      { action: 'Replied to @rehman_voice', route: 'Community 02 → Community 01', time: '2h ago' },
      { action: 'Replied to @rehman_voice', route: 'Community 02 → Community 01', time: '2h ago' },
    ],
  },
  {
    rank: 2,
    username: '@rehman_voice',
    name: 'Rehman Voice',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    score: '0.89',
    scoreNum: 0.89,
    communities: 4,
    communitiesPct: 80,
    interacts: 128,
    impact: 'HIGH',
    impactBadgeColor: 'bg-[#2A1518] text-[#E74C3C] border border-[#E74C3C]/30',
    recentActivities: [
      { action: 'Replied to @Ayesha_K', route: 'Community 02 → Community 05', time: '1h ago' },
      { action: 'Shared post from @neutral_view', route: 'Community 01 → Community 04', time: '4h ago' },
      { action: 'Commented on @dialogue_maker', route: 'Community 03 → Community 05', time: '6h ago' },
    ],
  },
  {
    rank: 3,
    username: '@neutral_view',
    name: 'Neutral Perspective',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    score: '0.85',
    scoreNum: 0.85,
    communities: 4,
    communitiesPct: 74,
    interacts: 119,
    impact: 'HIGH',
    impactBadgeColor: 'bg-[#2A1518] text-[#E74C3C] border border-[#E74C3C]/30',
    recentActivities: [
      { action: 'Quoted @facts_over_bias', route: 'Community 01 → Community 03', time: '2h ago' },
      { action: 'Replied to @common_ground', route: 'Community 02 → Community 04', time: '5h ago' },
      { action: 'Analysis thread', route: 'Community 04 → Community 05', time: '7h ago' },
    ],
  },
  {
    rank: 4,
    username: '@facts_over_bias',
    name: 'Fact Monitor',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    score: '0.78',
    scoreNum: 0.78,
    communities: 3,
    communitiesPct: 64,
    interacts: 98,
    impact: 'MEDIUM',
    impactBadgeColor: 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30',
    recentActivities: [
      { action: 'Verified statement', route: 'Community 03 → Community 04', time: '3h ago' },
      { action: 'Replied to @unity_voice', route: 'Community 01 → Community 02', time: '6h ago' },
    ],
  },
  {
    rank: 5,
    username: '@common_ground',
    name: 'Common Ground PK',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    score: '0.74',
    scoreNum: 0.74,
    communities: 3,
    communitiesPct: 58,
    interacts: 87,
    impact: 'MEDIUM',
    impactBadgeColor: 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30',
    recentActivities: [
      { action: 'Moderated panel', route: 'Community 02 → Community 03', time: '4h ago' },
      { action: 'Replied to @bridge_thinker', route: 'Community 01 → Community 04', time: '8h ago' },
    ],
  },
  {
    rank: 6,
    username: '@dialogue_maker',
    name: 'Civic Dialogue',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    score: '0.70',
    scoreNum: 0.70,
    communities: 3,
    communitiesPct: 52,
    interacts: 76,
    impact: 'MEDIUM',
    impactBadgeColor: 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30',
    recentActivities: [
      { action: 'Organized space', route: 'Community 01 → Community 05', time: '5h ago' },
      { action: 'Replied to @open_mind99', route: 'Community 02 → Community 05', time: '9h ago' },
    ],
  },
  {
    rank: 7,
    username: '@open_mind99',
    name: 'Open Mind PK',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    score: '0.62',
    scoreNum: 0.62,
    communities: 2,
    communitiesPct: 42,
    interacts: 63,
    impact: 'LOW',
    impactBadgeColor: 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30',
    recentActivities: [
      { action: 'Replied to discussion', route: 'Community 02 → Community 04', time: '6h ago' },
    ],
  },
  {
    rank: 8,
    username: '@unity_voice',
    name: 'Unity Voice',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    score: '0.58',
    scoreNum: 0.58,
    communities: 2,
    communitiesPct: 36,
    interacts: 58,
    impact: 'LOW',
    impactBadgeColor: 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30',
    recentActivities: [
      { action: 'Shared civic update', route: 'Community 01 → Community 03', time: '8h ago' },
    ],
  },
  {
    rank: 9,
    username: '@bridge_thinker',
    name: 'Bridge Thinker',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    score: '0.55',
    scoreNum: 0.55,
    communities: 2,
    communitiesPct: 30,
    interacts: 51,
    impact: 'LOW',
    impactBadgeColor: 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30',
    recentActivities: [
      { action: 'Replied to thread', route: 'Community 03 → Community 04', time: '11h ago' },
    ],
  },
  {
    rank: 10,
    username: '@tolerance_first',
    name: 'Tolerance First',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    score: '0.53',
    scoreNum: 0.53,
    communities: 2,
    communitiesPct: 24,
    interacts: 47,
    impact: 'LOW',
    impactBadgeColor: 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30',
    recentActivities: [
      { action: 'Cross-group comment', route: 'Community 02 → Community 05', time: '14h ago' },
    ],
  },
];

export default function BridgeUsersTab() {
  const [selectedUser, setSelectedUser] = useState(TOP_BRIDGE_USERS[0]);
  const [interactionFilter, setInteractionFilter] = useState('All Interactions');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [timeGranularity, setTimeGranularity] = useState('Daily');
  const [isGranularityOpen, setIsGranularityOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* 1. Five Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <StatCard
          layout="horizontal"
          title="Bridge Users"
          value="486"
          change="28"
          trendText="since yesterday"
          isPositive={true}
          icon={Users}
          iconColor="text-[#00BFA5]"
          iconBg="bg-[#142222]  border-none"
        />

        <StatCard
          layout="horizontal"
          title="Bridge Score (AVG)"
          value="0.68"
          trendText="High Connectivity"
          icon={Share2}
          iconColor="text-[#A78AE6]"
          iconBg="bg-[#1A1532]  border-none"
        />

        <StatCard
          layout="horizontal"
          title="Cross Communities Posts"
          value="2,842"
          change="12.5%"
          trendText="this week"
          isPositive={true}
          changeColor="text-[#FFA500]"
          icon={Repeat}
          iconColor="text-[#FFA500]"
          iconBg="bg-[#2B2117]  border-none"
        />

        <StatCard
          layout="horizontal"
          title="Communities Connected"
          value="2.7"
          trendText="Avg. per bridge user"
          icon={Network}
          iconColor="text-[#5BA785]"
          iconBg="bg-[#142222]  border-none"
        />

        <StatCard
          layout="horizontal"
          title="Bridge Impact"
          value="68"
          subValue="/ 100"
          trendText="Elevated"
          icon={Activity}
          iconColor="text-[#D96D8B]"
          iconBg="bg-[#E53935]/10 border-none"

        />
      </div>

      {/* 2. Middle Section: Bridge Network Visualization & TOP BRIDGE USERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Bridge Network Visualization Panel (7 columns) */}
        <div className="lg:col-span-7 bg-[#111827] border border-[#1E2638] rounded-xl p-4 flex flex-col shadow-sm">
          {/* Panel Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">
                Bridge Network Visualization
              </h2>
              <span title="Visual map of communities and cross-boundary bridge connections" className="text-[#8A94A6] hover:text-white cursor-help">
                <Info className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter Dropdown */}
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
                  <div className="absolute right-0 mt-1 w-40 rounded-lg bg-[#151E32] border border-[#1E2638] shadow-xl z-30 py-1 text-xs">
                    {['All Interactions', 'Replies Only', 'Retweets Only', 'Direct Mentions'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setInteractionFilter(opt);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#1E2D4A] ${
                          interactionFilter === opt ? 'text-[#00BFA5] font-semibold' : 'text-slate-300'
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
                title="Network Settings"
                className="p-1 text-[#8A94A6] hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Network Canvas */}
          <div className="flex-1 min-h-0 w-full flex flex-col">
            <NetworkGraph
              fill
              showLegend={true}
              onNodeClick={(node) => {
                if (node.isBridge) {
                  const matchedUser = TOP_BRIDGE_USERS.find((u) => u.username === node.name);
                  if (matchedUser) setSelectedUser(matchedUser);
                }
              }}
            />
          </div>
        </div>

        {/* Right: TOP BRIDGE USERS Panel (5 columns) */}
        <div className="lg:col-span-5 bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                TOP BRIDGE USERS
              </h2>
              <span title="Ranked users facilitating communication across distinct echo-chambers" className="text-[#8A94A6] hover:text-white cursor-help">
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-[#00BFA5] hover:text-[#42D9C8] flex items-center gap-1 transition-colors group"
            >
              <span>View All</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse select-none">
              <thead>
                <tr className="border-b border-[#1E2638] text-[10px] uppercase font-bold text-[#8A94A6] tracking-wider">
                  <th className="py-2 px-1 w-10 text-center">RANK</th>
                  <th className="py-2 px-2">USER</th>
                  <th className="py-2 px-2 text-right">BRIDGE SCORE</th>
                  <th className="py-2 px-2 text-center w-24">COMMUNITIES</th>
                  <th className="py-2 px-2 text-right">INTERACTS</th>
                  <th className="py-2 px-1 text-center">IMPACT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2638]/50 text-xs">
                {TOP_BRIDGE_USERS.map((user) => {
                  const isSelected = selectedUser.rank === user.rank;

                  return (
                    <tr
                      key={user.rank}
                      onClick={() => setSelectedUser(user)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#151E32] text-white'
                          : 'hover:bg-[#151E32]/50 text-slate-300'
                      }`}
                    >
                      {/* Rank */}
                      <td
                        className={`py-2 px-1 text-center font-semibold text-[11px] ${
                          user.rank === 1 ? 'text-[#00BFA5] font-bold' : 'text-[#8A94A6]'
                        }`}
                      >
                        {user.rank}
                      </td>

                      {/* User */}
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar
                            src={user.avatarUrl}
                            name={user.username.replace('@', '')}
                            size="xs"
                            className="flex-shrink-0"
                          />
                          <span className="font-semibold text-white truncate text-xs hover:text-[#00BFA5] transition-colors">
                            {user.username}
                          </span>
                        </div>
                      </td>

                      {/* Bridge Score */}
                      <td className="py-2 px-2 text-right font-mono font-medium text-xs text-white">
                        {user.score}
                      </td>

                      {/* Communities Bar */}
                      <td className="py-2 px-2 text-center">
                        <div className="w-16 mx-auto h-1.5 bg-[#1E2638] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2ECC71] rounded-full"
                            style={{ width: `${user.communitiesPct}%` }}
                          />
                        </div>
                      </td>

                      {/* Interacts */}
                      <td className="py-2 px-2 text-right font-mono text-xs text-slate-300">
                        {user.interacts}
                      </td>

                      {/* Impact Badge */}
                      <td className="py-2 px-1 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${user.impactBadgeColor}`}
                        >
                          {user.impact}
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

      {/* 3. Lower Section: 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: BRIDGE SCORE DISTRIBUTION */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
              BRIDGE SCORE DISTRIBUTION
            </h3>
            <span title="Distribution of accounts across bridge connectivity tiers" className="text-[#8A94A6] hover:text-white cursor-help">
              <Info className="w-4 h-4" />
            </span>
          </div>

          <DonutChart
            centerValue="486"
            centerLabel="TOTAL"
            infoText="High bridge score indicates stronger ability to connect different communities."
            size={130}
            strokeWidth={14}
            ringData={[
              { value: 25, color: '#2ECC71' },
              { value: 25, color: '#F39C12' },
              { value: 25, color: '#3498DB' },
              { value: 25, color: '#E91E63' },
            ]}
          />
        </div>

        {/* Card 2: BRIDGE IMPACT OVER TIME */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-bold text-white uppercase tracking-wide">
                BRIDGE IMPACT OVER TIME
              </h3>
              <span title="Evolution of cross-community bridge influence over selected time window" className="text-[#8A94A6] hover:text-white cursor-help">
                <Info className="w-4 h-4" />
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGranularityOpen(!isGranularityOpen)}
                className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-lg bg-[#0E131E] border border-[#1A2130] text-[11px] font-medium text-[#738094] hover:text-white transition-all"
              >
                <span>{timeGranularity}</span>
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
              </button>
              {isGranularityOpen && (
                <div className="absolute right-0 mt-1 w-28 rounded-lg bg-[#0E131E] border border-[#1A2130] shadow-xl z-30 py-1 text-xs">
                  {['Hourly', 'Daily', 'Weekly'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setTimeGranularity(opt);
                        setIsGranularityOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#151E32] ${
                        timeGranularity === opt ? 'text-[#14B8A6] font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <LineChart height={200} yMin={25} tintedPlot />
        </div>

        {/* Card 3: Selected Bridge User Profile Card */}
        <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 flex flex-col shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar
                src={selectedUser.avatarUrl}
                name={selectedUser.username.replace('@', '')}
                size="lg"
                className="flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-bold text-white text-[15px] leading-tight truncate">
                  {selectedUser.username}
                </p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#2A1518] text-[8px] font-bold uppercase tracking-wide text-[#E5493A]">
                  HIGH IMPACT BRIDGE
                </span>
              </div>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-[#14B8A6] hover:text-[#42D9C8] flex items-center gap-1 transition-colors flex-shrink-0 group"
            >
              <span>View Profile</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          {/* 4 stats: no box, vertical dividers + bottom line */}
          <div className="grid grid-cols-4 border-b border-[#525D6F]/60 pb-2.5 mb-5">
            {[
              { label: 'BRIDGE SCORE', value: selectedUser.score },
              { label: 'COMMUNITIES CONNECTED', value: selectedUser.communities },
              { label: 'CROSS-INTERACTS', value: selectedUser.interacts },
              { label: 'IMPACT SCORE', value: '96', suffix: '/100' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`min-w-0 ${i === 0 ? 'pr-2' : 'px-2 border-l border-[#475162]/70'}`}
              >
                <p className="text-[8.5px] font-medium text-[#80899B] uppercase leading-tight">
                  {stat.label}
                </p>
                <p className="text-[15px] font-bold text-white mt-1.5 leading-none">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-[11px] font-medium text-slate-300">{stat.suffix}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Communities connected + Recent activity */}
          <div className="grid grid-cols-[9fr_10fr] gap-3">
            {/* Left: list + star graph side by side */}
            <div className="min-w-0">
              <p className="text-[8px] font-bold text-[#798394] uppercase tracking-[0.15em] mb-3 whitespace-nowrap">
                COMMUNITIES CONNECTED
              </p>
              <div className="flex items-center justify-between gap-1">
                <div className="flex flex-col gap-2 text-[10px]">
                  {[
                    { n: 'Community A', c: '#2ECC71' },
                    { n: 'Community B', c: '#AF7AC5' },
                    { n: 'Community C', c: '#F39C12' },
                    { n: 'Community D', c: '#3498DB' },
                  ].map((c) => (
                    <div key={c.n} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.c }} />
                      <span className="text-[#8D929B] whitespace-nowrap">{c.n}</span>
                    </div>
                  ))}
                </div>

                {/* Star graph with the user's avatar in the centre */}
                <svg width="92" height="84" viewBox="-46 -42 92 84" className="overflow-visible flex-shrink-0">
                  <defs>
                    <clipPath id="starAvatarClip">
                      <circle cx="0" cy="0" r="11" />
                    </clipPath>
                  </defs>
                  {[
                    [-20, -34], [31, -28], [-41, -10], [43, -3], [-35, 25], [-9, 40], [31, 31],
                  ].map(([x, y], i) => (
                    <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#8A94A6" strokeOpacity="0.65" strokeWidth="1.4" />
                  ))}
                  {[
                    [3, -29, '#2ECC71'], [-27, -18, '#AF7AC5'], [34, -13, '#F39C12'],
                    [-35, 4, '#3498DB'], [34, 15, '#3498DB'], [-22, 30, '#E91E63'], [5, 31, '#2ECC71'],
                  ].map(([x, y, c], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill={c} />
                  ))}
                  <circle cx="0" cy="0" r="12.5" fill="#111827" />
                  {selectedUser.avatarUrl ? (
                    <image
                      href={selectedUser.avatarUrl}
                      x="-11"
                      y="-11"
                      width="22"
                      height="22"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath="url(#starAvatarClip)"
                    />
                  ) : (
                    <circle cx="0" cy="0" r="11" fill="#14B8A6" />
                  )}
                </svg>
              </div>
            </div>

            {/* Right: recent activity */}
            <div className="min-w-0 flex flex-col">
              <p className="text-[8px] font-bold text-[#798394] uppercase tracking-[0.15em] mb-3 whitespace-nowrap">
                RECENT CROSS-COMMUNITY ACTIVITY
              </p>
              <div className="flex flex-col gap-3.5">
                {(selectedUser.recentActivities || []).map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    {/* Overlapping community dots */}
                    <div className="flex items-center flex-shrink-0">
                      <span className="w-3 h-3 rounded-full bg-[#7C3AED]" />
                      <span className="w-3 h-3 rounded-full bg-[#2563EB] -ml-1" />
                      <span className="w-3 h-3 rounded-full bg-[#DB2777] -ml-1" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-[#A9ABB0] truncate leading-tight">
                        {act.action}
                      </p>
                      <p className="text-[8px] text-[#4B5160] mt-1 whitespace-nowrap leading-none">
                        {act.route}
                      </p>
                    </div>
                    <span className="text-[9px] text-[#586172] flex-shrink-0 self-start">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3 text-right">
            <button type="button" className="text-[10px] font-semibold text-[#14B8A6] hover:underline">
              View Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
