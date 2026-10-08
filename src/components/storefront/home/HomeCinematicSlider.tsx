import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronRight, ChevronLeft, ArrowLeft, Sparkles, Pause, Play, Eye } from 'lucide-react';

const SLIDE_DURATION_MS = 5500;

export const HomeCinematicSlider: React.FC = () => {
  const { homeSlides, navigate } = useApp();
  const activeSlides = homeSlides.filter((s) => s.is_active).sort((a, b) => a.sort_order - b.sort_order);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const progressRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeSlides.length === 0) {
      if (currentIndex !== 0) setCurrentIndex(0);
      progressRef.current = 0;
      setProgress(0);
      return;
    }

    if (currentIndex >= activeSlides.length) {
      setCurrentIndex(0);
      progressRef.current = 0;
      setProgress(0);
      lastTimeRef.current = null;
    }
  }, [activeSlides.length, currentIndex]);

  // Smooth frame-accurate animation loop for the progress bar
  useEffect(() => {
    if (activeSlides.length <= 1) return;

    let animationFrameId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isPaused && !isHovered) {
        progressRef.current += (delta / SLIDE_DURATION_MS) * 100;
        if (progressRef.current >= 100) {
          progressRef.current = 0;
          setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
        }
        setProgress(Math.min(progressRef.current, 100));
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lastTimeRef.current = null;
    };
  }, [activeSlides.length, isPaused, isHovered]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const changeSlide = (newIndex: number) => {
    setCurrentIndex(newIndex);
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = null;
  };

  const handleNext = () => {
    changeSlide((currentIndex + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    changeSlide((currentIndex - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNavigate = (view: any) => {
    navigate({ view });
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section 
      className="relative w-full bg-[#0d0c0b] overflow-hidden select-none text-right font-['Tajawal',sans-serif] group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="سلايدر رواج السينمائي"
    >
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .animate-cinematic-text {
          animation: fadeSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Hover Pause Notification Badge */}
      <div 
        className={`absolute top-5 left-5 z-30 transition-all duration-500 ease-out pointer-events-none ${
          isHovered || isPaused
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-brand-accent-30 text-brand-accent text-xs font-medium shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span>{isPaused ? 'العرض التلقائي موقوف' : 'توقف مؤقت للمعاينة'}</span>
        </div>
      </div>

      {/* Main Viewport Frame */}
      <div className="relative min-h-[520px] sm:min-h-[580px] md:min-h-[630px] lg:min-h-[670px] flex items-center justify-center pb-28 sm:pb-32 pt-8">
        
        {/* Background Layer with Smooth Zoom and Fades */}
        {activeSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id ? `bg-slide-${slide.id}-${index}` : `bg-slide-${index}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none -z-10'
              }`}
            >
              <img
                src={slide.image_url}
                alt={slide.title_ar}
                className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Vignette & Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/75 to-[#0d0c0b]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/95 via-[#0d0c0b]/50 to-transparent" />
            </div>
          );
        })}

        {/* Ambient Lighting Accent */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-primary-20 rounded-full blur-3xl pointer-events-none animate-pulse duration-3000" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-brand-accent-10 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <div key={currentIndex} className="max-w-2xl animate-cinematic-text">
            
            {/* Badge */}
            {currentSlide.badge_ar && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs sm:text-sm font-bold mb-4 shadow-xl border border-white/20 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span className="tracking-wide">{currentSlide.badge_ar}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-4 drop-shadow-2xl">
              {currentSlide.title_ar}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200/90 leading-relaxed mb-8 font-medium max-w-xl drop-shadow">
              {currentSlide.subtitle_ar}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => handleNavigate(currentSlide.target_view)}
                className="px-7 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-sm sm:text-base font-bold transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 group/btn cursor-pointer border border-white/20"
              >
                <span>{currentSlide.button_text_ar}</span>
                <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
              </button>

              {currentSlide.secondary_button_text_ar && (
                <button
                  onClick={() => handleNavigate(currentSlide.secondary_target_view || 'custom-quote')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:border-white/40 text-sm sm:text-base font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg"
                >
                  {currentSlide.secondary_button_text_ar}
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Control & Interactive Cinematic Timeline Bar */}
      <div className="absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-6 z-30">
        <div className="max-w-6xl mx-auto bg-black/75 backdrop-blur-2xl border border-white/15 rounded-2xl p-3.5 sm:px-6 sm:py-4 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col gap-3">
          
          {/* TOP ROW: Segmented Interactive Progress Bar (أشريط وقت تنقل تفاعلي متقدم) */}
          <div
            className="w-full grid gap-1.5 sm:gap-2 items-center"
            style={{ gridTemplateColumns: `repeat(${Math.max(activeSlides.length, 1)}, minmax(0, 1fr))` }}
          >
            {activeSlides.map((slide, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              const fillPercent = isPast ? 100 : isCurrent ? progress : 0;

              return (
                <button
                  key={slide.id ? `nav-slide-${slide.id}-${idx}` : `nav-slide-${idx}`}
                  onClick={() => changeSlide(idx)}
                  className="group/track relative h-2.5 sm:h-3 rounded-full bg-white/10 overflow-hidden cursor-pointer transition-all hover:bg-white/20 border border-white/5 focus:outline-none"
                  title={`انتقل إلى: ${slide.title_ar}`}
                  aria-label={`الشريحة ${idx + 1}: ${slide.title_ar}`}
                >
                  {/* Fill Bar */}
                  <div
                    className={`h-full transition-all ease-linear rounded-full ${
                      isCurrent
                        ? 'bg-brand-primary shadow-md'
                        : isPast
                        ? 'bg-brand-accent'
                        : 'bg-transparent'
                    }`}
                    style={{
                      width: `${fillPercent}%`,
                      transitionDuration: isCurrent ? '50ms' : '300ms',
                    }}
                  />

                  {/* Active Leading Glow Tip Dot */}
                  {isCurrent && fillPercent > 2 && fillPercent < 98 && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white border border-brand-accent pointer-events-none transition-all ease-linear"
                      style={{
                        right: `${100 - fillPercent}%`,
                        transform: 'translate(50%, -50%)',
                      }}
                    />
                  )}

                  {/* Slide Title Tooltip on Hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/track:opacity-100 transition-opacity bg-black/90 text-brand-accent text-[10px] sm:text-xs py-1 px-2.5 rounded-md border border-brand-accent-30 whitespace-nowrap pointer-events-none shadow-xl z-40 font-medium">
                    {slide.title_ar}
                  </div>
                </button>
              );
            })}
          </div>

          {/* BOTTOM ROW: Controls & Info */}
          <div className="flex items-center justify-between gap-3 sm:gap-6 pt-1">
            
            {/* 1. Slide Counter & Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black text-brand-accent font-mono tracking-tight">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-white/30 font-light text-sm">/</span>
                <span className="text-xs sm:text-sm text-white/50 font-mono font-medium">
                  {String(activeSlides.length).padStart(2, '0')}
                </span>
              </div>

              <div className="hidden sm:block h-4 w-[1px] bg-white/15" />

              {/* Title teaser */}
              <span className="hidden sm:inline-block text-xs sm:text-sm text-neutral-200 font-semibold truncate max-w-[200px] lg:max-w-[320px]">
                {currentSlide.title_ar}
              </span>
            </div>

            {/* 2. Center: Play / Pause Control Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePause}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isPaused
                    ? 'bg-brand-accent-20 text-brand-accent border-brand-accent-30'
                    : 'bg-white/10 text-neutral-200 border-white/15 hover:bg-white/20'
                }`}
                title={isPaused ? "استئناف التمرير التلقائي" : "إيقاف مؤقت للتمرير"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                    <span className="hidden sm:inline">تشغيل</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white text-white" />
                    <span className="hidden sm:inline">إيقاف مؤقت</span>
                  </>
                )}
              </button>
            </div>

            {/* 3. Right: Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-[#B9142D] text-white border border-white/15 hover:border-[#B9142D] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group/arrow"
                aria-label="الشريحة السابقة"
                title="الشريحة السابقة"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/arrow:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-[#B9142D] text-white border border-white/15 hover:border-[#B9142D] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 group/arrow"
                aria-label="الشريحة التالية"
                title="الشريحة التالية"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover/arrow:scale-110 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};


