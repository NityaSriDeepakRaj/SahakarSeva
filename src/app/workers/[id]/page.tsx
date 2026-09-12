'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { WORKERS_DATA, BOOKINGS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  Users, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  HeartHandshake 
} from 'lucide-react';
import BookingModal from '@/components/booking/BookingModal';

export default function WorkerProfilePage() {
  const params = useParams();
  const workerId = params?.id as string;

  const worker = WORKERS_DATA.find((w) => w.id === workerId) || WORKERS_DATA[0];
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Reviews for this worker
  const reviews = BOOKINGS_DATA.filter((b) => b.workerId === worker.id && b.ratingGiven);

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Back button */}
      <Link
        href="/workers"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-text hover:text-coop-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Worker Directory
      </Link>

      {/* Main Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <img
            src={worker.profilePhotoUrl}
            alt={worker.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-sage-green shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-dark">
                {worker.fullName}
              </h1>
              <span className="text-xs font-bold text-coop-green bg-sage-green/20 px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tier {worker.verifiedStatus} Verified Guild
              </span>
            </div>

            <p className="text-sm font-semibold text-gray-600 mt-1">
              {worker.trade} • {worker.experienceLevel} Experience
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-text mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                {worker.location}
              </span>
              <span className="flex items-center gap-1 text-warning font-bold">
                <Star className="w-4 h-4 fill-warning stroke-warning" />
                {worker.rating} ({worker.totalJobsCompleted} Completed)
              </span>
              <span className="flex items-center gap-1 text-forest-green font-semibold">
                <Users className="w-4 h-4 text-coop-green" />
                {worker.communityVouchesCount} Community Vouches
              </span>
            </div>
          </div>
        </div>

        {/* Action Button & Rate */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block sm:text-right">Democratically Set Rate</span>
            <p className="font-mono font-black text-2xl text-neutral-dark sm:text-right">
              {formatINR(worker.minRate)}/hr
            </p>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-6 py-3 rounded-xl bg-coop-green hover:bg-forest-green text-white text-sm font-bold transition-all shadow-coop hover:shadow-coop-lg"
          >
            Direct Hire Worker
          </button>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Bio, Certifications, Customer Reviews */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Bio */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border-gray shadow-card space-y-3">
            <h3 className="font-heading font-bold text-lg text-neutral-dark">
              About & Trade Philosophy
            </h3>
            <p className="text-sm text-gray-text leading-relaxed">
              {worker.bio}
            </p>
          </div>

          {/* Certifications & Trade Skills */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border-gray shadow-card space-y-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-neutral-dark mb-3">
                Government & Guild Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {worker.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-light-gray border border-border-gray flex items-center gap-3">
                    <Award className="w-5 h-5 text-coop-green shrink-0" />
                    <span className="text-xs font-semibold text-neutral-dark">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-neutral-dark mb-3">
                Core Trade Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-sage-green/15 text-forest-green text-xs font-semibold border border-sage-green/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verified Customer Reviews Ledger */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border-gray shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-neutral-dark">
                Verified Customer Reviews & Vouches
              </h3>
              <span className="text-xs text-gray-text font-semibold">
                {reviews.length} Audited Reviews
              </span>
            </div>

            {reviews.length === 0 ? (
              <p className="text-xs text-gray-text py-4">No reviews recorded yet for this worker profile.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-light-gray border border-border-gray space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-neutral-dark">{r.customerName}</span>
                        <span className="text-[10px] text-gray-400">({r.location})</span>
                      </div>
                      <div className="flex items-center gap-1 text-warning">
                        {[...Array(r.ratingGiven || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-warning stroke-warning" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      &ldquo;{r.reviewComment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4 cols): Cooperative Security & Direct Hire Guarantee */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-forest-green to-coop-green text-white p-6 rounded-3xl shadow-coop space-y-4">
            <h4 className="font-heading font-bold text-lg text-white">
              The Cooperative Guarantee
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              When you hire {worker.fullName}, 80% of your fee is held in escrow and paid directly to their account upon successful completion. Zero middleman agency exploitation.
            </p>
            <ul className="space-y-2 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-green" />
                <span>Zero cancellation penalty before arrival</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-green" />
                <span>₹5 Lakh accidental damage coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-green" />
                <span>48-Hour free satisfaction re-service</span>
              </li>
            </ul>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-sage-green text-forest-green text-xs font-bold transition-all shadow-md mt-2"
            >
              Book {worker.fullName.split(' ')[0]} Now
            </button>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          worker={worker}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
