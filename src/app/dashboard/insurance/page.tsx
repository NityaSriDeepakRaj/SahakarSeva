'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { formatINR } from '@/lib/utils';
import { ShieldCheck, Heart, FileText, Upload, ExternalLink, CheckCircle2, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const GOVT_SCHEMES = [
  { name: 'PMSBY', full: 'Pradhan Mantri Suraksha Bima Yojana', benefit: '₹2 Lakh accident cover · ₹12/yr premium', status: 'enrolled', link: '#' },
  { name: 'PMJJBY', full: 'Pradhan Mantri Jeevan Jyoti Bima Yojana', benefit: '₹2 Lakh life cover · ₹436/yr premium', status: 'not_enrolled', link: '#' },
  { name: 'e-SHRAM', full: 'National Database of Unorganised Workers', benefit: 'UAN card · accident insurance via NDUW', status: 'enrolled', link: '#' },
  { name: 'NSAP', full: 'National Social Assistance Programme', benefit: 'Old-age & disability pension linkage', status: 'not_enrolled', link: '#' },
];

const CLAIMS = [
  { id: 'clm-001', type: 'Hospitalization', amount: 18000, status: 'paid', date: '2026-05-12', hospital: 'AIIMS, New Delhi' },
  { id: 'clm-002', type: 'Fracture Treatment', amount: 6500, status: 'approved', date: '2026-08-03', hospital: 'Safdarjung Hospital' },
];

export default function InsurancePage() {
  const { showToast } = useToast();
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimType, setClaimType] = useState('Hospitalization');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimDoc, setClaimDoc] = useState(false);

  const handleClaimSubmit = () => {
    setShowClaimForm(false);
    setClaimAmount('');
    setClaimDoc(false);
    showToast('Claim Filed', `Your ${claimType} claim has been submitted. Expect a response within 3 working days.`, 'success');
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Worker Welfare
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Insurance & Welfare
        </h1>
        <p className="text-sm text-gray-text mt-1">Your cooperative insurance status, government scheme enrollment, and claims management.</p>
      </div>

      {/* Cooperative Insurance Status */}
      <div className="bg-gradient-to-br from-soft-teal to-coop-green rounded-3xl p-8 text-white space-y-6 shadow-coop">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-green-100 text-xs font-bold uppercase tracking-wider">Cooperative Insurance Pool (5% of your earnings)</p>
            <h2 className="font-heading font-black text-3xl mt-1">₹5 Lakh Hospitalization Cover</h2>
            <p className="text-green-100 text-sm mt-1">₹2 Lakh accidental disability · ₹1 Lakh maternity benefit</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Policy Status', value: 'Active ✓', sub: 'Renews Apr 2027' },
            { label: 'Pool Contributed', value: formatINR(3040), sub: 'This FY (5% deduction)' },
            { label: 'Claims Paid', value: formatINR(24500), sub: 'Lifetime total' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/15 rounded-2xl p-4">
              <p className="text-xs text-green-200">{stat.label}</p>
              <p className="font-heading font-bold text-lg text-white">{stat.value}</p>
              <p className="text-xs text-green-300">{stat.sub}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowClaimForm(true)}
          className="bg-white text-coop-green font-bold text-sm px-6 py-3 rounded-2xl hover:bg-green-50 transition-colors"
        >
          + File a New Claim
        </button>
      </div>

      {/* Claim History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-5">Claims History</h3>
        <div className="space-y-4">
          {CLAIMS.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl border border-border-gray hover:border-coop-green transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {c.status === 'paid' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-yellow-600" />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-neutral-dark">{c.type}</p>
                  <p className="text-xs text-gray-400">{c.hospital} · {c.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-neutral-dark">{formatINR(c.amount)}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Schemes */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-5">Government Scheme Enrollment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVT_SCHEMES.map(scheme => (
            <div key={scheme.name} className={`rounded-2xl p-5 border-2 ${scheme.status === 'enrolled' ? 'border-coop-green/40 bg-sage-green/5' : 'border-border-gray bg-light-gray'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-heading font-bold text-base text-neutral-dark">{scheme.name}</span>
                  <p className="text-xs text-gray-400">{scheme.full}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${scheme.status === 'enrolled' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {scheme.status === 'enrolled' ? '✓ Enrolled' : 'Not Enrolled'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">{scheme.benefit}</p>
              {scheme.status !== 'enrolled' && (
                <button
                  onClick={() => showToast('Redirecting…', `Opening ${scheme.name} enrollment portal.`, 'info')}
                  className="text-xs font-bold text-coop-green flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Enroll Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Claim Form Modal */}
      {showClaimForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 space-y-5">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">File Insurance Claim</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Claim Type</label>
              <select value={claimType} onChange={e => setClaimType(e.target.value)} className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green">
                <option>Hospitalization</option>
                <option>Accident / Fracture</option>
                <option>Maternity Benefit</option>
                <option>Disability (Partial)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Claim Amount (₹)</label>
              <input type="number" value={claimAmount} onChange={e => setClaimAmount(e.target.value)} placeholder="e.g. 15000" className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green" />
            </div>
            <button onClick={() => setClaimDoc(true)} className={`w-full border-2 border-dashed rounded-xl py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${claimDoc ? 'border-coop-green text-coop-green bg-sage-green/10' : 'border-border-gray text-gray-500 hover:border-coop-green hover:text-coop-green'}`}>
              {claimDoc ? <><CheckCircle2 className="w-4 h-4" /> Documents Attached</> : <><Upload className="w-4 h-4" /> Upload Hospital Bill / Discharge Summary</>}
            </button>
            <div className="flex gap-3">
              <button onClick={() => setShowClaimForm(false)} className="flex-1 py-3 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={handleClaimSubmit} className="flex-1 py-3 rounded-2xl bg-coop-green text-white text-sm font-bold hover:bg-forest-green transition-colors">Submit Claim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
