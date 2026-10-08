import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Grid3X3,
  Images,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { PortfolioProject } from '../../types';

const ALL_CATEGORY = 'الكل';

export const PortfolioView: React.FC<{ projectId?: string }> = ({ projectId }) => {
  const { portfolioProjects, services, navigate } = useApp();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'all' | 'project' | 'gallery'>('all');

  const activeProjects = useMemo(
    () =>
      [...portfolioProjects]
        .filter((p) => p.is_active !== false)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [portfolioProjects]
  );

  const categories = useMemo(() => {
    const unique = Array.from(new Set(activeProjects.map((p) => p.category_ar || 'أعمال متنوعة')));
    return [ALL_CATEGORY, ...unique];
  }, [activeProjects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activeProjects.filter((p) => {
      if (activeCategory !== ALL_CATEGORY && (p.category_ar || 'أعمال متنوعة') !== activeCategory) return false;
      if (mode !== 'all' && (p.work_type || 'project') !== mode) return false;
      if (!q) return true;
      const haystack = [
        p.title_ar,
        p.client_type_ar,
        p.industry,
        p.category_ar,
        p.short_description_ar,
        ...(p.tags_ar || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeProjects, activeCategory, query, mode]);

  const featured = activeProjects.find((p) => p.featured) || activeProjects[0];

  useEffect(() => {
    if (!projectId) return;
    const found = activeProjects.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
      setSelectedImage(found.images?.[0] || '');
    }
  }, [projectId, activeProjects]);

  const openProject = (project: PortfolioProject) => {
    setSelectedProject(project);
    setSelectedImage(project.images?.[0] || '');
  };

  const closeProject = () => {
    setSelectedProject(null);
    setSelectedImage('');
  };

  const selectedServices = selectedProject
    ? services.filter((s) => selectedProject.services_used_ids?.includes(s.id))
    : [];

  return (
    <div className="pb-24 text-right">
      {/* Editorial hero */}
      <section className="relative overflow-hidden rounded-[30px] border border-[#2B2522] bg-[#11100F] text-white px-5 py-7 sm:px-9 sm:py-10 mb-7 shadow-[0_24px_70px_rgba(17,16,15,0.18)]">
        <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[#B9142D]/20 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 w-72 h-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="relative z-10 grid lg:grid-cols-[1.1fr_.9fr] gap-7 items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-[#F3EDE6]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>كتالوج أعمال رواج</span>
            </div>
            <div>
              <h1 className="font-heading text-3xl sm:text-5xl font-black leading-[1.08]">
                أعمال تتحدث
                <span className="text-[#E01B38]"> بصرياً</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-[#BDB4AA]">
                استكشف نماذج التنفيذ حسب المجال، وافتح كل مشروع لمشاهدة الصور والخدمات المرتبطة به.
                يمكن لرواج تحديث هذا الكتالوج باستمرار من لوحة الإدارة ورفع صور كل مشروع مباشرة.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="rounded-full bg-white/7 border border-white/10 px-3 py-1.5">
                {activeProjects.length} أعمال
              </span>
              <span className="rounded-full bg-white/7 border border-white/10 px-3 py-1.5">
                {Math.max(categories.length - 1, 0)} تصنيفات
              </span>
              <span className="rounded-full bg-white/7 border border-white/10 px-3 py-1.5">
                صور مشاريع متعددة
              </span>
            </div>
          </div>

          {featured && (
            <button
              type="button"
              onClick={() => openProject(featured)}
              className="group relative min-h-[240px] overflow-hidden rounded-[24px] border border-white/10 bg-[#1B1816] text-right"
            >
              <SafeImage
                src={featured.images?.[0]}
                alt={featured.title_ar}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackCategory="معرض الأعمال"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[10px] font-bold text-[#F3C64F] mb-1">
                  {featured.category_ar || 'عمل مميز'}
                </div>
                <div className="font-heading text-lg sm:text-xl font-black text-white">
                  {featured.title_ar}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-white/80">
                  <span>استعراض المشروع</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* Catalog controls */}
      <section className="sticky top-[72px] sm:top-[84px] z-20 -mx-1 px-1 py-3 mb-5 bg-[#F8F5EF]/92 dark:bg-[#12100F]/92 backdrop-blur-xl">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8178]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في الأعمال، الخامات، المجالات..."
                className="w-full h-11 rounded-2xl border border-[#E1DACE] dark:border-[#332E2A] bg-white/95 dark:bg-[#1B1816] pr-10 pl-4 text-xs text-[#171616] dark:text-white outline-none focus:border-[#B9142D]"
              />
            </div>
            <div className="grid grid-cols-3 sm:flex rounded-2xl bg-[#ECE6DD] dark:bg-[#1B1816] p-1 border border-[#DED6CA] dark:border-[#302B27]">
              {[
                { key: 'all', label: 'الكل', icon: Grid3X3 },
                { key: 'project', label: 'مشاريع', icon: BriefcaseBusiness },
                { key: 'gallery', label: 'لقطات', icon: Images },
              ].map((item) => {
                const Icon = item.icon;
                const active = mode === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMode(item.key as typeof mode)}
                    className={`h-9 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                      active
                        ? 'bg-[#171616] dark:bg-[#B9142D] text-white shadow-sm'
                        : 'text-[#70675F] dark:text-[#B7AEA5]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold border transition-all ${
                    active
                      ? 'bg-[#B9142D] border-[#B9142D] text-white shadow-[0_8px_20px_rgba(185,20,45,.18)]'
                      : 'bg-white dark:bg-[#1B1816] border-[#E4DDD3] dark:border-[#332E2A] text-[#625B55] dark:text-[#C8C0B8]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual catalog */}
      {filtered.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
          {filtered.map((project, index) => {
            const image = project.images?.[0];
            const imageCount = project.images?.filter(Boolean).length || 0;
            const tall = index % 5 === 1 || index % 5 === 4;
            return (
              <article
                key={project.id}
                className="break-inside-avoid mb-4 sm:mb-5 group"
              >
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="relative block w-full overflow-hidden rounded-[24px] bg-[#EEE9E1] dark:bg-[#1A1715] text-right border border-[#E5DED4] dark:border-[#302B27] shadow-[0_10px_28px_rgba(36,29,25,.06)] hover:shadow-[0_18px_45px_rgba(36,29,25,.12)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}>
                    <SafeImage
                      src={image}
                      alt={project.title_ar}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      fallbackCategory="معرض الأعمال"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-2">
                    <span className="max-w-[75%] truncate rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-bold text-white">
                      {project.category_ar || 'أعمال متنوعة'}
                    </span>
                    {imageCount > 1 && (
                      <span className="rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-2 py-1 text-[10px] font-bold text-white flex items-center gap-1">
                        <Images className="w-3 h-3" />
                        {imageCount}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="font-heading text-base sm:text-lg font-black text-white leading-snug">
                      {project.title_ar}
                    </div>
                    <p className="mt-1.5 text-[11px] leading-5 text-white/72 line-clamp-2">
                      {project.short_description_ar}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-[10px] font-bold text-[#F3C64F]">
                        {project.client_type_ar}
                      </div>
                      <span className="w-8 h-8 rounded-full bg-white text-[#171616] flex items-center justify-center group-hover:bg-[#B9142D] group-hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#D9D0C4] dark:border-[#39332F] p-12 text-center">
          <Images className="w-8 h-8 mx-auto text-[#9B9188] mb-3" />
          <div className="font-bold text-sm text-[#3E3935] dark:text-white">لا توجد أعمال مطابقة</div>
          <p className="text-xs text-[#8A8178] mt-1">غيّر التصنيف أو عبارة البحث.</p>
        </div>
      )}

      {/* Full project viewer */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#0B0A09]/94 backdrop-blur-xl p-2 sm:p-5 overflow-y-auto"
          onClick={closeProject}
        >
          <div
            className="max-w-6xl mx-auto min-h-full rounded-[28px] bg-[#F8F5EF] dark:bg-[#151311] overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-[#F8F5EF]/94 dark:bg-[#151311]/94 backdrop-blur-xl border-b border-[#E6DED4] dark:border-[#2D2926]">
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-[#B9142D] mb-0.5">
                  {selectedProject.category_ar || 'معرض الأعمال'}
                </div>
                <h2 className="font-heading text-sm sm:text-lg font-black text-[#171616] dark:text-white truncate">
                  {selectedProject.title_ar}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeProject}
                className="w-10 h-10 shrink-0 rounded-2xl bg-[#ECE6DD] dark:bg-[#24201D] text-[#171616] dark:text-white flex items-center justify-center"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid lg:grid-cols-[1.35fr_.65fr]">
              <div className="p-3 sm:p-5 border-b lg:border-b-0 lg:border-l border-[#E6DED4] dark:border-[#2D2926]">
                <div className="aspect-[4/3] sm:aspect-[16/10] rounded-[22px] overflow-hidden bg-[#E9E2D9] dark:bg-[#211E1B]">
                  <SafeImage
                    src={selectedImage || selectedProject.images?.[0]}
                    alt={selectedProject.title_ar}
                    className="w-full h-full object-cover"
                    fallbackCategory="معرض الأعمال"
                  />
                </div>

                {selectedProject.images?.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {selectedProject.images.filter(Boolean).map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          (selectedImage || selectedProject.images?.[0]) === img
                            ? 'border-[#B9142D]'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <SafeImage src={img} alt="" className="w-full h-full object-cover" fallbackCategory="معرض الأعمال" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <aside className="p-5 sm:p-7 space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProject.tags_ar?.slice(0, 5).map((tag) => (
                      <span key={tag} className="rounded-full bg-[#ECE6DD] dark:bg-[#24201D] px-2.5 py-1 text-[10px] font-bold text-[#625B55] dark:text-[#C8C0B8]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-[#171616] dark:text-white leading-tight">
                    {selectedProject.title_ar}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-7 text-[#625B55] dark:text-[#B9B0A8]">
                    {selectedProject.short_description_ar}
                  </p>
                </div>

                {(selectedProject.city || selectedProject.year || selectedProject.client_type_ar) && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-white dark:bg-[#1D1A18] border border-[#E8E1D7] dark:border-[#302B27] p-3">
                      <div className="text-[10px] text-[#928980]">نوع العمل</div>
                      <div className="mt-1 text-xs font-bold text-[#171616] dark:text-white">{selectedProject.client_type_ar}</div>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-[#1D1A18] border border-[#E8E1D7] dark:border-[#302B27] p-3">
                      <div className="text-[10px] text-[#928980]">الموقع / السنة</div>
                      <div className="mt-1 text-xs font-bold text-[#171616] dark:text-white">
                        {[selectedProject.city, selectedProject.year].filter(Boolean).join(' • ') || 'غير محدد'}
                      </div>
                    </div>
                  </div>
                )}

                {selectedProject.challenge_ar && (
                  <div>
                    <div className="text-xs font-black text-[#171616] dark:text-white mb-1">متطلبات التنفيذ</div>
                    <p className="text-xs leading-6 text-[#6E655E] dark:text-[#B5ACA4]">{selectedProject.challenge_ar}</p>
                  </div>
                )}

                {selectedProject.solution_ar && (
                  <div>
                    <div className="text-xs font-black text-[#171616] dark:text-white mb-1">المعالجة التنفيذية</div>
                    <p className="text-xs leading-6 text-[#6E655E] dark:text-[#B5ACA4]">{selectedProject.solution_ar}</p>
                  </div>
                )}

                {selectedServices.length > 0 && (
                  <div>
                    <div className="text-xs font-black text-[#171616] dark:text-white mb-2">الخدمات المرتبطة</div>
                    <div className="space-y-1.5">
                      {selectedServices.slice(0, 6).map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            closeProject();
                            navigate({ view: 'service-detail', serviceId: service.id });
                          }}
                          className="w-full flex items-center justify-between gap-2 rounded-xl bg-white dark:bg-[#1D1A18] border border-[#E8E1D7] dark:border-[#302B27] px-3 py-2 text-right"
                        >
                          <span className="text-[11px] font-bold text-[#3F3934] dark:text-[#DDD6CF] truncate">{service.name_ar}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B9142D] shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    closeProject();
                    navigate({ view: 'custom-quote' });
                  }}
                  className="w-full rounded-2xl bg-[#B9142D] hover:bg-[#9E1026] text-white px-4 py-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(185,20,45,.22)]"
                >
                  <span>أريد تنفيذ مشروع مشابه</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
