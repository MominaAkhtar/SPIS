import React from 'react';
import HorizontalBarChart from '../../../components/charts/HorizontalBarChart';

/**
 * SPIS RiskyTopicsList Component
 * Leverages the reusable HorizontalBarChart to display priority polarization vectors.
 */
export default function RiskyTopicsList({
  topics = [
    { id: 1, rank: 1, label: 'Polarization Discourse', value: 88, color: 'from-rose-500 to-orange-500' },
    { id: 2, rank: 2, label: 'Political Corruption', value: 72, color: 'from-orange-500 to-amber-500' },
    { id: 3, rank: 3, label: 'Social Inequality', value: 65, color: 'from-cyan-500 to-blue-500' },
    { id: 4, rank: 4, label: 'Immigration Debate', value: 48, color: 'from-[#00BFA5] to-teal-500' },
  ],
  className = '',
}) {
  return (
    <div className={className}>
      <HorizontalBarChart items={topics} max={100} showRank={true} showValue={true} />
    </div>
  );
}
