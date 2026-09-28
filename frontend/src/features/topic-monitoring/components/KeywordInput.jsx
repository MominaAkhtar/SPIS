import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * KeywordInput Component
 * Matches the official Topic Monitoring KEYWORDS container:
 * - Keyword chips with dismiss button (e.g. election, voting, candidate)
 * - "+ Add keyword" trigger / inline adder
 */
export default function KeywordInput({
  keywords = ['election', 'voting', 'candidate'],
  onAdd,
  onRemove,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitKeyword();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewKeyword('');
    }
  };

  const submitKeyword = () => {
    const trimmed = newKeyword.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) {
      onAdd?.(trimmed);
    }
    setNewKeyword('');
    setIsAdding(false);
  };

    return (
    <div className="bg-[#13161A] border border-[#22262C] rounded-xl px-4 py-3.5 min-h-[80px] flex flex-col select-none">
      {/* Chips Area */}
      <div className="flex flex-wrap gap-2 items-center">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="inline-flex items-center gap-1 px-2 h-[22px] rounded-md text-[11px] font-medium bg-[#1E2227] border border-[#2A2D32] text-slate-200"
          >
            <span>{kw}</span>
            <button
              type="button"
              onClick={() => onRemove?.(kw)}
              className="text-slate-400 hover:text-white rounded transition-colors focus:outline-none"
              aria-label={`Remove keyword ${kw}`}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>

      {/* Add Keyword Action */}
      <div className="mt-2.5">
        {isAdding ? (
          <input
            type="text"
            autoFocus
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={submitKeyword}
            placeholder="Type keyword and press Enter..."
            className="bg-[#1A1D21] border border-[#2A2D32] text-white text-[11px] px-2 py-1 rounded-md focus:outline-none focus:border-[#00BFA5] w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="text-[11px] text-[#616161] hover:text-slate-300 font-medium transition-colors focus:outline-none cursor-pointer"
          >
            + Add keyword
          </button>
        )}
      </div>
    </div>
  );
}
