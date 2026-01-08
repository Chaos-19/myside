import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import sitemap, { routes } from '../app/sitemap';
import { locales, defaultLocale, type Locale } from '../lib/i18n';

/**
 * **Feature: nextjs-i18n-migration, Property 5: Sitemap completeness**
 * **Validates: Requirements 2.4**
 *
 * *For any* page route in the application and any supported locale,
 * the generated sitemap.xml SHALL contain an entry for that page-locale combination.
 */
describe('Sitemap Completeness', () => {
  // Generate the sitemap entries
  const sitemapEntries = sitemap();
  const baseUrl = 'https://mysidespnesc.et';

  /**
   * Property 5: Sitemap completeness
   * For any route and locale combination, the sitemap must contain an entry
   */
  it('Property 5: Every route/locale combination exists in sitemap', () => {
    const routeArbitrary = fc.constantFrom(...routes);
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(routeArbitrary, localeArbitrary, (route: string, locale: Locale) => {
        // Construct the expected URL
        const expectedUrl = locale === defaultLocale
          ? `${baseUrl}${route}`
          : `${baseUrl}/${locale}${route}`;

        // Find the entry in the sitemap
        const entry = sitemapEntries.find((e) => e.url === expectedUrl);

        // Entry must exist
        expect(entry).toBeDefined();

        // Entry must have required fields
        expect(entry?.url).toBe(expectedUrl);
        expect(entry?.lastModified).toBeDefined();
        expect(entry?.changeFrequency).toBeDefined();
        expect(entry?.priority).toBeDefined();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Exhaustive check: verify ALL route/locale combinations
   */
  it('Property 5: Exhaustive check - all routes in all locales are in sitemap', () => {
    const missingEntries: string[] = [];

    for (const route of routes) {
      for (const locale of locales) {
        const expectedUrl = locale === defaultLocale
          ? `${baseUrl}${route}`
          : `${baseUrl}/${locale}${route}`;

        const entry = sitemapEntries.find((e) => e.url === expectedUrl);

        if (!entry) {
          missingEntries.push(`${locale}:${route || '/'}`);
        }
      }
    }

    expect(missingEntries).toEqual([]);
  });

  /**
   * Property: Sitemap entries have valid alternate language links
   */
  it('Property 5: Sitemap entries have alternate language links', () => {
    const routeArbitrary = fc.constantFrom(...routes);
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(routeArbitrary, localeArbitrary, (route: string, locale: Locale) => {
        const expectedUrl = locale === defaultLocale
          ? `${baseUrl}${route}`
          : `${baseUrl}/${locale}${route}`;

        const entry = sitemapEntries.find((e) => e.url === expectedUrl);

        // Entry must have alternates
        expect(entry?.alternates).toBeDefined();
        expect(entry?.alternates?.languages).toBeDefined();

        // Alternates must include all locales
        const languages = entry?.alternates?.languages as Record<string, string>;
        for (const loc of locales) {
          expect(languages[loc]).toBeDefined();
          expect(languages[loc]).toMatch(/^https?:\/\//);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Sitemap has correct number of entries
   */
  it('Property 5: Sitemap has correct total number of entries', () => {
    // Total entries should be routes * locales
    const expectedCount = routes.length * locales.length;
    expect(sitemapEntries.length).toBe(expectedCount);
  });

  /**
   * Property: Home page has highest priority
   */
  it('Property 5: Home page has highest priority', () => {
    const homeEntries = sitemapEntries.filter(
      (e) => e.url === baseUrl || e.url === `${baseUrl}/am`
    );

    for (const entry of homeEntries) {
      expect(entry.priority).toBe(1.0);
      expect(entry.changeFrequency).toBe('weekly');
    }
  });
});
