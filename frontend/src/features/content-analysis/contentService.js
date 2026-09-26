import apiClient from '../../services/apiClient';

export const contentService = {
  getContentList: async (params) => {
    return apiClient.get('/content', { params });
  },
  getContentDetails: async (id) => {
    return apiClient.get(`/content/${id}`);
  },
};

export default contentService;
