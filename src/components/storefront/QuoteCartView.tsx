import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Calendar, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const QuoteCartView: React.FC = () => {
  const { 
    quoteItems, 
    updateQuoteItemQuantity, 
    removeQuoteItem, 
    clearQuoteCart, 
    submitQuoteRequest, 
    siteSettings,
    navigate 
  } = useApp();

  // Customer Form
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('صنعاء');
  const [address, setAddress] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{ referenceNumber: string; whatsappUrl: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;
    if (!customerName.trim() || !mobile.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await submitQuoteRequest(
        {
          name: customerName,
          company: companyName,
          mobile: mobile,
          whatsapp: whatsapp || mobile,
          email: email,
          city: city,
          address: address,
        },
        generalNotes,
        deadlineDate
      );

      setSubmittedResult({
        referenceNumber: res.referenceNumber,
        whatsappUrl: res.whatsappUrl,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 text-right">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E0D3] dark:border-[#332F2F] pb-4">
        <div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#171616] dark:text-[#F5F3EF] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-primary" />
            <span>طلب عرض السعر (سلة المواصفات)</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            راجع الخدمات والمواصفات المختارة وأرسل طلب التسعير الفني الموحد لفريق رواج
          </p>
        </div>

        {quoteItems.length > 0 && (
          <button
            onClick={clearQuoteCart}
            className="self-start sm:self-auto text-xs text-[#78716C] hover:text-brand-primary flex items-center gap-1 font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>تفريغ السلة</span>
          </button>
        )}
      </div>

      {/* Success Submission Modal */}
      {submittedResult && (
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-8 space-y-5 text-center shadow-xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              تم تسجيل وحفظ طلبك بنجاح في النظام!
            </span>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#171616] dark:text-white">
              رقم مرجع الطلب: <strong className="text-brand-primary font-mono">{submittedResult.referenceNumber}</strong>
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] max-w-lg mx-auto leading-relaxed">
              تم إرسال نسخة الطلب إلى قاعدة بيانات رواج. اضغط على الزر أدناه لفتح تطبيق الواتساب وإرسال التفاصيل والمواصفات فوراً لفريق المبيعات والتسعير الفني.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={submittedResult.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
            >
              <MessageSquare className="w-5 h-5" />
              <span>متابعة الإرسال عبر WhatsApp الآن</span>
            </a>

            <button
              onClick={() => {
                setSubmittedResult(null);
                navigate({ view: 'services' });
              }}
              className="w-full sm:w-auto bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#EAE4D6] text-[#171616] dark:text-white font-semibold text-xs px-5 py-3 rounded-xl border border-[#E7E0D3] dark:border-[#3A3535]"
            >
              تصفح خدمات أخرى
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!submittedResult && quoteItems.length === 0 && (
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-10 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-primary-10 text-brand-primary mx-auto flex items-center justify-center">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-base text-[#171616] dark:text-[#F5F3EF]">
              سلة طلب عرض السعر فارغة حالياً
            </h3>
            <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-md mx-auto">
              يمكنك استعراض دليل الخدمات الفنية وتخصيص المقاسات والخامات لكل خدمة وإضافتها هنا لتجميعها في طلب واحد.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate({ view: 'services' })}
              className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              استعراض دليل الخدمات
            </button>
          </div>
        </div>
      )}

      {/* Cart Content: Items List + Customer Form */}
      {!submittedResult && quoteItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Items List (lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="text-xs font-bold text-[#78716C] dark:text-[#A8A29E] px-1">
              الخدمات المضافة ({quoteItems.length} بنود):
            </div>

            <div className="space-y-3">
              {quoteItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] p-3.5 sm:p-4 space-y-3 shadow-xs"
                >
                  
                  {/* Top Item Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.hero_image}
                        alt={item.service_name_ar}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E7E0D3] dark:border-[#332F2F] shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-brand-primary bg-brand-primary-10 px-1.5 py-0.2 rounded">
                          بند {index + 1} • {item.department_name_ar}
                        </span>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-[#171616] dark:text-white mt-0.5">
                          {item.service_name_ar}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => removeQuoteItem(item.id)}
                      className="p-1.5 rounded-md text-[#78716C] hover:text-brand-primary hover:bg-brand-primary-10 transition-colors"
                      title="حذف هذا البند"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Specification Breakdown Chips */}
                  {item.specification_summary && item.specification_summary.length > 0 && (
                    <div className="bg-[#FAF7F2] dark:bg-[#221F1F] rounded-lg p-2.5 border border-[#E7E0D3] dark:border-[#332F2F] space-y-1">
                      <div className="text-[10px] font-bold text-[#78716C] dark:text-[#A8A29E]">
                        المواصفات الفنية المحددة:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#44403C] dark:text-[#D6D3D1]">
                        {item.specification_summary.map((spec, idx) => (
                          <div key={idx} className="flex items-baseline gap-1 truncate">
                            <span className="text-[#78716C]">• {spec.label}:</span>
                            <span className="font-semibold text-[#171616] dark:text-white truncate">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artwork Status & Notes */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1 border-t border-[#F5F1E9] dark:border-[#252222]">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[#78716C]">حالة التصميم:</span>
                      <span className="font-bold text-[#171616] dark:text-white">
                        {item.artwork_status === 'ready'
                          ? 'ملف جاهز للطباعة'
                          : item.artwork_status === 'needs_review'
                          ? 'يحتاج مراجعة Prepress'
                          : item.artwork_status === 'needs_design'
                          ? 'يحتاج تصميم جديد'
                          : 'لا يوجد ملف'}
                      </span>
                      {item.artwork_file_name && (
                        <span className="text-[10px] text-emerald-600 truncate max-w-[120px]">
                          ({item.artwork_file_name})
                        </span>
                      )}
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#78716C]">الكمية:</span>
                      <div className="flex items-center border border-[#E7E0D3] dark:border-[#3A3535] rounded-md overflow-hidden bg-[#FAF7F2] dark:bg-[#252222]">
                        <button
                          type="button"
                          onClick={() => updateQuoteItemQuantity(item.id, Math.max(1, item.quantity - 10))}
                          className="px-2 py-1 text-xs font-bold text-[#57534E] hover:bg-[#EAE4D6]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-[#171616] dark:text-white min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuoteItemQuantity(item.id, item.quantity + 10)}
                          className="px-2 py-1 text-xs font-bold text-[#57534E] hover:bg-[#EAE4D6]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {item.custom_notes && (
                    <div className="text-[11px] text-[#78716C] dark:text-[#A8A29E] bg-[#F5F1E9] dark:bg-[#252222] p-2 rounded">
                      <strong>ملاحظات:</strong> {item.custom_notes}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Add More Services Shortcut */}
            <div className="pt-2">
              <button
                onClick={() => navigate({ view: 'services' })}
                className="w-full py-2.5 rounded-xl border border-dashed border-[#D4CDC0] dark:border-[#3A3535] hover:border-[#B9142D] text-xs font-bold text-[#57534E] dark:text-[#D6D3D1] hover:text-[#B9142D] transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة أخرى إلى نفس طلب عرض السعر</span>
              </button>
            </div>

          </div>

          {/* Right Column: Customer Info & Send Form (lg: 5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-4 sm:p-5 space-y-4 shadow-xs lg:sticky lg:top-20">
            
            <div className="pb-3 border-b border-[#E7E0D3] dark:border-[#332F2F]">
              <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-[#F5F3EF]">
                بيانات التواصل لاستلام عرض السعر
              </h3>
              <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                سيقوم فريق مبيعات رواج بالتواصل معكم مباشرة لتأكيد التسعير وموعد التوريد.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              
              {/* Name & Company */}
              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  الاسم الكامل أو اسم المسؤول <strong className="text-[#B9142D]">*</strong>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: أحمد علي المحمودي"
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  اسم الشركة / المنشأة / المحل (اختياري)
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="مثال: شركة الأفق للاستيراد / متجر لمسة عطر"
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {/* Mobile & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                    رقم الجوال <strong className="text-[#B9142D]">*</strong>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="مثال: 772110131"
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                    رقم الواتساب (لإرسال العرض)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="إذا كان نفس الجوال اتركه فارغاً"
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* City & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                    المدينة / المحافظة
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                  >
                    <option value="صنعاء">صنعاء</option>
                    <option value="عدن">عدن</option>
                    <option value="تعز">تعز</option>
                    <option value="الحديدة">الحديدة</option>
                    <option value="إب">إب</option>
                    <option value="المكلا">المكلا / حضرموت</option>
                    <option value="ذمار">ذمار</option>
                    <option value="مأرب">مأرب</option>
                    <option value="أخرى">مدينة / محافظة أخرى</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                    الموعد المطلوب للاستلام
                  </label>
                  <input
                    type="date"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* General Notes */}
              <div className="space-y-1">
                <label className="font-bold text-[#171616] dark:text-[#F5F3EF]">
                  ملاحظات عامة حول الطلب أو موقع التركيب
                </label>
                <textarea
                  rows={2}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="أضف أي تفاصيل عن طريقة الدفع، متطلبات الشحن، أو معاينة الموقع..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg p-2.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'جارٍ تسجيل الطلب...' : 'إرسال طلب عرض السعر الآن'}</span>
                </button>
              </div>

              <div className="text-[10px] text-center text-[#78716C] dark:text-[#A8A29E] leading-relaxed">
                بالضغط على إرسال، سيتم حفظ الطلب في النظام وتوليد رسالة الواتساب المجهزة بالمواصفات للتواصل مع مسؤولي رواج.
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};
