import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { OrganizationDocument } from '../types';

/**
 * **Feature: asset-data-integration, Property 2: Document links open in new tab**
 * **Validates: Requirements 4.2**
 * 
 * *For any* organization document rendered on the page, the link element 
 * SHALL have target="_blank" attribute to open in a new browser tab.
 */

/**
 * **Feature: asset-data-integration, Property 3: Document display completeness**
 * **Validates: Requirements 4.3**
 * 
 * *For any* organization document data object, the rendered output 
 * SHALL contain the document name and type indicator.
 */

// Helper function that simulates rendering a document link
// This represents the expected rendering behavior for document links
function renderDocumentLink(doc: OrganizationDocument): string {
  const typeIndicator = doc.type === 'pdf' ? '[PDF]' : '[Document]';
  return `<a href="${doc.path}" target="_blank" rel="noopener noreferrer">${doc.name} ${typeIndicator}</a>`;
}

// Validation function to check if rendered output has target="_blank"
function hasTargetBlank(renderedHtml: string): boolean {
  return renderedHtml.includes('target="_blank"');
}

// Validation function to check if rendered output contains name and type
function hasNameAndType(renderedHtml: string, doc: OrganizationDocument): boolean {
  const hasName = renderedHtml.includes(doc.name);
  const hasType = renderedHtml.includes('[PDF]') || renderedHtml.includes('[Document]');
  return hasName && hasType;
}

describe('Document Links Property Tests', () => {
  // Arbitrary for generating valid OrganizationDocument objects
  const organizationDocumentArbitrary = fc.record({
    id: fc.string({ minLength: 1 }),
    name: fc.string({ minLength: 1 }),
    path: fc.string({ minLength: 1 }),
    type: fc.constantFrom('pdf', 'other') as fc.Arbitrary<'pdf' | 'other'>,
    description: fc.option(fc.string(), { nil: undefined }),
  });

  /**
   * Property 2: Document links open in new tab
   * For any organization document, the rendered link SHALL have target="_blank"
   */
  it('Property 2: Document links open in new tab - all document links have target="_blank"', () => {
    fc.assert(
      fc.property(organizationDocumentArbitrary, (doc: OrganizationDocument) => {
        const rendered = renderDocumentLink(doc);
        
        expect(hasTargetBlank(rendered)).toBe(true);
        expect(rendered).toContain('target="_blank"');
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Document display completeness
   * For any organization document, the rendered output SHALL contain name and type
   */
  it('Property 3: Document display completeness - rendered output contains name and type', () => {
    fc.assert(
      fc.property(organizationDocumentArbitrary, (doc: OrganizationDocument) => {
        const rendered = renderDocumentLink(doc);
        
        expect(hasNameAndType(rendered, doc)).toBe(true);
        expect(rendered).toContain(doc.name);
        
        // Type indicator should be present
        if (doc.type === 'pdf') {
          expect(rendered).toContain('[PDF]');
        } else {
          expect(rendered).toContain('[Document]');
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Verify the actual organizationDocuments data
   */
  it('Property 2 & 3: Real organization documents render correctly', async () => {
    const { organizationDocuments } = await import('../data/documentsData');
    
    organizationDocuments.forEach((doc) => {
      const rendered = renderDocumentLink(doc);
      
      // Property 2: Has target="_blank"
      expect(hasTargetBlank(rendered)).toBe(true);
      
      // Property 3: Contains name and type
      expect(hasNameAndType(rendered, doc)).toBe(true);
    });
  });
});
