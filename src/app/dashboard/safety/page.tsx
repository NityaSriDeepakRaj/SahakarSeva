'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { SAFETY_INCIDENTS_DATA } from '@/lib/data';
import {
  Shield, AlertTriangle, PhoneCall, MessageCircle, Clock, ToggleLeft, ToggleRight,
  Upload, CheckCircle2, X, ShieldAlert, Users, Phone
} from 'lucide-react';

export default function SafetyPage() {
  const { showToast } = useToast();
  const [womenOnly, setWomenOnly] = useState(true);
  const [safeTime, setSafeTime] = useState(true);
  const [buddyActive, setBuddyActive] = useState(false);
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [incidentText, setIncidentText] = useState('');
  const [incidentType, setIncidentType] = useState('harassment');

  const handleSOS = () => {
    setShowSOSConfirm(false);
    showToast('🚨 SOS Alert Sent!', 'Your 3 peer buddies and the federation safety team have been alerted. Help is on the way.', 'error');
  };

  const handleIncidentSubmit = () => {
    if (!incidentText.trim()) return;
    setShowIncidentModal(false);
    setIncidentText('');
    showToast('Incident Reported', 'Your report has been logged and will be reviewed by the Safety Arbitration Team within 24 hours.', 'success');
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          USP 2 — Gender-First Safety
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Safety Dashboard
        </h1>
        <p className="text-sm text-gray-text mt-1">
          Your safety is non-negotiable. Configure protections, report incidents, or activate SOS.
        </p>
      </div>

      {/* SOS Button — prominent */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 text-white text-center shadow-xl">
        <ShieldAlert className="w-10 h-10 mx-auto mb-3 text-red-200" />
        <h2 className="font-heading font-bold text-xl mb-1">Emergency SOS</h2>
        <p className="text-red-200 text-sm mb-6">Press only during an active job emergency. Alerts 3 peer buddies + Federation safety team instantly.</p>
        <button
          onClick={() => setShowSOSConfirm(true)}
          className="bg-white text-red-600 font-black text-lg px-10 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-lg hover:scale-105 active:scale-95 duration-200"
        >
          🚨 SEND SOS ALERT
        </button>
      </div>

      {/* Hotlines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Phone, label: 'Safety Hotline', value: '1800-555-SAFE', sub: 'Toll-free, 24×7', color: 'text-coop-green bg-sage-green/20' },
          { icon: MessageCircle, label: 'WhatsApp SOS', value: '+91 98000 12345', sub: 'Respond in < 2 min', color: 'text-soft-teal bg-soft-teal/10' },
          { icon: PhoneCall, label: 'SMS Alert', value: 'Text HELP to 55100', sub: 'Works on all networks', color: 'text-card-purple bg-card-purple/10' },
        ].map(h => (
          <div key={h.label} className="bg-white rounded-2xl p-5 border border-border-gray shadow-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${h.color}`}>
              <h.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">{h.label}</p>
              <p className="font-heading font-bold text-neutral-dark">{h.value}</p>
              <p className="text-xs text-gray-500">{h.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Women-only toggle */}
        <div className="bg-white rounded-3xl p-6 border border-border-gray shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-neutral-dark">Women-Only Job Filter</h3>
              <p className="text-xs text-gray-text mt-1">Only receive bookings from households that explicitly selected a woman worker.</p>
            </div>
            <button
              onClick={() => { setWomenOnly(p => !p); showToast('Preference Saved', `Women-only filter ${!womenOnly ? 'enabled' : 'disabled'}.`, 'success'); }}
              className="shrink-0"
            >
              {womenOnly
                ? <ToggleRight className="w-10 h-10 text-coop-green" />
                : <ToggleLeft className="w-10 h-10 text-gray-300" />}
            </button>
          </div>
          {womenOnly && (
            <div className="bg-sage-green/10 rounded-xl px-4 py-3 flex gap-2 text-xs text-coop-green font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Active — you will only see jobs from women-preferred households.
            </div>
          )}
        </div>

        {/* Safe-time scheduling */}
        <div className="bg-white rounded-3xl p-6 border border-border-gray shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-neutral-dark">Safe-Time Scheduling</h3>
              <p className="text-xs text-gray-text mt-1">Automatically decline all bookings scheduled after 8 PM. Never feel pressured to work late.</p>
            </div>
            <button
              onClick={() => { setSafeTime(p => !p); showToast('Schedule Updated', `Late-night booking block ${!safeTime ? 'enabled' : 'disabled'}.`, 'success'); }}
              className="shrink-0"
            >
              {safeTime
                ? <ToggleRight className="w-10 h-10 text-coop-green" />
                : <ToggleLeft className="w-10 h-10 text-gray-300" />}
            </button>
          </div>
          {safeTime && (
            <div className="bg-sage-green/10 rounded-xl px-4 py-3 flex gap-2 text-xs text-coop-green font-semibold">
              <Clock className="w-4 h-4 shrink-0" />
              Active — bookings after 8:00 PM are automatically declined.
            </div>
          )}
        </div>

        {/* Peer buddy system */}
        <div className="bg-white rounded-3xl p-6 border border-border-gray shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-neutral-dark">Peer Buddy System</h3>
              <p className="text-xs text-gray-text mt-1">When you accept a job, 3 nearest women workers in your network are silently notified as your buddies.</p>
            </div>
            <button
              onClick={() => { setBuddyActive(p => !p); showToast('Buddy System Updated', `Peer buddy alerts ${!buddyActive ? 'enabled' : 'disabled'}.`, 'success'); }}
              className="shrink-0"
            >
              {buddyActive
                ? <ToggleRight className="w-10 h-10 text-coop-green" />
                : <ToggleLeft className="w-10 h-10 text-gray-300" />}
            </button>
          </div>
          <div className="flex gap-3">
            {['Preethi N.', 'Kavya R.', 'Ananya D.'].map(name => (
              <div key={name} className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold border ${buddyActive ? 'border-coop-green/40 text-coop-green bg-sage-green/10' : 'border-border-gray text-gray-400'}`}>
                <Users className="w-4 h-4 mx-auto mb-1" />
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Report Incident */}
        <div className="bg-white rounded-3xl p-6 border border-border-gray shadow-card space-y-4">
          <h3 className="font-heading font-bold text-neutral-dark">Report an Incident</h3>
          <p className="text-xs text-gray-text">Experienced harassment, payment dispute, or unsafe conditions? File a report — all reports are confidential.</p>
          <button
            onClick={() => setShowIncidentModal(true)}
            className="w-full bg-red-50 border border-red-200 text-red-600 font-bold text-sm rounded-2xl py-3 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            File Incident Report
          </button>
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-5">Your Incident History</h3>
        {SAFETY_INCIDENTS_DATA.filter(i => i.workerId === 'wkr-001').length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Shield className="w-10 h-10 mx-auto mb-2 text-gray-200" />
            <p className="text-sm">No incidents reported. Stay safe out there!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {SAFETY_INCIDENTS_DATA.filter(i => i.workerId === 'wkr-001').map(inc => (
              <div key={inc.id} className={`rounded-2xl p-5 border-l-4 ${inc.severity === 'red' ? 'border-red-500 bg-red-50' : 'border-yellow-400 bg-yellow-50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold uppercase ${inc.severity === 'red' ? 'text-red-600' : 'text-yellow-700'}`}>
                    {inc.severity === 'red' ? '🔴 Severe' : '🟡 Moderate'} · {inc.incidentType.replace('_', ' ')}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${inc.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {inc.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{inc.description}</p>
                {inc.actionTaken && <p className="text-xs text-gray-500 mt-2 italic">Action: {inc.actionTaken}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SOS Confirm Modal */}
      {showSOSConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-8 text-center space-y-5">
            <ShieldAlert className="w-14 h-14 text-red-500 mx-auto" />
            <h2 className="font-heading font-bold text-xl text-neutral-dark">Send SOS Alert?</h2>
            <p className="text-sm text-gray-text">This will immediately alert your 3 peer buddies and the federation safety team. Use only in a genuine emergency.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowSOSConfirm(false)} className="flex-1 py-3 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={handleSOS} className="flex-1 py-3 rounded-2xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors">🚨 Yes, Send SOS</button>
            </div>
          </div>
        </div>
      )}

      {/* Incident Report Modal */}
      {showIncidentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl text-neutral-dark">File Incident Report</h2>
              <button onClick={() => setShowIncidentModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Incident Type</label>
              <select
                value={incidentType}
                onChange={e => setIncidentType(e.target.value)}
                className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green"
              >
                <option value="harassment">Harassment / Verbal Abuse</option>
                <option value="physical_threat">Physical Threat</option>
                <option value="payment_dispute">Payment Dispute</option>
                <option value="property_damage">Property Damage Accusation</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Describe What Happened</label>
              <textarea
                value={incidentText}
                onChange={e => setIncidentText(e.target.value)}
                rows={4}
                placeholder="Be as specific as possible — location, time, what was said or done..."
                className="w-full border border-border-gray rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green resize-none"
              />
            </div>
            <button className="w-full border-2 border-dashed border-border-gray rounded-xl py-3 text-xs font-semibold text-gray-500 flex items-center justify-center gap-2 hover:border-coop-green hover:text-coop-green transition-colors">
              <Upload className="w-4 h-4" /> Attach Photo / Screenshot (optional)
            </button>
            <div className="flex gap-3">
              <button onClick={() => setShowIncidentModal(false)} className="flex-1 py-3 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={handleIncidentSubmit} className="flex-1 py-3 rounded-2xl bg-coop-green text-white text-sm font-bold hover:bg-forest-green transition-colors">Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
