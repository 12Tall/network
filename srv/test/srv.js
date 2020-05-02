/**
 * 程序入口文件
 */

 const https = require('https')

const Koa = require('koa2');
const app = new Koa();

app.use(async (ctx,next)=>{
    console.log('req')
    ctx.body = "hello koa";
    // 只有调用next()，才会执行后续的代码
    var rsp = await next();
    // 会抛出最内层的throw
    ctx.throw(404)
    console.log('rsp')
    // console.log(rsp)
});
// koa1 的写法，后续将不受支持
app.use(function *(next) {
  this.throw(403)
});
app.listen(3000)
// 可以同时监听多个端口
// app.listen(3001)
// 这里没有证书，所以网页会有异常
https.createServer(app.callback()).listen(3001)