'use client';

import { useTranslations } from 'next-intl';

export default function Timeline() {
  const t = useTranslations('aboutPage.journey');

  const timelineYears = ['2024', '2025', '2026',] as const;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-dark">{t('title')}</h2>
          <p className="text-gray-500 mt-2">{t('subtitle')}</p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-brand-teal/30 hidden md:block"></div>
          
          <div className="space-y-12">
            {timelineYears.map((year, idx) => (
              <div 
                key={year} 
                className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 w-full md:w-1/2 p-4">
                  <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center md:text-left ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <div className="text-brand-teal font-bold text-xl mb-2">{year}</div>
                    <h4 className="font-bold text-gray-800 mb-2">
                      {t(`timeline.${year}.title`)}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {t(`timeline.${year}.description`)}
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-brand-teal rounded-full z-10 border-4 border-white shadow-sm hidden md:block"></div>
                <div className="flex-1 w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
