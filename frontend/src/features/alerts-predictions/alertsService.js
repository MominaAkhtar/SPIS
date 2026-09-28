import apiClient from '../../services/apiClient';

/**
 * SPIS Alerts & Predictions Data Service
 * Provides telemetry for polarization anomalies, forecasting trends, and risk metrics.
 */
export const alertsService = {
  /**
   * Fetch top-level polarization KPI statistics
   */
  getAlertsSummary: async () => {
    try {
      const response = await apiClient.get('/alerts/summary');
      if (response && response.data) return response.data;
    } catch {
      // Fallback telemetry
    }

    return {
      currentPolarization: {
        score: 72,
        max: 100,
        level: 'HIGH',
        changeText: '18% from last week',
        isRising: true,
      },
      predictionNext7Days: {
        score: 78,
        level: 'HIGH RISK',
        changeText: '12% from last week',
        isRising: true,
        sparkline: [52, 56, 54, 62, 68, 73, 78],
      },
      activeAlerts: {
        total: 5,
        critical: 2,
        warning: 3,
      },
      affectedCommunities: {
        total: 12,
        concentration: 'High Risk Communities',
        newDetected: 3,
        changeText: '3 new this week',
      },
    };
  },

  /**
   * Fetch 14-day Polarization Trend Prediction dataset
   * Spans historical telemetry (May 15 - May 21) and AI forecast (May 21 - May 28).
   */
  getTrendPredictionData: async () => {
    try {
      const response = await apiClient.get('/predictions/trend');
      if (response && response.data) return response.data;
    } catch {
      // Fallback dataset
    }

    return [
      { date: 'May 15', actual: 52, predicted: null },
      { date: 'May 16', actual: 58, predicted: null },
      { date: 'May 17', actual: 65, predicted: null },
      { date: 'May 18', actual: 62, predicted: null },
      { date: 'May 19', actual: 68, predicted: null },
      { date: 'May 20', actual: 70, predicted: null },
      { date: 'May 21', actual: 72, predicted: 72 },
      { date: 'May 22', actual: null, predicted: 75 },
      { date: 'May 23', actual: null, predicted: 78 },
      { date: 'May 24', actual: null, predicted: 82 },
      { date: 'May 25', actual: null, predicted: 85 },
      { date: 'May 26', actual: null, predicted: 88 },
      { date: 'May 27', actual: null, predicted: 92 },
      { date: 'May 28', actual: null, predicted: 95 },
    ];
  },

  /**
   * Fetch recent high-priority risk alerts matching Figma screen
   */
  getRecentAlerts: async () => {
    try {
      const response = await apiClient.get('/alerts/recent');
      if (response && response.data) return response.data;
    } catch {
      // Fallback
    }

    return [
      {
        id: 'alt-1',
        title: 'High Polarization Detected',
        badge: 'CRITICAL',
        level: 'critical',
        metadata: 'Category: Politics  •  Region: Pakistan',
        time: '2h ago',
      },
      {
        id: 'alt-2',
        title: 'Rising Polarization Trend',
        badge: 'WARNING',
        level: 'warning',
        metadata: 'Category: Religion  •  Region: Global',
        time: '5h ago',
      },
      {
        id: 'alt-3',
        title: 'Echo Chamber Formation',
        badge: 'CRITICAL',
        level: 'critical',
        metadata: 'Category: Politics  •  Community: Group A',
        time: '1d ago',
      },
    ];
  },

  /**
   * Fetch ranked risky discourse topics matching Figma screen
   */
  getRiskyTopics: async () => {
    try {
      const response = await apiClient.get('/predictions/risky-topics');
      if (response && response.data) return response.data;
    } catch {
      // Fallback
    }

    return [
      { id: 1, rank: 1, label: 'Political Extremism', value: 89, color: '#EF5350' },
      { id: 2, rank: 2, label: 'Religious Conflicts', value: 72, color: '#FB923C' },
      { id: 3, rank: 3, label: 'Social Inequality', value: 65, color: '#00BFA5' },
      { id: 4, rank: 4, label: 'Immigration Debate', value: 48, color: '#00BFA5' },
    ];
  },
};

export default alertsService;