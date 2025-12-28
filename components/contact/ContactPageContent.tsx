'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { PageHero } from '@/components/shared';
import { contactInfo } from '@/data';

export default function ContactPageContent() {
  const t = useTranslations('contact');

  return (
    <div className="animate-fadeIn">
      <PageHero 
        title={t('title')}
        subtitle={t('pageSubtitle')}
        bgImage="/assets/image/photo_20_2025-11-01_10-44-47.jpg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Form Side */}
            <div className="flex-1 bg-white border border-gray-100 shadow-lg rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>
              <p className="text-gray-500 mb-8">{t('form.subtitle')}</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.fullName')} {t('form.required')}
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.email')} {t('form.required')}
                    </label>
                    <input 
                      type="email" 
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.subject')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')} {t('form.required')}
                  </label>
                  <textarea 
                    rows={5} 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-teal text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {t('form.sendButton')}
                </button>
              </form>
            </div>

            {/* Info Side */}
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('getInTouch')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-3 rounded-full shadow-sm text-brand-teal">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{t('visitUs')}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Myside Community Center<br/>
                        {contactInfo.address.street}, {contactInfo.address.city}<br/>
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-3 rounded-full shadow-sm text-brand-teal">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{t('callUs')}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {contactInfo.phone.primary}<br/>
                        {t('hours.weekdays')}: {contactInfo.officeHours.weekdays}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-3 rounded-full shadow-sm text-brand-teal">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{t('emailUs')}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {contactInfo.email.general}<br/>
                        {contactInfo.email.enrollment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-dark text-white p-8 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Clock size={18} /> {t('officeHours')}
                </h4>
                <ul className="space-y-3 text-sm opacity-80">
                  <li className="flex justify-between">
                    <span>{t('hours.weekdays')}:</span> 
                    <span>{contactInfo.officeHours.weekdays}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t('hours.saturday')}:</span> 
                    <span>{contactInfo.officeHours.saturday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t('hours.sunday')}:</span> 
                    <span>{contactInfo.officeHours.sunday}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('findUs')}</h3>
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
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
    </div>
  );
}
