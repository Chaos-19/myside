import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import fs from 'fs';
import path from 'path';
import constants, { events, organizationInfo } from '../data/constants';

describe('Constants Data Properties', () => {
  const publicDir = path.join(process.cwd(), 'public');

  it('Property 1: Event image paths reference existing files', () => {
    // Filter events that have images
    const eventsWithImages = events.filter(e => e.image);

    eventsWithImages.forEach(event => {
      if (event.image) {
        const fullPath = path.join(publicDir, event.image);
        const exists = fs.existsSync(fullPath);
        expect(exists, `Image not found: ${event.image}`).toBe(true);
      }
    });
  });

  it('Property 2: Date format consistency', () => {
    events.forEach(event => {
      // Check for YYYY-MM-DD or Month DD, YYYY
      const isISO = /^\d{4}-\d{2}-\d{2}$/.test(event.date);
      const isHumanReadable = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(event.date);
      expect(isISO || isHumanReadable, `Invalid date format: ${event.date}`).toBe(true);
    });
  });

  it('Property 3: Event structure completeness', () => {
    events.forEach(event => {
      expect(event.id).toBeTruthy();
      expect(event.title).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.description).toBeTruthy();
    });
  });

  it('Property 4: Image path format', () => {
    const eventsWithImages = events.filter(e => e.image);
    eventsWithImages.forEach(event => {
      if (event.image) {
        expect(event.image.startsWith('/assets/'), `Image path must start with /assets/: ${event.image}`).toBe(true);
        expect(event.image.includes('http'), `Image path must be relative: ${event.image}`).toBe(false);
      }
    });
  });

  it('Property 5: Export completeness', () => {
    const expectedExports = [
      'organizationInfo',
      'contactInfo',
      'bankInfo',
      'statistics',
      'testimonials',
      'programsSummary',
      'impactStats',
      'aboutStats',
      'socialLinks',
      'heroContent',
      'upcomingEvents',
      'events'
    ];

    expectedExports.forEach(key => {
      expect(constants).toHaveProperty(key);
    });
  });

  it('Property 6: Bilingual fields structure', () => {
    expect(organizationInfo).toHaveProperty('nameAm');
    expect(organizationInfo).toHaveProperty('taglineAm');
    expect(organizationInfo).toHaveProperty('descriptionAm');
    expect(organizationInfo).toHaveProperty('missionAm');
    expect(organizationInfo).toHaveProperty('visionAm');
    expect(organizationInfo).toHaveProperty('goals');
    expect(Array.isArray(organizationInfo.goals)).toBe(true);
    expect(Array.isArray(organizationInfo.goals)).toBe(true);
  });
});

import galleryImages from '../data/galleryData';

describe('Gallery Data Properties', () => {
  const publicDir = path.join(process.cwd(), 'public');

  it('Property 7: Gallery image paths reference existing files', () => {
    galleryImages.forEach(image => {
      const fullPath = path.join(publicDir, image.src);
      const exists = fs.existsSync(fullPath);
      expect(exists, `Gallery image not found: ${image.src}`).toBe(true);
    });
  });
});
