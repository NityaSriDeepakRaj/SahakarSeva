'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { BOOKINGS_DATA, SERVICES_DATA, WORKERS_DATA } from '@/lib/data';
import { formatINR, formatDate } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  Plus, 
  X, 
  CheckCircle2, 
  Search,
  Sparkles
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [bookings, setBookings] = useState(BOOKINGS_DATA);
  const [ratingModalBookingId, setRatingModalBookingId] = useState<string | null>(null);
  const [selectedStars, setSelectedStars] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newUpiId, setNewUpiId] = useState('');

  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
    showToast('Booking Cancelled', 'Your booking was cancelled with 100% full refund.', 'info');
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingModalBookingId) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === ratingModalBookingId
          ? { ...b, ratingGiven: selectedStars, reviewComment: ratingComment }
          : b
      )
    );

    showToast('Review Submitted', 'Thank you for supporting cooperative worker dignity!', 'success');
    setRatingModalBookingId(null);
    setRatingComment('');
  };

  const upcomingBookings = bookings.filter((b) => b.status === 'accepted' || b.status === 'pending');
  const pastBookings = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-green to-coop-green text-white rounded-3xl p-6 sm:p-8 shadow-coop flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sage-green text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-sage-green" />
            Verified Customer Member
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Welcome, {user?.fullName || 'Rahul Verma'}!
          </h1>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            14, Golf Links, New Delhi • Supporting neighborhood cooperative workers with fair living wages.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex items-center gap-5 self-start md:self-auto">
          <div>
            <p className="text-xs text-sage-green font-semibold uppercase tracking-wider">Bookings This Month</p>
            <p className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              4 Services
            </p>
            <p className="text-[11px] text-sage-green mt-0.5">100% Guild Certified</p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div>
            <p className="text-xs text-sage-green font-semibold uppercase tracking-wider">Coop Equity Contributed</p>
            <p className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              ₹840
            </p>
            <p className="text-[11px] text-white/70 mt-0.5">Direct to health pools</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/services"
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-coop-green/15 text-coop-green flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Browse Services</p>
            <p className="text-[11px] text-gray-text">8 Trade categories</p>
          </div>
        </Link>

        <Link
          href="/bookings"
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-card-blue/15 text-card-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">My Bookings</p>
            <p className="text-[11px] text-gray-text">Track & manage</p>
          </div>
        </Link>

        <Link
          href="/workers"
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-card-purple/15 text-card-purple flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Saved Workers</p>
            <p className="text-[11px] text-gray-text">Favorite guilds</p>
          </div>
        </Link>

        <button
          onClick={() => setShowAddPaymentModal(true)}
          className="p-3.5 rounded-2xl bg-white border border-border-gray hover:border-coop-green hover:shadow-card transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-soft-teal/15 text-soft-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-dark">Payment Methods</p>
            <p className="text-[11px] text-gray-text">UPI & zero surcharge</p>
          </div>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Upcoming & Recent Bookings */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border-gray shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-neutral-dark">
                  Upcoming Scheduled Visits
                </h3>
                <p className="text-xs text-gray-text">Active appointments with 1-tap reschedule</p>
              </div>
              <span className="text-xs font-bold text-coop-green bg-sage-green/20 px-2.5 py-1 rounded-full">
                {upcomingBookings.length} Active
              </span>
            </div>

            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">No appointments scheduled.</p>
                <Link href="/services" className="inline-block mt-2 text-xs font-bold text-coop-green hover:underline">
                  Browse services and book a certified guild worker
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 sm:p-5 rounded-2xl border border-border-gray bg-light-gray flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={b.workerPhoto}
                        alt={b.workerName}
                        className="w-12 h-12 rounded-xl object-cover border border-sage-green"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm text-neutral-dark">
                            {b.serviceTitle}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-card-blue/10 text-card-blue">
                            {b.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Assigned: <strong className="text-neutral-dark">{b.workerName}</strong> ({b.workerTrade})
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-text mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {formatDate(b.scheduledDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {b.scheduledTime}
                          </span>
                          <span className="font-mono font-bold text-coop-green">
                            {formatINR(b.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="px-3 py-1.5 rounded-xl border border-border-gray hover:bg-red-50 text-xs font-semibold text-red-600 transition-colors"
                      >
                        1-Tap Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Bookings & Rating Prompt */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border-gray shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-neutral-dark">
                  Recent Completed Bookings
                </h3>
                <p className="text-xs text-gray-text">Vouch for worker craftsmanship and dignity</p>
              </div>
            </div>

            <div className="space-y-4">
              {pastBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 sm:p-5 rounded-2xl border border-border-gray hover:border-gray-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={b.workerPhoto}
                      alt={b.workerName}
                      className="w-12 h-12 rounded-xl object-cover border border-sage-green"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-neutral-dark">
                        {b.serviceTitle}
                      </h4>
                      <p className="text-xs text-gray-text mt-0.5">
                        Worker: <strong className="text-neutral-dark">{b.workerName}</strong> on {formatDate(b.scheduledDate)}
                      </p>
                      {b.ratingGiven ? (
                        <div className="flex items-center gap-1 text-warning text-xs mt-1.5">
                          {[...Array(b.ratingGiven)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-warning stroke-warning" />
                          ))}
                          <span className="text-xs text-gray-text ml-1.5 font-medium">
                            &ldquo;{b.reviewComment || 'Excellent cooperative service!'}&rdquo;
                          </span>
                        </div>
                      ) : (
                        <p className="text-xs text-forest-green font-semibold mt-1">
                          Awaiting your satisfaction vouch
                        </p>
                      )}
                    </div>
                  </div>

                  {!b.ratingGiven && (
                    <button
                      onClick={() => setRatingModalBookingId(b.id)}
                      className="px-4 py-2 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-center"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Rate Service
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Recommended Services & Saved Payment */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recommended Services based on history */}
          <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-coop-green" />
              <h3 className="font-heading font-bold text-base text-neutral-dark">
                Recommended For You
              </h3>
            </div>
            
            <div className="space-y-3">
              {SERVICES_DATA.slice(0, 3).map((srv) => (
                <div
                  key={srv.id}
                  className="p-3.5 rounded-2xl border border-border-gray hover:border-coop-green transition-all bg-light-gray flex items-center gap-3"
                >
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-xs text-neutral-dark truncate">
                      {srv.title}
                    </p>
                    <p className="text-[11px] text-gray-text mt-0.5">
                      {formatINR(srv.basePrice)} <span className="text-[10px]">/{srv.priceUnit}</span>
                    </p>
                    <Link
                      href={`/services/${srv.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-coop-green hover:underline mt-1"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods Card */}
          <div className="bg-white p-6 rounded-3xl border border-border-gray shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-neutral-dark">
                Saved Payment Methods
              </h3>
              <button
                onClick={() => setShowAddPaymentModal(true)}
                className="text-xs font-bold text-coop-green hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl border border-coop-green/40 bg-sage-green/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-coop-green text-white flex items-center justify-center font-bold text-[10px]">
                    UPI
                  </div>
                  <div>
                    <p className="font-bold text-neutral-dark">rahul.verma@okhdfcbank</p>
                    <p className="text-[10px] text-gray-400">Default Instant Payout Method</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-coop-green">PRIMARY</span>
              </div>

              <div className="p-3 rounded-xl border border-border-gray bg-light-gray flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-bold text-neutral-dark">HDFC Bank Visa ending 4129</p>
                    <p className="text-[10px] text-gray-400">Expires 09/28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Rating Modal */}
      {ratingModalBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-border-gray">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-neutral-dark">
                Rate Service & Vouch for Worker
              </h3>
              <button
                onClick={() => setRatingModalBookingId(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-neutral-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRateSubmit} className="space-y-4">
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedStars(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= selectedStars
                          ? 'fill-warning stroke-warning'
                          : 'stroke-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                  Worker Craftsmanship & Safety Feedback
                </label>
                <textarea
                  rows={3}
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share a few words about the quality, punctuality, and professionalism..."
                  className="w-full p-3 rounded-xl border border-border-gray text-xs focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRatingModalBookingId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border-gray text-xs font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold shadow-coop"
                >
                  Submit Vouch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-border-gray">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-neutral-dark">
                Add Instant UPI VPA
              </h3>
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-neutral-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-gray-text">
                UPI payments incur 0% gateway commission, allowing 100% of the funds to go directly to cooperative accounts and worker net payouts.
              </p>
              <div>
                <label className="block font-bold uppercase text-neutral-dark mb-1">
                  UPI Virtual Payment Address (VPA)
                </label>
                <input
                  type="text"
                  value={newUpiId}
                  onChange={(e) => setNewUpiId(e.target.value)}
                  placeholder="e.g. yourname@oksbi or mobile@upi"
                  className="w-full p-3 rounded-xl border border-border-gray text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border-gray font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (newUpiId) {
                      showToast('UPI Saved', 'Zero-commission payment method linked', 'success');
                      setShowAddPaymentModal(false);
                      setNewUpiId('');
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-coop-green text-white font-bold hover:bg-forest-green"
                >
                  Save UPI ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
