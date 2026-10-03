import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../../types';
import { ImageUploadPicker } from '../common/ImageUploadPicker';

export const AdminBlogManager: React.FC = () => {
  const { blogPosts, createBlogPost, updateBlogPost, deleteBlogPost } = useApp();
  const [editingPost, setEditingPost] = useState<any>(null);

  const handleAddNew = () => {
    setEditingPost({
      title_ar: 'دليل فني جديد',
      slug: `guide-${Date.now()}`,
      category_ar: 'دليل الخامات والطباعة',
      read_time_minutes: 5,
      publish_date: new Date().toISOString().slice(0, 10),
      hero_image: '/src/assets/images/printing_brochures_1790806872644.jpg',
      excerpt_ar: 'ملخص المقال الفني لمساعدة العميل...',
      content_markdown_ar: '### محتوى الدليل الفني بالتفصيل...',
      published: true,
      tags_ar: ['خامات', 'نصائح', 'رواج'],
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost.id) {
      updateBlogPost(editingPost.id, editingPost);
    } else {
      createBlogPost(editingPost);
    }
    setEditingPost(null);
  };

  return (
    <div className="space-y-6 text-right pb-16">
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B9142D]" />
            <span>إدارة مقالات وأدلة المعرفة ({blogPosts.length})</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            إثراء المحتوى الفني وشرح الفروق بين الخامات وتقنيات الطباعة
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ إضافة مقال جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden p-4 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2 py-0.5 rounded">
                {post.category_ar}
              </span>
              <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">{post.title_ar}</h3>
              <p className="text-xs text-[#78716C] line-clamp-2">{post.excerpt_ar}</p>
            </div>

            <div className="pt-2 border-t border-[#F5F1E9] dark:border-[#252222] flex items-center justify-between">
              <button
                onClick={() => deleteBlogPost(post.id)}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
              <button
                onClick={() => setEditingPost(post)}
                className="text-xs font-bold text-[#B9142D] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل المقال</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
          <form
            onSubmit={handleSave}
            className="w-full max-w-xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-5 space-y-3 max-h-[85vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D3]">
              <h3 className="font-heading font-bold text-sm">تعديل المقال الفني</h3>
              <button type="button" onClick={() => setEditingPost(null)}>إلغاء</button>
            </div>

            <div className="space-y-1">
              <label className="font-bold">عنوان المقال:</label>
              <input
                type="text"
                required
                value={editingPost.title_ar}
                onChange={(e) => setEditingPost({ ...editingPost, title_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold">التصنيف:</label>
                <input
                  type="text"
                  value={editingPost.category_ar}
                  onChange={(e) => setEditingPost({ ...editingPost, category_ar: e.target.value })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold">وقت القراءة (بالدقائق):</label>
                <input
                  type="number"
                  value={editingPost.read_time_minutes}
                  onChange={(e) => setEditingPost({ ...editingPost, read_time_minutes: parseInt(e.target.value) || 5 })}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold">المقدمة والموجز:</label>
              <textarea
                rows={2}
                value={editingPost.excerpt_ar}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">محتوى المقال كاملاً:</label>
              <textarea
                rows={6}
                value={editingPost.content_markdown_ar}
                onChange={(e) => setEditingPost({ ...editingPost, content_markdown_ar: e.target.value })}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
              />
            </div>

            {/* Article Hero Image */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1817] border border-[#E7E0D3] dark:border-[#332F2F]">
              <ImageUploadPicker
                label="صورة غلاف المقال والدليل الفني *"
                helperText="حدد صورة المقال: رفع من جهازك أو الجوال، إدراج رابط، أو اختيار من مكتبة رواج"
                value={editingPost.hero_image || ''}
                onChange={(url) => setEditingPost({ ...editingPost, hero_image: url })}
                aspectRatio="16:9"
                previewHeightClass="h-36"
                defaultCategory="المطبوعات الورقية"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E7E0D3]">
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF7F2]"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#B9142D] text-white font-bold px-4 py-1.5 rounded-lg"
              >
                حفظ المقال
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
