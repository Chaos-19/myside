import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { locales, type Locale } from '../lib/i18n';
import {
  getPathWithoutLocale,
  buildLocalizedUrl,
} from '../lib/localeUtils';

/**
 * **Feature: nextjs-i18n-migration, Property 3: Language switcher preserves page context**
 * **Validates: Requirements 6.3**
 *
 * *For any* page and current locale, switching to a different locale SHALL navigate
 * to the same page path with the new locale prefix while preserving all URL parameters.
 */
describe('Language Switcher - Page Context Preservation', () => {
  // Valid page paths in the application
  const validPagePaths = [
    '/',
    '/about',
    '/programs',
    '/gallery',
    '/contact',
    '/donate',
    '/get-involved',
  ];

  // Arbitrary for generating valid page paths
  const pagePathArbitrary = fc.constantFrom(...validPagePaths);

  // Arbitrary for generating locales
  const localeArbitrary = fc.constantFrom(...locales);

  // Arbitrary for generating query parameters
  const queryParamArbitrary = fc.record({
    key: fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-z]+$/.test(s)),
    value: fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-z0-9]+$/.test(s)),
  });

  /**
   * Property 3a: Switching locale preserves the page path
   * For any page path and locale combination, switching to a different locale
   * should result in a URL with the same page path but different locale prefix.
   */
  it('Property 3a: Switching locale preserves the page path', () => {
    fc.assert(
      fc.property(
        pagePathArbitrary,
        localeArbitrary,
        localeArbitrary,
        (pagePath, currentLocale, newLocale) => {
          // Build the current pathname with locale prefix
          const currentPathname =
            pagePath === '/' ? `/${currentLocale}` : `/${currentLocale}${pagePath}`;

          // Build the new URL
          const newUrl = buildLocalizedUrl(currentPathname, currentLocale, newLocale, null);

          // Extract the page path from the new URL
          const extractedPath = getPathWithoutLocale(newUrl, newLocale);

          // The page path should be preserved
          expect(extractedPath).toBe(pagePath);

          // The new URL should start with the new locale
          expect(newUrl.startsWith(`/${newLocale}`)).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3b: Switching locale preserves query parameters
   * For any page with query parameters, switching locale should preserve those parameters.
   */
  it('Property 3b: Switching locale preserves query parameters', () => {
    fc.assert(
      fc.property(
        pagePathArbitrary,
        localeArbitrary,
        localeArbitrary,
        fc.array(queryParamArbitrary, { minLength: 1, maxLength: 3 }),
        (pagePath, currentLocale, newLocale, queryParams) => {
          // Build the current pathname with locale prefix
          const currentPathname =
            pagePath === '/' ? `/${currentLocale}` : `/${currentLocale}${pagePath}`;

          // Create URLSearchParams from the query params
          const searchParams = new URLSearchParams();
          for (const param of queryParams) {
            searchParams.set(param.key, param.value);
          }

          // Build the new URL
          const newUrl = buildLocalizedUrl(currentPathname, currentLocale, newLocale, searchParams);

          // The new URL should contain all query parameters
          for (const param of queryParams) {
            expect(newUrl).toContain(`${param.key}=${param.value}`);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3c: Round-trip locale switching returns to original path
   * Switching from locale A to B and back to A should return to the original URL structure.
   */
  it('Property 3c: Round-trip locale switching returns to original path', () => {
    fc.assert(
      fc.property(
        pagePathArbitrary,
        localeArbitrary,
        localeArbitrary.filter((l) => l !== locales[0]), // Ensure different locale for round-trip
        (pagePath, startLocale, intermediateLocale) => {
          // Build the initial pathname
          const initialPathname =
            pagePath === '/' ? `/${startLocale}` : `/${startLocale}${pagePath}`;

          // Switch to intermediate locale
          const intermediateUrl = buildLocalizedUrl(
            initialPathname,
            startLocale,
            intermediateLocale,
            null
          );

          // Switch back to start locale
          const finalUrl = buildLocalizedUrl(
            intermediateUrl,
            intermediateLocale,
            startLocale,
            null
          );

          // Extract paths
          const initialPath = getPathWithoutLocale(initialPathname, startLocale);
          const finalPath = getPathWithoutLocale(finalUrl, startLocale);

          // The page path should be the same after round-trip
          expect(finalPath).toBe(initialPath);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3d: All supported locales produce valid URLs
   * For any page path, switching to any supported locale should produce a valid URL.
   */
  it('Property 3d: All supported locales produce valid URLs', () => {
    fc.assert(
      fc.property(pagePathArbitrary, localeArbitrary, localeArbitrary, (pagePath, currentLocale, newLocale) => {
        const currentPathname =
          pagePath === '/' ? `/${currentLocale}` : `/${currentLocale}${pagePath}`;

        const newUrl = buildLocalizedUrl(currentPathname, currentLocale, newLocale, null);

        // URL should be a valid path (starts with /)
        expect(newUrl.startsWith('/')).toBe(true);

        // URL should contain the new locale
        expect(newUrl.startsWith(`/${newLocale}`)).toBe(true);

        // URL should not have double slashes (except for protocol, which we don't have)
        expect(newUrl).not.toContain('//');

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
