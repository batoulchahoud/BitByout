export type SpecialtyId = 'social' | 'film' | 'web';
export type Specialty = {
  id: SpecialtyId;
  number: string;
  name: string;
  category: string;
  description: string;
  route: string;
  accent: string;
  bright: string;
  deep: string;
  services: string[];
};

// All specialty content, destinations and palette choices live here.
export const specialties: Specialty[] = [
  {
    id: 'social',
    number: '01',
    name: 'Socials Management',
    category: 'MAKE YOURSELF HEARD',
    description: 'we keep ur page alive with Stories that connect & Content that stays.',
    route: '/social-content',
    accent: '#c477ff',
    bright: '#ff9cde',
    deep: '#572080',
    services: ['Social strategy', 'Content creation', 'Brand storytelling'],
  },
  {
    id: 'film',
    number: '02',
    name: 'autocad -> 3D',
    category: 'BRING IDEAS TO LIFE',
    description: 'AutoCAD 2D to 3D solid modeling workspace.',
    route: '/film-3d',
    accent: '#e5b76d',
    bright: '#fff0c5',
    deep: '#755021',
    services: ['AutoCad', '3D & motion design', 'Visual experiences'],
  },
  {
    id: 'web',
    number: '03',
    name: 'Web & Technology',
    category: 'BUILD WHAT’S NEXT',
    description: 'Thoughtful design = Powerful possibilities.',
    route: '/web-technology',
    accent: '#65d5ce',
    bright: '#c5fff5',
    deep: '#185e60',
    services: ['Web ideas', 'Digital products', 'Creative development'],
  },
];

export const serviceGroups: Record<
  SpecialtyId,
  { title: string; names: string }
> = {
  social: {
    title: 'Social Media',
    names: 'Instagram, TikTok, Facebook, WhatsApp',
  },
  film: {
    title: '3D Design & 3D Printing',
    names: '3D symbol, measuring tape, map or blueprint',
  },
  web: {
    title: 'Website Design & Development',
    names: 'Decorative pixel dinosaur, WWW web, desktop computer',
  },
};
