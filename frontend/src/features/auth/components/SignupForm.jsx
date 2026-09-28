import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Checkbox, Button } from '../../../components/common';
import TermsModal from './TermsModal';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../authService';
import { ROUTES } from '../../../constants/routes';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SignupForm({ onSubmitSuccess }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = 'Please provide a valid corporate email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms & privacy policy to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await authService.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response && response.user && response.token) {
        // Authenticate new user into session
        login(response.user, response.token, true);
        if (onSubmitSuccess) {
          onSubmitSuccess(response.user);
        } else {
          navigate(ROUTES.DASHBOARD);
        }
      } else {
        throw new Error('Failed to register account.');
      }
    } catch (err) {
      setGeneralError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {generalError && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-2 gap-3.5">
          <Input
            id="signup-first-name"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
            autoComplete="given-name"
            error={errors.firstName}
            disabled={loading}
            required
          />

          <Input
            id="signup-last-name"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
            autoComplete="family-name"
            error={errors.lastName}
            disabled={loading}
            required
          />
        </div>

        {/* Row 2: Work Email */}
        <Input
          id="signup-email"
          name="email"
          label="Work Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@organization.com"
          autoComplete="email"
          error={errors.email}
          disabled={loading}
          required
        />

        {/* Row 3: Password & Confirm Password */}
        <div className="grid grid-cols-2 gap-3.5">
          <Input
            id="signup-password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.password}
            disabled={loading}
            required
          />

          <Input
            id="signup-confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword}
            disabled={loading}
            required
          />
        </div>

        {/* Terms of Service & Privacy Policy Checkbox */}
        <div className="pt-1">
          <Checkbox
            id="agree-terms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={(checked) => handleChange('agreeTerms', checked)}
            disabled={loading}
            error={errors.agreeTerms}
          >
            <span className="text-slate-400">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setTermsModalOpen(true)}
                className="bg-transparent border-0 p-0 inline cursor-pointer text-[#00D284] hover:text-[#20E29B] font-medium underline underline-offset-2 hover:underline focus:outline-none"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => setTermsModalOpen(true)}
                className="bg-transparent border-0 p-0 inline cursor-pointer text-[#00D284] hover:text-[#20E29B] font-medium underline underline-offset-2 hover:underline focus:outline-none"
              >
                Privacy Policy
              </button>
            </span>
          </Checkbox>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={loading}
          className="w-full mt-3 font-bold py-2.5 shadow-md shadow-[#00D284]/20"
        >
          Create Account
        </Button>
      </form>

      {/* Governance & Privacy Modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </>
  );
}
