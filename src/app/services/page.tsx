'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/data';
import { formatINR } from '@/lib/utils';
import { Search, Filter, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import BookingModal from '@/components/booking/BookingModal';
import { ServiceItem } from '@/types';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Cleaning', 'Repairs', 'Healthcare', 'Custom', 'Events'];

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Autonomous Guild Catalog
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-dark tracking-tight mt-3">
          Cooperative Services Catalog
        </h1>
        <p className="text-gray-text text-base sm:text-lg mt-3 leading-relaxed">
          Hire certified master tradespeople directly. No middleman agencies, no predatory markups. 80% goes directly to the worker.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-light-gray border border-border-gray">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electrical, plumbing, sanitation, care..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-gray bg-white text-xs sm:text-sm focus:border-coop-green focus:ring-1 focus:ring-coop-green"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-coop-green text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-border-gray'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-border-gray shadow-card hover:border-coop-green hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-gray-100">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-forest-green shadow-sm border border-gray-100">
                  {service.badgeText || service.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-1">
                  <span>{service.category}</span>
                  <span className="text-coop-green">{service.certifiedWorkersCount} Guild Pros</span>
                </div>
                
                <h3 className="font-heading font-bold text-xl text-neutral-dark group-hover:text-coop-green transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-text mt-2 leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>

                <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
                  {service.includedFeatures.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-coop-green shrink-0" />
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Baseline Guild Rate</span>
                  <p className="font-heading font-extrabold text-lg text-neutral-dark">
                    {formatINR(service.basePrice)}{' '}
                    <span className="text-xs font-normal text-gray-text">/{service.priceUnit}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/services/${service.id}`}
                    className="px-3 py-2 rounded-xl border border-border-gray hover:bg-gray-100 text-xs font-bold text-neutral-dark transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => setSelectedServiceForModal(service)}
                    className="px-4 py-2 rounded-xl bg-coop-green hover:bg-forest-green text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedServiceForModal && (
        <BookingModal
          service={selectedServiceForModal}
          isOpen={!!selectedServiceForModal}
          onClose={() => setSelectedServiceForModal(null)}
        />
      )}
    </div>
  );
}
