'use client';

import React, { useState } from 'react';
import { WORKER_APPEALS_DATA } from '@/lib/data';
import { WorkerAppeal } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import {
  Scale,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileText,
  User,
  Vote,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminArbitrationPanelPage() {
  const { showToast } = useToast();
  const [appeals, setAppeals] = useState<WorkerAppeal[]>(WORKER_APPEALS_DATA);
  const [selectedAppeal, setSelectedAppeal] = useState<WorkerAppeal | null>(null);

  const handleOverturnDecision = (id: string) => {
    setAppeals((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: 'overturned',
              resolutionNote: 'Jury verdict ratified by Admin. Retaliatory strike struck from record; worker reimbursed.',
              juryVotes: { ...app.juryVotes, approve: app.juryVotes.total },
            }
          : app
      )
    );
    showToast('Tribunal verdict finalized! Unfair algorithmic sanction overturned.', 'success');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/dashboard" className="hover:text-forest-green">Admin Dashboard</Link>
            <span>/</span>
            <span className="text-forest-green font-bold">Arbitration Tribunal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark flex items-center gap-3">
            <Scale className="w-8 h-8 text-forest-green" />
            Worker Algorithmic Appeal & Peer Jury Tribunal
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Democratic justice: 15 peer workers review algorithmic suspensions, punitive rating disputes, and unfair deductions with binding voting power.
          </p>
        </div>

        <Link
          href="/appeal"
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-neutral-dark hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-forest-green" /> File Appeal Form &rarr;
        </Link>
      </div>

      {/* Tribunal Highlights Banner */}
      <div className="bg-gradient-to-r from-forest-green to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Democratic Jury Law &bull; Constitution Clause 14(b)
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Zero Algorithmic Deactivations Without Human Peer Review
          </h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm">
            Commercial platforms allow automated systems to fire gig workers instantly. On Sahakar Seva, no penalty or strike takes permanent effect until a randomly selected 15-member worker jury reviews verified evidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white/10 p-3.5 rounded-2xl">
            <span className="text-2xl font-black text-white">15</span>
            <span className="text-[10px] text-emerald-200 block uppercase font-bold">Jury Members</span>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl">
            <span className="text-2xl font-black text-emerald-300">48h</span>
            <span className="text-[10px] text-emerald-200 block uppercase font-bold">SLA Resolution</span>
          </div>
        </div>
      </div>

      {/* Appeals List */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-neutral-dark">Active Arbitration Cases</h3>

        <div className="space-y-4">
          {appeals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5 hover:border-sage-green/60 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={item.workerPhoto}
                    alt={item.workerName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-forest-green/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-purple-100 text-purple-800">
                        {item.issueType.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono text-gray-400">#{item.id}</span>
                      <span className="text-xs text-gray-400">&bull; Filed: {item.filedDate}</span>
                    </div>
                    <h4 className="text-lg font-bold text-neutral-dark mt-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Appellant: <strong className="text-neutral-dark">{item.workerName}</strong> &bull; Trade: {item.workerTrade}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold capitalize self-start ${
                    item.status === 'overturned'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'under_jury_review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.status.replace('_', ' ')}
                </span>
              </div>

              {/* Case Summary */}
              <div className="bg-light-gray/60 rounded-2xl p-4 text-xs text-neutral-dark leading-relaxed">
                <strong className="text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                  Worker Submitted Statement & Evidence Dossier:
                </strong>
                &ldquo;{item.description}&rdquo;
              </div>

              {/* Jury Vote Progress */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-forest-green flex items-center gap-1.5">
                    <Vote className="w-4 h-4 text-coop-green" /> Peer Jury Voting Tally:
                  </span>
                  <span className="font-black text-neutral-dark">
                    {item.juryVotes.approve} in favor &bull; {item.juryVotes.reject} against ({item.juryVotes.total} total jury)
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-forest-green h-full"
                    style={{ width: `${(item.juryVotes.approve / item.juryVotes.total) * 100}%` }}
                  />
                  <div
                    className="bg-red-500 h-full"
                    style={{ width: `${(item.juryVotes.reject / item.juryVotes.total) * 100}%` }}
                  />
                </div>
              </div>

              {item.resolutionNote && (
                <div className="text-xs bg-gray-50 p-3 rounded-xl border border-gray-100 text-gray-600">
                  <strong className="text-neutral-dark">Tribunal Note:</strong> {item.resolutionNote}
                </div>
              )}

              {item.status === 'under_jury_review' && (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleOverturnDecision(item.id)}
                    className="px-4 py-2 rounded-xl bg-forest-green hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Ratify Jury Verdict & Overturn Penalty
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
