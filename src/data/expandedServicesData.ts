import { Department, Category, Service, Package } from '../types';

export const EXPANDED_DEPARTMENTS: Department[] = [
  {
    id: 'dept-sourcing',
    name_ar: 'التوريد الخارجي ومشاريع المصانع الكبرى',
    name_en: 'Direct OEM Sourcing & Large Turnkey Projects',
    slug: 'oem-sourcing',
    icon: 'Globe',
    description_ar: 'استيراد وتوريد الهدايا والمواد الدعائية بالكميات الضخمة مباشرة من مصانع الصين وتركيا بأسعار تنافسية وشحن موثوق.',
    hero_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    sort_order: 13,
  },
  {
    id: 'dept-events',
    name_ar: 'تجهيزات المعارض والمؤتمرات والفعاليات',
    name_en: 'Exhibitions, Booths & Event Setups',
    slug: 'events-exhibitions',
    icon: 'Trophy',
    description_ar: 'بناء أجنحة وبوثات المعارض 3D، ستاندات الرول أب والبوب أب، الأعلام الشاطئية، وشرائط وبطاقات الـ Lanyards.',
    hero_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    sort_order: 14,
  },
  {
    id: 'dept-hospitality',
    name_ar: 'المنيوهات ومطبوعات المطاعم والضيافة',
    name_en: 'Restaurant Menus & Hospitality Printing',
    slug: 'hospitality-menus',
    icon: 'Utensils',
    description_ar: 'منيوهات جلدية وخشبية وسينثتيك مقاومة للماء والزيوت، مفارش سفرة، مناديل مطبوعة، وحوامل الطاولات الأكريليك.',
    hero_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    sort_order: 15,
  },
  {
    id: 'dept-security',
    name_ar: 'البطاقات الذكية والأختام والأمن الطباعي',
    name_en: 'Smart PVC Cards, Seals & Security Labels',
    slug: 'security-smart-cards',
    icon: 'ShieldCheck',
    description_ar: 'أختام ميكانيكية وليزرية Trodat، بطاقات ممغنطة و RFID/NFC، ستيكرات هولوجرام ثلاثية الأبعاد وشواهد الضمان Void.',
    hero_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    sort_order: 16,
  },
  {
    id: 'dept-flexible-packaging',
    name_ar: 'التغليف المرن وأكياس الدوي باك (Doypack)',
    name_en: 'Flexible Packaging & Stand-Up Pouches',
    slug: 'flexible-packaging',
    icon: 'Box',
    description_ar: 'أكياس ذاتية الوقوف بسحاب إغلاق محكم وصمام تفريغ هواء للبن، الشاي، المكسرات والبهارات مع طباعة روتوجرافير غنية.',
    hero_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    sort_order: 17,
  },
  {
    id: 'dept-neon-decor',
    name_ar: 'لوحات النيون فليكس واللوحات الإرشادية',
    name_en: 'LED Neon Flex & Architectural Wayfinding',
    slug: 'neon-wayfinding',
    icon: 'Zap',
    description_ar: 'إضاءات نيون سيليكون مرنة للديكورات والمقاهي، ولوحات الإشارات التوجيهية وتسمية المكاتب والفنادق بأعلى أناقة.',
    hero_image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    sort_order: 18,
  },
];

export const EXPANDED_CATEGORIES: Category[] = [
  // Sourcing
  { id: 'cat-oem-gifts', department_id: 'dept-sourcing', name_ar: 'التوريد المباشر للهدايا والمصانع', name_en: 'Direct OEM Merchandising', slug: 'oem-merchandise', sort_order: 1 },
  { id: 'cat-led-screens', department_id: 'dept-sourcing', name_ar: 'شاشات الـ LED الإلكترونية العملاقة', name_en: 'LED Display Screens', slug: 'led-screens', sort_order: 2 },
  { id: 'cat-pos-stands', department_id: 'dept-sourcing', name_ar: 'ستاندات ونقاط البيع POS & POP', name_en: 'POS & POP Displays', slug: 'pos-displays', sort_order: 3 },

  // Events
  { id: 'cat-exhibition-booths', department_id: 'dept-events', name_ar: 'أجنحة وبوثات المعارض المخصصة', name_en: 'Custom Exhibition Booths', slug: 'exhibition-booths', sort_order: 1 },
  { id: 'cat-portable-stands', department_id: 'dept-events', name_ar: 'أنظمة العرض المتنقلة والرول أب', name_en: 'Portable Display Systems', slug: 'portable-stands', sort_order: 2 },
  { id: 'cat-event-badges', department_id: 'dept-events', name_ar: 'شرائط وبطاقات تعريف الحضور', name_en: 'Lanyards & Event Badges', slug: 'lanyards-badges', sort_order: 3 },

  // Hospitality
  { id: 'cat-restaurant-menus', department_id: 'dept-hospitality', name_ar: 'قوائم الطعام والمنيوهات الفاخرة', name_en: 'Custom Restaurant Menus', slug: 'restaurant-menus', sort_order: 1 },
  { id: 'cat-tableware-disposables', department_id: 'dept-hospitality', name_ar: 'ورقيات ومفارش المائدة المطبوعة', name_en: 'Custom Printed Tableware', slug: 'tableware-disposables', sort_order: 2 },

  // Security
  { id: 'cat-smart-pvc', department_id: 'dept-security', name_ar: 'البطاقات البلاستيكية الذكية RFID/NFC', name_en: 'Smart PVC & RFID Cards', slug: 'smart-pvc-cards', sort_order: 1 },
  { id: 'cat-official-stamps', department_id: 'dept-security', name_ar: 'الأختام الرسمية الميكانيكية والليزر', name_en: 'Official Trodat & Laser Stamps', slug: 'official-stamps', sort_order: 2 },
  { id: 'cat-security-labels', department_id: 'dept-security', name_ar: 'ملصقات الهولوجرام والضمان Void', name_en: 'Hologram & Void Security Labels', slug: 'security-hologram-labels', sort_order: 3 },

  // Flexible packaging
  { id: 'cat-doypack-pouches', department_id: 'dept-flexible-packaging', name_ar: 'أكياس الدوي باك والبن ذاتية الوقوف', name_en: 'Doypack Stand-up Pouches', slug: 'doypack-pouches', sort_order: 1 },

  // Neon & Wayfinding
  { id: 'cat-neon-flex', department_id: 'dept-neon-decor', name_ar: 'لوحات النيون فليكس LED', name_en: 'LED Neon Flex Signage', slug: 'neon-flex', sort_order: 1 },
  { id: 'cat-wayfinding-signs', department_id: 'dept-neon-decor', name_ar: 'لوحات الإشارات التوجيهية وتسمية الأبواب', name_en: 'Wayfinding & Door Signs', slug: 'wayfinding-door-signs', sort_order: 2 },
];

