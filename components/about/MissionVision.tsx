'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function MissionVision() {
  const t = useTranslations('aboutPage');
  const tAbout = useTranslations('about');

  const coreValues = [
    t('coreValues.values.compassion'),
    t('coreValues.values.inclusion'),
    t('coreValues.values.innovation'),
    t('coreValues.values.integrity'),
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-brand-teal mb-3">
                {t('mission.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('mission.description')}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brand-teal mb-3">
                {t('vision.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('vision.description')}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">
                {t('coreValues.title')}
              </h3>
              <div className="space-y-3">
                {coreValues.map((val, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-brand-teal mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <Image 
              src="/assets/image/photo_4_2025-11-01_10-44-47.jpg" 
              alt="Myside Community children" 
              width={600}
              height={400}
              className="rounded-2xl shadow-xl w-full object-cover h-full min-h-[400px]"
            />
            <div className="absolute -bottom-8 -left-6 bg-brand-teal text-white p-6 rounded-xl shadow-lg hidden lg:block">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sm opacity-90">{tAbout('stats.childrenSupported')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
