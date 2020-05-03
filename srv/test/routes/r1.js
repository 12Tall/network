const Router = require('@koa/router')
let router = new Router();

router.get('/',ctx=>{
    ctx.body = 't1'
})

module.exports=router.routes()