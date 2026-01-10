/**
 * Constants and static data for Myside Community Charity Organization website.
 */

import { Event } from '@/types';

// Organization Info
export const organizationInfo = {
  name: 'Myside Community Charity Organization',
  nameAm: 'የማይሳይድ ልዩ ፍላጎቶች የሚሹ ልጆች ማህበረሰብ የበጎ አድራጎት ድርጅት',
  shortName: 'Myside Community',
  tagline: 'Building Hope for Every Child',
  taglineAm: '', // To be updated from Amharic documents
  foundedYear: 2024,
  yearsOfService: 7,
  description: 'To be a leading and comprehensive center of excellence in Ethiopia, where every child and community member with special needs is empowered, included, and equipped to lead a fulfilling and productive life.',
  descriptionAm: '', // To be updated from Amharic documents
  mission: 'To establish and operate a fully equipped and accessible educational and vocational training center that provides individualized academic programs, therapeutic support, and vocational skills development for children and youth with conditions such as ADHD, Down Syndrome, Autism, Cerebral Palsy, Sensory Processing Disorder (SPD), Developmental Coordination Disorder (DCD), and Obsessive Compulsive Disorder (OCD), while also offering guidance, support, and empowerment to their families and the wider community.',
  missionAm: '', // To be updated from Amharic documents
  vision: 'To be a leading and comprehensive center of excellence in Ethiopia, where every child and community member with special needs is empowered, included, and equipped to lead a fulfilling and productive life.',
  visionAm: '', // To be updated from Amharic documents
  goals: [
    'To open a special needs school and provide educational services.',
    'To establish a complete, organized, and accessible teaching and training center.',
    'To offer personalized educational programs tailored to each child\'s unique needs.',
    'To provide speech therapy, special needs support, and advisory and awareness services for parents and the community.',
    'To support the mothers and parents of children with these needs.',
    'To connect incapable community members with charitable organizations to receive aid.',
    'To create job opportunities for unemployed youth or community members.',
  ],
};

