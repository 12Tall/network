const Router = require('@koa/router');
let router = new Router();

router.all('/',ctx=>{
    ctx.body = 'api';
});


module.exports = router.routes();