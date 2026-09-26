import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PageHeader from '../../../components/layout/PageHeader';
import StatCard from '../../../components/common/StatCard';
import LineChart from '../../../components/charts/LineChart';
import Card from '../../../components/common/Card';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Executive Dashboard" description="Overview of monitored topics, alerts, and platform metrics." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Active Topics" value="12" change="8%" isPositive />
        <StatCard title="Total Posts Analyzed" value="142,500" change="14%" isPositive />
        <StatCard title="Active Alerts" value="3" change="2" isPositive={false} />
        <StatCard title="Risk Index" value="Medium" />
      </div>
      <Card title="Activity Trend" className="mb-6">
        <LineChart height={300} />
      </Card>
    </DashboardLayout>
  );
}
