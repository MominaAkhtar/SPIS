import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Dropdown from '../../../components/common/Dropdown';
import {
  TrendChart,
  TrendChartLegend,
  CircularProgress,
  SparklineChart,
} from '../../../components/charts';

import AlertItem from '../components/AlertItem';
import PredictionSummary from '../components/PredictionSummary';
import RiskyTopicsList from '../components/RiskyTopicsList';
import HighRiskCommunitiesList from '../components/HighRiskCommunitiesList';
import PredictionInsightsList from '../components/PredictionInsightsList';
import AlertPreferencesModal from '../components/AlertPreferencesModal';
import { alertsService } from '../alertsService';

import {
  Download,
  Info,
  Sliders,
  CheckCircle2,
  Bell,
  ArrowUp,
  ShieldAlert,
} from 'lucide-react';

export default function AlertsPredictionsPage() {
  const [summary, setSummary] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [sum, trend, recAlerts, riskyT] = await Promise.all([
        alertsService.getAlertsSummary(),
        alertsService.getTrendPredictionData(),
        alertsService.getRecentAlerts(),
        alertsService.getRiskyTopics(),
      ]);
      setSummary(sum);
      setTrendData(trend);
      setAlerts(recAlerts);
      setTopics(riskyT);
    }
    loadData();
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1000);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'elections', label: 'Elections & Voting' },
    { value: 'policy', label: 'Government Policy' },
    { value: 'civil', label: 'Civil Rights' },
    { value: 'media', label: 'Disinformation' },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'Home', href: '/dashboard' },
        { label: 'ALERTS & PREDICTIONS' },
      ]}
      showDisclaimer={false}
    >
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Alerts & Predictions
          </h1>
          <p className="text-xs sm:text-sm text-[#8A94A6] mt-1">
            Real-time alerts and AI-powered predictions to identify emerging polarization risks.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Dropdown
            options={categoryOptions}
            value={categoryFilter}
            onChange={(val) => {
              const selected = categoryOptions.find((o) => o.value === val);
              setCategoryFilter(selected ? selected.label : val);
            }}
            placeholder="All Categories"
            className="w-36 sm:w-40 text-xs"
          />

          <Button
            variant="primary"
            size="md"
            onClick={handleExport}
            loading={isExporting}
            leftIcon={
              exportSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-[#061510]" />
              ) : (
                <Download className="w-4 h-4 text-[#061510]" />
              )
            }
            className="font-bold text-[#061510] bg-[#00BFA5] hover:bg-[#2DCCA7] border-none px-4 py-2 text-xs"
          >
            {exportSuccess ? 'Report Ready' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Card 1: CURRENT POLARIZATION LEVEL */}
        <div className="bg-[#111827] border border-[#1E2638] hover:border-[#263954] transition-all rounded-xl p-4 flex flex-col justify-between shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Current Polarization Level
            </span>
            <span title="Composite societal polarization index (0-100)" className="text-slate-500 hover:text-slate-300 cursor-help">
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-xs font-bold text-[#00BFA5] uppercase tracking-wider block mb-0.5">
                HIGH
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                72<span className="text-base text-slate-400 font-normal">/100</span>
              </div>
            </div>
            <CircularProgress
              value={72}
              color="#00BFA5"
              trackColor="#152033"
              size={54}
              strokeWidth={5}
            />
          </div>

          <div className="mt-2 pt-2 border-t border-[#1E2638]/70 flex items-center text-[11px] font-semibold text-[#2ECC71]">
            <ArrowUp className="w-3 h-3 mr-0.5" />
            <span>18% from last week</span>
          </div>
        </div>

        {/* Card 2: PREDICTION (NEXT 7 DAYS) */}
        <div className="bg-[#111827] border border-[#1E2638] hover:border-[#263954] transition-all rounded-xl p-4 flex flex-col justify-between shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Prediction (Next 7 Days)
            </span>
            <span title="Machine-learned forecast for 7-day polarization trajectory" className="text-slate-500 hover:text-slate-300 cursor-help">
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-xs font-bold text-[#EF5350] uppercase tracking-wider block mb-0.5">
                HIGH RISK
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                78%
              </div>
            </div>
            <SparklineChart
              data={summary?.predictionNext7Days?.sparkline || [52, 56, 54, 62, 68, 73, 78]}
              color="#EF5350"
              width={84}
              height={32}
            />
          </div>

          <div className="mt-2 pt-2 border-t border-[#1E2638]/70 flex items-center text-[11px] font-semibold text-[#EF5350]">
            <ArrowUp className="w-3 h-3 mr-0.5" />
            <span>12% from last week</span>
          </div>
        </div>

        {/* Card 3: ACTIVE ALERTS */}
        <div className="bg-[#111827] border border-[#1E2638] hover:border-[#263954] transition-all rounded-xl p-4 flex flex-col justify-between shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Alerts
            </span>
            <span title="Real-time threshold breaches currently active" className="text-slate-500 hover:text-slate-300 cursor-help">
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex items-center gap-3.5 mt-2">
            <div className="w-10 h-10 rounded-full bg-[#00BFA5]/15 text-[#00BFA5] flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 fill-current stroke-none" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none block">
                5
              </span>
              <p className="text-xs text-[#8A94A6] mt-0.5">
                Require Attention
              </p>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#1E2638]/70 flex items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1.5 text-[#EF5350]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF5350]" />
              2 Critical
            </span>
            <span className="flex items-center gap-1.5 text-[#F1C40F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F1C40F]" />
              3 Warning
            </span>
          </div>
        </div>

        {/* Card 4: AFFECTED COMMUNITIES */}
        <div className="bg-[#111827] border border-[#1E2638] hover:border-[#263954] transition-all rounded-xl p-4 flex flex-col justify-between shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Affected Communities
            </span>
            <span title="Total clustered communities involved in active polarization" className="text-slate-500 hover:text-slate-300 cursor-help">
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none block">
              12
            </span>
            <p className="text-xs text-[#8A94A6] mt-1 truncate">
              High Risk Communities
            </p>
          </div>

          <div className="mt-2 pt-2 border-t border-[#1E2638]/70 flex items-center text-[11px] font-semibold text-[#2ECC71]">
            <ArrowUp className="w-3 h-3 mr-0.5" />
            <span>3 new this week</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Polarization Trend Prediction & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
        {/* Left Column: Polarization Trend Prediction Chart & Summary */}
        <div className="lg:col-span-8 flex flex-col">
          <Card
            title="Polarization Trend Prediction"
            tooltip="Historical polarization telemetry compared with ML predictive forecast trajectory"
            action={<TrendChartLegend />}
            className="flex-1 flex flex-col justify-between"
            bodyClassName="flex-1 flex flex-col justify-between p-4 sm:p-5"
          >
            {/* Trend Chart with balanced height matching Figma */}
            <div className="flex-1 flex items-center">
              <TrendChart data={trendData} height={215} />
            </div>

            {/* AI Prediction Callout Box */}
            <div className="mt-3">
              <PredictionSummary
                title="AI PREDICTION SUMMARY"
                summary="Polarization is predicted to remain high and may increase further in the next 7 days. Continuous monitoring and early intervention recommended."
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Alerts Module */}
        <div className="lg:col-span-4 flex flex-col">
          <Card
            title="Recent Alerts"
            tooltip="Priority alerts detected by the automated surveillance pipeline"
            headerBorder={true}
            action={
              <button
                type="button"
                className="text-xs text-[#00BFA5] hover:text-[#2DCCA7] font-semibold transition-colors hover:underline"
              >
                View All
              </button>
            }
            noPadding={true}
            className="flex-1 flex flex-col justify-between"
            bodyClassName="flex-1 flex flex-col justify-between"
          >
            {/* Alert Items List with Dividers matching screenshot */}
            <div className="divide-y divide-[#1E2638]">
              {alerts.map((item) => (
                <AlertItem
                  key={item.id}
                  title={item.title}
                  badge={item.badge}
                  level={item.level}
                  metadata={item.metadata}
                  time={item.time}
                />
              ))}
            </div>

            {/* Configure Alert Preferences Button at bottom */}
            <div className="p-4 mt-auto">
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(true)}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0B0F19] hover:bg-[#151E32] border border-[#1E2638] hover:border-[#2A3B57] text-[#94A3B8] hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all select-none shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Configure Alert Preferences</span>
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section: 3 Columns Grid with compact height */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 items-stretch">
        {/* Column 1: Top Risky Topics */}
        <Card
          title="Top Risky Topics"
          tooltip="Polarization vectors sorted by calculated volatility score"
          className="flex flex-col"
          bodyClassName="p-4 flex-1 flex flex-col justify-center"
        >
          <RiskyTopicsList topics={topics} />
        </Card>

        {/* Column 2: High Risk Communities */}
        <Card
          title="High Risk Communities"
          tooltip="Detected community clusters exhibiting critical boundary isolation"
          action={
            <button
              type="button"
              className="text-xs text-[#00BFA5] hover:text-[#2DCCA7] font-semibold transition-colors hover:underline"
            >
              View All
            </button>
          }
          className="flex flex-col"
          bodyClassName="p-4 flex-1 flex flex-col justify-center"
        >
          <HighRiskCommunitiesList />
        </Card>

        {/* Column 3: Prediction Insights */}
        <Card
          title="Prediction Insights"
          tooltip="Automated qualitative insights extracted by NLP classification"
          className="flex flex-col"
          bodyClassName="p-4 flex-1 flex flex-col justify-center"
        >
          <PredictionInsightsList />
        </Card>
      </div>

      {/* Footer Disclaimer matching Figma screenshot */}
      <footer className="pt-2 pb-4 text-center select-none">
        <p className="text-[11px] font-medium text-[#8A94A6] flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#8A94A6]" />
          <span>
            All predictions are AI-generated and should be used for research and informational purposes only.
          </span>
        </p>
      </footer>

      {/* Configure Alert Preferences Modal */}
      <AlertPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </DashboardLayout>
  );
}