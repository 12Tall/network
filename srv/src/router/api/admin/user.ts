import KoaRouter from 'koa-router'
import { GetActivedUsers } from '../../../controller/admin/user_ctrl';

const user = new KoaRouter();

user.all('/actived', async (ctx) => {
    console.log(ctx.state)
    let params = ctx.request.body;
    ctx.body = await GetActivedUsers();
});


export default user;