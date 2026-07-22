import { router } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';

export function handleClose() {
  router.back();
}

export function adaptMediaUrl(url: string) {
  if (!url) return;
  const localUrl = process.env.EXPO_PUBLIC_MEDIA_URL as string;
  const isLocal = process.env.EXPO_PUBLIC_ENVIRONMENT === 'local';
  if (isLocal) return url.replace('http://localhost:3000', localUrl);

  return url;
}

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/heic': 'jpg',
  'image/heif': 'jpg',
};

export function getBaseFilename(filename: string) {
  const dotIndex = filename.lastIndexOf('.');
  const base = dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;
  return base;
}

function replaceExtension(filename: string, newExt: string): string {
  const base = getBaseFilename(filename);
  return `${base}.${newExt}`;
}

export async function ensureJpeg(uri: string, mimeType: string, filename: string) {
  const isHeic =
    mimeType === 'image/heic' || mimeType === 'image/heif' || uri.toLowerCase().endsWith('.heic');

  if (!isHeic) {
    return { uri, type: mimeType, name: filename };
  }

  const result = await ImageManipulator.manipulateAsync(uri, [], {
    compress: 0.9,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  return { uri: result.uri, type: 'image/jpeg', name: replaceExtension(filename, 'jpeg') };
}
