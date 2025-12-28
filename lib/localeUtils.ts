import { locales, type Locale } from './i18n';

/**
 * Extracts the page path from a full pathname by removing the locale prefix.
 * Handles both prefixed paths (/en/about, /am/about) and root paths.
 */
export function getPathWithoutLocale(pathname: string, currentLocale: Locale): string {
  // Check if pathname starts with a locale prefix
  for (const loc of locales) {
    if (pathname === `/${loc}`) {
      return '/';
    }
    if (pathname.startsWith(`/${loc}/`)) {
      return pathname.slice(loc.length + 1); // Remove /{locale} prefix
    }
  }
  // No locale prefix found, return as-is
  return pathname;
}

/**
 * Builds a new URL with the specified locale while preserving the page path and query parameters.
 */
export function buildLocalizedUrl(
  pathname: string,
  currentLocale: Locale,
  newLocale: Locale,
  searchParams?: URLSearchParams | null
): string {
  const pathWithoutLocale = getPathWithoutLocale(pathname, currentLocale);
  const basePath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
  const newPath = `/${newLocale}${basePath}`;
  
  // Preserve query parameters if present
  if (searchParams && searchParams.toString()) {
    return `${newPath}?${searchParams.toString()}`;
  }
  
  return newPath;
}
