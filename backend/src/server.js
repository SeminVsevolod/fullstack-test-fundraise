const app = require('./app');

/**
 * +----------------+
 * | Запуск сервера |
 * +----------------+
 */
const port = process.env.PORT || 3000;
app.listen(port);