import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './lib/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request, or fall back to default
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
