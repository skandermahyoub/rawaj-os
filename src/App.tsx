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

const AppContent: React.FC = () => {
  const { currentRoute, navigate, currentUser, isCloudSynced } = useApp();

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
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-[#0E0D0C] text-[#171616] dark:text-[#F7F5F0]">
        <div className="flex flex-col items-center gap-4 px-6 text-center max-w-md">
          {!cloudSyncTimedOut ? (
            <>
              <div className="w-10 h-10 rounded-full border-4 border-[#E8E2D5] dark:border-[#332F2F] border-t-[#B9142D] animate-spin" />
              <div>
                <p className="font-bold text-sm">جاري تحميل بيانات رواج المعتمدة…</p>
                <p className="text-xs text-[#867F75] dark:text-[#9E978C] mt-1">يتم جلب آخر نسخة محفوظة من قاعدة البيانات.</p>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <p className="font-bold text-sm">تعذر تحميل بيانات رواج من قاعدة البيانات.</p>
              <p className="text-xs text-[#867F75] dark:text-[#9E978C]">
                لن يتم عرض نسخة قديمة أو بيانات افتراضية. أعد المحاولة للاتصال بآخر نسخة محفوظة.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-[#B9142D] text-white text-xs font-bold"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
        </div>
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
      <main className="flex-1 w-full">
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

      {/* Mobile Bottom Navigation Bar */}
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
