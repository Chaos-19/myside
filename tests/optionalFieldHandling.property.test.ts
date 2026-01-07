import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { shouldDisplayDegree } from '../lib/boardMemberUtils';

/**
 * **Feature: board-member-updates, Property 3: Optional Field Handling**
 * **Validates: Requirements 2.3**
 *
 * *For any* board member object, if the `degree` field is undefined or empty,
 * no degree element SHALL be rendered. If the `degree` field has a value,
 * that value SHALL appear in the rendered output.
 */
describe('Optional Field Handling Property Tests', () => {
  // Arbitrary for generating valid non-empty degree strings
  const nonEmptyDegreeArbitrary = fc.string({ minLength: 1, maxLength: 100 })
    .filter(s => s.trim().length > 0);

  // Arbitrary for generating whitespace-only strings
  const whitespaceOnlyArbitrary = fc.array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 1, maxLength: 20 })
    .map(chars => chars.join(''));

  /**
   * Property 3: When degree is undefined, shouldDisplayDegree returns undefined
   */
  it('Property 3: shouldDisplayDegree returns undefined when degree is undefined', () => {
    const result = shouldDisplayDegree(undefined);
    expect(result).toBeUndefined();
  });

  /**
   * Property 3: When degree is empty string, shouldDisplayDegree returns undefined
   */
  it('Property 3: shouldDisplayDegree returns undefined when degree is empty string', () => {
    const result = shouldDisplayDegree('');
    expect(result).toBeUndefined();
  });

  /**
   * Property 3: When degree is whitespace-only, shouldDisplayDegree returns undefined
   */
  it('Property 3: shouldDisplayDegree returns undefined for whitespace-only strings', () => {
    fc.assert(
      fc.property(whitespaceOnlyArbitrary, (degree: string) => {
        const result = shouldDisplayDegree(degree);
        expect(result).toBeUndefined();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: When degree has a non-empty value, shouldDisplayDegree returns that value
   */
  it('Property 3: shouldDisplayDegree returns the degree value when it is non-empty', () => {
    fc.assert(
      fc.property(nonEmptyDegreeArbitrary, (degree: string) => {
        const result = shouldDisplayDegree(degree);
        
        // The result should be exactly the input degree
        expect(result).toBe(degree);
        
        // The result should be defined
        expect(result).toBeDefined();
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: shouldDisplayDegree is deterministic - same input produces same output
   */
  it('Property 3: shouldDisplayDegree is deterministic', () => {
    fc.assert(
      fc.property(fc.option(fc.string(), { nil: undefined }), (degree: string | undefined) => {
        const result1 = shouldDisplayDegree(degree);
        const result2 = shouldDisplayDegree(degree);
        
        expect(result1).toBe(result2);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: For any non-empty, non-whitespace degree, the output preserves the value
   */
  it('Property 3: Non-empty degree values are preserved exactly', () => {
    fc.assert(
      fc.property(nonEmptyDegreeArbitrary, (degree: string) => {
        const result = shouldDisplayDegree(degree);
        
        // Value should be preserved exactly
        expect(result).toBe(degree);
        
        // Length should match
        expect(result?.length).toBe(degree.length);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
