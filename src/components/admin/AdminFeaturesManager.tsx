import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Sparkles, 
  Printer, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Zap 
} from 'lucide-react';
import { RawajFeature } from '../../types';

export const AdminFeaturesManager: React.FC = () => {
  const { rawajFeatures, addRawajFeature, updateRawajFeature, deleteRawajFeature } = useApp();
  const [editingFeat, setEditingFeat] = useState<RawajFeature | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<RawajFeature, 'id'>>({
    title_ar: '',
    description_ar: '',
    icon: 'Sparkles',
    badge_ar: '',
    is_active: true,
    sort_order: rawajFeatures.length + 1,
  });

  const handleStartCreate = () => {
    setFormData({
      title_ar: '',
      description_ar: '',
      icon: 'Sparkles',
      badge_ar: 'ميزة معتمدة',
      is_active: true,
      sort_order: rawajFeatures.length + 1,
    });
    setEditingFeat(null);
    setIsCreating(true);
  };

  const handleStartEdit = (feat: RawajFeature) => {
    setEditingFeat(feat);
    setFormData({
      title_ar: feat.title_ar,
      description_ar: feat.description_ar,
      icon: feat.icon,
      badge_ar: feat.badge_ar || '',
      is_active: feat.is_active ?? true,
      sort_order: feat.sort_order,
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_ar.trim()) return;

    if (editingFeat) {
      updateRawajFeature(editingFeat.id, formData);
    } else {
      addRawajFeature(formData);
    }
    setIsCreating(false);
    setEditingFeat(null);
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
            موديول مميزات رواج (Rawaj Key Features)
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-0.5">
            إدارة نقاط القوة والمميزات التنافسية المعروضة على الخلفية الحمراء الفاخرة بالرئيسية
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة ميزة جديدة</span>
          </button>
        )}
      </div>

      {/* Form */}
      {isCreating && (
        <div className="bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border-2 border-[#B9142D] shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            <h3 className="text-base font-bold text-[#171616] dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#B9142D]" />
              <span>{editingFeat ? 'تعديل الميزة' : 'إضافة ميزة جديدة'}</span>
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1.5 rounded-lg text-[#78716C] hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  عنوان الميزة *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_ar}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  placeholder="مثال: أحدث خطوط الإنتاج والطباعة"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  الشارة / الوسم
                </label>
                <input
                  type="text"
                  value={formData.badge_ar}
                  onChange={(e) => setFormData({ ...formData, badge_ar: e.target.value })}
                  placeholder="مثال: تقنية فائقة أو ضمان جودة"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  شرح وتفاصيل الميزة *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  placeholder="وصف تفصيلي يشرح القيمة المضافة للعميل..."
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  الأيقونة
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                >
                  <option value="Printer">Printer (طباعة ومكائن)</option>
                  <option value="Clock">Clock (مواعيد وسرعة)</option>
                  <option value="ShieldCheck">ShieldCheck (جودة وضمان)</option>
                  <option value="Globe">Globe (توريد عالمي ومحلي)</option>
                  <option value="Sparkles">Sparkles (تشطيبات فاخرة)</option>
                  <option value="Award">Award (تسعير واستشارات)</option>
                  <option value="Zap">Zap (سرعة وإنتاج فوري)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  الترتيب
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2 text-sm text-[#171616] dark:text-white text-center"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E0D3] dark:border-[#332F2F]">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[#78716C] hover:bg-neutral-100"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold shadow-md transition-colors"
              >
                {editingFeat ? 'حفظ التعديل' : 'إضافة الميزة'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rawajFeatures.sort((a, b) => a.sort_order - b.sort_order).map((feat) => (
          <div
            key={feat.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-[#B9142D]/10 text-[#B9142D] flex items-center justify-center font-bold text-xs">
                  #{feat.sort_order}
                </span>
                {feat.badge_ar && (
                  <span className="text-[10px] bg-[#B9142D] text-white font-bold px-2 py-0.5 rounded-md">
                    {feat.badge_ar}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-base text-[#171616] dark:text-white mb-1.5">
                {feat.title_ar}
              </h4>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] leading-relaxed mb-4">
                {feat.description_ar}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleStartEdit(feat)}
                className="p-1.5 rounded-lg text-[#171616] dark:text-white bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#E7E0D3] transition-colors"
                title="تعديل"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm('هل تريد حذف هذه الميزة؟')) {
                    deleteRawajFeature(feat.id);
                  }
                }}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                title="حذف"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
