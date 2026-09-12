'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Shield, Wrench, Home, Building2, CheckCircle, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';
import { UserRole } from '@/types';

function SignUpContent() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'worker';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  
  // Step 2 Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [address, setAddress] = useState('');
  
  // Worker specific
  const [trade, setTrade] = useState('Electrical');
  const [experienceLevel, setExperienceLevel] = useState('3-5yr');
  
  // Business specific
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('10-50');

  // Step 3 OTP
  const [otp, setOtp] = useState(['4', '8', '2', '9']);
  const [isVerifying, setIsVerifying] = useState(false);

  const { signup } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('role')) {
      setSelectedRole(searchParams.get('role') as UserRole);
    }
  }, [searchParams]);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!fullName && !companyName) {
        showToast('Required Field', 'Please provide your full name or company name', 'warning');
        return;
      }
      if (!phone) {
        showToast('Required Field', 'Please provide a valid phone number', 'warning');
        return;
      }
      setStep(3);
    }
  };

  const handleVerifyAndComplete = async () => {
    setIsVerifying(true);
    try {
      await signup({
        fullName: selectedRole === 'business' ? companyName : fullName,
        email: email || `${phone.replace(/\D/g, '')}@sahayakseva.org`,
        phone,
        role: selectedRole,
        city,
        address,
      });

      showToast('Registration Complete!', 'Welcome to the Sahayak Seva Cooperative', 'success');
      router.push('/dashboard');
    } catch (e) {
      showToast('Error', 'Unable to complete verification', 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-[480px]">
      <div className="bg-white rounded-3xl shadow-xl border border-border-gray overflow-hidden">
        {/* Header Progress Bar */}
        <div className="h-2 bg-gray-100 flex">
          <div 
            className="bg-coop-green transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-8 sm:p-10">
          {/* Top Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coop-green text-white flex items-center justify-center font-bold text-xs">
                {step}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-dark">
                Step {step} of 3
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              {step === 1 && 'Choose Membership'}
              {step === 2 && 'Personal Details'}
              {step === 3 && 'Verification'}
            </span>
          </div>

          {/* STEP 1: Choose Role */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-neutral-dark">
                  How do you want to join?
                </h1>
                <p className="text-xs sm:text-sm text-gray-text mt-1">
                  Select your membership category in the cooperative
                </p>
              </div>

              <div className="space-y-3">
                {/* Worker Card (Green) */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('worker')}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                    selectedRole === 'worker'
                      ? 'border-coop-green bg-coop-green/5 ring-1 ring-coop-green shadow-sm'
                      : 'border-border-gray hover:border-gray-300'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-coop-green/15 text-coop-green flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-base text-neutral-dark">
                        I&apos;m a Worker
                      </span>
                      {selectedRole === 'worker' && <CheckCircle className="w-5 h-5 text-coop-green" />}
                    </div>
                    <p className="text-xs text-gray-text mt-1 leading-relaxed">
                      Earn 80% direct net wages, get union accident cover, and vote on hourly minimum rates.
                    </p>
                  </div>
                </button>

                {/* Customer Card (Blue) */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('customer')}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                    selectedRole === 'customer'
                      ? 'border-card-blue bg-card-blue/5 ring-1 ring-card-blue shadow-sm'
                      : 'border-border-gray hover:border-gray-300'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-card-blue/15 text-card-blue flex items-center justify-center shrink-0">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-base text-neutral-dark">
                        I Need Services
                      </span>
                      {selectedRole === 'customer' && <CheckCircle className="w-5 h-5 text-card-blue" />}
                    </div>
                    <p className="text-xs text-gray-text mt-1 leading-relaxed">
                      Hire background-verified master tradespeople with a 48-hour satisfaction warranty.
                    </p>
                  </div>
                </button>

                {/* Business Card (Purple) */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('business')}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                    selectedRole === 'business'
                      ? 'border-card-purple bg-card-purple/5 ring-1 ring-card-purple shadow-sm'
                      : 'border-border-gray hover:border-gray-300'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-card-purple/15 text-card-purple flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-base text-neutral-dark">
                        I&apos;m a Business
                      </span>
                      {selectedRole === 'business' && <CheckCircle className="w-5 h-5 text-card-purple" />}
                    </div>
                    <p className="text-xs text-gray-text mt-1 leading-relaxed">
                      Contract synchronized multi-worker crews for commercial maintenance with GST billing.
                    </p>
                  </div>
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Basic Info (Role-Specific) */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-heading font-extrabold text-2xl text-neutral-dark">
                  {selectedRole === 'worker' && 'Worker Guild Registration'}
                  {selectedRole === 'customer' && 'Customer Profile Details'}
                  {selectedRole === 'business' && 'Enterprise Account Setup'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-text mt-1">
                  Provide your contact info to link with your local cooperative chapter.
                </p>
              </div>

              {selectedRole === 'business' ? (
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Tech Facilities Pvt Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sunita Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">City / Zone</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
                  >
                    <option value="New Delhi">New Delhi</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>
              </div>

              {/* Worker Specific Fields */}
              {selectedRole === 'worker' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Primary Trade</label>
                    <select
                      value={trade}
                      onChange={(e) => setTrade(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
                    >
                      <option value="Electrical">Master Electrician</option>
                      <option value="Plumbing">Sanitary & Plumbing</option>
                      <option value="Cleaning">Deep Cleaning Specialist</option>
                      <option value="Healthcare">Senior Care & Nursing</option>
                      <option value="Carpentry">Heritage Carpentry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Experience Level</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
                    >
                      <option value="0-1yr">0-1 Year (Apprentice)</option>
                      <option value="1-3yr">1-3 Years (Journeyman)</option>
                      <option value="3-5yr">3-5 Years (Specialist)</option>
                      <option value="5+yr">5+ Years (Master Guild)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Customer Specific Fields */}
              {selectedRole === 'customer' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Service Address / Society</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14, Golf Links, New Delhi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                  />
                </div>
              )}

              {/* Business Specific Fields */}
              {selectedRole === 'business' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Facility Team Size Needed</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
                  >
                    <option value="1-10">1-10 Crew Members</option>
                    <option value="10-50">10-50 Crew Members</option>
                    <option value="50+">50+ Enterprise Maintenance</option>
                  </select>
                </div>
              )}

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl border border-border-gray hover:bg-gray-100 text-sm font-semibold text-neutral-dark flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Proceed to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Verify OTP */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-coop-green/15 text-coop-green flex items-center justify-center mx-auto">
                <KeyRound className="w-8 h-8" />
              </div>

              <div>
                <h2 className="font-heading font-extrabold text-2xl text-neutral-dark">
                  Instant OTP Verification
                </h2>
                <p className="text-xs sm:text-sm text-gray-text mt-1">
                  We sent a 4-digit verification code to <span className="font-semibold text-neutral-dark">{phone || '+91 98765 43210'}</span>
                </p>
              </div>

              {/* 4 OTP Boxes */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-14 text-center font-mono font-bold text-2xl rounded-xl border-2 border-sage-green focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                  />
                ))}
              </div>

              <div className="text-xs text-gray-text">
                Didn&apos;t receive code?{' '}
                <button type="button" className="font-bold text-coop-green hover:underline">
                  Resend OTP
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3.5 px-4 rounded-xl border border-border-gray hover:bg-gray-100 text-sm font-semibold text-neutral-dark flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleVerifyAndComplete}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
                >
                  {isVerifying ? 'Activating Membership...' : 'Verify & Enter Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Link to Sign In */}
          <div className="text-center pt-6 mt-6 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-text">
              Already registered with Sahayak Seva?{' '}
              <Link
                href="/auth/signin"
                className="font-bold text-coop-green hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 coop-gradient-bg">
      <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-coop-green">Loading registration portal...</div>}>
        <SignUpContent />
      </Suspense>
    </div>
  );
}
