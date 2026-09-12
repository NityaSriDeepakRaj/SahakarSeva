'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { TEAM_JOBS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Users, MapPin, Clock, CheckCircle2, Star, ChevronRight, MessageSquare, Camera, Navigation } from 'lucide-react';
import { TeamJob } from '@/types';

export default function TeamJobsPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<TeamJob[]>(TEAM_JOBS_DATA);
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending');

  const handleAccept = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'accepted' as const } : j));
    showToast('Team Job Accepted!', 'Your team has been notified. Check route details below.', 'success');
  };

  const handleDecline = (id: string) => {
    showToast('Job Declined', 'You have declined this team booking.', 'warning');
  };

  const pendingJobs = jobs.filter(j => j.status === 'pending');
  const activeJobs = jobs.filter(j => j.status === 'accepted' || j.status === 'in-progress');
  const completedJobs = jobs.filter(j => j.status === 'completed');

  const tabJobs = activeTab === 'pending' ? pendingJobs : activeTab === 'active' ? activeJobs : completedJobs;

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          USP 9 — Team Coordination
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Multi-Person Team Jobs
        </h1>
        <p className="text-sm text-gray-text mt-1">Coordinate with your team, track routes, and complete large bookings together.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border-gray">
        {(['pending', 'active', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-coop-green text-coop-green' : 'border-transparent text-gray-400 hover:text-neutral-dark'}`}
          >
            {tab} ({tab === 'pending' ? pendingJobs.length : tab === 'active' ? activeJobs.length : completedJobs.length})
          </button>
        ))}
      </div>

      {tabJobs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-sm">No {activeTab} team jobs at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {tabJobs.map(job => (
            <div key={job.id} className="bg-white rounded-3xl border border-border-gray shadow-card overflow-hidden">
              {/* Job Header */}
              <div className="p-6 border-b border-border-gray">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {job.teamLeadId === 'wkr-001' && (
                        <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" /> Team Lead
                        </span>
                      )}
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${job.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : job.status === 'accepted' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {job.status}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-neutral-dark">{job.serviceTitle}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.scheduledDate} · {job.scheduledTime}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.teamSize} workers</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-heading font-black text-coop-green">{formatINR(job.perPersonPay)}</p>
                    <p className="text-xs text-gray-400">your share (of {formatINR(job.totalPay)} total)</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="p-6 border-b border-border-gray">
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Team Members</p>
                <div className="flex flex-wrap gap-3">
                  {job.members.map(m => (
                    <div key={m.id} className="flex items-center gap-2 bg-light-gray rounded-xl px-3 py-2">
                      <img src={m.photo} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-dark">{m.name}</p>
                        {m.role === 'lead' && <p className="text-[10px] text-amber-600 font-bold">Lead</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stops / Route */}
              {job.stops && (
                <div className="p-6 border-b border-border-gray">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-3">
                    <Navigation className="w-3.5 h-3.5 inline mr-1" />Route Stops
                  </p>
                  <div className="space-y-2">
                    {job.stops.map((stop, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${stop.status === 'completed' ? 'bg-coop-green text-white' : 'bg-light-gray text-gray-500 border border-border-gray'}`}>
                          {i + 1}
                        </span>
                        <span className={`text-sm ${stop.status === 'completed' ? 'text-gray-400 line-through' : 'text-neutral-dark'}`}>
                          {stop.address}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-6 flex gap-3 flex-wrap">
                {job.status === 'pending' && (
                  <>
                    <button onClick={() => handleDecline(job.id)} className="px-5 py-2.5 rounded-2xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors">
                      Decline
                    </button>
                    <button onClick={() => handleAccept(job.id)} className="px-6 py-2.5 rounded-2xl bg-coop-green text-white text-sm font-bold hover:bg-forest-green transition-colors shadow-coop">
                      Accept Team Job
                    </button>
                  </>
                )}
                {(job.status === 'accepted' || job.status === 'in-progress') && (
                  <>
                    <button onClick={() => showToast('Chat Opening', 'Team chat is launching…', 'info')} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
                      <MessageSquare className="w-4 h-4" /> Team Chat
                    </button>
                    <button onClick={() => showToast('Camera Ready', 'Upload proof-of-work photo.', 'info')} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
                      <Camera className="w-4 h-4" /> Photo Upload
                    </button>
                    <button onClick={() => showToast('Navigation', 'Opening route in Maps…', 'info')} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-coop-green text-white text-sm font-bold hover:bg-forest-green transition-colors">
                      <Navigation className="w-4 h-4" /> Navigate Route
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
