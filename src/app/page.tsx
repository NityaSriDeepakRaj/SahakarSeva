import React from 'react';
import Hero from '@/components/landing/Hero';
import TrustIndicators from '@/components/landing/TrustIndicators';
import ServiceCarousel from '@/components/landing/ServiceCarousel';
import HowItWorks from '@/components/landing/HowItWorks';
import USPGrid from '@/components/landing/USPGrid';
import ImpactStats from '@/components/landing/ImpactStats';
import Testimonials from '@/components/landing/Testimonials';
import CTASection from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Indicators */}
      <TrustIndicators />

      {/* 3. Service Cards Carousel (1-sec auto-rotate) */}
      <ServiceCarousel />

      {/* 4. How It Works (3-column) */}
      <HowItWorks />

      {/* 5. 9 USPs Grid */}
      <USPGrid />

      {/* 6. Impact Stats (Sage Green full-width) */}
      <ImpactStats />

      {/* 7. Testimonials Carousel */}
      <Testimonials />

      {/* 8. Call-To-Action (2-column) */}
      <CTASection />
    </div>
  );
}
