import KoaRouter from "koa-router";
import jwt from 'jsonwebtoken'
import util from 'util'
import User from "../../entity/gogs/user";
import { GetUserByName } from "../../controller/user_ctrl"


const verify = util.promisify(jwt.verify) // 解密
const secret = "koa2 jwt server"

const login = new KoaRouter();
login.post('/login', async (ctx) => {
    let info = ctx.request.body;
    if (info && info.name && info.password) {

        let user = await GetUserByName(info.name);
        console.log(user);
        if (user?.ValidatePassword(info.password)) {
            ctx.body = {
                message: "获取token 成功",
                code: 1,
                token: jwt.sign({ name: 123 }, secret, { expiresIn: '1h' })
            }
            return;
        }
        ctx.body = {
            message: "获取token 失败",
            code: -1,
            token: null
        }
    }

});

export default login;