const Router = require('@koa/router');

const router = new Router({
    prefix: '/api'
});

router.all('/index', async ctx => {
    ctx.body = "welcome"
});

router.use('/user', require('./user'))



module.exports = router.routes()