import React from 'react';
import { ShieldCheck, Lock, EyeOff, Database, Server } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3 py-1 rounded-full">
          Data Dignity Charter
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-3">
          Sahayak Seva Privacy Policy
        </h1>
        <p className="text-sm text-gray-text mt-2">
          Effective Date: September 2026 • Governed by Multi-State Cooperative Society Standards
        </p>
      </div>

      <div className="prose prose-green max-w-none space-y-8 text-neutral-dark text-sm sm:text-base leading-relaxed">
        <div className="bg-sage-green/20 border border-sage-green/40 p-6 rounded-2xl flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-forest-green shrink-0 mt-1" />
          <div>
            <h3 className="font-heading font-bold text-lg text-forest-green mb-1">
              Cooperative Principle of Data Sovereignty
            </h3>
            <p className="text-sm text-gray-text leading-relaxed">
              Unlike commercial aggregators, Sahayak Seva does not sell, broker, or monetize user data. Worker location and customer home address data are decrypted exclusively during active service dispatches and purged automatically.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">1. Information We Collect</h2>
          <p className="text-gray-text">
            We collect only information necessary to ensure physical safety, trade certification, and precise financial transparency:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-text text-sm">
            <li><strong>Worker Verification Data:</strong> Government ID, trade licenses (NSDC/State Licensing), bank account details for direct payments, and cooperative branch registration.</li>
            <li><strong>Customer Contact Details:</strong> Name, verified mobile number, service address, and optional apartment/society gate pass notes.</li>
            <li><strong>Wage Ledger Records:</strong> Transaction gross amount, 80% worker net disbursement, 5% insurance premium, and 10% cooperative overhead allocations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">2. How Algorithms Use Data</h2>
          <p className="text-gray-text">
            Our dispatch algorithms operate on democratic, publicly audited rules:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-text text-sm">
            <li><strong>Neighborhood Batching:</strong> Nearby jobs are grouped to minimize worker transit fatigue and carbon emissions.</li>
            <li><strong>No Opaque Penalties:</strong> Workers are never de-ranked or hidden by hidden scores. Any rating dispute is forwarded to the peer-elected arbitration jury.</li>
            <li><strong>Gender-First Safeguards:</strong> Women workers receive priority screening for verified households, accompanied emergency SOS, and live location escrow.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">3. Security & Data Protection</h2>
          <p className="text-gray-text">
            All database communications are encrypted with TLS 1.3. Banking and KYC documents are encrypted using AES-256 at rest and accessed only by elected cooperative verification officers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-forest-green">4. Contact Grievance Officer</h2>
          <p className="text-gray-text">
            In compliance with the Information Technology Act and Digital Personal Data Protection Act, our dedicated cooperative grievance officer can be reached at <span className="font-semibold text-coop-green">grievance@sahayakseva.org</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
