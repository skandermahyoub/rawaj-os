import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';
import { 
  Briefcase, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  MapPin, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { PortfolioProject } from '../../../types';

export const HomeProudPortfolio: React.FC = () => {
  const { portfolioProjects, navigate } = useApp();
  
  // Get featured projects or fallback to all projects up to 10
  const featuredProjects = portfolioProjects.filter((p) => p.featured);
  const displayProjects = (featuredProjects.length > 0 ? featuredProjects : portfolioProjects).slice(0, 10);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Extract unique industries/client types
  const industries = ['all', ...Array.from(new Set(displayProjects.map((p) => p.industry || p.client_type_ar)))];

  const filteredProjects = activeCategory === 'all'
    ? displayProjects
    : displayProjects.filter((p) => (p.industry || p.client_type_ar) === activeCategory);

  return (
    <section className="py-12 sm:py-16 bg-[#F7F5F0] dark:bg-[#181615] border-b border-[#EBE5DA] dark:border-[#282422] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B9142D]" />
              <span className="text-[#B9142D] text-xs sm:text-sm font-bold tracking-wider uppercase">
                سجل التميز والإنتاج
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171616] dark:text-[#F5F1EA] tracking-tight">
              أعمال ومشاريع نفخر بإنجازها
            </h2>
            <p className="text-xs sm:text-sm text-[#746E67] dark:text-[#A0988F] mt-1">
              نماذج واقعية من أعمال الطباعة والتغليف واللوحات الإعلانية المنفذة لكبرى العلامات التجارية
            </p>
          </div>

          <button
            onClick={() => navigate({ view: 'portfolio' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171616] dark:bg-[#F5F1EA] text-white dark:text-[#171616] hover:bg-[#B9142D] dark:hover:bg-[#B9142D] dark:hover:text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer self-start md:self-auto shadow-xs"
          >
            <span>شاهد جميع الأعمال ({portfolioProjects.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Category Chips Filter */}
        {industries.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveCategory(ind)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === ind
                    ? 'bg-[#B9142D] text-white shadow-xs'
                    : 'bg-white dark:bg-[#221F1E] text-[#5C564F] dark:text-[#A0988F] border border-[#EBE5DA] dark:border-[#2C2826] hover:bg-neutral-100'
                }`}
              >
                {ind === 'all' ? 'جميع الأعمال المميزة' : ind}
              </button>
            ))}
          </div>
        )}

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate({ view: 'portfolio', projectId: project.id })}
              className="group bg-white dark:bg-[#201D1C] rounded-2xl overflow-hidden border border-[#EBE5DA] dark:border-[#2C2826] hover:border-[#B9142D] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <SafeImage
                  src={project.images?.[0] || ''}
                  alt={project.title_ar}
                  fallbackCategory={project.industry || project.title_ar}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Sector / Industry Badge */}
                <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                  {project.client_type_ar || project.industry}
                </div>

                {/* Location / Year */}
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B9142D]" />
                    <span>{project.city || 'صنعاء'}</span>
                  </span>
                  <span>{project.year || '2026'}</span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#171616] dark:text-[#F5F1EA] mb-2 group-hover:text-[#B9142D] transition-colors line-clamp-1">
                    {project.title_ar}
                  </h3>
                  <p className="text-xs text-[#5C564F] dark:text-[#BBB4AA] leading-relaxed line-clamp-2 mb-4">
                    {project.short_description_ar}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EBE5DA] dark:border-[#2C2826] flex items-center justify-between text-xs font-semibold text-[#B9142D]">
                  <span>استعراض تفاصيل المشروع</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Ribbon */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate({ view: 'portfolio' })}
            className="px-8 py-3 rounded-xl bg-[#B9142D] hover:bg-[#951126] text-white text-sm font-bold shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>استعراض معرض الأعمال الكامل بالفيديو والصور</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
