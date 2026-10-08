import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
  UserRole,
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

  // Service CRUD (Admin)
  createService: (serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => Promise<Service>;
  updateService: (id: string, serviceData: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  duplicateService: (id: string) => Promise<Service>;

  // Template CRUD (Admin)
  createTemplate: (templateData: Omit<ServiceTemplate, 'id'>) => Promise<ServiceTemplate>;
  updateTemplate: (id: string, templateData: Partial<ServiceTemplate>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;

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
  createDepartment: (data: Omit<Department, 'id'>) => Promise<Department>;
  updateDepartment: (id: string, data: Partial<Department>) => Promise<void>;
  deleteDepartment: (id: string) => Promise<void>;
  createCategory: (data: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  createSubcategory: (data: Omit<Subcategory, 'id'>) => Promise<Subcategory>;
  updateSubcategory: (id: string, data: Partial<Subcategory>) => Promise<void>;
  deleteSubcategory: (id: string) => Promise<void>;
  createIndustrySector: (data: Omit<IndustrySector, 'id'>) => Promise<IndustrySector>;
  updateIndustrySector: (id: string, data: Partial<IndustrySector>) => Promise<void>;
  deleteIndustrySector: (id: string) => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<User>;
  updateUser: (userId: string, changes: { role?: UserRole; is_active?: boolean; name?: string; phone?: string }) => Promise<User>;
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

const SUPPORTED_HOME_LAYOUTS: Record<HomeModuleId, string[]> = {
  header_hero: ['industrial_console', 'split_hero', 'minimal_search'],
  slider: ['full_cinematic'],
  marquee: ['crimson_pulse'],
  calculator: ['interactive_card'],
  services_catalog: ['carousel_store', 'grid_all', 'most_requested'],
  sector_packages: ['tabs_slider'],
  why_us: ['stats_features', 'workflow_steps', 'sourcing_capabilities'],
  promo_banners: ['dynamic_grid'],
  about_us: ['executive_story'],
  portfolio_showcase: ['case_studies', 'proud_showcase'],
  testimonials: ['carousel_cards'],
  brands_partners: ['colored_ticker'],
  blog_hub: ['knowledge_highlights'],
  faq: ['interactive_accordion'],
  contact_us: ['full_channels_form'],
};

const sanitizeHomeModulesConfig = (configs: HomeModuleConfig[]): HomeModuleConfig[] =>
  configs.map((mod) => {
    const supported = SUPPORTED_HOME_LAYOUTS[mod.id] || [];
    const available = (mod.available_layouts || []).filter((layout) => supported.includes(layout.id));
    const layoutStyle = supported.includes(mod.layout_style || '')
      ? mod.layout_style
      : available[0]?.id || supported[0] || mod.layout_style;

    return {
      ...mod,
      layout_style: layoutStyle,
      available_layouts: available,
    };
  });

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
  type PublicHydrationKey =
    | 'departments'
    | 'categories'
    | 'subcategories'
    | 'industrySectors'
    | 'services'
    | 'templates'
    | 'packages'
    | 'portfolio'
    | 'blog'
    | 'media'
    | 'homeSlides'
    | 'marquee'
    | 'features'
    | 'clientLogos'
    | 'testimonials'
    | 'faq'
    | 'settings';

  const initialHydrationRef = useRef<Record<PublicHydrationKey, boolean>>({
    departments: false,
    categories: false,
    subcategories: false,
    industrySectors: false,
    services: false,
    templates: false,
    packages: false,
    portfolio: false,
    blog: false,
    media: false,
    homeSlides: false,
    marquee: false,
    features: false,
    clientLogos: false,
    testimonials: false,
    faq: false,
    settings: false,
  });

  const markInitialHydration = (key: PublicHydrationKey) => {
    initialHydrationRef.current[key] = true;
    if (Object.values(initialHydrationRef.current).every(Boolean)) {
      setIsCloudSynced(true);
    }
  };
  const [authRevision, setAuthRevision] = useState(0);

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

  // Local storage is reserved for small device-local preferences and the quote cart.
  function safeStorageLoad<T>(key: string, fallback: T): T {
    try {
      const saved = localStorage.getItem(key);
      if (!saved || saved === 'undefined' || saved === 'null') return fallback;
      const parsed = JSON.parse(saved);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch {
      return fallback;
    }
  }

  function safeStorageSave(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('[Storage] Unable to save local preference:', error);
    }
  }

  const makeEntityId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

  // Navigation state
  const [currentRoute, setCurrentRoute] = useState<NavigationTarget>({ view: 'home' });
  const navigate = (target: NavigationTarget) => {
    setCurrentRoute(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State initialization with localStorage fallback
  const [departments, setDepartments] = useState<Department[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [industrySectors, setIndustrySectors] = useState<IndustrySector[]>([]);

  const getIndustrySectorById = (id: string) => {
    return industrySectors.find((s) => s.id === id || s.slug === id);
  };

  const [templates, setTemplates] = useState<ServiceTemplate[]>([]);

  const [services, setServices] = useState<Service[]>([]);

  const [packages, setPackages] = useState<Package[]>([]);

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

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
          setQuoteRequests([]);
          setContactMessages([]);
          setDesignTasks([]);
        }
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, name, email, role, avatar_url, phone, is_active, created_at')
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
        is_active: profile.is_active !== false,
        createdAt: profile.created_at,
        isOwnerProtected: profile.role === 'owner',
      };

      if (!active) return;
      setCurrentUser(mappedUser);

      const { data: visibleProfiles, error: usersError } = await supabase
        .from('profiles')
        .select('id, name, email, role, avatar_url, phone, is_active, created_at');

      if (!usersError && visibleProfiles) {
        const mappedUsers: User[] = visibleProfiles.map((row) => ({
          id: row.id,
          name: row.name || row.email || 'مستخدم',
          email: row.email || '',
          role: row.role as User['role'],
          avatar: row.avatar_url || undefined,
          phone: row.phone || undefined,
          is_active: row.is_active !== false,
          createdAt: row.created_at,
          isOwnerProtected: row.role === 'owner',
        }));
        setUsers(mappedUsers);
      } else {
        setUsers([mappedUser]);
      }
    };

    void supabase.auth.getSession().then(async ({ data }) => {
      await syncAuthenticatedUser(data.session?.user.id);
      if (active) setAuthRevision((value) => value + 1);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(async () => {
        await syncAuthenticatedUser(session?.user.id);
        if (active) setAuthRevision((value) => value + 1);
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

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);

  // Home Modules State
  const [homeSlides, setHomeSlides] = useState<HomeSlide[]>([]);

  const [marqueeItems, setMarqueeItems] = useState<MarqueeTickerItem[]>([]);

  const [aboutUsData, setAboutUsData] = useState<AboutUsModuleData>(INITIAL_ABOUT_US_DATA);

  const [rawajFeatures, setRawajFeatures] = useState<RawajFeature[]>([]);

  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [heroHeaderSettings, setHeroHeaderSettings] = useState<HeroHeaderSettings>(INITIAL_HERO_HEADER_SETTINGS);

  const [promoSettings, setPromoSettings] = useState<PromoModuleSettings>(INITIAL_PROMO_SETTINGS);

  const [faqItems, setFaqItems] = useState<GlobalFAQItem[]>([]);

  const [footerSettings, setFooterSettings] = useState<FooterSettings>(INITIAL_FOOTER_SETTINGS);

  const [homeModulesConfig, setHomeModulesConfig] = useState<HomeModuleConfig[]>(
    () => sanitizeHomeModulesConfig(INITIAL_HOME_MODULES_CONFIG)
  );

  const [themeSettings, setThemeSettings] = useState<ThemeCustomizerSettings>(INITIAL_THEME_SETTINGS);

  useEffect(() => {
    applyThemeToDocument(themeSettings);
    if (themeSettings.theme_mode === 'dark' && !isDarkMode) {
      setIsDarkMode(true);
    } else if (themeSettings.theme_mode === 'light' && isDarkMode) {
      setIsDarkMode(false);
    }
  }, [themeSettings]);

  const [contactMessages, setContactMessages] = useState<ContactFormMessage[]>([]);

  const [designTasks, setDesignTasks] = useState<DesignTask[]>([]);

  const [brandsDisplayMode, setBrandsDisplayMode] = useState<BrandDisplayMode>('colored');

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
        markInitialHydration('departments');
      }, (err) => console.warn('Supabase departments listener:', err.message));

      unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
        const list: Category[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Category));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setCategories(list);
        markInitialHydration('categories');
      }, (err) => console.warn('Supabase categories listener:', err.message));

      unsubSubcategories = onSnapshot(collection(db, 'subcategories'), (snapshot) => {
        const list: Subcategory[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as Subcategory));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setSubcategories(list);
        markInitialHydration('subcategories');
      }, (err) => console.warn('Supabase subcategories listener:', err.message));

      unsubIndustrySectors = onSnapshot(collection(db, 'industry_sectors'), (snapshot) => {
        const list: IndustrySector[] = [];
        snapshot.forEach((docSnap) => list.push(docSnap.data() as IndustrySector));
        list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setIndustrySectors(list);
        markInitialHydration('industrySectors');
      }, (err) => console.warn('Supabase industry sectors listener:', err.message));

      if (currentUser.id !== 'anonymous') {
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
          }, (err) => console.warn('Supabase quotes listener:', err.message));
  
  
      }

      // Services Listener
      unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        {
          const list: Service[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Service);
          });
          list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setServices(list);
          markInitialHydration('services');
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
          markInitialHydration('templates');
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
          markInitialHydration('packages');
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
          markInitialHydration('portfolio');
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
          markInitialHydration('blog');
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
          markInitialHydration('media');
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
          markInitialHydration('homeSlides');
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
          markInitialHydration('marquee');
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
          markInitialHydration('features');
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
          markInitialHydration('clientLogos');
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
          markInitialHydration('testimonials');
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
          markInitialHydration('faq');
        }
      }, (err) => console.warn('Supabase faq listener:', err.message));

      if (currentUser.id !== 'anonymous') {
        // Contact Messages Listener
        unsubContactMessages = onSnapshot(collection(db, 'contact_messages'), (snapshot) => {
          {
            const list: ContactFormMessage[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as ContactFormMessage);
            });
            list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setContactMessages(list);
          }
        }, (err) => console.warn('Supabase contact_messages listener:', err.message));
  
        // Users Listener
        unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
          {
            const list: User[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as User);
            });
            setUsers(list);
          }
        }, (err) => console.warn('Supabase users listener:', err.message));
  
  
      }

      // Settings Listener
      unsubSettings = onSnapshot(collection(db, 'settings'), (snapshot) => {
        {
          snapshot.forEach((docSnap) => {
            if (docSnap.id === 'general') {
              const cloud = docSnap.data() as SiteSettings;
              setSiteSettings((prev) => ({
                ...prev,
                ...cloud,
              }));
            }
            if (docSnap.id === 'home_modules_order') {
              const cloud = docSnap.data();
              if (cloud && Array.isArray(cloud.configs)) {
                setHomeModulesConfig(sanitizeHomeModulesConfig(cloud.configs));
              }
            }
            if (docSnap.id === 'theme_customizer') {
              const cloud = docSnap.data() as ThemeCustomizerSettings;
              if (cloud) {
                setThemeSettings(cloud);
                applyThemeToDocument(cloud);
              }
            }
            if (docSnap.id === 'footer') {
              const cloud = docSnap.data() as FooterSettings;
              if (cloud) {
                setFooterSettings(cloud);
              }
            }
            if (docSnap.id === 'about_us' || docSnap.id === 'about_us_module') {
              const cloud = docSnap.data() as AboutUsModuleData;
              if (cloud) {
                setAboutUsData(cloud);
              }
            }
            if (docSnap.id === 'promo_module' || docSnap.id === 'promos') {
              const cloud = docSnap.data() as PromoModuleSettings;
              if (cloud && cloud.banners) {
                setPromoSettings(cloud);
              }
            }
            if (docSnap.id === 'hero_header') {
              const cloud = docSnap.data() as HeroHeaderSettings;
              if (cloud) {
                setHeroHeaderSettings(cloud);
              }
            }
            if (docSnap.id === 'brands_display') {
              const cloud = docSnap.data() as { mode?: BrandDisplayMode };
              if (cloud?.mode) {
                setBrandsDisplayMode(cloud.mode);
              }
            }
          });
          markInitialHydration('settings');
        }
      }, (err) => console.warn('Supabase settings listener:', err.message));

      if (currentUser.id !== 'anonymous') {
        // Design Tasks Listener
        unsubDesignTasks = onSnapshot(collection(db, 'design_tasks'), (snapshot) => {
          {
            const list: DesignTask[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as DesignTask);
            });
            list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setDesignTasks(list);
          }
        }, (err) => console.warn('Supabase design_tasks listener:', err.message));
  
      }

    } catch (e) {
      console.warn('Supabase setup note:', e);
    }

    return () => {
      if (unsubQuotes) unsubQuotes();
      if (unsubServices) unsubServices();
      if (unsubTemplates) unsubTemplates();
      if (unsubPackages) unsubPackages();
      if (unsubPortfolio) unsubPortfolio();
      if (unsubBlog) unsubBlog();
      if (unsubMedia) unsubMedia();
      if (unsubSettings) unsubSettings();
      if (unsubDesignTasks) unsubDesignTasks();
      if (unsubHomeSlides) unsubHomeSlides();
      if (unsubMarquee) unsubMarquee();
      if (unsubFeatures) unsubFeatures();
      if (unsubClientLogos) unsubClientLogos();
      if (unsubTestimonials) unsubTestimonials();
      if (unsubFaq) unsubFaq();
      if (unsubContactMessages) unsubContactMessages();
      if (unsubUsers) unsubUsers();
      if (unsubDepartments) unsubDepartments();
      if (unsubCategories) unsubCategories();
      if (unsubSubcategories) unsubSubcategories();
      if (unsubIndustrySectors) unsubIndustrySectors();
    };
  }, [authRevision, currentUser.id]);

  // Supabase is authoritative for CMS/business data. Only the quote cart is persisted locally.
  useEffect(() => {
    safeStorageSave(STORAGE_KEYS.CART, quoteItems);
  }, [quoteItems]);

  useEffect(() => {
    applyThemeToDocument(themeSettings);
    if (themeSettings.theme_mode === 'dark' && !isDarkMode) {
      setIsDarkMode(true);
    } else if (themeSettings.theme_mode === 'light' && isDarkMode) {
      setIsDarkMode(false);
    }
  }, [themeSettings]);

  // Module 1: Hero Header settings
  const updateHeroHeaderSettings = async (settings: Partial<HeroHeaderSettings>): Promise<void> => {
    const updated = { ...heroHeaderSettings, ...settings };
    await setDoc(doc(db, 'settings', 'hero_header'), updated, { merge: true });
    setHeroHeaderSettings(updated);
  };

  // Theme Customizer
  const updateThemeSettings = async (settings: Partial<ThemeCustomizerSettings>): Promise<void> => {
    const updated = { ...themeSettings, ...settings };
    await setDoc(doc(db, 'settings', 'theme_customizer'), updated, { merge: true });
    setThemeSettings(updated);
    applyThemeToDocument(updated);
  };

  // Home Modules Config & Reordering
  const persistHomeModules = async (configs: HomeModuleConfig[]): Promise<void> => {
    const sanitized = sanitizeHomeModulesConfig(configs);
    await setDoc(doc(db, 'settings', 'home_modules_order'), { configs: sanitized }, { merge: true });
    setHomeModulesConfig(sanitized);
  };

  const updateHomeModulesConfig = async (configs: HomeModuleConfig[]): Promise<void> => {
    await persistHomeModules(configs);
  };

  const toggleModuleVisibility = async (id: HomeModuleId): Promise<void> => {
    const updated = homeModulesConfig.map((mod) =>
      mod.id === id ? { ...mod, is_visible: !mod.is_visible } : mod
    );
    await persistHomeModules(updated);
  };

  const reorderHomeModules = async (startIndex: number, endIndex: number): Promise<void> => {
    const result = Array.from(homeModulesConfig);
    const [removed] = result.splice(startIndex, 1);
    if (!removed) return;
    result.splice(endIndex, 0, removed);
    await persistHomeModules(result.map((item, index) => ({ ...item, sort_order: index + 1 })));
  };

  const updateModuleLayout = async (id: HomeModuleId, layout_style: string): Promise<void> => {
    const updated = homeModulesConfig.map((mod) =>
      mod.id === id ? { ...mod, layout_style } : mod
    );
    await persistHomeModules(updated);
  };

  // Promo Banners & Module
  const updatePromoSettings = async (settings: Partial<PromoModuleSettings>): Promise<void> => {
    const updated = { ...promoSettings, ...settings };
    await setDoc(doc(db, 'settings', 'promo_module'), updated, { merge: true });
    setPromoSettings(updated);
  };

  const addPromoBanner = async (banner: Omit<PromoBanner, 'id'>): Promise<void> => {
    const newBanner: PromoBanner = { ...banner, id: makeEntityId('prm') };
    await updatePromoSettings({ banners: [...promoSettings.banners, newBanner] });
  };

  const updatePromoBanner = async (id: string, banner: Partial<PromoBanner>): Promise<void> => {
    await updatePromoSettings({
      banners: promoSettings.banners.map((item) => item.id === id ? { ...item, ...banner } : item),
    });
  };

  const deletePromoBanner = async (id: string): Promise<void> => {
    await updatePromoSettings({ banners: promoSettings.banners.filter((item) => item.id !== id) });
  };

  // FAQ CRUD
  const addFaqItem = async (item: Omit<GlobalFAQItem, 'id'>): Promise<void> => {
    const newItem: GlobalFAQItem = { ...item, id: makeEntityId('faq') };
    await setDoc(doc(db, 'faq', newItem.id), newItem);
    setFaqItems((prev) => [...prev, newItem]);
  };

  const updateFaqItem = async (id: string, item: Partial<GlobalFAQItem>): Promise<void> => {
    await setDoc(doc(db, 'faq', id), item, { merge: true });
    setFaqItems((prev) => prev.map((entry) => entry.id === id ? { ...entry, ...item } : entry));
  };

  const deleteFaqItem = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'faq', id));
    setFaqItems((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Contact Messages
  const submitContactMessage = async (
    data: Omit<ContactFormMessage, 'id' | 'created_at' | 'status'>
  ): Promise<void> => {
    const newMsg: ContactFormMessage = {
      ...data,
      id: makeEntityId('msg'),
      created_at: new Date().toISOString(),
      status: 'unread',
    };
    await setDoc(doc(db, 'contact_messages', newMsg.id), newMsg);
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const markContactMessageStatus = async (
    id: string,
    status: 'unread' | 'read' | 'replied'
  ): Promise<void> => {
    await setDoc(doc(db, 'contact_messages', id), { status }, { merge: true });
    setContactMessages((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
  };

  const deleteContactMessage = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'contact_messages', id));
    setContactMessages((prev) => prev.filter((item) => item.id !== id));
  };

  // Footer Settings
  const updateFooterSettings = async (settings: Partial<FooterSettings>): Promise<void> => {
    const updated = { ...footerSettings, ...settings };
    await setDoc(doc(db, 'settings', 'footer'), updated, { merge: true });
    setFooterSettings(updated);
  };

  // Brands Mode
  const updateBrandsDisplayMode = async (mode: BrandDisplayMode): Promise<void> => {
    await setDoc(doc(db, 'settings', 'brands_display'), { mode }, { merge: true });
    setBrandsDisplayMode(mode);
  };

  // Testimonials Public Submit & Moderation
  const submitPublicTestimonial = async (
    data: { client_name_ar: string; client_title_ar: string; client_company_ar: string; comment_ar: string; rating: number }
  ): Promise<void> => {
    const newTest: Testimonial = {
      ...data,
      id: makeEntityId('test'),
            status: 'pending',
      sort_order: testimonials.length + 1,
      is_active: false,
      created_at: new Date().toISOString(),
    };
    await setDoc(doc(db, 'testimonials', newTest.id), newTest);
    setTestimonials((prev) => [newTest, ...prev]);
  };

  const updateTestimonialStatus = async (
    id: string,
    status: 'approved' | 'pending' | 'rejected'
  ): Promise<void> => {
    const patch = { status, is_active: status === 'approved' };
    await setDoc(doc(db, 'testimonials', id), patch, { merge: true });
    setTestimonials((prev) => prev.map((item) => item.id === id ? { ...item, ...patch } : item));
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
      id: makeEntityId('item'),
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
    const referenceSuffix = crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();
    const referenceNumber = `RWJ-${dateStr}-${referenceSuffix}`;
    const quoteId = makeEntityId('quote');

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
          id: makeEntityId('tl'),
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

    const cleanPhone = (siteSettings.mobile_whatsapp || siteSettings.phone || '').replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(waText);
    const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedMsg}` : '';

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
    const targetQuote = quoteRequests.find((quote) => quote.id === quoteId);
    if (!targetQuote) throw new Error('طلب التسعير غير موجود.');

    const updatedQuote: QuoteRequest = {
      ...targetQuote,
      status: newStatus,
      internal_notes: internalNotes || targetQuote.internal_notes,
      updated_at: new Date().toISOString(),
      timeline: [
        ...targetQuote.timeline,
        {
          id: makeEntityId('tl'),
          timestamp: new Date().toISOString(),
          user_name: currentUser.name,
          action: `تغيير الحالة إلى: ${statusNames[newStatus]}`,
          notes: internalNotes,
        },
      ],
    };

    await setDoc(doc(db, 'quotes', quoteId), updatedQuote, { merge: true });
    setQuoteRequests((prev) => prev.map((quote) => quote.id === quoteId ? updatedQuote : quote));
  };

  const assignQuoteSalesperson = async (quoteId: string, salespersonId: string): Promise<void> => {
    const targetQuote = quoteRequests.find((quote) => quote.id === quoteId);
    if (!targetQuote) throw new Error('طلب التسعير غير موجود.');
    const salesperson = users.find((user) => user.id === salespersonId);
    const nextAssignedTo = salespersonId || undefined;
    const updatedAt = new Date().toISOString();
    const nextTimeline = [
      ...targetQuote.timeline,
      {
        id: makeEntityId('tl'),
        timestamp: updatedAt,
        user_name: currentUser.name,
        action: `تم إسناد الطلب للمسؤول: ${salesperson ? salesperson.name : 'غير مسند'}`,
      },
    ];

    await setDoc(doc(db, 'quotes', quoteId), {
      assigned_to: salespersonId || null,
      updated_at: updatedAt,
      timeline: nextTimeline,
    }, { merge: true });

    setQuoteRequests((prev) => prev.map((quote) =>
      quote.id === quoteId
        ? { ...quote, assigned_to: nextAssignedTo, updated_at: updatedAt, timeline: nextTimeline }
        : quote
    ));
  };

  const updateQuoteNotes = async (
    quoteId: string,
    internalNotes?: string,
    supplierNotes?: string
  ): Promise<void> => {
    const targetQuote = quoteRequests.find((quote) => quote.id === quoteId);
    if (!targetQuote) throw new Error('طلب التسعير غير موجود.');

    const updatedQuote: QuoteRequest = {
      ...targetQuote,
      internal_notes: internalNotes !== undefined ? internalNotes : targetQuote.internal_notes,
      supplier_notes: supplierNotes !== undefined ? supplierNotes : targetQuote.supplier_notes,
      updated_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'quotes', quoteId), updatedQuote, { merge: true });
    setQuoteRequests((prev) => prev.map((quote) => quote.id === quoteId ? updatedQuote : quote));
  };

  // Service CRUD
  const createService = async (
    serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Service> => {
    const now = new Date().toISOString();
    const newService: Service = {
      ...serviceData,
      id: makeEntityId('srv'),
      created_at: now,
      updated_at: now,
    };
    await setDoc(doc(db, 'services', newService.id), newService);
    setServices((prev) => {
      const updated = [newService, ...prev];
      return updated;
    });
    return newService;
  };

  const updateService = async (id: string, serviceData: Partial<Service>): Promise<void> => {
    const existing = services.find((service) => service.id === id);
    if (!existing) throw new Error('الخدمة غير موجودة.');
    const updatedService: Service = {
      ...existing,
      ...serviceData,
      updated_at: new Date().toISOString(),
    };
    await setDoc(doc(db, 'services', id), updatedService, { merge: true });
    setServices((prev) => {
      const updated = prev.map((service) => service.id === id ? updatedService : service);
      return updated;
    });
  };

  const deleteService = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'services', id));
    setServices((prev) => {
      const updated = prev.filter((service) => service.id !== id);
      return updated;
    });
  };

  const duplicateService = async (id: string): Promise<Service> => {
    const original = services.find((service) => service.id === id);
    if (!original) throw new Error('الخدمة غير موجودة.');
    const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
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
    const newTemplate: ServiceTemplate = {
      ...templateData,
      id: makeEntityId('tmpl'),
    };
    await setDoc(doc(db, 'templates', newTemplate.id), newTemplate);
    setTemplates((prev) => [...prev, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = async (
    id: string,
    templateData: Partial<ServiceTemplate>
  ): Promise<void> => {
    const existing = templates.find((template) => template.id === id);
    if (!existing) throw new Error('القالب غير موجود.');
    const updatedTemplate = { ...existing, ...templateData };
    await setDoc(doc(db, 'templates', id), updatedTemplate, { merge: true });
    setTemplates((prev) => prev.map((template) => template.id === id ? updatedTemplate : template));
  };

  const deleteTemplate = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'templates', id));
    setTemplates((prev) => prev.filter((template) => template.id !== id));
  };

  // Media Library
  const uploadMedia = async (fileData: { name: string; url: string; storage_path?: string; mime_type?: string; size_kb: number; category?: string; alt_ar?: string }): Promise<MediaItem> => {
    const id = makeEntityId('med');
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

    // Remove database metadata first so a transient Storage failure can never
    // leave a visible library record pointing at a file that was already deleted.
    await deleteDoc(doc(db, 'media', id));
    setMediaItems((prev) => prev.filter((m) => m.id !== id));

    if (target?.storage_path) {
      try {
        await removeRawajStorageObject(target.storage_path);
      } catch (error) {
        // The media item is already deleted from the CMS. A leftover object is
        // safer than a broken database record and can be cleaned later.
        console.error('Supabase Storage cleanup failed after media deletion:', error);
      }
    }
  };

  // Packages CRUD
  const createPackage = async (pkg: Omit<Package, 'id'>): Promise<void> => {
    const newPackage: Package = {
      ...pkg,
      id: makeEntityId('pkg'),
    };
    await setDoc(doc(db, 'packages', newPackage.id), newPackage);
    setPackages((prev) => [...prev, newPackage]);
  };

  const updatePackage = async (id: string, pkg: Partial<Package>): Promise<void> => {
    const existing = packages.find((item) => item.id === id);
    if (!existing) throw new Error('الباقة غير موجودة.');
    const updated = { ...existing, ...pkg };
    await setDoc(doc(db, 'packages', id), updated, { merge: true });
    setPackages((prev) => prev.map((item) => item.id === id ? updated : item));
  };

  const deletePackage = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'packages', id));
    setPackages((prev) => prev.filter((item) => item.id !== id));
  };

  // Blog CRUD
  const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<void> => {
    const newPost: BlogPost = {
      ...post,
      id: makeEntityId('post'),
    };
    await setDoc(doc(db, 'blog', newPost.id), newPost);
    setBlogPosts((prev) => [newPost, ...prev]);
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<void> => {
    const existing = blogPosts.find((item) => item.id === id);
    if (!existing) throw new Error('المقال غير موجود.');
    const updated = { ...existing, ...post };
    await setDoc(doc(db, 'blog', id), updated, { merge: true });
    setBlogPosts((prev) => prev.map((item) => item.id === id ? updated : item));
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'blog', id));
    setBlogPosts((prev) => prev.filter((item) => item.id !== id));
  };

  // Portfolio CRUD
  const createPortfolioProject = async (
    project: Omit<PortfolioProject, 'id'>
  ): Promise<void> => {
    const newProject: PortfolioProject = {
      ...project,
      id: makeEntityId('proj'),
    };
    await setDoc(doc(db, 'portfolio', newProject.id), newProject);
    setPortfolioProjects((prev) => [newProject, ...prev]);
  };

  const updatePortfolioProject = async (
    id: string,
    project: Partial<PortfolioProject>
  ): Promise<void> => {
    const existing = portfolioProjects.find((item) => item.id === id);
    if (!existing) throw new Error('المشروع غير موجود.');
    const updated = { ...existing, ...project };
    await setDoc(doc(db, 'portfolio', id), updated, { merge: true });
    setPortfolioProjects((prev) => prev.map((item) => item.id === id ? updated : item));
  };

  const deletePortfolioProject = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'portfolio', id));
    setPortfolioProjects((prev) => prev.filter((item) => item.id !== id));
  };

  // Taxonomy & Settings & Users
  const makeTaxonomyId = (prefix: string) =>
    `${prefix}-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;

  const createDepartment = async (data: Omit<Department, 'id'>): Promise<Department> => {
    const entity: Department = { ...data, id: makeTaxonomyId('dept'), is_active: data.is_active ?? true };
    await setDoc(doc(db, 'departments', entity.id), entity);
    setDepartments((prev) => [...prev, entity].sort((a, b) => a.sort_order - b.sort_order));
    return entity;
  };

  const updateDepartment = async (id: string, data: Partial<Department>): Promise<void> => {
    await setDoc(doc(db, 'departments', id), data, { merge: true });
    setDepartments((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
  };

  const deleteDepartment = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'departments', id));
    setDepartments((prev) => prev.filter((item) => item.id !== id));
  };

  const createCategory = async (data: Omit<Category, 'id'>): Promise<Category> => {
    const entity: Category = { ...data, id: makeTaxonomyId('cat'), is_active: data.is_active ?? true };
    await setDoc(doc(db, 'categories', entity.id), entity);
    setCategories((prev) => [...prev, entity].sort((a, b) => a.sort_order - b.sort_order));
    return entity;
  };

  const updateCategory = async (id: string, data: Partial<Category>): Promise<void> => {
    await setDoc(doc(db, 'categories', id), data, { merge: true });
    setCategories((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
  };

  const deleteCategory = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'categories', id));
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const createSubcategory = async (data: Omit<Subcategory, 'id'>): Promise<Subcategory> => {
    const entity: Subcategory = { ...data, id: makeTaxonomyId('subcat'), is_active: data.is_active ?? true };
    await setDoc(doc(db, 'subcategories', entity.id), entity);
    setSubcategories((prev) => [...prev, entity].sort((a, b) => a.sort_order - b.sort_order));
    return entity;
  };

  const updateSubcategory = async (id: string, data: Partial<Subcategory>): Promise<void> => {
    await setDoc(doc(db, 'subcategories', id), data, { merge: true });
    setSubcategories((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
  };

  const deleteSubcategory = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'subcategories', id));
    setSubcategories((prev) => prev.filter((item) => item.id !== id));
  };

  const createIndustrySector = async (data: Omit<IndustrySector, 'id'>): Promise<IndustrySector> => {
    const entity: IndustrySector = { ...data, id: makeTaxonomyId('sector'), is_active: data.is_active ?? true };
    await setDoc(doc(db, 'industry_sectors', entity.id), entity);
    setIndustrySectors((prev) => [...prev, entity].sort((a, b) => a.sort_order - b.sort_order));
    return entity;
  };

  const updateIndustrySector = async (id: string, data: Partial<IndustrySector>): Promise<void> => {
    await setDoc(doc(db, 'industry_sectors', id), data, { merge: true });
    setIndustrySectors((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
  };

  const deleteIndustrySector = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'industry_sectors', id));
    setIndustrySectors((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
    const updated = { ...siteSettings, ...settings };
    await setDoc(doc(db, 'settings', 'general'), updated, { merge: true });
    setSiteSettings(updated);
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

  const updateUser = async (
    userId: string,
    changes: { role?: UserRole; is_active?: boolean; name?: string; phone?: string }
  ): Promise<User> => {
    const target = users.find((u) => u.id === userId);
    if (!target) throw new Error('المستخدم غير موجود.');

    const { data, error } = await supabase.functions.invoke('admin-users', {
      body: {
        action: 'update',
        userId,
        role: changes.role || target.role,
        isActive: changes.is_active ?? target.is_active ?? true,
        name: changes.name ?? target.name,
        phone: changes.phone ?? target.phone ?? '',
      },
    });

    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    if (!data?.user) throw new Error('تعذر تحديث المستخدم.');

    const updated = data.user as User;
    setUsers((prev) => prev.map((u) => u.id === userId ? updated : u));
    return updated;
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
    const newSlide: HomeSlide = {
      ...slide,
      id: makeEntityId('slide'),
    };
    await setDoc(doc(db, 'home_slides', newSlide.id), newSlide);
    setHomeSlides((prev) => {
      const updated = [...prev, newSlide];
      return updated;
    });
  };

  const updateHomeSlide = async (id: string, slide: Partial<HomeSlide>): Promise<void> => {
    await setDoc(doc(db, 'home_slides', id), slide, { merge: true });
    setHomeSlides((prev) => {
      const updated = prev.map((item) => item.id === id ? { ...item, ...slide } : item);
      return updated;
    });
  };

  const deleteHomeSlide = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'home_slides', id));
    setHomeSlides((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      return updated;
    });
  };

  // Marquee CRUD
  const addMarqueeItem = async (item: Omit<MarqueeTickerItem, 'id'>): Promise<void> => {
    const newItem: MarqueeTickerItem = {
      ...item,
      id: makeEntityId('mrq'),
    };
    await setDoc(doc(db, 'marquee', newItem.id), newItem);
    setMarqueeItems((prev) => [...prev, newItem]);
  };

  const updateMarqueeItem = async (
    id: string,
    item: Partial<MarqueeTickerItem>
  ): Promise<void> => {
    await setDoc(doc(db, 'marquee', id), item, { merge: true });
    setMarqueeItems((prev) => prev.map((entry) => entry.id === id ? { ...entry, ...item } : entry));
  };

  const deleteMarqueeItem = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'marquee', id));
    setMarqueeItems((prev) => prev.filter((entry) => entry.id !== id));
  };

  // About Us Update
  const updateAboutUsData = async (data: Partial<AboutUsModuleData>): Promise<void> => {
    const updated = { ...aboutUsData, ...data };
    await setDoc(doc(db, 'settings', 'about_us'), updated, { merge: true });
    setAboutUsData(updated);
  };

  // Rawaj Features CRUD
  const addRawajFeature = async (feat: Omit<RawajFeature, 'id'>): Promise<void> => {
    const newFeature: RawajFeature = {
      ...feat,
      id: makeEntityId('feat'),
    };
    await setDoc(doc(db, 'features', newFeature.id), newFeature);
    setRawajFeatures((prev) => [...prev, newFeature]);
  };

  const updateRawajFeature = async (id: string, feat: Partial<RawajFeature>): Promise<void> => {
    await setDoc(doc(db, 'features', id), feat, { merge: true });
    setRawajFeatures((prev) => prev.map((item) => item.id === id ? { ...item, ...feat } : item));
  };

  const deleteRawajFeature = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'features', id));
    setRawajFeatures((prev) => prev.filter((item) => item.id !== id));
  };

  // Client Logos CRUD
  const addClientLogo = async (client: Omit<ClientLogo, 'id'>): Promise<void> => {
    const newClient: ClientLogo = {
      ...client,
      id: makeEntityId('cli'),
    };
    await setDoc(doc(db, 'client_logos', newClient.id), newClient);
    setClientLogos((prev) => [...prev, newClient]);
  };

  const updateClientLogo = async (id: string, client: Partial<ClientLogo>): Promise<void> => {
    await setDoc(doc(db, 'client_logos', id), client, { merge: true });
    setClientLogos((prev) => prev.map((item) => item.id === id ? { ...item, ...client } : item));
  };

  const deleteClientLogo = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'client_logos', id));
    setClientLogos((prev) => prev.filter((item) => item.id !== id));
  };

  // Testimonials CRUD
  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>): Promise<void> => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: makeEntityId('test'),
    };
    await setDoc(doc(db, 'testimonials', newTestimonial.id), newTestimonial);
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const updateTestimonial = async (
    id: string,
    testimonial: Partial<Testimonial>
  ): Promise<void> => {
    await setDoc(doc(db, 'testimonials', id), testimonial, { merge: true });
    setTestimonials((prev) => prev.map((item) => item.id === id ? { ...item, ...testimonial } : item));
  };

  const deleteTestimonial = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'testimonials', id));
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  // Design Tasks & Proof Workflows CRUD
  const createDesignTask = async (
    taskData: Omit<DesignTask, 'id' | 'created_at' | 'updated_at' | 'proof_versions' | 'comments'>
  ): Promise<DesignTask> => {
    const now = new Date().toISOString();
    const newTask: DesignTask = {
      ...taskData,
      id: makeEntityId('task'),
      proof_versions: [],
      comments: [],
      created_at: now,
      updated_at: now,
    };
    await setDoc(doc(db, 'design_tasks', newTask.id), newTask);
    setDesignTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateDesignTask = async (id: string, updates: Partial<DesignTask>): Promise<void> => {
    const existing = designTasks.find((task) => task.id === id);
    if (!existing) throw new Error('مهمة التصميم غير موجودة.');
    const updatedTask: DesignTask = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    await setDoc(doc(db, 'design_tasks', id), updatedTask, { merge: true });
    setDesignTasks((prev) => prev.map((task) => task.id === id ? updatedTask : task));
  };

  const addDesignProof = async (
    taskId: string,
    proof: Omit<DesignProofVersion, 'id' | 'created_at'>
  ): Promise<void> => {
    const task = designTasks.find((item) => item.id === taskId);
    if (!task) throw new Error('مهمة التصميم غير موجودة.');
    const newProof: DesignProofVersion = {
      ...proof,
      id: makeEntityId('proof'),
      created_at: new Date().toISOString(),
    };
    const updatedTask: DesignTask = {
      ...task,
      proof_versions: [...task.proof_versions, newProof],
      status: 'proof_submitted',
      updated_at: new Date().toISOString(),
    };
    await setDoc(doc(db, 'design_tasks', taskId), updatedTask, { merge: true });
    setDesignTasks((prev) => prev.map((item) => item.id === taskId ? updatedTask : item));
  };

  const addDesignComment = async (
    taskId: string,
    comment: Omit<DesignComment, 'id' | 'created_at'>
  ): Promise<void> => {
    const task = designTasks.find((item) => item.id === taskId);
    if (!task) throw new Error('مهمة التصميم غير موجودة.');
    const newComment: DesignComment = {
      ...comment,
      id: makeEntityId('comm'),
      created_at: new Date().toISOString(),
    };
    const updatedTask: DesignTask = {
      ...task,
      comments: [...task.comments, newComment],
      status: comment.status_change || task.status,
      updated_at: new Date().toISOString(),
    };
    await setDoc(doc(db, 'design_tasks', taskId), updatedTask, { merge: true });
    setDesignTasks((prev) => prev.map((item) => item.id === taskId ? updatedTask : item));
  };

  const deleteDesignTask = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'design_tasks', id));
    setDesignTasks((prev) => prev.filter((task) => task.id !== id));
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
        createDepartment,
        updateDepartment,
        deleteDepartment,
        createCategory,
        updateCategory,
        deleteCategory,
        createSubcategory,
        updateSubcategory,
        deleteSubcategory,
        createIndustrySector,
        updateIndustrySector,
        deleteIndustrySector,
        updateSiteSettings,
        addUser,
        updateUser,
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
