import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from './ServiceCard';
import { 
  Filter, 
  Search, 
  X, 
  Sparkles, 
  Layers, 
  SlidersHorizontal, 
  RotateCcw,
  Briefcase,
  Globe,
  ChevronLeft
} from 'lucide-react';

interface ServicesListViewProps {
  initialDepartmentId?: string;
  initialCategoryId?: string;
  initialIndustrySectorId?: string;
  initialSearchQuery?: string;
  onOpenCustomQuote: () => void;
}

export const ServicesListView: React.FC<ServicesListViewProps> = ({
  initialDepartmentId,
  initialCategoryId,
  initialIndustrySectorId,
  initialSearchQuery = '',
  onOpenCustomQuote,
}) => {
  const { services, departments, categories, industrySectors, getIndustrySectorById } = useApp();

  const activeDepartments = departments.filter((d) => d.is_active !== false);
  const [selectedSector, setSelectedSector] = useState<string>(initialIndustrySectorId || 'all');
  const [selectedDept, setSelectedDept] = useState<string>(initialDepartmentId || 'all');
  const [selectedCat, setSelectedCat] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [activeTabMode, setActiveTabMode] = useState<'sectors' | 'departments'>(
    initialIndustrySectorId ? 'sectors' : 'departments'
  );

  useEffect(() => {
    if (initialIndustrySectorId) {
      setSelectedSector(initialIndustrySectorId);
      setActiveTabMode('sectors');
    }
  }, [initialIndustrySectorId]);

  useEffect(() => {
    if (initialDepartmentId) {
      setSelectedDept(initialDepartmentId);
      setActiveTabMode('departments');
    }
  }, [initialDepartmentId]);

  // Current active sector details if selected
  const activeSectorData = useMemo(() => {
    if (selectedSector === 'all') return null;
    return getIndustrySectorById(selectedSector);
  }, [selectedSector, getIndustrySectorById]);

  // Available categories for selected department
  const availableCategories = useMemo(() => {
    if (selectedDept === 'all') return categories.filter((c) => c.is_active !== false);
    return categories.filter((c) => c.department_id === selectedDept && c.is_active !== false);
  }, [categories, selectedDept]);

  // Handle sector change
  const handleSectorChange = (sectorId: string) => {
    setSelectedSector(sectorId);
    if (sectorId !== 'all') {
      setSelectedDept('all');
      setSelectedCat('all');
    }
  };

  // Handle department change
  const handleDeptChange = (deptId: string) => {
    setSelectedDept(deptId);
    setSelectedCat('all');
    if (deptId !== 'all') {
      setSelectedSector('all');
    }
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      // Public catalog shows customer needs, not internal technical components.
      if (s.service_status !== 'published' || s.catalog_role === 'component') return false;

      // Sector filter
      if (selectedSector !== 'all') {
        const sector = (industrySectors || []).find(sec => sec.id === selectedSector);
        const matchesSector = 
          (sector?.service_ids || []).includes(s.id) || 
          (s.industry_sector_ids || []).includes(selectedSector);
        if (!matchesSector) return false;
      }

      // Department filter
      if (selectedDept !== 'all' && s.department_id !== selectedDept) {
        return false;
      }

      // Category filter
      if (selectedCat !== 'all' && s.category_id !== selectedCat) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const specText = (s.specification_groups || [])
          .flatMap((group) => [
            group.title_ar,
            group.description_ar || '',
            ...(group.fields || []).flatMap((field) => [
              field.label_ar,
              field.help_text_ar || '',
              ...(field.options || []).flatMap((opt) => [
                opt.label_ar,
                opt.description || '',
                opt.badge || '',
              ]),
            ]),
          ])
          .join(' ');
        const text = `${s.name_ar} ${s.name_en} ${s.short_description_ar} ${s.full_description_ar} ${s.customer_goal_ar || ''} ${specText}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [services, selectedSector, selectedDept, selectedCat, searchQuery, industrySectors]);

  const handleResetFilters = () => {
    setSelectedSector('all');
    setSelectedDept('all');
    setSelectedCat('all');
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedSector !== 'all' || 
    selectedDept !== 'all' || 
    selectedCat !== 'all' || 
    searchQuery.trim() !== '';

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
        <div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#171616] dark:text-[#F5F3EF]">
            دليل خدمات الطباعة والإعلان والتجهيزات والتوريد
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E]">
            دليل تفاعلي يساعدك على اكتشاف الخيارات والخامات والتشطيبات، ثم جمع ما تحتاجه في طلب واحد.
          </p>
        </div>

        <button
          onClick={onOpenCustomQuote}
          className="self-start sm:self-auto bg-[#FDE8EA] dark:bg-[#3D1217] hover:bg-[#F8D2D6] text-[#B9142D] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors border border-[#B9142D]/20 shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#B9142D]" />
          <span>طلب خدمة مخصصة أو توريد</span>
        </button>
      </div>

      {/* ACTIVE SECTOR HERO BANNER IF FILTERED BY SECTOR */}
      {activeSectorData && (
        <div 
          className="p-5 sm:p-6 rounded-2xl text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ 
            background: `linear-gradient(135deg, #171616 0%, ${activeSectorData.color_accent || '#B9142D'}33 100%)`,
            border: `2px solid ${activeSectorData.color_accent || '#B9142D'}66`
          }}
        >
          <div className="space-y-1.5 text-right z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-bold text-[#F5F3EF]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>قطاع النشاط: {activeSectorData.name_ar}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {activeSectorData.tagline_ar}
            </h2>
            <p className="text-xs text-[#D6D3D1] max-w-2xl leading-relaxed">
              {activeSectorData.description_ar}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSectorChange('all')}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all shrink-0 cursor-pointer self-start md:self-auto"
          >
            ✕ إلغاء تصفية القطاع
          </button>
        </div>
      )}

      {/* Filter Control Bar */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-4 space-y-4 shadow-xs">
        
        {/* Search input & Browse Mode Tabs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-[#78716C] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المادة (أكريليك، كلادينج، كرتون، توريد، أختام، منيو...)..."
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-xl pr-9 pl-8 py-2.5 text-xs text-[#171616] dark:text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#171616]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tab Switcher: By Industry vs By Department */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-[#252222] p-1 rounded-xl border border-[#E7E0D3] dark:border-[#3A3535] shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTabMode('sectors')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTabMode === 'sectors'
                  ? 'bg-[#B9142D] text-white shadow-xs'
                  : 'text-[#57534E] dark:text-[#D6D3D1]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>القطاعات</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTabMode('departments')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTabMode === 'departments'
                  ? 'bg-[#B9142D] text-white shadow-xs'
                  : 'text-[#57534E] dark:text-[#D6D3D1]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>الأقسام</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#57534E] dark:text-[#D6D3D1] bg-[#FAF7F2] dark:bg-[#252222] hover:bg-[#EAE4D6] px-3 py-2.5 rounded-xl border border-[#E7E0D3] dark:border-[#3A3535] transition-colors shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إلغاء الفلاتر</span>
            </button>
          )}
        </div>

        {/* TAB 1: INDUSTRY SECTORS CHIPS */}
        {activeTabMode === 'sectors' && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#78716C] dark:text-[#A8A29E]">
              <Briefcase className="w-3.5 h-3.5 text-[#B9142D]" />
              <span>التصفية حسب قطاع ونشاط العمل:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => handleSectorChange('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedSector === 'all'
                    ? 'bg-[#B9142D] text-white font-bold shadow-xs'
                    : 'bg-[#FAF7F2] dark:bg-[#221F1F] text-[#44403C] dark:text-[#D6D3D1] border border-[#E7E0D3] dark:border-[#332F2F]'
                }`}
              >
                جميع القطاعات ({services.filter((s) => s.service_status === 'published' && s.catalog_role !== 'component').length})
              </button>
              {industrySectors.map((sector) => {
                const count = services.filter((s) => 
                  s.service_status === 'published' && s.catalog_role !== 'component' &&
                  (((sector.service_ids || []).includes(s.id)) || (s.industry_sector_ids || []).includes(sector.id))
                ).length;
                return (
                  <button
                    key={sector.id}
                    onClick={() => handleSectorChange(sector.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                      selectedSector === sector.id
                        ? 'bg-[#B9142D] text-white font-bold shadow-xs'
                        : 'bg-[#FAF7F2] dark:bg-[#221F1F] text-[#44403C] dark:text-[#D6D3D1] border border-[#E7E0D3] dark:border-[#332F2F]'
                    }`}
                  >
                    {sector.name_ar} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: DEPARTMENTS CHIPS */}
        {activeTabMode === 'departments' && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#78716C] dark:text-[#A8A29E]">
              <Layers className="w-3.5 h-3.5 text-[#B9142D]" />
              <span>خطوط الإنتاج والأقسام التخصصية:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => handleDeptChange('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedDept === 'all'
                    ? 'bg-[#B9142D] text-white font-bold shadow-xs'
                    : 'bg-[#FAF7F2] dark:bg-[#221F1F] text-[#44403C] dark:text-[#D6D3D1] border border-[#E7E0D3] dark:border-[#332F2F]'
                }`}
              >
                جميع الأقسام ({services.filter((s) => s.service_status === 'published' && s.catalog_role !== 'component').length})
              </button>
              {activeDepartments.map((dept) => {
                const count = services.filter((s) => s.department_id === dept.id && s.service_status === 'published' && s.catalog_role !== 'component').length;
                return (
                  <button
                    key={dept.id}
                    onClick={() => handleDeptChange(dept.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                      selectedDept === dept.id
                        ? 'bg-[#B9142D] text-white font-bold shadow-xs'
                        : 'bg-[#FAF7F2] dark:bg-[#221F1F] text-[#44403C] dark:text-[#D6D3D1] border border-[#E7E0D3] dark:border-[#332F2F]'
                    }`}
                  >
                    {dept.name_ar} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Categories if specific department selected */}
        {availableCategories.length > 0 && selectedDept !== 'all' && activeTabMode === 'departments' && (
          <div className="space-y-1.5 pt-2 border-t border-[#F5F1E9] dark:border-[#252222]">
            <div className="text-[11px] font-bold text-[#78716C] dark:text-[#A8A29E]">
              التصنيف الفرعي للقسم:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCat('all')}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedCat === 'all'
                    ? 'bg-[#171616] dark:bg-white text-white dark:text-[#171616] font-bold'
                    : 'bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#EAE4D6]'
                }`}
              >
                الكل
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedCat === cat.id
                      ? 'bg-[#171616] dark:bg-white text-white dark:text-[#171616] font-bold'
                      : 'bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#EAE4D6]'
                  }`}
                >
                  {cat.name_ar}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Services Grid (2 in row mobile / 3-4 on desktop) */}
      {filteredServices.length === 0 ? (
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#B9142D]/10 text-[#B9142D] mx-auto flex items-center justify-center">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#171616] dark:text-[#F5F3EF]">
            لا توجد خدمات مطابقة لخيارات التصفية الحالية
          </h3>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-md mx-auto">
            رواج تتولى توريد وتصنيع كافة حلول الطباعة والإعلان والتغليف حسب الطلب مباشرة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold bg-[#F5F1E9] dark:bg-[#252222] text-[#171616] dark:text-white px-4 py-2 rounded-xl cursor-pointer"
            >
              عرض جميع الخدمات
            </button>
            <button
              onClick={onOpenCustomQuote}
              className="text-xs font-bold bg-[#B9142D] hover:bg-[#9E1026] text-white px-4 py-2 rounded-xl shadow-xs cursor-pointer"
            >
              + إنشاء طلب توريد خاص جديد
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-[#78716C] dark:text-[#A8A29E] flex items-center justify-between px-1">
            <span>تم العثور على <strong>{filteredServices.length}</strong> خدمة رئيسية</span>
            <span className="text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
              اختر ثم خصص حسب رغبتك
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
