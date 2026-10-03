import React from 'react';
import { Sparkles, ArrowLeft, MessageSquare, FileUp } from 'lucide-react';

interface CustomRequestCTAProps {
  onCustomQuote: () => void;
}

export const CustomRequestCTA: React.FC<CustomRequestCTAProps> = ({ onCustomQuote }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#B9142D] via-[#A01227] to-[#800F20] text-white rounded-[26px] sm:rounded-[32px] p-6 sm:p-9 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-right">
      
      <div className="space-y-2 max-w-xl">
        <div className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-[8px] text-[11px] font-bold backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>خدمة VIP للطلبات والتنفيذ المخصص</span>
        </div>

        <h2 className="font-heading font-black text-[20px] sm:text-[24px] text-white leading-tight">
          لم تجد المواصفة أو الخدمة المطلوبة؟
        </h2>

        <p className="text-[13px] text-white/90 leading-relaxed">
          صف لنا فكرتك أو ارفع صورة مرجعية أو مخطط، وسيقوم الفريق الهندسي والفني في رواج بدراسة التنفيذ وإرسال عرض السعر المخصص.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
        <button
          onClick={onCustomQuote}
          className="touch-target flex-1 sm:flex-initial bg-white text-[#B9142D] hover:bg-[#F5F1E9] font-bold text-xs sm:text-sm px-5 py-3 rounded-[14px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
        >
          <FileUp className="w-4 h-4" />
          <span>ابدأ طلب مواصفة مخصصة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>

        <a
          href="https://wa.me/967772110131"
          target="_blank"
          rel="noreferrer"
          className="touch-target flex-1 sm:flex-initial bg-black/25 hover:bg-black/35 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-[14px] flex items-center justify-center gap-2 transition-colors border border-white/20"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>استشارة فورية عبر واتساب</span>
        </a>
      </div>
    </section>
  );
};
