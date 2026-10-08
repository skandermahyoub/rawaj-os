import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  X, 
  Eye, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { HomeSlide } from '../../types';
import { ImageUploadPicker } from '../common/ImageUploadPicker';

export const AdminSliderManager: React.FC = () => {
  const { homeSlides, addHomeSlide, updateHomeSlide, deleteHomeSlide } = useApp();
  const [editingSlide, setEditingSlide] = useState<HomeSlide | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const revealEditor = () => {
    window.requestAnimationFrame(() => {
      editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // Form State
  const [formData, setFormData] = useState<Omit<HomeSlide, 'id'>>({
    title_ar: '',
    subtitle_ar: '',
    badge_ar: '',
    image_url: '',
    button_text_ar: 'استكشف التفاصيل',
    secondary_button_text_ar: 'طلب تسعير',
    target_view: 'services',
    secondary_target_view: 'custom-quote',
    sort_order: homeSlides.length + 1,
    is_active: true,
  });

  const handleStartCreate = () => {
    setFormData({
      title_ar: '',
      subtitle_ar: '',
      badge_ar: 'عرض خاص',
      image_url: '',
      button_text_ar: 'استكشف الآن',
      secondary_button_text_ar: 'طلب عرض سعر',
      target_view: 'services',
      secondary_target_view: 'custom-quote',
      sort_order: homeSlides.length + 1,
      is_active: true,
    });
    setEditingSlide(null);
    setIsCreating(true);
    revealEditor();
  };

  const handleStartEdit = (slide: HomeSlide) => {
    setEditingSlide(slide);
    setFormData({
      title_ar: slide.title_ar,
      subtitle_ar: slide.subtitle_ar,
      badge_ar: slide.badge_ar || '',
      image_url: slide.image_url,
      button_text_ar: slide.button_text_ar,
      secondary_button_text_ar: slide.secondary_button_text_ar || '',
      target_view: slide.target_view,
      secondary_target_view: slide.secondary_target_view || 'custom-quote',
      sort_order: slide.sort_order,
      is_active: slide.is_active,
    });
    setIsCreating(true);
    revealEditor();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_ar.trim()) {
      setActionError('أدخل عنوان الشريحة.');
      return;
    }
    if (!formData.image_url?.trim()) {
      setActionError('اختر صورة للشريحة قبل الحفظ.');
      return;
    }

    setActionError('');
    setIsSaving(true);
    try {
      if (editingSlide) {
        await updateHomeSlide(editingSlide.id, formData);
      } else {
        await addHomeSlide(formData);
      }
      setIsCreating(false);
      setEditingSlide(null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ الشريحة.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {actionError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">{actionError}</div>}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
            <span className="text-xs font-bold text-[#B9142D] uppercase">إدارة الصفحة الرئيسية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171616] dark:text-[#F5F3EF]">
            السلايدر السينمائي (Cinematic Hero Slider)
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-0.5">
            إضافة وتعديل وحذف الشرائح الإعلانية السينمائية بالصفحة الرئيسية مع التحكم في النصوص والأزرار والروابط
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة شريحة جديدة</span>
          </button>
        )}
      </div>

      {/* Create / Edit Form Modal */}
      {isCreating && (
        <div ref={editorRef} className="scroll-mt-6 bg-white dark:bg-[#1C1A1A] p-6 sm:p-8 rounded-2xl border-2 border-[#B9142D] shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            <h3 className="text-lg font-bold text-[#171616] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B9142D]" />
              <span>{editingSlide ? 'تعديل الشريحة الإعلانية' : 'إضافة شريحة إعلانية جديدة'}</span>
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1.5 rounded-lg text-[#78716C] hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  عنوان الشريحة الرئيسي *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_ar || ''}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  placeholder="مثال: عالم الطباعة والإنتاج الإعلاني الفاخر"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  الوصف / النص التسويقي الفرعي
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle_ar || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle_ar: e.target.value })}
                  placeholder="شرح موجز يظهر تحت العنوان الرئيسي..."
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  شارة الشريحة (Badge)
                </label>
                <input
                  type="text"
                  value={formData.badge_ar || ''}
                  onChange={(e) => setFormData({ ...formData, badge_ar: e.target.value })}
                  placeholder="مثال: وكالة رواج الرسمية أو عرض خاص"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {/* Image with 3 options: Upload, URL, Library */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1E1C1B] border border-[#E7E0D3] dark:border-[#332F2F]">
                <ImageUploadPicker
                  label="صورة الخلفية السينمائية للشريحة (Slide Image)"
                  helperText="اختر صورة الشريحة: رفع من جهازك أو الجوال، إدراج رابط، أو اختيار من مكتبة رواج"
                  value={formData.image_url || ''}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  aspectRatio="16:9"
                  previewHeightClass="h-44"
                  defaultCategory="اللوحات والواجهات"
                />
              </div>

              {/* Primary Button Text */}
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  نص الزر الرئيسي
                </label>
                <input
                  type="text"
                  value={formData.button_text_ar || ''}
                  onChange={(e) => setFormData({ ...formData, button_text_ar: e.target.value })}
                  placeholder="مثال: استكشف الخدمات"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {/* Primary Target View */}
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  وجهة الزر الرئيسي (الصفحة)
                </label>
                <select
                  value={formData.target_view || 'services'}
                  onChange={(e) => setFormData({ ...formData, target_view: e.target.value as any })}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                >
                  <option value="about-contact">عن رواج والاتصال (About & Story)</option>
                  <option value="services">متجر وكتالوج الخدمات (Services Store)</option>
                  <option value="departments">الأقسام الـ 12 (Departments)</option>
                  <option value="portfolio">معرض الأعمال والمشاريع (Portfolio)</option>
                  <option value="packages">باقات المشاريع (Packages)</option>
                  <option value="custom-quote">طلب تسعير خاص وتوريد (Custom RFQ)</option>
                </select>
              </div>

              {/* Secondary Button Text */}
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  نص الزر الثانوي (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.secondary_button_text_ar || ''}
                  onChange={(e) => setFormData({ ...formData, secondary_button_text_ar: e.target.value })}
                  placeholder="مثال: طلب تسعير فوري"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {/* Secondary Target View */}
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  وجهة الزر الثانوي
                </label>
                <select
                  value={formData.secondary_target_view || 'custom-quote'}
                  onChange={(e) => setFormData({ ...formData, secondary_target_view: e.target.value as any })}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                >
                  <option value="custom-quote">طلب تسعير خاص وتوريد</option>
                  <option value="services">متجر الخدمات</option>
                  <option value="departments">الأقسام</option>
                  <option value="packages">باقات المشاريع</option>
                  <option value="portfolio">معرض الأعمال</option>
                  <option value="about-contact">عن رواج</option>
                </select>
              </div>

              {/* Order & Active */}
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                    الترتيب
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
                    className="w-24 bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-3 py-1.5 text-sm text-[#171616] dark:text-white text-center"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer mt-5">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-[#B9142D] rounded accent-[#B9142D]"
                  />
                  <span className="text-sm font-semibold text-[#171616] dark:text-white">
                    تفعيل الشريحة في السلايدر
                  </span>
                </label>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E0D3] dark:border-[#332F2F]">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[#78716C] hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold shadow-md transition-colors"
              >
                {editingSlide ? 'حفظ التعديلات' : 'إضافة الشريحة'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List */}
      <div className="grid grid-cols-1 gap-4">
        {[...homeSlides].sort((a, b) => a.sort_order - b.sort_order).map((slide, index) => (
          <div
            key={slide.id}
            className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1C1A1A] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
              slide.is_active ? 'border-[#E7E0D3] dark:border-[#332F2F]' : 'border-neutral-300 dark:border-neutral-800 opacity-60'
            }`}
          >
            {/* Thumbnail + Info */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0 relative">
                <img
                  src={slide.image_url}
                  alt={slide.title_ar}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                  #{slide.sort_order}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  {slide.badge_ar && (
                    <span className="text-[10px] bg-[#B9142D]/10 text-[#B9142D] font-bold px-2 py-0.5 rounded-md">
                      {slide.badge_ar}
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    slide.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {slide.is_active ? 'مفعل بالرئيسية' : 'معطل'}
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-[#171616] dark:text-white">
                  {slide.title_ar}
                </h4>
                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] line-clamp-1 max-w-xl">
                  {slide.subtitle_ar}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#78716C] mt-1">
                  <span>الزر: <strong>{slide.button_text_ar}</strong> → {slide.target_view}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-end md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => void updateHomeSlide(slide.id, { is_active: !slide.is_active }).catch((error) => setActionError(error?.message || 'تعذر تحديث حالة الشريحة.'))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#E7E0D3] dark:hover:bg-[#2E2A2A] text-[#171616] dark:text-white transition-colors"
              >
                {slide.is_active ? 'تعطيل' : 'تفعيل'}
              </button>

              <button
                onClick={() => handleStartEdit(slide)}
                className="p-2 rounded-lg text-[#171616] dark:text-white bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#E7E0D3] dark:hover:bg-[#2E2A2A] transition-colors"
                title="تعديل الشريحة"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm('هل أنت متأكد من حذف هذه الشريحة؟')) {
                    void deleteHomeSlide(slide.id).catch((error) => setActionError(error?.message || 'تعذر حذف الشريحة.'));
                  }
                }}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="حذف الشريحة"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
