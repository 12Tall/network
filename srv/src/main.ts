import { createConnections } from "typeorm";
import Koa from "koa";
import router from "./router";
import databases from './config/database'
import bodyParser from 'koa-bodyparser'
import jwtKoa from 'koa-jwt'

const secret = "koa2 jwt server"
createConnections(databases).then(connections => {
    const app = new Koa();
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
