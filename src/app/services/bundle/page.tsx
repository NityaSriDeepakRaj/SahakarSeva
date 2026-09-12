'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { BUNDLES_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { CheckCircle2, Tag, TrendingUp, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function BundlePage() {
  const { showToast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);

  const bundle = BUNDLES_DATA.find(b => b.id === selected);

  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          USP 5 — Smart Bundling
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Multi-Service Bundles
        </h1>
        <p className="text-sm text-gray-text mt-1">
          AI-detected service clusters. Book related services together and save up to 15%.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          <strong>How it works:</strong> Our system analyzes 50,000+ booking patterns across our cooperative network to identify services commonly booked together — and negotiates a group rate, passing 100% of the savings to you.
        </p>
      </div>

      {/* Bundle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUNDLES_DATA.map(bundle => (
          <button
            key={bundle.id}
            onClick={() => setSelected(bundle.id === selected ? null : bundle.id)}
            className={`text-left rounded-3xl border-2 p-6 space-y-4 transition-all duration-300 ${selected === bundle.id ? 'border-coop-green shadow-coop bg-sage-green/5' : 'border-border-gray bg-white shadow-card hover:border-coop-green/50'}`}
          >
            {/* Discount badge */}
            <div className="flex items-center justify-between">
              <span className="bg-coop-green text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" /> {bundle.discountPercent}% OFF
              </span>
              {selected === bundle.id && <CheckCircle2 className="w-6 h-6 text-coop-green" />}
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-neutral-dark">{bundle.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{bundle.description}</p>
            </div>

            <div className="space-y-1">
              {bundle.services.map(s => (
                <div key={s} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-coop-green shrink-0" />
                  {s}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border-gray">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-2xl text-coop-green">{formatINR(bundle.totalPrice)}</span>
                <span className="text-sm text-gray-400 line-through">{formatINR(bundle.originalPrice)}</span>
              </div>
              <p className="text-xs text-coop-green font-semibold mt-0.5">
                You save {formatINR(bundle.originalPrice - bundle.totalPrice)}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <TrendingUp className="w-3.5 h-3.5" />
              {bundle.popularityPercent}% of customers book this combo
            </div>
          </button>
        ))}
      </div>

      {/* Selected Bundle CTA */}
      {bundle && (
        <div className="bg-white rounded-3xl border-2 border-coop-green shadow-coop p-6 sm:p-8 space-y-5">
          <h3 className="font-heading font-bold text-xl text-neutral-dark">You selected: {bundle.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-400">Original Price</p>
              <p className="font-heading font-bold text-lg text-gray-400 line-through">{formatINR(bundle.originalPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Bundle Discount</p>
              <p className="font-heading font-bold text-lg text-red-500">-{bundle.discountPercent}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">You Save</p>
              <p className="font-heading font-bold text-lg text-coop-green">{formatINR(bundle.originalPrice - bundle.totalPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Bundle Price</p>
              <p className="font-heading font-black text-2xl text-neutral-dark">{formatINR(bundle.totalPrice)}</p>
            </div>
          </div>
          <Link
            href="/bookings/create"
            className="inline-flex items-center gap-2 bg-coop-green hover:bg-forest-green text-white font-bold px-8 py-3.5 rounded-2xl shadow-coop transition-colors"
          >
            Book Bundle <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {!bundle && (
        <div className="text-center py-8 text-gray-400 text-sm">
          Select a bundle above to see savings details and proceed to booking.
        </div>
      )}
    </div>
  );
}
