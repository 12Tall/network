import Router from '@koa/router'

const router = new Router();
router.get('/', (ctx, next) => {
    ctx.response.body = "hi"
});
export default router;