import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { 
  Target, 
  Eye, 
  Compass, 
  Download, 
  ArrowLeft, 
  Quote, 
  Award, 
  ChevronRight,
  ChevronLeft,
  FileText
} from 'lucide-react';

export const HomeAboutModule: React.FC = () => {
  const { aboutUsData, navigate, siteSettings } = useApp();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activePillarIndex, setActivePillarIndex] = useState(1); // 0: goal, 1: vision, 2: mission

  const pillars = [
    {
      id: 'goal',
      title: 'هدفنا',
      icon: Target,
      content: aboutUsData.goal_ar,
      isFeatured: false,
    },
    {
      id: 'vision',
      title: 'رؤيتنا',
      icon: Eye,
      content: aboutUsData.vision_ar,
      isFeatured: true,
    },
    {
      id: 'mission',
      title: 'رسالتنا',
      icon: Compass,
      content: aboutUsData.mission_ar,
      isFeatured: false,
    },
  ];

  const nextPillar = () => {
    setActivePillarIndex((prev) => (prev + 1) % pillars.length);
  };

  const prevPillar = () => {
    setActivePillarIndex((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] dark:bg-[#181615] border-b border-[#EBE5DA] dark:border-[#2A2624] text-[#171616] dark:text-[#F5F1EA] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[#B9142D] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 inline-block bg-[#B9142D]/10 px-3 py-1 rounded-full">
            نبذة عن الوكالة
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#171616] dark:text-[#F5F1EA]">
            عن رواج للطباعة والإعلان والديكور
          </h2>
          <p className="text-xs sm:text-sm text-[#746E67] dark:text-[#A0988F] mt-2">
            رائدون في تجهيز المطبوعات التجارية، الهويات البصرية، والتغليف والواجهات بأسلوب رقمي حديث
          </p>
          <div className="w-16 h-1 bg-[#B9142D] mx-auto mt-3 rounded-full" />
        </div>

        {/* Executive Profile & GM Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* GM Photo & Info */}
          <div className="lg:col-span-5 flex flex-col items-center sm:flex-row lg:flex-col text-center sm:text-right lg:text-center gap-6 p-6 rounded-2xl bg-white dark:bg-[#201D1C] shadow-md border border-[#EBE5DA] dark:border-[#2E2A28]">
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-[#B9142D] shadow-lg">
                <SafeImage
                  src={aboutUsData.gm_photo_url}
                  alt={aboutUsData.gm_name_ar || 'صورة الإدارة'}
                  className="w-full h-full object-cover"
                  fallbackCategory="الإدارة"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#B9142D] text-white p-1.5 rounded-lg shadow-md">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#171616] dark:text-[#F5F1EA]">
                {aboutUsData.gm_name_ar}
              </h3>
              <p className="text-xs sm:text-sm text-[#B9142D] font-semibold mb-2">
                {aboutUsData.gm_title_ar}
              </p>
              <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-4 text-xs text-[#746E67] dark:text-[#A0988F]">
                <span>{aboutUsData.years_experience ? `+${aboutUsData.years_experience} عاماً خبرة` : 'خبرة متراكمة'}</span>
                <span>•</span>
                <span>{siteSettings.address_ar.split('-')[0] || 'صنعاء'}</span>
              </div>
            </div>
          </div>

          {/* GM Quote Box */}
          <div className="lg:col-span-7 bg-white dark:bg-[#201D1C] p-6 sm:p-8 rounded-2xl shadow-md border border-[#EBE5DA] dark:border-[#2E2A28] relative">
            <Quote className="w-10 h-10 text-[#B9142D]/20 absolute top-4 left-4" />
            
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
              <span className="text-xs sm:text-sm font-bold text-[#B9142D]">
                كلمة الإدارة العامة
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#3E3A37] dark:text-[#D5CFC7] leading-relaxed italic mb-6 font-medium">
              {aboutUsData.gm_quote_ar}
            </p>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EBE5DA] dark:border-[#2E2A28] text-center">
              <div>
                <span className="block text-lg sm:text-xl font-extrabold text-[#B9142D]">
                  {aboutUsData.years_experience || 18}+
                </span>
                <span className="text-[11px] sm:text-xs text-[#746E67] dark:text-[#A0988F]">عاماً من التميز</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-extrabold text-[#171616] dark:text-[#F5F1EA]">
                  {aboutUsData.completed_projects_count || '+14,000'}
                </span>
                <span className="text-[11px] sm:text-xs text-[#746E67] dark:text-[#A0988F]">مشروع منجز</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-extrabold text-[#171616] dark:text-[#F5F1EA]">
                  {aboutUsData.happy_clients_count || '+2,800'}
                </span>
                <span className="text-[11px] sm:text-xs text-[#746E67] dark:text-[#A0988F]">عميل ومؤسسة</span>
              </div>
            </div>

          </div>

        </div>

        {/* Goal, Vision, Mission Pillars - Desktop 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-10">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`p-6 rounded-2xl bg-white dark:bg-[#201D1C] transition-all duration-300 relative overflow-hidden ${
                  pillar.isFeatured
                    ? 'border-2 border-[#B9142D] shadow-md'
                    : 'border border-[#EBE5DA] dark:border-[#2E2A28] shadow-xs hover:border-[#B9142D]/40'
                }`}
              >
                {pillar.isFeatured && <div className="absolute top-0 right-0 left-0 h-1 bg-[#B9142D]" />}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    pillar.isFeatured
                      ? 'bg-[#B9142D] text-white shadow-sm'
                      : 'bg-[#B9142D]/10 text-[#B9142D]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#171616] dark:text-[#F5F1EA] mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-[#5C564F] dark:text-[#BBB4AA] leading-relaxed">
                  {pillar.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Goal, Vision, Mission Pillars - Mobile Interactive Carousel */}
        <div className="block md:hidden mb-10">
          {/* Mobile Tabs Switcher */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-[#F0EAE1] dark:bg-[#25211F] rounded-xl mb-4 border border-[#E0D8CB] dark:border-[#2E2927]">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              const isActive = activePillarIndex === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#B9142D] text-white shadow-sm'
                      : 'text-[#5C564F] dark:text-[#A0988F] hover:bg-white/50 dark:hover:bg-black/20'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card with Side Arrows */}
          <div className="relative">
            {(() => {
              const currentPillar = pillars[activePillarIndex];
              const IconComp = currentPillar.icon;
              return (
                <div className="bg-white dark:bg-[#201D1C] p-6 rounded-2xl border-2 border-[#B9142D]/40 shadow-md relative min-h-[170px] flex flex-col justify-between transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-[#B9142D]" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#B9142D] text-white flex items-center justify-center shadow-xs">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h4 className="text-base font-bold text-[#171616] dark:text-[#F5F1EA]">
                          {currentPillar.title}
                        </h4>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={prevPillar}
                          className="w-8 h-8 rounded-lg bg-[#F5F1EA] dark:bg-[#282422] text-[#171616] dark:text-[#F5F1EA] hover:bg-[#B9142D] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="السابق"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextPillar}
                          className="w-8 h-8 rounded-lg bg-[#F5F1EA] dark:bg-[#282422] text-[#171616] dark:text-[#F5F1EA] hover:bg-[#B9142D] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="التالي"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C564F] dark:text-[#BBB4AA] leading-relaxed">
                      {currentPillar.content}
                    </p>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-[#F0EAE1] dark:border-[#2C2826]">
                    {pillars.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePillarIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          activePillarIndex === idx
                            ? 'w-6 bg-[#B9142D]'
                            : 'w-2 bg-[#EBE5DA] dark:bg-[#383330] hover:bg-[#B9142D]/50'
                        }`}
                        aria-label={`الشريحة ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Action Buttons: Download Profile & View About Page */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-2xl mx-auto w-full">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex-1 px-6 py-3.5 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm sm:text-base font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <Download className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
            <span>تنزيل الدليل التعريفي الشامل</span>
          </button>

          <button
            onClick={() => navigate({ view: 'about-contact' })}
            className="flex-1 px-6 py-3.5 rounded-xl bg-white dark:bg-[#201D1C] hover:bg-[#F2ECE1] dark:hover:bg-[#292523] text-[#171616] dark:text-[#F5F1EA] border border-[#D5CEC2] dark:border-[#383330] text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs text-center"
          >
            <span>الانتقال لصفحة من نحن</span>
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 text-[#B9142D] shrink-0" />
          </button>
        </div>

      </div>

      {/* Company Profile PDF Preview / Download Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1E1B1A] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EBE5DA] dark:border-[#2E2A28] text-right">
            <div className="w-12 h-12 rounded-xl bg-[#B9142D]/10 text-[#B9142D] flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-[#171616] dark:text-[#F5F1EA] mb-2">
              الدليل التعريفي الشامل لوكالة رواج 2026
            </h3>
            <p className="text-sm text-[#5C564F] dark:text-[#BBB4AA] mb-6 leading-relaxed">
              يتضمن البروفايل الرسمي للوكالة: تاريخ التأسيس، قائمة المكائن وخطوط الإنتاج، معايير الجودة، قائمة بأهم العملاء والمشاريع المنفذة، ونماذج من التشطيبات والمواصفات المعتمدة.
            </p>

            <div className="bg-[#F7F5F0] dark:bg-[#252220] p-4 rounded-xl mb-6 text-xs text-[#746E67] dark:text-[#A0988F] space-y-1.5">
              <div className="flex justify-between">
                <span>صيغة الملف:</span>
                <span className="font-bold text-[#171616] dark:text-[#F5F1EA]">PDF عالي الدقة (300DPI)</span>
              </div>
              <div className="flex justify-between">
                <span>تاريخ التحديث:</span>
                <span className="font-bold text-[#171616] dark:text-[#F5F1EA]">سبتمبر 2026</span>
              </div>
              <div className="flex justify-between">
                <span>اللغة:</span>
                <span className="font-bold text-[#171616] dark:text-[#F5F1EA]">عربي / إنجليزي</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#746E67] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                إغلاق
              </button>
              <a
                href={aboutUsData.profile_pdf_url || siteSettings.company_profile_pdf_url || '#'}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowProfileModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الملف الآن</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

