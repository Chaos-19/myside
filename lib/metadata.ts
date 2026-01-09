import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from './i18n';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mysidespnesc.et';

export interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  locale?: Locale;
  ogImage?: string;
}

export interface OpenGraphImageOptions {
  title: string;
  description?: string;
  locale?: Locale;
}

/**
 * Get the base URL for the application
 */
export function getBaseUrl(): string {
  return baseUrl;
}

/**
 * Generate the canonical URL for a page
 */
export function getCanonicalUrl(path: string, locale: Locale = defaultLocale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${locale}${cleanPath}`;
}

/**
 * Generate alternate language URLs for a page
 */
export function getAlternateLanguages(path: string): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return Object.fromEntries(
    locales.map((loc) => [
      loc,
      loc === defaultLocale ? `${baseUrl}${cleanPath}` : `${baseUrl}/${loc}${cleanPath}`,
    ])
  );
}

/**
 * Generate Open Graph image configuration
 */
export function generateOgImage(options: OpenGraphImageOptions): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  const { title, ogImage = '/assets/image/hero.jpg' } = options as OpenGraphImageOptions & { ogImage?: string };
  return {
    url: ogImage || '/assets/image/hero.jpg',
    width: 1200,
    height: 630,
    alt: title,
  };
}

/**
 * Get the Open Graph locale string for a given locale
 */
export function getOgLocale(locale: Locale): string {
  return locale === 'am' ? 'am_ET' : 'en_US';
}

/**
 * Generate metadata for a page with SEO best practices
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = '',
  locale = defaultLocale,
  ogImage = '/assets/image/hero.jpg',
}: PageMetadataOptions): Metadata {
  const url = getCanonicalUrl(path, locale);

  const fullTitle = title === 'Home'
    ? 'Myside Community Charity Organization - Building Hope for Every Child'
    : `${title} | Myside Community`;

  return {
    title: fullTitle,
    description,
    keywords: ['charity', 'Ethiopia', 'special needs', 'children', ...keywords],
    authors: [{ name: 'Myside Community' }],
    creator: 'Myside Community',
    publisher: 'Myside Community',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Myside Community Charity Organization',
      images: [generateOgImage({ title, ogImage } as OpenGraphImageOptions & { ogImage: string })],
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Default metadata for pages without specific configuration
 */
export const defaultMetadata: Metadata = {
  title: 'Myside Community Charity Organization - Building Hope for Every Child',
  description: 'Myside Community Charity Organization is a non-profit dedicated to empowering children and youth with special needs in Ethiopia through education, therapy, and community support.',
  keywords: [
    'Myside Community',
    'Charity Organization',
    'Ethiopia',
    'Addis Ababa',
    'Special Needs',
    'Disability Support',
    'Autism',
    'Down Syndrome',
    'ADHD',
    'Cerebral Palsy',
    'Sensory Processing Disorder',
    'Developmental Coordination Disorder',
    'Obsessive Compulsive Disorder',
    'Inclusive Education',
    'Vocational Training',
    'Therapy Center',
    'Non-profit',
    'NGO'
  ],
};

/**
 * Page-specific metadata configurations
 */
export const pageMetadataConfig: Record<string, Omit<PageMetadataOptions, 'locale' | 'path'>> = {
  home: {
    title: 'Home',
    description: 'Myside Community Charity Organization - Building hope for every child. We provide specialized education, therapy, and vocational training for children and youth with special needs in Ethiopia.',
    keywords: ['home', 'charity', 'special needs support', 'Ethiopia charity', 'inclusive community'],
  },
  about: {
    title: 'About Us',
    description: 'Learn about Myside Community\'s mission to establish a center of excellence for special needs. Meet our dedicated team and board members working to empower children in Ethiopia.',
    keywords: ['about us', 'mission', 'vision', 'team', 'board members', 'history', 'organization goals'],
  },
  programs: {
    title: 'Our Programs',
    description: 'Discover our comprehensive programs: Educational Support, Therapeutic Services, Family Support, Vocational Training, and Community Outreach for children with special needs.',
    keywords: ['programs', 'special education', 'speech therapy', 'occupational therapy', 'family counseling', 'vocational skills'],
  },
  gallery: {
    title: 'Gallery',
    description: 'Explore our gallery showcasing the impact of our work, community events, and the smiles of the children we support at Myside Community Charity Organization.',
    keywords: ['gallery', 'photos', 'events', 'community activities', 'impact'],
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with Myside Community Charity Organization in Addis Ababa. Contact us for enrollment, donations, or general inquiries.',
    keywords: ['contact', 'address', 'phone number', 'email', 'location', 'Addis Ababa', 'Akaki Kality'],
  },
  'get-involved': {
    title: 'Get Involved',
    description: 'Join us in making a difference. Volunteer your time, partner with us, or support our mission to help children with special needs reach their full potential.',
    keywords: ['volunteer', 'get involved', 'partnership', 'support us', 'community service'],
  },
  donate: {
    title: 'Donate',
    description: 'Your donation transforms lives. Support Myside Community Charity Organization to provide education and therapy for children with special needs in Ethiopia.',
    keywords: ['donate', 'give', 'support charity', 'donation', 'bank transfer', 'help children'],
  },
  'dashboard': {
    title: 'Dashboard',
    description: 'Myside Community Admin Dashboard for managing events, applications, and gallery.',
    keywords: ['admin', 'dashboard', 'management'],
  },
};
