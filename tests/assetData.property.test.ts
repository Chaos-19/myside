import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { BoardMember, GalleryImage, OrganizationDocument } from '../types';

/**
 * **Feature: asset-data-integration, Property 5: Asset data round-trip consistency**
 * **Validates: Requirements 5.4**
 * 
 * *For any* valid asset data object (board member, gallery image, or document),
 * serializing to JSON and deserializing SHALL produce an equivalent object.
 */
describe('Asset Data Serialization', () => {
  // Arbitrary for generating valid BoardMember objects
  const boardMemberArbitrary = fc.record({
    id: fc.string({ minLength: 1 }),
    name: fc.string({ minLength: 1 }),
    role: fc.string({ minLength: 1 }),
    photo: fc.string({ minLength: 1 }),
    bio: fc.option(fc.string(), { nil: undefined }),
    order: fc.nat(),
  });

  // Arbitrary for generating valid GalleryImage objects
  const galleryImageArbitrary = fc.record({
    id: fc.string({ minLength: 1 }),
    src: fc.string({ minLength: 1 }),
    alt: fc.string({ minLength: 1 }),
    category: fc.option(fc.string(), { nil: undefined }),
    caption: fc.option(fc.string(), { nil: undefined }),
  });

  // Arbitrary for generating valid OrganizationDocument objects
  const organizationDocumentArbitrary = fc.record({
    id: fc.string({ minLength: 1 }),
    name: fc.string({ minLength: 1 }),
    path: fc.string({ minLength: 1 }),
    type: fc.constantFrom('pdf', 'other') as fc.Arbitrary<'pdf' | 'other'>,
    description: fc.option(fc.string(), { nil: undefined }),
  });

  /**
   * Property 5: Asset data round-trip consistency for BoardMember
   */
  it('Property 5: BoardMember JSON round-trip produces equivalent object', () => {
    fc.assert(
      fc.property(boardMemberArbitrary, (member: BoardMember) => {
        const serialized = JSON.stringify(member);
        const deserialized = JSON.parse(serialized) as BoardMember;

        expect(deserialized.id).toBe(member.id);
        expect(deserialized.name).toBe(member.name);
        expect(deserialized.role).toBe(member.role);
        expect(deserialized.photo).toBe(member.photo);
        expect(deserialized.bio).toBe(member.bio);
        expect(deserialized.order).toBe(member.order);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Asset data round-trip consistency for GalleryImage
   */
  it('Property 5: GalleryImage JSON round-trip produces equivalent object', () => {
    fc.assert(
      fc.property(galleryImageArbitrary, (image: GalleryImage) => {
        const serialized = JSON.stringify(image);
        const deserialized = JSON.parse(serialized) as GalleryImage;

        expect(deserialized.id).toBe(image.id);
        expect(deserialized.src).toBe(image.src);
        expect(deserialized.alt).toBe(image.alt);
        expect(deserialized.category).toBe(image.category);
        expect(deserialized.caption).toBe(image.caption);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Asset data round-trip consistency for OrganizationDocument
   */
  it('Property 5: OrganizationDocument JSON round-trip produces equivalent object', () => {
    fc.assert(
      fc.property(organizationDocumentArbitrary, (doc: OrganizationDocument) => {
        const serialized = JSON.stringify(doc);
        const deserialized = JSON.parse(serialized) as OrganizationDocument;

        expect(deserialized.id).toBe(doc.id);
        expect(deserialized.name).toBe(doc.name);
        expect(deserialized.path).toBe(doc.path);
        expect(deserialized.type).toBe(doc.type);
        expect(deserialized.description).toBe(doc.description);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
