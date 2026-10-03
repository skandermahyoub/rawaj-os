import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { uploadDataUrlToRawajStorage } from '../../lib/storage';
import { BrandLogo } from '../common/BrandLogo';
import { PWAInstallModal } from '../common/PWAInstallModal';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Palette, 
  Briefcase, 
  Settings, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Store,
  ChevronDown,
  ChevronLeft,
  Sparkles,
  Layers,
  SlidersHorizontal,
  Award,
  Image,
  BookOpen,
  HelpCircle,
  Building2,
  Zap,
  FolderOpen,
  Compass,
  Upload,
  Download,
  Smartphone,
  Plus
} from 'lucide-react';

interface AdminLayoutProps {
  currentSubView: string;
  onNavigateSubView: (view: any, editId?: string) => void;
  children: React.ReactNode;
}

interface SubOption {
  id: string;
  label: string;
  shortLabel?: string;
  desc: string;
  icon: any;
  badge?: string | number | null;
}

interface MainPillar {
  id: string;
  title: string;
  shortTitle: string;
  desc: string;
  icon: any;
  options: SubOption[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentSubView,
  onNavigateSubView,
  children,
}) => {
  const { 
    currentUser, 
    isDarkMode, 
    toggleTheme, 
    navigate, 
    quoteRequests,
    services,
    designTasks,
    contactMessages,
    packages,
    promoSettings,
    siteSettings,
    updateSiteSettings
  } = useApp();

  // Supabase Auth is the single source of truth for administration access.
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showOwnerSetup, setShowOwnerSetup] = useState(false);
  const [ownerSetupName, setOwnerSetupName] = useState('');
  const [ownerSetupEmail, setOwnerSetupEmail] = useState('');
  const [ownerSetupPassword, setOwnerSetupPassword] = useState('');
  const [ownerSetupToken, setOwnerSetupToken] = useState('');
  const [isBootstrappingOwner, setIsBootstrappingOwner] = useState(false);

  const verifyAdministrativeSession = async (userId?: string) => {
    if (!userId) {
      setIsAdminAuthenticated(false);
      setIsCheckingAuth(false);
      return false;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', userId)
      .single();

    const allowed = !error
      && profile?.is_active === true
      && ['owner', 'admin', 'editor', 'sales', 'designer'].includes(profile.role);

    if (!allowed) {
      await supabase.auth.signOut();
      setIsAdminAuthenticated(false);
      setAuthError('هذا الحساب لا يملك صلاحية الدخول إلى لوحة إدارة رواج.');
    } else {
      setIsAdminAuthenticated(true);
      setAuthError('');
    }

    setIsCheckingAuth(false);
    return allowed;
  };

  useEffect(() => {
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      void verifyAdministrativeSession(data.session?.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        if (active) void verifyAdministrativeSession(session?.user.id);
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsCheckingAuth(true);

    const email = adminEmailInput.trim().toLowerCase();
    if (!email || !adminPasswordInput) {
      setAuthError('أدخل البريد الإلكتروني وكلمة المرور.');
      setIsCheckingAuth(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: adminPasswordInput,
    });

    if (error || !data.user) {
      setAuthError('بيانات الدخول غير صحيحة.');
      setIsCheckingAuth(false);
      return;
    }

    await verifyAdministrativeSession(data.user.id);
  };

  const handleOwnerBootstrap = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const email = ownerSetupEmail.trim().toLowerCase();
    const name = ownerSetupName.trim();
    const token = ownerSetupToken.trim();

    if (!name || !email || !token || ownerSetupPassword.length < 10) {
      setAuthError('أكمل الاسم والبريد ورمز التهيئة، واستخدم كلمة مرور لا تقل عن 10 أحرف.');
      return;
    }

    setIsBootstrappingOwner(true);

    try {
      const { data, error } = await supabase.functions.invoke('bootstrap-owner', {
        body: {
          name,
          email,
          password: ownerSetupPassword,
          bootstrapToken: token,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password: ownerSetupPassword,
      });

      if (loginError || !loginData.user) {
        throw loginError || new Error('تم إنشاء حساب المالك لكن تعذر تسجيل الدخول تلقائيًا.');
      }

      setAdminEmailInput(email);
      setAdminPasswordInput('');
      setOwnerSetupToken('');
      setOwnerSetupPassword('');
      setShowOwnerSetup(false);
      await verifyAdministrativeSession(loginData.user.id);
    } catch (error: any) {
      const message = error?.message || 'تعذر تهيئة حساب المالك.';
      setAuthError(
        message.includes('already completed')
          ? 'تمت تهيئة حساب المالك مسبقًا. استخدم تسجيل الدخول العادي.'
          : message
      );
    } finally {
      setIsBootstrappingOwner(false);
    }
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    navigate({ view: 'home' });
  };

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const subOptionsScrollRef = useRef<HTMLDivElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Real, live operational metrics (zero fake data)
  const pendingQuotes = quoteRequests.filter((q) => q.status === 'new' || q.status === 'reviewing').length;
  const draftServices = services.filter((s) => s.service_status === 'draft' || s.service_status === 'ready_for_review').length;
  const activeTasks = designTasks.filter((t) => t.status === 'in_progress' || t.status === 'proof_submitted').length;
  const unreadMessages = contactMessages.filter((m) => m.status === 'unread').length;
  const activePromos = promoSettings?.banners?.filter((b) => b.is_active)?.length || 0;

  // 6 Primary Executive Pillars
  const pillars: MainPillar[] = useMemo(() => [
    {
      id: 'dashboard-hub',
      title: 'مركز القيادة',
      shortTitle: 'الرئيسية',
      desc: 'المؤشرات العامة، التنبيهات، وملخص العمليات اليومية',
      icon: LayoutDashboard,
      options: [
        { id: 'dashboard', label: 'لوحة المؤشرات العامة', shortLabel: 'المؤشرات', desc: 'نظرة شمولية على المبيعات، الطلبات، والأداء', icon: LayoutDashboard },
      ]
    },
    {
      id: 'sales-hub',
      title: 'الطلبات والمبيعات',
      shortTitle: 'الطلبات',
      desc: 'متابعة طلبات التسعير، بروفات التصاميم، ورسائل العملاء',
      icon: ShoppingBag,
      options: [
        { id: 'quotes', label: 'طلبات عروض الأسعار', shortLabel: 'طلبات الأسعار', desc: 'طلبات التسعير الواردة من المتجر وسلة المواصفات', icon: ShoppingBag, badge: pendingQuotes > 0 ? `${pendingQuotes} جديد` : null },
        { id: 'design-tasks', label: 'مهام التصاميم والبروفات', shortLabel: 'ستوديو التصميم', desc: 'متابعة بروفات المصممين وإجازة العينات الفنية', icon: Layers, badge: activeTasks > 0 ? activeTasks : null },
        { id: 'contact-inbox', label: 'رسائل واستفسارات التواصل', shortLabel: 'رسائل الموقع', desc: 'الرسائل الواردة عبر نموذج الاتصال المباشر', icon: BookOpen, badge: unreadMessages > 0 ? `${unreadMessages} جديد` : null },
      ]
    },
    {
      id: 'catalog-hub',
      title: 'الخدمات والباقات',
      shortTitle: 'الخدمات',
      desc: 'دليل المنتجات، باقات المشاريع، والأقسام والتصنيفات',
      icon: Package,
      options: [
        { id: 'services', label: 'دليل المنتجات والخدمات', shortLabel: 'دليل الخدمات', desc: 'إدارة وتعديل خدمات الطباعة والتغليف واللوحات', icon: Package, badge: draftServices > 0 ? `${draftServices} مسودة` : null },
        { id: 'packages', label: 'باقات المشاريع الشاملة', shortLabel: 'باقات المشاريع', desc: 'عروض وباقات تجهيز الشركات والمقاهي المتكاملة', icon: Award },
        { id: 'taxonomy', label: 'أقسام وتصنيفات الإنتاج', shortLabel: 'الأقسام والهيكل', desc: 'الهيكل الرئيسي لأقسام الطباعة والإعلان والتغليف', icon: FolderOpen },
        { id: 'templates', label: 'قوالب المواصفات الجاهزة', shortLabel: 'قوالب المواصفات', desc: 'نماذج المواصفات الفنية المعتمدة للعملاء', icon: Sparkles },
      ]
    },
    {
      id: 'storefront-hub',
      title: 'مظهر المتجر والواجهة',
      shortTitle: 'واجهة المتجر',
      desc: 'ترتيب وتخصيص موديولات الصفحة الرئيسية والعروض',
      icon: Palette,
      options: [
        { id: 'home-customizer', label: 'ترتيب وتخصيص الصفحة الرئيسية', shortLabel: 'ترتيب الرئيسية', desc: 'التحكم في ظهور وترتيب كافة موديولات المتجر', icon: SlidersHorizontal },
        { id: 'promos', label: 'كاروسال العروض الترويجية الحمراء', shortLabel: 'العروض المميزة', desc: 'إدارة العروض الترويجية المنزلقة والحملات الموسمية', icon: Award, badge: activePromos > 0 ? `${activePromos} نشط` : null },
        { id: 'home-slides', label: 'السلايدر السينمائي الفاخر', shortLabel: 'السلايدر الترحيبي', desc: 'الشرائح السينمائية الكبرى في أعلى الرئيسية', icon: Sparkles },
        { id: 'marquee', label: 'شريط الأخبار المتحرك', shortLabel: 'شريط الأخبار', desc: 'النصوص الإخبارية وتنبيهات الخصومات السريعة', icon: Zap },
        { id: 'header-hero', label: 'الهيدر وشعار الموقع', shortLabel: 'الهيدر والشعار', desc: 'بيانات الترحيب والبحث وشعار رواج بالهيدر', icon: Building2 },
        { id: 'footer-settings', label: 'محتوى الفوتر والفروع', shortLabel: 'الفوتر والفروع', desc: 'عناوين الفروع، الهواتف، وحقوق الملكية', icon: Compass },
        { id: 'about-module', label: 'من نحن وميثاق الجودة', shortLabel: 'من نحن', desc: 'كلمة الإدارة العامة، الرؤية، والرسالة والهدف', icon: Building2 },
        { id: 'clients-testimonials', label: 'شركاء النجاح والعملاء', shortLabel: 'شركاء النجاح', desc: 'شعارات عملاء رواج وآراء المؤسسات المتعاقدة', icon: Users },
        { id: 'features', label: 'مميزات وقوة رواج', shortLabel: 'مميزات رواج', desc: 'نقاط القوة التنافسية والضمانات الفنية الشاملة', icon: Award },
        { id: 'style-customizer', label: 'ألوان وهوية التصميم', shortLabel: 'ألوان الهوية', desc: 'الخطوط والألوان ونمط التصميم المعتمد', icon: Palette },
      ]
    },
    {
      id: 'media-hub',
      title: 'المعرض والمحتوى',
      shortTitle: 'المعرض والوسائط',
      desc: 'معرض الأعمال السابقة، مكتبة الصور، والمدونة الفنية',
      icon: Briefcase,
      options: [
        { id: 'portfolio', label: 'معرض الأعمال والمشاريع', shortLabel: 'معرض المشاريع', desc: 'استعراض ونشر صور إنجازات وتجهيزات رواج', icon: Briefcase },
        { id: 'media', label: 'مكتبة الصور', shortLabel: 'مكتبة الصور', desc: 'رفع الصور وتنظيمها وحفظها في مكتبة الوسائط', icon: Image },
        { id: 'blog', label: 'دليل الخامات والمدونة', shortLabel: 'دليل الخامات', desc: 'مقالات إرشادية للعملاء حول الورق والتغليف والطباعة', icon: BookOpen },
        { id: 'faq', label: 'الأسئلة الشائعة والأجوبة', shortLabel: 'الأسئلة الشائعة', desc: 'إجابات الاستفسارات المتكررة لعملاء الوكالة', icon: HelpCircle },
      ]
    },
    {
      id: 'settings-hub',
      title: 'إعدادات الوكالة',
      shortTitle: 'الإعدادات',
      desc: 'بيانات المؤسسة، الفروع، وفريق العمل والصلاحيات',
      icon: Settings,
      options: [
        { id: 'settings', label: 'بيانات المؤسسة والفروع', shortLabel: 'بيانات الوكالة', desc: 'اسم الوكالة، أرقام الهواتف، المقر، والبريد الرسمي', icon: Settings },
        { id: 'users', label: 'فريق العمل والصلاحيات', shortLabel: 'فريق العمل', desc: 'إدارة حسابات المديرين والمصممين والمبيعات', icon: Users },
      ]
    }
  ], [pendingQuotes, activeTasks, draftServices, unreadMessages, activePromos]);

  // Active Main Pillar based on currently selected subview
  const activePillar = useMemo(() => {
    for (const p of pillars) {
      if (p.options.some(opt => opt.id === currentSubView)) {
        return p;
      }
    }
    return pillars[0];
  }, [pillars, currentSubView]);

  // Current active sub-option details
  const currentOption = useMemo(() => {
    for (const p of pillars) {
      const found = p.options.find(opt => opt.id === currentSubView);
      if (found) return found;
    }
    return pillars[0].options[0];
  }, [pillars, currentSubView]);

  // Auto scroll active option into view on change
  useEffect(() => {
    if (subOptionsScrollRef.current) {
      const activeEl = subOptionsScrollRef.current.querySelector('.sub-option-active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentSubView]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة كبير، يرجى اختيار صورة أقل من 5 ميجابايت');
      return;
    }

    try {
      const optimized = await optimizeImageFile(file, 900, 900, 0.9);
      const stored = await uploadDataUrlToRawajStorage(optimized.dataUrl, {
        folder: 'branding',
        fileName: 'rawaj-logo',
      });
      await updateSiteSettings({ logo_url: stored.publicUrl });
    } catch (error: any) {
      console.error('Supabase logo upload failed:', error);
      alert(error?.message || 'تعذر رفع الشعار.');
    } finally {
      if (logoFileInputRef.current) logoFileInputRef.current.value = '';
    }
  };

  const handlePillarClick = (pillar: MainPillar) => {
    onNavigateSubView(pillar.options[0].id);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#110F0E] text-white flex items-center justify-center p-4 font-sans" dir="rtl">
        <div className="text-xs text-[#A8A29E]">جارٍ التحقق من جلسة الإدارة الآمنة...</div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#110F0E] text-white flex items-center justify-center p-4 font-sans" dir="rtl">
        <div className="max-w-md w-full bg-[#1C1A19] border border-[#332F2D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#B9142D]/20 border border-[#B9142D]/40 rounded-2xl flex items-center justify-center mx-auto text-[#B9142D] mb-3 flex items-center justify-center">
              <BrandLogo
                src={siteSettings.logo_url}
                alt={siteSettings.company_name_ar || 'رواج'}
                className="w-10 h-10 object-contain"
                fallbackClassName="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="font-heading font-extrabold text-xl text-white">لوحة تحكم وإدارة رواج</h1>
            <p className="text-xs text-[#A8A29E]">منطقة محمية عبر Supabase Auth — استخدم حساب الإدارة المعتمد</p>
          </div>

          {!showOwnerSetup ? (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#D6D3D1]">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  placeholder="admin@rawaj.com"
                  autoComplete="username"
                  className="w-full bg-[#272322] border border-[#3A3533] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#D6D3D1]">كلمة المرور</label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="كلمة المرور..."
                  autoComplete="current-password"
                  className="w-full bg-[#272322] border border-[#3A3533] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs text-center font-bold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                تسجيل الدخول إلى مركز القيادة
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthError('');
                  setShowOwnerSetup(true);
                }}
                className="w-full py-2.5 px-4 border border-[#4A433F] hover:border-[#B9142D] text-[#CFC7BE] hover:text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                تهيئة حساب المالك لأول مرة
              </button>
            </form>
          ) : (
            <form onSubmit={handleOwnerBootstrap} className="space-y-3">
              <div className="p-3 rounded-xl bg-[#272322] border border-[#3A3533] text-[11px] text-[#CFC7BE] leading-relaxed">
                هذا المسار يعمل مرة واحدة فقط. بعد إنشاء أول Owner يتم تعطيله تلقائيًا من الخادم.
              </div>

              <input
                type="text"
                value={ownerSetupName}
                onChange={(e) => setOwnerSetupName(e.target.value)}
                placeholder="اسم المالك"
                autoComplete="name"
                className="w-full bg-[#272322] border border-[#3A3533] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
              />

              <input
                type="email"
                value={ownerSetupEmail}
                onChange={(e) => setOwnerSetupEmail(e.target.value)}
                placeholder="البريد الإلكتروني للمالك"
                autoComplete="email"
                className="w-full bg-[#272322] border border-[#3A3533] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
              />

              <input
                type="password"
                value={ownerSetupPassword}
                onChange={(e) => setOwnerSetupPassword(e.target.value)}
                placeholder="كلمة مرور قوية — 10 أحرف على الأقل"
                autoComplete="new-password"
                className="w-full bg-[#272322] border border-[#3A3533] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
              />

              <input
                type="password"
                value={ownerSetupToken}
                onChange={(e) => setOwnerSetupToken(e.target.value)}
                placeholder="رمز تهيئة المالك"
                autoComplete="off"
                className="w-full bg-[#272322] border border-[#3A3533] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-hidden focus:border-[#B9142D]"
              />

              {authError && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs text-center font-bold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isBootstrappingOwner}
                className="w-full py-3 px-4 bg-[#B9142D] hover:bg-[#930F23] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                {isBootstrappingOwner ? 'جارٍ إنشاء حساب المالك...' : 'إنشاء حساب المالك وتسجيل الدخول'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthError('');
                  setShowOwnerSetup(false);
                }}
                className="w-full py-2 text-xs text-[#A8A29E] hover:text-white underline"
              >
                العودة إلى تسجيل الدخول
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => navigate({ view: 'home' })}
              className="text-xs text-[#A8A29E] hover:text-white underline cursor-pointer"
            >
              ← العودة إلى المتجر العام
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0E0D0C] text-[#171616] dark:text-[#F7F5F0] flex flex-col font-sans transition-colors duration-300" dir="rtl">
      
      {/* Hidden File Input for Direct Logo Upload */}
      <input 
        type="file" 
        ref={logoFileInputRef} 
        onChange={handleLogoUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* 
        ========================================================================
        MASTER HEADER:
        - Mobile View: Shows ONLY the logo and the sleek badge «الإدارة»
          to eliminate all text crowding and leave complete breathing room!
        - Desktop View: Shows the full agency brand name, subtitle, and pillar links.
        ========================================================================
      */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 dark:bg-[#0E0D0C]/90 backdrop-blur-xl border-b border-[#E8E2D5]/80 dark:border-[#262320]/80 transition-colors duration-300">
        
        {/* Main Top Header Bar Row */}
        <div className="max-w-7xl mx-auto w-full h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-8">
          
          {/* BRAND & LOGO SECTION */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Logo Container with Quick Upload Overlay */}
            <div 
              className="relative group cursor-pointer shrink-0 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-[#1A1816] border-2 border-[#E8E2D5] dark:border-[#2D2A26] shadow-xs group-hover:border-brand-primary transition-all overflow-hidden"
              onClick={() => logoFileInputRef.current?.click()}
              title="انقر لتغيير أو رفع شعار رواج فورياً"
            >
              <BrandLogo
                src={siteSettings.logo_url}
                alt={siteSettings.company_name_ar || 'رواج'}
                className="w-full h-full object-contain p-1"
                fallbackClassName="w-full h-full object-contain"
              />

              {/* Quick Upload Hover Overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[9px] font-bold gap-0.5">
                <Upload className="w-3.5 h-3.5 text-brand-accent" />
                <span>شعار</span>
              </div>
            </div>

            {/* MOBILE ONLY: Just the clean badge 'الإدارة' with no long text wrapping */}
            <div className="sm:hidden flex items-center">
              <span className="px-2.5 py-1 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-[#E03A53] text-xs font-heading font-black border border-brand-primary/20 shadow-2xs">
                الإدارة
              </span>
            </div>

            {/* DESKTOP ONLY: Full Agency Name & Subtitle */}
            <button 
              onClick={() => onNavigateSubView('dashboard')}
              className="hidden sm:flex flex-col text-right justify-center focus:outline-hidden hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm sm:text-base md:text-xl tracking-tight text-[#171616] dark:text-[#F7F5F0] block leading-snug">
                  {siteSettings.company_name_ar || 'مطابع رواج للطباعة الفاخرة'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-[#E03A53] text-[10px] sm:text-[11px] font-bold border border-brand-primary/20">
                  لوحة الإدارة
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#867F75] dark:text-[#9E978C] font-bold tracking-wide uppercase line-clamp-1 leading-none mt-0.5">
                المنظومة التنفيذية لإدارة العمليات والإنتاج
              </span>
            </button>
          </div>

          {/* DESKTOP NAVIGATION LINKS (Executive Pillars of Admin) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13.5px] font-semibold text-[#70695F] dark:text-[#A8A196]">
            {pillars.map((pillar) => {
              const active = activePillar.id === pillar.id;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handlePillarClick(pillar)}
                  className={`relative py-2 flex items-center gap-1.5 transition-colors hover:text-[#171616] dark:hover:text-[#F7F5F0] cursor-pointer ${
                    active ? 'text-brand-primary font-bold' : ''
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-brand-primary' : 'opacity-70'}`} />
                  <span>{pillar.title}</span>
                  {active && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-brand-primary rounded-full animate-in fade-in duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* HEADER ACTIONS: STORE PREVIEW + PWA MODAL + THEME TOGGLE + USER MENU / DRAWER */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* View Live Storefront CTA */}
            <button
              onClick={() => navigate({ view: 'home' })}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
              title="الانتقال الفوري إلى المتجر لمعاينة التعديلات مباشرة"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">معاينة المتجر</span>
              <span className="sm:hidden text-[11px]">المتجر</span>
            </button>

            {/* PWA Phone Install Preview Button */}
            <button
              type="button"
              onClick={() => setPwaModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary text-xs font-bold shadow-2xs hover:bg-[#F3EFEA] dark:hover:bg-[#24211E] transition-all cursor-pointer shrink-0"
              title="معاينة نافذة تثبيت التطبيق للهاتف (PWA)"
            >
              <Smartphone className="w-3.5 h-3.5 text-brand-primary" />
              <span className="text-[11px]">تطبيق الهاتف</span>
            </button>

            {/* THEME TOGGLE (Exact match to Header.tsx) */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              title={isDarkMode ? 'التحويل للوضع الفاتح (Light Mode)' : 'التحويل للوضع الداكن الفاخر (Dark Mode)'}
              aria-label="Toggle Dark/Light Mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-brand-accent fill-brand-accent/20 animate-in spin-in-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#171616] fill-stone-800/10 animate-in spin-in-90 duration-300" />
              )}
            </button>

            {/* Authenticated administrator profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hidden xl:flex items-center gap-2 p-1.5 px-2.5 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary shadow-2xs transition-all cursor-pointer"
                title="الحساب الحالي"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-primary text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold leading-tight text-[#171616] dark:text-[#F7F5F0]">{currentUser.name}</div>
                  <div className="text-[10px] text-brand-primary font-bold">
                    {currentUser.role === 'owner' ? 'المالك / المدير العام' : currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#867F75]" />
              </button>

              {userMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] shadow-2xl p-2 z-50 text-[#171616] dark:text-[#F7F5F0] animate-in fade-in duration-200">
                  <div className="p-2 border-b border-[#E8E2D5] dark:border-[#262320] mb-1">
                    <p className="text-xs font-bold">{currentUser.name}</p>
                    <p className="text-[11px] text-[#867F75] dark:text-[#9E978C] font-mono">{currentUser.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleAdminLogout()}
                    className="w-full text-right p-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>

            {/* MAIN MENU / DRAWER TRIGGER BUTTON (Exact match to Header.tsx) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary shadow-2xs hover:bg-[#F3EFEA] dark:hover:bg-[#24211E] transition-all cursor-pointer shrink-0"
              aria-label="فتح قائمة أقسام لوحة التحكم"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
              <span className="text-xs font-bold hidden sm:inline-block">الأقسام</span>
            </button>

          </div>

        </div>

        {/* 
          ========================================================================
          TIER 2: SUB-OPTIONS RIBBON (خيارات القسم النشط - تظهر مباشرة تحت الهيدر)
          Under the header, clicking any section immediately displays its options
          ========================================================================
        */}
        <div className="bg-white/80 dark:bg-[#141211]/80 backdrop-blur-md border-t border-[#E8E2D5]/70 dark:border-[#262320]/70 px-3 sm:px-8 py-2.5 shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            {/* Active Hub Context Label */}
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#70695F] dark:text-[#A8A196] shrink-0 border-l border-[#E8E2D5] dark:border-[#262320] pl-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
              <span>خيارات {activePillar.title}:</span>
            </div>

            {/* Horizontal Scrollable Sub-Options Ribbon */}
            <div 
              ref={subOptionsScrollRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 w-full"
            >
              {activePillar.options.map((opt) => {
                const OptIcon = opt.icon;
                const isActive = currentSubView === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onNavigateSubView(opt.id)}
                    className={`sub-option-btn px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      isActive
                        ? 'sub-option-active bg-brand-primary text-white shadow-xs font-black ring-1 ring-brand-accent/50 scale-102'
                        : 'bg-white dark:bg-[#1A1816] text-[#70695F] dark:text-[#A8A196] hover:text-[#171616] dark:hover:text-white border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/40 shadow-2xs'
                    }`}
                    title={opt.desc}
                  >
                    <OptIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-brand-primary'}`} />
                    <span>{opt.label}</span>
                    {opt.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black leading-none ${
                        isActive ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'
                      }`}>
                        {opt.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </header>

      {/* 
        ========================================================================
        LUXURY MASTER SLIDE-OVER DRAWER
        ========================================================================
      */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
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
                      {siteSettings.company_name_ar || 'مطابع رواج للطباعة الفاخرة'}
                    </h3>
                    <p className="text-[10px] text-brand-primary font-bold">
                      لوحة الإدارة والتحكم الشاملة
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#70695F] dark:text-[#A8A196] hover:text-[#B9142D] hover:border-[#B9142D] transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Navigation */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                
                {/* PWA Phone Install Action in Drawer */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setPwaModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-brand-primary/10 via-brand-primary/5 to-transparent border border-brand-primary/30 text-[#171616] dark:text-[#F7F5F0] hover:border-brand-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-brand-primary text-white">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold">تنزيل وتثبيت التطبيق على الهاتف</span>
                      <span className="block text-[10px] text-[#867F75] dark:text-[#9E978C]">تجربة PWA رسمية بشعار واسم رواج</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white">تثبيت</span>
                </button>

                {/* All Pillars and their Sub-Options */}
                <div className="space-y-4">
                  {pillars.map((pillar) => {
                    const PillarIcon = pillar.icon;
                    const isPillarActive = activePillar.id === pillar.id;

                    return (
                      <div key={pillar.id} className="space-y-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            handlePillarClick(pillar);
                            setMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-heading font-black text-xs transition-all cursor-pointer ${
                            isPillarActive
                              ? 'bg-brand-primary text-white shadow-xs'
                              : 'bg-white dark:bg-[#1A1816] text-[#171616] dark:text-[#F7F5F0] border border-[#E8E2D5] dark:border-[#2D2A26]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <PillarIcon className={`w-4 h-4 ${isPillarActive ? 'text-white' : 'text-brand-primary'}`} />
                            <span>{pillar.title}</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 opacity-60" />
                        </button>

                        {/* Sub Options under active or expanded pillar */}
                        <div className="pr-4 space-y-1 border-r-2 border-brand-primary/30 mr-3">
                          {pillar.options.map((opt) => {
                            const OptIcon = opt.icon;
                            const isOptActive = currentSubView === opt.id;

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  onNavigateSubView(opt.id);
                                  setMobileDrawerOpen(false);
                                }}
                                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-right text-xs transition-colors ${
                                  isOptActive
                                    ? 'font-black text-brand-primary bg-brand-primary/10'
                                    : 'font-medium text-[#70695F] dark:text-[#A8A196] hover:text-[#171616] dark:hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <OptIcon className="w-3.5 h-3.5" />
                                  <span>{opt.label}</span>
                                </div>
                                {opt.badge && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-brand-primary text-white text-[9px] font-bold">
                                    {opt.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[#E8E2D5] dark:border-[#262320]">
                  <div className="text-[11px] font-bold text-[#867F75] dark:text-[#9E978C]">
                    الحساب: <span className="text-brand-primary">{currentUser.name}</span>
                  </div>
                </div>

              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-6 border-t border-[#E8E2D5] dark:border-[#262320] bg-white dark:bg-[#1A1816] space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    navigate({ view: 'home' });
                  }}
                  className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>معاينة متجر العملاء المباشر</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        MAIN CONTENT VIEWPORT & BREADCRUMB CONTEXT
        ========================================================================
      */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-5">
        
        {/* 
          ========================================================================
          EXECUTIVE LIVE STATISTICAL DASHBOARD BAR & QUICK ACTIONS BAR
          Connected 100% to actual business data and live state (no mock data)
          ========================================================================
        */}
        <div className="bg-white dark:bg-[#141211] p-3 sm:p-5 rounded-2xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs space-y-3">
          
          {/* Header of the Stats Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-[#E8E2D5]/70 dark:border-[#262320] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F7F5F0]">
                المؤشرات التنفيذية للعمليات الحية
              </h3>
              <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] hidden md:inline">
                (بيانات مباشرة من قاعدة البيانات وسلة التسعير)
              </span>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPwaModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border border-brand-primary/20"
                title="تنزيل وتثبيت تطبيق رواج على الهاتف"
              >
                <Smartphone className="w-3.5 h-3.5 text-brand-primary" />
                <span className="hidden sm:inline">تطبيق الهاتف</span>
              </button>

              <button
                type="button"
                onClick={() => navigate({ view: 'home' })}
                className="px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] hover:bg-[#F3EFEA] text-[#70695F] dark:text-[#A8A196] border border-[#E8E2D5] dark:border-[#2D2A26] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="معاينة المتجر المباشر"
              >
                <Store className="w-3.5 h-3.5 text-brand-primary" />
                <span className="hidden sm:inline">معاينة المتجر</span>
              </button>
            </div>
          </div>

          {/* Real Live Stat Cards Grid (Touch Scrollable on Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            
            {/* Stat 1: Quote Requests */}
            <div 
              onClick={() => onNavigateSubView('quotes')}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] font-bold">طلبات الأسعار</span>
                <div className="w-6 h-6 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                  {pendingQuotes}
                </span>
                <span className="text-[10px] text-brand-primary font-bold">جديد</span>
              </div>
              <div className="text-[10px] text-[#867F75] dark:text-[#9E978C] mt-0.5 truncate">
                إجمالي: {quoteRequests.length} طلب
              </div>
            </div>

            {/* Stat 2: Active Services */}
            <div 
              onClick={() => onNavigateSubView('services')}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] font-bold">خدمات الطباعة</span>
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Package className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                  {services.length}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">خدمة</span>
              </div>
              <div className="text-[10px] text-[#867F75] dark:text-[#9E978C] mt-0.5 truncate">
                {draftServices > 0 ? `${draftServices} بانتظار الاعتماد` : 'معتمدة'}
              </div>
            </div>

            {/* Stat 3: Design Studio Tasks */}
            <div 
              onClick={() => onNavigateSubView('design-tasks')}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] font-bold">مهام التصاميم</span>
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                  {activeTasks}
                </span>
                <span className="text-[10px] text-blue-600 font-bold">نشطة</span>
              </div>
              <div className="text-[10px] text-[#867F75] dark:text-[#9E978C] mt-0.5 truncate">
                بروفات فنية
              </div>
            </div>

            {/* Stat 4: Customer Messages */}
            <div 
              onClick={() => onNavigateSubView('contact-inbox')}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] font-bold">رسائل الموقع</span>
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                  {unreadMessages}
                </span>
                <span className="text-[10px] text-amber-600 font-bold">غير مقروءة</span>
              </div>
              <div className="text-[10px] text-[#867F75] dark:text-[#9E978C] mt-0.5 truncate">
                إجمالي: {contactMessages.length} رسالة
              </div>
            </div>

            {/* Stat 5: Project Packages */}
            <div 
              onClick={() => onNavigateSubView('packages')}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] font-bold">باقات المشاريع</span>
                <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                  {packages.length}
                </span>
                <span className="text-[10px] text-purple-600 font-bold">باقة</span>
              </div>
              <div className="text-[10px] text-[#867F75] dark:text-[#9E978C] mt-0.5 truncate">
                تجهيز الشركات والمقاهي
              </div>
            </div>

            {/* Stat 6: Active Promo Banners */}
            <div 
              onClick={() => onNavigateSubView('promos')}
              className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#867F75] dark:text-[#9E978C] font-bold">العروض الترويجية</span>
                <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-[#171616] dark:text-white">
                  {activePromos}
                </span>
                <span className="text-[10px] text-rose-600 font-bold">عرض منزلق</span>
              </div>
              <div className="text-[10px] text-[#867F75] dark:text-[#9E978C] mt-0.5 truncate">
                الكاروسيل الأحمر المعتمد
              </div>
            </div>

          </div>

          {/* Quick Real Operational Actions Row */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
            <span className="text-[11px] font-bold text-[#867F75] dark:text-[#9E978C] shrink-0">
              إجراءات سريعة:
            </span>

            <button
              type="button"
              onClick={() => onNavigateSubView('services')}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] hover:bg-[#F3EFEA] text-[#171616] dark:text-[#F7F5F0] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-brand-primary" />
              <span>إدارة ورفع خدمة جديدة</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateSubView('quotes')}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] hover:bg-[#F3EFEA] text-[#171616] dark:text-[#F7F5F0] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brand-primary" />
              <span>فحص ومتابعة طلبات الأسعار</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateSubView('home-customizer')}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] hover:bg-[#F3EFEA] text-[#171616] dark:text-[#F7F5F0] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-primary" />
              <span>ترتيب موديولات المتجر</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateSubView('promos')}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1816] hover:bg-[#F3EFEA] text-[#171616] dark:text-[#F7F5F0] border border-[#E8E2D5] dark:border-[#2D2A26] hover:border-brand-primary text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>تحديث العروض المنزلقة</span>
            </button>
          </div>

        </div>

        {/* Active Section Header & Navigation Breadcrumb Bar */}
        <div className="bg-white dark:bg-[#141211] p-4 sm:p-5 rounded-2xl border border-[#E8E2D5] dark:border-[#262320] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="space-y-1 text-right">
            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#867F75] dark:text-[#9E978C]">
              <button
                type="button"
                onClick={() => onNavigateSubView('dashboard')}
                className="hover:text-brand-primary cursor-pointer transition-colors"
              >
                الرئيسية
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onNavigateSubView(activePillar.options[0].id)}
                className="hover:text-brand-primary cursor-pointer transition-colors"
              >
                {activePillar.title}
              </button>
              <span>/</span>
              <span className="text-brand-primary font-black">{currentOption.label}</span>
            </div>

            {/* Current Sub-View Title & Description */}
            <h2 className="font-heading font-black text-base sm:text-xl text-[#171616] dark:text-[#F7F5F0]">
              {currentOption.label}
            </h2>
            <p className="text-xs text-[#70695F] dark:text-[#A8A196]">
              {currentOption.desc}
            </p>
          </div>

          {/* Quick Dropdown: Switch to any other option in this category */}
          {activePillar.options.length > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-[#867F75] hidden md:inline">الانتقال السريع بالقسم:</span>
              <select
                value={currentSubView}
                onChange={(e) => onNavigateSubView(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-[#E8E2D5] dark:border-[#2D2A26] bg-[#FAF8F5] dark:bg-[#1A1816] text-xs font-bold text-[#171616] dark:text-[#F7F5F0] focus:outline-hidden focus:border-brand-primary cursor-pointer shadow-2xs"
              >
                {activePillar.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

        {/* The Sub-View Content Container */}
        <div className="animate-in fade-in duration-300">
          {children}
        </div>

      </main>

      {/* PWA Phone Install Preview Modal */}
      <PWAInstallModal
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
      />

    </div>
  );
};
