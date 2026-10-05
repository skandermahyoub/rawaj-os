import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Service, ArtworkStatus } from '../../types';
import { 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  FileText, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Printer,
  ShieldCheck,
  Plus,
  Minus,
  MessageCircle
} from 'lucide-react';

interface ServiceDetailViewProps {
  serviceId: string;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceId }) => {
  const { services, departments, categories, addToQuote, navigate, packages, siteSettings } = useApp();

  const service = services.find((s) => s.id === serviceId);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, any>>({});
  const [recommendations, setRecommendations] = useState<Record<string, boolean>>({});
  const [quantity, setQuantity] = useState<number>(100);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [artworkStatus, setArtworkStatus] = useState<ArtworkStatus>('ready');
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (service) {
      setActiveImage(service.hero_image);
      const initialVals: Record<string, any> = {};
      service.specification_groups?.forEach((group) => {
        group.fields?.forEach((field) => {
          if (field.default_value !== undefined) {
            initialVals[field.id] = field.default_value;
          } else if (field.options && field.options.length > 0) {
            const defOpt = field.options.find((o) => o.is_default);
            initialVals[field.id] = defOpt ? defOpt.value : field.options[0].value;
          } else if (field.type === 'number') {
            initialVals[field.id] = 1;
          } else if (field.type === 'multi_select') {
            initialVals[field.id] = [];
          } else {
            initialVals[field.id] = '';
          }
        });
      });
      setSelectedSpecs(initialVals);
    }
  }, [serviceId, service]);

  if (!service) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-lg font-bold text-[#181616] dark:text-white">الخدمة غير موجودة</h2>
        <button
          onClick={() => navigate({ view: 'services' })}
          className="bg-[#B9142D] text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          العودة إلى دليل الخدمات
        </button>
      </div>
    );
  }

  const dept = departments.find((d) => d.id === service.department_id);
  const cat = categories.find((c) => c.id === service.category_id);
  const relatedServices = services.filter((s) => (service.related_service_ids || []).includes(s.id));
  const allImages = [service.hero_image, ...(service.gallery || [])].filter(Boolean);

  const handleFieldChange = (fieldId: string, value: any) => {
    setSelectedSpecs((prev) => ({ ...prev, [fieldId]: value }));
    if (recommendations[fieldId]) {
      setRecommendations((prev) => ({ ...prev, [fieldId]: false }));
    }
  };

  const handleRecommendationToggle = (fieldId: string) => {
    setRecommendations((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const isFieldVisible = (field: any): boolean => {
    if (!field.visibility_condition) return true;
    const { field_id, operator, value } = field.visibility_condition;
    const parentVal = selectedSpecs[field_id];

    switch (operator) {
      case 'equals': return parentVal === value;
      case 'not_equals': return parentVal !== value;
      case 'contains': return Array.isArray(parentVal) && parentVal.includes(value);
      case 'is_truthy': return Boolean(parentVal);
      default: return true;
    }
  };

  const generateSpecSummary = () => {
    const summary: { label: string; value: string }[] = [];

    service.specification_groups?.forEach((group) => {
      group.fields?.forEach((field) => {
        if (!isFieldVisible(field)) return;

        if (recommendations[field.id]) {
          summary.push({
            label: field.label_ar,
            value: 'توصية رواج (استشارة فنية)',
          });
          return;
        }

        const val = selectedSpecs[field.id];
        if (val === undefined || val === '' || (Array.isArray(val) && val.length === 0)) return;

        if (field.type === 'select' || field.type === 'radio') {
          const opt = field.options?.find((o) => o.value === val);
          summary.push({
            label: field.label_ar,
            value: opt ? opt.label_ar : String(val),
          });
        } else if (field.type === 'multi_select' && Array.isArray(val)) {
          const labels = val.map((v) => {
            const opt = field.options?.find((o) => o.value === v);
            return opt ? opt.label_ar : v;
          });
          summary.push({
            label: field.label_ar,
            value: labels.join('، '),
          });
        } else {
          summary.push({
            label: field.label_ar,
            value: `${val}${field.unit ? ` ${field.unit}` : ''}`,
          });
        }
      });
    });

    return summary;
  };

  const handleAddToCart = () => {
    const specSummary = generateSpecSummary();
    addToQuote(
      service,
      quantity,
      { ...selectedSpecs, _recommendations: recommendations },
      specSummary,
      customNotes,
      artworkStatus
    );

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleWhatsAppQuote = () => {
    const specSummary = generateSpecSummary();
    let specsText = specSummary.map(s => `• ${s.label}: ${s.value}`).join('\n');
    if (!specsText) specsText = 'المواصفات القياسية المعتمدة لدى رواج';

    const artworkStatusMap: Record<ArtworkStatus, string> = {
      ready: 'ملف جاهز للطباعة (Ready PDF/AI)',
      needs_review: 'الملف يحتاج مراجعة وتجهيز Prepress',
      needs_design: 'أحتاج خدمة تصميم من الصفر عبر رواج',
      no_artwork: 'لا يوجد ملف حالياً (استفسار أولي)',
    };

    const message = `السلام عليكم ورحمة الله وبركاته،
أود طلب عرض سعر رسمي وتفاصيل تنفيذ لدى وكالة رواج للطباعة والإعلان:

📌 الخدمة: ${service.name_ar}
🏷️ القسم: ${dept?.name_ar || ''}
🔢 الكمية المطلوبة: ${quantity.toLocaleString('ar-EG')} قطعة/وحدة

📋 المواصفات الفنية والتشطيبات المختارة:
${specsText}

📁 حالة ملف التصميم: ${artworkStatusMap[artworkStatus]}
${customNotes ? `📝 ملاحظات خاصة: ${customNotes}\n` : ''}
يرجى تزويدي بعرض السعر والمدة المتوقعة للإنتاج والتسليم. شكراً لكم!`;

    const phone = (siteSettings.mobile_whatsapp || siteSettings.phone || '').replace(/[^0-9]/g, '');
    if (!phone) {
      navigate({ view: 'quote-cart' });
      return;
    }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 pb-24 text-right">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#7A736C] dark:text-[#9E978F] overflow-x-auto no-scrollbar">
        <button onClick={() => navigate({ view: 'home' })} className="hover:text-brand-primary">الرئيسية</button>
        <span>/</span>
        <button onClick={() => navigate({ view: 'departments' })} className="hover:text-brand-primary">الأقسام</button>
        {dept && (
          <>
            <span>/</span>
            <button 
              onClick={() => navigate({ view: 'services', departmentId: dept.id })} 
              className="hover:text-brand-primary whitespace-nowrap"
            >
              {dept.name_ar}
            </button>
          </>
        )}
        <span>/</span>
        <span className="text-[#181616] dark:text-white font-bold truncate max-w-[200px]">
          {service.name_ar}
        </span>
      </nav>

      {/* Main Grid: Gallery (Left) + Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* Left / Gallery Column (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-22">
          
          {/* Main Photo Frame */}
          <div className="aspect-4/3 sm:aspect-1/1 rounded-3xl overflow-hidden bg-white dark:bg-[#161414] border border-[#E6DFD5] dark:border-[#282424] shadow-md relative group">
            <img
              src={activeImage || service.hero_image}
              alt={service.name_ar}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {service.badge && (
              <span className="absolute top-3.5 right-3.5 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm border border-white/20">
                {service.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-15 h-15 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white dark:bg-[#161414] shadow-2xs ${
                    activeImage === img ? 'border-brand-primary scale-102' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`view-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Prepress Guidelines Box */}
          {service.prepress_rules && (
            <div className="bg-gradient-to-br from-[#F4EFEA] to-[#EBE4DA] dark:from-[#1C1818] dark:to-[#141212] rounded-2xl border border-[#E6DFD5] dark:border-[#282424] p-4 space-y-2.5 text-xs shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-[#181616] dark:text-white">
                <Printer className="w-4 h-4 text-brand-primary" />
                <span>إرشادات تجهيز الملفات الفنية (Prepress Rules):</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-[11px] text-[#57524E] dark:text-[#C4BEB7]">
                <div>• نمط الألوان: <strong className="text-[#181616] dark:text-white">{service.prepress_rules.color_mode || 'CMYK'}</strong></div>
                <div>• الدقة: <strong className="text-[#181616] dark:text-white">{service.prepress_rules.recommended_dpi || 300} DPI</strong></div>
                <div>• مسافة القص (Bleed): <strong className="text-[#181616] dark:text-white">{service.prepress_rules.bleed_mm || 3} ملم</strong></div>
                <div>• هامش الأمان: <strong className="text-[#181616] dark:text-white">{service.prepress_rules.safety_margin_mm || 5} ملم</strong></div>
              </div>
              {service.prepress_rules.notes_ar && (
                <p className="text-[10px] text-[#7A736C] dark:text-[#9E978F] pt-2 border-t border-[#E6DFD5] dark:border-[#282424] leading-relaxed">
                  {service.prepress_rules.notes_ar}
                </p>
              )}
            </div>
          )}

        </div>

        {/* Right / Specification Configurator Column (lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-[#7A736C] dark:text-[#9E978F]">
              {dept && <span className="bg-white dark:bg-[#1E1B1B] border border-[#E6DFD5] dark:border-[#2D2828] px-2.5 py-0.5 rounded-md font-semibold">{dept.name_ar}</span>}
              {cat && <span>• {cat.name_ar}</span>}
            </div>

            <h1 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#181616] dark:text-[#F7F5F2] leading-tight">
              {service.name_ar}
            </h1>

            <div className="flex items-center gap-3">
              <span className="inline-block bg-brand-primary-10 text-brand-primary font-bold text-xs px-3.5 py-1 rounded-lg border border-brand-primary-30 shadow-2xs">
                السعر: طلب عرض سعر فني
              </span>
              <span className="text-xs text-[#7A736C] dark:text-[#9E978F]">
                (يعتمد على المقاس، الخامة، الكمية، والتشطيب)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#57524E] dark:text-[#B5AFA8] leading-relaxed pt-1">
              {service.full_description_ar || service.short_description_ar}
            </p>
          </div>

          {/* Highlights */}
          {service.highlights && service.highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {service.highlights.map((h) => (
                <div
                  key={h.id}
                  className="bg-white dark:bg-[#161414] rounded-2xl p-3.5 border border-[#E6DFD5] dark:border-[#282424] space-y-1 shadow-2xs"
                >
                  <div className="text-xs font-bold text-[#181616] dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h.title_ar}</span>
                  </div>
                  <p className="text-[10px] text-[#7A736C] dark:text-[#9E978F] leading-relaxed">
                    {h.description_ar}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Dynamic Specification Groups Configurator */}
          <div className="bg-white dark:bg-[#161414] rounded-3xl border border-[#E6DFD5] dark:border-[#282424] p-5 sm:p-7 space-y-7 shadow-sm">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E6DFD5] dark:border-[#282424]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-brand-primary" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#181616] dark:text-[#F7F5F2]">
                  تخصيص المواصفات الفنية للخدمة
                </h3>
              </div>
              <span className="text-[11px] text-[#7A736C] dark:text-[#9E978F]">
                اختر مواصفاتك أو اطلب توصية رواج
              </span>
            </div>

            {/* Groups */}
            {service.specification_groups?.map((group) => (
              <div key={group.id} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#181616] dark:text-white pb-1.5 border-b border-[#F4EFEA] dark:border-[#221F1F]">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span>{group.title_ar}</span>
                </div>

                <div className="grid grid-cols-1 gap-4.5">
                  {group.fields?.map((field) => {
                    if (!isFieldVisible(field)) return null;

                    const isRecommended = recommendations[field.id];
                    const currentValue = selectedSpecs[field.id];

                    return (
                      <div key={field.id} className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-[#181616] dark:text-[#F7F5F2]">
                            {field.label_ar} {field.required && <strong className="text-brand-primary">*</strong>}
                          </label>

                          {/* Recommendation toggle */}
                          {field.allow_rawaj_recommendation && (
                            <button
                              type="button"
                              onClick={() => handleRecommendationToggle(field.id)}
                              className={`text-[10px] px-2.5 py-1 rounded-lg transition-all font-semibold ${
                                isRecommended
                                  ? 'bg-brand-primary text-white font-bold shadow-2xs'
                                  : 'bg-[#F4EFEA] dark:bg-[#201D1D] text-[#7A736C] hover:text-brand-primary border border-[#E6DFD5] dark:border-[#2D2828]'
                              }`}
                            >
                              {isRecommended ? '✓ تم اختيار توصية رواج' : 'لا أعرف — أحتاج توصية رواج'}
                            </button>
                          )}
                        </div>

                        {field.help_text_ar && (
                          <p className="text-[10px] text-[#7A736C] dark:text-[#9E978F]">
                            {field.help_text_ar}
                          </p>
                        )}

                        {isRecommended ? (
                          <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1E1B1B] border border-[#E6DFD5] dark:border-[#2D2828] text-xs text-[#57524E] dark:text-[#C4BEB7] flex items-center gap-2">
                            <Info className="w-4 h-4 text-brand-primary shrink-0" />
                            <span>سيتولى مهندسو رواج اقتراح أفضل خيار فني مناسب لاستخدامك وميزانيتك.</span>
                          </div>
                        ) : (
                          <>
                            {/* Select / Radio Options */}
                            {field.type === 'select' && field.options && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {field.options.map((opt) => (
                                  <label
                                    key={opt.id}
                                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                                      currentValue === opt.value
                                        ? 'border-brand-primary bg-brand-primary-10 text-[#181616] dark:text-white font-semibold shadow-2xs'
                                        : 'border-[#E6DFD5] dark:border-[#282424] bg-[#FAF8F5] dark:bg-[#1C1919] text-[#57524E] dark:text-[#C4BEB7] hover:bg-[#F4EFEA]'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={field.id}
                                      value={opt.value}
                                      checked={currentValue === opt.value}
                                      onChange={() => handleFieldChange(field.id, opt.value)}
                                      className="mt-0.5"
                                    />
                                    <div className="space-y-0.5">
                                      <div className="text-xs leading-snug">{opt.label_ar}</div>
                                      {opt.description && (
                                        <div className="text-[10px] text-[#7A736C] dark:text-[#9E978F]">{opt.description}</div>
                                      )}
                                    </div>
                                  </label>
                                ))}
                              </div>
                            )}

                            {/* Multi-Select Options */}
                            {field.type === 'multi_select' && field.options && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {field.options.map((opt) => {
                                  const currentArr: string[] = Array.isArray(currentValue) ? currentValue : [];
                                  const isChecked = currentArr.includes(opt.value);
                                  return (
                                    <label
                                      key={opt.id}
                                      className={`p-3 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                                        isChecked
                                          ? 'border-brand-primary bg-brand-primary-10 text-[#181616] dark:text-white font-semibold shadow-2xs'
                                          : 'border-[#E6DFD5] dark:border-[#282424] bg-[#FAF8F5] dark:bg-[#1C1919] text-[#57524E] dark:text-[#C4BEB7] hover:bg-[#F4EFEA]'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                          const next = isChecked
                                            ? currentArr.filter((v) => v !== opt.value)
                                            : [...currentArr, opt.value];
                                          handleFieldChange(field.id, next);
                                        }}
                                        className="mt-0.5"
                                      />
                                      <div className="text-xs leading-snug">{opt.label_ar}</div>
                                    </label>
                                  );
                                })}
                              </div>
                            )}

                            {/* Number input */}
                            {field.type === 'number' && (
                              <div className="relative">
                                <input
                                  type="number"
                                  value={currentValue ?? ''}
                                  onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
                                  placeholder={field.placeholder_ar || 'أدخل القيمة...'}
                                  className="w-full bg-[#FAF8F5] dark:bg-[#1C1919] border border-[#E6DFD5] dark:border-[#2D2828] rounded-xl px-3 py-2.5 text-xs text-[#181616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                                />
                                {field.unit && (
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7A736C]">
                                    {field.unit}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Text input */}
                            {field.type === 'text' && (
                              <input
                                type="text"
                                value={currentValue ?? ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={field.placeholder_ar || 'أدخل النص...'}
                                className="w-full bg-[#FAF8F5] dark:bg-[#1C1919] border border-[#E6DFD5] dark:border-[#2D2828] rounded-xl px-3 py-2.5 text-xs text-[#181616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                              />
                            )}

                            {/* Textarea */}
                            {field.type === 'textarea' && (
                              <textarea
                                rows={2}
                                value={currentValue ?? ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={field.placeholder_ar || 'أدخل التفاصيل...'}
                                className="w-full bg-[#FAF8F5] dark:bg-[#1C1919] border border-[#E6DFD5] dark:border-[#2D2828] rounded-xl p-3 text-xs text-[#181616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                              />
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity, Artwork Status & Add Button */}
            <div className="pt-5 border-t border-[#E6DFD5] dark:border-[#282424] space-y-4.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quantity */}
                <div className="space-y-1.5">
                  <label className="font-bold text-xs text-[#181616] dark:text-[#F7F5F2]">
                    الكمية المطلوبة <strong className="text-brand-primary">*</strong>
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 10))}
                      className="w-10 h-10 bg-[#F4EFEA] dark:bg-[#1E1B1B] border border-[#E6DFD5] dark:border-[#2D2828] rounded-r-xl font-bold text-sm text-[#181616] dark:text-white hover:bg-[#ECE5DC] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 mx-auto" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full h-10 text-center bg-[#FAF8F5] dark:bg-[#1C1919] border-y border-[#E6DFD5] dark:border-[#2D2828] text-xs font-bold text-[#181616] dark:text-white focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 10)}
                      className="w-10 h-10 bg-[#F4EFEA] dark:bg-[#1E1B1B] border border-[#E6DFD5] dark:border-[#2D2828] rounded-l-xl font-bold text-sm text-[#181616] dark:text-white hover:bg-[#ECE5DC] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                </div>

                {/* Prepress Status */}
                <div className="space-y-1.5">
                  <label className="font-bold text-xs text-[#181616] dark:text-[#F7F5F2]">
                    حالة التصميم والملف الفني
                  </label>
                  <select
                    value={artworkStatus}
                    onChange={(e) => setArtworkStatus(e.target.value as any)}
                    className="w-full h-10 bg-[#FAF8F5] dark:bg-[#1C1919] border border-[#E6DFD5] dark:border-[#2D2828] rounded-xl px-3 text-xs text-[#181616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                  >
                    <option value="ready">ملف جاهز للطباعة (Ready PDF/AI)</option>
                    <option value="needs_review">الملف يحتاج مراجعة وتجهيز Prepress</option>
                    <option value="needs_design">أحتاج خدمة تصميم من الصفر عبر رواج</option>
                    <option value="no_artwork">لا يوجد ملف حالياً (استفسار أولي)</option>
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E6DFD5] dark:border-[#2D2828] bg-[#FAF8F5] dark:bg-[#1C1919] p-3.5 text-xs text-[#7A736C] dark:text-[#9E978F]">
                <strong className="text-[#181616] dark:text-[#F7F5F2]">الملفات الفنية:</strong>{' '}
                حفاظاً على ملفات العميل، لا يتم رفع ملفات التصميم في صفحة عامة. بعد إرسال طلب عرض السعر سيطلب فريق رواج الملف عبر قناة التسليم المعتمدة.
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="font-bold text-xs text-[#181616] dark:text-[#F7F5F2]">
                  ملاحظات فنية خاصة لهذا البند
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="أضف أي رغبات إضافية في القص، السلفنة، مكان التركيب، أو الاستلام..."
                  className="w-full bg-[#FAF8F5] dark:bg-[#1C1919] border border-[#E6DFD5] dark:border-[#2D2828] rounded-xl p-3 text-xs text-[#181616] dark:text-white focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              {/* Action Buttons: WhatsApp & Quote Cart */}
              <div className="pt-2 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppQuote}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <MessageCircle className="w-4.5 h-4.5" />
                    <span>طلب تسعير فوري عبر واتساب</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold text-sm py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    <span>أضف لسلة عروض الأسعار</span>
                  </button>
                </div>

                {addedToast && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                    ✓ تمت إضافة الخدمة ومواصفاتها بنجاح إلى طلب عرض السعر!
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* FAQs Accordion */}
          {service.faq && service.faq.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-heading font-bold text-sm text-[#181616] dark:text-[#F7F5F2] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-primary" />
                <span>الأسئلة الشائعة حول هذه الخدمة:</span>
              </h3>
              <div className="space-y-2.5">
                {service.faq.map((faq) => {
                  const isOpen = openFaq[faq.id];
                  return (
                    <div
                      key={faq.id}
                      className="bg-white dark:bg-[#161414] rounded-2xl border border-[#E6DFD5] dark:border-[#282424] overflow-hidden shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq((prev) => ({ ...prev, [faq.id]: !prev[faq.id] }))}
                        className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-[#181616] dark:text-white text-right"
                      >
                        <span>{faq.question_ar}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-[#7A736C]" />}
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-[#57524E] dark:text-[#B5AFA8] leading-relaxed border-t border-[#E6DFD5] dark:border-[#282424] pt-2.5">
                          {faq.answer_ar}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#E6DFD5] dark:border-[#282424]">
              <h3 className="font-heading font-bold text-sm text-[#181616] dark:text-[#F7F5F2]">
                خدمات تكميلية قد تحتاجها مع هذا الطلب:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedServices.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate({ view: 'service-detail', serviceId: rel.id })}
                    className="p-3 rounded-2xl bg-white dark:bg-[#161414] border border-[#E6DFD5] dark:border-[#282424] hover:border-brand-primary cursor-pointer flex items-center gap-3 transition-all shadow-2xs hover:shadow-md"
                  >
                    <img
                      src={rel.hero_image}
                      alt={rel.name_ar}
                      className="w-13 h-13 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-[#181616] dark:text-white hover:text-brand-primary line-clamp-1">
                        {rel.name_ar}
                      </div>
                      <div className="text-[10px] text-[#7A736C] dark:text-[#9E978F] line-clamp-1">
                        {rel.short_description_ar}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating / Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 p-2.5 bg-[#FAF8F5]/95 dark:bg-[#121010]/95 backdrop-blur-md border-t border-[#E6DFD5] dark:border-[#262222] shadow-lg flex items-center justify-between gap-3">
        <div className="text-right">
          <div className="text-[11px] font-bold text-[#181616] dark:text-white truncate max-w-[140px]">
            {service.name_ar}
          </div>
          <div className="text-[10px] text-brand-primary font-bold">
            الكمية: {quantity}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>أضف لطلب عرض السعر</span>
        </button>
      </div>

    </div>
  );
};
