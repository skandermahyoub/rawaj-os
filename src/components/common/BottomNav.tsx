import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  ShoppingBag, 
  QrCode, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  Phone, 
  ShieldCheck, 
  X,
  MessageSquare,
  Sun,
  Moon,
  Layers,
  Settings
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRoute, navigate, quoteItems, isDarkMode, toggleTheme, siteSettings } = useApp();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const cartCount = quoteItems.length;
  const isHome = currentRoute.view === 'home';
  const isCart = currentRoute.view === 'quote-cart';
  const isServices = currentRoute.view === 'services' || currentRoute.view === 'service-detail';
  const whatsappNumber = (siteSettings.mobile_whatsapp || siteSettings.phone || '').replace(/[^0-9]/g, '');

  return (
    <>
      {/* Mobile Bottom Sheet Drawer for "المزيد" */}
      {moreDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setMoreDrawerOpen(false)}
        >
          <div 
            className="bg-[#FAF8F5] dark:bg-[#151312] rounded-t-3xl p-5 sm:p-6 border-t border-[#E8E2D5] dark:border-[#262320] shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle affordance */}
            <div className="w-12 h-1.5 bg-[#D8D2C6] dark:bg-[#332E2C] rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E2D5] dark:border-[#262320]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                <h3 className="font-heading font-black text-sm text-[#171616] dark:text-[#F7F5F0]">
                  منظومة خدمات وأقسام رواج المتكاملة
                </h3>
              </div>
              <button 
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1.5 rounded-full text-[#70695F] dark:text-[#A8A196] hover:bg-[#EAE4D7] dark:hover:bg-[#25211F]"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-4">
              <button
                onClick={() => { navigate({ view: 'packages' }); setMoreDrawerOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#1E1B1A] border border-[#E8E2D5] dark:border-[#2D2A26] text-right hover:border-brand-primary transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">باقات المشاريع</div>
                  <div className="text-[10px] text-[#70695F] dark:text-[#A8A196]">تجهيز الشركات والمقاهي</div>
                </div>
              </button>

              <button
                onClick={() => { navigate({ view: 'portfolio' }); setMoreDrawerOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#1E1B1A] border border-[#E8E2D5] dark:border-[#2D2A26] text-right hover:border-brand-primary transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">معرض الأعمال</div>
                  <div className="text-[10px] text-[#70695F] dark:text-[#A8A196]">مشاريع وتطبيقات سابقة</div>
                </div>
              </button>

              <button
                onClick={() => { navigate({ view: 'blog' }); setMoreDrawerOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#1E1B1A] border border-[#E8E2D5] dark:border-[#2D2A26] text-right hover:border-brand-primary transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">دليل الخامات</div>
                  <div className="text-[10px] text-[#70695F] dark:text-[#A8A196]">مقارنات وخامات الطباعة</div>
                </div>
              </button>

              <button
                onClick={() => { navigate({ view: 'about-contact' }); setMoreDrawerOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#1E1B1A] border border-[#E8E2D5] dark:border-[#2D2A26] text-right hover:border-brand-primary transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-primary-10 flex items-center justify-center text-brand-primary shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">عن رواج والاتصال</div>
                  <div className="text-[10px] text-[#70695F] dark:text-[#A8A196]">صنعاء - شارع العدل</div>
                </div>
              </button>
            </div>

            {/* Quick WhatsApp & Theme Controls */}
            <div className="py-2.5 flex items-center gap-2">
              {whatsappNumber ? (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#25D366]/15 text-[#16834A] dark:text-[#25D366] text-xs font-bold hover:bg-[#25D366]/25 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>واتساب مباشر</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => { setMoreDrawerOpen(false); navigate({ view: 'quote-cart' }); }}
                  className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F5F1E9] dark:bg-[#1E1B1A] text-xs font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>طلب عرض سعر</span>
                </button>
              )}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white dark:bg-[#1E1B1A] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs font-semibold text-[#171616] dark:text-[#F7F5F0]"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#70695F]" />}
                <span>{isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
              </button>
            </div>

            {/* Admin Hub entry in More */}
            <div className="pt-3 border-t border-[#E8E2D5] dark:border-[#262320] mt-2">
              <button
                onClick={() => { navigate({ view: 'admin', subView: 'dashboard' }); setMoreDrawerOpen(false); }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#171616] dark:bg-[#201D1B] text-white hover:bg-brand-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span className="text-xs font-bold">لوحة تحكم إدارة رواج (Admin Hub)</span>
                </div>
                <span className="text-[10px] bg-brand-primary text-white px-2 py-0.5 rounded-md font-bold">دخول</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Ultra-Luxury Bottom Dock */}
      <div className="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
        <nav 
          aria-label="التنقل السفلي السريع"
          className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-[#171616]/95 dark:bg-[#0E0D0C]/95 text-white backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300"
        >
          
          {/* 1. Cart Button with Vibrant Glowing Pill */}
          <button
            onClick={() => navigate({ view: 'quote-cart' })}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isCart
                ? 'bg-brand-primary text-white shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="سلة التسعير"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>السلة ({cartCount})</span>
          </button>

          {/* 2. QR Scanner / Explorer */}
          <button
            onClick={() => navigate({ view: 'services' })}
            className={`p-2 sm:p-2.5 rounded-xl transition-colors cursor-pointer ${
              isServices ? 'text-brand-accent bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="الخدمات والمنتجات"
          >
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* 3. Packages */}
          <button
            onClick={() => navigate({ view: 'packages' })}
            className="p-2 sm:p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="الباقات"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* 4. Portfolio */}
          <button
            onClick={() => navigate({ view: 'portfolio' })}
            className="p-2 sm:p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="معرض الأعمال"
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* 5. Home Button */}
          <button
            onClick={() => navigate({ view: 'home' })}
            className={`p-2 sm:p-2.5 rounded-xl transition-colors cursor-pointer ${
              isHome ? 'text-white bg-brand-primary' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="الصفحة الرئيسية"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* 6. More Drawer Trigger */}
          <button
            onClick={() => setMoreDrawerOpen(true)}
            className="p-2 sm:p-2.5 rounded-xl text-brand-accent hover:text-brand-accent hover:bg-white/10 transition-colors cursor-pointer"
            title="المزيد من الخيارات"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </nav>
      </div>
    </>
  );
};
