import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Search, 
  Camera, 
  Layers, 
  Palette, 
  FileText, 
  ExternalLink,
  Info,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MASTER_RAWAJ_PROMPT = `High-end commercial product mockup photography for "Rawaj Advertising & Printing", clean 4:3 horizontal aspect ratio composition, studio product showcase mockup, no large cluttered advertising text, minimalist luxury presentation. Color palette featuring Rawaj brand identity: deep matte charcoal black, bold Rawaj crimson red (#B9142D) accents, crisp clean white, and subtle metallic gold foil accents. Professional studio lighting with soft diffused shadows, high texture clarity showing paper grain, embossed details, tactile matte soft-touch finish, metallic sheen, or illuminated LED halo glow. Minimalist modern concrete or dark wooden tabletop background, 8k resolution, photorealistic, premium editorial commercial catalog style, subtle understated "Rawaj" branding emblem.`;

export interface ServicePromptItem {
  id: string;
  serviceNameAr: string;
  categoryNameAr: string;
  departmentNameAr: string;
  prompt: string;
  negativePrompt: string;
  tipsAr: string;
}

export const RAWAJ_SERVICE_PROMPTS: ServicePromptItem[] = [
  {
    id: 'srv-ncr-invoices',
    serviceNameAr: 'دفاتر وسندات فواتير كربونية NCR فاخرة',
    categoryNameAr: 'دفاتر وفواتير كربونية',
    departmentNameAr: 'الطباعة الورقية والتجارية',
    prompt: `Professional studio mockup of luxury corporate NCR carbonless invoice book and receipt voucher set, branded for "Rawaj Printing". Displaying a multi-part continuous form (white original top sheet, soft yellow and pink duplicate sheets underneath) stacked neatly on a dark minimalist office desk. Detailed perforation lines, sequential mechanical red numbering in the corner, crisp printed grid lines, hardcover binding with black leatherette spine wrap. Angled top-down flat lay view, soft cinematic studio light casting gentle shadows, highlighting paper tactile texture, high resolution, 4:3 ratio, no messy text, photorealistic.`,
    negativePrompt: `low quality, blurry, illegible random letters, cartoon, fake illustration, distorted perspective, extra fingers, text watermark clutter`,
    tipsAr: 'ركز على إبراز الأوراق متعددة النسخ (أبيض، أصفر، وردي) مع التخريم وخط الكعب الأسود.'
  },
  {
    id: 'srv-bizcards-luxury',
    serviceNameAr: 'بطاقات أعمال فاخرة (Business Cards) مع تشطيبات خاصة',
    categoryNameAr: 'المطبوعات المكتبية والهوية',
    departmentNameAr: 'الطباعة الورقية والتجارية',
    prompt: `Luxury executive business cards mockup for "Rawaj". A neat stack of heavy 350gsm ultra-matte black and crisp white business cards resting on an architectural dark stone pedestal. Featuring prominent raised metallic gold foil stamping and glossy embossed Spot UV logo elements catching dramatic side rim lighting. Sharp painted edges in crimson red, soft-touch velvet lamination texture clearly visible in macro focus. Minimalist studio setting, depth of field blur in background, 4:3 aspect ratio, ultra-detailed, 8k, photorealistic commercial product shot.`,
    negativePrompt: `generic white card, distorted logo, grainy noise, low resolution, flat lighting, amateur mockup`,
    tipsAr: 'الإضاءة الجانبية تبرز لمعان البصمة الذهبية (Gold Foil) وبروز الـ Spot UV على خلفية مطفية.'
  },
  {
    id: 'srv-roll-labels',
    serviceNameAr: 'ملصقات الرول لخطوط الإنتاج والعبوات (BOPP مقاوم للماء)',
    categoryNameAr: 'ملصقات الرول لخطوط الإنتاج',
    departmentNameAr: 'الملصقات والليبل والستيكر',
    prompt: `Commercial product mockup of industrial roll labels for automated bottling lines, produced by "Rawaj Labels". A large core roll of waterproof white gloss BOPP die-cut labels unwinding smoothly across a clean stainless steel studio surface, standing next to a luxury amber glass dropper bottle and honey jar displaying the applied label with metallic accents and crisp barcode. Macro close-up on the peeling edge showing adhesive quality and clean kiss-cut border, bright controlled commercial lighting with crisp reflections, 4:3 ratio, 8k resolution.`,
    negativePrompt: `torn label, dirty background, misaligned print, pixelated, 3d render errors, messy text`,
    tipsAr: 'يُظهر الرول الملفوف جزئياً بجانب عبوة زجاجية فاخرة لتوضيح جاهزية ماكينات اللصق.'
  },
  {
    id: 'srv-vehicle-wraps',
    serviceNameAr: 'تجليد ورسومات المركبات والشاحنات (Vehicle Graphics & Full Wrap)',
    categoryNameAr: 'تجليد ورسومات المركبات',
    departmentNameAr: 'الطباعة كبيرة الحجم (Large Format)',
    prompt: `Automotive commercial photography of a modern commercial fleet delivery van with full premium vinyl wrap branding by "Rawaj". Sleek aerodynamic dynamic design featuring satin charcoal black base, vibrant crimson red geometric gradient stripes, and clean crisp white typography. Parked inside a high-tech modern automotive studio showroom with glossy polished reflective floor, dramatic overhead softbox panel lighting reflecting smoothly across the curved fenders and panels, ultra high resolution, 4:3 aspect ratio, cinematic automotive catalog style.`,
    negativePrompt: `scratched paint, low poly, toy car, deformed wheels, unrealistic reflections, messy background`,
    tipsAr: 'يعكس الموك آب لمعان الفينيل وجودة التجليد على انحناءات السيارة في استوديو سيارات فاخر.'
  },
  {
    id: 'srv-channel-letters',
    serviceNameAr: 'حروف بارزة مضيئة (Face-Lit & Halo-Lit 3D Channel Letters)',
    categoryNameAr: 'الحروف البارزة المضيئة',
    departmentNameAr: 'اللوحات الإعلانية والإشارات (Signage)',
    prompt: `Architectural exterior photography of custom 3D fabricated channel letters signage mounted on a dark textured granite and matte black aluminum facade, crafted by "Rawaj Signage". Combining face-lit vibrant warm white acrylic and dramatic reverse halo-lit crimson red LED glow washing softly against the architectural wall. Brushed stainless steel metal returns, zero visible screws, crisp modern aesthetic. Captured at dusk / twilight with atmospheric lighting, 4:3 aspect ratio, ultra-crisp architectural photography, photorealistic, 8k.`,
    negativePrompt: `burnt out bulbs, uneven lighting, cartoonish 3d, messy cables, low res, blur, distorted wall`,
    tipsAr: 'تصوير الواجهة في وقت الغسق (Dusk) لإبراز التوهج المزدوج (Face-lit & Halo-lit) على الجدار.'
  },
  {
    id: 'srv-folding-cartons',
    serviceNameAr: 'علب كرتون فاخرة للمنتجات والعطور ومستحضرات التجميل (Folding Cartons)',
    categoryNameAr: 'علب الكرتون الفاخرة والدوائية',
    departmentNameAr: 'التغليف والعلب والأكياس',
    prompt: `High-end cosmetic and perfume folding carton packaging mockup by "Rawaj Packaging". An elegant custom rectangular tuck-end box made of premium virgin FBB ivory board with smooth matte black and warm crimson red design, embossed gold foil crest logo, and precision creased folds. Positioned at a 3/4 angle next to a matching luxury glass perfume bottle on a smooth travertine stone podium. Soft directional studio lighting highlighting the embossed tactile texture and crisp sharp edges, 4:3 ratio, clean luxury commercial style.`,
    negativePrompt: `dented carton, poor creases, cartoon, fake rendering, text clutter, noisy shadows`,
    tipsAr: 'إبراز زوايا الطي والريجة الدقيقة مع بصمة الشعار الذهبية بجانب منتج تجميلي راقٍ.'
  },
  {
    id: 'srv-acp-cladding',
    serviceNameAr: 'تكسية واجهات كلادينج ألومنيوم (ACP Cladding) والديكور التجاري',
    categoryNameAr: 'واجهات الكلادينج ACP',
    departmentNameAr: 'الواجهات والديكور والكلادينج',
    prompt: `Architectural photography of a contemporary commercial building facade featuring premium Aluminum Composite Panel (ACP) cladding installation by "Rawaj". Seamless geometric panels in matte metallic anthracite gray and accent crimson red with crisp clean silicone joint lines. Integrated modern architectural LED linear wall-washers, large frameless glass showroom windows on ground level. Golden hour natural sunlight creating elegant specular reflections, wide 4:3 composition, ultra-sharp detail, photorealistic modern architecture.`,
    negativePrompt: `warped panels, dirty glass, low resolution, messy construction, oversaturated, amateur render`,
    tipsAr: 'تركيز على الفواصل الهندسية المنتظمة ولمعان دهان الـ PVDF المقاوم للشمس.'
  },
  {
    id: 'srv-dtf-apparel',
    serviceNameAr: 'طباعة التيشيرتات والزي الموحد بتقنية الـ DTF فائقة الدقة',
    categoryNameAr: 'تيشيرتات وبولو وزي العمل',
    departmentNameAr: 'الطباعة على الملابس والمنسوجات',
    prompt: `Commercial apparel product mockup of a premium heavyweight black cotton crewneck t-shirt and pique polo shirt featuring vibrant Direct-to-Film (DTF) full-color graphic print on chest, customized by "Rawaj". Macro shot showcasing the ultra-sharp color gradients, fine lines, flexible smooth ink finish seamlessly embedded into the natural fabric weave texture without cracking. Neatly folded on a rustic dark wooden tabletop with soft natural side lighting, 4:3 horizontal aspect ratio, premium fashion lookbook aesthetic.`,
    negativePrompt: `blurry fabric, distorted print, cracked plastic look, plastic doll, low quality texture`,
    tipsAr: 'ماكرو مقرب يوضح اندماج طباعة الـ DTF مع نسيج القطن بنعومة ودقة ألوان متناهية.'
  },
  {
    id: 'srv-promotional-mugs',
    serviceNameAr: 'أكواب ومطارات حرارية بطباعة وحفر ليزري للهدايا المؤسسية',
    categoryNameAr: 'الأكواب والمطارات الحرارية',
    departmentNameAr: 'الهدايا الدعائية والمؤسسية',
    prompt: `Studio product mockup of executive corporate drinkware set by "Rawaj Gifts". Featuring a matte black double-wall stainless steel vacuum insulated tumbler with crisp silver laser engraved logo, alongside a minimalist ceramic coffee mug with gloss red interior and subtle debossed emblem. Resting on an executive office concrete desk with a warm cup of coffee emitting soft steam. Shallow depth of field, warm cinematic lighting, 4:3 ratio, crisp metal texture and engraving clarity, 8k resolution.`,
    negativePrompt: `cheap plastic, peeling print, low res, oversaturated, distorted shape, cartoon render`,
    tipsAr: 'يبرز الحفر الليزري الفضي الناعم على طلاء المات الأسود للمطارة الحرارية.'
  },
  {
    id: 'srv-paper-bags-luxury',
    serviceNameAr: 'أكياس ورقية فاخرة للشركات والمتاجر (Custom Luxury Paper Bags)',
    categoryNameAr: 'الأكياس الورقية الفاخرة',
    departmentNameAr: 'التغليف والعلب والأكياس',
    prompt: `Luxury boutique shopping bag mockup produced by "Rawaj Packaging". An upright custom crafted matte black 250gsm kraft paper bag with thick crimson red woven braided cotton rope handles and embossed metallic gold foil emblem centered. Standing on a polished terrazzo marble floor, perfectly reinforced bottom base, subtle paper grain texture visible under soft studio lighting, 4:3 framing, high-end retail look, photorealistic, pristine quality.`,
    negativePrompt: `wrinkled paper, torn handles, cheap glossy plastic, blurry, distorted proportions`,
    tipsAr: 'إظهار فخامة حبال اليد المبرومة وسماكة الورق مع لمعان البصمة الذهبية.'
  },
  {
    id: 'srv-brochures-catalogs',
    serviceNameAr: 'بروشورات وكتالوجات تعريفية ومجلات (Brochures & Catalogs)',
    categoryNameAr: 'المطبوعات الترويجية والبروشورات',
    departmentNameAr: 'الطباعة الورقية والتجارية',
    prompt: `Editorial mockup of corporate brochures and multi-page catalog booklet, printed by "Rawaj". Displaying a tri-fold glossy brochure fanned open next to a thick saddle-stitched product catalog lying on a minimalist oak wood surface. Sharp vibrant CMYK color pages, perfect score fold creases, rich contrast, soft natural shadows cast from a nearby window, 4:3 aspect ratio, photorealistic print showcase, clean corporate presentation.`,
    negativePrompt: `jagged fold lines, misaligned pages, blurry text, oversaturated, low resolution, messy lighting`,
    tipsAr: 'بروشور ثلاثي الطي مفتوح جزئياً بجانب كتالوج متعدد الصفحات لإظهار نقاء ألوان الأوفست.'
  },
  {
    id: 'srv-corrugated-boxes',
    serviceNameAr: 'صناديق كرتون مضلع للشحن والتصدير (Corrugated Shipping Boxes)',
    categoryNameAr: 'صناديق الشحن والكرتون المضلع',
    departmentNameAr: 'التغليف والعلب والأكياس',
    prompt: `Commercial product mockup of custom printed e-commerce corrugated mailer shipping box by "Rawaj Packaging". Premium sturdy kraft cardboard box with crisp black and red flexographic printed branding on top lid and interior unboxing pattern. Opened at a slight 45-degree angle to show clean structural E-flute interior and self-locking tabs. Placed in a clean modern logistics studio environment, soft directional light, 4:3 ratio, ultra-realistic texture and edge detail.`,
    negativePrompt: `crushed box, dented cardboard, dirty floor, blurry print, bad perspective`,
    tipsAr: 'صندوق شحن مضلع مفتوح بزاوية 45 درجة لإظهار جودة الكرتون وقفل الأمان والطباعة الداخلية.'
  },
  {
    id: 'srv-rigid-gift-boxes',
    serviceNameAr: 'علب هدايا صلبة فاخرة (Rigid Luxury Gift Boxes)',
    categoryNameAr: 'علب الكرتون الفاخرة والدوائية',
    departmentNameAr: 'التغليف والعلب والأكياس',
    prompt: `Ultra-luxury rigid gift box mockup with magnetic closure crafted by "Rawaj Luxury Packaging". 3mm thick solid board wrapped in textured matte black specialty paper with hot-stamped gold foil logo on lid. The box lid is opened gracefully to reveal a custom precision laser-cut crimson velvet foam insert holding a luxury perfume bottle and watch. Resting on a dark slate background with warm dramatic side lighting, 4:3 ratio, 8k resolution, ultra-detailed luxury aesthetic.`,
    negativePrompt: `flimsy cardboard, rough glued edges, fake 3d, cartoon, poor foam cut, low res`,
    tipsAr: 'علبة هدايا صلبة بغطاء مغناطيسي مفتوح يظهر السرير المخملي المقصوص بالليزر.'
  },
  {
    id: 'srv-outdoor-banners',
    serviceNameAr: 'بنرات وفلكس إعلاني كبير للمعارض والواجهات (PVC Banners)',
    categoryNameAr: 'البنرات والفلكس الإعلاني',
    departmentNameAr: 'الطباعة كبيرة الحجم (Large Format)',
    prompt: `Outdoor commercial photography of a large heavy-duty 510gsm PVC flex banner installed at an upscale modern exhibition entrance hall, printed by "Rawaj". Stretched flat and tight on a sleek black metal truss frame with heavy-duty silver brass grommets and tension cords. Vibrant, high-contrast promotional graphics with deep saturated colors, realistic outdoor ambient sunlight with clear sky reflections, 4:3 aspect ratio, architectural outdoor realism, 8k.`,
    negativePrompt: `sagging banner, torn grommets, wrinkled vinyl, pixelated graphic, low res render`,
    tipsAr: 'تثبيت مشدود على فريم معدني بحلقات نحاسية متينة وألوان مشبعة تدل على جودة أحبار الـ PVC.'
  },
  {
    id: 'srv-flex-lightboxes',
    serviceNameAr: 'صناديق إضاءة فلكس بوكس ولوحات إعلانية (Flex Lightboxes)',
    categoryNameAr: 'صناديق الإضاءة واللوحات',
    departmentNameAr: 'اللوحات الإعلانية والإشارات (Signage)',
    prompt: `Architectural nighttime product shot of an ultra-bright illuminated backlit flex lightbox sign mounted on a modern retail building exterior by "Rawaj Signage". Powder-coated aluminum profile frame, vibrant translucent printed backlit fabric glowing with flawless uniform LED diffusion and zero dark hot spots. Sharp crisp graphics popping against the night atmosphere, 4:3 aspect ratio, photorealistic night photography.`,
    negativePrompt: `dark patches, uneven lighting, washed out colors, low resolution, blown-out glare, distorted frame`,
    tipsAr: 'تصوير ليلي للصندوق المضيء لإبراز تجانس إضاءة الـ LED الخلفية ونقاء طباعة الباك ليت.'
  },
  {
    id: 'srv-computerized-embroidery',
    serviceNameAr: 'التطريز الآلي المباشر للشعارات والزي الموحد (Computerized Embroidery)',
    categoryNameAr: 'تيشيرتات وبولو وزي العمل',
    departmentNameAr: 'التطريز الآلي المباشر والشارات',
    prompt: `Extreme macro close-up photography of precision computerized logo embroidery on heavy navy blue cotton twill uniform fabric, executed by "Rawaj". Intricate 3D puff embroidery stitching with lustrous silk and polyester threads in vibrant crimson red, metallic gold, and white. Every individual thread, tension stitch, and raised fiber captured in razor-sharp focus with gentle directional rim light, 4:3 framing, textile macro masterpiece.`,
    negativePrompt: `loose threads, frayed edges, flat print, blurry macro, digitized noise, low resolution`,
    tipsAr: 'تصوير ماكرو فائق الدقة يُظهر لمعان خيوط الحرير وبروز غرز التطريز ثلاثية الأبعاد (3D Puff).'
  },
  {
    id: 'srv-corporate-gift-sets',
    serviceNameAr: 'مجموعات هدايا المؤسسات والـ VIP بحفر ليزري موحد',
    categoryNameAr: 'مجموعات الهدايا والأقلام',
    departmentNameAr: 'الهدايا الدعائية والمؤسسية',
    prompt: `Executive VIP corporate gift set mockup organized inside a luxury matte presentation box, produced by "Rawaj Gifts". Set includes a debossed Italian leather A5 notebook, sleek weighted matte black metal ballpoint pen with laser engraving, slim metallic USB flash drive, and a stainless steel thermal tumbler. All items unified with consistent "Rawaj" brand accents. Studio flat lay arrangement on dark concrete surface, soft diffused spotlight, 4:3 composition, ultra-luxurious corporate merchandising.`,
    negativePrompt: `mismatched items, cheap plastic look, messy arrangement, blurry, cartoon illustration`,
    tipsAr: 'ترتيب فلات لاي أنيق لطقم الهدايا الكامل (نوت بوك، قلم، فلاش، مج) بتناسق لوني تام.'
  },
  {
    id: 'srv-uv-flatbed-direct',
    serviceNameAr: 'الطباعة المباشرة UV على الأكريليك، الخشب، والمعادن (Flatbed UV)',
    categoryNameAr: 'قص وحفر الأكريليك والدروع',
    departmentNameAr: 'الطباعة التخصصية والـ UV المباشر',
    prompt: `High-precision product photography of direct UV flatbed printing on a thick polished clear acrylic block and natural solid walnut wood plaque by "Rawaj". Showcasing tactile raised UV varnish texture and opaque white ink underprint that creates a 3D layered tactile effect catching side studio light reflections. Clean bevelled glass-like polished edges, 4:3 aspect ratio, ultra-crisp material science and printing detail.`,
    negativePrompt: `scratched acrylic, peeling ink, pixelation, cloudy glass, distorted edges, bad lighting`,
    tipsAr: 'إظهار شفافية الأكريليك المصقول مع بروز حبر الـ UV الملموس على السطح.'
  },
  {
    id: 'srv-acrylic-trophies',
    serviceNameAr: 'دروع تكريمية ومجسمات أكريليك وخشب بالليزر (Custom Trophies & Awards)',
    categoryNameAr: 'قص وحفر الأكريليك والدروع',
    departmentNameAr: 'قص وحفر الليزر والروتر',
    prompt: `Prestigious custom corporate recognition award trophy mockup, crafted by "Rawaj Awards". Combination of 15mm thick crystal clear bevelled optical acrylic with fine laser etched calligraphy, layered against a dark solid mahogany wood base with brushed gold brass metal plaque. Dramatic studio spotlight creating brilliant internal light refraction and reflections through the crystal facets, standing on a dark reflective surface, 4:3 aspect ratio, 8k resolution.`,
    negativePrompt: `cloudy plastic, chipped corners, poor laser cut, low res, toy trophy, distorted reflections`,
    tipsAr: 'إبراز انكسار الضوء داخل الأكريليك الكريستالي السميك وتلميع الحواف وقاعدة الخشب الفاخرة.'
  },
  {
    id: 'srv-brand-identity-design',
    serviceNameAr: 'تصميم الهوية البصرية وتجهيز ملفات الطباعة (Brand Identity & Prepress)',
    categoryNameAr: 'المطبوعات المكتبية والهوية',
    departmentNameAr: 'التصميم الفني والهوية البصرية',
    prompt: `Comprehensive brand identity stationery mockup showcase for "Rawaj", arranged in an exquisite isometric flat lay on a warm neutral desk. Featuring letterhead paper, branded envelopes, pocket presentation folder, executive business cards, metal ruler, Pantone color swatch guide, and tablet displaying vector vector logo construction grid lines. Cohesive crimson red, black, and white design language, soft elegant daylight shadows, 4:3 composition, pristine design agency showcase.`,
    negativePrompt: `cluttered messy layout, distorted papers, low quality vectors, cartoon, dark muddy shadows`,
    tipsAr: 'عرض فلات لاي متكامل يجمع أوراق المراسلات، الأظرف، كروت الأعمال مع دليل بانتون اللوني.'
  },
  {
    id: 'srv-oem-sourcing',
    serviceNameAr: 'تصنيع وتوريد الهدايا الدعائية من المصانع الخارجية (OEM Direct Sourcing)',
    categoryNameAr: 'التوريد المباشر للهدايا والمصانع',
    departmentNameAr: 'التوريد الخارجي ومشاريع المصانع الكبرى',
    prompt: `Industrial commercial photography of mass-manufactured customized corporate tech merchandise sourced by "Rawaj OEM Sourcing". Featuring rows of custom matte black and crimson red 20000mAh power banks, sleek metal USB drives, and Bluetooth earbuds in custom moulded cases embossed with "Rawaj". Arranged neatly on a high-tech factory inspection table with pristine packaging crates in soft background blur, crisp commercial lighting, 4:3 ratio, 8k resolution.`,
    negativePrompt: `broken electronics, messy factory floor, blurry, low res, deformed items`,
    tipsAr: 'إظهار كميات مصنعية متراصة بنظام وجودة عالية لتعزيز مفهوم التوريد المباشر من المصانع.'
  },
  {
    id: 'srv-led-screens',
    serviceNameAr: 'شاشات العرض الإلكترونية والـ LED Screens العملاقة',
    categoryNameAr: 'شاشات الـ LED الإلكترونية العملاقة',
    departmentNameAr: 'التوريد الخارجي ومشاريع المصانع الكبرى',
    prompt: `Architectural product photography of a large ultra-high-definition outdoor LED display video wall mounted on a modern commercial glass skyscraper facade by "Rawaj". Displaying vibrant, high-contrast dynamic colors with razor-sharp pixel pitch, seamless panel module alignment, and anti-glare louvers catching golden hour sunlight. 4:3 horizontal aspect ratio, pristine architectural realism, 8k.`,
    negativePrompt: `dead pixels, visible grid seams, distorted screen, blurry graphics, low dynamic range`,
    tipsAr: 'إظهار سطوع ونقاء شاشة الـ LED على واجهة مبنى عصري بزاوية 3/4 أفقية.'
  },
  {
    id: 'srv-pos-displays',
    serviceNameAr: 'ستاندات ونقاط البيع المخصصة ومجسمات العرض (POS & POP Displays)',
    categoryNameAr: 'ستاندات ونقاط البيع POS & POP',
    departmentNameAr: 'التوريد الخارجي ومشاريع المصانع الكبرى',
    prompt: `Retail merchandise floor display unit mockup by "Rawaj POS Displays". A freestanding heavy-duty matte black and red metal multi-tier display stand with illuminated header logo, loaded with neatly arranged luxury cosmetic bottles and perfume boxes. Placed inside a sleek modern department store aisle with polished reflective floor and soft ceiling spotlights, 4:3 aspect ratio, photorealistic retail product shot.`,
    negativePrompt: `empty shelves, tilted stand, crooked logo, blurry store background, messy goods`,
    tipsAr: 'ستاند عرض أرضي معدني متعدد الرفوف محمل بمنتجات مرتبة بإضاءة هيدر علوية.'
  },
  {
    id: 'srv-exhibition-booths',
    serviceNameAr: 'تصميم وبناء أجنحة وبوثات المعارض المتكاملة (Custom Exhibition Booths)',
    categoryNameAr: 'أجنحة وبوثات المعارض المخصصة',
    departmentNameAr: 'تجهيزات المعارض والمؤتمرات والفعاليات',
    prompt: `Architectural 3D exhibition booth mockup design executed by "Rawaj Events". A stunning modern 6x6m custom island trade show booth featuring clean matte black and red architectural arches, illuminated fabric hanging banner, integrated seamless LED video screen, reception promo counter, and luxury VIP meeting lounge. Set inside an international convention hall with ambient soft lighting, 4:3 aspect ratio, architectural master rendering, 8k.`,
    negativePrompt: `empty booth, crowded people blocking view, poor 3d render, dark messy corners`,
    tipsAr: 'تصميم جناح معرض متكامل (Island Booth) بأقواس خشبية وإضاءة محيطية واستقبال فاخر.'
  },
  {
    id: 'srv-portable-displays',
    serviceNameAr: 'منظومة الستاندات الإعلانية المتنقلة (Roll-ups, Pop-ups & Beach Flags)',
    categoryNameAr: 'أنظمة العرض المتنقلة والرول أب',
    departmentNameAr: 'تجهيزات المعارض والمؤتمرات والفعاليات',
    prompt: `Studio product showcase mockup of a portable corporate display bundle by "Rawaj". Featuring a heavy-duty wide aluminum base roll-up banner standing next to a large curved magnetic pop-up backdrop wall and a sleek promotional counter table with branded fabric wrap. Clean light gray studio floor, soft even commercial lighting, crisp 4:3 composition, ultra-detailed textures.`,
    negativePrompt: `curling banner edges, flimsy plastic base, distorted graphics, messy studio`,
    tipsAr: 'مجموعة متناسقة تجمع الرول أب، جدار البوب أب، وطاولة البرومو كاونتر.'
  },
  {
    id: 'srv-event-lanyards-badges',
    serviceNameAr: 'شرائط تعليق وبطاقات تعريف الفعاليات والمؤتمرات (Lanyards & Badges)',
    categoryNameAr: 'شرائط وبطاقات تعريف الحضور',
    departmentNameAr: 'تجهيزات المعارض والمؤتمرات والفعاليات',
    prompt: `Commercial product mockup of custom woven satin conference lanyards with crystal clear acrylic magnetic badge holders by "Rawaj". Displaying rich crimson red and black silky ribbon printed with crisp white vector logos, heavy-duty swivel metal lobster hook, and Quick-Release safety buckle. Placed flat on a textured dark slate surface with subtle conference agenda booklet in soft background, 4:3 ratio, macro focus.`,
    negativePrompt: `frayed ribbon, rusted hook, blurry badge, low quality plastic, crooked logo`,
    tipsAr: 'إظهار نعومة شريط الساتان مع لمعان الخطاف المعدني وبطاقة الـ PVC الشفافة.'
  },
  {
    id: 'srv-restaurant-menus',
    serviceNameAr: 'قوائم الطعام والمنيوهات الفاخرة المقاومة للماء (Luxury Restaurant Menus)',
    categoryNameAr: 'قوائم الطعام والمنيوهات الفاخرة',
    departmentNameAr: 'المنيوهات ومطبوعات المطاعم والضيافة',
    prompt: `Luxury restaurant menu binder and waterproof synthetic menu mockup crafted by "Rawaj Hospitality". An elegant padded black leather menu book with gold foil hot-stamped restaurant crest and antique brass corner protectors, resting open on a rustic dark walnut dining table next to a wine glass and table candle. Pages made of matte waterproof synthetic paper with crisp food typography, 4:3 horizontal aspect ratio, atmospheric restaurant lighting.`,
    negativePrompt: `wrinkled paper, stained pages, cheap plastic sleeve, blurry text, oversaturated dinner`,
    tipsAr: 'منيو جلدي مفتوح بزوايا نحاسية وأوراق سينثتيك غير قابلة للتمزق بجانب طاولة ضيافة راقية.'
  },
  {
    id: 'srv-hospitality-disposables',
    serviceNameAr: 'ورقيات ومفارش المائدة ومستلزمات الضيافة المطبوعة (Printed Tableware)',
    categoryNameAr: 'ورقيات ومفارش المائدة المطبوعة',
    departmentNameAr: 'المنيوهات ومطبوعات المطاعم والضيافة',
    prompt: `Artisan cafe tableware printing mockup by "Rawaj". Arranged on a wooden coffee shop counter: custom printed kraft paper placemat under an espresso cup, thick absorbent debossed beverage napkin, and a corrugated cardboard cup sleeve with crisp red logo. Warm ambient morning sunlight casting soft shadows, 4:3 composition, cozy cafe editorial aesthetic.`,
    negativePrompt: `soggy paper, dirty table, messy spills, distorted cup, low resolution`,
    tipsAr: 'ترتيب متناسق لمفرش الطاولة، حامل الكوب الكرتوني، والمناديل المطبوعة بأحبار آمنة.'
  },
  {
    id: 'srv-smart-pvc-cards',
    serviceNameAr: 'البطاقات البلاستيكية الذكية RFID / NFC (Smart PVC Cards)',
    categoryNameAr: 'البطاقات البلاستيكية الذكية RFID/NFC',
    departmentNameAr: 'البطاقات الذكية والأختام والأمن الطباعي',
    prompt: `High-tech product mockup of premium RFID / NFC smart PVC hotel keycards and corporate access cards by "Rawaj Security". A trio of CR80 matte black and gold foiled cards fanned out on a brushed metal electronic door sensor, showing embedded contactless microchip symbol, metallic embossed serial numbers, and glossy magnetic stripe on reverse side. Crisp macro photography, 4:3 ratio, futuristic security lighting.`,
    negativePrompt: `scratched plastic, blurry chip, bent card, amateur mockup, generic card`,
    tipsAr: 'بطاقات بلاستيكية فندقية ذكية بتقنية الـ NFC مع لمعان البصمة والتشفير.'
  },
  {
    id: 'srv-official-stamps',
    serviceNameAr: 'الأختام الرسمية الميكانيكية والليزرية (Trodat & Laser Stamps)',
    categoryNameAr: 'الأختام الرسمية الميكانيكية والليزر',
    departmentNameAr: 'البطاقات الذكية والأختام والأمن الطباعي',
    prompt: `Executive desk stationery mockup featuring original Austrian Trodat self-inking official round stamps and laser-engraved rubber seals by "Rawaj". Standing beside a freshly stamped crisp red and blue corporate seal impression on official legal parchment document. Macro focus showing the razor-sharp microscopic detail of the stamped emblem and precision stamp casing, 4:3 horizontal aspect ratio, photorealistic legal office atmosphere.`,
    negativePrompt: `smudged ink, broken stamp, illegible text, fake stamp, low resolution`,
    tipsAr: 'ختم تودات أوتوماتيكي مع بصمة حبر حمراء دقيقة ونقية على محرر رسمي.'
  },
  {
    id: 'srv-security-hologram',
    serviceNameAr: 'الملصقات الأمنية ثلاثية الأبعاد وشواهد الضمان (3D Hologram & Void Labels)',
    categoryNameAr: 'ملصقات الهولوجرام والضمان Void',
    departmentNameAr: 'البطاقات الذكية والأختام والأمن الطباعي',
    prompt: `Macro security product photography of custom 3D rainbow hologram warranty stickers and tamper-evident VOID security labels by "Rawaj". Close-up on a high-tech electronic gadget box showing the shimmering multi-layered laser holographic crest reflecting iridescent spectral colors under directed light, and a partially peeled label leaving the permanent "VOID" tamper pattern, 4:3 aspect ratio, ultra-crisp security detail.`,
    negativePrompt: `flat sticker, no rainbow reflection, low resolution macro, blurry textures`,
    tipsAr: 'ماكرو مقرب يبرز أطياف الهولوجرام القزحية وأثر الـ Void المانع للتلاعب.'
  },
  {
    id: 'srv-flexible-pouches',
    serviceNameAr: 'أكياس التغليف المرنة ذاتية الوقوف (Stand-up Doypack Pouches)',
    categoryNameAr: 'أكياس الدوي باك والبن ذاتية الوقوف',
    departmentNameAr: 'التغليف المرن وأكياس الدوي باك (Doypack)',
    prompt: `Commercial packaging mockup of premium stand-up Doypack coffee pouches with one-way degassing aroma valve and resealable zip-lock, manufactured by "Rawaj Flexible Packaging". Featuring a matte black foil pouch and natural kraft paper pouch standing upright on roasted whole coffee beans with rich rotogravure printed botanical graphics. Controlled studio lighting highlighting the airtight heat-sealed edges and tear notch, 4:3 ratio, 8k resolution.`,
    negativePrompt: `wrinkled pouch, leaking bag, flat laying, distorted valve, bad creases`,
    tipsAr: 'كيس دوي باك ذاتي الوقوف مع صمام تفريغ الهواء وسحاب محكم بجانب حبوب البن.'
  },
  {
    id: 'srv-neon-flex',
    serviceNameAr: 'لوحات النيون فليكس المعاصر (Custom LED Neon Flex Signage)',
    categoryNameAr: 'لوحات النيون فليكس LED',
    departmentNameAr: 'لوحات النيون فليكس واللوحات الإرشادية',
    prompt: `Atmospheric interior photography of handcrafted custom LED neon flex wall art sign by "Rawaj Decor". Vibrant warm crimson red and warm white silicone LED tubes bent into elegant Arabic calligraphy script, mounted on a transparent contour-cut acrylic backing plate against an exposed dark brick wall in a trendy coffee shop. Glowing softly with uniform neon luminescence, casting warm atmospheric ambient light, 4:3 aspect ratio, photorealistic nighttime cafe realism.`,
    negativePrompt: `broken neon, dark spots, messy wires, blinding glare, cartoonish render`,
    tipsAr: 'خط عربي نيون سيليكون دافئ مثبت على أكريليك شفاف يضيء جدار قرميدي في مقهى.'
  },
  {
    id: 'srv-wayfinding-signs',
    serviceNameAr: 'اللوحات الإرشادية والتوجيهية وتسمية المكاتب (Architectural Wayfinding)',
    categoryNameAr: 'لوحات الإشارات التوجيهية وتسمية الأبواب',
    departmentNameAr: 'لوحات النيون فليكس واللوحات الإرشادية',
    prompt: `Architectural interior mockup of modern modular wayfinding signage system and executive office door nameplates by "Rawaj Signage". Anodized curved aluminum profile nameplate with interchangeable room slider insert mounted next to a minimalist frosted glass door, and a suspended double-sided corridor direction sign in the background. Clean contemporary hospital/corporate hallway with sleek lighting, 4:3 framing, architectural excellence.`,
    negativePrompt: `crooked sign, blurry lettering, dirty corridor, amateur render`,
    tipsAr: 'لوحة باب ألومنيوم أنودايزد منحنية بتصميم موديولار عصري في ممر شركة إدارية.'
  }
];

