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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        {/* Dashboard and main feature views */}
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.TOPIC_MONITORING} element={<TopicMonitoringPage />} />
        <Route path={ROUTES.CONTENT_ANALYSIS} element={<ContentAnalysisPage />} />
        <Route path={ROUTES.NETWORK_ANALYSIS} element={<NetworkAnalysisPage />} />
        <Route path={ROUTES.ALERTS_PREDICTIONS} element={<AlertsPredictionsPage />} />

        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
