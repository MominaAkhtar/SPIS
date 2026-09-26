import apiClient from '../../services/apiClient';

export const networkService = {
  getNetworkGraph: async (params) => {
    return apiClient.get('/network/graph', { params });
  },
  getCommunities: async (params) => {
    return apiClient.get('/network/communities', { params });
  },
  getBridgeUsers: async (params) => {
    return apiClient.get('/network/bridge-users', { params });
  },
};

export default networkService;
