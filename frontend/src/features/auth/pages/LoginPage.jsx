import React from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';
import { ROUTES } from '../../../constants/routes';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your details to sign in."
      footerPrompt="Don't have an account?"
      footerActionText="Create an account"
      footerActionTo={ROUTES.SIGNUP}
      maxWidth="max-w-[440px]"
    >
      <LoginForm />
    </AuthLayout>
  );
}
