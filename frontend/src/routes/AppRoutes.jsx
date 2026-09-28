import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from './ProtectedRoute';

import DashboardPage from '../features/dashboard/pages/DashboardPage';
import TopicMonitoringPage from '../features/topic-monitoring/pages/TopicMonitoringPage';
import ContentAnalysisPage from '../features/content-analysis/pages/ContentAnalysisPage';
import NetworkAnalysisPage from '../features/network-analysis/pages/NetworkAnalysisPage';
import AlertsPredictionsPage from '../features/alerts-predictions/pages/AlertsPredictionsPage';
import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';
import SplashScreen from '../features/auth/pages/SplashScreen';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Initialization Route */}
        <Route path={ROUTES.SPLASH} element={<SplashScreen />} />

        {/* Public Authentication Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        {/* Protected Dashboard & Analytical Modules */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TOPIC_MONITORING}
          element={
            <ProtectedRoute>
              <TopicMonitoringPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CONTENT_ANALYSIS}
          element={
            <ProtectedRoute>
              <ContentAnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.NETWORK_ANALYSIS}
          element={
            <ProtectedRoute>
              <NetworkAnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ALERTS_PREDICTIONS}
          element={
            <ProtectedRoute>
              <AlertsPredictionsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
