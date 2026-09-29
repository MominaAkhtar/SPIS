import React, { useState } from 'react';
import {
  Info,
  ChevronDown,
  Maximize2,
  RefreshCw,
  Settings,
  Users,
  Check,
} from 'lucide-react';
import NetworkGraph from '../../../components/charts/NetworkGraph';
import Modal from '../../../components/common/Modal';
import CommunityKpiCard from './CommunityKpiCard';
import CommunitySummaryTable from './CommunitySummaryTable';
import CommunityDetailCard from './CommunityDetailCard';
import CommunityComparisonCard from './CommunityComparisonCard';
import DominantTopicsCard from './DominantTopicsCard';
import {
  COMMUNITIES_KPI_METRICS,
  COMMUNITIES_LIST,
  INTERACTION_FILTER_OPTIONS,
} from '../data/mockCommunitiesData';

export default function CommunitiesTab() {
  const [selectedCommunity, setSelectedCommunity] = useState(COMMUNITIES_LIST[0]);
  const [interactionFilter, setInteractionFilter] = useState('All Interactions');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showGraphLabels, setShowGraphLabels] = useState(true);
  const [isFullscreenGraphOpen, setIsFullscreenGraphOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefreshGraph = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleNodeClick = (node) => {
    if (node?.community) {
      const match = COMMUNITIES_LIST.find((c) =>
        node.community.includes(c.name)
      );
      if (match) setSelectedCommunity(match);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Row of 5 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {COMMUNITIES_KPI_METRICS.map((metric) => (
          <CommunityKpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* 2. Main Content Grid (Row 1: Visualization & Summary; Row 2: Bottom Analytics & Detail Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* ROW 1 - LEFT: Bridge Network Visualization Card (~60% / 7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm h-full">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Bridge Network Visualization
                </h2>
                <span
                  title="Graph showing detected clusters, modularity borders, and bridge users"
                  className="text-[#8A94A6] hover:text-white cursor-help"
                >
                  <Info className="w-4 h-4" />
                </span>
              </div>

              {/* Top-Right Action Controls */}
              <div className="flex items-center gap-3">
                {/* Interactions Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-lg bg-[#15181C] border border-[#262B33] text-xs font-medium text-[#9AA3B2] hover:text-white hover:border-[#3A4150] transition-all"
                  >
                    <span>{interactionFilter}</span>
                    <ChevronDown
                      className="w-4 h-4 text-[#9AA3B2] flex-shrink-0"
                      strokeWidth={2.5}
                    />
                  </button>

                  {isFilterDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-44 rounded-lg bg-[#151E32] border border-[#1E2638] shadow-2xl z-30 py-1 text-xs animate-in fade-in zoom-in-95 duration-150">
                      {INTERACTION_FILTER_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setInteractionFilter(opt);
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 transition-colors ${
                            interactionFilter === opt
                              ? 'text-[#00BFA5] font-semibold bg-[#1E2D4A]'
                              : 'text-slate-300 hover:bg-[#1E2D4A]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  title="Expand fullscreen"
                  onClick={() => setIsFullscreenGraphOpen(true)}
                  className="p-1 text-[#8A94A6] hover:text-white transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Refresh Layout Button */}
                <button
                  type="button"
                  title="Regenerate visualization layout"
                  onClick={handleRefreshGraph}
                  className="p-1 text-[#8A94A6] hover:text-white transition-colors active:rotate-180 duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Settings Button */}
                <div className="relative">
                  <button
                    type="button"
                    title="Visualization Settings"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className={`p-1 text-[#8A94A6] hover:text-white transition-colors ${
                      isSettingsOpen ? 'text-white' : ''
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  {isSettingsOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#151E32] border border-[#1E2638] shadow-2xl z-30 p-3 text-xs animate-in fade-in zoom-in-95 duration-150">
                      <div className="font-semibold text-white border-b border-[#1E2638] pb-1.5 mb-2">
                        Graph Settings
                      </div>
                      <label className="flex items-center justify-between cursor-pointer py-1 text-slate-300 hover:text-white">
                        <span>Cluster Labels</span>
                        <input
                          type="checkbox"
                          checked={showGraphLabels}
                          onChange={(e) => setShowGraphLabels(e.target.checked)}
                          className="rounded bg-[#0B0F19] border-[#1E2638] text-[#00BFA5] focus:ring-0 cursor-pointer"
                        />
                      </label>
                      <div className="text-[10px] text-[#8A94A6] mt-2 pt-1.5 border-t border-[#1E2638]/50">
                        Active Filter: <span className="text-[#00BFA5]">{interactionFilter}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Network Graph Visualizer */}
            <div
              key={refreshKey}
              className="flex-1 min-h-[380px] sm:min-h-[420px] w-full flex flex-col justify-between"
            >
              <NetworkGraph
                fill
                showLegend={true}
                showLabels={showGraphLabels}
                showControls={true}
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>
        </div>

        {/* ROW 1 - RIGHT: Community Summary Table (~40% / 5 cols) - Exactly same height as Bridge Network Visualization */}
        <div className="lg:col-span-5 flex flex-col">
          <CommunitySummaryTable
            communities={COMMUNITIES_LIST}
            selectedCommunity={selectedCommunity}
            onSelectCommunity={setSelectedCommunity}
            onViewAll={() => setIsViewAllModalOpen(true)}
            className="h-full"
          />
        </div>

        {/* ROW 2 - LEFT: Bottom Analytics Row (Community Comparison & Dominant Topics) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <CommunityComparisonCard className="h-full" />
          <DominantTopicsCard community={selectedCommunity} className="h-full" />
        </div>

        {/* ROW 2 - RIGHT: Selected Community Detail Card (Community 01) - Aligned with Dominant Topics (same height & position) */}
        <div className="lg:col-span-5 flex flex-col">
          <CommunityDetailCard
            community={selectedCommunity}
            onViewDetails={() => setIsDetailsModalOpen(true)}
            className="h-full"
          />
        </div>
      </div>

      {/* 3. Page Footer Text */}
      <footer className="mt-8 pt-4 pb-4 border-t border-[#1E2638] text-center select-none">
        <p className="text-[10px] sm:text-[11px] font-medium tracking-wider text-slate-400 uppercase">
          SPIS ANALYZES PUBLIC POLITICAL DISCUSSIONS ON X (TWITTER) TO IDENTIFY POLARIZATION, COMMUNITIES, AND BRIDGE USERS.
        </p>
      </footer>

      {/* MODALS */}

      {/* Modal 1: Fullscreen Bridge Network Visualization */}
      <Modal
        isOpen={isFullscreenGraphOpen}
        onClose={() => setIsFullscreenGraphOpen(false)}
        title="Bridge Network Visualization (Expanded)"
        subtitle="Detailed map of ideological clusters and inter-community bridge users"
        maxWidth="max-w-6xl"
      >
        <div className="h-[600px] w-full flex flex-col">
          <NetworkGraph
            fill
            showLegend={true}
            showLabels={true}
            showControls={true}
            onNodeClick={handleNodeClick}
          />
        </div>
      </Modal>

      {/* Modal 2: View All Communities */}
      <Modal
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
        title="Detected Communities Overview"
        subtitle="Complete catalog of detected clusters, member sizes, modularity and risk ratings"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2638] text-[11px] uppercase font-bold text-[#8A94A6]">
                  <th className="py-2.5 px-3">Community</th>
                  <th className="py-2.5 px-3">Members</th>
                  <th className="py-2.5 px-3">Echo Risk</th>
                  <th className="py-2.5 px-3">Polarization</th>
                  <th className="py-2.5 px-3">Modularity</th>
                  <th className="py-2.5 px-3">Internal</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2638]/50 text-xs">
                {COMMUNITIES_LIST.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#151E32]/60 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: c.dotColor }}
                        />
                        <span className="font-semibold text-white">
                          {c.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-white">
                      {c.users}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.echoRisk === 'High'
                            ? 'bg-[#2A1518] text-[#EF5350] border border-[#EF5350]/30'
                            : c.echoRisk === 'Medium'
                            ? 'bg-[#2B2117] text-[#FFA500] border border-[#FFA500]/30'
                            : 'bg-[#142222] text-[#2ECC71] border border-[#2ECC71]/30'
                        }`}
                      >
                        {c.echoRisk}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {c.polarization}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {c.modularity}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {c.internal}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCommunity(c);
                          setIsViewAllModalOpen(false);
                        }}
                        className="px-2.5 py-1 rounded bg-[#00BFA5]/15 border border-[#00BFA5]/30 text-[#00BFA5] hover:bg-[#00BFA5]/25 text-[11px] font-semibold"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {/* Modal 3: View Community Details */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={`${selectedCommunity.name} (${selectedCommunity.code}) Analytics`}
        subtitle="In-depth characteristics, narrative clustering, and network boundaries"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
            <div className="p-3 rounded-xl bg-[#0E1524] border border-[#1A253D] text-center">
              <span className="text-[10px] text-[#8A94A6] uppercase block">Members</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {selectedCommunity.members}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1524] border border-[#1A253D] text-center">
              <span className="text-[10px] text-[#8A94A6] uppercase block">Modularity</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {selectedCommunity.modularity}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1524] border border-[#1A253D] text-center">
              <span className="text-[10px] text-[#8A94A6] uppercase block">Internal</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {selectedCommunity.internal}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1524] border border-[#1A253D] text-center">
              <span className="text-[10px] text-[#8A94A6] uppercase block">External</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {selectedCommunity.external}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1524] border border-[#1A253D] text-center">
              <span className="text-[10px] text-[#8A94A6] uppercase block">Sentiment</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {selectedCommunity.sentiment}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-3.5 rounded-xl bg-[#0E1524] border border-[#1A253D]">
            <span className="text-[10px] font-bold text-[#8A94A6] uppercase tracking-wider block mb-1">
              Risk Profile & Assessment
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedCommunity.riskDescription}
            </p>
          </div>

          {/* Dominant Topics Breakdown */}
          <div>
            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider block mb-2">
              Topic Concentrations
            </span>
            <div className="space-y-2">
              {selectedCommunity.dominantTopics.map((topic) => (
                <div key={topic.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{topic.name}</span>
                    <span className="font-mono text-white font-bold">{topic.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0E1524] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
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
        </div>
      </Modal>
    </div>
  );
}
