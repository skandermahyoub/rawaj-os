import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Layers, 
  Clock, 
  Building2, 
  Eye, 
  Copy, 
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  X,
  ListPlus,
  ShieldCheck
} from 'lucide-react';
import { ImageUploadPicker } from '../common/ImageUploadPicker';
import { SECTOR_PACKAGES_DATA } from '../../data/sectorPackagesData';
import { db, doc, setDoc } from '../../lib/cloudDb';

export const AdminPackagesManager: React.FC = () => {
  const { packages, services, createPackage, updatePackage, deletePackage, navigate, isCloudSynced } = useApp();
  const [editingPkg, setEditingPkg] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const SECTOR_OPTIONS = [
    { key: 'all', label: 'كافة القطاعات', icon: '✨' },
    { key: 'health', label: 'المستشفيات والصحة 🏥', icon: '🏥' },
    { key: 'education', label: 'التعليم والمدارس 🎓', icon: '🎓' },
    { key: 'hospitality', label: 'المطاعم والكافيهات 🍽️', icon: '🍽️' },
    { key: 'fashion', label: 'الأزياء والبراندات 👗', icon: '👗' },
    { key: 'pharma', label: 'الأدوية ومستحضرات التجميل 💊', icon: '💊' },
    { key: 'events', label: 'المعارض والفعاليات 🎪', icon: '🎪' },
    { key: 'corporate', label: 'الشركات والبنوك VIP 🏢', icon: '🏢' },
    { key: 'realestate', label: 'العقارات والمقاولات 🏗️', icon: '🏗️' },
    { key: 'logistics', label: 'النقل واللوجستيات 🚚', icon: '🚚' },
    { key: 'retail', label: 'المتاجر والتجزئة 🛍️', icon: '🛍️' },
  ];

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      if (selectedSector !== 'all' && pkg.sector_key !== selectedSector) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${pkg.title_ar} ${pkg.title_en || ''} ${pkg.tagline_ar || ''} ${pkg.target_sector_ar || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [packages, selectedSector, searchQuery]);

  const handleAddNew = () => {
    setEditingPkg({
      id: `pkg-${Date.now()}`,
      title_ar: 'باقة تجارية جديدة لقطاع مخصص',
      title_en: 'New Custom Sector Package',
      slug: `custom-package-${Date.now()}`,
      tagline_ar: 'حلول متكاملة تشمل المطبوعات والهوية واللوحات والتغليف.',
      description_ar: 'تفاصيل شمولية الباقة والخدمات المشمولة فيها لإدارات الشركات والمشتريات...',
      hero_image: '/src/assets/images/luxury_packaging_showcase_1790822533141.jpg',
      badge: 'باقة قطاعية متكاملة',
      featured: true,
      sector_key: 'corporate',
      target_sector_ar: 'الشركات والمؤسسات التجارية',
      ideal_for_ar: 'إدارات المشتريات والتسويق في الشركات',
      turnaround_time_ar: '٥ - ٨ أيام عمل',
      service_ids: services.slice(0, 4).map((s) => s.id),
      benefits_ar: [
        'توحيد المورد والمسؤولية الفنية مع رواج.',
        'تطابق تام لألوان الهوية عبر كافة المطبوعات.',
        'توفير في تكلفة التوريد وإشراف مباشر.'
      ],
      items_breakdown: [
        { name_ar: 'المطبوعات الرسمية والهوية', description_ar: 'أوراق مراسلات، أظرف، وكروت شخصية فاخرة.' },
        { name_ar: 'اللوحات واللافتات التعريفية', description_ar: 'لوحات أكريليك وستانلس ستيل مضيئة.' }
      ],
      sort_order: packages.length + 1,
    });
  };

  const handleSyncSectorPackagesToCloud = async () => {
    setIsSyncingCloud(true);
    setSyncFeedback(null);
    try {
      let count = 0;
      for (const pkg of SECTOR_PACKAGES_DATA) {
        await setDoc(doc(db, 'packages', pkg.id), pkg, { merge: true });
        count++;
      }
      setSyncFeedback(`تمت مزامنة ورفع ${count} باقات قطاعية بنجاح إلى سحابة Supabase!`);
      setTimeout(() => setSyncFeedback(null), 5000);
    } catch (err: any) {
      setSyncFeedback(`حدث خطأ أثناء المزامنة: ${err.message}`);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPkg.id) {
      updatePackage(editingPkg.id, editingPkg);
    } else {
      createPackage(editingPkg);
    }
    setEditingPkg(null);
  };

  return (
    <div className="space-y-6 text-right pb-20">
      
      {/* Executive Header Banner */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#B9142D]/10 text-[#B9142D] dark:bg-[#B9142D]/20">
              <Package className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                إدارة باقات القطاعات والحلول المجمّعة ({packages.length})
              </h1>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-0.5">
                تخصيص العروض الاستراتيجية للقطاعات (المستشفيات، المدارس، المطاعم، البراندات، الفعاليات...) لجلب كبرى صفقات الشركات.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleSyncSectorPackagesToCloud}
            disabled={isSyncingCloud}
            className="flex-1 md:flex-initial bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
            title="رفع وتحديث كافة باقات القطاعات الذهبية إلى Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingCloud ? 'animate-spin' : ''}`} />
            <span>{isSyncingCloud ? 'جار المزامنة السحابية...' : 'مزامنة الباقات السحابية'}</span>
          </button>

          <button
            onClick={handleAddNew}
            className="flex-1 md:flex-initial bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ إضافة باقة قطاعية</span>
          </button>
        </div>
      </div>

      {syncFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#78716C] absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن باقة بالاسم، القطاع المستهدف، أو الوصف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl pr-10 pl-4 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
            />
          </div>

          <div className="text-xs text-[#78716C] dark:text-[#A8A29E] shrink-0 font-medium">
            عرض <strong>{filteredPackages.length}</strong> من إجمالي {packages.length}
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SECTOR_OPTIONS.map((s) => {
            const isActive = selectedSector === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSelectedSector(s.key)}
                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-[#B9142D] text-white border-[#B9142D]'
                    : 'bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D]/40'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredPackages.map((pkg) => {
          const breakdownCount = pkg.items_breakdown?.length || 0;
          const serviceCount = pkg.service_ids?.length || 0;

          return (
            <div
              key={pkg.id}
              className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D] transition-all overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="aspect-16/10 relative overflow-hidden bg-[#FAF7F2] dark:bg-[#252222]">
                  <img 
                    src={pkg.hero_image} 
                    alt={pkg.title_ar} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="bg-[#B9142D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      {pkg.badge || 'باقة قطاعية'}
                    </span>
                  </div>
                  {pkg.turnaround_time_ar && (
                    <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{pkg.turnaround_time_ar}</span>
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  {pkg.target_sector_ar && (
                    <div className="text-[11px] font-bold text-amber-800 dark:text-amber-400">
                      🎯 {pkg.target_sector_ar}
                    </div>
                  )}

                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#171616] dark:text-white leading-snug">
                    {pkg.title_ar}
                  </h3>

                  <p className="text-xs text-[#78716C] dark:text-[#A8A29E] line-clamp-2">
                    {pkg.tagline_ar}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F5F1E9] dark:border-[#252222] text-[11px] text-[#57534E] dark:text-[#D6D3D1]">
                    <div className="bg-[#FAF7F2] dark:bg-[#252222] p-2 rounded-lg">
                      <span className="text-[#78716C]">الخدمات المدمجة:</span>{' '}
                      <strong>{serviceCount}</strong>
                    </div>
                    <div className="bg-[#FAF7F2] dark:bg-[#252222] p-2 rounded-lg">
                      <span className="text-[#78716C]">البنود الهندسية:</span>{' '}
                      <strong>{breakdownCount}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-0 border-t border-[#F5F1E9] dark:border-[#252222] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (window.confirm(`هل أنت متأكد من حذف باقة "${pkg.title_ar}"؟`)) {
                      deletePackage(pkg.id);
                    }
                  }}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate({ view: 'package-detail', packageId: pkg.id })}
                    className="text-xs text-[#57534E] dark:text-[#D6D3D1] hover:text-[#B9142D] flex items-center gap-1 p-1"
                    title="معاينة في المتجر"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>معاينة</span>
                  </button>

                  <button
                    onClick={() => setEditingPkg(JSON.parse(JSON.stringify(pkg)))}
                    className="bg-[#B9142D]/10 text-[#B9142D] hover:bg-[#B9142D] hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل الباقة</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Edit / Create Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
          <form
            onSubmit={handleSave}
            className="w-full max-w-3xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-3xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-6 space-y-5 max-h-[90vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D3] dark:border-[#332F2F]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#B9142D]/10 text-[#B9142D]">
                  <Package className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#171616] dark:text-white">
                    تعديل وتخصيص الباقة القطاعية
                  </h3>
                  <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                    حدد البنود الهندسية والخدمات المشمولة لتجهيز عروض الشركات الكبرى
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setEditingPkg(null)}
                className="p-1.5 rounded-lg text-[#78716C] hover:bg-[#FAF7F2] dark:hover:bg-[#252222]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-white">عنوان الباقة (عربي):</label>
                <input
                  type="text"
                  required
                  value={editingPkg.title_ar || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, title_ar: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-white">تصنيف القطاع المستهدف:</label>
                <select
                  value={editingPkg.sector_key || 'corporate'}
                  onChange={(e) => setEditingPkg({ ...editingPkg, sector_key: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs"
                >
                  <option value="health">المستشفيات والصحة 🏥</option>
                  <option value="education">التعليم والمدارس 🎓</option>
                  <option value="hospitality">المطاعم والكافيهات 🍽️</option>
                  <option value="fashion">الأزياء والبراندات 👗</option>
                  <option value="pharma">الأدوية ومستحضرات التجميل 💊</option>
                  <option value="events">المعارض والفعاليات 🎪</option>
                  <option value="corporate">الشركات والبنوك VIP 🏢</option>
                  <option value="realestate">العقارات والمقاولات 🏗️</option>
                  <option value="logistics">النقل واللوجستيات 🚚</option>
                  <option value="retail">المتاجر والتجزئة 🛍️</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-white">القطاع المستهدف (نص وصفي):</label>
                <input
                  type="text"
                  placeholder="مثلاً: المستشفيات، المجمعات الطبية، ومراكز الأسنان"
                  value={editingPkg.target_sector_ar || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, target_sector_ar: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-white">مدة التوريد التقديرية:</label>
                <input
                  type="text"
                  placeholder="مثلاً: ٥ - ٨ أيام عمل"
                  value={editingPkg.turnaround_time_ar || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, turnaround_time_ar: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#171616] dark:text-white">شعار الباقة / الوصف التسويقي الموجز:</label>
              <input
                type="text"
                value={editingPkg.tagline_ar || ''}
                onChange={(e) => setEditingPkg({ ...editingPkg, tagline_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#171616] dark:text-white">الوصف الشامل للباقة:</label>
              <textarea
                rows={3}
                value={editingPkg.description_ar || ''}
                onChange={(e) => setEditingPkg({ ...editingPkg, description_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl p-3 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#171616] dark:text-white">لمن صممت هذه الباقة (Ideal For):</label>
              <input
                type="text"
                value={editingPkg.ideal_for_ar || ''}
                onChange={(e) => setEditingPkg({ ...editingPkg, ideal_for_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#1A1817] border border-[#E7E0D3] dark:border-[#332F2F]">
              <ImageUploadPicker
                label="صورة غلاف الباقة القطاعية *"
                helperText="حدد صورة الباقة: رفع من جهازك أو الجوال، إدراج رابط، أو اختيار من مكتبة رواج"
                value={editingPkg.hero_image || ''}
                onChange={(url) => setEditingPkg({ ...editingPkg, hero_image: url })}
                aspectRatio="16:9"
                previewHeightClass="h-40"
                defaultCategory="التغليف والعلب"
              />
            </div>

            {/* Services multiselect */}
            <div className="space-y-2">
              <label className="font-bold text-[#171616] dark:text-white flex items-center justify-between">
                <span>الخدمات الأساسية المشمولة في الباقة:</span>
                <span className="text-[#B9142D] font-normal">
                  ({(editingPkg.service_ids || []).length} خدمات مختارة)
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 bg-[#FAF7F2] dark:bg-[#252222] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
                {services.map((s) => {
                  const isChecked = editingPkg.service_ids?.includes(s.id);
                  return (
                    <label 
                      key={s.id} 
                      className={`flex items-center gap-2 p-2 rounded-xl text-[11px] cursor-pointer border transition-all ${
                        isChecked 
                          ? 'bg-[#B9142D]/10 border-[#B9142D] text-[#171616] dark:text-white font-bold' 
                          : 'bg-white dark:bg-[#1C1A1A] border-[#E7E0D3] dark:border-[#332F2F] text-[#57534E] dark:text-[#A8A29E]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          const nextIds = isChecked
                            ? editingPkg.service_ids.filter((id: string) => id !== s.id)
                            : [...(editingPkg.service_ids || []), s.id];
                          setEditingPkg({ ...editingPkg, service_ids: nextIds });
                        }}
                        className="accent-[#B9142D]"
                      />
                      <span className="truncate">{s.name_ar}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E7E0D3] dark:border-[#332F2F]">
              <button
                type="button"
                onClick={() => setEditingPkg(null)}
                className="px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#B9142D] hover:bg-[#930F23] text-white font-bold px-6 py-2 rounded-xl shadow-sm transition-all"
              >
                حفظ الباقة السحابية
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
