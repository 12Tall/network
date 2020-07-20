import jwt from 'jsonwebtoken'
import Koa from 'koa'
import cors from '@koa/cors';

export const jwtConfig: any = {
    secret: "koa2 jwt server",
    expire: "30m",
    refresh: 10, // secconds
    middleWare: async function (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) {
        // 0. 此中间件要在jwtKoa 之后加载
        // 1. jwt token 即使被覆盖，旧的token 依旧可用
        await next();
        ctx.body = {
            data: ctx.body,
            // token: "***"
        }
        // 2. 对返回结果进行进一步封装
        if (ctx.body.data.token) {
            ctx.body.token = ctx.body.data.token;
            delete ctx.body.data.token;
        }
        // 3. 判断token 是否即将过期
        if (ctx.state.user) {
            // 4. 以10 秒为例，UTC 时间是毫秒所以要乘以1000
            if ((Date.now() - (ctx.state.user.exp - jwtConfig.refresh) * 1000) >= 0) {
                ctx.body.token = jwt.sign({
                    name: ctx.state.user.name,
                    // 其他属性
                }, jwtConfig.secret, { expiresIn: jwtConfig.expire })
            }
        }
    }
}

export const corsConfig: any = {
    whiteList: ["http://localhost:8081", "http://127.0.0.1:8081", "http://localhost:3000"],
    middleWare: cors({
        origin: (ctx) => {
            let origin = ctx.request.header.origin;
            if (corsConfig.whiteList.includes(origin)) {
                return origin;
            }
            return false;
        },

        // can be found by js
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 86400,
        credentials: true,
        allowMethods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        keepHeadersOnError: true
    })
}
