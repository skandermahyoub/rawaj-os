import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PromoBanner, PromoLayout } from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Image as ImageIcon, 
  LayoutGrid, 
  Eye, 
  EyeOff, 
  Tag, 
  Sparkles, 
  CheckCircle2,
  Percent,
  Clock,
  ArrowUp,
  ArrowDown,
  Play,
  RotateCcw,
  Palette,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { ImageUploadPicker } from '../common/ImageUploadPicker';

export const AdminPromoManager: React.FC = () => {
  const { promoSettings, updatePromoSettings, addPromoBanner, updatePromoBanner, deletePromoBanner } = useApp();
  
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [previewSlideIndex, setPreviewSlideIndex] = useState(0);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('');
  const [discountTag, setDiscountTag] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('احجز العرض واستشر مهندسنا');
  const [linkView, setLinkView] = useState('packages');
  const [isActive, setIsActive] = useState(true);

  const startCreate = () => {
    setIsCreating(true);
    setEditingBanner(null);
    setTitle('');
    setSubtitle('');
    setBadge('عرض استثنائي للشركات');
    setDiscountTag('خصم 20%');
    setValidUntil('متاح طوال هذا الشهر');
    setHighlightsText('واجهات كلادينج ألمنيوم مقاومة للعوامل\nحروف زنكور وإكريليك مضيئة LED\nطباعة أوراق رسمية وبطاقات فاخرة');
    setImageUrl('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80');
    setCtaText('احجز العرض واستشر مهندسنا');
    setLinkView('packages');
    setIsActive(true);
  };

  const startEdit = (b: PromoBanner) => {
    setEditingBanner(b);
    setIsCreating(false);
    setTitle(b.title_ar);
    setSubtitle(b.subtitle_ar);
    setBadge(b.badge_ar || '');
    setDiscountTag(b.discount_tag || '');
    setValidUntil(b.valid_until || '');
    setHighlightsText(b.highlights ? b.highlights.join('\n') : '');
    setImageUrl(b.image_url);
    setCtaText(b.cta_text_ar || 'احجز العرض واستشر مهندسنا');
    setLinkView(b.link_view || 'packages');
    setIsActive(b.is_active);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const highlightsArray = highlightsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (isCreating) {
      addPromoBanner({
        title_ar: title,
        subtitle_ar: subtitle,
        badge_ar: badge,
        discount_tag: discountTag,
        valid_until: validUntil,
        highlights: highlightsArray,
        image_url: imageUrl,
        cta_text_ar: ctaText,
        link_view: linkView,
        is_active: isActive,
        sort_order: promoSettings.banners.length + 1,
      });
    } else if (editingBanner) {
      updatePromoBanner(editingBanner.id, {
        title_ar: title,
        subtitle_ar: subtitle,
        badge_ar: badge,
        discount_tag: discountTag,
        valid_until: validUntil,
        highlights: highlightsArray,
        image_url: imageUrl,
        cta_text_ar: ctaText,
        link_view: linkView,
        is_active: isActive,
      });
    }

    setIsCreating(false);
    setEditingBanner(null);
    showNotice();
  };

  const showNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Move banner order
  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const banners = [...promoSettings.banners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const temp = banners[index];
    banners[index] = banners[targetIndex];
    banners[targetIndex] = temp;

    // re-assign sort_orders
    const updated = banners.map((b, idx) => ({ ...b, sort_order: idx + 1 }));
    updatePromoSettings({ banners: updated });
    showNotice();
  };

  // Add a preset quick template
  const handleAddPreset = (type: 'store_opening' | 'packaging_cafe' | 'exhibition_vip') => {
    let preset: Omit<PromoBanner, 'id'>;
    if (type === 'store_opening') {
      preset = {
        title_ar: 'باقة تدشين الهوية التجارية والمقرات 2026',
        subtitle_ar: 'خصم استثنائي 20% يشمل واجهات الكلادينج، الحروف المضيئة، وتجهيزات المكاتب ومطبوعات الاستقبال.',
        badge_ar: 'عرض تدشين الشركات',
        discount_tag: 'خصم 20%',
        valid_until: 'ساري حتى نهاية الشهر الحالي',
        highlights: [
          'واجهات كلادينج ألمنيوم مقاومة للمناخ وضمان 5 سنوات',
          'حروف بارزة 3D إكريليك وزنكور بإضاءة LED موفرة',
          'مجموعة مطبوعات فاخرة: دفاتر، فولدرات، وبطاقات NFC'
        ],
        image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        cta_text_ar: 'احجز العرض واستشر مهندسنا',
        link_view: 'packages',
        is_active: true,
        sort_order: promoSettings.banners.length + 1,
      };
    } else if (type === 'packaging_cafe') {
      preset = {
        title_ar: 'باقة التغليف الفاخر للمطاعم والمقاهي',
        subtitle_ar: 'أكواب دبل كرافت حرارية، أكياس تسوق ورقية معزولة، وعلب طعام صديقة للبيئة بأسعار الجملة للكميات الكبرى.',
        badge_ar: 'الأكثر طلباً للضيافة',
        discount_tag: 'أسعار الجملة للكميات',
        valid_until: 'تسليم سريع خلال 72 ساعة',
        highlights: [
          'أكواب دبل كرافت عازلة للحرارة بطباعة Pantone مخصصة',
          'أكياس ورقية كرافت متينة بأيدي حبلية أنيقة',
          'ورق تغليف شحمي مضاد للزيوت معتمد صحياً'
        ],
        image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        cta_text_ar: 'طلب باقة المقاهي المعتمدة',
        link_view: 'packages',
        is_active: true,
        sort_order: promoSettings.banners.length + 1,
      };
    } else {
      preset = {
        title_ar: 'تجهيز أجنحة المعارض والمؤتمرات السريع',
        subtitle_ar: 'بوثات هندسية متكاملة، بوب اب ماجنتيك، رول اب فاخر، وبطاقات زوار VIP مع خدمة التركيب والتسليم الميداني.',
        badge_ar: 'تسليم فوري 48 ساعة',
        discount_tag: 'تجهيز VIP متكامل',
        valid_until: 'شامل التركيب الميداني في صنعاء',
        highlights: [
          'أنظمة معارض محمولة خفيفة سريعة الفك والتركيب',
          'طباعة قماشية عالية الدقة مقاومة للتوهج والانعكاس',
          'إشراف هندسي متكامل ومتابعة ميدانية في المعرض'
        ],
        image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        cta_text_ar: 'تسعير بوثات المعارض',
        link_view: 'packages',
        is_active: true,
        sort_order: promoSettings.banners.length + 1,
      };
    }

    addPromoBanner(preset);
    showNotice();
  };

  const activeBanners = promoSettings.banners.filter(b => b.is_active);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-right">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#700B1B] via-[#940E24] to-[#590614] text-white border border-[#D4AF37]/35 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[#FDE047] border border-[#D4AF37]/30 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>لوحة تحكم كاروسال العروض الترويجية المميزة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            إدارة الكاروسال المنزلق والعروض الملكية
          </h2>
          <p className="text-xs sm:text-sm text-[#FCEBEB] mt-1 max-w-2xl leading-relaxed">
            تحكم كامل في شريط العروض المميزة المنزلق ذو الخلفية الحمراء الملكية، توقيت التمرير التلقائي، وإضافة وتعديل البطاقات والعروض الترويجية.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:brightness-110 text-[#171206] font-heading font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shrink-0 cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عرض جديد</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>تم حفظ إعدادات وعروض الكاروسال بنجاح!</span>
        </div>
      )}

      {/* 1. Carousel Settings & Visual Style Controls */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-6">
        
        <div className="flex items-center justify-between border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#B9142D]" />
            <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F5F1EA]">
              خصائص الكاروسال الترويجي المنزلق
            </h3>
          </div>

          {/* Toggle Module Enabled */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#554F48] dark:text-[#C5BCB1]">حالة الموديول:</span>
            <button
              onClick={() => {
                updatePromoSettings({ enabled: !promoSettings.enabled });
                showNotice();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                promoSettings.enabled 
                  ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30' 
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 border border-neutral-300 dark:border-neutral-700'
              }`}
            >
              {promoSettings.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{promoSettings.enabled ? 'مفعل في الرئيسية' : 'معطل'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Autoplay Speed Selector */}
          <div>
            <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-2">
              سرعة التمرير التلقائي (Autoplay):
            </label>
            <select
              value={promoSettings.autoplay_speed !== undefined ? promoSettings.autoplay_speed : 5000}
              onChange={(e) => {
                updatePromoSettings({ autoplay_speed: Number(e.target.value) });
                showNotice();
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs font-bold focus:outline-hidden focus:border-[#B9142D]"
            >
              <option value={0}>بدون تمرير تلقائي (يدوي فقط)</option>
              <option value={3000}>سريع (كل 3 ثوانٍ)</option>
              <option value={5000}>افتراضي متزن (كل 5 ثوانٍ)</option>
              <option value={7000}>هادئ (كل 7 ثوانٍ)</option>
              <option value={10000}>بطيء (كل 10 ثوانٍ)</option>
            </select>
          </div>

          {/* Red Background Shade Selector */}
          <div>
            <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-2">
              تدرج الخلفية الحمراء الملكية:
            </label>
            <select
              value={promoSettings.bg_shade || 'royal_crimson'}
              onChange={(e) => {
                updatePromoSettings({ bg_shade: e.target.value as any });
                showNotice();
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs font-bold focus:outline-hidden focus:border-[#B9142D]"
            >
              <option value="royal_crimson">أحمر رواج القرمزي الملكي (الافتراضي الفاخر)</option>
              <option value="deep_burgundy">عنابي إمبراطوري داكن (Deep Burgundy)</option>
              <option value="ruby_red">أحمر ياقوتي متوهج (Vibrant Ruby)</option>
            </select>
          </div>

          {/* Section Main Title */}
          <div>
            <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-2">
              عنوان شارة الموديول:
            </label>
            <input
              type="text"
              value={promoSettings.title_ar || ''}
              onChange={(e) => updatePromoSettings({ title_ar: e.target.value })}
              onBlur={showNotice}
              placeholder="العروض الترويجية والحملات الحصرية"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
            />
          </div>

        </div>

      </div>

      {/* 2. Interactive Live Preview for Admin */}
      {activeBanners.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#B9142D]" />
              <h4 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA]">
                معاينة حية لشكل الكاروسال الأحمر في المتجر
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#706A62] dark:text-[#A0988F]">
                الشريحة المعروضة: {previewSlideIndex + 1} من {activeBanners.length}
              </span>
              <button
                type="button"
                onClick={() => setPreviewSlideIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)}
                className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-[#B9142D] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewSlideIndex((prev) => (prev + 1) % activeBanners.length)}
                className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-[#B9142D] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mini Replica of Red Carousel */}
          {(() => {
            const previewBanner = activeBanners[previewSlideIndex] || activeBanners[0];
            return (
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#7A0B1E] via-[#A00E26] to-[#4F0511] text-white p-5 border border-[#D4AF37]/35 shadow-lg relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-8 space-y-2">
                    <div className="flex items-center gap-2">
                      {previewBanner.badge_ar && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[#FFE2E6] text-[11px] font-bold">
                          {previewBanner.badge_ar}
                        </span>
                      )}
                      {previewBanner.discount_tag && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[11px] font-black">
                          {previewBanner.discount_tag}
                        </span>
                      )}
                    </div>
                    <h5 className="font-heading font-black text-lg sm:text-xl text-white">
                      {previewBanner.title_ar}
                    </h5>
                    <p className="text-xs text-[#FDE8E8] line-clamp-2 max-w-xl">
                      {previewBanner.subtitle_ar}
                    </p>
                    {previewBanner.highlights && previewBanner.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-white/90">
                        {previewBanner.highlights.slice(0, 2).map((h, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-4 h-32 rounded-xl overflow-hidden border border-white/20 shadow-md">
                    <img src={previewBanner.image_url} alt={previewBanner.title_ar} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 3. Quick One-Click Preset Offer Templates */}
      <div className="p-5 rounded-2xl bg-[#FCFAF7] dark:bg-[#171514] border border-[#EBE4D5] dark:border-[#2A2624] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#554F48] dark:text-[#C5BCB1]">
            قوالب عروض جاهزة وسريعة للإضافة الفورية:
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => handleAddPreset('store_opening')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#201D1C] border border-[#E0D7C5] dark:border-[#352F2D] hover:border-[#B9142D] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#B9142D]" />
            <span>عرض تدشين الشركات والمقرات</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddPreset('packaging_cafe')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#201D1C] border border-[#E0D7C5] dark:border-[#352F2D] hover:border-[#B9142D] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#B9142D]" />
            <span>عرض تغليف المقاهي والضيافة</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddPreset('exhibition_vip')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#201D1C] border border-[#E0D7C5] dark:border-[#352F2D] hover:border-[#B9142D] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#B9142D]" />
            <span>عرض أجنحة المعارض السريعة</span>
          </button>
        </div>
      </div>

      {/* 4. Form (Create or Edit Banner) */}
      {(isCreating || editingBanner) && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border-2 border-[#B9142D]/40 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            <h3 className="font-heading font-black text-sm text-[#B9142D] flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>{isCreating ? 'إضافة بطاقة عرض ترويجي جديد في الكاروسال' : 'تعديل بيانات العرض الترويجي'}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingBanner(null);
              }}
              className="text-xs text-[#746E67] hover:text-red-500 font-bold cursor-pointer"
            >
              إلغاء
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                عنوان العرض الترويجي *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: باقة تدشين الهوية التجارية والمقرات"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                شارة التصنيف (Badge)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="مثال: عرض استثنائي للشركات"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            {/* Discount Tag */}
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                نسبة الخصم / ميزة العرض البارزة
              </label>
              <input
                type="text"
                value={discountTag}
                onChange={(e) => setDiscountTag(e.target.value)}
                placeholder="مثال: خصم 20% أو أسعار الجملة"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            {/* Valid Until / Urgency note */}
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                صلاحية العرض / مدة التسليم
              </label>
              <input
                type="text"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                placeholder="مثال: متاح حتى نهاية الشهر أو تسليم خلال 48 ساعة"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            {/* Subtitle */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                الوصف التعريفي وتفاصيل العرض *
              </label>
              <textarea
                rows={2}
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="تفاصيل المزايا والخامات والخصومات المتضمنة في هذا العرض..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D] resize-none"
              />
            </div>

            {/* Key Highlights list */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                نقاط المزايا والمواصفات المشمولة (سطر لكل نقطة)
              </label>
              <textarea
                rows={3}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="مثال:&#10;واجهات كلادينج ألمنيوم مقاومة للحرارة&#10;حروف زنكور مضيئة مع ضمان 3 سنوات&#10;تصميم ثلاثي الأبعاد مجاني"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D] font-mono"
              />
            </div>

            {/* Image with 3 options: Upload, URL, Library */}
            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-[#FCFAF5] dark:bg-[#1A1817] border border-[#DCD5C5] dark:border-[#3A3533]">
              <ImageUploadPicker
                label="صورة العرض الترويجي الفاخرة *"
                helperText="حدد صورة العرض: رفع من جهازك أو الجوال، إدراج رابط، أو اختيار من مكتبة رواج"
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                aspectRatio="4:3"
                previewHeightClass="h-44"
                defaultCategory="المطبوعات الورقية"
              />
            </div>

            {/* CTA Button Text */}
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">نص زر التحويل (CTA)</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="احجز العرض واستشر مهندسنا"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            {/* Link destination */}
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">الوجهة عند النقر على العرض</label>
              <select
                value={linkView}
                onChange={(e) => setLinkView(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              >
                <option value="packages">صفحة الباقات والقطاعات المتكاملة</option>
                <option value="services">كتالوج الخدمات والمطبوعات</option>
                <option value="custom-quote">حاسبة التسعير الخاص</option>
                <option value="portfolio">معرض الإنجازات والأعمال</option>
                <option value="about-contact">تواصل معنا</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:col-span-2">
              <input
                type="checkbox"
                id="is_active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-[#B9142D] cursor-pointer"
              />
              <label htmlFor="is_active" className="text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] cursor-pointer">
                تفعيل وإظهار هذا العرض في الكاروسال بالصفحة الرئيسية
              </label>
            </div>

          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#F0EBE0] dark:border-[#2E2A28]">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingBanner(null);
              }}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#910E23] text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isCreating ? 'إضافة إلى الكاروسال' : 'حفظ التعديلات'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 5. Existing Banners List with Reordering Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA]">
            شرائح وعروض الكاروسال الحالية ({promoSettings.banners.length})
          </h4>
          <span className="text-[11px] text-[#706A62] dark:text-[#A0988F]">
            يمكنك إعادة ترتيب تسلسل الشرائح باستخدام أزرار الأسهم
          </span>
        </div>

        <div className="space-y-3">
          {promoSettings.banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                banner.is_active 
                  ? 'bg-white dark:bg-[#1E1B1A] border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs' 
                  : 'bg-neutral-50 dark:bg-[#151313] border-neutral-200 dark:border-neutral-800 opacity-60'
              }`}
            >
              {/* Order Controls & Thumbnail */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveOrder(index, 'up')}
                    className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-[#B9142D] hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs transition-colors cursor-pointer"
                    title="تحريك لأعلى"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === promoSettings.banners.length - 1}
                    onClick={() => handleMoveOrder(index, 'down')}
                    className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-[#B9142D] hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs transition-colors cursor-pointer"
                    title="تحريك لأسفل"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
                  <img src={banner.image_url} alt={banner.title_ar} className="w-full h-full object-cover" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-neutral-600 dark:text-neutral-400">
                      #{index + 1}
                    </span>
                    <h5 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA] line-clamp-1">
                      {banner.title_ar}
                    </h5>
                    {banner.badge_ar && (
                      <span className="px-2 py-0.5 rounded-md bg-[#B9142D]/10 text-[#B9142D] text-[10px] font-bold">
                        {banner.badge_ar}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#746E67] dark:text-[#A0988F] line-clamp-1 max-w-md">
                    {banner.subtitle_ar}
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    updatePromoBanner(banner.id, { is_active: !banner.is_active });
                    showNotice();
                  }}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    banner.is_active 
                      ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' 
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-300'
                  }`}
                >
                  {banner.is_active ? 'نشط في الكاروسال' : 'معطل'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => startEdit(banner)}
                    className="p-2 rounded-xl bg-[#F5F1E9] dark:bg-[#282422] text-[#171616] dark:text-white hover:bg-[#B9142D] hover:text-white transition-colors cursor-pointer"
                    title="تعديل بيانات العرض"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`هل أنت متأكد من حذف العرض "${banner.title_ar}"؟`)) {
                        deletePromoBanner(banner.id);
                        showNotice();
                      }
                    }}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                    title="حذف العرض"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
