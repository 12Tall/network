/**
 * 用户验证
 */

const Router = require('@koa/router'),
    auth = require('@entities/auth');
let router = new Router();

router.all('/', async (ctx, next) => {
    const user = await auth.verify();
    console.log(user)
    if (user) {
        ctx.session.user = user;
        ctx.redirect(ctx.session.url);
    }
    // ctx.body = res;
    // ctx.body = await user.insert({ first_name: "😄" });
});

function test(){
    console.log(456)
}

class t{
    @test
    static ttt(){

    }

}


module.exports = router.routes();