import React, { useMemo, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { ArrowLeft, Images, Sparkles } from 'lucide-react';

export const HomePortfolio: React.FC = () => {
  const { portfolioProjects, navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState('الكل');

  const projects = useMemo(
    () =>
      [...portfolioProjects]
        .filter((p) => p.is_active !== false)
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [portfolioProjects]
  );

  const categories = useMemo(
    () => ['الكل', ...Array.from(new Set(projects.map((p) => p.category_ar || 'أعمال متنوعة')))],
    [projects]
  );

  const filtered = (activeCategory === 'الكل'
    ? projects
    : projects.filter((p) => (p.category_ar || 'أعمال متنوعة') === activeCategory)
  ).slice(0, 6);

  if (projects.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-[30px] bg-[#11100F] border border-[#2A2522] text-white p-5 sm:p-8 shadow-xl">
      <div className="absolute -top-24 left-1/4 w-72 h-72 rounded-full bg-[#B9142D]/14 blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#F3C64F] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مختارات من كتالوج رواج</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black">أعمالنا بصريًا</h2>
            <p className="mt-2 text-xs sm:text-sm text-[#B8AEA5] max-w-2xl leading-6">
              تصفح نماذج التنفيذ حسب المجال، ثم افتح المشروع لمشاهدة جميع الصور والخدمات المرتبطة به.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ view: 'portfolio' })}
            className="self-start md:self-auto rounded-2xl bg-white text-[#171616] px-4 py-2.5 text-xs font-black flex items-center gap-2 hover:bg-[#F3C64F] transition-colors"
          >
            <span>فتح كتالوج الأعمال ({projects.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold border transition-all ${
                activeCategory === category
                  ? 'bg-[#B9142D] border-[#B9142D] text-white'
                  : 'bg-white/5 border-white/10 text-[#C8BFB7]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {filtered.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => navigate({ view: 'portfolio', projectId: project.id })}
              className={`group relative overflow-hidden rounded-[20px] bg-[#1A1715] text-right ${
                index === 0 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={index === 0 ? 'aspect-[16/9] lg:aspect-[4/3]' : 'aspect-[4/3]'}>
                <SafeImage
                  src={project.images?.[0]}
                  alt={project.title_ar}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackCategory="معرض الأعمال"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute top-2.5 right-2.5">
                {(project.images?.filter(Boolean).length || 0) > 1 && (
                  <span className="rounded-full bg-black/55 backdrop-blur px-2 py-1 text-[9px] font-bold text-white flex items-center gap-1">
                    <Images className="w-3 h-3" />
                    {project.images.filter(Boolean).length}
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <div className="text-[9px] font-bold text-[#F3C64F] mb-1 truncate">
                  {project.category_ar || 'أعمال متنوعة'}
                </div>
                <h3 className="font-heading text-xs sm:text-sm font-black text-white leading-snug line-clamp-2">
                  {project.title_ar}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
