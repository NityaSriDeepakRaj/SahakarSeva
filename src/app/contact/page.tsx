'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { PhoneCall, Mail, MapPin, ShieldAlert, Send, Building2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [inquiryType, setInquiryType] = useState('Service Support');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Inquiry Received', 'A cooperative representative will contact you within 4 hours.', 'success');
      setName('');
      setContact('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Federation Communications
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-dark tracking-tight mt-3">
          Contact & Worker Safety Helpline
        </h1>
        <p className="text-gray-text text-base sm:text-lg mt-3 leading-relaxed">
          Need assistance with a booking, cooperative chapter registration, or emergency worker support? We are at your service 24/7.
        </p>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="bg-red-50 border-2 border-red-200 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-red-900">
              24/7 Worker Emergency SOS & Safety Helpline
            </h3>
            <p className="text-xs text-red-700">
              Immediate dispatch intervention for safety risks, harassment, or on-site accidents.
            </p>
          </div>
        </div>
        <a
          href="tel:18007242925"
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-md text-center shrink-0"
        >
          Call 1800-SAHAKAR
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (7 cols): Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-border-gray shadow-card space-y-6">
          <h2 className="font-heading font-bold text-2xl text-neutral-dark">
            Send an Inquiry or Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Email or Phone</label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Inquiry Purpose</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
              >
                <option value="Service Support">Homeowner / Customer Service Support</option>
                <option value="Worker Guild Registration">Worker Guild / Cooperative Registration</option>
                <option value="Enterprise Contracting">Corporate & Enterprise Team Contracts</option>
                <option value="Press & Research">Academic Research & Media Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our cooperative assist you?..."
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3.5 px-6 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold shadow-coop flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right Column (5 cols): Regional Branch Locator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-light-gray rounded-3xl p-6 sm:p-8 border border-border-gray space-y-5">
            <h3 className="font-heading font-bold text-lg text-neutral-dark">
              Regional Cooperative Secretariat Centers
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-border-gray space-y-1">
                <p className="font-bold text-forest-green text-sm">National Federation Secretariat</p>
                <p className="text-gray-600">Federation Towers, 14 Barakhamba Road, Connaught Place, New Delhi 110001</p>
                <p className="text-gray-400 font-mono">delhi@sahakarseva.org</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-border-gray space-y-1">
                <p className="font-bold text-forest-green text-sm">Western India Guild Depot</p>
                <p className="text-gray-600">Coop Bhavan, Dadar West, Mumbai 400028</p>
                <p className="text-gray-400 font-mono">mumbai@sahakarseva.org</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-border-gray space-y-1">
                <p className="font-bold text-forest-green text-sm">Southern India Tech & Guild Hub</p>
                <p className="text-gray-600">Koramangala 4th Block, 80 Feet Road, Bengaluru 560034</p>
                <p className="text-gray-400 font-mono">bengaluru@sahakarseva.org</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
