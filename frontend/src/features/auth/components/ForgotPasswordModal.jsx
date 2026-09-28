import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose, defaultEmail = '' }) {
  const [email, setEmail] = useState(defaultEmail);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please provide your registered email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email format.');
      return;
    }

    setLoading(true);
    // Simulate secure reset token dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Reset Password"
      subtitle="Enter your email to receive recovery instructions."
      maxWidth="max-w-md"
    >
      {submitted ? (
        <div className="py-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#00D284]/10 text-[#00D284] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-white">
            Recovery Link Dispatched
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            If an account exists for <span className="text-slate-200 font-medium">{email}</span>, a secure password reset link has been dispatched to that address.
          </p>
          <div className="pt-3">
            <Button variant="secondary" onClick={handleClose} className="w-full">
              Back to Sign In
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            error={error}
            autoComplete="email"
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button variant="ghost" onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={loading}>
              Send Recovery Email
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
