import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const getInitialTab = () => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'communities', 'bridgeUsers', 'echoChambers', 'interactions'].includes(tabParam)) {
      return tabParam;
    }
    if (location.pathname.includes('echo-chamber')) return 'echoChambers';
    if (location.pathname.includes('interaction')) return 'interactions';
    if (location.pathname.includes('bridge-users')) return 'bridgeUsers';
    if (location.pathname.includes('communities')) return 'communities';
    if (location.pathname.includes('overview')) return 'overview';
    return 'echoChambers';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'overview', label: 'Network Overview' },
    { id: 'communities', label: 'Communities' },
    { id: 'bridgeUsers', label: 'Bridge Users' },
    { id: 'echoChambers', label: 'Echo Chambers' },
    { id: 'interactions', label: 'Interaction Types' },
  ];

  const tabTitles = {
    overview: {
      title: 'Network Overview',
      description: 'Explore overall graph modularity, cluster topology, and cross-group information flow.',
      crumb: 'Network Overview',
    },
    communities: {
      title: 'Communities',
      description: 'Analyze political clusters, key influencers, and community boundaries.',
      crumb: 'Communities',
    },
    bridgeUsers: {
      title: 'Bridge Users',
      description: 'Users who connect different communities and facilitate cross-community interactions.',
      crumb: 'Bridge Users',
    },
    echoChambers: {
      title: 'Echo Chambers',
      description: 'Detect and analyze echo chambers and information silos in the network.',
      crumb: 'Echo Chambers',
    },
    interactions: {
      title: 'Interaction Types',
      description: 'Explore how users interact with each other across different interaction categories.',
      crumb: 'Interaction Types',
    },
  };

  const currentTabInfo = tabTitles[activeTab] || tabTitles.bridgeUsers;

  const breadcrumbs = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Network Analysis', to: '/network-analysis' },
    { label: currentTabInfo.crumb },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      {/* Main Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {currentTabInfo.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#8A94A6]">
          {currentTabInfo.description}
        </p>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className="mb-5">
        <Tabs
          variant="underline"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'overview' && <NetworkOverviewTab />}
        {activeTab === 'communities' && <CommunitiesTab />}
        {activeTab === 'bridgeUsers' && <BridgeUsersTab />}
        {activeTab === 'echoChambers' && <EchoChambersTab />}
        {activeTab === 'interactions' && <InteractionTypesTab />}
      </div>
    </DashboardLayout>
  );
}
