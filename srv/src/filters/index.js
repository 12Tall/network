/**
 * 通用过滤器
 */
const config = require('../config')

module.exports = {
    // 基于目标IP 过滤（可用）
    ip: async (ctx, next) => {
        if (config.ip_array.indexOf(ctx.hostname) < 0) {
            ctx.throw(403, "destination is unreachable")
        }
        await next();
    },

    // 身份验证（不可用）
    auth: async (ctx, next) => {
        if (ctx.url === `/api/auth`) {
            await next();
        } else {
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
}