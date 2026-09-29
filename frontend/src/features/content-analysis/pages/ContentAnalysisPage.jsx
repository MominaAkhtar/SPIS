import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import TopicCard from '../components/TopicCard';
import FilterBar from '../components/FilterBar';
import ContentTabs from '../components/ContentTabs';
import ContentPostCard from '../components/ContentPostCard';
import Pagination from '../components/Pagination';
import AdvancedSearchModal from '../components/AdvancedSearchModal';
import MoreFiltersModal from '../components/MoreFiltersModal';
import { contentService } from '../contentService';
import { TOPIC_METRICS, MOCK_POSTS } from '../data/mockContentData';
import { Info, Download, SlidersHorizontal, Check, Share2 } from 'lucide-react';

export default function ContentAnalysisPage() {
  // Filter States matching reference screenshot
  const [filters, setFilters] = useState({
    contentType: 'All Types',
    sentiment: 'All Sentiment',
    stance: 'All Stances',
    riskLevel: 'All Risks',
    community: 'Global',
    dateRange: 'Last 7 Days',
  });

  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Modals state
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [exportToast, setExportToast] = useState(null);

  // Posts data state
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [metrics, setMetrics] = useState(TOPIC_METRICS);

  // Fetch or filter data
  useEffect(() => {
    let tabType = 'all';
    if (activeTab === 'text') tabType = 'Text Posts';
    if (activeTab === 'images') tabType = 'Images';
    if (activeTab === 'videos') tabType = 'Videos';

    contentService
      .getContentList({
        type: filters.contentType !== 'All Types' ? filters.contentType : tabType,
        sentiment: filters.sentiment,
        stance: filters.stance,
        riskLevel: filters.riskLevel,
        sortBy,
      })
      .then((data) => {
        if (data?.posts) {
          setPosts(data.posts);
        }
      });
  }, [filters, activeTab, sortBy]);

  const handleFilterChange = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
    // Also sync contentType filter with top tabs if applicable
    if (key === 'contentType') {
      if (val === 'Text Posts') setActiveTab('text');
      else if (val === 'Images') setActiveTab('images');
      else if (val === 'Videos') setActiveTab('videos');
      else setActiveTab('all');
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'text') setFilters((prev) => ({ ...prev, contentType: 'Text Posts' }));
    else if (tabId === 'images') setFilters((prev) => ({ ...prev, contentType: 'Images' }));
    else if (tabId === 'videos') setFilters((prev) => ({ ...prev, contentType: 'Videos' }));
    else setFilters((prev) => ({ ...prev, contentType: 'All Types' }));
  };

  const handleExportReport = () => {
    // Generate simulated export report
    const exportData = {
      topic: metrics.currentTopic,
      generatedAt: new Date().toISOString(),
      postsCount: posts.length,
      samplePosts: posts.map((p) => ({
        author: p.author?.handle,
        text: p.text,
        sentiment: p.sentiment,
        stance: p.stance,
        riskLevel: p.riskLevel,
        topic: p.topic,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SPIS_Content_Analysis_Report_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setExportToast('Content Analysis report exported successfully!');
    setTimeout(() => setExportToast(null), 3500);
  };

  const handleAdvancedSearch = (searchParams) => {
    contentService
      .getContentList({
        query: searchParams.keywords || searchParams.hashtag || searchParams.author,
        sentiment: searchParams.sentiment !== 'All' ? searchParams.sentiment : undefined,
        stance: searchParams.stance !== 'All' ? searchParams.stance : undefined,
      })
      .then((data) => {
        if (data?.posts) {
          setPosts(data.posts);
        }
      });
  };

  const breadcrumbs = [
    { label: 'Home', to: '/dashboard' },
    {
      label: 'CONTENT ANALYSIS',
      className: 'text-white font-bold tracking-wider text-xs sm:text-sm uppercase',
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      {/* Toast Notification */}
      {exportToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] border border-[#00BFA5] text-[#00BFA5] font-semibold text-xs shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4" />
          <span>{exportToast}</span>
        </div>
      )}

      {/* Page Title & Top Right Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Content Analysis
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8A94A6]">
            Explore and analyze text posts, images, and videos related to the selected topic.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0">
          {/* Advanced Search Button */}
          <button
            type="button"
            onClick={() => setIsAdvancedSearchOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#1E2227] hover:bg-[#262B31] border border-[#2A2D32] hover:border-[#383E46] text-white text-xs sm:text-sm font-semibold transition-all select-none shadow-sm"
          >
            Advanced Search
          </button>

          {/* Export Report Button */}
          <button
            type="button"
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00BFA5] hover:bg-[#14B8A6] text-[#0B0D0E] text-xs sm:text-sm font-bold transition-all select-none shadow-sm active:scale-95"
          >
            <Share2 className="w-4 h-4 text-[#0B0D0E] stroke-[2.5]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Large Current Topic Card */}
      <TopicCard metrics={metrics} />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
      />

      {/* Content Tabs, Sort and View Controls */}
      <ContentTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Results Summary Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1 mb-3.5 text-xs text-[#8A94A6] select-none">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#8A94A6] flex-shrink-0" />
          <span>
            <strong className="font-semibold text-slate-300">2.4M</strong> posts analyzed • Displaying a ranked selection based on relevance, engagement & polarization signals.
          </span>
        </div>

        <div className="whitespace-nowrap font-medium text-slate-400">
          Showing 1–20 of 2,400,000 posts
        </div>
      </div>

      {/* Content Feed Section */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
            : 'space-y-3.5'
        }
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <ContentPostCard
              key={post.id}
              post={post}
              viewMode={viewMode}
            />
          ))
        ) : (
          <div className="p-12 text-center bg-[#111827] border border-[#1E2638] rounded-xl">
            <p className="text-slate-400 text-sm">
              No posts match the current filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilters({
                  contentType: 'All Types',
                  sentiment: 'All Sentiment',
                  stance: 'All Stances',
                  riskLevel: 'All Risks',
                  community: 'Global',
                  dateRange: 'Last 7 Days',
                });
                setActiveTab('all');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#00BFA5]/15 text-[#00BFA5] text-xs font-semibold hover:bg-[#00BFA5]/25"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      <Pagination
        currentPage={currentPage}
        totalPages={907}
        totalResults="18,132"
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={handleAdvancedSearch}
      />

      {/* More Filters Modal */}
      <MoreFiltersModal
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters((prev) => ({ ...prev, ...newFilters }));
        }}
      />
    </DashboardLayout>
  );
}
