import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Save, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Trash2, 
  Layers, 
  Image, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Sliders,
  Settings,
  Shield,
  Eye
} from 'lucide-react';
import { 
  Service, 
  SpecificationGroup, 
  SpecificationField, 
  FieldOption, 
  ServiceStatus, 
  ExecutionModel, 
  FieldType 
} from '../../types';
import { ImageUploadPicker } from '../common/ImageUploadPicker';

interface AdminServiceEditorProps {
  serviceId?: string;
  onNavigateBack: () => void;
}

export const AdminServiceEditor: React.FC<AdminServiceEditorProps> = ({
  serviceId,
  onNavigateBack,
}) => {
  const { 
    services, 
    departments, 
    categories, 
    templates, 
    createService, 
    updateService, 
    mediaItems,
    navigate 
  } = useApp();

  const isEditing = Boolean(serviceId);
  const existingService = services.find((s) => s.id === serviceId);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'template' | 'basic' | 'taxonomy' | 'media' | 'specs' | 'highlights' | 'faq' | 'prepress' | 'status'>('basic');

  // Form State
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [departmentId, setDepartmentId] = useState(departments[0]?.id || '');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [badge, setBadge] = useState('');
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>('draft');
  const [executionModel, setExecutionModel] = useState<ExecutionModel>('in_house');
  const [featured, setFeatured] = useState(false);
  const [mostRequested, setMostRequested] = useState(false);
  const [highlights, setHighlights] = useState<{ id: string; title_ar: string; description_ar: string }[]>([]);
  const [faqs, setFaqs] = useState<{ id: string; question_ar: string; answer_ar: string }[]>([]);
  const [prepressRules, setPrepressRules] = useState({
    color_mode: 'CMYK' as any,
    recommended_dpi: 300,
    bleed_mm: 3,
    safety_margin_mm: 5,
    notes_ar: '',
  });

  // Specification Groups State
  const [specGroups, setSpecGroups] = useState<SpecificationGroup[]>([]);

  // Toast
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (existingService) {
      setNameAr(existingService.name_ar || '');
      setNameEn(existingService.name_en || '');
      setSlug(existingService.slug || '');
      setDepartmentId(existingService.department_id || departments[0]?.id);
      setCategoryId(existingService.category_id || categories[0]?.id);
      setShortDesc(existingService.short_description_ar || '');
      setFullDesc(existingService.full_description_ar || '');
      setHeroImage(existingService.hero_image || '');
      setGalleryImages(existingService.gallery || []);
      setBadge(existingService.badge || '');
      setServiceStatus(existingService.service_status || 'draft');
      setExecutionModel(existingService.execution_model || 'in_house');
      setFeatured(Boolean(existingService.featured));
      setMostRequested(Boolean(existingService.most_requested));
      setHighlights(existingService.highlights || []);
      setFaqs(existingService.faq || []);
      setPrepressRules({
        color_mode: existingService.prepress_rules?.color_mode || 'CMYK',
        recommended_dpi: existingService.prepress_rules?.recommended_dpi || 300,
        bleed_mm: existingService.prepress_rules?.bleed_mm || 3,
        safety_margin_mm: existingService.prepress_rules?.safety_margin_mm || 5,
        notes_ar: existingService.prepress_rules?.notes_ar || '',
      });
      setSpecGroups(existingService.specification_groups ? JSON.parse(JSON.stringify(existingService.specification_groups)) : []);
    } else {
      // Default initial state for new service
      setHeroImage('');
      setServiceStatus('draft');
    }
  }, [existingService, departments, categories]);

  // Load from template handler
  const handleApplyTemplate = (templateId: string) => {
    const tmpl = templates.find((t) => t.id === templateId);
    if (!tmpl) return;
    if (window.confirm(`هل تريد استيراد حقول المواصفات من قالب «${tmpl.name_ar}»؟`)) {
      setSpecGroups(JSON.parse(JSON.stringify(tmpl.specification_groups)));
      if (!nameAr) setNameAr(tmpl.name_ar.replace('قالب ', ''));
      if (tmpl.department_id) setDepartmentId(tmpl.department_id);
      setActiveTab('specs');
    }
  };

  // Group Operations
  const handleAddGroup = () => {
    const newGroup: SpecificationGroup = {
      id: `grp-${Date.now()}`,
      title_ar: 'مجموعة مواصفات جديدة',
      sort_order: specGroups.length + 1,
      fields: [],
    };
    setSpecGroups((prev) => [...prev, newGroup]);
  };

  const handleDeleteGroup = (groupId: string) => {
    setSpecGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  const handleUpdateGroupTitle = (groupId: string, newTitle: string) => {
    setSpecGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, title_ar: newTitle } : g))
    );
  };

  // Field Operations
  const handleAddField = (groupId: string) => {
    const newField: SpecificationField = {
      id: `field-${Date.now()}`,
      key: `field_${Date.now().toString().slice(-4)}`,
      label_ar: 'اسم الحقل الفني',
      type: 'select',
      required: true,
      allow_rawaj_recommendation: true,
      sort_order: 1,
      options: [
        { id: `opt-1`, label_ar: 'الخيار الأول (المعياري)', value: 'option_1', is_default: true },
        { id: `opt-2`, label_ar: 'الخيار الثاني', value: 'option_2' },
      ],
    };

    setSpecGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, fields: [...g.fields, newField] } : g
      )
    );
  };

  const handleDeleteField = (groupId: string, fieldId: string) => {
    setSpecGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, fields: g.fields.filter((f) => f.id !== fieldId) }
          : g
      )
    );
  };

  const handleUpdateField = (groupId: string, fieldId: string, updates: Partial<SpecificationField>) => {
    setSpecGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          fields: g.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
        };
      })
    );
  };

  // Options inside a field
  const handleAddOption = (groupId: string, fieldId: string) => {
    setSpecGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          fields: g.fields.map((f) => {
            if (f.id !== fieldId) return f;
            const currentOpts = f.options || [];
            const newOpt: FieldOption = {
              id: `opt-${Date.now()}`,
              label_ar: 'خيار جديد',
              value: `opt_${Date.now().toString().slice(-4)}`,
            };
            return { ...f, options: [...currentOpts, newOpt] };
          }),
        };
      })
    );
  };

  const handleRemoveOption = (groupId: string, fieldId: string, optId: string) => {
    setSpecGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          fields: g.fields.map((f) => {
            if (f.id !== fieldId) return f;
            return { ...f, options: f.options?.filter((o) => o.id !== optId) };
          }),
        };
      })
    );
  };

  const handleUpdateOption = (groupId: string, fieldId: string, optId: string, updates: Partial<FieldOption>) => {
    setSpecGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          fields: g.fields.map((f) => {
            if (f.id !== fieldId) return f;
            return {
              ...f,
              options: f.options?.map((o) => (o.id === optId ? { ...o, ...updates } : o)),
            };
          }),
        };
      })
    );
  };

  // Save State
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Save Service
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) {
      alert('يرجى إدخال اسم الخدمة بالعربية');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    const payload = {
      name_ar: nameAr,
      name_en: nameEn || nameAr,
      slug: slug || nameAr.toLowerCase().replace(/\s+/g, '-'),
      department_id: departmentId,
      category_id: categoryId,
      short_description_ar: shortDesc,
      full_description_ar: fullDesc || shortDesc,
      hero_image: heroImage,
      gallery: galleryImages,
      badge: badge,
      service_status: serviceStatus,
      execution_model: executionModel,
      featured: featured,
      most_requested: mostRequested,
      sort_order: 1,
      highlights: highlights,
      faq: faqs,
      prepress_rules: prepressRules,
      specification_groups: specGroups,
      related_service_ids: existingService?.related_service_ids || [],
    };

    try {
      if (isEditing && serviceId) {
        await updateService(serviceId, payload);
      } else {
        await createService(payload);
      }

      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onNavigateBack();
      }, 1000);
    } catch (err: any) {
      console.error('Failed to save service:', err);
      setSaveError(err?.message || 'حدث خطأ أثناء الحفظ في قاعدة البيانات السحابية');
    } finally {
      setIsSaving(false);
    }
  };

  const availableCategories = categories.filter((c) => c.department_id === departmentId);

  return (
    <div className="space-y-5 text-right pb-20">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateBack}
            className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] text-[#78716C] hover:text-[#171616] dark:hover:text-white"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white">
              {isEditing ? `تعديل خدمة: ${nameAr}` : 'إنشاء خدمة جديدة في الكتالوج'}
            </h1>
            <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
              تخصيص كامل للمواصفات الفنية والقوالب بدون كتابة كود
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={() => navigate({ view: 'service-detail', serviceId: serviceId! })}
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#57534E] dark:text-[#D6D3D1] bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] px-3 py-2 rounded-xl"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة بالمتجر</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#B9142D] hover:bg-[#930F23] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
            <span>{isSaving ? 'جاري الحفظ في السحابة...' : 'حفظ التغييرات'}</span>
          </button>
        </div>
      </div>

      {saveError && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300 text-xs font-bold text-center">
          ✕ {saveError}
        </div>
      )}

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center">
          ✓ تم حفظ بيانات الخدمة والمواصفات في قاعدة البيانات السحابية بنجاح!
        </div>
      )}

      {/* Editor Multi-Tab Navigation */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto p-2 border-b border-[#E7E0D3] dark:border-[#332F2F] no-scrollbar text-xs">
          {[
            { id: 'basic', label: 'البيانات الأساسية' },
            { id: 'template', label: 'استيراد قالب فني' },
            { id: 'taxonomy', label: 'التصنيف والتوريد' },
            { id: 'media', label: 'الصور والمعرض' },
            { id: 'specs', label: `بناء المواصفات (${specGroups.length})` },
            { id: 'highlights', label: 'المميزات البصرية' },
            { id: 'faq', label: 'الأسئلة الشائعة' },
            { id: 'prepress', label: 'تجهيز Prepress' },
            { id: 'status', label: 'حالة النشر' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#B9142D] text-white'
                  : 'text-[#78716C] dark:text-[#A8A29E] hover:bg-[#F5F1E9] dark:hover:bg-[#252222]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 text-xs">
          
          {/* TAB 1: BASIC DATA */}
          {activeTab === 'basic' && (
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  اسم الخدمة التجاري (بالعربية) <strong className="text-[#B9142D]">*</strong>
                </label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: دفاتر فواتير وسندات كربونية NCR فاخرة"
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  الاسم بالإنجليزية (English Name)
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Premium Carbonless NCR Invoice Books"
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  الشارة الترويجية (Badge)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="مثال: الأكثر طلباً للشركات، هوية تنفيذية، مقاوم للماء..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  الوصف القصير للبطاقات
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="وصف موجز يظهر في بطاقات الكتالوج وقوائم البحث..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg p-2.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  الوصف الفني الكامل والتفصيلي
                </label>
                <textarea
                  rows={4}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="شرح كامل لآلية العمل، الخامات، والاستخدامات للعميل في صفحة تفاصيل الخدمة..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg p-2.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: TEMPLATE IMPORT */}
          {activeTab === 'template' && (
            <div className="space-y-4 max-w-2xl">
              <div className="p-3.5 bg-[#FAF7F2] dark:bg-[#221F1F] rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-[#171616] dark:text-white">
                  <Sparkles className="w-4 h-4 text-[#B9142D]" />
                  <span>مكتبة القوالب الفنية الجاهزة</span>
                </div>
                <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                  اختر قالباً لتعبئة مجموعات وحقول المواصفات تلقائياً (مثل قوالب NCR، تجليد السيارات، العلب، الحروف البارزة).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className="p-3 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] bg-[#FAF7F2] dark:bg-[#252222] hover:border-[#B9142D] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#171616] dark:text-white">{tmpl.name_ar}</div>
                      <p className="text-[10px] text-[#78716C] dark:text-[#A8A29E] mt-1">{tmpl.description_ar}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyTemplate(tmpl.id)}
                      className="mt-2 bg-[#B9142D] hover:bg-[#930F23] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>تطبيق هذا القالب</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TAXONOMY & SOURCING */}
          {activeTab === 'taxonomy' && (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#171616] dark:text-white">
                    القسم الرئيسي <strong className="text-[#B9142D]">*</strong>
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => {
                      setDepartmentId(e.target.value);
                      const cats = categories.filter((c) => c.department_id === e.target.value);
                      if (cats.length > 0) setCategoryId(cats[0].id);
                    }}
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name_ar}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#171616] dark:text-white">
                    التصنيف الفرعي
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden"
                  >
                    {availableCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name_ar}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  نموذج التنفيذ والتوريد (داخلي للإدارة فقط)
                </label>
                <select
                  value={executionModel}
                  onChange={(e) => setExecutionModel(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden"
                >
                  <option value="in_house">تنفيذ وتصنيع داخلي في ورش ومطابع رواج</option>
                  <option value="local_partner">تنفيذ عبر مورد وشريك محلي متخصص</option>
                  <option value="international_sourcing">توريد واستيراد دولي (الصين / مصانع عالمية)</option>
                  <option value="mixed">مختلط (تصنيع أجزاء وتوريد أجزاء)</option>
                  <option value="not_decided">غير محدد (يحدد عند التسعير)</option>
                </select>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="accent-[#B9142D]"
                  />
                  <span className="font-bold text-[#171616] dark:text-white">عرض كخدمة مميزة (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mostRequested}
                    onChange={(e) => setMostRequested(e.target.checked)}
                    className="accent-[#B9142D]"
                  />
                  <span className="font-bold text-[#171616] dark:text-white">عرض ضمن الأكثر طلباً في الرئيسية</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & GALLERY */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-3xl">
              {/* Primary Hero Image with 3 options: Upload / URL / Library */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs space-y-3">
                <ImageUploadPicker
                  label="الصورة الرئيسية للخدمة (Hero Image)"
                  helperText="الصورة البارزة للخدمة في كروت العرض، صفحة الأقسام، وأعلى صفحة التفاصيل"
                  value={heroImage}
                  onChange={(url) => setHeroImage(url)}
                  aspectRatio="4:3"
                  defaultCategory={nameAr || 'الطباعة الورقية'}
                  previewHeightClass="h-56"
                />
              </div>

              {/* Gallery Images for this Service */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E7E0D3] dark:border-[#332F2F] pb-3">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white flex items-center gap-2">
                      <Image className="w-4 h-4 text-[#B9142D]" />
                      <span>معرض صور إضافية للخدمة (Gallery)</span>
                    </h3>
                    <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                      أضف صوراً إضافية توضح زوايا المنتج، العينات المنفذة، أو تفاصيل التشطيب (إجمالي: {galleryImages.length})
                    </p>
                  </div>
                </div>

                {/* Grid of existing gallery images */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#E7E0D3] dark:border-[#332F2F] aspect-4/3 bg-neutral-100 dark:bg-neutral-800">
                        <img 
                          src={imgUrl} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/src/assets/images/printing_brochures_1790806872644.jpg';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1.5 left-1.5 p-1 rounded-lg bg-red-600 text-white opacity-90 hover:opacity-100 shadow-xs cursor-pointer transition-opacity"
                          title="حذف الصورة من المعرض"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new image to gallery */}
                <div className="pt-2 border-t border-[#E7E0D3] dark:border-[#332F2F]">
                  <div className="text-xs font-bold text-[#171616] dark:text-white mb-2">
                    + إضافة صورة جديدة إلى معرض الخدمة:
                  </div>
                  <ImageUploadPicker
                    label="اختر صورة لإضافتها للمعرض (رفع من جهازك، رابط، أو من مكتبة رواج)"
                    value=""
                    onChange={(url) => {
                      if (url && !galleryImages.includes(url)) {
                        setGalleryImages(prev => [...prev, url]);
                      }
                    }}
                    allowClear={false}
                    previewHeightClass="h-32"
                    defaultCategory={nameAr || 'الطباعة الورقية'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SPECIFICATIONS BUILDER (Dynamic & Powerful) */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
                    مجموعات وحقول المواصفات الفنية للخدمة
                  </h3>
                  <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                    هذه الحقول تظهر للعميل في واجهة الخدمة لتخصيص المواصفات وإرسالها في طلب السعر.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddGroup}
                  className="bg-[#171616] dark:bg-white text-white dark:text-[#171616] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ إضافة مجموعة مواصفات</span>
                </button>
              </div>

              {specGroups.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-[#E7E0D3] dark:border-[#332F2F] rounded-xl space-y-2">
                  <p className="text-xs text-[#78716C]">لا توجد مجموعات مواصفات محددة بعد لهذه الخدمة.</p>
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('template')}
                      className="bg-[#B9142D] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      استيراد من قالب فني
                    </button>
                    <button
                      type="button"
                      onClick={handleAddGroup}
                      className="bg-[#FAF7F2] dark:bg-[#252222] text-[#171616] dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E7E0D3]"
                    >
                      + إنشاء مجموعة يدوياً
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {specGroups.map((group, gIdx) => (
                    <div
                      key={group.id}
                      className="bg-[#FAF7F2] dark:bg-[#221F1F] rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] p-4 space-y-4"
                    >
                      
                      {/* Group Header */}
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#E7E0D3] dark:border-[#332F2F]">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs font-bold text-[#B9142D]">مجموعة {gIdx + 1}:</span>
                          <input
                            type="text"
                            value={group.title_ar}
                            onChange={(e) => handleUpdateGroupTitle(group.id, e.target.value)}
                            className="bg-white dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded px-2.5 py-1 text-xs font-bold text-[#171616] dark:text-white flex-1 max-w-sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddField(group.id)}
                            className="bg-[#B9142D] hover:bg-[#930F23] text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>إضافة حقل</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteGroup(group.id)}
                            className="text-[#78716C] hover:text-red-600 p-1"
                            title="حذف المجموعة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Fields inside this group */}
                      <div className="space-y-3">
                        {group.fields.map((field) => (
                          <div
                            key={field.id}
                            className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] p-3.5 space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                              
                              {/* Field Label */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#78716C]">تسمية الحقل (عربي):</label>
                                <input
                                  type="text"
                                  value={field.label_ar}
                                  onChange={(e) => handleUpdateField(group.id, field.id, { label_ar: e.target.value })}
                                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded px-2 py-1 text-xs text-[#171616] dark:text-white"
                                />
                              </div>

                              {/* Field Type */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#78716C]">نوع الحقل:</label>
                                <select
                                  value={field.type}
                                  onChange={(e) => handleUpdateField(group.id, field.id, { type: e.target.value as FieldType })}
                                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded px-2 py-1 text-xs text-[#171616] dark:text-white"
                                >
                                  <option value="select">قائمة خيارات (Dropdown / Radio)</option>
                                  <option value="multi_select">اختيار متعدد (Multi-Select Checkboxes)</option>
                                  <option value="number">قيمة رقمية (Number)</option>
                                  <option value="text">نص حر (Short Text)</option>
                                  <option value="textarea">نص تفصيلي (Textarea)</option>
                                </select>
                              </div>

                              {/* Field Controls */}
                              <div className="flex items-center justify-between gap-2 pt-3">
                                <label className="flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={field.allow_rawaj_recommendation}
                                    onChange={(e) => handleUpdateField(group.id, field.id, { allow_rawaj_recommendation: e.target.checked })}
                                    className="accent-[#B9142D]"
                                  />
                                  <span>زر "توصية رواج"</span>
                                </label>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteField(group.id, field.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  title="حذف الحقل"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                            </div>

                            {/* Options if select / multi_select */}
                            {(field.type === 'select' || field.type === 'multi_select' || field.type === 'radio') && (
                              <div className="pt-2 border-t border-[#F5F1E9] dark:border-[#252222] space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-[#78716C]">الخيارات الفنية المتاحة:</span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddOption(group.id, field.id)}
                                    className="text-[10px] font-bold text-[#B9142D] hover:underline"
                                  >
                                    + خيار جديد
                                  </button>
                                </div>

                                <div className="space-y-1.5">
                                  {field.options?.map((opt) => (
                                    <div key={opt.id} className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={opt.label_ar}
                                        onChange={(e) => handleUpdateOption(group.id, field.id, opt.id, { label_ar: e.target.value })}
                                        placeholder="تسمية الخيار بالعربية"
                                        className="flex-1 bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded px-2 py-1 text-xs text-[#171616] dark:text-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveOption(group.id, field.id, opt.id)}
                                        className="text-[#78716C] hover:text-red-600 p-1"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 6: HIGHLIGHTS */}
          {activeTab === 'highlights' && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">أبرز المميزات الفنية للخدمة (Highlights):</span>
                <button
                  type="button"
                  onClick={() => setHighlights((prev) => [...prev, { id: `h-${Date.now()}`, title_ar: 'ميزة جديدة', description_ar: 'وصف الميزة...' }])}
                  className="text-xs font-bold text-[#B9142D]"
                >
                  + إضافة ميزة
                </button>
              </div>

              {highlights.map((h, idx) => (
                <div key={h.id} className="p-3 bg-[#FAF7F2] dark:bg-[#221F1F] rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={h.title_ar}
                      onChange={(e) => setHighlights((prev) => prev.map((item, i) => i === idx ? { ...item, title_ar: e.target.value } : item))}
                      placeholder="عنوان الميزة"
                      className="font-bold text-xs bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2 py-1 flex-1 max-w-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setHighlights((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={h.description_ar}
                    onChange={(e) => setHighlights((prev) => prev.map((item, i) => i === idx ? { ...item, description_ar: e.target.value } : item))}
                    placeholder="شرح الميزة الفنية..."
                    className="w-full bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded p-2 text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: FAQs */}
          {activeTab === 'faq' && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">الأسئلة الشائعة حول الخدمة:</span>
                <button
                  type="button"
                  onClick={() => setFaqs((prev) => [...prev, { id: `f-${Date.now()}`, question_ar: 'سؤال جديد؟', answer_ar: 'الإجابة...' }])}
                  className="text-xs font-bold text-[#B9142D]"
                >
                  + إضافة سؤال
                </button>
              </div>

              {faqs.map((faq, idx) => (
                <div key={faq.id} className="p-3 bg-[#FAF7F2] dark:bg-[#221F1F] rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={faq.question_ar}
                      onChange={(e) => setFaqs((prev) => prev.map((item, i) => i === idx ? { ...item, question_ar: e.target.value } : item))}
                      placeholder="السؤال"
                      className="font-bold text-xs bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2 py-1 flex-1 max-w-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setFaqs((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={faq.answer_ar}
                    onChange={(e) => setFaqs((prev) => prev.map((item, i) => i === idx ? { ...item, answer_ar: e.target.value } : item))}
                    placeholder="الإجابة..."
                    className="w-full bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded p-2 text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 8: PREPRESS */}
          {activeTab === 'prepress' && (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-xs">نمط الألوان:</label>
                  <select
                    value={prepressRules.color_mode}
                    onChange={(e) => setPrepressRules((prev) => ({ ...prev, color_mode: e.target.value as any }))}
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-3 py-2 text-xs"
                  >
                    <option value="CMYK">CMYK (معياري للطباعة)</option>
                    <option value="RGB">RGB (شاشات وليد)</option>
                    <option value="Pantone">Pantone Spot Colors</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs">الدقة الموصى بها (DPI):</label>
                  <input
                    type="number"
                    value={prepressRules.recommended_dpi}
                    onChange={(e) => setPrepressRules((prev) => ({ ...prev, recommended_dpi: parseInt(e.target.value) || 300 }))}
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-xs">ملاحظات فنية لتجهيز الملف للعميل:</label>
                <textarea
                  rows={2}
                  value={prepressRules.notes_ar}
                  onChange={(e) => setPrepressRules((prev) => ({ ...prev, notes_ar: e.target.value }))}
                  placeholder="مثال: يرجى تحويل الخطوط إلى Outlines وترك 15 مم من جهة الكعب للتخريم والتجليد..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2.5 text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 9: STATUS & PUBLISH */}
          {activeTab === 'status' && (
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-white">
                  حالة نشر الخدمة <strong className="text-[#B9142D]">*</strong>
                </label>
                <select
                  value={serviceStatus}
                  onChange={(e) => setServiceStatus(e.target.value as ServiceStatus)}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden"
                >
                  <option value="draft">مسودة (Draft) - مخفية عن المتجر</option>
                  <option value="ready_for_review">جاهزة للمراجعة الفنية</option>
                  <option value="research">قيد البحث والتطوير الفني (Research)</option>
                  <option value="published">منشورة ومتاحة للعملاء في المتجر (Published)</option>
                  <option value="archived">مؤرشفة (Archived)</option>
                </select>
              </div>

              <div className="p-4 bg-[#FAF7F2] dark:bg-[#221F1F] rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] text-xs text-[#57534E] dark:text-[#D6D3D1] space-y-1">
                <strong className="block text-[#171616] dark:text-white font-bold">قاعدة الجودة في رواج:</strong>
                <p>الخدمات التي لم تكتمل مواصفاتها أو خاماتها الفنية بنسبة 100% يفضل حفظها كـ <strong>مسودة</strong> أو <strong>قيد البحث</strong> لضمان مصداقية المنصة أمام العملاء.</p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
