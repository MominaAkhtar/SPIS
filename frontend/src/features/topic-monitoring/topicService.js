import apiClient from '../../services/apiClient';

export const topicService = {
  getTopics: async () => {
    return apiClient.get('/topics');
  },
  createTopic: async (topicData) => {
    return apiClient.post('/topics', topicData);
  },
  deleteTopic: async (topicId) => {
    return apiClient.delete(`/topics/${topicId}`);
  },
};

export default topicService;
