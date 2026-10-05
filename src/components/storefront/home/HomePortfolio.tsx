import React, { useState, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { ArrowLeft, ChevronRight, ChevronLeft, MapPin, Calendar, Briefcase, Eye, Sparkles, Image as ImageIcon } from 'lucide-react';

export const HomePortfolio: React.FC = () => {
  const { portfolioProjects, navigate } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'corporate', label: 'المقرات والواجهات' },
    { id: 'events', label: 'الفعاليات والمؤتمرات' },
    { id: 'branding', label: 'الهويات والمطبوعات' },
    { id: 'packaging', label: 'التغليف والعلب الفاخرة' },
  ];

  const filteredProjects = portfolioProjects.filter((proj) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'corporate') return proj.client_type_ar?.includes('شركات') || proj.title_ar?.includes('مقر') || proj.title_ar?.includes('واجهة');
    if (selectedFilter === 'events') return proj.client_type_ar?.includes('فعاليات') || proj.title_ar?.includes('معرض') || proj.title_ar?.includes('مؤتمر');
    if (selectedFilter === 'branding') return proj.title_ar?.includes('هوية') || proj.title_ar?.includes('مطبوعات');
    if (selectedFilter === 'packaging') return proj.title_ar?.includes('تغليف') || proj.title_ar?.includes('علب') || proj.title_ar?.includes('أكياس');
    return true;
  });

  const displayList = filteredProjects.length > 0 ? filteredProjects : portfolioProjects;
  const currentProject = displayList[activeSlideIndex] || displayList[0];

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % displayList.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* 1. Header & Filter Chips */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary-15 text-brand-primary dark:text-[#F3A6B2] text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>معرض الإنجازات والتنفيذ الفعلي</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-heading font-black text-[#171616] dark:text-white">
              نماذج من مشاريع وتطبيقات رواج المعتمدة
            </h3>
          </div>

          <button
            onClick={() => navigate({ view: 'portfolio' })}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white dark:bg-[#252220] border border-[#EBE4D5] dark:border-[#352F2D] text-xs font-bold text-[#171616] dark:text-white hover:border-brand-primary transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>سجل الأعمال الكامل</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedFilter(cat.id);
                setActiveSlideIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-gradient-to-r from-brand-primary to-[#8B0E23] text-white shadow-md'
                  : 'bg-white dark:bg-[#221F1E] text-[#746E67] dark:text-[#A0988F] border border-[#EBE4D5] dark:border-[#332E2C] hover:bg-[#F5F0E5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Cinematic Showcase Card */}
      {currentProject && (
        <div className="relative rounded-3xl overflow-hidden border border-[#EBE4D5] dark:border-[#332E2C] bg-[#141212] shadow-2xl min-h-[320px] sm:min-h-[420px] md:min-h-[460px] flex flex-col justify-end group">
          
          {/* Main Photo Background */}
          <div className="absolute inset-0">
            <SafeImage
              src={currentProject.images?.[0] || ''}
              alt={currentProject.title_ar}
              fallbackCategory={currentProject.industry || currentProject.title_ar}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />

          {/* Top Info Tags */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-brand-primary/90 backdrop-blur-md text-white text-[11px] font-black shadow-lg">
              {currentProject.client_type_ar || 'مقر معتمد'}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-mono font-bold flex items-center gap-1.5 border border-white/10">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>{currentProject.year || '2026'}</span>
            </span>
          </div>

          {/* Navigation Arrows on Image Sides */}
          <div className="absolute inset-y-0 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 rounded-2xl bg-black/60 hover:bg-brand-primary text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              title="المشروع التالي"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 rounded-2xl bg-black/60 hover:bg-brand-primary text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              title="المشروع السابق"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-20 p-5 sm:p-8 space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentProject.city} — تنفيذ وإشراف فريق رواج الفني</span>
            </div>

            <h4 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white leading-tight">
              {currentProject.title_ar}
            </h4>

            <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed max-w-2xl">
              {currentProject.short_description_ar}
            </p>

            {/* Actions Row */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate({ view: 'portfolio', projectId: currentProject.id })}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-[#8B0E23] hover:opacity-95 text-white text-xs sm:text-sm font-black shadow-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>افتح تفاصيل المشروع ومعرض الصور</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="text-white/60 font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                {activeSlideIndex + 1} / {displayList.length}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
