import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PageHeader from '../../../components/layout/PageHeader';
import Card from '../../../components/common/Card';
import AlertItem from '../components/AlertItem';
import RiskyTopicsList from '../components/RiskyTopicsList';
import PredictionSummary from '../components/PredictionSummary';

export default function AlertsPredictionsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Alerts & Predictions" description="Automated risk anomaly detection and predictive forecasting." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Active Risk Alerts">
          <AlertItem title="Surge in Misinformation" level="critical" time="10m ago" description="Abnormal volume of coordinated retweets detected." />
          <AlertItem title="Sentiment Plummet" level="high" time="45m ago" description="Topic 'Policy Delta' sentiment decreased by 34%." />
        </Card>
        <div className="space-y-6">
          <Card title="Predictive AI Summary">
            <PredictionSummary summary="Disinformation velocity expected to peak within the next 6 hours." confidenceScore={88} />
          </Card>
          <Card title="Risky Topics Matrix">
            <RiskyTopicsList topics={[
              { name: 'Disinfo Campaign Beta', risk: 'high' },
              { name: 'Sub-network Surge X', risk: 'medium' },
            ]} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