export const AdminPromptsStudio: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = [
    'all', 
    'الطباعة الورقية والتجارية', 
    'الملصقات والليبل والستيكر', 
    'التغليف والعلب والأكياس', 
    'الطباعة كبيرة الحجم (Large Format)', 
    'اللوحات الإعلانية والإشارات (Signage)', 
    'الواجهات والديكور والكلادينج', 
    'الطباعة على الملابس والمنسوجات', 
    'الهدايا الدعائية والمؤسسية', 
    'الطباعة التخصصية والـ UV المباشر', 
    'قص وحفر الليزر والروتر', 
    'التصميم الفني والهوية البصرية',
    'التوريد الخارجي ومشاريع المصانع الكبرى',
    'تجهيزات المعارض والمؤتمرات والفعاليات',
    'المنيوهات ومطبوعات المطاعم والضيافة',
    'البطاقات الذكية والأختام والأمن الطباعي',
    'التغليف المرن وأكياس الدوي باك (Doypack)',
    'لوحات النيون فليكس واللوحات الإرشادية'
  ];

  const filteredPrompts = RAWAJ_SERVICE_PROMPTS.filter((item) => {
    if (selectedDept !== 'all' && item.departmentNameAr !== selectedDept) return false;
    if (searchQuery.trim() && !item.serviceNameAr.toLowerCase().includes(searchQuery.toLowerCase()) && !item.prompt.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#171616] via-[#241E1E] to-[#1A1213] text-white p-5 sm:p-7 rounded-3xl border border-[#B9142D]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B9142D]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 border border-[#B9142D]/40 text-[#F5B4BC] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#E62E4D]" />
            <span>استوديو موجهات الذكاء الاصطناعي لمطابع رواج (Mockups AI Prompts)</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black text-white">
            دليل البرومبتات الاحترافية لتوليد صور موك آب (Mockups) موحدة الهوية
          </h2>
          
          <p className="text-xs sm:text-sm text-[#D6D3D1] max-w-3xl leading-relaxed">
            تمت صياغة هذه الموجهات هندسياً لتعكس هوية "رواج" البصرية (الأسود الفاحم، الأحمر القرمزي #B9142D، الأبيض النقي، واللمسات الذهبية) بنسبة أبعاد 4:3 كصور استعراضية خالية من النصوص المزدحمة مع إضاءة استوديو سينمائية تبرز خامات الطباعة والتغليف.
          </p>
        </div>
      </div>

      {/* MASTER PROMPT CARD */}
      <div className="bg-[#1C1A1A] text-white p-5 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#D4AF37]">البرومبت العام الشامل (Master Prompt) - لجميع خدمات رواج</h3>
              <p className="text-[11px] text-[#A8A29E]">يحدد النمط، الإضاءة، الألوان، مقاس 4:3، وتوحيد الطابع البصري</p>
            </div>
          </div>

          <button
            onClick={() => handleCopyText(MASTER_RAWAJ_PROMPT, 'master-prompt')}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              copiedId === 'master-prompt'
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-[#B9142D] hover:bg-[#A01026] text-white shadow-md'
            }`}
          >
            {copiedId === 'master-prompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedId === 'master-prompt' ? 'تم نسخ البرومبت العام!' : 'نسخ البرومبت العام بنقرة واحدة'}</span>
          </button>
        </div>

        {/* Master Prompt Content Box */}
        <div className="relative rounded-xl bg-[#121010] p-4 border border-[#332F2F] text-xs font-mono text-[#E7E5E4] leading-relaxed select-all">
          {MASTER_RAWAJ_PROMPT}
        </div>

        {/* Guidelines summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1">
          <div className="flex items-center gap-2 text-[#D6D3D1] bg-white/5 p-2.5 rounded-lg border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>الألوان المعتمدة:</strong> الأسود المات، الأحمر #B9142D، الأبيض، والذهبي.</span>
          </div>
          <div className="flex items-center gap-2 text-[#D6D3D1] bg-white/5 p-2.5 rounded-lg border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>الأبعاد والأسلوب:</strong> مقاس 4:3 أفقي، موك آب نقي بدون نصوص إعلانية.</span>
          </div>
          <div className="flex items-center gap-2 text-[#D6D3D1] bg-white/5 p-2.5 rounded-lg border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>الإضاءة والخامات:</strong> إبراز ملمس الورق، البصمة اللامعة، وتوهج LED.</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#78716C] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الخدمة (فواتير، بطاقات، كلادينج، دروع، أكياس...)"
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3F3B3B] text-xs rounded-xl pr-9 pl-4 py-2.5 text-[#171616] dark:text-white focus:outline-none focus:border-[#B9142D]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
            <span className="text-[#78716C] shrink-0">القسم:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3F3B3B] rounded-xl px-3 py-2 text-xs text-[#171616] dark:text-white"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d === 'all' ? 'جميع الأقسام' : d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Individual Service Prompts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-[#171616] dark:text-white">
            برومبتات الخدمات المخصصة الجاهزة للنسخ ({filteredPrompts.length} خدمة):
          </h3>
          <span className="text-xs text-[#78716C]">
            انقر على زر "نسخ البرومبت" لأي خدمة لاستخدامه فوراً
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPrompts.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 sm:p-5 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs space-y-3 transition-all hover:border-[#B9142D]/60"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#F5F1E9] dark:border-[#282525]">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#171616] dark:text-white">
                      {item.serviceNameAr}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-[#78716C] mt-0.5">
                      <span className="bg-[#FAF7F2] dark:bg-[#252222] px-2 py-0.5 rounded border border-[#E7E0D3] dark:border-[#332F2F]">
                        {item.departmentNameAr}
                      </span>
                      <span>•</span>
                      <span>{item.categoryNameAr}</span>
                    </div>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopyText(item.prompt, item.id)}
                  className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    copiedId === item.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#B9142D] hover:bg-[#9B1025] text-white shadow-xs'
                  }`}
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'تم نسخ البرومبت!' : 'نسخ البرومبت بنقرة'}</span>
                </button>
              </div>

              {/* Prompt Text Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#78716C]">
                  <span>نص البرومبت المخصص (Prompt بالإنجليزية لأفضل نتيجة):</span>
                  <span className="text-[10px] text-[#B9142D]">Aspect Ratio: 4:3</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] dark:bg-[#121010] border border-[#E7E0D3] dark:border-[#2F2B2B] rounded-xl text-xs font-mono text-[#171616] dark:text-[#E7E5E4] leading-relaxed select-all">
                  {item.prompt}
                </div>
              </div>

              {/* Tips & Negative Prompt Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  <span className="font-bold">نصيحة التصوير والتوليد: </span>
                  <span>{item.tipsAr}</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 truncate">
                  <span className="font-bold">Negative: </span>
                  <span>{item.negativePrompt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
