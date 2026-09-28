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
        changeText: '6% projected increase',
        isRising: true,
        sparkline: [52, 54, 58, 62, 67, 72, 78],
      },
      activeAlerts: {
        total: 5,
        critical: 4,
        warning: 1,
      },
      affectedCommunities: {
        total: 12,
        concentration: 'Large Risk Concentration',
        newDetected: 3,
      },
    };
  },

  /**
   * Fetch 14-day Polarization Trend Prediction dataset
   * Spans historical telemetry (May 08 - May 14) and AI forecast (May 14 - May 21).
   */
  getTrendPredictionData: async () => {
    try {
      const response = await apiClient.get('/predictions/trend');
      if (response && response.data) return response.data;
    } catch {
      // Fallback dataset
    }

    return [
      { date: 'May 08', actual: 48, predicted: null },
      { date: 'May 09', actual: 52, predicted: null },
      { date: 'May 10', actual: 50, predicted: null },
      { date: 'May 11', actual: 57, predicted: null },
      { date: 'May 12', actual: 61, predicted: null },
      { date: 'May 13', actual: 68, predicted: null },
      { date: 'May 14', actual: 72, predicted: 72 }, // Overlap junction
      { date: 'May 15', actual: null, predicted: 74 },
      { date: 'May 16', actual: null, predicted: 76 },
      { date: 'May 17', actual: null, predicted: 75 },
      { date: 'May 18', actual: null, predicted: 78 },
      { date: 'May 19', actual: null, predicted: 80 },
      { date: 'May 20', actual: null, predicted: 81 },
      { date: 'May 21', actual: null, predicted: 83 },
    ];
  },

  /**
   * Fetch recent high-priority risk alerts
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
        badge: 'HIGH',
        level: 'high',
        metadata: 'Community A & B • Topic: Elections',
        time: '2h ago',
      },
      {
        id: 'alt-2',
        title: 'Rising Polarization Trend',
        badge: 'WARNING',
        level: 'warning',
        metadata: 'Government Policies • Velocity: +45%',
        time: '5h ago',
      },
      {
        id: 'alt-3',
        title: 'Echo Chamber Formation',
        badge: 'CRITICAL',
        level: 'critical',
        metadata: 'Community C • Isolation: 0.88',
        time: '1d ago',
      },
    ];
  },

  /**
   * Fetch ranked risky discourse topics
   */
  getRiskyTopics: async () => {
    try {
      const response = await apiClient.get('/predictions/risky-topics');
      if (response && response.data) return response.data;
    } catch {
      // Fallback
    }

    return [
      { id: 1, rank: 1, label: 'Polarization Discourse', value: 88, color: 'from-rose-500 to-orange-500' },
      { id: 2, rank: 2, label: 'Political Corruption', value: 72, color: 'from-orange-500 to-amber-500' },
      { id: 3, rank: 3, label: 'Social Inequality', value: 65, color: 'from-cyan-500 to-blue-500' },
      { id: 4, rank: 4, label: 'Immigration Debate', value: 48, color: 'from-[#00D284] to-teal-500' },
    ];
  },
};

export default alertsService;
