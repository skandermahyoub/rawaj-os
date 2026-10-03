import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Image, Upload, Trash2, Copy, Check, Search, Tag, ExternalLink, Plus, FolderPlus, Sparkles, SlidersHorizontal } from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { VERIFIED_RAWAJ_ASSETS } from '../../data/rawajMediaAssets';
import { AdminPromptsStudio } from './AdminPromptsStudio';

export const AdminMediaLibrary: React.FC = () => {
  const { mediaItems, uploadMedia, deleteMedia } = useApp();

  const [activeMainTab, setActiveMainTab] = useState<'library' | 'prompts'>('library');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [showVerifiedPicker, setShowVerifiedPicker] = useState(false);

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
        uploadMedia({
          name: file.name.replace(/\.[^/.]+$/, ''),
          url: optimized.dataUrl,
          size_kb: optimized.sizeKb,
          category: newCategory,
          alt_ar: file.name,
        });
      } catch (err) {
        console.error('Failed to optimize uploaded media:', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleAddDirectUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newName.trim()) return;
    uploadMedia({
      name: newName,
      url: newUrl,
      size_kb: 250,
      category: newCategory,
      alt_ar: newName,
    });
    setNewUrl('');
    setNewName('');
  };

  const handleImportVerifiedAsset = (asset: typeof VERIFIED_RAWAJ_ASSETS[0]) => {
    uploadMedia({
      name: asset.title,
      url: asset.url,
      size_kb: 350,
      category: asset.category,
      alt_ar: asset.title,
    });
  };

  return (
    <div className="space-y-6 text-right pb-16 font-sans">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-[#B9142D]" />
            <span>مكتبة الوسائط واستوديو برومبتات رواج (Media & AI Studio)</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            إجمالي الصور المعتمدة: <strong>{mediaItems.length}</strong> وسائط فنية محفوظة
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] dark:bg-[#252220] p-1 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveMainTab('library')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMainTab === 'library'
                ? 'bg-[#B9142D] text-white shadow-xs'
                : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#171616]'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>معرض الصور والرفع</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('prompts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMainTab === 'prompts'
                ? 'bg-[#B9142D] text-white shadow-xs'
                : 'text-[#57534E] dark:text-[#D6D3D1] hover:text-[#171616]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>استوديو موجهات AI (Prompts)</span>
          </button>

          {activeMainTab === 'library' && (
            <button
              type="button"
              onClick={() => setShowVerifiedPicker(!showVerifiedPicker)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center gap-1 border-r border-[#E7E0D3] dark:border-[#332F2F] pr-2"
              title="استعراض نماذج رواج المعتمدة"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showVerifiedPicker ? 'إخفاء النماذج' : 'النماذج المعتمدة'}</span>
            </button>
          )}
        </div>
      </div>

      {/* RENDER PROMPTS STUDIO TAB */}
      {activeMainTab === 'prompts' && <AdminPromptsStudio />}

      {/* RENDER MEDIA LIBRARY TAB */}
      {activeMainTab === 'library' && (
        <div className="space-y-6">
          {/* Verified Rawaj Assets Drawer */}
          {showVerifiedPicker && (
            <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 sm:p-5 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-[#171616] dark:text-white">
                  نماذج مطابع رواج المعتمدة فائقة الدقة (انقر لإضافة أي نموذج إلى وسائطك):
                </div>
                <span className="text-[11px] text-[#D4AF37] font-bold">
                  {VERIFIED_RAWAJ_ASSETS.length} نموذج جاهز
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-64 overflow-y-auto pr-1">
                {VERIFIED_RAWAJ_ASSETS.map((asset) => {
                  const alreadyAdded = mediaItems.some(m => m.url === asset.url);
                  return (
                    <div key={asset.id} className="relative group rounded-xl overflow-hidden border border-[#E7E0D3] dark:border-[#332F2F] aspect-4/3 bg-neutral-100">
                      <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-2 transition-opacity">
                        <p className="text-[10px] text-white font-bold truncate">{asset.title}</p>
                        <button
                          type="button"
                          disabled={alreadyAdded}
                          onClick={() => handleImportVerifiedAsset(asset)}
                          className={`w-full py-1 text-[10px] font-bold rounded-lg ${
                            alreadyAdded ? 'bg-emerald-600 text-white' : 'bg-[#B9142D] text-white'
                          }`}
                        >
                          {alreadyAdded ? 'موجود بالمكتبة' : '+ إضافة للمكتبة'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
                    placeholder="https://... أو /src/assets/..."
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
                      onClick={() => deleteMedia(item.id)}
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
      )}

    </div>
  );
};
