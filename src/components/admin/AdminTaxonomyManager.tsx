import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Save,
  X,
  Building2,
  Tags,
  GitBranch,
  BriefcaseBusiness,
} from 'lucide-react';

type TaxonomyTab = 'departments' | 'categories' | 'subcategories' | 'sectors';
type EditorState = { type: TaxonomyTab; id?: string } | null;

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const AdminTaxonomyManager: React.FC = () => {
  const {
    departments,
    categories,
    subcategories,
    industrySectors,
    services,
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
  } = useApp();

  const [tab, setTab] = useState<TaxonomyTab>('departments');
  const [editor, setEditor] = useState<EditorState>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sortedDepartments = useMemo(
    () => [...departments].sort((a, b) => a.sort_order - b.sort_order),
    [departments],
  );
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sort_order - b.sort_order),
    [categories],
  );
  const sortedSubcategories = useMemo(
    () => [...subcategories].sort((a, b) => a.sort_order - b.sort_order),
    [subcategories],
  );
  const sortedSectors = useMemo(
    () => [...industrySectors].sort((a, b) => a.sort_order - b.sort_order),
    [industrySectors],
  );

  const flash = (type: 'success' | 'error', text: string) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 4000);
  };

  const openCreate = (type: TaxonomyTab) => {
    const nextSort =
      type === 'departments' ? departments.length + 1 :
      type === 'categories' ? categories.length + 1 :
      type === 'subcategories' ? subcategories.length + 1 :
      industrySectors.length + 1;

    setEditor({ type });
    setForm({
      name_ar: '',
      name_en: '',
      slug: '',
      description_ar: '',
      tagline_ar: '',
      department_id: departments[0]?.id || '',
      category_id: categories[0]?.id || '',
      icon: 'layers',
      hero_image: '',
      color_accent: '#B9142D',
      sort_order: nextSort,
      is_active: true,
    });
  };

  const openEdit = (type: TaxonomyTab, item: any) => {
    setEditor({ type, id: item.id });
    setForm({ ...item });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;
    if (!String(form.name_ar || '').trim()) {
      flash('error', 'الاسم العربي مطلوب.');
      return;
    }

    const generatedSlug = String(form.slug || '').trim() || slugify(form.name_en || form.name_ar);
    if (!generatedSlug) {
      flash('error', 'تعذر إنشاء Slug صالح. اكتب الاسم الإنجليزي أو الـSlug.');
      return;
    }

    setBusy(true);
    try {
      if (editor.type === 'departments') {
        const payload = {
          name_ar: String(form.name_ar).trim(),
          name_en: String(form.name_en || '').trim(),
          slug: generatedSlug,
          icon: String(form.icon || 'layers'),
          description_ar: String(form.description_ar || ''),
          hero_image: String(form.hero_image || ''),
          sort_order: Number(form.sort_order || 0),
          is_active: form.is_active !== false,
        };
        if (editor.id) await updateDepartment(editor.id, payload);
        else await createDepartment(payload);
      }

      if (editor.type === 'categories') {
        if (!form.department_id) throw new Error('اختر القسم الرئيسي.');
        const payload = {
          department_id: String(form.department_id),
          name_ar: String(form.name_ar).trim(),
          name_en: String(form.name_en || '').trim(),
          slug: generatedSlug,
          description_ar: String(form.description_ar || ''),
          sort_order: Number(form.sort_order || 0),
          is_active: form.is_active !== false,
        };
        if (editor.id) await updateCategory(editor.id, payload);
        else await createCategory(payload);
      }

      if (editor.type === 'subcategories') {
        if (!form.category_id) throw new Error('اختر التصنيف الأب.');
        const payload = {
          category_id: String(form.category_id),
          name_ar: String(form.name_ar).trim(),
          name_en: String(form.name_en || '').trim(),
          slug: generatedSlug,
          sort_order: Number(form.sort_order || 0),
          is_active: form.is_active !== false,
        };
        if (editor.id) await updateSubcategory(editor.id, payload);
        else await createSubcategory(payload);
      }

      if (editor.type === 'sectors') {
        const existing = editor.id ? industrySectors.find((item) => item.id === editor.id) : undefined;
        const payload = {
          name_ar: String(form.name_ar).trim(),
          name_en: String(form.name_en || '').trim(),
          slug: generatedSlug,
          icon: String(form.icon || 'briefcase'),
          tagline_ar: String(form.tagline_ar || ''),
          description_ar: String(form.description_ar || ''),
          hero_image: String(form.hero_image || ''),
          color_accent: String(form.color_accent || '#B9142D'),
          service_ids: existing?.service_ids || [],
          package_ids: existing?.package_ids || [],
          sort_order: Number(form.sort_order || 0),
          is_active: form.is_active !== false,
        };
        if (editor.id) await updateIndustrySector(editor.id, payload);
        else await createIndustrySector(payload);
      }

      setEditor(null);
      flash('success', 'تم حفظ الهيكل في Supabase بنجاح.');
    } catch (error: any) {
      flash('error', error?.message || 'تعذر حفظ التعديل.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (type: TaxonomyTab, id: string, name: string) => {
    if (!window.confirm(`حذف "${name}" نهائياً؟ إذا كان مرتبطاً بخدمات أو تصنيفات أخرى سيمنع Supabase الحذف.`)) return;
    try {
      if (type === 'departments') await deleteDepartment(id);
      if (type === 'categories') await deleteCategory(id);
      if (type === 'subcategories') await deleteSubcategory(id);
      if (type === 'sectors') await deleteIndustrySector(id);
      flash('success', 'تم الحذف.');
    } catch (error: any) {
      flash('error', error?.message || 'تعذر الحذف. قد يكون العنصر مستخدماً في خدمات أو بيانات أخرى.');
    }
  };

  const handleToggle = async (type: TaxonomyTab, item: any) => {
    const next = !(item.is_active !== false);
    try {
      if (type === 'departments') await updateDepartment(item.id, { is_active: next });
      if (type === 'categories') await updateCategory(item.id, { is_active: next });
      if (type === 'subcategories') await updateSubcategory(item.id, { is_active: next });
      if (type === 'sectors') await updateIndustrySector(item.id, { is_active: next });
      flash('success', next ? 'تم تفعيل العنصر.' : 'تم إخفاء العنصر من الواجهة العامة.');
    } catch (error: any) {
      flash('error', error?.message || 'تعذر تحديث حالة العنصر.');
    }
  };

  const tabs = [
    { id: 'departments' as const, label: 'الأقسام', icon: Building2, count: departments.length },
    { id: 'categories' as const, label: 'التصنيفات', icon: Tags, count: categories.length },
    { id: 'subcategories' as const, label: 'التصنيفات الفرعية', icon: GitBranch, count: subcategories.length },
    { id: 'sectors' as const, label: 'قطاعات العملاء', icon: BriefcaseBusiness, count: industrySectors.length },
  ];

  const renderActions = (type: TaxonomyTab, item: any) => (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={() => void handleToggle(type, item)}
        className={`p-2 rounded-lg border ${item.is_active !== false ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-stone-500 border-stone-200 bg-stone-50'}`}
        title={item.is_active !== false ? 'إخفاء' : 'تفعيل'}
      >
        {item.is_active !== false ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      </button>
      <button
        type="button"
        onClick={() => openEdit(type, item)}
        className="p-2 rounded-lg border border-[#E7E0D3] text-[#57534E] hover:text-[#B9142D]"
        title="تعديل"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => void handleDelete(type, item.id, item.name_ar)}
        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
        title="حذف"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 text-right pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFDFA] dark:bg-[#1C1A1A] p-5 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B9142D]" />
            <span>إدارة الهيكل والتصنيفات</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1">
            إدارة حقيقية للأقسام والتصنيفات والتصنيفات الفرعية والقطاعات، مع حفظ مباشر في Supabase.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openCreate(tab)}
          className="px-4 py-2.5 rounded-xl bg-[#B9142D] text-white text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة عنصر
        </button>
      </div>

      {notice && (
        <div className={`p-3 rounded-xl border text-xs font-bold ${notice.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {notice.text}
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 whitespace-nowrap ${tab === item.id ? 'bg-[#171616] text-white border-[#171616]' : 'bg-white dark:bg-[#1C1A1A] border-[#E7E0D3] text-[#57534E] dark:text-[#D6D3D1]'}`}
            >
              <Icon className="w-4 h-4" />
              {item.label} ({item.count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {tab === 'departments' && sortedDepartments.map((item) => {
          const childCount = categories.filter((c) => c.department_id === item.id).length;
          const serviceCount = services.filter((s) => s.department_id === item.id).length;
          return (
            <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-sm text-[#171616] dark:text-white">{item.name_ar}</div>
                <div className="text-[11px] text-[#78716C]">{item.name_en} · {item.slug}</div>
                <div className="text-[11px] text-[#B9142D] mt-1">{childCount} تصنيف · {serviceCount} خدمة</div>
              </div>
              {renderActions('departments', item)}
            </div>
          );
        })}

        {tab === 'categories' && sortedCategories.map((item) => {
          const parent = departments.find((d) => d.id === item.department_id);
          const childCount = subcategories.filter((s) => s.category_id === item.id).length;
          const serviceCount = services.filter((s) => s.category_id === item.id).length;
          return (
            <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-sm text-[#171616] dark:text-white">{item.name_ar}</div>
                <div className="text-[11px] text-[#78716C]">{parent?.name_ar || 'قسم غير معروف'} · {item.slug}</div>
                <div className="text-[11px] text-[#B9142D] mt-1">{childCount} فرعي · {serviceCount} خدمة</div>
              </div>
              {renderActions('categories', item)}
            </div>
          );
        })}

        {tab === 'subcategories' && sortedSubcategories.map((item) => {
          const parent = categories.find((c) => c.id === item.category_id);
          const serviceCount = services.filter((s) => s.subcategory_id === item.id).length;
          return (
            <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-sm text-[#171616] dark:text-white">{item.name_ar}</div>
                <div className="text-[11px] text-[#78716C]">{parent?.name_ar || 'تصنيف غير معروف'} · {item.slug}</div>
                <div className="text-[11px] text-[#B9142D] mt-1">{serviceCount} خدمة</div>
              </div>
              {renderActions('subcategories', item)}
            </div>
          );
        })}

        {tab === 'sectors' && sortedSectors.map((item) => {
          const serviceCount = services.filter((s) => s.industry_sector_ids?.includes(item.id)).length;
          return (
            <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-sm text-[#171616] dark:text-white">{item.name_ar}</div>
                <div className="text-[11px] text-[#78716C]">{item.name_en} · {item.slug}</div>
                <div className="text-[11px] text-[#B9142D] mt-1">{serviceCount} خدمة مرتبطة · {(item.package_ids || []).length} باقات</div>
              </div>
              {renderActions('sectors', item)}
            </div>
          );
        })}
      </div>

      {editor && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" dir="rtl">
          <form onSubmit={handleSave} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C1A1A] rounded-3xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E0D3] pb-3">
              <h3 className="font-black text-base">{editor.id ? 'تعديل العنصر' : 'إضافة عنصر جديد'}</h3>
              <button type="button" onClick={() => setEditor(null)} className="p-2"><X className="w-5 h-5" /></button>
            </div>

            {editor.type === 'categories' && (
              <label className="space-y-1 block text-xs font-bold">
                القسم الرئيسي
                <select value={form.department_id || ''} onChange={(e) => setForm({ ...form, department_id: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent">
                  {sortedDepartments.map((d) => <option key={d.id} value={d.id}>{d.name_ar}</option>)}
                </select>
              </label>
            )}

            {editor.type === 'subcategories' && (
              <label className="space-y-1 block text-xs font-bold">
                التصنيف الأب
                <select value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent">
                  {sortedCategories.map((item) => <option key={item.id} value={item.id}>{item.name_ar}</option>)}
                </select>
              </label>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="space-y-1 text-xs font-bold">
                الاسم العربي
                <input required value={form.name_ar || ''} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent" />
              </label>
              <label className="space-y-1 text-xs font-bold">
                الاسم الإنجليزي
                <input value={form.name_en || ''} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="space-y-1 text-xs font-bold">
                Slug
                <input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="يُنشأ تلقائياً عند تركه فارغاً" className="w-full p-2.5 rounded-xl border bg-transparent font-mono" />
              </label>
              <label className="space-y-1 text-xs font-bold">
                الترتيب
                <input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full p-2.5 rounded-xl border bg-transparent" />
              </label>
            </div>

            {(editor.type === 'departments' || editor.type === 'sectors') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="space-y-1 text-xs font-bold">
                  الأيقونة
                  <input value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent" />
                </label>
                <label className="space-y-1 text-xs font-bold">
                  صورة Hero
                  <input value={form.hero_image || ''} onChange={(e) => setForm({ ...form, hero_image: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent" />
                </label>
              </div>
            )}

            {editor.type === 'sectors' && (
              <label className="space-y-1 block text-xs font-bold">
                السطر التسويقي
                <input value={form.tagline_ar || ''} onChange={(e) => setForm({ ...form, tagline_ar: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent" />
              </label>
            )}

            {editor.type !== 'subcategories' && (
              <label className="space-y-1 block text-xs font-bold">
                الوصف
                <textarea rows={3} value={form.description_ar || ''} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} className="w-full p-2.5 rounded-xl border bg-transparent" />
              </label>
            )}

            <label className="flex items-center gap-2 text-xs font-bold">
              <input type="checkbox" checked={form.is_active !== false} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              نشط ويظهر في الواجهة العامة
            </label>

            <button disabled={busy} type="submit" className="w-full py-3 rounded-xl bg-[#B9142D] text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" />
              {busy ? 'جارٍ الحفظ...' : 'حفظ في Supabase'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
