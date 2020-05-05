/**
 * 程序入口文件
 */

const Koa = require('koa2'),
    filters = require('./filters'),
    router = require('./routers'),
    KoaBody = require('koa-body')
const app = new Koa();

app.use(filters.ip);
app.use(KoaBody({
    // 提交表单应该用POST 方法最好
    multipart: true
}))
app.use(router);

app.listen(3000)
console.log('server running on http://localhost:3000')
process.on('beforeExit', () => {
    console.log('process exited');
})
