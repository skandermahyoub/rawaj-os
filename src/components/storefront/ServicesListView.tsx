import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from './ServiceCard';
import {
  Layers,
  Search,
  X,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  WandSparkles,
} from 'lucide-react';

interface ServicesListViewProps {
  initialDepartmentId?: string;
  initialCategoryId?: string;
  initialIndustrySectorId?: string;
  initialSearchQuery?: string;
  onOpenCustomQuote: () => void;
}

export const ServicesListView: React.FC<ServicesListViewProps> = ({
  initialDepartmentId,
  initialCategoryId,
  initialSearchQuery = '',
  onOpenCustomQuote,
}) => {
  const { services, departments, categories } = useApp();

  const activeDepartments = useMemo(
    () => departments.filter((d) => d.is_active !== false).sort((a, b) => a.sort_order - b.sort_order),
    [departments]
  );

  const [selectedDept, setSelectedDept] = useState<string>(initialDepartmentId || 'all');
  const [selectedCat, setSelectedCat] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    if (initialDepartmentId) setSelectedDept(initialDepartmentId);
  }, [initialDepartmentId]);

  useEffect(() => {
    if (initialCategoryId) setSelectedCat(initialCategoryId);
  }, [initialCategoryId]);

  const publicServices = useMemo(
    () =>
      services.filter(
        (s) => s.service_status === 'published' && s.catalog_role !== 'component'
      ),
    [services]
  );

  const availableCategories = useMemo(() => {
    if (selectedDept === 'all') return [];
    return categories
      .filter((c) => c.department_id === selectedDept && c.is_active !== false)
      .sort((a, b) => a.sort_order - b.sort_order);
  }, [categories, selectedDept]);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return publicServices.filter((s) => {
      if (selectedDept !== 'all' && s.department_id !== selectedDept) return false;
      if (selectedCat !== 'all' && s.category_id !== selectedCat) return false;

      if (!q) return true;

      const specText = (s.specification_groups || [])
        .flatMap((group) => [
          group.title_ar,
          group.description_ar || '',
          ...(group.fields || []).flatMap((field) => [
            field.label_ar,
            field.help_text_ar || '',
            ...(field.options || []).flatMap((opt) => [
              opt.label_ar,
              opt.description || '',
              opt.badge || '',
            ]),
          ]),
        ])
        .join(' ');

      const haystack = [
        s.name_ar,
        s.name_en,
        s.short_description_ar,
        s.full_description_ar,
        s.customer_goal_ar || '',
        specText,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [publicServices, selectedDept, selectedCat, searchQuery]);

  const handleDeptChange = (deptId: string) => {
    setSelectedDept(deptId);
    setSelectedCat('all');
  };

  const reset = () => {
    setSelectedDept('all');
    setSelectedCat('all');
    setSearchQuery('');
  };

  const hasFilters = selectedDept !== 'all' || selectedCat !== 'all' || Boolean(searchQuery.trim());

  return (
    <div className="space-y-6 pb-16 text-right">
      <section className="relative overflow-hidden rounded-[28px] border border-[#2B2622] bg-[#11100F] text-white p-5 sm:p-8 shadow-xl">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#B9142D]/18 blur-3xl" />
        <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-[#F3C64F]">
              <WandSparkles className="h-3.5 w-3.5" />
              <span>دليل خدمات يفهم ما الذي تريد إنجازه</span>
            </div>
            <h1 className="mt-4 font-heading text-2xl sm:text-4xl font-black leading-tight">
              ابحث عن حاجتك، ثم شاهد كل الطرق الممكنة لتنفيذها
            </h1>
            <p className="mt-3 text-xs sm:text-sm leading-7 text-[#BDB4AA]">
              لا تحتاج لمعرفة أسماء الخامات أو تقنيات الطباعة. افتح الخدمة وشاهد الأنواع والفروق والصور،
              اختر ما يعجبك، وحدد الكمية، أو اترك القرار الفني لرواج.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCustomQuote}
            className="shrink-0 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-xs font-black text-white hover:bg-white/12"
          >
            لم أجد ما أريده — طلب مخصص
          </button>
        </div>
      </section>

      <section className="sticky top-[72px] sm:top-[84px] z-20 rounded-[22px] border border-[#E5DED4] dark:border-[#332E2A] bg-[#FFFDF9]/94 dark:bg-[#171412]/94 p-3 sm:p-4 backdrop-blur-xl shadow-xs">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8178]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بما تعرفه: كروت، UV بارز، واجهة، كلادينج، نيون، مجلة، أكياس، تطريز..."
              className="h-12 w-full rounded-2xl border border-[#E4DDD3] dark:border-[#332E2A] bg-[#FAF8F4] dark:bg-[#201D1B] pr-10 pl-10 text-xs outline-none focus:border-[#B9142D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8178]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => handleDeptChange('all')}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[10px] font-black border ${
                selectedDept === 'all'
                  ? 'bg-[#B9142D] border-[#B9142D] text-white'
                  : 'bg-white dark:bg-[#211E1B] border-[#E4DDD3] dark:border-[#332E2A] text-[#665E57] dark:text-[#C8BFB8]'
              }`}
            >
              جميع الاحتياجات ({publicServices.length})
            </button>

            {activeDepartments.map((dept) => {
              const count = publicServices.filter((s) => s.department_id === dept.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleDeptChange(dept.id)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-[10px] font-black border ${
                    selectedDept === dept.id
                      ? 'bg-[#B9142D] border-[#B9142D] text-white'
                      : 'bg-white dark:bg-[#211E1B] border-[#E4DDD3] dark:border-[#332E2A] text-[#665E57] dark:text-[#C8BFB8]'
                  }`}
                >
                  {dept.name_ar} ({count})
                </button>
              );
            })}
          </div>

          {availableCategories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar border-t border-[#EEE8E0] dark:border-[#2D2824] pt-3">
              <button
                type="button"
                onClick={() => setSelectedCat('all')}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-[10px] font-bold ${
                  selectedCat === 'all'
                    ? 'bg-[#171616] dark:bg-white text-white dark:text-[#171616]'
                    : 'bg-[#F2EDE6] dark:bg-[#24201D] text-[#675F57] dark:text-[#C8BFB8]'
                }`}
              >
                الكل
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-[10px] font-bold ${
                    selectedCat === cat.id
                      ? 'bg-[#171616] dark:bg-white text-white dark:text-[#171616]'
                      : 'bg-[#F2EDE6] dark:bg-[#24201D] text-[#675F57] dark:text-[#C8BFB8]'
                  }`}
                >
                  {cat.name_ar}
                </button>
              ))}
            </div>
          )}

          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#7B7169] hover:text-[#B9142D]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إلغاء البحث والتصفية</span>
            </button>
          )}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#B9142D]" />
          <span className="text-xs font-black text-[#171616] dark:text-white">
            {filteredServices.length} خدمة رئيسية
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-[#7A7169] dark:text-[#AAA198]">
          <Sparkles className="h-3.5 w-3.5 text-[#F0B23D]" />
          <span>كل خدمة تحتوي خياراتها وتقنياتها داخلها</span>
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[#D9D0C4] dark:border-[#39332F] p-10 text-center">
          <SlidersHorizontal className="mx-auto mb-3 h-8 w-8 text-[#9B9188]" />
          <h3 className="font-heading text-sm font-black text-[#171616] dark:text-white">
            لم نجد خدمة مطابقة بهذه العبارة
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-[#7A7169] dark:text-[#AAA198]">
            جرّب اسم الشيء نفسه أو التقنية التي تعرفها. البحث يقرأ أيضًا الخيارات الموجودة داخل صفحات الخدمات.
          </p>
          <button
            type="button"
            onClick={onOpenCustomQuote}
            className="mt-4 rounded-xl bg-[#B9142D] px-4 py-2.5 text-xs font-black text-white"
          >
            أرسل طلبًا مخصصًا لرواج
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};
