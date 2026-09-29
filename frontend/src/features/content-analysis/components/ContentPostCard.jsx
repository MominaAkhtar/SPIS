import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Play,
  MessageSquare,
  Repeat2,
  Heart,
  Eye,
  ExternalLink,
  Bookmark,
  MoreVertical,
  Share2,
  Copy,
  Check,
  X,
} from 'lucide-react';
import MetadataHoverTooltip from './MetadataHoverTooltip';

/**
 * Helper to highlight hashtags in post text
 */
function renderPostTextWithHashtags(text) {
  if (!text) return null;
  const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith('#')) {
      return (
        <span key={i} className="text-[#00BFA5] hover:underline cursor-pointer font-medium">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function ContentPostCard({
  post,
  viewMode = 'list',
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const detailsRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Close details popover and more menu on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setIsDetailsOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsDetailsOpen(false);
        setIsMoreMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsMoreMenuOpen(false);
    }, 1500);
  };

  // Content type icon & label
  const renderContentTypeTag = () => {
    const type = (post.type || 'TEXT').toUpperCase();
    let Icon = FileText;
    let label = 'TEXT';

    if (type === 'IMAGE') {
      Icon = ImageIcon;
      label = 'IMAGE';
    } else if (type === 'VIDEO') {
      Icon = Video;
      label = 'VIDEO';
    }

    return (
      <div className="w-10 sm:w-11 flex flex-col items-center justify-start pt-1 gap-1 text-[#00BFA5] flex-shrink-0 select-none">
        <Icon className="w-4 h-4 text-[#00BFA5]" />
        <span className="text-[9px] font-black tracking-widest text-[#00BFA5] uppercase">
          {label}
        </span>
      </div>
    );
  };

  // Badge variant colors with rounded-rect [rounded-[6px]] matching media_1790617583213.png
  const getBadgeStyle = (val) => {
    const v = (val || '').toLowerCase();
    if (v === 'negative' || v === 'oppose' || v === 'high' || v === 'critical') {
      return 'border border-[#E74C3C] text-[#EF5350] bg-[#2A1518]/70';
    }
    if (v === 'support' || v === 'positive' || v === 'low') {
      return 'border border-[#2ECC71] text-[#2ECC71] bg-[#142222]/70';
    }
    if (v === 'medium') {
      return 'border border-[#FFA500] text-[#FFA500] bg-[#2B2117]/70';
    }
    // neutral / default
    return 'border border-[#616A75] text-[#9E9E9E] bg-[#1A2230]/70';
  };

  const whyData = post.whyThisPost || {
    title: 'WHY THIS POST?',
    subtitle: 'Selected based on:',
    reasons: [
      {
        label: 'Topic Relevance',
        desc: 'Highly relevant to the selected topic',
      },
      {
        label: 'Engagement',
        desc: 'Significant interaction detected',
      },
      {
        label: 'Polarization',
        desc: 'Strong polarization indicators detected',
      },
    ],
  };

  return (
    <div
      className={`bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] rounded-xl p-4 sm:p-5 transition-all shadow-sm ${
        viewMode === 'grid' ? 'flex flex-col justify-between' : 'flex flex-col lg:flex-row gap-4 lg:gap-6'
      }`}
    >
      {/* Top / Left Layout */}
      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
        {/* Type tag */}
        {renderContentTypeTag()}

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          {/* Author Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              {/* User Avatar */}
              <div className="w-7 h-7 rounded-full bg-[#1E2D4A] border border-[#2A3B57] text-[#00BFA5] font-bold text-xs flex items-center justify-center flex-shrink-0 select-none">
                {post.author?.initials || 'US'}
              </div>

              <span className="font-bold text-sm text-white truncate">
                {post.author?.name || 'Anonymous'}
              </span>

              <span className="text-xs text-[#8A94A6] truncate">
                {post.author?.handle}
              </span>
            </div>

            {/* Date timestamp */}
            <span className="text-xs text-[#8A94A6] whitespace-nowrap">
              {post.date}
            </span>
          </div>

          {/* Post Text */}
          <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed break-words font-normal">
            {renderPostTextWithHashtags(post.text)}
          </p>

          {/* Attached Media: Image */}
          {post.type === 'IMAGE' && post.mediaUrl && (
            <div className="mt-3 overflow-hidden rounded-lg border border-[#1E2638] bg-black/40">
              <img
                src={post.mediaUrl}
                alt="Post attachment"
                className="w-full max-h-[360px] object-cover hover:scale-[1.01] transition-transform duration-200"
                loading="lazy"
              />
            </div>
          )}

          {/* Attached Media: Video */}
          {post.type === 'VIDEO' && post.mediaUrl && (
            <div className="mt-3 relative rounded-lg overflow-hidden border border-[#1E2638] bg-black max-h-[360px] group">
              <img
                src={post.mediaUrl}
                alt="Video thumbnail"
                className="w-full max-h-[360px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              {/* Centered Play Button overlay matching screenshot */}
              <button
                type="button"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                aria-label="Play video"
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/65 border border-white/40 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all backdrop-blur-xs text-white"
              >
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              </button>

              {post.videoDuration && (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                  {post.videoDuration}
                </span>
              )}
            </div>
          )}

          {/* Engagement Metrics Row */}
          <div className="mt-4 flex items-center gap-5 sm:gap-7 text-xs text-[#8A94A6] select-none">
            <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{post.engagements?.comments || '0'}</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Repeat2 className="w-3.5 h-3.5" />
              <span>{post.engagements?.reposts || '0'}</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Heart className="w-3.5 h-3.5 text-rose-500/80" />
              <span>{post.engagements?.likes || '0'}</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span>{post.engagements?.views || '0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Metadata Badges & Action Buttons (media_1790617583213.png) */}
      <div
        className={`flex flex-col justify-between items-end min-w-[210px] sm:min-w-[230px] pt-4 lg:pt-0 ${
          viewMode === 'grid'
            ? 'mt-4 pt-4 border-t border-[#1E2638] items-stretch'
            : 'border-t lg:border-t-0 lg:border-l border-[#1E2638]/70 lg:pl-6'
        }`}
      >
        {/* Three Metadata Badges in a row */}
        <div className="flex items-center gap-2.5 sm:gap-3 self-end">
          {/* Sentiment */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#8A94A6] tracking-wider uppercase mb-1">
              SENTIMENT
            </span>
            <MetadataHoverTooltip data={post.hoverDetails?.sentiment} align="left">
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-[6px] cursor-help tracking-normal transition-all hover:brightness-110 ${getBadgeStyle(
                  post.sentiment
                )}`}
              >
                {post.sentiment}
              </span>
            </MetadataHoverTooltip>
          </div>

          {/* Stance */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#8A94A6] tracking-wider uppercase mb-1">
              STANCE
            </span>
            <MetadataHoverTooltip data={post.hoverDetails?.stance} align="center">
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-[6px] cursor-help tracking-normal transition-all hover:brightness-110 ${getBadgeStyle(
                  post.stance
                )}`}
              >
                {post.stance}
              </span>
            </MetadataHoverTooltip>
          </div>

          {/* Risk Level - align="right" so popover never goes off-screen! */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#8A94A6] tracking-wider uppercase mb-1">
              RISK LEVEL
            </span>
            <MetadataHoverTooltip data={post.hoverDetails?.riskLevel} align="right">
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-[6px] cursor-help tracking-normal transition-all hover:brightness-110 ${getBadgeStyle(
                  post.riskLevel
                )}`}
              >
                {post.riskLevel}
              </span>
            </MetadataHoverTooltip>
          </div>
        </div>

        {/* Topic & Sub-Topic */}
        <div className="my-3 text-right self-end">
          <div className="text-[9px] font-bold text-[#8A94A6] tracking-wider uppercase">
            TOPIC
          </div>
          <span className="inline-block mt-0.5 px-3 py-1 rounded-[6px] text-xs font-bold border border-[#00BFA5] bg-[#00BFA5]/10 text-[#00BFA5] tracking-wider uppercase">
            {post.topic || 'ELECTION'}
          </span>

          <div className="text-[9px] font-bold text-[#8A94A6] tracking-wider uppercase mt-2">
            SUB-TOPIC
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            {post.subTopic || 'Govt. Change'}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex items-center gap-3 self-end relative">
          {/* View Details Popover Button (Appears on click like hover popup with downward arrow) */}
          <div className="relative inline-block" ref={detailsRef}>
            <button
              type="button"
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#161F30] border border-[#263954] hover:bg-[#1C2840] text-xs font-semibold text-white shadow-sm transition-colors"
            >
              <span>View Details</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Click Details Popover matching media_1790615924244.png */}
            {isDetailsOpen && (
              <div
                role="dialog"
                className="absolute bottom-full right-0 mb-3 w-[330px] sm:w-[360px] max-w-[calc(100vw-32px)] rounded-2xl bg-[#131D2D] border border-[#23354E] shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-5 sm:p-6 z-50 text-left animate-in fade-in zoom-in-95 duration-150 select-none"
              >
                {/* Close X button */}
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C2C45] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header with teal question mark */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#00BFA5] leading-none">?</span>
                  <h3 className="text-base font-black text-white tracking-wide uppercase">
                    WHY THIS POST?
                  </h3>
                </div>

                {/* Subtitle */}
                <p className="mt-3.5 mb-3 text-xs sm:text-sm font-bold text-white tracking-tight">
                  Selected based on:
                </p>

                {/* 3 Bullet points matching screenshot */}
                <div className="space-y-3.5">
                  {(whyData.reasons || []).map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00BFA5] mt-1 flex-shrink-0" />
                      <div className="text-xs sm:text-sm leading-snug">
                        <span className="font-semibold text-slate-100">
                          {reason.label}
                        </span>
                        <span className="text-slate-400 font-normal">
                          {' — '}
                          {reason.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Post context footer */}
                {post.author && (
                  <div className="mt-4 pt-3.5 border-t border-[#23354E]/70 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[190px]">
                      Author: <span className="text-slate-200 font-medium">{post.author.handle}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#00BFA5]/10 text-[#00BFA5] font-semibold text-[10px]">
                      {post.topic || 'ELECTION'}
                    </span>
                  </div>
                )}

                {/* Downward speech bubble pointer arrow pointing down to View Details button */}
                <div className="absolute -bottom-[8px] right-10 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#23354E]" />
                <div className="absolute -bottom-[6px] right-10 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#131D2D]" />
              </div>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label="Bookmark post"
            className={`p-1.5 rounded transition-colors ${
              isBookmarked
                ? 'text-[#00BFA5] bg-[#00BFA5]/10'
                : 'text-[#8A94A6] hover:text-white hover:bg-[#152033]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#00BFA5]' : ''}`} />
          </button>

          {/* More Options Button */}
          <div className="relative" ref={moreMenuRef}>
            <button
              type="button"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              aria-label="More options"
              className="p-1.5 rounded text-[#8A94A6] hover:text-white hover:bg-[#152033] transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* More Menu Dropdown */}
            {isMoreMenuOpen && (
              <div className="absolute bottom-full right-0 mb-1 w-40 rounded-xl bg-[#111827] border border-[#23354E] shadow-[0_12px_32px_rgba(0,0,0,0.85)] z-50 p-1 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#152033] rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00BFA5]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#152033] rounded-lg transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Post</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
