'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { Shield, Mail, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<'request' | 'reset'>('request');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      showToast('Validation Error', 'Please enter your registered email or phone', 'warning');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStage('reset');
      showToast('OTP Sent', 'A 4-digit reset code has been sent to your device', 'info');
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      showToast('Validation Error', 'Please enter your new password', 'warning');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Password Updated', 'You can now sign in with your new password', 'success');
      router.push('/auth/signin');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 coop-gradient-bg">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-3xl shadow-xl border border-border-gray overflow-hidden">
          <div className="h-2 bg-coop-green" />

          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-coop-green/15 text-coop-green flex items-center justify-center mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-neutral-dark">
                {stage === 'request' ? 'Password Recovery' : 'Create New Password'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-text mt-1">
                {stage === 'request'
                  ? 'Enter your phone or email to receive a secure recovery code'
                  : 'Enter the OTP and your new cooperative account password'}
              </p>
            </div>

            {stage === 'request' ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-dark mb-1.5">
                    Registered Mobile or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-gray focus:border-coop-green focus:ring-1 focus:ring-coop-green text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Sending Code...' : 'Send Recovery OTP'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-dark mb-1.5">
                    Verification OTP
                  </label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4-digit code"
                    className="w-full px-4 py-3 rounded-xl border border-border-gray focus:border-coop-green focus:ring-1 focus:ring-coop-green text-sm font-mono text-center tracking-widest text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-dark mb-1.5">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 rounded-xl border border-border-gray focus:border-coop-green focus:ring-1 focus:ring-coop-green text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Set New Password & Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="text-center pt-6 mt-6 border-t border-gray-100">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-coop-green hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
