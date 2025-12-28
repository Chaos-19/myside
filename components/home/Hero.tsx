'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mb-6"
        style={{ 
          backgroundImage: `url("/assets/image/transparent1.png")`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white z-10 mt-[-40px]">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl text-gray-100 leading-relaxed">
          {t('subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href={`/${locale}/donate`}
            className="bg-brand-teal hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg min-w-[180px]"
          >
            {t('ctaPrimary')}
          </Link>
          <Link 
            href={`/${locale}/programs`}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-teal text-white px-8 py-3.5 rounded-full font-semibold transition-all min-w-[180px]"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <ArrowDown size={24} />
      </div>
    </div>
  );
}
