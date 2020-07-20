import KoaRouter from "koa-router";
import jwt from 'jsonwebtoken'
import { GetUserByName } from "../../controller/admin/user_ctrl"
import { jwtConfig } from "../../config";

const login = new KoaRouter();
login.post('/', async (ctx) => {
    let info = ctx.request.body;
    if (info && info.name && info.password) {

        let user = await GetUserByName(info.name);
        if (user?.ValidatePassword(info.password)) {
            ctx.body = {
                token: jwt.sign({ name: user.lower_name }, jwtConfig.secret, { expiresIn: jwtConfig.expire }),
                account: { name: user.full_name }
            }
        } else {
            ctx.throw(401, "Authentication Error");
        }

    }

});

export default login;