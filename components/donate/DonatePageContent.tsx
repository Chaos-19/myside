'use client';

import { useTranslations } from 'next-intl';
import { Building2, Phone, Mail, MapPin, Heart, BookOpen, Stethoscope, Users, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/shared';
import { contactInfo, bankInfo } from '@/data';

export default function DonatePageContent() {
  const t = useTranslations('donate');
  const tCommon = useTranslations('common');

  const donationImpact = [
    { icon: BookOpen, title: 'Educational Programs', description: 'Support specialized learning programs for children with special needs' },
    { icon: Stethoscope, title: 'Therapeutic Services', description: 'Fund therapy sessions including speech, occupational, and behavioral therapy' },
    { icon: Users, title: 'Family Support', description: 'Help families with counseling, training, and support groups' },
    { icon: Heart, title: 'Community Outreach', description: 'Enable awareness programs and community integration initiatives' },
  ];

  return (
    <div className="animate-fadeIn">
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        bgImage="/assets/image/photo_20_2025-11-01_10-44-47.jpg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* How to Donate Section */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('howToDonate.title')}</h2>
              <p className="text-gray-600 text-lg">{t('howToDonate.subtitle')}</p>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-brand-light rounded-2xl p-8 md:p-10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-teal p-3 rounded-xl text-white">
                  <Building2 size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark">{t('bankTransfer.title')}</h3>
              </div>
              
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-gray-700 min-w-[140px]">{t('bankTransfer.bankName')}</span>
                  <span className="text-gray-900">{bankInfo.bankName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-gray-700 min-w-[140px]">{t('bankTransfer.accountName')}</span>
                  <span className="text-gray-900">{bankInfo.accountName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-gray-700 min-w-[140px]">{t('bankTransfer.accountNumber')}</span>
                  <span className="text-gray-900 font-mono text-lg">{bankInfo.accountNumber}</span>
                </div>
                {bankInfo.note && (
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 italic">
                      <span className="font-medium">Note:</span> {t('bankTransfer.note')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact to Donate */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 mb-16">
              <h3 className="text-2xl font-bold text-brand-dark mb-6">{t('contactToDonate.title')}</h3>
              <p className="text-gray-600 mb-8">
                For more information about donating or to arrange your donation, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href={`tel:${contactInfo.phone.primary}`}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-brand-teal hover:shadow-md transition-all"
                >
                  <div className="bg-brand-light p-3 rounded-lg text-brand-teal">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('contactToDonate.phone')}</div>
                    <div className="font-semibold text-gray-900">{contactInfo.phone.primary}</div>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${contactInfo.email.general}`}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-brand-teal hover:shadow-md transition-all"
                >
                  <div className="bg-brand-light p-3 rounded-lg text-brand-teal">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('contactToDonate.email')}</div>
                    <div className="font-semibold text-gray-900">{contactInfo.email.general}</div>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 md:col-span-2">
                  <div className="bg-brand-light p-3 rounded-lg text-brand-teal">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('contactToDonate.visitOffice')}</div>
                    <div className="font-semibold text-gray-900">{contactInfo.address.full}</div>
                    <div className="text-sm text-gray-500 mt-1">{t('contactToDonate.contactForDirections')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Your Donation Supports */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('whatSupports.title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {donationImpact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-light p-3 rounded-lg text-brand-teal shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{t(`whatSupports.${['educational', 'therapeutic', 'family', 'vocational'][index]}.title`)}</h4>
                        <p className="text-gray-600 text-sm">{t(`whatSupports.${['educational', 'therapeutic', 'family', 'vocational'][index]}.description`)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Impact Numbers */}
            <div className="bg-brand-teal rounded-2xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl font-bold mb-8">Your Donation Makes a Difference</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-teal-100">{t('impactNumbers.directImpact.subtitle')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">7+</div>
                  <div className="text-teal-100">{t('impactNumbers.yearsOfService.subtitle')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">5+</div>
                  <div className="text-teal-100">{t('impactNumbers.corePrograms.subtitle')}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
