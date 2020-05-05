const Router = require('@koa/router'),
    user = require('@entities/user');
let router = new Router();

router.post('/add', async ctx => {
    const [rows, fields] = await user.insert(ctx.request.body);
    ctx.body = `insert user: ${fields.insertId}`;
    // ctx.body = await user.insert({ first_name: "😄" });
});

router.all('/mod', async ctx => {
    ctx.body = await user.update({ uid: 1, first_name: "😄", last_name: "/(ㄒoㄒ)/~~" });
});
router.get('/:uid/get', async ctx => {
    const [rows, fields] = await user.select({ uid: ctx.params.uid});
    ctx.body = rows[0];
});


module.exports = router.routes();