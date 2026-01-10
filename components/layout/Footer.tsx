'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { socialLinks, contactInfo } from '@/data';

export default function Footer() {
  const t = useTranslations();

  
  // Extract locale from pathname
  const locale = useLocale()

  const quickLinks = [
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.programs'), href: `/${locale}/programs` },
    { label: t('nav.gallery'), href: `/${locale}/gallery` },
    { label: t('nav.getInvolved'), href: `/${locale}/get-involved` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
  ];

  const socialIcons = [
    { Icon: Facebook, href: socialLinks.facebook, label: 'Facebook' },
    { Icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
    { Icon: Instagram, href: socialLinks.instagram, label: 'Instagram' },
    { Icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-2 mb-6"
            >
              <Image
                src="/assets/logo_myside.png"
                alt={t('brand.name')}
                width={180}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-brand-teal text-white p-2 rounded-full transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-teal transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-teal flex-shrink-0 mt-0.5" />
                <span>{contactInfo.address.full}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-teal flex-shrink-0" />
                <span>{contactInfo.phone.primary}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-teal flex-shrink-0" />
                <span>{contactInfo.email.general}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>{t('footer.copyright')}</p>
          <p className="mt-2 md:mt-0">{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
