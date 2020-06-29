import { createConnections, getConnection } from "typeorm";
import Koa from "koa";
import router from "./router";
import databases from './config/database'
import Photo from "./entity/my_db/photo";


createConnections(databases).then(connections => {

    const repository = getConnection("my_db").getRepository(Photo);
    repository.findOne(1).then(ps => {
        console.log(ps);
    });
    const app = new Koa();

    app.use(router.routes())

    app.listen(3000);

    console.log("http://localhost:3000")
}).catch(error => {
    console.error(error);
})
