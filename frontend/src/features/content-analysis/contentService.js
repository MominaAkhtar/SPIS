import apiClient from '../../services/apiClient';
import { MOCK_POSTS, TOPIC_METRICS } from './data/mockContentData';

export const contentService = {
  getTopicMetrics: async () => {
    try {
      const response = await apiClient.get('/content/topic-metrics');
      return response.data || TOPIC_METRICS;
    } catch {
      return TOPIC_METRICS;
    }
  },

  getContentList: async (params = {}) => {
    try {
      const response = await apiClient.get('/content', { params });
      if (response?.data?.posts) {
        return response.data;
      }
    } catch {
      // Fallback cleanly to mock posts
    }

    // Apply client-side filtering on mock data
    let filtered = [...MOCK_POSTS];

    // Filter by type
    if (params.type && params.type !== 'all' && params.type !== 'All Types') {
      const targetType = params.type.toLowerCase();
      if (targetType.includes('text')) {
        filtered = filtered.filter((p) => p.type === 'TEXT');
      } else if (targetType.includes('image')) {
        filtered = filtered.filter((p) => p.type === 'IMAGE');
      } else if (targetType.includes('video')) {
        filtered = filtered.filter((p) => p.type === 'VIDEO');
      }
    }

    // Filter by sentiment
    if (params.sentiment && params.sentiment !== 'All Sentiment' && params.sentiment !== 'All') {
      filtered = filtered.filter(
        (p) => p.sentiment.toLowerCase() === params.sentiment.toLowerCase()
      );
    }

    // Filter by stance
    if (params.stance && params.stance !== 'All Stances' && params.stance !== 'All') {
      filtered = filtered.filter(
        (p) => p.stance.toLowerCase() === params.stance.toLowerCase()
      );
    }

    // Filter by risk level
    if (params.riskLevel && params.riskLevel !== 'All Risks' && params.riskLevel !== 'All') {
      filtered = filtered.filter(
        (p) => p.riskLevel.toLowerCase() === params.riskLevel.toLowerCase()
      );
    }

    // Filter by query / keywords
    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.text.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.author.handle.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.subTopic.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (params.sortBy) {
      if (params.sortBy === 'Most Recent') {
        filtered.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      } else if (params.sortBy === 'Highest Engagement') {
        filtered.sort(
          (a, b) =>
            (b.engagements?.rawEngagementScore || 0) -
            (a.engagements?.rawEngagementScore || 0)
        );
      } else if (params.sortBy === 'Highest Polarization Risk') {
        filtered.sort(
          (a, b) =>
            (b.engagements?.rawPolarizationScore || 0) -
            (a.engagements?.rawPolarizationScore || 0)
        );
      }
    }

    return {
      posts: filtered,
      totalCount: TOPIC_METRICS.analyzedSummary.totalResults,
      totalAnalyzed: TOPIC_METRICS.analyzedSummary.totalAnalyzed,
    };
  },

  getContentDetails: async (id) => {
    try {
      const response = await apiClient.get(`/content/${id}`);
      return response.data;
    } catch {
      return MOCK_POSTS.find((p) => p.id === id) || null;
    }
  },
};

export default contentService;
