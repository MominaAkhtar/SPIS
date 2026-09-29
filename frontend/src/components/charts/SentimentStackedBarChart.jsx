import React, { useState } from 'react';
import { Repeat, Reply, Heart, Quote, AtSign } from 'lucide-react';

const DEFAULT_SENTIMENT_DATA = [
  {
    id: 'reposts',
    label: 'Reposts',
    icon: Repeat,
    iconColor: 'text-[#2ECC71]',
    positive: 34,
    neutral: 56,
    negative: 10,
  },
  {
    id: 'replies',
    label: 'Replies',
    icon: Reply,
    iconColor: 'text-[#3498DB]',
    positive: 28,
    neutral: 43,
    negative: 29,
  },
  {
    id: 'likes',
    label: 'Likes',
    icon: Heart,
    iconColor: 'text-[#EC407A]',
    positive: 32,
    neutral: 56,
    negative: 12,
  },
  {
    id: 'quotes',
    label: 'Quotes',
    icon: Quote,
    iconColor: 'text-[#7E57C2]',
    positive: 20,
    neutral: 58,
    negative: 22,
  },
  {
    id: 'mentions',
    label: 'Mentions',
    icon: AtSign,
    iconColor: 'text-[#FFA500]',
    positive: 24,
    neutral: 64,
    negative: 12,
  },
];

export default function SentimentStackedBarChart({
  data = DEFAULT_SENTIMENT_DATA,
  className = '',
}) {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  return (
    <div className={`w-full flex flex-col select-none ${className}`}>
      {/* Stacked Bars List */}
      <div className="space-y-[9px] flex-1 justify-center flex flex-col">
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center group">
              {/* Icon (indented) + centred label column */}
              {Icon && (
                <Icon className={`w-4 h-4 ml-2.5 flex-shrink-0 ${item.iconColor}`} />
              )}
              <span className="w-[76px] flex-shrink-0 text-center text-[10px] sm:text-[11px] text-slate-300 font-medium">
                {item.label}
              </span>

              {/* Stacked Horizontal Bar */}
              <div className="flex-1 h-[18px] mr-5 bg-[#151E32] flex overflow-hidden relative">
                {/* Positive segment (Green) */}
                <div
                  style={{ width: `${item.positive}%` }}
                  onMouseEnter={() =>
                    setHoveredSegment({
                      type: item.label,
                      cat: 'Positive',
                      val: item.positive,
                    })
                  }
                  onMouseLeave={() => setHoveredSegment(null)}
                  className="h-full bg-[#2ECC71] hover:brightness-110 transition-all cursor-pointer relative"
                  title={`${item.label} Positive: ${item.positive}%`}
                />

                {/* Neutral segment (Slate / Grey) */}
                <div
                  style={{ width: `${item.neutral}%` }}
                  onMouseEnter={() =>
                    setHoveredSegment({
                      type: item.label,
                      cat: 'Neutral',
                      val: item.neutral,
                    })
                  }
                  onMouseLeave={() => setHoveredSegment(null)}
                  className="h-full bg-[#616A75] hover:brightness-110 transition-all cursor-pointer relative"
                  title={`${item.label} Neutral: ${item.neutral}%`}
                />

                {/* Negative segment (Red / Coral) */}
                <div
                  style={{ width: `${item.negative}%` }}
                  onMouseEnter={() =>
                    setHoveredSegment({
                      type: item.label,
                      cat: 'Negative',
                      val: item.negative,
                    })
                  }
                  onMouseLeave={() => setHoveredSegment(null)}
                  className="h-full bg-[#E74C3C] hover:brightness-110 transition-all cursor-pointer relative"
                  title={`${item.label} Negative: ${item.negative}%`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* X-Axis Scale: left offset = icon (26px) + label column (76px), right offset = bar's mr-5 */}
      <div className="flex items-center justify-between pl-[102px] pr-5 pt-3 text-[10px] text-slate-300">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
