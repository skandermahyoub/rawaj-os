import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SectionHeader } from './SectionHeader';
import { SafeImage } from '../../common/SafeImage';
import { ArrowLeft, Sparkles, Sliders, ChevronLeft } from 'lucide-react';

export const MostRequestedGrid: React.FC = () => {
  const { services, departments, navigate } = useApp();
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'الأكثر طلباً' },
    { id: 'dept-paper', label: 'المطبوعات الورقية' },
    { id: 'dept-packaging', label: 'التغليف والعلب' },
    { id: 'dept-signage', label: 'اللوحات والواجهات' },
    { id: 'dept-labels', label: 'الملصقات والرول' },
    { id: 'dept-apparel', label: 'الملابس والتطريز' },
  ];

  const filteredServices = services.filter((s) => {
    if (s.service_status !== 'published') return false;
    if (selectedTab === 'all') return s.most_requested || s.featured;
    return s.department_id === selectedTab;
  });

  const displayServices = filteredServices.slice(0, 6);
  const spotlightService = displayServices[0];
  const gridServices = displayServices.slice(1, 5);

  if (displayServices.length === 0) return null;

  return (
    <section className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[26px] sm:rounded-[30px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-xs">
      
      {/* Clear Distinct Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B9142D] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 px-2.5 py-0.5 rounded-[6px] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الكتالوج التجاري المباشر</span>
          </div>
          <h2 className="font-heading font-extrabold text-[17px] sm:text-[22px] text-[#171616] dark:text-[#F5F1EA]">
            الخدمات الأكثر طلباً وتنفيذاً للشركات
          </h2>
          <p className="text-[12px] text-[#746E67] dark:text-[#A0988F]">
            مطبوعات وتجهيزات أساسية تبدأ منها معظم مشاريع الشركات والمتاجر.
          </p>
        </div>

        <button
          onClick={() => navigate({ view: 'services' })}
          className="touch-target text-xs font-bold text-[#B9142D] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
        >
          <span>تصفح جميع الخدمات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs with Guaranteed No-Overlap & shrink-0 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`shrink-0 inline-flex items-center justify-center whitespace-nowrap px-4 py-2 rounded-[12px] text-xs font-bold transition-all ${
              selectedTab === tab.id
                ? 'bg-[#B9142D] text-white shadow-xs'
                : 'bg-[#F5F1E9] dark:bg-[#25211F] text-[#746E67] dark:text-[#A0988F] hover:text-[#171616] dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Spotlight Feature + Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        
        {/* Spotlight Card */}
        {spotlightService && (
          <div
            onClick={() => navigate({ view: 'service-detail', serviceId: spotlightService.id })}
            className="lg:col-span-5 group relative bg-[#F5F1E9] dark:bg-[#25211F] rounded-[22px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-[#B9142D]/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#E5DFD3] dark:bg-[#1E1B1A]">
              <SafeImage
                src={spotlightService.hero_image}
                alt={spotlightService.name_ar}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                fallbackCategory={spotlightService.name_ar}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="bg-[#B9142D] text-white text-[10px] font-bold px-2.5 py-1 rounded-[8px] shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>خدمة مميزة</span>
                </span>
                {spotlightService.badge && (
                  <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-[6px]">
                    {spotlightService.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-2.5 right-3 left-3 text-white">
                <span className="text-[10px] font-semibold text-white/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-[5px] inline-block mb-1">
                  {departments.find(d => d.id === spotlightService.department_id)?.name_ar}
                </span>
                <h3 className="font-heading font-extrabold text-[15px] sm:text-[17px] text-white leading-tight">
                  {spotlightService.name_ar}
                </h3>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-[12px] text-[#746E67] dark:text-[#A0988F] leading-relaxed line-clamp-2">
                {spotlightService.short_description_ar}
              </p>

              {/* Technical Specifications preview */}
              {spotlightService.specification_groups && spotlightService.specification_groups.length > 0 && (
                <div className="pt-2 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex flex-wrap gap-1.5 text-[10px] text-[#746E67] dark:text-[#A0988F]">
                  {spotlightService.specification_groups[0]?.fields.slice(0, 3).map((f) => (
                    <span key={f.id} className="bg-[#FFFDF9] dark:bg-[#1C1918] px-2 py-0.5 rounded-[6px] font-medium flex items-center gap-1 border border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)]">
                      <Sliders className="w-2.5 h-2.5 text-[#B9142D]" />
                      <span>{f.label_ar}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-[#B9142D] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 px-2.5 py-1 rounded-[8px]">
                  طلب عرض سعر
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#171616] dark:text-[#F5F1EA] group-hover:text-[#B9142D] transition-colors">
                  <span>تخصيص المواصفات</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary 2-Column Grid on Mobile / Tablet */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
          {gridServices.map((service) => {
            const dept = departments.find(d => d.id === service.department_id);
            return (
              <div
                key={service.id}
                onClick={() => navigate({ view: 'service-detail', serviceId: service.id })}
                className="group bg-[#F5F1E9] dark:bg-[#25211F] rounded-[18px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-[#B9142D]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-right"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#E5DFD3] dark:bg-[#1E1B1A]">
                  <SafeImage
                    src={service.hero_image}
                    alt={service.name_ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackCategory={service.name_ar}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {service.badge && (
                    <span className="absolute top-1.5 right-1.5 bg-[#B9142D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[5px]">
                      {service.badge}
                    </span>
                  )}
                  {dept && (
                    <span className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded-[4px] truncate max-w-[110px]">
                      {dept.name_ar}
                    </span>
                  )}
                </div>

                <div className="p-2.5 sm:p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-[12px] sm:text-[13px] text-[#171616] dark:text-[#F5F1EA] group-hover:text-[#B9142D] transition-colors line-clamp-1 leading-snug">
                      {service.name_ar}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#746E67] dark:text-[#A0988F] line-clamp-2 mt-0.5 leading-relaxed">
                      {service.short_description_ar}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#B9142D]">عرض سعر</span>
                    <span className="flex items-center gap-0.5 text-[#171616] dark:text-[#F5F1EA] group-hover:text-[#B9142D]">
                      تخصيص
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
