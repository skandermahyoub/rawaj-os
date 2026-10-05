import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { PWAInstallModal } from './PWAInstallModal';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Layers, 
  SlidersHorizontal, 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  Info,
  Upload,
  Home,
  Phone,
  MessageCircle,
  FileText,
  ChevronLeft,
  Download
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenCustomQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCustomQuote }) => {
  const { 
    isDarkMode, 
    toggleTheme, 
    currentRoute, 
    navigate, 
    quoteItems,
    siteSettings
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const cartCount = quoteItems.length;
  const isActive = (view: string) => currentRoute.view === view;

  const navLinks = [
    { label: 'الرئيسية', view: 'home', icon: Home },
    { label: 'الخدمات المتخصصة', view: 'services', icon: SlidersHorizontal },
    { label: 'الأقسام والمصانع', view: 'departments', icon: Layers },
    { label: 'باقات المشاريع', view: 'packages', icon: Sparkles },
    { label: 'معرض الأعمال', view: 'portfolio', icon: Briefcase },
    { label: 'دليل المعايير والطباعة', view: 'blog', icon: BookOpen },
    { label: 'عن رواج والاتصال', view: 'about-contact', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#0E0D0C]/90 backdrop-blur-xl border-b border-[#E8E2D5]/80 dark:border-[#262320]/80 transition-colors duration-300">
        {/* Main Top Header Bar Row */}
        <div className="max-w-7xl mx-auto w-full h-16 sm:h-20 flex items-center justify-between gap-4 px-4 sm:px-8">
          
          {/* BRAND & LOGO SECTION */}
          <div className="flex items-center gap-3.5">
            {/* Logo Container */}
            <button 
              onClick={() => navigate({ view: 'home' })}
              className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-[#1A1816] border-2 border-[#E8E2D5] dark:border-[#2D2A26] shadow-xs hover:border-brand-primary transition-all overflow-hidden cursor-pointer"
              title="الصفحة الرئيسية - مطبعة رواج"
            >
              <BrandLogo
                src={siteSettings.logo_url}
                alt={siteSettings.company_name_ar || 'رواج'}
                className="w-full h-full object-contain p-1"
                fallbackClassName="w-full h-full object-contain"
              />
            </button>

            {/* Agency Name & Subtitle */}
            <button 
              onClick={() => navigate({ view: 'home' })}
              className="flex flex-col text-right justify-center focus:outline-hidden hover:opacity-90 transition-opacity"
            >
              <span className="font-heading font-black text-sm sm:text-base md:text-xl tracking-tight text-[#171616] dark:text-[#F7F5F0] block leading-snug">
                {siteSettings.company_name_ar || 'رواج للطباعة والإعلان والديكور'}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#867F75] dark:text-[#9E978C] font-bold tracking-wide uppercase line-clamp-1 leading-none mt-0.5">
                {siteSettings.company_name_en || 'Rawaj Luxury Printing & Signage Hub'}
              </span>
            </button>
          </div>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold text-[#70695F] dark:text-[#A8A196]">
            {navLinks.slice(0, 5).map((link) => {
              const active = isActive(link.view);
              return (
                <button
                  key={link.view}
                  onClick={() => navigate({ view: link.view as any })}
                  className={`relative py-2 transition-colors hover:text-[#171616] dark:hover:text-[#F7F5F0] cursor-pointer ${
                    active ? 'text-brand-primary font-bold' : ''
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-primary rounded-full animate-in fade-in duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* HEADER ACTIONS: THEME TOGGLE + FAST QUOTE CTA + MAIN MENU BUTTON */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Install App Direct Button */}
            <button
              onClick={() => setInstallModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary shadow-2xs hover:bg-[#F3EFEA] dark:hover:bg-[#24211E] text-xs font-bold transition-all cursor-pointer"
              title="تثبيت تطبيق رواج على هاتفك"
            >
              <Download className="w-3.5 h-3.5 text-brand-primary" />
              <span className="text-[11px]">تطبيق الهاتف</span>
            </button>

            {/* Request Quote Direct Pill Button */}
            <button
              onClick={onOpenCustomQuote}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>طلب تسعير سريع</span>
            </button>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isDarkMode ? 'التحويل للوضع الفاتح (Light Mode)' : 'التحويل للوضع الداكن الفاخر (Dark Mode)'}
              aria-label="Toggle Dark/Light Mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-brand-accent fill-brand-accent/20 animate-in spin-in-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#171616] fill-stone-800/10 animate-in spin-in-90 duration-300" />
              )}
            </button>

            {/* MAIN MENU TRIGGER BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary shadow-2xs hover:bg-[#F3EFEA] dark:hover:bg-[#24211E] transition-all cursor-pointer"
              aria-label="فتح القائمة الرئيسية"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
              <span className="text-xs font-bold hidden sm:inline-block">القائمة</span>
            </button>

          </div>

        </div>
      </header>

      {/* LUXURY MASTER SLIDE-OVER DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#12100F] border-l border-[#E8E2D5] dark:border-[#262320] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-[#E8E2D5] dark:border-[#262320] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] p-1 flex items-center justify-center overflow-hidden">
                    <BrandLogo
                      src={siteSettings.logo_url}
                      alt={siteSettings.company_name_ar || 'رواج'}
                      className="w-full h-full object-contain"
                      fallbackClassName="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-sm text-[#171616] dark:text-[#F7F5F0]">
                      {siteSettings.company_name_ar || 'رواج للطباعة والإعلان'}
                    </h3>
                    <p className="text-[10px] text-[#867F75] dark:text-[#9E978C]">
                      صنعاء، الجمهورية اليمنية
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#70695F] dark:text-[#A8A196] hover:text-[#B9142D] hover:border-[#B9142D] transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Navigation */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Navigation Sections */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#867F75] dark:text-[#9E978C] uppercase tracking-wider px-3">
                    أقسام المنصة
                  </span>
                  <div className="space-y-1">
                    {navLinks.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.view);
                      return (
                        <button
                          key={item.view}
                          onClick={() => {
                            navigate({ view: item.view as any });
                            setMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-bold text-sm transition-all cursor-pointer ${
                            active
                              ? 'bg-brand-primary text-white shadow-sm'
                              : 'text-[#171616] dark:text-[#F7F5F0] hover:bg-white dark:hover:bg-[#1A1816] hover:translate-x-[-2px]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-brand-primary'}`} />
                            <span>{item.label}</span>
                          </div>
                          <ChevronLeft className={`w-4 h-4 opacity-50 ${active ? 'text-white' : ''}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Action Request Custom Quote */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF5ED] to-[#F1EAE0] dark:from-[#1C1917] dark:to-[#171513] border border-[#E4DDD0] dark:border-[#2E2A27] space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    <h4 className="font-heading font-black text-xs text-[#171616] dark:text-[#F7F5F0]">
                      حاسبة عروض الأسعار والمواصفات
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#70695F] dark:text-[#A8A196] leading-relaxed">
                    حدد خامات الطباعة، نوع الورق، خيارات السبوت واليو في والبصمة، واحصل على تسعير فني دقيق فوري.
                  </p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenCustomQuote();
                    }}
                    className="w-full py-2.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    بدء تخصيص مواصفات طلبك
                  </button>
                </div>

                {/* Install Mobile PWA Button in Drawer */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setInstallModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-primary/10 via-brand-primary/5 to-transparent border border-brand-primary/30 text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-primary text-white">
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-bold">تثبيت التطبيق على الشاشة الرئيسية</span>
                        <span className="block text-[10px] text-[#867F75] dark:text-[#9E978C]">تصفح خفيف وسريع وإشعارات فورية</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white">تثبيت</span>
                  </button>
                </div>

                {/* ADMIN HUB / CONTROL PANEL SECTION */}
                <div className="pt-2 border-t border-[#E8E2D5] dark:border-[#262320]">
                  <span className="text-[11px] font-bold text-[#867F75] dark:text-[#9E978C] uppercase tracking-wider px-3 block mb-2">
                    إدارة النظام والإعدادات
                  </span>
                  
                  <button
                    onClick={() => {
                      navigate({ view: 'admin', subView: 'dashboard' });
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#171616] dark:bg-[#1B1816] text-white hover:bg-brand-primary transition-all group shadow-sm cursor-pointer border border-[#2B2725]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                        <ShieldCheck className="w-5 h-5 text-brand-accent group-hover:text-white" />
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-black">لوحة التحكم والإدارة</span>
                        <span className="block text-[10px] text-white/70">تخصيص الموديولات، الخدمات، والطلبات</span>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-white/60 group-hover:translate-x-[-2px] transition-transform" />
                  </button>
                </div>

              </div>

              {/* Drawer Footer Contact Bar */}
              {(siteSettings.phone || siteSettings.mobile_whatsapp) && (
                <div className="p-6 border-t border-[#E8E2D5] dark:border-[#262320] bg-white dark:bg-[#151312] space-y-3">
                  {siteSettings.phone && (
                    <div className="flex items-center justify-between text-xs text-[#70695F] dark:text-[#A8A196]">
                      <span className="font-semibold">خدمة العملاء:</span>
                      <a 
                        href={`tel:${siteSettings.phone}`}
                        className="flex items-center gap-1 font-bold text-[#171616] dark:text-[#F7F5F0] hover:text-brand-primary"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-primary" />
                        <span dir="ltr">{siteSettings.phone}</span>
                      </a>
                    </div>
                  )}

                  {siteSettings.mobile_whatsapp && (
                    <a 
                      href={`https://wa.me/${siteSettings.mobile_whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>محادثة فورية عبر واتساب</span>
                    </a>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* PWA Phone Install Modal */}
      <PWAInstallModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />
    </>
  );
};
