import type { DeviceOS, DeviceType } from '@/types/ar';

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSafari: boolean;
  os: DeviceOS;
  deviceType: DeviceType;
  supportsAR: boolean;
  // iOS Quick Look works via direct USDZ link even in Chrome iOS
  supportsQuickLook: boolean;
}

export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;

  const isAndroid = /Android/.test(ua);
  const isIPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isIOS = (/iPad|iPhone|iPod/.test(ua) || isIPad) && !(window as Window & { MSStream?: unknown }).MSStream;
  const isTablet = isIPad || (/Android/.test(ua) && !/Mobile/.test(ua));
  const isMobile = (isIOS || isAndroid) && !isTablet;

  // Safari detection: has Safari in UA but NOT Chrome/CriOS/FxiOS
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|OPiOS/.test(ua);

  const os: DeviceOS = isIOS ? 'ios' : isAndroid ? 'android' : 'other';
  const deviceType: DeviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  // model-viewer's built-in AR button works when:
  // - Android: Chrome with Scene Viewer / WebXR
  // - iOS Safari: Quick Look via ios-src USDZ
  // Chrome on iOS does NOT support WebXR, so model-viewer hides its button.
  // BUT: iOS Quick Look can still be triggered via a direct <a href="*.usdz" rel="ar"> link.
  const supportsAR = isIOS || isAndroid;
  const supportsQuickLook = isIOS; // USDZ Quick Look works on all iOS browsers via anchor trick

  return { isIOS, isAndroid, isMobile, isTablet, isSafari, os, deviceType, supportsAR, supportsQuickLook };
}
