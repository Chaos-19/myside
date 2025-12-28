'use client';

import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import MissionVision from './MissionVision';
import Timeline from './Timeline';
import BoardMembers from './BoardMembers';
import DocumentsSection from './DocumentsSection';

export default function AboutPageContent() {
  const t = useTranslations('aboutPage');

  return (
    <div className="animate-fadeIn">
      <PageHero 
        title={t('title')}
        subtitle={t('subtitle')}
        bgImage="/assets/image/hero.jpg"
      />

      <MissionVision />
      <Timeline />
      <BoardMembers />
      <DocumentsSection />
    </div>
  );
}
