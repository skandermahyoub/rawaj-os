import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Users, 
  CheckCircle2,
  Image as ImageIcon,
  Quote,
  Check,
  Ban,
  Clock,
  Palette
} from 'lucide-react';
import { ClientLogo, Testimonial, BrandDisplayMode, TestimonialStatus } from '../../types';
import { ImageUploadPicker } from '../common/ImageUploadPicker';

export const AdminClientsManager: React.FC = () => {
  const { 
    clientLogos, 
    addClientLogo, 
    updateClientLogo, 
    deleteClientLogo,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateTestimonialStatus,
    brandsDisplayMode,
    updateBrandsDisplayMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'logos' | 'testimonials'>('logos');
  const [testimonialFilter, setTestimonialFilter] = useState<string>('all');
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Logo Form State
  const [editingLogo, setEditingLogo] = useState<ClientLogo | null>(null);
  const [isCreatingLogo, setIsCreatingLogo] = useState(false);
  const [logoForm, setLogoForm] = useState<Omit<ClientLogo, 'id'>>({
    name_ar: '',
    logo_url: '',
    industry_ar: 'قطاع الأعمال',
    sort_order: clientLogos.length + 1,
    is_active: true,
  });

  // Testimonial Form State
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [testForm, setTestForm] = useState<Omit<Testimonial, 'id'>>({
    client_name_ar: '',
    client_title_ar: 'المدير العام',
    client_company_ar: '',
    client_avatar_url: '',
    comment_ar: '',
    rating: 5,
    project_type_ar: 'طباعة وتوريد',
    status: 'approved',
    sort_order: testimonials.length + 1,
    is_active: true,
  });

  // Logo Handlers
  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoForm.name_ar.trim()) return;
    setActionError('');
    setIsSaving(true);
    try {
      if (editingLogo) await updateClientLogo(editingLogo.id, logoForm);
      else await addClientLogo(logoForm);
      setIsCreatingLogo(false);
      setEditingLogo(null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ شعار العميل.');
    } finally {
      setIsSaving(false);
    }
  };

  // Testimonial Handlers
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.client_name_ar.trim() || !testForm.comment_ar.trim()) return;
    setActionError('');
    setIsSaving(true);
    try {
      if (editingTest) await updateTestimonial(editingTest.id, testForm);
      else await addTestimonial(testForm);
      setIsCreatingTest(false);
      setEditingTest(null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ التقييم.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (testimonialFilter === 'all') return true;
    if (testimonialFilter === 'pending') return t.status === 'pending';
    if (testimonialFilter === 'approved') return t.status === 'approved' || (t.is_active && !t.status);
    if (testimonialFilter === 'rejected') return t.status === 'rejected';
    return true;
  });

  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {actionError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">{actionError}</div>}
      {/* Top Banner & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
            <span className="text-xs font-bold text-[#B9142D] uppercase">إدارة الصفحة الرئيسية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171616] dark:text-[#F5F3EF]">
            موديول شركاء النجاح وشهادات العملاء
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-0.5">
            إدارة شريط شعارات العلامات التجارية، ونظام مراجعة واعتماد تقييمات وآراء العملاء.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-[#F5F1E9] dark:bg-[#252222] rounded-xl self-start sm:self-auto border border-[#E7E0D3] dark:border-[#3D3838]">
          <button
            onClick={() => setActiveTab('logos')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'logos'
                ? 'bg-white dark:bg-[#1C1A1A] text-[#B9142D] shadow-xs'
                : 'text-[#78716C] hover:text-[#171616]'
            }`}
          >
            شعارات العلامات ({clientLogos.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testimonials'
                ? 'bg-white dark:bg-[#1C1A1A] text-[#B9142D] shadow-xs'
                : 'text-[#78716C] hover:text-[#171616]'
            }`}
          >
            <span>آراء وشهادات العملاء ({testimonials.length})</span>
            {pendingCount > 0 && (
              <span className="bg-[#B9142D] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: CLIENT LOGOS */}
      {activeTab === 'logos' && (
        <div className="space-y-6">
          
          {/* Display Mode Selector */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA] flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#B9142D]" />
                <span>نمط عرض شعارات العلامات التجارية في الرئيسية:</span>
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => void updateBrandsDisplayMode('colored').catch((error) => setActionError(error?.message || 'تعذر حفظ نمط عرض الشعارات.'))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  brandsDisplayMode === 'colored'
                    ? 'bg-[#B9142D] text-white shadow-xs'
                    : 'bg-[#F5F1E9] dark:bg-[#282422] text-[#746E67]'
                }`}
              >
                شعار ملون مع الاسم
              </button>
              <button
                onClick={() => void updateBrandsDisplayMode('grayscale').catch((error) => setActionError(error?.message || 'تعذر حفظ نمط عرض الشعارات.'))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  brandsDisplayMode === 'grayscale'
                    ? 'bg-[#B9142D] text-white shadow-xs'
                    : 'bg-[#F5F1E9] dark:bg-[#282422] text-[#746E67]'
                }`}
              >
                أبيض وأسود (Grayscale)
              </button>
              <button
                onClick={() => void updateBrandsDisplayMode('logo_only').catch((error) => setActionError(error?.message || 'تعذر حفظ نمط عرض الشعارات.'))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  brandsDisplayMode === 'logo_only'
                    ? 'bg-[#B9142D] text-white shadow-xs'
                    : 'bg-[#F5F1E9] dark:bg-[#282422] text-[#746E67]'
                }`}
              >
                شعار فقط
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#171616] dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#B9142D]" />
              <span>قائمة شعارات شركاء النجاح ({clientLogos.length})</span>
            </h3>

            {!isCreatingLogo && (
              <button
                onClick={() => {
                  setLogoForm({
                    name_ar: '',
                    logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
                    industry_ar: 'قطاع الأعمال',
                    sort_order: clientLogos.length + 1,
                    is_active: true,
                  });
                  setEditingLogo(null);
                  setIsCreatingLogo(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة شعار جديد</span>
              </button>
            )}
          </div>

          {/* Logo Form */}
          {isCreatingLogo && (
            <div className="bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border-2 border-[#B9142D] shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
                <h4 className="text-sm font-bold text-[#171616] dark:text-white">
                  {editingLogo ? 'تعديل شعار العميل' : 'إضافة شعار عميل جديد'}
                </h4>
                <button onClick={() => setIsCreatingLogo(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveLogo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">اسم العميل / المنشأة *</label>
                  <input
                    type="text"
                    required
                    value={logoForm.name_ar}
                    onChange={(e) => setLogoForm({ ...logoForm, name_ar: e.target.value })}
                    placeholder="مثال: مجموعة هائل سعيد أنعم"
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">القطاع أو النشاط</label>
                  <input
                    type="text"
                    value={logoForm.industry_ar}
                    onChange={(e) => setLogoForm({ ...logoForm, industry_ar: e.target.value })}
                    placeholder="مثال: الصناعات الغذائية"
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div className="md:col-span-2 p-3 rounded-xl bg-white dark:bg-[#1E1C1B] border border-[#E7E0D3] dark:border-[#332F2F]">
                  <ImageUploadPicker
                    label="صورة أو أيقونة شعار العميل *"
                    helperText="رفع صورة الشعار من جهازك، إدراج رابط، أو اختيار من مكتبة رواج"
                    value={logoForm.logo_url}
                    onChange={(url) => setLogoForm({ ...logoForm, logo_url: url })}
                    aspectRatio="1:1"
                    previewHeightClass="h-28"
                    defaultCategory="المطبوعات الورقية"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      checked={logoForm.is_active}
                      onChange={(e) => setLogoForm({ ...logoForm, is_active: e.target.checked })}
                      className="w-4 h-4 text-[#B9142D]"
                    />
                    <span className="text-xs font-bold">تفعيل في الشريط</span>
                  </label>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-[#E7E0D3]">
                  <button type="button" onClick={() => setIsCreatingLogo(false)} className="px-4 py-1.5 text-xs text-[#78716C]">إلغاء</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#B9142D] text-white text-xs font-bold">حفظ الشعار</button>
                </div>
              </form>
            </div>
          )}

          {/* Logos List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {clientLogos.sort((a, b) => a.sort_order - b.sort_order).map((logo) => (
              <div
                key={logo.id}
                className="p-4 rounded-xl bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] flex flex-col items-center justify-between text-center gap-3 shadow-xs"
              >
                <div className="w-full h-16 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 flex items-center justify-center">
                  <img src={logo.logo_url} alt={logo.name_ar} className="max-h-12 max-w-full object-contain" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#171616] dark:text-white line-clamp-1">{logo.name_ar}</h5>
                  <span className="text-[10px] text-[#78716C]">{logo.industry_ar || 'عميل معتمد'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingLogo(logo);
                      setLogoForm({ ...logo });
                      setIsCreatingLogo(true);
                    }}
                    className="p-1.5 rounded-lg text-[#171616] dark:text-white hover:bg-neutral-100"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('هل تريد حذف هذا الشعار؟')) void deleteClientLogo(logo.id).catch((error) => setActionError(error?.message || 'تعذر حذف الشعار.'));
                    }}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TESTIMONIALS & MODERATION */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          
          {/* Moderation Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTestimonialFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  testimonialFilter === 'all'
                    ? 'bg-[#B9142D] text-white shadow-xs'
                    : 'bg-white dark:bg-[#201D1C] text-[#746E67] border border-[#EBE4D5] dark:border-[#352F2D]'
                }`}
              >
                الكل ({testimonials.length})
              </button>
              <button
                onClick={() => setTestimonialFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  testimonialFilter === 'pending'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#201D1C] text-[#746E67] border border-[#EBE4D5] dark:border-[#352F2D]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>بانتظار الاعتماد ({pendingCount})</span>
              </button>
              <button
                onClick={() => setTestimonialFilter('approved')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  testimonialFilter === 'approved'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#201D1C] text-[#746E67] border border-[#EBE4D5] dark:border-[#352F2D]'
                }`}
              >
                المعتمدة المنشورة
              </button>
            </div>

            {!isCreatingTest && (
              <button
                onClick={() => {
                  setTestForm({
                    client_name_ar: '',
                    client_title_ar: 'المدير العام',
                    client_company_ar: '',
                    client_avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                    comment_ar: '',
                    rating: 5,
                    project_type_ar: 'طباعة وتوريد',
                    status: 'approved',
                    sort_order: testimonials.length + 1,
                    is_active: true,
                  });
                  setEditingTest(null);
                  setIsCreatingTest(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة تقييم يدوي</span>
              </button>
            )}
          </div>

          {/* Testimonial Form Modal */}
          {isCreatingTest && (
            <div className="bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border-2 border-[#B9142D] shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
                <h4 className="text-sm font-bold text-[#171616] dark:text-white">
                  {editingTest ? 'تعديل تقييم العميل' : 'إضافة تقييم عميل جديد'}
                </h4>
                <button onClick={() => setIsCreatingTest(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">اسم العميل *</label>
                  <input
                    type="text"
                    required
                    value={testForm.client_name_ar}
                    onChange={(e) => setTestForm({ ...testForm, client_name_ar: e.target.value })}
                    placeholder="مثال: أ. عادل القحطاني"
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">الشركة / المؤسسة *</label>
                  <input
                    type="text"
                    required
                    value={testForm.client_company_ar}
                    onChange={(e) => setTestForm({ ...testForm, client_company_ar: e.target.value })}
                    placeholder="مثال: سلسلة مقاهي أروما"
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">المسمى الوظيفي</label>
                  <input
                    type="text"
                    value={testForm.client_title_ar}
                    onChange={(e) => setTestForm({ ...testForm, client_title_ar: e.target.value })}
                    placeholder="مثال: مدير التسويق والعلامة التجارية"
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">نوع المشروع المنفذ</label>
                  <input
                    type="text"
                    value={testForm.project_type_ar}
                    onChange={(e) => setTestForm({ ...testForm, project_type_ar: e.target.value })}
                    placeholder="مثال: تغليف وهوية مقاهي"
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">نص التقييم والشهادة *</label>
                  <textarea
                    rows={3}
                    required
                    value={testForm.comment_ar}
                    onChange={(e) => setTestForm({ ...testForm, comment_ar: e.target.value })}
                    placeholder="اكتب تجربة العميل مع وكالة رواج..."
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">التقييم بالنجوم (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={testForm.rating}
                    onChange={(e) => setTestForm({ ...testForm, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border rounded-xl px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">حالة الاعتماد</label>
                  <select
                    value={testForm.status}
                    onChange={(e) => setTestForm({ ...testForm, status: e.target.value as TestimonialStatus, is_active: e.target.value === 'approved' })}
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border rounded-xl px-3 py-2 text-sm"
                  >
                    <option value="approved">معتمد ومنشور</option>
                    <option value="pending">قيد المراجعة</option>
                    <option value="rejected">مرفوض</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-[#E7E0D3]">
                  <button type="button" onClick={() => setIsCreatingTest(false)} className="px-4 py-1.5 text-xs text-[#78716C]">إلغاء</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#B9142D] text-white text-xs font-bold">حفظ التقييم</button>
                </div>
              </form>
            </div>
          )}

          {/* Testimonials List with Quick Approval Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTestimonials.map((t) => {
              const isPending = t.status === 'pending';

              return (
                <div
                  key={t.id}
                  className={`p-5 rounded-2xl border shadow-xs flex flex-col justify-between transition-all ${
                    isPending
                      ? 'bg-amber-50/50 dark:bg-[#25201A] border-amber-300 dark:border-amber-700/50'
                      : 'bg-white dark:bg-[#1C1A1A] border-[#E7E0D3] dark:border-[#332F2F]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`} />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending ? (
                          <span className="text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>بانتظار الاعتماد</span>
                          </span>
                        ) : (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                            منشور
                          </span>
                        )}
                        {t.project_type_ar && (
                          <span className="text-[10px] bg-[#B9142D]/10 text-[#B9142D] font-bold px-2 py-0.5 rounded-full">
                            {t.project_type_ar}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#3E3A37] dark:text-[#D5CFC7] leading-relaxed mb-4 italic">
                      «{t.comment_ar}»
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-[#171616] dark:text-white">{t.client_name_ar}</h5>
                      <span className="text-[10px] text-[#78716C]">{t.client_title_ar} - {t.client_company_ar}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isPending && (
                        <button
                          onClick={() => void updateTestimonialStatus(t.id, 'approved').catch((error) => setActionError(error?.message || 'تعذر اعتماد التقييم.'))}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1"
                          title="اعتماد ونشر في الرئيسية"
                        >
                          <Check className="w-3 h-3" />
                          <span>اعتماد</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setEditingTest(t);
                          setTestForm({ ...t });
                          setIsCreatingTest(true);
                        }}
                        className="p-1.5 rounded-lg text-[#171616] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        title="تعديل"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('هل تريد حذف هذا التقييم؟')) void deleteTestimonial(t.id).catch((error) => setActionError(error?.message || 'تعذر حذف التقييم.'));
                        }}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
