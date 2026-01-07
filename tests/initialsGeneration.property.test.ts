import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getInitials } from '../lib/boardMemberUtils';

/**
 * **Feature: board-member-updates, Property 1: Initials Generation Consistency**
 * **Validates: Requirements 1.2**
 *
 * *For any* board member name string, the `getInitials` function SHALL produce
 * a string of exactly 1-2 uppercase letters derived from the first characters
 * of the name parts.
 */
describe('Initials Generation Property Tests', () => {
  // Arbitrary for generating valid name parts (non-empty alphabetic strings)
  const namePartArbitrary = fc.string({ minLength: 1, maxLength: 20 })
    .filter(s => /^[a-zA-Z]+$/.test(s));

  // Arbitrary for generating valid full names (1-5 name parts separated by spaces)
  const fullNameArbitrary = fc.array(namePartArbitrary, { minLength: 1, maxLength: 5 })
    .map(parts => parts.join(' '));

  /**
   * Property 1: Initials are always 1-2 uppercase characters
   */
  it('Property 1: getInitials produces 1-2 uppercase letters for any valid name', () => {
    fc.assert(
      fc.property(fullNameArbitrary, (name: string) => {
        const initials = getInitials(name);

        // Initials must be 1-2 characters
        expect(initials.length).toBeGreaterThanOrEqual(1);
        expect(initials.length).toBeLessThanOrEqual(2);

        // All characters must be uppercase letters
        expect(initials).toMatch(/^[A-Z]{1,2}$/);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1: Initials are derived from first characters of name parts
   */
  it('Property 1: Initials are derived from first characters of name parts', () => {
    fc.assert(
      fc.property(fullNameArbitrary, (name: string) => {
        const initials = getInitials(name);
        const nameParts = name.split(' ').filter(part => part.length > 0);

        // Each initial character should match the uppercase first char of corresponding name part
        for (let i = 0; i < initials.length; i++) {
          const expectedChar = nameParts[i].charAt(0).toUpperCase();
          expect(initials.charAt(i)).toBe(expectedChar);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1: Single-word names produce single-character initials
   */
  it('Property 1: Single-word names produce exactly 1 initial', () => {
    fc.assert(
      fc.property(namePartArbitrary, (name: string) => {
        const initials = getInitials(name);

        expect(initials.length).toBe(1);
        expect(initials).toBe(name.charAt(0).toUpperCase());

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1: Multi-word names produce exactly 2 initials (capped at 2)
   */
  it('Property 1: Multi-word names produce exactly 2 initials', () => {
    const multiWordNameArbitrary = fc.array(namePartArbitrary, { minLength: 2, maxLength: 5 })
      .map(parts => parts.join(' '));

    fc.assert(
      fc.property(multiWordNameArbitrary, (name: string) => {
        const initials = getInitials(name);

        expect(initials.length).toBe(2);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
