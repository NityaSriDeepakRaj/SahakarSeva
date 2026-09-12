'use client';

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { HERITAGE_SKILLS_CATALOG, WORKERS_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Star, ArrowRight, Info, BadgeCheck, BookOpen } from 'lucide-react';
import Link from 'next/link';

const HERITAGE_WORKERS = [
  { id: 'hw-1', name: 'Rajeshwar Tiwari', skill: 'Mughal Tilework (Zillij)', city: 'Agra', rating: 4.9, jobs: 47, baseRate: 1200, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', certified: true },
  { id: 'hw-2', name: 'Bhanu Prakash', skill: 'Heritage Carpentry (Shisham & Teak)', city: 'Jaipur', rating: 4.8, jobs: 83, baseRate: 1400, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', certified: true },
  { id: 'hw-3', name: 'Sunil Chitrakaar', skill: 'Warli Art Murals', city: 'Pune', rating: 5.0, jobs: 29, baseRate: 900, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', certified: true },
  { id: 'hw-4', name: 'Akbar Hussain', skill: 'Jaali Stone Lattice Carving', city: 'Jodhpur', rating: 4.9, jobs: 61, baseRate: 1600, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', certified: true },
];

export default function HeritageSkillsPage() {
  const { showToast } = useToast();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showWorkers, setShowWorkers] = useState(false);

  const filteredWorkers = selectedSkill
    ? HERITAGE_WORKERS.filter(w => w.skill === selectedSkill)
    : HERITAGE_WORKERS;

  return (
    <div className="py-10 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          USP 7 — Cultural Preservation
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          Heritage Skills Marketplace
        </h1>
        <p className="text-sm text-gray-text mt-1">
          Rare traditional craftsmanship from certified artisans — from Mughal tilework to Warli murals. Premium 20-35% rate for master artisans.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex gap-3">
        <BookOpen className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          <strong>Heritage Premium:</strong> Master artisans in traditional crafts earn a 20-35% premium over standard rates, fully funded by a dedicated buyer surcharge — ensuring these rare skills remain economically viable for future generations.
        </p>
      </div>

      {/* Skill Categories */}
      <div>
        <h2 className="font-heading font-bold text-xl text-neutral-dark mb-4">Browse Heritage Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HERITAGE_SKILLS_CATALOG.map(skill => (
            <button
              key={skill.id}
              onClick={() => { setSelectedSkill(selectedSkill === skill.name ? null : skill.name); setShowWorkers(true); }}
              className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 ${selectedSkill === skill.name ? 'border-coop-green bg-sage-green/5' : 'border-border-gray bg-white hover:border-coop-green/50 shadow-card'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading font-bold text-base text-neutral-dark">{skill.name}</h3>
                <span className="text-xs font-black text-coop-green bg-sage-green/20 px-2 py-0.5 rounded-full shrink-0 ml-2">
                  +{skill.premium}%
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{skill.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Heritage Artisans */}
      <div>
        <h2 className="font-heading font-bold text-xl text-neutral-dark mb-4">
          {selectedSkill ? `Artisans: ${selectedSkill}` : 'Certified Heritage Artisans'}
        </h2>
        {selectedSkill && filteredWorkers.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm bg-light-gray rounded-2xl">
            No artisans found for this skill yet. New artisans are being certified monthly.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWorkers.map(w => (
            <div key={w.id} className="bg-white rounded-3xl border border-border-gray shadow-card overflow-hidden hover:border-coop-green transition-colors group">
              <div className="flex gap-5 p-6">
                <img src={w.photo} alt={w.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg text-neutral-dark group-hover:text-coop-green transition-colors">{w.name}</h3>
                        {w.certified && (
                          <span title="Cooperative Certified Heritage Artisan">
                            <BadgeCheck className="w-5 h-5 text-coop-green shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{w.skill}</p>
                      <p className="text-xs text-gray-400">{w.city}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-heading font-black text-xl text-coop-green">{formatINR(w.baseRate)}/hr</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {w.rating} rating
                    </span>
                    <span>{w.jobs} heritage projects</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <Link
                  href="/bookings/create"
                  className="w-full flex items-center justify-center gap-2 bg-coop-green hover:bg-forest-green text-white text-sm font-bold py-3 rounded-2xl shadow-coop transition-colors"
                >
                  Book Artisan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural preservation note */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 space-y-3">
        <h3 className="font-heading font-bold text-xl text-neutral-dark">Why Heritage Skills Matter</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          India's traditional craftsmanship — from Mughal-era Zillij tilework to pre-colonial Chunam lime plaster — is disappearing as younger generations move to higher-paying technical trades. Sahakar Seva's Heritage Marketplace creates an economic premium that makes mastering these skills financially competitive, preserving cultural knowledge for future generations.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { stat: '47', label: 'Heritage artisans' },
            { stat: '6', label: 'Traditional skills' },
            { stat: '23%', label: 'Avg. premium earned' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-heading font-black text-2xl text-amber-700">{s.stat}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
