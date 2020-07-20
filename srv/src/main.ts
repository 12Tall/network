import { createConnections, getConnectionManager, getConnection, } from "typeorm";
import Koa from "koa";
import router from "./router";
import databases from './config/database'
import bodyParser from 'koa-bodyparser'
import jwtKoa from 'koa-jwt'
import { corsConfig, jwtConfig } from "./config";

createConnections(databases).then(connections => {
    const app = new Koa();
    app.use(corsConfig.middleWare);

    app.use(bodyParser());
    app.use(jwtKoa({ secret: jwtConfig.secret, }).unless({
        path: [/^\/api\/login/]  // 数组中的路径不需要jwt 验证        
    }));
    app.use(jwtConfig.middleWare)


    app.use(router.routes());

    app.listen(3000);

    console.log("http://localhost:3000")


}).catch(error => {
    console.error(error);
})



////////////////////////////////////////////////////////////////////////



// 如果没有返回值，则不对方法做任何修改  
// 执行顺序：方法装饰器 --> 类装饰器

// todo  
// 1. 解析jwt  √
// 2. 建立部门--角色--路由 数据表  
// 3. 权限鉴别
// @Path("all")
// class Test {

//     @Route("get", "test")
//     static async test(ctx: any, next: () => any) {
//         console.log("123");
//         await next();
//     }

// }

// function Route(method: "get" | "post" | "all", path: string, department: string = "all", role: string = "default") {
//     return function (constructor: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         let origin = constructor[propertyKey];

//         constructor[propertyKey] = async function (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next) {
//             console.log("鉴权")
//             origin(ctx, next);
//         }

//         if (!constructor.prototype.routes) {
//             constructor.prototype.routes = {
//                 basic_path: "",
//                 sub_path: []
//             }
//         }
//         let routes = constructor.prototype.routes;
//         routes.sub_path.push({ method, path, func: constructor[propertyKey] })
//     }
// }

// function Path(path: string) {
//     return function (constructor: Function) {
//         if (!constructor.prototype.routes) {
//             constructor.prototype.routes = {}
//         }
//         constructor.prototype.routes.basic_path = path;
//         PushRoute(constructor.prototype.routes);
//     }
// }

// GetRoute()[0]['sub_path'][0]['func'](1, async () => {
//     console.log(2)
// })