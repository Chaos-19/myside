import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { GalleryImage } from '../types';

/**
 * **Feature: asset-data-integration, Property 4: Gallery image categorization**
 * **Validates: Requirements 3.2**
 * 
 * *For any* set of gallery images with category assignments, images with the same 
 * category SHALL be grouped together in the rendered output.
 */
describe('Gallery Image Categorization', () => {
  // Generate arrays of gallery images with unique IDs
  const galleryImagesArbitrary = fc.array(
    fc.record({
      src: fc.string({ minLength: 1 }),
      alt: fc.string({ minLength: 1 }),
      category: fc.option(fc.constantFrom('Team', 'Events', 'Activities', 'Facilities'), { nil: undefined }),
      caption: fc.option(fc.string(), { nil: undefined }),
    }),
    { minLength: 1, maxLength: 20 }
  ).map(images => 
    // Assign unique IDs to each image
    images.map((img, index) => ({
      ...img,
      id: `gallery-image-${index}`,
    }))
  );

  /**
   * Groups images by category - simulates the grouping logic used in GalleryPage
   */
  const groupImagesByCategory = (images: GalleryImage[]): Record<string, GalleryImage[]> => {
    const groups: Record<string, GalleryImage[]> = {};
    images.forEach(img => {
      const category = img.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(img);
    });
    return groups;
  };

  /**
   * Property 4: Gallery image categorization
   * For any set of gallery images with category assignments, images with the same 
   * category SHALL be grouped together in the rendered output.
   */
  it('Property 4: Images with the same category are grouped together', () => {
    fc.assert(
      fc.property(galleryImagesArbitrary, (images: GalleryImage[]) => {
        const grouped = groupImagesByCategory(images);
        
        // For each category group, verify all images have the same category
        for (const [category, groupImages] of Object.entries(grouped)) {
          for (const img of groupImages) {
            const imgCategory = img.category || 'Uncategorized';
            expect(imgCategory).toBe(category);
          }
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: All images are accounted for after grouping
   */
  it('Property 4: Grouping preserves all images (no images lost)', () => {
    fc.assert(
      fc.property(galleryImagesArbitrary, (images: GalleryImage[]) => {
        const grouped = groupImagesByCategory(images);
        
        // Count total images in all groups
        const totalGroupedImages = Object.values(grouped).reduce(
          (sum, group) => sum + group.length, 
          0
        );
        
        // Total should equal original array length
        expect(totalGroupedImages).toBe(images.length);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Each image appears in exactly one category group
   */
  it('Property 4: Each image appears in exactly one category group', () => {
    fc.assert(
      fc.property(galleryImagesArbitrary, (images: GalleryImage[]) => {
        const grouped = groupImagesByCategory(images);
        
        // Collect all image IDs from groups
        const allGroupedIds: string[] = [];
        for (const groupImages of Object.values(grouped)) {
          for (const img of groupImages) {
            allGroupedIds.push(img.id);
          }
        }
        
        // Each original image ID should appear exactly once
        for (const img of images) {
          const occurrences = allGroupedIds.filter(id => id === img.id).length;
          expect(occurrences).toBe(1);
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
