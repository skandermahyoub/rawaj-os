import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Package, 
  Globe, 
  Award,
  Megaphone,
  Tag,
  Newspaper,
  BellRing
} from 'lucide-react';
import { MarqueeCategory } from '../../../types';

export const HomeMarqueeTicker: React.FC = () => {
  const { marqueeItems, navigate } = useApp();
  const activeItems = marqueeItems.filter((i) => i.is_active).sort((a, b) => a.sort_order - b.sort_order);

  if (activeItems.length === 0) return null;

  // Duplicate items array to create seamless loop
  const displayItems = [...activeItems, ...activeItems, ...activeItems];

  const getCategoryConfig = (category: MarqueeCategory, customBadge?: string) => {
    switch (category) {
      case 'news':
        return {
          badge: customBadge || 'أخبار رواج',
          badgeBg: 'bg-brand-accent-20 text-brand-accent border-brand-accent-30',
          icon: Newspaper
        };
      case 'special_offer':
        return {
          badge: customBadge || 'عرض حصري',
          badgeBg: 'bg-brand-primary-20 text-white border-brand-primary-30 animate-pulse',
          icon: Tag
        };
      case 'announcement':
        return {
          badge: customBadge || 'تنبيه فني',
          badgeBg: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
          icon: Megaphone
        };
      case 'marketing':
        return {
          badge: customBadge || 'رواج 2026',
          badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
          icon: Sparkles
        };
      case 'unclassified':
      default:
        return {
          badge: customBadge || 'خدمات رواج',
          badgeBg: 'bg-white/10 text-white/90 border-white/20',
          icon: BellRing
        };
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-[#700B1A] via-[#B9142D] to-[#700B1A] text-white py-2.5 sm:py-3 overflow-hidden shadow-md z-10 border-y border-[#D4AF37]/30">
      
      {/* Visual edge gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#700B1A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#700B1A] to-transparent z-10 pointer-events-none" />

      {/* Marquee Animation Track */}
      <div className="flex items-center gap-10 whitespace-nowrap animate-marquee-ltr">
        {displayItems.map((item, idx) => {
          const cfg = getCategoryConfig(item.category || 'marketing', item.badge_ar);
          const IconComp = cfg.icon;

          return (
            <div 
              key={`${item.id}-${idx}`} 
              onClick={() => {
                if (item.link_view) {
                  navigate({ view: item.link_view as any });
                }
              }}
              className={`inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                item.link_view ? 'cursor-pointer hover:opacity-85' : ''
              }`}
            >
              {/* Category Badge with Icon */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black border uppercase tracking-wider ${cfg.badgeBg}`}>
                <IconComp className="w-3 h-3" />
                <span>{cfg.badge}</span>
              </span>

              <span className="text-white/95 font-medium">{item.text_ar}</span>

              <span className="text-[#D4AF37] font-bold mx-1">✦</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(50%);
          }
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr 40s linear infinite;
        }
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
