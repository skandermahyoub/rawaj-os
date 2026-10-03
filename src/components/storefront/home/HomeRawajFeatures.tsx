import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Printer, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Award, 
  CheckCircle2,
  Zap
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Printer,
  Clock,
  ShieldCheck,
  Globe,
  Sparkles,
  Award,
  Zap,
};

export const HomeRawajFeatures: React.FC = () => {
  const { rawajFeatures, navigate } = useApp();
  const sortedFeatures = [...rawajFeatures].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-[#9C0E24] via-[#B9142D] to-[#780B1C] text-white relative overflow-hidden shadow-inner">
      
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold tracking-wider mb-3 backdrop-blur-md">
            لماذا يختار كبار العملاء رواج؟
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            معايير ومميزات تضمن نجاح مطبوعاتك
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed">
            نجمع بين التقنية الحديثة، الخبرة الهندسية الطويلة، والمرونة العالية في التوريد والإنتاج المخصص
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFeatures.map((feat) => {
            const IconComponent = ICON_MAP[feat.icon] || Sparkles;

            return (
              <div
                key={feat.id}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#B9142D] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {feat.badge_ar && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/20 text-white">
                        {feat.badge_ar}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                    {feat.title_ar}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                    {feat.description_ar}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-white/75">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                  <span>معتمد في كافة عقود رواج</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate({ view: 'custom-quote' })}
            className="px-8 py-3.5 rounded-xl bg-white text-[#B9142D] hover:bg-neutral-100 text-sm sm:text-base font-extrabold shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>ابدأ تنفيذ مشروعك معنا الآن</span>
          </button>
        </div>

      </div>
    </section>
  );
};
