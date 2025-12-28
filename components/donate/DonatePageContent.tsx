'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Building2, Phone, Mail, MapPin, Heart, Users, BookOpen, HandHeart, Copy, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/shared';
import { contactInfo, bankInfo, statistics } from '@/data';

export default function DonatePageContent() {
  const t = useTranslations('donate');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const donationSupports = [
    { key: 'educational', icon: BookOpen },
    { key: 'therapeutic', icon: Heart },
    { key: 'family', icon: Users },
    { key: 'vocational', icon: HandHeart },
  ];

  return (
    <div className="animate-fadeIn">
      <PageHero 
        title={t('title')}
        subtitle={t('subtitle')}
        bgImage="/assets/image/photo_21_2025-11-01_10-44-47.jpg"
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* How to Donate Section */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <Heart className="w-16 h-16 text-brand-teal mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howToDonate.title')}</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {t('howToDonate.subtitle')}
                  </p>
                </div>

                {/* Bank Information */}
                <div className="bg-brand-light rounded-2xl p-6 md:p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-8 h-8 text-brand-teal" />
                    <h3 className="text-xl font-bold text-gray-900">{t('bankTransfer.title')}</h3>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold min-w-[140px]">{t('bankTransfer.bankName')}</span>
                      <span>{bankInfo.bankName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold min-w-[140px]">{t('bankTransfer.accountName')}</span>
                      <span>{bankInfo.accountName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold min-w-[140px]">{t('bankTransfer.accountNumber')}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-white px-3 py-1 rounded">{bankInfo.accountNumber}</span>
                        <button 
                          onClick={() => copyToClipboard(bankInfo.accountNumber, 'account')}
                          className="p-1 hover:bg-white rounded transition-colors"
                          title="Copy account number"
                        >
                          {copied === 'account' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 italic">
                      * {bankInfo.note}
                    </p>
                  </div>
                </div>

                {/* Contact for Donations */}
                <div className="border-2 border-gray-100 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{t('contactToDonate.title')}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t('contactToDonate.phone')}</p>
                        <p className="text-gray-600">{contactInfo.phone.primary}</p>
                        <p className="text-gray-600">{contactInfo.phone.secondary}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t('contactToDonate.email')}</p>
                        <p className="text-gray-600">{contactInfo.email.donations}</p>
                        <p className="text-gray-600">{contactInfo.email.general}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 md:col-span-2">
                      <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-brand-teal" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t('contactToDonate.visitOffice')}</p>
                        <p className="text-gray-600">{contactInfo.address.city}, {contactInfo.address.country}</p>
                        <p className="text-sm text-gray-500">{t('contactToDonate.contactForDirections')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Your Donation Supports */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('whatSupports.title')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {donationSupports.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-brand-teal" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{t(`whatSupports.${item.key}.title`)}</h4>
                          <p className="text-sm text-gray-600">{t(`whatSupports.${item.key}.description`)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Impact Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-brand-teal mb-2">{statistics.directImpact}</div>
              <div className="font-bold text-gray-800">{t('impactNumbers.directImpact.title')}</div>
              <p className="text-sm text-gray-500 mt-2">{t('impactNumbers.directImpact.subtitle')}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-brand-teal mb-2">{statistics.yearsOfService}+</div>
              <div className="font-bold text-gray-800">{t('impactNumbers.yearsOfService.title')}</div>
              <p className="text-sm text-gray-500 mt-2">{t('impactNumbers.yearsOfService.subtitle')}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-brand-teal mb-2">{statistics.corePrograms}</div>
              <div className="font-bold text-gray-800">{t('impactNumbers.corePrograms.title')}</div>
              <p className="text-sm text-gray-500 mt-2">{t('impactNumbers.corePrograms.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
