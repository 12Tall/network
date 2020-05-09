/**
 * 应用的入口文件
 */

const Koa = require('koa'),
    session = require('koa-session'),
    KoaBody = require('koa-body'),
    config = require('@src/config'),
    filters = require('@src/filters'),
    api = require('@src/api')



const app = new Koa();

app.keys = ['一组用于加密cookie 的字符串', '内容可以随便写', '一般是用随机字符串', '但是我觉得这样会更安全'];
app.use(filters.ip);
app.use(session(config.session, app));
// app.use(filters.auth);
app.use(KoaBody({
    // 只能解析post 的表单
    multipart: true
}))
app.use(api)

app.listen(3000);
console.log('服务已启动…')