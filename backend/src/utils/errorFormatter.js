/**
 * @param {string} errorMessage - Длинное и некрасивое сообщение об ошибке mongoose
 * @returns {object} - Возвращает объект {"поле_1": "Поле 1 обязательно для заполнения"}
 */
const errorFormatter = errorMessage => {
    const formattedErrors = {};
    const allErrors = errorMessage.substring(errorMessage.indexOf(':')+1).trim();
    const allErrorsInArrayFormat = allErrors.split(',').map(e => e.trim());
    allErrorsInArrayFormat.forEach(error => {
        const [key, value] = error.split(':').map(err => err.trim());
        formattedErrors[key] = value;
    })
    return formattedErrors;
};

module.exports = errorFormatter;