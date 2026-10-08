import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PWAInstallModal } from '../common/PWAInstallModal';
import { Smartphone } from 'lucide-react';
import { HomeHeroHeader } from './home/HomeHeroHeader';
import { HomeHero } from './home/HomeHero';
import { HomeCinematicSlider } from './home/HomeCinematicSlider';
import { HomeMarqueeTicker } from './home/HomeMarqueeTicker';
import { UniversalSearch } from './home/UniversalSearch';
import { MostRequestedGrid } from './home/MostRequestedGrid';
import { InteractiveQuoteEstimator } from './home/InteractiveQuoteEstimator';
import { HomeServicesStore } from './home/HomeServicesStore';
import { DepartmentGrid } from './home/DepartmentGrid';
import { HomePackagesSlider } from './home/HomePackagesSlider';
import { HomePortfolio } from './home/HomePortfolio';
import { HomeClientsAndTestimonials } from './home/HomeClientsAndTestimonials';
import { HomePromoBanners } from './home/HomePromoBanners';
import { HomeFAQModule } from './home/HomeFAQModule';
import { HomeContactModule } from './home/HomeContactModule';
import { HomeAboutModule } from './home/HomeAboutModule';
import { HomeRawajFeatures } from './home/HomeRawajFeatures';
import { HowRawajWorks } from './home/HowRawajWorks';
import { SourcingCapability } from './home/SourcingCapability';
import { KnowledgeHighlights } from './home/KnowledgeHighlights';
import { HomeModuleConfig } from '../../types';

interface HomeViewProps {
  onOpenSearch: () => void;
  onOpenCustomQuote: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenSearch, onOpenCustomQuote }) => {
  const { homeModulesConfig, navigate } = useApp();
  const [showPwaModal, setShowPwaModal] = useState(false);

  // Automatically trigger the custom PWA download popup on homepage if not yet dismissed in session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('rawaj_pwa_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShowPwaModal(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore sessionStorage security or quota error
    }
  }, []);

  const handleClosePwa = () => {
    setShowPwaModal(false);
    try {
      sessionStorage.setItem('rawaj_pwa_dismissed', 'true');
    } catch {
      // Ignore
    }
  };

  // Sort modules dynamically according to admin customized order
  const sortedModules = [...homeModulesConfig].sort((a, b) => a.sort_order - b.sort_order);

  const renderModule = (mod: HomeModuleConfig) => {
    const layout = mod.layout_style || mod.available_layouts?.[0]?.id;

    switch (mod.id) {
      case 'header_hero':
        if (layout === 'split_hero') {
          return (
            <div key="mod-header-hero" className="w-full bg-[#12100F] border-b border-[#2B2623]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <HomeHero 
                  onExploreServices={() => navigate({ view: 'services' })} 
                  onCustomQuote={onOpenCustomQuote} 
                />
              </div>
            </div>
          );
        }
        if (layout === 'minimal_search') {
          return (
            <div key="mod-header-hero" className="w-full bg-[#12100F] border-b border-[#2B2623] py-8">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <UniversalSearch onOpenFullSearchModal={onOpenSearch} />
              </div>
            </div>
          );
        }
        return <HomeHeroHeader key="mod-header-hero" onOpenCustomQuote={onOpenCustomQuote} />;

      case 'slider':
        return (
          <div key="mod-slider" className="w-full">
            <HomeCinematicSlider />
          </div>
        );

      case 'marquee':
        return (
          <div key="mod-marquee" className="w-full">
            <HomeMarqueeTicker />
          </div>
        );

      case 'calculator':
        return (
          <div key="mod-calculator" id="calculator-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <InteractiveQuoteEstimator />
          </div>
        );

      case 'services_catalog':
        return (
          <div key="mod-services" id="services-catalog-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {layout === 'grid_all' ? (
              <DepartmentGrid />
            ) : layout === 'most_requested' ? (
              <MostRequestedGrid />
            ) : (
              <HomeServicesStore />
            )}
          </div>
        );

      case 'sector_packages':
        return (
          <div key="mod-packages" id="packages-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HomePackagesSlider />
          </div>
        );

      case 'why_us':
        return (
          <div key="mod-why-us" id="why-us-module" className="w-full">
            {layout === 'workflow_steps' ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <HowRawajWorks />
              </div>
            ) : layout === 'sourcing_capabilities' ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <SourcingCapability onCustomQuote={onOpenCustomQuote} />
              </div>
            ) : (
              <HomeRawajFeatures />
            )}
          </div>
        );

      case 'promo_banners':
        return (
          <div key="mod-promos" id="promos-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HomePromoBanners />
          </div>
        );

      case 'about_us':
        return (
          <div key="mod-about" id="about-module" className="w-full">
            <HomeAboutModule />
          </div>
        );

      case 'portfolio_showcase':
        return (
          <div key="mod-portfolio" id="portfolio-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HomePortfolio />
          </div>
        );

      case 'testimonials':
        return (
          <div key="mod-testimonials" id="testimonials-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HomeClientsAndTestimonials mode="testimonials_only" />
          </div>
        );

      case 'brands_partners':
        return (
          <div key="mod-brands" id="brands-module" className="w-full">
            <HomeClientsAndTestimonials mode="brands_only" />
          </div>
        );

      case 'blog_hub':
        return (
          <div key="mod-blog" id="blog-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <KnowledgeHighlights />
          </div>
        );

      case 'faq':
        return (
          <div key="mod-faq" id="faq-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HomeFAQModule />
          </div>
        );

      case 'contact_us':
        return (
          <div key="mod-contact" id="contact-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HomeContactModule />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-0 pb-20 bg-[#FAF8F5] dark:bg-[#0E0D0C] text-[#171616] dark:text-[#F7F5F0] min-h-screen transition-colors duration-300">
      
      {/* Dynamic Modules Rendering in Exact Admin Customized Sort Order */}
      {sortedModules
        .filter(m => m.is_visible)
        .map((m, idx) => (
          <React.Fragment key={m.id ? `mod-${m.id}-${idx}` : `mod-${idx}`}>
            {renderModule(m)}
          </React.Fragment>
        ))}

      {/* Floating PWA Install Pill for Quick Access */}
      <div className="fixed bottom-5 left-5 z-30">
        <button
          onClick={() => setShowPwaModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#B9142D] to-[#8C0C1F] hover:brightness-110 text-white font-bold text-xs shadow-xl border border-[#D4AF37]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="تثبيت تطبيق رواج على هاتفك"
        >
          <Smartphone className="w-4 h-4 text-[#FDE047] group-hover:animate-bounce" />
          <span className="hidden sm:inline">تثبيت تطبيق رواج للهاتف</span>
          <span className="sm:hidden text-[11px]">تثبيت التطبيق</span>
        </button>
      </div>

      {/* PWA Phone Install Popup */}
      <PWAInstallModal
        isOpen={showPwaModal}
        onClose={handleClosePwa}
      />

    </div>
  );
};
