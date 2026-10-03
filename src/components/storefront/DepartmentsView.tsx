import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Printer, 
  Package, 
  Building2, 
  Flame, 
  Tv, 
  Shirt, 
  Gift, 
  Layers, 
  ArrowLeft,
  Sparkles,
  Scissors,
  Maximize,
  Tags,
  Palette,
  Globe,
  Trophy,
  Utensils,
  ShieldCheck,
  Box,
  Zap,
  Factory,
  ShoppingBag,
  HeartPulse,
  Briefcase,
  CheckCircle2,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';

export const DepartmentsView: React.FC = () => {
  const { departments, categories, services, packages, industrySectors, navigate } = useApp();
  const [activeBrowseMode, setActiveBrowseMode] = useState<'sectors' | 'departments'>('sectors');

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer': return <Printer className="w-5 h-5 text-[#B9142D]" />;
      case 'Tags': return <Tags className="w-5 h-5 text-[#B9142D]" />;
      case 'Package': return <Package className="w-5 h-5 text-[#B9142D]" />;
      case 'Maximize': return <Maximize className="w-5 h-5 text-[#B9142D]" />;
      case 'Tv': return <Tv className="w-5 h-5 text-[#B9142D]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#B9142D]" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-[#B9142D]" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#B9142D]" />;
      case 'Gift': return <Gift className="w-5 h-5 text-[#B9142D]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#B9142D]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#B9142D]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#B9142D]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#B9142D]" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-[#B9142D]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#B9142D]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#B9142D]" />;
      case 'Box': return <Box className="w-5 h-5 text-[#B9142D]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#B9142D]" />;
      default: return <Layers className="w-5 h-5 text-[#B9142D]" />;
    }
  };

  const getSectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Factory': return <Factory className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#171616] via-[#241E1E] to-[#1A1213] text-white p-6 sm:p-8 rounded-3xl border border-[#B9142D]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9142D]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 border border-[#B9142D]/40 text-[#F5B4BC] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#E62E4D]" />
              <span>منظومة رواج الإنتاجية والتوريدية الشاملة</span>
            </div>
            
            <h1 className="text-xl sm:text-3xl font-black text-white">
              دليل الخدمات والأقسام التخصصية والحلول القطاعية
            </h1>
            
            <p className="text-xs sm:text-sm text-[#D6D3D1] max-w-2xl leading-relaxed">
              تصفح خدماتنا إما حسب نشاط منشأتك التجاري (باقات وحلول متكاملة)، أو حسب خطوط الإنتاج والتقنيات الهندسية الدقيقة.
            </p>
          </div>

          {/* Dual Browse Mode Toggle */}
          <div className="bg-[#252222] p-1.5 rounded-2xl border border-[#3F3B3B] flex items-center gap-1 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveBrowseMode('sectors')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeBrowseMode === 'sectors'
                  ? 'bg-[#B9142D] text-white shadow-md'
                  : 'text-[#A8A29E] hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>حسب نشاطك التجاري ({industrySectors.length} قطاعات)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveBrowseMode('departments')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeBrowseMode === 'departments'
                  ? 'bg-[#B9142D] text-white shadow-md'
                  : 'text-[#A8A29E] hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>حسب خطوط الإنتاج ({departments.length} قسماً)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SOURCING SPECIAL BANNER */}
      <div className="bg-linear-to-l from-[#1C1A1A] to-[#2B1B1D] p-4 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/40 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-right">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>هل لديك طلب تصنيع خاص أو توريد كميات ضخمة من المصانع الخارجية؟</span>
              <span className="text-[10px] bg-[#D4AF37] text-black font-extrabold px-2 py-0.5 rounded-full">OEM Sourcing</span>
            </h3>
            <p className="text-xs text-[#D6D3D1] mt-0.5">
              نتولى استيراد وتصنيع أي منتج دعائي أو هندسي غير مدرج مباشرة من مصانع الصين وتركيا بأسعار الجملة وفحص الجودة الشامل.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate({ view: 'custom-quote' })}
          className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A030] text-black font-extrabold text-xs flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
        >
          <span>طلب توريد خاص أو مناقصة</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* MODE 1: INDUSTRY SECTORS (حسب قطاع ونشاط العمل) */}
      {activeBrowseMode === 'sectors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-right">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#171616] dark:text-white">
                حلول رواج المتكاملة حسب نشاطك التجاري
              </h2>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
                باقات مجمعة تغطي كامل متطلبات نشاطك من الواجهة إلى التغليف والمطبوعات
              </p>
            </div>
            <span className="text-xs font-bold text-[#B9142D] bg-[#B9142D]/10 px-3 py-1 rounded-full">
              {industrySectors.length} قطاعات رئيسية
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industrySectors.map((sector) => {
              const sectorServices = services.filter((s) => 
                (sector.service_ids || []).includes(s.id) || (s.industry_sector_ids || []).includes(sector.id)
              );

              return (
                <div
                  key={sector.id}
                  className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs hover:border-[#B9142D] transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => navigate({ view: 'services', industrySectorId: sector.id })}
                >
                  {/* Hero Cover */}
                  <div className="relative aspect-16/9 bg-[#F5F1E9] dark:bg-[#252222] overflow-hidden">
                    <img
                      src={sector.hero_image}
                      alt={sector.name_ar}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent flex items-end p-4">
                      <div className="flex items-center gap-3 text-white">
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
                          style={{ backgroundColor: sector.color_accent || '#B9142D' }}
                        >
                          {getSectorIcon(sector.icon)}
                        </div>
                        <div>
                          <h3 className="font-heading font-black text-sm sm:text-base text-white">
                            {sector.name_ar}
                          </h3>
                          <p className="text-[10px] text-[#D6D3D1]">
                            {sector.name_en}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body & Tags */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-right">
                    <p className="text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                      {sector.description_ar}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#F5F1E9] dark:border-[#252222]">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#78716C]">
                        <span>الخدمات المتاحة لهذا القطاع:</span>
                        <span className="text-[#B9142D] font-extrabold">{sectorServices.length} خدمة</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {sectorServices.slice(0, 4).map((srv) => (
                          <span
                            key={srv.id}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#252222] text-[#171616] dark:text-[#E7E5E4] border border-[#E7E0D3] dark:border-[#332F2F]"
                          >
                            {srv.name_ar.split('(')[0]}
                          </span>
                        ))}
                        {sectorServices.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#B9142D]/10 text-[#B9142D] font-bold">
                            +{sectorServices.length - 4} المزيد
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#252220] hover:bg-[#B9142D] hover:text-white text-[#171616] dark:text-white font-bold text-xs border border-[#E7E0D3] dark:border-[#332F2F] hover:border-transparent flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer shadow-xs"
                    >
                      <span>استعراض حلول {sector.name_ar}</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: PRODUCTION DEPARTMENTS (حسب خطوط الإنتاج والتقنيات) */}
      {activeBrowseMode === 'departments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-right">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#171616] dark:text-white">
                خطوط الإنتاج والأقسام التخصصية
              </h2>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
                تصفح حسب التقنية والمعدات ونوع الخامة المطبوعة
              </p>
            </div>
            <span className="text-xs font-bold text-[#B9142D] bg-[#B9142D]/10 px-3 py-1 rounded-full">
              {departments.length} خط إنتاج وقسم
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept) => {
              const deptCats = categories.filter((c) => c.department_id === dept.id);
              const deptServices = services.filter((s) => s.department_id === dept.id && s.service_status === 'published');

              return (
                <div
                  key={dept.id}
                  className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs hover:border-[#B9142D] transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => navigate({ view: 'services', departmentId: dept.id })}
                >
                  {/* Department Hero Image */}
                  <div className="relative aspect-16/9 bg-[#F5F1E9] dark:bg-[#252222] overflow-hidden">
                    <img
                      src={dept.hero_image}
                      alt={dept.name_ar}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                          {getDeptIcon(dept.icon)}
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                            {dept.name_ar}
                          </h3>
                          <div className="text-[10px] text-[#D6D3D1] font-sans">
                            {dept.name_en}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Department Details */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-right">
                    <p className="text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                      {dept.description_ar}
                    </p>

                    {/* Subcategories preview */}
                    {deptCats.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-[#F5F1E9] dark:border-[#252222]">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#78716C]">
                          <span>التصنيفات المتاحة:</span>
                          <span className="text-[#B9142D] font-extrabold">{deptServices.length} خدمة</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {deptCats.map((cat) => (
                            <span
                              key={cat.id}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#252222] text-[#171616] dark:text-[#E7E5E4] border border-[#E7E0D3] dark:border-[#332F2F]"
                            >
                              {cat.name_ar}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#252220] hover:bg-[#B9142D] hover:text-white text-[#171616] dark:text-white font-bold text-xs border border-[#E7E0D3] dark:border-[#332F2F] hover:border-transparent flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer shadow-xs"
                    >
                      <span>استعراض خدمات {dept.name_ar}</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
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
