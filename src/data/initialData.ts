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
  MediaItem,
  HomeSlide,
  MarqueeTickerItem,
  HeroHeaderSettings,
  AboutUsModuleData,
  RawajFeature,
  ClientLogo,
  Testimonial,
  PromoModuleSettings,
  GlobalFAQItem,
  FooterSettings,
  HomeModuleConfig,
  ThemeCustomizerSettings,
  ColorPreset,
  ContactFormMessage,
  DesignTask,
  IndustrySector
} from '../types';
import { 
  EXPANDED_DEPARTMENTS, 
  EXPANDED_CATEGORIES, 
  EXPANDED_SERVICES, 
  EXPANDED_PACKAGES 
} from './expandedServicesData';
import { INITIAL_INDUSTRY_SECTORS } from './industrySectorsData';
import { SECTOR_PACKAGES_DATA } from './sectorPackagesData';

export { INITIAL_INDUSTRY_SECTORS };

const BASE_DEPARTMENTS: Department[] = [
  {
    id: 'dept-paper',
    name_ar: 'الطباعة الورقية والتجارية',
    name_en: 'Commercial Paper Printing',
    slug: 'paper-printing',
    icon: 'Printer',
    description_ar: 'مطبوعات الأوفست والرقمية للشركات: فواتير، بروشورات، دفاتر، بطاقات أعمال، تقارير ومجلدات.',
    hero_image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
    sort_order: 1,
  },
  {
    id: 'dept-labels',
    name_ar: 'الملصقات والليبل والستيكر',
    name_en: 'Labels & Stickers',
    slug: 'labels-stickers',
    icon: 'Tags',
    description_ar: 'ملصقات الرول والشيت للمنتجات، العبوات، الأغذية، مستحضرات التجميل، باركود ومقاومة للرطوبة والتجميد.',
    hero_image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    sort_order: 2,
  },
  {
    id: 'dept-packaging',
    name_ar: 'التغليف والعلب والأكياس',
    name_en: 'Packaging & Boxes',
    slug: 'packaging-boxes',
    icon: 'Package',
    description_ar: 'علب الكرتون المطبوعة، كرتون مضلع للشحن، علب الهدايا الفاخرة، أكياس ورقية بمختلف السماكات والتشطيبات.',
    hero_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    sort_order: 3,
  },
  {
    id: 'dept-large-format',
    name_ar: 'الطباعة كبيرة الحجم (Large Format)',
    name_en: 'Large Format Printing',
    slug: 'large-format',
    icon: 'Maximize',
    description_ar: 'بنرات PVC، فلكس إعلاني، استيكر سيارات، أرضيات مانعة للانزلاق، ويندو جرافيكس، وبوسترات معارض.',
    hero_image: '/images/vehicle_branding_wrap_1790811427153.jpg',
    sort_order: 4,
  },
  {
    id: 'dept-signage',
    name_ar: 'اللوحات الإعلانية والإشارات (Signage)',
    name_en: 'Signage & Lettering',
    slug: 'signage',
    icon: 'Tv',
    description_ar: 'حروف بارزة مضيئة (Face-lit / Halo-lit)، لوحات فلكس بوكس، إشارات إرشادية داخلية وخارجية، ولوحات أكريليك.',
    hero_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    sort_order: 5,
  },
  {
    id: 'dept-facades',
    name_ar: 'الواجهات والديكور والكلادينج',
    name_en: 'Facades & Interior Branding',
    slug: 'facades-decoration',
    icon: 'Building2',
    description_ar: 'تكسية واجهات كلادينج ACP، ديكورات المحلات والمعارض، مجسمات جدارية وهوية معمارية متكاملة.',
    hero_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    sort_order: 6,
  },
  {
    id: 'dept-apparel',
    name_ar: 'الطباعة على الملابس والمنسوجات',
    name_en: 'Textile & Apparel Printing',
    slug: 'textile-apparel',
    icon: 'Shirt',
    description_ar: 'طباعة DTF فائق الدقة، DTG، سلك سكرين، سبلميشن، وتجهيز الزي الموحد وتيشيرتات الفعاليات.',
    hero_image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    sort_order: 7,
  },
  {
    id: 'dept-embroidery',
    name_ar: 'التطريز الآلي المباشر والشارات',
    name_en: 'Computerized Embroidery',
    slug: 'embroidery',
    icon: 'Scissors',
    description_ar: 'تطريز شعارات الزي الموحد، الكابات، الجاكيتات، الباتشات والشارات القماشية بخيوط مقاومة للغسيل.',
    hero_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    sort_order: 8,
  },
  {
    id: 'dept-promotions',
    name_ar: 'الهدايا الدعائية والمؤسسية',
    name_en: 'Promotional Gifts',
    slug: 'promotional-gifts',
    icon: 'Gift',
    description_ar: 'أقواب سيراميك وحرارية، فلاشات، نوت بوك جلدي، أقلام، دروع تكريمية، وهدايا المواسم والمؤتمرات.',
    hero_image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    sort_order: 9,
  },
  {
    id: 'dept-uv',
    name_ar: 'الطباعة التخصصية والـ UV المباشر',
    name_en: 'UV & Specialty Printing',
    slug: 'uv-specialty',
    icon: 'Sparkles',
    description_ar: 'طباعة UV مسطحة مباشرة على الخشب، الأكريليك، المعادن، الزجاج، و UV DTF للأسطح المنحنية.',
    hero_image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    sort_order: 10,
  },
  {
    id: 'dept-laser',
    name_ar: 'قص وحفر الليزر والروتر',
    name_en: 'Laser Cutting & Engraving',
    slug: 'laser-engraving',
    icon: 'Flame',
    description_ar: 'قص دقيق للأكريليك والخشب وMDF، حفر الدروع، صناعة ستاندات المنتجات والنماذج الهندسية.',
    hero_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    sort_order: 11,
  },
  {
    id: 'dept-design',
    name_ar: 'التصميم الفني والهوية البصرية',
    name_en: 'Creative Design & Branding',
    slug: 'design-branding',
    icon: 'Palette',
    description_ar: 'تصميم الهوية البصرية الشاملة، ملفات التجهيز الطباعي Prepress، وتصميم العبوات والواجهات ثلاثية الأبعاد.',
    hero_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    sort_order: 12,
  },
];

export const INITIAL_DEPARTMENTS: Department[] = [
  ...BASE_DEPARTMENTS,
  ...EXPANDED_DEPARTMENTS
];

const BASE_CATEGORIES: Category[] = [
  // Paper
  { id: 'cat-ncr', department_id: 'dept-paper', name_ar: 'دفاتر وفواتير كربونية (NCR)', name_en: 'NCR Books & Invoices', slug: 'ncr-books', sort_order: 1 },
  { id: 'cat-stationery', department_id: 'dept-paper', name_ar: 'المطبوعات المكتبية والهوية', name_en: 'Office Stationery', slug: 'office-stationery', sort_order: 2 },
  { id: 'cat-marketing-paper', department_id: 'dept-paper', name_ar: 'المطبوعات الترويجية والبروشورات', name_en: 'Marketing Collateral', slug: 'marketing-paper', sort_order: 3 },
  { id: 'cat-books-pubs', department_id: 'dept-paper', name_ar: 'الكتب والتقارير والكتالوجات', name_en: 'Books & Catalogs', slug: 'books-catalogs', sort_order: 4 },
  
  // Labels
  { id: 'cat-roll-labels', department_id: 'dept-labels', name_ar: 'ملصقات الرول لخطوط الإنتاج', name_en: 'Roll Labels', slug: 'roll-labels', sort_order: 1 },
  { id: 'cat-sheet-labels', department_id: 'dept-labels', name_ar: 'ملصقات شيت ومقطعة Die-Cut', name_en: 'Sheet & Die-Cut Labels', slug: 'sheet-labels', sort_order: 2 },
  
  // Packaging
  { id: 'cat-cartons', department_id: 'dept-packaging', name_ar: 'علب الكرتون الفاخرة والدوائية', name_en: 'Folding Cartons', slug: 'folding-cartons', sort_order: 1 },
  { id: 'cat-corrugated', department_id: 'dept-packaging', name_ar: 'صناديق الشحن والكرتون المضلع', name_en: 'Corrugated Shipping Boxes', slug: 'corrugated-boxes', sort_order: 2 },
  { id: 'cat-paper-bags', department_id: 'dept-packaging', name_ar: 'الأكياس الورقية الفاخرة', name_en: 'Paper Bags', slug: 'paper-bags', sort_order: 3 },
  
  // Large format
  { id: 'cat-outdoor-banners', department_id: 'dept-large-format', name_ar: 'البنرات والفلكس الإعلاني', name_en: 'Banners & Flex', slug: 'banners-flex', sort_order: 1 },
  { id: 'cat-vehicle-graphics', department_id: 'dept-large-format', name_ar: 'تجليد ورسومات المركبات', name_en: 'Vehicle Graphics & Wraps', slug: 'vehicle-wraps', sort_order: 2 },
  { id: 'cat-floor-window', department_id: 'dept-large-format', name_ar: 'جرافيكس النوافذ والأرضيات', name_en: 'Window & Floor Graphics', slug: 'window-floor', sort_order: 3 },
  
  // Signage
  { id: 'cat-channel-letters', department_id: 'dept-signage', name_ar: 'الحروف البارزة المضيئة', name_en: 'Channel Letters', slug: 'channel-letters', sort_order: 1 },
  { id: 'cat-lightboxes', department_id: 'dept-signage', name_ar: 'صناديق الإضاءة واللوحات', name_en: 'Lightboxes', slug: 'lightboxes', sort_order: 2 },
  { id: 'cat-wayfinding', department_id: 'dept-signage', name_ar: 'اللوحات الإرشادية والمكتبية', name_en: 'Wayfinding & Door Signs', slug: 'wayfinding', sort_order: 3 },

  // Facades & Decor
  { id: 'cat-acp-facades', department_id: 'dept-facades', name_ar: 'واجهات الكلادينج ACP', name_en: 'ACP Facades', slug: 'acp-facades', sort_order: 1 },
  { id: 'cat-interior-branding', department_id: 'dept-facades', name_ar: 'ديكور الاستقبال والجدران', name_en: 'Reception & Wall Branding', slug: 'reception-branding', sort_order: 2 },

  // Apparel
  { id: 'cat-tshirts-uniforms', department_id: 'dept-apparel', name_ar: 'تيشيرتات وبولو وزي العمل', name_en: 'T-Shirts & Workwear', slug: 'tshirts-workwear', sort_order: 1 },
  
  // Promotions
  { id: 'cat-drinkware', department_id: 'dept-promotions', name_ar: 'الأكواب والمطارات الحرارية', name_en: 'Drinkware & Mugs', slug: 'mugs-drinkware', sort_order: 1 },
  { id: 'cat-office-gifts', department_id: 'dept-promotions', name_ar: 'مجموعات الهدايا والأقلام', name_en: 'Office Gifts & Sets', slug: 'office-gifts', sort_order: 2 },

  // Laser
  { id: 'cat-acrylic-laser', department_id: 'dept-laser', name_ar: 'قص وحفر الأكريليك والدروع', name_en: 'Acrylic & Awards', slug: 'acrylic-awards', sort_order: 1 },
];

export const INITIAL_CATEGORIES: Category[] = [
  ...BASE_CATEGORIES,
  ...EXPANDED_CATEGORIES
];

