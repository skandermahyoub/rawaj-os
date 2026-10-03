import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronDown, HelpCircle, Sparkles, Search, MessageSquare, BookOpen } from 'lucide-react';

export const HomeFAQModule: React.FC = () => {
  const { faqItems, navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const activeFaqs = faqItems.filter((f) => f.is_active).sort((a, b) => a.sort_order - b.sort_order);

  const categories = useMemo(() => {
    const list = Array.from(new Set(activeFaqs.map((f) => f.category_ar || 'عام')));
    return ['all', ...list];
  }, [activeFaqs]);

  const filteredFaqs = useMemo(() => {
    return activeFaqs.filter((f) => {
      const matchCategory = activeCategory === 'all' || f.category_ar === activeCategory;
      const matchSearch = !searchQuery.trim() || 
        f.question_ar.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.answer_ar.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeFaqs, activeCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col items-start gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary-15 dark:bg-brand-primary/25 border border-brand-primary/40 text-brand-primary dark:text-[#F3A6B2] text-xs font-black shadow-xs">
          <HelpCircle className="w-4 h-4" />
          <span>الأسئلة الشائعة والأجوبة</span>
        </div>

        <h2 className="text-xl sm:text-3xl md:text-4xl font-heading font-black text-[#171616] dark:text-white leading-tight">
          إجابات وافية لكل ما يدور في ذهنك
        </h2>

        <p className="text-xs sm:text-sm text-[#746E67] dark:text-[#A0988F] max-w-2xl leading-relaxed">
          تعرف على تفاصيل منظومة رواج الذكية، معايير فحص وتدقيق Prepress للملفات، الأمان، والتسعير المؤسسي.
        </p>
      </div>

      {/* 2. Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث في الأسئلة الشائعة الفنية والتنظيمية..."
          className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-white dark:bg-[#1E1B1A] border border-[#EBE4D5] dark:border-[#332E2C] text-xs sm:text-sm text-[#171616] dark:text-white placeholder:text-[#8E867D] focus:outline-hidden focus:border-brand-primary shadow-sm transition-all"
        />
        <Search className="w-5 h-5 text-[#8E867D] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* 3. Category Filter Tabs */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-primary to-[#8B0E23] text-white shadow-md'
                  : 'bg-white dark:bg-[#201D1C] text-[#746E67] dark:text-[#A0988F] border border-[#EBE4D5] dark:border-[#332E2C] hover:bg-[#F5F0E5]'
              }`}
            >
              {cat === 'all' ? 'جميع الأسئلة' : cat}
            </button>
          ))}
        </div>
      )}

      {/* 4. Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-[#1E1B1A] rounded-2xl border border-[#EBE4D5] dark:border-[#332E2C] text-xs text-[#746E67] dark:text-[#A0988F]">
            لم يتم العثور على أي سؤال مطابق لبحثك. يمكنك التواصل معنا مباشرة عبر واتساب.
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const isOpen = openFaqIds[item.id];

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-[#201D1C] border-brand-primary/50 shadow-md ring-1 ring-brand-primary/30'
                    : 'bg-[#FCFAF6] dark:bg-[#1A1817] border-[#EBE3D3] dark:border-[#2D2928] hover:border-brand-primary/30'
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-right focus:outline-hidden cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-gradient-to-r from-brand-primary to-[#8B0E23] text-white shadow-sm' : 'bg-brand-primary-10 text-brand-primary'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <div>
                      {item.category_ar && (
                        <span className="text-[10px] font-bold text-brand-primary dark:text-[#F3A6B2] block mb-0.5">
                          {item.category_ar}
                        </span>
                      )}
                      <h4 className="font-heading font-black text-xs sm:text-sm md:text-base text-[#171616] dark:text-[#F5F1EA] leading-snug">
                        {item.question_ar}
                      </h4>
                    </div>
                  </div>

                  <div className={`p-2 rounded-xl transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 bg-brand-primary-10 text-brand-primary' : 'text-[#8E867D]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#57524C] dark:text-[#C5BCB1] leading-relaxed border-t border-[#F0EAE0] dark:border-[#2D2826] bg-[#FCFAF5]/50 dark:bg-[#161414]/50 animate-in fade-in duration-200">
                    <p>{item.answer_ar}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
