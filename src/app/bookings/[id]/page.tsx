'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { BOOKINGS_DATA, WAGE_LEDGER_DATA } from '@/lib/data';
import { formatINR, formatDate } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import {
  CheckCircle2, Clock, MapPin, Star, Phone, MessageSquare, Download,
  ChevronDown, ChevronUp, ShieldAlert, X, XCircle, AlertTriangle
} from 'lucide-react';

const STATUS_STEPS = ['pending', 'accepted', 'en-route', 'in-progress', 'completed'];
const STATUS_LABELS: Record<string, string> = {
  pending: 'Awaiting Acceptance',
  accepted: 'Worker Confirmed',
  'en-route': 'Worker En Route',
  'in-progress': 'Service In Progress',
  completed: 'Completed',
};

export default function BookingDetailPage() {
  const params = useParams();
  const { showToast } = useToast();
  const booking = BOOKINGS_DATA?.[0]; // Use first booking as demo

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [serviceRating, setServiceRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  if (!booking) return <div className="p-10 text-center text-gray-400">Booking not found.</div>;

  const ledger = WAGE_LEDGER_DATA?.[0];
  const currentStepIndex = STATUS_STEPS.indexOf(booking.status === 'in-progress' ? 'in-progress' : booking.status);

  const handleSubmitReview = () => {
    if (!serviceRating) return;
    setReviewSubmitted(true);
    showToast('Review Submitted ✓', 'Thank you! Your feedback helps the worker and the community.', 'success');
  };

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-gray-400 font-mono">#{booking.id}</span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-dark mt-1">{booking.serviceTitle}</h1>
          <p className="text-sm text-gray-text mt-1">{booking.scheduledDate} · {booking.scheduledTime}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${booking.status === 'completed' ? 'bg-green-100 text-green-700' : booking.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {STATUS_LABELS[booking.status] || booking.status}
        </span>
      </div>

      {/* Status Stepper */}
      {booking.status !== 'cancelled' && (
        <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6">
          <h3 className="font-heading font-bold text-sm text-gray-400 uppercase mb-5">Booking Progress</h3>
          <div className="flex items-center">
            {STATUS_STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex flex-col items-center text-center ${i <= currentStepIndex ? 'text-coop-green' : 'text-gray-300'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i < currentStepIndex ? 'bg-coop-green border-coop-green text-white' : i === currentStepIndex ? 'border-coop-green text-coop-green bg-white' : 'border-gray-200 text-gray-300'}`}>
                    {i < currentStepIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-[10px] mt-1 font-semibold max-w-[60px] leading-tight">{STATUS_LABELS[s]}</span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < currentStepIndex ? 'bg-coop-green' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Worker Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border-gray shadow-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-neutral-dark">Your Worker</h3>
          <div className="flex items-center gap-4">
            <img src={booking.workerPhoto} alt={booking.workerName} className="w-16 h-16 rounded-2xl object-cover" />
            <div>
              <p className="font-heading font-bold text-lg text-neutral-dark">{booking.workerName}</p>
              <p className="text-xs text-gray-500">{booking.workerTrade}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs text-gray-600">4.8 rating · 312 jobs</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => showToast('Calling…', `Connecting to ${booking.workerName}…`, 'info')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
              <Phone className="w-4 h-4" /> Call
            </button>
            <button onClick={() => showToast('Chat Opening', 'Chat with your worker is launching…', 'info')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
              <MessageSquare className="w-4 h-4" /> Message
            </button>
          </div>

          {/* Booking Details */}
          <div className="border-t border-border-gray pt-4 space-y-3 text-sm">
            {[
              { icon: MapPin, label: 'Location', value: booking.location },
              { icon: Clock, label: 'Duration', value: `${booking.durationHours} hours` },
            ].map(row => (
              <div key={row.label} className="flex gap-3">
                <row.icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-gray-500">{row.label}:</span>
                <span className="font-semibold text-neutral-dark">{row.value}</span>
              </div>
            ))}
          </div>

          {/* SOS during active job */}
          {booking.status === 'in-progress' && (
            <button
              onClick={() => setShowSOS(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl py-3 flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-5 h-5" /> EMERGENCY SOS
            </button>
          )}

          {/* Cancel button */}
          {(booking.status === 'pending' || booking.status === 'accepted') && (
            <button onClick={() => showToast('Cancellation Requested', 'Your cancellation request has been sent. Refund in 3-5 business days.', 'warning')} className="w-full text-red-500 text-xs font-semibold hover:underline py-2">
              Cancel Booking
            </button>
          )}
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-neutral-dark">Payment</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${booking.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {booking.status === 'completed' ? 'Paid' : 'Pending'}
            </span>
          </div>
          <p className="font-heading font-black text-3xl text-neutral-dark">{formatINR(booking.price)}</p>

          <button
            onClick={() => setShowBreakdown(p => !p)}
            className="w-full flex items-center justify-between text-xs font-bold text-coop-green hover:underline"
          >
            View wage breakdown {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showBreakdown && ledger && (
            <div className="bg-sage-green/10 rounded-xl p-4 space-y-2 text-xs">
              {[
                { label: 'Worker Net (80%)', value: formatINR(ledger.workerNet), color: 'text-coop-green font-bold' },
                { label: 'Insurance Pool (5%)', value: formatINR(ledger.insuranceDeduction), color: 'text-soft-teal' },
                { label: 'Coop Overhead (10%)', value: formatINR(ledger.coopOverhead), color: 'text-card-purple' },
                { label: 'Platform (5%)', value: formatINR(ledger.platformProfit), color: 'text-gray-500' },
              ].map(row => (
                <div key={row.label} className="flex justify-between border-b border-coop-green/10 pb-1 last:border-0">
                  <span className="text-gray-600">{row.label}</span>
                  <span className={row.color}>{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {booking.status === 'completed' && (
            <button onClick={() => showToast('Invoice Downloaded', 'GST-compliant invoice saved as PDF.', 'success')} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
          )}
        </div>
      </div>

      {/* Review Section (only if completed) */}
      {booking.status === 'completed' && !reviewSubmitted && (
        <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8 space-y-6">
          <h3 className="font-heading font-bold text-lg text-neutral-dark">Rate Your Experience</h3>
          {[
            { label: 'Service Quality', state: serviceRating, setter: setServiceRating },
            { label: 'Safety Behaviour', state: safetyRating, setter: setSafetyRating },
          ].map(r => (
            <div key={r.label}>
              <p className="text-sm font-semibold text-gray-600 mb-2">{r.label}</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => r.setter(n)}>
                    <Star className={`w-7 h-7 transition-colors ${n <= r.state ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
          <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} maxLength={200} placeholder="Write a review (optional, max 200 chars)…" className="w-full border border-border-gray rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green resize-none" />
          <button onClick={handleSubmitReview} disabled={!serviceRating} className="px-6 py-3 rounded-2xl bg-coop-green text-white text-sm font-bold hover:bg-forest-green disabled:opacity-40 transition-colors shadow-coop">
            Submit Review
          </button>
        </div>
      )}

      {reviewSubmitted && (
        <div className="bg-sage-green/10 border border-coop-green/30 rounded-3xl p-6 flex gap-3">
          <CheckCircle2 className="w-6 h-6 text-coop-green shrink-0" />
          <div>
            <p className="font-bold text-coop-green">Review Submitted — Thank you!</p>
            <p className="text-xs text-gray-600 mt-1">Your feedback has been shared with {booking.workerName} and the cooperative community.</p>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {showSOS && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-5">
            <ShieldAlert className="w-14 h-14 text-red-500 mx-auto" />
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Send Emergency SOS?</h2>
            <p className="text-sm text-gray-text">This will immediately alert the federation safety team and your 3 peer buddies.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowSOS(false)} className="flex-1 py-3 rounded-2xl border border-border-gray text-sm font-semibold">Cancel</button>
              <button onClick={() => { setShowSOS(false); showToast('🚨 SOS Sent!', 'Safety team alerted. Help is on the way.', 'error'); }} className="flex-1 py-3 rounded-2xl bg-red-600 text-white text-sm font-bold">Send SOS</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
