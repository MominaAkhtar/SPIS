import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PageHeader from '../../../components/layout/PageHeader';
import ContentFilters from '../components/ContentFilters';
import ContentCard from '../components/ContentCard';

export default function ContentAnalysisPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Content Analysis" description="Deep dive into social content, sentiment, and narratives." />
      <ContentFilters onFilterChange={(k, v) => console.log(k, v)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContentCard author="@analyst_1" content="Analysis on upcoming policy shifts." platform="Twitter" date="2 hours ago" sentiment="neutral" />
        <ContentCard author="@tech_insider" content="Significant breakthrough reported in renewable tech." platform="Reddit" date="4 hours ago" sentiment="positive" />
      </div>
    </DashboardLayout>
  );
}
