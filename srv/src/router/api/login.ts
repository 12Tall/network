import KoaRouter from "koa-router";
import jwt from 'jsonwebtoken'
import util from 'util'
import { GetUserByName } from "../../controller/user_ctrl"


const verify = util.promisify(jwt.verify) // 解密
const secret = "koa2 jwt server"

const login = new KoaRouter();
login.post('/', async (ctx) => {
    let info = ctx.request.body;
    if (info && info.name && info.password) {

        let user = await GetUserByName(info.name);
        console.log(user);
        if (user?.ValidatePassword(info.password)) {
            ctx.body = {
                message: "获取token 成功",
                code: 1,
                token: jwt.sign({ name: user.lower_name }, secret, { expiresIn: '100m' }),
                account: { name: user.full_name }
            }
        } else {
            ctx.throw(401, "Authentication Error");
        }

    }

});

export default login;