import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  ArrowLeft,
  Layers,
  Search,
  Sparkles,
  WandSparkles,
} from 'lucide-react';

export const DepartmentsView: React.FC = () => {
  const { departments, categories, services, navigate } = useApp();

  const activeDepartments = useMemo(
    () => departments.filter((d) => d.is_active !== false).sort((a, b) => a.sort_order - b.sort_order),
    [departments]
  );

  return (
    <div className="space-y-7 pb-20 text-right">
      <section className="relative overflow-hidden rounded-[30px] bg-[#11100F] text-white border border-[#2B2622] p-6 sm:p-9 shadow-xl">
        <div className="absolute -top-28 -left-24 w-80 h-80 rounded-full bg-[#B9142D]/18 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/6 border border-white/10 px-3 py-1.5 text-[11px] font-bold text-[#F3C64F]">
            <WandSparkles className="w-3.5 h-3.5" />
            <span>دليل رواج لاختيار الخدمة</span>
          </div>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-black leading-tight">
            ابدأ من حاجتك، وليس من اسم التقنية
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-7 text-[#BDB4AA]">
            اختر القسم الأقرب لما تريد إنجازه. داخل كل خدمة ستشاهد الأنواع والخامات والمقاسات
            والتشطيبات بصرياً، ويمكنك ترك أي قرار فني لرواج إذا لم تكن متأكداً.
          </p>

          <button
            type="button"
            onClick={() => navigate({ view: 'services' })}
            className="mt-5 rounded-2xl bg-white text-[#171616] px-4 py-3 text-xs font-black inline-flex items-center gap-2 hover:bg-[#F3C64F] transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>ابحث مباشرة في جميع الخدمات والخيارات</span>
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <div className="text-[11px] font-bold text-[#B9142D] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeDepartments.length} مسارات واضحة</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-[#171616] dark:text-white">
              ماذا تريد أن تنجز؟
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDepartments.map((dept, index) => {
            const deptCategories = categories.filter((c) => c.department_id === dept.id && c.is_active !== false);
            const deptServices = services.filter(
              (s) =>
                s.department_id === dept.id &&
                s.service_status === 'published' &&
                s.catalog_role !== 'component'
            );

            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => navigate({ view: 'services', departmentId: dept.id })}
                className={`group relative overflow-hidden rounded-[24px] border border-[#E5DED4] dark:border-[#312C28] bg-white dark:bg-[#191614] text-right shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-[#EDE7DE] dark:bg-[#221E1B]">
                  <SafeImage
                    src={dept.hero_image}
                    alt={dept.name_ar}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackCategory={dept.name_ar}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2.5 py-1">
                    {deptServices.length} خدمات رئيسية
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-heading text-base sm:text-lg font-black text-white leading-snug">
                      {dept.name_ar}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs leading-6 text-[#6E655D] dark:text-[#ADA39A] min-h-[48px]">
                    {dept.description_ar}
                  </p>

                  {deptCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {deptCategories.slice(0, 4).map((cat) => (
                        <span
                          key={cat.id}
                          className="rounded-full bg-[#F2EDE6] dark:bg-[#24201D] px-2.5 py-1 text-[9px] font-bold text-[#655D55] dark:text-[#C7BEB6]"
                        >
                          {cat.name_ar}
                        </span>
                      ))}
                      {deptCategories.length > 4 && (
                        <span className="rounded-full bg-[#B9142D]/10 px-2.5 py-1 text-[9px] font-bold text-[#B9142D]">
                          +{deptCategories.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#EEE8E0] dark:border-[#2D2824] flex items-center justify-between text-xs font-black text-[#B9142D]">
                    <span>استكشف الخدمات والخيارات</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-[#E3DCD2] dark:border-[#312C28] bg-[#F7F3ED] dark:bg-[#181513] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#171616] dark:text-white">
            <Layers className="w-4 h-4 text-[#B9142D]" />
            <span>لا تعرف تحت أي قسم تقع فكرتك؟</span>
          </div>
          <p className="mt-1 text-xs leading-6 text-[#766D65] dark:text-[#AAA097]">
            ابحث باسم الشيء الذي تريده: كروت، واجهة محل، مطوية، مجلة، هدية، كيس، لوحة، زي موظفين…
            وسيبحث النظام أيضاً داخل خيارات كل خدمة وليس في اسم الخدمة فقط.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate({ view: 'services' })}
          className="shrink-0 rounded-2xl bg-[#B9142D] text-white px-4 py-3 text-xs font-black flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>فتح دليل الخدمات</span>
        </button>
      </section>
    </div>
  );
};
