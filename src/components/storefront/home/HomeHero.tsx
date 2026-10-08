import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2, Factory } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';

interface HomeHeroProps {
  onExploreServices: () => void;
  onCustomQuote: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onExploreServices, onCustomQuote }) => {
  const { homeSlides, heroHeaderSettings, siteSettings } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = useMemo(() => {
    const published = homeSlides
      .filter((slide) => slide.is_active)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((slide) => ({
        id: slide.id,
        badge: slide.badge_ar || '',
        title: slide.title_ar,
        desc: slide.subtitle_ar,
        image: slide.image_url,
      }));

    if (published.length > 0) return published;

    if (heroHeaderSettings.enabled && heroHeaderSettings.bg_image_url) {
      return [{
        id: 'hero-header',
        badge: heroHeaderSettings.badge_ar || '',
        title: heroHeaderSettings.welcome_title_ar || heroHeaderSettings.company_name_ar || siteSettings.company_name_ar,
        desc: heroHeaderSettings.welcome_subtitle_ar || heroHeaderSettings.slogan_ar || siteSettings.slogan_ar,
        image: heroHeaderSettings.bg_image_url,
      }];
    }

    return [];
  }, [homeSlides, heroHeaderSettings, siteSettings.company_name_ar, siteSettings.slogan_ar]);

  useEffect(() => {
    if (activeSlide >= heroSlides.length) setActiveSlide(0);
  }, [activeSlide, heroSlides.length]);

  if (heroSlides.length === 0) return null;

  const currentSlide = heroSlides[activeSlide] || heroSlides[0];

  return (
    <div className="space-y-3">
      <section className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#171616] text-white min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] flex flex-col justify-between p-5 sm:p-8 lg:p-12 shadow-md border border-black/10 dark:border-white/10 group transition-all">
        <div className="absolute inset-0">
          <SafeImage
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center scale-102 transition-all duration-700 ease-out"
            loading="eager"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/80 to-[#141211]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#141211]/40 to-[#141211]/90 pointer-events-none hidden sm:block" />

        <div className="relative z-10 flex items-center justify-between gap-3">
          {currentSlide.badge ? (
            <div className="inline-flex items-center gap-2 bg-[#B9142D] text-white px-3 py-1 rounded-[10px] text-[11px] sm:text-xs font-bold shadow-sm backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{currentSlide.badge}</span>
            </div>
          ) : <span />}

          {heroSlides.length > 1 && (
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`الشريحة ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-6 bg-[#B9142D]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4 pt-6 sm:pt-10">
          <div className="space-y-1 sm:space-y-2">
            {siteSettings.slogan_ar && (
              <span className="text-xs sm:text-sm font-semibold text-[#F5F1E9]/80 tracking-wider">
                {siteSettings.slogan_ar}
              </span>
            )}
            <h1 className="font-heading font-black text-[24px] sm:text-[36px] lg:text-[44px] text-[#FFFDF9] leading-[1.2] tracking-tight">
              {currentSlide.title}
            </h1>
          </div>

          {currentSlide.desc && (
            <p className="text-[12px] sm:text-[14px] text-[#EEE9E0] leading-relaxed max-w-xl line-clamp-3">
              {currentSlide.desc}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreServices}
              className="touch-target bg-[#B9142D] hover:bg-[#951126] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-[14px] flex items-center gap-2 transition-all shadow-md active:scale-[0.98]"
            >
              <span>استكشف الكتالوج والخدمات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onCustomQuote}
              className="touch-target bg-white/95 hover:bg-white text-[#171616] text-xs sm:text-sm font-bold px-4.5 py-3 rounded-[14px] flex items-center gap-2 transition-all shadow-sm backdrop-blur-xs active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#B9142D]" />
              <span>طلب مواصفة خاصة</span>
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] flex items-center justify-center shrink-0 font-bold text-xs">
            {siteSettings.founding_year ? new Date().getFullYear() - siteSettings.founding_year : '—'}
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">سنوات خبرة</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">خبرة رواج المتراكمة</div>
          </div>
        </div>

        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#16834A]/10 text-[#16834A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">كتالوج قابل للتخصيص</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">الخدمات مرتبطة بقاعدة البيانات</div>
          </div>
        </div>

        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#B46A15]/10 text-[#B46A15] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">مواصفات مخصصة</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">عرض سعر حسب متطلبات المشروع</div>
          </div>
        </div>

        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] flex items-center justify-center shrink-0">
            <Factory className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">تنفيذ وتوريد</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">حلول إنتاج متكاملة</div>
          </div>
        </div>
      </div>
    </div>
  );
};
