import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowLeft, Sparkles, X, ChevronLeft } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SafeImage } from '../../common/SafeImage';

interface UniversalSearchProps {
  onOpenFullSearchModal: () => void;
}

export const UniversalSearch: React.FC<UniversalSearchProps> = ({ onOpenFullSearchModal }) => {
  const { services, departments, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Synonyms mapping for quick intelligent search
  const synonymsMap: Record<string, string[]> = {
    'كربون': ['فواتير', 'سندات', 'ncr', 'دفاتر'],
    'استيكر شبك': ['one-way', 'رؤية واحدة', 'زجاج'],
    'أليكوبوند': ['كلادينج', 'واجهات', 'acp', 'تكسية'],
    'حروف مضيئة': ['زنكور', 'أكريليك', 'ليد', 'channel letters', 'بارزة'],
    'رول': ['ليبل', 'ملصقات', 'roll', 'ستيكر'],
    'كرتون': ['علب', 'تغليف', 'شحن', 'مضلع', 'carton'],
    'يونيفورم': ['تيشيرت', 'ملابس', 'تطريز', 'dtf'],
    'هدايا': ['دروع', 'أكواب', 'فلاشات', 'نوت بوك'],
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.toLowerCase().trim();

  // Filter services based on query + synonyms
  const filteredServices = query.trim().length > 0
    ? services.filter((s) => {
        const titleMatch = s.name_ar.toLowerCase().includes(normalizedQuery) || s.name_en.toLowerCase().includes(normalizedQuery);
        const descMatch = s.short_description_ar.toLowerCase().includes(normalizedQuery);
        
        // Check synonyms
        const hasSynonymMatch = Object.entries(synonymsMap).some(([term, synonyms]) => {
          if (term.includes(normalizedQuery) || normalizedQuery.includes(term)) {
            return synonyms.some((syn) => 
              s.name_ar.toLowerCase().includes(syn) || 
              s.short_description_ar.toLowerCase().includes(syn)
            );
          }
          return false;
        });

        return (titleMatch || descMatch || hasSynonymMatch) && s.service_status === 'published';
      }).slice(0, 5)
    : [];

  const handleSelectService = (serviceId: string) => {
    setIsOpen(false);
    navigate({ view: 'service-detail', serviceId });
  };

  return (
    <div ref={wrapperRef} className="relative z-30">
      
      {/* Search Input Box */}
      <div className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[16px] sm:rounded-[20px] border border-[rgba(23,22,22,0.1)] dark:border-[rgba(245,241,234,0.12)] p-2 sm:p-2.5 flex items-center gap-2.5 shadow-xs focus-within:border-[#B9142D] focus-within:ring-2 focus-within:ring-[#B9142D]/10 transition-all">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 flex items-center justify-center text-[#B9142D] shrink-0">
          <Search className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="ما الذي تريد طباعته أو تنفيذه؟"
            className="w-full bg-transparent border-none outline-hidden text-xs sm:text-sm font-semibold text-[#171616] dark:text-[#F5F1EA] placeholder:text-[#746E67] dark:placeholder:text-[#A0988F]"
          />
          <div className="text-[10px] text-[#746E67] dark:text-[#A0988F] truncate hidden sm:block">
            كروت، ليبل، بنر، لوحة، واجهة، تغليف سيارة، علب كرتون، تيشيرت...
          </div>
        </div>

        {query ? (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="touch-target p-1.5 text-[#746E67] hover:text-[#171616] dark:hover:text-white"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onOpenFullSearchModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#B9142D] bg-[#B9142D]/10 hover:bg-[#B9142D]/15 px-3 py-1.5 rounded-[10px] transition-colors"
          >
            <span>بحث متقدم</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Live Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[18px] border border-[rgba(23,22,22,0.1)] dark:border-[rgba(245,241,234,0.12)] p-3 shadow-xl space-y-2 animate-in fade-in duration-150">
          <div className="text-[11px] font-bold text-[#746E67] dark:text-[#A0988F] px-2 pb-1 border-b border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between">
            <span>النتائج المباشرة ({filteredServices.length})</span>
            <span className="text-[10px] text-[#B9142D]">اضغط للمواصفات والتسعير</span>
          </div>

          {filteredServices.length > 0 ? (
            <div className="space-y-1">
              {filteredServices.map((service) => {
                const dept = departments.find((d) => d.id === service.department_id);
                return (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(service.id)}
                    className="w-full flex items-center justify-between p-2 rounded-[12px] hover:bg-[#F5F1E9] dark:hover:bg-[#25211F] text-right transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <SafeImage
                        src={service.hero_image}
                        alt={service.name_ar}
                        className="w-10 h-10 rounded-[8px] object-cover shrink-0"
                        fallbackCategory={service.name_ar}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#171616] dark:text-[#F5F1EA] group-hover:text-[#B9142D] transition-colors truncate">
                          {service.name_ar}
                        </div>
                        <div className="text-[10px] text-[#746E67] dark:text-[#A0988F] truncate">
                          {dept?.name_ar || 'خدمة متخصصة'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#B9142D] shrink-0 pr-2">
                      <span>تخصيص</span>
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center space-y-2">
              <p className="text-xs text-[#746E67] dark:text-[#A0988F]">
                لم يتم العثور على خدمة مطابقة مباشرة لـ «{query}»
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate({ view: 'services', searchQuery: query });
                }}
                className="text-xs font-bold text-[#B9142D] hover:underline"
              >
                البحث في كامل الكتالوج أو إرسال طلب مخصص
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
