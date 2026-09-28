import React, { useState } from 'react';
import { Filter, Search, Menu } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import DateRangePicker from '../common/DateRangePicker';
import NotificationArea from './NotificationArea';
import UserProfileArea from './UserProfileArea';
import Modal from '../common/Modal';
import SearchInput from '../common/SearchInput';

/**
 * SPIS Topbar (Header) Component
 * Matches the official top navigation bar across all SPIS screens:
 * - Breadcrumbs / System context
 * - Time window selector (DateRangePicker)
 * - Global Filter toggle
 * - Search modal toggle
 * - Alert notification popover
 * - Researcher Profile area
 */
export default function Topbar({
  breadcrumbs,
  onToggleSidebar,
  filterActive = false,
  onToggleFilter,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="h-16 bg-[#0B0F19] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 flex-shrink-0">
        {/* Left Section: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-[#111827] border border-[#1E2638] text-slate-400 hover:text-white"
              aria-label="Toggle navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Middle Section: Date Range Selector (centered between left and right groups) */}
        <div className="hidden sm:block">
          <DateRangePicker />
        </div>

        {/* Right Section: Filters, Search, Alerts, Profile */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Filter Button */}
          <button
            type="button"
            onClick={onToggleFilter}
            className={`flex h-8 items-center gap-1.5 px-3 rounded-md text-sm font-semibold border transition-colors ${
              filterActive
                ? 'bg-[#00BFA5]/15 border-[#00BFA5] text-[#00BFA5]'
                : 'bg-[#1E2227] border-[#24272C] text-white hover:bg-[#262B31]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden md:inline">Filters</span>
          </button>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Global search"
            className="flex h-8 w-8 items-center justify-center text-[#9E9E9E] hover:text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notification Alert Area */}
          <NotificationArea />

          {/* User Profile Area */}
          <UserProfileArea />
        </div>
      </header>

      {/* Global Quick Search Modal */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Quick Platform Search"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search communities, topics, actors, hashtags, alerts..."
            autoFocus
            size="lg"
          />
          <div className="text-xs text-slate-400">
            <p className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] mb-2">
              Recent Queries
            </p>
            <div className="flex flex-wrap gap-2">
              {['#PakistanElections2026', 'Community 01 Echo Chamber', 'Bridge Users', 'Cross-Community Hostility'].map(
                (item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSearchQuery(item)}
                    className="px-2.5 py-1 rounded bg-[#111D33] border border-[#1E2D48] text-slate-300 hover:text-[#00D284] hover:border-[#00D284]/40 transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
