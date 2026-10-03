import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';

export const QuickCategories: React.FC = () => {
  const { departments, navigate } = useApp();

  const handleSelectDept = (deptId: string) => {
    navigate({ view: 'services', departmentId: deptId });
  };

  return (
    <div className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[22px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-3 sm:p-4 space-y-2.5 shadow-2xs">
      <div className="flex items-center justify-between text-xs font-bold text-[#746E67] dark:text-[#A0988F] px-1">
        <span className="text-[#171616] dark:text-[#F5F1EA]">تصفح الأقسام والخطوط الإنتاجية:</span>
        <button 
          onClick={() => navigate({ view: 'departments' })} 
          className="text-[#B9142D] hover:underline text-[11px]"
        >
          كل الأقسام الـ 12 ←
        </button>
      </div>

      {/* Visual Circular Thumbnails Bar with guaranteed shrink-0 */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar w-full">
        {/* All services circle */}
        <button
          onClick={() => navigate({ view: 'services' })}
          className="group flex flex-col items-center gap-1.5 shrink-0 focus:outline-hidden"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#B9142D] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-[#B9142D]/20 group-hover:scale-105 transition-transform">
            الكل
          </div>
          <span className="text-[11px] font-bold text-[#B9142D] whitespace-nowrap">
            كل الخدمات
          </span>
        </button>

        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => handleSelectDept(dept.id)}
            className="group flex flex-col items-center gap-1.5 shrink-0 focus:outline-hidden"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[rgba(23,22,22,0.1)] dark:border-[rgba(245,241,234,0.15)] group-hover:border-[#B9142D] group-hover:scale-105 transition-all shadow-xs relative bg-[#EEE9E0] dark:bg-[#25211F]">
              <SafeImage
                src={dept.hero_image}
                alt={dept.name_ar}
                className="w-full h-full object-cover"
                fallbackCategory={dept.name_ar}
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#171616] dark:text-[#F5F1EA] group-hover:text-[#B9142D] transition-colors whitespace-nowrap max-w-[70px] truncate text-center">
              {dept.name_ar.split(' ')[0]} {dept.name_ar.split(' ')[1] || ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
