import React from 'react';
import ImpactStats from '@/components/landing/ImpactStats';
import Testimonials from '@/components/landing/Testimonials';
import { IndianRupee, Users, ShieldCheck, Award, TrendingUp } from 'lucide-react';

export default function ImpactPage() {
  return (
    <div className="space-y-16 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3.5 py-1.5 rounded-full">
            Real-Time Audit
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-dark tracking-tight mt-3">
            Public Social & Economic Impact
          </h1>
          <p className="text-gray-text text-base sm:text-lg mt-3 leading-relaxed">
            Measuring the structural shift from extractive venture gig capitalism to generative worker-owned digital solidarity.
          </p>
        </div>

        {/* Uplift Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-8 rounded-3xl bg-light-gray border border-border-gray space-y-2">
            <span className="text-xs font-bold uppercase text-gray-400">Average Worker Wage Uplift</span>
            <p className="font-heading font-black text-4xl text-coop-green">+34.8%</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Compared to typical commercial aggregator take-home pay for equivalent jobs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-light-gray border border-border-gray space-y-2">
            <span className="text-xs font-bold uppercase text-gray-400">Cashless Health Claims Settled</span>
            <p className="font-heading font-black text-4xl text-soft-teal">4,120 Claims</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Covering worker hospitalizations, fracture treatments, and maternity benefits.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-light-gray border border-border-gray space-y-2">
            <span className="text-xs font-bold uppercase text-gray-400">Transit Emissions Reduced</span>
            <p className="font-heading font-black text-4xl text-card-purple">-42.6%</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Saved through Neighborhood Batch Optimization routing compared to random dispatches.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Stats Component (Sage Green) */}
      <ImpactStats />

      {/* Testimonials Component */}
      <Testimonials />
    </div>
  );
}
