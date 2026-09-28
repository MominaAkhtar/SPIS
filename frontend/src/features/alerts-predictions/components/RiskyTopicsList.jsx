import React from 'react';

/**
 * SPIS RiskyTopicsList Component
 * Visualizes ranked risk topics with progress bars matching the Figma screenshot.
 */
export default function RiskyTopicsList({
  topics = [
    { id: 1, rank: 1, label: 'Political Extremism', value: 89, color: '#E74C3C' },
    { id: 2, rank: 2, label: 'Religious Conflicts', value: 72, color: '#F1C40F' },
    { id: 3, rank: 3, label: 'Social Inequality', value: 65, color: '#00BFA5' },
    { id: 4, rank: 4, label: 'Immigration Debate', value: 48, color: '#00BFA5' },
  ],
  className = '',
}) {
  return (
    <div className={`space-y-6 select-none ${className}`}>
      {topics.map((item, idx) => {
        const percentage = Math.min(Math.max(item.value || 0, 0), 100);
        const rank = item.rank || idx + 1;

        return (
          <div key={item.id || idx} className="space-y-2">
            {/* Header: Rank + Label and Score */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium truncate">
                {rank}. {item.label}
              </span>
              <span className="font-bold text-white font-mono flex-shrink-0">
                {item.value}
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-1.5 bg-[#151E32] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color || '#00BFA5',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}