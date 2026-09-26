import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import PageHeader from '../../../components/layout/PageHeader';
import Card from '../../../components/common/Card';
import KeywordInput from '../components/KeywordInput';
import HashtagInput from '../components/HashtagInput';
import RecentMonitoringList from '../components/RecentMonitoringList';

export default function TopicMonitoringPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Topic Monitoring" description="Configure keywords, hashtags, and monitor real-time social conversations." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Add Target Keywords">
          <KeywordInput onAdd={(kw) => console.log('Added keyword:', kw)} />
        </Card>
        <Card title="Add Hashtags">
          <HashtagInput onAdd={(tag) => console.log('Added hashtag:', tag)} />
        </Card>
      </div>
      <div className="mt-6">
        <Card title="Currently Monitored Topics">
          <RecentMonitoringList items={[
            { name: 'Climate Policy', status: 'active' },
            { name: 'Tech Regulation', status: 'active' },
          ]} />
        </Card>
      </div>
    </DashboardLayout>
  );
}
