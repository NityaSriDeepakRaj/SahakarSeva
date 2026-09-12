import React from 'react';
import Link from 'next/link';
import { Shield, HeartHandshake, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-light-gray border-t border-border-gray text-neutral-dark pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-coop-green flex items-center justify-center text-white shadow-coop">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-forest-green">
                SAHAKAR SEVA
              </span>
            </div>
            <p className="text-sm text-gray-text leading-relaxed">
              India’s first cooperative gig services marketplace. Owned and governed by skilled tradespeople, providing dignified fair wages, 100% transparent pricing, and trusted service to neighborhoods.
            </p>
            <div className="pt-2 text-xs text-gray-text space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-coop-green shrink-0" />
                Federation Center, Barakhamba Rd, New Delhi 110001
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-coop-green shrink-0" />
                24/7 Worker Helpline: 1800-SAHAKAR (Toll-Free)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-coop-green shrink-0" />
                support@sahakarseva.org
              </p>
            </div>
          </div>

          {/* Column 2: For Workers */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-neutral-dark mb-4">
              For Workers
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-text">
              <li>
                <Link href="/auth/signup?role=worker" className="hover:text-coop-green transition-colors">
                  Join a Cooperative Guild
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="hover:text-coop-green transition-colors">
                  Wage Transparency Ledger (80/20)
                </Link>
              </li>
              <li>
                <Link href="/appeal" className="hover:text-coop-green transition-colors">
                  Worker Algorithmic Appeal Tribunal
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-coop-green transition-colors">
                  Collective Bargaining Portal
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-coop-green transition-colors">
                  Accident & Health Insurance Cover
                </Link>
              </li>
              <li>
                <Link href="/workers" className="hover:text-coop-green transition-colors">
                  Heritage Artisan Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Customers */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-neutral-dark mb-4">
              For Customers
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-text">
              <li>
                <Link href="/services" className="hover:text-coop-green transition-colors">
                  Browse Service Catalog
                </Link>
              </li>
              <li>
                <Link href="/workers" className="hover:text-coop-green transition-colors">
                  Find Guild Verified Workers
                </Link>
              </li>
              <li>
                <Link href="/workers?womenOnly=true" className="hover:text-coop-green transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-soft-teal"></span>
                  Women-Led Care & Services
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-coop-green transition-colors">
                  Track Bookings
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-coop-green transition-colors">
                  Cooperative Quality Guarantee
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-coop-green transition-colors">
                  Community Wage Uplift Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: For Businesses & Ecosystem */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-neutral-dark mb-4">
              For Businesses
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-text">
              <li>
                <Link href="/contact" className="hover:text-coop-green transition-colors">
                  Multi-Worker Team Contracting
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coop-green transition-colors">
                  Corporate Facility Maintenance
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-coop-green transition-colors">
                  Federation Governance Bylaws
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-coop-green transition-colors">
                  Cooperative Economics Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coop-green transition-colors">
                  Emergency Support & SOS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-gray pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-text">
          <p>© {new Date().getFullYear()} Sahakar Seva Cooperative Federation. All rights reserved. Regd. under Multi-State Cooperative Societies Act.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-coop-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-coop-green transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-coop-green transition-colors">
              Contact & Grievance Officer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
