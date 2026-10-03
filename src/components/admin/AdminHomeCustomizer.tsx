import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Settings, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Palette, 
  Sliders,
  ExternalLink,
  Layout,
  Search,
  Filter,
  Check,
  Info
} from 'lucide-react';
import { HomeModuleConfig, HomeModuleId } from '../../types';

interface AdminHomeCustomizerProps {
  onNavigateSubView: (view: any) => void;
}

export const AdminHomeCustomizer: React.FC<AdminHomeCustomizerProps> = ({ onNavigateSubView }) => {
  const { 
    homeModulesConfig, 
    updateHomeModulesConfig, 
    toggleModuleVisibility, 
    reorderHomeModules,
    updateModuleLayout,
    themeSettings,
    updateThemeSettings,
    navigate
  } = useApp();

  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'visible' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    reorderHomeModules(index, index - 1);
    showNotice('تم تقديم ترتيب الموديول بنجاح');
  };

  const handleMoveDown = (index: number) => {
    if (index === homeModulesConfig.length - 1) return;
    reorderHomeModules(index, index + 1);
    showNotice('تم تأخير ترتيب الموديول بنجاح');
  };

  const handleToggle = (id: HomeModuleId) => {
    toggleModuleVisibility(id);
    showNotice('تم تحديث حالة ظهور الموديول');
  };

  const handleSelectLayout = (id: HomeModuleId, layoutId: string) => {
    updateModuleLayout(id, layoutId);
    showNotice('تم تغيير طريقة عرض الموديول وتطبيقها على المتجر');
  };

  const showNotice = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const getModuleEditorSubView = (id: HomeModuleId) => {
    switch (id) {
      case 'header_hero':
        return 'header-hero';
      case 'slider':
        return 'home-slides';
      case 'marquee':
        return 'marquee';
      case 'about_us':
        return 'about-module';
      case 'why_us':
        return 'features';
      case 'services_catalog':
        return 'services';
      case 'sector_packages':
        return 'packages';
      case 'promo_banners':
        return 'promos';
      case 'testimonials':
      case 'brands_partners':
        return 'clients-testimonials';
      case 'portfolio_showcase':
        return 'portfolio';
      case 'blog_hub':
        return 'blog';
      case 'faq':
        return 'faq';
      case 'contact_us':
        return 'contact-inbox';
      default:
        return 'settings';
    }
  };


  const visibleCount = homeModulesConfig.filter(m => m.is_visible).length;
  const hiddenCount = homeModulesConfig.filter(m => !m.is_visible).length;

  const filteredModules = homeModulesConfig
    .map((mod, index) => ({ mod, originalIndex: index }))
    .filter(({ mod }) => {
      if (filterMode === 'visible' && !mod.is_visible) return false;
      if (filterMode === 'hidden' && mod.is_visible) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          mod.name_ar.toLowerCase().includes(query) ||
          mod.description_ar.toLowerCase().includes(query) ||
          mod.badge_ar.toLowerCase().includes(query)
        );
      }
      return true;
    });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171616] via-[#241F1E] to-[#171616] text-white border border-[#3E3836] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 text-[#E03A53] border border-[#B9142D]/40 text-xs font-bold mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>نظام إدارة وتخصيص محتوى الصفحة الرئيسية (CMS Engine)</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white">
            التحكم الشامل بموديولات الصفحة الرئيسية
          </h2>
          <p className="text-xs sm:text-sm text-[#CDC4B7] mt-1.5 max-w-2xl leading-relaxed">
            تحكم بكل موديول عبر 3 أبعاد تشغيلية: <strong>طريقة العرض والتخطيط</strong>، <strong>ترتيب الظهور</strong>، و<strong>الإظهار والإخفاء</strong>، بالإضافة إلى تعديل المحتوى مباشرة.
          </p>
        </div>

        <button
          onClick={() => navigate({ view: 'home' })}
          className="px-5 py-2.5 rounded-xl bg-white text-[#171616] hover:bg-[#FAF6F0] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all shrink-0 hover:scale-102"
        >
          <ExternalLink className="w-4 h-4 text-[#B9142D]" />
          <span>معاينة المتجر الآن</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* 1. Official Single Rawaj Brand Identity Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-[#B9142D]" />
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F5F1EA]">
                الهوية البصرية الرسمية لمطابع رواج (ستايل موحد ومعتمد)
              </h3>
              <p className="text-xs text-[#746E67] dark:text-[#A0988F] mt-0.5">
                طابع بصري واحد فاخر خاص بمطابع رواج فقط: الأحمر القرمزي الملكي مع الذهب الفاخر.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] dark:text-[#E03A53] text-[11px] font-bold border border-[#B9142D]/20">
            الهوية الحصرية المعتمدة
          </span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-[#B9142D]/10 via-[#FAF8F5] dark:via-[#151312] to-[#D4AF37]/10 border border-[#B9142D]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex -space-x-2 rtl:space-x-reverse shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#B9142D] border-2 border-white dark:border-[#1E1B1A] shadow-md flex items-center justify-center text-white font-bold text-xs" title="اللون القرمزي الملكي">
                رواج
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] border-2 border-white dark:border-[#1E1B1A] shadow-md flex items-center justify-center text-black font-bold text-[10px]" title="الذهب الفاخر">
                ذهب
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#171616] dark:text-[#F5F1EA]">
                  الستايل الملكي: قرمزي رواج (#B9142D) والذهب (#D4AF37)
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-xs text-[#746E67] dark:text-[#A0988F] mt-0.5">
                مطبق في كامل أقسام المتجر، الكاروسيل المنزلق، الهيدر، الفوتر، وبطاقات المنتجات بدقة متناهية.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateSubView('style-customizer')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-[#252220] hover:bg-[#FAF8F5] border border-[#E8E2D5] dark:border-[#383330] text-[#171616] dark:text-[#F7F5F0] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-[#B9142D]" />
            <span>تخصيص الخطوط والوضع الداكن/الفاتح</span>
          </button>
        </div>
      </div>

      {/* 2. Modules List & Order Control Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-6">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#B9142D]" />
            <div>
              <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F5F1EA]">
                موديولات الصفحة الرئيسية الـ 15 (الترتيب، طريقة العرض، والإظهار)
              </h3>
              <p className="text-xs text-[#746E67] dark:text-[#A0988F] mt-0.5">
                كل موديول يتيح تبديل طريقة العرض (Layout Variant) بنقرة واحدة لتغيير شكل الصفحة بالكامل.
              </p>
            </div>
          </div>

          {/* Filter & Search Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#888177]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث عن موديول..."
                className="w-40 sm:w-48 pr-8 pl-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#252221] border border-[#E5DEC\-D] dark:border-[#383331] text-xs font-medium focus:outline-none focus:border-[#B9142D]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-[#FAF7F2] dark:bg-[#252221] p-1 rounded-xl border border-[#E5DEC0] dark:border-[#383331] text-xs font-bold">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'all'
                    ? 'bg-white dark:bg-[#1E1B1A] text-[#B9142D] shadow-xs'
                    : 'text-[#746E67] hover:text-[#171616]'
                }`}
              >
                الكل ({homeModulesConfig.length})
              </button>
              <button
                onClick={() => setFilterMode('visible')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'visible'
                    ? 'bg-white dark:bg-[#1E1B1A] text-emerald-600 shadow-xs'
                    : 'text-[#746E67] hover:text-[#171616]'
                }`}
              >
                ظاهر ({visibleCount})
              </button>
              <button
                onClick={() => setFilterMode('hidden')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterMode === 'hidden'
                    ? 'bg-white dark:bg-[#1E1B1A] text-amber-600 shadow-xs'
                    : 'text-[#746E67] hover:text-[#171616]'
                }`}
              >
                مخفي ({hiddenCount})
              </button>
            </div>
          </div>
        </div>

        {/* Modules Cards List */}
        <div className="space-y-4">
          {filteredModules.map(({ mod, originalIndex }) => {
            const editorView = getModuleEditorSubView(mod.id);
            const activeLayout = mod.available_layouts?.find(l => l.id === mod.layout_style) || mod.available_layouts?.[0];

            return (
              <div
                key={mod.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col gap-4 ${
                  mod.is_visible
                    ? 'bg-[#FFFDF9] dark:bg-[#23201F] border-[#EBE4D5] dark:border-[#352F2D] shadow-xs'
                    : 'bg-[#F2ECE1]/50 dark:bg-[#181615]/50 border-dashed border-[#DCD5C5] dark:border-[#302B29] opacity-75'
                }`}
              >
                {/* Upper Row: Info and Primary Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left side: Module Order Number, Name & Description */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Order Chip */}
                    <span className="w-8 h-8 rounded-xl bg-[#B9142D]/10 text-[#B9142D] dark:bg-[#B9142D]/20 dark:text-[#E03A53] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {originalIndex + 1}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA]">
                          {mod.name_ar}
                        </h4>
                        <span className="text-[10px] bg-[#EBE4D5] dark:bg-[#2F2A28] text-[#57524C] dark:text-[#BDB4A8] px-2 py-0.5 rounded-md font-bold">
                          {mod.badge_ar}
                        </span>
                        {activeLayout && (
                          <span className="text-[10px] bg-[#D4AF37]/15 text-[#927318] dark:text-[#E5B54F] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                            <Layout className="w-3 h-3 text-[#D4AF37]" />
                            <span>نمط العرض: {activeLayout.name_ar}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#746E67] dark:text-[#A0988F] mt-1">
                        {mod.description_ar}
                      </p>
                    </div>
                  </div>

                  {/* Right side: Action buttons (Up/Down, Show/Hide, Edit Content) */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {/* Move Up */}
                    <button
                      disabled={originalIndex === 0}
                      onClick={() => handleMoveUp(originalIndex)}
                      className="p-2 rounded-xl bg-white dark:bg-[#2A2624] border border-[#E0D8C8] dark:border-[#3A3533] text-[#171616] dark:text-white disabled:opacity-30 hover:bg-[#F5EFE6] transition-colors"
                      title="تحريك لأعلى في الترتيب"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      disabled={originalIndex === homeModulesConfig.length - 1}
                      onClick={() => handleMoveDown(originalIndex)}
                      className="p-2 rounded-xl bg-white dark:bg-[#2A2624] border border-[#E0D8C8] dark:border-[#3A3533] text-[#171616] dark:text-white disabled:opacity-30 hover:bg-[#F5EFE6] transition-colors"
                      title="تحريك لأسفل في الترتيب"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Toggle Visibility */}
                    <button
                      onClick={() => handleToggle(mod.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                        mod.is_visible
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-neutral-500/10 text-neutral-500 border-neutral-400/30 hover:bg-neutral-500/20'
                      }`}
                      title="إظهار / إخفاء الموديول"
                    >
                      {mod.is_visible ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span>ظاهر</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>مخفي</span>
                        </>
                      )}
                    </button>

                    {/* Jump to Module Editor */}
                    <button
                      onClick={() => onNavigateSubView(editorView)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#B9142D] hover:bg-[#910E23] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>تخصيص المحتوى</span>
                    </button>
                  </div>
                </div>

                {/* Lower Section: Display Layout Style Selector (طريقة العرض) */}
                {mod.available_layouts && mod.available_layouts.length > 0 && (
                  <div className="pt-3 border-t border-[#F0EBE0] dark:border-[#2F2B29]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Layout className="w-3.5 h-3.5 text-[#B9142D]" />
                      <span className="text-xs font-bold text-[#423E3A] dark:text-[#D1C9BE]">
                        خيارات طريقة وتخطيط العرض (Display Layout Variants):
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {mod.available_layouts.map((layout) => {
                        const isCurrentLayout = (mod.layout_style || mod.available_layouts?.[0]?.id) === layout.id;
                        return (
                          <div
                            key={layout.id}
                            onClick={() => handleSelectLayout(mod.id, layout.id)}
                            className={`p-2.5 rounded-xl border text-right cursor-pointer transition-all flex flex-col justify-between gap-1.5 ${
                              isCurrentLayout
                                ? 'bg-[#B9142D]/5 dark:bg-[#B9142D]/15 border-[#B9142D] dark:border-[#E03A53] shadow-xs'
                                : 'bg-white dark:bg-[#272322] border-[#E8E1D2] dark:border-[#3A3432] hover:border-[#B9142D]/50 opacity-80 hover:opacity-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold ${
                                isCurrentLayout ? 'text-[#B9142D] dark:text-[#E03A53]' : 'text-[#171616] dark:text-[#F5F1EA]'
                              }`}>
                                {layout.name_ar}
                              </span>
                              {isCurrentLayout && (
                                <span className="w-4 h-4 rounded-full bg-[#B9142D] text-white flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[#746E67] dark:text-[#A0988F] leading-tight">
                              {layout.description_ar}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            );
          })}

          {filteredModules.length === 0 && (
            <div className="p-8 text-center bg-[#FAF7F2] dark:bg-[#23201F] rounded-2xl border border-dashed border-[#E0D8C8] dark:border-[#383331] text-xs text-[#746E67]">
              لا توجد موديولات تطابق معايير البحث الحالية.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
