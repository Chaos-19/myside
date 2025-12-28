'use client';

import { useTranslations } from 'next-intl';
import { 
  BookOpen, Heart, Calendar, FileText, 
  CheckCircle, Car, Wrench, Wallet, 
  Repeat, Building, Gift, 
  Landmark, GraduationCap, Stethoscope,
  Clock, MapPin, Mail, Phone
} from 'lucide-react';
import { PageHero } from '@/components/shared';
import { contactInfo } from '@/data';

export default function GetInvolvedPageContent() {
  const t = useTranslations('getInvolved');
  const tCommon = useTranslations('common');

  const volunteerRoles = [
    { key: 'educational', icon: BookOpen },
    { key: 'therapy', icon: Heart },
    { key: 'events', icon: Calendar },
    { key: 'admin', icon: FileText },
  ];

  const donationAmounts = [
    { key: '25', icon: BookOpen },
    { key: '50', icon: Heart },
    { key: '100', icon: Car },
    { key: '250', icon: Wrench },
  ];

  const donationTypes = [
    { key: 'oneTime', icon: Wallet, action: 'primary' },
    { key: 'monthly', icon: Repeat, action: 'secondary' },
    { key: 'corporate', icon: Building, action: 'secondary' },
    { key: 'inKind', icon: Gift, action: 'secondary' },
  ];

  const whyMattersItems = ['directImpact', 'transparency', 'lastingChange'];
  
  const upcomingEvents = [
    { key: 'grandLaunch', img: '/assets/image/photo_24_2025-11-01_10-44-47.jpg' },
    { key: 'gala', img: '/assets/image/photo_25_2025-11-01_10-44-47.jpg' },
    { key: 'autismDay', img: '/assets/image/photo_3_2025-11-01_10-44-47.jpg' },
  ];
  
  const pastEvents = ['autism', 'olympics', 'conference'];
  const hostEventBenefits = ['toolkit', 'marketing', 'support'];

  return (
    <div className="animate-fadeIn">
      <PageHero 
        title={t('title')}
        subtitle={t('subtitle')}
        bgImage="/assets/image/photo_22_2025-11-01_10-44-47.jpg"
        primaryAction={{ label: tCommon('becomeVolunteer'), href: '#volunteer-form' }}
        secondaryAction={{ label: tCommon('makeADonation'), href: '#donate-section' }}
      />

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('volunteer.title')}</h2>
            <p className="text-gray-600">{t('volunteer.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {volunteerRoles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.key} className="bg-brand-light rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white text-brand-teal rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">{t(`volunteer.roles.${role.key}.title`)}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{t(`volunteer.roles.${role.key}.description`)}</p>
                  <span className="inline-block bg-teal-100 text-brand-teal text-xs font-semibold px-3 py-1 rounded-full">
                    {t(`volunteer.roles.${role.key}.time`)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Volunteer Form */}
          <div id="volunteer-form" className="max-w-4xl mx-auto bg-brand-light/30 rounded-3xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-brand-dark">{t('volunteer.application.title')}</h3>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.fullName')} *</label>
                  <input type="text" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.email')} *</label>
                  <input type="email" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.phone')} *</label>
                  <input type="tel" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.areaOfInterest')} *</label>
                  <select className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none">
                    <option>{t('volunteer.application.selectInterest')}</option>
                    {volunteerRoles.map((role) => (
                      <option key={role.key}>{t(`volunteer.roles.${role.key}.title`)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.availability')} *</label>
                <select className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none">
                  <option>{t('volunteer.application.selectAvailability')}</option>
                  <option>{t('volunteer.application.availabilityOptions.weekdaysMorning')}</option>
                  <option>{t('volunteer.application.availabilityOptions.weekdaysAfternoon')}</option>
                  <option>{t('volunteer.application.availabilityOptions.weekends')}</option>
                  <option>{t('volunteer.application.availabilityOptions.flexible')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.experience')}</label>
                <textarea rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" placeholder={t('volunteer.application.experiencePlaceholder')}></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('volunteer.application.motivation')} *</label>
                <textarea rows={4} className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none" placeholder={t('volunteer.application.motivationPlaceholder')}></textarea>
              </div>
              <button type="button" className="w-full bg-brand-teal hover:bg-teal-700 text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg">
                {tCommon('submitApplication')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('donation.title')}</h2>
            <p className="text-gray-600">{t('donation.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {donationAmounts.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group">
                  <div className="w-12 h-12 mx-auto bg-brand-light text-brand-teal rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <div className="text-2xl font-bold text-brand-dark mb-2">{t(`donation.amounts.${item.key}.amount`)}</div>
                  <p className="text-gray-500 text-sm">{t(`donation.amounts.${item.key}.description`)}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {donationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.key} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col h-full">
                  <div className="w-12 h-12 mx-auto bg-brand-light text-brand-teal rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">{t(`donation.types.${type.key}.title`)}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1">{t(`donation.types.${type.key}.description`)}</p>
                  <button className={`${type.action === 'primary' ? 'bg-brand-teal hover:bg-teal-700 text-white' : 'bg-brand-dark hover:bg-gray-700 text-white'} px-6 py-2 rounded-lg text-sm font-medium transition-colors`}>
                    {type.key === 'oneTime' ? tCommon('donateNow') : type.key === 'monthly' ? tCommon('setUpMonthly') : tCommon('learnMore')}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-brand-dark mb-6">{t('donation.whyMatters.title')}</h3>
                <div className="space-y-6">
                  {whyMattersItems.map((key) => (
                    <div key={key} className="flex items-start space-x-4">
                      <CheckCircle className="text-brand-teal shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold text-brand-dark">{t(`donation.whyMatters.${key}.title`)}</h4>
                        <p className="text-gray-500 text-sm">{t(`donation.whyMatters.${key}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button className="bg-brand-teal text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors">{tCommon('donateNow')}</button>
                </div>
              </div>
              <div className="lg:w-1/2 h-64 lg:h-auto relative">
                <img src="/assets/image/photo_23_2025-11-01_10-44-47.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('partnership.title')}</h2>
            <p className="text-gray-600">{t('partnership.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-brand-light/30 p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-white text-brand-teal rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">{t('partnership.corporate.title')}</h3>
              <p className="text-gray-600 text-sm mb-6">{t('partnership.corporate.description')}</p>
              <h4 className="font-bold text-sm text-brand-dark mb-3">{t('partnership.corporate.benefits.title')}</h4>
              <ul className="space-y-2">
                {['csr', 'volunteer', 'tax'].map((item) => (
                  <li key={item} className="flex items-start space-x-2 text-sm text-gray-500">
                    <CheckCircle size={14} className="text-brand-teal mt-1 shrink-0" />
                    <span>{t(`partnership.corporate.benefits.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-light/30 p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-white text-brand-teal rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Stethoscope size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">{t('partnership.healthcare.title')}</h3>
              <p className="text-gray-600 text-sm mb-6">{t('partnership.healthcare.description')}</p>
              <h4 className="font-bold text-sm text-brand-dark mb-3">{t('partnership.corporate.benefits.title')}</h4>
              <ul className="space-y-2">
                {['development', 'research', 'recognition'].map((item) => (
                  <li key={item} className="flex items-start space-x-2 text-sm text-gray-500">
                    <CheckCircle size={14} className="text-brand-teal mt-1 shrink-0" />
                    <span>{t(`partnership.healthcare.benefits.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-brand-light/30 p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-white text-brand-teal rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">{t('partnership.educational.title')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('partnership.educational.description')}</p>
              <ul className="space-y-2">
                {['internship', 'research', 'engagement'].map((item) => (
                  <li key={item} className="flex items-start space-x-2 text-sm text-gray-500">
                    <CheckCircle size={14} className="text-brand-teal mt-1 shrink-0" />
                    <span>{t(`partnership.educational.benefits.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-light/30 p-8 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-white text-brand-teal rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Landmark size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">{t('partnership.government.title')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('partnership.government.description')}</p>
              <ul className="space-y-2">
                {['policy', 'funding', 'scaling'].map((item) => (
                  <li key={item} className="flex items-start space-x-2 text-sm text-gray-500">
                    <CheckCircle size={14} className="text-brand-teal mt-1 shrink-0" />
                    <span>{t(`partnership.government.benefits.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-brand-light rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brand-dark mb-6">{t('partnership.currentPartners.title')}</h3>
              <p className="text-gray-600 text-sm mb-6">{t('partnership.currentPartners.subtitle')}</p>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-500">
                <div>{t('partnership.currentPartners.partners.ministry')}</div>
                <div>{t('partnership.currentPartners.partners.university')}</div>
                <div>{t('partnership.currentPartners.partners.clinics')}</div>
                <div>{t('partnership.currentPartners.partners.ngos')}</div>
                <div>{t('partnership.currentPartners.partners.community')}</div>
                <div>{t('partnership.currentPartners.partners.corporate')}</div>
              </div>
            </div>
            <div className="flex-1 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-brand-dark mb-4">{t('partnership.becomePartner.title')}</h3>
              <p className="text-gray-600 text-sm mb-6">{t('partnership.becomePartner.description')}</p>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone size={16} className="text-brand-teal" />
                  <span>{contactInfo.phone.primary}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail size={16} className="text-brand-teal" />
                  <span>{contactInfo.email.general}</span>
                </div>
              </div>
              <button className="w-full bg-brand-teal hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors">
                {tCommon('contactPartnershipTeam')}
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Events & Activities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('events.title')}</h2>
            <p className="text-gray-600">{t('events.subtitle')}</p>
          </div>
          
          <h3 className="text-xl font-bold text-brand-dark text-center mb-8">{t('events.upcoming')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {upcomingEvents.map((evt) => (
              <div key={evt.key} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={evt.img} alt={t(`events.${evt.key}.title`)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-bold text-lg text-brand-dark mb-4">{t(`events.${evt.key}.title`)}</h4>
                  <div className="space-y-2 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2"><Calendar size={14} /> {t(`events.${evt.key}.date`)}</div>
                    <div className="flex items-center gap-2"><Clock size={14} /> {t(`events.${evt.key}.time`)}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} /> {t(`events.${evt.key}.location`)}</div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{t(`events.${evt.key}.description`)}</p>
                  <button className="w-full bg-brand-teal hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                    {tCommon('registerNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white p-8 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl text-brand-dark mb-6">{t('events.pastEvents.title')}</h3>
              <div className="space-y-6">
                {pastEvents.map((item) => (
                  <div key={item} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{t(`events.pastEvents.events.${item}.name`)}</div>
                      <div className="text-xs text-gray-400">{t(`events.pastEvents.events.${item}.date`)}</div>
                    </div>
                    <span className="text-xs bg-brand-light text-brand-teal px-2 py-1 rounded-md font-medium">{t(`events.pastEvents.events.${item}.impact`)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 bg-brand-teal text-white p-10 rounded-2xl flex flex-col justify-center">
              <h3 className="font-bold text-2xl mb-2">{t('events.hostEvent.title')}</h3>
              <p className="text-teal-50 mb-6 text-sm">{t('events.hostEvent.description')}</p>
              <ul className="space-y-2 mb-8 text-sm">
                {hostEventBenefits.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal-200" />
                    <span>{t(`events.hostEvent.benefits.${item}`)}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-white text-brand-teal font-bold py-3 px-6 rounded-lg self-start hover:bg-teal-50 transition-colors">
                {tCommon('startPlanning')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
