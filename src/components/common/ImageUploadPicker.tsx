import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  Check, 
  Search, 
  Camera, 
  Sparkles,
  ExternalLink,
  Layers,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';
import { VERIFIED_RAWAJ_ASSETS, VerifiedMediaAsset } from '../../data/rawajMediaAssets';
import { uploadDataUrlToRawajStorage } from '../../lib/storage';
import { SafeImage } from './SafeImage';

export interface ImageUploadPickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4';
  className?: string;
  allowClear?: boolean;
  defaultCategory?: string;
  previewHeightClass?: string;
}

export const ImageUploadPicker: React.FC<ImageUploadPickerProps> = ({
  value,
  onChange,
  label = 'صورة الخدمة / العنصر',
  helperText,
  aspectRatio = '4:3',
  className = '',
  allowClear = true,
  defaultCategory = 'الطباعة الورقية',
  previewHeightClass = 'h-48',
}) => {
  const { mediaItems, uploadMedia } = useApp();

  // Active tab: 'upload' | 'url' | 'library'
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'library'>('upload');
  
  // URL input state
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  
  // Upload status state
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Library search and filter state
  const [librarySource, setLibrarySource] = useState<'all' | 'uploaded' | 'verified'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories list
  const categories = [
    'all',
    'اللوحات والواجهات',
    'التغليف والعلب',
    'المطبوعات الورقية',
    'المعارض والستاندات',
    'الملصقات والليبل',
    'الهدايا والدروع',
    'اليونيفورم والملابس',
  ];

  // Handle File Selection (Upload from device / camera)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOptimizing(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      // 1. Optimize client-side to fast WebP/JPEG under 200KB
      const optimized = await optimizeImageFile(file, 1200, 1200, 0.85);

      // 2. Store the optimized binary in Supabase Storage.
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      const stored = await uploadDataUrlToRawajStorage(optimized.dataUrl, {
        folder: defaultCategory || 'uploads',
        fileName: cleanName || 'image',
      });

      // 3. Save only URL/path metadata in Postgres.
      await uploadMedia({
        name: cleanName || 'صورة مرفوعة',
        url: stored.publicUrl,
        storage_path: stored.path,
        mime_type: stored.mimeType,
        size_kb: stored.sizeKb,
        category: defaultCategory,
        alt_ar: cleanName,
      });

      // 4. Apply the durable public URL as the current value.
      onChange(stored.publicUrl);
      setUploadSuccess(`تم رفع الصورة إلى Supabase Storage بنجاح (${stored.sizeKb} ك.ب)`);
      setTimeout(() => setUploadSuccess(null), 4000);
    } catch (err: any) {
      console.error('Upload optimization failed:', err);
      setUploadError(err?.message || 'حدث خطأ أثناء رفع وتحسين الصورة');
    } finally {
      setIsOptimizing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle direct URL apply
  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
  };

  // Filter library items
  const combinedAssets = [
    ...VERIFIED_RAWAJ_ASSETS.map(a => ({
      id: a.id,
      title: a.title,
      url: a.url,
      category: a.category,
      isUploaded: false,
    })),
    ...mediaItems.map(m => ({
      id: m.id,
      title: m.name,
      url: m.url,
      category: m.category,
      isUploaded: true,
    })),
  ];

  const filteredAssets = combinedAssets.filter(item => {
    if (librarySource === 'uploaded' && !item.isUploaded) return false;
    if (librarySource === 'verified' && item.isUploaded) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={`space-y-3 font-sans ${className}`}>
      {/* Label & Help */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs sm:text-sm font-bold text-[#171616] dark:text-[#FAF8F5]">
            {label}
          </label>
          {helperText && (
            <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E] mt-0.5">
              {helperText}
            </p>
          )}
        </div>

        {value && allowClear && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setUrlInput('');
            }}
            className="text-[11px] text-[#B9142D] hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>إزالة الصورة</span>
          </button>
        )}
      </div>

      {/* Current Image Preview Card if value exists */}
      {value && (
        <div className="relative group rounded-2xl overflow-hidden border-2 border-[#E8E2D5] dark:border-[#2D2A26] bg-[#FAF8F5] dark:bg-[#141211] shadow-xs">
          <div className={`w-full ${previewHeightClass} relative overflow-hidden bg-neutral-900/5 dark:bg-neutral-100/5 flex items-center justify-center`}>
            <SafeImage
              src={value}
              alt={label}
              fallbackCategory={defaultCategory}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>الصورة المعتمدة حالياً</span>
            </div>
          </div>
        </div>
      )}

      {/* The 3 Options Tabs Bar */}
      <div className="bg-[#FAF8F5] dark:bg-[#1C1A1A] p-1 rounded-2xl border border-[#E8E2D5] dark:border-[#2E2A28] grid grid-cols-3 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-[#B9142D] text-white shadow-xs'
              : 'text-[#70695F] dark:text-[#A8A196] hover:bg-[#E8E2D5]/50 dark:hover:bg-[#252220]'
          }`}
        >
          <Upload className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">1. رفع من جهازك</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'bg-[#B9142D] text-white shadow-xs'
              : 'text-[#70695F] dark:text-[#A8A196] hover:bg-[#E8E2D5]/50 dark:hover:bg-[#252220]'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">2. إدراج رابط</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'library'
              ? 'bg-[#B9142D] text-white shadow-xs'
              : 'text-[#70695F] dark:text-[#A8A196] hover:bg-[#E8E2D5]/50 dark:hover:bg-[#252220]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">3. مكتبة رواج</span>
        </button>
      </div>

      {/* Tab 1: Upload from Device / Mobile */}
      {activeTab === 'upload' && (
        <div className="bg-white dark:bg-[#181615] p-4 rounded-2xl border border-[#E8E2D5] dark:border-[#2E2A28] space-y-3">
          <label className="border-2 border-dashed border-[#D4CDC0] dark:border-[#3F3B3B] hover:border-[#B9142D] dark:hover:border-[#B9142D] rounded-xl p-5 text-center cursor-pointer flex flex-col items-center justify-center gap-2.5 bg-[#FAF8F5]/60 dark:bg-[#1F1C1B] transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#B9142D]/10 text-[#B9142D] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#171616] dark:text-white">
                {isOptimizing ? 'جاري ضغط وتحسين الصورة...' : 'انقر لاختيار صورة من هاتفك أو الكمبيوتر'}
              </div>
              <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                يدعم JPG, PNG, WebP, SVG مع ضغط ذكي فوري وسرعة فائقة
              </p>
            </div>

            <span className="px-3 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-[#171616] dark:text-neutral-200 text-[11px] font-bold">
              تصفح الملفات أو الكاميرا
            </span>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              disabled={isOptimizing}
              className="hidden"
            />
          </label>

          {uploadSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {uploadError && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <X className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Insert Direct URL */}
      {activeTab === 'url' && (
        <div className="bg-white dark:bg-[#181615] p-4 rounded-2xl border border-[#E8E2D5] dark:border-[#2E2A28] space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#171616] dark:text-white flex items-center gap-1.5">
              <span>رابط الصورة المباشر (URL):</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder="https://... أو رابط صورة معتمد"
                className="flex-1 bg-[#FAF8F5] dark:bg-[#201D1C] border border-[#E8E2D5] dark:border-[#332F2F] rounded-xl px-3 py-2 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2 rounded-xl bg-[#B9142D] hover:bg-[#a01126] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                تطبيق
              </button>
            </div>
          </div>
          <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
            يمكنك لصق أي رابط لصورة من أي موقع خارجي أو من استضافة خاصة.
          </p>
        </div>
      )}

      {/* Tab 3: Rawaj Media & Verified Sample Assets */}
      {activeTab === 'library' && (
        <div className="bg-white dark:bg-[#181615] p-3.5 sm:p-4 rounded-2xl border border-[#E8E2D5] dark:border-[#2E2A28] space-y-3">
          {/* Controls: Source filter & Search */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Filter buttons */}
            <div className="flex bg-[#FAF8F5] dark:bg-[#201D1C] p-0.5 rounded-xl border border-[#E8E2D5] dark:border-[#332F2F] text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setLibrarySource('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  librarySource === 'all'
                    ? 'bg-white dark:bg-[#2E2A28] text-[#171616] dark:text-white shadow-xs'
                    : 'text-[#70695F] dark:text-[#A8A196]'
                }`}
              >
                الكل ({combinedAssets.length})
              </button>
              <button
                type="button"
                onClick={() => setLibrarySource('uploaded')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  librarySource === 'uploaded'
                    ? 'bg-white dark:bg-[#2E2A28] text-[#171616] dark:text-white shadow-xs'
                    : 'text-[#70695F] dark:text-[#A8A196]'
                }`}
              >
                مرفوعاتي ({mediaItems.length})
              </button>
              <button
                type="button"
                onClick={() => setLibrarySource('verified')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  librarySource === 'verified'
                    ? 'bg-white dark:bg-[#2E2A28] text-[#171616] dark:text-white shadow-xs'
                    : 'text-[#70695F] dark:text-[#A8A196]'
                }`}
              >
                نماذج رواج ({VERIFIED_RAWAJ_ASSETS.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في النماذج والصور..."
                className="w-full bg-[#FAF8F5] dark:bg-[#201D1C] border border-[#E8E2D5] dark:border-[#332F2F] rounded-xl pr-8 pl-3 py-1.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
              />
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B9142D] text-white'
                    : 'bg-[#FAF8F5] dark:bg-[#201D1C] text-[#70695F] dark:text-[#A8A196] hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {cat === 'all' ? 'جميع التصنيفات' : cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1 no-scrollbar">
            {filteredAssets.map((asset) => {
              const isSelected = value === asset.url;
              return (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    onChange(asset.url);
                    setUrlInput(asset.url);
                  }}
                  className={`group relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#B9142D] ring-2 ring-[#B9142D]/30 scale-95 shadow-md'
                      : 'border-[#E8E2D5] dark:border-[#332F2F] hover:border-[#B9142D]/60'
                  }`}
                  title={asset.title}
                >
                  <img
                    src={asset.url}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#B9142D]/40 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-white text-[#B9142D] flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1 text-[9px] text-white font-bold truncate opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    {asset.title}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-6 text-xs text-[#78716C] dark:text-[#A8A29E]">
              لا توجد صور مطابقة لبحثك في المكتبة. يمكنك رفع صورة جديدة من جهازك.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
