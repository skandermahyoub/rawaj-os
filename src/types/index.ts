export type ServiceStatus = 'published' | 'draft' | 'research' | 'ready_for_review' | 'archived';

export type ExecutionModel = 'in_house' | 'local_partner' | 'international_sourcing' | 'mixed' | 'not_decided';

export type UserRole = 'owner' | 'admin' | 'editor' | 'sales' | 'designer';

export type DesignTaskStatus = 
  | 'new' 
  | 'assigned' 
  | 'in_progress' 
  | 'proof_submitted' 
  | 'feedback_requested' 
  | 'approved' 
  | 'sent_to_print' 
  | 'completed';

export interface DesignProofVersion {
  id: string;
  version_number: number;
  preview_url: string;
  file_name: string;
  file_size?: string;
  uploaded_by_id: string;
  uploaded_by_name: string;
  created_at: string;
  notes_ar?: string;
}

export interface DesignComment {
  id: string;
  author_id: string;
  author_name: string;
  author_role: UserRole | 'client';
  text: string;
  created_at: string;
  attachment_url?: string;
  status_change?: DesignTaskStatus;
}

export interface DesignTask {
  id: string;
  title_ar: string;
  client_name: string;
  client_phone?: string;
  quote_id?: string;
  service_id?: string;
  department_id?: string;
  designer_id?: string;
  designer_name?: string;
  deadline?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: DesignTaskStatus;
  description_ar: string;
  dimensions_notes?: string;
  required_format?: string;
  brief_file_url?: string;
  proof_versions: DesignProofVersion[];
  comments: DesignComment[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  is_active?: boolean;
  isOwnerProtected?: boolean;
}

export interface Department {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  icon: string;
  description_ar: string;
  hero_image: string;
  sort_order: number;
  is_active?: boolean;
}

export interface Category {
  id: string;
  department_id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar?: string;
  sort_order: number;
  is_active?: boolean;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  sort_order: number;
  is_active?: boolean;
}

export type FieldType = 
  | 'select' 
  | 'multi_select' 
  | 'radio' 
  | 'number' 
  | 'text' 
  | 'textarea' 
  | 'checkbox' 
  | 'measurement' 
  | 'file';

export interface FieldOption {
  id: string;
  label_ar: string;
  label_en?: string;
  value: string;
  is_default?: boolean;
  description?: string;
  badge?: string;
}

export interface VisibilityCondition {
  field_id: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'is_truthy';
  value: any;
}

export interface SpecificationField {
  id: string;
  key: string;
  label_ar: string;
  label_en?: string;
  type: FieldType;
  required: boolean;
  help_text_ar?: string;
  placeholder_ar?: string;
  unit?: string;
  default_value?: any;
  options?: FieldOption[];
  allow_rawaj_recommendation?: boolean; // "لا أعرف — أحتاج توصية رواج"
  visibility_condition?: VisibilityCondition;
  sort_order: number;
}

export interface SpecificationGroup {
  id: string;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  sort_order: number;
  fields: SpecificationField[];
}

export interface ServiceTemplate {
  id: string;
  name_ar: string;
  name_en: string;
  code: string;
  description_ar: string;
  department_id: string;
  specification_groups: SpecificationGroup[];
}

export interface ServiceHighlight {
  id: string;
  title_ar: string;
  description_ar: string;
  icon?: string;
}

export interface FAQItem {
  id: string;
  question_ar: string;
  answer_ar: string;
}

export interface PrepressRule {
  color_mode?: 'CMYK' | 'RGB' | 'Pantone' | 'Any';
  recommended_dpi?: number;
  bleed_mm?: number;
  safety_margin_mm?: number;
  accepted_formats?: string[];
  notes_ar?: string;
}

export interface IndustrySector {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  icon: string;
  tagline_ar: string;
  description_ar: string;
  hero_image: string;
  color_accent?: string;
  service_ids: string[];
  package_ids?: string[];
  sort_order: number;
  is_active?: boolean;
}

export interface Service {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  department_id: string;
  category_id: string;
  subcategory_id?: string;
  industry_sector_ids?: string[];
  is_international_sourcing?: boolean;
  short_description_ar: string;
  full_description_ar: string;
  hero_image: string;
  gallery: string[];
  badge?: string;
  service_status: ServiceStatus;
  execution_model: ExecutionModel;
  featured: boolean;
  most_requested?: boolean;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  highlights: ServiceHighlight[];
  faq: FAQItem[];
  prepress_rules?: PrepressRule;
  specification_groups: SpecificationGroup[];
  related_service_ids: string[];
  related_package_ids?: string[];
  template_id?: string;
  created_at: string;
  updated_at: string;
}

export type ArtworkStatus = 'ready' | 'needs_review' | 'needs_design' | 'no_artwork';

export interface QuoteItem {
  id: string;
  service_id: string;
  service_name_ar: string;
  department_name_ar: string;
  hero_image: string;
  quantity: number;
  quantity_unit?: string;
  selected_specifications: Record<string, any>; // field_id -> value or "rawaj_recommendation"
  specification_summary: { label: string; value: string }[];
  custom_notes?: string;
  artwork_status: ArtworkStatus;
  artwork_file_name?: string;
  artwork_file_url?: string;
}

export type QuoteStatus = 
  | 'new' 
  | 'reviewing' 
  | 'need_more_info' 
  | 'pricing' 
  | 'sent' 
  | 'negotiation' 
  | 'won' 
  | 'lost' 
  | 'archived';

export interface QuoteCustomer {
  name: string;
  company?: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  city: string;
  address?: string;
}

export interface QuoteTimelineEntry {
  id: string;
  timestamp: string;
  user_name: string;
  action: string;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  reference_number: string;
  customer: QuoteCustomer;
  items: QuoteItem[];
  deadline_date?: string;
  general_notes?: string;
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
  assigned_to?: string; // salesperson user id
  internal_notes?: string;
  supplier_notes?: string;
  timeline: QuoteTimelineEntry[];
}

export interface PackageItemBreakdown {
  name_ar: string;
  description_ar: string;
  specs_hint_ar?: string;
  icon?: string;
}

export interface PackageTier {
  key: 'basic' | 'professional' | 'integrated' | string;
  name_ar: string;
  description_ar?: string;
  service_ids: string[];
}

export interface Package {
  id: string;
  title_ar: string;
  title_en: string;
  slug: string;
  tagline_ar: string;
  description_ar: string;
  hero_image: string;
  badge?: string;
  featured: boolean;
  service_ids: string[];
  benefits_ar: string[];
  sort_order: number;
  // Commercial solution system: classify by customer outcome/use case, not by industry.
  solution_key?: string;
  audience_ar?: string;
  tiers?: PackageTier[];
  // Legacy fields retained only for backwards-compatible records; new packages do not depend on them.
  sector_key?: string;
  target_sector_ar?: string;
  ideal_for_ar?: string;
  turnaround_time_ar?: string;
  items_breakdown?: PackageItemBreakdown[];
  key_advantages_ar?: string[];
}

export interface PortfolioProject {
  id: string;
  title_ar: string;
  title_en?: string;
  client_type_ar: string;
  industry: string;
  year: string;
  city: string;
  short_description_ar: string;
  challenge_ar?: string;
  solution_ar?: string;
  services_used_ids: string[];
  images: string[];
  featured: boolean;
  sort_order?: number;
  is_active?: boolean;
  category_ar?: string;
  work_type?: 'project' | 'gallery';
  tags_ar?: string[];
}

export interface BlogPost {
  id: string;
  title_ar: string;
  slug: string;
  category_ar: string; // e.g. "دليل الخامات", "التشطيبات", "التغليف", "اللوحات"
  read_time_minutes: number;
  publish_date: string;
  hero_image: string;
  excerpt_ar: string;
  content_markdown_ar: string;
  published: boolean;
  tags_ar: string[];
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  storage_path?: string;
  mime_type?: string;
  size_kb: number;
  category: string;
  uploaded_at: string;
  alt_ar?: string;
}

export interface SiteSettings {
  company_name_ar: string;
  company_name_en: string;
  slogan_ar: string;
  slogan_en?: string;
  logo_url?: string;
  founding_year: number;
  phone: string;
  mobile_whatsapp: string;
  email: string;
  address_ar: string;
  working_hours_ar: string;
  company_profile_pdf_url?: string;
  announcement_banner?: {
    enabled: boolean;
    text_ar: string;
    link?: string;
  };
}

export interface HomeSlide {
  id: string;
  title_ar: string;
  subtitle_ar: string;
  badge_ar?: string;
  image_url: string;
  button_text_ar: string;
  secondary_button_text_ar?: string;
  target_view: 'about-contact' | 'services' | 'portfolio' | 'custom-quote' | 'packages' | 'departments';
  secondary_target_view?: 'about-contact' | 'services' | 'portfolio' | 'custom-quote' | 'packages' | 'departments';
  sort_order: number;
  is_active: boolean;
}

export interface HeroHeaderSettings {
  enabled: boolean;
  company_name_ar: string;
  company_name_en: string;
  slogan_ar: string;
  welcome_title_ar: string;
  welcome_subtitle_ar: string;
  badge_ar: string;
  bg_image_url: string;
  primary_cta_text_ar: string;
  secondary_cta_text_ar: string;
  preferred_dimensions_ar: string;
}

export type MarqueeCategory = 'news' | 'special_offer' | 'announcement' | 'marketing' | 'unclassified' | 'general';

export interface MarqueeTickerItem {
  id: string;
  text_ar: string;
  category: MarqueeCategory;
  badge_ar?: string;
  icon?: string;
  link_view?: string;
  is_active: boolean;
  sort_order: number;
}

export interface AboutUsModuleData {
  gm_name_ar: string;
  gm_title_ar: string;
  gm_photo_url: string;
  gm_quote_ar: string;
  goal_ar: string;
  vision_ar: string;
  mission_ar: string;
  values_ar?: string;
  profile_pdf_url: string;
  years_experience?: number;
  completed_projects_count?: string;
  happy_clients_count?: string;
}

export interface RawajFeature {
  id: string;
  title_ar: string;
  description_ar: string;
  icon: string;
  card_type?: 'icon_card' | 'counter_card' | 'badge_card';
  counter_value?: string;
  badge_ar?: string;
  sort_order: number;
  is_active: boolean;
}

export type BrandDisplayMode = 'grayscale' | 'colored' | 'logo_only' | 'logo_with_name' | 'logo_with_rating';

export interface ClientLogo {
  id: string;
  name_ar: string;
  logo_url: string;
  industry_ar?: string;
  rating?: number;
  testimonial_snippet?: string;
  sort_order: number;
  is_active: boolean;
}

export type TestimonialStatus = 'approved' | 'pending' | 'rejected';

export interface Testimonial {
  id: string;
  client_name_ar: string;
  client_title_ar: string;
  client_company_ar: string;
  client_avatar_url?: string;
  comment_ar: string;
  rating: number; // 1 to 5
  project_type_ar?: string;
  status: TestimonialStatus;
  created_at?: string;
  sort_order: number;
  is_active: boolean;
}

export type PromoLayout = 'hero_single' | 'double_horizontal' | 'double_vertical' | 'triple_split' | 'quad_grid' | 'carousel';

export interface PromoBanner {
  id: string;
  title_ar: string;
  subtitle_ar: string;
  badge_ar?: string;
  image_url: string;
  cta_text_ar?: string;
  link_view?: string;
  is_active: boolean;
  sort_order: number;
  discount_tag?: string;
  valid_until?: string;
  highlights?: string[];
}

export interface PromoModuleSettings {
  enabled: boolean;
  title_ar: string;
  subtitle_ar: string;
  layout: PromoLayout;
  autoplay_speed?: number;
  bg_shade?: 'royal_crimson' | 'deep_burgundy' | 'ruby_red';
  carousel_style?: 'full_hero' | 'multi_card';
  banners: PromoBanner[];
}

export interface GlobalFAQItem {
  id: string;
  category_ar: string;
  question_ar: string;
  answer_ar: string;
  sort_order: number;
  is_active: boolean;
}

export interface ContactFormMessage {
  id: string;
  name: string;
  email?: string;
  phone: string;
  service_interest?: string;
  message: string;
  created_at: string;
  status: 'unread' | 'read' | 'replied';
}

export interface SocialLinks {
  tiktok?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  whatsapp_channel?: string;
  telegram?: string;
  snapchat?: string;
}

export interface FooterBranch {
  id: string;
  name_ar: string;
  address_ar: string;
  phone: string;
  is_headquarters?: boolean;
}

export interface FooterSettings {
  logo_url?: string;
  company_name_ar: string;
  slogan_ar: string;
  description_ar: string;
  phone: string;
  mobile_whatsapp: string;
  email: string;
  website: string;
  branches: FooterBranch[];
  social_links: SocialLinks;
  copyright_text_ar: string;
  powered_by_ar: string;
  show_quick_links: boolean;
  show_policies: boolean;
}

export type HomeModuleId =
  | 'header_hero'
  | 'slider'
  | 'marquee'
  | 'calculator'
  | 'about_us'
  | 'why_us'
  | 'services_catalog'
  | 'sector_packages'
  | 'promo_banners'
  | 'testimonials'
  | 'brands_partners'
  | 'portfolio_showcase'
  | 'blog_hub'
  | 'faq'
  | 'contact_us';

export interface ModuleLayoutOption {
  id: string;
  name_ar: string;
  description_ar: string;
}

export interface HomeModuleConfig {
  id: HomeModuleId;
  name_ar: string;
  description_ar: string;
  is_visible: boolean;
  sort_order: number;
  badge_ar: string;
  layout_style?: string;
  available_layouts?: ModuleLayoutOption[];
}

export type ThemeMode = 'dark' | 'light' | 'auto';
export type CardSurfaceStyle = 'glass' | 'solid' | 'neon' | 'gradient';
export type BackgroundPattern = 'grid' | 'dots' | 'mesh' | 'clean';
export type ArabicFontFamily = 'tajawal' | 'cairo' | 'noto_sans' | 'noto_kufi' | 'almarai';

export interface ColorPreset {
  id: string;
  name_ar: string;
  name_en: string;
  primary_color: string;
  primary_hover: string;
  secondary_bg: string;
  accent_color: string;
  preview_colors: string[];
}

export interface ThemeCustomizerSettings {
  theme_mode: ThemeMode;
  color_preset_id: string;
  primary_color: string;
  primary_hover: string;
  secondary_bg: string;
  accent_color: string;
  card_surface_style: CardSurfaceStyle;
  background_pattern: BackgroundPattern;
  glow_intensity: number; // 0 to 100
  arabic_font: ArabicFontFamily;
  border_radius: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  header_style: 'collapsible_hero' | 'classic_bar';
}


