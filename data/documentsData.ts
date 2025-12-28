import type { OrganizationDocument } from '@/types';

/**
 * Organization documents data for the Myside Community Charity Organization.
 * 
 * Document paths reference files in the public/assets/Company legal documents directory.
 */
export const organizationDocuments: OrganizationDocument[] = [
  {
    id: 'certification',
    name: 'Company Certification',
    path: '/assets/Company legal documents/company ceretificationn.pdf',
    type: 'pdf',
    description: 'Official organization certification'
  },
  {
    id: 'supporting-letter',
    name: 'Supporting Letter',
    path: '/assets/Company legal documents/Supporting letter.pdf',
    type: 'pdf',
    description: 'Organization supporting documentation'
  }
];

export default organizationDocuments;
