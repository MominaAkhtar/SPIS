import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PageHeader from '../../../components/layout/PageHeader';
import Tabs from '../../../components/common/Tabs';
import Card from '../../../components/common/Card';
import NetworkOverviewTab from '../components/NetworkOverviewTab';
import CommunitiesTab from '../components/CommunitiesTab';
import BridgeUsersTab from '../components/BridgeUsersTab';
import EchoChambersTab from '../components/EchoChambersTab';
import InteractionTypesTab from '../components/InteractionTypesTab';

export default function NetworkAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Network Overview' },
    { id: 'communities', label: 'Communities' },
    { id: 'bridgeUsers', label: 'Bridge Users' },
    { id: 'echoChambers', label: 'Echo Chambers' },
    { id: 'interactions', label: 'Interaction Types' },
  ];

  return (
    <DashboardLayout>
      <PageHeader title="Network Analysis" description="Explore network structures, key actors, communities, and information flow." />
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'overview' && <NetworkOverviewTab />}
          {activeTab === 'communities' && <CommunitiesTab />}
          {activeTab === 'bridgeUsers' && <BridgeUsersTab />}
          {activeTab === 'echoChambers' && <EchoChambersTab />}
          {activeTab === 'interactions' && <InteractionTypesTab />}
        </div>
      </Card>
    </DashboardLayout>
  );
}
