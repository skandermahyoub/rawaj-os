import React from 'react';
import { useApp } from '../../context/AppContext';
import { RawajLogo } from './RawajLogo';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  Building2,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, footerSettings, departments, navigate } = useApp();

  const social = footerSettings.social_links || {};
  const branches = footerSettings.branches || [];

  return (
    <footer className="bg-[#151312] text-[#A89F93] text-xs pt-12 pb-24 lg:pb-12 border-t border-[#2F2927] mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier: Brand, About & Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#2B2624]">
          
          {/* Brand Presentation Column */}
          <div className="lg:col-span-4 space-y-4 text-right">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#231F1D] border border-[#3E3835] p-2 flex items-center justify-center shadow-lg">
                {siteSettings.logo_url ? (
                  <img
                    src={siteSettings.logo_url}
                    alt={footerSettings.company_name_ar}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <RawajLogo className="h-8 w-auto text-white" />
                )}
              </div>
              <div>
                <h3 className="font-heading font-black text-white text-base sm:text-lg">
                  {footerSettings.company_name_ar || 'وكالة رواج للطباعة والإعلان والديكور'}
                </h3>
                <p className="text-[11px] text-[#D4AF37] font-semibold">
                  {footerSettings.slogan_ar || 'صناع الهوية البصرية وهندسة التغليف'}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#90877C] leading-relaxed">
              {footerSettings.description_ar}
            </p>

            {/* Direct Contact Badges */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-[#DDD5C7]">
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>الرقم الموحد:</span>
                <span className="font-mono font-bold text-white" dir="ltr">{footerSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#DDD5C7]">
                <MessageSquare className="w-3.5 h-3.5 text-brand-primary" />
                <span>واتساب الأعمال:</span>
                <span className="font-mono font-bold text-white" dir="ltr">{footerSettings.mobile_whatsapp}</span>
              </div>
              <div className="flex items-center gap-2 text-[#DDD5C7]">
                <Mail className="w-3.5 h-3.5 text-brand-accent" />
                <span>البريد الرسمي:</span>
                <span className="font-mono text-white">{footerSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Departments */}
          <div className="lg:col-span-3 space-y-3 text-right">
            <h4 className="text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span>أقسام الإنتاج والتصنيع</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {departments.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => navigate({ view: 'services', departmentId: dept.id })}
                    className="hover:text-white transition-colors text-right flex items-center gap-1.5 hover:translate-x-[-2px] transform duration-200"
                  >
                    <span className="text-brand-primary text-[10px]">◀</span>
                    <span>{dept.name_ar}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links: Pages & Policies */}
          <div className="lg:col-span-2 space-y-3 text-right">
            <h4 className="text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent" />
              <span>روابط المنصة</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate({ view: 'home' })} className="hover:text-white transition-colors">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: 'services' })} className="hover:text-white transition-colors">
                  كتالوج كافة الخدمات
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: 'packages' })} className="hover:text-white transition-colors">
                  باقات القطاعات والمشاريع
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: 'portfolio' })} className="hover:text-white transition-colors">
                  معرض الأعمال السابقة
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: 'blog' })} className="hover:text-white transition-colors">
                  دليل الخامات والمدونة
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: 'about-contact' })} className="hover:text-white transition-colors">
                  عن رواج والاتصال
                </button>
              </li>
            </ul>
          </div>

          {/* Physical Branches in Sanaa */}
          <div className="lg:col-span-3 space-y-3 text-right">
            <h4 className="text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-primary" />
              <span>فروع ومعامل رواج</span>
            </h4>
            
            <div className="space-y-3">
              {branches.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-[#1F1C1B] border border-[#332D2B] space-y-1">
                  <div className="font-bold text-white text-xs flex items-center justify-between">
                    <span>{b.name_ar}</span>
                    {b.is_headquarters && (
                      <span className="text-[10px] bg-brand-primary-20 text-brand-accent px-1.5 py-0.5 rounded-sm">
                        المقر الرئيسي
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9E9589] flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-brand-accent shrink-0 mt-0.5" />
                    <span>{b.address_ar}</span>
                  </p>
                  <p className="text-[11px] text-[#C5BDB1] font-mono" dir="ltr">
                    {b.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Social Media Channels Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>تابع رواج عبر منصات التواصل الرسمية:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {social.tiktok && (
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#221F1E] hover:bg-[#2F2A28] text-white text-xs font-bold border border-[#3A3331] transition-colors"
              >
                تيك توك
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#221F1E] hover:bg-[#2F2A28] text-white text-xs font-bold border border-[#3A3331] transition-colors"
              >
                فيسبوك
              </a>
            )}
            {social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#221F1E] hover:bg-[#2F2A28] text-white text-xs font-bold border border-[#3A3331] transition-colors"
              >
                يوتيوب
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#221F1E] hover:bg-[#2F2A28] text-white text-xs font-bold border border-[#3A3331] transition-colors"
              >
                انستغرام
              </a>
            )}
            {social.whatsapp_channel && (
              <a
                href={social.whatsapp_channel}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-bold border border-emerald-800/50 transition-colors"
              >
                قناة واتساب
              </a>
            )}
            {social.telegram && (
              <a
                href={social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 text-xs font-bold border border-sky-800/50 transition-colors"
              >
                تليجرام
              </a>
            )}
            {social.snapchat && (
              <a
                href={social.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 text-xs font-bold border border-amber-800/50 transition-colors"
              >
                سناب شات
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Powered by Rawaj */}
        <div className="pt-6 border-t border-[#231F1D] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7E756A]">
          <div>
            {footerSettings.copyright_text_ar || `جميع الحقوق محفوظة © ${new Date().getFullYear()} وكالة رواج للطباعة والإعلان والديكور.`}
          </div>
          <div className="flex items-center gap-2 font-semibold text-[#B3AA9E]">
            <span>{footerSettings.powered_by_ar || 'منظومة رواج الرقمية للإنتاج والتسويق الطباعي 2026'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
