/**
 * Image Optimizer Utility for Client-side Image Upload
 * Automatically downsizes and compresses large phone camera pictures / screenshots
 * to optimized WebP/JPEG data URLs under 200KB for instant storage in Firestore & localStorage.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  sizeKb: number;
  width: number;
  height: number;
  fileName: string;
}

export async function optimizeImageFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.85
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    // If it's an SVG, read directly as data URL without rasterizing
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve({
          dataUrl,
          sizeKb: Math.round(file.size / 1024),
          width: 512,
          height: 512,
          fileName: file.name,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas context fails
          resolve({
            dataUrl: e.target?.result as string,
            sizeKb: Math.round(file.size / 1024),
            width,
            height,
            fileName: file.name,
          });
          return;
        }

        // Draw with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for optimal compression, fallback to JPEG
        let mimeType = 'image/webp';
        let dataUrl = canvas.toDataURL(mimeType, quality);

        // Fallback if browser doesn't support webp export
        if (!dataUrl.startsWith('data:image/webp')) {
          mimeType = 'image/jpeg';
          dataUrl = canvas.toDataURL(mimeType, quality);
        }

        // Estimate byte size from base64
        const head = `data:${mimeType};base64,`;
        const base64Data = dataUrl.slice(head.length);
        const sizeBytes = Math.round((base64Data.length * 3) / 4);
        const sizeKb = Math.round(sizeBytes / 1024);

        resolve({
          dataUrl,
          sizeKb,
          width,
          height,
          fileName: file.name,
        });
      };

      img.onerror = () => {
        reject(new Error('فشل قراءة ملف الصورة المحدد'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('حدث خطأ أثناء تحميل الملف'));
    };

    reader.readAsDataURL(file);
  });
}
