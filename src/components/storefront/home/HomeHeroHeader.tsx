import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { 
  Calculator, 
  Layers, 
  ShieldCheck, 
  MessageCircle, 
  Printer, 
  Box, 
  Building2, 
  ChevronLeft,
  Check
} from 'lucide-react';

interface HomeHeroHeaderProps {
  onOpenCustomQuote?: () => void;
}

interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  specs: string[];
  metricLabel: string;
  metricValue: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'offset',
    title: 'المطابع التجارية والأوفست الفاخر',
    category: 'طباعة وتوريد',
    icon: Printer,
    specs: [
      'طباعة أوفست ألمانية بأعلى دقة ألوان ومطابقة Pantone معتمدة',
      'فواتير، سندات، بروشورات، ومجلات سنوية بتشطيبات حرارية',
      'تشطيبات UV موضعي، بصمة ذهبية وفضية، وسلوفان حراري فاخر'
    ],
    metricLabel: 'معيار دقة الألوان',
    metricValue: '100% ISO'
  },
  {
    id: 'packaging',
    title: 'هندسة العلب والتغليف الفاخر',
    category: 'كرتون وتغليف',
    icon: Box,
    specs: [
      'علب صلبة كرتونية (Rigid Boxes) للهدايا والمنتجات الفاخرة',
      'كراتين مضلعة وكوشيه مقوى بأشكال مخصصة وقوالب خاصة',
      'أكياس تسوق ورقية فاخرة بمقابض حريرية وشعار بارز'
    ],
    metricLabel: 'قوالب ونماذج',
    metricValue: '+250 قالب'
  },
  {
    id: 'signage',
    title: 'اللوحات والواجهات المعمارية 3D',
    category: 'واجهات وديكور',
    icon: Building2,
    specs: [
      'حروف بارزة زنكور وإستانلس ستيل وأكريليك مضيء بأحدث الليزر',
      'تكسية واجهات الألمنيوم المركب (كلادينج ACP) المعتمدة هندسياً',
      'شاشات إلكترونية ولوحات مشاريع خارجية مقاومة للعوامل الجوية'
    ],
    metricLabel: 'ضمان التنفيذ',
    metricValue: '5 سنوات'
  },
  {
    id: 'exhibitions',
    title: 'تجهيز المعارض والديكور التجاري',
    category: 'أجنحة ومؤتمرات',
    icon: Layers,
    specs: [
      'تصميم وبناء بوثات المعارض وأجنحة المؤتمرات المتكاملة',
      'طاولات استقبال، رول اب، وبوب اب ترويجي متنقل عالي الجودة',
      'حلول العرض الداخلي وتأثيث نقاط البيع للعلامات التجارية'
    ],
    metricLabel: 'جاهزية التنفيذ',
    metricValue: 'تسليم بالموقع'
  }
];