export const INITIAL_TEMPLATES: ServiceTemplate[] = [
  // 1. NCR Template
  {
    id: 'tmpl-ncr',
    name_ar: 'قالب الفواتير والدفاتر الكربونية (NCR)',
    name_en: 'NCR Carbonless Forms Template',
    code: 'NCR_STANDARD',
    description_ar: 'مواصفات الفواتير، السندات، وأذون الصرف والتسليم مع أوراق الكربون الكيميائي والترقيم والتخريم.',
    department_id: 'dept-paper',
    specification_groups: [
      {
        id: 'grp-size',
        title_ar: 'المقاس والكمية',
        sort_order: 1,
        fields: [
          {
            id: 'ncr-size',
            key: 'size',
            label_ar: 'مقاس الدفتر / النموذج',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'a4', label_ar: 'A4 (21 × 29.7 سم) - المقاس القياسي', value: 'A4' },
              { id: 'a5', label_ar: 'A5 (14.8 × 21 سم) - سندات وفواتير مدمجة', value: 'A5' },
              { id: 'a6', label_ar: 'A6 (10.5 × 14.8 سم) - إيصالات صغيرة', value: 'A6' },
              { id: 'custom', label_ar: 'مقاس خاص مخصص', value: 'custom' },
            ],
          },
          {
            id: 'ncr-parts',
            key: 'parts_count',
            label_ar: 'عدد أجزاء النسخة (الأوراق لكل معاملة)',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: '2part', label_ar: 'نسختان (أصل + صورة / CB + CF)', value: '2_parts' },
              { id: '3part', label_ar: '3 نسخ (أصل + نسختان / CB + CFB + CF)', value: '3_parts', is_default: true },
              { id: '4part', label_ar: '4 نسخ (أصل + 3 نسخ)', value: '4_parts' },
              { id: '5part', label_ar: '5 نسخ (أصل + 4 نسخ للمؤسسات الكبرى)', value: '5_parts' },
            ],
          },
          {
            id: 'ncr-sets-per-book',
            key: 'sets_per_book',
            label_ar: 'عدد المجموعات في كل دفتر',
            type: 'select',
            required: true,
            sort_order: 3,
            options: [
              { id: '50sets', label_ar: '50 طقم (الدفتر الشائع)', value: '50' },
              { id: '100sets', label_ar: '100 طقم (للدفاتر المجلدّة السميكة)', value: '100' },
              { id: 'loose_sets', label_ar: 'أطقم مفردة ملصوقة بدون تجميع في دفتر (Loose Sets)', value: 'loose' },
            ],
          },
        ],
      },
      {
        id: 'grp-paper-colors',
        title_ar: 'ترتيب ألوان النسخ والطباعة',
        sort_order: 2,
        fields: [
          {
            id: 'ncr-color-seq',
            key: 'color_sequence',
            label_ar: 'ترتيب ألوان الورق الكربوني',
            type: 'select',
            required: true,
            sort_order: 1,
            allow_rawaj_recommendation: true,
            options: [
              { id: 'w_y_p', label_ar: 'أبيض (أصل) ثم أصفر ثم وردي (الأكثر شيوعاً)', value: 'white_yellow_pink' },
              { id: 'w_y_b', label_ar: 'أبيض ثم أصفر ثم أزرق', value: 'white_yellow_blue' },
              { id: 'w_p_g', label_ar: 'أبيض ثم وردي ثم أخضر', value: 'white_pink_green' },
              { id: 'custom_seq', label_ar: 'ترتيب ألوان مخصص حسب طلب المنشأة', value: 'custom' },
            ],
          },
          {
            id: 'ncr-print-colors',
            key: 'print_colors',
            label_ar: 'ألوان حبر الطباعة على الورق',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: '1color', label_ar: 'لون واحد (أسود أو كحلي أو كستنائي)', value: '1_color' },
              { id: '2color', label_ar: 'لونان (شعار ملون + نصوص بلون كحلي/أسود)', value: '2_colors' },
              { id: '4color', label_ar: 'طباعة ملونة بالكامل (Full Color CMYK)', value: 'cmyk' },
            ],
          },
        ],
      },
      {
        id: 'grp-finishing',
        title_ar: 'الترقيم، التخريم، والغلاف',
        sort_order: 3,
        fields: [
          {
            id: 'ncr-numbering',
            key: 'numbering_enabled',
            label_ar: 'ترقيم تسلسلي إلكتروني (Sequential Numbering)',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'yes_red', label_ar: 'نعم - ترقيم باللون الأحمر البارز', value: 'yes_red' },
              { id: 'yes_black', label_ar: 'نعم - ترقيم باللون الأسود', value: 'yes_black' },
              { id: 'no', label_ar: 'بدون ترقيم تسلسلي', value: 'none' },
            ],
          },
          {
            id: 'ncr-start-num',
            key: 'start_number',
            label_ar: 'رقم بداية التسلسل (إن وجد)',
            type: 'text',
            required: false,
            placeholder_ar: 'مثال: 001001 أو ابدأ من 0001',
            sort_order: 2,
            visibility_condition: {
              field_id: 'ncr-numbering',
              operator: 'not_equals',
              value: 'none',
            },
          },
          {
            id: 'ncr-perforation',
            key: 'perforation',
            label_ar: 'تخريم التمزيق السهل (Perforation)',
            type: 'select',
            required: true,
            sort_order: 3,
            options: [
              { id: 'perf_top', label_ar: 'تخريم تمزيق في الأعلى (للأصل فقط أو النسخ المطلوبة)', value: 'perforated_top' },
              { id: 'perf_side', label_ar: 'تخريم تمزيق جانبي', value: 'perforated_side' },
              { id: 'no_perf', label_ar: 'لصق بلوك بدون تمزيق (Pad)', value: 'pad_no_perf' },
            ],
          },
          {
            id: 'ncr-wrap-cover',
            key: 'wrap_cover',
            label_ar: 'الغلاف الكرتوني العازل (Wrap-around shield cover)',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 4,
            options: [
              { id: 'wrap_in', label_ar: 'كرتون خلفي سميك مع لسان عازل للكتابة (موصى به لحماية النسخ التالية)', value: 'wrap_around' },
              { id: 'standard_cover', label_ar: 'غلاف دوبلكس مقوى أمامي وخلفي عادي', value: 'standard_cover' },
            ],
          },
        ],
      },
    ],
  },

  // 2. Business Card Template
  {
    id: 'tmpl-bizcard',
    name_ar: 'قالب بطاقات الأعمال والكروت الشخصية',
    name_en: 'Business Card Template',
    code: 'BIZCARD_STANDARD',
    description_ar: 'مواصفات بطاقات الأعمال التنفيذية الفاخرة مع أنواع الورق المقوى والسلفنة والتشطيبات الخاصة.',
    department_id: 'dept-paper',
    specification_groups: [
      {
        id: 'grp-card-specs',
        title_ar: 'الخامة والمقاس',
        sort_order: 1,
        fields: [
          {
            id: 'card-size',
            key: 'card_size',
            label_ar: 'مقاس البطاقة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'std9x5', label_ar: '9.0 × 5.0 سم (المقاس القياسي للشركات)', value: '9x5' },
              { id: 'eu85x55', label_ar: '8.5 × 5.5 سم (المقاس الأوروبي / مقاس البطاقة البنكية)', value: '8.5x5.5' },
              { id: 'sq6x6', label_ar: 'مربع 6 × 6 سم (مودرن للتصاميم الإبداعية)', value: '6x6' },
            ],
          },
          {
            id: 'card-paper',
            key: 'paper_stock',
            label_ar: 'نوع الورق والجراماج',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'c350', label_ar: 'كوشيه مقوى 350 جرام فاخر (صلابة عالية للمؤسسات)', value: 'artboard_350' },
              { id: 'c300', label_ar: 'كوشيه أبيض ناصع 300 جرام', value: 'artboard_300' },
              { id: 'textured', label_ar: 'ورق فابريانو / قماشي مبرغل راقي (Textured Luxury)', value: 'textured_fine' },
              { id: 'kraft', label_ar: 'ورق كرافت طبيعي بيئي 300 جرام', value: 'kraft_300' },
              { id: 'plastic_pvc', label_ar: 'بلاستيك PVC صلب مقاوم للماء والتمزق', value: 'pvc_card' },
            ],
          },
          {
            id: 'card-sides',
            key: 'sides',
            label_ar: 'أوجه الطباعة',
            type: 'select',
            required: true,
            sort_order: 3,
            options: [
              { id: 'double', label_ar: 'طباعة وجهين (عربي + إنجليزي أو تفاصيل كاملة)', value: 'double_sided' },
              { id: 'single', label_ar: 'طباعة وجه واحد فقط', value: 'single_sided' },
            ],
          },
        ],
      },
      {
        id: 'grp-card-finishing',
        title_ar: 'السلفنة والتشطيبات الفاخرة (Finishing)',
        sort_order: 2,
        fields: [
          {
            id: 'card-lamination',
            key: 'lamination',
            label_ar: 'نوع السلفنة (طبقة الحماية)',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 1,
            options: [
              { id: 'matt', label_ar: 'سلفنة مطفية راقية (Matt Lamination) - موصى به', value: 'matt' },
              { id: 'soft_touch', label_ar: 'سوفت تاتش مخملي فاخر (Velvet Soft Touch)', value: 'soft_touch' },
              { id: 'gloss', label_ar: 'سلفنة لامعة براقة (Gloss)', value: 'gloss' },
              { id: 'none', label_ar: 'بدون سلفنة (للأوراق المبرغلة الطبيعية)', value: 'none' },
            ],
          },
          {
            id: 'card-effects',
            key: 'special_effects',
            label_ar: 'التأثيرات الفاخرة الخاصة',
            type: 'multi_select',
            required: false,
            sort_order: 2,
            options: [
              { id: 'spot_uv', label_ar: 'يو في بارز ملموس على الشعار (Raised Spot UV)', value: 'spot_uv' },
              { id: 'gold_foil', label_ar: 'بصمة ذهبية حرارية لامعة (Gold Foil Stamping)', value: 'gold_foil' },
              { id: 'silver_foil', label_ar: 'بصمة فضية معدنية (Silver Foil)', value: 'silver_foil' },
              { id: 'emboss', label_ar: 'بروز ميكانيكي للشعار (Embossing)', value: 'emboss' },
              { id: 'rounded_corners', label_ar: 'حواف مستديرة ناعمة (Rounded Corners)', value: 'rounded_corners' },
            ],
          },
        ],
      },
    ],
  },

  // 3. Roll Label Template
  {
    id: 'tmpl-roll-label',
    name_ar: 'قالب ملصقات الرول لخطوط الإنتاج والعبوات',
    name_en: 'Roll Labels Template',
    code: 'ROLL_LABEL_STANDARD',
    description_ar: 'ملصقات الرول الدقيقة لماكينات اللصق الآلي واليدوي، عبوات الزيوت والعطور والأغذية المقاومة للماء.',
    department_id: 'dept-labels',
    specification_groups: [
      {
        id: 'grp-label-env',
        title_ar: 'بيئة استخدام الليبل وسطح العبوة',
        sort_order: 1,
        fields: [
          {
            id: 'lbl-application-surface',
            key: 'surface_material',
            label_ar: 'مادة سطح العبوة المراد اللصق عليها',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'plastic_pet', label_ar: 'بلاستيك PET / HDPE ناعم أو مرن', value: 'plastic' },
              { id: 'glass', label_ar: 'زجاج شفاف أو ملون', value: 'glass' },
              { id: 'carton', label_ar: 'كرتون أو ورق شحن', value: 'carton' },
              { id: 'metal', label_ar: 'معدن أو ألومنيوم', value: 'metal' },
            ],
          },
          {
            id: 'lbl-condition',
            key: 'operating_condition',
            label_ar: 'ظروف التخزين والتعرض',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'room_temp', label_ar: 'حرارة الغرفة العادية (متاجر ورفوف جافة)', value: 'ambient' },
              { id: 'freezer', label_ar: 'تجميد وتبريد عالي (مقاوم للرطوبة وتكثف الماء)', value: 'freezer_waterproof' },
              { id: 'oils_chemicals', label_ar: 'مقاوم للزيوت والكيماويات ومستحضرات التجميل', value: 'chemical_oil_resistant' },
              { id: 'outdoor', label_ar: 'أشعة شمس وأمطار خارجية', value: 'outdoor_uv' },
            ],
          },
        ],
      },
      {
        id: 'grp-label-material',
        title_ar: 'الخامة والغراء والتشطيب',
        sort_order: 2,
        fields: [
          {
            id: 'lbl-facestock',
            key: 'facestock',
            label_ar: 'خامة وجه الملصق (Facestock)',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 1,
            options: [
              { id: 'bopp_white', label_ar: 'بولي بروبيلين أبيض (White BOPP Plastic) - الأكثر ثباتاً ومقاومة للتمزق والماء', value: 'bopp_white' },
              { id: 'bopp_clear', label_ar: 'بولي بروبيلين شفاف كريستالي (Clear BOPP) مع حبر أبيض تحتي', value: 'bopp_clear' },
              { id: 'bopp_silver', label_ar: 'معدني فضي عاكس (Metallic Silver BOPP)', value: 'bopp_silver' },
              { id: 'semi_gloss_paper', label_ar: 'ورق سيمي كوشيه (Semi-Gloss Paper) - اقتصادي للمنتجات الجافة', value: 'semi_gloss_paper' },
              { id: 'kraft_paper', label_ar: 'ورق كرافت بيئي للمنتجات العضوية والقهوة', value: 'kraft' },
            ],
          },
          {
            id: 'lbl-unwind',
            key: 'unwind_direction',
            label_ar: 'اتجاه خروج الرول لماكينات التعبئة (Unwind Direction)',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 2,
            options: [
              { id: 'top_first', label_ar: 'أعلى الملصق أولاً (Head First / Direction 1)', value: 'head_first' },
              { id: 'bottom_first', label_ar: 'أسفل الملصق أولاً (Foot First / Direction 2)', value: 'foot_first' },
              { id: 'right_first', label_ar: 'الجانب الأيمن أولاً (Right Edge First / Direction 3)', value: 'right_first' },
              { id: 'left_first', label_ar: 'الجانب الأيسر أولاً (Left Edge First / Direction 4)', value: 'left_first' },
              { id: 'manual_apply', label_ar: 'تطبيق ولصق يدوي (لا يهم الاتجاه الميكانيكي)', value: 'manual' },
            ],
          },
          {
            id: 'lbl-core-size',
            key: 'core_size',
            label_ar: 'قطر قلب الرول الكرتوني (Core Size)',
            type: 'select',
            required: true,
            sort_order: 3,
            options: [
              { id: 'core_76', label_ar: '3 بوصة (76 ملم) - المعيار القياسي لخطوط الإنتاج والماكينات الآلية', value: '76mm_3inch' },
              { id: 'core_40', label_ar: '1.5 بوصة (40 ملم) - لماكينات الباركود والموزعات اليدوية', value: '40mm_1.5inch' },
              { id: 'core_25', label_ar: '1 بوصة (25 ملم) - للملصقات الصغيرة المكتبية', value: '25mm_1inch' },
            ],
          },
        ],
      },
    ],
  },

  // 4. Vehicle Wrap Template
  {
    id: 'tmpl-vehicle-wrap',
    name_ar: 'قالب تجليد واستيكرات السيارات والمركبات',
    name_en: 'Vehicle Wrap & Graphics Template',
    code: 'VEHICLE_WRAP_STANDARD',
    description_ar: 'مواصفات تغليف وتجليد سيارات التوزيع، الباصات، والشاحنات بأفلام كاست وبوليمريك مع طبقات الحماية من الخدوش والأشعة فوق البنفسجية.',
    department_id: 'dept-large-format',
    specification_groups: [
      {
        id: 'grp-vehicle-type',
        title_ar: 'نوع وحجم المركبة والتغطية',
        sort_order: 1,
        fields: [
          {
            id: 'veh-category',
            key: 'vehicle_category',
            label_ar: 'فئة المركبة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'sedan', label_ar: 'سيارة صالون / سيدان صغيرة أو متوسطة', value: 'sedan' },
              { id: 'suv_pickup', label_ar: 'سيارة جيب SUV أو بيك أب (شاص / غمارة / غمارتين)', value: 'pickup_suv' },
              { id: 'van_delivery', label_ar: 'باص نقل / فان بضائع وتوزيع (هايس / دباب)', value: 'delivery_van' },
              { id: 'box_truck', label_ar: 'دينا شاحنة صندوق مسطح (Box Truck / Dyna)', value: 'box_truck' },
              { id: 'trailer', label_ar: 'قاطرة / مقطورة شحن عملاقة (Trailer)', value: 'trailer' },
            ],
          },
          {
            id: 'veh-coverage',
            key: 'coverage_area',
            label_ar: 'مستوى ونسبة التغطية',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'full_wrap', label_ar: 'تغليف كامل لكامل جسم المركبة (Full Wrap)', value: 'full_wrap' },
              { id: 'partial_wrap', label_ar: 'تغليف جزئي 50% - 70% (الأبواب والخلفية)', value: 'partial_wrap' },
              { id: 'doors_logo', label_ar: 'شعارات ومعلومات اتصال على الأبواب الأمامية فقط', value: 'doors_only' },
              { id: 'rear_window', label_ar: 'الزجاج الخلفي فقط بنظام شبكي مخرم One-Way Vision', value: 'rear_window_only' },
            ],
          },
        ],
      },
      {
        id: 'grp-vinyl-tech',
        title_ar: 'الخامة الفنية وطبقة الحماية (Overlaminate)',
        sort_order: 2,
        fields: [
          {
            id: 'veh-vinyl-grade',
            key: 'vinyl_grade',
            label_ar: 'درجة فيلم الفينيل اللاصق وتقنية القنوات الهوائية',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 1,
            options: [
              { id: 'cast_air_release', label_ar: 'فينيل كاست عالي التمدد مع قنوات طرد الهواء (Cast Wrap + Air Release) - للانحناءات المعقدة وعمر 5-7 سنوات', value: 'cast_premium' },
              { id: 'polymeric', label_ar: 'فينيل بوليمريك عالي الجودة (Polymeric) - للأسطح شبه المسطحة وعمر 3-4 سنوات', value: 'polymeric' },
              { id: 'monomeric_short', label_ar: 'فينيل اقتصادي للحملات الترويجية المؤقتة (Monomeric Promotional)', value: 'monomeric' },
            ],
          },
          {
            id: 'veh-overlaminate',
            key: 'overlaminate_type',
            label_ar: 'طبقة السلفنة والحماية الشفافة الفوقية (UV & Scratch Overlaminate)',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'gloss_cast_lam', label_ar: 'سلفنة كاست لامعة مطابقة مضادة للأشعة فوق البنفسجية ومقاومة للغسيل والخدوش', value: 'gloss_cast' },
              { id: 'matt_cast_lam', label_ar: 'سلفنة كاست مطفية مانعة للانعكاس الفاقع', value: 'matt_cast' },
            ],
          },
          {
            id: 'veh-installation',
            key: 'installation_service',
            label_ar: 'خدمة التركيب الفني',
            type: 'select',
            required: true,
            sort_order: 3,
            options: [
              { id: 'rawaj_team', label_ar: 'شامل التركيب الفني المحترف بواسطة فريق رواج المتخصص', value: 'with_installation' },
              { id: 'supply_only', label_ar: 'طباعة وتجهيز وتوريد الرولات فقط بدون تركيب', value: 'supply_only' },
            ],
          },
        ],
      },
    ],
  },

  // 5. Channel Letters Signage Template
  {
    id: 'tmpl-channel-letters',
    name_ar: 'قالب الحروف البارزة واللوحات المضيئة',
    name_en: 'Channel Letters & Dimensional Signs Template',
    code: 'CHANNEL_LETTERS_STANDARD',
    description_ar: 'مواصفات الحروف البارزة المضيئة للواجهات والمحلات (أكريليك، زنكور، ستانلس ستيل، إضاءة أمامية وخلفية).',
    department_id: 'dept-signage',
    specification_groups: [
      {
        id: 'grp-letter-lighting',
        title_ar: 'نوع وميكانيكية الإضاءة',
        sort_order: 1,
        fields: [
          {
            id: 'sgn-lighting-style',
            key: 'lighting_style',
            label_ar: 'نمط الإضاءة للحروف',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'face_lit', label_ar: 'إضاءة أمامية كاملة من وجه الحرف (Face-Lit Acrylic)', value: 'face_lit' },
              { id: 'halo_lit', label_ar: 'إضاءة خلفية هالة ساحرة على الجدار (Halo-Lit / Backlit)', value: 'halo_lit' },
              { id: 'face_halo', label_ar: 'إضاءة مزدوجة (أمامية + هالة خلفية Face & Halo)', value: 'face_and_halo' },
              { id: 'non_lit', label_ar: 'حروف بارزة بدون إضاءة داخلية (Dimensional Solid)', value: 'non_lit' },
            ],
          },
          {
            id: 'sgn-led-temp',
            key: 'led_color_temp',
            label_ar: 'درجة لون إضاءة الـ LED (High Efficiency Modules IP67)',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 2,
            options: [
              { id: 'led_6500k', label_ar: 'أبيض ثلجي ناصع (6500K Pure White)', value: '6500k_white' },
              { id: 'led_3000k', label_ar: 'أصفر وورم دافئ (3000K Warm White)', value: '3000k_warm' },
              { id: 'led_rgb', label_ar: 'ألوان متغيرة ديناميكية RGB مع ريموت كنترول', value: 'rgb_dynamic' },
              { id: 'led_custom', label_ar: 'لون حبري محدد (أحمر، أزرق، أخضر)', value: 'custom_color' },
            ],
          },
        ],
      },
      {
        id: 'grp-letter-material',
        title_ar: 'خامة جوانب الحرف (الشناكل) والوجه',
        sort_order: 2,
        fields: [
          {
            id: 'sgn-returns-material',
            key: 'returns_material',
            label_ar: 'مادة جوانب الحرف وسماكتها',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'stainless_gold', label_ar: 'ستانلس ستيل ذهبي مرآة عاكس أو مطفي (Stainless Gold)', value: 'stainless_gold' },
              { id: 'stainless_silver', label_ar: 'ستانلس ستيل فضي براق أو مصنفر', value: 'stainless_silver' },
              { id: 'aluminum_powder', label_ar: 'ألومنيوم مدهون فرن حراري بالألوان المعتمدة للهوية', value: 'powder_coated_aluminum' },
              { id: 'acrylic_solid', label_ar: 'أكريليك مصبوب كامل 3D (All-Acrylic)', value: 'acrylic_returns' },
              { id: 'zinco', label_ar: 'زنكور مجلفن مع دهان دوكو سيارات مقاوم للرطوبة والشمس', value: 'zinco_steel' },
            ],
          },
          {
            id: 'sgn-depth',
            key: 'letter_depth',
            label_ar: 'عمق وبروز الحرف عن الجدار',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'depth_6cm', label_ar: '6 سم (بروز لطيف وعصري)', value: '6cm' },
              { id: 'depth_8cm', label_ar: '8 سم (العمق المعياري الأمثل لتوزيع الإضاءة)', value: '8cm' },
              { id: 'depth_10cm', label_ar: '10 إلى 12 سم (للواجهات المرتفعة الكبيرة)', value: '10-12cm' },
            ],
          },
        ],
      },
    ],
  },

  // 6. Folding Carton Packaging Template
  {
    id: 'tmpl-folding-box',
    name_ar: 'قالب علب الكرتون وتغليف المنتجات (Folding Cartons)',
    name_en: 'Folding Cartons & Packaging Template',
    code: 'FOLDING_BOX_STANDARD',
    description_ar: 'مواصفات علب مستحضرات التجميل، العطور، الأدوية، والأغذية، مع هياكل الطي FEFCO والتشطيبات اللامعة.',
    department_id: 'dept-packaging',
    specification_groups: [
      {
        id: 'grp-box-structure',
        title_ar: 'هيكل ونمط إغلاق العلبة',
        sort_order: 1,
        fields: [
          {
            id: 'box-style',
            key: 'box_structure_style',
            label_ar: 'نمط تركيب وطي العلبة (FEFCO / Standard Styles)',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'ste', label_ar: 'إغلاق طرفي مستقيم (Straight Tuck End - STE) - الأكثر استخداماً لمستحضرات التجميل', value: 'straight_tuck_end' },
              { id: 'rte', label_ar: 'إغلاق طرفي متعاكس (Reverse Tuck End - RTE)', value: 'reverse_tuck_end' },
              { id: 'auto_bottom', label_ar: 'قاعدة قفل أوتوماتيكي سريع وسفلي متين (Crash Lock / Auto-Bottom) - للأوزان المتوسطة', value: 'auto_bottom' },
              { id: 'snap_lock', label_ar: 'قاعدة ألسنة متداخلة متينة 1-2-3 (Snap Lock Bottom)', value: 'snap_lock' },
              { id: 'sleeve', label_ar: 'سليف انزلاقي خارجي (Packaging Sleeve / Drawer Box)', value: 'sleeve' },
              { id: 'pillow_box', label_ar: 'علبة وسادة هدايا منحنية (Pillow Box)', value: 'pillow_box' },
            ],
          },
          {
            id: 'box-board-type',
            key: 'paperboard_type',
            label_ar: 'نوع الكرتون وسماكته (Caliper & Material)',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 2,
            options: [
              { id: 'sbb_virgin', label_ar: 'كرتون أبيض عاجي فاخر مقوى FBB / SBS (300-350 GSM) - ملمس ناصع ومقاوم للكسر عند الطي', value: 'sbs_virgin_board' },
              { id: 'duplex_grey', label_ar: 'كرتون دوبلكس ظهر رمادي اقتصادي (Duplex Grey Back 350 GSM)', value: 'duplex_grey_back' },
              { id: 'duplex_white', label_ar: 'كرتون دوبلكس ظهر أبيض (Duplex White Back 350 GSM)', value: 'duplex_white_back' },
              { id: 'kraft_folding', label_ar: 'كرتون كرافت بني طبيعي صديق للبيئة (Unbleached Kraft Board)', value: 'kraft_folding_board' },
            ],
          },
        ],
      },
      {
        id: 'grp-box-finishing',
        title_ar: 'التشطيب والنافذة الشفافة واليو في',
        sort_order: 2,
        fields: [
          {
            id: 'box-window',
            key: 'window_patching',
            label_ar: 'نافذة بلاستيكية شفافة لعرض المنتج (Window Patching)',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'no_window', label_ar: 'علبة مغلقة بالكامل بدون نافذة', value: 'no' },
              { id: 'pet_window', label_ar: 'نافذة شفافة بقص مخصص مغطاة بغشاء PET شفاف عالي النقاء', value: 'yes_pet_window' },
            ],
          },
          {
            id: 'box-luxury-embellish',
            key: 'embellishments',
            label_ar: 'تأثيرات الفخامة والتمييز البصري',
            type: 'multi_select',
            required: false,
            sort_order: 2,
            options: [
              { id: 'spot_uv', label_ar: 'ورنيش موضعي بارز Spot UV لامع على الشعار والمكونات', value: 'spot_uv' },
              { id: 'gold_foil', label_ar: 'بصمة ذهبية معدنية حرارية (Hot Gold Stamping)', value: 'gold_foil' },
              { id: 'silver_foil', label_ar: 'بصمة فضية معدنية (Hot Silver Stamping)', value: 'silver_foil' },
              { id: 'emboss_logo', label_ar: 'حفر ونفر بارز للشعار (Embossing / Debossing)', value: 'emboss' },
            ],
          },
        ],
      },
    ],
  },
];

