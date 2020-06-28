import KoaRouter from "koa-router";

const router = new KoaRouter();

router.get( "/", async (ctx, res) => {
    ctx.response.body = "Hello World!"
})


export default router;