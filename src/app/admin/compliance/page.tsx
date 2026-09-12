'use client';

import React, { useState } from 'react';
import { COMPLIANCE_DATA } from '@/lib/data';
import { BadgeCheck, AlertTriangle, Clock, X, CheckCircle2, Search } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export default function AdminCompliancePage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = COMPLIANCE_DATA.filter(r => r.workerName.toLowerCase().includes(search.toLowerCase()));

  const statusColor = (status: string) => {
    if (status === 'verified' || status === 'enrolled' || status === 'clear') return 'text-green-600 bg-green-100';
    if (status === 'pending') return 'text-yellow-600 bg-yellow-100';
    if (status === 'lapsed' || status === 'flagged' || status === 'expired') return 'text-red-600 bg-red-100';
    return 'text-gray-500 bg-gray-100';
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-3xl text-neutral-dark">Compliance Dashboard</h1>
        <p className="text-sm text-gray-text mt-1">Track worker verifications, insurance status, and certification expiry.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Fully Compliant', count: COMPLIANCE_DATA.filter(r => r.verificationStatus === 'verified' && r.insuranceStatus === 'enrolled').length, color: 'text-green-600 bg-green-100' },
          { label: 'Pending Verification', count: COMPLIANCE_DATA.filter(r => r.verificationStatus === 'pending').length, color: 'text-yellow-600 bg-yellow-100' },
          { label: 'Lapsed Insurance', count: COMPLIANCE_DATA.filter(r => r.insuranceStatus === 'lapsed').length, color: 'text-red-600 bg-red-100' },
          { label: 'Expiring Soon (< 30 days)', count: COMPLIANCE_DATA.filter(r => r.daysUntilExpiry < 30).length, color: 'text-orange-600 bg-orange-100' },
        ].map(card => (
          <div key={card.label} className={`rounded-2xl p-4 text-center ${card.color.split(' ')[1]}`}>
            <p className={`font-heading font-black text-3xl ${card.color.split(' ')[0]}`}>{card.count}</p>
            <p className={`text-xs font-semibold mt-1 ${card.color.split(' ')[0]}`}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-border-gray shadow-card overflow-hidden">
        <div className="p-5 border-b border-border-gray flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search worker…" className="w-full pl-9 pr-4 py-2.5 text-sm border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-coop-green" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-light-gray border-b border-border-gray">
              <tr>
                {['Worker', 'Verification', 'Insurance', 'Bg Check', 'Cert Expiry', 'Days Left', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.workerId} className={`border-b border-border-gray hover:bg-light-gray/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-5 py-4 font-semibold text-neutral-dark">{r.workerName}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(r.verificationStatus)}`}>{r.verificationStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(r.insuranceStatus)}`}>{r.insuranceStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(r.backgroundCheck)}`}>{r.backgroundCheck}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-600">{r.certExpiry}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold ${r.daysUntilExpiry < 30 ? 'text-red-600' : r.daysUntilExpiry < 60 ? 'text-amber-600' : 'text-green-600'}`}>
                      {r.daysUntilExpiry} days
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => showToast('Reminder Sent', `Compliance reminder sent to ${r.workerName}.`, 'success')} className="text-xs font-bold text-coop-green hover:underline">
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
