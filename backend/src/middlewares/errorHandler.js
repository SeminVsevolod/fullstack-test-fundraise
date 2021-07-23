const errorFormatter = require('../utils/errorFormatter');
const mongoose = require('mongoose');

/**
 * @param {object} ctx - Контекст
 * @param {function} next - Функция передачи управления следующему обработчику
 */
const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // Если это ошибка валидации Mongoose, то выводим её красиво в соответствии с требованию к бэкенду
        if (err instanceof mongoose.Error.ValidationError) {
            err.status = 422;
            const formattedErrors = errorFormatter(err.message);

            // Возвращаем первое сообщение об ошибке
            err.message = Object.values(formattedErrors)[0].toString();
        }

        ctx.status = err.status || 500;
        ctx.body = {
            ok: false,
            error: err.message
        };
        ctx.app.emit('error', err, ctx);
    }
};

module.exports = errorHandler;