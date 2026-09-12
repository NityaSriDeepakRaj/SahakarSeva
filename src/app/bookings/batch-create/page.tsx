'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { BATCH_BOOKINGS_DATA, SERVICES_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Users, Tag, Plus, X, CheckCircle2, MapPin, Calendar, Info, ArrowRight } from 'lucide-react';

const DEFAULT_HOUSEHOLDS = [
  { address: '', serviceType: 'Deep Cleaning', preferredTime: '9:00 AM' },
];

const TIME_OPTS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const SERVICE_OPTS = ['Deep Cleaning', 'AC Service', 'Plumbing Inspection', 'Pest Control', 'Electrical Safety Check'];

export default function BatchBookingPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [societyName, setSocietyName] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [households, setHouseholds] = useState(DEFAULT_HOUSEHOLDS);
  const [submitted, setSubmitted] = useState(false);

  const addHousehold = () => {
    setHouseholds(prev => [...prev, { address: '', serviceType: 'Deep Cleaning', preferredTime: '9:00 AM' }]);
  };

  const removeHousehold = (i: number) => {
    setHouseholds(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateHousehold = (i: number, field: string, value: string) => {
    setHouseholds(prev => prev.map((h, idx) => idx === i ? { ...h, [field]: value } : h));
  };

  const individualCost = 1000;
  const discount = households.length >= 5 ? 15 : households.length >= 3 ? 10 : households.length >= 2 ? 5 : 0;
  const totalOriginal = households.length * individualCost;
  const totalDiscounted = Math.round(totalOriginal * (1 - discount / 100));

  const handleSubmit = () => {
    if (!societyName || !scheduledDate || households.some(h => !h.address)) {
      showToast('Missing Information', 'Please fill in society name, date, and all household addresses.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Batch Booking Created! 🎉', `${households.length} households scheduled for ${scheduledDate}. Workers will confirm within 2 hours.`, 'success');
    setTimeout(() => router.push('/bookings'), 2000);
  };

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          USP 4 — Neighborhood Pooling
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          RWA / Batch Booking
        </h1>
        <p className="text-sm text-gray-text mt-1">
          Coordinate multiple households in your society for the same day. The more households, the bigger the group discount.
        </p>
      </div>

      {/* Savings Calculator */}
      <div className="bg-gradient-to-br from-coop-green to-forest-green rounded-3xl p-6 sm:p-8 text-white">
        <h3 className="font-heading font-bold text-lg mb-4">Group Savings Calculator</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '2 households', discount: '5% off' },
            { label: '3-4 households', discount: '10% off' },
            { label: '5+ households', discount: '15% off' },
            { label: '10+ households', discount: '20% off' },
          ].map(tier => (
            <div key={tier.label} className={`bg-white/15 rounded-2xl p-3 text-center ${households.length >= parseInt(tier.label) ? 'ring-2 ring-white' : ''}`}>
              <p className="text-xs text-green-200">{tier.label}</p>
              <p className="font-heading font-black text-lg">{tier.discount}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 items-center">
          <div>
            <p className="text-green-200 text-xs">Current households</p>
            <p className="font-heading font-black text-3xl">{households.length}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-green-300" />
          <div>
            <p className="text-green-200 text-xs">Your discount</p>
            <p className="font-heading font-black text-3xl">{discount}% OFF</p>
          </div>
          <ArrowRight className="w-5 h-5 text-green-300" />
          <div>
            <p className="text-green-200 text-xs">You save</p>
            <p className="font-heading font-black text-3xl">{formatINR(totalOriginal - totalDiscounted)}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Society / Complex Name</label>
            <input value={societyName} onChange={e => setSocietyName(e.target.value)} placeholder="e.g. Riverside Residency" className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Service Date</label>
            <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-neutral-dark">Households ({households.length})</h3>
            <button onClick={addHousehold} className="flex items-center gap-1.5 text-xs font-bold text-coop-green bg-sage-green/20 px-3 py-1.5 rounded-full hover:bg-sage-green/30 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Household
            </button>
          </div>

          <div className="space-y-3">
            {households.map((h, i) => (
              <div key={i} className="flex gap-3 items-start bg-light-gray rounded-2xl p-4">
                <div className="w-6 h-6 rounded-full bg-coop-green text-white text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                  {i + 1}
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input value={h.address} onChange={e => updateHousehold(i, 'address', e.target.value)} placeholder="Flat no. / house address" className="sm:col-span-1 border border-border-gray rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-coop-green bg-white" />
                  <select value={h.serviceType} onChange={e => updateHousehold(i, 'serviceType', e.target.value)} className="border border-border-gray rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-coop-green bg-white">
                    {SERVICE_OPTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <select value={h.preferredTime} onChange={e => updateHousehold(i, 'preferredTime', e.target.value)} className="border border-border-gray rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-coop-green bg-white">
                    {TIME_OPTS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                {households.length > 1 && (
                  <button onClick={() => removeHousehold(i)} className="text-gray-400 hover:text-red-500 transition-colors mt-2">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-sage-green/10 rounded-2xl p-5 border border-coop-green/20">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-xs text-gray-400">Total Households</p>
              <p className="font-heading font-black text-2xl text-neutral-dark">{households.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Group Discount</p>
              <p className="font-heading font-black text-2xl text-coop-green">{discount}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total (after discount)</p>
              <p className="font-heading font-black text-2xl text-neutral-dark">{formatINR(totalDiscounted)}</p>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full bg-coop-green hover:bg-forest-green text-white font-bold py-4 rounded-2xl shadow-coop transition-colors text-base">
          Submit Batch Booking Request →
        </button>
      </div>

      {/* Existing batch bookings */}
      <div>
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-4">Your Active Batch Bookings</h3>
        {BATCH_BOOKINGS_DATA.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-border-gray shadow-card p-5 flex items-center justify-between">
            <div>
              <p className="font-bold text-neutral-dark">{b.societyName}</p>
              <p className="text-xs text-gray-500">{b.totalHouseholds} households · {b.scheduledDate}</p>
            </div>
            <div className="text-right">
              <p className="font-heading font-bold text-coop-green">{formatINR(b.totalCost)}</p>
              <p className="text-xs text-gray-400">Saved {formatINR(b.individualCost - b.totalCost / b.totalHouseholds)} per flat</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
