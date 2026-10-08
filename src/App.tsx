import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { CustomQuoteModal } from './components/common/CustomQuoteModal';

// Storefront Views
import { HomeView } from './components/storefront/HomeView';
import { DepartmentsView } from './components/storefront/DepartmentsView';
import { ServicesListView } from './components/storefront/ServicesListView';
import { ServiceDetailView } from './components/storefront/ServiceDetailView';
import { QuoteCartView } from './components/storefront/QuoteCartView';
import { PackagesListView, PackageDetailView } from './components/storefront/PackagesListView';
import { PortfolioView } from './components/storefront/PortfolioView';
import { BlogListView, BlogPostView } from './components/storefront/BlogListView';
import { AboutContactView } from './components/storefront/AboutContactView';

// Admin Views
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardHome } from './components/admin/AdminDashboardHome';
import { AdminServicesList } from './components/admin/AdminServicesList';
import { AdminServiceEditor } from './components/admin/AdminServiceEditor';
import { AdminTemplatesList } from './components/admin/AdminTemplatesList';
import { AdminQuotesList } from './components/admin/AdminQuotesList';
import { AdminMediaLibrary } from './components/admin/AdminMediaLibrary';
import { AdminPackagesManager } from './components/admin/AdminPackagesManager';
import { AdminPortfolioManager } from './components/admin/AdminPortfolioManager';
import { AdminBlogManager } from './components/admin/AdminBlogManager';
import { AdminTaxonomyManager } from './components/admin/AdminTaxonomyManager';
import { AdminSettingsManager } from './components/admin/AdminSettingsManager';
import { AdminUsersManager } from './components/admin/AdminUsersManager';
import { AdminSliderManager } from './components/admin/AdminSliderManager';
import { AdminMarqueeManager } from './components/admin/AdminMarqueeManager';
import { AdminAboutModuleManager } from './components/admin/AdminAboutModuleManager';
import { AdminFeaturesManager } from './components/admin/AdminFeaturesManager';
import { AdminClientsManager } from './components/admin/AdminClientsManager';
import { AdminStyleCustomizer } from './components/admin/AdminStyleCustomizer';
import { AdminHomeCustomizer } from './components/admin/AdminHomeCustomizer';
import { AdminHeaderHeroManager } from './components/admin/AdminHeaderHeroManager';
import { AdminDesignTasksManager } from './components/admin/AdminDesignTasksManager';
import { AdminPromoManager } from './components/admin/AdminPromoManager';
import { AdminFAQManager } from './components/admin/AdminFAQManager';
import { AdminContactInboxManager } from './components/admin/AdminContactInboxManager';
import { AdminFooterManager } from './components/admin/AdminFooterManager';
import { canAccessAdminView } from './lib/adminAccess';
import { BrandLogo } from './components/common/BrandLogo';

const RAWAJ_BRAND_LOGO = 'https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/branding/1791332863962-084d2dd4-9c86-4d17-b018-7cba142b7db3-rawaj-logo-migrated.webp';

