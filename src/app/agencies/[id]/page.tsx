'use client';

import React from 'react';
import { AGENCIES_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Star, BadgeCheck, Phone, Globe, Shield, Users, Clock, TrendingUp, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AgencyProfilePage() {
  const params = useParams();
  const agency = AGENCIES_DATA.find(a => a.id === params.id) || AGENCIES_DATA[0];

  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back */}
      <Link href="/agencies" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-coop-green transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Agencies
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-light-gray border border-border-gray shrink-0">
            <img src={agency.logoUrl} alt={agency.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-dark">{agency.name}</h1>
                  {agency.verified && (
                    <span title="Verified Partner">
                      <BadgeCheck className="w-6 h-6 text-coop-green" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{agency.tagline}</p>
                <p className="text-xs text-gray-400 mt-0.5">{agency.city}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${agency.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {agency.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { icon: Star, label: 'Rating', value: `${agency.rating} (${agency.totalReviews})` },
                { icon: Users, label: 'Workers', value: agency.workersCount.toString() },
                { icon: TrendingUp, label: 'SLA Compliance', value: `${agency.slaCompliancePercent}%` },
                { icon: Clock, label: 'Response Time', value: agency.responseTime },
              ].map(stat => (
                <div key={stat.label} className="text-center bg-light-gray rounded-2xl p-3">
                  <stat.icon className="w-4 h-4 text-coop-green mx-auto mb-1" />
                  <p className="font-heading font-bold text-base text-neutral-dark">{stat.value}</p>
                  <p className="text-[10px] text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6">
            <h3 className="font-heading font-bold text-lg text-neutral-dark mb-4">Services Offered</h3>
            <div className="flex flex-wrap gap-2">
              {agency.servicesOffered.map(s => (
                <span key={s} className="bg-sage-green/20 text-coop-green text-xs font-semibold px-3 py-1.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6">
            <h3 className="font-heading font-bold text-lg text-neutral-dark mb-4">Guarantees & Coverage</h3>
            <div className="space-y-3">
              {[
                { icon: CheckCircle2, label: 'Quality Guarantee', value: agency.qualityGuarantee },
                { icon: Shield, label: 'Insurance Coverage', value: agency.insuranceCoverage },
              ].map(item => (
                <div key={item.label} className="flex gap-3">
                  <item.icon className="w-5 h-5 text-coop-green shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-400">{item.label}</p>
                    <p className="text-sm font-semibold text-neutral-dark">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6">
            <h3 className="font-heading font-bold text-lg text-neutral-dark mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Monthly Revenue', value: formatINR(agency.monthlyRevenue) },
                { label: 'Satisfaction Score', value: `${agency.satisfactionScore}%` },
                { label: 'SLA Compliance', value: `${agency.slaCompliancePercent}%` },
              ].map(m => (
                <div key={m.label} className="bg-light-gray rounded-2xl p-4">
                  <p className="font-heading font-bold text-xl text-coop-green">{m.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact + Book Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 space-y-4">
            <h3 className="font-heading font-bold text-neutral-dark">Book This Agency</h3>
            <p className="text-xs text-gray-500">Contact for custom enterprise pricing and SLA-backed contracts.</p>
            <Link href="/bookings/create" className="w-full flex items-center justify-center gap-2 bg-coop-green hover:bg-forest-green text-white font-bold py-3 rounded-2xl shadow-coop transition-colors text-sm">
              Request Booking
            </Link>
            <button className="w-full flex items-center justify-center gap-2 border border-border-gray py-3 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
              <Phone className="w-4 h-4" /> Call Agency
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700">
            <Shield className="w-4 h-4 text-amber-600 mb-2" />
            <strong>Cooperative Partner</strong> — All agencies are vetted and insured. 100% of disputes handled by our arbitration council.
          </div>
        </div>
      </div>
    </div>
  );
}
