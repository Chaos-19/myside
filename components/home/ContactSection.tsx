'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactInfo } from '@/data/constants';

export default function ContactSection() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="bg-white p-3 rounded-full shadow-sm text-brand-teal">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{t('visitUs')}</h4>
                <p className="text-gray-600 mt-1">
                  {contactInfo.address.full}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="bg-white p-3 rounded-full shadow-sm text-brand-teal">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{t('callUs')}</h4>
                <p className="text-gray-600 mt-1">{contactInfo.phone.primary}</p>
                <p className="text-gray-600">{contactInfo.phone.secondary}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="bg-white p-3 rounded-full shadow-sm text-brand-teal">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{t('emailUs')}</h4>
                <p className="text-gray-600 mt-1">{contactInfo.email.general}</p>
                <p className="text-gray-600">{contactInfo.email.enrollment}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-brand-dark text-white rounded-xl">
              <div className="bg-gray-800 p-3 rounded-full">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{t('officeHours')}</h4>
                <div className="mt-2 space-y-1 text-gray-300">
                  <p>{t('hours.weekdays')}: {contactInfo.officeHours.weekdays}</p>
                  <p>{t('hours.saturday')}: {contactInfo.officeHours.saturday}</p>
                  <p>{t('hours.sunday')}: {contactInfo.officeHours.sunday}</p>
                </div>
              </div>
            </div>

            <Link
              href={`/${locale}/contact`}
              className="w-full bg-brand-teal hover:bg-teal-700 text-white py-4 rounded-xl font-bold transition-all block text-center"
            >
              {tCommon('sendUsMessage')}
            </Link>
          </div>

          {/* Map */}
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={contactInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Myside Community Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
