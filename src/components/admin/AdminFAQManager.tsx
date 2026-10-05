import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlobalFAQItem } from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  HelpCircle, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export const AdminFAQManager: React.FC = () => {
  const { faqItems, addFaqItem, updateFaqItem, deleteFaqItem } = useApp();
  
  const [editingFaq, setEditingFaq] = useState<GlobalFAQItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [category, setCategory] = useState('الطباعة والتصاميم');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isActive, setIsActive] = useState(true);

  const startCreate = () => {
    setIsCreating(true);
    setEditingFaq(null);
    setCategory('الطباعة والتصاميم');
    setQuestion('');
    setAnswer('');
    setIsActive(true);
  };

  const startEdit = (f: GlobalFAQItem) => {
    setEditingFaq(f);
    setIsCreating(false);
    setCategory(f.category_ar);
    setQuestion(f.question_ar);
    setAnswer(f.answer_ar);
    setIsActive(f.is_active);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setSaveError('');
    setIsSaving(true);
    try {
      if (isCreating) {
        await addFaqItem({
          category_ar: category,
          question_ar: question,
          answer_ar: answer,
          sort_order: faqItems.length + 1,
          is_active: isActive,
        });
      } else if (editingFaq) {
        await updateFaqItem(editingFaq.id, {
          category_ar: category,
          question_ar: question,
          answer_ar: answer,
          is_active: isActive,
        });
      }

      setIsCreating(false);
      setEditingFaq(null);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    } catch (error: any) {
      setSaveError(error?.message || 'تعذر حفظ السؤال.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171616] via-[#241F1E] to-[#171616] text-white border border-[#3E3836] shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 text-[#E03A53] border border-[#B9142D]/40 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>موديول الأسئلة الشائعة والأجوبة الفنية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            إدارة الأسئلة الشائعة (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-[#CDC4B7] mt-1">
            إضافة وتعديل وحذف الأسئلة الشائعة وتصنيفها للإجابة على استفسارات الجودة، مواعيد التسليم، وطرق التعاقد.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-4 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#910E23] text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سؤال جديد</span>
        </button>
      </div>

      {saveError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">{saveError}</div>
      )}

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>تم حفظ السؤال الشائع بنجاح!</span>
        </div>
      )}

      {/* Form (Create / Edit) */}
      {(isCreating || editingFaq) && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border-2 border-[#B9142D]/40 shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3">
            <h3 className="font-heading font-black text-sm text-[#B9142D]">
              {isCreating ? 'إضافة سؤال شائع جديد' : 'تعديل السؤال الشائع'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingFaq(null);
              }}
              className="text-xs text-[#746E67] hover:text-red-500 font-bold"
            >
              إلغاء
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">تصنيف السؤال *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              >
                <option value="الطباعة والتصاميم">الطباعة والتصاميم</option>
                <option value="مواعيد التسليم">مواعيد التسليم والجدولة</option>
                <option value="الخامات والمواصفات">الخامات والمواصفات والتشطيبات</option>
                <option value="طرق الدفع والتوريد">طرق الدفع والتعاقدات المؤسسية</option>
                <option value="اللوحات والواجهات">اللوحات وواجهات الكلادينج</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="faq_is_active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-[#B9142D]"
              />
              <label htmlFor="faq_is_active" className="text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] cursor-pointer">
                تفعيل وإظهار هذا السؤال في موديول الأسئلة الشائعة
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">نص السؤال *</label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="مثال: كيف أضمن تطابق ألوان الشعار بدقة بين الشاشة والمطبوعات؟"
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">الإجابة الفنية والتفصيلية *</label>
              <textarea
                rows={4}
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="اكتب الإجابة الفنية الشاملة..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-[#B9142D] resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
                disabled={isSaving}
              className="px-6 py-2 rounded-xl bg-[#B9142D] hover:bg-[#910E23] text-white font-bold text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ السؤال</span>
            </button>
          </div>
        </form>
      )}

      {/* FAQ Items List */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#2E2A28] shadow-xs space-y-4">
        <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F5F1EA]">
          قائمة الأسئلة الشائعة الحالية ({faqItems.length})
        </h4>

        <div className="space-y-3">
          {faqItems.map((f, index) => (
            <div
              key={f.id}
              className="p-4 rounded-xl border border-[#EBE4D5] dark:border-[#332D2B] bg-[#FFFDF9] dark:bg-[#221F1E] flex items-start justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#B9142D]/10 text-[#B9142D] px-2 py-0.5 rounded-md">
                    {f.category_ar}
                  </span>
                  <span className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA]">
                    {f.question_ar}
                  </span>
                </div>
                <p className="text-xs text-[#57524C] dark:text-[#BDB4A8] leading-relaxed">
                  {f.answer_ar}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => startEdit(f)}
                  className="p-1.5 rounded-lg bg-[#F5F1E9] dark:bg-[#282422] text-[#171616] dark:text-white hover:bg-[#EBE3D3]"
                  title="تعديل"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
                      void deleteFaqItem(f.id).catch((error) => setSaveError(error?.message || 'تعذر حذف السؤال.'));
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
