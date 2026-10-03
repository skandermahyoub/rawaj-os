import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2, Factory, ChevronLeft } from 'lucide-react';

interface HomeHeroProps {
  onExploreServices: () => void;
  onCustomQuote: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onExploreServices, onCustomQuote }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'الريادة في الطباعة والتجهيز منذ 2008',
      title: 'اطبع، جهّز، خصّص…',
      highlight: 'ورواج تتولى كامل التفاصيل الفنية.',
      desc: 'منظومة إنتاج وتوريد متكاملة للطباعة التجارية، التغليف الفاخر، اللوحات الإعلانية وتجهيز الواجهات بأعلى دقة.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=80',
      category: 'التغليف والمطبوعات الفاخرة',
    },
    {
      badge: 'اللوحات والواجهات المعمارية',
      title: 'واجهات وهوية بصرية',
      highlight: 'تخطف الأنظار في السوق التجاري.',
      desc: 'حروف بارزة زنكور وأكريليك مضيئة، تكسية واجهات كلادينج ACP، وديكورات معارض معتمدة هندسياً.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
      category: 'اللوحات والكلادينج',
    },
    {
      badge: 'المطبوعات التجارية ومصانع الليبل',
      title: 'مطبوعات أوفست ورول ليبل',
      highlight: 'بأحدث خطوط الإنتاج المقاومة للظروف.',
      desc: 'فواتير NCR، مجلدات وكتالوجات، وملصقات رول وشيت للمنتجات الغذائية والطبية والمنظفات.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80',
      category: 'الأوفست والليبل التجاري',
    }
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="space-y-3">
      {/* Main Visual Hero Card */}
      <section className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#171616] text-white min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] flex flex-col justify-between p-5 sm:p-8 lg:p-12 shadow-md border border-black/10 dark:border-white/10 group transition-all">
        
        {/* High-Fidelity Photography Background with Smooth Transition */}
        <img
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-102 transition-all duration-700 ease-out"
          loading="eager"
        />

        {/* Sophisticated Dual-Layer Gradient for Flawless Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/80 to-[#141211]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#141211]/40 to-[#141211]/90 pointer-events-none hidden sm:block" />

        {/* Top Floating Strip */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 bg-[#B9142D] text-white px-3 py-1 rounded-[10px] text-[11px] sm:text-xs font-bold shadow-sm backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Slide Indicator Switchers */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`الشريحة ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-6 bg-[#B9142D]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4 pt-6 sm:pt-10">
          
          <div className="space-y-1 sm:space-y-2">
            <span className="text-xs sm:text-sm font-semibold text-[#F5F1E9]/80 tracking-wider">
              {currentSlide.category}
            </span>
            <h1 className="font-heading font-black text-[24px] sm:text-[36px] lg:text-[44px] text-[#FFFDF9] leading-[1.2] tracking-tight">
              {currentSlide.title}<br />
              <span className="text-[#F5F1E9]/95 text-[21px] sm:text-[32px] lg:text-[38px] font-extrabold">
                {currentSlide.highlight}
              </span>
            </h1>
          </div>

          <p className="text-[12px] sm:text-[14px] text-[#EEE9E0] leading-relaxed max-w-xl line-clamp-2">
            {currentSlide.desc}
          </p>

          {/* Action CTAs */}
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

      {/* Trust & Guarantee Banner Below Hero */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] flex items-center justify-center shrink-0 font-bold text-xs">
            16+
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">خبرة منذ 2008</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">فريق فني متمرس</div>
          </div>
        </div>

        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#16834A]/10 text-[#16834A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">12 قسماً صناعياً</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">كل حلول الإعلان بمكان واحد</div>
          </div>
        </div>

        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#B46A15]/10 text-[#B46A15] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">تخصيص كامل 100%</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">تسعير فني حسب المواصفات</div>
          </div>
        </div>

        <div className="bg-[#FFFDF9] dark:bg-[#1C1918] p-3 rounded-[16px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 text-[#B9142D] flex items-center justify-center shrink-0">
            <Factory className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA]">تنفيذ وتوريد مصانع</div>
            <div className="text-[10px] text-[#746E67] dark:text-[#A0988F]">حلول محلية ودولية موثوقة</div>
          </div>
        </div>
      </div>
    </div>
  );
};
