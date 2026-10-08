import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { PromoBanner } from '../../../types';
import { 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Tag, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  MessageSquare,
  ShieldCheck,
  Percent
} from 'lucide-react';

export const HomePromoBanners: React.FC = () => {
  const { promoSettings, siteSettings, footerSettings, navigate } = useApp();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeBanners = promoSettings.enabled && promoSettings.banners 
    ? promoSettings.banners.filter((b) => b.is_active).sort((a, b) => a.sort_order - b.sort_order)
    : [];

  const autoplaySpeed = promoSettings.autoplay_speed !== undefined ? promoSettings.autoplay_speed : 5000;

  // Autoplay effect
  useEffect(() => {
    if (isHovered || activeBanners.length <= 1 || autoplaySpeed <= 0) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % activeBanners.length);
    }, autoplaySpeed);
    return () => clearInterval(timer);
  }, [isHovered, activeBanners.length, autoplaySpeed]);

  if (!promoSettings.enabled || activeBanners.length === 0) return null;

  const currentBanner = activeBanners[carouselIndex] || activeBanners[0];

  const handleBannerClick = (banner: PromoBanner) => {
    if (banner.link_view) {
      navigate({ view: banner.link_view as any });
    } else {
      navigate({ view: 'packages' });
    }
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      // Swiped Left in RTL -> Next slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right in RTL -> Prev slide
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Background style according to bg_shade
  const getBackgroundGradient = () => {
    switch (promoSettings.bg_shade) {
      case 'deep_burgundy':
        return 'from-[#540815] via-[#750A1E] to-[#3B040D]';
      case 'ruby_red':
        return 'from-[#961026] via-[#B9142D] to-[#73091B]';
      case 'royal_crimson':
      default:
        return 'from-[#7A0B1E] via-[#A00E26] to-[#4F0511]';
    }
  };

  return (
    <section 
      aria-label="العروض الترويجية الحصرية"
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        CRITICAL REQUIREMENT:
        Red luxury backdrop for BOTH Light & Dark modes.
        Enriched with gold ambient light and subtle geometric pattern.
      */}
      <div className={`relative w-full bg-gradient-to-br ${getBackgroundGradient()} text-white p-5 sm:p-8 lg:p-10 border border-[#D4AF37]/35 shadow-2xl overflow-hidden rounded-3xl`}>
        
        {/* Layer 1: Ambient Decorative Lighting (Gold & Deep Crimson) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FF4766]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Layer 2: Subtle Architectural Geometric Mesh Pattern */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
          aria-hidden="true"
        />

        {/* Top Header of the Red Promo Carousel */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-white/15">
          <div className="space-y-1 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-[#D4AF37]/40 text-[#FDE047] text-xs font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{promoSettings.title_ar || 'العروض الترويجية والحملات الحصرية'}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FCEBEB] font-medium leading-relaxed">
              {promoSettings.subtitle_ar || 'عروض إنتاجية شاملة صممت خصيصاً لرواد الأعمال، الشركات، وسلاسل الضيافة'}
            </p>
          </div>

          {/* Navigation Controls: Counter & Prev/Next Arrows */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {/* Slide Index Counter */}
            <div className="px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono font-bold">
              <span className="text-[#FDE047] font-extrabold">{String(carouselIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-white/40">/</span>
              <span>{String(activeBanners.length).padStart(2, '0')}</span>
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-1.5" dir="ltr">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl bg-black/30 hover:bg-black/55 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="العرض السابق"
                aria-label="Previous Offer"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-black/30 hover:bg-black/55 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="العرض التالي"
                aria-label="Next Offer"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* The Carousel Main Stage */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Visual Media Showcase Frame (5 Cols on Desktop) */}
            <div 
              className="lg:col-span-5 order-1 lg:order-2 cursor-pointer group"
              onClick={() => handleBannerClick(currentBanner)}
            >
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/25 shadow-2xl bg-black/40">
                <SafeImage
                  key={currentBanner.id}
                  src={currentBanner.image_url}
                  alt={currentBanner.title_ar}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  fallbackCategory="العروض"
                />
                
                {/* Subtle dark gradient scrim at the bottom of the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Discount Tag Badge */}
                {currentBanner.discount_tag && (
                  <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-heading font-black text-xs sm:text-sm shadow-lg border border-white/30 flex items-center gap-1.5 animate-pulse">
                    <Percent className="w-3.5 h-3.5 text-black" />
                    <span>{currentBanner.discount_tag}</span>
                  </div>
                )}

                {/* Badge Indicator in the bottom of image */}
                {currentBanner.badge_ar && (
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] text-white/90">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 font-bold">
                      {currentBanner.badge_ar}
                    </span>
                    <span className="text-[10px] text-[#FDE047] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>ضمان الجودة الفنية</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Offer Details Prose & CTAs (7 Cols on Desktop) */}
            <div className="lg:col-span-7 order-2 lg:order-1 text-right space-y-4">
              
              {/* Timing or Badge Kicker */}
              <div className="flex flex-wrap items-center gap-2">
                {currentBanner.badge_ar && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#FFE2E6] border border-white/20 text-xs font-bold">
                    <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{currentBanner.badge_ar}</span>
                  </span>
                )}
                {currentBanner.valid_until && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#FDE047] font-semibold bg-black/20 px-2.5 py-0.5 rounded-lg border border-[#D4AF37]/30">
                    <Clock className="w-3 h-3" />
                    <span>{currentBanner.valid_until}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 
                onClick={() => handleBannerClick(currentBanner)}
                className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight cursor-pointer hover:text-[#FDE047] transition-colors"
              >
                {currentBanner.title_ar}
              </h3>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm sm:leading-relaxed text-[#FDE8E8] line-clamp-3 font-normal max-w-2xl">
                {currentBanner.subtitle_ar}
              </p>

              {/* Highlights Checklist if provided */}
              {currentBanner.highlights && currentBanner.highlights.length > 0 && (
                <div className="space-y-1.5 py-2">
                  {currentBanner.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/95">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Action Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBannerClick(currentBanner)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#F59E0B] hover:brightness-110 text-[#171206] font-heading font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{currentBanner.cta_text_ar || 'احجز العرض واستشر مهندسنا'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Direct Sales WhatsApp Quick Contact Button */}
                <a
                  href={`https://wa.me/${(siteSettings.mobile_whatsapp || footerSettings.mobile_whatsapp || '+967770000000').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`مرحباً وكالة رواج، أود الاستفسار والحجز بخصوص: ${currentBanner.title_ar}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-2xl bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/25 hover:border-white/50 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>تواصل مباشر للطلب</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Carousel Progress Indicators / Dots Bar */}
        {activeBanners.length > 1 && (
          <div className="relative z-10 flex items-center justify-center gap-2 pt-6 sm:pt-8 mt-6 border-t border-white/10">
            {activeBanners.map((banner, idx) => {
              const isActive = carouselIndex === idx;
              return (
                <button
                  key={banner.id}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'w-10 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] shadow-md ring-2 ring-white/30' 
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`انتقل إلى العرض ${idx + 1}`}
                  title={banner.title_ar}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
