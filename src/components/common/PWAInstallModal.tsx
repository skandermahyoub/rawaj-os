import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { RawajLogo } from './RawajLogo';
import { 
  Download, 
  Smartphone, 
  X, 
  Share2, 
  CheckCircle2, 
  Zap, 
  Wifi, 
  Tag, 
  Sparkles,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { siteSettings } = useApp();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setInstalling(true);
    const success = await install();
    setInstalling(false);
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
        setInstallSuccess(false);
      }, 3000);
    }
  };

  const appName = siteSettings.company_name_ar || 'مطابع رواج للطباعة والإعلان';
  const appSubtitle = siteSettings.slogan_ar || 'صناع الهوية البصرية وهندسة التغليف والطباعة الفاخرة';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-300 font-sans">
      {/* Dark Ambient Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card — Dedicated Luxury Dark Mode */}
      <div 
        className="relative w-full max-w-lg bg-[#0F0D0C] border-2 border-[#D4AF37]/50 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] p-5 sm:p-7 overflow-hidden z-10 text-right animate-in zoom-in-95 duration-300 text-[#FAF8F5]"
        dir="rtl"
      >
        {/* Subtle Luxury Radial Glow */}
        <div className="absolute top-0 right-0 left-0 h-40 bg-gradient-to-b from-[#B9142D]/25 via-[#D4AF37]/10 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-[#1C1918] border border-[#332C28] text-[#A8A196] hover:text-[#FAF8F5] hover:border-[#D4AF37] transition-all cursor-pointer z-20 shadow-xs"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo & Title */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-[#2B2522]">
          
          {/* Logo Container (Uses logo from control panel or certified fallback) */}
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#171413] border-2 border-[#D4AF37] shadow-xl p-1.5 flex items-center justify-center shrink-0 overflow-hidden relative group">
            {siteSettings.logo_url ? (
              <img
                src={siteSettings.logo_url}
                alt={appName}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <RawajLogo className="w-full h-full object-contain" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-[#0F0D0C] flex items-center justify-center text-white shadow-xs" title="تطبيق رواج المعتمد">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Titles & Official PWA Badge */}
          <div className="text-center sm:text-right space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9142D]/20 text-[#E85D75] text-[11px] font-bold border border-[#B9142D]/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>تطبيق الهاتف الذكي الرسمي (PWA)</span>
            </div>
            
            <h2 className="font-heading font-black text-xl sm:text-2xl text-[#FAF8F5] leading-tight">
              {appName}
            </h2>

            <p className="text-xs text-[#C5BCB0] leading-relaxed">
              {appSubtitle}
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid — Sleek Dark Theme */}
        <div className="grid grid-cols-2 gap-2.5 py-4">
          {/* Feature 1 */}
          <div className="p-3 rounded-2xl bg-[#181514] border border-[#2B2522] flex items-center gap-2.5 shadow-2xs hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[#B9142D]/20 border border-[#B9142D]/30 flex items-center justify-center text-[#E03A53] shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-[#FAF8F5]">تثبيت فوري للهاتف</div>
              <div className="text-[#8E867B] text-[10px] mt-0.5">يعمل كتطبيق مستقل بدون متجر</div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-3 rounded-2xl bg-[#181514] border border-[#2B2522] flex items-center gap-2.5 shadow-2xs hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-[#FAF8F5]">استجابة فورية فائقة</div>
              <div className="text-[#8E867B] text-[10px] mt-0.5">سرعة فائقة وحساب فوري للتسعير</div>
            </div>
          </div>

          {/* Feature 3 (Accurate explanation of local cache storage) */}
          <div className="p-3 rounded-2xl bg-[#181514] border border-[#2B2522] flex items-center gap-2.5 shadow-2xs hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Wifi className="w-4 h-4" />
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-[#FAF8F5]">حفظ الكتالوج محلياً</div>
              <div className="text-[#8E867B] text-[10px] mt-0.5">تصفح الخدمات عند ضعف الشبكة</div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-3 rounded-2xl bg-[#181514] border border-[#2B2522] flex items-center gap-2.5 shadow-2xs hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-[#FAF8F5]">عروض وباقات حصرية</div>
              <div className="text-[#8E867B] text-[10px] mt-0.5">تحديث مستمر للأسعار والخصومات</div>
            </div>
          </div>
        </div>

        {/* Success State Notification */}
        {installSuccess && (
          <div className="p-3.5 mb-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>تم بنجاح تثبيت تطبيق رواج على شاشة هاتفك الرئيسية!</span>
          </div>
        )}

        {/* INSTALLATION FLOW: iOS Safari Guide */}
        {isIOS && !isInstalled ? (
          <div className="p-3.5 rounded-2xl bg-[#1A1612] border border-[#D4AF37]/40 space-y-2.5 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
              <span>خطوات التثبيت السريع على هواتف iPhone و iPad:</span>
            </div>
            
            <ol className="space-y-1.5 text-xs text-[#C5BCB0] pr-2 list-decimal list-inside">
              <li>
                اضغط على أيقونة <strong>«المشاركة» (Share)</strong> <span className="inline-block px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">⎋</span> في شريط Safari أسفل الشاشة.
              </li>
              <li>
                اختر <strong>«إضافة إلى الشاشة الرئيسية»</strong> (Add to Home Screen ➕).
              </li>
              <li>
                اضغط على <strong>«إضافة» (Add)</strong> لتجد أيقونة رواج مثبتة مباشرة على جهازك!
              </li>
            </ol>
          </div>
        ) : null}

        {/* ACTION BUTTONS */}
        <div className="space-y-2.5 pt-1">
          {/* Main Install Button for Android / Desktop / Chrome */}
          {!isInstalled && isInstallable && (
            <button
              onClick={handleInstallClick}
              disabled={installing}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B9142D] via-[#A01026] to-[#780A1A] hover:brightness-110 text-white font-heading font-black text-sm shadow-[0_10px_25px_-5px_rgba(185,20,45,0.5)] flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-[#D4AF37]/60"
            >
              <Download className="w-5 h-5 text-[#FDE047] animate-bounce" />
              <span>{installing ? 'جارِ التثبيت...' : 'تثبيت التطبيق على الشاشة الرئيسية الآن'}</span>
            </button>
          )}

          {/* Fallback Install Prompt when deferredPrompt is not ready */}
          {!isInstalled && !isInstallable && !isIOS && (
            <button
              onClick={() => {
                alert('لتثبيت تطبيق رواج مباشرة: اضغط على خيارات المتصفح (⋮) بأعلى الشاشة ثم اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية".');
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B9142D] via-[#A01026] to-[#780A1A] hover:brightness-110 text-white font-heading font-black text-sm shadow-[0_10px_25px_-5px_rgba(185,20,45,0.5)] flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-[#D4AF37]/60"
            >
              <Download className="w-5 h-5 text-[#FDE047]" />
              <span>تثبيت التطبيق على شاشة الهاتف الرئيسية</span>
            </button>
          )}

          {/* Already installed notice */}
          {isInstalled && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>أنت تستخدم تطبيق رواج المثبت على جهازك حالياً بنجاح.</span>
            </div>
          )}

          {/* Later / Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-[#8E867B] hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            تصفح الموقع أولاً (سأقوم بالتثبيت لاحقاً)
          </button>
        </div>

      </div>
    </div>
  );
};
