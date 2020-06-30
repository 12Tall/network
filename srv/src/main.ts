import { createConnections, getConnection } from "typeorm";
import Koa from "koa";
import router from "./router";
import databases from './config/database'
import User from "./entity/gogs/user";

createConnections(databases).then(connections => {

    const repository = getConnection("gogs").getRepository(User);
    repository.findOne(1).then(ps => {
        console.log(ps?.ValidatePassword('password'))
    });
    const app = new Koa();
    app.use(router.routes())

    app.listen(3000);

    console.log("http://localhost:3000")
}).catch(error => {
    console.error(error);
})
