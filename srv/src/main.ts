import { createConnections } from "typeorm";
import Koa from "koa";
import router from "./router";
import databases from './config/database'
import bodyParser from 'koa-bodyparser'
import jwtKoa from 'koa-jwt'
import cors from 'koa2-cors'

const secret = "koa2 jwt server"
createConnections(databases).then(connections => {
    const app = new Koa();
    app.use(cors({
        origin: (ctx) => {
            // 认证失败也会显示跨域失败
            const whiteList = ['http://192.168.1.1:3000', 'http://localhost:8080', 'http://127.0.0.1:8081']; //可跨域白名单
            let referer: string = ctx.request.header.referer;
            if (referer) {
                let org = referer.substr(0, referer.length - 1);
                console.log(whiteList.includes(org))
                if (whiteList.includes(org)) {
                    return org;
                }
            }

            return 'http://localhost:3000';
        },
        // can be found by js
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 86400,
        credentials: true,
        allowMethods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));
    app.use(bodyParser());
    app.use(jwtKoa({ secret }).unless({
        path: [/^\/api\/login/]  // 数组中的路径不需要jwt 验证
    }));


    app.use(router.routes());

    app.listen(3000);

    console.log("http://localhost:3000")
}).catch(error => {
    console.error(error);
})
