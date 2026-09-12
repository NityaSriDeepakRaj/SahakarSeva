'use client';

import React, { useState } from 'react';
import { CUSTOM_SERVICES_DATA } from '@/lib/data';
import { CustomService } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import { formatINR } from '@/lib/utils';
import {
  Sparkles,
  Search,
  PlusCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  Tag,
  DollarSign,
  User,
  MapPin,
  Flame,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCustomServicesPage() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState<CustomService[]>(CUSTOM_SERVICES_DATA);
  const [search, setSearch] = useState('');

  const handlePromoteToStandard = (title: string) => {
    showToast(`"${title}" promoted to standard service catalog pipeline!`, 'success');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/dashboard" className="hover:text-forest-green">Admin Dashboard</Link>
            <span>/</span>
            <span className="text-forest-green font-bold">Custom Service Requests</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-dark flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-amber-500" />
            AI Custom Service Requests & Catalog Incubator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review custom customer requests parsed by NLP models, monitor worker bids, and convert recurring requests into standard catalog offerings.
          </p>
        </div>

        <Link
          href="/services/custom"
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-neutral-dark hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          Customer Custom Request Form &rarr;
        </Link>
      </div>

      {/* Incubation Summary Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-forest-green rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Incubator Pipeline Active
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Automated Catalog Expansion
          </h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm">
            When a custom service cluster receives &gt; 15 monthly requests in a metropolitan zone, our machine learning pipeline auto-generates standard pricing tiers and guild skill checklists.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-white">4</div>
            <div className="text-[11px] text-emerald-200">Services in Incubation</div>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-emerald-300">92%</div>
            <div className="text-[11px] text-emerald-200">AI Parsing Precision</div>
          </div>
        </div>
      </div>

      {/* Custom Service Requests List */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-neutral-dark">Active Custom Requests & Bids</h3>

        {requests.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">
                    {item.status}
                  </span>
                  <span className="text-xs font-mono text-gray-400">#{item.id}</span>
                </div>
                <h3 className="text-xl font-black text-neutral-dark mt-2">
                  {item.aiSummary.service_title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> Customer: <strong className="text-neutral-dark">{item.customerName}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Est: {item.aiSummary.estimated_duration}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <div className="text-base font-black text-forest-green">
                  Budget: {formatINR(item.budgetMin)} - {formatINR(item.budgetMax)}
                </div>
                <button
                  onClick={() => handlePromoteToStandard(item.aiSummary.service_title)}
                  className="px-4 py-2 rounded-xl bg-forest-green hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-300" /> Promote to Standard Service
                </button>
              </div>
            </div>

            {/* AI Breakdown Box */}
            <div className="bg-light-gray/60 rounded-2xl p-4 text-xs space-y-3">
              <div>
                <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Customer Natural Language Prompt:</span>
                <p className="text-neutral-dark italic mt-1">&ldquo;{item.rawDescription}&rdquo;</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-200">
                <div>
                  <span className="text-gray-500 block text-[11px]">Identified Trade Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.aiSummary.required_skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-gray-200 font-semibold text-[11px] text-forest-green">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">Recommended Team Size:</span>
                  <span className="font-bold text-neutral-dark mt-1 block">{item.aiSummary.team_size}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">Complexity Rating:</span>
                  <span className="font-bold text-purple-700 capitalize mt-1 block">{item.aiSummary.complexity_level}</span>
                </div>
              </div>
            </div>

            {/* Worker Bids */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Worker Guild Bids ({item.bids.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.bids.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-gray-100 bg-white hover:border-sage-green/60 transition-all flex items-start gap-3">
                    <img
                      src={b.workerPhoto}
                      alt={b.workerName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-dark">{b.workerName}</span>
                        <span className="font-black text-forest-green text-sm">{formatINR(b.bidAmount)}</span>
                      </div>
                      <p className="text-gray-500 text-[11px] line-clamp-1 mt-0.5">{b.description}</p>
                      <span className="text-gray-400 text-[10px] mt-1 block">Timeline: {b.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
