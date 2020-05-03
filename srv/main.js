/**
 * 程序入口文件
 */

const Koa = require('koa2'),
filters = require('./filters'),
router = require('./routers')
const app = new Koa();

app.use(filters.ip);

app.use(router);

app.listen(3000)

