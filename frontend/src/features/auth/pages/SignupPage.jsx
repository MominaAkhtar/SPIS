import React from 'react';
import AuthLayout from '../components/AuthLayout';
import SignupForm from '../components/SignupForm';
import { ROUTES } from '../../../constants/routes';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join the advanced intelligence platform"
      footerPrompt="Already have an account?"
      footerActionText="Sign in instead"
      footerActionTo={ROUTES.LOGIN}
      maxWidth="max-w-[480px]"
    >
      <SignupForm />
    </AuthLayout>
  );
}
