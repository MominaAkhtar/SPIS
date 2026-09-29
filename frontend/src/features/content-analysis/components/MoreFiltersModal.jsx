import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import { SlidersHorizontal, Check } from 'lucide-react';

export default function MoreFiltersModal({ isOpen, onClose, filters, onApply }) {
  const [localFilters, setLocalFilters] = useState({
    verifiedOnly: false,
    hasMediaOnly: false,
    highPolarizationOnly: false,
    language: 'English',
    region: 'All Countries',
    ...filters,
  });

  const handleApply = () => {
    onApply?.(localFilters);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Extended Content Filters"
      subtitle="Configure deep filtration criteria, media restrictions, and language scopes."
      maxWidth="max-w-lg"
      footer={
        <div className="flex items-center justify-end gap-2.5 w-full">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Language & Region */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Language
            </label>
            <select
              value={localFilters.language}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, language: e.target.value })
              }
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              <option value="All">All Languages</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Region
            </label>
            <select
              value={localFilters.region}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, region: e.target.value })
              }
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none"
            >
              <option value="All Countries">All Countries</option>
              <option value="Pakistan">Pakistan</option>
              <option value="South Asia">South Asia</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>

        {/* Checkbox toggles */}
        <div className="space-y-2.5 pt-2 border-t border-[#1E2638]">
          <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-[#0B0F19] hover:bg-[#152033] border border-[#1E2638] transition-colors">
            <input
              type="checkbox"
              checked={localFilters.verifiedOnly}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, verifiedOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#00BFA5] bg-[#111827] border-[#2A3B57] focus:ring-0"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-200">Verified Authors Only</span>
              <p className="text-[#8A94A6] text-[11px]">Filter posts authored by verified institutional accounts</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-[#0B0F19] hover:bg-[#152033] border border-[#1E2638] transition-colors">
            <input
              type="checkbox"
              checked={localFilters.hasMediaOnly}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, hasMediaOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#00BFA5] bg-[#111827] border-[#2A3B57] focus:ring-0"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-200">Exclude Text-Only Posts</span>
              <p className="text-[#8A94A6] text-[11px]">Only display posts that include attached images or videos</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-[#0B0F19] hover:bg-[#152033] border border-[#1E2638] transition-colors">
            <input
              type="checkbox"
              checked={localFilters.highPolarizationOnly}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  highPolarizationOnly: e.target.checked,
                })
              }
              className="w-4 h-4 rounded text-[#00BFA5] bg-[#111827] border-[#2A3B57] focus:ring-0"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-200">High Polarization Index Only</span>
              <p className="text-[#8A94A6] text-[11px]">Prioritize posts with elevated inter-group polarization triggers</p>
            </div>
          </label>
        </div>
      </div>
    </Modal>
  );
}
