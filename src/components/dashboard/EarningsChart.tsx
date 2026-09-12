'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WORKER_MONTHLY_EARNINGS } from '@/lib/data';
import { formatINR } from '@/lib/utils';

export default function EarningsChart() {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={WORKER_MONTHLY_EARNINGS}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="coopEarningGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D7A4A" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2D7A4A" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 11, fill: '#6B7280' }} 
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#6B7280' }} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `₹${val}`}
          />
          <Tooltip
            formatter={(value: number) => [formatINR(value), 'Direct Net Earnings']}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="earnings"
            stroke="#2D7A4A"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#coopEarningGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
