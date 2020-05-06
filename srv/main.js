/**
 * 程序入口文件
 */

const Koa = require('koa2'),
    filters = require('./filters'),
    router = require('./routers'),
    KoaBody = require('koa-body'),
    session = require('koa-session'),
    config=require('./config')
const app = new Koa();

// 设置登录的cookie，用于加密cookie
app.keys=['im a newer secret', 'i like turtle']
app.use(filters.ip);
app.use(session(config.session,app));
app.use(filters.auth)
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
