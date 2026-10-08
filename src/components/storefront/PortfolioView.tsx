import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Briefcase, MapPin, Calendar, CheckCircle2, ArrowLeft, Layers } from 'lucide-react';
import { PortfolioProject } from '../../types';

export const PortfolioView: React.FC<{ projectId?: string }> = ({ projectId }) => {
  const { portfolioProjects, services, navigate } = useApp();

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(() => {
    if (projectId) {
      return portfolioProjects.find((p) => p.id === projectId) || null;
    }
    return null;
  });

  return (
    <div className="space-y-6 pb-16 text-right">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-brand-primary-10 text-brand-primary px-2.5 py-0.5 rounded text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>نماذج من أعمال رواج ومجالات التنفيذ</span>
        </div>
        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#171616] dark:text-[#F5F3EF]">
          معرض أعمال رواج
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E]">
          نماذج مستندة إلى بروفايل رواج في الواجهات والحروف المضيئة، الأكشاك ونقاط البيع، الهوية الداخلية، الطباعة التجارية، الليزر والهدايا الدعائية.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioProjects.map((proj) => {
          const usedServices = services.filter((s) => proj.services_used_ids?.includes(s.id));

          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] hover:border-brand-primary-30 overflow-hidden shadow-xs cursor-pointer flex flex-col justify-between group transition-all duration-200"
            >
              <div>
                <div className="aspect-16/10 relative overflow-hidden bg-[#F5F1E9] dark:bg-[#252222]">
                  <SafeImage
                    src={proj.images?.[0]}
                    alt={proj.title_ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackCategory="معرض الأعمال"
                  />
                  {(proj.city || proj.year) && (
                    <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-primary" />
                      <span>{[proj.city, proj.year].filter(Boolean).join(' • ')}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <span className="text-[10px] font-bold text-brand-primary bg-brand-primary-10 px-2 py-0.5 rounded">
                    {proj.client_type_ar}
                  </span>

                  <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
                    {proj.title_ar}
                  </h3>

                  <p className="text-xs text-[#78716C] dark:text-[#A8A29E] line-clamp-2 leading-relaxed">
                    {proj.short_description_ar}
                  </p>

                  {usedServices.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {usedServices.map((s) => (
                        <span
                          key={s.id}
                          className="text-[9px] bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] px-1.5 py-0.5 rounded border border-[#E7E0D3] dark:border-[#332F2F]"
                        >
                          {s.name_ar}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-brand-primary">
                <span>عرض دراسة الحالة والحلول</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>

            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="w-full max-w-3xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-primary">
                  {selectedProject.client_type_ar}{(selectedProject.city || selectedProject.year) ? ` • ${[selectedProject.city, selectedProject.year].filter(Boolean).join(' • ')}` : ''}
                </span>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#171616] dark:text-white">
                  {selectedProject.title_ar}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#EAE4D6] px-3 py-1.5 rounded-lg text-[#57534E] dark:text-[#D6D3D1]"
              >
                إغلاق
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs leading-relaxed flex-1">
              
              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.images.map((img, idx) => (
                  <div key={idx} className="aspect-16/10 rounded-xl overflow-hidden bg-[#F5F1E9] dark:bg-[#252222]">
                    <SafeImage src={img} alt={selectedProject.title_ar} className="w-full h-full object-cover" fallbackCategory="معرض الأعمال" />
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="font-bold text-sm text-[#171616] dark:text-white mb-1">وصف المشروع:</h4>
                  <p className="text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                    {selectedProject.short_description_ar}
                  </p>
                </div>

                {selectedProject.challenge_ar && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 space-y-1">
                    <strong className="block font-bold">متطلبات التنفيذ:</strong>
                    <p className="text-[11px] leading-relaxed">{selectedProject.challenge_ar}</p>
                  </div>
                )}

                {selectedProject.solution_ar && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 space-y-1">
                    <strong className="block font-bold">المعالجة التنفيذية من رواج:</strong>
                    <p className="text-[11px] leading-relaxed">{selectedProject.solution_ar}</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
