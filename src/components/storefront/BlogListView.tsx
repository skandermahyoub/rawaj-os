import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { BookOpen, Clock, Calendar, ArrowLeft, Tag, ArrowRight } from 'lucide-react';

const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-black text-[#171616] dark:text-[#F5F3EF]">{part.slice(2, -2)}</strong>
      : part
  );

const renderArticle = (markdown: string) => {
  const lines = markdown.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="list-disc pr-6 space-y-2 my-4">
        {bullets.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
      </ul>
    );
    bullets = [];
  };

  lines.forEach((line, i) => {
    const value = line.trim();
    if (!value) {
      flushBullets();
      return;
    }
    if (value.startsWith('- ')) {
      bullets.push(value.slice(2));
      return;
    }
    flushBullets();
    if (value.startsWith('### ')) {
      nodes.push(<h3 key={i} className="text-base sm:text-lg font-black text-[#B9142D] mt-6 mb-2">{renderInline(value.slice(4))}</h3>);
    } else if (value.startsWith('## ')) {
      nodes.push(<h2 key={i} className="text-lg sm:text-xl font-black text-[#171616] dark:text-[#F5F3EF] mt-8 mb-3">{renderInline(value.slice(3))}</h2>);
    } else if (value.startsWith('# ')) {
      nodes.push(<h1 key={i} className="text-xl sm:text-2xl font-black text-[#171616] dark:text-[#F5F3EF] mt-2 mb-4">{renderInline(value.slice(2))}</h1>);
    } else {
      nodes.push(<p key={i} className="leading-8">{renderInline(value)}</p>);
    }
  });
  flushBullets();
  return nodes;
};

export const BlogListView: React.FC = () => {
  const { blogPosts, navigate } = useApp();

  return (
    <div className="space-y-6 pb-16 text-right">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-[#FDE8EA] dark:bg-[#3D1217] text-[#B9142D] px-2.5 py-0.5 rounded text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>مجلة رواج الرقمية</span>
        </div>
        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#171616] dark:text-[#F5F3EF]">
          مجلة رواج — الطباعة والإعلان والديكور اليوم
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A8A29E]">
          مجموعة مقالات تحريرية وفنية تتناول كيف تتغير الطباعة والإعلان والديكور والهوية المادية للعلامات، مع معرفة عملية تساعدك على اتخاذ قرارات أفضل لمشاريعك.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.filter((p) => p.published).map((post) => (
          <div
            key={post.id}
            onClick={() => navigate({ view: 'blog-post', postId: post.id })}
            className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D] overflow-hidden shadow-xs cursor-pointer flex flex-col justify-between group transition-all duration-200"
          >
            <div>
              <div className="aspect-16/10 relative overflow-hidden bg-[#F5F1E9] dark:bg-[#252222]">
                <SafeImage
                  src={post.hero_image}
                  alt={post.title_ar}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackCategory="المدونة"
                />
                <span className="absolute top-3 right-3 bg-[#B9142D] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {post.category_ar}
                </span>
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-3 text-[10px] text-[#78716C] dark:text-[#A8A29E]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.read_time_minutes} دقائق قراءة</span>
                  </span>
                  <span>•</span>
                  <span>{post.publish_date}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white group-hover:text-[#B9142D] transition-colors leading-snug">
                  {post.title_ar}
                </h3>

                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] line-clamp-3 leading-relaxed">
                  {post.excerpt_ar}
                </p>

                {post.tags_ar && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags_ar.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#D6D3D1] px-2 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-[#B9142D]">
              <span>قراءة المقال كاملاً</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export const BlogPostView: React.FC<{ postId: string }> = ({ postId }) => {
  const { blogPosts, navigate } = useApp();
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2>المقال غير موجود</h2>
        <button onClick={() => navigate({ view: 'blog' })} className="text-[#B9142D] font-bold">
          العودة للمقالات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 text-right">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#78716C]">
        <button onClick={() => navigate({ view: 'home' })}>الرئيسية</button>
        <span>/</span>
        <button onClick={() => navigate({ view: 'blog' })}>مجلة رواج</button>
        <span>/</span>
        <span className="text-[#171616] dark:text-white font-bold truncate max-w-[200px]">{post.title_ar}</span>
      </nav>

      <article className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden p-4 sm:p-8 space-y-6">
        
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2.5 py-1 rounded">
            {post.category_ar}
          </span>
          <h1 className="font-heading font-extrabold text-lg sm:text-2xl text-[#171616] dark:text-white leading-snug">
            {post.title_ar}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#78716C]">
            <span>وقت القراءة: {post.read_time_minutes} دقائق</span>
            <span>•</span>
            <span>تاريخ النشر: {post.publish_date}</span>
          </div>
        </div>

        <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#F5F1E9] dark:bg-[#252222]">
          <SafeImage src={post.hero_image} alt={post.title_ar} className="w-full h-full object-cover" fallbackCategory="المدونة" />
        </div>

        <div className="max-w-none text-xs sm:text-sm text-[#44403C] dark:text-[#D6D3D1]">
          {renderArticle(post.content_markdown_ar)}
        </div>

        {post.tags_ar && (
          <div className="pt-6 border-t border-[#E7E0D3] dark:border-[#332F2F] flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-[#78716C] ml-1">الوسوم:</span>
            {post.tags_ar.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#FAF7F2] dark:bg-[#252222] text-[#44403C] dark:text-[#D6D3D1] px-2.5 py-1 rounded-md border border-[#E7E0D3] dark:border-[#332F2F]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      </article>

    </div>
  );
};
