import React, { useState, useRef } from 'react';

/**
 * MetadataHoverTooltip
 * Matches the exact design in the reference screenshot (media_1790615935134.png):
 * - Dark navy background `#131D2D`
 * - Deep border `#23354E`
 * - Dot indicator + Category heading (e.g. 🔴 STANCE)
 * - Headline with custom color (e.g. OPPOSITE - WHY?)
 * - Divider line
 * - Multi-line explanation text
 * - Downward speech bubble arrow at the bottom pointing to the target badge
 * - Supports alignment ('left', 'center', 'right') so rightmost tooltips stay 100% on-screen
 */
export default function MetadataHoverTooltip({
  children,
  data,
  align = 'center',
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  if (!data) return children;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 120);
  };

  const dotBg = data.color || '#E74C3C';

  // Alignment classes for tooltip container
  const alignmentClasses = {
    center: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    right: 'bottom-full right-0 mb-3',
    left: 'bottom-full left-0 mb-3',
  };

  // Alignment classes for the downward speech bubble arrow
  const arrowAlignmentClasses = {
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-6',
    left: 'left-6',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 ${
            alignmentClasses[align] || alignmentClasses.center
          } w-72 max-w-[calc(100vw-32px)] p-4 rounded-xl bg-[#131D2D] border border-[#23354E] shadow-[0_12px_32px_rgba(0,0,0,0.85)] text-left animate-in fade-in zoom-in-95 duration-150 pointer-events-none select-none`}
        >
          {/* Header Row: Dot + Category */}
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: dotBg }}
            />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              {data.category || 'METADATA'}
            </span>
          </div>

          {/* Subtitle / Why line */}
          {data.title && (
            <div
              className="mt-1 text-xs font-black uppercase tracking-wide"
              style={{ color: data.color || '#EF5350' }}
            >
              {data.title}
            </div>
          )}

          {/* Divider */}
          <div className="border-b border-[#23354E]/80 my-2.5" />

          {/* Body description */}
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            {data.text}
          </p>

          {/* Speech bubble downward arrow pointing at the hovered badge */}
          <div
            className={`absolute -bottom-[8px] ${
              arrowAlignmentClasses[align] || arrowAlignmentClasses.center
            } w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#23354E]`}
          />
          <div
            className={`absolute -bottom-[6px] ${
              arrowAlignmentClasses[align] || arrowAlignmentClasses.center
            } w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#131D2D]`}
          />
        </div>
      )}
    </div>
  );
}
