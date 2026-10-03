import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ArrowLeft, Layers, Tag, ExternalLink } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCH_TERMS = [
  'استيكر رول',
  'فواتير كربونية NCR',
  'بطاقات أعمال فاخرة',
  'تجليد سيارات',
  'حروف بارزة مضيئة',
  'علب كرتون منتجات',
  'واجهات كلادينج',
  'تيشيرتات DTF',
  'أكواب ومجات هدايا',
  'أكياس ورقية',
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { searchServices, navigate, departments } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = searchServices(query);

  const handleSelectService = (serviceId: string) => {
    navigate({ view: 'service-detail', serviceId });
    onClose();
  };

  const handleSelectDept = (deptId: string) => {
    navigate({ view: 'services', departmentId: deptId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#E7E0D3] dark:border-[#332F2F] flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن خدمة، خامة، تقنية (استيكر، فواتير، كلادينج، حروف، كروت...)"
            className="w-full bg-transparent text-sm sm:text-base font-medium text-[#171616] dark:text-[#F5F3EF] placeholder-[#78716C] dark:placeholder-[#78716C] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#78716C] hover:text-[#171616] dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-[#F5F1E9] dark:bg-[#252222] hover:bg-[#EAE4D6] text-[#57534E] dark:text-[#D6D3D1] px-2.5 py-1.5 rounded-lg border border-[#E7E0D3] dark:border-[#3A3535] shrink-0 cursor-pointer"
          >
            إغلاق
          </button>
        </div>

        {/* Popular Tags / Synonyms */}
        {!query && (
          <div className="p-4 border-b border-[#E7E0D3] dark:border-[#332F2F] bg-[#FAF7F2] dark:bg-[#221F1F]">
            <div className="flex items-center gap-1.5 text-xs text-[#78716C] dark:text-[#A8A29E] mb-2 font-medium">
              <Tag className="w-3.5 h-3.5 text-brand-primary" />
              <span>الكلمات الأكثر بحثاً ومرادفات الكتالوج:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SEARCH_TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs bg-white dark:bg-[#2C2929] hover:bg-brand-primary-10 hover:text-brand-primary text-[#44403C] dark:text-[#D6D3D1] px-2.5 py-1 rounded-md border border-[#E7E0D3] dark:border-[#3A3535] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto p-3 sm:p-4 divide-y divide-[#E7E0D3] dark:divide-[#332F2F] flex-1">
          {query && results.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="text-sm font-bold text-[#171616] dark:text-[#F5F3EF]">
                لم يتم العثور على خدمة مطابقة لـ «{query}»
              </div>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-md mx-auto">
                رواج توفر جميع خدمات الطباعة والتوريد حتى لو لم تكن معروضة بالاسم الحرفي. يمكنك استخدام ميزة «طلب عرض سعر مخصص».
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate({ view: 'custom-quote' });
                }}
                className="mt-3 text-xs bg-brand-primary text-white font-bold px-4 py-2 rounded-lg hover:bg-brand-hover transition-colors cursor-pointer"
              >
                + إنشاء طلب مخصص لـ «{query}»
              </button>
            </div>
          ) : (
            <>
              {results.length > 0 && (
                <div className="space-y-1.5 pb-2">
                  <div className="text-[11px] font-bold text-[#78716C] dark:text-[#A8A29E] px-2">
                    الخدمات المتاحة ({results.length}):
                  </div>
                  {results.map((service) => {
                    const dept = departments.find((d) => d.id === service.department_id);
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleSelectService(service.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F1E9] dark:hover:bg-[#252222] transition-colors text-right group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={service.hero_image}
                            alt={service.name_ar}
                            className="w-11 h-11 rounded-lg object-cover border border-[#E7E0D3] dark:border-[#3A3535] shrink-0"
                          />
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-[#171616] dark:text-[#F5F3EF] group-hover:text-brand-primary transition-colors">
                              {service.name_ar}
                            </div>
                            <div className="text-[10px] text-[#78716C] dark:text-[#A8A29E] flex items-center gap-1.5 mt-0.5">
                              <span>{dept ? dept.name_ar : ''}</span>
                              {service.badge && (
                                <>
                                  <span>•</span>
                                  <span className="text-brand-primary font-medium">{service.badge}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
                          <span className="hidden sm:inline">طلب مواصفات</span>
                          <ArrowLeft className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Department shortcuts */}
              <div className="pt-3">
                <div className="text-[11px] font-bold text-[#78716C] dark:text-[#A8A29E] px-2 mb-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>تصفح حسب الأقسام:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {departments.slice(0, 6).map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => handleSelectDept(dept.id)}
                      className="p-2 rounded-lg bg-[#FAF7F2] dark:bg-[#221F1F] hover:bg-brand-primary-10 text-right text-xs text-[#171616] dark:text-[#F5F3EF] hover:text-brand-primary transition-colors truncate border border-[#E7E0D3] dark:border-[#332F2F] cursor-pointer"
                    >
                      {dept.name_ar}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
