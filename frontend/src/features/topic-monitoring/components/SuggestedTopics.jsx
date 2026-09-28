import React from 'react';
import { FileText, Globe, Users, Share2, Bell } from 'lucide-react';

/**
 * SuggestedTopics Component
 * Matches the official Topic Monitoring "Suggested Political Topics" grid:
 * - Elections & Voting
 * - Government Policies
 * - Political Leaders
 * - Political Parties
 * - Political Events
 */
export default function SuggestedTopics({ onSelectTopic }) {
  const topics = [
    { id: 'elections', title: 'Elections & Voting', icon: FileText },
    { id: 'policies', title: 'Government Policies', icon: Globe },
    { id: 'leaders', title: 'Political Leaders', icon: Users },
    { id: 'parties', title: 'Political Parties', icon: Share2 },
    { id: 'events', title: 'Political Events', icon: Bell },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 select-none">
      {topics.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectTopic?.(t.title)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1A1D21] border border-[#2A2D32] text-xs font-medium text-slate-200 hover:bg-[#1E2227] hover:text-white hover:border-slate-500 transition-all text-left group"
          >
            <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00BFA5] transition-colors flex-shrink-0" />
            <span className="truncate">{t.title}</span>
          </button>
        );
      })}
    </div>
  );
}
