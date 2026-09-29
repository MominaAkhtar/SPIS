import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PolarizationIndexCard from '../components/PolarizationIndexCard';
import LiveAlertsCard from '../components/LiveAlertsCard';
import SummaryMetricsRow from '../components/SummaryMetricsRow';
import PolarizationTrendCard from '../components/PolarizationTrendCard';
import TopPolarizedTopicsCard from '../components/TopPolarizedTopicsCard';
import ActiveEchoChambersCard from '../components/ActiveEchoChambersCard';
import SystemInsightsCard from '../components/SystemInsightsCard';

export default function DashboardPage() {
  const breadcrumbs = [
    { label: 'HOME', to: '/' },
    { label: 'DASHBOARD' },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs} showDisclaimer={false}>
      {/* Page Header Area */}
      <div className="mb-5 sm:mb-6 select-none">
        <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight">
          Polarization Intelligence Dashboard
        </h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-[#8A94A6] mt-1 font-medium">
          <span>AUG 17, 2026</span>
          <span className="text-[#616A75]">•</span>
          <span>14:32:07 UTC</span>
          <span className="text-[#616A75]">•</span>
          <div className="inline-flex items-center gap-1.5 text-[#00BFA5] font-semibold">
            {/* Twitter/X Icon */}
            <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="tracking-wider text-[11px]">DATA SOURCE: X (TWITTER) API</span>
          </div>
        </div>
      </div>

      {/* Main Top Section: Polarization Index + Live Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <PolarizationIndexCard />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <LiveAlertsCard />
        </div>
      </div>

      {/* Four Summary Metric Cards */}
      <div className="mb-5">
        <SummaryMetricsRow />
      </div>

      {/* Large Polarization Trend Chart */}
      <div className="mb-5">
        <PolarizationTrendCard />
      </div>

      {/* Bottom Section: 3 Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="flex flex-col">
          <TopPolarizedTopicsCard />
        </div>
        <div className="flex flex-col">
          <ActiveEchoChambersCard />
        </div>
        <div className="flex flex-col">
          <SystemInsightsCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
