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
    ? 'Myside Community - Hope for Every Child'
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
      siteName: 'Myside Community',
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
  title: 'Myside Community - Hope for Every Child',
  description: 'Supporting children and youth with special needs in Ethiopia through education, healthcare, and community support programs.',
  keywords: ['charity', 'Ethiopia', 'special needs', 'children', 'nonprofit', 'community'],
};

/**
 * Page-specific metadata configurations
 */
export const pageMetadataConfig: Record<string, Omit<PageMetadataOptions, 'locale' | 'path'>> = {
  home: {
    title: 'Home',
    description: 'Myside Community - Building hope for every child. Supporting children and youth with special needs in Ethiopia.',
    keywords: ['home', 'nonprofit', 'community support'],
  },
  about: {
    title: 'About Us',
    description: 'Learn about Myside Community\'s mission, vision, and the dedicated team working to support special needs children in Ethiopia.',
    keywords: ['about', 'mission', 'vision', 'team', 'board members'],
  },
  programs: {
    title: 'Our Programs',
    description: 'Discover our programs supporting children with special needs through education, healthcare, and community integration.',
    keywords: ['programs', 'education', 'healthcare', 'support'],
  },
  gallery: {
    title: 'Gallery',
    description: 'View photos and moments from Myside Community\'s activities and events supporting special needs children.',
    keywords: ['gallery', 'photos', 'events', 'activities'],
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with Myside Community. We\'d love to hear from you and answer any questions.',
    keywords: ['contact', 'reach us', 'location', 'email'],
  },
  'get-involved': {
    title: 'Get Involved',
    description: 'Join Myside Community as a volunteer or partner. Make a difference in the lives of special needs children.',
    keywords: ['volunteer', 'partner', 'get involved', 'join'],
  },
  donate: {
    title: 'Support Our Mission',
    description: 'Support Myside Community through bank transfer donations. Your contribution helps children with special needs.',
    keywords: ['donate', 'support', 'bank transfer', 'contribution'],
  },
};
