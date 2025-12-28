'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { buildLocalizedUrl } from '@/lib/localeUtils';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    const newUrl = buildLocalizedUrl(pathname, locale, newLocale, searchParams);
    router.push(newUrl);
  };

  return (
    <div className="relative flex items-center">
      <Globe size={16} className="text-gray-500 mr-1" />
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value as Locale)}
        className="appearance-none bg-transparent text-sm font-medium text-gray-600 hover:text-brand-teal cursor-pointer focus:outline-none pr-6"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
