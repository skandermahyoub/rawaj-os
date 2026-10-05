import { supabase } from './supabase';

const BUCKET = 'rawaj-media';

const sanitizeSegment = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'asset';

const sanitizeFolderPath = (value: string) =>
  value
    .split('/')
    .map((segment) => sanitizeSegment(segment))
    .filter(Boolean)
    .join('/') || 'uploads';

const extensionFromMime = (mimeType: string) => {
  if (mimeType === 'image/webp') return 'webp';
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/svg+xml') return 'svg';
  if (mimeType === 'image/gif') return 'gif';
  return 'bin';
};

export const dataUrlToBlob = (dataUrl: string): { blob: Blob; mimeType: string } => {
  const match = dataUrl.match(/^data:([^;,]+)(;base64)?,(.*)$/s);
  if (!match) throw new Error('صيغة ملف الصورة غير صالحة.');

  const mimeType = match[1] || 'application/octet-stream';
  const isBase64 = Boolean(match[2]);
  const payload = match[3] || '';

  if (isBase64) {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return { blob: new Blob([bytes], { type: mimeType }), mimeType };
  }

  return {
    blob: new Blob([decodeURIComponent(payload)], { type: mimeType }),
    mimeType,
  };
};

export const uploadDataUrlToRawajStorage = async (
  dataUrl: string,
  options?: { folder?: string; fileName?: string }
): Promise<{ path: string; publicUrl: string; mimeType: string; sizeKb: number }> => {
  const { blob, mimeType } = dataUrlToBlob(dataUrl);
  const folder = sanitizeFolderPath(options?.folder || 'uploads');
  const baseName = sanitizeSegment((options?.fileName || 'image').replace(/\.[^.]+$/, ''));
  const extension = extensionFromMime(mimeType);
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: mimeType,
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data.publicUrl) throw new Error('تعذر إنشاء رابط الصورة بعد الرفع.');

  return {
    path,
    publicUrl: data.publicUrl,
    mimeType,
    sizeKb: Math.max(1, Math.round(blob.size / 1024)),
  };
};

export const uploadFileToRawajStorage = async (
  file: File,
  options?: { folder?: string; fileName?: string }
): Promise<{ path: string; publicUrl: string; mimeType: string; sizeKb: number }> => {
  if (!file || file.size <= 0) throw new Error('الملف فارغ أو غير صالح.');

  const folder = sanitizeFolderPath(options?.folder || 'uploads');
  const originalName = options?.fileName || file.name || 'file';
  const dotIndex = originalName.lastIndexOf('.');
  const extension = dotIndex > -1
    ? sanitizeSegment(originalName.slice(dotIndex + 1)).replace(/^\.+/, '')
    : extensionFromMime(file.type || 'application/octet-stream');
  const baseName = sanitizeSegment(dotIndex > -1 ? originalName.slice(0, dotIndex) : originalName);
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension || 'bin'}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data.publicUrl) throw new Error('تعذر إنشاء رابط الملف بعد الرفع.');

  return {
    path,
    publicUrl: data.publicUrl,
    mimeType: file.type || 'application/octet-stream',
    sizeKb: Math.max(1, Math.round(file.size / 1024)),
  };
};

export const removeRawajStorageObject = async (path?: string | null): Promise<void> => {
  if (!path) return;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
};
