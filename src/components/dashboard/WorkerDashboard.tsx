'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { BOOKINGS_DATA, COLLECTIVE_BARGAINING_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import EarningsChart from './EarningsChart';
import WageTransparencyLedger from './WageTransparencyLedger';
import DemandHeatMap from './DemandHeatMap';
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Users, 
  Scale, 
  Vote, 
  Check, 
  X, 
  DollarSign, 
  ArrowRight,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [hasVoted, setHasVoted] = useState(false);
  const [agreedCount, setAgreedCount] = useState(COLLECTIVE_BARGAINING_DATA.workersAgreed);
  const [showHeatMapModal, setShowHeatMapModal] = useState(false);

  // Filter pending invitations
  const [jobInvitations, setJobInvitations] = useState(
    BOOKINGS_DATA.filter((b) => b.workerId === 'wrk-01' || b.status === 'pending')
  );

  const handleAcceptJob = (jobId: string, title: string) => {
    setJobInvitations((prev) => prev.filter((j) => j.id !== jobId));
    showToast('Job Accepted', `You have accepted ${title}. Client has been notified.`, 'success');
  };

  const handleDeclineJob = (jobId: string) => {
    setJobInvitations((prev) => prev.filter((j) => j.id !== jobId));
    showToast('Job Declined', 'Offer returned to cooperative guild pool with zero penalty', 'info');
  };

  const handleBargainingVote = () => {
    if (hasVoted) return;
    setHasVoted(true);
    setAgreedCount((c) => c + 1);
    showToast('Democratic Vote Recorded', 'Your ballot to ratify the ₹620/hr minimum rate has been encrypted and counted.', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-green to-coop-green text-white rounded-3xl p-6 sm:p-8 shadow-coop flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sage-green text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-sage-green" />
            Tier-3 Verified Guild Master
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Welcome back, {user?.fullName || 'Sunita Sharma'}!
          </h1>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            South Delhi Skilled Electricians Guild (Cooperative Chapter #104). Your schedule is synchronized.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex items-center gap-5 self-start md:self-auto">
          <div>
            <p className="text-xs text-sage-green font-semibold uppercase tracking-wider">Earnings This Month</p>
            <p className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              ₹48,650
            </p>
            <p className="text-[11px] text-sage-green flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.4% vs last month
            </p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div>
            <p className="text-xs text-sage-green font-semibold uppercase tracking-wider">Trust Score</p>
            <p className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              4.94 ★
            </p>
            <p className="text-[11px] text-white/70 mt-0.5">142 vouches</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setShowHeatMapModal(!showHeatMapModal)}
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-warning/15 text-warning flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Demand Heatmap</p>
            <p className="text-[11px] text-gray-text">+15% Surge zones</p>
          </div>
        </button>

        <Link
          href="/appeal"
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-card-purple/15 text-card-purple flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Pending Appeals</p>
            <p className="text-[11px] text-gray-text">Peer jury status</p>
          </div>
        </Link>

        <Link
          href="/earnings"
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-coop-green/15 text-coop-green flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Earnings Ledger</p>
            <p className="text-[11px] text-gray-text">80% breakdown</p>
          </div>
        </Link>

        <Link
          href="/profile"
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-card-blue/15 text-card-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Edit Profile</p>
            <p className="text-[11px] text-gray-text">Licenses & trades</p>
          </div>
        </Link>
      </div>

      {/* Heatmap Toggle Display if opened */}
      {showHeatMapModal && (
        <div className="p-6 bg-white rounded-3xl border border-border-gray shadow-card">
          <DemandHeatMap />
        </div>
      )}

      {/* Main Grid: Earnings Summary & Next Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Earnings Summary Card & Chart */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border-gray shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Direct Net Earned</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-coop-green">
                    ₹48,650
                  </span>
                  <span className="text-xs font-bold text-forest-green bg-sage-green/20 px-2 py-0.5 rounded-full">
                    +18% this month
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-text">
                <span className="w-3 h-3 rounded-full bg-coop-green" />
                <span>30-Day Daily Net Payout Curve</span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <EarningsChart />
          </div>

          {/* Wage Transparency Ledger Component */}
          <WageTransparencyLedger limit={4} />
        </div>

        {/* Right Column (4 cols): Next Jobs, Badges, Collective Bargaining */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Collective Bargaining Status Card */}
          <div className="bg-gradient-to-br from-forest-green to-coop-green text-white p-6 rounded-3xl shadow-coop relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white flex items-center gap-1">
                <Vote className="w-3.5 h-3.5" />
                Active Ballot
              </span>
              <span className="text-xs text-sage-green font-semibold">
                {COLLECTIVE_BARGAINING_DATA.votingDaysRemaining} days left
              </span>
            </div>

            <h3 className="font-heading font-bold text-lg text-white mb-1">
              Minimum Rate Revision
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Electrical Trade Guild proposal to elevate baseline rate from <strong className="text-white">₹550/hr</strong> to <strong className="text-white">₹620/hr</strong> to counter inflation.
            </p>

            {/* Vote Progress Bar */}
            <div className="space-y-1.5 mb-5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Workers Agreed:</span>
                <span className="font-mono">{agreedCount} / {COLLECTIVE_BARGAINING_DATA.totalEligibleWorkers}</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sage-green transition-all duration-500 rounded-full"
                  style={{ width: `${(agreedCount / COLLECTIVE_BARGAINING_DATA.totalEligibleWorkers) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleBargainingVote}
              disabled={hasVoted}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                hasVoted
                  ? 'bg-white/20 text-white cursor-default'
                  : 'bg-white text-forest-green hover:bg-sage-green'
              }`}
            >
              {hasVoted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-sage-green" />
                  Voted to Ratify ₹620/hr
                </>
              ) : (
                <>
                  <Vote className="w-4 h-4" />
                  Vote to Ratify ₹620/hr Minimum
                </>
              )}
            </button>
          </div>

          {/* Next Jobs / New Invitations Card List */}
          <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-base text-neutral-dark">
                Available Guild Jobs ({jobInvitations.length})
              </h3>
              <Link href="/bookings" className="text-xs font-bold text-coop-green hover:underline">
                View All
              </Link>
            </div>

            {jobInvitations.length === 0 ? (
              <p className="text-xs text-gray-text text-center py-6">
                All invitations resolved. Stand by for neighborhood dispatches.
              </p>
            ) : (
              <div className="space-y-3">
                {jobInvitations.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-2xl border border-border-gray hover:border-coop-green transition-all bg-light-gray flex flex-col gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-coop-green">
                        {job.serviceCategory}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-neutral-dark">
                        {job.serviceTitle}
                      </h4>
                      <p className="text-xs text-gray-text flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="line-clamp-1">{job.location}</span>
                      </p>
                      <p className="text-xs text-gray-text flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{job.scheduledDate} at {job.scheduledTime}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase">Gross Fee</span>
                        <p className="font-mono font-bold text-sm text-neutral-dark">
                          {formatINR(job.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDeclineJob(job.id)}
                          className="p-2 rounded-lg border border-border-gray hover:bg-gray-200 text-gray-500 transition-colors"
                          title="Decline without strike"
                          aria-label="Decline job"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAcceptJob(job.id, job.serviceTitle)}
                          className="px-3 py-1.5 rounded-lg bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                          aria-label="Accept job"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safety Badges & Certifications Card */}
          <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card space-y-4">
            <h3 className="font-heading font-bold text-base text-neutral-dark">
              Safety Credentials & Vouches
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-light-gray border border-border-gray">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-coop-green" />
                  <div>
                    <p className="font-bold text-neutral-dark">Verification Tier 3</p>
                    <p className="text-gray-400 text-[11px]">Police & Aadhaar biometric certified</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-coop-green bg-sage-green/25 px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-light-gray border border-border-gray">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-card-purple" />
                  <div>
                    <p className="font-bold text-neutral-dark">NSDC Master License</p>
                    <p className="text-gray-400 text-[11px]">Class A Wireman Supervisor</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-card-purple bg-card-purple/10 px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-light-gray border border-border-gray">
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-soft-teal" />
                  <div>
                    <p className="font-bold text-neutral-dark">Community Vouches</p>
                    <p className="text-gray-400 text-[11px]">142 fellow guild endorsements</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-soft-teal">
                  142
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
