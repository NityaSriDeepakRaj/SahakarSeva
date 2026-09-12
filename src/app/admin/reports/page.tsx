'use client';

import React from 'react';
import { ADMIN_REPORTS_DATA, AGENCIES_DATA, COMPLIANCE_DATA, SAFETY_INCIDENTS_DATA, WORKERS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Users, Building2, Shield, AlertCircle, TrendingUp, IndianRupee, BadgeCheck, FileText } from 'lucide-react';
import Link from 'next/link';

const COLORS = ['#2D7A4F', '#4A6FA5', '#20B2AA', '#DAA520', '#8B4513'];

const ADMIN_LINKS = [
  { label: 'Worker Management', href: '/admin/workers', icon: Users, count: 2500 },
  { label: 'Safety Escalations', href: '/admin/safety-escalations', icon: Shield, count: 1 },
  { label: 'Agency Management', href: '/admin/agencies', icon: Building2, count: 3 },
  { label: 'Custom Services', href: '/admin/custom-services', icon: FileText, count: 12 },
  { label: 'Crisis Management', href: '/admin/crisis', icon: AlertCircle, count: 1 },
  { label: 'Compliance', href: '/admin/compliance', icon: BadgeCheck, count: 3 },
];

export default function AdminReportsPage() {
  const { monthlyRevenue, serviceBreakdown, keyMetrics } = ADMIN_REPORTS_DATA;

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark">Admin Dashboard</h1>
        <p className="text-sm text-gray-text mt-1">Platform overview, analytics, and management tools.</p>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: IndianRupee, label: 'Total GMV', value: `₹${(keyMetrics.totalGMV / 1000000).toFixed(1)}Cr`, color: 'text-coop-green bg-sage-green/20' },
          { icon: Users, label: 'Active Workers', value: keyMetrics.activeWorkers.toLocaleString('en-IN'), color: 'text-card-purple bg-card-purple/10' },
          { icon: TrendingUp, label: 'Customer Satisfaction', value: `${keyMetrics.customerSatisfaction}%`, color: 'text-soft-teal bg-soft-teal/10' },
          { icon: BadgeCheck, label: 'Utilization Rate', value: `${keyMetrics.utilizationRate}%`, color: 'text-amber-600 bg-amber-50' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-3xl border border-border-gray shadow-card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color} mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="font-heading font-black text-2xl text-neutral-dark">{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Alert Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending Verifications', count: keyMetrics.pendingVerifications, color: 'bg-yellow-50 border-yellow-200 text-yellow-700', href: '/admin/compliance' },
          { label: 'Pending Agencies', count: keyMetrics.pendingAgencies, color: 'bg-blue-50 border-blue-200 text-blue-700', href: '/admin/agencies' },
          { label: 'Open Appeals', count: keyMetrics.pendingAppeals, color: 'bg-orange-50 border-orange-200 text-orange-700', href: '/admin/arbitration-panel' },
          { label: 'Safety Escalations', count: keyMetrics.openEscalations, color: 'bg-red-50 border-red-200 text-red-700', href: '/admin/safety-escalations' },
        ].map(alert => (
          <Link key={alert.label} href={alert.href} className={`border rounded-2xl p-4 text-center hover:shadow-md transition-shadow ${alert.color}`}>
            <p className="font-heading font-black text-3xl">{alert.count}</p>
            <p className="text-xs font-semibold mt-1">{alert.label}</p>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8">
          <h3 className="font-heading font-bold text-lg text-neutral-dark mb-6">Monthly GMV vs Worker Net Pay</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenue} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [formatINR(v)]} />
              <Legend />
              <Bar dataKey="gmv" name="GMV" fill="#2D7A4F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="workerNet" name="Worker Net" fill="#4A6FA5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Breakdown Pie */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8">
          <h3 className="font-heading font-bold text-lg text-neutral-dark mb-6">Service Mix</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={serviceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${value}%`} labelLine={false}>
                {serviceBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {serviceBreakdown.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  {s.name}
                </span>
                <span className="font-bold text-gray-600">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div>
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-4">Admin Modules</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ADMIN_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="bg-white rounded-2xl border border-border-gray shadow-card p-5 hover:border-coop-green hover:shadow-coop transition-all group flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sage-green/20 flex items-center justify-center group-hover:bg-coop-green transition-colors">
                <link.icon className="w-5 h-5 text-coop-green group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-sm text-neutral-dark group-hover:text-coop-green transition-colors">{link.label}</p>
                <p className="text-xs text-gray-400">{link.count} records</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
