import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { formatDisplayName } from '../lib/boardMemberUtils';

/**
 * **Feature: board-member-updates, Property 2: Title Prepending**
 * **Validates: Requirements 2.1, 2.3**
 *
 * *For any* board member with a defined title, the displayed name SHALL be the
 * concatenation of the title, a space, and the name. For any board member without
 * a title, the displayed name SHALL be exactly the name.
 */
describe('Title Prepending Property Tests', () => {
  // Arbitrary for generating valid name strings (non-empty alphabetic with spaces)
  const nameArbitrary = fc.array(
    fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z]+$/.test(s)),
    { minLength: 1, maxLength: 4 }
  ).map(parts => parts.join(' '));

  // Arbitrary for generating valid title strings (common professional titles)
  const titleArbitrary = fc.constantFrom('Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.', 'Eng.', 'Rev.');

  /**
   * Property 2: With title - displayed name is title + space + name
   */
  it('Property 2: formatDisplayName with title returns title + space + name', () => {
    fc.assert(
      fc.property(nameArbitrary, titleArbitrary, (name: string, title: string) => {
        const result = formatDisplayName(name, title);
        
        // Result should be exactly title + space + name
        expect(result).toBe(`${title} ${name}`);
        
        // Result should start with the title
        expect(result.startsWith(title)).toBe(true);
        
        // Result should end with the name
        expect(result.endsWith(name)).toBe(true);
        
        // Result length should be title + 1 (space) + name
        expect(result.length).toBe(title.length + 1 + name.length);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Without title - displayed name is exactly the name
   */
  it('Property 2: formatDisplayName without title returns exactly the name', () => {
    fc.assert(
      fc.property(nameArbitrary, (name: string) => {
        const result = formatDisplayName(name, undefined);
        
        // Result should be exactly the name
        expect(result).toBe(name);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Empty string title behaves like no title
   */
  it('Property 2: formatDisplayName with empty string title returns title + space + name', () => {
    fc.assert(
      fc.property(nameArbitrary, (name: string) => {
        const result = formatDisplayName(name, '');
        
        // Empty string is falsy, so should return just the name
        expect(result).toBe(name);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
