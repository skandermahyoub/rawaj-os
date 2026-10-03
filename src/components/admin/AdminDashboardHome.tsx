import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Sparkles, 
  Image, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowLeft,
  Users,
  Plus,
  Palette,
  Package,
  Briefcase,
  BookOpen,
  Settings,
  Layers,
  Zap,
  Building2,
  ExternalLink,
  SlidersHorizontal,
  ChevronLeft,
  Store,
  Award,
  TrendingUp,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { QuoteStatus } from '../../types';

export const AdminDashboardHome: React.FC<{ onNavigateSubView: (view: any, editId?: string) => void }> = ({
  onNavigateSubView,
}) => {
  const { 
    services, 
    quoteRequests, 
    templates, 
    mediaItems, 
    blogPosts, 
    currentUser, 
    designTasks, 
    packages,
    navigate,
    promoSettings
  } = useApp();

  // Core Metrics
  const publishedCount = services.filter((s) => s.service_status === 'published').length;
  const newQuotesCount = quoteRequests.filter((q) => q.status === 'new').length;
  const inProgressQuotesCount = quoteRequests.filter((q) => ['reviewing', 'pricing', 'sent', 'negotiation'].includes(q.status)).length;
  const wonQuotesCount = quoteRequests.filter((q) => q.status === 'won').length;
  const activeDesignTasks = designTasks.filter((t) => t.status === 'in_progress' || t.status === 'proof_submitted').length;

  const recentQuotes = quoteRequests.slice(0, 6);

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'new':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/20">طلب جديد</span>;
      case 'reviewing':
        return <span className="bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#A8A29E] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#E7E0D3] dark:border-[#332F2F]">قيد المراجعة</span>;
      case 'pricing':
        return <span className="bg-[#B9142D]/15 text-[#B9142D] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#B9142D]/30">قيد التسعير</span>;
      case 'sent':
        return <span className="bg-blue-500/10 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">تم الإرسال للعميل</span>;
      case 'won':
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/20">معتمد للإنتاج</span>;
      case 'lost':
        return <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-red-500/20">لم يتم الاتفاق</span>;
      default:
        return <span className="bg-neutral-100 text-neutral-600 text-[10px] px-2.5 py-1 rounded-lg">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 text-right pb-12">
      
      {/* 
        ========================================================================
        1. EXECUTIVE WELCOME BANNER (Rawaj Royal Red Gradient)
        ========================================================================
      */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#700B1B] via-[#940E24] to-[#590614] text-white border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden">
        {/* Ambient lighting effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-[#FDE047] border border-[#D4AF37]/30 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مرحباً بك في منصة الإدارة العليا · مطابع رواج</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white leading-tight">
              أهلاً بك، {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#FCEBEB] max-w-2xl leading-relaxed">
              تحكم بمرونة كاملة في كافة مفاصل مطابع رواج: متابعة طلبات المبيعات، تحديث باقات المنتجات، وإدارة العروض وواجهة المتجر بسهولة وسلاسة.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateSubView('quotes')}
              className="px-4 py-2.5 rounded-2xl bg-white text-[#8B0E23] hover:bg-neutral-100 font-heading font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#8B0E23]" />
              <span>عرض طلبات الأسعار ({newQuotesCount})</span>
            </button>

            <button
              onClick={() => navigate({ view: 'home' })}
              className="px-4 py-2.5 rounded-2xl bg-black/35 hover:bg-black/55 text-white border border-white/20 font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#FDE047]" />
              <span>فتح المتجر الحي</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15">
          <div className="bg-black/25 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
            <span className="block text-xl sm:text-2xl font-heading font-black text-[#FDE047]">
              {newQuotesCount}
            </span>
            <span className="text-[11px] text-[#FDE8E8]">طلبات تسعير جديدة</span>
          </div>

          <div className="bg-black/25 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
            <span className="block text-xl sm:text-2xl font-heading font-black text-white">
              {publishedCount}
            </span>
            <span className="text-[11px] text-[#FDE8E8]">خدمة ومنتج نشط</span>
          </div>

          <div className="bg-black/25 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
            <span className="block text-xl sm:text-2xl font-heading font-black text-white">
              {activeDesignTasks}
            </span>
            <span className="text-[11px] text-[#FDE8E8]">بروفات قيد التصميم</span>
          </div>

          <div className="bg-black/25 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
            <span className="block text-xl sm:text-2xl font-heading font-black text-emerald-400">
              {wonQuotesCount}
            </span>
            <span className="text-[11px] text-[#FDE8E8]">عقود معتمدة للإنتاج</span>
          </div>
        </div>

      </div>

      {/* 
        ========================================================================
        2. THE 4 PRIMARY EXECUTIVE HUBS (Visual Gateways)
        ========================================================================
      */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-black text-base sm:text-lg text-[#171616] dark:text-[#F7F4EE]">
              بوابات إدارة الوكالة السريعة
            </h3>
            <p className="text-xs text-[#706A62] dark:text-[#A0988F]">
              اختر القسم الذي ترغب بإدارته للوصول المباشر دون تعقيد
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          
          {/* GATEWAY 1: Sales & Quotes */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#181514] border-2 border-[#E8E0D2] dark:border-[#2C2725] hover:border-[#B9142D] transition-all shadow-xs hover:shadow-md flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#B9142D]/10 text-[#B9142D] dark:text-[#E03A53] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                {newQuotesCount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[#B9142D] text-white text-xs font-black shadow-xs animate-pulse">
                    {newQuotesCount} طلب جديد
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-heading font-black text-base sm:text-lg text-[#171616] dark:text-white group-hover:text-[#B9142D] transition-colors">
                  ١. الطلبات والمبيعات
                </h4>
                <p className="text-xs text-[#706A62] dark:text-[#A0988F] leading-relaxed mt-1">
                  إدارة طلبات تسعير المطبوعات، مراجعة المواصفات، وتنسيق إجازة البروفات مع ستوديو التصميم.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] dark:border-[#2C2725] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigateSubView('quotes')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>طلبات الأسعار</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('design-tasks')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>مهام التصاميم والبروفات</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('contact-inbox')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>رسائل التواصل</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* GATEWAY 2: Catalog & Printing Services */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#181514] border-2 border-[#E8E0D2] dark:border-[#2C2725] hover:border-[#D4AF37] transition-all shadow-xs hover:shadow-md flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 text-[#B89628] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <Package className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#B89628] text-xs font-black">
                  {services.length} خدمة
                </span>
              </div>

              <div>
                <h4 className="font-heading font-black text-base sm:text-lg text-[#171616] dark:text-white group-hover:text-[#B89628] transition-colors">
                  ٢. الخدمات وباقات الطباعة
                </h4>
                <p className="text-xs text-[#706A62] dark:text-[#A0988F] leading-relaxed mt-1">
                  إضافة أو تعديل كروت، بروشورات، فواتير NCR، علب وتغليف، واللوحات الإعلانية والكلادينج.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] dark:border-[#2C2725] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigateSubView('services')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#D4AF37] hover:text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>دليل المنتجات والخدمات</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('packages')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#D4AF37] hover:text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>باقات المشاريع الشاملة</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('taxonomy')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#D4AF37] hover:text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>أقسام وتصنيفات الإنتاج</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* GATEWAY 3: Storefront & Brand CMS */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#181514] border-2 border-[#E8E0D2] dark:border-[#2C2725] hover:border-[#B9142D] transition-all shadow-xs hover:shadow-md flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#B9142D]/10 text-[#B9142D] dark:text-[#E03A53] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-xs font-bold">
                  واجهة المتجر
                </span>
              </div>

              <div>
                <h4 className="font-heading font-black text-base sm:text-lg text-[#171616] dark:text-white group-hover:text-[#B9142D] transition-colors">
                  ٣. مظهر المتجر والصفحة الرئيسية
                </h4>
                <p className="text-xs text-[#706A62] dark:text-[#A0988F] leading-relaxed mt-1">
                  ترتيب موديولات الصفحة الرئيسية، كاروسال العروض الترويجية الحمراء، السلايدر، والفوتر.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] dark:border-[#2C2725] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigateSubView('promos')}
                className="px-3 py-1.5 rounded-xl bg-[#B9142D]/10 text-[#B9142D] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-[#B9142D]/20"
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>كاروسال العروض المميزة</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('home-customizer')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>ترتيب موديولات الرئيسية</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('footer-settings')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>محتوى الفوتر والفروع</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* GATEWAY 4: Portfolio & Media Content */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#181514] border-2 border-[#E8E0D2] dark:border-[#2C2725] hover:border-blue-500 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold">
                  المعرض والوسائط
                </span>
              </div>

              <div>
                <h4 className="font-heading font-black text-base sm:text-lg text-[#171616] dark:text-white group-hover:text-blue-600 transition-colors">
                  ٤. المعرض والمحتوى التسويقي
                </h4>
                <p className="text-xs text-[#706A62] dark:text-[#A0988F] leading-relaxed mt-1">
                  نشر صور المشاريع المنجزة، إدارة مكتبة الوسائط، ومقالات دليل الخامات.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] dark:border-[#2C2725] flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigateSubView('portfolio')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-blue-600 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>معرض الأعمال والمشاريع</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('media')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-blue-600 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>مكتبة الصور والوسائط</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateSubView('blog')}
                className="px-3 py-1.5 rounded-xl bg-[#F4EFE5] dark:bg-[#25201E] hover:bg-blue-600 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>دليل الخامات والمدونة</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 
        ========================================================================
        3. RECENT ORDERS & QUOTES TABLE (Clean & Actionable)
        ========================================================================
      */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#181514] border border-[#E8E0D2] dark:border-[#2C2725] shadow-xs space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#F0EAE1] dark:border-[#2C2725] pb-4">
          <div>
            <h4 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-white">
              أحدث طلبات عروض الأسعار الواردة
            </h4>
            <p className="text-xs text-[#706A62] dark:text-[#A0988F]">
              الطلبات المباشرة من سلة التسعير بالمتجر
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateSubView('quotes')}
            className="text-xs font-bold text-[#B9142D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>عرض كافة الطلبات ({quoteRequests.length})</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-500">
            لا توجد طلبات تسعير مسجلة حالياً
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-[#F0EAE1] dark:border-[#2C2725] text-[#8E8478]">
                  <th className="py-3 px-3 font-bold">رقم الطلب</th>
                  <th className="py-3 px-3 font-bold">اسم العميل / المؤسسة</th>
                  <th className="py-3 px-3 font-bold">رقم التواصل</th>
                  <th className="py-3 px-3 font-bold">الخدمات المطلوبة</th>
                  <th className="py-3 px-3 font-bold">حالة الطلب</th>
                  <th className="py-3 px-3 font-bold text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1] dark:divide-[#2C2725]">
                {recentQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#F9F6EE] dark:hover:bg-[#1E1B1A] transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#B9142D]">
                      #{q.reference_number || q.id.slice(0, 8)}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#171616] dark:text-white">
                      {q.customer?.name || 'عميل مباشر'}
                      {q.customer?.company && (
                        <span className="block text-[10px] text-neutral-500">{q.customer.company}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono" dir="ltr">
                      {q.customer?.mobile || q.customer?.whatsapp || '-'}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="line-clamp-1 max-w-[200px]">
                        {q.items.map((i) => i.service_name_ar).join('، ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      {getStatusBadge(q.status)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => onNavigateSubView('quotes')}
                        className="px-3 py-1 rounded-lg bg-[#B9142D]/10 text-[#B9142D] hover:bg-[#B9142D] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        معاينة وتسعير
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
