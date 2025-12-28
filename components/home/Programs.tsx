'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Heart, Users, Home, Briefcase, ArrowRight } from 'lucide-react';

export default function Programs() {
  const t = useTranslations('programs');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const programs = [
    {
      titleKey: 'educational.title',
      descKey: 'educational.description',
      icon: BookOpen,
      img: '/assets/image/photo_8_2025-11-01_10-44-47.jpg',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      titleKey: 'therapeutic.title',
      descKey: 'therapeutic.description',
      icon: Heart,
      img: '/assets/image/photo_9_2025-11-01_10-44-47.jpg',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      titleKey: 'family.title',
      descKey: 'family.description',
      icon: Users,
      img: '/assets/image/photo_10_2025-11-01_10-44-47.jpg',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      titleKey: 'vocational.title',
      descKey: 'vocational.description',
      icon: Briefcase,
      img: '/assets/image/photo_11_2025-11-01_10-44-47.jpg',
      color: 'bg-amber-100 text-amber-600'
    },
    {
      titleKey: 'community.title',
      descKey: 'community.description',
      icon: Home,
      img: '/assets/image/photo_12_2025-11-01_10-44-47.jpg',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">{t('title')}</h2>
          <p className="text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <Image 
                    src={prog.img} 
                    alt={t(prog.titleKey)} 
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className={`w-10 h-10 rounded-lg ${prog.color} flex items-center justify-center mb-4`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{t(prog.titleKey)}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">
                    {t(prog.descKey)}
                  </p>
                  <Link 
                    href={`/${locale}/programs`} 
                    className="inline-flex items-center text-brand-teal font-semibold text-sm hover:underline"
                  >
                    {tCommon('learnMore')} <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href={`/${locale}/programs`}
            className="bg-brand-teal hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md inline-block"
          >
            {tCommon('viewAllPrograms')}
          </Link>
        </div>
      </div>
    </section>
  );
}
