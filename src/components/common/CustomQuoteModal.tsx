import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Send, HelpCircle, FileText, Upload, CheckCircle2 } from 'lucide-react';
import { Service } from '../../types';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({ isOpen, onClose }) => {
  const { addToQuote, navigate, departments } = useApp();

  const [title, setTitle] = useState('');
  const [departmentId, setDepartmentId] = useState(departments[0]?.id || '');
  const [usagePurpose, setUsagePurpose] = useState('');
  const [material, setMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [quantity, setQuantity] = useState<number>(100);
  const [notes, setNotes] = useState('');
  const [artworkStatus, setArtworkStatus] = useState<'ready' | 'needs_review' | 'needs_design' | 'no_artwork'>('ready');
  const [referenceFileName, setReferenceFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenDept = departments.find((d) => d.id === departmentId);

    // Create a virtual custom service representation
    const customService: Service = {
      id: `custom-srv-${Date.now()}`,
      name_ar: `طلب مخصص: ${title}`,
      name_en: `Custom Request: ${title}`,
      slug: `custom-${Date.now()}`,
      department_id: departmentId,
      category_id: 'cat-custom',
      short_description_ar: notes || 'مواصفات وتوريد مخصص حسب طلب العميل',
      full_description_ar: notes || 'مواصفات وتوريد مخصص حسب طلب العميل',
      hero_image: chosenDept ? chosenDept.hero_image : 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      badge: 'طلب مخصص',
      service_status: 'published',
      execution_model: 'mixed',
      featured: false,
      sort_order: 99,
      highlights: [],
      faq: [],
      specification_groups: [],
      related_service_ids: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const specSummary = [
      { label: 'القسم المقترح', value: chosenDept ? chosenDept.name_ar : 'عام' },
      { label: 'طبيعة الاستخدام', value: usagePurpose || 'غير محدد' },
      { label: 'الخامة المطلوبة', value: material || 'نحتاج توصية رواج' },
      { label: 'المقاس / الأبعاد', value: dimensions || 'حسب التوصية' },
    ];

    addToQuote(
      customService,
      quantity,
      {
        custom_title: title,
        usage: usagePurpose,
        material: material,
        dimensions: dimensions,
      },
      specSummary,
      notes,
      artworkStatus,
      referenceFileName
    );

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      navigate({ view: 'quote-cart' });
    }, 1200);
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceFileName(file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-between bg-[#FAF7F2] dark:bg-[#221F1F]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FDE8EA] dark:bg-[#3D1217] flex items-center justify-center text-[#B9142D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-[#F5F3EF]">
                لم تجد ما تبحث عنه؟ طلب مواصفات مخصصة
              </h3>
              <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                رواج تتولى توريد وتنفيذ أي منتج طباعي أو إعلاني محلياً أو دولياً.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#78716C] hover:text-[#171616] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base text-[#171616] dark:text-white">
              تمت إضافة طلبك المخصص إلى سلة عروض الأسعار بنجاح!
            </h4>
            <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
              جارٍ تحويلك إلى صفحة طلب عرض السعر لمراجعته وإرساله...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
            
            {/* Title & Department */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#171616] dark:text-[#F5F3EF] flex items-center justify-between">
                <span>ما هو المنتج أو الخدمة التي تريدها؟ <strong className="text-brand-primary">*</strong></span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: علبة خشبية فاخرة محفورة، ستاند عرض معدني، مظلة إعلانية مطبوعة..."
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  القسم الأقرب لطبيعة الطلب
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name_ar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  الكمية التقريبية المطلوبة <strong className="text-brand-primary">*</strong>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Purpose & Material */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  الخامة المفضلة (إن كانت معروفة)
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="مثال: أكريليك 5 ملم، جلد طبيعي، ستانلس، كرافت..."
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  المقاس أو الأبعاد المقدرة
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="مثال: 50 × 70 سم، أو قطر 10 سم..."
                  className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Purpose / Usage */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                بيئة واستخدام المنتج (داخلي / خارجي / مقاوم للحرارة أو الماء)
              </label>
              <input
                type="text"
                value={usagePurpose}
                onChange={(e) => setUsagePurpose(e.target.value)}
                placeholder="مثال: واجهة خارجية معرضة للشمس، هدايا مؤتمر، عبوات تجميد..."
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            {/* Prepress / Artwork Status */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                حالة التصميم والملف الفني
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'ready', label: 'ملف جاهز للطباعة' },
                  { id: 'needs_review', label: 'يحتاج مراجعة' },
                  { id: 'needs_design', label: 'أحتاج تصميم' },
                  { id: 'no_artwork', label: 'استفسار أولي' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setArtworkStatus(item.id as any)}
                    className={`p-2 rounded-lg text-center border transition-colors ${
                      artworkStatus === item.id
                        ? 'border-brand-primary bg-brand-primary-10 text-brand-primary font-bold'
                        : 'border-[#E7E0D3] dark:border-[#332F2F] bg-[#F5F1E9] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reference Upload */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#171616] dark:text-[#F5F3EF] flex items-center justify-between">
                <span>ملف أو صورة مرجعية (اختياري)</span>
                {referenceFileName && (
                  <span className="text-[10px] text-emerald-600 font-bold truncate max-w-[150px]">
                    تم اختيار: {referenceFileName}
                  </span>
                )}
              </label>
              <label className="border border-dashed border-[#D4CDC0] dark:border-[#3F3B3B] hover:border-brand-primary rounded-lg p-3 text-center cursor-pointer flex flex-col items-center justify-center gap-1 bg-[#FAF7F2] dark:bg-[#221F1F]">
                <Upload className="w-4 h-4 text-[#78716C]" />
                <span className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                  انقر هنا لاختيار صورة نموذج، مخطط، أو ملف PDF
                </span>
                <input
                  type="file"
                  onChange={handleFileUploadSim}
                  className="hidden"
                  accept="image/*,.pdf,.ai,.psd"
                />
              </label>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                تفاصيل وملاحظات إضافية
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أضف أي تفاصيل خاصة بالتشطيب، اللون، موعد التسليم، أو الاستيراد والتوريد..."
                className="w-full bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg p-2.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#F5F1E9] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] font-semibold hover:bg-[#EAE4D6]"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-hover flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إضافة إلى طلب عرض السعر</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
