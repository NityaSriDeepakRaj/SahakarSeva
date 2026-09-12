'use client';

import React, { useState } from 'react';
import { ServiceItem, WorkerProfile } from '@/types';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import { X, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  service?: ServiceItem;
  worker?: WorkerProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingModal({ service, worker, isOpen, onClose, onSuccess }: BookingModalProps) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('10:00 AM');
  const [address, setAddress] = useState(user?.address || '14, Golf Links, New Delhi');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const basePrice = service ? service.basePrice : worker ? worker.minRate * 3 : 1500;
  const workerNet = Math.round(basePrice * 0.8);
  const insurance = Math.round(basePrice * 0.05);
  const coopOverhead = Math.round(basePrice * 0.10);
  const platform = Math.round(basePrice * 0.05);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        'Booking Confirmed!',
        `Your booking has been dispatched to ${worker?.fullName || 'the certified guild collective'}. 80% direct net wage held in escrow.`,
        'success'
      );
      onClose();
      if (onSuccess) onSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-border-gray">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-forest-green to-coop-green text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sage-green">
              Cooperative Booking
            </span>
            <h3 className="font-heading font-extrabold text-xl text-white">
              {service?.title || `Hire ${worker?.fullName}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-neutral-dark">
          
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                    Scheduled Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-border-gray text-xs focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border-gray text-xs focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
                  >
                    <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                  Service Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Flat No., Society / Locality"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border-gray text-xs focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                  Special Notes or Access Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please bring extra 16A industrial modular switches, gate pass required at entrance..."
                  className="w-full p-3 rounded-xl border border-border-gray text-xs focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Review Wage Transparency Breakdown</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Wage Transparency Breakdown */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sage-green/15 border border-sage-green/30 text-xs">
                <div className="flex items-center gap-2 text-forest-green font-bold mb-2">
                  <ShieldCheck className="w-4 h-4 text-coop-green" />
                  <span>The Sahayak Seva Fair Wage Pledge</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Unlike corporate platforms that retain 35% in hidden fees, your payment is transparently distributed as follows:
                </p>
              </div>

              {/* Breakdown Ledger Table */}
              <div className="rounded-2xl border border-border-gray overflow-hidden divide-y divide-gray-100 text-xs">
                <div className="p-3 bg-light-gray flex justify-between font-bold text-neutral-dark">
                  <span>Gross Quotation (100%)</span>
                  <span className="font-mono text-sm">{formatINR(basePrice)}</span>
                </div>
                <div className="p-3 flex justify-between bg-white text-coop-green font-extrabold">
                  <span>Worker Direct Net Wages (80%)</span>
                  <span className="font-mono text-sm">{formatINR(workerNet)}</span>
                </div>
                <div className="p-3 flex justify-between bg-white text-gray-600">
                  <span>Health & Accident Insurance Pool (5%)</span>
                  <span className="font-mono">{formatINR(insurance)}</span>
                </div>
                <div className="p-3 flex justify-between bg-white text-gray-600">
                  <span>Coop Guild Overhead & Tool Depot (10%)</span>
                  <span className="font-mono">{formatINR(coopOverhead)}</span>
                </div>
                <div className="p-3 flex justify-between bg-white text-gray-600">
                  <span>Platform Operations & Servers (5%)</span>
                  <span className="font-mono">{formatINR(platform)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl border border-border-gray hover:bg-gray-100 text-xs font-bold text-neutral-dark"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirm}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-coop-green hover:bg-forest-green shadow-coop flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming Dispatch...' : `Confirm & Book (${formatINR(basePrice)})`}
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
