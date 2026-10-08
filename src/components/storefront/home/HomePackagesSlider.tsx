import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  ShoppingBag,
  Layers,
  ShieldCheck,
  Building2,
  Check
} from 'lucide-react';

export const HomePackagesSlider: React.FC = () => {
  const { packages, services, navigate } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (packages.length === 0) return null;

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll('.package-card');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % packages.length;
    scrollToSlide(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + packages.length) % packages.length;
    scrollToSlide(prevIndex);
  };

  // Sync current index on manual scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.querySelector('.package-card')?.clientWidth || 340;
    const newIndex = Math.round(Math.abs(scrollLeft) / (cardWidth + 24));
    if (newIndex >= 0 && newIndex < packages.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const handleOpenPackage = (packageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ view: 'package-detail', packageId });
  };

  return (
    <section className="relative w-full py-10 sm:py-16 bg-[#12100F] text-[#F7F4EE] rounded-3xl border border-[#2B2623] overflow-hidden my-4 shadow-xl">
      
      {/* Background Architectural Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B9142D]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 pb-4 border-b border-[#26211E]">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B9142D]/15 text-[#E03A53] border border-[#B9142D]/30 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>حلول رواج المتكاملة حسب هدف المشروع</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white leading-tight">
              اختر ما تريد إنجازه، ثم اختر مستوى الباقة
            </h2>
            
            <p className="text-xs sm:text-sm text-[#A69C8E] max-w-2xl leading-relaxed font-medium">
              باقات عملية تجمع الخدمات المناسبة لنتيجة واضحة: إطلاق علامة، افتتاح فرع، تجهيز متجر، إطلاق منتج، فعالية أو تجديد بصري.
            </p>
          </div>

          {/* Navigation Controls & View All Link */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            
            {/* View All Button */}
            <button
              onClick={() => navigate({ view: 'packages' })}
              className="px-4 py-2.5 rounded-xl bg-[#1A1817] hover:bg-[#25211F] text-[#EBE4D5] hover:text-white border border-[#332C28] hover:border-[#D4AF37]/50 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>جميع الباقات ({packages.length})</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            {/* Slider Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-[#1A1817] border border-[#332C28] text-white hover:bg-[#B9142D] hover:border-[#B9142D] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="الباقة السابقة"
                aria-label="Previous Package"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-[#1A1817] border border-[#332C28] text-white hover:bg-[#B9142D] hover:border-[#B9142D] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="الباقة التالية"
                aria-label="Next Package"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Elegant Sliding Horizontal Carousel */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {packages.map((pkg, idx) => {
            const pkgServices = services.filter((s) => (pkg.service_ids || []).includes(s.id));

            return (
              <div
                key={pkg.id}
                onClick={() => navigate({ view: 'package-detail', packageId: pkg.id })}
                className="package-card w-[86vw] sm:w-[380px] md:w-[420px] shrink-0 snap-center sm:snap-start bg-[#181514] rounded-2xl border border-[#2B2623] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl"
              >
                {/* Visual Banner Header */}
                <div className="relative h-44 sm:h-52 overflow-hidden bg-[#12100F]">
                  <SafeImage
                    src={pkg.hero_image}
                    alt={pkg.title_ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    fallbackCategory="الباقات"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181514] via-[#181514]/40 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#B9142D] text-white text-[10px] font-bold shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#F3C64F]" />
                      <span>{pkg.badge || 'باقة متكاملة'}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#D4AF37] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#D4AF37]/20">
                      {pkg.tiers?.length || 1} مستويات · {pkgServices.length} خدمات
                    </span>
                    <span className="text-[10px] font-mono text-[#A69C8E] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                      0{idx + 1} / 0{packages.length}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 text-right">
                  <div className="space-y-2">
                    <h3 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {pkg.title_ar}
                    </h3>
                    
                    <p className="text-[11px] sm:text-xs text-[#A69C8E] leading-relaxed line-clamp-2">
                      {pkg.tagline_ar || pkg.description_ar}
                    </p>
                  </div>

                  {/* Included Services Checklist */}
                  <div className="p-3 rounded-xl bg-[#131110] border border-[#241F1C] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-brand-accent">
                      <span>الخدمات المشمولة في الباقة:</span>
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {pkgServices.slice(0, 4).map((s) => (
                        <div key={s.id} className="flex items-center gap-1.5 text-[11px] text-[#C2B7A7]">
                          <Check className="w-3 h-3 text-brand-accent shrink-0" />
                          <span className="truncate">{s.name_ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-2 border-t border-[#26211E] flex items-center gap-2">
                    <button
                      onClick={(e) => handleOpenPackage(pkg.id, e)}
                      className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm bg-brand-primary hover:bg-brand-hover text-white border border-white/20"
                    >
                      <Sparkles className="w-4 h-4 text-brand-accent" />
                      <span>استعراض المستويات والتخصيص</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ view: 'package-detail', packageId: pkg.id });
                      }}
                      className="p-2.5 rounded-xl bg-[#221E1C] hover:bg-[#2C2724] text-[#C2B7A7] hover:text-white border border-[#332C28] transition-colors cursor-pointer"
                      title="تفاصيل الباقة والمواصفات"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {packages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? 'w-8 bg-[#B9142D]' 
                  : 'w-2 bg-[#332C28] hover:bg-[#4A423E]'
              }`}
              aria-label={`انتقال للباقة ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
