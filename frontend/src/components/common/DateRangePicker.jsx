import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

/**
 * SPIS DateRangePicker Component
 * Renders as a topbar dropdown or inline controls matching the Figma/PDF specs:
 * e.g., "[ 📅 May 8 - May 14, 2025 ▾ ]" with presets:
 * Last 24 Hours, Last 7 Days, Last 30 Days, Custom Range.
 */
export default function DateRangePicker({
  value = { startDate: '2025-05-08', endDate: '2025-05-14', label: 'May 8 - May 14, 2025' },
  onChange,
  className = '',
  inline = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('7d');
  const [currentRange, setCurrentRange] = useState(value);
  const [customStart, setCustomStart] = useState(value?.startDate || '2025-05-08');
  const [customEnd, setCustomEnd] = useState(value?.endDate || '2025-05-14');
  const popoverRef = useRef(null);

  const presets = [
    { id: '24h', label: 'Last 24 Hours', range: 'May 13 - May 14, 2025' },
    { id: '7d', label: 'Last 7 Days', range: 'May 8 - May 14, 2025' },
    { id: '30d', label: 'Last 30 Days', range: 'Apr 14 - May 14, 2025' },
    { id: 'custom', label: 'Custom Range', range: 'Select dates' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    if (preset.id !== 'custom') {
      const newRange = {
        startDate: preset.id === '24h' ? '2025-05-13' : preset.id === '7d' ? '2025-05-08' : '2025-04-14',
        endDate: '2025-05-14',
        label: preset.range,
      };
      setCurrentRange(newRange);
      onChange?.(newRange);
      setIsOpen(false);
    }
  };

  const handleApplyCustom = () => {
    const newRange = {
      startDate: customStart,
      endDate: customEnd,
      label: `${customStart} - ${customEnd}`,
    };
    setCurrentRange(newRange);
    onChange?.(newRange);
    setIsOpen(false);
  };

  if (inline) {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedPreset === preset.id
                ? 'bg-[#00D284] text-[#061510] font-semibold shadow-sm'
                : 'bg-[#0D1527] border border-[#172338] text-slate-300 hover:text-white hover:border-[#223654]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-8 items-center gap-2 px-3 rounded-md text-sm font-medium border transition-colors ${
          isOpen
            ? 'bg-[#262B31] border-[#00BFA5]/40 text-white'
            : 'bg-[#1E2227] border-[#24272C] text-white hover:bg-[#262B31]'
        }`}
      >
        <Calendar className="w-4 h-4 text-[#00BFA5]" />
        <span>{currentRange?.label || 'May 8 – May 14, 2025'}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9E9E9E] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#111827] border border-[#1E2638] shadow-2xl z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Time Window
          </div>

          {/* Preset options */}
          <div className="space-y-1 mb-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  selectedPreset === preset.id
                    ? 'bg-[#00D284]/10 text-[#00D284] font-semibold border border-[#00D284]/30'
                    : 'text-slate-300 hover:bg-[#131F35] hover:text-white'
                }`}
              >
                <span>{preset.label}</span>
                {selectedPreset === preset.id && <Check className="w-3.5 h-3.5 text-[#00D284]" />}
              </button>
            ))}
          </div>

          {/* Custom Date Pickers */}
          {selectedPreset === 'custom' && (
            <div className="pt-2 border-t border-[#172338] space-y-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full bg-[#080D18] border border-[#172338] rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-[#00D284]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full bg-[#080D18] border border-[#172338] rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-[#00D284]"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyCustom}
                className="w-full mt-2 py-1.5 bg-[#00D284] hover:bg-[#05DF8E] text-[#061510] font-semibold text-xs rounded-lg transition-colors shadow-sm"
              >
                Apply Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
