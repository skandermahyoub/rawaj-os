import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Heart,
  ShoppingBag,
  MessageCircle,
  Search,
  Sparkles,
} from 'lucide-react';

interface SideRailProps {
  onOpenSearch: () => void;
  onOpenCustomQuote: () => void;
}

export const SideRail: React.FC<SideRailProps> = ({ onOpenSearch, onOpenCustomQuote }) => {
  const { navigate, quoteItems, siteSettings } = useApp();
  const [open, setOpen] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const cartCount = quoteItems.length;
  const whatsappNumber = (siteSettings.mobile_whatsapp || siteSettings.phone || '').replace(/[^0-9]/g, '');

  const clickTone = () => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return;
      const ctx = audioRef.current || new Ctx();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(open ? 360 : 520, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Sound feedback is progressive enhancement only.
    }
  };

  const toggle = () => {
    clickTone();
    setOpen((value) => !value);
  };

  const go = (view: any) => {
    navigate({ view });
    setOpen(false);
  };

  return (
    <div
      className={`fixed z-40 right-0 top-1/2 -translate-y-1/2 flex items-center transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-[calc(100%-48px)]'}`}
      aria-label="القائمة الجانبية السريعة"
    >
      <div className="w-[210px] sm:w-[228px] rounded-l-[28px] overflow-hidden bg-[#151312]/96 dark:bg-[#0D0C0B]/97 text-white backdrop-blur-2xl border border-r-0 border-white/10 shadow-[0_22px_60px_rgba(0,0,0,0.34)]">
        <div className="p-2.5">
          <button
            type="button"
            onClick={toggle}
            className="w-11 h-14 rounded-[18px] bg-gradient-to-b from-[#D71934] to-[#A70E26] text-white shadow-[0_10px_28px_rgba(185,20,45,0.38)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
            aria-label={open ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
          >
            {open ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
        </div>

        <div className={`px-3 pb-3 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="h-px bg-white/10 mb-2" />
          {[
            { label: 'الأقسام', icon: Grid3X3, action: () => go('departments') },
            { label: 'المفضلة', icon: Heart, action: () => go('services') },
            { label: 'سلة التسعير', icon: ShoppingBag, action: () => go('quote-cart'), badge: cartCount },
            { label: 'البحث', icon: Search, action: () => { onOpenSearch(); setOpen(false); } },
            { label: 'طلب خاص', icon: Sparkles, action: () => { onOpenCustomQuote(); setOpen(false); } },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="relative w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-right hover:bg-white/8 active:bg-white/12 transition-colors"
              >
                <span className="w-9 h-9 rounded-xl bg-white/7 border border-white/8 flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-white/90" />
                </span>
                <span className="text-xs font-bold text-white/90">{item.label}</span>
                {'badge' in item && Boolean(item.badge) && (
                  <span className="mr-auto min-w-5 h-5 px-1 rounded-full bg-[#D71934] text-[10px] font-black flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 bg-[#25D366]/12 hover:bg-[#25D366]/18 transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-[18px] h-[18px]" />
              </span>
              <span className="text-xs font-bold text-[#7CE9A7]">واتساب</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
