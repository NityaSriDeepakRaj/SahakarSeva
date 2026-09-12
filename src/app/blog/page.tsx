import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/data';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-coop-green bg-sage-green/20 px-3.5 py-1.5 rounded-full">
          Cooperative Thought Leadership
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-dark tracking-tight mt-3">
          The Sahayak Seva Journal
        </h1>
        <p className="text-gray-text text-base sm:text-lg mt-3 leading-relaxed">
          Essays, investigative reports, and economic analyses on worker power, digital platform cooperatives, and fair living wages in India.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS_DATA.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl border border-border-gray shadow-card hover:border-coop-green hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <div className="relative h-52 overflow-hidden bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-forest-green shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-heading font-bold text-lg sm:text-xl text-neutral-dark group-hover:text-coop-green transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-text mt-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  By {post.author.split(' ')[0]}
                </span>
                <span className="text-xs font-bold text-coop-green group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
