import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import GetInvolvedPageContent from '@/components/get-involved/GetInvolvedPageContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.getInvolved' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function GetInvolvedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <GetInvolvedPageContent />;
}
