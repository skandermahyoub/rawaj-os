import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  Flame,
  Zap
} from 'lucide-react';
import { MarqueeTickerItem } from '../../types';

export const AdminMarqueeManager: React.FC = () => {
  const { marqueeItems, addMarqueeItem, updateMarqueeItem, deleteMarqueeItem } = useApp();
  const [editingItem, setEditingItem] = useState<MarqueeTickerItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Omit<MarqueeTickerItem, 'id'>>({
    text_ar: '',
    category: 'general',
    badge_ar: 'إعلان',
    icon: 'Sparkles',
    is_active: true,
    sort_order: marqueeItems.length + 1,
  });

  const handleStartCreate = () => {
    setFormData({
      text_ar: '',
      category: 'general',
      badge_ar: 'إعلان',
      icon: 'Sparkles',
      is_active: true,
      sort_order: marqueeItems.length + 1,
    });
    setEditingItem(null);
    setIsCreating(true);
  };

  const handleStartEdit = (item: MarqueeTickerItem) => {
    setEditingItem(item);
    setFormData({
      text_ar: item.text_ar,
      category: item.category || 'general',
      badge_ar: item.badge_ar || 'إعلان',
      icon: item.icon || 'Sparkles',
      is_active: item.is_active,
      sort_order: item.sort_order,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text_ar.trim()) return;

    setActionError('');
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateMarqueeItem(editingItem.id, formData);
      } else {
        await addMarqueeItem(formData);
      }
      setIsCreating(false);
      setEditingItem(null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ عنصر الشريط.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {actionError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">{actionError}</div>}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
            <span className="text-xs font-bold text-[#B9142D] uppercase">إدارة الصفحة الرئيسية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#171616] dark:text-[#F5F3EF]">
            الشريط النصي المتحرك (Running Marquee Ticker)
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] mt-0.5">
            إدارة نصوص الأخبار والإعلانات والضمانات التي تتحرك تلقائياً على الشريط الأحمر بالرئيسية
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة إعلان جديد</span>
          </button>
        )}
      </div>

      {/* Create / Edit Form */}
      {isCreating && (
        <div className="bg-white dark:bg-[#1C1A1A] p-6 rounded-2xl border-2 border-[#B9142D] shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            <h3 className="text-base font-bold text-[#171616] dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#B9142D]" />
              <span>{editingItem ? 'تعديل نص الإعلان' : 'إضافة نص إعلان جديد'}</span>
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1.5 rounded-lg text-[#78716C] hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                نص الإعلان أو الميزة في الشريط *
              </label>
              <input
                type="text"
                required
                value={formData.text_ar}
                onChange={(e) => setFormData({ ...formData, text_ar: e.target.value })}
                placeholder="مثال: 🔥 فحص واعتماد ملفات Prepress الفنية مجاناً قبل بدء الطباعة"
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-4 py-2.5 text-sm text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  تصنيف العنصر
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-3 py-2 text-xs text-[#171616] dark:text-white"
                >
                  <option value="news">أخبار (News)</option>
                  <option value="special_offer">عرض مميز (Special Offer)</option>
                  <option value="announcement">إعلان (Announcement)</option>
                  <option value="marketing">عبارات تسويقية (Marketing)</option>
                  <option value="general">عام / بدون تصنيف</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  نص الشارة / الوسم (Badge)
                </label>
                <input
                  type="text"
                  value={formData.badge_ar || ''}
                  onChange={(e) => setFormData({ ...formData, badge_ar: e.target.value })}
                  placeholder="مثال: عرض اليوم، تنبيه، جودة"
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-3 py-2 text-xs text-[#171616] dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-xs font-bold text-[#171616] dark:text-[#F5F3EF] mb-1">
                  الترتيب
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
                  className="w-24 bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3D3838] rounded-xl px-3 py-1.5 text-sm text-[#171616] dark:text-white text-center"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer mt-5">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-[#B9142D] rounded accent-[#B9142D]"
                />
                <span className="text-sm font-semibold text-[#171616] dark:text-white">
                  تفعيل الإعلان بالشريط
                </span>
              </label>
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
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold shadow-md transition-colors"
              >
                {editingItem ? 'حفظ التعديل' : 'إضافة للشريط'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Marquee Items List */}
      <div className="space-y-3">
        {marqueeItems.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl bg-white dark:bg-[#1C1A1A] border flex items-center justify-between gap-4 shadow-xs ${
              item.is_active ? 'border-[#E7E0D3] dark:border-[#332F2F]' : 'border-neutral-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#B9142D]/10 text-[#B9142D] flex items-center justify-center text-xs font-bold flex-shrink-0">
                #{item.sort_order}
              </span>
              <p className="text-sm font-semibold text-[#171616] dark:text-white">
                {item.text_ar}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => void updateMarqueeItem(item.id, { is_active: !item.is_active }).catch((error) => setActionError(error?.message || 'تعذر تحديث الحالة.'))}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#E7E0D3] dark:hover:bg-[#2E2A2A] text-[#171616] dark:text-white transition-colors"
              >
                {item.is_active ? 'تعطيل' : 'تفعيل'}
              </button>

              <button
                onClick={() => handleStartEdit(item)}
                className="p-1.5 rounded-lg text-[#171616] dark:text-white bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#E7E0D3] transition-colors"
                title="تعديل"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm('هل تريد حذف هذا الإعلان من الشريط؟')) {
                    void deleteMarqueeItem(item.id).catch((error) => setActionError(error?.message || 'تعذر حذف العنصر.'));
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
