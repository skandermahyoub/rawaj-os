import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FooterSettings, FooterBranch, SocialLinks } from '../../types';
import { 
  Save, 
  Building2, 
  Share2, 
  MapPin, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

export const AdminFooterManager: React.FC = () => {
  const { footerSettings, updateFooterSettings } = useApp();
  
  const [formData, setFormData] = useState<FooterSettings>({ ...footerSettings });
  const [social, setSocial] = useState<SocialLinks>({ ...footerSettings.social_links });
  const [branches, setBranches] = useState<FooterBranch[]>([...footerSettings.branches]);
  const [savedNotice, setSavedNotice] = useState(false);

  React.useEffect(() => {
    setFormData({ ...footerSettings });
    setSocial({ ...footerSettings.social_links });
    setBranches([...footerSettings.branches]);
  }, [footerSettings]);

  const handleBranchChange = (index: number, field: keyof FooterBranch, value: any) => {
    setBranches((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addBranch = () => {
    const newBranch: FooterBranch = {
      id: `br-${Date.now()}`,
      name_ar: 'فرع جديد',
      address_ar: 'صنعاء - شارع...',
      phone: '+967 77...',
      is_headquarters: false,
    };
    setBranches((prev) => [...prev, newBranch]);
  };

  const removeBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooterSettings({
      ...formData,
      social_links: social,
      branches,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171616] via-[#241F1E] to-[#171616] text-white border border-[#3E3836] shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 text-[#E03A53] border border-[#B9142D]/40 text-xs font-bold mb-3">
          <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>موديول الفوتر العالمي الموحد</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
          إدارة وتخصيص محتوى الفوتر (Footer Manager)
        </h2>
        <p className="text-xs sm:text-sm text-[#CDC4B7] mt-1">
          تخصيص كامل للنصوص، أرقام الهواتف، عناوين الفروع في صنعاء، روابط منصات التواصل الاجتماعي، وشريط الحقوق.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>تم حفظ كافة إعدادات الفوتر بنجاح!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Basic Brand Info & Contacts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
          <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA] border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            بيانات المنشأة في الفوتر
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">اسم الوكالة</label>
              <input
                type="text"
                value={formData.company_name_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">السلوجون المختصر</label>
              <input
                type="text"
                value={formData.slogan_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, slogan_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">الوصف التعريفي للفوتر</label>
              <textarea
                rows={2}
                value={formData.description_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, description_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">هاتف الإدارة الموحد</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">واتساب المبيعات</label>
              <input
                type="text"
                value={formData.mobile_whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile_whatsapp: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">البريد الإلكتروني الرسمي</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">رابط الموقع الإلكتروني</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
          <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA] border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            روابط وسائل التواصل الاجتماعي
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">تيك توك (TikTok)</label>
              <input
                type="text"
                value={social.tiktok || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, tiktok: e.target.value }))}
                placeholder="https://tiktok.com/@..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">فيسبوك (Facebook)</label>
              <input
                type="text"
                value={social.facebook || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, facebook: e.target.value }))}
                placeholder="https://facebook.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">يوتيوب (YouTube)</label>
              <input
                type="text"
                value={social.youtube || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, youtube: e.target.value }))}
                placeholder="https://youtube.com/@..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">انستغرام (Instagram)</label>
              <input
                type="text"
                value={social.instagram || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">قناة واتساب الرسمية</label>
              <input
                type="text"
                value={social.whatsapp_channel || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, whatsapp_channel: e.target.value }))}
                placeholder="https://whatsapp.com/channel/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">تليجرام (Telegram)</label>
              <input
                type="text"
                value={social.telegram || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, telegram: e.target.value }))}
                placeholder="https://t.me/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">سناب شات (Snapchat)</label>
              <input
                type="text"
                value={social.snapchat || ''}
                onChange={(e) => setSocial(prev => ({ ...prev, snapchat: e.target.value }))}
                placeholder="https://snapchat.com/add/..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>
        </div>

        {/* Physical Branches Management */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA]">
              فروع ومعامل رواج
            </h4>
            <button
              type="button"
              onClick={addBranch}
              className="px-3 py-1.5 rounded-xl bg-[#B9142D] text-white text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة فرع</span>
            </button>
          </div>

          <div className="space-y-3">
            {branches.map((b, idx) => (
              <div key={b.id} className="p-4 rounded-xl border border-[#EBE4D5] dark:border-[#332D2B] bg-[#FFFDF9] dark:bg-[#201D1C] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#B9142D]" />
                    <span className="font-bold text-xs">فرع #{idx + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBranch(b.id)}
                    className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف الفرع</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#746E67] mb-1">اسم الفرع</label>
                    <input
                      type="text"
                      value={b.name_ar}
                      onChange={(e) => handleBranchChange(idx, 'name_ar', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCD5C5] dark:border-[#3A3533] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#746E67] mb-1">العنوان الجغرافي</label>
                    <input
                      type="text"
                      value={b.address_ar}
                      onChange={(e) => handleBranchChange(idx, 'address_ar', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCD5C5] dark:border-[#3A3533] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#746E67] mb-1">هاتف الفرع</label>
                    <input
                      type="text"
                      value={b.phone}
                      onChange={(e) => handleBranchChange(idx, 'phone', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#DCD5C5] dark:border-[#3A3533] text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright & Powered by Bar */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
          <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA] border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            شريط الحقوق ومزود المنظومة
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">نص الحقوق المحفوظة</label>
              <input
                type="text"
                value={formData.copyright_text_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, copyright_text_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">نص «مدعوم بواسطة / المنظومة»</label>
              <input
                type="text"
                value={formData.powered_by_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, powered_by_ar: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#B9142D] to-[#910E23] hover:from-[#910E23] hover:to-[#B9142D] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ إعدادات الفوتر</span>
          </button>
        </div>

      </form>
    </div>
  );
};
