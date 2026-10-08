import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BriefcaseBusiness,
  Eye,
  ImagePlus,
  Images,
  Plus,
  Save,
  Search,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { ImageUploadPicker } from '../common/ImageUploadPicker';
import { SafeImage } from '../common/SafeImage';

const DEFAULT_CATEGORIES = [
  'الواجهات والحروف المضيئة',
  'اللوحات والتوجيه',
  'الأكشاك ونقاط البيع',
  'الديكور والهوية الداخلية',
  'الطباعة التجارية',
  'التغليف',
  'الليزر والدروع',
  'الهدايا الدعائية',
  'المعارض والفعاليات',
  'أعمال متنوعة',
];

export const AdminPortfolioManager: React.FC = () => {
  const {
    portfolioProjects,
    services,
    createPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    navigate,
  } = useApp();

  const [editingProj, setEditingProj] = useState<any>(null);
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('الكل');

  const categories = useMemo(() => {
    return Array.from(
      new Set([
        ...DEFAULT_CATEGORIES,
        ...portfolioProjects.map((p) => p.category_ar || '').filter(Boolean),
      ])
    );
  }, [portfolioProjects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...portfolioProjects]
      .filter((p) => categoryFilter === 'الكل' || (p.category_ar || 'أعمال متنوعة') === categoryFilter)
      .filter((p) => {
        if (!q) return true;
        return [
          p.title_ar,
          p.category_ar,
          p.client_type_ar,
          p.industry,
          p.short_description_ar,
          ...(p.tags_ar || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }, [portfolioProjects, categoryFilter, query]);

  const handleAddNew = () => {
    setActionError('');
    setEditingProj({
      title_ar: 'عمل جديد',
      title_en: '',
      client_type_ar: '',
      industry: '',
      category_ar: 'أعمال متنوعة',
      work_type: 'project',
      tags_ar: [],
      year: '',
      city: '',
      short_description_ar: '',
      challenge_ar: '',
      solution_ar: '',
      services_used_ids: [],
      images: [],
      featured: false,
      is_active: true,
      sort_order: portfolioProjects.length + 1,
    });
  };

  const updateImageAt = (index: number, url: string) => {
    const images = [...(editingProj.images || [])];
    if (url) images[index] = url;
    else images.splice(index, 1);
    setEditingProj({ ...editingProj, images: images.filter(Boolean) });
  };

  const addGallerySlot = () => {
    setEditingProj({
      ...editingProj,
      images: [...(editingProj.images || []), ''],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');

    const images = (editingProj.images || []).filter(Boolean);
    if (images.length === 0) {
      setActionError('أضف صورة واحدة على الأقل قبل حفظ العمل.');
      return;
    }
    if (!editingProj.category_ar?.trim()) {
      setActionError('حدد تصنيف العمل.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...editingProj,
        images,
        tags_ar: (editingProj.tags_ar || []).map((tag: string) => tag.trim()).filter(Boolean),
      };
      if (editingProj.id) await updatePortfolioProject(editingProj.id, payload);
      else {
        const { id: _ignored, ...withoutId } = payload;
        await createPortfolioProject(withoutId);
      }
      setEditingProj(null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ العمل.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-right pb-24">
      <section className="rounded-[26px] bg-[#151311] text-white p-5 sm:p-7 border border-[#2B2622] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#F3C64F] mb-2">
              <Images className="w-4 h-4" />
              <span>Portfolio CMS</span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-black">
              إدارة كتالوج أعمال رواج
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[#B9AFA5]">
              أضف المشاريع أو لقطات الأعمال، صنّفها، ارفع صورًا متعددة لكل عمل، واربطها بخدمات رواج.
              كل ما تحفظه هنا يظهر مباشرة في معرض الأعمال.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddNew}
            className="shrink-0 rounded-2xl bg-[#B9142D] hover:bg-[#9F1026] text-white px-4 py-3 text-xs font-black flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(185,20,45,.25)]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عمل جديد</span>
          </button>
        </div>
      </section>

      {actionError && (
        <div className="rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3 text-xs font-bold text-red-700 dark:text-red-300">
          {actionError}
        </div>
      )}

      <section className="rounded-2xl border border-[#E4DDD3] dark:border-[#332E2A] bg-white dark:bg-[#1A1715] p-3 sm:p-4 space-y-3">
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8178]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المشاريع أو التصنيفات أو الوسوم..."
            className="w-full h-11 rounded-xl border border-[#E4DDD3] dark:border-[#332E2A] bg-[#FAF8F4] dark:bg-[#201D1B] pr-10 pl-3 text-xs outline-none focus:border-[#B9142D]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['الكل', ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(category)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold border ${
                categoryFilter === category
                  ? 'bg-[#B9142D] border-[#B9142D] text-white'
                  : 'bg-[#FAF8F4] dark:bg-[#201D1B] border-[#E4DDD3] dark:border-[#332E2A] text-[#665E57] dark:text-[#C8BFB8]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((proj) => (
          <article
            key={proj.id}
            className="rounded-[22px] overflow-hidden bg-white dark:bg-[#1A1715] border border-[#E5DED4] dark:border-[#332E2A] shadow-xs"
          >
            <div className="relative aspect-[4/3] bg-[#EFE9E1] dark:bg-[#211E1B]">
              <SafeImage
                src={proj.images?.[0]}
                alt={proj.title_ar}
                className="w-full h-full object-cover"
                fallbackCategory="معرض الأعمال"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 left-3 flex items-start justify-between gap-2">
                <span className="rounded-full bg-black/55 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
                  {proj.category_ar || 'أعمال متنوعة'}
                </span>
                <div className="flex gap-1">
                  {proj.featured && (
                    <span className="w-7 h-7 rounded-full bg-[#F3C64F] text-[#171616] flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}
                  <span className="rounded-full bg-black/55 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white flex items-center gap-1">
                    <Images className="w-3 h-3" />
                    {proj.images?.filter(Boolean).length || 0}
                  </span>
                </div>
              </div>
              <div className="absolute right-4 left-4 bottom-4">
                <h3 className="font-heading text-base font-black text-white line-clamp-2">{proj.title_ar}</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-1.5 min-h-6">
                {(proj.tags_ar || []).slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#F2EDE6] dark:bg-[#25211E] px-2 py-1 text-[9px] font-bold text-[#6C625A] dark:text-[#C4BAB1]">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-5 text-[#7A7169] dark:text-[#ADA39B] line-clamp-2">
                {proj.short_description_ar || 'لا يوجد وصف بعد.'}
              </p>
              <div className="mt-4 pt-3 border-t border-[#EEE8E0] dark:border-[#2D2824] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`حذف "${proj.title_ar}" نهائيًا؟`)) {
                      void deletePortfolioProject(proj.id).catch((error) =>
                        setActionError(error?.message || 'تعذر حذف العمل.')
                      );
                    }
                  }}
                  className="text-[11px] font-bold text-red-500 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  حذف
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate({ view: 'portfolio', projectId: proj.id })}
                    className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#5E554E] dark:text-[#C5BBB2] bg-[#F5F1EA] dark:bg-[#25211E] flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    معاينة
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProj(JSON.parse(JSON.stringify(proj)))}
                    className="rounded-lg px-3 py-1.5 text-[11px] font-black text-white bg-[#B9142D]"
                  >
                    تعديل
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editingProj && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md p-2 sm:p-5 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="max-w-5xl mx-auto rounded-[28px] bg-[#FAF8F4] dark:bg-[#171412] border border-[#E4DDD3] dark:border-[#332E2A] shadow-2xl overflow-hidden"
          >
            <div className="sticky top-0 z-20 px-4 sm:px-6 py-4 bg-[#FAF8F4]/95 dark:bg-[#171412]/95 backdrop-blur-xl border-b border-[#E4DDD3] dark:border-[#332E2A] flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold text-[#B9142D]">إدارة العمل</div>
                <h2 className="font-heading text-base sm:text-lg font-black text-[#171616] dark:text-white">
                  {editingProj.id ? editingProj.title_ar : 'إضافة عمل جديد'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingProj(null)}
                className="w-10 h-10 rounded-2xl bg-[#ECE6DD] dark:bg-[#24201D] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black">عنوان العمل *</label>
                  <input
                    required
                    value={editingProj.title_ar || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, title_ar: e.target.value })}
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black">التصنيف *</label>
                  <input
                    list="portfolio-category-options"
                    value={editingProj.category_ar || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, category_ar: e.target.value })}
                    placeholder="اختر أو اكتب تصنيفًا جديدًا"
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                  />
                  <datalist id="portfolio-category-options">
                    {categories.map((category) => <option key={category} value={category} />)}
                  </datalist>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black">نوع الإدخال</label>
                  <select
                    value={editingProj.work_type || 'project'}
                    onChange={(e) => setEditingProj({ ...editingProj, work_type: e.target.value })}
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                  >
                    <option value="project">مشروع كامل</option>
                    <option value="gallery">لقطة / عمل سريع</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black">نوع العميل / مجال الاستخدام</label>
                  <input
                    value={editingProj.client_type_ar || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, client_type_ar: e.target.value })}
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black">مجال التنفيذ</label>
                  <input
                    value={editingProj.industry || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, industry: e.target.value })}
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black">الوسوم</label>
                  <input
                    value={(editingProj.tags_ar || []).join('، ')}
                    onChange={(e) =>
                      setEditingProj({
                        ...editingProj,
                        tags_ar: e.target.value.split(/[،,]/).map((tag) => tag.trim()).filter(Boolean),
                      })
                    }
                    placeholder="واجهات، حروف بارزة، كلادينج"
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 lg:col-span-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black">المدينة (اختياري)</label>
                    <input
                      value={editingProj.city || ''}
                      onChange={(e) => setEditingProj({ ...editingProj, city: e.target.value })}
                      className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black">السنة (اختياري)</label>
                    <input
                      value={editingProj.year || ''}
                      onChange={(e) => setEditingProj({ ...editingProj, year: e.target.value })}
                      className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] px-3 py-2.5 text-xs"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black">الوصف المختصر</label>
                  <textarea
                    rows={3}
                    value={editingProj.short_description_ar || ''}
                    onChange={(e) => setEditingProj({ ...editingProj, short_description_ar: e.target.value })}
                    className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] p-3 text-xs"
                  />
                </div>
                {editingProj.work_type !== 'gallery' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black">متطلبات التنفيذ</label>
                      <textarea
                        rows={4}
                        value={editingProj.challenge_ar || ''}
                        onChange={(e) => setEditingProj({ ...editingProj, challenge_ar: e.target.value })}
                        className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] p-3 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black">المعالجة التنفيذية من رواج</label>
                      <textarea
                        rows={4}
                        value={editingProj.solution_ar || ''}
                        onChange={(e) => setEditingProj({ ...editingProj, solution_ar: e.target.value })}
                        className="w-full rounded-xl border border-[#DED6CB] dark:border-[#332E2A] bg-white dark:bg-[#211E1B] p-3 text-xs"
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="rounded-[22px] border border-[#E1D9CE] dark:border-[#332E2A] bg-white dark:bg-[#1D1A18] p-4 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-sm font-black text-[#171616] dark:text-white">صور العمل</h3>
                    <p className="text-[10px] text-[#8A8178] mt-0.5">الصورة الأولى هي الغلاف. أضف أي عدد من الصور للمشروع.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addGallerySlot}
                    className="rounded-xl bg-[#171616] dark:bg-[#B9142D] text-white px-3 py-2 text-[10px] font-black flex items-center gap-1.5"
                  >
                    <ImagePlus className="w-3.5 h-3.5" />
                    إضافة صورة
                  </button>
                </div>

                {(editingProj.images || []).length === 0 && (
                  <ImageUploadPicker
                    label="صورة الغلاف *"
                    helperText="ارفع الصورة الأولى من الجوال أو الكمبيوتر"
                    value=""
                    onChange={(url) => setEditingProj({ ...editingProj, images: url ? [url] : [] })}
                    aspectRatio="16:9"
                    previewHeightClass="h-44"
                    defaultCategory="معرض الأعمال"
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {(editingProj.images || []).map((image: string, index: number) => (
                    <div key={`${index}-${image}`} className="rounded-2xl border border-[#E8E1D7] dark:border-[#332E2A] p-3">
                      <ImageUploadPicker
                        label={index === 0 ? 'صورة الغلاف' : `صورة إضافية ${index + 1}`}
                        value={image}
                        onChange={(url) => updateImageAt(index, url)}
                        aspectRatio="16:9"
                        previewHeightClass="h-36"
                        defaultCategory="معرض الأعمال"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black">الخدمات المرتبطة بهذا العمل</h3>
                  <span className="text-[10px] text-[#B9142D] font-bold">{(editingProj.services_used_ids || []).length} خدمات</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-52 overflow-y-auto rounded-2xl border border-[#E1D9CE] dark:border-[#332E2A] bg-white dark:bg-[#1D1A18] p-3">
                  {services.map((service) => {
                    const checked = (editingProj.services_used_ids || []).includes(service.id);
                    return (
                      <label
                        key={service.id}
                        className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[10px] cursor-pointer ${
                          checked
                            ? 'border-[#B9142D] bg-[#B9142D]/7 text-[#171616] dark:text-white'
                            : 'border-[#E8E1D7] dark:border-[#332E2A] text-[#6B625A] dark:text-[#C0B7AF]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const ids = checked
                              ? editingProj.services_used_ids.filter((id: string) => id !== service.id)
                              : [...(editingProj.services_used_ids || []), service.id];
                            setEditingProj({ ...editingProj, services_used_ids: ids });
                          }}
                          className="accent-[#B9142D]"
                        />
                        <span className="truncate">{service.name_ar}</span>
                      </label>
                    );
                  })}
                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <label className="rounded-2xl border border-[#E1D9CE] dark:border-[#332E2A] bg-white dark:bg-[#1D1A18] p-3 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProj.featured)}
                    onChange={(e) => setEditingProj({ ...editingProj, featured: e.target.checked })}
                    className="accent-[#B9142D]"
                  />
                  <span className="text-[11px] font-bold">عمل مميز</span>
                </label>
                <label className="rounded-2xl border border-[#E1D9CE] dark:border-[#332E2A] bg-white dark:bg-[#1D1A18] p-3 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProj.is_active !== false}
                    onChange={(e) => setEditingProj({ ...editingProj, is_active: e.target.checked })}
                    className="accent-[#B9142D]"
                  />
                  <span className="text-[11px] font-bold">منشور</span>
                </label>
                <div className="sm:col-span-2 rounded-2xl border border-[#E1D9CE] dark:border-[#332E2A] bg-white dark:bg-[#1D1A18] p-3 flex items-center gap-3">
                  <label className="text-[11px] font-bold shrink-0">ترتيب العرض</label>
                  <input
                    type="number"
                    min={0}
                    value={editingProj.sort_order ?? 0}
                    onChange={(e) => setEditingProj({ ...editingProj, sort_order: Number(e.target.value) })}
                    className="w-full rounded-lg border border-[#E1D9CE] dark:border-[#332E2A] bg-[#FAF8F4] dark:bg-[#24201D] px-2 py-1.5 text-xs"
                  />
                </div>
              </section>
            </div>

            <div className="sticky bottom-0 px-4 sm:px-6 py-4 bg-[#FAF8F4]/96 dark:bg-[#171412]/96 backdrop-blur-xl border-t border-[#E4DDD3] dark:border-[#332E2A] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProj(null)}
                className="rounded-xl bg-[#ECE6DD] dark:bg-[#24201D] px-4 py-2.5 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-[#B9142D] hover:bg-[#9F1026] disabled:opacity-50 text-white px-5 py-2.5 text-xs font-black flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'جارٍ الحفظ...' : 'حفظ العمل'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
