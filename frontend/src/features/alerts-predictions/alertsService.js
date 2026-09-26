import apiClient from '../../services/apiClient';

export const alertsService = {
  getAlerts: async () => {
    return apiClient.get('/alerts');
  },
  getPredictions: async () => {
    return apiClient.get('/predictions');
  },
};

export default alertsService;
