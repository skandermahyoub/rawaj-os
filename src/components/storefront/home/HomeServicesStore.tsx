import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  ShoppingBag, 
  SlidersHorizontal, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Heart,
  ChevronLeft
} from 'lucide-react';
import { Service } from '../../../types';

export const HomeServicesStore: React.FC = () => {
  const { services, departments, addToQuote, navigate, toggleWishlist, wishlistedServiceIds } = useApp();
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filter published services
  const publishedServices = services.filter((s) => s.service_status === 'published');

  const filteredServices = publishedServices.filter((service) => {
    if (selectedDeptId === 'all') return true;
    return service.department_id === selectedDeptId;
  });

  const handleQuickAdd = (service: Service, e: React.MouseEvent) => {
    e.stopPropagation();
    addToQuote(
      service,
      100,
      {},
      [{ label: 'الكمية الافتراضية', value: '100 قطعة' }],
      'طلب إضافة سريعة من كاتلوج الخدمات المعتمدة — جاهز للمواصفات',
      'ready'
    );
    setQuickAddedId(service.id);
    setTimeout(() => setQuickAddedId(null), 2000);
  };

  const handleOpenDetailWithSpecs = (serviceId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigate({ view: 'service-detail', serviceId });
  };

  return (
    <section className="space-y-6">
      
      {/* 1. Header Banner inside Storefront */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div className="space-y-2 text-right">
          {/* Floating Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary-10 border border-brand-primary-30 text-brand-primary text-xs font-bold shadow-2xs">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>كتالوج المنتجات والخدمات الفنية المعتمدة</span>
          </div>

          {/* Big Bold Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#171616] dark:text-[#F7F5F0] leading-tight">
            حلول الطباعة التجارية، الواجهات، والتغليف الفاخر
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#70695F] dark:text-[#A8A196] max-w-2xl leading-relaxed">
            مواصفات هندسية دقيقة، خامات مستوردة، وخيارات تشطيب راقية تشمل البصمة الحرارية والسبوت يو في البارز.
          </p>
        </div>

        {/* Enter Full Store CTA Button */}
        <button
          onClick={() => navigate({ view: 'services' })}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-[#171616] dark:bg-[#F7F5F0] text-white dark:text-[#171616] hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>تصفح الكتالوج الشامل ({publishedServices.length})</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Scrollable Department Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedDeptId('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedDeptId === 'all'
              ? 'bg-brand-primary text-white shadow-xs'
              : 'bg-white dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] border border-[#E8E2D5] dark:border-[#2D2A26] hover:bg-[#F3EFEA] dark:hover:bg-[#24211E]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>جميع الخدمات ({publishedServices.length})</span>
        </button>
        
        {departments.map((dept) => {
          const count = publishedServices.filter((s) => s.department_id === dept.id).length;
          const isSelected = selectedDeptId === dept.id;
          return (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'bg-white dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] border border-[#E8E2D5] dark:border-[#2D2A26] hover:bg-[#F3EFEA] dark:hover:bg-[#24211E]'
              }`}
            >
              {dept.name_ar} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* 3. High-Fidelity Clean Product & Service Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {filteredServices.map((service) => {
          const dept = departments.find((d) => d.id === service.department_id);
          const isAdded = quickAddedId === service.id;
          const isWishlisted = wishlistedServiceIds?.includes(service.id);

          return (
            <div
              key={service.id}
              onClick={() => handleOpenDetailWithSpecs(service.id)}
              className="bg-white dark:bg-[#141211] rounded-2xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs hover:border-brand-primary-30 transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative h-36 sm:h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={service.hero_image}
                  alt={service.name_ar}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                
                {/* Overlaid Badges */}
                {service.badge && (
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-brand-primary text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {service.badge}
                    </span>
                  </div>
                )}

                {/* Wishlist Heart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(service.id);
                  }}
                  className={`absolute top-2.5 left-2.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl backdrop-blur-md transition-all ${
                    isWishlisted
                      ? 'bg-rose-600 text-white'
                      : 'bg-black/50 text-white/90 hover:bg-black/70 hover:text-rose-400'
                  }`}
                  title="إضافة للمفضلة"
                >
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold text-brand-accent">
                  {dept?.name_ar || 'خدمة معتمدة'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h4 className="font-heading font-black text-xs sm:text-sm md:text-base text-[#171616] dark:text-[#F7F5F0] group-hover:text-brand-primary transition-colors line-clamp-1">
                    {service.name_ar}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#70695F] dark:text-[#A8A196] line-clamp-2 mt-1 leading-relaxed">
                    {service.short_description_ar}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-[#E8E2D5]/70 dark:border-[#262320] flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => handleOpenDetailWithSpecs(service.id, e)}
                    className="flex-1 py-1.5 sm:py-2 px-2 rounded-xl bg-[#FAF8F5] dark:bg-[#1C1918] hover:bg-brand-primary hover:text-white text-[#171616] dark:text-[#F7F5F0] text-[10px] sm:text-xs font-bold border border-[#E8E2D5] dark:border-[#2D2A26] transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>مواصفات</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickAdd(service, e)}
                    className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-[#171616] dark:bg-[#F7F5F0] text-white dark:text-[#171616] border-transparent hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white'
                    }`}
                    title="إضافة سريعة لطلب التسعير"
                  >
                    {isAdded ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. Bottom View All Bar */}
      <div className="pt-2 text-center">
        <button
          onClick={() => navigate({ view: 'services' })}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#1A1816] hover:bg-brand-primary dark:hover:bg-brand-primary text-[#171616] dark:text-[#F7F5F0] hover:text-white dark:hover:text-white border border-[#E8E2D5] dark:border-[#2D2A26] font-bold text-xs transition-all shadow-2xs cursor-pointer"
        >
          <span>استكشاف جميع منتجات وخدمات الأقسام</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
