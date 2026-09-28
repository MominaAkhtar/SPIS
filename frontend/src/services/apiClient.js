import { ENV } from '../config/env';

export const apiClient = {
  baseUrl: ENV.API_BASE_URL,

  async request(endpoint, options = {}) {
    const token =
      localStorage.getItem('spis_token') || sessionStorage.getItem('spis_token');

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        // Fallback to response.statusText
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  get(endpoint, options) {
    return this.request(endpoint, { method: 'GET', ...options });
  },

  post(endpoint, body, options) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  },

  delete(endpoint, options) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  },
};

export default apiClient;
