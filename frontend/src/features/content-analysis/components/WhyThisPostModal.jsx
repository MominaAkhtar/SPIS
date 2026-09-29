import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

/**
 * WhyThisPostModal
 * Recreates the exact modal/popup shown in reference screenshot (media_1790615924244.png):
 * - Header: ? WHY THIS POST? with teal question mark and white bold text
 * - Subtitle: Selected based on:
 * - 3 Bullet points with vibrant teal dots:
 *    • Topic Relevance — Highly relevant to the selected topic
 *    • Engagement — Significant interaction detected
 *    • Polarization — Strong polarization indicators detected
 * - Matching border, background #131D2D, rounded-2xl, and SPIS styling
 */
export default function WhyThisPostModal({ isOpen, onClose, post }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Popup container matching media_1790615924244.png */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[390px] rounded-2xl bg-[#131D2D] border border-[#23354E] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 z-10 animate-in fade-in zoom-in-95 duration-200 select-none"
      >
        {/* Close button in top-right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C2C45] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with teal question mark */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-black text-[#00BFA5] leading-none">?</span>
          <h2 className="text-base font-black text-white tracking-wide uppercase">
            WHY THIS POST?
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-4 mb-3 text-xs sm:text-sm font-bold text-white tracking-tight">
          Selected based on:
        </p>

        {/* 3 Bullet points matching screenshot */}
        <div className="space-y-4">
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

        {/* Post summary footer */}
        {post.author && (
          <div className="mt-5 pt-4 border-t border-[#23354E]/70 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate max-w-[190px]">
              Author: <span className="text-slate-200 font-medium">{post.author.handle}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#00BFA5]/10 text-[#00BFA5] font-semibold text-[10px]">
              {post.topic || 'ELECTION'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
