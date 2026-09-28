import React, { useState, useEffect } from 'react';
import {
  Users,
  LayoutGrid,
  Share2,
  GitBranch,
  Activity,
  Info,
  RefreshCw,
  Settings,
  MessageSquare,
  AtSign,
  Repeat2,
  Quote,
  Heart,
  Maximize2,
  Plus,
  Minus,
  Lock,
} from 'lucide-react';
import NetworkGraph from '../../../components/charts/NetworkGraph';
import StatCard from '../../../components/common/StatCard';
import Dropdown from '../../../components/common/Dropdown';

// ─── Mock Data ──────────────────────────────────────────────────────────────

const METRIC_CARDS = [
  {
    title: 'Total Users',
    value: '24,832',
    change: '12.4%',
    isPositive: true,
    trendText: 'vs last 7 days',
    icon: Users,
    iconColor: 'text-[#00BFA5]',
    iconBg: 'bg-[#00BFA5]/10 border-[#00BFA5]/20',
  },
  {
    title: 'Communities Detected',
    value: '5',
    change: '1',
    isPositive: true,
    trendText: 'vs last 7 days',
    icon: LayoutGrid,
    iconColor: 'text-[#AF7AC5]',
    iconBg: 'bg-[#AF7AC5]/10 border-[#AF7AC5]/20',
  },
  {
    title: 'Total Interactions',
    value: '84,291',
    change: '18.7%',
    isPositive: true,
    trendText: 'vs last 7 days',
    icon: Share2,
    iconColor: 'text-[#F39C12]',
    iconBg: 'bg-[#F39C12]/10 border-[#F39C12]/20',
  },
  {
    title: 'Bridge Users',
    value: '28',
    change: '5',
    isPositive: true,
    trendText: 'vs last 7 days',
    icon: GitBranch,
    iconColor: 'text-[#2ECC71]',
    iconBg: 'bg-[#2ECC71]/10 border-[#2ECC71]/20',
  },
  {
    title: 'Avg. Network Density',
    value: '0.38',
    change: '9.1%',
    isPositive: true,
    trendText: 'vs last 7 days',
    icon: Activity,
    iconColor: 'text-[#3498DB]',
    iconBg: 'bg-[#3498DB]/10 border-[#3498DB]/20',
  },
];

const COMMUNITY_DATA = [
  { id: 'A', color: '#2ECC71', users: 8421, intPct: 82, extPct: 18, echo: 'High' },
  { id: 'B', color: '#AF7AC5', users: 6932, intPct: 74, extPct: 26, echo: 'High' },
  { id: 'C', color: '#F39C12', users: 5102, intPct: 61, extPct: 39, echo: 'Medium' },
  { id: 'D', color: '#3498DB', users: 3842, intPct: 48, extPct: 52, echo: 'Low' },
  { id: 'E', color: '#E91E63', users: 612, intPct: 33, extPct: 67, echo: 'Low' },
];

const BRIDGE_USERS = [
  { id: 'User #A73', communities: 'A ↔ B', centrality: 0.91, influence: 'High' },
  { id: 'User #B21', communities: 'B ↔ C', centrality: 0.74, influence: 'Medium' },
  { id: 'User #C82', communities: 'A ↔ D', centrality: 0.68, influence: 'High' },
  { id: 'User #D11', communities: 'C ↔ D', centrality: 0.55, influence: 'Medium' },
  { id: 'User #E17', communities: 'B ↔ E', centrality: 0.42, influence: 'Low' },
];

const INTERACTION_CARDS = [
  { label: 'Replies', pct: 45.6, value: '38,421', icon: MessageSquare, color: '#2ECC71' },
  { label: 'Mentions', pct: 25.7, value: '21,702', icon: AtSign, color: '#F39C12' },
  { label: 'Reposts', pct: 18.9, value: '15,893', icon: Repeat2, color: '#FACC15' },
  { label: 'Quotes', pct: 7.2, value: '6,102', icon: Quote, color: '#3498DB' },
  { label: 'Likes', pct: 2.6, value: '2,173', icon: Heart, color: '#E91E63' },
];

