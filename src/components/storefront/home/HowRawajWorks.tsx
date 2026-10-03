import React from 'react';
import { SectionHeader } from './SectionHeader';
import { MousePointerClick, Sliders, Send, Factory, ArrowLeft } from 'lucide-react';

export const HowRawajWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'اختر الخدمة أو الباقة',
      description: 'تصفح الكتالوج أو استخدم البحث للعثور على ما تحتاجه بدقة.',
      icon: <MousePointerClick className="w-5 h-5 text-white" />,
      color: 'bg-[#B9142D]'
    },
    {
      number: '02',
      title: 'حدّد المواصفات والقياسات',
      description: 'اختر نوع الورق، السماكة، ونوع التشطيب أو اطلب توصية رواج.',
      icon: <Sliders className="w-5 h-5 text-white" />,
      color: 'bg-[#951126]'
    },
    {
      number: '03',
      title: 'أرسل طلب التسعير المجمع',
      description: 'اجمع عدة خدمات داخل طلب واحد مع إرفاق ملفات التصميم.',
      icon: <Send className="w-5 h-5 text-white" />,
      color: 'bg-[#171616]'
    },
    {
      number: '04',
      title: 'رواج تنفذ وتورّد وتسلمك',
      description: 'ندير الطباعة والتشطيب الفني والتسليم المطابق للمواصفات.',
      icon: <Factory className="w-5 h-5 text-white" />,
      color: 'bg-[#16834A]'
    },
  ];

  return (
    <section className="space-y-4">
      <SectionHeader
        title="كيف تسير تجربة الطلب والتنفيذ؟"
        subtitle="خطوات واضحة وسريعة من تحديد المواصفات حتى تسليم المطبوعات والتجهيزات."
      />

      {/* Horizontal Carousel on Mobile / Grid on Tablet & Desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 no-scrollbar -mx-1 px-1 relative">
        {steps.map((step) => (
          <div
            key={step.number}
            className="min-w-[210px] w-[220px] shrink-0 snap-start sm:min-w-0 sm:w-auto group relative bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[22px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-5 space-y-3 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-[14px] ${step.color} shadow-xs flex items-center justify-center`}>
                {step.icon}
              </div>
              <span className="text-[16px] font-black font-mono text-[#B9142D]/30 dark:text-[#B9142D]/40">
                {step.number}
              </span>
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-[14px] sm:text-[15px] text-[#171616] dark:text-[#F5F1EA]">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#746E67] dark:text-[#A0988F] mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
