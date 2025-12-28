'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { statistics } from '@/data/constants';

export default function About() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const stats = [
    { value: statistics.childrenSupported, labelKey: 'stats.childrenSupported' },
    { value: statistics.familiesHelped, labelKey: 'stats.familiesHelped' },
    { value: statistics.corePrograms, labelKey: 'stats.corePrograms' },
    { value: statistics.yearsOfService, labelKey: 'stats.yearsOfService' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
              {t('title')}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('description')}
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed">
              {t('comprehensiveApproach')}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="text-3xl font-bold text-brand-teal mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>

            <Link 
              href={`/${locale}/about`}
              className="bg-brand-teal hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md inline-block"
            >
              {tCommon('learnMoreAboutUs')}
            </Link>
          </div>

          {/* Image Side */}
          <div className="flex-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/assets/image/photo_2_2025-11-01_10-44-47.jpg" 
                alt="Myside Community activities" 
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              {/* Floating Card */}
              <div className="absolute bottom-0 left-0 bg-brand-teal text-white p-6 m-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                <h3 className="text-lg font-bold mb-1">{t('floatingCard.title')}</h3>
                <p className="text-teal-100 text-sm">{t('floatingCard.subtitle')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
