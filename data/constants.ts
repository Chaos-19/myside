/**
 * Constants and static data for Myside Community Charity Organization website.
 */

// Organization Info
export const organizationInfo = {
  name: 'Myside Community Charity Organization',
  shortName: 'Myside Community',
  tagline: 'Building Hope for Every Child',
  foundedYear: 2018,
  yearsOfService: 7,
  description: 'Supporting children and youth with special needs in Ethiopia. Together, we create an inclusive community where every child can thrive and reach their full potential.',
  mission: 'Myside Community Charity Organization is dedicated to supporting children and youth with special needs including Autism, Down Syndrome, ADHD, and Cerebral Palsy. We believe every child deserves love, support, and the opportunity to reach their full potential.',
};

// Contact Information
export const contactInfo = {
  address: {
    street: 'Bole Sub-City',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    full: 'Myside Community Center, Bole Sub-City, Addis Ababa, Ethiopia',
  },
  phone: {
    primary: '+251 911 123 456',
    secondary: '+251 922 345 678',
  },
  email: {
    general: 'info@mysidecommunity.org',
    donations: 'donate@mysidecommunity.org',
    enrollment: 'enrollment@mysidecommunity.org',
  },
  officeHours: {
    weekdays: '8:00 AM - 5:00 PM',
    saturday: '9:00 AM - 2:00 PM',
    sunday: 'Closed',
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39498828498!2d38.6894!3d8.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1703350000000!5m2!1sen!2sus',
};

// Bank Information for Donations
export const bankInfo = {
  bankName: 'Commercial Bank of Ethiopia (CBE)',
  accountName: 'Myside Community Charity Organization',
  accountNumber: '1000XXXXXXXXXX',
  note: 'Please contact us for the complete account details before making a transfer',
};

// Statistics
export const statistics = {
  childrenSupported: '500+',
  familiesHelped: '200+',
  corePrograms: '5+',
  yearsOfService: '7',
  successRate: '95%',
  directImpact: '100%',
};


// Testimonials
export const testimonials = [
  {
    quote: 'I never thought my son would be able to attend school, but thanks to Myside Community, he is thriving in an inclusive classroom.',
    author: 'Helen B.',
    role: 'Parent',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop',
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
    desc: 'Specialized learning programs with individualized academic programs tailored for children with autism, ADHD, and other learning differences.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Therapeutic Services',
    desc: 'Comprehensive therapy programs including speech therapy, occupational, and behavioral therapy to enhance development.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Family Support',
    desc: 'Counseling, training, and support groups for families, especially for mothers and parents navigating special needs care.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Vocational Training',
    desc: 'Vocational skills development to equip youth with special needs for fulfilling and productive lives.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Community Outreach',
    desc: 'Awareness programs and job creation initiatives to build understanding and acceptance of special needs in the community.',
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
  facebook: 'https://facebook.com/mysidecommunity',
  instagram: 'https://instagram.com/mysidecommunity',
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

// Upcoming Events
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
};
