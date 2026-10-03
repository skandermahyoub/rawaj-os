import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { Sliders, ShoppingBag, CheckCircle2, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';

export const InteractiveQuoteEstimator: React.FC = () => {
  const { departments, services, addToQuote, navigate } = useApp();

  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0]?.id || 'dept-paper');
  const availableServices = services.filter(
    (s) => s.department_id === selectedDeptId && s.service_status === 'published'
  );
  
  const [selectedServiceId, setSelectedServiceId] = useState<string>(availableServices[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1000);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const currentService = services.find((s) => s.id === selectedServiceId) || availableServices[0];
  const currentDept = departments.find((d) => d.id === selectedDeptId);

  const handleQuickAdd = () => {
    if (!currentService) return;

    addToQuote(
      currentService,
      quantity,
      {},
      [
        { label: 'الكمية التقديرية', value: `${quantity.toLocaleString('ar-EG')} قطعة` },
        { label: 'المواصفة', value: 'سيتم تأكيد القياسات والخامة مع فريق رواج الفني' }
      ],
      customNotes || 'طلب سريع عبر محاكي التسعير الفوري',
      'ready'
    );

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleWhatsAppSend = () => {
    if (!currentService) return;
    const messageText = `السلام عليكم ورحمة الله، أود طلب عرض سعر وتقييم فني لدى وكالة رواج للطباعة:\n\n📌 الخدمة: ${currentService.name_ar}\n📂 القسم: ${currentDept?.name_ar}\n🔢 الكمية: ${quantity.toLocaleString('ar-EG')} قطعة/وحدة\n📝 الملاحظات والطلبات الخاصة: ${customNotes || 'المواصفة القياسية المعتمدة'}\n\nيرجى التواصل وتزوينا بعرض السعر الفني المعتمد.`;
    window.open(`https://wa.me/967772110131?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <section className="bg-[#EEE9E0] dark:bg-[#25211F] rounded-[26px] sm:rounded-[30px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 shadow-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B9142D] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 px-2.5 py-0.5 rounded-[6px] mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>محاكي إعداد طلب التسعير الفوري</span>
          </div>
          <h2 className="font-heading font-extrabold text-[17px] sm:text-[20px] text-[#171616] dark:text-[#F5F1EA]">
            جهّز طلبك وأضفه لسلة عروض الأسعار في ثوانٍ
          </h2>
        </div>

        <span className="text-[11px] font-semibold text-[#746E67] dark:text-[#A0988F] bg-[#FFFDF9] dark:bg-[#1C1918] px-3 py-1 rounded-full border border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] shrink-0 self-start sm:self-auto">
          تسعير فني حسب المواصفات المطلوبة
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
        
        {/* Left Interactive Configurator (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
          
          {/* Step 1: Choose Department with guaranteed shrink-0 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA] block">
              1. اختر مجال الخدمة / القسم:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar w-full">
              {departments.slice(0, 6).map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    const matching = services.find(s => s.department_id === dept.id && s.service_status === 'published');
                    if (matching) setSelectedServiceId(matching.id);
                  }}
                  className={`shrink-0 inline-flex items-center justify-center whitespace-nowrap px-3.5 py-2 rounded-[12px] text-xs font-bold transition-all ${
                    selectedDeptId === dept.id
                      ? 'bg-[#B9142D] text-white shadow-xs'
                      : 'bg-[#FFFDF9] dark:bg-[#1C1918] text-[#746E67] dark:text-[#A0988F] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:text-[#171616] dark:hover:text-white'
                  }`}
                >
                  {dept.name_ar}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Service */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA] block">
              2. حدد نوع المطبوع أو الخدمة:
            </label>
            <select
              value={currentService?.id || ''}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full p-3 rounded-[14px] bg-[#FFFDF9] dark:bg-[#1C1918] border border-[rgba(23,22,22,0.12)] dark:border-[rgba(245,241,234,0.12)] text-xs font-bold text-[#171616] dark:text-[#F5F1EA] outline-hidden focus:border-[#B9142D] shadow-2xs cursor-pointer"
            >
              {availableServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name_ar}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Quantity presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA] block">
              3. الكمية التقريبية المطلوبة:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[250, 500, 1000, 5000].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => setQuantity(qty)}
                  className={`py-2 rounded-[10px] text-xs font-bold transition-all text-center ${
                    quantity === qty
                      ? 'bg-[#171616] dark:bg-[#F5F1EA] text-white dark:text-[#171616] shadow-xs'
                      : 'bg-[#FFFDF9] dark:bg-[#1C1918] text-[#746E67] dark:text-[#A0988F] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)]'
                  }`}
                >
                  {qty.toLocaleString('ar-EG')} وحدة
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Quick Custom Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA] block">
              ملاحظة أو مواصفة خاصة (اختياري):
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="مثال: خامة كوشيه 350 جم، بصمة ذهبية، ترقيم تسلسلي..."
              className="w-full p-2.5 rounded-[12px] bg-[#FFFDF9] dark:bg-[#1C1918] border border-[rgba(23,22,22,0.12)] dark:border-[rgba(245,241,234,0.12)] text-xs text-[#171616] dark:text-[#F5F1EA] outline-hidden focus:border-[#B9142D]"
            />
          </div>

        </div>

        {/* Right Live Preview Card (5 cols) */}
        {currentService && (
          <div className="lg:col-span-5 bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[22px] p-4 sm:p-5 border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] space-y-3.5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative aspect-16/10 rounded-[14px] overflow-hidden bg-[#E5DFD3] dark:bg-[#25211F]">
                <SafeImage
                  src={currentService.hero_image}
                  alt={currentService.name_ar}
                  className="w-full h-full object-cover"
                  fallbackCategory={currentService.name_ar}
                />
                <span className="absolute top-2 right-2 bg-[#B9142D] text-white text-[10px] font-bold px-2 py-0.5 rounded-[6px] shadow-xs">
                  {currentDept?.name_ar}
                </span>
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-[14px] sm:text-[15px] text-[#171616] dark:text-[#F5F1EA]">
                  {currentService.name_ar}
                </h4>
                <div className="text-xs text-[#746E67] dark:text-[#A0988F] mt-1 space-y-0.5">
                  <div>الكمية: <span className="font-bold text-[#171616] dark:text-[#F5F1EA]">{quantity.toLocaleString('ar-EG')} قطعة</span></div>
                  <div className="text-[11px]">نظام التسعير: <span className="text-[#B9142D] font-bold">Request For Quote (RFQ)</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)]">
              {addedSuccess ? (
                <div className="w-full p-3 rounded-[12px] bg-[#16834A] text-white text-xs font-bold flex items-center justify-center gap-1.5 animate-in fade-in duration-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تمت إضافة الخدمة لطلب عرض السعر بنجاح!</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="touch-target bg-[#B9142D] hover:bg-[#951126] text-white font-bold text-xs p-2.5 rounded-[12px] flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضف للسلة</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="touch-target bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-xs p-2.5 rounded-[12px] flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب فوري</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate({ view: 'service-detail', serviceId: currentService.id })}
                className="w-full text-center text-xs font-semibold text-[#746E67] dark:text-[#A0988F] hover:text-[#B9142D] transition-colors pt-1"
              >
                تخصيص كامل الخامات والقياسات بالتفصيل ←
              </button>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
