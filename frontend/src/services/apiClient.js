import { ENV } from '../config/env';

export const apiClient = {
  baseUrl: ENV.API_BASE_URL,

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
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
