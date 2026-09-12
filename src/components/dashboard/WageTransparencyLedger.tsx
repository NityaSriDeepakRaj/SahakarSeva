'use client';

import React, { useState } from 'react';
import { WAGE_LEDGER_DATA } from '@/lib/data';
import { formatINR, formatDate } from '@/lib/utils';
import { ChevronDown, ChevronUp, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export default function WageTransparencyLedger({ limit = 5 }: { limit?: number }) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { showToast } = useToast();

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExportCSV = () => {
    showToast('Ledger Exported', 'Downloaded complete cryptographic CSV statement', 'success');
  };

  const items = WAGE_LEDGER_DATA.slice(0, limit);

  return (
    <div className="bg-white rounded-2xl border border-border-gray shadow-card overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-border-gray flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-coop-green animate-pulse" />
            <h3 className="font-heading font-bold text-lg text-neutral-dark">
              Wage Transparency Ledger (80/5/10/5 Protocol)
            </h3>
          </div>
          <p className="text-xs text-gray-text mt-0.5">
            Cryptographically audited distribution for every completed guild job
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border-gray hover:bg-light-gray text-xs font-semibold text-neutral-dark transition-colors self-start sm:self-auto shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-coop-green" />
          Export Ledger (CSV)
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-light-gray text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-border-gray">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Service & Client</th>
              <th className="py-3 px-4 text-right">Gross (100%)</th>
              <th className="py-3 px-4 text-right text-coop-green font-extrabold">Net Pay (80%)</th>
              <th className="py-3 px-4 text-right">Insurance (5%)</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Breakdown</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {items.map((row) => {
              const isExpanded = expandedRow === row.id;
              return (
                <React.Fragment key={row.id}>
                  <tr className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-gray-600">
                      {formatDate(row.date)}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-neutral-dark">{row.serviceTitle}</p>
                      <p className="text-[11px] text-gray-400">Client: {row.customerName}</p>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-700">
                      {formatINR(row.grossAmount)}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-coop-green text-sm">
                      {formatINR(row.workerNet)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-500">
                      {formatINR(row.insuranceDeduction)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-success/15 text-success">
                        <CheckCircle2 className="w-3 h-3" />
                        Settled
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleRow(row.id)}
                        className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
                        aria-label={isExpanded ? "Collapse breakdown" : "Expand breakdown"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Breakdown Row */}
                  {isExpanded && (
                    <tr className="bg-sage-green/10">
                      <td colSpan={7} className="p-4 border-b border-sage-green/30">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl text-xs">
                          <div className="p-3 bg-white rounded-xl border border-border-gray">
                            <span className="text-[10px] font-bold uppercase text-gray-400 block">Worker Direct Net</span>
                            <span className="font-mono font-bold text-coop-green text-sm">{formatINR(row.workerNet)}</span>
                            <span className="text-[10px] text-gray-500 block">80% credited to bank</span>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-border-gray">
                            <span className="text-[10px] font-bold uppercase text-gray-400 block">Health/Accident Cover</span>
                            <span className="font-mono font-bold text-soft-teal text-sm">{formatINR(row.insuranceDeduction)}</span>
                            <span className="text-[10px] text-gray-500 block">5% pooled coverage</span>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-border-gray">
                            <span className="text-[10px] font-bold uppercase text-gray-400 block">Coop Guild Overhead</span>
                            <span className="font-mono font-bold text-card-purple text-sm">{formatINR(row.coopOverhead)}</span>
                            <span className="text-[10px] text-gray-500 block">10% tools & relief reserve</span>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-border-gray">
                            <span className="text-[10px] font-bold uppercase text-gray-400 block">Platform Maintenance</span>
                            <span className="font-mono font-bold text-card-blue text-sm">{formatINR(row.platformProfit)}</span>
                            <span className="text-[10px] text-gray-500 block">5% tech & servers</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
