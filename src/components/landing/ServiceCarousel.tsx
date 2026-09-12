'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/data';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function ServiceCarousel() {
  // Take 5 distinct cards: Cleaning, Repairs (Electrical & Plumbing), Events, Healthcare, Custom (Carpentry)
  const carouselServices = [
    SERVICES_DATA.find((s) => s.id === 'srv-cleaning')!,
    SERVICES_DATA.find((s) => s.id === 'srv-electrical')!,
    SERVICES_DATA.find((s) => s.id === 'srv-plumbing')!,
    SERVICES_DATA.find((s) => s.id === 'srv-healthcare')!,
    SERVICES_DATA.find((s) => s.id === 'srv-carpentry')!,
  ].filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = carouselServices.length;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 1000); // 1-second auto-rotate as specified

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Color theme mapper for 320px cards
  const getColorClasses = (code: string) => {
    switch (code) {
      case 'coop-green':
        return {
          border: 'border-coop-green/30 hover:border-coop-green',
          badge: 'bg-coop-green/10 text-coop-green border-coop-green/20',
          accent: 'text-coop-green',
          btn: 'bg-coop-green hover:bg-forest-green text-white',
        };
      case 'card-purple':
        return {
          border: 'border-card-purple/30 hover:border-card-purple',
          badge: 'bg-card-purple/10 text-card-purple border-card-purple/20',
          accent: 'text-card-purple',
          btn: 'bg-card-purple hover:bg-purple-800 text-white',
        };
      case 'card-blue':
        return {
          border: 'border-card-blue/30 hover:border-card-blue',
          badge: 'bg-card-blue/10 text-card-blue border-card-blue/20',
          accent: 'text-card-blue',
          btn: 'bg-card-blue hover:bg-blue-800 text-white',
        };
      case 'soft-teal':
      default:
        return {
          border: 'border-soft-teal/30 hover:border-soft-teal',
          badge: 'bg-soft-teal/10 text-soft-teal border-soft-teal/20',
          accent: 'text-soft-teal',
          btn: 'bg-soft-teal hover:bg-teal-700 text-white',
        };
    }
  };

  return (
    <section 
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Cooperative Services Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-green/20 text-forest-green text-xs font-bold tracking-wider uppercase mb-2">
              Autonomous Cooperative Guilds
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight">
              One Platform, Infinite Opportunities
            </h2>
            <p className="text-gray-text text-base mt-2 max-w-2xl">
              Certified trade collectives delivering guaranteed craftsmanship. Every booking supports fair wages, collective bargaining, and health insurance for workers.
            </p>
          </div>

          {/* Controls: Arrows + Pause toggle */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full border border-border-gray hover:bg-gray-100 text-gray-text transition-colors"
              title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
              aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
            >
              {isPaused ? <Play className="w-4 h-4 text-coop-green" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-border-gray hover:border-coop-green hover:bg-sage-green/10 text-neutral-dark transition-all"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-border-gray hover:border-coop-green hover:bg-sage-green/10 text-neutral-dark transition-all"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container: 320px width cards, 1 card mobile, 3 cards desktop */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const itemIndex = (currentIndex + offset) % total;
              const service = carouselServices[itemIndex];
              const colorStyles = getColorClasses(service.colorCode);

              return (
                <div
                  key={`${service.id}-${offset}`}
                  className={`w-full max-w-[360px] md:w-[320px] mx-auto bg-white rounded-2xl border ${colorStyles.border} shadow-card hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group`}
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-white/95 backdrop-blur-sm ${colorStyles.badge}`}>
                        {service.badgeText || service.category}
                      </span>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {service.category}
                        </span>
                        <span className="text-xs font-bold text-forest-green">
                          {service.certifiedWorkersCount} Guild Members
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-neutral-dark group-hover:text-coop-green transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-gray-text text-xs line-clamp-2 mt-2 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-text uppercase font-semibold">Standard Guild Rate</p>
                        <p className="text-base font-extrabold text-neutral-dark">
                          {formatINR(service.basePrice)}{' '}
                          <span className="text-xs font-normal text-gray-text">/{service.priceUnit}</span>
                        </p>
                      </div>

                      <Link
                        href={`/services/${service.id}`}
                        className={`inline-flex items-center justify-center p-2.5 rounded-xl ${colorStyles.btn} transition-all`}
                        aria-label={`View details for ${service.title}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {carouselServices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-coop-green' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
