import React from 'react';
import { Scale, Users, Award, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Federation Bylaws
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-3">
          Terms of Service & Cooperative Covenant
        </h1>
        <p className="text-sm text-gray-text mt-2">
          Effective Date: September 2026 • Sahayak Seva Multi-State Cooperative Federation
        </p>
      </div>

      <div className="prose prose-green max-w-none space-y-8 text-neutral-dark text-sm sm:text-base leading-relaxed">
        <div className="bg-light-gray border border-border-gray p-6 rounded-2xl flex items-start gap-4">
          <Scale className="w-8 h-8 text-coop-green shrink-0 mt-1" />
          <div>
            <h3 className="font-heading font-bold text-lg text-neutral-dark mb-1">
              Democratic Mutualism
            </h3>
            <p className="text-sm text-gray-text leading-relaxed">
              By registering as a worker, customer, or enterprise member on Sahayak Seva, you participate in a cooperative ecosystem where fair compensation, safe workplaces, and non-exploitative pricing are enforceable rights.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">1. Worker Rights & 80/20 Formula</h2>
          <p className="text-gray-text">
            Every skilled professional registered on the platform retains 80% of the customer invoice as direct net compensation. 5% is allocated to a group health, hospitalization, and accident insurance pool. 10% is held in the local cooperative chapter treasury for collective equipment and emergency relief. Exactly 5% sustains technical infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">2. Collective Bargaining & Rate Governance</h2>
          <p className="text-gray-text">
            Minimum hourly rates for electricians, plumbers, nurses, cleaners, and artisans are established through democratic periodic votes by registered trade guild members. No algorithm or corporate manager may depress rates below the guild-ratified baseline.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">3. Algorithmic Due Process & Peer Arbitration</h2>
          <p className="text-gray-text">
            Workers have an unalienable right to algorithmic transparency. In the event of a customer dispute, suspected late fee, or low rating, workers may petition the peer arbitration jury. Arbitrators are randomly empaneled fellow workers compensated for reviewing evidence impartially.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">4. Customer Satisfaction Guarantee</h2>
          <p className="text-gray-text">
            All customer bookings are backed by our 48-hour satisfaction warranty. If craftsmanship does not meet guild guidelines, a senior collective supervisor re-examines and rectifies the work at zero extra cost to the homeowner.
          </p>
        </section>
      </div>
    </div>
  );
}
