import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  FileText, 
  Target, 
  Eye, 
  Compass, 
  Award,
  Save,
  Upload
} from 'lucide-react';
import { AboutUsModuleData } from '../../types';

export const AdminAboutModuleManager: React.FC = () => {
  const { aboutUsData, updateAboutUsData } = useApp();
  const [formData, setFormData] = useState<AboutUsModuleData>({ ...aboutUsData });
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setFormData({ ...aboutUsData });
  }, [aboutUsData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutUsData(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
            <span className="text-xs font-bold text-[#B9142D] uppercase">إدارة الصفحة الرئيسية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171616] dark:text-[#F5F3EF]">
            موديول من نحن وكلمة المدير (About Us Module)
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-0.5">
            تخصيص بيانات المدير العام، كلمته الرسمية، الهدف، الرؤية، الرسالة، ورابط تحميل البروفايل
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم حفظ كافة التعديلات بنجاح!</span>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1C1A1A] p-6 sm:p-8 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs space-y-6">
        
        {/* Section 1: GM Profile */}
        <div>
          <h3 className="text-base font-bold text-[#171616] dark:text-white flex items-center gap-2 mb-4 pb-2 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            <Award className="w-5 h-5 text-[#B9142D]" />
            <span>بيانات المدير العام والكلمة الرسمية</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                اسم المدير العام *
              </label>
              <input
                type="text"
                required
                value={formData.gm_name_ar}
                onChange={(e) => setFormData({ ...formData, gm_name_ar: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                الصفة / المسمى الوظيفي *
              </label>
              <input
                type="text"
                required
                value={formData.gm_title_ar}
                onChange={(e) => setFormData({ ...formData, gm_title_ar: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                صورة المدير العام *
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#B9142D] shrink-0 bg-[#F5F1E9] dark:bg-[#252222]">
                  {formData.gm_photo_url ? (
                    <img src={formData.gm_photo_url} alt="صورة المدير" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#78716C]">لا يوجد</div>
                  )}
                </div>
                <div className="flex-1 w-full space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="رابط الصورة (URL)"
                    value={formData.gm_photo_url}
                    onChange={(e) => setFormData({ ...formData, gm_photo_url: e.target.value })}
                    className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#B9142D]/10 hover:bg-[#B9142D]/20 text-[#B9142D] text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>رفع صورة مباشرة من الجهاز</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setFormData({ ...formData, gm_photo_url: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                كلمة المدير العام (نص الاقتباس) *
              </label>
              <textarea
                rows={3}
                required
                value={formData.gm_quote_ar}
                onChange={(e) => setFormData({ ...formData, gm_quote_ar: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Goal, Vision, Mission */}
        <div>
          <h3 className="text-base font-bold text-[#171616] dark:text-white flex items-center gap-2 mb-4 pb-2 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            <Target className="w-5 h-5 text-[#B9142D]" />
            <span>الهدف والرؤية والرسالة</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                الهدف (Goal) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.goal_ar}
                onChange={(e) => setFormData({ ...formData, goal_ar: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                الرؤية (Vision) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.vision_ar}
                onChange={(e) => setFormData({ ...formData, vision_ar: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                الرسالة (Mission) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.mission_ar}
                onChange={(e) => setFormData({ ...formData, mission_ar: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Profile Brochure & Stats */}
        <div>
          <h3 className="text-base font-bold text-[#171616] dark:text-white flex items-center gap-2 mb-4 pb-2 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            <Download className="w-5 h-5 text-[#B9142D]" />
            <span>رابط الدليل التعريفي الشامل والأرقام القياسية</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                رابط تحميل البروفايل (Company Profile PDF URL)
              </label>
              <input
                type="text"
                value={formData.profile_pdf_url}
                onChange={(e) => setFormData({ ...formData, profile_pdf_url: e.target.value })}
                placeholder="https://example.com/rawaj-profile.pdf"
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                سنوات الخبرة
              </label>
              <input
                type="number"
                value={formData.years_experience || 18}
                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) || 18 })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                عدد المشاريع المنجزة
              </label>
              <input
                type="text"
                value={formData.completed_projects_count || '+14,000'}
                onChange={(e) => setFormData({ ...formData, completed_projects_count: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                عدد العملاء والمؤسسات
              </label>
              <input
                type="text"
                value={formData.happy_clients_count || '+2,800'}
                onChange={(e) => setFormData({ ...formData, happy_clients_count: e.target.value })}
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white text-center"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E7E0D3] dark:border-[#332F2F] flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ بيانات موديول من نحن</span>
          </button>
        </div>

      </form>
    </div>
  );
};
