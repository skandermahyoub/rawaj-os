import React from 'react';
import { useApp } from '../../context/AppContext';
import { HomeAboutModule } from './home/HomeAboutModule';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  Globe2, 
  Sparkles,
  Award
} from 'lucide-react';

export const AboutContactView: React.FC = () => {
  const { siteSettings, navigate } = useApp();

  return (
    <div className="space-y-8 pb-16 text-right">
      
      {/* 1. Complete Company & Founder Profile (HomeAboutModule) */}
      <HomeAboutModule />

      {/* 2. Executive Overview & Pillars */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 bg-brand-primary-10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>تأسست عام 2008 — أكثر من 18 عاماً من الريادة</span>
        </div>

        <h1 className="font-heading font-extrabold text-xl sm:text-3xl text-[#171616] dark:text-[#F5F3EF]">
          رواج للطباعة والإعلان والديكور والتوريد الشامل
        </h1>

        <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed max-w-3xl">
          انطلقت «رواج» في العاصمة صنعاء عام 2008 كصرح طباعي وإعلاني متخصص، وتطورت اليوم لتصبح <strong>منصة تجارة الخدمات والتوريد الشامل (One-stop Print & Advertising Procurement Platform)</strong> التي تمكن الشركات، المصانع، والمؤسسات التجارية من طلب وتنفيذ أي منتج طباعي، إعلاني، ديكوري، أو تغليفي بمواصفات فنية دقيقة وتنفيذ داخلي أو توريد دولي موثوق.
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="bg-[#FAF7F2] dark:bg-[#221F1F] p-3.5 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#171616] dark:text-white">
              <Printer className="w-4 h-4 text-brand-primary" />
              <span>تنفيذ وتصنيع داخلي</span>
            </div>
            <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
              خطوط إنتاج طباعة الأوفست، الرقمية، اللوحات، الأكريليك، وتجليد المركبات.
            </p>
          </div>

          <div className="bg-[#FAF7F2] dark:bg-[#221F1F] p-3.5 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#171616] dark:text-white">
              <Globe2 className="w-4 h-4 text-brand-primary" />
              <span>توريد دولي واستيراد مباشر</span>
            </div>
            <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
              شراكات توريد مع مصانع عالمية للتغليف الفاخر، الهدايا، والمواد الخام المتخصصة.
            </p>
          </div>

          <div className="bg-[#FAF7F2] dark:bg-[#221F1F] p-3.5 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#171616] dark:text-white">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <span>ضمان المواصفات الهندسية</span>
            </div>
            <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
              دراسة الجدوى الفنية، مطابقة درجات الألوان، واختبار العينات قبل الإنتاج.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Contact Info Cards */}
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-6 space-y-5 shadow-xs">
          <h2 className="font-heading font-bold text-base sm:text-lg text-[#171616] dark:text-white pb-2 border-b border-[#E7E0D3] dark:border-[#332F2F]">
            معلومات الاتصال المباشر وفروعنا
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="block text-[#171616] dark:text-white font-bold">العنوان والموقع:</strong>
                <p className="text-[#57534E] dark:text-[#D6D3D1] leading-relaxed">
                  {siteSettings.address_ar}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="block text-[#171616] dark:text-white font-bold">هاتف المكتب:</strong>
                <a href={`tel:${siteSettings.phone}`} className="text-[#57534E] dark:text-[#D6D3D1] hover:text-brand-primary">
                  {siteSettings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="block text-[#171616] dark:text-white font-bold">الجوال والواتساب المعتمد:</strong>
                <a 
                  href={`https://wa.me/${siteSettings.mobile_whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-primary font-bold hover:underline font-mono"
                >
                  {siteSettings.mobile_whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="block text-[#171616] dark:text-white font-bold">البريد الإلكتروني الرسمي:</strong>
                <a href={`mailto:${siteSettings.email}`} className="text-[#57534E] dark:text-[#D6D3D1] hover:text-brand-primary">
                  {siteSettings.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="block text-[#171616] dark:text-white font-bold">ساعات العمل:</strong>
                <p className="text-[#57534E] dark:text-[#D6D3D1]">
                  {siteSettings.working_hours_ar}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map & Location representation */}
        <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-[#171616] dark:text-white pb-2 border-b border-[#E7E0D3] dark:border-[#332F2F]">
              موقع المقر الرئيسي في صنعاء
            </h2>
            
            {/* Visual Location Frame */}
            <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-brand-primary-10 text-brand-primary flex items-center justify-center mx-auto shadow-xs">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="font-heading font-bold text-sm text-[#171616] dark:text-white">
                صنعاء - الدائري - جولة الجامعة الجديدة
              </div>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-xs">
                بداية شارع العدل — بجوار أهم المراكز التجارية والخدمية
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${siteSettings.mobile_whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>بدء محادثة فورية مع خدمة العملاء</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
