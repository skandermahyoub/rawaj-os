import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, MapPin, Phone, MessageSquare, Mail, Clock, CheckCircle2, Image as ImageIcon, Upload, Trash2, Sparkles } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { uploadDataUrlToRawajStorage } from '../../lib/storage';

export const AdminSettingsManager: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [companyNameAr, setCompanyNameAr] = useState(siteSettings.company_name_ar);
  const [companyNameEn, setCompanyNameEn] = useState(siteSettings.company_name_en);
  const [sloganAr, setSloganAr] = useState(siteSettings.slogan_ar || '');
  const [sloganEn, setSloganEn] = useState(siteSettings.slogan_en || '');
  const [logoUrl, setLogoUrl] = useState(siteSettings.logo_url || '');
  const [foundingYear, setFoundingYear] = useState(siteSettings.founding_year || 2008);
  const [phone, setPhone] = useState(siteSettings.phone);
  const [mobileWhatsapp, setMobileWhatsapp] = useState(siteSettings.mobile_whatsapp);
  const [email, setEmail] = useState(siteSettings.email);
  const [addressAr, setAddressAr] = useState(siteSettings.address_ar);
  const [workingHoursAr, setWorkingHoursAr] = useState(siteSettings.working_hours_ar);
  const [announcementText, setAnnouncementText] = useState(siteSettings.announcement_banner?.text_ar || '');
  const [announcementEnabled, setAnnouncementEnabled] = useState(Boolean(siteSettings.announcement_banner?.enabled));
  const [savedToast, setSavedToast] = useState(false);

  React.useEffect(() => {
    setCompanyNameAr(siteSettings.company_name_ar);
    setCompanyNameEn(siteSettings.company_name_en);
    setSloganAr(siteSettings.slogan_ar || '');
    setSloganEn(siteSettings.slogan_en || '');
    setLogoUrl(siteSettings.logo_url || '');
    setFoundingYear(siteSettings.founding_year || 2008);
    setPhone(siteSettings.phone);
    setMobileWhatsapp(siteSettings.mobile_whatsapp);
    setEmail(siteSettings.email);
    setAddressAr(siteSettings.address_ar);
    setWorkingHoursAr(siteSettings.working_hours_ar);
    setAnnouncementText(siteSettings.announcement_banner?.text_ar || '');
    setAnnouncementEnabled(Boolean(siteSettings.announcement_banner?.enabled));
  }, [siteSettings]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimized = await optimizeImageFile(file, 800, 800, 0.9);
      const stored = await uploadDataUrlToRawajStorage(optimized.dataUrl, {
        folder: 'branding',
        fileName: 'rawaj-logo',
      });
      setLogoUrl(stored.publicUrl);
      await updateSiteSettings({ logo_url: stored.publicUrl });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err: any) {
      console.error('Failed to upload logo:', err);
      alert(err?.message || 'تعذر رفع الشعار.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveLogo = async () => {
    try {
      await updateSiteSettings({ logo_url: '' });
      setLogoUrl('');
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err: any) {
      alert(err?.message || 'تعذر إزالة الشعار.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteSettings({
      company_name_ar: companyNameAr,
      company_name_en: companyNameEn,
      slogan_ar: sloganAr,
      slogan_en: sloganEn,
      logo_url: logoUrl,
      founding_year: foundingYear,
      phone: phone,
      mobile_whatsapp: mobileWhatsapp,
      email: email,
      address_ar: addressAr,
      working_hours_ar: workingHoursAr,
        announcement_banner: {
          enabled: announcementEnabled,
          text_ar: announcementText,
        },
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (err: any) {
      alert(err?.message || 'تعذر حفظ الإعدادات.');
    }
  };

  return (
    <div className="space-y-6 text-right pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#B9142D]" />
            <span>إعدادات الهيدر ومنصة ومقر رواج</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            تخصيص شعار الهيدر، اسم المنشأة، السلوجون، قنوات الاتصال والتسعير
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>حفظ التعديلات</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center">
          ✓ تم حفظ إعدادات المنصة والهيدر بنجاح!
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-5 sm:p-6 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-5 text-xs">
        
        {/* Company Identity & Header Config */}
        <div className="space-y-3 pb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
          <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#B9142D]" />
            <span>هوية الهيدر وشعار رواج والسلوجون</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold">اسم الشركة (عربي):</label>
              <input
                type="text"
                required
                value={companyNameAr}
                onChange={(e) => setCompanyNameAr(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold">اسم الشركة (English):</label>
              <input
                type="text"
                value={companyNameEn}
                onChange={(e) => setCompanyNameEn(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>

            {/* Logo Upload & Preview Section */}
            <div className="space-y-2 sm:col-span-2 p-3.5 rounded-xl bg-white dark:bg-[#1E1B1A] border border-[#E7E0D3] dark:border-[#332F2F]">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <div className="flex items-center justify-between">
                <label className="font-bold flex items-center gap-1.5 text-xs text-[#171616] dark:text-[#F7F5F0]">
                  <ImageIcon className="w-4 h-4 text-brand-primary" />
                  <span>شعار المنشأة الرسمي (Logo):</span>
                </label>
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C]">
                  يظهر في الهيدر، الفوتر، وبوب أب تنزيل التطبيق للهاتف
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                {/* Visual Preview */}
                <div className="w-16 h-16 rounded-xl bg-[#FAF8F5] dark:bg-[#12100F] border-2 border-brand-primary/40 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-2xs">
                  <BrandLogo
                    src={logoUrl}
                    alt="شعار رواج"
                    className="w-full h-full object-contain"
                    fallbackClassName="w-full h-full object-contain"
                  />
                </div>

                {/* Upload Actions & URL input */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع صورة الشعار من جهازك</span>
                    </button>

                    {logoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="إعادة الشعار الافتراضي"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>إلغاء</span>
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="أو الصق رابط صورة الشعار مباشرة (URL)"
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#383330] rounded-lg px-3 py-1.5 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold">السلوجون بالعربي (Slogan AR):</label>
              <input
                type="text"
                value={sloganAr}
                onChange={(e) => setSloganAr(e.target.value)}
                placeholder="مثال: شريكك في الإبداع والإنتاج الطباعي"
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">سنة التأسيس:</label>
              <input
                type="number"
                value={foundingYear}
                onChange={(e) => setFoundingYear(parseInt(e.target.value) || 2008)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-3 pb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
          <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
            قنوات الاتصال والتسعير الفوري
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold">رقم الواتساب والجوال المعتمد:</label>
              <input
                type="text"
                required
                value={mobileWhatsapp}
                onChange={(e) => setMobileWhatsapp(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">هاتف المكتب الثابت:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">البريد الإلكتروني الرسمي:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="space-y-3 pb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
          <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
            مقر الوكالة وساعات العمل
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold">عنوان المقر الرئيسي والمصنع:</label>
              <input
                type="text"
                value={addressAr}
                onChange={(e) => setAddressAr(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold">أوقات العمل واستقبال الطلبات:</label>
              <input
                type="text"
                value={workingHoursAr}
                onChange={(e) => setWorkingHoursAr(e.target.value)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ وتحديث الإعدادات</span>
          </button>
        </div>

      </form>
    </div>
  );
};
