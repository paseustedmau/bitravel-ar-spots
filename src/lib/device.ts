import type { DeviceOS, DeviceType } from '@/types/ar';

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isTablet: boolean;
  os: DeviceOS;
  deviceType: DeviceType;
  supportsAR: boolean;
}

export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;

  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream;
  const isAndroid = /Android/.test(ua);
  const isIPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isTablet = isIPad || (/Android/.test(ua) && !/Mobile/.test(ua));
  const isMobile = (isIOS || isAndroid) && !isTablet;

  const os: DeviceOS = isIOS ? 'ios' : isAndroid ? 'android' : 'other';
  const deviceType: DeviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  // AR support:
  // - iOS: AR Quick Look via <model-viewer> with ios-src (.usdz) — Safari 12+
  // - Android: Scene Viewer via model-viewer — Chrome 81+, requires Google Play Services AR
  // - model-viewer handles graceful fallback automatically
  const supportsAR = isIOS || isAndroid;

  return { isIOS, isAndroid, isMobile, isTablet, os, deviceType, supportsAR };
}