export const HomeHeroHeader: React.FC<HomeHeroHeaderProps> = ({ onOpenCustomQuote }) => {
  const { heroHeaderSettings, siteSettings, navigate } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  if (!heroHeaderSettings.enabled) return null;

  const currentCap = CAPABILITIES[activeTab];

  const handleScrollToCalculator = () => {
    const calc = document.getElementById('calculator-module');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenCustomQuote) {
      onOpenCustomQuote();
    }
  };

  const whatsappNumber = (siteSettings.mobile_whatsapp || siteSettings.phone || '').replace(/[^0-9]/g, '');

  return (
    <section className="relative w-full bg-[#12100F] text-[#F7F4EE] border-b border-[#2B2623] overflow-hidden">
      
      {/* 1. Architectural Texture & Background Lighting */}
      {heroHeaderSettings.bg_image_url ? (
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <SafeImage
            src={heroHeaderSettings.bg_image_url}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
            fallbackCategory="خلفية الهيدر"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100F] via-[#12100F]/85 to-[#12100F]/60" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12100F]/60 to-[#12100F]" />
        </div>
      )}

      {/* Subtle brand color accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B9142D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Column (Col 7): Brand Identity & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B9142D]/15 border border-[#B9142D]/35 text-[#E03A53] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B9142D]" />
              <span>{siteSettings.company_name_ar || 'رواج للطباعة والإعلان والديكور'}</span>
              <span className="text-white/30">•</span>
              <span className="text-[#C2B7A7] font-medium">الإنتاج والتوريد المؤسسي الشامل</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white leading-tight tracking-tight">
                {heroHeaderSettings.welcome_title_ar || 'صناعة الهوية والطباعة الفاخرة.. بدقة هندسية متناهية'}
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-[#C2B7A7] leading-relaxed max-w-2xl font-medium">
                {heroHeaderSettings.welcome_subtitle_ar || 'نوفر لكافة المنشآت والشركات حلولاً شاملة تحت سقف واحد: من استشارات الخامات وتطوير التصاميم، إلى طباعة الأوفست والديجيتال، تصنيع العلب والكراتين، وتجهيز الواجهات واللوحات المعمارية 3D بأعلى معايير الجودة والالتزام.'}
              </p>
            </div>

            {/* Corporate Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              
              {/* Primary Instant Quote Button */}
              <button
                onClick={handleScrollToCalculator}
                className="px-6 py-3.5 rounded-xl bg-[#B9142D] hover:bg-[#A01026] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2.5 transition-all hover:scale-102 cursor-pointer border border-[#E03A53]/30"
              >
                <Calculator className="w-4 h-4 text-[#F3C64F]" />
                <span>{heroHeaderSettings.primary_cta_text_ar || 'احسب تسعيرك الفوري'}</span>
              </button>

              {/* Secondary Catalog Button */}
              <button
                onClick={() => navigate({ view: 'services' })}
                className="px-5 py-3.5 rounded-xl bg-[#1D1A19] hover:bg-[#272321] text-[#EBE4D5] border border-[#3E3733] hover:border-[#D4AF37]/60 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>{heroHeaderSettings.secondary_cta_text_ar || 'دليل الخدمات والمنتجات'}</span>
                <ChevronLeft className="w-4 h-4 text-[#8C8275]" />
              </button>

              {/* WhatsApp Quick Consultation */}
              {whatsappNumber ? (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود استشارة فريق رواج بخصوص مواصفات مشروع طباعي.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800/40 font-bold text-xs flex items-center gap-2 transition-colors"
                  title="تواصل مباشر عبر واتساب"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">استشارة مباشرة</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpenCustomQuote}
                  className="px-4 py-3.5 rounded-xl bg-[#24201D] text-[#D6CFC5] border border-[#3A332E] font-bold text-xs flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">طلب استشارة</span>
                </button>
              )}

            </div>

            {/* 4 Trust Metric Anchors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#26211E]">
              
              <div className="p-3 rounded-xl bg-[#181514] border border-[#2B2623] text-right">
                <span className="block text-lg sm:text-xl font-heading font-black text-brand-accent font-mono">+18</span>
                <span className="text-[11px] text-[#A69C8E] font-medium">عاماً من الخبرة الصناعية</span>
              </div>

              <div className="p-3 rounded-xl bg-[#181514] border border-[#2B2623] text-right">
                <span className="block text-lg sm:text-xl font-heading font-black text-brand-accent font-mono">100%</span>
                <span className="text-[11px] text-[#A69C8E] font-medium">مطابقة ألوان Pantone</span>
              </div>

              <div className="p-3 rounded-xl bg-[#181514] border border-[#2B2623] text-right">
                <span className="block text-lg sm:text-xl font-heading font-black text-white font-mono">+250</span>
                <span className="text-[11px] text-[#A69C8E] font-medium">قالب تغليف وتصميم جاهز</span>
              </div>

              <div className="p-3 rounded-xl bg-[#181514] border border-[#2B2623] text-right">
                <span className="block text-lg sm:text-xl font-heading font-black text-brand-accent font-mono">5 سنوات</span>
                <span className="text-[11px] text-[#A69C8E] font-medium">ضمان لوحات وكلادينج</span>
              </div>

            </div>

          </div>

          {/* Left Column (Col 5): Corporate Production Capabilities Matrix */}
          <div className="lg:col-span-5 w-full">
            
            <div className="rounded-2xl bg-[#181514] border border-[#332C28] p-5 sm:p-6 shadow-xl space-y-4">
              
              {/* Matrix Card Header */}
              <div className="flex items-center justify-between border-b border-[#2B2623] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span className="font-heading font-black text-xs sm:text-sm text-[#F0EBE1]">
                    قطاعات الإنتاج والتجهيز المتخصصة
                  </span>
                </div>
                <span className="text-[10px] bg-brand-accent-10 text-brand-accent border border-brand-accent-30 px-2 py-0.5 rounded-md font-bold">
                  خطوط إنتاج مباشرة
                </span>
              </div>

              {/* 4 Clean Capability Selector Tabs */}
              <div className="grid grid-cols-2 gap-1.5">
                {CAPABILITIES.map((cap, idx) => {
                  const Icon = cap.icon;
                  const isSelected = idx === activeTab;
                  return (
                    <button
                      key={cap.id}
                      onClick={() => setActiveTab(idx)}
                      className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary text-white shadow-xs'
                          : 'bg-[#141211] border-[#292421] text-[#9E9486] hover:text-[#EDE6DA] hover:border-[#3E3733]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-brand-accent'}`} />
                      <div className="truncate">
                        <div className="text-xs font-bold truncate leading-tight">{cap.category}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Specifications & Highlights */}
              <div className="p-4 rounded-xl bg-[#131110] border border-[#282320] space-y-3 min-h-[160px]">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <currentCap.icon className="w-4 h-4 text-brand-accent" />
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-white">
                      {currentCap.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-accent bg-brand-accent-10 px-2 py-0.5 rounded border border-brand-accent-30">
                    {currentCap.metricValue}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#C7BCAD]">
                  {currentCap.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                      <span className="leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => navigate({ view: 'services' })}
                  className="text-xs text-brand-accent hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>استعراض نماذج هذا القسم</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleScrollToCalculator}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#EBE4D5] font-bold text-[11px] border border-white/10 transition-colors cursor-pointer"
                >
                  طلب تسعير لهذا القسم
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
