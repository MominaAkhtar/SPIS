import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * HashtagInput Component
 * Matches the official Topic Monitoring HASHTAGS container:
 * - Brand teal hashtag chips with dismiss button (e.g. #Election2026, #PakistanVotes)
 * - "+ Add hashtag" trigger / inline adder
 */
export default function HashtagInput({
  hashtags = ['#Election2026', '#PakistanVotes'],
  onAdd,
  onRemove,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitTag();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTag('');
    }
  };

  const submitTag = () => {
    let trimmed = newTag.trim();
    if (trimmed) {
      if (!trimmed.startsWith('#')) {
        trimmed = `#${trimmed}`;
      }
      if (!hashtags.includes(trimmed)) {
        onAdd?.(trimmed);
      }
    }
    setNewTag('');
    setIsAdding(false);
  };
  return (
    <div className="bg-[#13161A] border border-[#22262C] rounded-xl px-4 py-3.5 min-h-[80px] flex flex-col select-none">
      {/* Chips Area */}
      <div className="flex flex-wrap gap-2 items-center">
        {hashtags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 h-[22px] rounded-md text-[11px] font-medium bg-[#00BFA5]/10 border border-[#00BFA5] text-[#00BFA5]"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => onRemove?.(tag)}
              className="text-[#00BFA5]/80 hover:text-white rounded transition-colors focus:outline-none"
              aria-label={`Remove hashtag ${tag}`}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>

      {/* Add Hashtag Action */}
      <div className="mt-2.5">
        {isAdding ? (
          <input
            type="text"
            autoFocus
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={submitTag}
            placeholder="#tag and press Enter..."
            className="bg-[#1A1D21] border border-[#2A2D32] text-white text-[11px] px-2 py-1 rounded-md focus:outline-none focus:border-[#00BFA5] w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="text-[11px] text-[#616161] hover:text-slate-300 font-medium transition-colors focus:outline-none cursor-pointer"
          >
            + Add hashtag
          </button>
        )}
      </div>
    </div>
  );
}
