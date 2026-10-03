import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  ShoppingBag, 
  QrCode, 
  Heart, 
  ArrowLeftRight, 
  Layers,
  Sparkles,
  Search,
  SlidersHorizontal,
  Settings
} from 'lucide-react';

interface FloatingBottomNavProps {
  onOpenSearch?: () => void;
  onOpenScan?: () => void;
}

export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  onOpenSearch,
  onOpenScan
}) => {
  const { currentRoute, navigate, quoteItems, wishlistedServiceIds, compareServiceIds } = useApp();

  const cartCount = quoteItems.length;
  const isHome = currentRoute.view === 'home';
  const isCart = currentRoute.view === 'quote-cart';
  const isServices = currentRoute.view === 'services';

  return (
    <div className="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
      <nav 
        aria-label="التنقل السفلي السريع"
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl sm:rounded-3xl bg-[#141212]/90 dark:bg-[#0E0D0D]/95 text-white backdrop-blur-xl border border-white/15 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-300"
      >
        
        {/* 1. Cart Button with Active Pill Badge */}
        <button
          onClick={() => navigate({ view: 'quote-cart' })}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            isCart
              ? 'bg-gradient-to-r from-[#B9142D] to-[#8B0E23] text-white shadow-md scale-105'
              : 'bg-gradient-to-r from-brand-primary to-[#8B0E23] text-white hover:opacity-90 shadow-md'
          }`}
          title="سلة التسعير"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>السلة ({cartCount})</span>
        </button>

        {/* 2. QR / Search Scanner */}
        <button
          onClick={onOpenSearch}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="البحث الذكي"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 3. Services / Catalog */}
        <button
          onClick={() => navigate({ view: 'services' })}
          className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-colors cursor-pointer ${
            isServices ? 'text-[#D4AF37] bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="كاتلوج الخدمات"
        >
          <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 4. Packages */}
        <button
          onClick={() => navigate({ view: 'packages' })}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="باقات المشاريع"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 5. Home Button */}
        <button
          onClick={() => navigate({ view: 'home' })}
          className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-colors cursor-pointer ${
            isHome ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="الصفحة الرئيسية"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 6. Admin Shortcut */}
        <button
          onClick={() => navigate({ view: 'admin', subView: 'dashboard' })}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-amber-400/90 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
          title="لوحة التحكم"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

      </nav>
    </div>
  );
};
