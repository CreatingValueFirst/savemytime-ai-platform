import { format, formatDistanceToNow } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { bg, enUS, ru, es } from 'date-fns/locale';

// Sofia, Bulgaria timezone
const SOFIA_TIMEZONE = 'Europe/Sofia';

// Locale mapping for date-fns
const localeMap = {
  bg: bg,
  en: enUS,
  ru: ru,
  es: es,
};

/**
 * Get the current locale for date formatting based on i18n language
 */
export const getDateLocale = (language: string = 'bg') => {
  return localeMap[language as keyof typeof localeMap] || bg;
};

/**
 * Convert any date to Sofia/Bulgaria timezone
 * @param date - Date string, Date object, or timestamp
 * @returns Date object in Sofia timezone
 */
export const toSofiaTime = (date: string | Date | number): Date => {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return utcToZonedTime(dateObj, SOFIA_TIMEZONE);
};

/**
 * Format date in Sofia timezone with custom format
 * @param date - Date to format
 * @param formatString - Format string (e.g., 'dd/MM/yyyy HH:mm:ss')
 * @param language - Language code for locale (bg, en, ru, es)
 * @returns Formatted date string in Sofia timezone
 */
export const formatSofiaDate = (
  date: string | Date | number,
  formatString: string = 'dd/MM/yyyy HH:mm:ss',
  language: string = 'bg'
): string => {
  const sofiaDate = toSofiaTime(date);
  const locale = getDateLocale(language);
  return format(sofiaDate, formatString, { locale });
};

/**
 * Format date and time for display (short format)
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted date string like "17/01/2026 14:30"
 */
export const formatDateTime = (date: string | Date | number, language: string = 'bg'): string => {
  return formatSofiaDate(date, 'dd/MM/yyyy HH:mm', language);
};

/**
 * Format date only (no time)
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted date string like "17/01/2026"
 */
export const formatDateOnly = (date: string | Date | number, language: string = 'bg'): string => {
  return formatSofiaDate(date, 'dd/MM/yyyy', language);
};

/**
 * Format time only (no date)
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted time string like "14:30:45"
 */
export const formatTimeOnly = (date: string | Date | number, language: string = 'bg'): string => {
  return formatSofiaDate(date, 'HH:mm:ss', language);
};

/**
 * Format date with long month name
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted date string like "17 януари 2026" (bg) or "January 17, 2026" (en)
 */
export const formatLongDate = (date: string | Date | number, language: string = 'bg'): string => {
  const formatString = language === 'en' ? 'MMMM dd, yyyy' : 'dd MMMM yyyy';
  return formatSofiaDate(date, formatString, language);
};

/**
 * Format date with long month name and time
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted date string like "17 януари 2026 в 14:30"
 */
export const formatLongDateTime = (date: string | Date | number, language: string = 'bg'): string => {
  const sofiaDate = toSofiaTime(date);
  const locale = getDateLocale(language);

  if (language === 'en') {
    return format(sofiaDate, "MMMM dd, yyyy 'at' HH:mm", { locale });
  } else if (language === 'ru') {
    return format(sofiaDate, "dd MMMM yyyy 'в' HH:mm", { locale });
  } else if (language === 'es') {
    return format(sofiaDate, "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale });
  } else {
    // Bulgarian
    return format(sofiaDate, "dd MMMM yyyy 'в' HH:mm", { locale });
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Relative time string in Sofia timezone
 */
export const formatRelativeTime = (date: string | Date | number, language: string = 'bg'): string => {
  const sofiaDate = toSofiaTime(date);
  const locale = getDateLocale(language);
  return formatDistanceToNow(sofiaDate, { addSuffix: true, locale });
};

/**
 * Format date for data tables (consistent format across all tables)
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted date string like "17.01.2026 14:30"
 */
export const formatTableDate = (date: string | Date | number, language: string = 'bg'): string => {
  return formatSofiaDate(date, 'dd.MM.yyyy HH:mm', language);
};

/**
 * Format date for data tables with seconds
 * @param date - Date to format
 * @param language - Language code for locale
 * @returns Formatted date string like "17.01.2026 14:30:45"
 */
export const formatTableDateWithSeconds = (date: string | Date | number, language: string = 'bg'): string => {
  return formatSofiaDate(date, 'dd.MM.yyyy HH:mm:ss', language);
};

/**
 * Get current time in Sofia timezone
 * @returns Current Date object in Sofia timezone
 */
export const getCurrentSofiaTime = (): Date => {
  return toSofiaTime(new Date());
};

/**
 * Format ISO string for API requests in Sofia timezone
 * @param date - Date to format
 * @returns ISO string in Sofia timezone
 */
export const formatISOSofia = (date: string | Date | number): string => {
  const sofiaDate = toSofiaTime(date);
  return sofiaDate.toISOString();
};
