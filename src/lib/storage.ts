import { supabase } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

type Bucket = 'ar-models' | 'ar-posters';

/**
 * Upload a file to Supabase Storage.
 * Returns the public URL on success.
 */
export async function uploadFile(
  bucket: Bucket,
  path: string,
  file: File,
): Promise<{ url: string } | { error: string }> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '31536000',
    upsert: true,
    contentType: file.type || 'application/octet-stream',
  });

  if (error) return { error: error.message };

  const url = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  return { url };
}

/**
 * Delete a file from Supabase Storage.
 */
export async function deleteFile(
  bucket: Bucket,
  path: string,
): Promise<{ error?: string }> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) return { error: error.message };
  return {};
}

/**
 * Extract the storage path from a full Supabase Storage URL.
 */
export function extractStoragePath(url: string, bucket: Bucket): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}
