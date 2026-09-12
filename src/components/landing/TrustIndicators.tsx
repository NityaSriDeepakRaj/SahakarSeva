import React from 'react';
import { Users, Building2, Briefcase, CheckCircle2 } from 'lucide-react';

export default function TrustIndicators() {
  const stats = [
    {
      label: 'Workers Onboarded',
      value: '100,000+',
      subtext: 'Democratically organized guild members',
      icon: Users,
    },
    {
      label: 'Active Cooperatives',
      value: '500+',
      subtext: 'Registered autonomous local chapters',
      icon: Building2,
    },
    {
      label: 'Partner Businesses',
      value: '1,200+',
      subtext: 'Direct corporate maintenance contracts',
      icon: Briefcase,
    },
    {
      label: 'Jobs Completed',
      value: '1,000,000+',
      subtext: 'Rated 4.9/5 stars across all trades',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="bg-forest-green text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 stat cards in row on desktop, 2x2 grid on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-coop-green/60 hover:bg-coop-green/90 border border-sage-green/20 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
              >
                {/* 48px SVG Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-sage-green group-hover:text-white group-hover:bg-white/20 transition-colors">
                  <Icon className="w-12 h-12 stroke-[1.5]" />
                </div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="font-semibold text-sm sm:text-base text-sage-green mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/70 mt-1 max-w-[200px]">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
