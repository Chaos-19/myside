'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split('/').includes('am') ? 'am' : 'en';
  
  // Get current page from pathname (without locale)
  const currentPath = pathname.replace(`/${locale}`, '') || '/';

  const navLinks = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.programs'), href: `/${locale}/programs` },
    { name: t('nav.gallery'), href: `/${locale}/gallery` },
    { name: t('nav.getInvolved'), href: `/${locale}/get-involved` },
    { name: t('nav.contact'), href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return currentPath === '/' || currentPath === '';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 text-brand-dark"
          >
            <Heart className="fill-brand-teal text-brand-teal" size={24} />
            
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'cursive' }}>
              {t('brand.name')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-brand-teal'
                    : 'text-gray-600 hover:text-brand-teal'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <LanguageSwitcher />
            
            <Link
              href={`/${locale}/donate`}
              className="bg-brand-teal hover:bg-teal-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t('common.donateNow')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 absolute w-full shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left font-medium py-2 ${
                isActive(link.href) ? 'text-brand-teal' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={`/${locale}/donate`}
            onClick={() => setIsMenuOpen(false)}
            className="block w-full bg-brand-teal text-white px-6 py-3 rounded-full font-medium text-center"
          >
            {t('common.donateNow')}
          </Link>
        </div>
      )}
    </header>
  );
}
