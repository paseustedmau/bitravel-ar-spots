import type { Lang } from '@/types/ar';

export function detectLanguage(searchParams: URLSearchParams): Lang {
  // 1. Query param has highest priority: ?lang=en
  const langParam = searchParams.get('lang')?.toLowerCase();
  if (langParam === 'en') return 'en';
  if (langParam === 'es') return 'es';

  // 2. Browser language
  const browserLang = navigator.language?.toLowerCase() ?? '';
  if (browserLang.startsWith('en')) return 'en';

  // 3. Default: Spanish
  return 'es';
}

/**
 * Returns the correct translation for a bilingual field.
 * Usage: t(experience.title, lang)  →  "Ballena Jorobada"
 */
export function t(field: { es: string; en: string }, lang: Lang): string {
  return field[lang] ?? field.es;
}
