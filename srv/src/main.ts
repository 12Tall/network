import { createConnections, getConnectionManager, getConnection, } from "typeorm";
import Koa from "koa";
import router from "./router";
import databases from './config/database'
import bodyParser from 'koa-bodyparser'
import jwtKoa from 'koa-jwt'
import cors from '@koa/cors'

const secret = "koa2 jwt server",
    whiteList = ["http://localhost:8081", "http://127.0.0.1:8081", "http://localhost:3000"];
createConnections(databases).then(connections => {
    const app = new Koa();
    app.use(cors({
        origin: (ctx) => {
            let origin = ctx.request.header.origin;
            if (whiteList.includes(origin)) {
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
    }));

    app.use(bodyParser());

    app.use(jwtKoa({ secret, }).unless({
        path: [/^\/api\/login/]  // 数组中的路径不需要jwt 验证        
    }));



    app.use(router.routes());

    app.listen(3000);

    console.log("http://localhost:3000")


}).catch(error => {
    console.error(error);
})



////////////////////////////////////////////////////////////////////////

