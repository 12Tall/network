const Router = require('@koa/router');
let router = new Router();

router.all('/',ctx=>{
    ctx.body = 'api';
});
router.use('/user',require('./user'))

module.exports = router.routes();