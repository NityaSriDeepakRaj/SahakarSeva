'use client';

import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '@/lib/data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = TESTIMONIALS_DATA.length;

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3.5 py-1 rounded-full">
              Voices of Solidarity
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-3">
              Trusted by Workers, Celebrated by Homes
            </h2>
            <p className="text-gray-text text-base mt-2 max-w-xl">
              Hear from the women and men who own this platform, and the households who rely on their skilled work.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-border-gray hover:border-coop-green hover:bg-sage-green/15 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-dark" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-full border border-border-gray hover:border-coop-green hover:bg-sage-green/15 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-neutral-dark" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards (3 on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-light-gray rounded-2xl p-7 border border-border-gray shadow-card hover:border-coop-green hover:shadow-coop transition-all duration-300 flex flex-col justify-between ${
                idx === currentIndex ? 'ring-2 ring-coop-green/20 md:ring-0' : 'hidden md:flex'
              }`}
            >
              <div>
                {/* Top Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-warning">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning stroke-warning" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-sage-green/50" />
                </div>

                <p className="text-sm text-neutral-dark leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-200/70">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-sage-green"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-neutral-dark">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-text">
                    {item.role}
                  </p>
                  <p className="text-[11px] font-semibold text-coop-green">
                    {item.coopChapter}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
