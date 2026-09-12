import React from 'react';
import Link from 'next/link';
import { UserCheck, CalendarCheck, Users, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Register & Verify',
      subtitle: 'For Skilled Workers',
      description: 'Submit your trade credentials, complete guild verification, and join your local cooperative. Enjoy democratic vote access, 80% direct net earnings, and full accident health cover.',
      icon: UserCheck,
      ctaText: 'Join Workers',
      ctaHref: '/auth/signup?role=worker',
    },
    {
      number: '02',
      title: 'Book & Pay',
      subtitle: 'For Conscious Customers',
      description: 'Choose from certified trade categories, view transparent price breakdowns, and book top-rated guild professionals. Guaranteed satisfaction with a zero-cost 48-hour warranty.',
      icon: CalendarCheck,
      ctaText: 'Browse Services',
      ctaHref: '/services',
    },
    {
      number: '03',
      title: 'Contract Teams',
      subtitle: 'For Businesses & Communities',
      description: 'Contract dedicated, multi-member cooperative crews for commercial maintenance, office deep sanitization, electrical retrofitting, and residential societies with GST invoicing.',
      icon: Users,
      ctaText: 'Enterprise Solutions',
      ctaHref: '/contact',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-light-gray border-y border-border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
            Transparent Workflow
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-3">
            How Sahakar Seva Works
          </h2>
          <p className="text-gray-text text-base mt-2">
            A cooperative ecosystem designed to balance worker dignity with seamless customer convenience.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-border-gray shadow-card hover:border-coop-green hover:shadow-coop transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-sage-green/20 text-forest-green flex items-center justify-center group-hover:bg-coop-green group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono font-bold text-2xl text-gray-300 group-hover:text-coop-green transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-coop-green uppercase tracking-wider block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-neutral-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-text leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Link
                    href={step.ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-bold text-forest-green group-hover:text-coop-green hover:underline transition-colors"
                  >
                    <span>{step.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
