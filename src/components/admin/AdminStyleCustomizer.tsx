import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COLOR_PRESETS, INITIAL_THEME_SETTINGS } from '../../data/initialData';
import { applyThemeToDocument } from '../../utils/themeEngine';
import { 
  Palette, 
  Save, 
  RotateCcw, 
  Sun, 
  Moon, 
  Monitor, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Sliders, 
  Type, 
  Eye, 
  Layers, 
  Grid, 
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { 
  ThemeCustomizerSettings, 
  ThemeMode, 
  BackgroundPattern, 
  ArabicFontFamily,
  ColorPreset 
} from '../../types';

export const AdminStyleCustomizer: React.FC = () => {
  const { themeSettings, updateThemeSettings, isDarkMode, toggleTheme } = useApp();

  // Local draft state for live editing before final save
  const [draft, setDraft] = useState<ThemeCustomizerSettings>(() => ({
    ...INITIAL_THEME_SETTINGS,
    ...themeSettings,
  }));
  const [savedToast, setSavedToast] = useState(false);
  const [resetToast, setResetToast] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sync draft when global settings change
  useEffect(() => {
    setDraft({
      ...INITIAL_THEME_SETTINGS,
      ...themeSettings,
    });
  }, [themeSettings]);

  // Live preview applies changes immediately across the entire page & document
  const applyLivePreview = (newDraft: ThemeCustomizerSettings) => {
    applyThemeToDocument(newDraft);
  };

  const handleSelectPreset = (preset: ColorPreset) => {
    const updated: ThemeCustomizerSettings = {
      ...draft,
      color_preset_id: preset.id,
      primary_color: preset.primary_color,
      primary_hover: preset.primary_hover,
      secondary_bg: preset.secondary_bg,
      accent_color: preset.accent_color,
    };
    setDraft(updated);
    applyLivePreview(updated);
  };

  const handleSelectThemeMode = (mode: ThemeMode) => {
    const updated: ThemeCustomizerSettings = {
      ...draft,
      theme_mode: mode,
    };
    setDraft(updated);
    applyLivePreview(updated);
    if (mode === 'dark' && !isDarkMode) {
      toggleTheme();
    } else if (mode === 'light' && isDarkMode) {
      toggleTheme();
    }
  };

  const handleChangeFont = (font: ArabicFontFamily) => {
    const updated = { ...draft, arabic_font: font };
    setDraft(updated);
    applyLivePreview(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      await updateThemeSettings(draft);
      applyLivePreview(draft);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (error: any) {
      setSaveError(error?.message || 'تعذر حفظ إعدادات الهوية في Supabase.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    const defaultPreset = COLOR_PRESETS[0];
    const defaultSettings: ThemeCustomizerSettings = {
      theme_mode: 'light',
      color_preset_id: defaultPreset.id,
      primary_color: defaultPreset.primary_color,
      primary_hover: defaultPreset.primary_hover,
      secondary_bg: defaultPreset.secondary_bg,
      accent_color: defaultPreset.accent_color,
      card_surface_style: 'solid',
      background_pattern: 'grid',
      glow_intensity: 70,
      arabic_font: 'tajawal',
      border_radius: 'rounded-2xl',
      header_style: 'collapsible_hero',
    };
    setDraft(defaultSettings);
    setIsSaving(true);
    setSaveError('');
    try {
      await updateThemeSettings(defaultSettings);
      applyLivePreview(defaultSettings);
      setResetToast(true);
      setTimeout(() => setResetToast(false), 2500);
    } catch (error: any) {
      setSaveError(error?.message || 'تعذر استعادة الإعدادات الافتراضية.');
    } finally {
      setIsSaving(false);
    }
  };

  const fontOptions: { id: ArabicFontFamily; name: string; sample: string }[] = [
    { id: 'tajawal', name: 'خط تجوال (Tajawal)', sample: 'رواج للطباعة الفاخرة' },
    { id: 'cairo', name: 'خط كايرو (Cairo)', sample: 'رواج للطباعة الفاخرة' },
    { id: 'noto_sans', name: 'أندرويد / جوجل (Noto Sans)', sample: 'رواج للطباعة الفاخرة' },
    { id: 'noto_kufi', name: 'كوفي عربي (Noto Kufi)', sample: 'رواج للطباعة الفاخرة' },
    { id: 'almarai', name: 'خط المراعي (Almarai)', sample: 'رواج للطباعة الفاخرة' },
  ];

  const patternOptions: { id: BackgroundPattern; label: string; desc: string }[] = [
    { id: 'grid', label: 'شبكة رقمية (Grid)', desc: 'نقاط شبكية هندسية' },
    { id: 'dots', label: 'نقاط ناعمة (Dots)', desc: 'نقاط متباعدة أنيقة' },
    { id: 'mesh', label: 'خطوط مصفوفة (Mesh)', desc: 'شبكة خطوط ثلاثية' },
    { id: 'clean', label: 'بدون نقوش (Clean)', desc: 'خلفية مسطحة نقية' },
  ];

  return (
    <div className="space-y-6 text-right pb-16 animate-in fade-in duration-300">
      
      {/* 1. Master Header & Save Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#141211] p-5 sm:p-6 rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] dark:text-[#E03A53] text-xs font-bold">
            <Palette className="w-3.5 h-3.5" />
            <span>نظام إدارة الهوية البصرية والألوان الشامل (Global Design System)</span>
          </div>
          <h1 className="font-heading font-black text-lg sm:text-2xl text-[#171616] dark:text-[#F7F5F0]">
            الاستايل والمظهر وتخصيص هوية رواج
          </h1>
          <p className="text-xs sm:text-sm text-[#70695F] dark:text-[#A8A196] max-w-2xl">
            تخصيص الإضاءة والألوان الأساسية والخلفيات والخط العربي. لا تُعرض هنا أي خيارات لا يطبقها محرك الواجهة فعلياً.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            onClick={() => void handleResetToDefault()}
            disabled={isSaving}
            className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] hover:bg-[#F3EFEA] dark:hover:bg-[#252220] text-[#70695F] dark:text-[#A8A196] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="استعادة إعدادات رواج الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            onClick={() => void handleSave()}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#A01026] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer border border-[#E03A53]/30 hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>حفظ تغييرات الألوان والاستايل</span>
          </button>
        </div>
      </div>

      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-700 dark:text-red-300 text-xs font-bold text-center">
          لم يتم الحفظ: {saveError}
        </div>
      )}

      {savedToast && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>✓ تم حفظ وتطبيق إعدادات الهوية والاستايل بنجاح على كامل المنصة!</span>
        </div>
      )}

      {resetToast && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-700 dark:text-amber-300 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in duration-200">
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span>تمت استعادة الإعدادات الأصلية الافتراضية بنجاح!</span>
        </div>
      )}

      {/* 2. Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RIGHT COLUMN (Controls & Configurations - 8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* A. نظام إضاءة الواجهة العام (Theme Mode) */}
          <div className="bg-white dark:bg-[#141211] p-5 sm:p-6 rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D5]/70 dark:border-[#262320] pb-3">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F7F5F0]">
                  نظام إضاءة الواجهة العام (Theme Mode)
                </h3>
              </div>
              <span className="text-[11px] text-[#867F75] dark:text-[#9E978C] font-semibold">
                الحالي: {isDarkMode ? 'الوضع الداكن' : 'الوضع الفاتح'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Dark Studio Mode */}
              <button
                type="button"
                onClick={() => handleSelectThemeMode('dark')}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                  draft.theme_mode === 'dark' || (draft.theme_mode === 'auto' && isDarkMode)
                    ? 'bg-[#181514] text-white border-[#B9142D] shadow-md ring-1 ring-[#B9142D]'
                    : 'bg-[#FAF8F5] dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] border-[#E8E2D5] dark:border-[#2D2A26] hover:border-[#B9142D]/40'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">الوضع الداكن الفحمي (Dark Studio)</div>
                  <div className="text-[10px] text-[#A69C8E] mt-0.5">فحمي طبيعي مريح للعين وأسود محايد</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Moon className="w-4 h-4" />
                </div>
              </button>

              {/* Light Crystal Mode */}
              <button
                type="button"
                onClick={() => handleSelectThemeMode('light')}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                  draft.theme_mode === 'light'
                    ? 'bg-white dark:bg-[#181514] text-[#171616] dark:text-white border-[#B9142D] shadow-md ring-1 ring-[#B9142D]'
                    : 'bg-[#FAF8F5] dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] border-[#E8E2D5] dark:border-[#2D2A26] hover:border-[#B9142D]/40'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">الوضع الفاتح الكريستالي (Light Crystal)</div>
                  <div className="text-[10px] text-[#867F75] mt-0.5">أبيض نقي ناصع وعالي التباين</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
              </button>

              {/* Auto OS Mode */}
              <button
                type="button"
                onClick={() => handleSelectThemeMode('auto')}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                  draft.theme_mode === 'auto'
                    ? 'bg-white dark:bg-[#181514] text-[#171616] dark:text-white border-[#B9142D] shadow-md ring-1 ring-[#B9142D]'
                    : 'bg-[#FAF8F5] dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] border-[#E8E2D5] dark:border-[#2D2A26] hover:border-[#B9142D]/40'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">تلقائي حسب نظام جهازك (Auto OS)</div>
                  <div className="text-[10px] text-[#867F75] mt-0.5">يتوافق مع وضع هاتفك أو حاسوبك</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
              </button>

            </div>
          </div>



          {/* C. الهوية البصرية الرسمية المعتمدة لمطابع رواج (Official Locked Rawaj Identity) */}
          <div className="bg-white dark:bg-[#141211] p-5 sm:p-6 rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D5]/70 dark:border-[#262320] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B9142D]" />
                <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F7F5F0]">
                  لوحة الهوية البصرية الرسمية لرواج (ستايل موحد معتمد 100%)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] dark:text-[#E03A53] text-[11px] font-bold border border-[#B9142D]/20 self-start sm:self-auto">
                ستايل رواج الحصري
              </span>
            </div>

            <p className="text-xs text-[#70695F] dark:text-[#A8A196]">
              تم اعتماد ستايل واحد وموحد حصرياً لمطابع رواج لترسيخ العلامة التجارية، قائم على درجات القرمزي الملكي والذهب الفاخر والفحمي النخبوي:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Primary Color Swatch */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181514] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B9142D] shadow-md border border-white/20 shrink-0 flex items-center justify-center text-white font-mono text-[10px] font-bold">
                  #B9142D
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">قرمزي رواج الملكي</div>
                  <div className="text-[10px] text-[#867F75] dark:text-[#9E978C]">اللون الأساسي للأزرار والتركيز</div>
                </div>
              </div>

              {/* Accent Gold Swatch */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181514] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] shadow-md border border-white/20 shrink-0 flex items-center justify-center text-black font-mono text-[10px] font-bold">
                  #D4AF37
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">الذهب الملكي الفاخر</div>
                  <div className="text-[10px] text-[#867F75] dark:text-[#9E978C]">شارات التميز والتأطير النخبوي</div>
                </div>
              </div>

              {/* Hover Tone Swatch */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181514] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#951126] shadow-md border border-white/20 shrink-0 flex items-center justify-center text-white font-mono text-[10px] font-bold">
                  #951126
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">قرمزي داكن تفاعلي</div>
                  <div className="text-[10px] text-[#867F75] dark:text-[#9E978C]">تفاعلات التحويم والضغط</div>
                </div>
              </div>

              {/* Dark Luxury Charcoal Swatch */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181514] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#12100F] shadow-md border border-[#2D2A26] shrink-0 flex items-center justify-center text-amber-300 font-mono text-[10px] font-bold">
                  #12100F
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">الفحمي النخبوي</div>
                  <div className="text-[10px] text-[#867F75] dark:text-[#9E978C]">خلفية الاستوديو في الوضع الداكن</div>
                </div>
              </div>

            </div>
          </div>

          {/* E. نمط النقوش والأشكال بالخلفية (Pattern Overlays) */}
          <div className="bg-white dark:bg-[#141211] p-5 sm:p-6 rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D5]/70 dark:border-[#262320] pb-3">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-[#B9142D]" />
                <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F7F5F0]">
                  نمط النقوش والأشكال بالخلفية (Background Overlays)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {patternOptions.map((p) => {
                const isSelected = draft.background_pattern === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      const updated = { ...draft, background_pattern: p.id };
                      setDraft(updated);
                      applyLivePreview(updated);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-[#B9142D] text-white border-[#E03A53] shadow-sm'
                        : 'bg-[#FAF8F5] dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] border-[#E8E2D5] dark:border-[#2D2A26] hover:border-[#B9142D]/40'
                    }`}
                  >
                    <span className="text-xs font-bold">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* G. نوع الخط العربي الأساسي بالموقع (Arabic Typography) */}
          <div className="bg-white dark:bg-[#141211] p-5 sm:p-6 rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D5]/70 dark:border-[#262320] pb-3">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-[#B9142D]" />
                <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F7F5F0]">
                  نوع الخط العربي الأساسي بالموقع (Typography)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {fontOptions.map((f) => {
                const isSelected = draft.arabic_font === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleChangeFont(f.id)}
                    className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-[#B9142D] text-white border-[#E03A53] shadow-sm'
                        : 'bg-[#FAF8F5] dark:bg-[#1A1816] text-[#171616] dark:text-[#F7F5F0] border-[#E8E2D5] dark:border-[#2D2A26] hover:border-[#B9142D]/40'
                    }`}
                  >
                    <span className="text-xs font-bold">{f.name}</span>
                    <span className={`text-[11px] opacity-80 ${isSelected ? 'text-white/90' : 'text-[#70695F] dark:text-[#A8A196]'}`}>
                      {f.sample}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>


        </div>

        {/* LEFT COLUMN (Live Dynamic Preview Card - 4 Cols Sticky) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 bg-white dark:bg-[#141211] p-5 sm:p-6 rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-md space-y-5">
            
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8E2D5]/70 dark:border-[#262320]">
              <Eye className="w-4 h-4 text-[#B9142D]" />
              <h3 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F7F5F0]">
                معاينة حية فورية لكيفية انعكاس المسوّدة
              </h3>
            </div>

            {/* Live Interactive Card Mockup */}
            <div 
              className="p-5 rounded-2xl border transition-all duration-300 space-y-4 shadow-sm"
              style={{
                backgroundColor: isDarkMode ? draft.secondary_bg : '#FFFFFF',
                borderColor: isDarkMode ? '#2D2A26' : '#E8E2D5',
              }}
            >
              {/* Mockup Button */}
              <button
                type="button"
                className="w-full py-3 rounded-xl text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: draft.primary_color,
                }}
              >
                <span>زر الحركة الرئيسي (Primary Button)</span>
              </button>

              {/* Mockup Badge */}
              <div 
                className="p-2.5 rounded-xl border text-center font-bold text-xs"
                style={{
                  backgroundColor: `${draft.primary_color}18`,
                  borderColor: `${draft.primary_color}35`,
                  color: draft.primary_color,
                }}
              >
                شارة تميز الهوية (Glow Badge)
              </div>

              {/* Mockup Highlight */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-medium text-[#70695F] dark:text-[#A8A196]">
                  مؤشر إنجاز أو حالة تفاعلية:
                </span>
                <span 
                  className="font-bold font-mono"
                  style={{ color: draft.accent_color }}
                >
                  +18 عاماً خبرة
                </span>
              </div>

              {/* Sample Typography Paragraph */}
              <p className="text-xs text-[#423E3A] dark:text-[#C7BCAD] leading-relaxed pt-2 border-t border-black/5 dark:border-white/5">
                "تطوير أعمال المنظومة وحلول الطباعة الفاخرة والديكور بخطوط وألوان وأنماط أسطح تتناسب تماماً مع هوية رواج المؤسسية."
              </p>
            </div>

            {/* Save Button below sticky preview */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-3 rounded-xl bg-[#B9142D] hover:bg-[#A01026] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E03A53]/30"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتطبيق التغييرات الآن</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
