'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import WorkerDashboard from '@/components/dashboard/WorkerDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { UserRole } from '@/types';
import { Users, Shield, Wrench } from 'lucide-react';

export default function DashboardPage() {
  const { user, role, switchRole, isAuthenticated } = useAuth();

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating Demo Role Switcher Bar */}
      <div className="mb-8 p-3 rounded-2xl bg-white border border-sage-green/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-coop-green animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-forest-green">
            Active Persona View: <span className="text-coop-green font-extrabold">{role.toUpperCase()}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs text-gray-text font-medium mr-1 hidden sm:inline">Switch Perspective:</span>
          <button
            onClick={() => switchRole('worker')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              role === 'worker'
                ? 'bg-coop-green text-white shadow-xs'
                : 'bg-light-gray text-neutral-dark hover:bg-gray-200'
            }`}
          >
            Worker (Sunita)
          </button>
          <button
            onClick={() => switchRole('customer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              role === 'customer'
                ? 'bg-coop-green text-white shadow-xs'
                : 'bg-light-gray text-neutral-dark hover:bg-gray-200'
            }`}
          >
            Customer (Rahul)
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              role === 'admin'
                ? 'bg-coop-green text-white shadow-xs'
                : 'bg-light-gray text-neutral-dark hover:bg-gray-200'
            }`}
          >
            Admin (Priya)
          </button>
        </div>
      </div>

      {/* Render Role Dashboard */}
      {role === 'worker' && <WorkerDashboard />}
      {role === 'customer' && <CustomerDashboard />}
      {role === 'admin' && <AdminDashboard />}
      {role === 'business' && <CustomerDashboard />}
    </div>
  );
}
