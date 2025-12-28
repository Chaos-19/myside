'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/constants';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-24 bg-brand-light/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
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
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Quote
                className="text-brand-teal/30 mb-6 fill-brand-teal/10"
                size={40}
              />
              <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px] font-medium">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center space-x-4 border-t border-gray-50 pt-6">
                <Image
                  src={item.img}
                  alt={item.author}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-teal/20"
                />
                <div>
                  <div className="font-bold text-gray-900">{item.author}</div>
                  <div className="text-xs text-brand-teal font-bold uppercase tracking-wide">
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
