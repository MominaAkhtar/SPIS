import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import { Search, Filter, RotateCcw } from 'lucide-react';

export default function AdvancedSearchModal({ isOpen, onClose, onSearch }) {
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [minLikes, setMinLikes] = useState('');
  const [sentiment, setSentiment] = useState('All');
  const [stance, setStance] = useState('All');

  const handleReset = () => {
    setKeywords('');
    setAuthor('');
    setHashtag('');
    setMinLikes('');
    setSentiment('All');
    setStance('All');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      keywords,
      author,
      hashtag,
      minLikes,
      sentiment,
      stance,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Advanced Content Search"
      subtitle="Refine search parameters across public discussions, media, and polarization indicators."
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            >
              Apply Search
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Keywords */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Keywords / Phrases
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. election, youth, corruption, inflation..."
            className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none transition-colors"
          />
        </div>

        {/* Author & Hashtag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Author / Handle
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="@username"
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Hashtag
            </label>
            <input
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              placeholder="#Election2026"
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Minimum Likes, Sentiment & Stance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Min Likes
            </label>
            <input
              type="number"
              value={minLikes}
              onChange={(e) => setMinLikes(e.target.value)}
              placeholder="e.g. 500"
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Sentiment
            </label>
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none transition-colors"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Stance
            </label>
            <select
              value={stance}
              onChange={(e) => setStance(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#1E2638] text-white text-xs sm:text-sm focus:border-[#00BFA5] focus:outline-none transition-colors"
            >
              <option value="All">All Stances</option>
              <option value="Support">Support</option>
              <option value="Neutral">Neutral</option>
              <option value="Oppose">Oppose</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
