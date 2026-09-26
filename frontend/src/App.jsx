import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { TopicProvider } from './context/TopicContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <TopicProvider>
        <AppRoutes />
      </TopicProvider>
    </AuthProvider>
  );
}
