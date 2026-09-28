import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import Topbar from '../../../components/layout/Topbar';
import KeywordInput from '../components/KeywordInput';
import HashtagInput from '../components/HashtagInput';
import SuggestedTopics from '../components/SuggestedTopics';
import RecentMonitoringList from '../components/RecentMonitoringList';
import { ROUTES } from '../../../constants/routes';
import { useTopic } from '../../../context/TopicContext';

/**
 * TopicMonitoringPage Component
 * Exact reproduction of the official Topic Monitoring visual reference.
 */
export default function TopicMonitoringPage() {
  const navigate = useNavigate();
  const { setSelectedTopic } = useTopic?.() || {};

  const [topic, setTopic] = useState('Pakistan Elections');
  const [selectedRange, setSelectedRange] = useState('7d');
  const [keywords, setKeywords] = useState(['election', 'voting', 'candidate']);
  const [hashtags, setHashtags] = useState(['#Election2026', '#PakistanVotes']);

  const dateRanges = [
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'custom', label: 'Custom', icon: Calendar },
  ];

  const handleStartAnalysis = () => {
    if (setSelectedTopic) {
      setSelectedTopic(topic);
    }
    navigate(ROUTES.DASHBOARD);
  };

  const breadcrumbs = [
    { label: 'Home', to: ROUTES.DASHBOARD },
    { label: 'TOPIC MONITORING' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans antialiased selection:bg-[#00BFA5] selection:text-black">
      {/* Minimal Topbar */}
      <Topbar breadcrumbs={breadcrumbs} minimal={true} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1140px] mx-auto px-6 lg:px-8 pt-4 pb-12 flex flex-col">

        {/* Header: Title & Subtitle */}
        <div className="text-center mt-6 sm:mt-10 mb-10">
          <h1 className="text-[38px] font-bold text-white tracking-tight leading-tight">
            Topic Monitoring
          </h1>
          <p className="text-[15px] text-[#94A3B8] mt-2 font-normal">
            Select a political topic to begin analysis.
          </p>
        </div>

        {/* Two-Column Grid — no button inside here */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">

            {/* POLITICAL TOPIC Label */}
            <label
              htmlFor="topic-search-input"
              className="text-[11px] font-bold text-white tracking-[0.12em] uppercase mb-2.5 block select-none"
            >
              POLITICAL TOPIC
            </label>

            {/* Large Search Input */}
            <div className="bg-[#1A1D21] border border-[#2A2D32] rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm focus-within:border-[#00BFA5] transition-colors">
              <Search className="w-5 h-5 text-[#616161] flex-shrink-0" />
              <input
                id="topic-search-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a political topic..."
                className="bg-transparent text-white text-[16px] font-medium placeholder-[#616161] focus:outline-none w-full"
              />
            </div>

            {/* Helper text */}
            <p className="text-[13px] text-[#94A3B8] mt-2.5 mb-5">
              Enter a political topic, keyword, or hashtag to monitor discussions on X.
            </p>

            {/* Form Card */}
            <div className="bg-[#1A1D21] border border-[#2A2D32] rounded-2xl p-6 shadow-sm">

              {/* DATE RANGE */}
              <div>
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white block mb-3 select-none">
                  DATE RANGE
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {dateRanges.map((range) => {
                    const isSelected = selectedRange === range.id;
                    const Icon = range.icon;
                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => setSelectedRange(range.id)}
                        className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all flex items-center gap-1.5 select-none ${isSelected
                          ? 'bg-[#0D2422] border border-[#00BFA5] text-[#00BFA5]'
                          : 'bg-[#1E2227] border border-[#2A2D32] text-[#9E9E9E] hover:text-white hover:border-[#616161]'
                          }`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
                        <span>{range.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* KEYWORDS & HASHTAGS ROW */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* KEYWORDS */}
                <div>
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white block mb-2 select-none">
                    KEYWORDS
                  </span>
                  <KeywordInput
                    keywords={keywords}
                    onAdd={(kw) => setKeywords([...keywords, kw])}
                    onRemove={(kw) => setKeywords(keywords.filter((k) => k !== kw))}
                  />
                </div>

                {/* HASHTAGS */}
                <div>
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white block mb-2 select-none">
                    HASHTAGS
                  </span>
                  <HashtagInput
                    hashtags={hashtags}
                    onAdd={(tag) => setHashtags([...hashtags, tag])}
                    onRemove={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
                  />
                </div>

              </div>
            </div>

            {/* Start Analysis Button: right-aligned to the card */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="bg-[#00BFA5] hover:bg-[#2DCCA7] text-black font-bold text-[14px] w-[185px] h-[48px] rounded-lg flex items-center justify-center gap-2.5 shadow-[0_0_28px_rgba(0,191,165,0.4)] hover:shadow-[0_0_36px_rgba(0,191,165,0.6)] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Start Analysis</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Suggested Political Topics */}
            <div>
              <h3 className="text-[14px] font-semibold text-white mb-3 select-none">
                Suggested Political Topics
              </h3>
              <SuggestedTopics onSelectTopic={(t) => setTopic(t)} />
            </div>

            {/* Recent Monitoring */}
            <div>
              <h3 className="text-[14px] font-semibold text-white mb-3 select-none">
                Recent Monitoring
              </h3>
              <RecentMonitoringList onSelect={(item) => setTopic(item.title)} />
            </div>
          </div>
        </div>


        {/* Footer — pure white text, dimmer dots */}
        <footer className="w-full mt-24 pt-10 border-t border-white/[0.07] text-center">
          <p className="text-[12px] text-white">
            Data Source: X (Twitter)
            <span className="mx-3 text-[#555a62]">·</span>
            Political Discussions
            <span className="mx-3 text-[#555a62]">·</span>
            English Language
          </p>
        </footer>
      </main>
    </div>
  );
}
