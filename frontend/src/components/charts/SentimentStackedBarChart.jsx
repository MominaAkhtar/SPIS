import React, { useState } from 'react';
import { Repeat, Reply, Heart, Quote, AtSign } from 'lucide-react';

const DEFAULT_SENTIMENT_DATA = [
  {
    id: 'reposts',
    label: 'Reposts',
    icon: Repeat,
    iconColor: 'text-[#2ECC71]',
    positive: 38,
    neutral: 47,
    negative: 15,
  },
  {
    id: 'replies',
    label: 'Replies',
    icon: Reply,
    iconColor: 'text-[#3498DB]',
    positive: 34,
    neutral: 41,
    negative: 25,
  },
  {
    id: 'likes',
    label: 'Likes',
    icon: Heart,
    iconColor: 'text-[#EC407A]',
    positive: 42,
    neutral: 45,
    negative: 13,
  },
  {
    id: 'quotes',
    label: 'Quotes',
    icon: Quote,
    iconColor: 'text-[#7E57C2]',
    positive: 24,
    neutral: 56,
    negative: 20,
  },
  {
    id: 'mentions',
    label: 'Mentions',
    icon: AtSign,
    iconColor: 'text-[#FFA500]',
    positive: 28,
    neutral: 52,
    negative: 20,
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
      <div className="space-y-3 flex-1 justify-center flex flex-col">
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-2.5 sm:gap-3 group">
              {/* Icon & Label */}
              <div className="flex items-center gap-2 w-20 sm:w-24 flex-shrink-0">
                {Icon && (
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${item.iconColor}`} />
                )}
                <span className="text-xs text-slate-300 font-medium truncate">
                  {item.label}
                </span>
              </div>

              {/* Stacked Horizontal Bar */}
              <div className="flex-1 h-3.5 bg-[#151E32] rounded flex overflow-hidden relative shadow-inner">
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
                  className="h-full bg-[#616475] hover:brightness-110 transition-all cursor-pointer relative"
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

      {/* X-Axis Scale */}
      <div className="flex items-center justify-between pl-20 sm:pl-24 text-[10px] text-[#8A94A6] pt-3 font-mono">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
