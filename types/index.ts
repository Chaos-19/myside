/**
 * Type definitions for Myside Community Next.js application.
 */

// i18n Types
import { locales } from '@/lib/i18n';

export type Locale = (typeof locales)[number];

export interface LocalizedString {
  en: string;
  am: string;
}

// Board Member Types
export interface BoardMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  order: number;
  title?: string;   // Professional designation (e.g., "Dr.", "Prof.")
  degree?: string;  // Educational credentials (e.g., "PhD in Medicine")
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
  caption?: string;
}

// Document Types
export interface OrganizationDocument {
  id: string;
  name: string;
  path: string;
  type: 'pdf' | 'other';
  description?: string;
}

// SEO Metadata Types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Testimonial Types
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  img: string;
}

// Program Types
export interface ProgramSummary {
  title: string;
  desc: string;
  color: string;
}

// Impact Stat Types
export interface ImpactStat {
  val: string;
  label: string;
  sub: string;
}

// About Stat Types
export interface AboutStat {
  value: string;
  label: string;
}

// Event Types
export interface UpcomingEvent {
  title: string;
  date: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  titleAm?: string;
  date: string;
  description: string;
  descriptionAm?: string;
  image?: string;
  category?: 'past' | 'upcoming';
  location?: string;
}
