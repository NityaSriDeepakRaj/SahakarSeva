'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { TEAM_JOBS_DATA, BOOKINGS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import {
  Building2,
  Users2,
  FileText,
  ShieldCheck,
  TrendingUp,
  Download,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ChevronRight,
  Briefcase,
  Search,
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessDashboardPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'contracts' | 'teams' | 'invoices'>('contracts');

  const contracts = [
    {
      id: 'cnt-01',
      title: 'Facility Maintenance & Sanitization',
      premises: 'Tower B, TechPark CyberCity, Gurugram',
      frequency: 'Daily (Mon-Sat)',
      crewSize: 6,
      monthlyValue: 96000,
      slaScore: 99.2,
      status: 'active',
      nextScheduled: 'Tomorrow at 07:30 AM',
    },
    {
      id: 'cnt-02',
      title: 'Quarterly Electrical & HVAC Safety Audit',
      premises: 'Global Logistics Hub, Okhla Phase III',
      frequency: 'Quarterly',
      crewSize: 4,
      monthlyValue: 48000,
      slaScore: 98.5,
      status: 'active',
      nextScheduled: '28 Sep 2026',
    },
    {
      id: 'cnt-03',
      title: 'Pest Suppression & Green Landscaping',
      premises: 'Green Meadows Campus, Bengaluru',
      frequency: 'Bi-weekly',
      crewSize: 3,
      monthlyValue: 32000,
      slaScore: 97.0,
      status: 'active',
      nextScheduled: '18 Sep 2026',
    },
  ];

  const invoices = [
    { id: 'INV-2026-08', period: 'August 2026', amount: 176000, gst: 31680, total: 207680, status: 'Paid', date: '02 Sep 2026' },
    { id: 'INV-2026-07', period: 'July 2026', amount: 168000, gst: 30240, total: 198240, status: 'Paid', date: '01 Aug 2026' },
    { id: 'INV-2026-06', period: 'June 2026', amount: 172000, gst: 30960, total: 202960, status: 'Paid', date: '02 Jul 2026' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Enterprise Header */}
      <div className="bg-gradient-to-r from-forest-green to-emerald-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" /> Enterprise Account &bull; GSTIN: 07AAACS1234F1Z5
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Enterprise Facility Management
            </h1>
            <p className="text-emerald-100/90 text-sm mt-1 max-w-2xl">
              Ethical worker-crew deployment, zero middleman markups, 100% statutory PF/ESIC compliance, and dedicated facility supervisors.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/team-jobs"
              className="inline-flex items-center gap-2 bg-white text-forest-green px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-50 transition-all"
            >
              <Users2 className="w-4 h-4 text-coop-green" /> Team Dispatches
            </Link>
            <button
              onClick={() => showToast('Dispatch request logged. Cooperative facility lead will call within 15 min.', 'success')}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Request Crew
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Active Workers on Site</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-neutral-dark mt-2">13</p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Verified Guild Pros
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Avg. SLA Adherence</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-neutral-dark mt-2">98.8%</p>
          <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" /> &lt; 20 min emergency response
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Monthly Contract Value</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-neutral-dark mt-2">{formatINR(176000)}</p>
          <span className="text-xs text-gray-500 mt-1 block">Excl. 18% GST</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Worker Coop Dividend</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-neutral-dark mt-2">80.0%</p>
          <span className="text-xs text-purple-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" /> Direct to worker bank
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 space-x-8">
        <button
          onClick={() => setActiveTab('contracts')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'contracts'
              ? 'border-coop-green text-forest-green'
              : 'border-transparent text-gray-500 hover:text-neutral-dark'
          }`}
        >
          Active Maintenance Contracts ({contracts.length})
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'teams'
              ? 'border-coop-green text-forest-green'
              : 'border-transparent text-gray-500 hover:text-neutral-dark'
          }`}
        >
          Team Dispatches & Crews
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'invoices'
              ? 'border-coop-green text-forest-green'
              : 'border-transparent text-gray-500 hover:text-neutral-dark'
          }`}
        >
          GST Billing & Invoices
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'contracts' && (
        <div className="space-y-4">
          {contracts.map((cnt) => (
            <div
              key={cnt.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-sage-green/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                    {cnt.frequency}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">#{cnt.id}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-dark">{cnt.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {cnt.premises}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users2 className="w-3.5 h-3.5 text-gray-400" /> {cnt.crewSize} Assigned Professionals
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Next: {cnt.nextScheduled}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end lg:self-center">
                <div className="text-right">
                  <div className="text-lg font-black text-neutral-dark">{formatINR(cnt.monthlyValue)}<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                  <div className="text-xs text-emerald-600 font-bold">{cnt.slaScore}% SLA Score</div>
                </div>
                <button
                  onClick={() => showToast(`Contract details for ${cnt.id} opened.`, 'info')}
                  className="px-4 py-2 rounded-xl bg-light-gray hover:bg-gray-200 text-xs font-bold text-neutral-dark transition-all"
                >
                  Manage Scope
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users2 className="w-5 h-5 text-forest-green" />
              <span className="text-sm font-semibold text-forest-green">
                Need multi-person emergency deep cleaning or factory rewiring?
              </span>
            </div>
            <Link
              href="/dashboard/team-jobs"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
            >
              Open Team Job Dispatcher &rarr;
            </Link>
          </div>

          {TEAM_JOBS_DATA.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {job.bookingId}
                  </span>
                  <h4 className="text-base font-bold text-neutral-dark mt-1">{job.serviceTitle}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {job.location} &bull; Scheduled: {job.scheduledDate} at {job.scheduledTime}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-base font-black text-neutral-dark">{formatINR(job.totalPay)}</div>
                    <div className="text-xs text-gray-500">{job.teamSize} Member Crew</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 capitalize">
                    {job.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">Crew Members:</span>
                <div className="flex items-center -space-x-2 overflow-hidden">
                  {job.members.map((m) => (
                    <img
                      key={m.id}
                      src={m.photo}
                      alt={m.name}
                      title={`${m.name} (${m.role})`}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-dark">Tax Invoices (B2B GST)</h3>
            <span className="text-xs text-gray-500">Reverse Charge Not Applicable (Section 9(3))</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-light-gray/60 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Invoice No</th>
                  <th className="px-6 py-3 font-semibold">Billing Period</th>
                  <th className="px-6 py-3 font-semibold">Base Amount</th>
                  <th className="px-6 py-3 font-semibold">18% GST</th>
                  <th className="px-6 py-3 font-semibold">Total Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-forest-green">{inv.id}</td>
                    <td className="px-6 py-4 text-neutral-dark font-medium">{inv.period}</td>
                    <td className="px-6 py-4 font-medium">{formatINR(inv.amount)}</td>
                    <td className="px-6 py-4 text-gray-500">{formatINR(inv.gst)}</td>
                    <td className="px-6 py-4 font-bold text-neutral-dark">{formatINR(inv.total)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => showToast(`Downloaded invoice ${inv.id}`, 'success')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-coop-green hover:text-forest-green"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
