const LOCALE_USA = 'en-US';

/**
 * @param {number} number - Число
 * @param {string} locale - Локаль
 * @returns {string} - Число, отформатированное в соответствии с локалью
 */
export function formatNumberAccordingLocale(number, locale = LOCALE_USA) {
    const formatter = new Intl.NumberFormat(locale);
    return number ? formatter.format(number) : number;
}
