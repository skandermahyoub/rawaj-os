import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Upload, 
  Save, 
  CheckCircle2, 
  Info
} from 'lucide-react';
import { ImageUploadPicker } from '../common/ImageUploadPicker';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { uploadDataUrlToRawajStorage } from '../../lib/storage';

export const AdminHeaderHeroManager: React.FC = () => {
  const { heroHeaderSettings, updateHeroHeaderSettings, siteSettings, updateSiteSettings } = useApp();
  
  const [formData, setFormData] = useState({ ...heroHeaderSettings });
  const [companyName, setCompanyName] = useState(heroHeaderSettings.company_name_ar || siteSettings.company_name_ar || '');
  const [companySlogan, setCompanySlogan] = useState(heroHeaderSettings.slogan_ar || siteSettings.slogan_ar || '');
  const [logoUrl, setLogoUrl] = useState(siteSettings.logo_url || '');
  const [savedNotice, setSavedNotice] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFormData({ ...heroHeaderSettings });
    setCompanyName(heroHeaderSettings.company_name_ar || siteSettings.company_name_ar || '');
    setCompanySlogan(heroHeaderSettings.slogan_ar || siteSettings.slogan_ar || '');
    setLogoUrl(siteSettings.logo_url || '');
  }, [heroHeaderSettings, siteSettings]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimized = await optimizeImageFile(file, 900, 900, 0.9);
      const stored = await uploadDataUrlToRawajStorage(optimized.dataUrl, {
        folder: 'branding',
        fileName: 'rawaj-logo',
      });
      setLogoUrl(stored.publicUrl);
      await updateSiteSettings({ logo_url: stored.publicUrl });
    } catch (error: any) {
      console.error('Supabase logo upload failed:', error);
      alert(error?.message || 'تعذر رفع الشعار.');
    }
  };

  const handleBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimized = await optimizeImageFile(file, 1920, 1200, 0.88);
      const stored = await uploadDataUrlToRawajStorage(optimized.dataUrl, {
        folder: 'hero',
        fileName: 'hero-background',
      });
      setFormData((prev) => ({ ...prev, bg_image_url: stored.publicUrl }));
    } catch (error: any) {
      console.error('Supabase hero background upload failed:', error);
      alert(error?.message || 'تعذر رفع خلفية الهيدر.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all([
        updateHeroHeaderSettings({
          ...formData,
          company_name_ar: companyName,
          slogan_ar: companySlogan,
        }),
        updateSiteSettings({
          company_name_ar: companyName,
          slogan_ar: companySlogan,
          logo_url: logoUrl,
        }),
      ]);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch (error: any) {
      console.error('Supabase header settings save failed:', error);
      alert(error?.message || 'تعذر حفظ إعدادات الهيدر.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171616] via-[#241F1E] to-[#171616] text-white border border-[#3E3836] shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 text-[#E03A53] border border-[#B9142D]/40 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>موديول الهيدر والهيرو السينمائي الترحيبي</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
          إدارة موديول الهيدر القابل للطي (Hero Header)
        </h2>
        <p className="text-xs sm:text-sm text-[#CDC4B7] mt-1">
          يبدأ كهيرو كبير ترحيبي فيه الشعار، الاسم، السلوجون وصورة الخلفية، وعند التمرير لأسفل يختفي ليظهر الهيدر المصغر المثبت.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>تم حفظ إعدادات الهيدر والشعار بنجاح!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Toggle Enabled */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs flex items-center justify-between">
          <div>
            <h4 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA]">
              تفعيل موديول الهيدر الترحيبي العريض (Hero Header)
            </h4>
            <p className="text-[11px] text-[#746E67] dark:text-[#A0988F] mt-0.5">
              عند إيقافه، سيظهر الهيدر الثابت العادي مباشرة دون الهيرو الترحيبي.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, enabled: !prev.enabled }))}
            className={`w-12 h-6 rounded-full transition-colors relative ${formData.enabled ? 'bg-[#B9142D]' : 'bg-neutral-300 dark:bg-neutral-700'}`}
          >
            <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${formData.enabled ? 'left-1' : 'left-6'}`} />
          </button>
        </div>

        {/* Brand identity & Logo section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-5">
          <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA] border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            هوية وشعار المنشأة
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Logo Preview & Upload */}
            <div className="md:col-span-4 flex flex-col items-center gap-3">
              <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-2xl bg-[#F5F1E9] dark:bg-[#252220] border-2 border-dashed border-[#B9142D]/40 p-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-md group relative overflow-hidden"
              >
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center text-[#746E67] text-[10px]">
                    <Upload className="w-5 h-5 mx-auto mb-1 text-[#B9142D]" />
                    <span>انقر لرفع الشعار</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
                  تغيير
                </div>
              </div>
              <span className="text-[10px] text-[#746E67] text-center">المقاس المفضل للشعار: PNG شفاف 512×512 بكسل</span>
            </div>

            {/* Names & Slogans */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                  اسم المنشأة بالعربي *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                  السلوجون / الشعار اللفظي للمؤسسة
                </label>
                <input
                  type="text"
                  value={companySlogan}
                  onChange={(e) => setCompanySlogan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                  رابط مباشر لشعار المؤسسة (اختياري)
                </label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png أو رابط محلي"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Headings & Texts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
          <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA] border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            النصوص الترحيبية وأزرار التحويل
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                الشريط الترويجي العلوي (Badge)
              </label>
              <input
                type="text"
                value={formData.badge_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, badge_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                العنوان الرئيسي الترحيبي *
              </label>
              <textarea
                rows={2}
                required
                value={formData.welcome_title_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, welcome_title_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                العنوان الفرعي التوضيحي *
              </label>
              <textarea
                rows={2}
                required
                value={formData.welcome_subtitle_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, welcome_subtitle_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                نص الزر الأساسي (CTA)
              </label>
              <input
                type="text"
                value={formData.primary_cta_text_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, primary_cta_text_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                نص الزر الثانوي
              </label>
              <input
                type="text"
                value={formData.secondary_cta_text_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, secondary_cta_text_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA]">
              صورة خلفية الهيدر وأبعادها
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-[#B9142D] font-bold">
              <Info className="w-4 h-4" />
              <span>{formData.preferred_dimensions_ar}</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Background preview */}
            <div className="relative h-44 sm:h-56 rounded-2xl overflow-hidden border border-[#DCD5C5] dark:border-[#3A3533] bg-[#151313]">
              <img
                src={formData.bg_image_url}
                alt="Header Background"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-mono font-bold bg-black/50 px-2 py-1 rounded-md">
                  معاينة خلفية الهيرو الترحيبي
                </span>
              </div>
            </div>

            {/* Background Image with 3 options: Upload, URL, Library */}
            <div className="p-3.5 rounded-2xl bg-[#FCFAF5] dark:bg-[#1A1817] border border-[#DCD5C5] dark:border-[#3A3533]">
              <ImageUploadPicker
                label="صورة خلفية الهيرو الترحيبي (Hero Background Image)"
                helperText="حدد صورة خلفية الهيرو: رفع من جهازك أو الجوال، إدراج رابط، أو اختيار من مكتبة رواج"
                value={formData.bg_image_url}
                onChange={(url) => setFormData(prev => ({ ...prev, bg_image_url: url }))}
                aspectRatio="16:9"
                previewHeightClass="h-44"
                defaultCategory="اللوحات والواجهات"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#B9142D] to-[#910E23] hover:from-[#910E23] hover:to-[#B9142D] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>حفظ كافة تعديلات موديول الهيدر</span>
          </button>
        </div>

      </form>
    </div>
  );
};
