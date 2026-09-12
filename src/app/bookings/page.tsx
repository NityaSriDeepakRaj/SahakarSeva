'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BOOKINGS_DATA } from '@/lib/data';
import { formatINR, formatDate } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  X, 
  Download,
  AlertCircle
} from 'lucide-react';
import { BookingStatus } from '@/types';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [bookings, setBookings] = useState(BOOKINGS_DATA);
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const { showToast } = useToast();

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter((b) => b.status === activeTab);

  const handleCancel = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
    showToast('Booking Cancelled', 'Booking # ' + id + ' has been cancelled with 100% refund.', 'info');
  };

  const handleDownloadInvoice = (id: string) => {
    showToast('Invoice Downloaded', 'GST & Cooperative Audit Receipt #' + id + ' saved.', 'success');
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingBookingId) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === ratingBookingId
          ? { ...b, ratingGiven: ratingStars, reviewComment: ratingComment }
          : b
      )
    );

    showToast('Vouch Recorded', 'Thank you for supporting community worker dignity!', 'success');
    setRatingBookingId(null);
    setRatingComment('');
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
            Transparent Dispatch History
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
            My Cooperative Bookings
          </h1>
          <p className="text-sm text-gray-text mt-1">
            Track active home appointments, download audited invoices, and vouch for workers.
          </p>
        </div>

        <Link
          href="/services"
          className="px-5 py-2.5 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-coop self-start sm:self-auto"
        >
          + Book New Service
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border-gray overflow-x-auto pb-2 sm:pb-0">
        {[
          { id: 'all', label: 'All Bookings' },
          { id: 'accepted', label: 'Upcoming' },
          { id: 'in-progress', label: 'In-Progress' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-coop-green text-coop-green'
                : 'border-transparent text-gray-500 hover:text-neutral-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-light-gray rounded-3xl border border-border-gray">
            <p className="text-sm text-gray-500">No bookings found in this category.</p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-border-gray shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <img
                  src={b.workerPhoto}
                  alt={b.workerName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-sage-green shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-gray-400">
                      #{b.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        b.status === 'completed'
                          ? 'bg-success/15 text-success'
                          : b.status === 'in-progress'
                          ? 'bg-card-blue/15 text-card-blue'
                          : b.status === 'cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-warning/15 text-warning'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-dark mt-1">
                    {b.serviceTitle}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Assigned Master: <strong className="text-neutral-dark">{b.workerName}</strong> ({b.workerTrade})
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-text mt-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(b.scheduledDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {b.scheduledTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="line-clamp-1 max-w-[200px]">{b.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="flex sm:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div className="md:text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Amount</span>
                  <p className="font-mono font-black text-xl text-neutral-dark">
                    {formatINR(b.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadInvoice(b.id)}
                    className="p-2 rounded-xl border border-border-gray hover:bg-gray-100 text-gray-600 transition-colors"
                    title="Download GST & Wage Breakdown Invoice"
                    aria-label="Download Invoice"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {b.status === 'accepted' && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-3.5 py-1.5 rounded-xl border border-border-gray hover:bg-red-50 text-xs font-bold text-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  )}

                  {b.status === 'completed' && !b.ratingGiven && (
                    <button
                      onClick={() => setRatingBookingId(b.id)}
                      className="px-4 py-1.5 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Rate & Vouch
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rating Modal */}
      {ratingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-border-gray">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-neutral-dark">
                Rate & Vouch for Worker
              </h3>
              <button
                onClick={() => setRatingBookingId(null)}
                className="p-1 text-gray-400 hover:text-neutral-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-4">
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingStars(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= ratingStars ? 'fill-warning stroke-warning' : 'stroke-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                  Craftsmanship & Courtesy Feedback
                </label>
                <textarea
                  rows={3}
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share a few words about how the cooperative worker performed..."
                  className="w-full p-3 rounded-xl border border-border-gray text-xs focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRatingBookingId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border-gray text-xs font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-coop-green text-white text-xs font-bold shadow-coop hover:bg-forest-green"
                >
                  Submit Vouch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
