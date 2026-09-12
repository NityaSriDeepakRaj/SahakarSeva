'use client';

import React, { useState } from 'react';
import { SAFETY_INCIDENTS_DATA } from '@/lib/data';
import { SafetyIncident } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserX,
  PhoneCall,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  AlertOctagon,
} from 'lucide-react';
import Link from 'next/link';

export default function SafetyEscalationsPage() {
  const { showToast } = useToast();
  const [incidents, setIncidents] = useState<SafetyIncident[]>(SAFETY_INCIDENTS_DATA);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'yellow' | 'red'>('all');
  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null);

  const filtered = incidents.filter((inc) => {
    if (filterSeverity === 'all') return true;
    return inc.severity === filterSeverity;
  });

  const handleResolve = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: 'resolved',
              resolvedAt: new Date().toISOString(),
              actionTaken: 'Arbitration committee mediated. Corrective action documented.',
            }
          : inc
      )
    );
    showToast('Incident resolved and archived to cooperative audit ledger.', 'success');
    if (selectedIncident?.id === id) setSelectedIncident(null);
  };

  const handleBlacklistCustomer = (customerId: string, customerName: string) => {
    showToast(`Customer ${customerName} (${customerId}) suspended across the federation network.`, 'error');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/dashboard" className="hover:text-forest-green">Admin Dashboard</Link>
            <span>/</span>
            <span className="text-forest-green font-bold">Safety & Escalations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-600" />
            Safety Incident & Emergency Queue
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time SOS triggers, customer harassment reports, peer chaperone requests, and zero-tolerance federation enforcement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/safety"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-neutral-dark hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-forest-green" /> Worker Safety View
          </Link>
        </div>
      </div>

      {/* Alert Severity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-red-600" /> Red Alerts (Emergency)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          </div>
          <p className="text-3xl font-black text-red-900 mt-2">
            {incidents.filter((i) => i.severity === 'red' && i.status !== 'resolved').length}
          </p>
          <span className="text-xs text-red-600 font-medium mt-1 block">
            Immediate dispatch / Police liaison needed
          </span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Yellow Alerts (Investigation)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-900 mt-2">
            {incidents.filter((i) => i.severity === 'yellow' && i.status !== 'resolved').length}
          </p>
          <span className="text-xs text-amber-700 font-medium mt-1 block">
            Dispute mediation & warning issuance
          </span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Resolved This Month
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-900 mt-2">
            {incidents.filter((i) => i.status === 'resolved').length}
          </p>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">
            100% Worker safety outcome preserved
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all ${
              filterSeverity === 'all'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-gray-500 hover:text-neutral-dark'
            }`}
          >
            All Incidents ({incidents.length})
          </button>
          <button
            onClick={() => setFilterSeverity('red')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all ${
              filterSeverity === 'red'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-neutral-dark'
            }`}
          >
            Red Alerts ({incidents.filter((i) => i.severity === 'red').length})
          </button>
          <button
            onClick={() => setFilterSeverity('yellow')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all ${
              filterSeverity === 'yellow'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-neutral-dark'
            }`}
          >
            Yellow Alerts ({incidents.filter((i) => i.severity === 'yellow').length})
          </button>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filtered.map((inc) => (
          <div
            key={inc.id}
            className={`bg-white rounded-2xl p-6 border shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
              inc.severity === 'red'
                ? 'border-red-200 hover:border-red-400'
                : 'border-gray-100 hover:border-sage-green/60'
            }`}
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${
                    inc.severity === 'red'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {inc.severity === 'red' ? (
                    <AlertOctagon className="w-3 h-3 text-red-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                  )}
                  {inc.severity.toUpperCase()} ALERT
                </span>
                <span className="text-xs font-mono text-gray-400">#{inc.id}</span>
                <span className="text-xs text-gray-400">&bull;</span>
                <span className="text-xs font-bold text-neutral-dark capitalize">
                  {inc.incidentType.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400">&bull;</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(inc.reportedAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm font-semibold text-neutral-dark">
                &ldquo;{inc.description}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-forest-green" /> Worker: <strong className="text-neutral-dark">{inc.workerName}</strong> ({inc.workerId})
                </span>
                <span className="flex items-center gap-1">
                  <UserX className="w-3.5 h-3.5 text-red-500" /> Customer: <strong className="text-neutral-dark">{inc.customerName}</strong> ({inc.customerId})
                </span>
              </div>

              {inc.actionTaken && (
                <div className="text-xs bg-light-gray/60 p-2.5 rounded-xl text-gray-600">
                  <strong className="text-neutral-dark">Action Log:</strong> {inc.actionTaken}
                </div>
              )}
            </div>

            <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                  inc.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Status: {inc.status.replace('_', ' ')}
              </span>

              {inc.status !== 'resolved' && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleResolve(inc.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-forest-green hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => handleBlacklistCustomer(inc.customerId, inc.customerName)}
                    className="px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold transition-all"
                  >
                    Suspend Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
