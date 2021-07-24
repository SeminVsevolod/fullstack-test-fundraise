const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const logger = require('koa-logger');
const dotenv = require('dotenv');
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

/**
 * +--------------+
 * | Конфигурация |
 * +--------------+
 */
dotenv.config({ path: './.env' });

/**
 * +------------------+
 * | Подключение к БД |
 * +------------------+
 */
const DB = process.env.MONGODB_CONNECTION;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connection) => console.log(`DB connection successful -> ${connection.connections[0].host}:${connection.connections[0].port}`))
    .catch((err) => console.log(`DB connection failed -> ${err.message}`));

/**
 * +-------------+
 * | Middlewares |
 * +-------------+
 */
app
    .use(cors())
    .use(errorHandler)
    .use(logger())
    .use(bodyParser({
        onerror: (err, ctx) => {
            ctx.throw(`body parse error: ${err}`, 422);
        }
    }))
    .use(router.routes());

module.exports = app;