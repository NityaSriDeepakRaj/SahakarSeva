'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';

export default function SignInPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      showToast('Validation Error', 'Please enter your email or phone number', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(identifier, password);
      if (success) {
        showToast('Welcome Back!', 'Signed into your cooperative account', 'success');
        router.push('/dashboard');
      }
    } catch (err) {
      showToast('Login Failed', 'Please verify your credentials', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 coop-gradient-bg">
      <div className="w-full max-w-[440px]">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-border-gray overflow-hidden">
          
          {/* Top Sage Green Accent Line */}
          <div className="h-2.5 bg-gradient-to-r from-coop-green via-soft-teal to-sage-green" />

          <div className="p-8 sm:p-10">
            {/* Logo at Top */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-coop-green flex items-center justify-center text-white shadow-coop mb-3">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-neutral-dark">
                Welcome to Sahakar Seva
              </h1>
              <p className="text-xs sm:text-sm text-gray-text mt-1">
                Access your cooperative dashboard & transparent ledger
              </p>
            </div>

            {/* Quick 1-Click Demo Login Helper */}
            <div className="mb-6 p-3 bg-light-gray border border-sage-green/30 rounded-2xl">
              <p className="text-[11px] font-bold text-forest-green uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-coop-green" />
                Quick 1-Click Demo Presets:
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => loginAsDemo('worker')}
                  className="px-2 py-1.5 rounded-lg bg-white border border-border-gray hover:border-coop-green hover:bg-sage-green/10 text-xs font-semibold text-forest-green text-center transition-all shadow-xs"
                >
                  ⚡ Worker
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo('customer')}
                  className="px-2 py-1.5 rounded-lg bg-white border border-border-gray hover:border-coop-green hover:bg-sage-green/10 text-xs font-semibold text-neutral-dark text-center transition-all shadow-xs"
                >
                  🏡 Customer
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo('admin')}
                  className="px-2 py-1.5 rounded-lg bg-white border border-border-gray hover:border-coop-green hover:bg-sage-green/10 text-xs font-semibold text-neutral-dark text-center transition-all shadow-xs"
                >
                  ⚖️ Admin
                </button>
              </div>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400 font-semibold">Or sign in with credentials</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-dark mb-1.5">
                  Email Address or Mobile Number
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
                    placeholder="e.g. sunita@sahakarseva.org or 9876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-gray focus:border-coop-green focus:ring-1 focus:ring-coop-green text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-dark">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-semibold text-coop-green hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-gray focus:border-coop-green focus:ring-1 focus:ring-coop-green text-sm transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop hover:shadow-coop-lg transition-all text-sm disabled:opacity-50"
                >
                  {isLoading ? 'Signing In...' : 'Sign In to Account'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Bottom Link to Sign Up */}
            <div className="text-center pt-6 mt-6 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-text">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="font-bold text-coop-green hover:underline"
                >
                  Join Sahakar Seva
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
