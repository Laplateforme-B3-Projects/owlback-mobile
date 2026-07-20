import { router } from 'expo-router';

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