const GRAPH_FILTER_OPTIONS = [
  { label: 'All Interactions', value: 'all' },
  { label: 'Replies Only', value: 'replies' },
  { label: 'Retweets Only', value: 'retweets' },
  { label: 'Mentions Only', value: 'mentions' },
];

// ─── Small shared pieces ─────────────────────────────────────────────────────

const PILL = {
  High: 'bg-[#3B1720] text-[#FF5468]',
  Medium: 'bg-[#3A3210] text-[#F5C518]',
  Low: 'bg-[#0F3A2C] text-[#22C55E]',
  LowRed: 'bg-[#3B1720] text-[#FF5468]', // bridge table shows "Low" in red
};

function Pill({ tone, children }) {
  return (
    <span className={`inline-block px-2 py-[2px] rounded text-[11px] font-medium ${PILL[tone]}`}>
      {children}
    </span>
  );
}

function Bar({ pct, color }) {
  return (
    <div className="mt-1 h-[3px] w-[80%]">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

const KPI_COLORS = ['#14D9A8', '#A566D9', '#F5C518', '#22C55E', '#3B9CF5'];

function KpiCard({ card, color }) {
  const Icon = card.icon;
  return (
    <div className="bg-[#0F1524] border border-[#1B2337] rounded-lg px-3 py-3 flex items-center gap-3 min-w-0">
      <div
        className="grid place-items-center w-9 h-9 rounded-md shrink-0"
        style={{ background: `${color}1F`, color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] text-slate-400 truncate">{card.title}</div>
        <div className="text-[18px] font-bold text-white leading-tight">{card.value}</div>
        <div className="text-[10px] text-slate-500 whitespace-nowrap">
          <span className="font-semibold" style={{ color }}>↑ {card.change}</span>{' '}
          {card.trendText}
        </div>
      </div>
    </div>
  );
}

// ─── Panels ──────────────────────────────────────────────────────────────────

function CommunitySummaryPanel() {
  const th = 'pb-2 text-left text-[11px] font-medium leading-4 text-slate-400 align-bottom';
  return (
    <div className="bg-[#0F1524] border border-[#1B2337] rounded-xl p-4 pb-2">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          Community Summary <Info className="w-3.5 h-3.5 text-slate-500" />
        </h3>
        <a href="#" className="text-xs font-medium text-[#14D9A8] hover:opacity-80 whitespace-nowrap">
          View All Communities →
        </a>
      </div>

      <table className="w-full table-fixed border-collapse mt-3">
        <colgroup>
          <col style={{ width: '28%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '16%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className={th}>Community</th>
            <th className={th}>Users</th>
            <th className={th}>Int. Interactions</th>
            <th className={th}>Ext. Interactions</th>
            <th className={th}>Echo Chamber</th>
          </tr>
        </thead>
        <tbody>
          {COMMUNITY_DATA.map((r) => (
            <tr key={r.id} className="border-t border-[#1B2337] h-[34px]">
              <td>
                <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: r.color }} />
                <span className="text-xs font-normal text-slate-200">Community {r.id}</span>
              </td>
              <td className="text-xs text-slate-300">{r.users.toLocaleString()}</td>
              <td className="pt-1 text-[11px] text-slate-200">
                {r.intPct}%<Bar pct={r.intPct} color="#22C55E" />
              </td>
              <td className="pt-1 text-[11px] text-slate-200">
                {r.extPct}%<Bar pct={r.extPct} color="#3B9CF5" />
              </td>
              <td><Pill tone={r.echo}>{r.echo}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TopBridgeUsersPanel() {
  const th = 'pb-2 text-left text-[11px] font-medium leading-4 text-slate-400 align-bottom';
  return (
    <div className="bg-[#0F1524] border border-[#1B2337] rounded-xl p-4 pb-2">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          Top Bridge Users <Info className="w-3.5 h-3.5 text-slate-500" />
        </h3>
        <a href="#" className="text-xs font-medium text-[#14D9A8] hover:opacity-80 whitespace-nowrap">
          View All Bridge Users →
        </a>
      </div>

      <table className="w-full table-fixed border-collapse mt-3">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '26%' }} />
          <col style={{ width: '27%' }} />
          <col style={{ width: '22%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className={th}>User ID (Anon.)</th>
            <th className={th}>Communities Connected</th>
            <th className={th}>Betweenness Centrality</th>
            <th className={th}>Influence Score</th>
          </tr>
        </thead>
        <tbody>
          {BRIDGE_USERS.map((u) => (
            <tr key={u.id} className="border-t border-[#1B2337] h-[30px]">
              <td className="text-xs text-slate-200">{u.id}</td>
              <td className="text-xs text-slate-300">{u.communities}</td>
              <td className="text-xs text-slate-300">{u.centrality}</td>
              <td>
                <Pill tone={u.influence === 'Low' ? 'LowRed' : u.influence}>{u.influence}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InteractionBreakdownSection() {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-slate-100">Interaction Breakdown</span>
        <Info className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {INTERACTION_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-[#0F1524] border border-[#1B2337] rounded-lg px-3 py-3 hover:border-[#223654] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] font-normal text-slate-400">
                  <span
                    className="grid place-items-center w-6 h-6 rounded-md border"
                    style={{
                      background: `${card.color}1F`,
                      borderColor: `${card.color}33`,
                      color: card.color,
                    }}
                  >
                    <Icon className="w-3 h-3" />
                  </span>
                  {card.label}
                </span>
                <span className="text-[11px] font-normal text-slate-500">{card.pct}%</span>
              </div>
              <div className="text-xl font-bold text-white mt-2.5 mb-2 leading-none">
                {card.value}
              </div>
              <div className="h-1 rounded-full bg-[#1A2236]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${card.pct}%`, backgroundColor: card.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}







// ─── Main Component ──────────────────────────────────────────────────────────

export default function NetworkOverviewTab() {
  const [graphFilter, setGraphFilter] = useState('all');
  const [graphKey, setGraphKey] = useState(0);

  // Re-measure and redraw the graph once the layout has settled
  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      setGraphKey((k) => k + 1);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const iconBtn = 'text-slate-400 hover:text-white transition-colors';

  return (
    <div className="space-y-6">
      {/* Metric Cards Row */}
            {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {METRIC_CARDS.map((card, i) => (
          <KpiCard key={card.title} card={card} color={KPI_COLORS[i]} />
        ))}
      </div>

      {/* Network Graph + Community Summary + Bridge Users */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-4 items-stretch">
        {/* Left: Network Graph Card */}
        <div className="bg-[#0F1524] border border-[#1B2337] rounded-xl overflow-hidden min-w-0 flex flex-col">
          {/* Graph Header */}
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-100">Network Graph</span>
              <Info className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-center gap-3">
              <Dropdown
                value={graphFilter}
                options={GRAPH_FILTER_OPTIONS}
                onSelect={setGraphFilter}
                size="sm"
              />
              <button className={`${iconBtn} !text-[#14D9A8]`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
              <button className={iconBtn}><RefreshCw className="w-4 h-4" /></button>
              <button className={iconBtn}><Settings className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col px-4 pb-4 pt-3">
          <div className="flex-1 rounded-md bg-[#0D111A] overflow-hidden">
          <NetworkGraph
          key={graphKey}
          height={440}
          filter={GRAPH_FILTER_OPTIONS.find((o) => o.value === graphFilter)?.label}
          className="rounded-none border-0"
    />
  </div>
</div>
        </div>

        {/* Right: Community Summary + Bridge Users stacked */}
        <div className="flex flex-col gap-4 min-w-0">
          <CommunitySummaryPanel />
          <TopBridgeUsersPanel />
        </div>
      </div>

      {/* Interaction Breakdown */}
      <InteractionBreakdownSection />
    </div>
  );
}