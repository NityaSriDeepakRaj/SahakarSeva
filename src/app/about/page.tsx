import React from 'react';
import { Shield, Users, Scale, HeartHandshake, Award, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3.5 py-1.5 rounded-full">
          The Cooperative Movement
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-dark tracking-tight mt-3 leading-tight">
          Democratizing the Gig Economy for India&apos;s Skilled Workers
        </h1>
        <p className="text-gray-text text-base sm:text-lg mt-4 leading-relaxed">
          Sahayak Seva was founded on a simple truth: the people who repair our homes, clean our spaces, and care for our elderly should own the platform they power.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-light-gray p-8 rounded-3xl border border-border-gray space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-coop-green text-white flex items-center justify-center shadow-coop">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-neutral-dark">
            100% Worker Owned
          </h3>
          <p className="text-xs sm:text-sm text-gray-text leading-relaxed">
            Registered under the Multi-State Cooperative Societies Act. Every verified guild tradesperson holds voting equity in their local chapter.
          </p>
        </div>

        <div className="bg-light-gray p-8 rounded-3xl border border-border-gray space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-card-purple text-white flex items-center justify-center shadow-coop">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-neutral-dark">
            Democratic Justice
          </h3>
          <p className="text-xs sm:text-sm text-gray-text leading-relaxed">
            Algorithms do not rule workers. A 15-member peer worker arbitration jury reviews client disputes and rating appeals with zero corporate bias.
          </p>
        </div>

        <div className="bg-light-gray p-8 rounded-3xl border border-border-gray space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-soft-teal text-white flex items-center justify-center shadow-coop">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-neutral-dark">
            Social Safety Net
          </h3>
          <p className="text-xs sm:text-sm text-gray-text leading-relaxed">
            5% of every transaction builds a cashless health and accident pool. Workers receive maternity support, accident cover, and monsoon crisis aid.
          </p>
        </div>
      </div>

      {/* The 80/20 Difference Section */}
      <div className="bg-gradient-to-br from-forest-green to-coop-green text-white p-8 sm:p-12 rounded-3xl shadow-coop space-y-6">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
          The 80/5/10/5 Economic Formula
        </h2>
        <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
          Commercial gig apps take up to 40% in speculative fees. Sahayak Seva operates on radical, audited math:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="font-heading font-black text-3xl sm:text-4xl text-white">80%</span>
            <p className="text-xs text-sage-green font-semibold mt-1">Direct Net to Worker</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="font-heading font-black text-3xl sm:text-4xl text-white">5%</span>
            <p className="text-xs text-sage-green font-semibold mt-1">Health & Accident Cover</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="font-heading font-black text-3xl sm:text-4xl text-white">10%</span>
            <p className="text-xs text-sage-green font-semibold mt-1">Coop Tools & Reserves</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="font-heading font-black text-3xl sm:text-4xl text-white">5%</span>
            <p className="text-xs text-sage-green font-semibold mt-1">Platform Tech & Cloud</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-6">
        <h3 className="font-heading font-bold text-2xl text-neutral-dark mb-4">
          Become Part of the Movement
        </h3>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/signup?role=worker"
            className="px-6 py-3 rounded-xl bg-coop-green text-white font-bold text-sm hover:bg-forest-green shadow-coop"
          >
            Join as Worker Member
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl border-2 border-coop-green text-coop-green font-bold text-sm hover:bg-sage-green/10"
          >
            Book Guild Services
          </Link>
        </div>
      </div>
    </div>
  );
}
