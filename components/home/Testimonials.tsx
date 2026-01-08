'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/constants';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-24 bg-gradient-to-b from-brand-light to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-teal/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="mb-6 relative">
                <Quote
                  className="text-brand-teal/20 fill-brand-teal/5 transform group-hover:scale-110 transition-transform duration-300"
                  size={48}
                />
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px] font-medium italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              
              <div className="flex items-center space-x-4 border-t border-gray-50 pt-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-teal rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="w-14 h-14 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-xl ring-2 ring-white relative z-10">
                    {item.author.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{item.author}</div>
                  <div className="text-sm text-brand-teal font-bold uppercase tracking-wide">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
