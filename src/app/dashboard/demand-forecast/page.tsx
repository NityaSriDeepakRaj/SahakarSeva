'use client';

import React from 'react';
import { DEMAND_FORECAST_DATA } from '@/lib/data';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, MapPin, AlertCircle, Zap, Calendar } from 'lucide-react';

const HIGH_DEMAND_AREAS = [
  { area: 'Whitefield, Bengaluru', service: 'AC Service & Repair', surge: '↑ 82%', reason: 'Summer heatwave forecast' },
  { area: 'Bandra West, Mumbai', service: 'Deep Cleaning', surge: '↑ 67%', reason: 'Post-monsoon sanitization demand' },
  { area: 'Connaught Place, Delhi', service: 'Electrical Repairs', surge: '↑ 54%', reason: 'Office renovation season' },
  { area: 'Koramangala, Bengaluru', service: 'Pest Control', surge: '↑ 48%', reason: 'Seasonal termite activity' },
];

const WEEKLY_SUMMARY = [
  { day: 'Mon', predicted: 86, actual: 82 },
  { day: 'Tue', predicted: 90, actual: 88 },
  { day: 'Wed', predicted: 103, actual: 107 },
  { day: 'Thu', predicted: 105, actual: null },
  { day: 'Fri', predicted: 133, actual: null },
  { day: 'Sat', predicted: 175, actual: null },
  { day: 'Sun', predicted: 157, actual: null },
];

const COLORS = {
  cleaning: '#2D7A4F',
  electrical: '#4A6FA5',
  plumbing: '#20B2AA',
  pestControl: '#DAA520',
  carpentry: '#8B4513',
};

export default function DemandForecastPage() {
  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          AI Demand Intelligence
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-2">
          7-Day Demand Forecast
        </h1>
        <p className="text-sm text-gray-text mt-1">
          AI-powered job demand predictions help you plan your week and maximize earnings.
        </p>
      </div>

      {/* Surge Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800">High Demand Surge This Weekend</p>
          <p className="text-xs text-amber-600 mt-0.5">Saturday & Sunday demand is predicted at 175+ jobs — 40% above weekly average. Position yourself in high-demand zones for maximum earning.</p>
        </div>
      </div>

      {/* 7-Day Forecast Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-2">Jobs by Service Type — Next 7 Days</h3>
        <p className="text-xs text-gray-text mb-6">Stacked forecast across all service categories in your area</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={DEMAND_FORECAST_DATA} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cleaning" stackId="a" fill={COLORS.cleaning} name="Cleaning" radius={[0, 0, 0, 0]} />
            <Bar dataKey="electrical" stackId="a" fill={COLORS.electrical} name="Electrical" />
            <Bar dataKey="plumbing" stackId="a" fill={COLORS.plumbing} name="Plumbing" />
            <Bar dataKey="pestControl" stackId="a" fill={COLORS.pestControl} name="Pest Control" />
            <Bar dataKey="carpentry" stackId="a" fill={COLORS.carpentry} name="Carpentry" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Predicted vs Actual */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-gray shadow-card">
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-6">Predicted vs Actual (This Week)</h3>
        <div className="grid grid-cols-7 gap-2">
          {WEEKLY_SUMMARY.map(d => (
            <div key={d.day} className="text-center">
              <div className="relative h-32 flex items-end justify-center gap-1 mb-2">
                <div
                  className="w-5 bg-coop-green/20 rounded-t-lg"
                  style={{ height: `${(d.predicted / 175) * 100}%` }}
                  title={`Predicted: ${d.predicted}`}
                />
                {d.actual && (
                  <div
                    className="w-5 bg-coop-green rounded-t-lg"
                    style={{ height: `${(d.actual / 175) * 100}%` }}
                    title={`Actual: ${d.actual}`}
                  />
                )}
              </div>
              <p className="text-xs font-bold text-gray-500">{d.day}</p>
              <p className="text-[10px] text-gray-400">{d.predicted}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-coop-green/20" /> Predicted</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-coop-green" /> Actual</span>
        </div>
      </div>

      {/* High Demand Areas */}
      <div>
        <h3 className="font-heading font-bold text-lg text-neutral-dark mb-5">
          <MapPin className="w-5 h-5 text-coop-green inline mr-2" />
          Recommended High-Demand Areas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HIGH_DEMAND_AREAS.map(area => (
            <div key={area.area} className="bg-white rounded-2xl p-5 border border-border-gray shadow-card hover:border-coop-green transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-heading font-bold text-neutral-dark group-hover:text-coop-green transition-colors">{area.area}</p>
                  <p className="text-xs text-gray-500">{area.service}</p>
                </div>
                <span className="text-sm font-black text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">{area.surge}</span>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                <Zap className="w-3.5 h-3.5 text-amber-500" />{area.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
