'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { COLLECTIVE_BARGAINING_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Users, TrendingUp, Timer, Vote, Info, ChevronDown, CheckCircle2, MapPin, Filter
} from 'lucide-react';

const RATE_HISTORY = [
  { month: 'Apr', rate: 480 }, { month: 'May', rate: 490 }, { month: 'Jun', rate: 490 },
  { month: 'Jul', rate: 510 }, { month: 'Aug', rate: 530 }, { month: 'Sep', rate: 550 },
];

const DEMAND_ZONES = [
  { zone: 'Connaught Place', level: 'surge', jobs: 28, color: 'bg-red-500' },
  { zone: 'Saket / Malviya Nagar', level: 'high', jobs: 19, color: 'bg-orange-400' },
  { zone: 'Dwarka Sec 10-22', level: 'high', jobs: 16, color: 'bg-orange-400' },
  { zone: 'Rohini West', level: 'moderate', jobs: 11, color: 'bg-yellow-400' },
  { zone: 'Vasant Kunj', level: 'moderate', jobs: 9, color: 'bg-yellow-400' },
  { zone: 'Najafgarh', level: 'stable', jobs: 4, color: 'bg-green-400' },
];

export default function BargainingPage() {
  const { showToast } = useToast();
  const [voted, setVoted] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteChoice, setVoteChoice] = useState<'approve' | 'reject' | ''>('');
  const [serviceFilter, setServiceFilter] = useState('All Services');

  const currentRate = 550;
  const proposedRate = 600;
  const workersAgreed = 342;
  const totalWorkers = 500;
  const daysLeft = 2;
  const agreementPct = Math.round((workersAgreed / totalWorkers) * 100);

  const handleVote = () => {
    if (!voteChoice) return;
    setVoted(true);
    setShowVoteModal(false);
    showToast(
      voteChoice === 'approve' ? 'Vote Recorded — Approve ✓' : 'Vote Recorded — Reject',
      `Your collective bargaining vote has been submitted. Decision in ${daysLeft} days.`,
      voteChoice === 'approve' ? 'success' : 'warning'
    );
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
            USP 1 — Worker Power
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
            Collective Bargaining Dashboard
          </h1>
          <p className="text-sm text-gray-text mt-1">
            Real-time demand data + democratic rate-setting. Your voice, your wage.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value)}
            className="text-xs border border-border-gray rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-coop-green"
          >
            {['All Services', 'Cleaning', 'Electrical', 'Plumbing', 'Pest Control', 'Carpentry'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Rate + Vote Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-coop-green to-forest-green rounded-3xl p-8 text-white space-y-4 shadow-coop">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-200 text-xs font-bold uppercase tracking-wider">Current Minimum Rate</p>
              <p className="font-heading font-black text-5xl mt-1">{formatINR(currentRate)}<span className="text-xl font-medium text-green-200">/hr</span></p>
            </div>
            <div className="bg-white/20 rounded-2xl px-4 py-2 text-center">
              <p className="text-xs text-green-100">Proposed New Rate</p>
              <p className="font-heading font-black text-2xl">{formatINR(proposedRate)}/hr</p>
            </div>
          </div>

          {/* Agreement Progress */}
          <div>
            <div className="flex justify-between text-xs text-green-100 mb-2">
              <span><Users className="w-3.5 h-3.5 inline mr-1" />{workersAgreed} of {totalWorkers} workers agree</span>
              <span>{agreementPct}% agreement</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${agreementPct}%` }}
              />
            </div>
            <p className="text-xs text-green-200 mt-1">75% needed to pass the rate change</p>
          </div>

          {/* Timer + Vote */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <Timer className="w-4 h-4 text-green-200" />
              <span className="text-sm font-semibold">{daysLeft} days left to vote</span>
            </div>
            {!voted ? (
              <button
                onClick={() => setShowVoteModal(true)}
                className="flex items-center gap-2 bg-white text-coop-green font-bold text-sm rounded-xl px-5 py-2 hover:bg-green-50 transition-colors shadow"
              >
                <Vote className="w-4 h-4" /> Cast Your Vote
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold">Vote Submitted ✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Educational Card */}
        <div className="bg-light-gray border border-border-gray rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-coop-green" />
            <h3 className="font-heading font-bold text-neutral-dark">What is Collective Bargaining?</h3>
          </div>
          <p className="text-xs text-gray-text leading-relaxed">
            Unlike commercial platforms that <strong>set rates unilaterally</strong>, Sahayak Seva lets you — the workers — decide the minimum acceptable rate through democratic voting.
          </p>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-coop-green shrink-0 mt-0.5" /> Every eligible worker gets one vote</li>
            <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-coop-green shrink-0 mt-0.5" /> 75% agreement needed to pass</li>
            <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-coop-green shrink-0 mt-0.5" /> Rate applied from next billing cycle</li>
            <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-coop-green shrink-0 mt-0.5" /> All votes are anonymous and cryptographically verified</li>
          </ul>
        </div>
      </div>

      {/* Rate History Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-6">3-Month Minimum Rate History</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={RATE_HISTORY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[450, 650]} tickFormatter={v => `₹${v}`} />
            <Tooltip formatter={(v: number) => [`₹${v}/hr`, 'Min. Rate']} />
            <Line type="monotone" dataKey="rate" stroke="#2D7A4F" strokeWidth={3} dot={{ fill: '#2D7A4F', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Demand Heatmap (Zone Grid) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-bold text-lg text-neutral-dark">
            <MapPin className="w-5 h-5 text-coop-green inline mr-2" />
            Live Demand by Zone — New Delhi
          </h3>
          <div className="flex gap-2 text-xs">
            {[{ label: 'Surge', color: 'bg-red-500' }, { label: 'High', color: 'bg-orange-400' }, { label: 'Moderate', color: 'bg-yellow-400' }, { label: 'Stable', color: 'bg-green-400' }].map(d => (
              <span key={d.label} className="flex items-center gap-1 text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-full ${d.color}`} />{d.label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DEMAND_ZONES.map(z => (
            <div key={z.zone} className="border border-border-gray rounded-2xl p-4 hover:border-coop-green transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${z.color}`} />
                <span className="text-xs font-bold text-neutral-dark">{z.zone}</span>
              </div>
              <p className="font-heading font-black text-2xl text-coop-green">{z.jobs}</p>
              <p className="text-xs text-gray-400">open jobs right now</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Updated every 5 minutes · Last update: 2 min ago</p>
      </div>

      {/* Vote Modal */}
      {showVoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 space-y-6">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Cast Your Vote</h2>
            <div className="bg-light-gray rounded-2xl p-4 text-sm text-gray-600">
              Proposed rate increase: <strong>{formatINR(currentRate)}/hr → {formatINR(proposedRate)}/hr</strong><br />
              Effective from: <strong>Oct 1, 2026</strong>
            </div>
            <div className="space-y-3">
              {(['approve', 'reject'] as const).map(choice => (
                <button
                  key={choice}
                  onClick={() => setVoteChoice(choice)}
                  className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold border-2 transition-all ${voteChoice === choice
                    ? choice === 'approve'
                      ? 'bg-coop-green border-coop-green text-white'
                      : 'bg-red-500 border-red-500 text-white'
                    : 'border-border-gray text-neutral-dark hover:border-coop-green'
                    }`}
                >
                  {choice === 'approve' ? '✓ Approve Rate Increase to ₹600/hr' : '✗ Reject — Keep at ₹550/hr'}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowVoteModal(false)} className="flex-1 py-3 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">Cancel</button>
              <button onClick={handleVote} disabled={!voteChoice} className="flex-1 py-3 rounded-2xl bg-coop-green text-white text-sm font-bold hover:bg-forest-green disabled:opacity-40 transition-colors">Submit Vote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
