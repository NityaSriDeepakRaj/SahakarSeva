'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center coop-hero-gradient overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-sage-green/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-soft-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (50%): Headline + subheadline + 2 CTAs */}
          <div className="flex flex-col justify-center space-y-6 text-left z-10">
            {/* Top Cooperative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-green/25 border border-sage-green/40 text-forest-green text-xs font-semibold tracking-wide w-fit">
              <ShieldCheck className="w-4 h-4 text-coop-green" />
              <span>100% Worker Owned • 80% Direct Net Wages</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-neutral-dark tracking-tight leading-[1.15]">
              Cooperative Work, <br />
              <span className="text-coop-green">Fair Wages,</span> <br />
              Worker Power
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-text max-w-xl leading-relaxed">
              A digital marketplace owned by cooperatives. Designed for workers. Trusted by communities. Eliminating middleman commission exploitation while delivering certified, guaranteed craftsmanship.
            </p>

            {/* 2 CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* CTA 1: Join as Worker (green button) */}
              <Link
                href="/auth/signup?role=worker"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-coop-green hover:bg-forest-green shadow-coop hover:shadow-coop-lg transition-all text-base group"
              >
                <span>Join as Worker</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* CTA 2: Book Service (white button, green border) */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-coop-green bg-white border-2 border-coop-green hover:bg-sage-green/10 transition-all text-base shadow-sm"
              >
                <span>Book Service</span>
              </Link>
            </div>

            {/* Mini Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-coop-green shrink-0" />
                <span className="text-xs font-medium text-gray-text">Certified Guilds</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-coop-green shrink-0" />
                <span className="text-xs font-medium text-gray-text">Health Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-coop-green shrink-0" />
                <span className="text-xs font-medium text-gray-text">48-Hr Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column (50%): Hero image (diverse workers in action) */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Visual Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000"
                  alt="Cooperative electrician and service professionals working on modern home installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Image caption badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold tracking-wider uppercase text-sage-green">Master Electrician Guild</p>
                  <p className="text-sm font-bold">Sunita Sharma & Team • South Delhi Chapter</p>
                </div>
              </div>

              {/* Floating Stat Card 1: 80% Direct Wage */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3.5 max-w-[210px] animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-coop-green/15 text-coop-green flex items-center justify-center font-bold text-lg">
                  80%
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-dark leading-tight">Direct Net Pay</p>
                  <p className="text-[11px] text-gray-text">Zero predatory cut</p>
                </div>
              </div>

              {/* Floating Stat Card 2: 500+ Cooperatives */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3.5 max-w-[230px]">
                <div className="w-10 h-10 rounded-xl bg-soft-teal/20 text-forest-green flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-coop-green" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-dark leading-tight">Peer Tribunal</p>
                  <p className="text-[11px] text-gray-text">Fair dispute resolution</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
