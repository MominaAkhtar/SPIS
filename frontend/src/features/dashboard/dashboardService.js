import apiClient from '../../services/apiClient';

export const dashboardService = {
  getOverviewMetrics: async () => {
    return apiClient.get('/dashboard/metrics');
  },
  getActivityTrends: async (params) => {
    return apiClient.get('/dashboard/activity-trends', { params });
  },
};

export default dashboardService;
