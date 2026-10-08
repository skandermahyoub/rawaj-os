import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { 
  Star, 
  Quote, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  MessageSquarePlus, 
  Sparkles,
  Building2,
  Pause,
  Play,
  Award
} from 'lucide-react';

interface HomeClientsAndTestimonialsProps {
  mode?: 'all' | 'brands_only' | 'testimonials_only';
}

export const HomeClientsAndTestimonials: React.FC<HomeClientsAndTestimonialsProps> = ({
  mode = 'all',
}) => {
  const { clientLogos, testimonials, brandsDisplayMode, submitPublicTestimonial } = useApp();
  
  const activeLogos = clientLogos.filter((l) => l.is_active).sort((a, b) => a.sort_order - b.sort_order);
  const approvedTestimonials = testimonials
    .filter((t) => t.is_active && t.status === 'approved')
    .sort((a, b) => a.sort_order - b.sort_order);

  const showBrands = (mode === 'all' || mode === 'brands_only') && activeLogos.length > 0;
  const showTestimonials = (mode === 'all' || mode === 'testimonials_only') && approvedTestimonials.length > 0;

  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Form submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Auto slide for brands carousel when not paused
  useEffect(() => {
    if (isPaused || activeLogos.length <= 2 || !showBrands) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(activeLogos.length / 2));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, activeLogos.length, showBrands]);

  const scrollBrands = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (!testimonialsRef.current) return;
    const scrollAmount = testimonialsRef.current.clientWidth * 0.8;
    if (direction === 'left') {
      testimonialsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitError('');
    setIsSubmittingReview(true);
    try {
      await submitPublicTestimonial({
        client_name_ar: name,
        client_title_ar: title || 'عميل معتمد',
        client_company_ar: company || 'مؤسسة تجارية',
        comment_ar: comment,
        rating,
      });

      setSubmittedSuccess(true);
      setName('');
      setTitle('');
      setCompany('');
      setComment('');
      setRating(5);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setShowReviewForm(false);
      }, 4000);
    } catch (error: any) {
      setSubmitError(error?.message || 'تعذر إرسال التقييم. حاول مرة أخرى.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Distinct titles according to the mode
  const getHeaderInfo = () => {
    if (mode === 'testimonials_only') {
      return {
        badge: 'ثقة العملاء وتجارب التنفيذ',
        badgeIcon: Star,
        badgeClass: 'bg-brand-accent-15 text-brand-accent border-brand-accent-30',
        title: 'ماذا يقول عملاؤنا عن جودة التنفيذ والالتزام؟',
        desc: 'آراء وتجارب حقيقية موثقة لمدراء المشتريات والتسويق حول دقة الألوان، سرعة التوريد ومطابقة العينات لدى رواج.'
      };
    }
    if (mode === 'brands_only') {
      return {
        badge: 'شركاء النجاح والكيانات المعتمدة',
        badgeIcon: Building2,
        badgeClass: 'bg-brand-primary-15 text-brand-primary border-brand-primary-30',
        title: 'شركاء النجاح وأبرز العلامات التجارية',
        desc: 'شراكات استراتيجية متينة مع كبرى الشركات، المصانع والمؤسسات التي نعتز بتوريد مطبوعاتها وتجهيز مقراتها.'
      };
    }
    return {
      badge: 'منظومة الثقة والشراكات',
      badgeIcon: Award,
      badgeClass: 'bg-[#B9142D]/15 text-[#B9142D] dark:text-[#E03A53] border-[#B9142D]/30',
      title: 'شركاء النجاح وآراء عملاء رواج',
      desc: 'نعتز بثقة كبرى العلامات التجارية وبشهادات شركائنا في مختلف القطاعات التجارية والصناعية.'
    };
  };

  const headerInfo = getHeaderInfo();
  const BadgeIcon = headerInfo.badgeIcon;

  return (
    <div className="space-y-6">
      
      {/* 1. Distinct Top Section Header */}
      <div className="flex flex-col items-start gap-2.5 text-right">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold shadow-2xs ${headerInfo.badgeClass}`}>
          <BadgeIcon className="w-3.5 h-3.5" />
          <span>{headerInfo.badge}</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#171616] dark:text-[#F7F5F0] leading-tight">
          {headerInfo.title}
        </h2>

        <p className="text-xs sm:text-sm text-[#70695F] dark:text-[#A8A196] max-w-2xl leading-relaxed">
          {headerInfo.desc}
        </p>
      </div>

      {/* 2. Brands Partners Carousel (Rendered for brands_only or all) */}
      {showBrands && (
        <div className="space-y-4">
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-0.5 scroll-smooth"
          >
            {activeLogos.map((logo, idx) => {
              const isGrayscale = brandsDisplayMode === 'grayscale';

              return (
                <div
                  key={logo.id}
                  className="w-[75vw] sm:w-[300px] md:w-[340px] shrink-0 snap-start rounded-2xl bg-white dark:bg-[#141211] border border-[#E8E2D5] dark:border-[#262320] shadow-xs hover:shadow-md hover:border-[#B9142D]/50 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Logo Artwork Frame */}
                  <div className="h-36 sm:h-44 bg-[#FAF8F5] dark:bg-[#1A1817] flex items-center justify-center relative overflow-hidden border-b border-[#E8E2D5] dark:border-[#262320]">
                    <div
                      className="w-[132px] h-[132px] max-w-[calc(100%-24px)] max-h-[calc(100%-16px)] aspect-square rounded-2xl border border-dashed border-[#B9142D]/35 dark:border-[#D4AF37]/30 bg-white dark:bg-[#201D1B] shadow-inner flex flex-col items-center justify-center text-center p-3"
                      aria-label="قالب شعار العميل — المقاس المطلوب 1200×1200 بكسل"
                    >
                      {logo.logo_url ? (
                        <SafeImage
                          src={logo.logo_url}
                          alt={logo.name_ar}
                          className={`w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 ${isGrayscale ? 'filter grayscale group-hover:grayscale-0' : ''}`}
                          loading="lazy"
                          fallbackCategory="شعار عميل"
                        />
                      ) : (
                        <>
                          <div className="w-9 h-9 rounded-xl border border-[#B9142D]/25 text-[#B9142D] flex items-center justify-center mb-2 text-sm font-black">شعار</div>
                          <span className="text-[10px] font-black text-[#171616] dark:text-[#F7F5F0]">مكان شعار العميل</span>
                          <span className="text-[8px] text-[#78716C] dark:text-[#A8A29E] mt-1">المقاس المطلوب: 1200 × 1200 px</span>
                          <span className="text-[8px] text-[#78716C] dark:text-[#A8A29E]">PNG / SVG / WebP</span>
                        </>
                      )}
                    </div>
                    
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white font-mono text-[9px] font-bold border border-white/10">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Partner Info Details */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between text-right">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#B9142D]/10 text-[#B9142D] dark:text-[#E03A53] text-[10px] font-bold mb-1.5">
                        {logo.industry_ar || 'قطاع الأعمال والتطوير'}
                      </span>

                      <h4 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F7F5F0] group-hover:text-[#B9142D] transition-colors line-clamp-1">
                        {logo.name_ar}
                      </h4>

                      <p className="text-[11px] text-[#70695F] dark:text-[#A8A196] line-clamp-2 mt-1 leading-relaxed">
                        شريك استراتيجي في توريد وتصنيع المطبوعات والهويات وتجهيز المقرات.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#E8E2D5]/70 dark:border-[#262320] flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>

                      <span className="text-[10px] font-bold text-[#B9142D] dark:text-[#E03A53]">
                        شراكة معتمدة
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Brands Navigation Controls Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              {activeLogos.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({
                        left: -i * 300,
                        behavior: 'smooth',
                      });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === 0
                      ? 'w-6 bg-[#B9142D]'
                      : 'w-1.5 bg-[#D8D2C6] dark:bg-[#332E2C]'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-white flex items-center justify-center hover:bg-[#B9142D] hover:text-white transition-colors cursor-pointer shadow-2xs"
                title={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => scrollBrands('right')}
                className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-white flex items-center justify-center hover:bg-[#B9142D] hover:text-white transition-colors cursor-pointer shadow-2xs"
                title="السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBrands('left')}
                className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-white flex items-center justify-center hover:bg-[#B9142D] hover:text-white transition-colors cursor-pointer shadow-2xs"
                title="التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Testimonials Section (Rendered for testimonials_only or all) */}
      {showTestimonials && (
        <div className={`space-y-4 ${showBrands && mode === 'all' ? 'pt-6 border-t border-[#E8E2D5] dark:border-[#262320]' : ''}`}>
          
          {/* Sub-Header & Add Testimonial CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
              <h3 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F7F5F0]">
                شهادات وتجارب العملاء المعتمدة
              </h3>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-3 py-1.5 rounded-xl bg-[#B9142D]/10 hover:bg-[#B9142D]/20 text-[#B9142D] dark:text-[#E03A53] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#B9142D]/20"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>أضف شهادتك</span>
            </button>
          </div>

          {/* Testimonial Submission Form (Collapsible) */}
          {showReviewForm && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#B9142D]/30 shadow-md space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-heading font-black text-xs sm:text-sm text-[#B9142D] dark:text-[#E03A53]">
                  نموذج تقييم تجربة العميل (يخضع لموافقة الإدارة قبل النشر)
                </span>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-xs text-[#70695F] hover:text-red-500 font-bold cursor-pointer"
                >
                  إلغاء
                </button>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs">
                  {submitError}
                </div>
              )}

              {submittedSuccess ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>شكراً لك! تم استلام شهادتك وسيتم مراجعتها ونشرها فوراً.</span>
                </div>
              ) : (
                <form onSubmit={handleTestimonialSubmit} className="space-y-3 text-right">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#70695F] dark:text-[#A8A196] mb-1">الاسم الكريم *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسمك أو صفتك"
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D5] dark:border-[#2D2A26] bg-[#FAF8F5] dark:bg-[#141211] text-xs focus:outline-hidden focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#70695F] dark:text-[#A8A196] mb-1">المسمى الوظيفي</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مدير المشتريات / مالك مشروع"
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D5] dark:border-[#2D2A26] bg-[#FAF8F5] dark:bg-[#141211] text-xs focus:outline-hidden focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#70695F] dark:text-[#A8A196] mb-1">اسم المؤسسة / الشركة</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="اسم شركتك أو علامتك"
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D5] dark:border-[#2D2A26] bg-[#FAF8F5] dark:bg-[#141211] text-xs focus:outline-hidden focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#70695F] dark:text-[#A8A196] mb-1">تقييمك لرواج (النجوم)</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-hidden cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? 'text-brand-accent fill-brand-accent' : 'text-neutral-300 dark:text-neutral-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#70695F] dark:text-[#A8A196] mb-1">شهادتك أو رأيك بتجربة التنفيذ *</label>
                    <textarea
                      rows={2}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="اكتب انطباعك عن دقة الألوان، سرعة التسليم، جودة التشطيب والتعامل..."
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2D5] dark:border-[#2D2A26] bg-[#FAF8F5] dark:bg-[#141211] text-xs focus:outline-hidden focus:border-brand-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingReview ? 'جارٍ الإرسال...' : 'إرسال الشهادة للاعتماد والنشر'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Testimonials Sliding Row */}
          <div 
            ref={testimonialsRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-0.5 scroll-smooth"
          >
            {approvedTestimonials.map((t) => (
              <div
                key={t.id}
                className="w-[82vw] sm:w-[360px] md:w-[400px] shrink-0 snap-center bg-white dark:bg-[#141211] p-5 rounded-2xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs flex flex-col justify-between relative group hover:border-brand-primary transition-all text-right"
              >
                <Quote className="w-6 h-6 text-brand-primary/20 absolute top-4 left-4 pointer-events-none" />

                <div className="space-y-2.5">
                  {/* Rating Stars & Project Type */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < t.rating ? 'text-brand-accent fill-brand-accent' : 'text-neutral-300 dark:text-neutral-600'
                        }`}
                      />
                    ))}
                    {t.project_type_ar && (
                      <span className="mr-2 text-[10px] font-bold text-brand-primary bg-brand-primary-10 px-2 py-0.5 rounded-md">
                        {t.project_type_ar}
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-[#423E3A] dark:text-[#D5CCC2] leading-relaxed line-clamp-4">
                    {t.comment_ar}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3.5 mt-3 border-t border-[#E8E2D5]/70 dark:border-[#262320]">
                  {t.client_avatar_url ? (
                    <SafeImage
                      src={t.client_avatar_url}
                      alt={t.client_name_ar}
                      className="w-10 h-10 rounded-full object-cover border border-[#E8E2D5] dark:border-[#2D2A26]"
                      fallbackCategory="صورة عميل"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#B9142D]/10 text-[#B9142D] dark:text-[#E03A53] flex items-center justify-center font-bold text-xs">
                      {t.client_name_ar.slice(0, 2)}
                    </div>
                  )}

                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#171616] dark:text-[#F7F5F0]">
                      {t.client_name_ar}
                    </h5>
                    <p className="text-[10px] sm:text-[11px] text-[#70695F] dark:text-[#A8A196]">
                      {t.client_title_ar} — <span className="font-semibold text-[#171616] dark:text-[#F7F5F0]">{t.client_company_ar}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Navigation Arrows */}
          <div className="flex items-center justify-end gap-1.5 pt-1">
            <button
              onClick={() => scrollTestimonials('right')}
              className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-white flex items-center justify-center hover:bg-[#B9142D] hover:text-white transition-colors cursor-pointer shadow-2xs"
              title="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTestimonials('left')}
              className="w-8 h-8 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-white flex items-center justify-center hover:bg-[#B9142D] hover:text-white transition-colors cursor-pointer shadow-2xs"
              title="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
