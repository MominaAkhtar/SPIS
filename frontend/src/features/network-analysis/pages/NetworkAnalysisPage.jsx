import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PageHeader from '../../../components/layout/PageHeader';
import Tabs from '../../../components/common/Tabs';
import NetworkOverviewTab from '../components/NetworkOverviewTab';
import CommunitiesTab from '../components/CommunitiesTab';
import BridgeUsersTab from '../components/BridgeUsersTab';
import EchoChambersTab from '../components/EchoChambersTab';
import InteractionTypesTab from '../components/InteractionTypesTab';

const tabs = [
  { id: 'overview', label: 'Network Overview' },
  { id: 'communities', label: 'Communities' },
  { id: 'bridgeUsers', label: 'Bridge Users' },
  { id: 'echoChambers', label: 'Echo Chambers' },
  { id: 'interactions', label: 'Interaction Types' },
];

export default function NetworkAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Network Analysis' },
      ]}
    >
      
      <style>{`
        
        .min-h-screen {
          background-color: #0A0F1A !important;
        }
        /* Full-height sidebar */
        .min-h-screen > div.hidden.lg\\:block {
          position: sticky;
          top: 0;
          height: 150vh;
          align-self: flex-start;
          flex-shrink: 0;
          margin:1px;
        }
        .min-h-screen > div.hidden.lg\\:block > * {
          height: 100% !important;
        }

        /* Parrot green → Figma teal */
        [class*="text-[#00D284]"]   { color: #14D9A8 !important; }
        [class*="border-[#00D284]"] { border-color: #14D9A8 !important; }
        [class*="bg-[#00D284]"]     { background-color: #14D9A8 !important; }
        [class*="bg-[#00D284]/20"]  { background-color: rgba(20,217,168,.2) !important; }
        
        .min-h-screen footer {
        border-top: 0 !important;
        margin-top: 0 !important;
        padding-top: 32px !important;
        padding-bottom: 8px !important;
        }
        .min-h-screen footer p {
        font-size: 11px !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
        color: white  !important;
        }
        div:has(> nav[class*="-mb-px"]) {
        border-bottom: 0 !important;
        }
     `}</style>
      
      <PageHeader
        title="Network Analysis"
        description="Understand how users and communities are connected around this topic."
      />

      {/* Tabs — underline style matching the screenshot */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="underline"
        className="mb-6"
      />

      {/* Tab content */}
      {activeTab === 'overview' && <NetworkOverviewTab />}
      {activeTab === 'communities' && <CommunitiesTab />}
      {activeTab === 'bridgeUsers' && <BridgeUsersTab />}
      {activeTab === 'echoChambers' && <EchoChambersTab />}
      {activeTab === 'interactions' && <InteractionTypesTab />}
    </DashboardLayout>
  );
}
