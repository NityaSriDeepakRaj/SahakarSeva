'use client';

import React, { useState } from 'react';
import { FAQS_DATA } from '@/lib/data';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Workers', 'Customers', 'Businesses'];

  const filteredFAQs = FAQS_DATA.filter((faq) => {
    const matchCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3.5 py-1.5 rounded-full">
          Frequently Answered
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-dark tracking-tight mt-3">
          Knowledge Base & FAQs
        </h1>
        <p className="text-gray-text text-sm sm:text-base mt-3">
          Everything you need to know about cooperative ownership, 80/20 wages, peer arbitration, and booking guarantees.
        </p>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions about wages, safety, ratings, insurance..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border-gray shadow-xs text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
          />
        </div>

        <div className="flex justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-coop-green text-white shadow-xs'
                  : 'bg-light-gray text-gray-600 hover:bg-gray-200 border border-border-gray'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {filteredFAQs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border-gray bg-white overflow-hidden shadow-card transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sage-green/25 text-forest-green">
                    {faq.category}
                  </span>
                  <span className="font-heading font-bold text-sm sm:text-base text-neutral-dark">
                    {faq.question}
                  </span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-coop-green shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
