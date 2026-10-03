import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const SpecializedServicesGrid: React.FC = () => {
  const { navigate } = useApp();

  const specialFinishes = [
    {
      id: 'uv-3d',
      title: 'يو في موضعي بارز (Spot UV 3D)',
      category: 'التشطيبات الفاخرة',
      description: 'إبراز الشعار والعناصر بلمعة كريستالية بارزة الملمس على الكروت والعلب.',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      badge: 'ملمس نافر وفاخر',
      departmentId: 'dept-uv'
    },
    {
      id: 'hot-foil',
      title: 'بصمة حرارية ذهبية وفضية (Hot Foil)',
      category: 'التذهيب والفضة',
      description: 'تطبيق رقائق الفويل المعدني اللامع والمطفي للشعارات الرسمية والكرتون الفاخر.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      badge: 'بصمة معدنية مذهبة',
      departmentId: 'dept-packaging'
    },
    {
      id: 'laser-engrave',
      title: 'قص وحفر ليزر دقيق (Laser & CNC)',
      category: 'الأكريليك والمعادن',
      description: 'قص وحفر ثلاثي الأبعاد على الأكريليك، الخشب، الستانلس ستيل، ودروع التكريم.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      badge: 'دقة قص ميكرونية',
      departmentId: 'dept-laser'
    },
    {
      id: 'roll-labels',
      title: 'ملصقات رول للمصانع والعبوات',
      category: 'خطوط الإنتاج والتعبئة',
      description: 'ليبل مقاوم للماء والزيوت والتجميد مع قص داي كت أوتوماتيكي للآلات.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
      badge: 'رول تغليف صناعي',
      departmentId: 'dept-labels'
    }
  ];

  return (
    <section className="bg-[#171616] text-white rounded-[26px] sm:rounded-[32px] p-5 sm:p-8 lg:p-10 border border-white/10 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B9142D] bg-[#B9142D]/20 px-2.5 py-0.5 rounded-[6px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مختبر الخامات والتشطيبات التخصصية</span>
          </div>
          <h2 className="font-heading font-black text-[18px] sm:text-[22px] text-[#FFFDF9]">
            تقنيات صناعية متقدمة للمشاريع غير التقليدية
          </h2>
          <p className="text-[12px] text-[#EEE9E0]/80">
            أحدث خطوط الإنتاج واللمسات الفنية التي تميز منتجك ومطبوعاتك عن المنافسين.
          </p>
        </div>

        <button
          onClick={() => navigate({ view: 'services' })}
          className="touch-target text-xs font-bold text-[#B9142D] hover:text-white flex items-center gap-1 shrink-0 self-start sm:self-auto"
        >
          <span>استعراض كل التقنيات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Carousel on Mobile / Grid on Tablet & Desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 no-scrollbar -mx-1 px-1">
        {specialFinishes.map((finish) => (
          <div
            key={finish.id}
            onClick={() => navigate({ view: 'services', departmentId: finish.departmentId })}
            className="min-w-[230px] w-[240px] shrink-0 snap-start sm:min-w-0 sm:w-auto group bg-[#25211F] hover:bg-[#2E2927] rounded-[20px] border border-white/10 hover:border-[#B9142D]/60 p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="relative aspect-16/10 rounded-[14px] overflow-hidden bg-black/40">
                <SafeImage
                  src={finish.image}
                  alt={finish.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out opacity-90"
                  fallbackCategory={finish.title}
                />
                <span className="absolute top-2 right-2 bg-[#B9142D] text-white text-[9px] font-bold px-2 py-0.5 rounded-[5px]">
                  {finish.badge}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-[#F5F1E9]/60">{finish.category}</span>
                <h3 className="font-heading font-bold text-[13px] sm:text-[14px] text-white group-hover:text-[#B9142D] transition-colors leading-snug">
                  {finish.title}
                </h3>
                <p className="text-[11px] text-[#EEE9E0]/70 line-clamp-2 mt-1 leading-relaxed">
                  {finish.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between text-xs font-bold text-[#B9142D]">
              <span>طلب مواصفة التقنية</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
