import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generatePageMetadata, pageMetadataConfig } from '../lib/metadata';
import { locales, type Locale } from '../lib/i18n';

/**
 * **Feature: nextjs-i18n-migration, Property 4: SEO metadata presence**
 * **Validates: Requirements 2.1, 2.2, 2.3**
 *
 * *For any* page in the application, the rendered HTML SHALL contain title,
 * description, and Open Graph meta tags with non-empty values.
 */
describe('SEO Metadata Presence', () => {
  // All page keys from the metadata config
  const pageKeys = Object.keys(pageMetadataConfig);

  /**
   * Property 4: SEO metadata presence
   * For any page and locale combination, generated metadata must contain
   * title, description, and Open Graph tags with non-empty values
   */
  it('Property 4: Every page has required SEO metadata fields', () => {
    const pageArbitrary = fc.constantFrom(...pageKeys);
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(pageArbitrary, localeArbitrary, (pageKey: string, locale: Locale) => {
        const config = pageMetadataConfig[pageKey];
        const path = pageKey === 'home' ? '' : `/${pageKey}`;
        
        const metadata = generatePageMetadata({
          ...config,
          path,
          locale,
        });

        // Title must exist and be non-empty
        expect(metadata.title).toBeDefined();
        expect(typeof metadata.title).toBe('string');
        expect((metadata.title as string).trim().length).toBeGreaterThan(0);

        // Description must exist and be non-empty
        expect(metadata.description).toBeDefined();
        expect(typeof metadata.description).toBe('string');
        expect((metadata.description as string).trim().length).toBeGreaterThan(0);

        // Open Graph must exist with required fields
        expect(metadata.openGraph).toBeDefined();
        expect(metadata.openGraph?.title).toBeDefined();
        expect(metadata.openGraph?.description).toBeDefined();
        expect(metadata.openGraph?.url).toBeDefined();
        expect(metadata.openGraph?.images).toBeDefined();
        expect(Array.isArray(metadata.openGraph?.images)).toBe(true);
        expect((metadata.openGraph?.images as Array<unknown>).length).toBeGreaterThan(0);

        // Twitter card must exist
        expect(metadata.twitter).toBeDefined();
        expect(metadata.twitter?.card).toBeDefined();
        expect(metadata.twitter?.title).toBeDefined();
        expect(metadata.twitter?.description).toBeDefined();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Exhaustive check: verify ALL page/locale combinations
   */
  it('Property 4: Exhaustive check - all pages have complete SEO metadata', () => {
    const missingFields: string[] = [];

    for (const pageKey of pageKeys) {
      for (const locale of locales) {
        const config = pageMetadataConfig[pageKey];
        const path = pageKey === 'home' ? '' : `/${pageKey}`;
        
        const metadata = generatePageMetadata({
          ...config,
          path,
          locale,
        });

        const prefix = `${pageKey}/${locale}`;

        // Check title
        if (!metadata.title || (typeof metadata.title === 'string' && metadata.title.trim().length === 0)) {
          missingFields.push(`${prefix}: missing title`);
        }

        // Check description
        if (!metadata.description || metadata.description.trim().length === 0) {
          missingFields.push(`${prefix}: missing description`);
        }

        // Check Open Graph
        if (!metadata.openGraph) {
          missingFields.push(`${prefix}: missing openGraph`);
        } else {
          if (!metadata.openGraph.title) missingFields.push(`${prefix}: missing og:title`);
          if (!metadata.openGraph.description) missingFields.push(`${prefix}: missing og:description`);
          if (!metadata.openGraph.url) missingFields.push(`${prefix}: missing og:url`);
          if (!metadata.openGraph.images || (metadata.openGraph.images as Array<unknown>).length === 0) {
            missingFields.push(`${prefix}: missing og:image`);
          }
        }

        // Check Twitter
        if (!metadata.twitter) {
          missingFields.push(`${prefix}: missing twitter card`);
        }
      }
    }

    expect(missingFields).toEqual([]);
  });

  /**
   * Property: Canonical URLs are correctly formatted for each locale
   */
  it('Property 4: Canonical URLs are correctly formatted', () => {
    const pageArbitrary = fc.constantFrom(...pageKeys);
    const localeArbitrary = fc.constantFrom(...locales);

    fc.assert(
      fc.property(pageArbitrary, localeArbitrary, (pageKey: string, locale: Locale) => {
        const config = pageMetadataConfig[pageKey];
        const path = pageKey === 'home' ? '' : `/${pageKey}`;
        
        const metadata = generatePageMetadata({
          ...config,
          path,
          locale,
        });

        // Canonical URL must be defined
        expect(metadata.alternates?.canonical).toBeDefined();
        
        // URL must be a valid URL string
        const canonical = metadata.alternates?.canonical as string;
        expect(canonical).toMatch(/^https?:\/\//);

        // For non-default locale, URL should contain locale prefix
        if (locale !== 'en') {
          expect(canonical).toContain(`/${locale}`);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
