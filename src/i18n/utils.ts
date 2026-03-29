import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang], params?: Record<string, string | number>): string {
    let text = (ui[lang] as Record<string, string>)[key] || (ui[defaultLang] as Record<string, string>)[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
}

export function getAlternateLocaleUrl(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  const pathname = url.pathname;

  if (currentLang === defaultLang) {
    // zh-TW → en: add /en/ prefix
    return targetLang === defaultLang ? pathname : `/en${pathname}`;
  } else {
    // en → zh-TW: remove /en prefix
    const withoutLang = pathname.replace(/^\/en/, '') || '/';
    return targetLang === defaultLang ? withoutLang : pathname;
  }
}

/**
 * Derive lang from the source file path (import.meta.url).
 * Files under src/pages/en/ → 'en', otherwise → defaultLang.
 * Useful inside getStaticPaths() where Astro.url is not available.
 */
export function getLangFromFilePath(fileUrl: string): Lang {
  return fileUrl.includes('/pages/en/') ? 'en' : defaultLang;
}

export function getLocalePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/en${path}`;
}
