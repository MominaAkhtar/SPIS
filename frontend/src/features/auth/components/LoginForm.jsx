import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Checkbox, Button } from '../../../components/common';
import GoogleButton from './GoogleButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../authService';
import { ROUTES } from '../../../constants/routes';
import { Lock, Mail, AlertTriangle } from 'lucide-react';

export default function LoginForm({ onSubmitSuccess }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Security: Brute-force protection lock
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    let timer;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const validate = () => {
    const newErrors = {};
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (lockoutTime > 0) {
      setGeneralError(`Too many failed attempts. Please wait ${lockoutTime}s.`);
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await authService.login({
        email,
        password,
        rememberMe,
      });

      if (response && response.user && response.token) {
        login(response.user, response.token, rememberMe);
        if (onSubmitSuccess) {
          onSubmitSuccess(response.user);
        } else {
          navigate(ROUTES.DASHBOARD);
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);

      if (attempts >= 5) {
        setLockoutTime(30);
        setGeneralError('Too many failed attempts. Account locked for 30 seconds for security.');
      } else {
        setGeneralError(err.message || 'Invalid email address or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setGeneralError('');
    try {
      const response = await authService.googleLogin();
      if (response && response.user && response.token) {
        login(response.user, response.token, false);
        if (onSubmitSuccess) {
          onSubmitSuccess(response.user);
        } else {
          navigate(ROUTES.DASHBOARD);
        }
      }
    } catch {
      setGeneralError('Google authentication encountered an issue. Please try again.');
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

        {/* Email Address */}
        <Input
          id="login-email"
          name="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
          }}
          placeholder="name@company.com"
          autoComplete="email"
          error={errors.email}
          disabled={loading || lockoutTime > 0}
          required
        />

        {/* Password */}
        <Input
          id="login-password"
          name="password"
          label="Password"
          labelRight={
            <button
              type="button"
              onClick={() => setForgotModalOpen(true)}
              className="text-[#00D284] hover:text-[#20E29B] font-medium transition-colors hover:underline"
            >
              Forgot password?
            </button>
          }
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
          }}
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password}
          disabled={loading || lockoutTime > 0}
          required
        />

        {/* Remember me checkbox */}
        <div className="pt-0.5">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onChange={setRememberMe}
            disabled={loading || lockoutTime > 0}
          >
            <span className="text-slate-400">Remember me for 30 days</span>
          </Checkbox>
        </div>

        {/* Sign In Primary Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={loading || lockoutTime > 0}
          className="w-full mt-2 font-bold py-2.5 shadow-md shadow-[#00D284]/20"
        >
          {lockoutTime > 0 ? `Locked (${lockoutTime}s)` : 'Sign In'}
        </Button>

        {/* Divider: OR CONTINUE WITH */}
        <div className="relative my-4 py-1 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#172338]" />
          </div>
          <div className="relative bg-[#0D1527] px-3">
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google SSO Button */}
        <GoogleButton
          onClick={handleGoogleSignIn}
          disabled={loading || lockoutTime > 0}
        />
      </form>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        defaultEmail={email}
      />
    </>
  );
}
