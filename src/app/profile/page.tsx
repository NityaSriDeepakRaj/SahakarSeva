'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  HeartHandshake, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || 'Sunita Sharma');
  const [email, setEmail] = useState(user?.email || 'sunita.sharma@sahayakseva.org');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'New Delhi');
  const [address, setAddress] = useState(user?.address || 'B-42, Malviya Nagar, New Delhi');
  const [emergencyContact, setEmergencyContact] = useState('+91 98111 00998 (Brother)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Saved', 'Your cooperative member record has been updated.', 'success');
  };

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Member Identity
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Profile & Cooperative Settings
        </h1>
        <p className="text-sm text-gray-text mt-1">
          Manage your verified credentials, cooperative branch association, and emergency safety network.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border-gray shadow-card space-y-8">
        
        {/* User Card Top */}
        <div className="flex items-center gap-5 p-5 rounded-2xl bg-light-gray border border-border-gray">
          <img
            src={user?.profilePhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'}
            alt={fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sage-green shadow-xs"
          />
          <div>
            <h2 className="font-heading font-bold text-lg text-neutral-dark">{fullName}</h2>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'Worker'} Member • ID: {user?.id || 'usr-worker-01'}</p>
            <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-coop-green/15 text-coop-green">
              Tier-3 Verified
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Verified Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                City / Region
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
              Registered Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
            />
          </div>

          {/* Emergency Safety Network Contact */}
          <div className="p-4 rounded-2xl bg-sage-green/10 border border-sage-green/30 space-y-2">
            <div className="flex items-center gap-2 text-forest-green font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4 text-coop-green" />
              Gender-First Safety Contact
            </div>
            <p className="text-xs text-gray-600">
              This number is automatically messaged with your live dispatch coordinates if emergency SOS is triggered.
            </p>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="e.g. +91 98111 00998 (Family Contact)"
              className="w-full p-2.5 rounded-xl border border-border-gray text-xs bg-white focus:border-coop-green focus:ring-1 focus:ring-coop-green"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="py-3.5 px-6 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold shadow-coop flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
