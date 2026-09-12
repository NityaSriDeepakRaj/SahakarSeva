'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WORKERS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { 
  Search, 
  ShieldCheck, 
  Star, 
  Award, 
  Users, 
  MapPin, 
  ArrowRight, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import BookingModal from '@/components/booking/BookingModal';
import { WorkerProfile } from '@/types';

function WorkersContent() {
  const searchParams = useSearchParams();
  const initialWomenOnly = searchParams.get('womenOnly') === 'true';

  const [search, setSearch] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [womenOnly, setWomenOnly] = useState(initialWomenOnly);
  const [selectedWorkerForModal, setSelectedWorkerForModal] = useState<WorkerProfile | null>(null);

  const trades = ['All', 'Master Electrician', 'Senior Sanitary & Plumbing Engineer', 'Senior Healthcare Caregiver & Nurse', 'Master Wood Craftsman', 'Hygiene & Deep Cleaning Specialist', 'HVAC & Refrigeration Technician'];

  const filteredWorkers = WORKERS_DATA.filter((w) => {
    const matchTrade = selectedTrade === 'All' || w.trade === selectedTrade;
    const matchSearch = w.fullName.toLowerCase().includes(search.toLowerCase()) ||
      w.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      w.location.toLowerCase().includes(search.toLowerCase());
    const matchWomen = !womenOnly || w.womenWorker;
    return matchTrade && matchSearch && matchWomen;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Autonomous Cooperative Guilds
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-dark tracking-tight mt-3">
          Find Guild-Certified Workers
        </h1>
        <p className="text-gray-text text-base sm:text-lg mt-3 leading-relaxed">
          Every worker on Sahakar Seva is a democratic co-owner of their trade guild. Verified identity, peer vouches, and transparent rates.
        </p>
      </div>

      {/* Filter and Gender-First Safety Bar */}
      <div className="p-5 rounded-3xl bg-light-gray border border-border-gray space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by worker name, skill, or locality..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-gray bg-white text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
            />
          </div>

          {/* Gender-First Safety Toggle */}
          <div className="flex items-center gap-3 p-2 px-4 rounded-2xl bg-white border border-border-gray shadow-xs self-start md:self-auto">
            <span className="text-xs font-bold text-neutral-dark flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-soft-teal" />
              Gender-First Safety Network:
            </span>
            <button
              onClick={() => setWomenOnly(!womenOnly)}
              className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
                womenOnly
                  ? 'bg-soft-teal text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {womenOnly ? '✓ Women-Led Pros Only' : 'All Guild Members'}
            </button>
          </div>

        </div>

        {/* Trade Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200">
          {trades.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrade(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTrade === t
                  ? 'bg-coop-green text-white font-bold shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-200 border border-border-gray'
              }`}
            >
              {t === 'All' ? 'All Trades' : t.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-3xl border border-border-gray shadow-card hover:border-coop-green hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 group"
          >
            <div>
              {/* Header Profile Photo & Badges */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={worker.profilePhotoUrl}
                    alt={worker.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-sage-green"
                  />
                  {worker.womenWorker && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-soft-teal text-white flex items-center justify-center text-[10px] font-bold" title="Women-Led Cooperative">
                      ♀
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-neutral-dark group-hover:text-coop-green transition-colors truncate">
                      {worker.fullName}
                    </h3>
                    <span className="text-xs font-bold text-coop-green bg-sage-green/20 px-2 py-0.5 rounded-full">
                      Tier {worker.verifiedStatus}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 truncate">{worker.trade}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-text mt-1">
                    <span className="flex items-center gap-1 text-warning font-bold">
                      <Star className="w-3.5 h-3.5 fill-warning stroke-warning" />
                      {worker.rating}
                    </span>
                    <span>•</span>
                    <span>{worker.totalJobsCompleted} jobs</span>
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-gray-text leading-relaxed line-clamp-2 mb-4">
                {worker.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {worker.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-light-gray border border-gray-200 text-neutral-dark px-2.5 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Community Vouches Count */}
              <div className="p-2.5 rounded-xl bg-sage-green/10 border border-sage-green/30 flex items-center justify-between text-xs text-forest-green font-semibold">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-coop-green" />
                  Community Vouches:
                </span>
                <span className="font-mono font-bold">{worker.communityVouchesCount}</span>
              </div>
            </div>

            {/* Bottom Actions & Hourly Rate */}
            <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Baseline Rate</span>
                <p className="font-mono font-extrabold text-base text-neutral-dark">
                  {formatINR(worker.minRate)}/hr
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/workers/${worker.id}`}
                  className="px-3 py-2 rounded-xl border border-border-gray hover:bg-gray-100 text-xs font-bold text-neutral-dark transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setSelectedWorkerForModal(worker)}
                  className="px-4 py-2 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Hire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Booking Modal */}
      {selectedWorkerForModal && (
        <BookingModal
          worker={selectedWorkerForModal}
          isOpen={!!selectedWorkerForModal}
          onClose={() => setSelectedWorkerForModal(null)}
        />
      )}
    </div>
  );
}

export default function WorkersPage() {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-coop-green">Loading worker directory...</div>}>
        <WorkersContent />
      </Suspense>
    </div>
  );
}
