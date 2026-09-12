'use client';

import React, { useState } from 'react';
import { CRISIS_EVENTS_DATA } from '@/lib/data';
import { CrisisEvent } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import { formatINR } from '@/lib/utils';
import {
  HeartHandshake,
  AlertTriangle,
  CloudRain,
  SunMedium,
  Wind,
  Sliders,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingDown,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCrisisManagementPage() {
  const { showToast } = useToast();
  const [events, setEvents] = useState<CrisisEvent[]>(CRISIS_EVENTS_DATA);
  const [ratingWeight, setRatingWeight] = useState(50);
  const vulnerabilityWeight = 100 - ratingWeight;

  const emergencyPoolTotal = 4250000; // ₹42.5 Lakhs
  const activeEvent = events.find((e) => e.status === 'active');

  const handleTriggerDisbursement = () => {
    showToast(
      `Disbursed ₹6,20,000 from emergency cooperative pool (${ratingWeight}% Rating / ${vulnerabilityWeight}% Vulnerability) to 1,240 workers.`,
      'success'
    );
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/dashboard" className="hover:text-forest-green">Admin Dashboard</Link>
            <span>/</span>
            <span className="text-forest-green font-bold">Crisis Redistribution (USP 8)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-rose-600" />
            Crisis Income Redistribution Engine
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Democratic emergency solidarity fund protecting gig workers during monsoons, heatwaves, pollution bans, and health shocks.
          </p>
        </div>

        <div className="bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
          <div>
            <span className="text-xs font-bold text-rose-900 block">Current Crisis Status:</span>
            <span className="text-xs text-rose-700 font-semibold">{activeEvent?.name || 'Monitoring Baseline'}</span>
          </div>
        </div>
      </div>

      {/* Emergency Reserve Pool Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-800 to-forest-green rounded-3xl p-6 text-white shadow-md">
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold block mb-1">
            Emergency Reserve Balance
          </span>
          <p className="text-3xl font-black">{formatINR(emergencyPoolTotal)}</p>
          <span className="text-xs text-emerald-100/80 mt-2 block">
            Generated via democratic 5% platform welfare contribution pool
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">
            Workers Protected (Active)
          </span>
          <p className="text-3xl font-black text-neutral-dark">1,240</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> 100% of affected trade members
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">
            Demand Contraction Trigger
          </span>
          <p className="text-3xl font-black text-rose-600">-43%</p>
          <span className="text-xs text-gray-500 mt-2 block">
            Threshold: -30% triggers automatic income top-up
          </span>
        </div>
      </div>

      {/* Allocation Model Controller */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-dark flex items-center gap-2">
              <Sliders className="w-5 h-5 text-forest-green" />
              Democratic Income Redistribution Formula
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Workers collectively vote on how emergency relief is weighted between historical job performance and vulnerability.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
              {ratingWeight}% Rating
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {vulnerabilityWeight}% Vulnerability
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>More Weight to Historical Rating & Experience</span>
            <span>More Weight to Vulnerability & Single Earners</span>
          </div>
          <input
            type="range"
            min={20}
            max={80}
            value={ratingWeight}
            onChange={(e) => setRatingWeight(Number(e.target.value))}
            className="w-full accent-forest-green h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs">
              <strong className="text-purple-900 block mb-1">Rating Weighted Portion ({ratingWeight}%):</strong>
              <p className="text-purple-700">
                Recognizes long-term guild standing, customer satisfaction ratings (&gt; 4.8), and total hours contributed over the past 6 months.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs">
              <strong className="text-emerald-900 block mb-1">Vulnerability Weighted Portion ({vulnerabilityWeight}%):</strong>
              <p className="text-emerald-700">
                Prioritizes female single-parent households, workers with dependent medical costs, and those without alternative family income streams.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleTriggerDisbursement}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" /> Trigger Emergency Top-Up Payout
          </button>
        </div>
      </div>

      {/* Historical Crisis Incidents */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-dark">Crisis Incidents & Activation Log</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      evt.status === 'active'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {evt.status}
                  </span>
                  <h4 className="text-base font-bold text-neutral-dark mt-2">{evt.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-rose-600">-{evt.demandDropPercent}%</span>
                  <span className="text-[10px] text-gray-400 block">Demand drop</span>
                </div>
              </div>

              <p className="text-xs text-gray-600">{evt.trigger}</p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Start: {evt.startDate}</span>
                <span className="font-bold text-forest-green">{evt.workersProtected} workers protected</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
