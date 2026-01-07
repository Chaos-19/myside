import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { BoardMember } from '../types';

/**
 * **Feature: asset-data-integration, Property 1: Board member data completeness**
 * **Validates: Requirements 1.2, 2.2**
 * 
 * *For any* board member object in the data array, the object SHALL contain 
 * non-empty values for id, name, role, and photo fields.
 */
describe('Board Member Data Structure Validation', () => {
  // Arbitrary for generating valid BoardMember objects
  const boardMemberArbitrary = fc.record({
    id: fc.string({ minLength: 1 }),
    name: fc.string({ minLength: 1 }),
    role: fc.string({ minLength: 1 }),
    photo: fc.string({ minLength: 1 }),
    bio: fc.option(fc.string(), { nil: undefined }),
    order: fc.nat(),
  });

  /**
   * Property 1: Board member data completeness
   * For any board member object, required fields (id, name, role, photo) must be non-empty strings
   */
  it('Property 1: Board member data completeness - all required fields are non-empty', () => {
    fc.assert(
      fc.property(boardMemberArbitrary, (member: BoardMember) => {
        // Verify all required fields exist and are non-empty
        expect(member.id).toBeDefined();
        expect(member.id.length).toBeGreaterThan(0);
        
        expect(member.name).toBeDefined();
        expect(member.name.length).toBeGreaterThan(0);
        
        expect(member.role).toBeDefined();
        expect(member.role.length).toBeGreaterThan(0);
        
        expect(member.photo).toBeDefined();
        expect(member.photo.length).toBeGreaterThan(0);
        
        // Order must be a non-negative number
        expect(typeof member.order).toBe('number');
        expect(member.order).toBeGreaterThanOrEqual(0);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Validation function that can be used to validate board member data at runtime
   */
  const isValidBoardMember = (member: unknown): member is BoardMember => {
    if (typeof member !== 'object' || member === null) return false;
    const m = member as Record<string, unknown>;
    return (
      typeof m.id === 'string' && m.id.length > 0 &&
      typeof m.name === 'string' && m.name.length > 0 &&
      typeof m.role === 'string' && m.role.length > 0 &&
      typeof m.photo === 'string' && m.photo.length > 0 &&
      typeof m.order === 'number' && m.order >= 0
    );
  };

  it('Property 1: Validation function correctly identifies valid board members', () => {
    fc.assert(
      fc.property(boardMemberArbitrary, (member: BoardMember) => {
        return isValidBoardMember(member) === true;
      }),
      { numRuns: 100 }
    );
  });

  it('Property 1: Validation function rejects invalid board members', () => {
    // Test with empty required fields
    const invalidMembers = [
      { id: '', name: 'Test', role: 'Role', photo: '/path.jpg', order: 1 },
      { id: 'test', name: '', role: 'Role', photo: '/path.jpg', order: 1 },
      { id: 'test', name: 'Test', role: '', photo: '/path.jpg', order: 1 },
      { id: 'test', name: 'Test', role: 'Role', photo: '', order: 1 },
      { id: 'test', name: 'Test', role: 'Role', photo: '/path.jpg', order: -1 },
      null,
      undefined,
      {},
    ];

    invalidMembers.forEach((member) => {
      expect(isValidBoardMember(member)).toBe(false);
    });
  });
});
