import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-4">SPIS</h1>
      <p className="text-slate-400 mb-8">Social Platform Intelligence System</p>
      <LoadingSpinner size="lg" />
    </div>
  );
}
