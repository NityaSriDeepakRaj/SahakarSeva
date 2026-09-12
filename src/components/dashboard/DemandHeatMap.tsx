'use client';

import React, { useState } from 'react';
import { DEMAND_LOCATIONS_DATA } from '@/lib/data';
import { MapPin, TrendingUp, Users, Flame } from 'lucide-react';

export default function DemandHeatMap() {
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const filteredLocations = selectedCity === 'All'
    ? DEMAND_LOCATIONS_DATA
    : DEMAND_LOCATIONS_DATA.filter((l) => l.city.toLowerCase() === selectedCity.toLowerCase() || (selectedCity === 'Delhi' && l.city === 'NCR'));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-warning" />
          <span className="text-sm font-bold text-neutral-dark">Real-Time Neighborhood Demand</span>
        </div>
        <div className="flex gap-1.5">
          {['All', 'Delhi', 'Bengaluru'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-coop-green text-white shadow-xs'
                  : 'bg-gray-100 text-gray-text hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredLocations.map((loc) => (
          <div
            key={loc.id}
            className="p-4 rounded-xl border border-border-gray bg-light-gray hover:border-coop-green hover:bg-white transition-all shadow-card"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-coop-green shrink-0" />
                <span className="text-xs font-bold text-neutral-dark line-clamp-1">{loc.zone}</span>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                  loc.demandLevel === 'surge'
                    ? 'bg-warning/15 text-warning border border-warning/30'
                    : 'bg-coop-green/15 text-coop-green border border-coop-green/30'
                }`}
              >
                {loc.demandLevel.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-text pt-2 border-t border-gray-200/60">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                <span>{loc.activeWorkers} Active Workers</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-forest-green">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{loc.avgHourlySurge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
