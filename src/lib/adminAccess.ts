import type { UserRole } from '../types';

export type AdminSubview =
  | 'dashboard'
  | 'services'
  | 'service-edit'
  | 'templates'
  | 'quotes'
  | 'packages'
  | 'portfolio'
  | 'blog'
  | 'taxonomy'
  | 'media'
  | 'settings'
  | 'users'
  | 'home-customizer'
  | 'style-customizer'
  | 'header-hero'
  | 'home-slides'
  | 'marquee'
  | 'about-module'
  | 'features'
  | 'clients-testimonials'
  | 'promos'
  | 'faq'
  | 'contact-inbox'
  | 'footer-settings'
  | 'design-tasks';

const allStaff: UserRole[] = ['owner', 'admin', 'editor', 'sales', 'designer'];
const contentStaff: UserRole[] = ['owner', 'admin', 'editor'];
const salesStaff: UserRole[] = ['owner', 'admin', 'sales'];

export const ADMIN_VIEW_ACCESS: Record<AdminSubview, UserRole[]> = {
  dashboard: allStaff,
  quotes: [...salesStaff, 'designer'],
  'design-tasks': ['owner', 'admin', 'sales', 'designer'],
  'contact-inbox': salesStaff,
  services: [...contentStaff, 'sales', 'designer'],
  'service-edit': contentStaff,
  templates: contentStaff,
  packages: contentStaff,
  taxonomy: contentStaff,
  'home-customizer': contentStaff,
  'style-customizer': contentStaff,
  'header-hero': contentStaff,
  'home-slides': contentStaff,
  marquee: contentStaff,
  'about-module': contentStaff,
  features: contentStaff,
  'clients-testimonials': contentStaff,
  promos: contentStaff,
  'footer-settings': contentStaff,
  portfolio: contentStaff,
  media: contentStaff,
  blog: contentStaff,
  faq: contentStaff,
  settings: contentStaff,
  users: ['owner'],
};

export const canAccessAdminView = (role: UserRole, view: string): boolean => {
  const allowed = ADMIN_VIEW_ACCESS[view as AdminSubview];
  return Array.isArray(allowed) && allowed.includes(role);
};

export const adminRoleLabel = (role: UserRole): string => {
  switch (role) {
    case 'owner': return 'المالك / المدير العام';
    case 'admin': return 'مدير العمليات';
    case 'editor': return 'محرر الكتالوج والمحتوى';
    case 'sales': return 'مسؤول المبيعات وعروض الأسعار';
    case 'designer': return 'مصمم';
    default: return role;
  }
};
