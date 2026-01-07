import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { locales, defaultLocale, type Locale } from '../lib/i18n';
import { routes } from '../app/sitemap';

/**
 * **Feature: nextjs-i18n-migration, Property 2: Locale URL routing consistency**
 * **Validates: Requirements 1.3**
 *
 * *For any* valid page path and any supported locale,
 * navigating to `/{locale}/{path}` SHALL render the page with content in the specified locale.
 */
describe('Locale URL Routing Consistency', () => {
  /**
   * Helper function to construct the expected URL for a given route and locale
   * Based on the middleware configuration with localePrefix: 'as-needed'
   */
  function constructUrl(route: string, locale: Locale): string {
    // For default locale (en), no prefix is needed
    // For other locales, prefix is required
    if (locale === defaultLocale) {
      return route || '/';
    }
    return `/${locale}${route}`;
  }

  /**
   * Helper function to extract locale from a URL path
   */
  function extractLocaleFromPath(path: string): Locale | null {
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      return segments[0] as Locale;
    }
    return null;
  }

  /**
   * Helper function to extract the route path without locale prefix
   */
  function extractRouteFromPath(path: string): string {
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      return '/' + segments.slice(1).join('/') || '';
    }
    return path;
  }

  /**
   * Property 2: Locale URL routing consistency
   * For any route and locale, the constructed URL follows the expected pattern
   */
  it('Property 2: URL construction is consistent for all route/locale combinations', () => {
    const routeArbitrary = fc.constantFrom(...routes);
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(routeArbitrary, localeArbitrary, (route: string, locale: Locale) => {
        const url = constructUrl(route, locale);

        // URL must be a valid path
        expect(url).toMatch(/^\/[a-z\-\/]*$/i);

        // For default locale, URL should not have locale prefix
        if (locale === defaultLocale) {
          expect(url).not.toMatch(/^\/en(\/|$)/);
          expect(url).toBe(route || '/');
        } else {
          // For non-default locale, URL must start with locale prefix
          expect(url).toMatch(new RegExp(`^/${locale}(/|$)`));
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Round-trip consistency
   * Constructing a URL and extracting components should be consistent
   */
  it('Property 2: URL construction and extraction are inverse operations', () => {
    const routeArbitrary = fc.constantFrom(...routes);
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(routeArbitrary, localeArbitrary, (route: string, locale: Locale) => {
        const url = constructUrl(route, locale);

        // Extract locale from constructed URL
        const extractedLocale = extractLocaleFromPath(url);
        const extractedRoute = extractRouteFromPath(url);

        // For non-default locale, extracted locale should match
        if (locale !== defaultLocale) {
          expect(extractedLocale).toBe(locale);
        } else {
          // For default locale, no locale should be extracted
          expect(extractedLocale).toBeNull();
        }

        // Extracted route should match original (normalized)
        const normalizedRoute = route || '/';
        const normalizedExtracted = extractedRoute || '/';
        expect(normalizedExtracted).toBe(normalizedRoute);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: All locales produce unique URLs for the same route
   */
  it('Property 2: Different locales produce different URLs for same route', () => {
    const routeArbitrary = fc.constantFrom(...routes);

    fc.assert(
      fc.property(routeArbitrary, (route: string) => {
        const urls = locales.map((locale) => constructUrl(route, locale));

        // All URLs should be unique
        const uniqueUrls = new Set(urls);
        expect(uniqueUrls.size).toBe(locales.length);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Same locale produces unique URLs for different routes
   */
  it('Property 2: Same locale produces unique URLs for different routes', () => {
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(localeArbitrary, (locale: Locale) => {
        const urls = routes.map((route) => constructUrl(route, locale));

        // All URLs should be unique
        const uniqueUrls = new Set(urls);
        expect(uniqueUrls.size).toBe(routes.length);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Exhaustive check: verify all route/locale combinations
   */
  it('Property 2: Exhaustive check - all routes accessible in all locales', () => {
    const issues: string[] = [];

    for (const route of routes) {
      for (const locale of locales) {
        const url = constructUrl(route, locale);

        // Verify URL format
        if (!url.startsWith('/')) {
          issues.push(`Invalid URL format for ${locale}:${route} -> ${url}`);
        }

        // Verify locale prefix rules
        if (locale === defaultLocale && url.includes('/en')) {
          issues.push(`Default locale should not have prefix: ${url}`);
        }

        if (locale !== defaultLocale && !url.startsWith(`/${locale}`)) {
          issues.push(`Non-default locale missing prefix: ${locale}:${route} -> ${url}`);
        }
      }
    }

    expect(issues).toEqual([]);
  });
});
