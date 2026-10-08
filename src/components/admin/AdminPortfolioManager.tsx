import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Plus, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import { ImageUploadPicker } from '../common/ImageUploadPicker';
import { SafeImage } from '../common/SafeImage';

export const AdminPortfolioManager: React.FC = () => {
  const { portfolioProjects, services, createPortfolioProject, updatePortfolioProject, deletePortfolioProject } = useApp();
  const [editingProj, setEditingProj] = useState<any>(null);
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNew = () => {
    setEditingProj({
      title_ar: 'نموذج عمل جديد من مجالات تنفيذ رواج',
      client_type_ar: 'نوع العميل أو مجال الاستخدام',
      industry: 'مجال التنفيذ',
      year: '',
      city: '',
      short_description_ar: 'وصف مختصر لنطاق العمل كما يظهر في بروفايل أو أرشيف رواج...',
      challenge_ar: 'متطلبات التنفيذ أو طبيعة المشروع...',
      solution_ar: 'المعالجة والتنفيذ الذي تقدمه رواج...',
      services_used_ids: services.slice(0, 2).map((s) => s.id),
      images: [],
      featured: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    setIsSaving(true);
    try {
      if (editingProj.id) await updatePortfolioProject(editingProj.id, editingProj);
      else await createPortfolioProject(editingProj);
      setEditingProj(null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ المشروع.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-right pb-16">
      {actionError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
          {actionError}
        </div>
      )}
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#B9142D]" />
            <span>إدارة سابقة الأعمال والمشاريع ({portfolioProjects.length})</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            إدارة أعمال رواج الموثقة ونماذج مجالات التنفيذ دون إضافة ادعاءات أو أرقام غير موثقة
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ إضافة مشروع جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden p-4 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#FAF7F2]">
                <SafeImage src={proj.images?.[0]} alt={proj.title_ar} className="w-full h-full object-cover" fallbackCategory="معرض الأعمال" />
              </div>
              <span className="text-[10px] font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2 py-0.5 rounded">
                {proj.client_type_ar}{(proj.city || proj.year) ? ` • ${[proj.city, proj.year].filter(Boolean).join(' • ')}` : ''}
              </span>
              <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">{proj.title_ar}</h3>
              <p className="text-xs text-[#78716C] line-clamp-2">{proj.short_description_ar}</p>
            </div>

            <div className="pt-2 border-t border-[#F5F1E9] dark:border-[#252222] flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm('هل تريد حذف هذا المشروع؟')) {
                    void deletePortfolioProject(proj.id).catch((error) => setActionError(error?.message || 'تعذر حذف المشروع.'));
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
              <button
                onClick={() => setEditingProj(proj)}
                className="text-xs font-bold text-[#B9142D] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل المشروع</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
          <form
            onSubmit={handleSave}
            className="w-full max-w-xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-5 space-y-3 max-h-[85vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D3]">
              <h3 className="font-heading font-bold text-sm">تعديل بيانات المشروع</h3>
              <button type="button" onClick={() => setEditingProj(null)}>إلغاء</button>
            </div>

            <div className="space-y-1">
              <label className="font-bold">عنوان المشروع:</label>
              <input
                type="text"
                required
                value={editingProj.title_ar}
                onChange={(e) => setEditingProj({ ...editingProj, title_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold">نوع العميل / مجال الاستخدام:</label>
                <input
                  type="text"
                  value={editingProj.client_type_ar || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, client_type_ar: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold">مجال التنفيذ:</label>
                <input
                  type="text"
                  value={editingProj.industry || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, industry: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold">المدينة (اختياري):</label>
                <input
                  type="text"
                  value={editingProj.city || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, city: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold">السنة (اختياري):</label>
                <input
                  type="text"
                  value={editingProj.year || ''}
                  onChange={(e) => setEditingProj({ ...editingProj, year: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold">الوصف المختصر:</label>
              <textarea
                rows={2}
                value={editingProj.short_description_ar}
                onChange={(e) => setEditingProj({ ...editingProj, short_description_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">متطلبات التنفيذ:</label>
              <textarea
                rows={2}
                value={editingProj.challenge_ar}
                onChange={(e) => setEditingProj({ ...editingProj, challenge_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">المعالجة التنفيذية من رواج:</label>
              <textarea
                rows={2}
                value={editingProj.solution_ar}
                onChange={(e) => setEditingProj({ ...editingProj, solution_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
              />
            </div>

            {/* Project Image Picker */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1817] border border-[#E7E0D3] dark:border-[#332F2F]">
              <ImageUploadPicker
                label="صورة المشروع الرئيسية *"
                helperText="حدد صورة المشروع: رفع من جهازك أو الجوال، إدراج رابط، أو اختيار من مكتبة رواج"
                value={editingProj.images?.[0] || ''}
                onChange={(url) => setEditingProj({ ...editingProj, images: [url] })}
                aspectRatio="16:9"
                previewHeightClass="h-40"
                defaultCategory="اللوحات والواجهات"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E7E0D3]">
              <button
                type="button"
                onClick={() => setEditingProj(null)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF7F2]"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#B9142D] text-white font-bold px-4 py-1.5 rounded-lg"
              >
                حفظ المشروع
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
