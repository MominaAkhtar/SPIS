import React from 'react';
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  const handleSignup = (userData) => {
    console.log('Signup data:', userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your Account</h2>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
}
