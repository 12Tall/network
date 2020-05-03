const Router = require('@koa/router');
let router = new Router();

router.all('/',ctx=>{
    ctx.body = 'welcome';
});

router.use('/api',require('./api'))


module.exports = router.routes();