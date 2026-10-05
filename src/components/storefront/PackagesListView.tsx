import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  ShoppingBag, 
  Layers, 
  Clock, 
  Building2, 
  ShieldCheck, 
  PhoneCall, 
  Check, 
  ChevronRight, 
  FileText, 
  Send,
  HelpCircle,
  Briefcase,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Package } from '../../types';
import { SafeImage } from '../common/SafeImage';

export const PackagesListView: React.FC = () => {
  const { packages, navigate, siteSettings } = useApp();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const whatsappNumber = (siteSettings?.mobile_whatsapp || '').replace(/\D/g, '');
  const whatsappNumber = (siteSettings?.mobile_whatsapp || '').replace(/\D/g, '');

  const SECTOR_FILTERS = [
    { key: 'all', label: 'كافة القطاعات', icon: '✨' },
    { key: 'health', label: 'المستشفيات والصحة', icon: '🏥' },
    { key: 'education', label: 'التعليم والمدارس', icon: '🎓' },
    { key: 'hospitality', label: 'المطاعم والكافيهات', icon: '🍽️' },
    { key: 'fashion', label: 'الأزياء والبراندات', icon: '👗' },
    { key: 'pharma', label: 'الأدوية ومستحضرات التجميل', icon: '💊' },
    { key: 'events', label: 'المعارض والفعاليات', icon: '🎪' },
    { key: 'corporate', label: 'الشركات والبنوك VIP', icon: '🏢' },
    { key: 'realestate', label: 'العقارات والمقاولات', icon: '🏗️' },
    { key: 'logistics', label: 'النقل واللوجستيات', icon: '🚚' },
    { key: 'retail', label: 'المتاجر والتجزئة', icon: '🛍️' },
  ];

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      if (selectedSector !== 'all' && pkg.sector_key !== selectedSector) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${pkg.title_ar} ${pkg.tagline_ar} ${pkg.description_ar} ${pkg.target_sector_ar || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [packages, selectedSector, searchQuery]);

  return (
    <div className="space-y-8 pb-16 text-right max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171616] via-[#2A1215] to-[#171616] text-white p-6 sm:p-10 border border-[#441C20] shadow-xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#B9142D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#B9142D]/30 border border-[#B9142D]/50 text-[#FCA5A5] px-3 py-1 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>حلول قطاعية متكاملة للشركات والمنشآت الكبرى (Turnkey B2B Solutions)</span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-4xl text-white leading-tight">
            باقات القطاعات الحيوية وتجهيز المنشآت
          </h1>

          <p className="text-sm sm:text-base text-[#D6D3D1] leading-relaxed">
            لا داعي للتشتت بين عشرات الموردين. توفر رواج باقات دعائية وإنشائية متكاملة مصممة خصيصاً لكل قطاع، تجمع بين المطبوعات الرسمية، الهويات، الزي الموحد، اللوحات الإعلانية، وتغليف المنتجات بإشراف هندسي وتنفيذي موحد وتسليم مفتاح.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>مورد معتمد موحد</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تطابق ألوان الهوية ١٠٠٪</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>توفير حتى ٣٠٪ بالتسعير المجمع</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>إشراف وتركيب ميداني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#B9142D]" />
            <span className="font-heading font-bold text-sm text-[#171616] dark:text-[#F5F3EF]">
              اختر قطاع نشاطك التجاري:
            </span>
          </div>
          <div className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            عرض <strong>{filteredPackages.length}</strong> باقة مخصصة
          </div>
        </div>

        {/* Scrollable Sector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
          {SECTOR_FILTERS.map((s) => {
            const isActive = selectedSector === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSelectedSector(s.key)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? 'bg-[#B9142D] text-white border-[#B9142D] shadow-md scale-102'
                    : 'bg-[#FFFDFA] dark:bg-[#1C1A1A] text-[#57534E] dark:text-[#D6D3D1] border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D]/50 hover:bg-[#FAF7F2]'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => {
          const breakdownCount = pkg.items_breakdown?.length || pkg.service_ids?.length || 0;

          return (
            <div
              key={pkg.id}
              className="group bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner */}
                <div className="aspect-16/10 relative overflow-hidden bg-[#F5F1E9] dark:bg-[#252222]">
                  <SafeImage
                    src={pkg.hero_image}
                    alt={pkg.title_ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackCategory={pkg.title_ar}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5 z-10">
                    {pkg.badge && (
                      <span className="bg-[#B9142D] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                        {pkg.badge}
                      </span>
                    )}
                    {pkg.turnaround_time_ar && (
                      <span className="bg-black/70 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{pkg.turnaround_time_ar}</span>
                      </span>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 right-3 left-3 text-white z-10">
                    {pkg.target_sector_ar && (
                      <div className="text-[11px] text-amber-300 font-bold mb-1 line-clamp-1">
                        {pkg.target_sector_ar}
                      </div>
                    )}
                    <h2 className="font-heading font-black text-base sm:text-lg text-white leading-snug drop-shadow-sm">
                      {pkg.title_ar}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Tagline */}
                  <p className="text-xs text-[#57534E] dark:text-[#D6D3D1] leading-relaxed line-clamp-2">
                    {pkg.tagline_ar}
                  </p>

                  {/* Items Breakdown Highlights */}
                  {pkg.items_breakdown && pkg.items_breakdown.length > 0 ? (
                    <div className="space-y-2 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F]">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#171616] dark:text-white">
                        <span className="flex items-center gap-1 text-[#B9142D]">
                          <Layers className="w-3.5 h-3.5" />
                          <span>محتويات الباقة الرئيسية:</span>
                        </span>
                        <span className="text-[10px] bg-[#B9142D]/10 text-[#B9142D] px-1.5 py-0.5 rounded">
                          {breakdownCount} بنود متكاملة
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 pt-1">
                        {pkg.items_breakdown.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#57534E] dark:text-[#A8A29E]">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1 font-medium text-[#171616] dark:text-white">
                              {item.name_ar}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : pkg.benefits_ar && (
                    <div className="space-y-1.5 pt-2 border-t border-[#F5F1E9] dark:border-[#252222]">
                      {pkg.benefits_ar.slice(0, 3).map((b, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-[#57534E] dark:text-[#D6D3D1]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ideal For callout */}
                  {pkg.ideal_for_ar && (
                    <div className="text-[11px] text-[#78716C] dark:text-[#A8A29E] bg-amber-500/5 dark:bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 line-clamp-2">
                      <strong className="text-amber-800 dark:text-amber-300">لمن صممت: </strong>
                      <span>{pkg.ideal_for_ar}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 pt-0 space-y-2">
                <button
                  onClick={() => navigate({ view: 'package-detail', packageId: pkg.id })}
                  className="w-full bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs group-hover:shadow-md"
                >
                  <span>استعراض الباقة وتخصيص البنود</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Enterprise Consultation Box */}
      <div className="bg-[#FAF7F2] dark:bg-[#1E1B1A] rounded-3xl p-6 sm:p-8 border border-[#E7E0D3] dark:border-[#332F2F] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2.5 py-0.5 rounded-md">
            <Briefcase className="w-3.5 h-3.5" />
            <span>عقود التوريد السنوية والمشاريع الخاصة</span>
          </div>
          <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#171616] dark:text-white">
            هل تحتاج باقة مخصصة لمؤسستك أو مناقصة توريد كبرى؟
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E] leading-relaxed">
            فريق المهندسين والمستشارين الفنيين في رواج جاهز لدراسة متطلبات منشأتك، إعداد جداول الكميات (BOQ)، وتقديم عروض أسعار تفصيلية تنافسية مع زيارة ميدانية مجانية للموقع.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أرغب في استشارة فنية وطلب عرض سعر مخصص لباقة توريد للشركات.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>استشارة فورية عبر واتساب</span>
            </a>
          )}
          <button
            onClick={() => navigate({ view: 'custom-quote' })}
            className="bg-[#171616] dark:bg-[#332F2F] hover:bg-black text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>طلب معاينة وتخصيص</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export const PackageDetailView: React.FC<{ packageId: string }> = ({ packageId }) => {
  const { packages, services, addToQuote, navigate, siteSettings } = useApp();
  const [isAddedToQuote, setIsAddedToQuote] = useState(false);
  const whatsappNumber = (siteSettings?.mobile_whatsapp || '').replace(/\D/g, '');
  const whatsappNumber = (siteSettings?.mobile_whatsapp || '').replace(/\D/g, '');

  const pkg = packages.find((p) => p.id === packageId);

  if (!pkg) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-heading font-bold text-[#171616] dark:text-white">الباقة غير موجودة</h2>
        <button 
          onClick={() => navigate({ view: 'packages' })} 
          className="bg-[#B9142D] text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          العودة لكافة الباقات
        </button>
      </div>
    );
  }

  const packageServices = services.filter((s) => (pkg.service_ids || []).includes(s.id));

  const handleAddAllToQuote = () => {
    packageServices.forEach((s) => {
      addToQuote(
        s,
        1,
        {},
        [{ label: 'ضمن الباقة', value: pkg.title_ar }],
        `تمت الإضافة ضمن ${pkg.title_ar}`,
        'ready'
      );
    });
    setIsAddedToQuote(true);
    setTimeout(() => {
      navigate({ view: 'quote-cart' });
    }, 600);
  };

  return (
    <div className="space-y-8 pb-20 text-right max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#78716C] dark:text-[#A8A29E]">
        <button onClick={() => navigate({ view: 'home' })} className="hover:text-[#B9142D]">الرئيسية</button>
        <span>/</span>
        <button onClick={() => navigate({ view: 'packages' })} className="hover:text-[#B9142D]">باقات القطاعات</button>
        <span>/</span>
        <span className="text-[#171616] dark:text-white font-bold">{pkg.title_ar}</span>
      </nav>

      {/* Main Package Showcase Card */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-3xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden p-5 sm:p-8 space-y-8 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#F5F1E9] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] shadow-sm">
              <SafeImage 
                src={pkg.hero_image} 
                alt={pkg.title_ar} 
                className="w-full h-full object-cover" 
                fallbackCategory={pkg.title_ar}
              />
            </div>

            {/* Quick Badges & Meta */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B9142D]" />
                <div>
                  <div className="text-[10px] text-[#78716C]">مدة التوريد:</div>
                  <div className="font-bold text-[#171616] dark:text-white">{pkg.turnaround_time_ar || '٥ - ٨ أيام'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-[10px] text-[#78716C]">الضمان:</div>
                  <div className="font-bold text-[#171616] dark:text-white">ضمان شامل معتمد</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & CTA Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-3 py-1 rounded-full border border-[#B9142D]/20">
                  {pkg.badge || 'حلول قطاعية متكاملة'}
                </span>
                {pkg.target_sector_ar && (
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {pkg.target_sector_ar}
                  </span>
                )}
              </div>

              <h1 className="font-heading font-black text-xl sm:text-3xl text-[#171616] dark:text-white leading-tight">
                {pkg.title_ar}
              </h1>

              <p className="text-xs sm:text-sm text-[#B9142D] font-bold">
                {pkg.tagline_ar}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
              {pkg.description_ar}
            </p>

            {/* Ideal For */}
            {pkg.ideal_for_ar && (
              <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-[#57534E] dark:text-[#D6D3D1] space-y-1">
                <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>لمن صممت هذه المنظومة:</span>
                </div>
                <p className="leading-relaxed">{pkg.ideal_for_ar}</p>
              </div>
            )}

            {/* Core Benefits */}
            {pkg.benefits_ar && pkg.benefits_ar.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-[#171616] dark:text-white">مميزات الحصول على الباقة الموحدة:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.benefits_ar.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#57534E] dark:text-[#D6D3D1]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleAddAllToQuote}
                className="flex-1 bg-[#B9142D] hover:bg-[#930F23] text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAddedToQuote ? 'تمت إضافة جميع بنود الباقة!' : 'طلب عرض سعر متكامل لجميع بنود الباقة'}</span>
              </button>

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`السلام عليكم، أرغب في استشارة وتخصيص بنود: ${pkg.title_ar}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>استشارة واتساب</span>
                </a>
              )}
            </div>

          </div>

        </div>

        {/* Detailed Items Breakdown Table */}
        {pkg.items_breakdown && pkg.items_breakdown.length > 0 && (
          <div className="pt-8 border-t border-[#E7E0D3] dark:border-[#332F2F] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#B9142D]" />
                  <span>التفصيل الهندسي والمواصفات لبنود الباقة ({pkg.items_breakdown.length} بنود)</span>
                </h2>
                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-0.5">
                  يمكن تعديل أو إضافة أو حذف أي بند حسب المساحة والميزانية المطلوبة لمنشأتك
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {pkg.items_breakdown.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] space-y-2 hover:border-[#B9142D]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#B9142D] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-[#171616] dark:text-white">
                        {item.name_ar}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                    {item.description_ar}
                  </p>

                  {item.specs_hint_ar && (
                    <div className="text-[11px] bg-white dark:bg-[#1C1A1A] text-[#78716C] dark:text-[#D6D3D1] p-2 rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] font-mono">
                      ⚙️ المواصفات المقترحة: {item.specs_hint_ar}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Included Rawaj Services Grid */}
        <div className="pt-8 border-t border-[#E7E0D3] dark:border-[#332F2F] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white">
              خدمات رواج الأساسية المشمولة في الباقة ({packageServices.length} خدمات):
            </h2>
            <span className="text-xs text-[#78716C]">انقر على أي خدمة للاطلاع على خيارات التسعير الفردية</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {packageServices.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate({ view: 'service-detail', serviceId: service.id })}
                className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D] cursor-pointer flex items-center gap-3.5 transition-all hover:shadow-xs group"
              >
                <img 
                  src={service.hero_image} 
                  alt={service.name_ar} 
                  className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" 
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-[#171616] dark:text-white truncate group-hover:text-[#B9142D] transition-colors">
                    {service.name_ar}
                  </h3>
                  <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E] line-clamp-1">
                    {service.short_description_ar}
                  </p>
                  <div className="text-[10px] text-emerald-600 font-bold">
                    جاهز للطلب والتخصيص ←
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