const AppContent: React.FC = () => {
  const { currentRoute, navigate, currentUser, isCloudSynced, siteSettings } = useApp();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [customQuoteModalOpen, setCustomQuoteModalOpen] = useState(false);
  const [cloudSyncTimedOut, setCloudSyncTimedOut] = useState(false);

  useEffect(() => {
    if (isCloudSynced) {
      setCloudSyncTimedOut(false);
      return;
    }
    const timer = window.setTimeout(() => setCloudSyncTimedOut(true), 15000);
    return () => window.clearTimeout(timer);
  }, [isCloudSynced]);

  // Do not render bundled/default CMS content before Supabase finishes its first hydration.
  // This prevents old logos, slider images, and legacy settings from flashing on refresh.
  if (!isCloudSynced) {
    return (
      <div
        dir="rtl"
        className="rawaj-intro fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF8F5] text-[#171616] dark:bg-[#0E0D0C] dark:text-[#F7F5F0]"
        aria-label="رواج"
        role="status"
      >
        <div className="rawaj-intro__orb rawaj-intro__orb--one" aria-hidden="true" />
        <div className="rawaj-intro__orb rawaj-intro__orb--two" aria-hidden="true" />
        <div className="rawaj-intro__grain" aria-hidden="true" />

        <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-8 text-center">
          <div className="rawaj-intro__logo-wrap">
            <div className="rawaj-intro__halo" aria-hidden="true" />
            <div className="rawaj-intro__ring rawaj-intro__ring--one" aria-hidden="true" />
            <div className="rawaj-intro__ring rawaj-intro__ring--two" aria-hidden="true" />
            <div className="rawaj-intro__beam" aria-hidden="true" />
            <div className="rawaj-intro__logo">
              <BrandLogo
                src={siteSettings.logo_url || RAWAJ_BRAND_LOGO}
                alt={siteSettings.company_name_ar || 'رواج'}
                className="h-full w-full object-contain"
                fallbackClassName="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="rawaj-intro__wordmark mt-7">
            <div className="text-[clamp(1.35rem,5vw,1.7rem)] font-black tracking-tight">
              رواج
            </div>
            <div className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#867F75] dark:text-[#A8A196]">
              للطباعة والإعلان والديكور
            </div>
          </div>

          {!cloudSyncTimedOut ? (
            <div className="mt-9 flex items-center gap-2 text-[10px] font-semibold text-[#9A9287] dark:text-[#817A72]">
              <span className="rawaj-intro__pulse-dot" aria-hidden="true" />
              <span>من الفكرة إلى أثرها</span>
            </div>
          ) : (
            <div className="mt-9 space-y-3 rounded-2xl border border-[#E4DDD0] bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md dark:border-[#302B28] dark:bg-[#181614]/70">
              <p className="text-xs font-bold">لم نتمكن من فتح رواج الآن</p>
              <p className="text-[10px] leading-relaxed text-[#867F75] dark:text-[#A8A196]">
                تحقق من الاتصال ثم أعد المحاولة.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-xl bg-[#B9142D] px-4 py-2 text-[11px] font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
        </div>

        <div className="rawaj-intro__line" aria-hidden="true" />
      </div>
    );
  }

  // If in Admin view
  if (currentRoute.view === 'admin') {
    const requestedSubView = currentRoute.subView || 'dashboard';
    const subView = canAccessAdminView(currentUser.role, requestedSubView)
      ? requestedSubView
      : 'dashboard';

    const handleAdminSubNav = (view: any, editId?: string) => {
      const safeView = canAccessAdminView(currentUser.role, view) ? view : 'dashboard';
      navigate({
        view: 'admin',
        subView: safeView,
        editServiceId: safeView === 'service-edit' ? editId : undefined,
      });
    };

    return (
      <AdminLayout
        currentSubView={subView}
        onNavigateSubView={handleAdminSubNav}
      >
        {subView === 'dashboard' && <AdminDashboardHome onNavigateSubView={handleAdminSubNav} />}
        {subView === 'style-customizer' && <AdminStyleCustomizer />}
        {subView === 'home-customizer' && <AdminHomeCustomizer onNavigateSubView={handleAdminSubNav} />}
        {subView === 'header-hero' && <AdminHeaderHeroManager />}
        {subView === 'home-slides' && <AdminSliderManager />}
        {subView === 'marquee' && <AdminMarqueeManager />}
        {subView === 'promos' && <AdminPromoManager />}
        {subView === 'about-module' && <AdminAboutModuleManager />}
        {subView === 'features' && <AdminFeaturesManager />}
        {subView === 'clients-testimonials' && <AdminClientsManager />}
        {subView === 'faq' && <AdminFAQManager />}
        {subView === 'contact-inbox' && <AdminContactInboxManager />}
        {subView === 'footer-settings' && <AdminFooterManager />}
        {subView === 'services' && <AdminServicesList onNavigateSubView={handleAdminSubNav} />}
        {subView === 'service-edit' && (
          <AdminServiceEditor
            serviceId={currentRoute.editServiceId}
            onNavigateBack={() => handleAdminSubNav('services')}
          />
        )}
        {subView === 'templates' && <AdminTemplatesList />}
        {subView === 'quotes' && <AdminQuotesList />}
        {subView === 'design-tasks' && <AdminDesignTasksManager />}
        {subView === 'taxonomy' && <AdminTaxonomyManager />}
        {subView === 'packages' && <AdminPackagesManager />}
        {subView === 'portfolio' && <AdminPortfolioManager />}
        {subView === 'blog' && <AdminBlogManager />}
        {subView === 'media' && <AdminMediaLibrary />}
        {subView === 'settings' && <AdminSettingsManager />}
        {subView === 'users' && <AdminUsersManager />}
      </AdminLayout>
    );
  }

  // Storefront Views
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E9] dark:bg-[#141211] text-[#171616] dark:text-[#F5F1EA] transition-colors">
      {/* Top Header (Module 1) */}
      <Header
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCustomQuote={() => setCustomQuoteModalOpen(true)}
      />

      {/* Main Storefront Area */}
      <main className="flex-1 w-full pb-24 sm:pb-28">
        {currentRoute.view === 'home' && (
          <HomeView
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenCustomQuote={() => setCustomQuoteModalOpen(true)}
          />
        )}

        {currentRoute.view !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {currentRoute.view === 'departments' && <DepartmentsView />}

            {currentRoute.view === 'services' && (
              <ServicesListView
                initialDepartmentId={currentRoute.departmentId}
                initialCategoryId={currentRoute.categoryId}
                initialIndustrySectorId={currentRoute.industrySectorId}
                initialSearchQuery={currentRoute.searchQuery}
                onOpenCustomQuote={() => setCustomQuoteModalOpen(true)}
              />
            )}

            {currentRoute.view === 'service-detail' && (
              <ServiceDetailView serviceId={currentRoute.serviceId} />
            )}

            {currentRoute.view === 'quote-cart' && <QuoteCartView />}

            {currentRoute.view === 'packages' && <PackagesListView />}

            {currentRoute.view === 'package-detail' && (
              <PackageDetailView packageId={currentRoute.packageId} />
            )}

            {currentRoute.view === 'portfolio' && (
              <PortfolioView projectId={currentRoute.projectId} />
            )}

            {currentRoute.view === 'blog' && <BlogListView />}

            {currentRoute.view === 'blog-post' && (
              <BlogPostView postId={currentRoute.postId} />
            )}

            {currentRoute.view === 'about-contact' && <AboutContactView />}

            {currentRoute.view === 'custom-quote' && (
              <CustomQuoteModal
                isOpen={true}
                onClose={() => navigate({ view: 'home' })}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/*
        Global clearance for the fixed bottom navigation.
        Keeping this spacer outside <main> also protects the footer/end-of-page
        content on every storefront route, including service detail pages.
      */}
      <div
        aria-hidden="true"
        className="h-[calc(96px+env(safe-area-inset-bottom))] sm:h-[calc(108px+env(safe-area-inset-bottom))] shrink-0"
      />

      {/* Fixed bottom navigation */}
      <BottomNav />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Global Custom Quote Modal */}
      <CustomQuoteModal
        isOpen={customQuoteModalOpen}
        onClose={() => setCustomQuoteModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
