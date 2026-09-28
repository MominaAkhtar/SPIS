import React, { useState } from 'react';
import { Search, CheckCircle2, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import Modal from './Modal';
import { useTopic } from '../../context/TopicContext';

export default function TopicSelectorModal({ isOpen, onClose }) {
  const { selectedTopic, setSelectedTopic } = useTopic() || {};
  const [search, setSearch] = useState('');

  const availableTopics = [
    {
      id: 'pak-elections-2026',
      title: 'Pakistan Elections 2026',
      status: 'Active Monitoring',
      posts: '128.5K posts',
      sources: 'X (Twitter)',
      lastUpdated: '12m ago',
    },
    {
      id: 'gov-policy-debate',
      title: 'Government Policy Debate',
      status: 'Active Monitoring',
      posts: '84.2K posts',
      sources: 'X (Twitter)',
      lastUpdated: '3 days ago',
    },
    {
      id: 'us-presidential-election',
      title: 'US Presidential Election',
      status: 'Archived / Stable',
      posts: '2.4M posts',
      sources: 'X (Twitter)',
      lastUpdated: '3 hours ago',
    },
    {
      id: 'climate-accord-discussions',
      title: 'Global Climate Summit & Policy',
      status: 'Active Monitoring',
      posts: '45.1K posts',
      sources: 'X (Twitter)',
      lastUpdated: '1 day ago',
    },
  ];

  const currentTopicTitle = selectedTopic?.title || 'Pakistan Elections 2026';

  const filteredTopics = availableTopics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectTopic = (topic) => {
    if (setSelectedTopic) {
      setSelectedTopic(topic);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Active Topic" maxWidth="max-w-lg">
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          Switch the active intelligence topic to analyze corresponding networks, sentiment, and polarization metrics.
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter topics..."
            className="w-full bg-[#0D111E] border border-[#1B2638] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#00BFA5]"
          />
        </div>

        {/* Topic List */}
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {filteredTopics.map((topic) => {
            const isSelected = currentTopicTitle === topic.title;

            return (
              <div
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#00BFA5]/10 border-[#00BFA5] text-white shadow-sm'
                    : 'bg-[#0A101D] border-[#1B2638] text-slate-300 hover:bg-[#152033] hover:border-[#263954]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{topic.title}</span>
                    {isSelected && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#00BFA5] text-[#061510]">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span>{topic.posts}</span>
                    <span>•</span>
                    <span>{topic.sources}</span>
                    <span>•</span>
                    <span>{topic.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 text-slate-400 hover:text-[#00BFA5]">
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00BFA5]" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
