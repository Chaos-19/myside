import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import enMessages from '../messages/en.json';
import amMessages from '../messages/am.json';

/**
 * **Feature: nextjs-i18n-migration, Property 1: Translation key completeness**
 * **Validates: Requirements 1.5, 5.2**
 *
 * *For any* translation key that exists in the English (en) translation file,
 * the same key SHALL exist in the Amharic (am) translation file with a non-empty string value.
 */
describe('Translation Key Completeness', () => {
  /**
   * Helper function to recursively extract all key paths from a nested object
   */
  function getAllKeyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
    const paths: string[] = [];

    for (const key of Object.keys(obj)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        paths.push(...getAllKeyPaths(value as Record<string, unknown>, fullPath));
      } else {
        paths.push(fullPath);
      }
    }

    return paths;
  }

  /**
   * Helper function to get a value from a nested object by key path
   */
  function getValueByPath(obj: Record<string, unknown>, path: string): unknown {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return current;
  }

  // Get all key paths from English translations
  const allEnglishKeyPaths = getAllKeyPaths(enMessages as Record<string, unknown>);

  /**
   * Property 1: Translation key completeness
   * For any translation key in English, the same key must exist in Amharic with a non-empty value
   */
  it('Property 1: Every English translation key exists in Amharic with non-empty value', () => {
    // Create an arbitrary that samples from the actual English key paths
    const keyPathArbitrary = fc.constantFrom(...allEnglishKeyPaths);

    fc.assert(
      fc.property(keyPathArbitrary, (keyPath: string) => {
        const enValue = getValueByPath(enMessages as Record<string, unknown>, keyPath);
        const amValue = getValueByPath(amMessages as Record<string, unknown>, keyPath);

        // The key must exist in Amharic
        expect(amValue).toBeDefined();

        // If the English value is a string, the Amharic value must also be a non-empty string
        if (typeof enValue === 'string') {
          expect(typeof amValue).toBe('string');
          expect((amValue as string).trim().length).toBeGreaterThan(0);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional exhaustive check: verify ALL keys (not just sampled ones)
   * This ensures complete coverage beyond the property-based sampling
   */
  it('Property 1: Exhaustive check - all English keys exist in Amharic', () => {
    const missingKeys: string[] = [];
    const emptyKeys: string[] = [];

    for (const keyPath of allEnglishKeyPaths) {
      const enValue = getValueByPath(enMessages as Record<string, unknown>, keyPath);
      const amValue = getValueByPath(amMessages as Record<string, unknown>, keyPath);

      if (amValue === undefined) {
        missingKeys.push(keyPath);
      } else if (typeof enValue === 'string' && typeof amValue === 'string') {
        if (amValue.trim().length === 0) {
          emptyKeys.push(keyPath);
        }
      }
    }

    expect(missingKeys).toEqual([]);
    expect(emptyKeys).toEqual([]);
  });
});
