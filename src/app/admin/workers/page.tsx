'use client';

import React, { useState } from 'react';
import { WORKERS_DATA } from '@/lib/data';
import { WorkerProfile } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import { formatINR } from '@/lib/utils';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminWorkersPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [tradeFilter, setTradeFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [workers, setWorkers] = useState<WorkerProfile[]>(WORKERS_DATA);
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  const trades = ['All', 'Electrician', 'Plumber', 'Carpenter', 'House Cleaning', 'Painter', 'Appliance Repair'];

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.fullName.toLowerCase().includes(search.toLowerCase()) ||
      w.trade.toLowerCase().includes(search.toLowerCase()) ||
      w.location.toLowerCase().includes(search.toLowerCase());
    const matchesTrade = tradeFilter === 'All' || w.trade.toLowerCase().includes(tradeFilter.toLowerCase());
    const matchesLevel = levelFilter === 'All' || w.verifiedStatus.toString() === levelFilter;
    return matchesSearch && matchesTrade && matchesLevel;
  });

  const handleStatusChange = (id: string, newLevel: 1 | 2 | 3) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, verifiedStatus: newLevel } : w))
    );
    showToast(`Worker verified status updated to Level ${newLevel}`, 'success');
    if (selectedWorker?.id === id) {
      setSelectedWorker((prev) => prev ? { ...prev, verifiedStatus: newLevel } : null);
    }
  };

  const handleToggleInsurance = (id: string) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, insuranceEnrolled: !w.insuranceEnrolled } : w))
    );
    showToast(`Worker insurance enrollment status toggled`, 'info');
    if (selectedWorker?.id === id) {
      setSelectedWorker((prev) => prev ? { ...prev, insuranceEnrolled: !prev.insuranceEnrolled } : null);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/dashboard" className="hover:text-forest-green">Admin Dashboard</Link>
            <span>/</span>
            <span className="text-forest-green font-bold">Worker Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark">
            Worker Verification & Roster
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage 3-tier guild certifications, background check clearances, community vouches, and insurance enrollment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/compliance"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-neutral-dark text-xs font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-forest-green" /> Compliance Audits
          </Link>
          <Link
            href="/admin/arbitration-panel"
            className="px-4 py-2.5 rounded-xl bg-forest-green text-white text-xs font-bold hover:bg-emerald-800 transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-emerald-300" /> Arbitration Jury
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Total Enrolled Workers</span>
          <p className="text-2xl font-black text-neutral-dark mt-1">{workers.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Cooperative Members</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Master Guild (Level 3)</span>
          <p className="text-2xl font-black text-purple-700 mt-1">
            {workers.filter((w) => w.verifiedStatus === 3).length}
          </p>
          <span className="text-[11px] text-purple-600 font-semibold">Certified Artisans</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Insurance Enrolled</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {workers.filter((w) => w.insuranceEnrolled).length} / {workers.length}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Ayushman / ESIC Pool</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs text-gray-500">Safe-Time Active (Women)</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {workers.filter((w) => w.womenWorker).length}
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">Night Guard Chaperone</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by worker name, trade, locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-light-gray border border-transparent focus:border-coop-green focus:bg-white outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Trade:</span>
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="text-xs bg-light-gray px-3 py-2 rounded-xl border border-transparent focus:border-coop-green outline-none font-medium"
            >
              {trades.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Verification:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-xs bg-light-gray px-3 py-2 rounded-xl border border-transparent focus:border-coop-green outline-none font-medium"
            >
              <option value="All">All Tiers</option>
              <option value="1">Level 1 (ID Verified)</option>
              <option value="2">Level 2 (Guild Certified)</option>
              <option value="3">Level 3 (Master Craftsman)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-light-gray/70 uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Worker Profile</th>
                <th className="px-5 py-3.5">Trade & Skills</th>
                <th className="px-5 py-3.5">Tier Verification</th>
                <th className="px-5 py-3.5">Community Vouches</th>
                <th className="px-5 py-3.5">Min Rate</th>
                <th className="px-5 py-3.5">Insurance</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.profilePhotoUrl}
                        alt={w.fullName}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-bold text-neutral-dark flex items-center gap-1.5">
                          {w.fullName}
                          {w.womenWorker && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-pink-100 text-pink-700 font-semibold">
                              Women Guild
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 flex items-center gap-1 text-[11px] mt-0.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{w.rating}</span> &bull; <span>{w.totalJobsCompleted} jobs</span> &bull; <span>{w.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-neutral-dark block">{w.trade}</span>
                    <span className="text-[11px] text-gray-500">{w.experienceLevel} exp</span>
                  </td>
                  <td className="px-5 py-4">
                    {w.verifiedStatus === 3 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-[11px]">
                        <Award className="w-3 h-3 text-purple-600" /> Level 3 Master
                      </span>
                    )}
                    {w.verifiedStatus === 2 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Level 2 Guild
                      </span>
                    )}
                    {w.verifiedStatus === 1 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" /> Level 1 Aadhaar
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-forest-green">{w.communityVouchesCount}</span>
                    <span className="text-gray-400 ml-1 text-[11px]">peer vouches</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-neutral-dark">
                    {formatINR(w.minRate)}/hr
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggleInsurance(w.id)}
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wide transition-all ${
                        w.insuranceEnrolled
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {w.insuranceEnrolled ? 'Enrolled' : 'Lapsed / Pending'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <select
                        value={w.verifiedStatus}
                        onChange={(e) => handleStatusChange(w.id, Number(e.target.value) as 1 | 2 | 3)}
                        className="text-[11px] font-bold bg-light-gray border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-coop-green cursor-pointer"
                      >
                        <option value={1}>Set L1</option>
                        <option value={2}>Set L2</option>
                        <option value={3}>Set L3</option>
                      </select>
                      <button
                        onClick={() => setSelectedWorker(w)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-forest-green hover:bg-emerald-100 font-bold text-[11px] transition-all"
                      >
                        Inspect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Worker Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedWorker.profilePhotoUrl}
                  alt={selectedWorker.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-coop-green/30"
                />
                <div>
                  <h3 className="text-lg font-bold text-neutral-dark">{selectedWorker.fullName}</h3>
                  <p className="text-xs text-gray-500">{selectedWorker.trade} &bull; {selectedWorker.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorker(null)}
                className="w-8 h-8 rounded-full bg-light-gray flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="bg-light-gray/50 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Bio:</span>
                <span className="font-medium text-neutral-dark text-right max-w-xs">{selectedWorker.bio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Certifications:</span>
                <span className="font-semibold text-forest-green">{selectedWorker.certifications.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Background Check:</span>
                <span className="font-bold text-emerald-600 capitalize">{selectedWorker.backgroundCheckStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hourly Rate Floor:</span>
                <span className="font-bold text-neutral-dark">{formatINR(selectedWorker.minRate)}/hr (Avg: {formatINR(selectedWorker.avgHourlyRate)}/hr)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  showToast(`Verification dossier for ${selectedWorker.fullName} marked approved.`, 'success');
                  setSelectedWorker(null);
                }}
                className="flex-1 bg-coop-green text-white font-bold py-2.5 rounded-xl text-xs hover:bg-emerald-700 transition-all"
              >
                Endorse Guild Credentials
              </button>
              <button
                onClick={() => setSelectedWorker(null)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