export const EXPANDED_SERVICES: Service[] = [
  // 21. OEM Direct Sourcing
  {
    id: 'srv-oem-sourcing',
    name_ar: 'تصنيع وتوريد الهدايا الدعائية الضخمة من المصانع الخارجية (OEM Direct Sourcing)',
    name_en: 'Turnkey International OEM Promotional Sourcing & Manufacturing',
    slug: 'international-oem-sourcing',
    department_id: 'dept-sourcing',
    category_id: 'cat-oem-gifts',
    industry_sector_ids: ['sec-events-exhibitions', 'sec-corporate-business'],
    is_international_sourcing: true,
    short_description_ar: 'توريد مباشر من مصانع الصين وتركيا لحملات البنوك والمؤتمرات الكبرى بأسعار الجملة العالمية وتخصيص هندسي كامل.',
    full_description_ar: 'خدمة مخصصة للمؤسسات والشركات الكبرى والبنوك والمنظمات التي تحتاج كميات إنتاجية ضخمة من الهدايا الدعائية المبتكرة. نتولى دورة العمل كاملة: من أخذ المواصفات، تصنيع القوالب الخاصة (Tooling)، عينات الاعتماد الذهبية، فحص الجودة في المصنع (QC)، والشحن الجمركي والتوصيل لباب مقرك.',
    hero_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'توريد دولي بأسعار المصنع',
    service_status: 'published',
    execution_model: 'international_sourcing',
    featured: true,
    most_requested: true,
    sort_order: 21,
    seo_title: 'استيراد وتوريد هدايا دعائية ومطبوعات من الصين بأسعار المصنع | رواج',
    seo_description: 'خدمة التوريد الخارجي المباشر للشركات الكبرى والبنوك وحملات الانتخابات بأعلى جودة وضمان فحص المصانع.',
    highlights: [
      { id: 'h1', title_ar: 'عينات اعتماد فعلية قبل الإنتاج الكمي', description_ar: 'نرسل لك عينة مطابقة 100% بالمواصفات والشعار للاعتماد النهائي.' },
      { id: 'h2', title_ar: 'توفير تكاليف يصل إلى 45%', description_ar: 'الاستفادة من أسعار خطوط الإنتاج المباشرة للطلبات الكبرى.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هو الحد الأدنى للطلب (MOQ) في خدمة التوريد الخارجي؟', answer_ar: 'يبدأ من 500 إلى 1000 قطعة حسب طبيعة المنتج ونوع التخصيص.' },
      { id: 'f2', question_ar: 'كم تستغرق مدة التصنيع والشحن حتى الوصول؟', answer_ar: 'تتراوح المدة بين 20 إلى 35 يوماً للشحن الجوي السريع، ومن 45 إلى 60 يوماً للشحن البحري الاقتصادي.' },
    ],
    specification_groups: [
      {
        id: 'grp-oem-spec',
        title_ar: 'طبيعة المنتجات والكمية التقريبية',
        sort_order: 1,
        fields: [
          {
            id: 'oem-item-category',
            key: 'oem_category',
            label_ar: 'نوع المنتجات المراد توريدها',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'tech_gifts', label_ar: 'إلكترونيات وبوربانك وسماعات وفلاشات بشكل مخصص 3D', value: 'electronics' },
              { id: 'stationery_sets', label_ar: 'مجموعات مكاتب فاخرة وحقائب مؤتمرات بمواصفات حصرية', value: 'bags_and_stationery' },
              { id: 'umbrellas_wear', label_ar: 'شمسيات ومظلات وساعات حائط وملابس ترويجية ضخمة', value: 'umbrellas_and_apparel' },
              { id: 'custom_mould', label_ar: 'تصنيع منتج جديد بقالب مخصص (Custom Moulding)', value: 'custom_mould' },
            ],
          },
          {
            id: 'oem-approx-qty',
            key: 'quantity_range',
            label_ar: 'الكمية التقديرية المطلوبة',
            type: 'select',
            required: true,
            sort_order: 2,
            options: [
              { id: 'qty_500_1000', label_ar: '500 - 1,000 قطعة', value: '500_1000' },
              { id: 'qty_1000_5000', label_ar: '1,000 - 5,000 قطعة', value: '1000_5000' },
              { id: 'qty_5000_plus', label_ar: 'أكثر من 5,000 قطعة (أسعار مصانع حصرية)', value: '5000_plus' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-corporate-gift-sets', 'srv-event-lanyards-badges'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 22. LED Display Screens
  {
    id: 'srv-led-screens',
    name_ar: 'شاشات العرض الإلكترونية والـ LED Screens العملاقة',
    name_en: 'Commercial Indoor & Outdoor LED Display Video Walls',
    slug: 'commercial-led-display-screens',
    department_id: 'dept-sourcing',
    category_id: 'cat-led-screens',
    industry_sector_ids: ['sec-events-exhibitions', 'sec-retail-boutiques'],
    is_international_sourcing: true,
    short_description_ar: 'توريد وتركيب شاشات الفيديو الإعلانية الخارجية والداخلية فائقة السطوع P2.5/P3/P4 مع أنظمة البث السحابي.',
    full_description_ar: 'الواجهة الرقمية الأكثر جذباً للأنظار في العصر الحديث. نوفر توريد وتركيب وبرمجة شاشات الفيديو العملاقة LED Video Walls للمباني والمولات والمؤتمرات وقاعات الاحتفالات بخلايا NationStar الأصلية وكبائن ألومنيوم خفيفة وسهلة الصيانة الأمامية والخلفية.',
    hero_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تقنية بصرية متقدمة',
    service_status: 'published',
    execution_model: 'mixed',
    featured: true,
    sort_order: 22,
    seo_title: 'توريد وتركيب شاشات إعلانية LED في اليمن | رواج',
    seo_description: 'شاشات عرض إلكترونية عملاقة داخلية وخارجية للمحلات والمؤتمرات مع الضمان والتركيب.',
    highlights: [
      { id: 'h1', title_ar: 'سطوع فائق يقاوم أشعة الشمس المباشرة', description_ar: 'سطوع يصل إلى 6500 nits للشاشات الخارجية مع عزل IP65.' },
      { id: 'h2', title_ar: 'تحكم سحابي ذكي بالهاتف والكمبيوتر', description_ar: 'تغيير الإعلانات وجدولة العروض عبر شبكة الإنترنت من أي مكان.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما الفرق بين درجات الدقة P2.5 و P4 و P5؟', answer_ar: 'كلما قل رقم الـ Pixel Pitch (مثل P2.5) زادت كثافة النقاط ونقاء الصورة للمسافات القريبة.' },
    ],
    specification_groups: [
      {
        id: 'grp-led-spec',
        title_ar: 'موقع التثبيت والمساحة المطلوبة',
        sort_order: 1,
        fields: [
          {
            id: 'led-location',
            key: 'environment',
            label_ar: 'بيئة تشغيل الشاشة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'outdoor', label_ar: 'شاشة خارجية للواجهات والأسطح (Outdoor IP65 عالية السطوع)', value: 'outdoor' },
              { id: 'indoor', label_ar: 'شاشة داخلية للقاعات والمتاجر (Indoor دقة فائقة P2.5 / P3)', value: 'indoor' },
              { id: 'rental', label_ar: 'شاشات فعاليات متنقلة سريعة التفكيك (Rental Quick-Lock)', value: 'rental' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-channel-letters', 'srv-exhibition-booths'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 23. POS & POP Displays
  {
    id: 'srv-pos-displays',
    name_ar: 'ستاندات ونقاط البيع المخصصة ومجسمات العرض (POS & POP Displays)',
    name_en: 'Custom Point-of-Sale (POS/POP) Retail Display Units',
    slug: 'custom-pos-pop-displays',
    department_id: 'dept-sourcing',
    category_id: 'cat-pos-stands',
    industry_sector_ids: ['sec-retail-boutiques', 'sec-factories-fmcg'],
    short_description_ar: 'تصنيع وتوريد ستاندات العرض المعدنية والأكريليكية لشركات التوزيع في السوبرماركت والمولات.',
    full_description_ar: 'حول رفوف مبيعات منتجك إلى مركز جذب رئيسي للمستهلكين. نصمم وننفذ ستاندات العرض المعدنية والخشبية المدمجة مع طباعة UV وشاشات فيديو صغيرة وإضاءات LED لزيادة المبيعات المباشرة.',
    hero_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'مضاعفة المبيعات والتوزيع',
    service_status: 'published',
    execution_model: 'mixed',
    featured: false,
    sort_order: 23,
    seo_title: 'تصنيع ستاندات نقاط البيع وعرض المنتجات POS | رواج',
    seo_description: 'تصميم وتنفيذ ستاندات عرض المنتجات في السوبرماركت والمحلات بأحدث خامات الأكريليك والمعدن.',
    highlights: [
      { id: 'h1', title_ar: 'هيكل متين يتحمل أوزان المنتجات الثقيلة', description_ar: 'تصميم هندسي متوازن لمنع الانقلاب مع قدرة تحميل عالية.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يتم تسليم الستاندات مجمعة أم مفككة للشحن؟', answer_ar: 'نوفر خيار الشحن المفكك Flat-pack لتقليل تكلفة النقل مع سهولة التجميع خلال دقيقتين.' },
    ],
    specification_groups: [
      {
        id: 'grp-pos-spec',
        title_ar: 'الخامة وعدد الرفوف',
        sort_order: 1,
        fields: [
          {
            id: 'pos-material',
            key: 'material_base',
            label_ar: 'الخامة الأساسية للستاند',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'metal_wire', label_ar: 'معدن وصاج مدهون حرارياً بودرة (Heavy Duty)', value: 'metal' },
              { id: 'acrylic_wood', label_ar: 'دمج خشب MDF مع أكريليك مضيء للمتاجر الفاخرة', value: 'wood_acrylic' },
              { id: 'corrugated_floor', label_ar: 'كرتون مضلع اقتصادي للحملات الترويجية المؤقتة', value: 'corrugated' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-roll-labels', 'srv-folding-cartons'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 24. Custom Exhibition Booths
  {
    id: 'srv-exhibition-booths',
    name_ar: 'تصميم وبناء أجنحة وبوثات المعارض المتكاملة (Custom Exhibition Booths)',
    name_en: 'Custom 3D Exhibition Booth Design & Fabrication',
    slug: 'custom-exhibition-booth-fabrication',
    department_id: 'dept-events',
    category_id: 'cat-exhibition-booths',
    industry_sector_ids: ['sec-events-exhibitions', 'sec-corporate-business'],
    short_description_ar: 'تصميم ثلاثي الأبعاد 3D وتنفيذ هندسي متكامل لأجنحة المعارض من الخشب والألومنيوم والكلادينج مع الإضاءة والشاشات.',
    full_description_ar: 'اجعل جناح شركتك المحطة الأبرز في أي معرض أو مؤتمر. يقدم فريقنا الهندسي حلول تصميم وبناء بوثات المعارض المخصصة: تصاميم 3D واقعية، أرضيات مرتفعة، واجهات مضيئة، مكاتب استقبال، وأثاث ضيافة فاخر مع إشراف فني طوال أيام الفعالية.',
    hero_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تنفيذ هندسي 3D متكامل',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 24,
    seo_title: 'تصميم وتنفيذ بوثات وأجنحة المعارض في صنعاء واليمن | رواج',
    seo_description: 'تصميم وتنفيذ ديكورات وأجنحة المعارض التجارية بأحدث الخامات والأنظمة الذكية المتكاملة.',
    highlights: [
      { id: 'h1', title_ar: 'مخطط 3D تفاعلي مجاني قبل التنفيذ', description_ar: 'معاينة واقعية للشكل النهائي والإضاءات قبل بدء التصنيع في الورش.' },
      { id: 'h2', title_ar: 'فريق صيانة وتواجد أثناء الفعالية', description_ar: 'تأمين سلامة التجهيزات والكهرباء طوال فترة المعرض.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يشمل العرض فك الجناح بعد انتهاء المعرض؟', answer_ar: 'نعم، يشمل العرض التركيب المسبق، الإشراف أثناء المعرض، والفك والتنظيف بعد انتهائه بالكامل.' },
    ],
    specification_groups: [
      {
        id: 'grp-booth-spec',
        title_ar: 'مساحة الجناح ونوع الهيكل',
        sort_order: 1,
        fields: [
          {
            id: 'bth-area',
            key: 'booth_area_sqm',
            label_ar: 'مساحة الجناح المحجوز بالمعرض (م²)',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'area_3x3', label_ar: '3 × 3 م (9 م² - مساحة قياسية)', value: '9sqm' },
              { id: 'area_6x3', label_ar: '6 × 3 م (18 م² - جناح متوسط)', value: '18sqm' },
              { id: 'area_6x6', label_ar: '6 × 6 م (36 م² - جناح مميز جزيرة أو زاويتين)', value: '36sqm' },
              { id: 'area_large', label_ar: 'أكثر من 50 م² (أجنحة كبرى مخصصة VIP)', value: '50sqm_plus' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-portable-displays', 'srv-led-screens', 'srv-event-lanyards-badges'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 25. Portable Displays (Roll-ups, Pop-ups & Beach Flags)
  {
    id: 'srv-portable-displays',
    name_ar: 'منظومة الستاندات الإعلانية المتنقلة (Roll-ups, Pop-ups & Beach Flags)',
    name_en: 'Portable Display Systems, Roll-ups, Pop-up Walls & Beach Flags',
    slug: 'portable-display-systems-rollups',
    department_id: 'dept-events',
    category_id: 'cat-portable-stands',
    industry_sector_ids: ['sec-events-exhibitions', 'sec-corporate-business'],
    short_description_ar: 'ستاندات رول أب ألومنيوم ثقيل، بوب أب جداري منحني، طاولات استقبال برومو كاونتر، وأعلام شاطئية وسارية.',
    full_description_ar: 'الحل الأسرع والأكثر فاعلية للترويج في المؤتمرات والندوات والمعارض. نوفر منظومة متكاملة من ستاندات الرول أب بأوزان ألومنيوم ثقيلة تمنع الميلان، جدران بوب أب ماجنتيك بمقاسات 3×3 و 3×4 متر، وأعلام سارية شاطئية مقاومة للرياح مع حقائب حمل مبطنة.',
    hero_image: '/images/vehicle_branding_wrap_1790811427153.jpg',
    gallery: [
      '/images/vehicle_branding_wrap_1790811427153.jpg',
    ],
    badge: 'سهولة الحمل والتركيب السريع',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 25,
    seo_title: 'طباعة رول اب وبوب اب واعلام شاطئية في اليمن | رواج',
    seo_description: 'ستاندات رول اب وبوب اب بنر للمؤتمرات بأعلى دقة طباعة وخامات ألومنيوم متينة مع حقيبة الحمل.',
    highlights: [
      { id: 'h1', title_ar: 'طباعة فيلم بلاستيكي Blockout غير عاكس', description_ar: 'طباعة ناعمة بدون تجعد بالحواف أو نفاذ للضوء الخلفي.' },
      { id: 'h2', title_ar: 'قواعد ألومنيوم عريضة بأوزان أصلية', description_ar: 'ثبات فائق على الأرضيات دون أي اهتزاز أو انحناء.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن استبدال البنر المطبوع لاحقاً مع الحفاظ على نفس الهيكل؟', answer_ar: 'نعم، نوفر خدمة إعادة طباعة وتركيب الجرافيكس الجديد على نفس الهيكل لتوفير التكلفة.' },
    ],
    specification_groups: [
      {
        id: 'grp-portable-spec',
        title_ar: 'نوع نظام العرض المطلوب',
        sort_order: 1,
        fields: [
          {
            id: 'port-system-type',
            key: 'stand_type',
            label_ar: 'نوع الستاند المتنقل',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'rollup_85', label_ar: 'رول أب ألومنيوم قياسي (85 × 200 سم)', value: 'rollup_85' },
              { id: 'rollup_wide', label_ar: 'رول أب عريض فاخر (120 × 200 سم أو 150 × 200 سم)', value: 'rollup_wide' },
              { id: 'popup_curved', label_ar: 'جدار بوب أب ماجنتيك منحني / مستقيم (3 × 3 متر مع حقيبة ترولي)', value: 'popup_wall' },
              { id: 'promo_counter', label_ar: 'طاولة استقبال برومو كاونتر ترويجية متنقلة', value: 'promo_counter' },
              { id: 'beach_flag', label_ar: 'علم شاطئي سارية ريشة / دمعة (ارتفاع 3 أو 4 متر مع قاعدة ماء)', value: 'beach_flag' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-exhibition-booths', 'srv-event-lanyards-badges'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 26. Event Lanyards & Badges
  {
    id: 'srv-event-lanyards-badges',
    name_ar: 'شرائط تعليق وبطاقات تعريف الفعاليات والمؤتمرات (Lanyards & Badges)',
    name_en: 'Custom Branded Event Lanyards & ID Badges',
    slug: 'custom-event-lanyards-badges',
    department_id: 'dept-events',
    category_id: 'cat-event-badges',
    industry_sector_ids: ['sec-events-exhibitions', 'sec-corporate-business'],
    short_description_ar: 'شرائط ساتان حريرية مطبوعة سبلميشن وجهين مع خطافات معدنية فاخرة وحافظات بطاقات أكريليك وبطاقات PVC.',
    full_description_ar: 'العنصر الأساسي لتنظيم وإدارة المؤتمرات والملتقيات. نوفر أربطة وشرائط عنق حريرية (Lanyards) بعرض 1.5 أو 2.0 سم بطباعة حرارية ملونة متطابقة مع بطاقات PVC بلاستيكية مقصوصة ليزرياً وحافظات شفافة مقاومة للماء.',
    hero_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تنظيم رسمي للمؤتمرات',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 26,
    seo_title: 'طباعة شرائط تعليق وبطاقات مؤتمرات في اليمن | رواج',
    seo_description: 'شرائط تعليق Lanyards وبطاقات هوية للمؤتمرات والشركات بأعلى جودة وخيارات أقفال أمان متعددة.',
    highlights: [
      { id: 'h1', title_ar: 'طباعة حرارية فائقة النعومة على الوجهين', description_ar: 'ألوان ناصعة وملمس ساتان ناعم ومريح على العنق.' },
      { id: 'h2', title_ar: 'إكسسوارات معدنية ومشبك أمان سريع', description_ar: 'خطافات ستانلس ستيل دوارة ومشبك أمان خلفي Quick-release.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن طباعة الأسماء والبيانات الشخصية على بطاقات الـ Badges؟', answer_ar: 'نعم، نقوم بدمج وتخصيص أسماء وبيانات وباركود الحضور من ملف إكسل مباشرة.' },
    ],
    specification_groups: [
      {
        id: 'grp-lan-spec',
        title_ar: 'عرض الشريط ونوع الحافظة',
        sort_order: 1,
        fields: [
          {
            id: 'lan-width',
            key: 'ribbon_width',
            label_ar: 'عرض شريط الساتان',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'w_20mm', label_ar: '20 مم (2.0 سم - العرض الشائع والأكثر وضوحاً للشعار)', value: '20mm' },
              { id: 'w_15mm', label_ar: '15 مم (1.5 سم - العرض الناعم المدمج)', value: '15mm' },
              { id: 'w_25mm', label_ar: '25 مم (2.5 سم - عريض جداً للمهرجانات الكبرى)', value: '25mm' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-smart-pvc-cards', 'srv-portable-displays'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 27. Luxury Restaurant Menus
  {
    id: 'srv-restaurant-menus',
    name_ar: 'قوائم الطعام والمنيوهات الفاخرة المقاومة للماء والزيوت (Luxury Restaurant Menus)',
    name_en: 'Custom Luxury Restaurant Menus, Leather Binders & Synthetic Waterproof Pages',
    slug: 'custom-luxury-restaurant-menus',
    department_id: 'dept-hospitality',
    category_id: 'cat-restaurant-menus',
    industry_sector_ids: ['sec-restaurants-cafes'],
    short_description_ar: 'منيوهات جلدية بختم حراري، أوراق سينثتيك غير قابلة للتمزق وضد السوائل، وحوامل أكريليك لطاولات الكافيهات.',
    full_description_ar: 'قائمة الطعام هي أول ما يلمسه زبون مطعمك. نصنع أرقى المنيوهات بتجليد جلدي فاخر مع زوايا معدنية حامية، ونطبع على ورق البولي بروبيلين السينثتيك المقاوم للتمزق والزيوت والماء بنسبة 100%، مما يتيح مسح المنيو وتعقيمه يومياً دون تلف.',
    hero_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'مقاوم للماء والتمزق 100%',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 27,
    seo_title: 'تصميم وطباعة منيو مطاعم وكافيهات فاخرة في اليمن | رواج',
    seo_description: 'منيوهات جلدية وخشبية وأوراق مقاومة للماء والزيوت لكبار المطاعم والمقاهي مع حوامل الطاولات.',
    highlights: [
      { id: 'h1', title_ar: 'ورق سينثتيك مقاوم للماء وقابل للغسيل', description_ar: 'مقاومة تامة للسوائل والصلصات مع إمكانية التنظيف والتعقيم اليومي.' },
      { id: 'h2', title_ar: 'تجليد جلدي أو خشبي بحفر وبصمة ذهبية', description_ar: 'هياكل متينة وعصرية مع سهولة تبديل الصفحات الداخلية.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن عمل صفحات منيو يمكن إضافة أصناف إليها لاحقاً؟', answer_ar: 'نعم، نوفر نظام الحلقات الخفية والمقابض المساميرية (Chicago Screws) لتسهيل استبدال أي صفحة دون تغيير الغلاف.' },
    ],
    specification_groups: [
      {
        id: 'grp-menu-spec',
        title_ar: 'نمط الغلاف وخامة الصفحات',
        sort_order: 1,
        fields: [
          {
            id: 'menu-cover-type',
            key: 'cover_style',
            label_ar: 'نوع غلاف المنيو',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'leather_hard', label_ar: 'غلاف جلدي مبطن مع ختم حراري للشعار (Luxury Leather Binder)', value: 'leather' },
              { id: 'wood_engraved', label_ar: 'غلاف خشبي طبيعي محفور بالليزر للكافيهات العصرية', value: 'wood' },
              { id: 'hardcover_laminated', label_ar: 'كرتون صلب مسلفن مطفي أو سوفت تاتش (Hardcover Laminated)', value: 'hardcover' },
              { id: 'single_sheet_synthetic', label_ar: 'ورقة سينثتيك مفردة مطوية مقاومة للماء بدون غلاف خارجي', value: 'synthetic_sheet' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-hospitality-disposables', 'srv-promotional-mugs'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 28. Hospitality Disposables & Tableware
  {
    id: 'srv-hospitality-disposables',
    name_ar: 'ورقيات ومفارش المائدة ومستلزمات الضيافة المطبوعة (Printed Tableware)',
    name_en: 'Custom Printed Placemats, Napkins & Cup Sleeves for Cafes & Restaurants',
    slug: 'hospitality-tableware-disposables',
    department_id: 'dept-hospitality',
    category_id: 'cat-tableware-disposables',
    industry_sector_ids: ['sec-restaurants-cafes'],
    short_description_ar: 'مفارش سفرة ورقية مطبوعة، مناديل سفرة، حوامل أكواب كرتونية، كوسترز وأعواد سكر مغلفة بهوية المطعم.',
    full_description_ar: 'التفاصيل الصغيرة هي التي تصنع الفارق في تجربة زوار مطعمك وكافيهك. نطبع مفارش المائدة الورقية بأحبار غذائية معتمدة، مناديل السفرة بطبقات امتصاص عالية، حوامل الأكواب العازلة للحرارة (Cup Sleeves)، وقواعد الأكواب الكرتونية (Coasters).',
    hero_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'أحبار وخامات غذائية آمنة',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 28,
    seo_title: 'طباعة مفارش طاولات ومناديل مطاعم في اليمن | رواج',
    seo_description: 'مفارش طاولات ورقية ومناديل وكوسترز مطبوعة بشعار المطعم والكافيه بأعلى جودة.',
    highlights: [
      { id: 'h1', title_ar: 'أحبار نباتية آمنة ملامسة للأطعمة', description_ar: 'مطابقة للمعايير الصحية وبدون أي روائح كيميائية.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن طباعة مفارش السفرة بقياسات مخصصة للطاولات؟', answer_ar: 'نعم، نوفر مقاسات قياسية A3 ومقاسات مخصصة حسب أبعاد طاولات مطعمك.' },
    ],
    specification_groups: [
      {
        id: 'grp-tbl-spec',
        title_ar: 'نوع المطبوع الورقي والكمية',
        sort_order: 1,
        fields: [
          {
            id: 'tbl-item-type',
            key: 'tableware_item',
            label_ar: 'نوع المستلزمات المطلوبة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'placemats_a3', label_ar: 'مفارش مائدة ورقية كرافت أو كوشيه مقاس A3', value: 'placemats' },
              { id: 'cup_sleeves', label_ar: 'حوامل أكواب قهوة كرتونية عازلة للحرارة (Cup Sleeves)', value: 'cup_sleeves' },
              { id: 'coasters', label_ar: 'قواعد أكواب كرتونية سميكة ماصة للسوائل (Coasters)', value: 'coasters' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-restaurant-menus', 'srv-paper-bags-luxury'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 29. Smart PVC & RFID/NFC Cards
  {
    id: 'srv-smart-pvc-cards',
    name_ar: 'البطاقات البلاستيكية الذكية وبطاقات الدخول RFID / NFC الممغنطة',
    name_en: 'Custom Smart PVC Cards, Magnetic Stripe & RFID/NFC Hotel Access Cards',
    slug: 'smart-pvc-rfid-nfc-cards',
    department_id: 'dept-security',
    category_id: 'cat-smart-pvc',
    industry_sector_ids: ['sec-corporate-business', 'sec-healthcare-clinics', 'sec-retail-boutiques'],
    short_description_ar: 'بطاقات عضوية، بطاقات ولاء ممغنطة، بطاقات غرف الفنادق والموظفين بتقنية RFID/NFC مع تشفير وترقيم بارز.',
    full_description_ar: 'أعلى مواصفات بطاقات الـ PVC العالمية (CR80 قياس 85.6 × 54 مم). نوفر طباعة بطاقات الموظفين، بطاقات العضوية والولاء بالمغناطيس أو الباركود، وبطاقات الدخول الذكية بدون تلامس (Contactless RFID 13.56MHz / Mifare) للفنادق والشركات والنوادي.',
    hero_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'معايير أمان وتشفير ذكية',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 29,
    seo_title: 'طباعة بطاقات بلاستيكية ذكية PVC و RFID في اليمن | رواج',
    seo_description: 'بطاقات PVC ممغنطة وبطاقات غرف فنادق RFID وبطاقات ولاء بأحدث تقنيات التشفير.',
    highlights: [
      { id: 'h1', title_ar: 'خامة PVC بيور نقية متوافقة مع مكائن القراءة', description_ar: 'مرونة ومقاومة للكسر مع حواف مستديرة ناعمة.' },
      { id: 'h2', title_ar: 'دعم الترقيم البارز والشريط المغناطيسي', description_ar: 'إمكانية إضافة شريط التوقيع والباركود المتغير والـ QR Code.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل تتوافق بطاقات الفنادق مع أقفال الأبواب الإلكترونية؟', answer_ar: 'نعم، نوفر كافة أنواع الرقائق الإلكترونية (Mifare 1K, T5577, EM4100) المتوافقة مع جميع أنظمة الأقفال العالمية.' },
    ],
    specification_groups: [
      {
        id: 'grp-pvc-spec',
        title_ar: 'نوع الشريحة والتشطيب',
        sort_order: 1,
        fields: [
          {
            id: 'pvc-chip-type',
            key: 'card_technology',
            label_ar: 'تقنية البطاقة',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'pvc_standard', label_ar: 'بطاقة PVC عادية مطبوعة ملونة وجهين (هويات وعضويات)', value: 'standard_pvc' },
              { id: 'rfid_hotel', label_ar: 'بطاقة ذكية RFID / NFC 13.56MHz (غرف فنادق ودخول ذكي)', value: 'rfid_nfc' },
              { id: 'magnetic_hico', label_ar: 'بطاقة بشريط ممغنط عالي الكثافة (HiCo Magnetic Stripe)', value: 'magnetic' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-event-lanyards-badges', 'srv-bizcards-luxury'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 30. Official Trodat & Laser Stamps
  {
    id: 'srv-official-stamps',
    name_ar: 'الأختام الرسمية الميكانيكية والليزرية الأصلية (Trodat & Laser Stamps)',
    name_en: 'Original Trodat Self-Inking & Laser Engraved Official Corporate Stamps',
    slug: 'official-trodat-laser-stamps',
    department_id: 'dept-security',
    category_id: 'cat-official-stamps',
    industry_sector_ids: ['sec-corporate-business', 'sec-healthcare-clinics'],
    short_description_ar: 'أختام أوتوماتيكية ذاتية التحبير ماركة Trodat النمساوية، أختام شمعية، وأختام جيب وتواريخ مؤمنة.',
    full_description_ar: 'الختم الرسمي هو توقيع المؤسسة المعتمد. نقوم بحفر ربلات الأختام بالليزر عالي الدقة وتجميعها على هياكل أختام Trodat النمساوية الأصلية ذاتية التحبير لضمان وضوح الشعار وتفاصيل النصوص لآلاف الطبعات دون تسريب أو بهتان.',
    hero_image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'ماركة Trodat النمساوية الأصلية',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 30,
    seo_title: 'تصنيع أختام رسمية وأختام تودات في صنعاء واليمن | رواج',
    seo_description: 'أختام رسمية أوتوماتيكية للشركات والمستشفيات بحفر ليزري ناعم وضمان عدم التسريب.',
    highlights: [
      { id: 'h1', title_ar: 'حفر ليزري فائق النعومة للشعارات الدقيقة', description_ar: 'نقل أدق الخطوط والنصوص بدون أي تداخل في الحبر.' },
      { id: 'h2', title_ar: 'أحبار وثائقية غير قابلة للتزوير', description_ar: 'حبر مقاوم للماء والجفاف السريع على المستندات الرسمية.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هي الوثائق المطلوبة لطلب ختم رسمي لشركة أو منشأة؟', answer_ar: 'يتطلب إرفاق صورة السجل التجاري والتفويض الرسمي لحماية حقوق المنشأة.' },
    ],
    specification_groups: [
      {
        id: 'grp-stmp-spec',
        title_ar: 'شكل الختم والمقاس',
        sort_order: 1,
        fields: [
          {
            id: 'stmp-shape',
            key: 'stamp_shape',
            label_ar: 'شكل وموديل الختم',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'round_stamp', label_ar: 'ختم دائري رسمي أوتوماتيكي (قطر 40 أو 45 مم)', value: 'round' },
              { id: 'rect_stamp', label_ar: 'ختم مستطيل للمناصب والمسميات والاعتمادات (Trodat Printy)', value: 'rectangle' },
              { id: 'pocket_stamp', label_ar: 'ختم جيب متنقل للأطباء والمهندسين (Pocket Stamp)', value: 'pocket' },
              { id: 'dater_numberer', label_ar: 'ختم تاريخ وأرقام تسلسلية متحركة (Dater Stamp)', value: 'dater' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-ncr-invoices', 'srv-bizcards-luxury'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 31. 3D Hologram & Void Security Labels
  {
    id: 'srv-security-hologram',
    name_ar: 'الملصقات الأمنية ثلاثية الأبعاد وشواهد الضمان (3D Hologram & Void Labels)',
    name_en: 'Custom 3D Hologram Stickers & Tamper Evident Void Security Labels',
    slug: '3d-hologram-void-security-labels',
    department_id: 'dept-security',
    category_id: 'cat-security-labels',
    industry_sector_ids: ['sec-factories-fmcg', 'sec-retail-boutiques'],
    short_description_ar: 'ملصقات هولوجرام ليزرية ثلاثية الأبعاد وستيكرات شواهد الضمان التي تترك أثر Void عند نزعها لمنع الغش والتقليد.',
    full_description_ar: 'احمِ منتجاتك وعلامتك التجارية من التقليد والتلاعب. ننتج ملصقات الهولوجرام البصرية المتغيرة مع زوايا الضوء، وملصقات الضمان الحساسة (Tamper Evident) التي تتلف فورياً عند محاولة فك الأجهزة الإلكترونية أو علب الأدوية ومستحضرات التجميل.',
    hero_image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'حماية مانعة للتقليد والتلاعب',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 31,
    seo_title: 'طباعة ستيكرات هولوجرام وضمان Void في اليمن | رواج',
    seo_description: 'ملصقات هولوجرام ثلاثية الأبعاد وستيكرات ضمان المنتجات الإلكترونية والدوائية لمنع الغش.',
    highlights: [
      { id: 'h1', title_ar: 'تأثير بصري ثلاثي الأبعاد مستحيل النسخ بالماسحات', description_ar: 'تشفير ليزري يعكس الألوان بأطياف قزحية متغيرة.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ماذا يحدث عند محاولة نزع ملصق الـ Void؟', answer_ar: 'يترك الملصق كلمة "VOID" أو نمط الشطرنج على السطح ويتمزق الغشاء الخارجي نهائياً.' },
    ],
    specification_groups: [
      {
        id: 'grp-hlg-spec',
        title_ar: 'نوع الحماية الأمنية',
        sort_order: 1,
        fields: [
          {
            id: 'hlg-type',
            key: 'security_type',
            label_ar: 'نوع الملصق الأمني',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'hologram_3d', label_ar: 'ملصق هولوجرام فضي/ذهبي ثلاثي الأبعاد مع الشعار والترقيم', value: 'hologram' },
              { id: 'tamper_void', label_ar: 'ملصق أمان Void يترك أثراً عند الفك (لحماية الأجهزة)', value: 'void' },
              { id: 'destructible_egg', label_ar: 'ملصق قشر البيض الهش (يتفتت لقطع ميكروسكوبية عند اللمس)', value: 'eggshell' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-roll-labels', 'srv-folding-cartons'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 32. Stand-up Doypack & Pouches
  {
    id: 'srv-flexible-pouches',
    name_ar: 'أكياس التغليف المرنة ذاتية الوقوف (Stand-up Doypack Pouches & Coffee Bags)',
    name_en: 'Custom Printed Stand-Up Doypack Pouches & Degassing Valve Coffee Bags',
    slug: 'custom-stand-up-doypack-pouches',
    department_id: 'dept-flexible-packaging',
    category_id: 'cat-doypack-pouches',
    industry_sector_ids: ['sec-factories-fmcg', 'sec-restaurants-cafes'],
    short_description_ar: 'أكياس دوي باك ذاتية الوقوف بسحاب إغلاق Zipper وصمام تفريغ هواء أحادي الاتجاه لتغليف البن، الشاي والمكسرات.',
    full_description_ar: 'التغليف الأكثر انتشاراً وجاذبية لمنتجات البن المختص، الأغذية المجففة، والبهارات. نوفر أكياس الـ Doypack ثلاثية الطبقات العازلة للأكسجين والرطوبة، مع سحاب إغلاق محكم، شق فتح سهل (Tear Notch)، وصمام أحادي الاتجاه لحفظ نكهة القهوة الطازجة.',
    hero_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'حفظ نكهة وعزل تام',
    service_status: 'published',
    execution_model: 'mixed',
    featured: true,
    sort_order: 32,
    seo_title: 'تصنيع أكياس بن ودوي باك Doypack في اليمن | رواج للتغليف',
    seo_description: 'أكياس دوي باك ذاتية الوقوف للبن والمكسرات بصمام تفريغ الهواء وسحاب محكم بجودة طباعة عالمية.',
    highlights: [
      { id: 'h1', title_ar: 'طبقات حماية ثلاثية عازلة للرطوبة والأكسجين', description_ar: 'تضمن بقاء المنتج طازجاً لفترات صلاحية طويلة على رفوف المتاجر.' },
      { id: 'h2', title_ar: 'صمام تفريغ هواء أحادي الاتجاه للبن المختص', description_ar: 'يسمح بخروج غازات التحميص ويمنع دخول الهواء الخارجي.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'ما هي الخامات الخارجية المتوفرة لأكياس الدوي باك؟', answer_ar: 'نوفر الكرافت الطبيعي البيئي، المات الأسود الفاخر، والألمنيوم الفضي اللامع مع طباعة ملونة كاملة.' },
    ],
    specification_groups: [
      {
        id: 'grp-doy-spec',
        title_ar: 'السعة وخيارات الصمام والسحاب',
        sort_order: 1,
        fields: [
          {
            id: 'doy-capacity',
            key: 'pouch_size',
            label_ar: 'سعة كيس الدوي باك',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'size_250g', label_ar: '250 جرام (المقاس المثالي للبن والشاي الفاخر)', value: '250g' },
              { id: 'size_500g', label_ar: '500 جرام (نصف كيلو)', value: '500g' },
              { id: 'size_1kg', label_ar: '1 كجم (1000 جرام كبير)', value: '1kg' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-roll-labels', 'srv-paper-bags-luxury'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 33. Custom LED Neon Flex Signage
  {
    id: 'srv-neon-flex',
    name_ar: 'لوحات النيون فليكس المعاصر (Custom LED Neon Flex Signage)',
    name_en: 'Custom Handcrafted LED Neon Flex Art & Decorative Signage',
    slug: 'custom-led-neon-flex-signage',
    department_id: 'dept-neon-decor',
    category_id: 'cat-neon-flex',
    industry_sector_ids: ['sec-restaurants-cafes', 'sec-retail-boutiques'],
    short_description_ar: 'لوحات نيون سيليكون مرنة آمنة 12V على ألواح أكريليك شفافة لتزيين المقاهي والمكاتب وجلسات التصوير.',
    full_description_ar: 'اللمسة الديكورية الأكثر جاذبية للشباب ومواقع التواصل الاجتماعي. نصنع لوحات النيون فليكس يدوياً باستخدام أنابيب سيليكون مرنة LED موفرة للطاقة وغير قابلة للكسر ومثبتة على ألواح أكريليك مقصوصة ليزرياً مع محول ومفتاح تحكم بالسطوع (Dimmer).',
    hero_image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'ديكور عصري جذاب للتصوير',
    service_status: 'published',
    execution_model: 'in_house',
    featured: true,
    sort_order: 33,
    seo_title: 'تصنيع لوحات نيون فليكس LED في صنعاء واليمن | رواج',
    seo_description: 'لوحات نيون مضيئة مخصصة للمقاهي والمحلات وجلسات البث بأحدث تقنيات السيليكون الآمن.',
    highlights: [
      { id: 'h1', title_ar: 'إضاءة آمنة لا تسخن ولا تنكسر', description_ar: 'تعمل بجهد منخفض 12V مع سيليكون مرن آمن للمس.' },
      { id: 'h2', title_ar: 'أكريليك مقصوص ومصقول ليزرياً', description_ar: 'خلفية شفافة تماماً تظهر فقط الرسم والعبارة المضيئة.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل يمكن تشكيل أي عبارة أو خط عربي بالنيون؟', answer_ar: 'نعم، يقوم خطاطونا ومصممونا بمحاكاة الخطوط العربية والإنجليزية بدقة متناهية.' },
    ],
    specification_groups: [
      {
        id: 'grp-neon-spec',
        title_ar: 'لون الإضاءة وحجم اللوحة',
        sort_order: 1,
        fields: [
          {
            id: 'neon-color',
            key: 'light_color',
            label_ar: 'لون النيون المفضل',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'warm_white', label_ar: 'أبيض دافئ (Warm White - الأكثر طلباً للكافيهات)', value: 'warm_white' },
              { id: 'crimson_red', label_ar: 'أحمر قرمزي (Crimson Red - هوية رواج الحيوية)', value: 'red' },
              { id: 'ice_blue', label_ar: 'أزرق ثلجي (Ice Blue عصري)', value: 'ice_blue' },
              { id: 'pink_purple', label_ar: 'وردي / بنفسجي جذاب لصالونات التجميل والمتاجر', value: 'pink' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-channel-letters', 'srv-restaurant-menus'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },

  // 34. Architectural Wayfinding & Door Signs
  {
    id: 'srv-wayfinding-signs',
    name_ar: 'اللوحات الإرشادية والتوجيهية وتسمية المكاتب (Architectural Wayfinding)',
    name_en: 'Architectural Wayfinding, Office Nameplates & Directional Signage',
    slug: 'architectural-wayfinding-door-signs',
    department_id: 'dept-neon-decor',
    category_id: 'cat-wayfinding-signs',
    industry_sector_ids: ['sec-corporate-business', 'sec-healthcare-clinics'],
    short_description_ar: 'لوحات ألومنيوم أنودايزد منحنية، لوحات أرقام غرف الفنادق والمستشفيات، وعلامات الطوارئ المضيئة ذاتياً.',
    full_description_ar: 'المنظومة التوجيهية الشاملة للمباني الإدارية والمستشفيات والفنادق. نصنع اللوحات الإرشادية المعمارية من قطاعات الألومنيوم الأنودايزد المنحنية والمستوية مع سهولة تبديل الأسماء، ولوحات الأكريليك المعلقة على مسامير استانلس ستيل فاخرة (Standoffs).',
    hero_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'تنظيم وتوجيه معماري راقٍ',
    service_status: 'published',
    execution_model: 'in_house',
    featured: false,
    sort_order: 34,
    seo_title: 'تصنيع لوحات إرشادية للمباني وتسمية مكاتب في اليمن | رواج',
    seo_description: 'لوحات إرشادية وتوجيهية للمستشفيات والشركات والفنادق بأعلى معايير الجودة والتصميم.',
    highlights: [
      { id: 'h1', title_ar: 'قطاعات ألومنيوم أنودايزد مقاومة للخدش', description_ar: 'سهولة إزاحة الشريحة وتعديل اسم الموظف أو القسم.' },
    ],
    faq: [
      { id: 'f1', question_ar: 'هل تشمل الخدمة دراسة مخطط مسارات المبنى وتوزيع اللوحات؟', answer_ar: 'نعم، يقدم مهندسونا دراسة كاملة لمسارات الحركة والتدفق داخل المنشأة.' },
    ],
    specification_groups: [
      {
        id: 'grp-way-spec',
        title_ar: 'نوع اللوحة الإرشادية',
        sort_order: 1,
        fields: [
          {
            id: 'way-sign-type',
            key: 'sign_system',
            label_ar: 'نوع اللوحة التوجيهية',
            type: 'select',
            required: true,
            sort_order: 1,
            options: [
              { id: 'door_plate', label_ar: 'لوحة مسمى باب مكتب (ألومنيوم منحني أو أكريليك على مسامير اسبيسر)', value: 'door_plate' },
              { id: 'floor_directory', label_ar: 'لوحة دليل الأدوار الرئيسي في بهو الاستقبال (Directory Board)', value: 'directory' },
              { id: 'suspended_corridor', label_ar: 'لوحات معلقة في ممرات المستشفيات والشركات على الوجهين', value: 'suspended' },
            ],
          },
        ],
      },
    ],
    related_service_ids: ['srv-channel-letters', 'srv-official-stamps'],
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-02T10:00:00Z',
  },
];

export const EXPANDED_PACKAGES: Package[] = [
  {
    id: 'pkg-cafe-restaurant-setup',
    title_ar: 'باقة افتتاح وتجهيز الكافيهات والمطاعم المتكاملة',
    title_en: 'Turnkey Cafe & Restaurant Launch Package',
    slug: 'cafe-restaurant-launch-package',
    tagline_ar: 'كل ما يحتاجه مطعمك وكافيهك من منيو مقاوم للماء، ورقيات السفرة، لوحة النيون، ويونيفورم العمل.',
    description_ar: 'صممت هذه الباقة خصيصاً للمطاعم والكافيهات الحديثة لتوفير كامل مستلزمات المائدة والواجهة بطلب عرض سعر موحد وإشراف فني شامل.',
    hero_image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    badge: 'الأكثر طلباً للكافيهات والمطاعم',
    featured: true,
    service_ids: [
      'srv-restaurant-menus',
      'srv-hospitality-disposables',
      'srv-neon-flex',
      'srv-dtf-apparel',
      'srv-roll-labels',
      'srv-paper-bags-luxury'
    ],
    benefits_ar: [
      'توحيد الهوية البصرية بين ديكور المقهى وقائمة الطعام ومفارش المائدة.',
      'خامات مقاومة للماء والزيوت ومطابقة للاشتراطات الصحية.',
      'توفير حتى 25% مقارنة بطلب كل خدمة على حدة.',
    ],
    sort_order: 4,
  },
  {
    id: 'pkg-exhibition-booth-pack',
    title_ar: 'باقة المشاركة في المعارض والمؤتمرات الكبرى',
    title_en: 'Exhibition & Event Turnkey Participation Package',
    slug: 'exhibition-event-participation-package',
    tagline_ar: 'بناء البوث 3D، ستاندات الرول أب، شرائط الـ Lanyards، بروشورات الشركة، وهدايا الزوار VIP.',
    description_ar: 'الباقة الشاملة للمؤسسات والشركات المشاركة في المعارض والملتقيات السنوية لضمان حضور فخم واستثنائي يسرق الأنظار.',
    hero_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    badge: 'حلول المعارض المتكاملة',
    featured: true,
    service_ids: [
      'srv-exhibition-booths',
      'srv-portable-displays',
      'srv-event-lanyards-badges',
      'srv-brochures-catalogs',
      'srv-corporate-gift-sets'
    ],
    benefits_ar: [
      'تصميم ثلاثي الأبعاد 3D مجاني للبوث قبل بدء الفعالية.',
      'تجهيز وطباعة سريعة مع التوصيل والتركيب الميداني في قاعة المعرض.',
      'إشراف هندسي وتنفيذي متكامل يضمن سلامة المنظومة.',
    ],
    sort_order: 5,
  }
];
