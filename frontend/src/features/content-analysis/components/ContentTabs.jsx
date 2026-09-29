import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, List, ChevronDown, Check } from 'lucide-react';

export default function ContentTabs({
  activeTab = 'all',
  onTabChange,
  sortBy = 'Most Relevant',
  onSortChange,
  viewMode = 'list',
  onViewModeChange,
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const tabs = [
    { id: 'all', label: 'All Content' },
    { id: 'text', label: 'Text Posts' },
    { id: 'images', label: 'Images' },
    { id: 'videos', label: 'Videos' },
  ];

  const sortOptions = [
    'Most Relevant',
    'Most Recent',
    'Highest Engagement',
    'Highest Polarization Risk',
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2638] pb-1 mb-3.5">
      {/* Left Tabs */}
      <div className="flex items-center space-x-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`pb-3 text-sm whitespace-nowrap transition-colors border-b-2 font-medium select-none ${
                isActive
                  ? 'border-[#00BFA5] text-[#00BFA5] font-bold'
                  : 'border-transparent text-[#8A94A6] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Sort By & View Controls */}
      <div className="flex items-center gap-3 self-end sm:self-center pb-2 sm:pb-0">
        <div className="relative flex items-center" ref={sortRef}>
          <span className="text-xs text-[#8A94A6] mr-2 whitespace-nowrap select-none">
            Sort by:
          </span>
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex h-8 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] text-xs font-semibold text-white transition-colors"
          >
            <span>{sortBy}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#8A94A6] transition-transform duration-150 ${
                isSortOpen ? 'rotate-180 text-[#00BFA5]' : ''
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute top-full right-0 mt-1 min-w-[190px] rounded-xl bg-[#111827] border border-[#23354E] shadow-[0_12px_32px_rgba(0,0,0,0.85)] z-50 p-1 animate-in fade-in zoom-in-95 duration-100">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onSortChange(opt);
                    setIsSortOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    sortBy === opt
                      ? 'bg-[#00BFA5]/15 text-[#00BFA5] font-semibold'
                      : 'text-slate-300 hover:bg-[#152033] hover:text-white'
                  }`}
                >
                  <span>{opt}</span>
                  {sortBy === opt && (
                    <Check className="w-3.5 h-3.5 text-[#00BFA5] flex-shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid / List View Toggle */}
        <div className="flex items-center rounded-lg bg-[#111827] border border-[#1E2638] p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            title="Grid view"
            aria-label="Grid view"
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#00BFA5]/15 text-[#00BFA5]'
                : 'text-[#8A94A6] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            title="List view"
            aria-label="List view"
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-[#00BFA5]/15 text-[#00BFA5]'
                : 'text-[#8A94A6] hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