const BASE_SERVICES: Service[] = [
  // 1. Invoices & NCR
  {
    id: 'srv-ncr-invoices',
    name_ar: 'دفاتر وسندات فواتير كربونية NCR فاخرة',
    name_en: 'Premium Carbonless NCR Invoice Books',
    slug: 'ncr-carbonless-invoices',
    department_id: 'dept-paper',
    category_id: 'cat-ncr',
    short_description_ar: 'دفاتر فواتير وسندات صرف وقبض بأوراق كربون كيميائي عالي الحساسية مع ترقيم دقيق وتخريم ناعم.',
    full_description_ar: 'نوفر في رواج أعلى معايير طباعة الفواتير والمحررات الرسمية باستخدام ورق الكربون الكيميائي الأصلي (NCR) غير السام الذي يضمن نقل الخط بوضوح تام إلى كافة النسخ بدون الحاجة لورق كربون يدوي وسيط. ندعم الترقيم التسلسلي الآلي بأحبار بارزة، والتخريم الدقيق مع كرتون عازل للحماية.',
    hero_image: '/images/printing_brochures_1790806872644.jpg',
    gallery: [
      '/images/printing_brochures_1790806872644.jpg',
      '/images/business_cards_luxury_1790811416020.jpg',
    ],
    badge: 'الأكثر طلباً للشركات',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    most_requested: true,
    sort_order: 1,
    seo_title: 'طباعة دفاتر فواتير وسندات كربونية NCR في صنعاء واليمن | رواج',
    seo_description: 'طلب عرض سعر فوري لطباعة دفاتر الفواتير وسندات القبض والصرف الكربونية NCR بأفضل جودة وترقيم دقيق مع رواج للطباعة.',
    template_id: 'tmpl-ncr',
    specification_groups: INITIAL_TEMPLATES[0].specification_groups,
    highlights: [
      { id: 'h1', title_ar: 'كربون كيميائي فائق الحساسية', description_ar: 'نقل خطوط الأقلام بدقة متناهية لكافة النسخ السفلية دون بهتان.' },
      { id: 'h2', title_ar: 'ترقيم تسلسلي دقيق', description_ar: 'طباعة أرقام تسلسلية مؤمنة ميكانيكياً تمنع التكرار وتسهل التدقيق المالي.' },
      { id: 'h3', title_ar: 'تخريم وتجليد احترافي', description_ar: 'تخريم تمزيق سهل دون تلف كعب الدفتر مع غلاف دوبلكس حامي.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هو الحد الأدنى للطلب (MOQ) في دفاتر الفواتير؟', answer_ar: 'نلبي الطلبات ابتداءً من 10 دفاتر وصولاً إلى آلاف الدفاتر للشركات وسلاسل المتاجر الكبرى مع مراعاة سرعة التسليم.' },
      { id: 'f2', question_ar: 'هل يمكن طلب غلاف كرتوني مدمج يعزل بين الأطقم؟', answer_ar: 'نعم، نوفر غلاف Wrap-around shield مدمج يدخل تحت الطقم أثناء الكتابة لحماية باقي الدفتر من انتقال الحبر.' },
    ],
    prepress_rules: {
      color_mode: 'CMYK',
      recommended_dpi: 300,
      bleed_mm: 3,
      safety_margin_mm: 5,
      accepted_formats: ['PDF Vector', 'AI', 'EPS', 'TIFF'],
      notes_ar: 'يرجى ترك مسافة 15 مم من جهة الكعب للتخريم والتجليد دون نصوص حيوية.',
    },
    related_service_ids: ['srv-bizcards-luxury', 'srv-folding-cartons'],
    related_package_ids: ['pkg-store-launch', 'pkg-corp-identity'],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 2. Business Cards
  {
    id: 'srv-bizcards-luxury',
    name_ar: 'بطاقات أعمال فاخرة (Business Cards) مع تشطيبات خاصة',
    name_en: 'Executive Business Cards with Spot UV & Foiling',
    slug: 'executive-business-cards',
    department_id: 'dept-paper',
    category_id: 'cat-stationery',
    short_description_ar: 'كروت شخصية ومؤسسية على أوراق مقواة 350 جم وسوفت تاتش مع بصمة ذهبية و Spot UV بارز.',
    full_description_ar: 'بطاقة الأعمال هي السفير الأول لهويتك في الاجتماعات واللقاءات الرسمية. نقدم في رواج خيارات متطورة من الورق الكوشيه المقوى 350 جرام، الأوراق المبرغلة الإيطالية الفاخرة، مع تقنيات السلفنة المخملية (Soft Touch) والورنيش البارز الملموس والبصمة المعدنية الحرارية.',
    hero_image: '/images/business_cards_showcase_1790822543850.jpg',
    gallery: [
      '/images/business_cards_showcase_1790822543850.jpg',
      '/images/business_cards_luxury_1790811416020.jpg',
    ],
    badge: 'هوية تنفيذية راقية',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    most_requested: true,
    sort_order: 2,
    seo_title: 'طباعة كروت شخصية وبطاقات أعمال فاخرة باليمن | رواج للطباعة',
    seo_description: 'احصل على أرقى بطاقات الأعمال للشركات والمدراء التنفيذيين مع بصمة ذهبية وسلفنة سوفت تاتش ويو في بارز لدى رواج.',
    template_id: 'tmpl-bizcard',
    specification_groups: INITIAL_TEMPLATES[1].specification_groups,
    highlights: [
      { id: 'h1', title_ar: 'قص ليزري وزوايا مستديرة ناعمة', description_ar: 'دقة قطع متناهية بالحواف دون أي زوائد أو تشوه لوني.' },
      { id: 'h2', title_ar: 'سلفنة سوفت تاتش مخملية', description_ar: 'ملمس فائق النعومة يمنح إحساساً بالفخامة والتميز الفوري.' },
      { id: 'h3', title_ar: 'تأثيرات Raised Spot UV', description_ar: 'بروز ملموس لماع على الشعار يعكس الاحترافية العالية.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن طباعة كميات متعددة لعدة موظفين بنفس المواصفات؟', answer_ar: 'نعم، يمكن توزيع الكمية الإجمالية على عدة أسماء وتصاميم مع توحيد خيارات التشطيب.' },
    ],
    prepress_rules: {
      color_mode: 'CMYK',
      recommended_dpi: 300,
      bleed_mm: 2,
      safety_margin_mm: 3,
      accepted_formats: ['PDF', 'AI', 'PSD'],
      notes_ar: 'يرجى تزويد طبقة الـ Spot UV والـ Foil في ملف منفصل (100% K Black vector).',
    },
    related_service_ids: ['srv-ncr-invoices', 'srv-channel-letters'],
    related_package_ids: ['pkg-corp-identity', 'pkg-store-launch'],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 3. Roll Labels
  {
    id: 'srv-roll-labels',
    name_ar: 'ملصقات الرول لخطوط الإنتاج والعبوات (BOPP مقاوم للماء)',
    name_en: 'Custom Roll Labels for Automated Packaging & Bottles',
    slug: 'custom-roll-labels',
    department_id: 'dept-labels',
    category_id: 'cat-roll-labels',
    short_description_ar: 'ليبل رول عالي الدقة لماكينات اللصق الآلي والعبوات الزجاجية والبلاستيكية ومقاوم للزيوت والتجميد.',
    full_description_ar: 'حلول متقدمة لملصقات المنتجات الصناعية، المياه، العصائر، العسل، الزيوت، الأغذية، ومستحضرات التجميل. ننتج ملصقات الرول بخامات BOPP الأبيض والشفاف والمعدني وخامات الورق عالي الجودة مع توافق دقيق لقطر الكور واتجاه خروج الرول لماكينات التعبئة والتغليف.',
    hero_image: '/images/roll_labels_packaging_1790811451461.jpg',
    gallery: [
      '/images/roll_labels_packaging_1790811451461.jpg',
      '/images/luxury_packaging_1790806882434.jpg',
    ],
    badge: 'مطابق للمعايير الصناعية',
    service_status: 'published',
    execution_model: 'mixed',
    featured: true,
    most_requested: true,
    sort_order: 3,
    seo_title: 'طباعة ملصقات وليبل رول للعبوات والمنتجات | رواج',
    seo_description: 'توريد وطباعة ملصقات رول للعبوات والزجاجات وخطوط الإنتاج الآلية مقاومة للرطوبة والتجميد بأعلى دقة.',
    template_id: 'tmpl-roll-label',
    specification_groups: INITIAL_TEMPLATES[2].specification_groups,
    highlights: [
      { id: 'h1', title_ar: 'مقاومة تامة للمياه والرطوبة والزيوت', description_ar: 'خامات بولي بروبيلين BOPP مع غراء دائم عالي الالتصاق.' },
      { id: 'h2', title_ar: 'جاهزية ماكينات اللصق الآلية', description_ar: 'تخصيص كامل لقطر الكور والمسافات البينية واتجاه الدوران.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن طباعة حبر أبيض على الليبل الشفاف أو الفضي؟', answer_ar: 'نعم، ندعم طباعة الحبر الأبيض التحتي (White Underprint) لضمان كثافة الألوان وعتمة النصوص على الأسطح الشفافة والمعدنية.' },
    ],
    prepress_rules: {
      color_mode: 'CMYK',
      recommended_dpi: 300,
      bleed_mm: 1.5,
      safety_margin_mm: 2,
      accepted_formats: ['PDF', 'AI'],
      notes_ar: 'يرجى تضمين خط القص Die-line بلون Spot منفصل.',
    },
    related_service_ids: ['srv-folding-cartons', 'srv-promotional-mugs'],
    related_package_ids: ['pkg-food-beverage'],
    created_at: '2026-01-12T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 4. Vehicle Wraps
  {
    id: 'srv-vehicle-wraps',
    name_ar: 'تجليد ورسومات المركبات والشاحنات (Vehicle Graphics & Full Wrap)',
    name_en: 'Commercial Vehicle Wraps & Fleet Graphics',
    slug: 'commercial-vehicle-wraps',
    department_id: 'dept-large-format',
    category_id: 'cat-vehicle-graphics',
    short_description_ar: 'تغليف وتجليد سيارات التوزيع وباصات الشركات بأفلام كاست وفينيل مقاوم للشمس والخدوش مع التركيب.',
    full_description_ar: 'حول أسطول سيارات شركتك إلى لوحات إعلانية متنقلة تجوب الشوارع وتزيد من شهرة علامتك التجارية. نستخدم أفضل أفلام الفينيل العالمية (Cast & High-Grade Polymeric) مع طبقة سلفنة حماية UV Laminate تمنع بهتان الألوان وتتحمل الغسيل الآلي ودرجات الحرارة المرتفعة.',
    hero_image: '/images/vehicle_branding_wrap_1790811427153.jpg',
    gallery: [
      '/images/vehicle_branding_wrap_1790811427153.jpg',
      '/images/printing_storefront_1790806863092.jpg',
    ],
    badge: 'ضمان ثبات اللون ومقاومة الطقس',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    most_requested: true,
    sort_order: 4,
    seo_title: 'تجليد سيارات الشركات وباصات التوزيع في اليمن | رواج للدعاية والإعلان',
    seo_description: 'تصميم وطباعة وتركيب استيكرات وتجليد سيارات التوزيع والأساطيل بأعلى خامات الفينيل المقاومة للشمس.',
    template_id: 'tmpl-vehicle-wrap',
    specification_groups: INITIAL_TEMPLATES[3].specification_groups,
    highlights: [
      { id: 'h1', title_ar: 'فينيل كاست مع تقنية تفريغ الهواء', description_ar: 'تغطية متماسكة بدون فقاعات أو انكماش على الانحناءات والمقابض.' },
      { id: 'h2', title_ar: 'طبقة حماية UV Overlaminate', description_ar: 'حماية كاملة من أشعة الشمس المباشرة والخدوش أثناء الغسيل.' },
      { id: 'h3', title_ar: 'فريق تركيب ميداني معتمد', description_ar: 'فنيون متخصصون بتسخين وتشكيل الفينيل وفق أحدث المعايير.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'كم تدوم استيكرات تجليد السيارات؟', answer_ar: 'تدوم الخامات الكاست من 5 إلى 7 سنوات دون تشقق أو بهتان بفضل طبقة السلفنة الواقية.' },
    ],
    prepress_rules: {
      color_mode: 'CMYK',
      recommended_dpi: 150,
      bleed_mm: 50,
      safety_margin_mm: 30,
      accepted_formats: ['TIFF', 'PDF', 'PSD'],
      notes_ar: 'يرجى تقديم التصميم على المخطط الحقيقي لأبعاد المركبة مع مراعاة مقابض الأبواب والفواصل.',
    },
    related_service_ids: ['srv-channel-letters', 'srv-acp-cladding'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 5. Channel Letters
  {
    id: 'srv-channel-letters',
    name_ar: 'حروف بارزة مضيئة (Face-Lit & Halo-Lit 3D Channel Letters)',
    name_en: 'Illuminated 3D Channel Letters & Facade Signage',
    slug: 'illuminated-channel-letters',
    department_id: 'dept-signage',
    category_id: 'cat-channel-letters',
    short_description_ar: 'حروف مجسمة مضيئة أكريليك، ستانلس ستيل زنكور مع إضاءة LED كورية موفرة ومقاومة للماء IP67.',
    full_description_ar: 'الواجهة الرئيسية لمقرك التجاري هي هويتك الحقيقية في الشارع. نقوم بتصنيع الحروف البارزة المضيئة بدقة متناهية عبر ماكينات الثني والقص الآلي مع استخدام أفضل خامات الأكريليك المصبوب والستانلس ستيل ووحدات LED فائقة السطوع وعالية الكفاءة.',
    hero_image: '/images/rawaj_hero_storefront_1790822521342.jpg',
    gallery: [
      '/images/rawaj_hero_storefront_1790822521342.jpg',
      '/images/printing_storefront_1790806863092.jpg',
    ],
    badge: 'تصنيع وهندسة واجهات رائدة',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    most_requested: true,
    sort_order: 5,
    seo_title: 'تصنيع وتركيب الحروف البارزة المضيئة للواجهات في صنعاء | رواج',
    seo_description: 'حروف بارزة مضيئة 3D للواجهات والمحلات بأحدث تصاميم الستانلس والأكريليك وإضاءة LED مقاومة للأمطار.',
    template_id: 'tmpl-channel-letters',
    specification_groups: INITIAL_TEMPLATES[4].specification_groups,
    highlights: [
      { id: 'h1', title_ar: 'إضاءة LED متجانسة بدون بقع مظلمة', description_ar: 'توزيع هندسي متقن لوحدات الإضاءة مع محولات طاقة معتمدة.' },
      { id: 'h2', title_ar: 'هياكل مقاومة للصدأ والرياح', description_ar: 'لحام وتثبيت قوي بستانلس ستيل وألومنيوم مجلفن معزول.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل تشمل الخدمة التركيب والتوصيل الكهربائي في الموقع؟', answer_ar: 'نعم، يتولى مهندسونا وفنيونا مسح الموقع بالليزر وتثبيت الحروف وربطها بالتغذية الكهربائية باحترافية كاملة.' },
    ],
    related_service_ids: ['srv-acp-cladding', 'srv-vehicle-wraps'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-01-18T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 6. Folding Cartons Packaging
  {
    id: 'srv-folding-cartons',
    name_ar: 'علب كرتون فاخرة للمنتجات والعطور ومستحضرات التجميل (Folding Cartons)',
    name_en: 'Custom Printed Folding Cartons & Retail Boxes',
    slug: 'custom-folding-cartons',
    department_id: 'dept-packaging',
    category_id: 'cat-cartons',
    short_description_ar: 'تصنيع وتفصيل علب الكرتون بهياكل طي FEFCO متقدمة وكرتون مقوى FBB مع ورنيش ويو في وبصمة ذهبية.',
    full_description_ar: 'تغليف المنتج هو العامل الحاسم في قرار الشراء لدى المستهلك. نوفر حلول تصنيع وتفصيل علب الكرتون بمختلف الهياكل الهندسية المتوافقة مع خطوط التعبئة السريعة، مع خيارات تشطيب مذهلة ترفع القيمة المدركة لعلامتك التجارية.',
    hero_image: '/images/luxury_packaging_showcase_1790822533141.jpg',
    gallery: [
      '/images/luxury_packaging_showcase_1790822533141.jpg',
      '/images/luxury_packaging_1790806882434.jpg',
    ],
    badge: 'هندسة تغليف احترافية',
    service_status: 'published',
    execution_model: 'mixed',
    featured: true,
    most_requested: true,
    sort_order: 6,
    seo_title: 'تصنيع علب كرتون وتغليف المنتجات في اليمن | رواج للطباعة والتغليف',
    seo_description: 'طلب عرض سعر تفصيل علب كرتون المنتجات والعطور ومستحضرات التجميل بهياكل هندسية متينة وجودة طباعة عالمية.',
    template_id: 'tmpl-folding-box',
    specification_groups: INITIAL_TEMPLATES[5].specification_groups,
    highlights: [
      { id: 'h1', title_ar: 'قوالب قص وريجة ميكانيكية دقيقة', description_ar: 'طي سلس ومتين بدون تكسير في زوايا الكرتون أو الحواف المطبوعة.' },
      { id: 'h2', title_ar: 'كرتون عاجي FBB صحي ومطابق للمواصفات', description_ar: 'خامات بيضاء نقية معتمدة لتغليف الأغذية والأدوية والعطور.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن عمل عينة فعلية (Mockup Prototype) قبل تشغيل الكمية الكبيرة؟', answer_ar: 'نعم، نوفر نموذجاً أولياً مقصوصاً بالبلوتر لاختبار مقاس العبوة وثبات المنتج داخلها قبل الإنتاج الشامل.' },
    ],
    related_service_ids: ['srv-roll-labels', 'srv-paper-bags-luxury'],
    related_package_ids: ['pkg-food-beverage', 'pkg-corp-identity'],
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 7. ACP Facade Cladding
  {
    id: 'srv-acp-cladding',
    name_ar: 'تكسية واجهات كلادينج ألومنيوم (ACP Cladding) والديكور التجاري',
    name_en: 'Architectural ACP Facade Cladding & Shopfronts',
    slug: 'acp-facade-cladding',
    department_id: 'dept-facades',
    category_id: 'cat-acp-facades',
    short_description_ar: 'تكسية واجهات المحلات والمباني بألواح كلادينج ألومنيوم مقاومة للحريق PVDF مع هياكل حديد مجلفن.',
    full_description_ar: 'نقدم حلولاً معمارية شاملة لتجديد وتجهيز واجهات الشركات والمحلات والمباني التجارية بألواح الكلادينج (Aluminium Composite Panels) ذات الدهان الفلوروكربوني PVDF المقاوم للشمس والحرارة والأتربة، مع دراسة إنشائية للهياكل والتثبيت المخفي.',
    hero_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'مشاريع معمارية متكاملة',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 7,
    seo_title: 'واجهات كلادينج ألومنيوم للمحلات والشركات في صنعاء | رواج',
    seo_description: 'تصميم وتنفيذ وتكسية واجهات الكلادينج الألومنيوم والمجسمات المعمارية بأعلى معايير الجودة ومقاومة الطقس.',
    specification_groups: [
      {
        id: 'grp-acp-spec',
        title_ar: 'مواصفات لوح الكلادينج والهيكل',
        sort_order: 1,
        fields: [
          {
            id: 'acp-thickness',
            key: 'panel_thickness',
            label_ar: 'سماكة لوح الكلادينج وسماكة قشرة الألومنيوم',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'acp_4mm_04', label_ar: '4 ملم (قشرة ألومنيوم 0.40 ملم دهان PVDF) - المعيار المعتمد للمباني الخارجية', value: '4mm_04_pvdf' },
              { id: 'acp_4mm_03', label_ar: '4 ملم (قشرة ألومنيوم 0.30 ملم) - للمحلات والواجهات المتوسطة', value: '4mm_03' },
              { id: 'acp_3mm_indoor', label_ar: '3 ملم للديكورات والكسوات الداخلية', value: '3mm_interior' },
            ],
          },
          {
            id: 'acp-fire-grade',
            key: 'fire_rating',
            label_ar: 'مقاومة الحريق للحشوة الداخلية',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 2,
            options: [
              { id: 'fire_b1', label_ar: 'حشوة مقاومة للاشتعال تصنيف B1 / A2 للمشاريع والمؤسسات الكبرى', value: 'fire_retardant' },
              { id: 'pe_standard', label_ar: 'حشوة بولي إيثيلين قياسية (Standard PE Core)', value: 'standard_pe' },
            ],
          },
          {
            id: 'acp-area',
            key: 'approx_area',
            label_ar: 'المساحة التقريبية للواجهة (بالمتر المربع)',
            type: 'number',
            required: true,
            unit: 'م²',
            placeholder_ar: 'مثال: 45',
            sort_order: 3,
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'دهان PVDF مقاوم للبهتان لمدة 15 عاماً', description_ar: 'ثبات لوني فائق ضد أشعة الشمس المرتفعة والأمطار.' },
      { id: 'h2', title_ar: 'هياكل حديدية مجلفنة مدروسة هندسياً', description_ar: 'مقاومة متكاملة لضغط الرياح وعوامل الطقس مع عزل سيليكون محكم.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يشمل المشروع التصميم ثلاثي الأبعاد 3D قبل البدء؟', answer_ar: 'نعم، يقدم مهندسو رواج نموذج محاكاة 3D للواجهة بالألوان والهوية المعتمدة قبل قص الألواح.' },
    ],
    related_service_ids: ['srv-channel-letters', 'srv-vehicle-wraps'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-01-22T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 8. DTF Apparel Printing
  {
    id: 'srv-dtf-apparel',
    name_ar: 'طباعة التيشيرتات والزي الموحد بتقنية الـ DTF فائقة الدقة',
    name_en: 'Direct-to-Film (DTF) Custom Apparel Printing',
    slug: 'dtf-apparel-printing',
    department_id: 'dept-apparel',
    category_id: 'cat-tshirts-uniforms',
    short_description_ar: 'طباعة ملونة كاملة بدقة فوتوغرافية على الأقمشة القطنية والبوليستر ومقاومة للغسيل المتكرر.',
    full_description_ar: 'أحدث ثورة في طباعة المنسوجات والأزياء الموحدة. تتيح تقنية Direct-to-Film (DTF) طباعة كافة التفاصيل المعقدة والتدرجات اللونية بدقة خيالية مع ملمس مرن لا يتشقق ومقاومة فائقة للغسيل على التيشيرتات القطنية، البولو، الهوديز، والسترات الفنية.',
    hero_image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'دقة فائقة وألوان زاهية',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 8,
    seo_title: 'طباعة تيشيرتات وزي موحد DTF في اليمن | رواج',
    seo_description: 'طباعة DTF احترافية على التيشيرتات واليونيفورم والملابس الرياضية بألوان نابضة ومقاومة للغسيل.',
    specification_groups: [
      {
        id: 'grp-garment-spec',
        title_ar: 'نوع القطعة ومواقع الطباعة',
        sort_order: 1,
        fields: [
          {
            id: 'app-garment-type',
            key: 'garment_type',
            label_ar: 'نوع قطعة الملابس',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'tshirt_round', label_ar: 'تيشيرت قطن 100% ياقة دائرية (Round Neck)', value: 'tshirt_round' },
              { id: 'polo_shirt', label_ar: 'قميص بولو قطن بيكيه مع ياقة وأزرار (Polo)', value: 'polo_pique' },
              { id: 'hoodie', label_ar: 'هودي شتوي ثقيل مبطن (Hoodie)', value: 'hoodie' },
              { id: 'vest_work', label_ar: 'سترة عمل فنية / سديري مهندسين (Workwear Vest)', value: 'work_vest' },
              { id: 'customer_fabric', label_ar: 'توريد الملابس من طرف العميل (طباعة فقط)', value: 'print_only_on_client_garment' },
            ],
          },
          {
            id: 'app-print-location',
            key: 'print_locations',
            label_ar: 'مواقع الطباعة على القطعة',
            type: 'multi_select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'left_chest', label_ar: 'شعار الصدر الأيسر (10 × 10 سم)', value: 'left_chest' },
              { id: 'center_chest', label_ar: 'الصدر من المنتصف بحجم كبير (A4 / A3)', value: 'front_large' },
              { id: 'back_large', label_ar: 'الظهر كامل بحجم كبير (A3 Full Back)', value: 'back_large' },
              { id: 'sleeves', label_ar: 'طباعة على الأكمام', value: 'sleeves' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'مرونة عالية ومقاومة للغسيل المتكرر', description_ar: 'أحبار وبودرة بولي يوريثان مرنة تندمج مع أنسجة القماش دون تشقق.' },
      { id: 'h2', title_ar: 'دقة تدرجات لونية كاملة CMYK + White', description_ar: 'طباعة صور فوتوغرافية وتصاميم معقدة بدون قيود عدد الألوان.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هي تعليمات الغسيل للحفاظ على طباعة DTF؟', answer_ar: 'يغسل القميص مقلوباً على درجة حرارة معتدلة (30-40 مئوية) مع تجنب الكي المباشر على منطقة الرسم المطبوع.' },
    ],
    related_service_ids: ['srv-promotional-mugs', 'srv-bizcards-luxury'],
    related_package_ids: ['pkg-store-launch', 'pkg-corp-identity'],
    created_at: '2026-01-25T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 9. Promotional Mugs & Drinkware
  {
    id: 'srv-promotional-mugs',
    name_ar: 'أكواب ومطارات حرارية بطباعة وحفر ليزري للهدايا المؤسسية',
    name_en: 'Custom Promotional Drinkware & Thermal Tumblers',
    slug: 'custom-promotional-drinkware',
    department_id: 'dept-promotions',
    category_id: 'cat-drinkware',
    short_description_ar: 'أكواب سيراميك، مجات حرارية ستانلس ستيل عازلة مع طباعة ملونة كاملة أو حفر ليزري ناعم.',
    full_description_ar: 'تعد الأكواب والمطارات الحرارية من أكثر الهدايا الترويجية تأثيراً وبقاءً في أيدي العملاء والشركاء. نوفر تشكيلة واسعة من مجات السيراميك والمطارات الستانلس ستيل مزدوجة الجدار لحفظ الحرارة، مع إمكانية الطباعة الدائرية المحيطية أو الحفر بالليزر المقاوم للغسيل.',
    hero_image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'هدايا ترويجية مميزة',
    service_status: 'published',
    execution_model: 'mixed',
    featured: false,
    sort_order: 9,
    seo_title: 'طباعة وحفر أكواب ومجات حرارية للهدايا في اليمن | رواج',
    seo_description: 'أكواب سيراميك ومطارات حرارية مطبوعة ومحفورة بالليزر بشعار شركتك للمؤتمرات والفعاليات.',
    specification_groups: [
      {
        id: 'grp-mug-spec',
        title_ar: 'نوع الكوب وطريقة التخصيص',
        sort_order: 1,
        fields: [
          {
            id: 'mug-item-type',
            key: 'mug_type',
            label_ar: 'نوع الكوب أو العبوة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'ceramic_white', label_ar: 'كوب سيراميك أبيض قياسي 11 أونصة (Sublimation Ceramic)', value: 'ceramic_white_11oz' },
              { id: 'ceramic_magic', label_ar: 'كوب سحري أسود يكشف التصميم مع الحرارة (Magic Mug)', value: 'magic_mug' },
              { id: 'stainless_tumbler', label_ar: 'مج حراري ستانلس ستيل حافظ للحرارة 500 مل (Vacuum Tumbler)', value: 'stainless_tumbler_500ml' },
              { id: 'bamboo_flask', label_ar: 'م современной مطارة خيزران طبيعي مع ستانلس ستيل (Eco Bamboo Flask)', value: 'bamboo_flask' },
            ],
          },
          {
            id: 'mug-branding-method',
            key: 'branding_method',
            label_ar: 'طريقة وضع الشعار والهوية',
            type: 'select',
            required: true,
            allow_rawaj_recommendation: true,
            sort_order: 2,
            options: [
              { id: 'laser_engrave', label_ar: 'حفر ليزري معدني ناعم (دائم ولا يزول نهائياً للمجات الحرارية)', value: 'laser_engraving' },
              { id: 'full_color_sub', label_ar: 'طباعة حرارية دائرية ملونة بالكامل (Full Color Sublimation)', value: 'full_color_sublimation' },
              { id: 'uv_dtf', label_ar: 'طباعة UV DTF بارزة ملموسة ثلاثية الأبعاد', value: 'uv_dtf_raised' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'تغليف فردي لكل قطعة في علبة هدايا', description_ar: 'تسليم كل مج داخل علبته المخصصة للحفاظ عليه وجاهزيته للإهداء.' },
      { id: 'h2', title_ar: 'أحبار وحفر مقاوم للاستخدام اليومي', description_ar: 'ثبات تام مع الغسيل والمشروبات الساخنة.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن تخصيص اسم شخصي مختلف لكل كوب في الطلب؟', answer_ar: 'نعم، نوفر خدمة تخصيص البيانات المتغيرة (Variable Data) لحفر اسم كل موظف أو مكرم على حدة.' },
    ],
    related_service_ids: ['srv-dtf-apparel', 'srv-bizcards-luxury'],
    related_package_ids: ['pkg-corp-identity'],
    created_at: '2026-01-26T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 10. Luxury Paper Bags
  {
    id: 'srv-paper-bags-luxury',
    name_ar: 'أكياس ورقية فاخرة للشركات والمتاجر (Custom Luxury Paper Bags)',
    name_en: 'Custom Luxury Paper Shopping Bags with Rope Handles',
    slug: 'custom-luxury-paper-bags',
    department_id: 'dept-packaging',
    category_id: 'cat-paper-bags',
    short_description_ar: 'أكياس ورقية مطبوعة بمقابض حبال قطنية أو ستان مع كرتون تقوية سفلي وسلفنة مطفية وبصمة ذهبية.',
    full_description_ar: 'الكيس الورقي هو الواجهة المتنقلة لمتجرك في أيدي عملائك. نصنع الأكياس الورقية الفاخرة بأوزان ورق كوشيه مقوى 200-250 جم أو ورق كرافت طبيعي مع قاعدة كرتونية مقواة ومقابض حبال مريحة، مع إمكانية إضافة السلفنة المطفية والبصمة الحرارية اللامعة.',
    hero_image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تغليف بيع وتجزئة فاخر',
    service_status: 'published',
    execution_model: 'mixed',
    featured: false,
    sort_order: 10,
    seo_title: 'تصنيع وطباعة أكياس ورقية للمحلات في اليمن | رواج',
    seo_description: 'أكياس تسوق ورقية فاخرة للمحلات ومتاجر العطور والملابس بمقابض أنيقة وجودة طباعة فائقة.',
    specification_groups: [
      {
        id: 'grp-bag-specs',
        title_ar: 'المقاس ونوع الورق والمقابض',
        sort_order: 1,
        fields: [
          {
            id: 'bag-size-dim',
            key: 'bag_size',
            label_ar: 'مقاس الكيس (عرض × ارتفاع × قاعدة)',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'bag_small', label_ar: 'صغير للعطور والمجوهرات (18 × 22 × 8 سم)', value: 'small_18x22x8' },
              { id: 'bag_medium', label_ar: 'متوسط قياسي للتجزئة والملابس (26 × 35 × 10 سم)', value: 'med_26x35x10' },
              { id: 'bag_large', label_ar: 'كبير للسترات والعبوات الضخمة (40 × 32 × 12 سم)', value: 'large_40x32x12' },
            ],
          },
          {
            id: 'bag-handle-type',
            key: 'handle_type',
            label_ar: 'نوع مقبض اليد (Handle)',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'cotton_rope', label_ar: 'حبال قطنية مبرومة سميكة فاخرة مع عقد داخلية', value: 'cotton_rope' },
              { id: 'satin_ribbon', label_ar: 'شريط ستان حريري أنيق لمتاجر الهدايا والعطور', value: 'satin_ribbon' },
              { id: 'die_cut_handle', label_ar: 'مقبض مقصوص مفرغ مدمج (Die-Cut Punched Handle)', value: 'die_cut' },
              { id: 'twisted_kraft', label_ar: 'حبل كرافت مبروم بيئي ملصوق آلياً', value: 'twisted_paper' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'كرتون تقوية في القاعدة ومكان المقابض', description_ar: 'تحمل أوزان المنتجات دون تمزق أو ارتخاء للأيدي.' },
      { id: 'h2', title_ar: 'سلفنة مطفية عازلة للماء', description_ar: 'حماية متكاملة من الرطوبة واهتراء الورق أثناء الحمل.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن طباعة الكيس من الداخل أيضاً؟', answer_ar: 'نعم، يمكن تطبيق طباعة بطانة داخلية بلون كامل أو نقش هوية متكرر (Pattern) لمزيد من الفخامة.' },
    ],
    related_service_ids: ['srv-folding-cartons', 'srv-bizcards-luxury'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-01-27T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 11. Brochures & Catalogs
  {
    id: 'srv-brochures-catalogs',
    name_ar: 'بروشورات وكتالوجات تعريفية ومجلات (Brochures & Catalogs)',
    name_en: 'Custom Printed Promotional Brochures & Catalogs',
    slug: 'custom-brochures-catalogs',
    department_id: 'dept-paper',
    category_id: 'cat-marketing-paper',
    short_description_ar: 'بروشورات مطوية وفلايرات وكتالوجات متعددة الصفحات بتجليد دبابيس أو سلك أو غراء حراري.',
    full_description_ar: 'الوسيلة الترويجية الأقوى لعرض قائمة منتجاتك وخدمات الشركة بالتفصيل. نوفر طباعة أوفست ورقمية فائقة الوضوح على أوراق كوشيه ألماني وبصمة حرارية وسلفنة مطفية أو لامعة.',
    hero_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'ترويج وتسويق احترافي',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 11,
    seo_title: 'طباعة بروشورات وكتالوجات في اليمن | رواج',
    seo_description: 'طباعة كتالوجات ومجلات وبروشورات مطوية للشركات والمؤسسات بجودة أوفست عالمية.',
    specification_groups: [
      {
        id: 'grp-brochure-spec',
        title_ar: 'المقاس والطي ونوع الورق',
        sort_order: 1,
        fields: [
          {
            id: 'brc-size',
            key: 'paper_size',
            label_ar: 'مقاس الكتالوج / البروشور',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'a4_size', label_ar: 'A4 القياسي (21 × 29.7 سم)', value: 'A4' },
              { id: 'a5_size', label_ar: 'A5 المدمج (14.8 × 21 سم)', value: 'A5' },
              { id: 'dl_size', label_ar: 'مقاس أظرف DL (9.9 × 21 سم)', value: 'DL' },
            ],
          },
          {
            id: 'brc-folding',
            key: 'folding_style',
            label_ar: 'نمط الطي (Folding Style)',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'tri_fold', label_ar: 'طي ثلاثي (Tri-Fold / Z-Fold)', value: 'tri_fold' },
              { id: 'bi_fold', label_ar: 'طي ثنائي مفرد (Half-Fold)', value: 'bi_fold' },
              { id: 'flat_flyer', label_ar: 'فلاير مسطح بدون طي (Flat Flyer)', value: 'flat' },
              { id: 'multi_page_book', label_ar: 'كتالوج متعدد الصفحات بتجليد دبابيس/غراء', value: 'multi_page' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'ألوان أوفست دقيقة ومطابقة للهوية', description_ar: 'معايرة أحبار CMYK لضمان وضوح الصور المطبوعة.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل تشمل الخدمة المراجعة الفنية للملفات قبل الطباعة؟', answer_ar: 'نعم، يفحص فريقنا ملفات Prepress للتأكد من هوامش القص ووضوح الصور مجاناً.' },
    ],
    related_service_ids: ['srv-bizcards-luxury', 'srv-ncr-invoices'],
    related_package_ids: ['pkg-corp-identity'],
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 12. Corrugated Shipping Boxes
  {
    id: 'srv-corrugated-boxes',
    name_ar: 'صناديق كرتون مضلع للشحن والتصدير (Corrugated Shipping Boxes)',
    name_en: 'Printed Corrugated Shipping & E-Commerce Boxes',
    slug: 'corrugated-shipping-boxes',
    department_id: 'dept-packaging',
    category_id: 'cat-corrugated',
    short_description_ar: 'صناديق كرتون مضلع متينة للشحن والتصدير والمتاجر الإلكترونية خفيفة وسلسة التجميد والطي.',
    full_description_ar: 'احمِ منتجاتك أثناء النقل والشحن مع صناديق الكرتون المضلع المصممة خصيصاً للمتاجر الإلكترونية والمصانع. نوفر طباعة الشعار والتعليمات بخامات E-Flute و B-Flute عالية التحمل.',
    hero_image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'حماية ممتازة للشحن',
    service_status: 'published',
    execution_model: 'mixed',
    featured: false,
    sort_order: 12,
    seo_title: 'طباعة صناديق كرتون مضلع للشحن في اليمن | رواج',
    seo_description: 'تجهيز وتفصيل صناديق شحن كرتون مضلع للمتاجر الإلكترونية والتصدير بأعلى متانة.',
    specification_groups: [
      {
        id: 'grp-corr-spec',
        title_ar: 'نوع المضلع وأبعاد العلبة',
        sort_order: 1,
        fields: [
          {
            id: 'corr-flute',
            key: 'flute_type',
            label_ar: 'درجة المضلع والسمك (Flute Grade)',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'e_flute', label_ar: 'E-Flute ناعم ورقيق (1.5 مم) - للمتاجر والمنتجات المتوسطة', value: 'e_flute' },
              { id: 'b_flute', label_ar: 'B-Flute متين قياسي (3.0 مم) - للشحن الثقيل', value: 'b_flute' },
              { id: 'double_wall', label_ar: 'مزدوج الجدار BC-Flute خرق العادة (6.0 مم) - للتصدير والأوزان الضخمة', value: 'double_wall' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'مقاومة عالية للضغط والصدمات', description_ar: 'طبقات مضلعة تمتص الصدمات لحماية المحتويات أثناء النقل.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن طباعة الشعار من الداخل أيضاً؟', answer_ar: 'نعم، نوفر طباعة المظهر الداخلي لتعزيز تجربة فتح الصندوق (Unboxing Experience).' },
    ],
    related_service_ids: ['srv-folding-cartons', 'srv-roll-labels'],
    related_package_ids: ['pkg-food-beverage'],
    created_at: '2026-02-05T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 13. Rigid Luxury Gift Boxes
  {
    id: 'srv-rigid-gift-boxes',
    name_ar: 'علب هدايا صلبة فاخرة (Rigid Luxury Gift Boxes)',
    name_en: 'Custom Rigid Gift Boxes with Magnetic Closure',
    slug: 'rigid-luxury-gift-boxes',
    department_id: 'dept-packaging',
    category_id: 'cat-cartons',
    short_description_ar: 'علب كرتون صلب 2-3 مم مغطى بأوراق فاخرة مع إغلاق مغناطيسي وحفر وبصمة مذهبة للهدايا والعطور.',
    full_description_ar: 'أرقى أنواع التغليف على الإطلاق. ننتج العلب الصلبة (Rigid Boxes) يدوياً وآلياً للشركات الكبرى وماركات العطور والذهب والجوائز، مع أسرة مخصصة داخلية من الإسفنج المخملي والأكريليك.',
    hero_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'قمة الفخامة والتغليف',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 13,
    seo_title: 'تصنيع علب هدايا صلبة Rigid Boxes في اليمن | رواج',
    seo_description: 'تفصيل وتصنيع علب الهدايا الصلبة والمغناطيسية الفاخرة للشركات والعطور والذهب.',
    specification_groups: [
      {
        id: 'grp-rigid-spec',
        title_ar: 'نمط العلبة والسرير الداخلي',
        sort_order: 1,
        fields: [
          {
            id: 'rgd-style',
            key: 'box_type',
            label_ar: 'نمط إغلاق العلبة الصلبة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'magnetic', label_ar: 'إغلاق مغناطيسي مدمج (Magnetic Book Box)', value: 'magnetic' },
              { id: 'lid_base', label_ar: 'غطاء وقاعدة كلاسيكي (Lid & Base Box)', value: 'lid_base' },
              { id: 'drawer', label_ar: 'علبة درج انزلاقية (Drawer / Slide Box)', value: 'drawer' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'كرتون صلب مقاوم للكسر سمك 3 مم', description_ar: 'متانة استثنائية تضمن بقاء العلبة كتذكار لدى العميل.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن عمل سرير إسفنجي مخصص لشكل المنتج؟', answer_ar: 'نعم، نقوم بقص الإسفنج المخملي بالليزر ليحتضن المنتج بدقة متناهية.' },
    ],
    related_service_ids: ['srv-paper-bags-luxury', 'srv-bizcards-luxury'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 14. Flex Banners & Outdoor Signage
  {
    id: 'srv-outdoor-banners',
    name_ar: 'بنرات وفلكس إعلاني كبير للمعارض والواجهات (PVC Banners)',
    name_en: 'Heavy Duty Outdoor PVC Banners & Flex Signage',
    slug: 'outdoor-pvc-banners',
    department_id: 'dept-large-format',
    category_id: 'cat-outdoor-banners',
    short_description_ar: 'بنرات PVC مقاومة للتمزق والرياح وفلكس مضيء بحلقات تثبيت معدنية لجميع المقاسات.',
    full_description_ar: 'حلول الإعلانات الخارجية المؤقتة والدائمة. نطبع بنرات الـ PVC والفلكس بأحبار يابانية مقاومة لأشعة الشمس المباشرة والأمطار، مع تقوية الحواف بحلقات تثبيت ألومنيوم مقاومة للصدأ.',
    hero_image: '/images/vehicle_branding_wrap_1790811427153.jpg',
    gallery: [
      '/images/vehicle_branding_wrap_1790811427153.jpg',
    ],
    badge: 'مقاوم للرياح والشمس',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 14,
    seo_title: 'طباعة بنرات وفلكس إعلاني في صنعاء واليمن | رواج',
    seo_description: 'طباعة بنرات وفلكس إعلاني بجميع المقاسات مع الحلقات والخياطة وأعلى دقة ألوان.',
    specification_groups: [
      {
        id: 'grp-banner-spec',
        title_ar: 'نوع الخامة والتثبيت',
        sort_order: 1,
        fields: [
          {
            id: 'bnr-material',
            key: 'material_type',
            label_ar: 'نوع قماش البنر / الفلكس',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'pvc_440', label_ar: 'بنر PVC سميك 440 جرام (الأكثر استخداماً)', value: 'pvc_440' },
              { id: 'pvc_510_frontlit', label_ar: 'بنر PVC فرونتلِت 510 جرام عالي المتانة', value: 'pvc_510' },
              { id: 'flex_backlit', label_ar: 'فلكس مضيء Backlit للوحات المضاءة خلفياً', value: 'flex_backlit' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'خياطة حواف وحلقات تثبيت متينة', description_ar: 'تأمين الحواف ضد التمزق عند الشد والتعليق في المرتفعات.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هو أقصى عرض للطباعة بدون وصلات؟', answer_ar: 'نطبع حتى عرض 3.2 متر بدون وصلات، وللمقاسات الأكبر نوفر لحاماً حرارياً خفياً فائق القوة.' },
    ],
    related_service_ids: ['srv-vehicle-wraps', 'srv-channel-letters'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-02-12T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 15. Flex Lightboxes & Acrylic Signs
  {
    id: 'srv-flex-lightboxes',
    name_ar: 'صناديق إضاءة فلكس بوكس ولوحات إعلانية (Flex Lightboxes)',
    name_en: 'Illuminated Flex Lightboxes & Cabinet Signage',
    slug: 'illuminated-flex-lightboxes',
    department_id: 'dept-signage',
    category_id: 'cat-lightboxes',
    short_description_ar: 'لوحات فلكس بوكس مضيئة بهيكل ألومنيوم/زنكور وإضاءة LED مقاومة للأمطار للواجهات والمحلات.',
    full_description_ar: 'الحل الاقتصادي والبارز للواجهات التجارية. نصنع صناديق الفلكس بوكس بهياكل حديدية وألومنيوم معزول مع إضاءة داخلية متجانسة وقماش فلكس عالي النقاء.',
    hero_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'إضاءة واجهات اقتصادية',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 15,
    seo_title: 'تصنيع لوحات فلكس بوكس مضيئة باليمن | رواج',
    seo_description: 'تصنيع وتركيب لوحات الفلكس بوكس وصناديق الإضاءة للمحلات التجارية بأجود خامات LED.',
    specification_groups: [
      {
        id: 'grp-box-spec',
        title_ar: 'مواصفات الصندوق والإضاءة',
        sort_order: 1,
        fields: [
          {
            id: 'lbx-frame',
            key: 'frame_material',
            label_ar: 'مادة إطار الفلكس بوكس',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'aluminum_profile', label_ar: 'قطاعات ألومنيوم مخصصة ومدهونة حرارياً', value: 'aluminum' },
              { id: 'zinco_covered', label_ar: 'صاج مجلفن مدهون دوكو سيارات مقاوم للرطوبة', value: 'zinco' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'توزيع إضاءة متجانس IP67', description_ar: 'بدون أي ظلال أو بقع معزولة على القماش المضاء.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل تشمل الخدمة التركيب والتثبيت في الموقع؟', answer_ar: 'نعم، يتولى فريق رواج رفع القياسات والتركيب الميداني بأعلى أمان.' },
    ],
    related_service_ids: ['srv-channel-letters', 'srv-acp-cladding'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 16. Computerized Embroidery Workwear
  {
    id: 'srv-computerized-embroidery',
    name_ar: 'التطريز الآلي المباشر للشعارات والزي الموحد (Computerized Embroidery)',
    name_en: 'Direct Computerized Logo Embroidery for Apparel & Badges',
    slug: 'computerized-logo-embroidery',
    department_id: 'dept-embroidery',
    category_id: 'cat-tshirts-uniforms',
    short_description_ar: 'تطريز شعارات دقيق بخيوط ملونة بارزة مقاومة للغسيل والكلور على القمصان والكابات والباتشات.',
    full_description_ar: 'يمنح التطريز الآلي المباشر زي عملك لمسة فخامة ورسمية لا تضاهى. نستخدم ماكينات تطريز يابانية متعددة الرؤوس تطرز بدقة خيوط حريرية وبوليستر مقاومة للغسيل المتكرر والمستمر.',
    hero_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تطريز ياباني دقيق',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 16,
    seo_title: 'تطريز شعارات وزي موحد بالكمبيوتر في صنعاء | رواج',
    seo_description: 'خدمة التطريز الآلي المباشر على الملابس والكابات والشارات القماشية بخيوط عالية الثبات.',
    specification_groups: [
      {
        id: 'grp-emb-spec',
        title_ar: 'مكان التطريز ونوع الخيوط',
        sort_order: 1,
        fields: [
          {
            id: 'emb-location',
            key: 'embroidery_position',
            label_ar: 'موقع التطريز على الزي',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'chest_logo', label_ar: 'شعار الصدر (حجم حتى 10 × 10 سم)', value: 'chest' },
              { id: 'sleeve_logo', label_ar: 'شعار الكتف / الكم', value: 'sleeve' },
              { id: 'cap_front', label_ar: 'تطريز كاب بارز ثلاثي الأبعاد (3D Puff Embroidery)', value: 'cap_3d' },
              { id: 'cloth_patch', label_ar: 'شارات قماشية منفصلة مع لاصق كوي/فيلكرو (Patches)', value: 'patch' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'خيوط بوليستر مقاومة للكلور والغسيل', description_ar: 'لا تفقد زهاؤها أو تسترخي مع الاستخدام اليومي المكثف.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن تحويل الشعار العادي إلى ملف تطريز مبرمج؟', answer_ar: 'نعم، يقوم مهندسونا ببرمجة مسار الغرز (Digitizing) مجاناً للطلبات المؤسسية.' },
    ],
    related_service_ids: ['srv-dtf-apparel', 'srv-promotional-mugs'],
    related_package_ids: ['pkg-corp-identity'],
    created_at: '2026-02-18T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 17. Corporate Gift Sets VIP
  {
    id: 'srv-corporate-gift-sets',
    name_ar: 'مجموعات هدايا المؤسسات والـ VIP بحفر ليزري موحد',
    name_en: 'Executive Corporate Gift Sets & VIP Merchandising',
    slug: 'executive-corporate-gift-sets',
    department_id: 'dept-promotions',
    category_id: 'cat-office-gifts',
    short_description_ar: 'طقم هدايا مكتبية فاخر (نوت بوك جلدي، قلم، فلاش، مج حراري) مع حفر الشعار وعلبة فاخرة.',
    full_description_ar: 'ارتقِ بالعلاقات مع كبار عملائك وشركائك. نوفر طقوم هدايا راقية متناسقة المظهر تضم أجود المنتجات المكتبية والتقنية بحفر ليزري ناعم وتغليف صندوق هدايا مخصص.',
    hero_image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'طقم VIP فاخر',
    service_status: 'published',
    execution_model: 'mixed',
    featured: true,
    sort_order: 17,
    seo_title: 'مجموعات هدايا شركات و VIP في اليمن | رواج',
    seo_description: 'تجهيز وتوريد هدايا الشركات والمؤتمرات وطقوم الـ VIP بالحفر الليزري والعلب الفاخرة.',
    specification_groups: [
      {
        id: 'grp-gift-spec',
        title_ar: 'مكونات مجموعة الهدايا',
        sort_order: 1,
        fields: [
          {
            id: 'gft-components',
            key: 'set_contents',
            label_ar: 'المكونات المضمنة في الصندوق',
            type: 'multi_select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'notebook_leather', label_ar: 'نوت بوك جلدي فاخر بختم حراري', value: 'notebook' },
              { id: 'metal_pen', label_ar: 'قلم معدني بحفر ليزري للشعار', value: 'pen' },
              { id: 'usb_flash', label_ar: 'فلاش ميموري معدني أو خشب', value: 'usb' },
              { id: 'thermal_bottle', label_ar: 'مطارة حرارية ستانلس ستيل حافظة', value: 'tumbler' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'تغليف وتخصيص موحد باسم وشعار العميل', description_ar: 'تناسق بصري كامل بين كافة القطع داخل علبة هدايا صلبة.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن تخصيص اسم كل مستلم بشكل فردي؟', answer_ar: 'نعم، ندعم حفر أسماء المكرمين أو التنفيذيين بشكل منفصل على القلم والمج.' },
    ],
    related_service_ids: ['srv-promotional-mugs', 'srv-bizcards-luxury'],
    related_package_ids: ['pkg-corp-identity'],
    created_at: '2026-02-20T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 18. Direct UV Flatbed Printing
  {
    id: 'srv-uv-flatbed-direct',
    name_ar: 'الطباعة المباشرة UV على الأكريليك، الخشب، والمعادن (Flatbed UV)',
    name_en: 'Direct UV Flatbed Printing on Wood, Acrylic & Metal',
    slug: 'direct-flatbed-uv-printing',
    department_id: 'dept-uv',
    category_id: 'cat-acrylic-laser',
    short_description_ar: 'طباعة UV مسطحة مباشرة بدقة عالية مع حبر أبيض تحتي وتأثيرات بارزة على مختلف المواد والأسطح الصلبة.',
    full_description_ar: 'تقنية الطباعة الأكثر تطوراً للأسطح القاسية. تطبع طابعات الـ UV المسطحة مباشرة على ألواح الأكريليك، الخشب الطبيعي، MDF، المعادن، والزجاج بصلابة جفاف فورية ومقاومة عالية للخدش.',
    hero_image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'طباعة مباشرة على الأسطح',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 18,
    seo_title: 'طباعة UV مسطحة مباشرة على الأكريليك والخشب في اليمن | رواج',
    seo_description: 'طباعة UV مباشرة على الأكريليك والمعادن والأسطح الصلبة بحبر أبيض وتأثيرات ملموسة.',
    specification_groups: [
      {
        id: 'grp-uv-spec',
        title_ar: 'نوع السطح والتأثير البارز',
        sort_order: 1,
        fields: [
          {
            id: 'uv-substrate',
            key: 'surface_material',
            label_ar: 'المادة المراد الطباعة عليها',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'acrylic_clear', label_ar: 'أكريليك شفاف أو ملون (سماكة 2-10 مم)', value: 'acrylic' },
              { id: 'wood_mdf', label_ar: 'خشب طبيعي أو لوح MDF معزول', value: 'wood' },
              { id: 'aluminum_sheet', label_ar: 'ألواح ألومنيوم وكلادينج', value: 'metal' },
              { id: 'glass_panel', label_ar: 'زجاج مسطح لديكورات الاستقبال', value: 'glass' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'جفاف فوري بالأشعة فوق البنفسجية', description_ar: 'ألوان ثابتة ومقاومة للماء والخدوش فور خروجها من الماكينة.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هو أقصى سمك للمادة التي يمكن إدخالها بالماكينة؟', answer_ar: 'تستوعب ماكينات الـ UV لدينا خامات بسمك يصل إلى 10 سم كاملة.' },
    ],
    related_service_ids: ['srv-acrylic-trophies', 'srv-channel-letters'],
    related_package_ids: ['pkg-store-launch'],
    created_at: '2026-02-22T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 19. Acrylic Trophies & Awards
  {
    id: 'srv-acrylic-trophies',
    name_ar: 'دروع تكريمية ومجسمات أكريليك وخشب بالليزر (Custom Trophies & Awards)',
    name_en: 'Laser Cut Acrylic & Wooden Trophies & Awards',
    slug: 'custom-acrylic-wooden-trophies',
    department_id: 'dept-laser',
    category_id: 'cat-acrylic-laser',
    short_description_ar: 'دروع تكريمية فاخرة مصنعة من الأكريليك الشفاف والخشب المحفور بليزر دقيق مع قواعد جلاكسي ورخام.',
    full_description_ar: 'كَرّم المتميزين والشركاء بأرقى الدروع المصنعة حسب الطلب. ندمج قص الأكريليك الكريستالي بالليزر مع الخشب المحفور والطباعة البارزة لإخراج تحفة تذكارية فريدة.',
    hero_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تصنيع دروع VIP',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 19,
    seo_title: 'تصنيع دروع تكريمية أكريليك وخشب بالليزر في صنعاء | رواج',
    seo_description: 'تصميم وتصنيع الدروع التكريمية الفاخرة للأحداث والمؤسسات بأحدث تقنيات الليزر والـ UV.',
    specification_groups: [
      {
        id: 'grp-trophy-spec',
        title_ar: 'مواصفات الدرع والقاعدة',
        sort_order: 1,
        fields: [
          {
            id: 'trp-material-mix',
            key: 'trophy_materials',
            label_ar: 'تركيبة خامات الدرع',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'acrylic_10mm', label_ar: 'أكريليك شفاف سميك 10 مم مع حفر ليزر وطباعة ملونة', value: 'acrylic_thick' },
              { id: 'wood_acrylic_mix', label_ar: 'دمج خشب طبيعي محفور مع أكريليك كريستالي', value: 'wood_acrylic' },
              { id: 'metal_plaque', label_ar: 'درع صاج ذهبي/فضي مثبت على قاعدة خشبية', value: 'metal_wooden_base' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'قص ليزري حاد الحواف مع تلميع ألماني', description_ar: 'شفافية كريستالية نقية بدون أي تشوه في الزوايا.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يتم تسليم الدرع داخل علبة قطيفة فاخرة؟', answer_ar: 'نعم، يسلم كل درع مخصص داخل علبة قطيفة كرتونية فاخرة ومبطنة بالساتان.' },
    ],
    related_service_ids: ['srv-uv-flatbed-direct', 'srv-corporate-gift-sets'],
    related_package_ids: ['pkg-corp-identity'],
    created_at: '2026-02-24T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },

  // 20. Brand Identity Design & Prepress
  {
    id: 'srv-brand-identity-design',
    name_ar: 'تصميم الهوية البصرية وتجهيز ملفات الطباعة (Brand Identity & Prepress)',
    name_en: 'Brand Identity Design & Prepress File Engineering',
    slug: 'brand-identity-prepress-design',
    department_id: 'dept-design',
    category_id: 'cat-stationery',
    short_description_ar: 'تصميم الشعارات ودليل الهوية البصرية الشامل ومعالجة ملفات Prepress للهواجر والقص قبل الطباعة.',
    full_description_ar: 'أساس كل مطبوع ناجح هو التصميم الهندسي الدقيق. يقدم مهندسونا خدمات تصميم الهوية البصرية الشاملة وإعادة معالجة ملفات العملاء لضمان تحويل الألوان إلى CMYK وضبط خطوط القص والنزيف.',
    hero_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'هندسة تصميم طباعي',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 20,
    seo_title: 'تصميم هوية بصرية وتجهيز ملفات الطباعة في اليمن | رواج',
    seo_description: 'خدمات تصميم الهوية البصرية وإعداد ملفات Prepress الاحترافية الخالية من الأخطاء الطباعية.',
    specification_groups: [
      {
        id: 'grp-dsg-spec',
        title_ar: 'نوع الخدمة التصميمية',
        sort_order: 1,
        fields: [
          {
            id: 'dsg-scope',
            key: 'design_scope',
            label_ar: 'نطاق العمل المطلوب',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'full_brand_book', label_ar: 'تصميم هوية بصرية شاملة + دليل الاستخدام (Brand Guidelines)', value: 'full_branding' },
              { id: 'prepress_fix', label_ar: 'تجهيز وتعديل ملفات الطباعة المجهزة مسبقاً (Prepress Check & Fix)', value: 'prepress_check' },
              { id: 'packaging_die_line', label_ar: 'رسم وسحب خطوط الداي لاين للعلب والتغليف (3D Dieline)', value: 'dieline_drawing' },
            ],
          },
        ],
      },
    ],
    highlights: [
      { id: 'h1', title_ar: 'ملفات متجهة Vector جاهزة للماكينات', description_ar: 'تضمن عدم وجود أي تشوه زوايا أو بكسلة عند التكبير.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل أحصل على الماكيت أو الملف المصدري المفتوح؟', answer_ar: 'نعم، تسلم كافة الملفات المطبوعة والمفتوحة AI/PDF المعتمدة مع الدليل.' },
    ],
    related_service_ids: ['srv-bizcards-luxury', 'srv-folding-cartons'],
    related_package_ids: ['pkg-corp-identity', 'pkg-store-launch'],
    created_at: '2026-02-26T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },
];

export const INITIAL_SERVICES: Service[] = [
  ...BASE_SERVICES,
  ...EXPANDED_SERVICES
];

const BASE_PACKAGES: Package[] = [
  {
    id: 'pkg-store-launch',
    title_ar: 'باقة افتتاح متجر وتجهيز الواجهة التجارية المتكاملة',
    title_en: 'Store Launch & Commercial Facade Package',
    slug: 'store-launch-package',
    tagline_ar: 'كل ما يحتاجه محلك التجاري من واجهة كلادينج وحروف بارزة وهوية ورقية وملصقات.',
    description_ar: 'صممت هذه الباقة لتمنح المتاجر والشركات الجديدة انطلاقة قوية تتكامل فيها الواجهة المعمارية الخارجية مع المطبوعات المكتبية وتغليف المبيعات بطلب عرض سعر موحد وإشراف فني شامل.',
    hero_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    badge: 'الباقة الأكثر شمولاً',
    featured: true,
    service_ids: [
      'srv-channel-letters',
      'srv-acp-cladding',
      'srv-bizcards-luxury',
      'srv-ncr-invoices',
      'srv-paper-bags-luxury',
      'srv-dtf-apparel',
    ],
    benefits_ar: [
      'توفير الوقت والجهد بتوحيد المورد والمسؤولية الفنية مع رواج.',
      'تناسق لوني وتطابق تام بين خامات الواجهة والمطبوعات الورقية والزي.',
      'إشراف هندسي وتنفيذي ميداني متكامل في الموقع.',
      'مرونة تخصيص مواصفات كل بند حسب طبيعة نشاطك التجاري.',
    ],
    sort_order: 1,
  },
  {
    id: 'pkg-corp-identity',
    title_ar: 'باقة الهوية المؤسسية والمطبوعات المكتبية الفاخرة',
    title_en: 'Corporate Identity & Office Stationery Package',
    slug: 'corporate-identity-package',
    tagline_ar: 'منظومة المطبوعات الرسمية والدفاتر الكربونية وبطاقات الأعمال والهدايا التنفيذية.',
    description_ar: 'باقة مخصصة للشركات، المكاتب الاستشارية، والمؤسسات التي تسعى لترسيخ حضور مهني موثوق من خلال دفاتر فواتير مؤمنة، كروت شخصية فاخرة، وهدايا ترحيبية للعملاء والشركاء.',
    hero_image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    badge: 'للشركات والمؤسسات',
    featured: true,
    service_ids: [
      'srv-bizcards-luxury',
      'srv-ncr-invoices',
      'srv-promotional-mugs',
      'srv-dtf-apparel',
    ],
    benefits_ar: [
      'طباعة رسمية بأعلى دقة ومعايير حماية المستندات المالية.',
      'تشطيبات فاخرة تليق بالمدراء واللقاءات التنفيذية.',
      'سرعة توريد وإعادة طباعة ميسرة عند نفاد الكميات.',
    ],
    sort_order: 2,
  },
  {
    id: 'pkg-food-beverage',
    title_ar: 'باقة المنتجات الغذائية والتعبئة والتغليف (F&B Pack)',
    title_en: 'Food & Beverage Packaging & Label Package',
    slug: 'food-beverage-package',
    tagline_ar: 'ملصقات الرول المقاومة للرطوبة، علب الكرتون الصحية، وأكياس التوزيع.',
    description_ar: 'مخصصة للمصانع، المعامل الغذائية، ومتاجر العسل والبهارات والمخبوزات لتوفير حلول تغليف مطابقة للمواصفات الصحية وجاذبة للمستهلك على رفوف المتاجر.',
    hero_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    badge: 'لمصانع ومتاجر الأغذية',
    featured: true,
    service_ids: [
      'srv-roll-labels',
      'srv-folding-cartons',
      'srv-paper-bags-luxury',
    ],
    benefits_ar: [
      'خامات مقاومة للرطوبة والزيوت والتبريد (Freezer-grade).',
      'توافق مع ماكينات التعبئة والتغليف الآلية.',
      'نماذج عينات فعلية لاختبار الإحكام قبل الإنتاج الكمي.',
    ],
    sort_order: 3,
  },
];

export const INITIAL_PACKAGES: Package[] = SECTOR_PACKAGES_DATA;

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj-1',
    title_ar: 'تصنيع وتنفيذ واجهة تجارية وكلادينج مع حروف بارزة مضيئة',
    client_type_ar: 'قطاع التجزئة والعطور',
    industry: 'التجزئة والتجميل',
    year: '2025',
    city: 'صنعاء',
    short_description_ar: 'تنفيذ واجهة حديثة باستخدام كلادينج ألومنيوم أسود مطفي مع حروف بارزة ستانلس ذهبي وإضاءة هالة ساحرة (Halo-lit).',
    challenge_ar: 'كانت الواجهة القديمة للمبنى غير مستوية وتحتوي على تمديدات خارجية معقدة تحتاج لعزل كامل مع مقاومة للرياح.',
    solution_ar: 'قام فريق رواج الهندسي بتثبيت هيكل حديدي مجلفن مسبق الصنع مع تسوية الليزر، وتكسية الكلادينج ببراغي مخفية وتوزيع إضاءة LED ذات كفاءة عالية IP67.',
    services_used_ids: ['srv-channel-letters', 'srv-acp-cladding'],
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
  },
  {
    id: 'proj-2',
    title_ar: 'تجليد أسطول سيارات نقل وتوزيع لشركة منتجات استهلاكية',
    client_type_ar: 'قطاع التوزيع والسلع الاستهلاكية',
    industry: 'السلع الاستهلاكية FMCG',
    year: '2025',
    city: 'صنعاء - الحوبان',
    short_description_ar: 'تغليف وتجليد كامل لأسطول مكون من 18 شاحنة وفان توزيع باستخدام فينيل كاست كروي مع سلفنة حماية UV.',
    challenge_ar: 'ضرورة المحافظة على دقة الألوان الحية للشعار التجاري عبر أسطح شاحنات متباينة الأشكال والانحناءات وتحمل الغسيل الأسبوعي.',
    solution_ar: 'تمت معايرة الألوان بأحدث برامج إدارة الألوان Prepress واستخدام فينيل كاست عالي التمدد مع طبقة سلفنة حماية مصفحة تقاوم الخدوش وأشعة الشمس.',
    services_used_ids: ['srv-vehicle-wraps'],
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
  },
  {
    id: 'proj-3',
    title_ar: 'تطوير وتوريد دفاتر فواتير وسندات كربونية NCR مؤمنة لمجموعة تجارية',
    client_type_ar: 'مجموعة شركات استيراد وتوزيع',
    industry: 'التجارة والخدمات اللوجستية',
    year: '2025',
    city: 'صنعاء',
    short_description_ar: 'طباعة وتجليد أكثر من 2000 دفتر فواتير وسندات صرف متعددة النسخ بترقيم تسلسلي بارز وغلاف كرتوني عازل.',
    challenge_ar: 'منع تكرار الأرقام المحاسبية وضمان سرعة التسليم لأقسام الحسابات في عدة فروع.',
    solution_ar: 'نظام مراقبة الترقيم الرقمي مع فحص جودة الورق الكربوني الأصلي والتغليف الحراري المحكم لكل 10 دفاتر.',
    services_used_ids: ['srv-ncr-invoices'],
    images: [
      'https://images.unsplash.com/photo-1554415707-9e49016a3e06?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-dtf-vs-dtg',
    title_ar: 'مقارنة فنية شاملة: الفرق بين تقنية DTF و DTG وسلك سكرين لطباعة الملابس',
    slug: 'dtf-vs-dtg-screen-printing-guide',
    category_ar: 'دليل الطباعة والمنسوجات',
    read_time_minutes: 6,
    publish_date: '2026-02-15',
    hero_image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    excerpt_ar: 'دليل فني يستعرض الفروقات الجوهرية في ثبات الألوان، التكلفة للكميات الصغيرة والكبيرة، وتوافق الأقمشة بين تقنيات الطباعة الحديثة.',
    content_markdown_ar: `
### مقدمة في تكنولوجيا طباعة الأقمشة
شهدت صناعة طباعة الملابس نقلة نوعية خلال السنوات الأخيرة بفضل دخول تقنية **Direct-to-Film (DTF)** التي جمعت بين المرونة الفائقة والقدرة على الطباعة على مختلف أنواع الأقمشة الداكنة والفاتحة والقطنية والبوليستر.

#### 1. تقنية Direct-to-Film (DTF)
- **آلية العمل:** طباعة الحبر على فيلم خاص ثم رش بودرة هوت ملت بوليمر وتجفيفها حرارياً قبل الكبس على القماش.
- **المميزات:** ألوان حيوية جداً، قدرة على طباعة تفاصيل دقيقة جداً، تكلفة ممتازة للكميات الصغيرة والمتوسطة، ومقاومة عالية للغسيل المتكرر.
- **الاستخدام الأمثل:** التيشيرتات الملونة، الشعارات المعقدة، والزي الموحد.

#### 2. تقنية Direct-to-Garment (DTG)
- **آلية العمل:** رش الحبر مباشرة في مسام ألياف القماش مثل طابعة الورق العادية.
- **المميزات:** ملمس قماشي ناعم جداً لا يشعر به اللابس.
- **القيود:** تتطلب أقمشة قطنية 100% ومعالجة مسبقة قبل الطباعة، وتكلفتها أعلى نسبياً.

#### 3. الطباعة الحريرية التقليدية (Screen Printing)
- **آلية العمل:** استخدام شابلونات حريرية لتمرير الحبر لوناً تلو الآخر.
- **الاستخدام الأمثل:** الكميات الضخمة جداً (فوق 500 قطعة) ذات الألوان القليلة المحددة (1-3 ألوان).
    `,
    published: true,
    tags_ar: ['طباعة ملابس', 'DTF', 'منسوجات', 'نصائح فنية'],
  },
  {
    id: 'post-bopp-labels',
    title_ar: 'متى تختار ملصقات الـ BOPP البلاستيكية بدلاً من الورق العادي لمنتجاتك؟',
    slug: 'bopp-vs-paper-labels-guide',
    category_ar: 'دليل الخامات والليبل',
    read_time_minutes: 5,
    publish_date: '2026-02-20',
    hero_image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    excerpt_ar: 'تعرف على الخصائص الميكانيكية والكيميائية لملصقات BOPP ومقاومتها للماء والزيوت والتجميد مقارنة بالملصقات الورقية التقليدية.',
    content_markdown_ar: `
### ما هو الـ BOPP؟
يرمز **BOPP** إلى *Biaxially-Oriented Polypropylene*، وهو فيلم بلاستيكي ممدد في اتجاهين يمنحه قوة شد استثنائية ومقاومة تامة للسوائل.

#### متى يجب استخدام ملصقات BOPP؟
1. **المنتجات المبردة والمجمدة:** مثل العصائر والألبان والمثلجات حيث تتشكل قطرات الندى وتكثف الرطوبة التي تؤدي لتمزق الورق العادي.
2. **الزيوت والشحوم:** مثل زيوت المحركات، زيوت الطهي، ومستحضرات التجميل الزيتية.
3. **العبوات القابلة للضغط (Squeezable Bottles):** كعبوات الشامبو والصلصات التي تنثني دون أن يتشقق الملصق.

#### متى يكون الورق العادي خياراً أفضل؟
- المنتجات الجافة على الرفوف (الشاي، البسكويت، الأدوية الجافة).
- عند الرغبة في مظهر كلاسيكي طبيعي أو ملمس ورقي بيئي (Rustic/Kraft look).
- في الميزانيات الاقتصادية للحملات المؤقتة.
    `,
    published: true,
    tags_ar: ['ليبل', 'BOPP', 'تغليف', 'خامات'],
  },
  {
    id: 'post-cast-vs-polymeric-vinyl',
    title_ar: 'ما الفرق بين الفينيل الكاست (Cast) والبوليمريك (Polymeric) في تجليد السيارات؟',
    slug: 'cast-vs-polymeric-vinyl-wraps',
    category_ar: 'الطباعة الكبيرة والفينيل',
    read_time_minutes: 7,
    publish_date: '2026-03-01',
    hero_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    excerpt_ar: 'شرح فني لكيفية تصنيع أفلام الفينيل ولماذا يعتبر الفينيل الكاست الخيار الوحيد لتغليف انحناءات ومقابض المركبات دون انكماش.',
    content_markdown_ar: `
### الفرق الجوهري في طريقة التصنيع
- **فينيل كاست (Cast Vinyl):** يصب سائلاً على شريط متحرك ويجفف بدون إجهاد ميكانيكي (مثل خبز الكيك). النتيجة: فيلم رفيع جداً (50-60 ميكرون) ليس له ذاكرة تمدد، فلا ينكمش مطلقاً بعد التسخين والتشكيل في المنحدرات العميقة.
- **فينيل كالندر (Polymeric Calendered):** يمرر عبر بكرات ضغط ميكانيكية عملاقة لتسطيحه. النتيجة: فيلم أكثر سماكة (75-100 ميكرون) يميل للانكماش البسيط مع الوقت إذا تعرض لحرارة شمس شديدة.

### التوصية الفنية من رواج
- للتغليف الكامل للمركبات التي تحتوي على تجاويف ومقابض معقدة: **اختر دائماً Cast Vinyl مع سلفنة Cast مطابقة**.
- للأسطح المستوية كصناديق الشاحنات المسطحة واللوحات الإعلانية: **Polymeric Vinyl خيار اقتصادي وممتاز جداً وعمره يتجاوز 3-5 سنوات**.
    `,
    published: true,
    tags_ar: ['تجليد سيارات', 'فينيل', 'كاست', 'نصائح'],
  },
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  company_name_ar: 'رواج للطباعة والإعلان والديكور',
  company_name_en: 'Rawaj Printing, Advertising & Decoration',
  slogan_ar: 'شريكك الاستراتيجي في الإنتاج الطباعي والتغليف واللوحات الإعلانية',
  slogan_en: 'Your Strategic Partner in Print Production & Signage',
  logo_url: '/src/assets/images/rawaj_hero_storefront_1790822521342.jpg',
  founding_year: 2008,
  phone: '01-202439',
  mobile_whatsapp: '+967772110131',
  email: 'rawaj2008@gmail.com',
  address_ar: 'صنعاء - الدائري - جولة الجامعة الجديدة - بداية شارع العدل',
  working_hours_ar: 'السبت - الخميس: 8:00 صباحاً - 9:00 مساءً | الجمعة مغلق',
  company_profile_pdf_url: 'https://rawaj.com/rawaj-profile-2026.pdf',
  announcement_banner: {
    enabled: true,
    text_ar: 'رواج: المنصة المتخصصة لخدمات الطباعة والتوريد واللوحات — اطلب عرض سعرك الفني الآن بكل سهولة.',
  },
};

export const INITIAL_HOME_SLIDES: HomeSlide[] = [
  {
    id: 'slide-1',
    title_ar: 'عالم الطباعة والإنتاج الإعلاني الفاخر',
    subtitle_ar: 'وكالة رواج شريككم المتخصص في الطباعة التجارية، التغليف، اللوحات الإعلانية وتجهيز المعارض منذ 2008.',
    badge_ar: 'وكالة رواج الرسمية',
    image_url: '/src/assets/images/rawaj_hero_storefront_1790822521342.jpg',
    button_text_ar: 'تعرف على رواج والقصة',
    secondary_button_text_ar: 'طلب عرض سعر سريع',
    target_view: 'about-contact',
    secondary_target_view: 'custom-quote',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'slide-2',
    title_ar: 'التغليف الفاخر وعلب الهدايا المقواة',
    subtitle_ar: 'علب كرتونية صلبة فاخرة باللون الأسود والذهبي مع بصمة حرارية ومغناطيس، مصممة لأرقى المتاجر والعطور.',
    badge_ar: 'كتالوج التغليف الفاخر',
    image_url: '/src/assets/images/luxury_packaging_showcase_1790822533141.jpg',
    button_text_ar: 'استكشف متجر الخدمات',
    secondary_button_text_ar: 'تصفح الأقسام الـ 12',
    target_view: 'services',
    secondary_target_view: 'departments',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'slide-3',
    title_ar: 'بطاقات الأعمال الفاخرة والكروت الشخصية',
    subtitle_ar: 'كروت شخصية بأسطح ملمسية فاخرة وبصمة معدنية بارزة وحواف مذهبة تعكس أناقة مؤسستك.',
    badge_ar: 'سجل المراسلات والهدايا',
    image_url: '/src/assets/images/business_cards_showcase_1790822543850.jpg',
    button_text_ar: 'تصفح معرض الأعمال',
    secondary_button_text_ar: 'باقات المشاريع الجاهزة',
    target_view: 'portfolio',
    secondary_target_view: 'packages',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'slide-4',
    title_ar: 'تجهيز المعارض والمؤتمرات الكبرى',
    subtitle_ar: 'أجنحة معارض حديثة، رول أب مضيء، وبوب أب بمعايير هندسية متقدمة تضمن لشركتك حضوراً استثنائياً.',
    badge_ar: 'حلول المعارض والمؤتمرات',
    image_url: '/src/assets/images/exhibition_booth_showcase_1790822553791.jpg',
    button_text_ar: 'طلب تسعير خاص وتوريد',
    secondary_button_text_ar: 'استشارة فنية عبر واتساب',
    target_view: 'custom-quote',
    sort_order: 4,
    is_active: true,
  },
];

export const INITIAL_HERO_HEADER_SETTINGS: HeroHeaderSettings = {
  enabled: true,
  company_name_ar: 'رواج للطباعة والإعلان والديكور',
  company_name_en: 'Rawaj Printing, Advertising & Decor',
  slogan_ar: 'صناع الهوية البصرية وهندسة التغليف والطباعة الفاخرة',
  welcome_title_ar: 'المظلة الإنتاجية الأولى لحلول الطباعة، الواجهات، التغليف والمعارض',
  welcome_subtitle_ar: 'أكثر من 18 عاماً من الريادة الصناعية والتنفيذ الهندسي الدقيق لخدمة كبرى الشركات والمؤسسات.',
  badge_ar: 'المنصة الذكية للإنتاج والتسويق الطباعي 2026',
  bg_image_url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1920&q=80',
  primary_cta_text_ar: 'احسب تسعيرك الفوري',
  secondary_cta_text_ar: 'استكشف كتالوج الخدمات',
  preferred_dimensions_ar: 'المقاس الموصى به: 1920×800 بكسل للشاشات العريضة، و1080×1080 بكسل للجوال (نسبة 16:9 أو 4:3)',
};

export const INITIAL_MARQUEE_ITEMS: MarqueeTickerItem[] = [
  {
    id: 'mrq-1',
    text_ar: 'فحص واعتماد ملفات Prepress الفنية مجاناً قبل بدء الطباعة لتفادي أي هدر',
    category: 'special_offer',
    badge_ar: 'عرض مميز',
    icon: 'ShieldCheck',
    link_view: 'services',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'mrq-2',
    text_ar: 'افتتاح خط إنتاج علب الكرتون الفاخر Rigid Boxes والملصقات الرول BOPP لمصانع الأغذية والأدوية',
    category: 'news',
    badge_ar: 'أخبار رواج',
    icon: 'Sparkles',
    link_view: 'departments',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'mrq-3',
    text_ar: 'تسليم قياسي مع التزام صارم بمواعيد التدشين والافتتاحات الرسمية والمؤتمرات',
    category: 'marketing',
    badge_ar: 'التزامنا',
    icon: 'Clock',
    link_view: 'about-contact',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'mrq-4',
    text_ar: 'خصومات حصرية للشركات والمؤسسات على باقات تجهيز الفروع والمعارض الجديدة',
    category: 'special_offer',
    badge_ar: 'باقات قطاعية',
    icon: 'Tag',
    link_view: 'packages',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'mrq-5',
    text_ar: 'أحدث خطوط طباعة الـ UV Spot 3D والبصمة الحرارية الذهبية والفضية الفاخرة',
    category: 'announcement',
    badge_ar: 'تقنية حصرية',
    icon: 'Layers',
    link_view: 'services',
    is_active: true,
    sort_order: 5,
  },
  {
    id: 'mrq-6',
    text_ar: 'أكثر من 14,000 مشروع منجز بثقة أكثر من 2,800 عميل وشريك نجاح منذ 2008',
    category: 'marketing',
    badge_ar: 'إنجازات',
    icon: 'Award',
    link_view: 'portfolio',
    is_active: true,
    sort_order: 6,
  },
];

export const INITIAL_ABOUT_US_DATA: AboutUsModuleData = {
  gm_name_ar: 'م. سكندر مهيوب',
  gm_title_ar: 'المدير العام ومؤسس وكالة رواج',
  gm_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  gm_quote_ar: '«انطلقنا في رواج عام 2008 بإيمان عميق بأن الطباعة ليست مجرد حبر على ورق، بل هي تجسيد ملموس لقيمة علامتك التجارية في أذهان عملائك. نضع خبرتنا وتقنياتنا لضمان خروج كل تفصيل بأعلى درجات الإتقان والتميز.»',
  goal_ar: 'تمكين المؤسسات والشركات ورواد الأعمال من امتلاك حضور بصري وطباعي استثنائي ينافس المقاييس العالمية من خلال أحدث خطوط الإنتاج والحلول التوريدية المتكاملة.',
  vision_ar: 'أن تكون رواج الوجهة الأولى والمرجع الرائد في الشرق الأوسط لحلول الطباعة الرقمية والأوفست، هندسة التغليف، وتصنيع اللوحات والديكور الإعلاني المتكامل.',
  mission_ar: 'تقديم خدمات طباعية وإنتاجية متكاملة تدمج بين الدقة الهندسية، الإبداع البصري، والالتزام الصارم بمواعيد التسليم ومعايير الجودة العالمية مع توفير أسعار تنافسية.',
  profile_pdf_url: 'https://rawaj.com/rawaj-profile-2026.pdf',
  years_experience: 18,
  completed_projects_count: '+14,000',
  happy_clients_count: '+2,800',
};

export const INITIAL_RAWAJ_FEATURES: RawajFeature[] = [
  {
    id: 'feat-1',
    title_ar: 'أحدث خطوط الإنتاج والطباعة',
    description_ar: 'مكائن أوفست حديثة، طابعات رقمية عالية الكثافة، وطابعات UV مسطحة ورول بتقنيات ألمانية ويابانية متقدمة.',
    icon: 'Printer',
    badge_ar: 'تقنية فائقة',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'feat-2',
    title_ar: 'التزام صارم بمواعيد التسليم',
    description_ar: 'نظام إدارة إنتاج وجدولة دقيقة يضمن وصول مطبوعاتك ومشاريعك في الموعد المحدد دون أي تأخير.',
    icon: 'Clock',
    badge_ar: 'دقة المواعيد',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'feat-3',
    title_ar: 'فحص جودة Prepress مجاني',
    description_ar: 'فريق متخصص يراجع قياسات الألوان CMYK، هوامش القص والنزيف بدقة قبل الطباعة لتفادي أي هدر.',
    icon: 'ShieldCheck',
    badge_ar: 'ضمان الجودة',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'feat-4',
    title_ar: 'توريد محلي ودولي مباشر',
    description_ar: 'تصنيع محلي فوري وشبكة مصانع معتمدة إقليمياً ودولياً للتوريد الصناعي للكميات الكبرى والمواصفات المعقدة.',
    icon: 'Globe',
    badge_ar: 'قدرات توريد',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'feat-5',
    title_ar: 'تشطيبات فاخرة وتأثيرات خاصة',
    description_ar: 'بصمة حرارية، ورنيش موضعي ثلاثي الأبعاد Spot UV 3D، كوفراج بارز، وسلوفان مخملي سوفت تاتش.',
    icon: 'Sparkles',
    badge_ar: 'لمسات فاخرة',
    is_active: true,
    sort_order: 5,
  },
  {
    id: 'feat-6',
    title_ar: 'تسعير مؤسسي واستشارات مجانية',
    description_ar: 'عروض أسعار تفصيلية شفافة، عينات خامات مسبقة، وخصومات مجزية للمشاريع الكبيرة والتعاقدات السنوية.',
    icon: 'Award',
    badge_ar: 'عروض مؤسسية',
    is_active: true,
    sort_order: 6,
  },
];

export const INITIAL_CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'cli-1',
    name_ar: 'مجموعة هائل سعيد أنعم',
    logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'الصناعات الغذائية والتجارية',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'cli-2',
    name_ar: 'بنك الكريمي للتمويل الأصغر',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'القطاع المصرفي والمالي',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'cli-3',
    name_ar: 'شركة يمن موبايل للهاتف النقال',
    logo_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'الاتصالات وتقنية المعلومات',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'cli-4',
    name_ar: 'شركة يو للاتصالات YOU',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'الاتصالات الرقمية',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'cli-5',
    name_ar: 'سلسلة مطاعم وكافيهات رويال',
    logo_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'الضيافة والمطاعم',
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'cli-6',
    name_ar: 'مستشفى الدكتور عبد القادر المتوكل',
    logo_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'الرعاية الصحية والمستشفيات',
    sort_order: 6,
    is_active: true,
  },
  {
    id: 'cli-7',
    name_ar: 'شركة سبأ فارما للأدوية',
    logo_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'الأدوية والمستلزمات الطبية',
    sort_order: 7,
    is_active: true,
  },
  {
    id: 'cli-8',
    name_ar: 'معارض قصر العطور والعود',
    logo_url: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=300&q=80',
    industry_ar: 'العطور ومستحضرات التجميل',
    sort_order: 8,
    is_active: true,
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    client_name_ar: 'أ. عادل القحطاني',
    client_title_ar: 'مدير التسويق والعلامة التجارية',
    client_company_ar: 'سلسلة مقاهي أروما كافيه',
    client_avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment_ar: '«تعاملنا مع رواج في تجهيز علب وأكواب التغليف وهوية 4 فروع جديدة. الدقة في مطابقة ألوان البانتون وجودة التشطيب المخملي فاقت كل توقعاتنا، مع الالتزام التام بالتسليم قبل موعد الافتتاح الرسمي.»',
    rating: 5,
    project_type_ar: 'تغليف وهوية مقاهي',
    status: 'approved',
    created_at: '2026-02-10T10:00:00Z',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'test-2',
    client_name_ar: 'د. طارق الحكيمي',
    client_title_ar: 'رئيس قسم المشتريات والتوريد',
    client_company_ar: 'المجموعة الوطنية للصناعات الدوائية',
    client_avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    comment_ar: '«رواج هي شريكنا الدائم لطباعة نشرات الأدوية وعبوات الكرتون الدوائي المعتمد. جودة الورق ودقة الخطوط والباركود ممتازة وتتوافق مع أعلى معايير الصناعة الدوائية العالمية.»',
    rating: 5,
    project_type_ar: 'علب ونشرات دوائية',
    status: 'approved',
    created_at: '2026-02-15T12:00:00Z',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'test-3',
    client_name_ar: 'م. خالد الصبري',
    client_title_ar: 'المدير التنفيذي',
    client_company_ar: 'شركة أفق للحلول الرقمية',
    client_avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment_ar: '«نفذت لنا رواج واجهة الكلادينج والحروف البارزة المضيئة لمبنى الشركة الرئيسي مع كافة المطبوعات المكتبية. دقة التنفيذ على أرض الواقع كانت مطابقة للمجسم ثلاثي الأبعاد بنسبة 100%.»',
    rating: 5,
    project_type_ar: 'واجهات وحروف بارزة مضيئة',
    status: 'approved',
    created_at: '2026-02-20T14:30:00Z',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'test-4',
    client_name_ar: 'أ. ريم الشرجبي',
    client_title_ar: 'مديرة الفعاليات والمؤتمرات',
    client_company_ar: 'مؤسسة التنمية والاستثمار',
    client_avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    comment_ar: '«في مؤتمرنا السنوي كنا بحاجة لأكثر من 50 استاند و1000 حقيبة مؤتمر مع كتيبات تقارير فاخرة خلال 48 ساعة فقط. فريق رواج عمل على مدار الساعة وسلم كل شيء بأعلى جودة واحترافية.»',
    rating: 5,
    project_type_ar: 'مطبوعات وهدايا المؤتمرات',
    status: 'approved',
    created_at: '2026-02-25T09:15:00Z',
    sort_order: 4,
    is_active: true,
  },
];

export const INITIAL_PROMO_SETTINGS: PromoModuleSettings = {
  enabled: true,
  title_ar: 'العروض الترويجية والخصومات الحصرية',
  subtitle_ar: 'حملات تخفيض وعروض تسويقية استثنائية على طلبيات التوريد الكبرى وعقود الإنتاج.',
  layout: 'carousel',
  autoplay_speed: 5000,
  bg_shade: 'royal_crimson',
  carousel_style: 'full_hero',
  banners: [
    {
      id: 'prm-annual-contract-discount',
      title_ar: 'خصم ٢٥٪ على عقود التوريد السنوية والكميات الكبرى',
      subtitle_ar: 'وفّر ميزانية مطبوعات وتغليف شركتك بتعاقد توريد سنوي منتظم مع تثبيت الأسعار وأولوية التشغيل والتسليم المجدول لكافة الفروع.',
      badge_ar: 'خصم ٢٥٪ سنوي',
      discount_tag: 'خصم 25% حصري',
      valid_until: 'متاح للشركات والمؤسسات والجهات الحكومية',
      highlights: [
        'تثبيت الأسعار وتفادي تقلبات السوق طوال العام',
        'أولوية تشغيل قصوى في خطوط الإنتاج السريعة',
        'شحن وتوصيل مجاني لكافة فروع ومستودعات الشركة'
      ],
      image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      cta_text_ar: 'طلب تعاقد وتثبيت أسعار',
      link_view: 'custom-quote',
      is_active: true,
      sort_order: 1,
    },
    {
      id: 'prm-free-3d-site-survey',
      title_ar: 'معاينة ميدانية ورفع مقاسات ليزري مع تصميم 3D مجاني',
      subtitle_ar: 'قبل التعاقد على أي واجهة تجارية أو ديكور أو بوث معرض؛ يزورك فريقنا الهندسي مجاناً لرفع المقاسات وتقديم ماكيت ثلاثي الأبعاد.',
      badge_ar: 'خدمة مجانية 100%',
      discount_tag: 'معاينة 3D مجانية',
      valid_until: 'للمحلات والمنشآت والمشاريع الجديدة',
      highlights: [
        'رفع مقاسات دقيق بالليزر لموقع المشروع',
        'ماكيت ثلاثي الأبعاد 3D تفاعلي قبل بدء التصنيع',
        'تقرير فني واختيار أفضل الخامات المناسبة للميزانية'
      ],
      image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      cta_text_ar: 'حجز موعد معاينة هندسية',
      link_view: 'custom-quote',
      is_active: true,
      sort_order: 2,
    },
    {
      id: 'prm-launch-free-installation',
      title_ar: 'شحن وتركيب ميداني مجاني لكافة واجهات ومشاريع الافتتاح',
      subtitle_ar: 'احصل على خدمة الشحن والتركيب الاحترافي الميداني مجاناً مع إشراف هندسي وفحص تمديدات الإنارة وضمان شامل لمدة عامين.',
      badge_ar: 'عرض الافتتاح التجاري',
      discount_tag: 'شحن وتركيب مجاني',
      valid_until: 'ساري عند اعتماد طلبيات التجهيز الكامل',
      highlights: [
        'فريق تركيبات هندسي متخصص ومعتمد في الموقع',
        'اختبار آمن لتمديدات الكهرباء والإنارة',
        'ضمان ذهبي شامل وصيانة مجانية لمدة عامين'
      ],
      image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      cta_text_ar: 'استفد من عرض الشحن والتركيب',
      link_view: 'custom-quote',
      is_active: true,
      sort_order: 3,
    },
  ],
};

export const INITIAL_FAQ_ITEMS: GlobalFAQItem[] = [
  {
    id: 'faq-1',
    category_ar: 'الطباعة والتصاميم',
    question_ar: 'كيف أضمن تطابق ألوان الشعار بدقة بين الشاشة والمطبوعات الفعلية؟',
    answer_ar: 'في رواج نستخدم نظام مطابقة ألوان Pantone المعتمد عالمياً بالإضافة إلى فحص مساحات الألوان CMYK وتزويدكم بعينة طباعية رقمية حية (Hard Proof) لاعتمادها قبل تشغيل كميات الأوفست الكبرى.',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'faq-2',
    category_ar: 'مواعيد التسليم',
    question_ar: 'ما هي المدة المستغرقة لتنفيذ وتسليم الطلبات والمشاريع؟',
    answer_ar: 'تتراوح مدة التنفيذ للمطبوعات الرقمية والملصقات السريعة بين 24 إلى 48 ساعة، بينما تستغرق مطبوعات الأوفست الكبيرة والتغليف والعلب من 3 إلى 7 أيام عمل، وتحدد مواعيد اللوحات والواجهات المعمارية بناءً على المخطط الهندسي.',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'faq-3',
    category_ar: 'الخامات والمواصفات',
    question_ar: 'هل توفر رواج خدمة توفير عينات خامات ملموسة (Swatch Kit) قبل التعاقد؟',
    answer_ar: 'نعم، نوفر حقيبة عينات خامات متكاملة للشركات والمصانع تشمل نماذج أوزان الورق، خامات الكرتون الدوبلكس والكرتون المضلع، عينات السلوفان اللامع والمطفي والمخملي، والبصمات الذهبية والفضية والـ Spot UV.',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'faq-4',
    category_ar: 'طرق الدفع والتوريد',
    question_ar: 'ما هي تسهيلات الدفع والتعاقد المتوفرة للمؤسسات والشركات؟',
    answer_ar: 'نقدم عقود توريد سنوية ميسرة للمؤسسات الكبرى، مع إمكانية الدفع بالتحويل البنكي الرسمي، الشيكات المعتمدة، أو أنظمة المحافظ الإلكترونية، ونظام الدفعات المرتبط بمراحل التسليم للمشاريع الهندسية.',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'faq-5',
    category_ar: 'الطباعة والتصاميم',
    question_ar: 'ما هي الصيغ والامتدادات المفضلة لتسليم ملفات التصميم؟',
    answer_ar: 'نفضل استلام الملفات بصيغ PDF عالية الجودة (Press Quality / PDF/X-1a) أو ملفات المصدر Illustrator (AI) أو Photoshop (PSD) مع تحويل النصوص إلى Outlines وضبط الألوان على نظام CMYK بدقة لا تقل عن 300 DPI.',
    sort_order: 5,
    is_active: true,
  },
];

export const INITIAL_FOOTER_SETTINGS: FooterSettings = {
  logo_url: '',
  company_name_ar: 'وكالة رواج للطباعة والإعلان والديكور',
  slogan_ar: 'صناع الهوية البصرية، مطابع الأوفست والديجيتال، وحلول التغليف والواجهات',
  description_ar: 'الوكالة الإنتاجية الرائدة منذ 2008 في تقديم الحلول الإعلانية والطباعية والهندسية المتكاملة لكبرى الشركات والمؤسسات والعلامات التجارية في اليمن والمنطقة.',
  phone: '+967 1 234567',
  mobile_whatsapp: '+967 772 110 131',
  email: 'info@rawaj.com',
  website: 'https://rawaj.com',
  branches: [
    {
      id: 'br-1',
      name_ar: 'المقر الرئيسي والمطابع المركزية',
      address_ar: 'اليمن - صنعاء - شارع الزبيري - جوار البنك المركزي',
      phone: '+967 772 110 131',
      is_headquarters: true,
    },
    {
      id: 'br-2',
      name_ar: 'معمل اللوحات والكلادينج والقص الليزري',
      address_ar: 'اليمن - صنعاء - شارع الستين الجنوبي - خلف المعارض المركزية',
      phone: '+967 777 654 321',
      is_headquarters: false,
    },
  ],
  social_links: {
    tiktok: 'https://tiktok.com/@rawaj.agency',
    facebook: 'https://facebook.com/rawaj.advertising',
    youtube: 'https://youtube.com/@rawajprinting',
    instagram: 'https://instagram.com/rawaj.agency',
    whatsapp_channel: 'https://whatsapp.com/channel/rawaj',
    telegram: 'https://t.me/rawaj_agency',
    snapchat: 'https://snapchat.com/add/rawaj.agency',
  },
  copyright_text_ar: 'جميع الحقوق محفوظة © 2026 وكالة رواج للطباعة والإعلان والديكور.',
  powered_by_ar: 'منظومة رواج الذكية للإنتاج والتسويق الطباعي',
  show_quick_links: true,
  show_policies: true,
};

export const INITIAL_HOME_MODULES_CONFIG: HomeModuleConfig[] = [
  {
    id: 'header_hero',
    name_ar: 'الهيدر القابل للطي (Hero Header)',
    description_ar: 'هيدر سينمائي ترحيبي عريض يتحول لشريط مثبت عند التمرير',
    is_visible: true,
    sort_order: 1,
    badge_ar: 'الهيدر والترحيب',
    layout_style: 'industrial_console',
    available_layouts: [
      { id: 'industrial_console', name_ar: 'كونسول رادار صناعي (الافتراضي)', description_ar: 'شعار نبضي فخم ورادار تشغيلي وأجهزة قياس مباشرة' },
      { id: 'split_hero', name_ar: 'هيرو كلاسيكي منقسم', description_ar: 'نصوص عريضة على اليمين وشاشة تفاعلية بصرية على اليسار' },
      { id: 'minimal_search', name_ar: 'شريط ترحيبي عريض مع بحث فوري', description_ar: 'محرك بحث ومسارات وصول مباشر للكتالوج' }
    ]
  },
  {
    id: 'slider',
    name_ar: 'السلايدر السينمائي الفاخر',
    description_ar: 'سلايدر متحرك مخصص للجوال والشاشات مع تحكم بالشرائح والزمن',
    is_visible: true,
    sort_order: 2,
    badge_ar: 'السلايدر الترويجي',
    layout_style: 'full_cinematic',
    available_layouts: [
      { id: 'full_cinematic', name_ar: 'سلايدر سينمائي بملء الشاشة', description_ar: 'عرض بانورامي ممتد للشرائح مع أزرار التنقل' },
    ]
  },
  {
    id: 'marquee',
    name_ar: 'الشريط النصي المتحرك (Marquee Ticker)',
    description_ar: 'شريط أخبار وعروض وتنبيهات متحرك بأيقونات تصنيف مميزة',
    is_visible: true,
    sort_order: 3,
    badge_ar: 'شريط الأخبار',
    layout_style: 'crimson_pulse',
    available_layouts: [
      { id: 'crimson_pulse', name_ar: 'شريط قرمزي نبضي عريض', description_ar: 'أحمر داكن مع هوية رواج وعناصر مضيئة' },
    ]
  },
  {
    id: 'calculator',
    name_ar: 'حاسبة التسعير السريع الفوري',
    description_ar: 'أداة حساب مواصفات المطبوعات والتحويل المباشر لواتساب والسلة',
    is_visible: true,
    sort_order: 4,
    badge_ar: 'حاسبة التسعير',
    layout_style: 'interactive_card',
    available_layouts: [
      { id: 'interactive_card', name_ar: 'بطاقة حاسبة تفاعلية متكاملة', description_ar: 'اختيار المنتج، الكمية، والتشطيب مع تسعير تقديري فوري' },
    ]
  },
  {
    id: 'services_catalog',
    name_ar: 'كاتلوج خدمات رواج التفاعلي',
    description_ar: 'كاروسال منزلق لأكثر من 10 بطاقات لكل تصنيف وزر عرض الكل',
    is_visible: true,
    sort_order: 5,
    badge_ar: 'كتالوج الخدمات',
    layout_style: 'carousel_store',
    available_layouts: [
      { id: 'carousel_store', name_ar: 'متجر الكتالوج المنزلق بالأقسام', description_ar: 'تبويبات تصنيف مع كاروسيل منتجات وزر تفاصيل وطلب' },
      { id: 'grid_all', name_ar: 'شبكة كروت الخدمات الشاملة', description_ar: 'شبكة متراصة 4 أعمدة تغطي كافة المنتجات مع فلاتر سريعة' },
      { id: 'most_requested', name_ar: 'شبكة الخدمات الأكثر طلباً', description_ar: 'تسليط الضوء على المنتجات الأكثر مبيعاً والأعلى تقييماً' }
    ]
  },
  {
    id: 'sector_packages',
    name_ar: 'باقات مخصصة للقطاعات المتنوعة',
    description_ar: 'باقات تجهيز الفروع والمقاهي والشركات بتصميم تسويقي مميز',
    is_visible: true,
    sort_order: 6,
    badge_ar: 'باقات القطاعات',
    layout_style: 'tabs_slider',
    available_layouts: [
      { id: 'tabs_slider', name_ar: 'سلايدر الباقات مع تبويبات القطاعات', description_ar: 'باقات تأسيس مطاعم، مكاتب، ومعارض مع تبديل سلس' },
    ]
  },
  {
    id: 'why_us',
    name_ar: 'ما يميزنا (أرقام وإمكانيات رواج)',
    description_ar: 'بطاقات أيقونية وإحصاءات رقمية لقدرات الإنتاج وجودة العمل',
    is_visible: true,
    sort_order: 7,
    badge_ar: 'ما يميز رواج',
    layout_style: 'stats_features',
    available_layouts: [
      { id: 'stats_features', name_ar: 'أرقام وإمكانيات رواج القياسية', description_ar: 'إحصاءات عملاقة مع بطاقات المميزات الأربع' },
      { id: 'workflow_steps', name_ar: 'مراحل العمل ومسار التنفيذ', description_ar: 'مخطط زمني من استقبال الملف إلى الطباعة والتركيب' },
      { id: 'sourcing_capabilities', name_ar: 'قدرات التوريد والماكينات المعتمدة', description_ar: 'استعراض أحدث طابعات وخامات ومكائن رواج الميدانية' }
    ]
  },
  {
    id: 'promo_banners',
    name_ar: 'العروض المميزة والإعلانات الترويجية',
    description_ar: 'هيرو إعلاني بشبكات عرض متنوعة (فردي، ثنائي، ثلاثي، رباعي، كاروسال)',
    is_visible: true,
    sort_order: 8,
    badge_ar: 'العروض والخصومات',
    layout_style: 'dynamic_grid',
    available_layouts: [
      { id: 'dynamic_grid', name_ar: 'شبكة العروض الديناميكية الذكية', description_ar: 'تخطيط مرن بحسب عدد البانرات المفعلة في لوحة العروض' },
    ]
  },
  {
    id: 'about_us',
    name_ar: 'من نحن (كلمة الإدارة والميثاق)',
    description_ar: 'بطاقة فاخرة لكلمة المدير العام وأوكرديون الرؤية والرسالة وتحميل البروفايل',
    is_visible: true,
    sort_order: 9,
    badge_ar: 'عن المنشأة',
    layout_style: 'executive_story',
    available_layouts: [
      { id: 'executive_story', name_ar: 'كلمة الإدارة التنفيذية وميثاق الجودة', description_ar: 'بطاقة نسيجية فاخرة مع الرؤية والرسالة وتحميل ملف الشركة' },
    ]
  },
  {
    id: 'portfolio_showcase',
    name_ar: 'معرض الأعمال والمشاريع السابقة',
    description_ar: 'دراسات حالة وتطبيقات حقيقية للوحات والتغليف والمطبوعات',
    is_visible: true,
    sort_order: 10,
    badge_ar: 'معرض الإنجازات',
    layout_style: 'case_studies',
    available_layouts: [
      { id: 'case_studies', name_ar: 'معرض دراسات الحالة مع فلاتر التصنيف', description_ar: 'عرض المشاريع الحقيقية مع العميل والمدينة والخامات المنفذة' },
      { id: 'proud_showcase', name_ar: 'كونسول المشاريع الميدانية الفاخرة', description_ar: 'معرض شاشات سينمائي للمشاريع الكبرى' },
    ]
  },
  {
    id: 'testimonials',
    name_ar: 'شهادات التقدير وتقييمات العملاء',
    description_ar: 'كاروسال لآراء العملاء ونموذج إرسال تقييم جديد مع نظام اعتماد الإدارة',
    is_visible: true,
    sort_order: 11,
    badge_ar: 'شهادات العملاء',
    layout_style: 'carousel_cards',
    available_layouts: [
      { id: 'carousel_cards', name_ar: 'كاروسيل آراء العملاء بالنجوم', description_ar: 'بطاقات تقييم مع اقتباسات العملاء وخاصية التقييم الجديد' },
    ]
  },
  {
    id: 'brands_partners',
    name_ar: 'العلامات التجارية وشركاء النجاح',
    description_ar: 'شريط شعارات تفاعلي (ملون / أبيض وأسود / تقييمات)',
    is_visible: true,
    sort_order: 12,
    badge_ar: 'شركاء النجاح',
    layout_style: 'colored_ticker',
    available_layouts: [
      { id: 'colored_ticker', name_ar: 'شريط شعارات متحرك بالألوان الأصلية', description_ar: 'حركة لا نهائية سلسة لشعارات الشركاء' },
    ]
  },
  {
    id: 'blog_hub',
    name_ar: 'المدونة ودليل الخامات المتخصص',
    description_ar: 'مقالات وأدلة فنية لاختيار الورق والتشطيبات والمقاسات',
    is_visible: true,
    sort_order: 13,
    badge_ar: 'المدونة والمعرفة',
    layout_style: 'knowledge_highlights',
    available_layouts: [
      { id: 'knowledge_highlights', name_ar: 'دليل الخامات والمقالات الموصى بها', description_ar: 'بطاقات فنية مرجعية للعملاء مع زر قراءة الدليل كاملاً' },
    ]
  },
  {
    id: 'faq',
    name_ar: 'الأسئلة الشائعة والأجوبة الفنية',
    description_ar: 'أوكرديون تفاعلي للإجابة على تساؤلات التسعير، الألوان، والتسليم',
    is_visible: true,
    sort_order: 14,
    badge_ar: 'الأسئلة الشائعة',
    layout_style: 'interactive_accordion',
    available_layouts: [
      { id: 'interactive_accordion', name_ar: 'أوكرديون تفاعلي مقسم فئات', description_ar: 'تصنيفات للأسئلة الشائعة مع إمكانية فتح وإغلاق الإجابة' },
    ]
  },
  {
    id: 'contact_us',
    name_ar: 'تواصل معنا (القنوات ونموذج المراسلة)',
    description_ar: 'أزرار واتساب، اتصال مباشر، ماسنجر، ونموذج إرسال رسالة مباشر للبريد الداخلي',
    is_visible: true,
    sort_order: 15,
    badge_ar: 'تواصل فوري',
    layout_style: 'full_channels_form',
    available_layouts: [
      { id: 'full_channels_form', name_ar: 'قنوات الاتصال المباشرة + نموذج المراسلة', description_ar: 'نموذج إرسال سريع + أزرار واتساب وهاتف وموقع المقر' },
    ]
  },
];

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'rawaj_crimson_gold',
    name_ar: 'هوية مطابع رواج الملكية المعتمدة (الأحمر القرمزي والذهبي)',
    name_en: 'Rawaj Official Royal Crimson & Gold',
    primary_color: '#B9142D',
    primary_hover: '#951126',
    secondary_bg: '#12100F',
    accent_color: '#D4AF37',
    preview_colors: ['#B9142D', '#D4AF37', '#12100F', '#FAF8F5']
  }
];

export const INITIAL_THEME_SETTINGS: ThemeCustomizerSettings = {
  theme_mode: 'light',
  color_preset_id: 'rawaj_crimson_gold',
  primary_color: '#B9142D',
  primary_hover: '#951126',
  secondary_bg: '#12100F',
  accent_color: '#D4AF37',
  card_surface_style: 'solid',
  background_pattern: 'grid',
  glow_intensity: 70,
  arabic_font: 'tajawal',
  border_radius: 'rounded-2xl',
  header_style: 'collapsible_hero',
};

export const INITIAL_CONTACT_MESSAGES: ContactFormMessage[] = [
  {
    id: 'msg-1',
    name: 'م. بسام الشميري',
    phone: '+967 771 234 567',
    email: 'bassam@example.com',
    service_interest: 'تجهيز واجهات كلادينج وحروف مضيئة',
    message: 'نود تجهيز فرع جديد في صنعاء ونحتاج زيارة ميدانية لمعاينة المقاسات واقتراح أنسب المواد للواجهة.',
    created_at: '2026-02-28T11:20:00Z',
    status: 'unread',
  },
];



export const INITIAL_USERS: User[] = [
  {
    id: 'usr-owner-1',
    name: 'م. سكندر / الإدارة العامة',
    email: 'skandermahyoub@gmail.com',
    role: 'owner',
    phone: '+967 772 110 131',
    createdAt: '2026-01-01T00:00:00Z',
    isOwnerProtected: true,
  },
  {
    id: 'usr-admin-1',
    name: 'إدارة العمليات والإنتاج',
    email: 'operations@rawaj.com',
    role: 'admin',
    createdAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'usr-sales-1',
    name: 'أخصائي عروض الأسعار والتوريد',
    email: 'sales@rawaj.com',
    role: 'sales',
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'usr-designer-1',
    name: 'أحمد الشامي (مصمم هويات وتغليف)',
    email: 'designer.ahmed@rawaj.com',
    role: 'designer',
    phone: '+967 775 443 221',
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'usr-designer-2',
    name: 'سارة خالد (مصممة واجهات و3D)',
    email: 'designer.sara@rawaj.com',
    role: 'designer',
    phone: '+967 778 998 877',
    createdAt: '2026-02-10T00:00:00Z',
  },
];

export const INITIAL_DESIGN_TASKS: DesignTask[] = [
  {
    id: 'task-design-101',
    title_ar: 'تصميم دايكت وقالب علبة عطور صلبة مغناطيسية (Rigid Box)',
    client_name: 'شركة نكهة العود الفاخر - صنعاء',
    client_phone: '+967 771 998 811',
    designer_id: 'usr-designer-1',
    designer_name: 'أحمد الشامي (مصمم هويات وتغليف)',
    deadline: '2026-03-05',
    priority: 'urgent',
    status: 'proof_submitted',
    description_ar: 'إعداد خطوط القص والكسر (Dieline) لعلبة صلبة بحجم 12×12×15 سم مع قفل مغناطيسي، وتجهيز طبقة الفويل الذهبي البارز والسبوت يو في على غلاف العلبة.',
    dimensions_notes: 'المقاس المغلق: 120×120×150 ملم. يرجى ترك نزيف Bleed 5 ملم داير المدار.',
    required_format: 'Adobe Illustrator Vector (AI + PDF Print CMYK 300DPI)',
    brief_file_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    proof_versions: [
      {
        id: 'proof-v1',
        version_number: 1,
        preview_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
        file_name: 'Perfume_Rigid_Box_Dieline_v1.pdf',
        file_size: '4.2 MB',
        uploaded_by_id: 'usr-designer-1',
        uploaded_by_name: 'أحمد الشامي',
        created_at: '2026-02-27T10:30:00Z',
        notes_ar: 'البروفة الأولى مع تحديد أماكن البصمة الذهبية باللون الأسود الـ Spot Color.',
      }
    ],
    comments: [
      {
        id: 'comm-1',
        author_id: 'usr-owner-1',
        author_name: 'م. سكندر / الإدارة العامة',
        author_role: 'owner',
        text: 'يرجى تكبير مكان القفل المغناطيسي 2 ملم وتوضيح علامات الطي بدقة قبل الاعتماد الفني النهائي.',
        created_at: '2026-02-27T11:00:00Z',
        status_change: 'feedback_requested',
      },
      {
        id: 'comm-2',
        author_id: 'usr-designer-1',
        author_name: 'أحمد الشامي',
        author_role: 'designer',
        text: 'تم تعديل الهامش المغناطيسي وتثبيت أبعاد الدايكت جاهز للعرض على العميل.',
        created_at: '2026-02-27T14:15:00Z',
        status_change: 'proof_submitted',
      }
    ],
    created_at: '2026-02-25T09:00:00Z',
    updated_at: '2026-02-27T14:15:00Z',
  },
  {
    id: 'task-design-102',
    title_ar: 'محاكاة 3D وتصميم واجهة كلادينج وحروف استيل مضيئة',
    client_name: 'مجموعة المطاعم الملكية - شارع حَدّة',
    client_phone: '+967 773 221 100',
    designer_id: 'usr-designer-2',
    designer_name: 'سارة خالد (مصممة واجهات و3D)',
    deadline: '2026-03-08',
    priority: 'high',
    status: 'in_progress',
    description_ar: 'رسم وتصميم ثلاثي الأبعاد لواجهة كلادينج أسود خشبي بمقاس 14×4 متر، مع توزيع الحروف البارزة المضيئة زنكور واستيل سامسونج LED.',
    dimensions_notes: 'ارتفاع الواجهة: 4 متر، العرض: 14 متر. الحروف البارزة بارتفاع 80 سم.',
    required_format: '3D Render + Vector DXF for CNC Cutter',
    created_at: '2026-02-26T12:00:00Z',
    updated_at: '2026-02-26T12:00:00Z',
    proof_versions: [],
    comments: [],
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-rawaj-1',
    name: 'واجهة رواج الرئيسية واللوحات الإعلانية',
    url: '/src/assets/images/rawaj_hero_storefront_1790822521342.jpg',
    size_kb: 420,
    category: 'اللوحات والواجهات',
    uploaded_at: '2026-02-01',
    alt_ar: 'واجهة مطابع رواج الإعلانية الفاخرة',
  },
  {
    id: 'med-rawaj-2',
    name: 'علب هدايا فاخرة وبصمة حرارية',
    url: '/src/assets/images/luxury_packaging_showcase_1790822533141.jpg',
    size_kb: 380,
    category: 'التغليف والعلب',
    uploaded_at: '2026-02-01',
    alt_ar: 'علب هدايا كرتونية مقواة ريجيد بوكس',
  },
  {
    id: 'med-rawaj-3',
    name: 'كروت شخصية فاخرة وبصمة مذهبة',
    url: '/src/assets/images/business_cards_showcase_1790822543850.jpg',
    size_kb: 310,
    category: 'المطبوعات الورقية',
    uploaded_at: '2026-02-02',
    alt_ar: 'بطاقات أعمال كوشيه وبصمة ذهبية بارزة',
  },
  {
    id: 'med-rawaj-4',
    name: 'بروشورات وكتالوجات ومجلات تسويقية',
    url: '/src/assets/images/printing_brochures_1790806872644.jpg',
    size_kb: 290,
    category: 'المطبوعات الورقية',
    uploaded_at: '2026-02-02',
    alt_ar: 'كتالوجات ومطبوعات دورية للشركات',
  },
  {
    id: 'med-rawaj-5',
    name: 'تجهيز أجنحة المعارض وبوب أب مضاء',
    url: '/src/assets/images/exhibition_booth_showcase_1790822553791.jpg',
    size_kb: 450,
    category: 'المعارض والستاندات',
    uploaded_at: '2026-02-03',
    alt_ar: 'تجهيز بوث معارض ومؤتمرات',
  },
  {
    id: 'med-rawaj-6',
    name: 'أكياس ورقية فاخرة ومقابض حبال',
    url: '/src/assets/images/paper_bags_luxury_1790811404972.jpg',
    size_kb: 320,
    category: 'التغليف والعلب',
    uploaded_at: '2026-02-03',
    alt_ar: 'أكياس تسوق ورقية مخصصة',
  },
  {
    id: 'med-rawaj-7',
    name: 'ملصقات واستكرات رول للمنتجات',
    url: '/src/assets/images/roll_labels_packaging_1790811451461.jpg',
    size_kb: 280,
    category: 'الملصقات والليبل',
    uploaded_at: '2026-02-04',
    alt_ar: 'ملصقات رول واستكرات تغليف',
  },
  {
    id: 'med-rawaj-8',
    name: 'دروع تذكارية كريستال وقص ليزر',
    url: '/src/assets/images/crystal_trophy_1790806902354.jpg',
    size_kb: 260,
    category: 'الهدايا والدروع',
    uploaded_at: '2026-02-04',
    alt_ar: 'دروع تذكارية وجوائز تكريم',
  },
];
