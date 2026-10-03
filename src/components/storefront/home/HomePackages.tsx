import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SectionHeader } from './SectionHeader';
import { SafeImage } from '../../common/SafeImage';
import { ArrowLeft, Sparkles, CheckCircle2, Clock, Building2 } from 'lucide-react';

export const HomePackages: React.FC = () => {
  const { packages, navigate } = useApp();

  const displayPackages = packages.slice(0, 3);
  if (displayPackages.length === 0) return null;

  return (
    <section className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[26px] sm:rounded-[30px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-xs">
      <SectionHeader
        title="باقات القطاعات والحلول المتكاملة (Turnkey Solutions)"
        subtitle="منظومات تسليم مفتاح مخصصة للقطاعات (المستشفيات، المدارس، المطاعم، البراندات، الفعاليات...) تجمع اللوحات، المطبوعات والتغليف في حل واحد موحد."
        actionLabel="استعراض كافة باقات القطاعات (10 باقات)"
        onAction={() => navigate({ view: 'packages' })}
      />

      {/* Horizontal Carousel on Mobile / 3-Col Grid on Desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 md:pb-0 md:grid md:grid-cols-3 no-scrollbar -mx-1 px-1">
        {displayPackages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => navigate({ view: 'package-detail', packageId: pkg.id })}
            className="min-w-[270px] w-[285px] shrink-0 snap-start md:min-w-0 md:w-auto group bg-[#F5F1E9] dark:bg-[#25211F] rounded-[22px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-[#B9142D]/50 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Banner */}
            <div className="aspect-16/10 relative overflow-hidden bg-[#E5DFD3] dark:bg-[#1E1B1A]">
              <SafeImage
                src={pkg.hero_image}
                alt={pkg.title_ar}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                fallbackCategory={pkg.title_ar}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5">
                <span className="bg-[#B9142D] text-white text-[10px] font-bold px-2.5 py-1 rounded-[6px] shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{pkg.badge || 'باقة قطاعية'}</span>
                </span>
                {pkg.turnaround_time_ar && (
                  <span className="bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{pkg.turnaround_time_ar}</span>
                  </span>
                )}
              </div>

              <div className="absolute bottom-2.5 right-3 left-3 text-white">
                {pkg.target_sector_ar && (
                  <div className="text-[10px] text-amber-300 font-bold mb-0.5 line-clamp-1">
                    🎯 {pkg.target_sector_ar}
                  </div>
                )}
                <h3 className="font-heading font-extrabold text-[15px] sm:text-[17px] text-white leading-tight">
                  {pkg.title_ar}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-[11px] sm:text-[12px] text-[#746E67] dark:text-[#A0988F] line-clamp-2 leading-relaxed">
                  {pkg.tagline_ar}
                </p>

                {/* Items breakdown or benefits */}
                {pkg.items_breakdown && pkg.items_breakdown.length > 0 ? (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-bold text-[#171616] dark:text-[#F5F1EA]">ما تتضمنه الباقة:</div>
                    <div className="space-y-1">
                      {pkg.items_breakdown.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#746E67] dark:text-[#A0988F]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A] shrink-0" />
                          <span className="line-clamp-1">{item.name_ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : pkg.benefits_ar && pkg.benefits_ar.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-bold text-[#171616] dark:text-[#F5F1EA]">ما تحتويه الباقة:</div>
                    <div className="space-y-1">
                      {pkg.benefits_ar.slice(0, 3).map((b, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#746E67] dark:text-[#A0988F]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A] shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between text-xs font-bold text-[#B9142D]">
                <span>استعراض الباقة والبنود</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
