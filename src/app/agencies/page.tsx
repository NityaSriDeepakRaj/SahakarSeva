'use client';

import React, { useState } from 'react';
import { AGENCIES_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Star, BadgeCheck, Users, Clock, Shield, ChevronRight, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AgenciesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = AGENCIES_DATA.filter(a =>
    (statusFilter === 'All' || a.status === statusFilter.toLowerCase()) &&
    (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark">Agency Partners</h1>
          <p className="text-sm text-gray-text mt-1">Verified agencies providing scalable, SLA-backed home and facility services.</p>
        </div>
        <Link href="/services/custom" className="inline-flex items-center gap-2 text-sm font-bold text-coop-green bg-sage-green/20 px-4 py-2 rounded-xl hover:bg-sage-green/30 transition-colors">
          Need custom work? → Custom Requests
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search agencies or cities…" className="w-full pl-9 pr-4 py-2.5 text-sm border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-coop-green" />
        </div>
        <div className="flex gap-2">
          {['All', 'Approved', 'Pending'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${statusFilter === s ? 'bg-coop-green border-coop-green text-white' : 'border-border-gray text-gray-600 hover:border-coop-green'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Agency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(agency => (
          <Link key={agency.id} href={`/agencies/${agency.id}`} className="group bg-white rounded-3xl border border-border-gray shadow-card hover:border-coop-green hover:shadow-coop transition-all duration-300 overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-light-gray border border-border-gray flex items-center justify-center">
                  <img src={agency.logoUrl} alt={agency.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  {agency.verified && <BadgeCheck className="w-5 h-5 text-coop-green" />}
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${agency.status === 'approved' ? 'bg-green-100 text-green-700' : agency.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {agency.status}
                  </span>
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg text-neutral-dark group-hover:text-coop-green transition-colors">{agency.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{agency.tagline}</p>
              <p className="text-xs text-gray-400 mt-1">{agency.city}</p>
            </div>

            {/* Stats */}
            <div className="px-6 py-3 border-t border-border-gray grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="font-heading font-bold text-lg text-neutral-dark">{agency.rating}</p>
                <p className="text-[10px] text-gray-400">Rating</p>
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-neutral-dark">{agency.workersCount}</p>
                <p className="text-[10px] text-gray-400">Workers</p>
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-neutral-dark">{agency.slaCompliancePercent}%</p>
                <p className="text-[10px] text-gray-400">SLA Rate</p>
              </div>
            </div>

            {/* Services */}
            <div className="px-6 pb-5 pt-3">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {agency.servicesOffered.slice(0, 3).map(s => (
                  <span key={s} className="text-[10px] bg-light-gray text-gray-600 font-semibold px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Response: {agency.responseTime}</span>
                <span className="text-coop-green font-semibold group-hover:underline flex items-center gap-1">
                  View Profile <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Shield className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p>No agencies found matching your search.</p>
        </div>
      )}
    </div>
  );
}
