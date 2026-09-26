import apiClient from '../../services/apiClient';

export const authService = {
  login: async (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },
  signup: async (userData) => {
    return apiClient.post('/auth/signup', userData);
  },
  logout: async () => {
    return apiClient.post('/auth/logout');
  },
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },
};

export default authService;
