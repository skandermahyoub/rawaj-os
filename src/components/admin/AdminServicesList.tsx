import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Search, 
  Edit3, 
  Copy, 
  Trash2, 
  Eye, 
  Layers, 
  CheckCircle2, 
  Clock, 
  FileEdit, 
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  Tag,
  ExternalLink,
  ShieldCheck,
  Package,
  FolderTree,
  AlertCircle
} from 'lucide-react';
import { Service, ServiceStatus } from '../../types';

interface AdminServicesListProps {
  onNavigateSubView: (view: any, editId?: string) => void;
}

export const AdminServicesList: React.FC<AdminServicesListProps> = ({ onNavigateSubView }) => {
  const { services, departments, updateService, deleteService, duplicateService, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [actionError, setActionError] = useState('');

  // Metrics
  const totalCount = services.length;
  const publishedCount = services.filter((s) => s.service_status === 'published').length;
  const draftCount = services.filter((s) => s.service_status === 'draft' || s.service_status === 'ready_for_review').length;
  const coveredDeptsCount = new Set(services.map((s) => s.department_id)).size;

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (selectedDept !== 'all' && s.department_id !== selectedDept) return false;
      if (selectedStatus !== 'all' && s.service_status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const text = `${s.name_ar} ${s.name_en || ''} ${s.slug} ${s.short_description_ar || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [services, selectedDept, selectedStatus, searchQuery]);

  const handleToggleStatus = async (serviceId: string, currentStatus: ServiceStatus, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextStatus: ServiceStatus = currentStatus === 'published' ? 'draft' : 'published';
    setActionError('');
    try {
      await updateService(serviceId, { service_status: nextStatus });
    } catch (error: any) {
      setActionError(error?.message || 'تعذر تحديث حالة الخدمة.');
    }
  };

  const getStatusBadge = (status: ServiceStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            منشور
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            مسودة
          </span>
        );
      case 'ready_for_review':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-500/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            جاهز للمراجعة
          </span>
        );
      case 'research':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-500/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            قيد البحث الفني
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 bg-stone-500/10 text-stone-600 dark:text-stone-400 text-xs font-bold px-2.5 py-1 rounded-full border border-stone-500/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
            مؤرشف
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-right font-['Tajawal',sans-serif]">
      
      {/* Top Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFDFA] via-[#FAF7F2] to-[#F5EFE6] dark:from-[#1C1A1A] dark:via-[#171616] dark:to-[#12100F] p-5 sm:p-7 rounded-3xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] dark:text-[#E02440] px-3 py-1 rounded-full text-xs font-bold border border-[#B9142D]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>إدارة الخدمات والمنتجات الطباعية المتقدمة</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#171616] dark:text-white tracking-tight">
              كتالوج الخدمات والمواصفات الفنية
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] max-w-2xl leading-relaxed">
              تحكم ديناميكي شامل في التسعير، المواصفات المخصصة، قوالب الطلب، ومعارض الصور لـ <span className="font-bold text-[#B9142D] dark:text-[#E02440]">{totalCount} خدمة</span> طباعية وصناعية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">


            <button
              onClick={() => onNavigateSubView('service-edit')}
              className="bg-gradient-to-r from-[#B9142D] to-[#930F23] hover:from-[#930F23] hover:to-[#720B1B] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة خدمة جديدة</span>
            </button>
          </div>

        </div>
      </div>

      {actionError && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-bold">
          {actionError}
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-[#78716C] dark:text-[#A8A29E] font-medium">إجمالي الخدمات</div>
            <div className="text-2xl font-black text-[#171616] dark:text-white mt-1">{totalCount}</div>
            <div className="text-[11px] text-[#78716C] dark:text-[#A8A29E] mt-0.5">جاهزة للطلب والتسعير</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#B9142D]/10 text-[#B9142D] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-[#78716C] dark:text-[#A8A29E] font-medium">الخدمات المنشورة</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{publishedCount}</div>
            <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">مرئية للعملاء بالمتجر</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-[#78716C] dark:text-[#A8A29E] font-medium">المسودات والمراجعة</div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{draftCount}</div>
            <div className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-0.5">قيد التطوير الفني</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-[#78716C] dark:text-[#A8A29E] font-medium">الأقسام المغطاة</div>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{coveredDeptsCount}</div>
            <div className="text-[11px] text-[#78716C] dark:text-[#A8A29E] mt-0.5">تصنيفات صناعية متخصصة</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <FolderTree className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Modern Filter & Search Toolbar */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs space-y-3.5">
        
        {/* Row 1: Search & Dropdowns */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[#78716C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الخدمة، الوصف، الكود..."
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-[#171616] dark:text-white placeholder-[#A8A29E] focus:outline-hidden focus:border-[#B9142D] focus:ring-1 focus:ring-[#B9142D] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#171616] dark:hover:text-white bg-[#EFE9DF] dark:bg-[#332F2F] px-1.5 py-0.5 rounded-md"
              >
                مسح
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="min-w-[170px]">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-xl px-3 py-2.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
            >
              <option value="all">جميع الأقسام ({departments.length})</option>
              {departments.map((d) => {
                const count = services.filter((s) => s.department_id === d.id).length;
                return (
                  <option key={d.id} value={d.id}>
                    {d.name_ar} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Status Filter */}
          <div className="min-w-[140px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-xl px-3 py-2.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
            >
              <option value="all">جميع الحالات</option>
              <option value="published">منشور ({publishedCount})</option>
              <option value="draft">مسودة ({draftCount})</option>
              <option value="ready_for_review">جاهز للمراجعة</option>
              <option value="research">قيد البحث الفني</option>
              <option value="archived">مؤرشف</option>
            </select>
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-[#252222] p-1 rounded-xl border border-[#E7E0D3] dark:border-[#3A3535] shrink-0 self-end md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#1C1A1A] text-[#B9142D] shadow-xs'
                  : 'text-[#78716C] hover:text-[#171616] dark:hover:text-white'
              }`}
              title="عرض البطاقات الحديث (مثالي للشاشات والجوال)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">بطاقات</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#1C1A1A] text-[#B9142D] shadow-xs'
                  : 'text-[#78716C] hover:text-[#171616] dark:hover:text-white'
              }`}
              title="عرض الجدول الممتد"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">جدول</span>
            </button>
          </div>

        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F5F1E9] dark:border-[#252222] text-xs">
          <span className="text-[#78716C] text-[11px] font-bold">فلترة سريعة:</span>
          
          <button
            onClick={() => { setSelectedStatus('all'); setSelectedDept('all'); setSearchQuery(''); }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              selectedStatus === 'all' && selectedDept === 'all' && !searchQuery
                ? 'bg-[#B9142D] text-white font-bold'
                : 'bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#EFE9DF]'
            }`}
          >
            الكل ({totalCount})
          </button>

          <button
            onClick={() => setSelectedStatus('published')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              selectedStatus === 'published'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#EFE9DF]'
            }`}
          >
            المنشورة فقط ({publishedCount})
          </button>

          <button
            onClick={() => setSelectedStatus('draft')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              selectedStatus === 'draft'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] hover:bg-[#EFE9DF]'
            }`}
          >
            المسودات ({draftCount})
          </button>

          <div className="mr-auto text-[11px] text-[#78716C] dark:text-[#A8A29E]">
            تم العثور على <strong className="text-[#171616] dark:text-white">{filteredServices.length}</strong> خدمة
          </div>
        </div>

      </div>

      {/* Services Content: Grid View or Table View */}
      {filteredServices.length === 0 ? (
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-3xl border border-[#E7E0D3] dark:border-[#332F2F] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] dark:bg-[#252222] text-[#78716C] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-[#171616] dark:text-white">لم يتم العثور على خدمات مطابقة للبحث</h3>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-md mx-auto">
            جرب تغيير كلمات البحث أو إعادة تعيين الفلاتر لعرض كافة الخدمات المتوفرة في الكتالوج.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedDept('all'); setSelectedStatus('all'); }}
            className="bg-[#B9142D] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
          >
            إعادة تعيين جميع الفلاتر
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* ================= CARDS GRID VIEW (ULTRA LUXURY & RESPONSIVE) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredServices.map((service, idx) => {
            const dept = departments.find((d) => d.id === service.department_id);
            const totalFields = service.specification_groups?.reduce((acc, g) => acc + (g.fields?.length || 0), 0) || 0;
            const groupsCount = service.specification_groups?.length || 0;

            return (
              <div 
                key={service.id}
                className="group relative bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D]/40 dark:hover:border-[#B9142D]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card Top: Image + Badges */}
                <div className="relative aspect-[16/9] w-full bg-[#FAF7F2] dark:bg-[#252222] overflow-hidden border-b border-[#E7E0D3] dark:border-[#332F2F]">
                  <img
                    src={service.hero_image}
                    alt={service.name_ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Image Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Top Floating Badges */}
                  <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
                      #{idx + 1}
                    </span>

                    <button
                      onClick={(e) => handleToggleStatus(service.id, service.service_status, e)}
                      className="transition-transform active:scale-95"
                      title="انقر للتبديل الفوري بين منشور ومسودة"
                    >
                      {getStatusBadge(service.service_status)}
                    </button>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-2.5 right-2.5 left-2.5 flex items-center justify-between text-white">
                    <span className="bg-[#B9142D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <FolderTree className="w-3 h-3" />
                      <span>{dept?.name_ar || 'قسم عام'}</span>
                    </span>

                    {service.gallery && service.gallery.length > 0 && (
                      <span className="text-[10px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-white/90">
                        {service.gallery.length} صور إضافية
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-white leading-snug line-clamp-2">
                      {service.name_ar}
                    </h3>
                    
                    {service.name_en && (
                      <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E] font-medium mt-0.5 line-clamp-1">
                        {service.name_en}
                      </p>
                    )}
                  </div>

                  {/* Specifications & Features summary pill */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] px-2.5 py-1 rounded-lg text-[11px] text-[#57534E] dark:text-[#D6D3D1] font-semibold">
                      <SlidersHorizontal className="w-3 h-3 text-[#B9142D]" />
                      <span>{groupsCount} مجموعات ({totalFields} حقول تفاعلية)</span>
                    </div>

                    {service.most_requested && (
                      <span className="text-[10px] bg-[#B9142D]/10 text-[#B9142D] font-bold px-2 py-0.5 rounded border border-[#B9142D]/20">
                        الأكثر طلباً
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Actions Bar */}
                  <div className="pt-3 border-t border-[#F5F1E9] dark:border-[#252222] flex items-center justify-between gap-2">
                    
                    {/* Primary Edit Button */}
                    <button
                      onClick={() => onNavigateSubView('service-edit', service.id)}
                      className="flex-1 bg-[#FAF7F2] dark:bg-[#252222] hover:bg-[#B9142D] hover:text-white dark:hover:bg-[#B9142D] text-[#171616] dark:text-white text-xs font-bold py-2 px-3 rounded-xl border border-[#E7E0D3] dark:border-[#3A3535] hover:border-[#B9142D] flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل المواصفات</span>
                    </button>

                    {/* Secondary Action Icons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => navigate({ view: 'service-detail', serviceId: service.id })}
                        className="p-2 rounded-xl text-[#78716C] hover:text-[#B9142D] hover:bg-[#FAF7F2] dark:hover:bg-[#252222] border border-transparent hover:border-[#E7E0D3] dark:hover:border-[#332F2F] transition-colors"
                        title="معاينة في المتجر"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => void duplicateService(service.id).catch((error) => setActionError(error?.message || 'تعذر تكرار الخدمة.'))}
                        className="p-2 rounded-xl text-[#78716C] hover:text-blue-600 hover:bg-[#FAF7F2] dark:hover:bg-[#252222] border border-transparent hover:border-[#E7E0D3] dark:hover:border-[#332F2F] transition-colors"
                        title="تكرار وإنشاء نسخة جديدة"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`هل أنت متأكد من حذف خدمة «${service.name_ar}»؟`)) {
                            void deleteService(service.id).catch((error) => setActionError(error?.message || 'تعذر حذف الخدمة.'));
                          }
                        }}
                        className="p-2 rounded-xl text-[#78716C] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-colors"
                        title="حذف الخدمة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* ================= TABLE VIEW (HIGH DENSITY FOR DESKTOP) ================= */
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-3xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right min-w-[760px]">
              <thead>
                <tr className="bg-[#FAF7F2] dark:bg-[#221F1F] border-b border-[#E7E0D3] dark:border-[#332F2F] text-[#78716C] dark:text-[#A8A29E]">
                  <th className="p-3.5 font-bold">الخدمة</th>
                  <th className="p-3.5 font-bold">القسم</th>
                  <th className="p-3.5 font-bold">المواصفات الفنية</th>
                  <th className="p-3.5 font-bold">الحالة</th>
                  <th className="p-3.5 font-bold text-center">إجراءات سريعة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1E9] dark:divide-[#252222]">
                {filteredServices.map((service) => {
                  const dept = departments.find((d) => d.id === service.department_id);
                  const totalFields = service.specification_groups?.reduce((acc, g) => acc + (g.fields?.length || 0), 0) || 0;

                  return (
                    <tr key={service.id} className="hover:bg-[#FAF7F2] dark:hover:bg-[#252222]/60 transition-colors">
                      
                      {/* Service Name & Image */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={service.hero_image}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-[#E7E0D3] dark:border-[#332F2F] shrink-0 shadow-xs"
                          />
                          <div>
                            <div className="font-extrabold text-sm text-[#171616] dark:text-white leading-snug">
                              {service.name_ar}
                            </div>
                            <div className="text-[10px] text-[#78716C] dark:text-[#A8A29E] mt-0.5">
                              {service.name_en || service.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="p-3.5 text-[#57534E] dark:text-[#D6D3D1]">
                        <span className="inline-flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] px-2.5 py-1 rounded-lg text-xs font-semibold">
                          {dept?.name_ar || 'غير محدد'}
                        </span>
                      </td>

                      {/* Specs */}
                      <td className="p-3.5">
                        <span className="bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#57534E] dark:text-[#D6D3D1]">
                          {service.specification_groups?.length || 0} مجموعات ({totalFields} حقول)
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="p-3.5">
                        <button
                          onClick={() => void handleToggleStatus(service.id, service.service_status)}
                          title="انقر لتغيير حالة النشر"
                          className="transition-transform active:scale-95"
                        >
                          {getStatusBadge(service.service_status)}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* Edit */}
                          <button
                            onClick={() => onNavigateSubView('service-edit', service.id)}
                            className="p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] text-[#171616] dark:text-white hover:bg-[#B9142D] hover:text-white border border-[#E7E0D3] dark:border-[#3A3535] transition-colors shadow-xs"
                            title="تعديل المواصفات والبيانات"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* View in storefront */}
                          <button
                            onClick={() => navigate({ view: 'service-detail', serviceId: service.id })}
                            className="p-2 rounded-xl text-[#78716C] hover:text-[#B9142D] hover:bg-[#FAF7F2] dark:hover:bg-[#252222] transition-colors"
                            title="معاينة في المتجر"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Duplicate */}
                          <button
                            onClick={() => void duplicateService(service.id).catch((error) => setActionError(error?.message || 'تعذر تكرار الخدمة.'))}
                            className="p-2 rounded-xl text-[#78716C] hover:text-blue-600 hover:bg-[#FAF7F2] dark:hover:bg-[#252222] transition-colors"
                            title="تكرار وإنشاء نسخة جديدة"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm(`هل أنت متأكد من حذف خدمة «${service.name_ar}»؟`)) {
                                void deleteService(service.id).catch((error) => setActionError(error?.message || 'تعذر حذف الخدمة.'));
                              }
                            }}
                            className="p-2 rounded-xl text-[#78716C] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                            title="حذف الخدمة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
