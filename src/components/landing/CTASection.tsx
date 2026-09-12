import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const features = [
    '80% direct net wage payout with transparent digital ledger',
    'Democratic voting rights on collective bargaining rates & policies',
    'Comprehensive accident, hospitalization & disability safety net',
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-forest-green via-coop-green to-soft-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Ready to Join? + 3 features */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-green bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
              Transform Your Trade
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Ready to Join the Cooperative Revolution?
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed">
              Step into an economy where your skill is valued, your voice shapes the platform, and every job builds communal wealth.
            </p>

            <ul className="space-y-3 pt-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: 2 CTA buttons (I'm a Worker | I Need Services) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
            <Link
              href="/auth/signup?role=worker"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-forest-green bg-white hover:bg-sage-green/20 hover:text-white transition-all text-base shadow-lg group"
            >
              <span>I&apos;m a Worker</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-white/15 border-2 border-white hover:bg-white hover:text-forest-green transition-all text-base shadow-sm"
            >
              <span>I Need Services</span>
            </Link>

            <p className="text-center text-xs text-white/70 pt-2">
              Zero registration fee • Verified in under 24 hours
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
