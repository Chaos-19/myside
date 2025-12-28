import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero, About, Programs, Testimonials, Impact, ContactSection } from '@/components/home';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <div className="animate-fadeIn">
      <Hero />
      <About />
      <Programs />
      <Testimonials />
      <Impact />
      <ContactSection />
    </div>
  );
}
