import React from 'react';
import { Service } from '../../types';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { ArrowLeft, Layers } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { navigate, departments } = useApp();
  const dept = departments.find((d) => d.id === service.department_id);

  const handleClick = () => {
    navigate({ view: 'service-detail', serviceId: service.id });
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[18px] sm:rounded-[20px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-brand-primary-30 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col overflow-hidden text-right"
    >
      {/* Visual Image Section */}
      <div className="relative aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#EEE9E0] dark:bg-[#25211F]">
        <SafeImage
          src={service.hero_image}
          alt={service.name_ar}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          fallbackCategory={service.name_ar}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Optional Badge */}
        {service.badge && (
          <span className="absolute top-2 right-2 bg-brand-primary text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-[6px] shadow-2xs">
            {service.badge}
          </span>
        )}

        {/* Department Tag Overlay */}
        {dept && (
          <div className="absolute bottom-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded-[6px] flex items-center gap-1">
            <Layers className="w-2.5 h-2.5 text-brand-primary" />
            <span className="truncate max-w-[110px]">{dept.name_ar}</span>
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-[13px] sm:text-[14px] text-[#171616] dark:text-[#F5F1EA] group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            {service.name_ar}
          </h3>
          <p className="text-[11px] text-[#746E67] dark:text-[#A0988F] line-clamp-2 leading-relaxed">
            {service.short_description_ar}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-2 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between text-xs">
          <span className="text-[10px] font-bold text-brand-primary bg-brand-primary-10 px-2 py-0.5 rounded-[6px]">
            عرض سعر
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#171616] dark:text-[#F5F1EA] group-hover:text-brand-primary transition-colors">
            <span>تخصيص</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

    </div>
  );
};
