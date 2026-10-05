import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Image, Upload, Trash2, Copy, Check } from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { uploadDataUrlToRawajStorage } from '../../lib/storage';

export const AdminMediaLibrary: React.FC = () => {
  const { mediaItems, uploadMedia, deleteMedia } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [actionError, setActionError] = useState('');

  // Manual URL Add state
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('الطباعة الورقية');

  const categories = ['all', 'الطباعة الورقية', 'المطبوعات المكتبية', 'الملصقات والليبل', 'اللوحات والإشارات', 'الواجهات والديكور', 'الهدايا والتغليف'];

  const filteredMedia = mediaItems.filter((m) => {
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
    if (searchQuery.trim() && !m.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const optimized = await optimizeImageFile(file, 1200, 1200, 0.85);
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        const stored = await uploadDataUrlToRawajStorage(optimized.dataUrl, {
          folder: newCategory || 'uploads',
          fileName: cleanName || 'image',
        });
        await uploadMedia({
          name: cleanName,
          url: stored.publicUrl,
          storage_path: stored.path,
          mime_type: stored.mimeType,
          size_kb: stored.sizeKb,
          category: newCategory,
          alt_ar: file.name,
        });
      } catch (err: any) {
        setActionError(err?.message || 'تعذر رفع الصورة إلى Supabase Storage.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleAddDirectUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newName.trim()) return;
    setActionError('');
    try {
      await uploadMedia({
        name: newName,
        url: newUrl,
        size_kb: 0,
        category: newCategory,
        alt_ar: newName,
      });
      setNewUrl('');
      setNewName('');
    } catch (error: any) {
      setActionError(error?.message || 'تعذر إضافة الرابط إلى المكتبة.');
    }
  };

  return (
    <div className="space-y-6 text-right pb-16 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-[#B9142D]" />
            <span>مكتبة الوسائط والصور</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            إجمالي الصور المعتمدة: <strong>{mediaItems.length}</strong> وسائط فنية محفوظة
          </p>
        </div>


      </div>
      {actionError && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-bold">
          {actionError}
        </div>
      )}

      <div className="space-y-6">
          {/* Upload Box */}
          <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 sm:p-5 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] space-y-4">
            <h3 className="font-bold text-xs text-[#171616] dark:text-white">
              رفع وسائط جديدة أو إضافة رابط مباشر:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* File Upload Zone */}
              <label className="border-2 border-dashed border-[#D4CDC0] dark:border-[#3F3B3B] hover:border-[#B9142D] rounded-xl p-5 text-center cursor-pointer flex flex-col items-center justify-center gap-2 bg-[#FAF7F2] dark:bg-[#221F1F] transition-colors">
                <Upload className="w-6 h-6 text-[#B9142D]" />
                <div>
                  <div className="text-xs font-bold text-[#171616] dark:text-white">انقر لرفع صورة من جهازك</div>
                  <div className="text-[10px] text-[#78716C]">PNG, JPG, WebP, SVG حتى 10 ميجابايت</div>
                </div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>

              {/* Direct URL Form */}
              <form onSubmit={handleAddDirectUrl} className="space-y-2.5 text-xs bg-[#FAF7F2] dark:bg-[#221F1F] p-3.5 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F]">
                <div className="space-y-1">
                  <label className="font-bold">اسم الصورة:</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="مثال: واجهة كلادينج ذهبي"
                    className="w-full bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold">رابط الصورة (URL):</label>
                  <input
                    type="text"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2 py-1 text-xs"
                  >
                    {categories.filter((c) => c !== 'all').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-[#B9142D] text-white font-bold text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    إضافة للمكتبة
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B9142D] text-white font-bold'
                    : 'bg-[#FFFDFA] dark:bg-[#1C1A1A] text-[#57534E] dark:text-[#D6D3D1] border border-[#E7E0D3] dark:border-[#332F2F]'
                }`}
              >
                {cat === 'all' ? 'جميع الوسائط' : cat}
              </button>
            ))}
          </div>

          {/* Grid of Media */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs flex flex-col justify-between group"
              >
                <div className="aspect-1/1 relative bg-[#F5F1E9] dark:bg-[#252222]">
                  <img src={item.url} alt={item.alt_ar || item.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-2.5 space-y-1.5 text-xs">
                  <div className="font-bold text-[#171616] dark:text-white truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#78716C]">
                    <span>{item.category}</span>
                    <span>{item.size_kb} KB</span>
                  </div>

                  <div className="pt-1.5 border-t border-[#F5F1E9] dark:border-[#252222] flex items-center justify-between">
                    <button
                      onClick={() => handleCopy(item.url, item.id)}
                      className="text-[10px] text-[#B9142D] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === item.id ? 'تم النسخ' : 'نسخ الرابط'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!window.confirm('هل تريد حذف هذا الملف من المكتبة؟')) return;
                        void deleteMedia(item.id).catch((error) => setActionError(error?.message || 'تعذر حذف الملف.'));
                      }}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>

    </div>
  );
};
