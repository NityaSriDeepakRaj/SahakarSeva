'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { formatINR } from '@/lib/utils';
import { SERVICES_DATA, WORKERS_DATA } from '@/lib/data';
import {
  CheckCircle2, ChevronRight, ChevronLeft, Search, MapPin, Calendar,
  Clock, Star, Zap, IndianRupee, User, FileText, CreditCard, Shield
} from 'lucide-react';

const STEPS = ['Service', 'Worker', 'Date & Time', 'Location', 'Review', 'Payment'];

const TIME_SLOTS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

export default function BookingCreatePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isAsap, setIsAsap] = useState(false);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [searchWorker, setSearchWorker] = useState('');

  const service = SERVICES_DATA?.find((s: any) => s.id === selectedService);
  const worker = WORKERS_DATA?.find((w: any) => w.id === selectedWorker);

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedWorker;
    if (step === 2) return !!selectedDate && (!!selectedTime || isAsap);
    if (step === 3) return !!address;
    return true;
  };

  const handleConfirmBooking = () => {
    showToast('Booking Confirmed! 🎉', `Your ${service?.title || 'service'} booking is confirmed for ${selectedDate} at ${selectedTime}. Worker will confirm shortly.`, 'success');
    setTimeout(() => router.push('/bookings'), 1500);
  };

  const filteredWorkers = WORKERS_DATA?.filter((w: any) =>
    w.trade?.toLowerCase().includes(service?.category?.toLowerCase() || '') ||
    w.fullName?.toLowerCase().includes(searchWorker.toLowerCase())
  ) || [];

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-3xl text-neutral-dark">Book a Service</h1>
        <p className="text-sm text-gray-text mt-1">Transparent pricing · 80% goes directly to your worker</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 shrink-0 ${i <= step ? 'text-coop-green' : 'text-gray-300'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < step ? 'bg-coop-green border-coop-green text-white' : i === step ? 'border-coop-green text-coop-green bg-white' : 'border-gray-200 text-gray-300 bg-white'}`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-xs font-semibold hidden sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-1 min-w-[16px] ${i < step ? 'bg-coop-green' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8 min-h-[400px]">

        {/* Step 0: Select Service */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">What service do you need?</h2>
            <div className="flex items-center gap-3 bg-light-gray rounded-xl px-4 py-2.5 mb-4">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-600 font-semibold">Book ASAP — need help within the hour?</span>
              <button onClick={() => setIsAsap(p => !p)} className={`ml-auto px-3 py-1 rounded-full text-xs font-bold transition-colors ${isAsap ? 'bg-orange-500 text-white' : 'bg-white border border-border-gray text-gray-500'}`}>
                {isAsap ? '⚡ ON' : 'Enable'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(SERVICES_DATA || []).slice(0, 8).map((s: any) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${selectedService === s.id ? 'border-coop-green bg-sage-green/5' : 'border-border-gray hover:border-coop-green/50'}`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-dark">{s.title}</p>
                    <p className="text-xs text-gray-500">From {formatINR(s.basePrice)}/{s.priceUnit}</p>
                  </div>
                  {selectedService === s.id && <CheckCircle2 className="w-5 h-5 text-coop-green ml-auto shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Select Worker */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Choose your worker</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by name…" value={searchWorker} onChange={e => setSearchWorker(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-sm border border-border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-coop-green" />
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredWorkers.slice(0, 6).map((w: any) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWorker(w.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${selectedWorker === w.id ? 'border-coop-green bg-sage-green/5' : 'border-border-gray hover:border-coop-green/50'}`}
                >
                  <img src={w.profilePhotoUrl} alt={w.fullName} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-dark">{w.fullName}</p>
                    <p className="text-xs text-gray-500">{w.trade} · {w.experienceLevel}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-600">{w.rating} · {w.totalJobsCompleted} jobs</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-coop-green">{formatINR(w.avgHourlyRate)}/hr</p>
                    {w.womenWorker && <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">Women ♀</span>}
                  </div>
                  {selectedWorker === w.id && <CheckCircle2 className="w-5 h-5 text-coop-green shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">When do you need the service?</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Select Time Slot</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${selectedTime === t ? 'bg-coop-green border-coop-green text-white' : 'border-border-gray text-gray-600 hover:border-coop-green'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Service location & instructions</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Full Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
                placeholder="Flat/House no., Street, Area, City — as specific as possible"
                className="w-full border border-border-gray rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Special Instructions (optional)</label>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                rows={3}
                placeholder="e.g. Ring doorbell 3 times · Dog at home · 4th floor, no lift"
                className="w-full border border-border-gray rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && service && worker && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Review your booking</h2>
            <div className="bg-light-gray rounded-2xl p-5 space-y-4">
              <div className="flex gap-4">
                <img src={worker.profilePhotoUrl} alt={worker.fullName} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-neutral-dark">{worker.fullName}</p>
                  <p className="text-xs text-gray-500">{worker.trade}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs">{worker.rating}</span>
                  </div>
                </div>
              </div>
              {[
                { icon: FileText, label: 'Service', value: service.title },
                { icon: Calendar, label: 'Date', value: selectedDate },
                { icon: Clock, label: 'Time', value: selectedTime },
                { icon: MapPin, label: 'Location', value: address },
              ].map(row => (
                <div key={row.label} className="flex items-start gap-3 text-sm">
                  <row.icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div><span className="text-gray-400 text-xs">{row.label}: </span><span className="font-semibold text-neutral-dark">{row.value}</span></div>
                </div>
              ))}
            </div>

            {/* Wage transparency preview */}
            <div className="bg-sage-green/10 rounded-2xl p-5 border border-coop-green/20">
              <p className="text-xs font-bold text-coop-green uppercase mb-3">Wage Transparency — Where your money goes</p>
              {[
                { label: 'Worker Net Pay (80%)', value: formatINR(service.basePrice * 0.8), color: 'text-coop-green font-bold' },
                { label: 'Worker Insurance Pool (5%)', value: formatINR(service.basePrice * 0.05), color: 'text-soft-teal' },
                { label: 'Coop Overhead (10%)', value: formatINR(service.basePrice * 0.1), color: 'text-card-purple' },
                { label: 'Platform Tech (5%)', value: formatINR(service.basePrice * 0.05), color: 'text-gray-500' },
                { label: 'You Pay Total', value: formatINR(service.basePrice), color: 'text-neutral-dark font-black' },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm py-1 border-b border-coop-green/10 last:border-0 last:pt-2">
                  <span className="text-gray-600">{row.label}</span>
                  <span className={row.color}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Payment */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Payment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI', icon: '📱', sub: 'GPay, PhonePe, Paytm' },
                { id: 'card', label: 'Debit/Credit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay' },
                { id: 'netbanking', label: 'Net Banking', icon: '🏦', sub: 'All major banks' },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${paymentMethod === method.id ? 'border-coop-green bg-sage-green/5' : 'border-border-gray hover:border-coop-green/50'}`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <p className="text-sm font-bold text-neutral-dark">{method.label}</p>
                  <p className="text-xs text-gray-400">{method.sub}</p>
                </button>
              ))}
            </div>
            {paymentMethod === 'upi' && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">UPI ID</label>
                <input type="text" placeholder="yourname@bank" defaultValue="rahul@okhdfcbank" className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green" />
              </div>
            )}
            {service && (
              <div className="bg-light-gray rounded-2xl p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-heading font-black text-2xl text-neutral-dark">{formatINR(service.basePrice)}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-coop-green font-semibold">
                  <Shield className="w-4 h-4" />
                  Razorpay Secured
                </div>
              </div>
            )}
            <button
              onClick={handleConfirmBooking}
              className="w-full bg-coop-green hover:bg-forest-green text-white font-bold py-4 rounded-2xl shadow-coop text-base transition-colors"
            >
              Pay & Confirm Booking →
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 0 ? (
          <button onClick={() => setStep(p => p - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <Link href="/services" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
            <ChevronLeft className="w-4 h-4" /> Browse Services
          </Link>
        )}
        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep(p => p + 1)}
            disabled={!canNext()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-coop-green hover:bg-forest-green text-white text-sm font-bold transition-colors disabled:opacity-40 shadow-coop"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
