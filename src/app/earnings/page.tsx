'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { WAGE_LEDGER_DATA } from '@/lib/data';
import { formatINR, formatDate } from '@/lib/utils';
import WageTransparencyLedger from '@/components/dashboard/WageTransparencyLedger';
import EarningsChart from '@/components/dashboard/EarningsChart';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  HeartHandshake, 
  Building2, 
  Download, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function EarningsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleDownloadTaxStatement = () => {
    showToast('Statement Downloaded', 'Annual Cooperative Earnings & TDS Statement saved.', 'success');
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
            Financial Sovereignty
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
            Wage Transparency & Earnings
          </h1>
          <p className="text-sm text-gray-text mt-1">
            Every rupee earned is cryptographically accounted for under the 80/5/10/5 cooperative formula.
          </p>
        </div>

        <button
          onClick={handleDownloadTaxStatement}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-coop self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Download Tax Statement (FY 2026-27)
        </button>
      </div>

      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card">
          <span className="text-xs font-bold uppercase text-gray-400">Total Net Earned (80%)</span>
          <p className="font-heading font-black text-3xl text-coop-green mt-1">
            ₹48,650
          </p>
          <p className="text-[11px] text-forest-green font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Direct to bank account
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card">
          <span className="text-xs font-bold uppercase text-gray-400">Accident & Health Pool (5%)</span>
          <p className="font-heading font-black text-3xl text-soft-teal mt-1">
            ₹3,040
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            ₹5 Lakh hospitalization active
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card">
          <span className="text-xs font-bold uppercase text-gray-400">Coop Equity Share (10%)</span>
          <p className="font-heading font-black text-3xl text-card-purple mt-1">
            ₹6,080
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Dividend payable in March
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card">
          <span className="text-xs font-bold uppercase text-gray-400">Platform Surcharge (5%)</span>
          <p className="font-heading font-black text-3xl text-card-blue mt-1">
            ₹3,040
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Tech operations & security
          </p>
        </div>
      </div>

      {/* 30-Day Earnings Curve */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-neutral-dark">
              30-Day Daily Net Payout Curve
            </h3>
            <p className="text-xs text-gray-text">Immediate next-day automated UPI payout</p>
          </div>
        </div>
        <EarningsChart />
      </div>

      {/* Full Wage Transparency Ledger */}
      <WageTransparencyLedger limit={10} />

      {/* Educational Banner: Why 80/20 Matters */}
      <div className="bg-light-gray rounded-3xl p-6 sm:p-8 border border-border-gray space-y-4">
        <h3 className="font-heading font-bold text-lg text-neutral-dark">
          How Sahakar Seva Compares to Corporate Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-white border border-red-200 space-y-2">
            <h4 className="font-heading font-bold text-red-600 text-base">Commercial Gig Aggregators</h4>
            <ul className="space-y-1.5 text-gray-600 list-disc pl-4">
              <li>Take 30% to 40% in opaque corporate commissions.</li>
              <li>Opaque rating algorithms unilaterally deactivate workers.</li>
              <li>Workers pay retail costs for equipment and uniforms.</li>
              <li>Zero union representation or democratic rate voting.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-coop-green/40 space-y-2">
            <h4 className="font-heading font-bold text-coop-green text-base">Sahakar Seva Cooperative</h4>
            <ul className="space-y-1.5 text-gray-600 list-disc pl-4">
              <li>Guarantees 80% direct net wage directly to worker account.</li>
              <li>Peer arbitration jury resolves all rating and penalty appeals.</li>
              <li>5% funds comprehensive cashless accident insurance.</li>
              <li>Workers democratically vote on minimum hourly wages.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
