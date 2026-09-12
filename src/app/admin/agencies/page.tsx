'use client';

import React, { useState } from 'react';
import { AGENCIES_DATA } from '@/lib/data';
import { Agency } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import { formatINR } from '@/lib/utils';
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Search,
  Filter,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminAgenciesPage() {
  const { showToast } = useToast();
  const [agencies, setAgencies] = useState<Agency[]>(AGENCIES_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'suspended'>('all');

  const filtered = agencies.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: 'approved' | 'pending' | 'suspended') => {
    setAgencies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus, verified: newStatus === 'approved' } : a))
    );
    showToast(`Agency status updated to ${newStatus}.`, 'success');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/dashboard" className="hover:text-forest-green">Admin Dashboard</Link>
            <span>/</span>
            <span className="text-forest-green font-bold">Agency Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark flex items-center gap-3">
            <Building2 className="w-8 h-8 text-forest-green" />
            Partner Agency & Contractor Roster
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Regulate agency memberships, SLA compliance, worker wage pass-throughs, and public liability insurance limits.
          </p>
        </div>

        <Link
          href="/agencies"
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-neutral-dark hover:bg-gray-50 transition-all"
        >
          View Public Marketplace &rarr;
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Total Agencies</span>
          <p className="text-2xl font-black text-neutral-dark mt-1">{agencies.length}</p>
          <span className="text-[11px] text-gray-500">Enterprise Service Partners</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Approved & Verified</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {agencies.filter((a) => a.status === 'approved').length}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Active in Directory</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Pending Review</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {agencies.filter((a) => a.status === 'pending').length}
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">Awaiting Audit</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Contracted Workers</span>
          <p className="text-2xl font-black text-forest-green mt-1">
            {agencies.reduce((sum, a) => sum + a.workersCount, 0)}
          </p>
          <span className="text-[11px] text-forest-green font-semibold">Covered under Fair Wage</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search agency by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-light-gray border border-transparent focus:border-coop-green focus:bg-white outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-gray-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs bg-light-gray px-3 py-2 rounded-xl border border-transparent focus:border-coop-green outline-none font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Agencies Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-light-gray/70 uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Agency</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Workers & Rating</th>
                <th className="px-5 py-3.5">SLA Compliance</th>
                <th className="px-5 py-3.5">Insurance Coverage</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={agency.logoUrl}
                        alt={agency.name}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-bold text-neutral-dark">{agency.name}</div>
                        <div className="text-[11px] text-gray-400">{agency.servicesOffered.slice(0, 2).join(', ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-neutral-dark">{agency.city}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-neutral-dark">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{agency.rating}</span>
                      <span className="text-gray-400 font-normal">({agency.totalReviews})</span>
                    </div>
                    <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3" /> {agency.workersCount} workers
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-forest-green">{agency.slaCompliancePercent}%</span>
                    <span className="text-[11px] text-gray-400 block">&lt; {agency.responseTime}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-neutral-dark">
                    {agency.insuranceCoverage}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wide ${
                        agency.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : agency.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {agency.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {agency.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(agency.id, 'approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                        >
                          Approve
                        </button>
                      )}
                      {agency.status !== 'suspended' && (
                        <button
                          onClick={() => handleUpdateStatus(agency.id, 'suspended')}
                          className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[11px]"
                        >
                          Suspend
                        </button>
                      )}
                      <Link
                        href={`/agencies/${agency.id}`}
                        className="px-2.5 py-1 rounded-lg bg-light-gray hover:bg-gray-200 font-bold text-[11px] text-neutral-dark"
                      >
                        Profile
                      </Link>
                    </div>
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
