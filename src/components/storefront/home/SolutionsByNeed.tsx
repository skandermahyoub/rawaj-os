import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SectionHeader } from './SectionHeader';
import { SafeImage } from '../../common/SafeImage';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  servicesIncluded: string[];
  packageId?: string;
  filterDepartmentId?: string;
}

export const SolutionsByNeed: React.FC = () => {
  const { navigate } = useApp();

  const solutions: SolutionItem[] = [
    {
      id: 'store-opening',
      title: 'افتتاح متجر ونشاط تجاري',
      subtitle: 'حزمة متكاملة من واجهة الكلادينج والحروف المضيئة إلى الأكياس والمطبوعات.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      tag: 'تجهيز واجهات ومتاجر',
      servicesIncluded: ['واجهة كلادينج', 'حروف زنكور مضيئة', 'أكياس ورقية', 'كروت وفواتير'],
      packageId: 'pkg-retail-opening'
    },
    {
      id: 'brand-launch',
      title: 'إطلاق وتأسيس علامة تجارية',
      subtitle: 'هوية مكتبية فاخرة، ورق مراسلات رسمي، بطاقات فاخرة ببصمة ذهبية، وهدايا ترحيبية.',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
      tag: 'هوية ومطبوعات رسمية',
      servicesIncluded: ['بطاقات أعمال VIP', 'أظرف وفولدرات', 'نوت بوك جلدي', 'دروع وشارات'],
      packageId: 'pkg-corporate-identity'
    },
    {
      id: 'restaurant-setup',
      title: 'تجهيز مطاعم وكافيهات',
      subtitle: 'تغليف الوجبات السريعة، علب برجر وبطاطس، منيو مقاوم للماء، وأزياء عمل موحدة.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      tag: 'تغليف ومطاعم',
      servicesIncluded: ['علب طعام مخصصة', 'منيو مطعم فاخر', 'أكياس كرافت', 'يونيفورم ومريلة'],
      packageId: 'pkg-restaurant-packaging'
    },
    {
      id: 'fleet-branding',
      title: 'تجليد وهوية أسطول السيارات',
      subtitle: 'طباعة استيكر فينيل ألماني عالي المقاومة لأشعة الشمس والغسيل للسيارات والشاحنات.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      tag: 'إعلانات خارجية متحركة',
      servicesIncluded: ['تغليف سيارات كامل', 'استيكر بيك أب وشاحنات', 'حماية UV مقاومة'],
      filterDepartmentId: 'dept-large-format'
    },
    {
      id: 'events-exhibitions',
      title: 'تجهيز معارض ومؤتمرات',
      subtitle: 'بوثات عرض مسبقة الصنع، رول اب وبوب اب ستاند، وبطاقات تعريف وهوية الزوار.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      tag: 'أجنحة وفعاليات',
      servicesIncluded: ['رول اب ستاند', 'بوب اب معرض', 'شارات وبطاقات تعليق', 'هدايا مؤتمرات'],
      filterDepartmentId: 'dept-exhibitions'
    },
    {
      id: 'product-packaging',
      title: 'تغليف منتجات ومصانع',
      subtitle: 'علب كرتون دوبلكس، علب كرتون مضلع E-Flute، وملصقات رول أوتوماتيكية للخطوط.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      tag: 'كرتون وليبل صناعي',
      servicesIncluded: ['علب كرتون فاخرة', 'رول ستيكر مقاوم', 'تكسير وقص مخصص'],
      filterDepartmentId: 'dept-packaging'
    }
  ];

  const handleSolutionClick = (sol: SolutionItem) => {
    if (sol.packageId) {
      navigate({ view: 'package-detail', packageId: sol.packageId });
    } else if (sol.filterDepartmentId) {
      navigate({ view: 'services', departmentId: sol.filterDepartmentId });
    } else {
      navigate({ view: 'services' });
    }
  };

  return (
    <section className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[26px] sm:rounded-[30px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-xs">
      <SectionHeader
        title="ماذا تريد أن تنجز لعلامتك؟"
        subtitle="حلول مجمعة ومدروسة حسب نوع المشروع والنشاط التجاري."
      />

      {/* Mobile Horizontal Carousel / Desktop Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 no-scrollbar -mx-1 px-1">
        {solutions.map((sol) => (
          <div
            key={sol.id}
            onClick={() => handleSolutionClick(sol)}
            className="min-w-[260px] w-[270px] shrink-0 snap-start md:min-w-0 md:w-auto group relative bg-[#F5F1E9] dark:bg-[#25211F] rounded-[22px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-[#B9142D]/50 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between text-right"
          >
            {/* Visual Header Image */}
            <div className="relative aspect-16/10 overflow-hidden bg-[#E5DFD3] dark:bg-[#1E1B1A]">
              <SafeImage
                src={sol.image}
                alt={sol.title}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                fallbackCategory={sol.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <span className="absolute top-3 right-3 bg-[#B9142D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-[6px] shadow-xs">
                {sol.tag}
              </span>

              <div className="absolute bottom-2.5 right-3 left-3 text-white">
                <h3 className="font-heading font-extrabold text-[15px] sm:text-[16px] text-white leading-tight">
                  {sol.title}
                </h3>
              </div>
            </div>

            {/* Body Description & Included Services */}
            <div className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-[11px] sm:text-[12px] text-[#746E67] dark:text-[#A0988F] leading-relaxed line-clamp-2">
                {sol.subtitle}
              </p>

              {/* Service Included Tags */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-bold text-[#171616] dark:text-[#F5F1EA]">ما يشمله هذا الحل:</div>
                <div className="flex flex-wrap gap-1.5">
                  {sol.servicesIncluded.map((item, idx) => (
                    <span key={idx} className="bg-[#FFFDF9] dark:bg-[#1C1918] text-[#171616] dark:text-[#F5F1EA] text-[10px] font-medium px-2 py-0.5 rounded-[6px] flex items-center gap-1 border border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)]">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#16834A]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between text-xs font-bold text-[#B9142D]">
                <span>استعراض حل المشروع</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
