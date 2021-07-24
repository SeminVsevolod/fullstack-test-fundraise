/**
 * @param {number} oldAmount - Сумма в старой валюте
 * @param {number} oldRate - Ставка старой валюты к доллару США
 * @param {number} newRate - Ставка новой валюты к доллару США
 * @returns {number} - Сумма в новой валюте
 */
export function convertCurrency(oldAmount, oldRate, newRate) {
    if (oldRate === 0) {
        throw new Error('convertCurrency error: oldRate cannot be 0');
    }
    return Math.round(oldAmount / oldRate * newRate);
}
