import React from 'react';
import { Globe, FileText, Image as ImageIcon, Video, Heart } from 'lucide-react';
import { TOPIC_METRICS } from '../data/mockContentData';

/**
 * Custom X (Twitter) icon SVG matching SPIS cyber style
 */
function TwitterXIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function TopicCard({ metrics = TOPIC_METRICS }) {
  return (
    <div className="bg-[#111827] border border-[#1E2638] rounded-xl p-5 mb-5 flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-sm">
      {/* Left Topic Details */}
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-[#00BFA5]/10 border border-[#00BFA5]/25 flex items-center justify-center flex-shrink-0 text-[#00BFA5] shadow-sm">
          <Globe className="w-6 h-6" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-[#8A94A6] tracking-wider uppercase">
              CURRENT TOPIC
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#E74C3C] text-white tracking-widest leading-none">
              LIVE
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 truncate">
            {metrics.currentTopic}
          </h2>

          <div className="flex items-center gap-2 sm:gap-2.5 text-xs text-[#8A94A6] mt-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-300">
              <TwitterXIcon className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span className="text-[#8A94A6]">Data Source:</span>
              <span className="font-semibold text-slate-200">{metrics.dataSource}</span>
            </div>
            <span className="text-slate-600 select-none">•</span>
            <div>
              <span className="text-[#8A94A6]">Language: </span>
              <span className="font-semibold text-slate-200">{metrics.language}</span>
            </div>
            <span className="text-slate-600 select-none">•</span>
            <div>
              <span className="text-[#8A94A6]">Region: </span>
              <span className="font-semibold text-slate-200">{metrics.region}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Four Metric Cards (matching media_1790617908122.png) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 pt-4 xl:pt-0 border-t xl:border-t-0 border-[#1E2638] flex-shrink-0">
        {/* Card 1: POSTS */}
        <div className="flex flex-col justify-between px-4 py-3 rounded-xl bg-[#0E1626]/70 border border-[#1E2D48] min-w-[110px] sm:min-w-[120px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#8A94A6] tracking-wider uppercase">
              POSTS
            </span>
            <FileText className="w-3.5 h-3.5 text-[#2ECC71] flex-shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
            {metrics.postsCount}
          </span>
        </div>

        {/* Card 2: IMAGES */}
        <div className="flex flex-col justify-between px-4 py-3 rounded-xl bg-[#0E1626]/70 border border-[#1E2D48] min-w-[110px] sm:min-w-[120px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#8A94A6] tracking-wider uppercase">
              IMAGES
            </span>
            <ImageIcon className="w-3.5 h-3.5 text-[#3498DB] flex-shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
            {metrics.imagesCount}
          </span>
        </div>

        {/* Card 3: VIDEOS */}
        <div className="flex flex-col justify-between px-4 py-3 rounded-xl bg-[#0E1626]/70 border border-[#1E2D48] min-w-[110px] sm:min-w-[120px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#8A94A6] tracking-wider uppercase">
              VIDEOS
            </span>
            <Video className="w-3.5 h-3.5 text-[#FFA500] flex-shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
            {metrics.videosCount}
          </span>
        </div>

        {/* Card 4: ENGAGEMENTS */}
        <div className="flex flex-col justify-between px-4 py-3 rounded-xl bg-[#0E1626]/70 border border-[#1E2D48] min-w-[110px] sm:min-w-[120px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#8A94A6] tracking-wider uppercase">
              ENGAGEMENTS
            </span>
            <Heart className="w-3.5 h-3.5 text-[#AF7AC5] flex-shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
            {metrics.engagementsCount}
          </span>
        </div>
      </div>
    </div>
  );
}
