'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA, WORKERS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Star, 
  Users, 
  Sparkles, 
  Award, 
  Clock, 
  HeartHandshake 
} from 'lucide-react';
import BookingModal from '@/components/booking/BookingModal';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params?.id as string;

  const service = SERVICES_DATA.find((s) => s.id === serviceId || s.slug === serviceId) || SERVICES_DATA[0];
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Relevant certified workers
  const matchingWorkers = WORKERS_DATA.slice(0, 3);

  const basePrice = service.basePrice;
  const workerNet = Math.round(basePrice * 0.8);
  const insurance = Math.round(basePrice * 0.05);
  const coopOverhead = Math.round(basePrice * 0.10);
  const platform = Math.round(basePrice * 0.05);

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-text hover:text-coop-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services Catalog
      </Link>

      {/* Hero Service Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Visual (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-gray-100 border border-border-gray">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-coop-green text-white shadow-sm">
                {service.category} Guild
              </span>
            </div>
          </div>

          {/* Included Features */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card space-y-4">
            <h3 className="font-heading font-bold text-xl text-neutral-dark">
              What&apos;s Included in this Cooperative Service
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {service.includedFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-dark">
                  <CheckCircle2 className="w-4 h-4 text-coop-green shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="p-6 rounded-3xl bg-sage-green/20 border border-sage-green/40 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-forest-green shrink-0 mt-1" />
            <div>
              <h4 className="font-heading font-bold text-base text-forest-green">
                48-Hour Guild Quality Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                If the craftsmanship does not meet agreed guild standards, an elected chapter supervisor will inspect and rectify the work within 48 hours at zero extra charge.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400 block mb-1">
                Standard Guild Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-3xl sm:text-4xl text-neutral-dark">
                  {formatINR(service.basePrice)}
                </span>
                <span className="text-sm font-semibold text-gray-text">
                  /{service.priceUnit}
                </span>
              </div>
              <p className="text-xs text-forest-green font-bold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero commission markup • 80% to worker
              </p>
            </div>

            <div className="border-t border-b border-gray-100 py-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Transparent 80/5/10/5 Allocation:
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-coop-green">
                  <span>Worker Direct Net (80%)</span>
                  <span className="font-mono">{formatINR(workerNet)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Health & Accident Insurance (5%)</span>
                  <span className="font-mono">{formatINR(insurance)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Cooperative Overhead (10%)</span>
                  <span className="font-mono">{formatINR(coopOverhead)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform Operations (5%)</span>
                  <span className="font-mono">{formatINR(platform)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-4 px-6 rounded-2xl font-heading font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop hover:shadow-coop-lg transition-all text-base flex items-center justify-center gap-2"
            >
              <span>Book This Service Now</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-text pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-coop-green" />
                Same-day dispatch
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-coop-green" />
                Vouched professionals
              </span>
            </div>
          </div>

          {/* Matching Workers Preview */}
          <div className="bg-white rounded-3xl p-6 border border-border-gray shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-neutral-dark">
                Available Guild Craftsmen
              </h4>
              <Link href="/workers" className="text-xs font-bold text-coop-green hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {matchingWorkers.map((wrk) => (
                <Link
                  key={wrk.id}
                  href={`/workers/${wrk.id}`}
                  className="p-3 rounded-2xl border border-border-gray hover:border-coop-green transition-all flex items-center gap-3 bg-light-gray group"
                >
                  <img
                    src={wrk.profilePhotoUrl}
                    alt={wrk.fullName}
                    className="w-11 h-11 rounded-xl object-cover border border-sage-green"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-xs text-neutral-dark group-hover:text-coop-green transition-colors truncate">
                      {wrk.fullName}
                    </p>
                    <p className="text-[11px] text-gray-text">{wrk.trade}</p>
                    <div className="flex items-center gap-1 text-warning text-[10px] mt-0.5">
                      <Star className="w-3 h-3 fill-warning stroke-warning" />
                      <span className="font-bold text-neutral-dark">{wrk.rating}</span>
                      <span className="text-gray-400">({wrk.totalJobsCompleted} jobs)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          service={service}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
