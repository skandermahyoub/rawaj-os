import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Layers3, Sparkles, BriefcaseBusiness, MoreHorizontal } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRoute, navigate } = useApp();

  const items = [
    { id: 'home', label: 'الرئيسية', icon: Home, action: () => navigate({ view: 'home' }), active: currentRoute.view === 'home' },
    { id: 'services', label: 'الخدمات', icon: Layers3, action: () => navigate({ view: 'services' }), active: currentRoute.view === 'services' || currentRoute.view === 'service-detail' },
    { id: 'packages', label: 'الباقات', icon: Sparkles, action: () => navigate({ view: 'packages' }), active: currentRoute.view === 'packages' || currentRoute.view === 'package-detail' },
    { id: 'portfolio', label: 'الأعمال', icon: BriefcaseBusiness, action: () => navigate({ view: 'portfolio' }), active: currentRoute.view === 'portfolio' },
    { id: 'more', label: 'المزيد', icon: MoreHorizontal, action: () => navigate({ view: 'about-contact' }), active: ['about-contact','blog'].includes(currentRoute.view) },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pointer-events-none px-3 pb-[max(10px,env(safe-area-inset-bottom))]">
      <nav
        aria-label="التنقل السفلي"
        className="pointer-events-auto relative w-full max-w-[560px] h-[74px] rounded-[26px] bg-[#FBF8F3]/96 dark:bg-[#171413]/96 backdrop-blur-2xl border border-white/70 dark:border-white/8 shadow-[0_18px_55px_rgba(25,18,16,0.22)] px-2 flex items-center justify-between overflow-hidden"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#D71934]/55 to-transparent" />
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              className={`relative flex-1 h-[62px] min-w-0 flex flex-col items-center justify-center gap-1 rounded-[22px] transition-all duration-300 active:scale-95 ${item.active ? 'text-white' : 'text-[#5F5953] dark:text-[#C7C0B8]'}`}
            >
              {item.active && (
                <span className="absolute inset-1 rounded-[21px] bg-gradient-to-br from-[#E01B38] via-[#C5122E] to-[#930C22] shadow-[0_10px_24px_rgba(185,20,45,0.34)]" />
              )}
              <span className={`relative z-10 w-8 h-8 rounded-2xl flex items-center justify-center transition-transform duration-300 ${item.active ? '-translate-y-0.5 bg-white/10' : 'bg-transparent'}`}>
                <Icon className="w-[19px] h-[19px]" strokeWidth={item.active ? 2.5 : 2} />
              </span>
              <span className="relative z-10 text-[10px] sm:text-[11px] font-extrabold leading-none truncate max-w-full px-1">
                {item.label}
              </span>
              {item.active && <span className="relative z-10 w-1 h-1 rounded-full bg-white mt-0.5" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
