const Router = require('@koa/router'),
    User = require('@controller/user');

const router = new Router();


router.all('/get', User.add)



module.exports = router.routes()