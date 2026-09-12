'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { WORKER_APPEALS_DATA, WORKERS_DATA } from '@/lib/data';
import WageDistributionPie from './WageDistributionPie';
import DemandHeatMap from './DemandHeatMap';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  Smile, 
  Activity, 
  Scale, 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  FileText,
  Vote,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [appeals, setAppeals] = useState(WORKER_APPEALS_DATA);

  const handleArbitrationVote = (appealId: string, action: 'approve' | 'reject') => {
    setAppeals((prev) =>
      prev.map((app) => {
        if (app.id === appealId) {
          const newStatus = action === 'approve' ? ('overturned' as const) : ('resolved' as const);
          return {
            ...app,
            status: newStatus,
            resolutionNote: action === 'approve'
              ? 'Arbitration tribunal voted 15-0 to invalidate unfair penalty and clear worker record.'
              : 'Arbitration tribunal upheld initial assessment after evidence review.',
            juryVotes: {
              ...app.juryVotes,
              [action]: app.juryVotes[action] + 1,
            },
          };
        }
        return app;
      })
    );

    showToast(
      'Ballot Cast',
      action === 'approve'
        ? 'Voted to overturn penalty and exonerate worker'
        : 'Voted to sustain initial decision',
      'success'
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-green via-coop-green to-soft-teal text-white rounded-3xl p-6 sm:p-8 shadow-coop flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sage-green text-xs font-semibold uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4 text-sage-green" />
            Federation Secretariat Governance Panel
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Cooperative Federation Panel
          </h1>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            Logged in as {user?.fullName || 'Priya Patel (Federation Secretary)'} • Auditing 500+ chapters.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex items-center gap-6 self-start md:self-auto">
          <div>
            <p className="text-xs text-sage-green font-semibold uppercase tracking-wider">Total GMV (Month)</p>
            <p className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              ₹1.42 Cr
            </p>
            <p className="text-[11px] text-sage-green mt-0.5">80% direct to workers</p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div>
            <p className="text-xs text-sage-green font-semibold uppercase tracking-wider">Active Workers</p>
            <p className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              12,450
            </p>
            <p className="text-[11px] text-white/70 mt-0.5">500+ Guilds</p>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-gray-400">Total GMV Settled</span>
            <div className="p-2 rounded-xl bg-coop-green/15 text-coop-green">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-neutral-dark">₹1,42,80,000</p>
          <p className="text-[11px] text-coop-green font-semibold mt-1">₹1.14 Cr disbursed directly</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-gray-400">Active Guild Members</span>
            <div className="p-2 rounded-xl bg-card-blue/15 text-card-blue">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-neutral-dark">12,450</p>
          <p className="text-[11px] text-card-blue font-semibold mt-1">94% active in past 7 days</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-gray-400">Satisfaction Score</span>
            <div className="p-2 rounded-xl bg-warning/15 text-warning">
              <Smile className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-neutral-dark">98.4%</p>
          <p className="text-[11px] text-warning font-semibold mt-1">Based on 18,240 vouches</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-gray-400">Worker Utilization</span>
            <div className="p-2 rounded-xl bg-soft-teal/15 text-soft-teal">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl text-neutral-dark">84.2%</p>
          <p className="text-[11px] text-soft-teal font-semibold mt-1">Optimal batch routing active</p>
        </div>
      </div>

      {/* Main Governance Content: Earnings Distribution Pie & Demand Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (6 cols): 80/5/10/5 Pie Chart */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-border-gray shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-lg text-neutral-dark">
                Cooperative Revenue Distribution
              </h3>
              <span className="text-xs font-bold text-coop-green bg-sage-green/20 px-2.5 py-0.5 rounded-full">
                100% Audited
              </span>
            </div>
            <p className="text-xs text-gray-text">
              Cryptographically verified allocations under the Multi-State Cooperative Bylaws.
            </p>
          </div>

          <WageDistributionPie />

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs">
            <div className="p-3 bg-light-gray rounded-xl">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Worker Direct Share</span>
              <span className="font-mono font-bold text-coop-green text-sm">₹1,14,24,000 (80%)</span>
            </div>
            <div className="p-3 bg-light-gray rounded-xl">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Health & Accident Pool</span>
              <span className="font-mono font-bold text-soft-teal text-sm">₹7,14,000 (5%)</span>
            </div>
          </div>
        </div>

        {/* Right (6 cols): Demand Heatmap */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-border-gray shadow-card">
          <DemandHeatMap />
        </div>

      </div>

      {/* Pending Worker Algorithmic Appeals Queue */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-border-gray shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-card-purple" />
              <h3 className="font-heading font-bold text-lg text-neutral-dark">
                Pending Algorithmic Appeals Queue (Peer Arbitration)
              </h3>
            </div>
            <p className="text-xs text-gray-text mt-0.5">
              Democratic tribunal to adjudicate algorithmic penalties and vindictive ratings
            </p>
          </div>
          <span className="text-xs font-bold text-card-purple bg-card-purple/10 px-3 py-1 rounded-full self-start sm:self-auto">
            {appeals.filter(a => a.status === 'under_jury_review').length} Case(s) Under Active Ballot
          </span>
        </div>

        <div className="space-y-4">
          {appeals.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl border border-border-gray bg-light-gray space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={app.workerPhoto}
                    alt={app.workerName}
                    className="w-12 h-12 rounded-xl object-cover border border-sage-green shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-sm text-neutral-dark">
                        {app.workerName}
                      </span>
                      <span className="text-xs text-gray-500">({app.workerTrade})</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        app.status === 'overturned'
                          ? 'bg-success/15 text-success'
                          : app.status === 'under_jury_review'
                          ? 'bg-card-purple/15 text-card-purple'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {app.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="font-semibold text-xs text-neutral-dark mt-1">
                      {app.title}
                    </p>
                    <p className="text-xs text-gray-text mt-1 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 block">Jury Votes Cast</span>
                  <span className="font-mono font-bold text-xs text-coop-green">
                    {app.juryVotes.approve} Approve / {app.juryVotes.reject} Reject
                  </span>
                </div>
              </div>

              {app.resolutionNote && (
                <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-coop-green shrink-0 mt-0.5" />
                  <p><strong className="text-neutral-dark">Tribunal Resolution:</strong> {app.resolutionNote}</p>
                </div>
              )}

              {app.status === 'under_jury_review' && (
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => handleArbitrationVote(app.id, 'reject')}
                    className="px-3.5 py-1.5 rounded-xl border border-border-gray hover:bg-red-50 text-xs font-semibold text-red-600 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reject Appeal
                  </button>
                  <button
                    onClick={() => handleArbitrationVote(app.id, 'approve')}
                    className="px-4 py-1.5 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Overturn & Clear Record
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Escalations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center gap-2 mb-2 text-coop-green font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            Worker Verification
          </div>
          <p className="font-extrabold text-2xl text-neutral-dark">99.2%</p>
          <p className="text-xs text-gray-text mt-1">12,350 Tier-3 Police & NSDC Certified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center gap-2 mb-2 text-soft-teal font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            Insurance Premium
          </div>
          <p className="font-extrabold text-2xl text-neutral-dark">100% Active</p>
          <p className="text-xs text-gray-text mt-1">₹5 Lakh accident & cashless hospital cover</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border-gray shadow-card">
          <div className="flex items-center gap-2 mb-2 text-warning font-bold text-xs uppercase">
            <AlertTriangle className="w-4 h-4" />
            Flagged Safety Incidents
          </div>
          <p className="font-extrabold text-2xl text-neutral-dark">0 Active</p>
          <p className="text-xs text-gray-text mt-1">All 3 monthly disputes resolved by tribunal</p>
        </div>
      </div>

    </div>
  );
}
