const Router = require('@koa/router')
let router = new Router();

router.get('/',ctx=>{
    ctx.body = 'main'
})

router.use('/t1',require('./r1'));

module.exports=router.routes()