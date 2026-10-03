import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, CheckCircle2, ChevronDown } from 'lucide-react';

export const AdminTaxonomyManager: React.FC = () => {
  const { departments, categories, services } = useApp();

  return (
    <div className="space-y-6 text-right pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B9142D]" />
            <span>هيكل الأقسام والتصنيفات (Taxonomy Tree)</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            بنية الكتالوج الهرمية: الأقسام الـ 12 والتصنيفات الفرعية المرتبطة بكل قسم
          </p>
        </div>
      </div>

      {/* Departments List */}
      <div className="space-y-3">
        {departments.map((dept) => {
          const deptCats = categories.filter((c) => c.department_id === dept.id);
          const deptServices = services.filter((s) => s.department_id === dept.id);

          return (
            <div
              key={dept.id}
              className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-4 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F5F1E9] dark:border-[#252222]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FDE8EA] dark:bg-[#3D1217] flex items-center justify-center text-[#B9142D] font-bold text-sm">
                    {dept.sort_order}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
                      {dept.name_ar}
                    </h3>
                    <div className="text-[10px] text-[#78716C]">{dept.name_en}</div>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2.5 py-0.5 rounded">
                  {deptServices.length} خدمات
                </span>
              </div>

              {/* Categories */}
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-[11px] text-[#78716C]">التصنيفات الفرعية المعتمدة:</div>
                <div className="flex flex-wrap gap-1.5">
                  {deptCats.map((cat) => (
                    <span
                      key={cat.id}
                      className="bg-[#FAF7F2] dark:bg-[#252222] text-[#44403C] dark:text-[#D6D3D1] px-2.5 py-1 rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] text-[11px]"
                    >
                      {cat.name_ar}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
