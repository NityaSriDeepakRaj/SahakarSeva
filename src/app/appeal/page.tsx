'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { WORKER_APPEALS_DATA } from '@/lib/data';
import { 
  Scale, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  Clock,
  Vote
} from 'lucide-react';
import { WorkerAppeal } from '@/types';

export default function AppealPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [appeals, setAppeals] = useState<WorkerAppeal[]>(WORKER_APPEALS_DATA);
  const [issueType, setIssueType] = useState<WorkerAppeal['issueType']>('rating_invalidation');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileAttached, setFileAttached] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      showToast('Validation Error', 'Please complete the title and explanation', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newAppeal: WorkerAppeal = {
        id: `app-${Date.now().toString().slice(-3)}`,
        workerId: user?.id || 'wrk-01',
        workerName: user?.fullName || 'Sunita Sharma',
        workerTrade: 'Master Electrician',
        workerPhoto: user?.profilePhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        issueType,
        title,
        description,
        filedDate: new Date().toISOString().split('T')[0],
        status: 'under_jury_review',
        juryVotes: {
          approve: 1,
          reject: 0,
          total: 15,
        },
        resolutionNote: 'Empaneled 15-member peer worker arbitration jury. Voting closes in 48 hours.',
      };

      setAppeals([newAppeal, ...appeals]);
      setIsSubmitting(false);
      setTitle('');
      setDescription('');
      setFileAttached(false);
      showToast('Appeal Registered', 'Your petition has been submitted to the Peer Arbitration Jury.', 'success');
    }, 800);
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-card-purple bg-card-purple/10 px-3 py-1 rounded-full">
          Democratic Justice Protocol
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Worker Algorithmic Appeal System
        </h1>
        <p className="text-sm sm:text-base text-gray-text mt-2 leading-relaxed">
          No algorithmic black boxes. No arbitrary account terminations. Every dispute, client penalty, or retaliatory review is arbitrated by a democratic peer jury of fellow guild workers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): File New Appeal Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-card-purple" />
            <h2 className="font-heading font-bold text-xl text-neutral-dark">
              File a Petition to the Peer Jury
            </h2>
          </div>

          <form onSubmit={handleSubmitAppeal} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Dispute Category
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green bg-white"
              >
                <option value="rating_invalidation">Retaliatory or Vindictive Client Rating</option>
                <option value="penalty_dispute">Unfair Automated Delay / GPS Penalty</option>
                <option value="account_strike">Incorrect Safety Strike Removal</option>
                <option value="deactivation_review">Algorithmic Deactivation Audit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Petition Summary / Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Client gave 1-star after I refused dangerous uncertified wiring"
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Comprehensive Incident Statement
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the sequence of events, instructions given by client, safety protocols observed, and reasons why the penalty/rating violates cooperative standards..."
                className="w-full p-3 rounded-xl border border-border-gray text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
              />
            </div>

            {/* Evidence Upload Simulator */}
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-dark mb-1">
                Attach Corroborating Evidence (Photos, GPS Logs, Messages)
              </label>
              <div 
                onClick={() => setFileAttached(!fileAttached)}
                className="border-2 border-dashed border-border-gray hover:border-coop-green p-5 rounded-2xl text-center cursor-pointer bg-light-gray transition-colors"
              >
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-neutral-dark">
                  {fileAttached ? '✓ Evidence Attached: gps_log_monsoon.pdf (1.2 MB)' : 'Click to upload proof (PDF, JPG, PNG)'}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">Encrypted and presented exclusively to jury members</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl font-heading font-bold text-white bg-card-purple hover:bg-purple-800 transition-all text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Registering with Jury...' : 'Submit to Peer Arbitration Jury'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column (5 cols): How Arbitration Works */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-light-gray rounded-3xl p-6 sm:p-7 border border-border-gray space-y-4">
            <h3 className="font-heading font-bold text-base text-neutral-dark">
              How the 15-Member Peer Jury Operates
            </h3>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-card-purple text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <p><strong>Random Empanelment:</strong> 15 peer workers from unrelated chapters are selected to ensure impartiality.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-card-purple text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <p><strong>Evidence Review:</strong> Jurors inspect chat transcripts, photos, and safety guidelines without knowing identities.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-card-purple text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <p><strong>Democratic Majority:</strong> If 8 or more vote to overturn, the penalty is voided and refunded immediately.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Existing Appeals List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card space-y-6">
        <h2 className="font-heading font-bold text-xl text-neutral-dark">
          Your Arbitration Petitions & Tribunal History
        </h2>

        <div className="space-y-4">
          {appeals.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl border border-border-gray bg-light-gray space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-gray-400">#{app.id}</span>
                  <span className="text-xs font-bold text-neutral-dark">{app.title}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                  app.status === 'overturned'
                    ? 'bg-success/15 text-success'
                    : 'bg-card-purple/15 text-card-purple'
                }`}>
                  {app.status.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs text-gray-text leading-relaxed">
                {app.description}
              </p>

              <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-coop-green shrink-0 mt-0.5" />
                <div>
                  <p><strong className="text-neutral-dark">Tribunal Status:</strong> {app.resolutionNote}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Jury Votes: {app.juryVotes.approve} In Favor / {app.juryVotes.reject} Opposed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
