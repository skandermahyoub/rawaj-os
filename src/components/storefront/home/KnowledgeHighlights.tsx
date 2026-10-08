import React from 'react';
import { useApp } from '../../../context/AppContext';
import { SectionHeader } from './SectionHeader';
import { SafeImage } from '../../common/SafeImage';
import { ArrowLeft, Clock } from 'lucide-react';

export const KnowledgeHighlights: React.FC = () => {
  const { blogPosts, navigate } = useApp();

  const displayPosts = blogPosts.slice(0, 3);
  if (displayPosts.length === 0) return null;

  const featuredPost = displayPosts[0];
  const secondaryPosts = displayPosts.slice(1, 3);

  return (
    <section className="bg-[#FFFDF9] dark:bg-[#1C1918] rounded-[26px] sm:rounded-[30px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-xs">
      <SectionHeader
        title="مجلة رواج الرقمية"
        subtitle="قراءات تحريرية راقية عن الطباعة والإعلان والديكور والهوية المادية للعلامات في عالم اليوم."
        actionLabel="تصفح المجلة كاملة"
        onAction={() => navigate({ view: 'blog' })}
      />

      {/* Mobile Horizontal Carousel / Desktop 12-Col Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 lg:pb-0 lg:grid lg:grid-cols-12 no-scrollbar -mx-1 px-1">
        
        {/* Large Featured Editorial Guide (7 cols on lg) */}
        {featuredPost && (
          <div
            onClick={() => navigate({ view: 'blog-post', postId: featuredPost.id })}
            className="min-w-[270px] w-[280px] shrink-0 snap-start lg:min-w-0 lg:w-auto lg:col-span-7 group relative bg-[#F5F1E9] dark:bg-[#25211F] rounded-[22px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-[#B9142D]/50 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#E5DFD3] dark:bg-[#1E1B1A]">
              <SafeImage
                src={featuredPost.hero_image}
                alt={featuredPost.title_ar}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                fallbackCategory={featuredPost.title_ar}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              <span className="absolute top-3 right-3 bg-[#B9142D] text-white text-[10px] font-bold px-2.5 py-1 rounded-[6px] shadow-xs">
                {featuredPost.category_ar}
              </span>

              <div className="absolute bottom-3 right-3 left-3 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/80">
                  <Clock className="w-3 h-3" />
                  <span>قراءة في {featuredPost.read_time_minutes} دقائق</span>
                </div>
                <h3 className="font-heading font-extrabold text-[15px] sm:text-[17px] text-white leading-tight">
                  {featuredPost.title_ar}
                </h3>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-[12px] text-[#746E67] dark:text-[#A0988F] leading-relaxed line-clamp-2">
                {featuredPost.excerpt_ar}
              </p>

              <div className="pt-2.5 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] flex items-center justify-between text-xs font-bold text-[#B9142D]">
                <span>قراءة المقال كاملاً</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* 2 Secondary Guides */}
        <div className="lg:col-span-5 flex flex-row lg:flex-col gap-3.5 sm:gap-4 shrink-0">
          {secondaryPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate({ view: 'blog-post', postId: post.id })}
              className="min-w-[240px] w-[250px] shrink-0 snap-start lg:min-w-0 lg:w-auto group bg-[#F5F1E9] dark:bg-[#25211F] rounded-[20px] border border-[rgba(23,22,22,0.08)] dark:border-[rgba(245,241,234,0.08)] hover:border-[#B9142D]/50 p-3.5 sm:p-4 cursor-pointer transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between flex-1"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#B9142D] bg-[#B9142D]/10 dark:bg-[#B9142D]/20 px-2 py-0.5 rounded-[5px]">
                    {post.category_ar}
                  </span>
                  <span className="flex items-center gap-1 text-[#746E67] dark:text-[#A0988F]">
                    <Clock className="w-3 h-3" />
                    <span>{post.read_time_minutes} دقائق</span>
                  </span>
                </div>

                <h4 className="font-heading font-bold text-[13px] sm:text-[14px] text-[#171616] dark:text-[#F5F1EA] group-hover:text-[#B9142D] transition-colors leading-snug">
                  {post.title_ar}
                </h4>

                <p className="text-[11px] text-[#746E67] dark:text-[#A0988F] line-clamp-2 leading-relaxed">
                  {post.excerpt_ar}
                </p>
              </div>

              <div className="pt-2 border-t border-[rgba(23,22,22,0.06)] dark:border-[rgba(245,241,234,0.06)] mt-2 flex items-center justify-between text-xs font-bold text-[#B9142D]">
                <span>اقرأ المقال</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
