import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  ReceiptText, 
  MapPin, 
  Layers, 
  Scale, 
  Sparkles, 
  HeartHandshake, 
  Users2 
} from 'lucide-react';
import { US_PRESENTS_9 } from '@/lib/data';

export default function USPGrid() {
  const iconMap: Record<string, React.ElementType> = {
    Users,
    ShieldCheck,
    ReceiptText,
    MapPin,
    Layers,
    Scale,
    Sparkles,
    HeartHandshake,
    Users2,
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3.5 py-1.5 rounded-full">
            Worker-First Innovation
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-dark tracking-tight mt-3">
            9 Architectural Innovations That Transform Gig Work
          </h2>
          <p className="text-gray-text text-base mt-3 leading-relaxed">
            By combining open-source cooperative algorithms with democratic union governance, we ensure mutual safety, fair wages, and lasting social equity.
          </p>
        </div>

        {/* 9 USPs Grid (3 columns desktop, 1 mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {US_PRESENTS_9.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="bg-light-gray rounded-2xl p-6 sm:p-7 border border-border-gray hover:border-coop-green hover:shadow-card hover:bg-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-border-gray flex items-center justify-center text-coop-green group-hover:bg-coop-green group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sage-green/25 text-forest-green">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-neutral-dark mb-2 group-hover:text-coop-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-text leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-forest-green font-semibold">
                  <span>Pillar {idx + 1} of 9</span>
                  <span className="text-gray-400 group-hover:text-coop-green transition-colors">Active Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
