import React, { createContext, useContext, useState, useEffect } from 'react';
import { applyThemeToDocument } from '../utils/themeEngine';
import {
  Department,
  Category,
  Subcategory,
  ServiceTemplate,
  Service,
  Package,
  PortfolioProject,
  BlogPost,
  SiteSettings,
  User,
  QuoteRequest,
  QuoteItem,
  MediaItem,
  QuoteStatus,
  ArtworkStatus,
  HomeSlide,
  MarqueeTickerItem,
  HeroHeaderSettings,
  AboutUsModuleData,
  RawajFeature,
  ClientLogo,
  Testimonial,
  PromoModuleSettings,
  PromoBanner,
  GlobalFAQItem,
  FooterSettings,
  HomeModuleConfig,
  HomeModuleId,
  ThemeCustomizerSettings,
  ContactFormMessage,
  BrandDisplayMode,
  DesignTask,
  DesignProofVersion,
  DesignComment,
  DesignTaskStatus,
  IndustrySector
} from '../types';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_CATEGORIES,
  INITIAL_TEMPLATES,
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_BLOG_POSTS,
  INITIAL_SITE_SETTINGS,
  INITIAL_USERS,
  INITIAL_DESIGN_TASKS,
  INITIAL_MEDIA,
  INITIAL_HOME_SLIDES,
  INITIAL_MARQUEE_ITEMS,
  INITIAL_HERO_HEADER_SETTINGS,
  INITIAL_ABOUT_US_DATA,
  INITIAL_RAWAJ_FEATURES,
  INITIAL_CLIENT_LOGOS,
  INITIAL_TESTIMONIALS,
  INITIAL_PROMO_SETTINGS,
  INITIAL_FAQ_ITEMS,
  INITIAL_FOOTER_SETTINGS,
  INITIAL_HOME_MODULES_CONFIG,
  INITIAL_THEME_SETTINGS,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_INDUSTRY_SECTORS
} from '../data/initialData';
import {
  db,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from '../lib/cloudDb';
import { supabase } from '../lib/supabase';
import { removeRawajStorageObject } from '../lib/storage';

export type NavigationTarget =
  | { view: 'home' }
  | { view: 'departments' }
  | { view: 'services'; departmentId?: string; categoryId?: string; industrySectorId?: string; searchQuery?: string }
  | { view: 'service-detail'; serviceId: string }
  | { view: 'quote-cart' }
  | { view: 'packages' }
  | { view: 'package-detail'; packageId: string }
  | { view: 'portfolio'; projectId?: string }
  | { view: 'blog' }
  | { view: 'blog-post'; postId: string }
  | { view: 'about-contact' }
  | { view: 'custom-quote' }
  | { 
      view: 'admin'; 
      subView?: 
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
      editServiceId?: string; 
      editTemplateId?: string 
    };

interface AppContextType {
  // Designer Tasks & Workflows
  designTasks: DesignTask[];
  createDesignTask: (taskData: Omit<DesignTask, 'id' | 'created_at' | 'updated_at' | 'proof_versions' | 'comments'>) => Promise<DesignTask>;
  updateDesignTask: (id: string, updates: Partial<DesignTask>) => Promise<void>;
  addDesignProof: (taskId: string, proof: Omit<DesignProofVersion, 'id' | 'created_at'>) => Promise<void>;
  addDesignComment: (taskId: string, comment: Omit<DesignComment, 'id' | 'created_at'>) => Promise<void>;
  deleteDesignTask: (id: string) => Promise<void>;
  // Theme & Visual Styles
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeSettings: ThemeCustomizerSettings;
  updateThemeSettings: (settings: Partial<ThemeCustomizerSettings>) => Promise<void>;

  // Cloud Sync State
  isCloudSynced: boolean;

  // Navigation
  currentRoute: NavigationTarget;
  navigate: (target: NavigationTarget) => void;

  // Catalog Data
  departments: Department[];
  categories: Category[];
  subcategories: Subcategory[];
  templates: ServiceTemplate[];
  services: Service[];
  packages: Package[];
  industrySectors: IndustrySector[];
  getIndustrySectorById: (id: string) => IndustrySector | undefined;
  portfolioProjects: PortfolioProject[];
  blogPosts: BlogPost[];
  mediaItems: MediaItem[];
  siteSettings: SiteSettings;
  users: User[];
  currentUser: User;
  setCurrentUser: (user: User) => void;

  // Home Page Section Customizer & Order
  homeModulesConfig: HomeModuleConfig[];
  updateHomeModulesConfig: (configs: HomeModuleConfig[]) => Promise<void>;
  toggleModuleVisibility: (id: HomeModuleId) => Promise<void>;
  reorderHomeModules: (startIndex: number, endIndex: number) => Promise<void>;
  updateModuleLayout: (id: HomeModuleId, layout_style: string) => Promise<void>;

  // Module 1: Collapsible Hero Header
  heroHeaderSettings: HeroHeaderSettings;
  updateHeroHeaderSettings: (settings: Partial<HeroHeaderSettings>) => Promise<void>;

  // Module 2: Cinematic Slider
  homeSlides: HomeSlide[];
  addHomeSlide: (slide: Omit<HomeSlide, 'id'>) => Promise<void>;
  updateHomeSlide: (id: string, slide: Partial<HomeSlide>) => Promise<void>;
  deleteHomeSlide: (id: string) => Promise<void>;

  // Module 3: Marquee News Ticker
  marqueeItems: MarqueeTickerItem[];
  addMarqueeItem: (item: Omit<MarqueeTickerItem, 'id'>) => Promise<void>;
  updateMarqueeItem: (id: string, item: Partial<MarqueeTickerItem>) => Promise<void>;
  deleteMarqueeItem: (id: string) => Promise<void>;

  // Module 4: About Us Mini-Module
  aboutUsData: AboutUsModuleData;
  updateAboutUsData: (data: Partial<AboutUsModuleData>) => Promise<void>;

  // Module 5: Features / Why Choose Us
  rawajFeatures: RawajFeature[];
  addRawajFeature: (feat: Omit<RawajFeature, 'id'>) => Promise<void>;
  updateRawajFeature: (id: string, feat: Partial<RawajFeature>) => Promise<void>;
  deleteRawajFeature: (id: string) => Promise<void>;

  // Module 8 & 9: Brands & Testimonials
  clientLogos: ClientLogo[];
  brandsDisplayMode: BrandDisplayMode;
  updateBrandsDisplayMode: (mode: BrandDisplayMode) => Promise<void>;
  addClientLogo: (cli: Omit<ClientLogo, 'id'>) => Promise<void>;
  updateClientLogo: (id: string, cli: Partial<ClientLogo>) => Promise<void>;
  deleteClientLogo: (id: string) => Promise<void>;

  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  submitPublicTestimonial: (data: { client_name_ar: string; client_title_ar: string; client_company_ar: string; comment_ar: string; rating: number }) => Promise<void>;
  updateTestimonialStatus: (id: string, status: 'approved' | 'pending' | 'rejected') => Promise<void>;

  // Module 10: Featured Offers & Promo Banners
  promoSettings: PromoModuleSettings;
  updatePromoSettings: (settings: Partial<PromoModuleSettings>) => Promise<void>;
  addPromoBanner: (banner: Omit<PromoBanner, 'id'>) => Promise<void>;
  updatePromoBanner: (id: string, banner: Partial<PromoBanner>) => Promise<void>;
  deletePromoBanner: (id: string) => Promise<void>;

  // Module 12: FAQ Accordion
  faqItems: GlobalFAQItem[];
  addFaqItem: (item: Omit<GlobalFAQItem, 'id'>) => Promise<void>;
  updateFaqItem: (id: string, item: Partial<GlobalFAQItem>) => Promise<void>;
  deleteFaqItem: (id: string) => Promise<void>;

  // Module 13: Contact Messages & Inbox
  contactMessages: ContactFormMessage[];
  submitContactMessage: (data: Omit<ContactFormMessage, 'id' | 'created_at' | 'status'>) => Promise<void>;
  markContactMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;

  // Module 14: Global Footer Settings
  footerSettings: FooterSettings;
  updateFooterSettings: (settings: Partial<FooterSettings>) => Promise<void>;

  // Quote Cart
  quoteItems: QuoteItem[];
  addToQuote: (service: Service, quantity: number, specs: Record<string, any>, specSummary: { label: string; value: string }[], notes?: string, artworkStatus?: ArtworkStatus, artworkFileName?: string) => void;
  updateQuoteItemQuantity: (itemId: string, quantity: number) => void;
  removeQuoteItem: (itemId: string) => void;
  clearQuoteCart: () => void;
  submitQuoteRequest: (customer: any, generalNotes?: string, deadlineDate?: string) => Promise<{ success: boolean; referenceNumber: string; whatsappUrl: string }>;

  // Quote Requests (Admin)
  quoteRequests: QuoteRequest[];
  updateQuoteStatus: (quoteId: string, newStatus: QuoteStatus, internalNotes?: string) => Promise<void>;
  assignQuoteSalesperson: (quoteId: string, salespersonId: string) => Promise<void>;
  updateQuoteNotes: (quoteId: string, internalNotes?: string, supplierNotes?: string) => Promise<void>;

  // Service CRUD
  const createService = async (
    serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Service> => {
    const id = `srv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    const newService: Service = {
      ...serviceData,
      id,
      created_at: now,
      updated_at: now,
    };

    await setDoc(doc(db, 'services', id), newService);
    setServices((prev) => {
      const updated = [newService, ...prev];
      safeStorageSave(STORAGE_KEYS.SERVICES, updated);
      return updated;
    });
    return newService;
  };

  const updateService = async (id: string, serviceData: Partial<Service>): Promise<void> => {
    const existing = services.find((s) => s.id === id);
    if (!existing) throw new Error('الخدمة غير موجودة.');

    const updatedService: Service = {
      ...existing,
      ...serviceData,
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'services', id), updatedService, { merge: true });
    setServices((prev) => {
      const updated = prev.map((s) => (s.id === id ? updatedService : s));
      safeStorageSave(STORAGE_KEYS.SERVICES, updated);
      return updated;
    });
  };

  const deleteService = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'services', id));
    setServices((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      safeStorageSave(STORAGE_KEYS.SERVICES, updated);
      return updated;
    });
  };

  const duplicateService = async (id: string): Promise<Service> => {
    const original = services.find((s) => s.id === id);
    if (!original) throw new Error('Service not found');

    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const duplicated: Service = {
      ...original,
      id: `srv-${suffix}`,
      name_ar: `${original.name_ar} (نسخة جديدة)`,
      name_en: `${original.name_en} (Copy)`,
      slug: `${original.slug}-copy-${suffix}`,
      service_status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'services', duplicated.id), duplicated);
    setServices((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  // Template CRUD
  const createTemplate = async (
    templateData: Omit<ServiceTemplate, 'id'>
  ): Promise<ServiceTemplate> => {
    const id = `tmpl-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newTmpl: ServiceTemplate = { ...templateData, id };
    await setDoc(doc(db, 'templates', id), newTmpl);
    setTemplates((prev) => [...prev, newTmpl]);
    return newTmpl;
  };

  const updateTemplate = async (
    id: string,
    templateData: Partial<ServiceTemplate>
  ): Promise<void> => {
    const existing = templates.find((t) => t.id === id);
    if (!existing) throw new Error('القالب غير موجود.');
    const updated = { ...existing, ...templateData };
    await setDoc(doc(db, 'templates', id), updated, { merge: true });
    setTemplates((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTemplate = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'templates', id));
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  // Media Library
  uploadMedia: (fileData: { name: string; url: string; storage_path?: string; mime_type?: string; size_kb: number; category?: string; alt_ar?: string }) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<void>;

  // Packages & Portfolio & Blog CRUD
  createPackage: (pkg: Omit<Package, 'id'>) => Promise<void>;
  updatePackage: (id: string, pkg: Partial<Package>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;

  createBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  createPortfolioProject: (proj: Omit<PortfolioProject, 'id'>) => Promise<void>;
  updatePortfolioProject: (id: string, proj: Partial<PortfolioProject>) => Promise<void>;
  deletePortfolioProject: (id: string) => Promise<void>;

  // Taxonomy & Settings & Users
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<User>;
  deleteUser: (userId: string) => Promise<boolean>;

  // Search Engine
  searchServices: (query: string) => Service[];
  synonymMap: Record<string, string[]>;

  // Wishlist & Compare
  wishlistedServiceIds: string[];
  toggleWishlist: (serviceId: string) => void;
  compareServiceIds: string[];
  toggleCompare: (serviceId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  THEME: 'rawaj_theme',
  DESIGN_TASKS: 'rawaj_design_tasks_v2',
  SERVICES: 'rawaj_services_v2',
  TEMPLATES: 'rawaj_templates_v2',
  PACKAGES: 'rawaj_packages_v2',
  PORTFOLIO: 'rawaj_portfolio_v2',
  BLOG: 'rawaj_blog_v2',
  MEDIA: 'rawaj_media_v2',
  SETTINGS: 'rawaj_settings_v2',
  USERS: 'rawaj_users_v2',
  QUOTES: 'rawaj_quotes_v2',
  CART: 'rawaj_cart_v2',
  HOME_SLIDES: 'rawaj_home_slides_v2',
  MARQUEE: 'rawaj_marquee_v2',
  ABOUT_US: 'rawaj_about_us_v2',
  FEATURES: 'rawaj_features_v2',
  CLIENT_LOGOS: 'rawaj_client_logos_v2',
  TESTIMONIALS: 'rawaj_testimonials_v2',
  HERO_HEADER: 'rawaj_hero_header_v2',
  PROMOS: 'rawaj_promos_v2',
  FAQ: 'rawaj_faq_v2',
  FOOTER: 'rawaj_footer_v2',
  HOME_MODULES: 'rawaj_home_modules_v2',
  THEME_CUSTOM: 'rawaj_theme_custom_v2',
  CONTACT_MESSAGES: 'rawaj_contact_messages_v2',
  BRANDS_MODE: 'rawaj_brands_mode_v2',
};

// Synonyms map for rich search expansion
const SYNONYMS: Record<string, string[]> = {
  'استيكر': ['ملصق', 'ليبل', 'رول', 'ستيكر', 'sticker', 'label', 'vinyl'],
  'ستيكر': ['استيكر', 'ملصق', 'ليبل', 'sticker', 'label'],
  'كربون': ['ncr', 'فواتير', 'سندات', 'دفاتر', 'دفتر', 'قبض', 'صرف'],
  'فواتير': ['ncr', 'كربون', 'سندات', 'دفاتر', 'فاتورة', 'invoices'],
  'فلكس': ['بنر', 'بانر', 'flex', 'banner', 'واجهة', 'شاسيه'],
  'بنر': ['فلكس', 'بانر', 'banner', 'رول اب', 'بوستر'],
  'كلادينج': ['acp', 'واجهات', 'ألومنيوم', 'تكسية', 'واجهة', 'cladding'],
  'حروف': ['بارزة', 'مضيئة', 'ستانلس', 'زنكور', 'أكريليك', 'channel letters', 'لوحات'],
  'لوحات': ['حروف', 'مضيئة', 'استاند', 'إشارات', 'signage', 'lightbox'],
  'تيشيرت': ['ملابس', 'بولو', 'dtf', 'يونيفورم', 'زي موحد', 't-shirt', 'apparel'],
  'علب': ['كرتون', 'تغليف', 'تعبئة', 'boxes', 'carton', 'packaging'],
  'أكياس': ['شنط', 'ورقية', 'bags', 'كرافت', 'أكياس هدايا'],
  'أكواب': ['مجات', 'حرارية', 'سيراميك', 'mugs', 'مطارات', 'tumbler'],
  'دروع': ['أكريليك', 'خشب', 'ليزر', 'تكريم', 'جوائز', 'awards'],
  'يوفيه': ['uv', 'طباعة مسطحة', 'dtf uv', 'بارز'],
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: Default strictly to LIGHT MODE
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark') return true;
    return false; // Default to Light Mode
  });

  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      safeStorageSave(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeStorageSave(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Safe localStorage helpers
  function safeStorageLoad<T>(key: string, fallback: T): T {
    try {
      const saved = localStorage.getItem(key);
      if (!saved || saved === 'undefined' || saved === 'null') return fallback;
      const parsed = JSON.parse(saved);
      if (parsed === null || parsed === undefined) return fallback;
      return parsed;
    } catch {
      return fallback;
    }
  }

  function safeStorageSave(key: string, value: any): boolean {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (err: any) {
      console.warn(`[Storage] Quota exceeded or error saving "${key}":`, err?.message || err);
      try {
        // Clear non-critical bulky cached collections from localStorage
        const nonCriticalKeys = [
          STORAGE_KEYS.MEDIA,
          STORAGE_KEYS.PORTFOLIO,
          STORAGE_KEYS.BLOG,
          STORAGE_KEYS.FAQ,
          STORAGE_KEYS.TESTIMONIALS,
          STORAGE_KEYS.FEATURES,
          STORAGE_KEYS.CLIENT_LOGOS,
        ];
        nonCriticalKeys.forEach((k) => {
          if (k !== key) localStorage.removeItem(k);
        });

        // Clear any leftover firestore target keys
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const lKey = localStorage.key(i);
          if (lKey && (lKey.startsWith('firestore_') || lKey.startsWith('rawaj_temp_'))) {
            localStorage.removeItem(lKey);
          }
        }

        const serialized = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, serialized);
        return true;
      } catch {
        // Ignore gracefully without throwing or breaking React execution
        return false;
      }
    }
  }

  // Navigation state
  const [currentRoute, setCurrentRoute] = useState<NavigationTarget>({ view: 'home' });
  const navigate = (target: NavigationTarget) => {
    setCurrentRoute(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State initialization with localStorage fallback
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [industrySectors, setIndustrySectors] = useState<IndustrySector[]>(INITIAL_INDUSTRY_SECTORS);

  const getIndustrySectorById = (id: string) => {
    return industrySectors.find((s) => s.id === id || s.slug === id);
  };

  const [templates, setTemplates] = useState<ServiceTemplate[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.TEMPLATES, INITIAL_TEMPLATES);
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try {
        const parsed: Service[] = JSON.parse(saved);
        if (!Array.isArray(parsed)) return INITIAL_SERVICES;
        // Merge in any newly added services from INITIAL_SERVICES that aren't yet in local cache
        const existingIds = new Set(parsed.map((s) => s.id));
        const missingNewServices = INITIAL_SERVICES.filter((s) => !existingIds.has(s.id));
        const merged = [...parsed, ...missingNewServices];

        // Self-heal any broken image URLs from old caches
        return merged.map((s: Service) => {
          const init = INITIAL_SERVICES.find((is) => is.id === s.id);
          if (init && (s.hero_image.includes('1554415707') || !s.hero_image)) {
            return { ...s, hero_image: init.hero_image, gallery: init.gallery };
          }
          return s;
        });
      } catch (e) {
        return INITIAL_SERVICES;
      }
    }
    return INITIAL_SERVICES;
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (saved) {
      try {
        const parsed: Package[] = JSON.parse(saved);
        if (!Array.isArray(parsed)) return INITIAL_PACKAGES;
        const initMap = new Map(INITIAL_PACKAGES.map((p) => [p.id, p]));
        const merged = parsed.map((p) => {
          const init = initMap.get(p.id);
          return init ? { ...init, ...p, items_breakdown: p.items_breakdown || init.items_breakdown, target_sector_ar: p.target_sector_ar || init.target_sector_ar } : p;
        });
        const existingIds = new Set(merged.map((p) => p.id));
        const missingNewPackages = INITIAL_PACKAGES.filter((p) => !existingIds.has(p.id));
        return [...merged, ...missingNewPackages];
      } catch (e) {
        return INITIAL_PACKAGES;
      }
    }
    return INITIAL_PACKAGES;
  });

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.BLOG, INITIAL_BLOG_POSTS);
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    return safeStorageLoad(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  });

  const [users, setUsers] = useState<User[]>([]);

  const [currentUser, setCurrentUser] = useState<User>(() => ({
    id: 'anonymous',
    name: 'غير مسجل',
    email: '',
    role: 'editor',
    createdAt: new Date(0).toISOString(),
  }));

  useEffect(() => {
    let active = true;

    const syncAuthenticatedUser = async (authUserId?: string) => {
      if (!authUserId) {
        if (active) {
          setCurrentUser({
            id: 'anonymous',
            name: 'غير مسجل',
            email: '',
            role: 'editor',
            createdAt: new Date(0).toISOString(),
          });
          setUsers([]);
        }
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, name, email, role, avatar_url, phone, created_at')
        .eq('id', authUserId)
        .single();

      if (error) {
        console.error('Supabase profile sync failed:', error);
        return;
      }

      const mappedUser: User = {
        id: profile.id,
        name: profile.name || profile.email || 'مستخدم',
        email: profile.email || '',
        role: profile.role as User['role'],
        avatar: profile.avatar_url || undefined,
        phone: profile.phone || undefined,
        createdAt: profile.created_at,
        isOwnerProtected: profile.role === 'owner',
      };

      if (!active) return;
      setCurrentUser(mappedUser);

      const { data: visibleProfiles, error: usersError } = await supabase
        .from('profiles')
        .select('id, name, email, role, avatar_url, phone, created_at');

      if (!usersError && visibleProfiles) {
        const mappedUsers: User[] = visibleProfiles.map((row) => ({
          id: row.id,
          name: row.name || row.email || 'مستخدم',
          email: row.email || '',
          role: row.role as User['role'],
          avatar: row.avatar_url || undefined,
          phone: row.phone || undefined,
          createdAt: row.created_at,
          isOwnerProtected: row.role === 'owner',
        }));
        setUsers(mappedUsers);
      } else {
        setUsers([mappedUser]);
      }
    };

    void supabase.auth.getSession().then(({ data }) => {
      void syncAuthenticatedUser(data.session?.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        void syncAuthenticatedUser(session?.user.id);
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.CART, []);
  });

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.QUOTES, []);
  });

  // Home Modules State
  const [homeSlides, setHomeSlides] = useState<HomeSlide[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.HOME_SLIDES, INITIAL_HOME_SLIDES);
  });

  const [marqueeItems, setMarqueeItems] = useState<MarqueeTickerItem[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.MARQUEE, INITIAL_MARQUEE_ITEMS);
  });

  const [aboutUsData, setAboutUsData] = useState<AboutUsModuleData>(() => {
    return safeStorageLoad(STORAGE_KEYS.ABOUT_US, INITIAL_ABOUT_US_DATA);
  });

  const [rawajFeatures, setRawajFeatures] = useState<RawajFeature[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.FEATURES, INITIAL_RAWAJ_FEATURES);
  });

  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.CLIENT_LOGOS, INITIAL_CLIENT_LOGOS);
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
  });

  const [heroHeaderSettings, setHeroHeaderSettings] = useState<HeroHeaderSettings>(() => {
    return safeStorageLoad(STORAGE_KEYS.HERO_HEADER, INITIAL_HERO_HEADER_SETTINGS);
  });

  const [promoSettings, setPromoSettings] = useState<PromoModuleSettings>(() => {
    return safeStorageLoad(STORAGE_KEYS.PROMOS, INITIAL_PROMO_SETTINGS);
  });

  const [faqItems, setFaqItems] = useState<GlobalFAQItem[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.FAQ, INITIAL_FAQ_ITEMS);
  });

  const [footerSettings, setFooterSettings] = useState<FooterSettings>(() => {
    return safeStorageLoad(STORAGE_KEYS.FOOTER, INITIAL_FOOTER_SETTINGS);
  });

  const [homeModulesConfig, setHomeModulesConfig] = useState<HomeModuleConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOME_MODULES);
    if (!saved) return INITIAL_HOME_MODULES_CONFIG;
    try {
      const parsed: HomeModuleConfig[] = JSON.parse(saved);
      if (!Array.isArray(parsed)) return INITIAL_HOME_MODULES_CONFIG;
      return parsed.map((mod) => {
        const init = INITIAL_HOME_MODULES_CONFIG.find((i) => i.id === mod.id);
        return {
          ...mod,
          badge_ar: mod.badge_ar || init?.badge_ar || '',
          layout_style: mod.layout_style || init?.layout_style || init?.available_layouts?.[0]?.id,
          available_layouts: init?.available_layouts || [],
        };
      });
    } catch {
      return INITIAL_HOME_MODULES_CONFIG;
    }
  });

  const [themeSettings, setThemeSettings] = useState<ThemeCustomizerSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME_CUSTOM);
    if (!saved) return INITIAL_THEME_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_THEME_SETTINGS,
        ...parsed,
        primary_color: parsed.primary_color || INITIAL_THEME_SETTINGS.primary_color,
        primary_hover: parsed.primary_hover || INITIAL_THEME_SETTINGS.primary_hover,
        secondary_bg: parsed.secondary_bg || INITIAL_THEME_SETTINGS.secondary_bg,
        accent_color: parsed.accent_color || parsed.accent_gold || INITIAL_THEME_SETTINGS.accent_color,
        card_surface_style: parsed.card_surface_style || parsed.card_surface || INITIAL_THEME_SETTINGS.card_surface_style,
        background_pattern: parsed.background_pattern || INITIAL_THEME_SETTINGS.background_pattern,
        arabic_font: parsed.arabic_font || INITIAL_THEME_SETTINGS.arabic_font || 'tajawal',
        border_radius: parsed.border_radius || INITIAL_THEME_SETTINGS.border_radius,
        theme_mode: parsed.theme_mode || INITIAL_THEME_SETTINGS.theme_mode,
        glow_intensity: typeof parsed.glow_intensity === 'number' ? parsed.glow_intensity : INITIAL_THEME_SETTINGS.glow_intensity,
      };
    } catch {
      return INITIAL_THEME_SETTINGS;
    }
  });

  useEffect(() => {
    safeStorageSave(STORAGE_KEYS.THEME_CUSTOM, themeSettings);
    applyThemeToDocument(themeSettings);
    if (themeSettings.theme_mode === 'dark' && !isDarkMode) {
      setIsDarkMode(true);
    } else if (themeSettings.theme_mode === 'light' && isDarkMode) {
      setIsDarkMode(false);
    }
  }, [themeSettings]);

  const [contactMessages, setContactMessages] = useState<ContactFormMessage[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.CONTACT_MESSAGES, INITIAL_CONTACT_MESSAGES);
  });

  const [designTasks, setDesignTasks] = useState<DesignTask[]>(() => {
    return safeStorageLoad(STORAGE_KEYS.DESIGN_TASKS, INITIAL_DESIGN_TASKS);
  });

  useEffect(() => {
    safeStorageSave(STORAGE_KEYS.DESIGN_TASKS, designTasks);
  }, [designTasks]);

  const [brandsDisplayMode, setBrandsDisplayMode] = useState<BrandDisplayMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRANDS_MODE);
    return (saved as BrandDisplayMode) || 'colored';
  });

  const [wishlistedServiceIds, setWishlistedServiceIds] = useState<string[]>(() => {
    return safeStorageLoad('rawaj_wishlist_ids', []);
  });

  const [compareServiceIds, setCompareServiceIds] = useState<string[]>(() => {
    return safeStorageLoad('rawaj_compare_ids', []);
  });

  const toggleWishlist = (serviceId: string) => {
    setWishlistedServiceIds((prev) => {
      const updated = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      safeStorageSave('rawaj_wishlist_ids', updated);
      return updated;
    });
  };

  const toggleCompare = (serviceId: string) => {
    setCompareServiceIds((prev) => {
      const updated = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      safeStorageSave('rawaj_compare_ids', updated);
      return updated;
    });
  };

  // Real-time Supabase listeners
  useEffect(() => {
    let unsubQuotes: (() => void) | undefined;
    let unsubServices: (() => void) | undefined;
    let unsubTemplates: (() => void) | undefined;
    let unsubPackages: (() => void) | undefined;
    let unsubPortfolio: (() => void) | undefined;
    let unsubBlog: (() => void) | undefined;
    let unsubMedia: (() => void) | undefined;
    let unsubSettings: (() => void) | undefined;
    let unsubDesignTasks: (() => void) | undefined;
    let unsubHomeSlides: (() => void) | undefined;
    let unsubMarquee: (() => void) | undefined;
    let unsubFeatures: (() => void) | undefined;
    let unsubClientLogos: (() => void) | undefined;
    let unsubTestimonials: (() => void) | undefined;
    let unsubFaq: (() => void) | undefined;
    let unsubContactMessages: (() => void) | undefined;
    let unsubUsers: (() => void) | undefined;
    let unsubDepartments: (() => void) | undefined;
    let unsubCategories: (() => void) | undefined;
    let unsubSubcategories: (() => void) | undefined;
    let unsubIndustrySectors: (() => void) | undefined;

    try {
      // Taxonomy listeners
      unsubDepartments = onSnapshot(collection(db, 'departments'), (snapshot) => {
        const list: Department[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Department));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setDepartments(list);
      }, (err) => console.warn('Supabase departments listener:', err.message));

      unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
        const list: Category[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Category));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setCategories(list);
      }, (err) => console.warn('Supabase categories listener:', err.message));

      unsubSubcategories = onSnapshot(collection(db, 'subcategories'), (snapshot) => {
        const list: Subcategory[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Subcategory));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setSubcategories(list);
      }, (err) => console.warn('Supabase subcategories listener:', err.message));

      unsubIndustrySectors = onSnapshot(collection(db, 'industry_sectors'), (snapshot) => {
        const list: IndustrySector[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as IndustrySector));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setIndustrySectors(list);
      }, (err) => console.warn('Supabase industry sectors listener:', err.message));

      // Quotes Listener
      unsubQuotes = onSnapshot(collection(db, 'quotes'), (snapshot) => {
        {
          const list: QuoteRequest[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as QuoteRequest);
          });
          list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setQuoteRequests(list);
        }
        setIsCloudSynced(true);
      }, (err) => console.warn('Supabase quotes listener:', err.message));

      // Services Listener
      unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        {
          const list: Service[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Service);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setServices(list);
          safeStorageSave(STORAGE_KEYS.SERVICES, list);
        }
      }, (err) => console.warn('Supabase services listener:', err.message));

      // Templates Listener
      unsubTemplates = onSnapshot(collection(db, 'templates'), (snapshot) => {
        {
          const list: ServiceTemplate[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as ServiceTemplate);
          });
          setTemplates(list);
          safeStorageSave(STORAGE_KEYS.TEMPLATES, list);
        }
      }, (err) => console.warn('Supabase templates listener:', err.message));

      // Packages Listener
      unsubPackages = onSnapshot(collection(db, 'packages'), (snapshot) => {
        {
          const list: Package[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Package);
          });
          setPackages(list);
          safeStorageSave(STORAGE_KEYS.PACKAGES, list);
        }
      }, (err) => console.warn('Supabase packages listener:', err.message));

      // Portfolio Listener
      unsubPortfolio = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
        {
          const list: PortfolioProject[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as PortfolioProject);
          });
          setPortfolioProjects(list);
        }
      }, (err) => console.warn('Supabase portfolio listener:', err.message));

      // Blog Listener
      unsubBlog = onSnapshot(collection(db, 'blog'), (snapshot) => {
        {
          const list: BlogPost[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as BlogPost);
          });
          setBlogPosts(list);
        }
      }, (err) => console.warn('Supabase blog listener:', err.message));

      // Media Listener
      unsubMedia = onSnapshot(collection(db, 'media'), (snapshot) => {
        {
          const list: MediaItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as MediaItem);
          });
          setMediaItems(list);
        }
      }, (err) => console.warn('Supabase media listener:', err.message));

      // Home Slides Listener
      unsubHomeSlides = onSnapshot(collection(db, 'home_slides'), (snapshot) => {
        {
          const list: HomeSlide[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as HomeSlide);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setHomeSlides(list);
          safeStorageSave(STORAGE_KEYS.HOME_SLIDES, list);
        }
      }, (err) => console.warn('Supabase home_slides listener:', err.message));

      // Marquee Listener
      unsubMarquee = onSnapshot(collection(db, 'marquee'), (snapshot) => {
        {
          const list: MarqueeTickerItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as MarqueeTickerItem);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setMarqueeItems(list);
          safeStorageSave(STORAGE_KEYS.MARQUEE, list);
        }
      }, (err) => console.warn('Supabase marquee listener:', err.message));

      // Features Listener
      unsubFeatures = onSnapshot(collection(db, 'features'), (snapshot) => {
        {
          const list: RawajFeature[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as RawajFeature);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setRawajFeatures(list);
          safeStorageSave(STORAGE_KEYS.FEATURES, list);
        }
      }, (err) => console.warn('Supabase features listener:', err.message));

      // Client Logos Listener
      unsubClientLogos = onSnapshot(collection(db, 'client_logos'), (snapshot) => {
        {
          const list: ClientLogo[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as ClientLogo);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setClientLogos(list);
          safeStorageSave(STORAGE_KEYS.CLIENT_LOGOS, list);
        }
      }, (err) => console.warn('Supabase client_logos listener:', err.message));

      // Testimonials Listener
      unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
        {
          const list: Testimonial[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Testimonial);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setTestimonials(list);
          safeStorageSave(STORAGE_KEYS.TESTIMONIALS, list);
        }
      }, (err) => console.warn('Supabase testimonials listener:', err.message));

      // FAQ Listener
      unsubFaq = onSnapshot(collection(db, 'faq'), (snapshot) => {
        {
          const list: GlobalFAQItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as GlobalFAQItem);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setFaqItems(list);
          safeStorageSave(STORAGE_KEYS.FAQ, list);
        }
      }, (err) => console.warn('Supabase faq listener:', err.message));

      // Contact Messages
  const submitContactMessage = async (data: Omit<ContactFormMessage, 'id' | 'created_at' | 'status'>): Promise<void> => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newMsg: ContactFormMessage = {
      ...data,
      id,
      created_at: new Date().toISOString(),
      status: 'unread',
    };

    await setDoc(doc(db, 'contact_messages', id), newMsg);
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const markContactMessageStatus = async (id: string, status: 'unread' | 'read' | 'replied'): Promise<void> => {
    await setDoc(doc(db, 'contact_messages', id), { status }, { merge: true });
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const deleteContactMessage = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'contact_messages', id));
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Footer Settings
  const updateFooterSettings = async (settings: Partial<FooterSettings>): Promise<void> => {
    const updated = { ...footerSettings, ...settings };
    await setDoc(doc(db, 'settings', 'footer'), updated, { merge: true });
    setFooterSettings(updated);
    safeStorageSave(STORAGE_KEYS.FOOTER, updated);
  };

  // Brands Mode
  const updateBrandsDisplayMode = async (mode: BrandDisplayMode): Promise<void> => {
    await setDoc(doc(db, 'settings', 'brands_display'), { mode }, { merge: true });
    setBrandsDisplayMode(mode);
    safeStorageSave(STORAGE_KEYS.BRANDS_MODE, mode);
  };

  // Testimonials Public Submit & Moderation
  const submitPublicTestimonial = async (data: { client_name_ar: string; client_title_ar: string; client_company_ar: string; comment_ar: string; rating: number }): Promise<void> => {
    const id = `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newTest: Testimonial = {
      ...data,
      id,
      client_avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      status: 'pending',
      sort_order: testimonials.length + 1,
      is_active: false,
      created_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'testimonials', id), newTest);
    setTestimonials((prev) => [newTest, ...prev]);
  };

  const updateTestimonialStatus = async (
    id: string,
    status: 'approved' | 'pending' | 'rejected'
  ): Promise<void> => {
    const patch = { status, is_active: status === 'approved' };
    await setDoc(doc(db, 'testimonials', id), patch, { merge: true });
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  // Cart operations
  const addToQuote = (
    service: Service,
    quantity: number,
    specs: Record<string, any>,
    specSummary: { label: string; value: string }[],
    notes?: string,
    artworkStatus: ArtworkStatus = 'ready',
    artworkFileName?: string
  ) => {
    const dept = departments.find((d) => d.id === service.department_id);
    const newItem: QuoteItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      service_id: service.id,
      service_name_ar: service.name_ar,
      department_name_ar: dept ? dept.name_ar : 'خدمات عامة',
      hero_image: service.hero_image,
      quantity,
      quantity_unit: 'قطعة / نسخة',
      selected_specifications: specs,
      specification_summary: specSummary,
      custom_notes: notes,
      artwork_status: artworkStatus,
      artwork_file_name: artworkFileName,
    };
    setQuoteItems((prev) => [...prev, newItem]);
  };

  const updateQuoteItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeQuoteItem(itemId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeQuoteItem = (itemId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearQuoteCart = () => {
    setQuoteItems([]);
  };

  // Submit quote request & persist to Supabase + build WhatsApp message
  const submitQuoteRequest = async (
    customer: any,
    generalNotes?: string,
    deadlineDate?: string
  ): Promise<{ success: boolean; referenceNumber: string; whatsappUrl: string }> => {
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `RWJ-${dateStr}-${randomSuffix}`;
    const quoteId = `quote-${Date.now()}`;

    const newQuote: QuoteRequest = {
      id: quoteId,
      reference_number: referenceNumber,
      customer: {
        name: customer.name,
        company: customer.company || '',
        mobile: customer.mobile,
        whatsapp: customer.whatsapp || customer.mobile,
        email: customer.email || '',
        city: customer.city || 'صنعاء',
        address: customer.address || '',
      },
      items: [...quoteItems],
      deadline_date: deadlineDate,
      general_notes: generalNotes,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user_name: customer.name,
          action: 'تم إنشاء وإرسال طلب عرض السعر من العميل عبر المنصة الرقمية',
        },
      ],
    };

    // Optimistic local state update
    setQuoteRequests((prev) => [newQuote, ...prev]);

    // Persist to Supabase before reporting success or clearing the cart.
    try {
      await setDoc(doc(db, 'quotes', quoteId), newQuote);
    } catch (e) {
      setQuoteRequests((prev) => prev.filter((q) => q.id !== quoteId));
      console.error('Supabase quote save failed:', e);
      throw e;
    }

    // Build structured WhatsApp message
    let waText = `مرحباً «رواج للطباعة والإعلان والديكور»،\nأرغب بطلب عرض سعر فني عبر المنصة:\n\n`;
    waText += `📌 *رقم الطلب:* ${referenceNumber}\n`;
    waText += `👤 *العميل:* ${customer.name}${customer.company ? ` (${customer.company})` : ''}\n`;
    waText += `📱 *الجوال / واتساب:* ${customer.whatsapp || customer.mobile}\n`;
    waText += `📍 *المدينة:* ${customer.city || 'صنعاء'}\n`;
    if (deadlineDate) waText += `⏳ *الموعد المطلوب:* ${deadlineDate}\n`;
    waText += `\n📦 *الخدمات والمواصفات المطلوبة (${quoteItems.length} بنود):*\n`;

    quoteItems.forEach((item, index) => {
      waText += `\n--------------------\n`;
      waText += `*${index + 1}. ${item.service_name_ar}*\n`;
      waText += `▪️ *الكمية:* ${item.quantity}\n`;
      if (item.specification_summary && item.specification_summary.length > 0) {
        waText += `▪️ *المواصفات الفنية:*\n`;
        item.specification_summary.forEach((spec) => {
          waText += `   • ${spec.label}: ${spec.value}\n`;
        });
      }
      if (item.custom_notes) {
        waText += `▪️ *ملاحظات خاصة:* ${item.custom_notes}\n`;
      }
      waText += `▪️ *حالة التصميم:* ${
        item.artwork_status === 'ready'
          ? 'جاهز للطباعة'
          : item.artwork_status === 'needs_review'
          ? 'يحتاج مراجعة وتجهيز Prepress'
          : item.artwork_status === 'needs_design'
          ? 'يحتاج تصميم من الصفر عبر رواج'
          : 'لا يوجد ملف حالياً'
      }\n`;
    });

    if (generalNotes) {
      waText += `\n📝 *ملاحظات عامة:* ${generalNotes}\n`;
    }

    waText += `\n---\n*تم الإرسال عبر منصة رواج الرقمية للطباعة والتوريد*`;

    // Clear cart after submitting
    clearQuoteCart();

    const cleanPhone = siteSettings.mobile_whatsapp.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    return {
      success: true,
      referenceNumber,
      whatsappUrl,
    };
  };

  // Quote status management
  const updateQuoteStatus = async (
    quoteId: string,
    newStatus: QuoteStatus,
    internalNotes?: string
  ): Promise<void> => {
    const statusNames: Record<QuoteStatus, string> = {
      new: 'جديد',
      reviewing: 'قيد المراجعة الفنية',
      need_more_info: 'يحتاج تفاصيل إضافية من العميل',
      pricing: 'قيد التسعير والتوريد',
      sent: 'تم إرسال عرض السعر للعميل',
      negotiation: 'قيد التفاوض والمراجعة',
      won: 'تم التعاقد والاعتماد (ناجح)',
      lost: 'لم يتم الاتفاق',
      archived: 'مؤرشف',
    };

    const targetQuote = quoteRequests.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('طلب التسعير غير موجود.');

    const updatedQuote: QuoteRequest = {
      ...targetQuote,
      status: newStatus,
      internal_notes: internalNotes || targetQuote.internal_notes,
      updated_at: new Date().toISOString(),
      timeline: [
        ...targetQuote.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user_name: currentUser.name,
          action: `تغيير الحالة إلى: ${statusNames[newStatus]}`,
          notes: internalNotes,
        },
      ],
    };

    await setDoc(doc(db, 'quotes', quoteId), updatedQuote, { merge: true });
    setQuoteRequests((prev) => prev.map((q) => (q.id === quoteId ? updatedQuote : q)));
  };

  const assignQuoteSalesperson = async (quoteId: string, salespersonId: string): Promise<void> => {
    const sp = users.find((u) => u.id === salespersonId);
    const targetQuote = quoteRequests.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('طلب التسعير غير موجود.');

    const updatedQuote: QuoteRequest = {
      ...targetQuote,
      assigned_to: salespersonId,
      updated_at: new Date().toISOString(),
      timeline: [
        ...targetQuote.timeline,
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user_name: currentUser.name,
          action: `تم إسناد الطلب للمسؤول: ${sp ? sp.name : 'غير محدد'}`,
        },
      ],
    };

    await setDoc(doc(db, 'quotes', quoteId), updatedQuote, { merge: true });
    setQuoteRequests((prev) => prev.map((q) => (q.id === quoteId ? updatedQuote : q)));
  };

  const updateQuoteNotes = async (
    quoteId: string,
    internalNotes?: string,
    supplierNotes?: string
  ): Promise<void> => {
    const targetQuote = quoteRequests.find((q) => q.id === quoteId);
    if (!targetQuote) throw new Error('طلب التسعير غير موجود.');

    const updatedQuote: QuoteRequest = {
      ...targetQuote,
      internal_notes: internalNotes !== undefined ? internalNotes : targetQuote.internal_notes,
      supplier_notes: supplierNotes !== undefined ? supplierNotes : targetQuote.supplier_notes,
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'quotes', quoteId), updatedQuote, { merge: true });
    setQuoteRequests((prev) => prev.map((q) => (q.id === quoteId ? updatedQuote : q)));
  };

  // Service CRUD
  const createService = async (serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> => {
    const id = `srv-${Date.now()}`;
    const newService: Service = {
      ...serviceData,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setServices((prev) => {
      const updated = [newService, ...prev];
      safeStorageSave(STORAGE_KEYS.SERVICES, updated);
      return updated;
    });
    try {
      await setDoc(doc(db, 'services', id), newService);
      console.log(`[Supabase] Service ${id} created on cloud`);
    } catch (e) {
      console.error(`[Supabase Error] Service creation failed:`, e);
      throw e;
    }
    return newService;
  };

  const updateService = async (id: string, serviceData: Partial<Service>): Promise<void> => {
    let targetService: Service | undefined;
    setServices((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== id) return s;
        return { ...s, ...serviceData, updated_at: new Date().toISOString() };
      });
      safeStorageSave(STORAGE_KEYS.SERVICES, updated);
      targetService = updated.find((s) => s.id === id);
      return updated;
    });
    if (targetService) {
      try {
        await setDoc(doc(db, 'services', id), targetService, { merge: true });
        console.log(`[Supabase] Service ${id} updated on cloud`);
      } catch (e) {
        console.error(`[Supabase Error] Service update failed:`, e);
        throw e;
      }
    }
  };

  const deleteService = async (id: string): Promise<void> => {
    setServices((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      safeStorageSave(STORAGE_KEYS.SERVICES, updated);
      return updated;
    });
    try {
      await deleteDoc(doc(db, 'services', id));
      console.log(`[Supabase] Service ${id} deleted from cloud`);
    } catch (e) {
      console.error(`[Supabase Error] Service deletion failed:`, e);
      throw e;
    }
  };

  const duplicateService = (id: string): Service => {
    const original = services.find((s) => s.id === id);
    if (!original) throw new Error('Service not found');
    const newId = `srv-${Date.now()}`;
    const duplicated: Service = {
      ...original,
      id: newId,
      name_ar: `${original.name_ar} (نسخة جديدة)`,
      name_en: `${original.name_en} (Copy)`,
      slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
      service_status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setServices((prev) => [duplicated, ...prev]);
    setDoc(doc(db, 'services', newId), duplicated).catch((e) => console.warn(e));
    return duplicated;
  };

  // Template CRUD
  const createTemplate = (templateData: Omit<ServiceTemplate, 'id'>): ServiceTemplate => {
    const id = `tmpl-${Date.now()}`;
    const newTmpl: ServiceTemplate = {
      ...templateData,
      id,
    };
    setTemplates((prev) => [...prev, newTmpl]);
    setDoc(doc(db, 'templates', id), newTmpl).catch((e) => console.warn(e));
    return newTmpl;
  };

  const updateTemplate = (id: string, templateData: Partial<ServiceTemplate>) => {
    setTemplates((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, ...templateData };
        setDoc(doc(db, 'templates', id), updated, { merge: true }).catch((e) => console.warn(e));
        return updated;
      })
    );
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    deleteDoc(doc(db, 'templates', id)).catch((e) => console.warn(e));
  };

  // Media Library
  const uploadMedia = async (fileData: { name: string; url: string; storage_path?: string; mime_type?: string; size_kb: number; category?: string; alt_ar?: string }): Promise<MediaItem> => {
    const id = `med-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newMedia: MediaItem = {
      id,
      name: fileData.name,
      url: fileData.url,
      storage_path: fileData.storage_path,
      mime_type: fileData.mime_type,
      size_kb: fileData.size_kb,
      category: fileData.category || 'عام',
      uploaded_at: new Date().toISOString(),
      alt_ar: fileData.alt_ar || fileData.name,
    };

    await setDoc(doc(db, 'media', id), newMedia);
    setMediaItems((prev) => [newMedia, ...prev]);
    return newMedia;
  };

  const deleteMedia = async (id: string): Promise<void> => {
    const target = mediaItems.find((m) => m.id === id);
    if (target?.storage_path) {
      await removeRawajStorageObject(target.storage_path);
    }
    await deleteDoc(doc(db, 'media', id));
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  // Packages CRUD
  const createPackage = async (pkg: Omit<Package, 'id'>): Promise<void> => {
    const id = `pkg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newPkg: Package = { ...pkg, id };
    await setDoc(doc(db, 'packages', id), newPkg);
    setPackages((prev) => [...prev, newPkg]);
  };

  const updatePackage = async (id: string, pkg: Partial<Package>): Promise<void> => {
    const existing = packages.find((p) => p.id === id);
    if (!existing) throw new Error('الباقة غير موجودة.');
    const updated = { ...existing, ...pkg };
    await setDoc(doc(db, 'packages', id), updated, { merge: true });
    setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const deletePackage = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'packages', id));
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  // Blog CRUD
  const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<void> => {
    const id = `post-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newPost: BlogPost = { ...post, id };
    await setDoc(doc(db, 'blog', id), newPost);
    setBlogPosts((prev) => [newPost, ...prev]);
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<void> => {
    const existing = blogPosts.find((p) => p.id === id);
    if (!existing) throw new Error('المقال غير موجود.');
    const updated = { ...existing, ...post };
    await setDoc(doc(db, 'blog', id), updated, { merge: true });
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'blog', id));
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Portfolio CRUD
  const createPortfolioProject = async (
    proj: Omit<PortfolioProject, 'id'>
  ): Promise<void> => {
    const id = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newProj: PortfolioProject = { ...proj, id };
    await setDoc(doc(db, 'portfolio', id), newProj);
    setPortfolioProjects((prev) => [newProj, ...prev]);
  };

  const updatePortfolioProject = async (
    id: string,
    proj: Partial<PortfolioProject>
  ): Promise<void> => {
    const existing = portfolioProjects.find((p) => p.id === id);
    if (!existing) throw new Error('المشروع غير موجود.');
    const updated = { ...existing, ...proj };
    await setDoc(doc(db, 'portfolio', id), updated, { merge: true });
    setPortfolioProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const deletePortfolioProject = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'portfolio', id));
    setPortfolioProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Taxonomy & Settings & Users
  const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
    const updated = { ...siteSettings, ...settings };
    await setDoc(doc(db, 'settings', 'general'), updated, { merge: true });
    setSiteSettings(updated);
    safeStorageSave(STORAGE_KEYS.SETTINGS, updated);
  };

  const addUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const { data, error } = await supabase.functions.invoke('admin-users', {
      body: {
        action: 'invite',
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role,
      },
    });

    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    if (!data?.user) throw new Error('لم يتم إنشاء المستخدم في Supabase Auth.');

    const newUser = data.user as User;
    setUsers((prev) => {
      const withoutExisting = prev.filter((u) => u.id !== newUser.id);
      return [...withoutExisting, newUser];
    });
    return newUser;
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    const target = users.find((u) => u.id === userId);
    if (!target) return false;
    if (target.id === currentUser.id) return false;

    const { data, error } = await supabase.functions.invoke('admin-users', {
      body: { action: 'delete', userId },
    });

    if (error) throw error;
    if (data?.error) throw new Error(data.error);

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return true;
  };

  // Home Slides CRUD
  const addHomeSlide = async (slide: Omit<HomeSlide, 'id'>): Promise<void> => {
    const id = `slide-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newSlide: HomeSlide = { ...slide, id };
    await setDoc(doc(db, 'home_slides', id), newSlide);
    setHomeSlides((prev) => {
      const updated = [...prev, newSlide];
      safeStorageSave(STORAGE_KEYS.HOME_SLIDES, updated);
      return updated;
    });
  };

  const updateHomeSlide = async (id: string, slide: Partial<HomeSlide>): Promise<void> => {
    await setDoc(doc(db, 'home_slides', id), slide, { merge: true });
    setHomeSlides((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...slide } : s));
      safeStorageSave(STORAGE_KEYS.HOME_SLIDES, updated);
      return updated;
    });
  };

  const deleteHomeSlide = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'home_slides', id));
    setHomeSlides((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      safeStorageSave(STORAGE_KEYS.HOME_SLIDES, updated);
      return updated;
    });
  };

  // Marquee CRUD
  const addMarqueeItem = async (item: Omit<MarqueeTickerItem, 'id'>): Promise<void> => {
    const id = `mrq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newItem: MarqueeTickerItem = { ...item, id };
    await setDoc(doc(db, 'marquee', id), newItem);
    setMarqueeItems((prev) => [...prev, newItem]);
  };

  const updateMarqueeItem = async (
    id: string,
    item: Partial<MarqueeTickerItem>
  ): Promise<void> => {
    await setDoc(doc(db, 'marquee', id), item, { merge: true });
    setMarqueeItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...item } : m)));
  };

  const deleteMarqueeItem = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'marquee', id));
    setMarqueeItems((prev) => prev.filter((m) => m.id !== id));
  };

  // About Us Update
  const updateAboutUsData = async (data: Partial<AboutUsModuleData>): Promise<void> => {
    const updated = { ...aboutUsData, ...data };
    await setDoc(doc(db, 'settings', 'about_us'), updated, { merge: true });
    setAboutUsData(updated);
    safeStorageSave(STORAGE_KEYS.ABOUT_US, updated);
  };

  // Rawaj Features CRUD
  const addRawajFeature = async (feat: Omit<RawajFeature, 'id'>): Promise<void> => {
    const id = `feat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newFeat: RawajFeature = { ...feat, id };
    await setDoc(doc(db, 'features', id), newFeat);
    setRawajFeatures((prev) => [...prev, newFeat]);
  };

  const updateRawajFeature = async (
    id: string,
    feat: Partial<RawajFeature>
  ): Promise<void> => {
    await setDoc(doc(db, 'features', id), feat, { merge: true });
    setRawajFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, ...feat } : f)));
  };

  const deleteRawajFeature = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'features', id));
    setRawajFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  // Client Logos CRUD
  const addClientLogo = async (cli: Omit<ClientLogo, 'id'>): Promise<void> => {
    const id = `cli-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newCli: ClientLogo = { ...cli, id };
    await setDoc(doc(db, 'client_logos', id), newCli);
    setClientLogos((prev) => [...prev, newCli]);
  };

  const updateClientLogo = async (id: string, cli: Partial<ClientLogo>): Promise<void> => {
    await setDoc(doc(db, 'client_logos', id), cli, { merge: true });
    setClientLogos((prev) => prev.map((item) => (item.id === id ? { ...item, ...cli } : item)));
  };

  const deleteClientLogo = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'client_logos', id));
    setClientLogos((prev) => prev.filter((item) => item.id !== id));
  };

  // Testimonials CRUD
  const addTestimonial = async (test: Omit<Testimonial, 'id'>): Promise<void> => {
    const id = `test-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newTest: Testimonial = { ...test, id };
    await setDoc(doc(db, 'testimonials', id), newTest);
    setTestimonials((prev) => [...prev, newTest]);
  };

  const updateTestimonial = async (id: string, test: Partial<Testimonial>): Promise<void> => {
    await setDoc(doc(db, 'testimonials', id), test, { merge: true });
    setTestimonials((prev) => prev.map((item) => (item.id === id ? { ...item, ...test } : item)));
  };

  const deleteTestimonial = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'testimonials', id));
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  // Design Tasks & Proof Workflows CRUD
  const createDesignTask = async (
    taskData: Omit<DesignTask, 'id' | 'created_at' | 'updated_at' | 'proof_versions' | 'comments'>
  ): Promise<DesignTask> => {
    const id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    const newTask: DesignTask = {
      ...taskData,
      id,
      proof_versions: [],
      comments: [],
      created_at: now,
      updated_at: now,
    };

    await setDoc(doc(db, 'design_tasks', id), newTask);
    setDesignTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateDesignTask = async (id: string, updates: Partial<DesignTask>): Promise<void> => {
    const existing = designTasks.find((t) => t.id === id);
    if (!existing) throw new Error('مهمة التصميم غير موجودة.');

    const updatedTask: DesignTask = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'design_tasks', id), updatedTask, { merge: true });
    setDesignTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

  const addDesignProof = async (
    taskId: string,
    proof: Omit<DesignProofVersion, 'id' | 'created_at'>
  ): Promise<void> => {
    const task = designTasks.find((t) => t.id === taskId);
    if (!task) throw new Error('مهمة التصميم غير موجودة.');

    const newProof: DesignProofVersion = {
      ...proof,
      id: `proof-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    const updatedTask: DesignTask = {
      ...task,
      proof_versions: [...task.proof_versions, newProof],
      status: 'proof_submitted' as DesignTaskStatus,
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'design_tasks', taskId), updatedTask, { merge: true });
    setDesignTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
  };

  const addDesignComment = async (
    taskId: string,
    comment: Omit<DesignComment, 'id' | 'created_at'>
  ): Promise<void> => {
    const task = designTasks.find((t) => t.id === taskId);
    if (!task) throw new Error('مهمة التصميم غير موجودة.');

    const newComment: DesignComment = {
      ...comment,
      id: `comm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    const updatedTask: DesignTask = {
      ...task,
      comments: [...task.comments, newComment],
      status: comment.status_change || task.status,
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'design_tasks', taskId), updatedTask, { merge: true });
    setDesignTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
  };

  const deleteDesignTask = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'design_tasks', id));
    setDesignTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Search Engine with synonym normalization
  const searchServices = (query: string): Service[] => {
    if (!query || !query.trim()) return services.filter((s) => s.service_status === 'published');
    const q = query.trim().toLowerCase();

    // Check synonym expansions
    const searchTerms = [q];
    Object.entries(SYNONYMS).forEach(([key, values]) => {
      if (q.includes(key.toLowerCase()) || key.toLowerCase().includes(q)) {
        values.forEach((v) => searchTerms.push(v.toLowerCase()));
      }
    });

    return services.filter((service) => {
      if (service.service_status !== 'published') return false;
      const searchableText = `${service.name_ar} ${service.name_en} ${service.short_description_ar} ${service.full_description_ar} ${service.slug}`.toLowerCase();
      return searchTerms.some((term) => searchableText.includes(term));
    });
  };

  return (
    <AppContext.Provider
      value={{
        themeSettings,
        updateThemeSettings,
        homeModulesConfig,
        updateHomeModulesConfig,
        toggleModuleVisibility,
        reorderHomeModules,
        updateModuleLayout,
        heroHeaderSettings,
        updateHeroHeaderSettings,
        promoSettings,
        updatePromoSettings,
        addPromoBanner,
        updatePromoBanner,
        deletePromoBanner,
        faqItems,
        addFaqItem,
        updateFaqItem,
        deleteFaqItem,
        contactMessages,
        submitContactMessage,
        markContactMessageStatus,
        deleteContactMessage,
        footerSettings,
        updateFooterSettings,
        brandsDisplayMode,
        updateBrandsDisplayMode,
        wishlistedServiceIds,
        toggleWishlist,
        compareServiceIds,
        toggleCompare,
        submitPublicTestimonial,
        updateTestimonialStatus,
        isDarkMode,
        toggleTheme,
        isCloudSynced,
        currentRoute,
        navigate,
        departments,
        categories,
        subcategories,
        templates,
        services,
        packages,
        industrySectors,
        getIndustrySectorById,
        portfolioProjects,
        blogPosts,
        mediaItems,
        siteSettings,
        users,
        currentUser,
        setCurrentUser,
        homeSlides,
        addHomeSlide,
        updateHomeSlide,
        deleteHomeSlide,
        marqueeItems,
        addMarqueeItem,
        updateMarqueeItem,
        deleteMarqueeItem,
        aboutUsData,
        updateAboutUsData,
        rawajFeatures,
        addRawajFeature,
        updateRawajFeature,
        deleteRawajFeature,
        clientLogos,
        addClientLogo,
        updateClientLogo,
        deleteClientLogo,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        quoteItems,
        addToQuote,
        updateQuoteItemQuantity,
        removeQuoteItem,
        clearQuoteCart,
        submitQuoteRequest,
        quoteRequests,
        updateQuoteStatus,
        assignQuoteSalesperson,
        updateQuoteNotes,
        createService,
        updateService,
        deleteService,
        duplicateService,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        uploadMedia,
        deleteMedia,
        createPackage,
        updatePackage,
        deletePackage,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,
        createPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,
        updateSiteSettings,
        addUser,
        deleteUser,
        designTasks,
        createDesignTask,
        updateDesignTask,
        addDesignProof,
        addDesignComment,
        deleteDesignTask,
        searchServices,
        synonymMap: SYNONYMS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