// Contact Information
export const contactInfo = {
  address: {
    street: 'Akaki/Kality, Woreda 01',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    full: 'Akaki/Kality, Woreda 01, Addis Ababa, Ethiopia',
  },
  phone: {
    primary: '+251911355321',
    secondary: '+251911355321',
  },
  email: {
    general: 'info@mysidespnesc.et',
    donations: 'donate@mysidespnesc.et',
    enrollment: 'enrollment@mysidespnesc.et',
  },
  officeHours: {
    weekdays: '8:00 AM - 5:00 PM',
    saturday: '9:00 AM - 2:00 PM',
    sunday: 'Closed',
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5364.50422895976!2d38.790814596137444!3d8.867121133370745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNTEnNTkuNiJOIDM4wrA0NycyNy43IkU!5e1!3m2!1sen!2set!4v1767964220752!5m2!1sen!2set",
};

// Bank Information for Donations
export const bankInfo = [
  {
    bankName: 'Dashen Bank',
    accountName: 'Myside Community Charity Organization',
    accountNumber: '5003525328011',
    note: 'Please contact us for the complete account details before making a transfer',
  },
  {
    bankName: 'Hibret Bank',
    accountName: 'Myside Community Charity Organization',
    accountNumber: '2020',
    note: 'Please contact us for the complete account details before making a transfer',
  }
];

// Statistics
export const statistics = {
  childrenSupported: '30+',
  familiesHelped: '30+',
  corePrograms: '5+',
  yearsOfService: '2',
  successRate: '95%',
  directImpact: '100%',
};


// Testimonials
export const testimonials = [
  {
    quote: 'I never thought my son would be able to attend school, but thanks to Myside Community, he is thriving in an inclusive classroom.',
    author: 'Helen B.',
    role: 'Parent',
    img: 'https://source.unsplash.com/200x200/?person',
  },
  {
    quote: 'The therapy sessions have been a lifeline for us. The staff are so caring and professional. We finally feel supported.',
    author: 'Dawit M.',
    role: 'Parent',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'Volunteering here has changed my perspective on life. Seeing the kids smile every day is the greatest reward.',
    author: 'Sara T.',
    role: 'Volunteer',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  },
];

// Programs Summary (for home page)
export const programsSummary = [
  {
    title: 'Educational Support',
    desc: 'Specialized education for children with ADHD, Down Syndrome, Autism, Cerebral Palsy, SPD, DCD, and OCD using individualized academic programs.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Therapeutic Services',
    desc: 'Comprehensive therapy including speech therapy, occupational therapy, and counseling to address behavioral and developmental needs.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Family Support',
    desc: 'Empowering families through guidance, counseling, and support groups to help them navigate the challenges of raising children with special needs.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Vocational Training',
    desc: 'Practical skills training in dedicated workshops to equip youth with special needs for independent living and meaningful employment.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Community Outreach',
    desc: 'Raising awareness about special needs and connecting vulnerable community members with charitable resources.',
    color: 'bg-orange-100 text-orange-600',
  },
];

// Impact Statistics for Impact section
export const impactStats = [
  { val: '500+', label: 'Children Supported', sub: 'Children with special needs receiving our services' },
  { val: '200+', label: 'Families Helped', sub: 'Families receiving support and guidance' },
  { val: '5+', label: 'Core Programs', sub: 'Comprehensive programs running simultaneously' },
  { val: '95%', label: 'Success Rate', sub: 'Children showing significant improvement' },
];

// About Stats
export const aboutStats = [
  { value: '500+', label: 'Children Supported' },
  { value: '200+', label: 'Families Helped' },
  { value: '5+', label: 'Core Programs' },
  { value: '7', label: 'Years of Service' },
];

// Social Media Links
export const socialLinks = {
  facebook: 'https://www.facebook.com/profile.php?id=61586003655458',
  instagram: 'https://www.instagram.com/p/DTUu7RWjPQR/?igsh=MXVxemF5bmFxb21jOQ==',
  twitter: 'https://twitter.com/mysidecommunity',
  linkedin: 'https://linkedin.com/company/mysidecommunity',
  youtube: 'https://youtube.com/@mysidecommunity',
};

// Hero Content
export const heroContent = {
  title: 'Building Hope for Every Child',
  subtitle: 'Supporting children and youth with special needs in Ethiopia. Together, we create an inclusive community where every child can thrive and reach their full potential.',
  backgroundImage: '/assets/image/transparent1.png',
  ctaPrimary: 'Make a Donation',
  ctaSecondary: 'Our Programs',
};

// Upcoming Events (Legacy support)
export const upcomingEvents = [
  {
    title: 'Grand Launch Event',
    date: 'January 11, 2026',
    description: 'Official launch of Myside Community Charity Organization center',
  },
  {
    title: 'Community Awareness Day',
    date: 'February 15, 2026',
    description: 'Join us for a day of learning and community building',
  },
  {
    title: 'Annual Fundraising Gala',
    date: 'March 20, 2026',
    description: 'Support our mission at our annual fundraising event',
  },
];

// Events Data
export const events: Event[] = [
  {
    id: 'evt-001',
    title: 'Community Gathering 2025',
    date: '2025-12-28',
    description: 'A wonderful gathering of our community members celebrating our achievements.',
    image: '/assets/event image/photo_1_2025-12-28_14-29-59.jpg',
    category: 'past',
  },
  {
    id: 'evt-002',
    title: 'Youth Workshop',
    date: '2025-12-28',
    description: 'Engaging workshop for youth focusing on skill development.',
    image: '/assets/event image/photo_2_2025-12-28_14-29-59.jpg',
    category: 'past',
  },
  {
    id: 'evt-003',
    title: 'Family Support Session',
    date: '2025-12-28',
    description: 'Support session for families to share experiences and learn together.',
    image: '/assets/event image/photo_3_2025-12-28_14-29-59.jpg',
    category: 'past',
  },
  {
    id: 'evt-004',
    title: 'Art Therapy Exhibition',
    date: '2025-12-28',
    description: 'Showcasing the creative works of our talented children.',
    image: '/assets/event image/photo_4_2025-12-28_14-29-59.jpg',
    category: 'past',
  },
  {
    id: 'evt-005',
    title: 'Volunteer Appreciation',
    date: '2025-12-28',
    description: 'Celebrating the dedication and hard work of our volunteers.',
    image: '/assets/event image/photo_5_2025-12-28_14-29-59.jpg',
    category: 'past',
  },
  {
    id: 'evt-006',
    title: 'Grand Launch Event',
    date: '2026-01-11',
    description: 'Official launch of Myside Community Charity Organization center',
    category: 'upcoming',
  },
  {
    id: 'evt-007',
    title: 'Community Awareness Day',
    date: '2026-02-15',
    description: 'Join us for a day of learning and community building',
    category: 'upcoming',
  },
  {
    id: 'evt-008',
    title: 'Annual Fundraising Gala',
    date: '2026-03-20',
    description: 'Support our mission at our annual fundraising event',
    category: 'upcoming',
  },
];


export default {
  organizationInfo,
  contactInfo,
  bankInfo,
  statistics,
  testimonials,
  programsSummary,
  impactStats,
  aboutStats,
  socialLinks,
  heroContent,
  upcomingEvents,
  events,
};
