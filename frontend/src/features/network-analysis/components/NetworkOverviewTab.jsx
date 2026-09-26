import React from 'react';
import NetworkGraph from '../../../components/charts/NetworkGraph';

export default function NetworkOverviewTab() {
  return (
    <div>
      <h3 className="text-base font-semibold mb-3">Overall Network Topology</h3>
      <NetworkGraph height={400} />
    </div>
  );
}
