const Router = require('@koa/router'),
    user = require('@entities/user');
let router = new Router();

router.all('/add', async ctx => {
    ctx.body = await user.insert({ first_name: "😄" });
});

router.all('/mod', async ctx => {
    ctx.body = await user.update({ uid: 1, first_name: "😄", last_name: "/(ㄒoㄒ)/~~" });
});


module.exports = router.routes();