import React from 'react';
import { IndianRupee, Users, Network, Clock } from 'lucide-react';

export default function ImpactStats() {
  const stats = [
    {
      value: '₹50Cr+',
      label: 'Direct Wages Distributed',
      subtext: 'Zero corporate commission cuts taken',
      icon: IndianRupee,
    },
    {
      value: '100K+',
      label: 'Organized Guild Workers',
      subtext: 'Across electrical, plumbing & care',
      icon: Users,
    },
    {
      value: '500+',
      label: 'Autonomous Cooperatives',
      subtext: 'Federated under democratic bylaws',
      icon: Network,
    },
    {
      value: '1M+',
      label: 'Dignified Service Hours',
      subtext: 'With accident & healthcare insurance',
      icon: Clock,
    },
  ];

  return (
    <section className="bg-sage-green/40 border-y border-sage-green/50 py-16 sm:py-20 text-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-green bg-white/70 px-3.5 py-1 rounded-full border border-forest-green/20">
            Measurable Solidarity
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-forest-green tracking-tight mt-3">
            Real Community Impact, Audited Publicly
          </h2>
          <p className="text-gray-text text-sm sm:text-base mt-2">
            Every transaction is logged on our public wage ledger to guarantee social equity and economic justice.
          </p>
        </div>

        {/* 4 Large Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm flex flex-col items-center text-center hover:bg-white transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-coop-green/15 text-forest-green flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <p className="font-heading font-black text-3xl sm:text-4xl text-forest-green tracking-tight">
                  {item.value}
                </p>
                <p className="font-bold text-base text-neutral-dark mt-1">
                  {item.label}
                </p>
                <p className="text-xs text-gray-text mt-1">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
