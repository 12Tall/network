const config = require('../config')
async function ip(ctx, next){
    if(config.ip_array.indexOf(ctx.hostname)<0){
        ctx.throw(403,"destination is unreachable")
    }
    await next();
}

async function auth(ctx, next){
    if (ctx.url === `/api/auth`) {
        await next();
    }else{
        let user = ctx.session.user;
        console.log(user)
        if (!user) {
            ctx.session.url = ctx.url;
            // 此处应该跳转到用户登录界面
            ctx.redirect('/api/auth'); // 用户验证
        }
        // 清除url
        // ctx.session.url = undefined;
        await next();
    }
}

module.exports = {ip,auth}
