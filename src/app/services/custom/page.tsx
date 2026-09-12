'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { CUSTOM_SERVICES_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Sparkles, ChevronRight, Clock, Users, Star, CheckCircle2, ArrowRight, X, IndianRupee } from 'lucide-react';

export default function CustomServicePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState<'input' | 'ai_review' | 'bids'>('input');
  const [rawInput, setRawInput] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [timeline, setTimeline] = useState('flexible');
  const [isProcessing, setIsProcessing] = useState(false);

  const aiResult = CUSTOM_SERVICES_DATA[0]; // Demo: use mock result

  const handleAnalyse = () => {
    if (!rawInput.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('ai_review');
    }, 2000);
  };

  const handlePostToWorkers = () => {
    setStep('bids');
    showToast('Request Posted!', 'Your custom service request is now visible to 2,500+ cooperative workers. Bids will arrive within 24 hours.', 'success');
  };

  const handleAcceptBid = (bidId: string) => {
    showToast('Bid Accepted! 🎉', 'Worker has been notified. Proceed to confirm payment to lock the booking.', 'success');
    setTimeout(() => router.push('/bookings'), 1500);
  };

  return (
    <div className="py-10 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          USP 9 — Custom Requests
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Custom Service Request
        </h1>
        <p className="text-sm text-gray-text mt-1">
          Describe any service in plain language. Our AI will structure it and match qualified workers.
        </p>
      </div>

      {/* Step: Input */}
      {step === 'input' && (
        <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8 space-y-6">
          <div>
            <label className="font-heading font-bold text-neutral-dark block mb-2">Describe what you need in your own words</label>
            <textarea
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              rows={5}
              placeholder={`e.g. "I need someone to restore my grandfather's antique wooden dining set from the 1950s. 6 chairs and a table. The wood is scratched and the polish has worn off completely."`}
              className="w-full border-2 border-border-gray rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green resize-none transition-colors focus:border-coop-green"
            />
            <p className="text-xs text-gray-400 mt-1">{rawInput.length}/500 characters</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Budget Min (₹)</label>
              <input type="number" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} placeholder="3000" className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Budget Max (₹)</label>
              <input type="number" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} placeholder="8000" className="w-full border border-border-gray rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coop-green" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Timeline</label>
            <div className="flex gap-2 flex-wrap">
              {['ASAP', 'This Week', 'This Month', 'Flexible'].map(t => (
                <button key={t} onClick={() => setTimeline(t.toLowerCase())} className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${timeline === t.toLowerCase() ? 'bg-coop-green border-coop-green text-white' : 'border-border-gray text-gray-600 hover:border-coop-green'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyse}
            disabled={rawInput.length < 20 || isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-coop-green hover:bg-forest-green text-white font-bold py-4 rounded-2xl shadow-coop transition-colors disabled:opacity-40"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                AI is analyzing your request…
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Analyze & Structure with AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Step: AI Review */}
      {step === 'ai_review' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-coop-green to-forest-green rounded-3xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-green-200" />
              <span className="text-sm font-bold text-green-200">AI Analysis Complete</span>
            </div>
            <h2 className="font-heading font-black text-2xl mb-1">{aiResult.aiSummary.service_title}</h2>
            <p className="text-green-100 text-sm">{aiResult.aiSummary.description}</p>
          </div>

          <div className="bg-white rounded-3xl border border-border-gray shadow-card p-6 sm:p-8 space-y-5">
            <h3 className="font-heading font-bold text-lg text-neutral-dark">Structured Service Details</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Estimated Duration', value: aiResult.aiSummary.estimated_duration },
                { label: 'Team Size Needed', value: aiResult.aiSummary.team_size },
                { label: 'Complexity Level', value: aiResult.aiSummary.complexity_level.charAt(0).toUpperCase() + aiResult.aiSummary.complexity_level.slice(1) },
                { label: 'Timeline', value: timeline.charAt(0).toUpperCase() + timeline.slice(1) },
              ].map(r => (
                <div key={r.label} className="bg-light-gray rounded-xl p-3">
                  <p className="text-xs text-gray-400">{r.label}</p>
                  <p className="font-semibold text-neutral-dark mt-0.5">{r.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {aiResult.aiSummary.required_skills.map(skill => (
                  <span key={skill} className="text-xs bg-sage-green/20 text-coop-green font-semibold px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            <div className="bg-light-gray rounded-2xl p-4 flex justify-between text-sm">
              <span className="text-gray-500">Your Budget</span>
              <span className="font-bold text-neutral-dark">{formatINR(budgetMin ? parseInt(budgetMin) : aiResult.budgetMin)} – {formatINR(budgetMax ? parseInt(budgetMax) : aiResult.budgetMax)}</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('input')} className="flex-1 py-3 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
                Edit Request
              </button>
              <button onClick={handlePostToWorkers} className="flex-1 py-3 rounded-2xl bg-coop-green hover:bg-forest-green text-white text-sm font-bold shadow-coop transition-colors flex items-center justify-center gap-2">
                Post to Workers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step: Bids */}
      {step === 'bids' && (
        <div className="space-y-6">
          <div className="bg-sage-green/10 border border-coop-green/30 rounded-2xl px-5 py-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-coop-green shrink-0" />
            <p className="text-sm text-coop-green font-semibold">
              Your request is live! 2,500+ workers have been notified. {aiResult.bids.length} bids received so far.
            </p>
          </div>

          <h3 className="font-heading font-bold text-xl text-neutral-dark">Worker Bids ({aiResult.bids.length})</h3>

          {aiResult.bids.map(bid => (
            <div key={bid.id} className="bg-white rounded-3xl border border-border-gray shadow-card p-6 space-y-4">
              <div className="flex items-start gap-4">
                <img src={bid.workerPhoto} alt={bid.workerName} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-heading font-bold text-lg text-neutral-dark">{bid.workerName}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-gray-600">{bid.workerRating} rating</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-heading font-black text-2xl text-coop-green">{formatINR(bid.bidAmount)}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />{bid.timeline}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{bid.description}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-border-gray">
                <button onClick={() => showToast('Chat Opening', `Starting chat with ${bid.workerName}…`, 'info')} className="px-5 py-2.5 rounded-2xl border border-border-gray text-sm font-semibold text-gray-600 hover:bg-light-gray transition-colors">
                  Message
                </button>
                <button onClick={() => handleAcceptBid(bid.id)} className="flex-1 py-2.5 rounded-2xl bg-coop-green hover:bg-forest-green text-white text-sm font-bold shadow-coop transition-colors">
                  Accept Bid & Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
