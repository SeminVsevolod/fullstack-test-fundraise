/**
 * @param {number} count - Кол-во
 * @returns {number} - Красиво округленное число
 */
export function roundValuePrettily(count) {
    if (count < 10) {
        return Math.round(count);
    }
    if (count < 100) {
        return Math.round(count / 10) * 10;
    }
    if (count < 200) {
        return Math.round(count / 20) * 20;
    }
    if (count < 1000) {
        return Math.round(count / 50) * 50;
    }
    if (count < 10000) {
        return Math.round(count / 500) * 500;
    }
    return Math.round(count / 1000) * 1000;
}
