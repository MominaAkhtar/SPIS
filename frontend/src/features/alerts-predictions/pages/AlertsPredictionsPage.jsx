import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Dropdown from '../../../components/common/Dropdown';
import {
  LineChart,
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
  AlertTriangle,
  ArrowUpRight,
  Info,
  Sliders,
  CheckCircle2,
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
      disclaimerText="All predictions are AI-generated and should be used for research and informational purposes only."
    >
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Alerts & Predictions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
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
            className="w-40 sm:w-44 text-xs"
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
            className="font-bold shadow-md shadow-[#00D284]/20"
          >
            {exportSuccess ? 'Report Ready' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Top 4 Anomaly & Prediction KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: CURRENT POLARIZATION LEVEL */}
        <div className="bg-[#0D1527] border border-[#172338] hover:border-[#223654] transition-all rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-card">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Polarization Level
              </span>
              <span title="Composite societal polarization index (0-100)" className="text-slate-500 hover:text-slate-300 cursor-help">
                <Info className="w-3 h-3" />
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase font-mono">
              HIGH
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-3xl font-black text-white font-mono-numbers tracking-tight">
                72<span className="text-lg text-slate-500 font-normal">/100</span>
              </span>
            </div>
            <CircularProgress
              value={72}
              color="#00D284"
              trackColor="#111D33"
              size={52}
              strokeWidth={4.5}
            />
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#172338]/60 flex items-center text-xs">
            <span className="inline-flex items-center text-[11px] font-semibold text-rose-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              18% from last week
            </span>
          </div>
        </div>

        {/* Card 2: PREDICTION (NEXT 7 DAYS) */}
        <div className="bg-[#0D1527] border border-[#172338] hover:border-[#223654] transition-all rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-card">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Prediction (Next 7 Days)
              </span>
              <span title="Machine-learned forecast for 7-day polarization trajectory" className="text-slate-500 hover:text-slate-300 cursor-help">
                <Info className="w-3 h-3" />
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 uppercase font-mono">
              HIGH RISK
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-3xl font-black text-white font-mono-numbers tracking-tight">
                78%
              </span>
            </div>
            <SparklineChart
              data={summary?.predictionNext7Days?.sparkline || [52, 54, 58, 62, 67, 72, 78]}
              color="#EF4444"
              width={86}
              height={34}
            />
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#172338]/60 flex items-center text-xs">
            <span className="inline-flex items-center text-[11px] font-semibold text-rose-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              6% projected increase
            </span>
          </div>
        </div>

        {/* Card 3: ACTIVE ALERTS */}
        <div className="bg-[#0D1527] border border-[#172338] hover:border-[#223654] transition-all rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-card">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Alerts
              </span>
              <span title="Real-time threshold breaches currently active" className="text-slate-500 hover:text-slate-300 cursor-help">
                <Info className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black text-white font-mono-numbers tracking-tight">
              5
            </span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#172338]/60 flex items-center gap-2 text-xs">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              4 Critical
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              1 Warning
            </span>
          </div>
        </div>

        {/* Card 4: AFFECTED COMMUNITIES */}
        <div className="bg-[#0D1527] border border-[#172338] hover:border-[#223654] transition-all rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-card">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Affected Communities
              </span>
              <span title="Total clustered communities involved in active polarization" className="text-slate-500 hover:text-slate-300 cursor-help">
                <Info className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-3xl font-black text-white font-mono-numbers tracking-tight">
              12
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate font-medium">
              Large Risk Concentration
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#172338]/60 flex items-center text-xs">
            <span className="inline-flex items-center text-[11px] font-semibold text-rose-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              3 New detected
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Polarization Trend Prediction (Left ~65%) & Recent Alerts (Right ~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left Column: Polarization Trend Prediction Chart & Summary */}
        <div className="lg:col-span-8 flex flex-col">
          <Card
            title="Polarization Trend Prediction"
            tooltip="Historical polarization telemetry compared with ML predictive forecast trajectory"
            action={
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#00C7FF] rounded-full inline-block" />
                  <span className="text-slate-400 text-[11px]">Actual Polarization</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-[#00D284] inline-block" />
                  <span className="text-slate-400 text-[11px]">Predicted Risk / Forecast</span>
                </div>
              </div>
            }
            className="flex-1 flex flex-col justify-between"
          >
            {/* Reusable Multi-Series LineChart */}
            <LineChart
              data={trendData}
              series={[
                {
                  key: 'actual',
                  name: 'Actual Polarization',
                  color: '#00C7FF',
                  isArea: true,
                  strokeWidth: 2.5,
                },
                {
                  key: 'predicted',
                  name: 'Predicted Risk / Forecast',
                  color: '#00D284',
                  isDashed: true,
                  strokeDasharray: '4 4',
                  showDots: true,
                  isArea: true,
                  strokeWidth: 2.5,
                },
              ]}
              height={260}
              showGrid={true}
            />

            {/* AI Prediction Callout Box */}
            <div className="mt-5">
              <PredictionSummary
                title="AI PREDICTION SUMMARY"
                summary="Polarization is predicted to remain high and may increase further in the next 7 days. Communities exhibiting cross-echo amplification may require early intervention and counter-narrative deployment."
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Alerts Module */}
        <div className="lg:col-span-4 flex flex-col">
          <Card
            title="Recent Alerts"
            tooltip="Priority alerts detected by the automated surveillance pipeline"
            action={
              <button
                type="button"
                className="text-xs text-[#00D284] hover:text-[#20E29B] font-semibold transition-colors hover:underline"
              >
                View All →
              </button>
            }
            className="flex-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
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

            {/* Configure Alert Preferences Button */}
            <button
              type="button"
              onClick={() => setIsPreferencesOpen(true)}
              className="w-full mt-4 py-2.5 px-4 rounded-lg bg-[#111D33] hover:bg-[#162540] border border-[#1E2D48] hover:border-[#2D4369] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-150 select-none shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Configure Alert Preferences</span>
            </button>
          </Card>
        </div>
      </div>

      {/* Bottom Section: 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Top Risky Topics */}
        <Card
          title="Top Risky Topics"
          tooltip="Polarization vectors sorted by calculated volatility score"
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
              className="text-xs text-[#00D284] hover:text-[#20E29B] font-semibold transition-colors hover:underline"
            >
              View All
            </button>
          }
        >
          <HighRiskCommunitiesList />
        </Card>

        {/* Column 3: Prediction Insights */}
        <Card
          title="Prediction Insights"
          tooltip="Automated qualitative insights extracted by NLP classification"
        >
          <PredictionInsightsList />
        </Card>
      </div>

      {/* Configure Alert Preferences Modal */}
      <AlertPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </DashboardLayout>
  );
}
