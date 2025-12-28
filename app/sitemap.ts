import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '../lib/i18n';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mysidecommunity.org';

// All page routes in the application
const routes = [
  '',
  '/about',
  '/programs',
  '/gallery',
  '/contact',
  '/donate',
  '/get-involved',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each route in each locale
  for (const route of routes) {
    for (const locale of locales) {
      const url = locale === defaultLocale
        ? `${baseUrl}${route}`
        : `${baseUrl}/${locale}${route}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [
              loc,
              loc === defaultLocale
                ? `${baseUrl}${route}`
                : `${baseUrl}/${loc}${route}`,
            ])
          ),
        },
      });
    }
  }

  return sitemapEntries;
}

// Export routes for testing
export { routes };
