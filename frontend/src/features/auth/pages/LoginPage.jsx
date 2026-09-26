import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const handleLogin = (credentials) => {
    console.log('Login credentials:', credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to SPIS</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
