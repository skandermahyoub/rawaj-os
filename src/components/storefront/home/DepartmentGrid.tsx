import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SectionHeader } from './SectionHeader';
import { SafeImage } from '../../common/SafeImage';
import { 
  Printer, 
  Tags, 
  Package, 
  Maximize, 
  Tv, 
  Building2, 
  Shirt, 
  Scissors, 
  Gift, 
  Sparkles, 
  Flame, 
  Palette,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const DepartmentGrid: React.FC = () => {
  const { departments, services, navigate } = useApp();

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer': return <Printer className="w-4 h-4 text-white" />;
      case 'Tags': return <Tags className="w-4 h-4 text-white" />;
      case 'Package': return <Package className="w-4 h-4 text-white" />;
      case 'Maximize': return <Maximize className="w-4 h-4 text-white" />;
      case 'Tv': return <Tv className="w-4 h-4 text-white" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-white" />;
      case 'Shirt': return <Shirt className="w-4 h-4 text-white" />;
      case 'Scissors': return <Scissors className="w-4 h-4 text-white" />;
      case 'Gift': return <Gift className="w-4 h-4 text-white" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-white" />;
      case 'Flame': return <Flame className="w-4 h-4 text-white" />;
      case 'Palette': return <Palette className="w-4 h-4 text-white" />;
      default: return <Layers className="w-4 h-4 text-white" />;
    }
  };

  const activeDepartments = departments.filter((d) => d.is_active !== false);
  const displayDepartments = activeDepartments.slice(0, 8);

  return (
    <section className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[26px] sm:rounded-[30px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-xs">
      <SectionHeader
        title="ابدأ من الشيء الذي تحتاجه"
        subtitle="قسمنا خدمات رواج إلى مسارات واضحة حتى تصل إلى الخدمة المناسبة دون معرفة المصطلحات الفنية."
        actionLabel={`عرض جميع الأقسام (${activeDepartments.length})`}
        onAction={() => navigate({ view: 'departments' })}
      />

      {/* Mobile Horizontal Carousel / Desktop 4-Column Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:pb-0 md:grid md:grid-cols-4 no-scrollbar -mx-1 px-1">
        {displayDepartments.map((dept) => {
          const deptServices = services.filter((s) => s.department_id === dept.id && s.service_status === 'published' && s.catalog_role !== 'component');
          const count = deptServices.length;

          return (
            <div
              key={dept.id}
              onClick={() => navigate({ view: 'services', departmentId: dept.id })}
              className="min-w-[210px] w-[220px] shrink-0 snap-start md:min-w-0 md:w-auto group relative bg-[#F5F1E9] dark:bg-[#25211F] rounded-[20px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-brand-primary-30 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between text-right"
            >
              {/* Header Visual Bar with Real Background & Icon */}
              <div className="relative h-24 sm:h-28 overflow-hidden bg-[#171616]">
                <SafeImage
                  src={dept.hero_image}
                  alt={dept.name_ar}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out opacity-85"
                  fallbackCategory={dept.name_ar}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Floating Icon Glyph */}
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-[10px] bg-brand-primary shadow-md flex items-center justify-center">
                  {getDeptIcon(dept.icon)}
                </div>

                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-[5px]">
                  {count} خدمات
                </div>

                <div className="absolute bottom-2 right-2.5 left-2.5 text-white">
                  <h3 className="font-heading font-extrabold text-[13px] sm:text-[14px] text-white leading-tight">
                    {dept.name_ar}
                  </h3>
                </div>
              </div>

              {/* Department Body */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-[10px] sm:text-[11px] text-[#746E67] dark:text-[#A0988F] line-clamp-2 leading-relaxed">
                  {dept.description_ar}
                </p>

                <div className="pt-2 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between text-xs font-bold text-brand-primary">
                  <span>تصفح القسم</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
