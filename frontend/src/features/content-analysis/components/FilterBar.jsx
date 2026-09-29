import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, SlidersHorizontal, Check } from 'lucide-react';

/**
 * FilterDropdown
 * Compact custom dropdown with upper label, matching reference screenshot
 */
function FilterDropdown({
  label,
  value,
  options,
  onSelect,
  icon: Icon,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative flex flex-col ${className}`} ref={ref}>
      {/* Upper Label */}
      <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider uppercase mb-1">
        {label}
      </span>

      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-9 items-center justify-between gap-2 rounded-lg border px-3 text-xs sm:text-sm font-medium transition-all select-none ${
          isOpen
            ? 'bg-[#152033] border-[#00BFA5]/60 text-white'
            : 'bg-[#111827] border-[#1E2638] text-slate-200 hover:bg-[#131F35] hover:border-[#2A3B57]'
        }`}
      >
        <span className="truncate">{value}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0 text-[#8A94A6]">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-[#00BFA5]' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[170px] w-full rounded-xl bg-[#111827] border border-[#23354E] shadow-[0_12px_32px_rgba(0,0,0,0.85)] z-50 p-1 animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#00BFA5]/15 text-[#00BFA5] font-semibold'
                    : 'text-slate-300 hover:bg-[#152033] hover:text-white'
                }`}
              >
                <span className="truncate">{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#00BFA5] flex-shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({
  filters,
  onFilterChange,
  onOpenMoreFilters,
}) {
  const contentTypeOptions = ['All Types', 'Text Posts', 'Images', 'Videos'];
  const sentimentOptions = ['All Sentiment', 'Positive', 'Neutral', 'Negative'];
  const stanceOptions = ['All Stances', 'Support', 'Neutral', 'Oppose'];
  const riskLevelOptions = ['All Risks', 'Low', 'Medium', 'High', 'Critical'];
  const communityOptions = ['Global', 'Community 01', 'Community 02', 'Community 03'];
  const dateRangeOptions = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Custom Range'];

  return (
    <div className="mb-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:flex xl:items-end gap-3 xl:gap-3.5">
        <FilterDropdown
          label="CONTENT TYPE"
          value={filters.contentType}
          options={contentTypeOptions}
          onSelect={(val) => onFilterChange('contentType', val)}
          className="xl:w-44"
        />

        <FilterDropdown
          label="SENTIMENT"
          value={filters.sentiment}
          options={sentimentOptions}
          onSelect={(val) => onFilterChange('sentiment', val)}
          className="xl:w-40"
        />

        <FilterDropdown
          label="STANCE"
          value={filters.stance}
          options={stanceOptions}
          onSelect={(val) => onFilterChange('stance', val)}
          className="xl:w-36"
        />

        <FilterDropdown
          label="RISK LEVEL"
          value={filters.riskLevel}
          options={riskLevelOptions}
          onSelect={(val) => onFilterChange('riskLevel', val)}
          className="xl:w-36"
        />

        <FilterDropdown
          label="COMMUNITY"
          value={filters.community}
          options={communityOptions}
          onSelect={(val) => onFilterChange('community', val)}
          className="xl:w-36"
        />

        <FilterDropdown
          label="DATE RANGE"
          value={filters.dateRange}
          options={dateRangeOptions}
          icon={Calendar}
          onSelect={(val) => onFilterChange('dateRange', val)}
          className="xl:w-44"
        />

        {/* More Filters Action */}
        <div className="flex items-end col-span-2 sm:col-span-3 lg:col-span-6 xl:col-auto xl:ml-auto">
          <button
            type="button"
            onClick={onOpenMoreFilters}
            className="flex h-9 items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00BFA5] hover:text-[#42D9C8] transition-colors rounded-lg hover:bg-[#00BFA5]/10 select-none whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
