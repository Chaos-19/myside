'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import PageHero from '@/components/shared/PageHero';
import { BookOpen, Heart, Users, Activity, Home, UserCheck, Briefcase } from 'lucide-react';

export default function ProgramsPageContent() {
  const t = useTranslations('programsPage');
  const tCommon = useTranslations('common');

  const offerings = [
    {
      key: 'educational',
      icon: BookOpen,
      iconColor: 'bg-teal-100 text-teal-600',
      borderColor: 'border-t-4 border-t-teal-500',
      tagColors: ['bg-blue-100 text-blue-700', 'bg-gray-100 text-gray-700']
    },
    {
      key: 'therapeutic',
      icon: Heart,
      iconColor: 'bg-red-100 text-red-600',
      borderColor: 'border-t-4 border-t-red-500',
      tagColors: ['bg-green-100 text-green-700', 'bg-purple-100 text-purple-700']
    },
    {
      key: 'family',
      icon: Users,
      iconColor: 'bg-blue-100 text-blue-600',
      borderColor: 'border-t-4 border-t-blue-500',
      tagColors: ['bg-orange-100 text-orange-700', 'bg-blue-100 text-blue-700']
    },
    {
      key: 'vocational',
      icon: Briefcase,
      iconColor: 'bg-amber-100 text-amber-600',
      borderColor: 'border-t-4 border-t-amber-500',
      tagColors: ['bg-amber-100 text-amber-700', 'bg-green-100 text-green-700']
    },
  ];

  const getTagKeys = (key: string) => {
    const tagMap: Record<string, string[]> = {
      educational: ['ongoing', 'ages'],
      therapeutic: ['ages', 'flexible'],
      family: ['allFamilies', 'ongoing'],
      vocational: ['ages', 'skillsBased']
    };
    return tagMap[key] || [];
  };

  const getFeatureKeys = (key: string) => {
    const featureMap: Record<string, string[]> = {
      educational: ['iep', 'smallClass', 'curriculum'],
      therapeutic: ['speech', 'occupational', 'behavioral'],
      family: ['training', 'counseling', 'support'],
      vocational: ['skills', 'placement', 'independence']
    };
    return featureMap[key] || [];
  };

  const impactStats = [
    { val: '30+', labelKey: 'childrenServed', icon: Users, color: 'bg-teal-500' },
    { val: '95%', labelKey: 'improvementRate', icon: Activity, color: 'bg-green-500' },
    { val: '30+', labelKey: 'familiesSupported', icon: Home, color: 'bg-blue-500' },
    { val: '10+', labelKey: 'professionalStaff', icon: UserCheck, color: 'bg-purple-500' },
  ];

  return (
    <div className="animate-fadeIn">
      <PageHero 
        title={t('title')}
        subtitle={t('subtitle')}
        bgImage="/assets/image/photo_23_2025-11-01_10-44-47.jpg"
        primaryAction={{ label: tCommon('enrollYourChild'), href: '/contact' }}
        secondaryAction={{ label: tCommon('downloadBrochure'), href: '#' }}
      />

      {/* Offerings Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('programsTitle')}</h2>
            <p className="text-gray-600 text-lg">{t('programsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((prog, idx) => (
              <div key={idx} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 ${prog.borderColor} relative overflow-hidden group flex flex-col`}>
                 <div className={`w-14 h-14 rounded-xl ${prog.iconColor} flex items-center justify-center mb-6`}>
                    <prog.icon size={28} />
                 </div>
                 
                 <h3 className="text-xl font-bold text-gray-900 mb-3">
                   {t(`offerings.${prog.key}.title`)}
                 </h3>
                 <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                   {t(`offerings.${prog.key}.description`)}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 mb-6">
                    {getTagKeys(prog.key).map((tagKey, tIdx) => (
                        <span key={tIdx} className={`text-xs font-semibold px-3 py-1 rounded-full ${prog.tagColors[tIdx]}`}>
                            {t(`offerings.${prog.key}.tags.${tagKey}`)}
                        </span>
                    ))}
                 </div>

                 <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-sm text-gray-800 mb-3">{t('programFeatures')}</h4>
                    <ul className="space-y-2">
                        {getFeatureKeys(prog.key).map((featKey, fIdx) => (
                            <li key={fIdx} className="flex items-start space-x-2 text-sm text-gray-500">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0"></div>
                                <span>{t(`offerings.${prog.key}.features.${featKey}`)}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('facilities.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('facilities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {/* Item 1: Large (2x2) */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
              <Image 
                src="/assets/image/photo_14_2025-11-01_10-44-47.jpg" 
                alt={t('facilities.creativeArts.title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div>
                  <p className="text-white font-bold text-xl">{t('facilities.creativeArts.title')}</p>
                  <p className="text-gray-200 text-sm mt-1">{t('facilities.creativeArts.subtitle')}</p>
                </div>
              </div>
            </div>

            {/* Item 2: Wide (2x1) */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
              <Image 
                src="/assets/image/photo_15_2025-11-01_10-44-47.jpg" 
                alt={t('facilities.inclusiveClassrooms.title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <div>
                    <p className="text-white font-bold text-lg">{t('facilities.inclusiveClassrooms.title')}</p>
                    <p className="text-gray-200 text-sm mt-1">{t('facilities.inclusiveClassrooms.subtitle')}</p>
                 </div>
              </div>
            </div>

            {/* Item 3: Standard */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
              <Image 
                src="/assets/image/photo_16_2025-11-01_10-44-47.jpg" 
                alt={t('facilities.sensoryRooms')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                 <p className="text-white font-bold text-sm">{t('facilities.sensoryRooms')}</p>
              </div>
            </div>

             {/* Item 4: Standard */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
              <Image 
                src="/assets/image/photo_17_2025-11-01_10-44-47.jpg" 
                alt={t('facilities.safePlaygrounds')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                 <p className="text-white font-bold text-sm">{t('facilities.safePlaygrounds')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('impact.title')}</h2>
                  <p className="text-gray-600">{t('impact.subtitle')}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                  {impactStats.map((stat, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                          <div className={`w-16 h-16 rounded-full ${stat.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
                              <stat.icon size={28} />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">{stat.val}</div>
                          <div className="text-sm text-gray-500 font-medium">{t(`impact.stats.${stat.labelKey}`)}</div>
                      </div>
                  ))}
              </div>

              {/* Success Stories */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white">
                          <h3 className="text-2xl font-bold text-brand-dark mb-8">{t('impact.successStories.title')}</h3>
                          <div className="space-y-8">
                              <div className="border-l-4 border-brand-teal pl-6 py-2">
                                  <p className="text-gray-600 italic mb-4 text-lg">&ldquo;{t('impact.successStories.story1.quote')}&rdquo;</p>
                                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">- {t('impact.successStories.story1.author')}</p>
                              </div>
                              <div className="border-l-4 border-blue-500 pl-6 py-2">
                                  <p className="text-gray-600 italic mb-4 text-lg">&ldquo;{t('impact.successStories.story2.quote')}&rdquo;</p>
                                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">- {t('impact.successStories.story2.author')}</p>
                              </div>
                          </div>
                      </div>
                      <div className="flex-1 h-[400px] md:h-auto relative">
                          <Image 
                            src="/assets/image/photo_18_2025-11-01_10-44-47.jpg" 
                            alt={t('impact.successStories.title')}
                            fill
                            className="object-cover"
                          />
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
