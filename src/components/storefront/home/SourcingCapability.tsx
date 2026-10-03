import React from 'react';
import { Globe, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Factory } from 'lucide-react';

interface SourcingCapabilityProps {
  onCustomQuote: () => void;
}

export const SourcingCapability: React.FC<SourcingCapabilityProps> = ({ onCustomQuote }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1C1918] to-[#141211] text-white rounded-[26px] sm:rounded-[32px] p-6 sm:p-9 lg:p-11 border border-white/10 shadow-xl space-y-6">
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#B9142D_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl text-right">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B9142D] bg-[#B9142D]/20 px-3 py-1 rounded-[8px] border border-[#B9142D]/30">
            <Globe className="w-4 h-4" />
            <span>قدرة التوريد المباشر من خطوط الإنتاج والمصانع</span>
          </div>

          <h2 className="font-heading font-black text-[20px] sm:text-[26px] lg:text-[30px] text-white leading-tight">
            إذا لم تُنفّذ محلياً، رواج تتولى التوريد المباشر بمواصفاتك.
          </h2>

          <p className="text-[13px] sm:text-[14px] text-[#EEE9E0]/85 leading-relaxed">
            نبحث عن الحل الفني والتصنيعي الأنسب محلياً أو دولياً للخامات الخاصة، التغليف الفاخر، كميات المصانع الضخمة، واللوحات العملاقة، مع فحص الجودة والمطابقة قبل التسليم.
          </p>

          {/* Key Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-[12px] text-xs">
              <ShieldCheck className="w-4 h-4 text-[#B9142D] shrink-0" />
              <span>فحص جودة دقيق قبل الشحن</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-[12px] text-xs">
              <Factory className="w-4 h-4 text-[#B9142D] shrink-0" />
              <span>عقود توريد صناعية معتمدة</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-[12px] text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#B9142D] shrink-0" />
              <span>إدارة الجمارك والتخليص</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 shrink-0 w-full lg:w-auto">
          <button
            onClick={onCustomQuote}
            className="touch-target w-full sm:w-auto bg-[#B9142D] hover:bg-[#951126] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-[14px] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>طلب تسعير توريد خاص</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
