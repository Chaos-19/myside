'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { statistics } from '@/data/constants';

export default function Impact() {
  const t = useTranslations('impact');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const impactStats = [
    { val: statistics.childrenSupported, labelKey: 'stats.childrenSupported.label', subKey: 'stats.childrenSupported.sub' },
    { val: statistics.familiesHelped, labelKey: 'stats.familiesHelped.label', subKey: 'stats.familiesHelped.sub' },
    { val: statistics.corePrograms, labelKey: 'stats.corePrograms.label', subKey: 'stats.corePrograms.sub' },
    { val: statistics.successRate, labelKey: 'stats.successRate.label', subKey: 'stats.successRate.sub' },
  ];

  return (
    <section id="impact" className="py-24 bg-brand-teal text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('title')}</h2>
          <p className="text-teal-50 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-20">
          {impactStats.map((item, i) => (
            <div key={i} className="p-4">
              <div className="text-5xl font-bold mb-2">{item.val}</div>
              <div className="text-xl font-semibold mb-2 opacity-90">{t(item.labelKey)}</div>
              <div className="text-sm text-teal-100 leading-snug">{t(item.subKey)}</div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 md:p-12 max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h3>
          <p className="text-teal-50 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={`/${locale}/donate`}
              className="bg-white text-brand-teal hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors min-w-[160px]"
            >
              {tCommon('donateToday')}
            </Link>
            <Link 
              href={`/${locale}/get-involved`}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-teal px-8 py-3 rounded-full font-bold transition-colors min-w-[160px]"
            >
              {tCommon('volunteerWithUs')}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
